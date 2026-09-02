/* Study Vault 공용 진도 모듈 — 기획서 §6 (v1)
 * 원칙: 서버·계정 없음. localStorage 본체 + 저장 실패 시 메모리 폴백(조용히).
 * 키: vault:<appId>:progress = {"<itemId>": true, ...}   (읽음 항목만)
 *     vault:<appId>:meta     = {"lastVisit": epoch_ms, "lastHash": "#..."}
 *     vault:<appId>:drill    = {"<qid>": "correct"|"partial"|"wrong"}  (§13 과목앱 확장)
 */
(function (global) {
  'use strict';

  var mem = {}; // localStorage 불가 환경(프라이빗 모드 등) 폴백

  function lsGet(k) {
    try { var v = global.localStorage.getItem(k); return v === null ? (k in mem ? mem[k] : null) : v; }
    catch (e) { return k in mem ? mem[k] : null; }
  }
  function lsSet(k, v) {
    mem[k] = v;
    try { global.localStorage.setItem(k, v); } catch (e) { /* 조용히 메모리 폴백 */ }
  }
  function lsRemove(k) {
    delete mem[k];
    try { global.localStorage.removeItem(k); } catch (e) {}
  }
  function lsKeys() {
    var keys = {}, i, k;
    try { for (i = 0; i < global.localStorage.length; i++) { k = global.localStorage.key(i); if (k) keys[k] = 1; } }
    catch (e) {}
    for (k in mem) keys[k] = 1;
    return Object.keys(keys);
  }
  function readObj(k) {
    var s = lsGet(k);
    if (!s) return {};
    try { var o = JSON.parse(s); return (o && typeof o === 'object') ? o : {}; }
    catch (e) { return {}; }
  }
  function writeObj(k, o) { lsSet(k, JSON.stringify(o)); }

  function KP(id) { return 'vault:' + id + ':progress'; }
  function KM(id) { return 'vault:' + id + ':meta'; }
  function KD(id) { return 'vault:' + id + ':drill'; }

  var DRILL_RANK = { wrong: 1, partial: 2, correct: 3 };

  function progress(appId) {
    var key = KP(appId);
    return {
      get: function (itemId) { return !!readObj(key)[itemId]; },
      set: function (itemId, on) {
        var o = readObj(key);
        if (on) { o[itemId] = true; } else { delete o[itemId]; }
        writeObj(key, o);
      },
      toggle: function (itemId) {
        var o = readObj(key), next = !o[itemId];
        if (next) { o[itemId] = true; } else { delete o[itemId]; }
        writeObj(key, o);
        return next;
      },
      all: function () { return readObj(key); },
      count: function () {
        var o = readObj(key), n = 0, k;
        for (k in o) { if (o[k]) n++; }
        return n;
      }
    };
  }

  function meta(appId) {
    var key = KM(appId);
    return {
      get: function () { return readObj(key); },
      touch: function (hash) {
        var o = readObj(key);
        o.lastVisit = Date.now();
        if (typeof hash === 'string' && hash) o.lastHash = hash;
        writeObj(key, o);
      }
    };
  }

  /* §13 확장 — 문제 자가채점 상태 */
  function drill(appId) {
    var key = KD(appId);
    return {
      get: function (qid) { return readObj(key)[qid] || null; },
      set: function (qid, status) {
        if (status !== 'correct' && status !== 'partial' && status !== 'wrong') return;
        var o = readObj(key);
        o[qid] = status;
        writeObj(key, o);
      },
      clear: function (qid) { var o = readObj(key); delete o[qid]; writeObj(key, o); },
      all: function () { return readObj(key); },
      counts: function () {
        var o = readObj(key), c = { correct: 0, partial: 0, wrong: 0, total: 0 }, k;
        for (k in o) { if (DRILL_RANK[o[k]]) { c[o[k]]++; c.total++; } }
        return c;
      }
    };
  }

  function appIds() {
    var ids = {}, re = /^vault:(.+):(progress|meta|drill)$/;
    lsKeys().forEach(function (k) { var m = re.exec(k); if (m) ids[m[1]] = 1; });
    return Object.keys(ids);
  }

  function exportAll() {
    var data = {};
    appIds().forEach(function (id) {
      data[id] = { progress: readObj(KP(id)), meta: readObj(KM(id)), drill: readObj(KD(id)) };
    });
    return { v: 1, ts: Date.now(), data: data };
  }

  /* OR 병합: 읽음은 지워지지 않는 방향. drill은 상위 상태 유지(correct>partial>wrong).
   * meta는 lastVisit이 더 최신인 쪽. 반환: {apps, read, drill} 병합 리포트. */
  function importMerge(obj) {
    var report = { apps: 0, read: 0, drill: 0 };
    if (!obj || typeof obj !== 'object' || !obj.data || typeof obj.data !== 'object') return report;
    Object.keys(obj.data).forEach(function (id) {
      if (!/^[\w-]+$/.test(id)) return; // 키 오염 방지
      var inc = obj.data[id] || {}, touched = false;

      var p = readObj(KP(id)), ip = inc.progress || {}, k;
      for (k in ip) { if (ip[k] && !p[k]) { p[k] = true; report.read++; touched = true; } }
      writeObj(KP(id), p);

      var d = readObj(KD(id)), idr = inc.drill || {};
      for (k in idr) {
        var s = idr[k];
        if (!DRILL_RANK[s]) continue;
        if ((DRILL_RANK[d[k]] || 0) < DRILL_RANK[s]) { d[k] = s; report.drill++; touched = true; }
      }
      writeObj(KD(id), d);

      var m = readObj(KM(id)), im = inc.meta || {};
      if (im.lastVisit && (!m.lastVisit || im.lastVisit > m.lastVisit)) {
        m.lastVisit = im.lastVisit;
        if (im.lastHash) m.lastHash = im.lastHash;
        writeObj(KM(id), m);
        touched = true;
      }
      if (touched) report.apps++;
    });
    return report;
  }

  /* 구키 1회 마이그레이션 도우미 (예: MIL의 'mil_read') */
  function migrateLegacy(oldKey, appId) {
    var raw = lsGet(oldKey);
    if (!raw) return 0;
    var n = 0;
    try {
      var o = JSON.parse(raw) || {}, p = readObj(KP(appId)), k;
      for (k in o) { if (o[k] && !p[k]) { p[k] = true; n++; } }
      writeObj(KP(appId), p);
      lsRemove(oldKey);
    } catch (e) { lsRemove(oldKey); }
    return n;
  }

  global.Vault = {
    progress: progress,
    meta: meta,
    drill: drill,
    appIds: appIds,
    exportAll: exportAll,
    importMerge: importMerge,
    migrateLegacy: migrateLegacy
  };
})(typeof window !== 'undefined' ? window : this);
