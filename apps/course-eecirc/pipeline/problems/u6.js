/* U6 1차 과도응답 — RC/RL, 시정수, 스위칭(초기·최종·τ 3종 세트), 이중 스위칭, 실험 연계 */
SV_BANK.push({
  id: 'u6', no: 6, title: '1차 과도응답 (RC·RL)', titleEn: 'First-Order Transients',
  scope: '시정수 τ=RC, L/R · 스위칭 전후 정상상태 · 테브난으로 τ 구하기 · 완전응답 v(t)=v∞+(v₀−v∞)e^{−t/τ} · 이중 스위칭 · 실험 시정수 오차',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u6-l1-01', level:1, type:'mc', tags:['시정수'], src:'교재 표준',
    statement:'RC·RL 회로의 시정수와 그 의미로 옳은 것은?',
    choices:['\\(\\tau_{RC}=RC\\), \\(\\tau_{RL}=L/R\\), 한 τ 동안 최종값까지 남은 거리의 약 63.2%를 좁힌다','\\(\\tau_{RC}=R/C\\)','τ가 지나면 정확히 절반이 된다','\\(\\tau_{RL}=RL\\)'],
    answer:0, expl:'1−e⁻¹≈0.632. 실무 규칙: 5τ면 사실상 완료(99.3%).' },
  { id:'u6-l1-02', level:1, type:'tf', tags:['초기 조건'], src:'교재 표준',
    statement:'스위칭 직후 초기값을 정할 때 쓰는 연속 조건은 \\(v_C(0^+)=v_C(0^-)\\), \\(i_L(0^+)=i_L(0^-)\\)이다.',
    answer:true, expl:'U5의 에너지 연속성에서 나온다. 나머지 변수(i_C, v_L 등)는 점프 가능 — 0⁺ 회로를 새로 그려 구한다.' },
  { id:'u6-l1-03', level:1, type:'mc', tags:['τ의 R'], src:'기출 유형',
    statement:'복잡한 회로에 축전기 하나가 달려 있을 때, 시정수 τ=R_eq·C의 R_eq는?',
    choices:['축전기 단자에서 본 테브난 저항(독립 전원 끔)','축전기와 직렬인 저항 하나','회로의 모든 저항 합','가장 큰 저항'],
    answer:0, expl:'기출 5번 풀이의 핵심 절차. C를 떼고 그 단자에서 전원 끄고 본 등가 저항이다.' },
  { id:'u6-l1-04', level:1, type:'tf', tags:['완전응답'], src:'교재 표준',
    statement:'1차 회로의 모든 응답은 \\(x(t)=x(\\infty)+[x(0^+)-x(\\infty)]e^{-t/\\tau}\\) 한 식으로 쓸 수 있다.',
    answer:true, expl:'초기값·최종값·τ 세 개만 구하면 끝 — "3종 세트" 공식. 자연응답+강제응답의 합이다.' },
  { id:'u6-l1-05', level:1, type:'mc', tags:['방전'], src:'교재 표준',
    statement:'V₀로 충전된 축전기가 저항 R로 방전할 때 옳은 것은?',
    choices:['\\(v(t)=V_0e^{-t/RC}\\)이고 초기 방전 전류는 V₀/R','전압이 선형으로 감소한다','전류가 일정하다','에너지가 보존되어 저항이 뜨거워지지 않는다'],
    answer:0, expl:'지수 감쇠. 초기 에너지 ½CV₀²는 전부 R에서 열로 소산된다(적분해 보면 정확히 일치).' },
  { id:'u6-l1-06', level:1, type:'tf', tags:['실험'], src:'기출 유형',
    statement:'실험에서 측정한 RC 시정수는 이론값과 다를 수 있는데, 원인으로 오실로스코프·함수발생기의 내부 저항, 부품 허용오차, 케이블·부유 커패시턴스 등이 있다.',
    answer:true, expl:'기말 P3(a)의 서술형 그대로 — 계측기 저항이 R_eq에 병렬/직렬로 끼어들어 τ를 바꾼다는 논리까지 쓸 수 있어야 한다.' },

  /* ---------- L2 (12) ---------- */
  { id:'u6-l2-01', level:2, type:'num', tags:['τ 계산'], src:'창작 문제(검산됨)',
    params:{ R:{choices:[1,2,4.7,10],unit:'kΩ'}, C:{choices:[10,47,100],unit:'µF'} },
    statement:function(p){ return 'R='+p.R+' kΩ, C='+p.C+' µF인 RC 회로의 시정수(ms)와 5τ(ms)를 구하라.'; },
    solve:function(p){ var tau=p.R*1000*p.C*1e-6*1000;
      return { ans:{tau:tau, t5:5*tau}, unit:{tau:'ms', t5:'ms'}, steps:[
        'τ = RC = '+SVH.fmt(p.R*1000)+'×'+SVH.fmt(p.C*1e-6)+' = '+SVH.fmt(tau)+' ms',
        '5τ = '+SVH.fmt(5*tau)+' ms (정착 완료 기준)' ] }; },
    hints:['kΩ×µF = ms — 외워 두면 빠르다.'] },
  { id:'u6-l2-02', level:2, type:'num', tags:['τ 계산 RL'], src:'창작 문제(검산됨)',
    params:{ L:{choices:[50,100,500],unit:'mH'}, R:{min:10,max:100,step:10,unit:'Ω'} },
    statement:function(p){ return 'L='+p.L+' mH, R='+p.R+' Ω인 RL 회로의 시정수는 몇 ms인가?'; },
    solve:function(p){ var tau=p.L/1000/p.R*1000;
      return { ans:tau, unit:'ms', steps:[
        'RL의 시정수: \\(\\tau = L/R\\) (RC와 달리 R이 분모)',
        'τ = '+SVH.fmt(p.L/1000)+'/'+p.R+' = '+SVH.fmt(tau)+' ms' ] }; },
    hints:['RL은 L/R — RC와 반대로 R이 분모.'] },
  { id:'u6-l2-03', level:2, type:'num', tags:['방전 평가'], src:'창작 문제(검산됨)',
    params:{ V0:{min:6,max:24,step:6,unit:'V'}, tau:{choices:[10,20,50],unit:'ms'}, t:{choices:[10,20,30],unit:'ms'} },
    statement:function(p){ return 'V₀='+p.V0+' V에서 방전하는 RC 회로(τ='+p.tau+' ms)의 t='+p.t+' ms에서의 전압은?'; },
    solve:function(p){ var v=p.V0*Math.exp(-p.t/p.tau);
      return { ans:v, unit:'V', steps:[
        'v(t) = V₀e^{−t/τ}',
        'v = '+p.V0+'×e^{−'+p.t+'/'+p.tau+'} = '+p.V0+'×'+SVH.fmt(Math.exp(-p.t/p.tau))+' = '+SVH.fmt(v)+' V' ] }; },
    hints:['지수에 −t/τ.'] },
  { id:'u6-l2-04', level:2, type:'num', tags:['충전 평가'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:5,max:20,step:5,unit:'V'}, tau:{choices:[5,10,20],unit:'ms'}, t:{choices:[5,10,15],unit:'ms'} },
    statement:function(p){ return '0 V에서 '+p.Vs+' V로 충전 중인 RC 회로(τ='+p.tau+' ms)의 t='+p.t+' ms 전압은?'; },
    solve:function(p){ var v=p.Vs*(1-Math.exp(-p.t/p.tau));
      return { ans:v, unit:'V', steps:[
        'v(t) = V_s(1−e^{−t/τ})',
        'v = '+p.Vs+'×(1−'+SVH.fmt(Math.exp(-p.t/p.tau))+') = '+SVH.fmt(v)+' V' ] }; },
    hints:['최종값 − 남은 거리.'] },
  { id:'u6-l2-05', level:2, type:'num', tags:['도달 시간'], src:'창작 문제(검산됨)',
    params:{ tau:{choices:[10,25,50],unit:'ms'}, pct:{choices:[50,90,95]} },
    statement:function(p){ return 'τ='+p.tau+' ms인 충전 회로가 최종값의 '+p.pct+'%에 도달하는 시간을 구하라.'; },
    solve:function(p){ var t=-p.tau*Math.log(1-p.pct/100);
      return { ans:t, unit:'ms', steps:[
        '1−e^{−t/τ} = '+(p.pct/100)+' → e^{−t/τ} = '+SVH.fmt(1-p.pct/100),
        't = −τ ln('+SVH.fmt(1-p.pct/100)+') = '+SVH.fmt(t)+' ms',
        (p.pct===50?'(50% 도달 = τ·ln2 ≈ 0.693τ — 반감기 공식)':'') ] }; },
    hints:['식을 t에 대해 풀어 ln.'] },
  { id:'u6-l2-06', level:2, type:'num', tags:['초기·최종'], src:'기출 유형',
    params:{ Vs:{min:10,max:20,step:5,unit:'V'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:4,max:12,step:4,unit:'Ω'} },
    statement:function(p){ return 't<0에서 스위치가 오래 닫혀 있던 회로: '+p.Vs+' V → R₁='+p.R1+' Ω → (C ∥ R₂='+p.R2+' Ω). t=0에 전원 쪽 스위치가 열린다. (a) v_C(0⁺) (b) v_C(∞)를 구하라.'; },
    solve:function(p){ var v0=p.Vs*p.R2/(p.R1+p.R2);
      return { ans:{v0:v0, vinf:0}, unit:{v0:'V', vinf:'V'}, steps:[
        't<0 정상상태(C 개방): v_C(0⁻) = 분압 '+SVH.fmt(v0)+' V = v_C(0⁺) (연속)',
        't→∞: 전원이 끊겨 R₂로 완전 방전 → v_C(∞) = 0 V' ] }; },
    hints:['0⁻ 회로와 ∞ 회로를 따로 그린다.'] },
  { id:'u6-l2-07', level:2, type:'num', tags:['RL 초기 전류'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:12,max:24,step:6,unit:'V'}, R:{min:4,max:12,step:4,unit:'Ω'} },
    statement:function(p){ return p.Vs+' V 전원과 R='+p.R+' Ω, L 직렬 회로에서 스위치가 오래 닫혀 있었다. (a) 그때 인덕터 전류 (b) 그 순간 인덕터에 걸린 전압을 구하라.'; },
    solve:function(p){ var i=p.Vs/p.R;
      return { ans:{iL:i, vL:0}, unit:{iL:'A', vL:'V'}, steps:[
        '정상상태 L = 단락 → i_L = V/R = '+SVH.fmt(i)+' A',
        'v_L = 0 V (단락이므로)' ] }; },
    hints:['정상상태 L은 전선.'] },
  { id:'u6-l2-08', level:2, type:'num', tags:['τ 설계'], src:'창작 문제(검산됨)',
    params:{ C:{choices:[10,47,100],unit:'µF'}, tau:{choices:[10,47,100],unit:'ms'} },
    statement:function(p){ return 'C='+p.C+' µF로 시정수 '+p.tau+' ms를 만들려면 R은 몇 kΩ이어야 하는가?'; },
    solve:function(p){ var R=p.tau/1000/(p.C*1e-6)/1000;
      return { ans:R, unit:'kΩ', steps:[
        'τ = RC를 R에 대해 풀면 R = τ/C',
        'R = '+SVH.fmt(p.tau/1000)+'/'+SVH.fmt(p.C*1e-6)+' = '+SVH.fmt(R*1000)+' Ω = '+SVH.fmt(R)+' kΩ' ] }; },
    hints:['τ=RC를 R로 푼다.'] },
  { id:'u6-l2-09', level:2, type:'num', tags:['남은 비율'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[1,2,3]} },
    statement:function(p){ return '방전 회로에서 t='+p.n+'τ일 때 초기 전압의 몇 %가 남아 있는가?'; },
    solve:function(p){ var r=Math.exp(-p.n)*100;
      return { ans:r, unit:'%', steps:[
        'e^{−'+p.n+'} = '+SVH.fmt(Math.exp(-p.n)),
        '남은 비율 = '+SVH.fmt(r)+' % (1τ 36.8%, 2τ 13.5%, 3τ 5.0% — 표로 외워두면 스케치가 빨라진다)' ] }; },
    hints:['e⁻ⁿ.'] },
  { id:'u6-l2-10', level:2, type:'num', tags:['0⁺ 전류'], src:'기출 유형',
    params:{ Vs:{min:10,max:20,step:5,unit:'V'}, R:{min:2,max:10,step:2,unit:'Ω'} },
    statement:function(p){ return '방전되어 있던(0 V) 축전기를 t=0에 '+p.Vs+' V 전원+R='+p.R+' Ω에 연결했다. (a) i(0⁺) (b) i(∞)를 구하라.'; },
    solve:function(p){ var i0=p.Vs/p.R;
      return { ans:{i0:i0, iinf:0}, unit:{i0:'A', iinf:'A'}, steps:[
        '0⁺: v_C 연속=0 → C가 순간 단락처럼 → i(0⁺) = V/R = '+SVH.fmt(i0)+' A',
        '∞: C 개방 → i = 0 (전류는 점프했지만 v_C는 연속이었다는 점을 확인)' ] }; },
    hints:['0⁺에서 C는 "그 순간 전압의 전지"처럼 그린다.'] },
  { id:'u6-l2-11', level:2, type:'num', tags:['에너지 소산'], src:'창작 문제(검산됨)',
    params:{ C:{choices:[100,220,470],unit:'µF'}, V0:{min:5,max:25,step:5,unit:'V'} },
    statement:function(p){ return 'C='+p.C+' µF가 V₀='+p.V0+' V에서 저항으로 완전 방전했다. 저항에서 소산된 총 에너지는 몇 mJ이며, 저항값에 따라 달라지는가? (달라지면 1, 아니면 0)'; },
    solve:function(p){ var E=0.5*p.C*1e-6*p.V0*p.V0*1000;
      return { ans:{E:E, dep:0}, unit:{E:'mJ', dep:''}, steps:[
        '에너지 보존: 소산 = 초기 저장 = ½CV₀² = '+SVH.fmt(E)+' mJ',
        'R은 "얼마나 빨리"(τ)만 정하고 총량은 못 바꾼다 → 0' ] }; },
    hints:['적분해도 되고, 보존으로 바로 가도 된다.'] },
  { id:'u6-l2-12', level:2, type:'num', tags:['그래프 역산'], src:'기출 유형',
    params:{ V0:{choices:[10,20],unit:'V'}, t1:{choices:[5,10],unit:'ms'}, frac:{choices:[0.368,0.135]} },
    statement:function(p){ return '방전 곡선에서 전압이 '+p.V0+' V로 시작해 t='+p.t1+' ms에 '+SVH.fmt(p.V0*p.frac)+' V가 되었다. 시정수를 구하라.'; },
    solve:function(p){ var tau=-p.t1/Math.log(p.frac);
      return { ans:tau, unit:'ms', steps:[
        'e^{−t₁/τ} = '+p.frac+' → τ = −t₁/ln('+p.frac+')',
        'τ = '+SVH.fmt(tau)+' ms ('+p.frac+'≈e^{−'+SVH.fmt(-Math.log(p.frac))+'})',
        '(실험 데이터에서 τ 읽는 표준법: 36.8% 지점의 시간)' ] }; },
    hints:['36.8%가 1τ, 13.5%가 2τ.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u6-l3-01', level:3, type:'num', tags:['3종 세트 풀코스'], src:'기출 유형',
    params:{ Vs:{min:12,max:24,step:6,unit:'V'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:4,max:12,step:4,unit:'Ω'}, C:{choices:[0.5,1,2],unit:'F'} },
    statement:function(p){ return 't<0: 스위치 열림, C는 0 V. t=0에 닫히며 '+p.Vs+' V → R₁='+p.R1+' Ω → (C='+p.C+' F ∥ R₂='+p.R2+' Ω). (a) v_C(∞) (b) τ (c) v_C(t) 식의 t=τ에서 값.'; },
    solve:function(p){
      var vinf=p.Vs*p.R2/(p.R1+p.R2);
      var Rt=SVH.par(p.R1,p.R2), tau=Rt*p.C;
      var vtau=vinf*(1-Math.exp(-1));
      return { ans:{vinf:vinf, tau:tau, vtau:vtau}, unit:{vinf:'V', tau:'s', vtau:'V'}, steps:[
        'v_C(∞): C 개방 → 분압 '+SVH.fmt(vinf)+' V',
        'τ: C에서 본 R_eq = R₁∥R₂ = '+SVH.fmt(Rt)+' Ω (전원 단락) → τ = '+SVH.fmt(tau)+' s',
        'v_C(t) = '+SVH.fmt(vinf)+'(1−e^{−t/'+SVH.fmt(tau)+'}) → t=τ: '+SVH.fmt(vtau)+' V (63.2%)' ] }; },
    hints:['초기 0, 최종 분압, τ는 테브난 — 3종 세트.'] },
  { id:'u6-l3-02', level:3, type:'num', tags:['방전형 3종'], src:'기출 유형',
    params:{ Vs:{min:10,max:20,step:5,unit:'V'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:4,max:12,step:4,unit:'Ω'}, C:{choices:[1,2],unit:'F'}, t1:{choices:[2,5],unit:'s'} },
    statement:function(p){ return 't<0 정상상태: '+p.Vs+' V → R₁='+p.R1+' Ω → (C='+p.C+' F ∥ R₂='+p.R2+' Ω). t=0에 전원+R₁ 가지가 분리된다. v_C(t) 식을 세우고 t='+p.t1+' s의 값을 구하라.'; },
    solve:function(p){
      var v0=p.Vs*p.R2/(p.R1+p.R2), tau=p.R2*p.C, v=v0*Math.exp(-p.t1/tau);
      return { ans:{v0:v0, tau:tau, v:v}, unit:{v0:'V', tau:'s', v:'V'}, steps:[
        'v_C(0) = 분압 '+SVH.fmt(v0)+' V',
        '분리 후 τ = R₂C = '+SVH.fmt(tau)+' s (R₁은 이제 없음!)',
        'v_C(t) = '+SVH.fmt(v0)+'e^{−t/'+SVH.fmt(tau)+'} → t='+p.t1+': '+SVH.fmt(v)+' V' ] }; },
    hints:['스위칭 전후의 회로가 다르다 — τ도 달라진다.'] },
  { id:'u6-l3-03', level:3, type:'num', tags:['RL 상승'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:12,max:24,step:6,unit:'V'}, R:{min:4,max:12,step:4,unit:'Ω'}, L:{choices:[0.2,0.5,1],unit:'H'}, t1:{choices:[50,100],unit:'ms'} },
    statement:function(p){ return 't=0에 '+p.Vs+' V 전원이 R='+p.R+' Ω, L='+p.L+' H 직렬에 연결(초기 전류 0). i(t) 식을 세우고 t='+p.t1+' ms의 전류를 구하라.'; },
    solve:function(p){
      var iinf=p.Vs/p.R, tau=p.L/p.R, i=iinf*(1-Math.exp(-p.t1/1000/tau));
      return { ans:{iinf:iinf, tau:tau*1000, i:i}, unit:{iinf:'A', tau:'ms', i:'A'}, steps:[
        'i(∞) = V/R = '+SVH.fmt(iinf)+' A, τ = L/R = '+SVH.fmt(tau*1000)+' ms',
        'i(t) = '+SVH.fmt(iinf)+'(1−e^{−t/τ})',
        't='+p.t1+' ms: i = '+SVH.fmt(i)+' A' ] }; },
    hints:['RL도 같은 3종 세트 — 변수만 i_L.'] },
  { id:'u6-l3-04', level:3, type:'num', tags:['τ만 다른 두 구간'], src:'기출 유형',
    params:{ V0:{choices:[10,20],unit:'V'}, R1:{choices:[1,2],unit:'kΩ'}, R2:{choices:[3,4],unit:'kΩ'}, C:{choices:[100,200],unit:'µF'} },
    statement:function(p){ return 'V₀='+p.V0+' V로 충전된 C='+p.C+' µF가 t=0부터 R₁='+p.R1+' kΩ로 방전하다가, 회로가 바뀌어 R₁+R₂ 직렬('+(p.R1+p.R2)+' kΩ)로 방전하게 되면 τ가 몇 배가 되는가? 또, 첫 구성에서 t=τ₁일 때 전압을 구하라.'; },
    solve:function(p){
      var ratio=(p.R1+p.R2)/p.R1, v=p.V0*Math.exp(-1);
      return { ans:{ratio:ratio, v:v}, unit:{ratio:'배', v:'V'}, steps:[
        'τ ∝ R → τ₂/τ₁ = (R₁+R₂)/R₁ = '+SVH.fmt(ratio)+'배 (느려짐)',
        't=τ₁에서 v = V₀e⁻¹ = '+SVH.fmt(v)+' V' ] }; },
    hints:['τ 비교는 R 비교다.'] },
  { id:'u6-l3-05', level:3, type:'num', tags:['일반형(0 아닌 초기·최종)'], src:'기출 유형',
    params:{ V1:{choices:[4,6],unit:'V'}, V2:{choices:[10,12],unit:'V'}, tau:{choices:[2,4],unit:'ms'}, t1:{choices:[2,4],unit:'ms'} },
    statement:function(p){ return 'v_C가 '+p.V1+' V에서 시작해 '+p.V2+' V를 향해 τ='+p.tau+' ms로 접근한다. (a) v(t) 식 (b) t='+p.t1+' ms 값 (c) '+SVH.fmt((p.V1+p.V2)/2)+' V(중간)에 도달하는 시각을 구하라.'; },
    solve:function(p){
      var v=p.V2+(p.V1-p.V2)*Math.exp(-p.t1/p.tau);
      var tmid=-p.tau*Math.log(0.5);
      return { ans:{v:v, tmid:tmid}, unit:{v:'V', tmid:'ms'}, steps:[
        'v(t) = '+p.V2+' + ('+p.V1+'−'+p.V2+')e^{−t/'+p.tau+'}',
        't='+p.t1+': '+SVH.fmt(v)+' V',
        '중간 도달 = 남은 거리 절반 → t = τ·ln2 = '+SVH.fmt(tmid)+' ms (초기·최종이 무엇이든!)' ] }; },
    hints:['일반형에 그대로 대입.','중간점은 항상 ln2·τ.'] },
  { id:'u6-l3-06', level:3, type:'num', tags:['전류 응답'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:10,max:20,step:5,unit:'V'}, R:{min:2,max:10,step:2,unit:'kΩ'}, C:{choices:[100,470],unit:'µF'}, t1:{choices:[0.5,1],unit:'s'} },
    statement:function(p){ return 't=0에 '+p.Vs+' V가 R='+p.R+' kΩ와 방전된 C='+p.C+' µF 직렬에 인가. 충전 전류 i(t) 식과 t='+p.t1+' s 값(mA)을 구하라.'; },
    solve:function(p){
      var i0=p.Vs/p.R, tau=p.R*1000*p.C*1e-6, i=i0*Math.exp(-p.t1/tau);
      return { ans:{i0:i0, i:i}, unit:{i0:'mA', i:'mA'}, steps:[
        'i(0⁺) = V/R = '+SVH.fmt(i0)+' mA, i(∞)=0 → i(t) = '+SVH.fmt(i0)+'e^{−t/τ}, τ='+SVH.fmt(tau)+' s',
        't='+p.t1+': i = '+SVH.fmt(i)+' mA',
        '(전압은 올라가고 전류는 같은 τ로 내려간다 — 둘 다 그릴 수 있어야)' ] }; },
    hints:['전류는 항상 지수 "감쇠" 쪽.'] },
  { id:'u6-l3-07', level:3, type:'num', tags:['테브난 τ'], src:'기출 유형',
    params:{ R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:4,max:12,step:4,unit:'Ω'}, R3:{min:2,max:6,step:2,unit:'Ω'}, C:{choices:[0.5,1],unit:'F'} },
    statement:function(p){ return 'C='+p.C+' F가 회로에 연결: C 단자에서 보면 R₃='+p.R3+' Ω 직렬 뒤에 (R₁='+p.R1+' Ω ∥ R₂='+p.R2+' Ω), 전원은 전압원 하나. 시정수를 구하라.'; },
    solve:function(p){ var Rt=p.R3+SVH.par(p.R1,p.R2), tau=Rt*p.C;
      return { ans:tau, unit:'s', steps:[
        '전원 단락 → R_eq = R₃ + R₁∥R₂ = '+SVH.fmt(Rt)+' Ω',
        'τ = R_eq·C = '+SVH.fmt(tau)+' s (기출 5번: R_T=6 Ω 구하는 바로 그 절차)' ] }; },
    hints:['U4 테브난 저항이 여기서 재등장.'] },
  { id:'u6-l3-08', level:3, type:'num', tags:['RL 감쇠'], src:'창작 문제(검산됨)',
    params:{ I0:{min:2,max:6,step:2,unit:'A'}, R:{min:5,max:20,step:5,unit:'Ω'}, L:{choices:[0.1,0.5],unit:'H'}, t1:{choices:[10,20],unit:'ms'} },
    statement:function(p){ return '인덕터 L='+p.L+' H에 I₀='+p.I0+' A가 흐르다가 t=0에 전원이 분리되고 R='+p.R+' Ω로만 감쇠한다. (a) i(t) (b) t='+p.t1+' ms 값 (c) 초기 저항 전압을 구하라.'; },
    solve:function(p){
      var tau=p.L/p.R, i=p.I0*Math.exp(-p.t1/1000/tau), v0=p.I0*p.R;
      return { ans:{i:i, v0:v0}, unit:{i:'A', v0:'V'}, steps:[
        'τ = L/R = '+SVH.fmt(tau*1000)+' ms → i(t) = '+p.I0+'e^{−t/τ}',
        't='+p.t1+' ms: '+SVH.fmt(i)+' A',
        'v_R(0⁺) = I₀R = '+SVH.fmt(v0)+' V (인덕터가 전류를 유지하려고 만드는 전압 — 스파크의 원리)' ] }; },
    hints:['전류 연속 → 초기 전류가 그대로 R로.'] },
  { id:'u6-l3-09', level:3, type:'num', tags:['이중 전원 최종값'], src:'창작 문제(검산됨)',
    params:{ V1:{choices:[6,12],unit:'V'}, V2:{choices:[18,24],unit:'V'}, R:{min:2,max:6,step:2,unit:'Ω'}, C:{choices:[1,2],unit:'F'} },
    statement:function(p){ return 'C가 V₁='+p.V1+' V로 충전된 상태에서, t=0에 V₂='+p.V2+' V 전원+R='+p.R+' Ω에 연결된다. (a) v_C(t) 식 (b) 전압이 '+SVH.fmt((p.V1+p.V2)/2)+' V가 되는 시각(τ 단위)을 구하라.'; },
    solve:function(p){
      var tau=p.R*p.C;
      return { ans:{tau:tau, tmid:tau*Math.LN2}, unit:{tau:'s', tmid:'s'}, steps:[
        'v(t) = '+p.V2+' + ('+p.V1+'−'+p.V2+')e^{−t/'+SVH.fmt(tau)+'}, τ=RC='+SVH.fmt(tau)+' s',
        '중간값 도달 t = τ ln2 = '+SVH.fmt(tau*Math.LN2)+' s',
        '(재충전도 같은 일반형 — 부호는 식이 알아서 처리한다)' ] }; },
    hints:['초기≠0, 최종≠0인 일반형 그대로.'] },
  { id:'u6-l3-10', level:3, type:'num', tags:['실험 오차 정량'], src:'기출 유형',
    params:{ R:{choices:[10,20,50],unit:'kΩ'}, Rs:{choices:[1,10],unit:'MΩ'}, C:{choices:[1,10],unit:'µF'} },
    statement:function(p){ return 'RC 방전 실험: R='+p.R+' kΩ, C='+p.C+' µF인데 오실로스코프 입력저항 '+p.Rs+' MΩ이 C에 병렬로 붙는다. (a) 이론 τ (b) 실측될 τ (c) 오차율(%)을 구하라. (기말 P3(a)의 정량판)'; },
    solve:function(p){
      var tau0=p.R*1000*p.C*1e-6*1000;
      var Rp=SVH.par(p.R*1000,p.Rs*1e6), tau1=Rp*p.C*1e-6*1000;
      var err=(tau0-tau1)/tau0*100;
      return { ans:{tau0:tau0, tau1:tau1, err:err}, unit:{tau0:'ms', tau1:'ms', err:'%'}, steps:[
        '이론: τ = RC = '+SVH.fmt(tau0)+' ms',
        '실측: R∥R_scope = '+SVH.fmt(Rp/1000)+' kΩ → τ = '+SVH.fmt(tau1)+' ms (더 빨리 방전)',
        '오차 = '+SVH.fmt(err)+' % — R가 클수록 계측기 영향이 커진다는 결론까지' ] }; },
    hints:['계측기 저항이 방전 경로에 병렬로 추가된다.'] },
  { id:'u6-l3-11', level:3, type:'num', tags:['도달시간 설계'], src:'창작 문제(검산됨)',
    params:{ C:{choices:[10,100],unit:'µF'}, t99:{choices:[1,5],unit:'s'} },
    statement:function(p){ return '카메라 플래시: C='+p.C+' µF를 '+p.t99+' s 안에 최종값의 99%까지 충전시키려 한다. 허용되는 최대 R(kΩ)은? (99% ≈ 4.6τ)'; },
    solve:function(p){
      var tau=p.t99/(-Math.log(0.01)), R=tau/(p.C*1e-6)/1000;
      return { ans:R, unit:'kΩ', steps:[
        '99% → e^{−t/τ}=0.01 → t = τ·ln100 = 4.605τ',
        'τ_max = '+p.t99+'/4.605 = '+SVH.fmt(tau)+' s',
        'R_max = τ/C = '+SVH.fmt(R)+' kΩ' ] }; },
    hints:['목표 %에서 필요한 τ부터.'] },
  { id:'u6-l3-12', level:3, type:'num', tags:['스위치 닫기 전류 점프'], src:'기출 유형',
    params:{ Vs:{min:12,max:24,step:6,unit:'V'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return p.Vs+' V → R₁='+p.R1+' Ω → C, 그리고 C에 병렬인 R₂='+p.R2+' Ω 스위치 가지가 t=0에 닫힌다(그 전은 정상상태). (a) v_C(0⁺) (b) 닫힌 직후 R₂의 전류 (c) v_C(∞)를 구하라.'; },
    solve:function(p){
      var v0=p.Vs; // t<0: C 개방, R1 전류 0 → vC = Vs
      var i2=v0/p.R2;
      var vinf=p.Vs*p.R2/(p.R1+p.R2);
      return { ans:{v0:v0, i2:i2, vinf:vinf}, unit:{v0:'V', i2:'A', vinf:'V'}, steps:[
        't<0: R₁ 전류 0(C 개방) → 강하 없음 → v_C(0⁻) = '+p.Vs+' V = v_C(0⁺)',
        '0⁺: R₂에 바로 '+SVH.fmt(v0)+' V → i₂(0⁺) = '+SVH.fmt(i2)+' A',
        '∞: 분압 v_C(∞) = '+SVH.fmt(vinf)+' V (전압이 "내려가는" 과도)' ] }; },
    hints:['t<0에 전류가 안 흐르면 R₁ 강하도 없다.'] },
  { id:'u6-l3-13', level:3, type:'num', tags:['두 C 병합 아님·독립 τ'], src:'창작 문제(검산됨)',
    params:{ R:{choices:[1,2],unit:'kΩ'}, C1:{choices:[10,20],unit:'µF'}, C2:{choices:[30,60],unit:'µF'} },
    statement:function(p){ return '같은 R='+p.R+' kΩ로 각각 방전하는 두 회로: C₁='+p.C1+' µF, C₂='+p.C2+' µF. 같은 시각에 시작해 C₁의 전압이 절반이 됐을 때, C₂의 전압은 초기값의 몇 %인가?'; },
    solve:function(p){
      var t=p.R*1000*p.C1*1e-6*Math.LN2;
      var frac=Math.exp(-t/(p.R*1000*p.C2*1e-6))*100;
      return { ans:frac, unit:'%', steps:[
        'C₁ 절반 시각: t = τ₁ln2 = '+SVH.fmt(t*1000)+' ms',
        'C₂: e^{−t/τ₂} = e^{−(C₁/C₂)ln2} = '+SVH.fmt(frac)+' %',
        '(큰 C가 더 천천히 — 비율만으로도 답이 나오는 구조)' ] }; },
    hints:['시각을 τ₁로 표현해 τ₂에 대입.'] },
  { id:'u6-l3-14', level:3, type:'num', tags:['펄스 응답'], src:'기출 유형',
    params:{ Vs:{choices:[5,10],unit:'V'}, tau:{choices:[1,2],unit:'ms'}, Tp:{choices:[1,2,4],unit:'ms'} },
    statement:function(p){ return 'RC 회로(τ='+p.tau+' ms)에 폭 '+p.Tp+' ms, 높이 '+p.Vs+' V의 펄스가 들어온다(그 전 0 V). (a) 펄스 끝(t=T_p)의 v_C (b) 펄스가 끝난 뒤 T_p ms 더 지난 시점의 v_C를 구하라.'; },
    solve:function(p){
      var v1=p.Vs*(1-Math.exp(-p.Tp/p.tau));
      var v2=v1*Math.exp(-p.Tp/p.tau);
      return { ans:{v1:v1, v2:v2}, unit:{v1:'V', v2:'V'}, steps:[
        '구간1(충전): v(T_p) = '+p.Vs+'(1−e^{−'+p.Tp+'/'+p.tau+'}) = '+SVH.fmt(v1)+' V',
        '구간2(방전, 초기값 '+SVH.fmt(v1)+'): v = '+SVH.fmt(v1)+'e^{−'+p.Tp+'/'+p.tau+'} = '+SVH.fmt(v2)+' V',
        '(구간을 나누고 앞 구간의 끝이 뒷 구간의 초기값 — 이중 스위칭의 원형)' ] }; },
    hints:['구간별로 3종 세트를 다시 세팅.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u6-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ τ를 구할 때 보는 저항은 C(또는 L) 단자에서의 테브난 저항이다<br>㉡ 스위칭 순간 축전기 전류는 연속이어야 한다<br>㉢ 방전에서 저항이 크면 총 소산 에너지도 커진다<br>㉣ 5τ가 지나면 응답은 사실상 정상상태다',
    choices:['㉠㉣','㉠㉡㉣','㉢㉣','전부'],
    answer:0, expl:'연속인 건 v_C(㉡ ✗). 소산 총량은 ½CV₀²로 R와 무관(㉢ ✗) — R는 속도만 바꾼다.' },
  { id:'u6-l4-02', level:4, type:'num', tags:['기출 5번 완전 재현'], src:'기출 유형',
    params:{ Vs:{choices:[20],unit:'V'}, R1:{choices:[5],unit:'Ω'}, R2:{choices:[4],unit:'Ω'}, R3:{choices:[3],unit:'Ω'}, R4:{choices:[6],unit:'Ω'}, C:{choices:[8],unit:'F'}, Is:{choices:[4],unit:'A'} },
    statement:function(p){ return '기출 5번 구조: t<0 — '+p.Vs+' V 전원(직렬 R₁='+p.R1+' Ω)이 C='+p.C+' F를 충전(다른 가지 분리, 정상상태). t=0 — 전원 분리되고 C가 [R₂='+p.R2+' Ω 직렬 후 (R₃='+p.R3+' Ω ∥ R₄='+p.R4+' Ω)] + 전류원 '+p.Is+' A(R₄ 가지 쪽에서 유입, 유입 절점은 R₃∥R₄ 위)와 연결. (a) v_C(0⁺) (b) τ (c) v_C(∞) (d) v_C(t) — t=τ 값으로 답하라.'; },
    solve:function(p){
      var v0=p.Vs; // t<0 정상상태: 전류 0 → R1 강하 0
      var Rp=SVH.par(p.R3,p.R4);
      var Rt=p.R2+Rp, tau=Rt*p.C;
      var vinf=p.Is*Rp; // C 개방: Is가 R3||R4로 → 그 전압이 C까지 (R2 전류 0)
      var vtau=vinf+(v0-vinf)*Math.exp(-1);
      return { ans:{v0:v0, tau:tau, vinf:vinf, vtau:vtau}, unit:{v0:'V', tau:'s', vinf:'V', vtau:'V'}, steps:[
        '(a) t<0: C 개방 → R₁ 전류 0 → v_C(0⁻)=V_s='+p.Vs+' V = v_C(0⁺)',
        '(b) 전류원 개방 후 C에서 본 R: R₂+(R₃∥R₄) = '+p.R2+'+'+SVH.fmt(Rp)+' = '+SVH.fmt(Rt)+' Ω → τ = '+SVH.fmt(tau)+' s',
        '(c) t→∞: C 개방 → I_s가 R₃∥R₄에 전압 '+SVH.fmt(vinf)+' V 형성, R₂ 전류 0 → v_C(∞) = '+SVH.fmt(vinf)+' V',
        '(d) v_C(t) = '+SVH.fmt(vinf)+'+('+SVH.fmt(v0)+'−'+SVH.fmt(vinf)+')e^{−t/'+SVH.fmt(tau)+'} → t=τ: '+SVH.fmt(vtau)+' V',
        '스케치: '+SVH.fmt(v0)+' V에서 '+SVH.fmt(vinf)+' V로 지수 접근 (기출 정답 흐름과 동일 구조)' ] }; },
    hints:['네 값(초기·τ·최종·식)이 각각 소문항 — 순서대로.','∞ 회로에서 R₂에 전류가 흐르는지부터 따져라.'] },
  { id:'u6-l4-03', level:4, type:'num', tags:['기말 P2형 이중 스위칭'], src:'기출 유형',
    params:{ VB:{choices:[15],unit:'V'}, R1:{choices:[1],unit:'kΩ'}, R2:{choices:[1],unit:'kΩ'}, C:{choices:[25],unit:'µF'}, ts:{choices:[50],unit:'ms'} },
    statement:function(p){ return '기말 P2 구조: t=0에 스위치가 닫혀 V_B='+p.VB+' V → R₁='+p.R1+' kΩ → (C='+p.C+' µF ∥ R₂='+p.R2+' kΩ)로 충전(초기 0 V), t='+p.ts+' ms에 스위치가 다시 열려 C가 R₂로만 방전. (a) 구간1의 τ₁·최종값 (b) v_C('+p.ts+' ms) (c) 구간2의 τ₂ (d) t='+(2*p.ts)+' ms의 v_C를 구하라.'; },
    solve:function(p){
      var R1=p.R1*1000, R2=p.R2*1000, C=p.C*1e-6;
      var tau1=SVH.par(R1,R2)*C*1000; // ms
      var vf1=p.VB*R2/(R1+R2);
      var vs=vf1*(1-Math.exp(-p.ts/tau1));
      var tau2=R2*C*1000;
      var v2=vs*Math.exp(-p.ts/tau2);
      return { ans:{tau1:tau1, vf1:vf1, vs:vs, tau2:tau2, v2:v2}, unit:{tau1:'ms', vf1:'V', vs:'V', tau2:'ms', v2:'V'}, steps:[
        '구간1: τ₁=(R₁∥R₂)C = '+SVH.fmt(tau1)+' ms, 목표값 = 분압 '+SVH.fmt(vf1)+' V',
        'v_C('+p.ts+' ms) = '+SVH.fmt(vf1)+'(1−e^{−'+p.ts+'/'+SVH.fmt(tau1)+'}) = '+SVH.fmt(vs)+' V',
        '구간2: 전원 제거 → τ₂=R₂C = '+SVH.fmt(tau2)+' ms (τ가 2배로!)',
        'v_C('+(2*p.ts)+' ms) = '+SVH.fmt(vs)+'e^{−'+p.ts+'/'+SVH.fmt(tau2)+'} = '+SVH.fmt(v2)+' V',
        '스케치: 상승(빠름)→꺾여서 하강(느림) — 두 τ가 다른 것이 채점 포인트' ] }; },
    hints:['구간마다 회로가 다르다: τ도 목표값도 다시.','구간1의 끝값이 구간2의 초기값.'] },
  { id:'u6-l4-04', level:4, type:'num', tags:['RL 스위칭 종합'], src:'기출 유형',
    params:{ Vs:{choices:[12,24],unit:'V'}, R1:{choices:[4,6],unit:'Ω'}, R2:{choices:[8,12],unit:'Ω'}, L:{choices:[2],unit:'H'} },
    statement:function(p){ return 't<0: '+p.Vs+' V → R₁='+p.R1+' Ω → L='+p.L+' H (정상상태). t=0에 전원 가지가 끊기고 L이 R₁ 대신 R₂='+p.R2+' Ω 경로로 감쇠한다. (a) i_L(0⁺) (b) τ (c) L 양단 전압의 0⁺ 값(극성 포함) (d) i가 초기의 10%가 되는 시각을 구하라.'; },
    solve:function(p){
      var i0=p.Vs/p.R1, tau=p.L/p.R2, vL0=-i0*p.R2, t10=tau*Math.log(10);
      return { ans:{i0:i0, tau:tau, vL0:vL0, t10:t10}, unit:{i0:'A', tau:'s', vL0:'V', t10:'s'}, steps:[
        'i_L(0⁺) = i_L(0⁻) = V/R₁ = '+SVH.fmt(i0)+' A',
        'τ = L/R₂ = '+SVH.fmt(tau)+' s (감쇠 경로의 R!)',
        'v_L(0⁺) = −i₀R₂ = '+SVH.fmt(vL0)+' V — 전류 유지를 위해 극성이 뒤집힌다 (|v_L|이 V_s보다 클 수 있음: 유도 킥)',
        '10%: e^{−t/τ}=0.1 → t = τln10 = '+SVH.fmt(t10)+' s' ] }; },
    hints:['τ는 "지금" 연결된 R로.','v_L 부호는 KVL로 확인.'] },
  { id:'u6-l4-05', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'RC 방전 회로의 미분방정식을 세우고 \\(v(t)=V_0e^{-t/RC}\\)를 유도하라. 충전(전원 V_s 포함)의 일반해까지 확장하라.',
    steps:[
      'KCL(방전 루프): \\(C\\dfrac{dv}{dt}+\\dfrac{v}{R}=0\\) [무엇을] C 전류 + R 전류 = 0 [왜] 외부 전원이 없으므로',
      '변수 분리: \\(\\dfrac{dv}{v}=-\\dfrac{dt}{RC}\\) → 적분 \\(\\ln v = -t/RC + K\\)',
      '초기조건 v(0)=V₀ → \\(v(t)=V_0e^{-t/RC}\\) — τ=RC가 지수에서 자연히 등장',
      '충전: \\(C\\dfrac{dv}{dt}+\\dfrac{v-V_s}{R}=0\\) → 같은 방법으로 \\(v=V_s+(V_0-V_s)e^{-t/\\tau}\\) (일반형)',
      '극한 체크: t=0 ⇒ V₀ ✓, t→∞ ⇒ V_s ✓, R→∞ ⇒ 변화 없음(개방) ✓ · 차원: RC=[Ω][F]=[s] ✓'
    ],
    hints:['KCL 한 줄 → 변수 분리.','일반형이 어떻게 나오는지가 시험 서술형 포인트.'],
    expl:'"3종 세트 공식"의 출처. 유도를 알면 이중 스위칭·펄스도 그냥 구간별 재적용이다.' },
  { id:'u6-l4-06', level:4, type:'num', tags:['설계: 타이머'], src:'창작 문제(검산됨)',
    params:{ Vs:{choices:[9,12],unit:'V'}, Vth:{choices:[6,8],unit:'V'}, C:{choices:[10,100],unit:'µF'}, td:{choices:[1,5],unit:'s'} },
    constraint:function(p){ return p.Vth<p.Vs*0.9; },
    statement:function(p){ return '타이머 설계: '+p.Vs+' V로 충전되는 RC 회로가 임계 전압 '+p.Vth+' V에 정확히 '+p.td+' s 만에 도달해야 한다. C='+p.C+' µF일 때 R(kΩ)을 구하라.'; },
    solve:function(p){
      var tau=p.td/(-Math.log(1-p.Vth/p.Vs));
      var R=tau/(p.C*1e-6)/1000;
      return { ans:R, unit:'kΩ', steps:[
        '조건: '+p.Vth+' = '+p.Vs+'(1−e^{−t_d/τ}) → e^{−t_d/τ} = '+SVH.fmt(1-p.Vth/p.Vs),
        'τ = t_d/ln('+SVH.fmt(1/(1-p.Vth/p.Vs))+') = '+SVH.fmt(tau)+' s',
        'R = τ/C = '+SVH.fmt(R)+' kΩ (555 타이머류의 실제 설계 계산)' ] }; },
    hints:['도달 조건식을 τ로 풀고 R 역산.'] },
  { id:'u6-l4-07', level:4, type:'num', tags:['에너지 수지 종합'], src:'기출 유형',
    params:{ Vs:{choices:[10,20],unit:'V'}, R:{choices:[1,2],unit:'kΩ'}, C:{choices:[100,470],unit:'µF'} },
    statement:function(p){ return '방전된 C='+p.C+' µF를 '+p.Vs+' V·R='+p.R+' kΩ로 완전 충전할 때 (a) C에 저장되는 에너지 (b) R에서 소산되는 에너지 (c) 전원이 공급한 총 에너지를 구하고, 충전 효율이 50%임을 확인하라. (mJ)'; },
    solve:function(p){
      var E=0.5*p.C*1e-6*p.Vs*p.Vs*1000;
      return { ans:{Ec:E, Er:E, Es:2*E}, unit:{Ec:'mJ', Er:'mJ', Es:'mJ'}, steps:[
        'E_C = ½CV² = '+SVH.fmt(E)+' mJ',
        '전원 공급 = ∫V_s i dt = V_s·Q = V_s·CV_s = CV² = '+SVH.fmt(2*E)+' mJ',
        'E_R = 공급 − 저장 = '+SVH.fmt(E)+' mJ — 정확히 절반. R값과 무관하게 효율 50% (놀랍지만 적분해도 같다)' ] }; },
    hints:['전원 에너지는 V_s×총 전하.','저장분을 빼면 소산분.'] },
  { id:'u6-l4-08', level:4, type:'num', tags:['미지 회로 역추정'], src:'기출 유형',
    params:{ V0:{choices:[12,15],unit:'V'}, vA:{choices:[3,5],unit:'V'}, t1:{choices:[10,20],unit:'ms'} },
    constraint:function(p){ return p.vA<p.V0*0.6; },
    statement:function(p){ return '실험 데이터: 방전 곡선이 '+p.V0+' V에서 시작, t='+p.t1+' ms에 '+p.vA+' V. (a) τ (b) C=10 µF일 때 방전 저항 R (c) t=0에서의 방전 전류를 구하라.'; },
    solve:function(p){
      var tau=p.t1/Math.log(p.V0/p.vA);
      var R=tau/1000/(10e-6)/1000; // kΩ
      var i0=p.V0/(R*1000)*1000; // mA
      return { ans:{tau:tau, R:R, i0:i0}, unit:{tau:'ms', R:'kΩ', i0:'mA'}, steps:[
        'e^{−t₁/τ} = '+p.vA+'/'+p.V0+' → τ = t₁/ln('+p.V0+'/'+p.vA+') = '+SVH.fmt(tau)+' ms',
        'R = τ/C = '+SVH.fmt(R)+' kΩ',
        'i(0) = V₀/R = '+SVH.fmt(i0)+' mA (데이터 2점이면 회로가 역추정된다 — 실험 보고서의 핵심 계산)' ] }; },
    hints:['두 점 비율에 ln.','τ에서 R, R에서 초기 전류.'] }
  ]
});
