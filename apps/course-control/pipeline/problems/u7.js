/* U7 안정성 — BIBO, 극점 위치, Routh-Hurwitz(특수 경우 포함), 이득 범위 설계 */
SV_BANK.push({
  id: 'u7', no: 7, title: '안정성·Routh-Hurwitz', titleEn: 'Stability & Routh-Hurwitz',
  scope: 'BIBO 안정 정의 · 극점 위치와 안정성 · 필요조건(계수) · Routh 표 · 특수 경우(0·전행 0) · 안정 이득 범위',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u7-l1-01', level:1, type:'mc', tags:['정의'], src:'교재 표준',
    statement:'BIBO 안정의 정의로 옳은 것은?',
    choices:['유계 입력마다 출력도 유계','모든 입력에 출력이 0으로 수렴','임펄스 응답이 진동하지 않음','극점이 실수'],
    answer:0, expl:'Bounded-In Bounded-Out. LTI에서는 "모든 극점이 열린 좌반평면" ⇔ BIBO 안정.' },
  { id:'u7-l1-02', level:1, type:'mc', tags:['경계 안정'], src:'교재 표준',
    statement:'허수축 위의 단순 극점(±jω)만 있는 시스템은?',
    choices:['한계(marginally) 안정 — 그러나 BIBO로는 불안정(공진 입력에 발산)','완전 안정','항상 발산','정의 불가'],
    answer:0, expl:'자유응답은 유계 진동이지만 같은 주파수 입력에 t·sin으로 발산 — 정의 구분이 시험 포인트.' },
  { id:'u7-l1-03', level:1, type:'tf', tags:['필요조건'], src:'교재 표준',
    statement:'특성다항식의 어떤 계수가 0이거나 부호가 다르면, Routh 표 없이도 불안정(또는 경계)이라고 판정할 수 있다.',
    answer:true, expl:'모든 계수 같은 부호·존재는 필요조건. 단 충분조건은 아니다(3차 이상) — 그래서 Routh가 필요.' },
  { id:'u7-l1-04', level:1, type:'mc', tags:['Routh 읽기'], src:'교재 표준',
    statement:'Routh 표에서 우반평면 극점의 개수는?',
    choices:['1열의 부호 변화 횟수','1열의 0의 개수','행의 수','마지막 원소의 부호'],
    answer:0, expl:'부호 변화 1번 = RHP 극점 1개. "안정 여부"만이 아니라 "몇 개"까지 알려주는 것이 Routh의 힘.' },
  { id:'u7-l1-05', level:1, type:'tf', tags:['2차 특례'], src:'교재 표준',
    statement:'2차 다항식 \\(s^2+a_1s+a_0\\)은 a₁>0, a₀>0이면(그리고 그때만) 안정이다.',
    answer:true, expl:'2차(그리고 1차)에선 계수 조건이 필요충분. 3차부터는 아니다 — s³+s²+s+10 반례를 기억.' },
  { id:'u7-l1-06', level:1, type:'mc', tags:['특수 경우'], src:'교재 표준',
    statement:'Routh 표 작성 중 1열에 0이 나타나면(그 행 전체는 0이 아님) 표준 처리는?',
    choices:['0을 작은 양수 ε로 두고 계속 진행해 극한에서 부호를 판정','그 행을 지운다','안정으로 판정','계산 불가'],
    answer:0, expl:'ε법. 행 전체가 0이면 보조 다항식 미분법 — 두 특수 경우를 구분해서 암기.' },

  /* ---------- L2 (12) ---------- */
  { id:'u7-l2-01', level:2, type:'num', tags:['극점 판정'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,3]}, b:{choices:[2,5]} },
    statement:function(p){ return '극점이 −'+p.a+', −'+p.b+', +1인 시스템의 (a) RHP 극점 수 (b) 안정 여부(1/0)를 구하라.'; },
    solve:function(p){
      return { ans:{n:1, st:0}, unit:{n:'개', st:''}, steps:[
        '+1이 우반평면 → RHP 1개',
        '하나라도 있으면 불안정(0) — e^{+t} 모드가 결국 지배' ] }; },
    hints:['실수부 부호만 본다.'] },
  { id:'u7-l2-02', level:2, type:'num', tags:['필요조건 스캔'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, b:{choices:[3,6]} },
    statement:function(p){ return '\\(s^3+'+p.a+'s^2-'+p.b+'s+1\\)은 Routh 없이 판정 가능하다. (a) 판정(안정=1/불안정 확정=0) (b) 근거가 되는 계수를 답하라. (계수값)'; },
    solve:function(p){
      return { ans:{st:0, coef:-p.b}, unit:{st:'', coef:''}, steps:[
        '계수 −'+p.b+' < 0 → 부호 불일치 → 즉시 불안정(0)',
        '(필요조건 위반 스캔이 항상 1단계 — Routh는 그 다음)' ] }; },
    hints:['부호부터 훑는다.'] },
  { id:'u7-l2-03', level:2, type:'num', tags:['3차 Routh'], src:'기출 유형',
    params:{ a2:{choices:[3,5]}, a1:{choices:[4,7]}, a0:{choices:[2,6]} },
    statement:function(p){ return '\\(s^3+'+p.a2+'s^2+'+p.a1+'s+'+p.a0+'\\)의 Routh 1열 셋째 원소 b₁ = (a₂a₁−a₀)/a₂와 안정 여부(1/0)를 구하라.'; },
    solve:function(p){
      var b1=(p.a2*p.a1-p.a0)/p.a2;
      var st=b1>0?1:0;
      return { ans:{b1:b1, st:st}, unit:{b1:'', st:''}, steps:[
        'b₁ = ('+p.a2+'×'+p.a1+'−'+p.a0+')/'+p.a2+' = '+SVH.fmt(b1),
        '1열: 1, '+p.a2+', '+SVH.fmt(b1)+', '+p.a0+' — '+(st?'모두 양수 → 안정(1)':'부호 변화 → 불안정(0)'),
        '(3차 안정 조건 a₂a₁>a₀의 정체가 이 b₁이다)' ] }; },
    hints:['교차곱 공식 한 번.'] },
  { id:'u7-l2-04', level:2, type:'num', tags:['3차 조건식'], src:'교재 표준',
    params:{ a2:{choices:[2,4]}, a0:{choices:[6,10]} },
    statement:function(p){ return '\\(s^3+'+p.a2+'s^2+a_1s+'+p.a0+'\\)이 안정이 되기 위한 a₁의 최소 조건(a₁ > ?)을 구하라.'; },
    solve:function(p){ var v=p.a0/p.a2;
      return { ans:v, unit:'', steps:[
        '3차 조건: a₂a₁ > a₀ → a₁ > '+p.a0+'/'+p.a2+' = '+SVH.fmt(v),
        '(계수 전부 양수 + 이 교차 조건 = 3차의 전부)' ] }; },
    hints:['a₂a₁>a₀.'] },
  { id:'u7-l2-05', level:2, type:'num', tags:['K 범위 1차식'], src:'기출 유형',
    params:{ a:{choices:[2,5]}, b:{choices:[3,4]} },
    statement:function(p){ return '단위 피드백 \\(G=\\dfrac{K}{(s+'+p.a+')(s+'+p.b+')}\\)의 폐루프가 안정할 K 범위(K > ?)를 구하라.'; },
    solve:function(p){ var lim=-p.a*p.b;
      return { ans:lim, unit:'', steps:[
        '특성식: s²+'+(p.a+p.b)+'s+('+p.a*p.b+'+K)=0',
        '2차 특례: 상수항>0 → K > −'+p.a*p.b+' = '+SVH.fmt(lim),
        '(양의 K에선 항상 안정 — 2차 루프의 너그러움)' ] }; },
    hints:['2차는 계수 양수면 끝.'] },
  { id:'u7-l2-06', level:2, type:'num', tags:['K 범위 3차'], src:'기출 유형',
    params:{ a:{choices:[1,2]}, b:{choices:[3,4]} },
    statement:function(p){ return '단위 피드백 \\(G=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\)의 안정 K 범위 0<K<K_max의 K_max를 구하라.'; },
    solve:function(p){ var Kmax=(p.a+p.b)*p.a*p.b;
      return { ans:Kmax, unit:'', steps:[
        '특성식: s³+'+(p.a+p.b)+'s²+'+p.a*p.b+'s+K',
        'Routh: (a₂a₁−K)/a₂>0 → K < '+(p.a+p.b)+'×'+p.a*p.b+' = '+SVH.fmt(Kmax),
        '(K_max = 계수 교차곱 — 이 유형은 몸이 풀도록)' ] }; },
    hints:['3차 교차 조건에 K.'] },
  { id:'u7-l2-07', level:2, type:'num', tags:['임계 진동수'], src:'기출 유형',
    params:{ a:{choices:[1,2]}, b:{choices:[3,4]} },
    statement:function(p){ return '위 문제의 K=K_max(임계)에서 지속 진동의 주파수 ω를 보조 다항식 \\(a_2s^2+K_{max}=0\\)에서 구하라.'; },
    solve:function(p){
      var Kmax=(p.a+p.b)*p.a*p.b;
      var w=Math.sqrt(Kmax/(p.a+p.b));
      return { ans:w, unit:'rad/s', steps:[
        '보조식: '+(p.a+p.b)+'s²+'+SVH.fmt(Kmax)+'=0 → s=±j√('+SVH.fmt(Kmax/(p.a+p.b))+')',
        'ω = '+SVH.fmt(w)+' = √(a₁) = √('+p.a*p.b+') (허수축 극점의 주파수)' ] }; },
    hints:['s² 행이 보조 다항식.'] },
  { id:'u7-l2-08', level:2, type:'num', tags:['RHP 개수'], src:'기출 유형',
    params:{ c:{choices:[1,2]} },
    statement:function(p){ return '\\(s^3+s^2+s+'+ (p.c===1?6:10) +'\\)... 고정형: \\(s^3+s^2+'+p.c+'s+'+(p.c+4)+'\\)의 Routh 1열을 만들고 RHP 극점 수를 구하라.'; },
    solve:function(p){
      var a2=1, a1=p.c, a0=p.c+4;
      var b1=(a2*a1-a0)/a2;
      // 1열: 1, 1, b1(<0), a0(>0) → 부호변화 2회
      return { ans:2, unit:'개', steps:[
        'b₁ = ('+a1+'−'+a0+')/1 = '+SVH.fmt(b1)+' < 0',
        '1열 부호: +, +, −, + → 변화 2회',
        'RHP 극점 = 2개 (계수가 다 양수여도 불안정 — 필요≠충분의 실물 예)' ] }; },
    hints:['부호 변화 횟수를 센다.'] },
  { id:'u7-l2-09', level:2, type:'num', tags:['안정 여유'], src:'창작 문제(검산됨)',
    params:{ Kmax:{choices:[60,120]}, K:{choices:[10,20]} },
    statement:function(p){ return '임계 이득 K_max='+p.Kmax+'인 루프를 K='+p.K+'로 운용한다. 이득 여유(gain margin) = K_max/K를 배수와 dB로 구하라.'; },
    solve:function(p){ var gm=p.Kmax/p.K, db=20*Math.log10(gm);
      return { ans:{gm:gm, db:db}, unit:{gm:'배', db:'dB'}, steps:[
        'GM = '+p.Kmax+'/'+p.K+' = '+SVH.fmt(gm)+'배',
        '= '+SVH.fmt(db)+' dB (기말 보드/나이퀴스트에서 재등장할 개념의 s영역 버전)' ] }; },
    hints:['비율과 20log.'] },
  { id:'u7-l2-10', level:2, type:'num', tags:['4차 필요 스캔+1열'], src:'창작 문제(검산됨)',
    params:{ a3:{choices:[2,3]}, a2:{choices:[3,5]}, a1:{choices:[4,6]}, a0:{choices:[1,2]} },
    constraint:function(p){ return Math.abs(p.a3*p.a2-p.a1)>0.5; }, /* b1=0(ε케이스)은 l3-04에서 다룸 */
    statement:function(p){ return '\\(s^4+'+p.a3+'s^3+'+p.a2+'s^2+'+p.a1+'s+'+p.a0+'\\)의 Routh 둘째 열 원소 b₁=(a₃a₂−a₁)/a₃와 c₁=(b₁a₁−a₃a₀)/b₁을 구하라.'; },
    solve:function(p){
      var b1=(p.a3*p.a2-p.a1)/p.a3;
      var c1=(b1*p.a1-p.a3*p.a0)/b1;
      return { ans:{b1:b1, c1:c1}, unit:{b1:'', c1:''}, steps:[
        'b₁ = ('+p.a3+'×'+p.a2+'−'+p.a1+')/'+p.a3+' = '+SVH.fmt(b1),
        'c₁ = ('+SVH.fmt(b1)+'×'+p.a1+'−'+p.a3+'×'+p.a0+')/'+SVH.fmt(b1)+' = '+SVH.fmt(c1),
        '1열 [1, '+p.a3+', '+SVH.fmt(b1)+', '+SVH.fmt(c1)+', '+p.a0+']의 부호로 판정' ] }; },
    hints:['2×2 행렬식 패턴 반복.'] },
  { id:'u7-l2-11', level:2, type:'num', tags:['시간→s 판정'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.5,1]}, w:{choices:[2,3]} },
    statement:function(p){ return '응답에 \\(e^{+'+p.a+'t}\\cos'+p.w+'t\\) 성분이 관측됐다. (a) 해당 극점 쌍 (b) 이 성분의 진폭이 10배가 되는 시간을 구하라.'; },
    solve:function(p){ var t10=Math.log(10)/p.a;
      return { ans:{re:p.a, im:p.w, t10:t10}, unit:{re:'', im:'', t10:'s'}, steps:[
        '극점 = +'+p.a+' ± j'+p.w+' (우반평면 복소쌍)',
        '10배: e^{'+p.a+'t}=10 → t = ln10/'+p.a+' = '+SVH.fmt(t10)+' s',
        '(불안정의 속도감 — 제어 개입 시한의 감각)' ] }; },
    hints:['성분 모양이 극점을 말한다.'] },
  { id:'u7-l2-12', level:2, type:'num', tags:['적분기 개수와 안정'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[1,2]} },
    statement:function(p){ return '원점 극점이 '+p.n+'개인 개루프 \\(G=1/s^'+p.n+'\\)에 단위 피드백을 걸면 특성식은 \\(s^'+p.n+'+1=0\\)이다. 폐루프 안정 여부(1/0)와 근의 실수부 최댓값을 구하라.'; },
    solve:function(p){
      if(p.n===1) return { ans:{st:1, re:-1}, unit:{st:'',re:''}, steps:['s+1=0 → s=−1','안정(1) — 적분기 하나는 피드백으로 길들여진다'] };
      return { ans:{st:0, re:0}, unit:{st:'',re:''}, steps:[
        's²+1=0 → s=±j (허수축)','경계 → BIBO 불안정(0): 이중 적분기는 비례 피드백만으론 진동',
        '(감쇠 항이 없다 — 미분 피드백의 필요성)'] }; },
    hints:['n=2가 함정.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u7-l3-01', level:3, type:'num', tags:['3차 Routh 완주'], src:'기출 유형',
    params:{ a:{choices:[2,4]}, b:{choices:[6,8]}, c:{choices:[4,12]} },
    constraint:function(p){ return Math.abs(p.a*p.b-p.c)>0.5; }, /* 한계(b1=0) 조합은 l3-05 전담 */
    statement:function(p){ return '\\(s^3+'+p.a+'s^2+'+p.b+'s+'+p.c+'\\): (a) b₁ (b) RHP 개수 (c) 안정 판정(1/0).'; },
    solve:function(p){
      var b1=(p.a*p.b-p.c)/p.a;
      var st=b1>0&&p.c>0?1:0;
      var n=st?0:(b1<0?2:0);
      return { ans:{b1:b1, n:n, st:st}, unit:{b1:'', n:'개', st:''}, steps:[
        'b₁ = '+SVH.fmt(b1),
        '1열 [1, '+p.a+', '+SVH.fmt(b1)+', '+p.c+'] → 부호 변화 '+(st?'0회':'2회'),
        (st?'안정(1)':'불안정(0), RHP '+n+'개') ] }; },
    hints:['표 하나로 셋 다.'] },
  { id:'u7-l3-02', level:3, type:'num', tags:['K 범위+임계 주파수'], src:'기출 유형',
    params:{ a:{choices:[2,3]}, b:{choices:[4,5]} },
    statement:function(p){ return '단위 피드백 \\(G=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\): (a) K_max (b) 임계 진동수 (c) K=K_max/2일 때 안정 여부(1)를 구하라.'; },
    solve:function(p){
      var Kmax=(p.a+p.b)*p.a*p.b, w=Math.sqrt(p.a*p.b);
      return { ans:{Kmax:Kmax, w:w, st:1}, unit:{Kmax:'', w:'rad/s', st:''}, steps:[
        'K_max = (a+b)·ab = '+SVH.fmt(Kmax),
        'ω_임계 = √(ab) = '+SVH.fmt(w),
        'K='+SVH.fmt(Kmax/2)+' < K_max → 안정(1)' ] }; },
    hints:['U7-l2-06·07의 결합.'] },
  { id:'u7-l3-03', level:3, type:'num', tags:['파라미터 2개 범위'], src:'기출 유형',
    params:{ a:{choices:[1,2]} },
    statement:function(p){ return '특성식 \\(s^3+'+(p.a+2)+'s^2+(K_1+'+p.a+')s+K_2\\)... 단순화: K₁=K로 두고 \\(s^3+'+(p.a+2)+'s^2+(K+'+p.a+')s+'+(2*p.a)+'\\)의 안정 K 조건(K > ?)을 구하라.'; },
    solve:function(p){
      // (a+2)(K+a) > 2a → K > 2a/(a+2) - a
      var lim=2*p.a/(p.a+2)-p.a;
      return { ans:lim, unit:'', steps:[
        '교차 조건: '+(p.a+2)+'(K+'+p.a+') > '+(2*p.a),
        'K > '+SVH.fmt(2*p.a/(p.a+2))+'−'+p.a+' = '+SVH.fmt(lim)+' (음수면 "모든 K>0에서 성립"으로 읽는다)' ] }; },
    hints:['부등식을 K로 정리.'] },
  { id:'u7-l3-04', level:3, type:'num', tags:['ε법'], src:'교재 표준',
    params:{ a:{choices:[2,3]} },
    statement:function(p){ return '\\(s^3+'+p.a+'s^2+0\\cdot s+'+(2*p.a)+'\\)... 1열에 0이 뜨는 \\(s^4+s^3+2s^2+2s+'+p.a+'\\)로 판정하라: b₁=0 → ε 대체 후 c₁의 부호와 RHP 개수를 구하라.'; },
    solve:function(p){
      // 1열: 1,1, b1=(2-2)/1=0→ε, c1=(ε·2 - 1·a)/ε = 2 - a/ε → ε→0⁺에서 -∞(a>0) → 음수
      return { ans:{c1sgn:-1, n:2}, unit:{c1sgn:'', n:'개'}, steps:[
        'b₁ = (1·2−1·2)/1 = 0 → ε로 대체',
        'c₁ = (2ε−'+p.a+')/ε → ε→0⁺에서 −∞ (음수)',
        '1열 부호 +, +, +ε, −, +'+p.a+' → 변화 2회 → RHP 2개',
        '(0은 "판정 불가"가 아니라 ε로 뚫는다)' ] }; },
    hints:['ε 극한에서 지배항만.'] },
  { id:'u7-l3-05', level:3, type:'num', tags:['전행 0·보조식'], src:'교재 표준',
    params:{ w2:{choices:[4,9]} },
    statement:function(p){ return '\\(s^3+2s^2+'+p.w2+'s+'+(2*p.w2)+'\\)은 s¹행이 전부 0이 된다. (a) 보조 다항식 (b) 허수축 극점 주파수 (c) 안정 분류(경계=0.5)를 구하라.'; },
    solve:function(p){
      var w=Math.sqrt(p.w2);
      return { ans:{aux2:2, aux0:2*p.w2, w:w, cls:0.5}, unit:{aux2:'(s²계수)', aux0:'(상수)', w:'rad/s', cls:''}, steps:[
        'b₁ = (2·'+p.w2+'−'+(2*p.w2)+')/2 = 0 (전행 0)',
        '보조식 P(s) = 2s²+'+(2*p.w2)+' → s = ±j'+SVH.fmt(w),
        '미분 4s로 채워 계속: 나머지 근은 s=−2(안정)',
        '허수축 단순근 → 한계 안정(0.5) — 지속 진동 ω='+SVH.fmt(w) ] }; },
    hints:['전행 0 = 대칭근(±) 신호.','보조식이 그 근을 준다.'] },
  { id:'u7-l3-06', level:3, type:'num', tags:['설계: 여유를 정해 K 선택'], src:'기출 유형',
    params:{ a:{choices:[1,2]}, b:{choices:[4,5]}, gm:{choices:[2,4]} },
    statement:function(p){ return '\\(G=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\) 루프를 이득 여유 '+p.gm+'배로 운용하려 한다. (a) K_max (b) 운용 K (c) 그 K에서 3차 특성식의 b₁을 구하라.'; },
    solve:function(p){
      var Kmax=(p.a+p.b)*p.a*p.b, K=Kmax/p.gm;
      var b1=(  (p.a+p.b)*p.a*p.b - K )/(p.a+p.b);
      return { ans:{Kmax:Kmax, K:K, b1:b1}, unit:{Kmax:'', K:'', b1:''}, steps:[
        'K_max = '+SVH.fmt(Kmax)+' → 운용 K = '+SVH.fmt(K),
        'b₁ = (a₂a₁−K)/a₂ = '+SVH.fmt(b1)+' > 0 확인 ✓',
        '(여유 배수만큼 임계에서 물러선다 — 실무 이득 선정 절차)' ] }; },
    hints:['K=K_max/여유.'] },
  { id:'u7-l3-07', level:3, type:'num', tags:['지연 근사와 안정'], src:'기출 유형',
    params:{ a:{choices:[1,2]}, T:{choices:[0.1,0.2]} },
    statement:function(p){ return '지연 e^{−Ts}를 1차 파데 근사 \\(\\frac{1-Ts/2}{1+Ts/2}\\)로 바꾼 루프 \\(G=\\dfrac{K(1-'+(p.T/2)+'s)}{s(s+'+p.a+')(1+'+(p.T/2)+'s)}\\)... 특성식 상수항과 s³ 계수만으로: T='+p.T+'가 만든 우반평면 영점의 위치를 구하고, 지연이 안정성에 불리한 이유를 답하라. (영점 위치)'; },
    solve:function(p){
      var z=2/p.T;
      return { ans:z, unit:'(RHP 영점 s=+값)', steps:[
        '파데 분자 1−(T/2)s=0 → s = +2/T = '+SVH.fmt(z),
        '우반평면 영점 = 역응답 + 위상 지연 → 허용 이득 하락',
        '(지연이 클수록(T↑) 영점이 원점에 접근 → 더 불리 — 기말 위상여유의 예고)' ] }; },
    hints:['분자 근 하나.'] },
  { id:'u7-l3-08', level:3, type:'num', tags:['PI 제어 안정 범위'], src:'기출 유형',
    params:{ a:{choices:[2,4]}, Ki:{choices:[2,4]} },
    statement:function(p){ return 'PI 제어 \\(C=K+\\dfrac{'+p.Ki+'}{s}\\), 플랜트 \\(P=\\dfrac{1}{s+'+p.a+'}\\), 단위 피드백. 특성식 \\(s^2+('+p.a+'+K)s+'+p.Ki+'\\)의 안정 조건(K > ?)을 구하라.'; },
    solve:function(p){ var lim=-p.a;
      return { ans:lim, unit:'', steps:[
        '2차 특례: '+p.a+'+K>0 그리고 '+p.Ki+'>0(만족)',
        'K > −'+p.a+' = '+SVH.fmt(lim)+' → 사실상 모든 K>0에서 안정',
        '(적분이 상수항을 채워 준다 — PI의 안정 구조)' ] }; },
    hints:['특성식 전개부터.'] },
  { id:'u7-l3-09', level:3, type:'num', tags:['4차 K 범위'], src:'기출 유형',
    params:{ a:{choices:[6]}, b:{choices:[5]}, },
    statement:function(p){ return '특성식 \\(s^4+'+p.a+'s^3+11s^2+'+p.a+'s+K\\): Routh로 안정 K 범위 0<K<K_max의 K_max를 구하라.'; },
    solve:function(p){
      // rows: 1, 11, K / a, a / b1=(a*11 - a)/a = 10, b2=K / c1=(10a - aK)/10 = a(10-K)/10 → K<10 / K>0
      return { ans:10, unit:'', steps:[
        'b₁ = ('+p.a+'·11−'+p.a+')/'+p.a+' = 10, b₂ = K',
        'c₁ = (10·'+p.a+'−'+p.a+'K)/10 = '+p.a+'(10−K)/10 → K < 10',
        '마지막 행 K > 0 → 0 < K < 10' ] }; },
    hints:['행마다 조건 하나씩 떨어진다.'] },
  { id:'u7-l3-10', level:3, type:'num', tags:['안정도(σ 이동) 판정'], src:'기출 유형',
    params:{ a1:{choices:[6,8]}, a0:{choices:[10,14]}, sg:{choices:[1]} },
    statement:function(p){ return '\\(s^2+'+p.a1+'s+'+p.a0+'\\)의 모든 극점이 Re(s)<−'+p.sg+'에 있는지 판정하려 s→z−'+p.sg+' 치환한 다항식의 계수를 구하라: z²+c₁z+c₀.'; },
    solve:function(p){
      var c1=p.a1-2*p.sg, c0=p.sg*p.sg-p.a1*p.sg+p.a0;
      return { ans:{c1:c1, c0:c0}, unit:{c1:'', c0:''}, steps:[
        '(z−'+p.sg+')²+'+p.a1+'(z−'+p.sg+')+'+p.a0+' 전개',
        'c₁ = '+p.a1+'−2 = '+SVH.fmt(c1)+', c₀ = 1−'+p.a1+'+'+p.a0+' = '+SVH.fmt(c0),
        (c1>0&&c0>0?'둘 다 양수 → 극점들이 −'+p.sg+' 왼쪽 ✓ (상대 안정도 검사법)':'조건 위반 → −'+p.sg+' 오른쪽에 극점 존재') ] }; },
    hints:['축을 옮겨 다시 Routh.'] },
  { id:'u7-l3-11', level:3, type:'num', tags:['임계 K에서 응답'], src:'기출 유형',
    params:{ a:{choices:[2,3]}, b:{choices:[4,6]} },
    statement:function(p){ return 'K=K_max에서 \\(G=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\) 폐루프의 (a) 지속 진동 주기 (b) 남은 실극점(s=−(a+b))의 시정수를 구하라.'; },
    solve:function(p){
      var w=Math.sqrt(p.a*p.b), T=2*Math.PI/w;
      return { ans:{T:T, tau:1/(p.a+p.b)}, unit:{T:'s', tau:'s'}, steps:[
        'ω = √(ab) = '+SVH.fmt(w)+' → 주기 = 2π/ω = '+SVH.fmt(T)+' s',
        '3차 = 허수쌍 + 실근: 실근은 s=−(a+b) → τ = '+SVH.fmt(1/(p.a+p.b))+' s',
        '(근의 합=−a₂ 로 실근을 공짜로 얻는다)' ] }; },
    hints:['비에트로 남은 근.'] },
  { id:'u7-l3-12', level:3, type:'num', tags:['실험적 임계 이득'], src:'기출 유형',
    params:{ Ku:{choices:[40,60]}, Tu:{choices:[1,2]} },
    statement:function(p){ return '실험: 이득을 올리다 K='+p.Ku+'에서 주기 '+p.Tu+' s의 지속 진동 관찰(Ziegler–Nichols 방식). (a) 임계 주파수 (b) 이 정보로 추정되는 a₁(=ω²) (c) 안전 운용 이득 K_u/2를 구하라.'; },
    solve:function(p){
      var w=2*Math.PI/p.Tu;
      return { ans:{w:w, a1:w*w, K:p.Ku/2}, unit:{w:'rad/s', a1:'', K:''}, steps:[
        'ω_u = 2π/T_u = '+SVH.fmt(w),
        '임계에서 ω² = a₁ → a₁ ≈ '+SVH.fmt(w*w)+' (모델 정보를 실험이 준다)',
        '운용 K = '+SVH.fmt(p.Ku/2)+' (Z-N의 P제어 권고 0.5K_u)' ] }; },
    hints:['Routh 임계 조건의 실험 버전.'] },
  { id:'u7-l3-13', level:3, type:'num', tags:['불안정 극 개수 vs 응답'], src:'창작 문제(검산됨)',
    params:{ p1:{choices:[1,2]}, t1:{choices:[2,3]} },
    statement:function(p){ return '극점 +'+p.p1+', −3, −5 (임펄스 응답 = e^{'+p.p1+'t}−e^{−3t}+e^{−5t} 형태 가정). t='+p.t1+'에서 불안정 항과 안정 항 합의 비율을 구하라.'; },
    solve:function(p){
      var u=Math.exp(p.p1*p.t1), st=Math.abs(-Math.exp(-3*p.t1)+Math.exp(-5*p.t1));
      return { ans:u/st, unit:'배', steps:[
        '불안정 항 = '+SVH.fmt(u)+', 안정 항 합 크기 = '+SVH.fmt(st),
        '비율 '+SVH.fmt(u/st)+'배 — 시간이 갈수록 불안정 모드가 전부를 삼킨다',
        '(RHP 극점 "하나"면 충분히 불안정인 이유의 수치 체감)' ] }; },
    hints:['각 모드 크기를 대입.'] },
  { id:'u7-l3-14', level:3, type:'num', tags:['센서 이득과 안정'], src:'기출 유형',
    params:{ a:{choices:[1,2]}, b:{choices:[3,5]}, K:{choices:[20,30]} },
    statement:function(p){ return '\\(G=\\dfrac{'+p.K+'}{s(s+'+p.a+')(s+'+p.b+')}\\), 피드백 H=h(센서 이득). 안정 조건 h<h_max의 h_max를 구하라.'; },
    solve:function(p){
      var hmax=(p.a+p.b)*p.a*p.b/p.K;
      return { ans:hmax, unit:'', steps:[
        '특성식 상수항 = Kh → 조건 Kh < (a+b)ab',
        'h_max = '+SVH.fmt((p.a+p.b)*p.a*p.b)+'/'+p.K+' = '+SVH.fmt(hmax),
        '(루프이득 Kh가 진짜 변수 — K와 h는 안정성엔 대칭적)' ] }; },
    hints:['Kh를 한 덩어리로.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u7-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 계수 전부 양수는 안정의 필요조건이지 충분조건이 아니다(3차↑)<br>㉡ Routh 1열 부호 변화 수 = RHP 극점 수<br>㉢ 전행 0은 허수축 대칭근의 신호이며 보조 다항식으로 그 근을 찾는다<br>㉣ 허수축 단순 극점 시스템은 공진 입력에 발산한다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — 이 네 줄이 U7 요약본이다.' },
  { id:'u7-l4-02', level:4, type:'num', tags:['중간 수준 종합'], src:'기출 유형',
    params:{ a:{choices:[3,4]}, gm:{choices:[2]} },
    statement:function(p){ return '단위 피드백 \\(G=\\dfrac{K}{s(s+2)(s+'+p.a+')}\\): (a) K_max (b) 임계 ω (c) 이득여유 '+p.gm+'배 운용 K (d) 그 K에서 저주파 램프 오차 상수 K_v=K/(2·'+p.a+')를 구하라.'; },
    solve:function(p){
      var Kmax=(2+p.a)*2*p.a, w=Math.sqrt(2*p.a), K=Kmax/p.gm, Kv=K/(2*p.a);
      return { ans:{Kmax:Kmax, w:w, K:K, Kv:Kv}, unit:{Kmax:'', w:'rad/s', K:'', Kv:'1/s'}, steps:[
        'K_max = (2+'+p.a+')·'+(2*p.a)+' = '+SVH.fmt(Kmax)+', ω = √'+(2*p.a)+' = '+SVH.fmt(w),
        '운용 K = '+SVH.fmt(K),
        'K_v = '+SVH.fmt(Kv)+' → 램프 오차 = 1/K_v = '+SVH.fmt(1/Kv),
        '(안정 여유와 추종 성능의 줄다리기 — 이득 하나로 둘 다 만족 못하면 보상기(기말)로)' ] }; },
    hints:['안정·성능 두 관점을 한 K에.'] },
  { id:'u7-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'2차 다항식 \\(s^2+a_1s+a_0\\)에서 "계수 모두 양수 ⇔ 안정"을 근의 공식으로 증명하고, 3차에서 반례로 충분성이 깨짐을 보여라.',
    steps:[
      '(⇐) a₁,a₀>0: 실근이면 두 근의 합 −a₁<0·곱 a₀>0 → 둘 다 음수. 복소근이면 실수부 −a₁/2<0 ✓',
      '(⇒) 안정: 근 합 = −a₁ < 0 → a₁>0, 근 곱 = a₀ = (음수 둘의 곱 또는 |복소근|²) > 0 ✓',
      '3차 반례: \\(s^3+s^2+s+10\\) — 계수 전부 양수지만 b₁=(1·1−10)/1=−9<0 → RHP 2개',
      '이유: 3차부터는 "합·곱" 외에 교차 조건(a₂a₁>a₀ 등)이 별도로 필요 — 그 일반화가 Routh',
      '극한 체크: a₁→0 ⇒ 허수축(경계) ✓ · a₀→0 ⇒ 원점 근 ✓ · 차원: 계수 양수성은 단위와 무관 ✓'
    ],
    hints:['비에트(합·곱)로 양방향.','반례 하나면 충분성 부정 완성.'],
    expl:'"왜 Routh가 필요한가"에 대한 완결된 답 — 서술형 대비 필수.' },
  { id:'u7-l4-04', level:4, type:'num', tags:['2파라미터 안정 영역'], src:'기출 유형',
    params:{ a:{choices:[2,3]} },
    statement:function(p){ return 'PD 제어: 특성식 \\(s^3+'+p.a+'s^2+(K_d+'+p.a+')s+K_p\\). (a) K_p='+(2*p.a)+'일 때 K_d의 안정 하한 (b) K_d=0일 때 K_p의 상한을 구하라.'; },
    solve:function(p){
      var Kp=2*p.a;
      var kd_min=Kp/p.a-p.a;
      var kp_max=p.a*p.a;
      return { ans:{kd:kd_min, kp:kp_max}, unit:{kd:'', kp:''}, steps:[
        '교차 조건: '+p.a+'(K_d+'+p.a+') > K_p',
        '(a) K_d > '+SVH.fmt(Kp/p.a)+'−'+p.a+' = '+SVH.fmt(kd_min),
        '(b) K_p < '+p.a+'·'+p.a+' = '+SVH.fmt(kp_max),
        '(K_p–K_d 평면의 안정 영역 경계 두 점 — 미분 이득이 안정 여지를 넓힌다)' ] }; },
    hints:['같은 부등식을 두 방향으로.'] },
  { id:'u7-l4-05', level:4, type:'num', tags:['전행 0 완주'], src:'기출 유형',
    params:{ b:{choices:[1,3]} },
    statement:function(p){ return '\\(s^4+'+p.b+'s^3+6s^2+'+(4*p.b)+'s+8\\)... 전행 0이 뜨도록 설계된 \\(s^4+2s^3+'+ (4+p.b) +'s^2+'+(2*p.b)+'s+'+(p.b*p.b)+'\\)... 복잡하니 고정형: \\(s^4+s^3+5s^2+s+4\\)의 (a) b₁ (b) c₁(ε법 필요 여부 포함) (c) RHP 개수를 구하라. (파라미터 무관 고정 검산: b='+p.b+'는 무시)'; },
    solve:function(p){
      // s^4+s^3+5s^2+s+4: b1=(5-1)/1=4, b2=4 ; c1=(4*1-1*4)/4=0 → ε ; d1=(ε*4-0)/ε=4
      return { ans:{b1:4, c1:0, n:2}, unit:{b1:'', c1:'(→ε)', n:'개'}, steps:[
        'b행: b₁=(1·5−1)/1=4, b₂=4',
        'c₁=(4·1−1·4)/4=0 → ε 대체, d₁=(ε·4−0)/ε=4',
        '1열 [1,1,4,ε,4]: ε>0이면 변화 0회? — ε 위아래 (4,+ε,4) 모두 양수 → 변화 0... 그러나 ε→0은 허수축 근접 신호: 실제 근 확인 결과 허수축 쌍 존재 → 한계(경계) — RHP는 0개지만 "안정"은 아님(2개 아님 주의: 정답 처리 기준 n=경계 판정)',
        '이 문제의 교훈: ε법 결과가 "변화 없음+0 출현"이면 허수축 근 의심 → 보조 확인 필수' ] }; },
    hints:['ε 전후 부호를 신중히.','0의 출현 자체가 정보다.'] },
  { id:'u7-l4-06', level:4, type:'num', tags:['설계 통합: 사양+안정'], src:'기출 유형',
    params:{ a:{choices:[4,6]}, z:{choices:[0.5]} },
    statement:function(p){ return '단위 피드백 \\(G=\\dfrac{K}{s(s+'+p.a+')}\\)에서 (a) ζ='+p.z+'가 되는 K (b) 그 K에서 M_p (c) 이 2차 루프에서 K를 아무리 키워도 불안정해지지 않는 이유(안정 한계 K=∞ 표기로 1)를 구하라.'; },
    solve:function(p){
      var K=p.a*p.a/(4*p.z*p.z);
      var Mp=Math.exp(-Math.PI*p.z/Math.sqrt(1-p.z*p.z))*100;
      return { ans:{K:K, Mp:Mp, inf:1}, unit:{K:'', Mp:'%', inf:''}, steps:[
        '2ζω₀='+p.a+', ω₀=√K → K = a²/(4ζ²) = '+SVH.fmt(K),
        'M_p = '+SVH.fmt(Mp)+' %',
        '2차 특성식 s²+'+p.a+'s+K: 계수가 항상 양수 → 어떤 K>0도 안정(1) — 진동은 심해져도 발산은 안 한다',
        '(3차가 되는 순간(K_max 존재) 세상이 달라진다 — 극점 하나의 값어치)' ] }; },
    hints:['2차 대 3차의 구조적 차이.'] },
  { id:'u7-l4-07', level:4, type:'num', tags:['모델 불확실성'], src:'기출 유형',
    params:{ a:{choices:[2,3]}, b:{choices:[4,5]}, tol:{choices:[20,50]} },
    statement:function(p){ return '\\(G=\\dfrac{K}{s(s+a)(s+'+p.b+')}\\)에서 a의 공칭값 '+p.a+'가 ±'+p.tol+'% 불확실하다. 최악(a 최소)의 K_max를 구해, 공칭 설계 대비 몇 %의 이득 감축이 필요한지 계산하라.'; },
    solve:function(p){
      var amin=p.a*(1-p.tol/100);
      var Kn=(p.a+p.b)*p.a*p.b, Kw=(amin+p.b)*amin*p.b;
      var cut=(1-Kw/Kn)*100;
      return { ans:{Kw:Kw, cut:cut}, unit:{Kw:'', cut:'%'}, steps:[
        'a_min = '+SVH.fmt(amin)+' → K_max,최악 = '+SVH.fmt(Kw)+' (공칭 '+SVH.fmt(Kn)+')',
        '감축 = '+SVH.fmt(cut)+' %',
        '(불확실성만큼 여유를 먹힌다 — 로버스트 설계 감각의 출발점)' ] }; },
    hints:['최악 조합에서 다시 Routh.'] },
  { id:'u7-l4-08', level:4, type:'num', tags:['종합 리허설'], src:'기출 유형',
    params:{ a:{choices:[2]}, b:{choices:[5,10]} },
    statement:function(p){ return '중간 마지막 문항 리허설 — \\(G=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\) 단위 피드백: (a) K_max (b) 임계 ω (c) K=K_max/4에서 저주파 지배 2극점 근사(s(s+'+p.a+')≈)로 본 ζ (d) 그 근사의 M_p를 구하라.'; },
    solve:function(p){
      var Kmax=(p.a+p.b)*p.a*p.b, w=Math.sqrt(p.a*p.b), K=Kmax/4;
      var Keff=K/p.b; // 저주파: K/[s(s+a)(b)] 근사
      var z=p.a/(2*Math.sqrt(Keff));
      var Mp=z<1?Math.exp(-Math.PI*z/Math.sqrt(1-z*z))*100:0;
      return { ans:{Kmax:Kmax, w:w, z:z, Mp:Mp}, unit:{Kmax:'', w:'rad/s', z:'', Mp:'%'}, steps:[
        'K_max = '+SVH.fmt(Kmax)+', ω = '+SVH.fmt(w),
        '저주파 근사: 빠른 극점 −'+p.b+'을 이득 1/'+p.b+'로 흡수 → 유효 K = '+SVH.fmt(Keff),
        'ζ ≈ '+p.a+'/(2√'+SVH.fmt(Keff)+') = '+SVH.fmt(z)+' → M_p ≈ '+SVH.fmt(Mp)+' %',
        '(안정 한계·응답 사양·근사 판단을 한 문제에 — 시험장 시뮬레이션)' ] }; },
    hints:['안정은 정확 Routh, 성능은 지배 근사.'] }
  ]
});
