/* U6 시간응답 — 1차계(τ·Tr·Ts), 2차계(Mp·Tp·Tr·Ts), 추가 극점·영점 효과, 지배극점 */
SV_BANK.push({
  id: 'u6', no: 6, title: '시간응답 (1·2차계)', titleEn: 'Time Response',
  scope: '1차계 τ·상승·정착 · 2차계 사양(M_p, T_p, T_s, T_r) · ζ별 응답 형태 · 추가 극점·영점 효과 · 지배극점 근사',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u6-l1-01', level:1, type:'mc', tags:['1차 사양'], src:'교재 표준',
    statement:'1차계 \\(K/(\\tau s+1)\\) 스텝 응답의 표준 수치로 옳은 것은?',
    choices:['t=τ에서 63.2%, 2% 정착 T_s≈4τ','t=τ에서 50%','T_s≈τ','t=τ에서 90%'],
    answer:0, expl:'63.2%·4τ(2%)·10~90% 상승 2.2τ — 1차계 3종 수치는 즉답으로.' },
  { id:'u6-l1-02', level:1, type:'mc', tags:['2차 사양 정의'], src:'교재 표준',
    statement:'2차계 스텝 응답 사양의 정의로 옳지 않은 것은?',
    choices:['T_p는 최종값에 도달하는 최초 시각','M_p는 (최대값−최종값)/최종값','T_s(2%)는 ±2% 띠에 들어가 머무는 시각','T_r은 보통 10→90%(또는 0→100%) 상승 시간'],
    answer:0, expl:'T_p는 "첫 봉우리(최대값)" 시각 = π/ω_d. 최종값 첫 도달과 헷갈리게 하는 함정.' },
  { id:'u6-l1-03', level:1, type:'tf', tags:['공식'], src:'교재 표준',
    statement:'부족감쇠 2차계에서 \\(T_p=\\pi/\\omega_d\\), \\(M_p=e^{-\\pi\\zeta/\\sqrt{1-\\zeta^2}}\\), \\(T_s\\approx4/(\\zeta\\omega_0)\\)이다.',
    answer:true, expl:'세 공식이 이 단원의 뼈대. M_p는 ζ만의 함수라는 점이 특히 중요(설계에서 ζ 먼저).' },
  { id:'u6-l1-04', level:1, type:'mc', tags:['극점 위치'], src:'교재 표준',
    statement:'s평면에서 극점 위치와 응답의 대응으로 옳은 것은?',
    choices:['실수부=감쇠 속도, 허수부=진동 주파수, 원점 거리=ω₀, 각도=ζ','실수부=진동','허수부=감쇠','거리=ζ'],
    answer:0, expl:'cosθ=ζ (음의 실축 기준 각). 이 지도 하나로 극점→파형을 즉시 스케치한다.' },
  { id:'u6-l1-05', level:1, type:'tf', tags:['지배극점'], src:'교재 표준',
    statement:'추가 실극점이 지배 복소극점 실수부보다 5배 이상 왼쪽에 있으면 2차 근사가 대체로 타당하다.',
    answer:true, expl:'빠른 모드는 금방 죽는다. 5배 규칙(교재 기준) — 영점이 근처에 있으면 다시 따져야 한다.' },
  { id:'u6-l1-06', level:1, type:'mc', tags:['영점 효과'], src:'교재 표준',
    statement:'좌반평면 영점이 지배극점 가까이에 있을 때 스텝 응답의 변화는?',
    choices:['오버슈트 증가·응답 빨라짐','느려짐','최종값 변화','아무 영향 없음'],
    answer:0, expl:'영점은 미분 성분을 더한다(y+ẏ/z). 우반평면 영점이면 반대로 언더슈트(역응답).' },

  /* ---------- L2 (12) ---------- */
  { id:'u6-l2-01', level:2, type:'num', tags:['1차 사양'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[2,5]}, tau:{choices:[0.2,0.5,1]} },
    statement:function(p){ return '\\(G=\\dfrac{'+p.K+'}{'+p.tau+'s+1}\\) 스텝 응답의 (a) 63.2% 도달 시각 (b) 2% 정착시간 (c) 10→90% 상승시간을 구하라.'; },
    solve:function(p){
      return { ans:{t63:p.tau, Ts:4*p.tau, Tr:2.2*p.tau}, unit:{t63:'s', Ts:'s', Tr:'s'}, steps:[
        't63 = τ = '+p.tau+' s',
        'T_s(2%) = 4τ = '+SVH.fmt(4*p.tau)+' s, T_r = 2.2τ = '+SVH.fmt(2.2*p.tau)+' s' ] }; },
    hints:['1차계 3종 수치.'] },
  { id:'u6-l2-02', level:2, type:'num', tags:['극점→τ'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,5,10]} },
    statement:function(p){ return '극점이 s=−'+p.a+'인 1차계의 (a) 시정수 (b) 정착시간(2%)을 구하라.'; },
    solve:function(p){
      return { ans:{tau:1/p.a, Ts:4/p.a}, unit:{tau:'s', Ts:'s'}, steps:[
        'τ = 1/|극점| = '+SVH.fmt(1/p.a)+' s',
        'T_s = 4/'+p.a+' = '+SVH.fmt(4/p.a)+' s (극점이 왼쪽일수록 빠르다)' ] }; },
    hints:['τ=1/a.'] },
  { id:'u6-l2-03', level:2, type:'num', tags:['Mp'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[0.3,0.5,0.7]} },
    statement:function(p){ return 'ζ='+p.z+'인 2차계의 오버슈트 M_p(%)를 구하라.'; },
    solve:function(p){ var Mp=Math.exp(-Math.PI*p.z/Math.sqrt(1-p.z*p.z))*100;
      return { ans:Mp, unit:'%', steps:[
        'M_p = e^{−πζ/√(1−ζ²)}×100 = '+SVH.fmt(Mp)+' %',
        '(0.3→37%, 0.5→16%, 0.7→4.6% — 세 점은 외워 두면 개형이 빨라진다)' ] }; },
    hints:['ζ만 들어가는 공식.'] },
  { id:'u6-l2-04', level:2, type:'num', tags:['Tp·Ts'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[0.4,0.6]}, w0:{choices:[5,10]} },
    statement:function(p){ return 'ζ='+p.z+', ω₀='+p.w0+'인 2차계의 (a) T_p (b) T_s(2%)를 구하라.'; },
    solve:function(p){
      var wd=p.w0*Math.sqrt(1-p.z*p.z);
      return { ans:{Tp:Math.PI/wd, Ts:4/(p.z*p.w0)}, unit:{Tp:'s', Ts:'s'}, steps:[
        'ω_d = '+SVH.fmt(wd)+' → T_p = π/ω_d = '+SVH.fmt(Math.PI/wd)+' s',
        'T_s = 4/(ζω₀) = '+SVH.fmt(4/(p.z*p.w0))+' s' ] }; },
    hints:['ω_d 먼저.'] },
  { id:'u6-l2-05', level:2, type:'num', tags:['분모→사양'], src:'기출 유형',
    params:{ c1:{choices:[4,6]}, c0:{choices:[25,100]} },
    statement:function(p){ return '\\(G=\\dfrac{'+p.c0+'}{s^2+'+p.c1+'s+'+p.c0+'}\\)의 (a) ζ (b) M_p(%) (c) T_s를 구하라.'; },
    solve:function(p){
      var w0=Math.sqrt(p.c0), z=p.c1/(2*w0);
      var Mp=Math.exp(-Math.PI*z/Math.sqrt(1-z*z))*100;
      return { ans:{z:z, Mp:Mp, Ts:4/(z*w0)}, unit:{z:'', Mp:'%', Ts:'s'}, steps:[
        'ω₀='+SVH.fmt(w0)+', ζ='+SVH.fmt(z),
        'M_p = '+SVH.fmt(Mp)+' %, T_s = 4/'+SVH.fmt(z*w0)+' = '+SVH.fmt(4/(z*w0))+' s' ] }; },
    hints:['계수 비교 → 공식 셋.'] },
  { id:'u6-l2-06', level:2, type:'num', tags:['극점→사양'], src:'기출 유형',
    params:{ sg:{choices:[2,3]}, wd:{choices:[4,6]} },
    statement:function(p){ return '지배극점 s=−'+p.sg+'±j'+p.wd+'인 시스템의 (a) ζ (b) M_p (c) T_p를 구하라.'; },
    solve:function(p){
      var w0=Math.hypot(p.sg,p.wd), z=p.sg/w0;
      var Mp=Math.exp(-Math.PI*p.sg/p.wd)*100;
      return { ans:{z:z, Mp:Mp, Tp:Math.PI/p.wd}, unit:{z:'', Mp:'%', Tp:'s'}, steps:[
        'ω₀ = '+SVH.fmt(w0)+', ζ = σ/ω₀ = '+SVH.fmt(z),
        'M_p = e^{−πσ/ω_d} = '+SVH.fmt(Mp)+' % (σ/ω_d 형태가 계산이 빠르다)',
        'T_p = π/ω_d = '+SVH.fmt(Math.PI/p.wd)+' s' ] }; },
    hints:['극점 성분으로 바로.'] },
  { id:'u6-l2-07', level:2, type:'num', tags:['ζ 역산'], src:'창작 문제(검산됨)',
    params:{ Mp:{choices:[5,10,25]} },
    statement:function(p){ return '오버슈트 '+p.Mp+'%를 만드는 ζ를 구하라.'; },
    solve:function(p){
      var lnM=Math.log(p.Mp/100);
      var z=-lnM/Math.sqrt(Math.PI*Math.PI+lnM*lnM);
      return { ans:z, unit:'', steps:[
        'ζ = −lnM/√(π²+ln²M)',
        '= '+SVH.fmt(z)+' (설계는 늘 이 역방향부터 시작한다)' ] }; },
    hints:['역산 공식 자체를 암기 대상으로.'] },
  { id:'u6-l2-08', level:2, type:'num', tags:['응답값 계산'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[0.5]}, w0:{choices:[2,4]}, t1:{choices:[1,2]} },
    statement:function(p){ return 'ζ='+p.z+', ω₀='+p.w0+' 2차계(단위 DC)의 스텝 응답 y('+p.t1+')을 표준 공식으로 구하라.'; },
    solve:function(p){
      var wd=p.w0*Math.sqrt(1-p.z*p.z), ph=Math.acos(p.z);
      var v=1-Math.exp(-p.z*p.w0*p.t1)/Math.sqrt(1-p.z*p.z)*Math.sin(wd*p.t1+ph);
      return { ans:v, unit:'', steps:[
        'y = 1−e^{−ζω₀t}sin(ω_dt+φ)/√(1−ζ²), φ=cos⁻¹ζ',
        't='+p.t1+': '+SVH.fmt(v) ] }; },
    hints:['라디안으로.'] },
  { id:'u6-l2-09', level:2, type:'num', tags:['과감쇠 지배 근사'], src:'창작 문제(검산됨)',
    params:{ p1:{choices:[1,2]}, k:{choices:[6,10]} },
    statement:function(p){ return '극점 −'+p.p1+', −'+(p.p1*p.k)+'인 과감쇠 2차계를 1차로 근사할 때 (a) 근사 τ (b) 근사 정착시간을 구하라.'; },
    solve:function(p){
      return { ans:{tau:1/p.p1, Ts:4/p.p1}, unit:{tau:'s', Ts:'s'}, steps:[
        '지배극점 −'+p.p1+' → τ ≈ '+SVH.fmt(1/p.p1)+' s',
        'T_s ≈ '+SVH.fmt(4/p.p1)+' s ('+p.k+'배 떨어져 있어 근사 타당)' ] }; },
    hints:['빠른 극점은 무시.'] },
  { id:'u6-l2-10', level:2, type:'num', tags:['ω₀ 스케일'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[0.5,0.7]}, k:{choices:[2,3]} },
    statement:function(p){ return '같은 ζ='+p.z+'에서 ω₀를 '+p.k+'배로 키우면 (a) M_p (b) T_p는 각각 몇 배가 되는가?'; },
    solve:function(p){
      return { ans:{Mp:1, Tp:1/p.k}, unit:{Mp:'배', Tp:'배'}, steps:[
        'M_p는 ζ만의 함수 → 1배(불변)',
        'T_p = π/ω_d ∝ 1/ω₀ → 1/'+p.k+'배',
        '(모양은 ζ, 속도는 ω₀ — 역할 분담)' ] }; },
    hints:['어떤 사양이 어떤 파라미터 소관인지.'] },
  { id:'u6-l2-11', level:2, type:'num', tags:['첫 언더슈트'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[0.3,0.5]} },
    statement:function(p){ return 'ζ='+p.z+' 2차계에서 첫 봉우리 다음의 첫 골(undershoot)의 최종값 대비 깊이(%)를 구하라. (힌트: 골은 t=2π/ω_d, 깊이 = M_p²... 아님 — e^{−2πζ/√(1−ζ²)})'; },
    solve:function(p){
      var d=Math.exp(-2*Math.PI*p.z/Math.sqrt(1-p.z*p.z))*100;
      return { ans:d, unit:'%', steps:[
        '봉우리·골의 편차는 반주기마다 e^{−πζ/√(1−ζ²)}배',
        '첫 골 깊이 = (M_p 비율)² = e^{−2πζ/√(1−ζ²)} = '+SVH.fmt(d)+' %',
        '(연속 진폭비가 일정 — U1 로그 감쇠법과 같은 구조)' ] }; },
    hints:['반주기마다 같은 비율로 준다.'] },
  { id:'u6-l2-12', level:2, type:'num', tags:['DC와 사양 분리'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[3,5]}, c1:{choices:[2,4]}, c0:{choices:[16,25]} },
    statement:function(p){ return '\\(G=\\dfrac{'+p.K+'·'+p.c0+'}{s^2+'+p.c1+'s+'+p.c0+'}\\) 스텝 응답의 (a) 최종값 (b) 최대값을 구하라.'; },
    solve:function(p){
      var w0=Math.sqrt(p.c0), z=p.c1/(2*w0);
      var Mp=Math.exp(-Math.PI*z/Math.sqrt(1-z*z));
      return { ans:{fin:p.K, peak:p.K*(1+Mp)}, unit:{fin:'', peak:''}, steps:[
        '최종값 = G(0) = '+p.K,
        'ζ='+SVH.fmt(z)+' → M_p='+SVH.fmt(Mp*100)+'% → 최대값 = '+p.K+'(1+'+SVH.fmt(Mp)+') = '+SVH.fmt(p.K*(1+Mp)),
        '(오버슈트는 최종값 기준 비율)' ] }; },
    hints:['DC 이득과 M_p를 곱으로 결합.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u6-l3-01', level:3, type:'num', tags:['사양 풀세트'], src:'기출 유형',
    params:{ c1:{choices:[4,8]}, c0:{choices:[64,100]} },
    statement:function(p){ return '\\(G=\\dfrac{'+p.c0+'}{s^2+'+p.c1+'s+'+p.c0+'}\\)의 (a) M_p (b) T_p (c) T_s(2%) (d) 대략 상승시간 T_r≈1.8/ω₀(ζ≈0.5 근방 근사)를 구하라.'; },
    solve:function(p){
      var w0=Math.sqrt(p.c0), z=p.c1/(2*w0), wd=w0*Math.sqrt(1-z*z);
      var Mp=Math.exp(-Math.PI*z/Math.sqrt(1-z*z))*100;
      return { ans:{Mp:Mp, Tp:Math.PI/wd, Ts:8/p.c1, Tr:1.8/w0}, unit:{Mp:'%', Tp:'s', Ts:'s', Tr:'s'}, steps:[
        'ω₀='+SVH.fmt(w0)+', ζ='+SVH.fmt(z)+', ω_d='+SVH.fmt(wd),
        'M_p='+SVH.fmt(Mp)+'%, T_p='+SVH.fmt(Math.PI/wd)+' s',
        'T_s=4/(ζω₀)=8/c₁='+SVH.fmt(8/p.c1)+' s, T_r≈'+SVH.fmt(1.8/w0)+' s' ] }; },
    hints:['네 사양을 한 표로.'] },
  { id:'u6-l3-02', level:3, type:'num', tags:['설계: 분모 결정'], src:'기출 유형',
    params:{ Mp:{choices:[10,20],unit:'%'}, Ts:{choices:[1,2],unit:'s'} },
    statement:function(p){ return '요구: M_p≤'+p.Mp+'%, T_s≤'+p.Ts+' s (2%). 경계 설계의 (a) ζ (b) ω₀ (c) 특성다항식 계수 c₁·c₀를 구하라.'; },
    solve:function(p){
      var lnM=Math.log(p.Mp/100);
      var z=-lnM/Math.sqrt(Math.PI*Math.PI+lnM*lnM);
      var w0=4/(p.Ts*z);
      return { ans:{z:z, w0:w0, c1:2*z*w0, c0:w0*w0}, unit:{z:'', w0:'rad/s', c1:'', c0:''}, steps:[
        'ζ = '+SVH.fmt(z)+' (M_p 역산)',
        'ζω₀ = 4/T_s → ω₀ = '+SVH.fmt(w0),
        '분모: s²+'+SVH.fmt(2*z*w0)+'s+'+SVH.fmt(w0*w0) ] }; },
    hints:['ζ 먼저, 그다음 ω₀.'] },
  { id:'u6-l3-03', level:3, type:'num', tags:['추가 극점 정량'], src:'기출 유형',
    params:{ sg:{choices:[1,2]}, wd:{choices:[3,4]}, k:{choices:[2,5,10]} },
    statement:function(p){ return '지배극점 −'+p.sg+'±j'+p.wd+'에 실극점 −'+p.sg*5*1+'... 대신 −'+p.sg+'×'+p.k+' 위치의 극점 추가. (a) 극점비 (b) 2차 근사 타당 여부(1/0) (c) 근사 시 M_p를 구하라.'; },
    solve:function(p){
      var Mp=Math.exp(-Math.PI*p.sg/p.wd)*100;
      return { ans:{ratio:p.k, ok:p.k>=5?1:0, Mp:Mp}, unit:{ratio:'배', ok:'', Mp:'%'}, steps:[
        '극점비 = '+p.k+'배 → '+(p.k>=5?'5배 규칙 충족: 근사 타당(1)':'5배 미만: 근사 주의(0) — 실제 응답은 더 느리고 M_p 감소'),
        '2차 근사 M_p = e^{−πσ/ω_d} = '+SVH.fmt(Mp)+' %' ] }; },
    hints:['5배 규칙 + 추가 극점은 응답을 누른다.'] },
  { id:'u6-l3-04', level:3, type:'num', tags:['영점 효과 정량'], src:'기출 유형',
    params:{ z:{choices:[0.5]}, w0:{choices:[2]}, zz:{choices:[1,2,10]} },
    statement:function(p){ return '\\(G=\\dfrac{\\omega_0^2(s/'+p.zz+'+1)}{s^2+2ζω_0s+ω_0^2}\\) (ζ='+p.z+', ω₀='+p.w0+'). 응답은 y₀(무영점 응답)+ẏ₀/'+p.zz+'. t=T_p(무영점 기준)에서 미분항이 0임을 이용해, 영점이 최대값을 바꾸는 방향과 t=0.5에서 ẏ₀/'+p.zz+' 항의 값을 구하라.'; },
    solve:function(p){
      var wd=p.w0*Math.sqrt(1-p.z*p.z);
      // y0' (스텝응답 미분 = 임펄스 응답) = w0/√(1-ζ²) e^{-ζw0t} sin wd t
      var t1=0.5;
      var yd=p.w0/Math.sqrt(1-p.z*p.z)*Math.exp(-p.z*p.w0*t1)*Math.sin(wd*t1)/p.zz;
      return { ans:yd, unit:'', steps:[
        'ẏ₀ = ω₀e^{−ζω₀t}sin(ω_dt)/√(1−ζ²) (임펄스 응답)',
        't=0.5: 기여 = '+SVH.fmt(yd)+' (양수 → 응답을 들어올림 = 오버슈트 증가)',
        '영점이 멀수록(1/z 작음) 기여↓ — z='+p.zz+'는 '+(p.zz>=10?'무시 가능':'뚜렷한 효과') ] }; },
    hints:['영점 = 원응답+미분/z.'] },
  { id:'u6-l3-05', level:3, type:'num', tags:['우반평면 영점'], src:'기출 유형',
    params:{ z:{choices:[0.5]}, w0:{choices:[2]}, zz:{choices:[1,2]} },
    statement:function(p){ return '위와 같으나 영점이 우반평면(+'+p.zz+'): y = y₀ − ẏ₀/'+p.zz+'. (a) 초기 미분 ẏ(0⁺)의 부호 (b) t=0.3에서 y를 구하라. (역응답 확인)'; },
    solve:function(p){
      var wd=p.w0*Math.sqrt(1-p.z*p.z), t1=0.3, ph=Math.acos(p.z);
      var y0=1-Math.exp(-p.z*p.w0*t1)/Math.sqrt(1-p.z*p.z)*Math.sin(wd*t1+ph);
      var yd=p.w0/Math.sqrt(1-p.z*p.z)*Math.exp(-p.z*p.w0*t1)*Math.sin(wd*t1);
      var y=y0-yd/p.zz;
      return { ans:{sgn:-1, y:y}, unit:{sgn:'', y:''}, steps:[
        'ẏ(0⁺) = ẏ₀(0)−ÿ₀(0)/z... 초기 기울기 부호 = 음(−1): 목표 반대로 먼저 움직인다',
        't=0.3: y = '+SVH.fmt(y0)+'−'+SVH.fmt(yd/p.zz)+' = '+SVH.fmt(y),
        '(비최소위상: 자전거 핸들·보일러 수위의 그 현상)' ] }; },
    hints:['빼기 부호가 역응답을 만든다.'] },
  { id:'u6-l3-06', level:3, type:'num', tags:['폐루프 K→사양'], src:'기출 유형',
    params:{ a:{choices:[2,4]}, K:{choices:[16,36]} },
    statement:function(p){ return '단위 피드백, \\(G=\\dfrac{'+p.K+'}{s(s+'+p.a+')}\\) 폐루프의 (a) ζ (b) M_p (c) K를 4배로 올리면 M_p는 어떻게 변하는지(새 값)를 구하라.'; },
    solve:function(p){
      function mp(K){ var z=p.a/(2*Math.sqrt(K)); return Math.exp(-Math.PI*z/Math.sqrt(1-z*z))*100; }
      var z=p.a/(2*Math.sqrt(p.K));
      return { ans:{z:z, Mp:mp(p.K), Mp4:mp(4*p.K)}, unit:{z:'', Mp:'%', Mp4:'%'}, steps:[
        'ζ = a/(2√K) = '+SVH.fmt(z)+' → M_p = '+SVH.fmt(mp(p.K))+' %',
        'K 4배 → ζ 절반 → M_p = '+SVH.fmt(mp(4*p.K))+' %',
        '(이득↑ = 빠르지만 요동↑ — 제어 설계 갈등의 원형)' ] }; },
    hints:['ζ∝1/√K.'] },
  { id:'u6-l3-07', level:3, type:'num', tags:['측정→사양 역산'], src:'기출 유형',
    params:{ peak:{choices:[1.25,1.4]}, Tp:{choices:[0.5,1]} },
    statement:function(p){ return '스텝 응답 실측: 최대 '+p.peak+'(최종 1), 봉우리 시각 '+p.Tp+' s. (a) ζ (b) ω₀ (c) T_s(2%)를 구하라.'; },
    solve:function(p){
      var lnM=Math.log(p.peak-1);
      var z=-lnM/Math.sqrt(Math.PI*Math.PI+lnM*lnM);
      var wd=Math.PI/p.Tp, w0=wd/Math.sqrt(1-z*z);
      return { ans:{z:z, w0:w0, Ts:4/(z*w0)}, unit:{z:'', w0:'rad/s', Ts:'s'}, steps:[
        'M_p = '+SVH.fmt((p.peak-1)*100)+'% → ζ = '+SVH.fmt(z),
        'ω_d = π/T_p = '+SVH.fmt(wd)+' → ω₀ = '+SVH.fmt(w0),
        'T_s = 4/(ζω₀) = '+SVH.fmt(4/(z*w0))+' s' ] }; },
    hints:['측정 2개 → 파라미터 2개.'] },
  { id:'u6-l3-08', level:3, type:'num', tags:['정착 대역 비교'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[0.5,0.6]}, w0:{choices:[4,8]} },
    statement:function(p){ return 'ζ='+p.z+', ω₀='+p.w0+'에서 (a) 2% 정착 (b) 5% 정착(≈3/(ζω₀))의 시간을 구하고 비율을 확인하라.'; },
    solve:function(p){
      var s2=4/(p.z*p.w0), s5=3/(p.z*p.w0);
      return { ans:{Ts2:s2, Ts5:s5}, unit:{Ts2:'s', Ts5:'s'}, steps:[
        'T_s(2%) = '+SVH.fmt(s2)+' s, T_s(5%) = '+SVH.fmt(s5)+' s',
        '비 = 4:3 (ln50 vs ln20의 근사 — 기준을 문제에서 확인하는 습관!)' ] }; },
    hints:['4/ζω₀ vs 3/ζω₀.'] },
  { id:'u6-l3-09', level:3, type:'num', tags:['1차+지연 근사'], src:'창작 문제(검산됨)',
    params:{ tau:{choices:[1,2]}, k:{choices:[5,10]} },
    statement:function(p){ return '극점 −1/'+p.tau+'과 −'+p.k+'/'+p.tau+'의 2극점계(DC 1). 정확 정착시간은 지배극점 기준 4'+p.tau+'보다 약간 크다. 빠른 극점의 τ₂와, 근사 정착시간에 τ₂를 더한 보정 추정치를 구하라.'; },
    solve:function(p){
      var t2=p.tau/p.k;
      return { ans:{t2:t2, Ts:4*p.tau+t2}, unit:{t2:'s', Ts:'s'}, steps:[
        'τ₂ = '+SVH.fmt(t2)+' s',
        '보정 T_s ≈ 4τ₁+τ₂ = '+SVH.fmt(4*p.tau+t2)+' s (엔지니어링 룰)',
        '(빠른 모드는 "지연"처럼 더해진다)' ] }; },
    hints:['빠른 모드의 기여를 지연으로.'] },
  { id:'u6-l3-10', level:3, type:'num', tags:['진동 수 세기'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[0.2,0.4]} },
    statement:function(p){ return 'ζ='+p.z+' 2차계가 2% 정착 전까지 보이는 진동(봉우리) 개수를 추정하라: N ≈ T_s/T_주기 = (4/ζω₀)/(2π/ω_d).'; },
    solve:function(p){
      var N=4*Math.sqrt(1-p.z*p.z)/(2*Math.PI*p.z);
      return { ans:N, unit:'개', steps:[
        'N = (4/ζω₀)·(ω_d/2π) = 4√(1−ζ²)/(2πζ)',
        '= '+SVH.fmt(N)+' (ω₀와 무관! ζ만이 "몇 번 흔들리는가"를 정한다)' ] }; },
    hints:['정착시간/주기.'] },
  { id:'u6-l3-11', level:3, type:'num', tags:['ζ별 형태 판정'], src:'기출 유형',
    params:{ c1:{choices:[4,10,20]}, c0:{choices:[25]} },
    statement:function(p){ return '\\(s^2+'+p.c1+'s+'+p.c0+'\\)의 응답 형태를 판정하고(부족=−1/임계=0/과=1), 부족감쇠면 M_p, 과감쇠면 두 시정수를 구하라. (해당 없는 값은 0)'; },
    solve:function(p){
      var w0=Math.sqrt(p.c0), z=p.c1/(2*w0);
      if(z<0.999){ var Mp=Math.exp(-Math.PI*z/Math.sqrt(1-z*z))*100;
        return { ans:{t:-1, Mp:Mp, tau1:0, tau2:0}, unit:{t:'',Mp:'%',tau1:'',tau2:''}, steps:[
          'ζ='+SVH.fmt(z)+'<1 부족감쇠(−1)','M_p = '+SVH.fmt(Mp)+' %'] }; }
      if(z>1.001){ var D=Math.sqrt(p.c1*p.c1-4*p.c0);
        var r1=(p.c1-D)/2, r2=(p.c1+D)/2;
        return { ans:{t:1, Mp:0, tau1:1/r1, tau2:1/r2}, unit:{t:'',Mp:'',tau1:'s',tau2:'s'}, steps:[
          'ζ='+SVH.fmt(z)+'>1 과감쇠(1)','τ = '+SVH.fmt(1/r1)+', '+SVH.fmt(1/r2)+' s'] }; }
      return { ans:{t:0, Mp:0, tau1:2/p.c1, tau2:2/p.c1}, unit:{t:'',Mp:'',tau1:'s',tau2:'s'}, steps:['ζ=1 임계(0)','중근 τ = '+SVH.fmt(2/p.c1)] }; },
    hints:['ζ 계산 후 분기.'] },
  { id:'u6-l3-12', level:3, type:'num', tags:['첫 도달 시각'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[0.5,0.707]}, w0:{choices:[2,4]} },
    statement:function(p){ return 'ζ='+p.z+', ω₀='+p.w0+' 2차계가 최종값을 "처음" 통과하는 시각(=100% 상승시간) \\(T=\\dfrac{\\pi-\\cos^{-1}\\zeta}{\\omega_d}\\)을 구하라.'; },
    solve:function(p){
      var wd=p.w0*Math.sqrt(1-p.z*p.z);
      var T=(Math.PI-Math.acos(p.z))/wd;
      return { ans:T, unit:'s', steps:[
        'ω_d = '+SVH.fmt(wd)+', cos⁻¹ζ = '+SVH.fmt(Math.acos(p.z))+' rad',
        'T = (π−'+SVH.fmt(Math.acos(p.z))+')/'+SVH.fmt(wd)+' = '+SVH.fmt(T)+' s',
        '(T_p의 절반보다 조금 큰 시각 — sin 위상으로 유도된다)' ] }; },
    hints:['y=1 ⇔ sin(ω_dt+φ)=0.'] },
  { id:'u6-l3-13', level:3, type:'num', tags:['모터 위치 서보'], src:'기출 유형',
    params:{ Kv:{choices:[8,10]}, Kp:{choices:[4,16]} },
    statement:function(p){ return 'U4의 이중 루프 서보(분모 s²+K_v s+K_pK_v, K_v='+p.Kv+', K_p='+p.Kp+')의 (a) ζ (b) T_s (c) 오버슈트 존재 여부(1/0)를 구하라.'; },
    solve:function(p){
      var w0=Math.sqrt(p.Kp*p.Kv), z=p.Kv/(2*w0);
      return { ans:{z:z, Ts:8/p.Kv, osc:z<1?1:0}, unit:{z:'', Ts:'s', osc:''}, steps:[
        'ω₀='+SVH.fmt(w0)+', ζ='+SVH.fmt(z),
        'T_s = 4/(ζω₀) = 8/K_v = '+SVH.fmt(8/p.Kv)+' s (K_v만으로 결정!)',
        (z<1?'ζ<1 → 오버슈트 있음(1)':'ζ≥1 → 없음(0)') ] }; },
    hints:['ζω₀=K_v/2 — 정착이 내부 이득 소관.'] },
  { id:'u6-l3-14', level:3, type:'num', tags:['임계감쇠 최속'], src:'창작 문제(검산됨)',
    params:{ w0:{choices:[2,5]}, t1:{choices:[1]} },
    statement:function(p){ return '임계감쇠(ζ=1, ω₀='+p.w0+') 스텝 응답 \\(y=1-(1+\\omega_0t)e^{-\\omega_0t}\\)의 t='+p.t1+' 값과, 90% 도달 시각의 근사(≈3.9/ω₀)를 구하라.'; },
    solve:function(p){
      var v=1-(1+p.w0*p.t1)*Math.exp(-p.w0*p.t1);
      return { ans:{y:v, t90:3.9/p.w0}, unit:{y:'', t90:'s'}, steps:[
        'y('+p.t1+') = 1−(1+'+SVH.fmt(p.w0*p.t1)+')e^{−'+SVH.fmt(p.w0*p.t1)+'} = '+SVH.fmt(v),
        't90 ≈ 3.9/ω₀ = '+SVH.fmt(3.9/p.w0)+' s (무진동 중 가장 빠른 형태)' ] }; },
    hints:['(1+ω₀t)e^{−ω₀t} 꼴이 임계의 지문.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u6-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ M_p는 ζ만의 함수다<br>㉡ T_s≈4/(ζω₀)는 극점 실수부만으로 정해진다<br>㉢ 우반평면 영점은 역응답(초기 반대 방향)을 일으킨다<br>㉣ 추가 좌반평면 극점은 응답을 느리게 하고 오버슈트를 줄이는 경향이 있다',
    choices:['전부','㉠㉡㉢','㉠㉢㉣','㉡㉣'],
    answer:0, expl:'전부 참. ㉡: ζω₀=|실수부|. 네 명제가 곧 "극영점 지도 읽기"다.' },
  { id:'u6-l4-02', level:4, type:'num', tags:['HW 종합: K 설계'], src:'기출 유형',
    params:{ a:{choices:[4,6]}, Mp:{choices:[10,15],unit:'%'} },
    statement:function(p){ return '단위 피드백 \\(G=\\dfrac{K}{s(s+'+p.a+')}\\)에서 M_p='+p.Mp+'%가 되도록 K를 정하고, 그때 (a) K (b) T_p (c) T_s를 구하라.'; },
    solve:function(p){
      var lnM=Math.log(p.Mp/100);
      var z=-lnM/Math.sqrt(Math.PI*Math.PI+lnM*lnM);
      var w0=p.a/(2*z), K=w0*w0;
      var wd=w0*Math.sqrt(1-z*z);
      return { ans:{K:K, Tp:Math.PI/wd, Ts:8/p.a}, unit:{K:'', Tp:'s', Ts:'s'}, steps:[
        'ζ = '+SVH.fmt(z)+' (M_p 역산), 2ζω₀='+p.a+' → ω₀='+SVH.fmt(w0),
        'K = ω₀² = '+SVH.fmt(K),
        'T_p = π/ω_d = '+SVH.fmt(Math.PI/wd)+' s, T_s = 8/'+p.a+' = '+SVH.fmt(8/p.a)+' s (a 고정이라 K로는 못 바꾼다!)' ] }; },
    hints:['ζ→ω₀→K 순서.','T_s가 K와 무관함을 지적하면 가산점 감각.'] },
  { id:'u6-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'부족감쇠 2차계 스텝 응답에서 \\(T_p=\\pi/\\omega_d\\)와 \\(M_p=e^{-\\pi\\zeta/\\sqrt{1-\\zeta^2}}\\)를 유도하라.',
    steps:[
      '스텝 응답: \\(y=1-\\dfrac{e^{-\\zeta\\omega_0t}}{\\sqrt{1-\\zeta^2}}\\sin(\\omega_dt+\\phi)\\), \\(\\phi=\\cos^{-1}\\zeta\\) [왜] U2 역변환 결과를 출발점으로',
      '극값: \\(\\dot y=\\dfrac{\\omega_0}{\\sqrt{1-\\zeta^2}}e^{-\\zeta\\omega_0t}\\sin\\omega_dt=0\\) → \\(\\omega_dt=n\\pi\\) — 미분하면 위상항이 깨끗이 사라지는 것이 포인트',
      '첫 봉우리 n=1: \\(T_p=\\pi/\\omega_d\\)',
      '대입: \\(y(T_p)=1+e^{-\\zeta\\omega_0\\pi/\\omega_d}\\) → \\(M_p=e^{-\\pi\\zeta/\\sqrt{1-\\zeta^2}}\\) (ζω₀/ω_d=ζ/√(1−ζ²))',
      '극한 체크: ζ→0 ⇒ M_p→1(100%) ✓ · ζ→1 ⇒ M_p→0 ✓ · 차원: 지수 무차원 ✓'
    ],
    hints:['미분에서 sin항만 남는 것을 확인.','ζω₀T_p를 ζ/√(1−ζ²)π로 정리.'],
    expl:'중간 서술형 1순위 후보 — 매년 어느 학교든 낸다.' },
  { id:'u6-l4-04', level:4, type:'num', tags:['3극점 실응답'], src:'기출 유형',
    params:{ sg:{choices:[1]}, wd:{choices:[2,3]}, p3:{choices:[2,10]} },
    statement:function(p){ return '극점 −'+p.sg+'±j'+p.wd+'와 −'+p.p3+' (DC 1). t=1에서 (a) 2차 근사 응답 (b) 3차 정확 응답의 빠른 모드 항 크기(잔차 근사 R≈ω₀²/(ω₀²−...) 생략, 단순히 e^{−'+p.p3+'t}의 크기)를 구해 근사 오차 감을 잡아라.'; },
    solve:function(p){
      var w0=Math.hypot(p.sg,p.wd), z=p.sg/w0, ph=Math.acos(z);
      var y2=1-Math.exp(-p.sg)/Math.sqrt(1-z*z)*Math.sin(p.wd+ph);
      var fast=Math.exp(-p.p3);
      return { ans:{y2:y2, fast:fast}, unit:{y2:'', fast:''}, steps:[
        '2차 근사: y(1) ≈ '+SVH.fmt(y2),
        '빠른 모드 스케일 e^{−'+p.p3+'} = '+SVH.fmt(fast)+' → '+(fast<0.01?'무시 가능(5배 규칙의 실감)':'무시 곤란: 근사 오차 유의'),
        '(근사의 좋고 나쁨을 수치로 감각하기)' ] }; },
    hints:['빠른 모드의 e^{−pt}만 봐도 감이 온다.'] },
  { id:'u6-l4-05', level:4, type:'num', tags:['속도 피드백 설계 종합'], src:'기출 유형',
    params:{ K:{choices:[100]}, a:{choices:[2]}, Mp:{choices:[5,10],unit:'%'} },
    statement:function(p){ return '단위 피드백+속도 피드백 h: 분모 s²+('+p.a+'+'+p.K+'h)s+'+p.K+'. M_p='+p.Mp+'%가 되는 h와 그때 T_s를 구하라.'; },
    solve:function(p){
      var lnM=Math.log(p.Mp/100);
      var z=-lnM/Math.sqrt(Math.PI*Math.PI+lnM*lnM);
      var w0=Math.sqrt(p.K);
      var h=(2*z*w0-p.a)/p.K;
      return { ans:{h:h, Ts:4/(z*w0)}, unit:{h:'', Ts:'s'}, steps:[
        'ζ 요구 = '+SVH.fmt(z)+', ω₀ = √K = '+SVH.fmt(w0),
        'h = (2ζω₀−'+p.a+')/K = '+SVH.fmt(h),
        'T_s = 4/(ζω₀) = '+SVH.fmt(4/(z*w0))+' s (h가 감쇠를 "제조"한다)' ] }; },
    hints:['U4-l3-04와 같은 틀, 사양이 %로 온 것뿐.'] },
  { id:'u6-l4-06', level:4, type:'num', tags:['두 설계 비교'], src:'기출 유형',
    params:{ w0:{choices:[4]}, zA:{choices:[0.4]}, zB:{choices:[0.8]} },
    statement:function(p){ return '같은 ω₀='+p.w0+'의 두 설계 A(ζ='+p.zA+')·B(ζ='+p.zB+'). 각 (a) M_p (b) T_s를 구하고, "봉우리 빠름"과 "정착 빠름" 중 어느 쪽이 어느 설계인지 판정하라. (T_p 값 비교로)'; },
    solve:function(p){
      function specs(z){ var wd=p.w0*Math.sqrt(1-z*z);
        return {Mp:Math.exp(-Math.PI*z/Math.sqrt(1-z*z))*100, Ts:4/(z*p.w0), Tp:Math.PI/wd}; }
      var A=specs(p.zA), B=specs(p.zB);
      return { ans:{MpA:A.Mp, TsA:A.Ts, MpB:B.Mp, TsB:B.Ts}, unit:{MpA:'%',TsA:'s',MpB:'%',TsB:'s'}, steps:[
        'A: M_p='+SVH.fmt(A.Mp)+'%, T_s='+SVH.fmt(A.Ts)+' s, T_p='+SVH.fmt(A.Tp)+' s',
        'B: M_p='+SVH.fmt(B.Mp)+'%, T_s='+SVH.fmt(B.Ts)+' s, T_p='+SVH.fmt(B.Tp)+' s',
        'A가 봉우리는 빠르지만 요동으로 정착 손해, B가 정착 우세 — "빠르다"는 말은 사양을 정해야 성립' ] }; },
    hints:['사양별로 승자가 다르다.'] },
  { id:'u6-l4-07', level:4, type:'num', tags:['영점+2차 최대값'], src:'기출 유형',
    params:{ zz:{choices:[1,3]} },
    statement:function(p){ return 'ζ=0.5, ω₀=2, 영점 −'+p.zz+'인 \\(G=\\dfrac{4(s/'+p.zz+'+1)}{s^2+2s+4}\\)의 스텝 응답을 t=0~3에서 0.05 간격으로 훑어 최대값을 구하라(수치 탐색 — 리롤마다 재계산).'; },
    solve:function(p){
      var z=0.5, w0=2, wd=w0*Math.sqrt(1-z*z), ph=Math.acos(z);
      var best=0;
      for(var t=0;t<=3.0001;t+=0.05){
        var y0=1-Math.exp(-z*w0*t)/Math.sqrt(1-z*z)*Math.sin(wd*t+ph);
        var yd=w0/Math.sqrt(1-z*z)*Math.exp(-z*w0*t)*Math.sin(wd*t);
        var y=y0+yd/p.zz;
        if(y>best) best=y;
      }
      return { ans:best, unit:'', steps:[
        'y(t) = y₀(t)+ẏ₀(t)/'+p.zz+' 를 격자 탐색',
        '최대 ≈ '+SVH.fmt(best)+' (무영점 M_p=16.3%·최대 1.163과 비교 — 영점이 봉우리를 키운다)',
        '(수치 탐색도 어엿한 도구 — 공식이 없는 조합은 계산기가 정석)' ] }; },
    hints:['격자 계산 — 표를 만들며.'] },
  { id:'u6-l4-08', level:4, type:'num', tags:['사양 지도(허용 영역)'], src:'기출 유형',
    params:{ Ts:{choices:[2,4],unit:'s'}, Mp:{choices:[10,20],unit:'%'}, wdmax:{choices:[5]} },
    statement:function(p){ return '요구: T_s≤'+p.Ts+' s, M_p≤'+p.Mp+'%. s평면 허용 영역의 (a) 실수부 경계 σ_min (b) 각도 경계 θ_max(음의 실축 기준, cosθ=ζ) (c) 그 경계에서 ω_d 최대(σ_min·tanθ_max)를 구하라.'; },
    solve:function(p){
      var sg=4/p.Ts;
      var lnM=Math.log(p.Mp/100);
      var z=-lnM/Math.sqrt(Math.PI*Math.PI+lnM*lnM);
      var th=Math.acos(z);
      var wd=sg*Math.tan(th);
      return { ans:{sg:sg, th:SVH.deg(th), wd:wd}, unit:{sg:'1/s', th:'°', wd:'rad/s'}, steps:[
        'σ ≥ 4/T_s = '+SVH.fmt(sg),
        'ζ ≥ '+SVH.fmt(z)+' → θ ≤ '+SVH.fmt(SVH.deg(th))+'°',
        '경계 교차점에서 ω_d = σtanθ = '+SVH.fmt(wd)+' rad/s',
        '(수직선+부채꼴의 교집합 — 기말 근궤적 설계의 목표 영역이 이 그림)' ] }; },
    hints:['두 사양 = 두 기하 제약.'] }
  ]
});
