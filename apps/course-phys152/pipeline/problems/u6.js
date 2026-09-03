/* U6 자기장과 자기력 — 로런츠 힘, 원운동, 속도선택기, 질량분석, 홀, 도선 힘·토크 (W6) */
SV_BANK.push({
  id: 'u6', no: 6, title: '자기장과 자기력', titleEn: 'Magnetic Fields & Forces',
  scope: '로런츠 힘 F=qv×B · 원운동·사이클로트론 · 속도 선택기 · 질량분석기 · 홀 효과 · 전류 도선의 힘 F=IL×B · 자기 쌍극자 토크',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u6-l1-01', level:1, type:'mc', tags:['로런츠 힘'], src:'교재 표준',
    statement:'자기력 \\(\\vec F=q\\vec v\\times\\vec B\\)의 성질로 옳지 않은 것은?',
    choices:['속력을 바꿔 운동에너지를 증가시킨다','v와 B 모두에 수직이다','정지 전하에는 작용하지 않는다','v∥B이면 0이다'],
    answer:0, expl:'F⊥v → 일을 못 한다 → 속력 불변·방향만 변경. "자기력은 일을 안 한다"가 최중요 명제.' },
  { id:'u6-l1-02', level:1, type:'tf', tags:['단위'], src:'교재 표준',
    statement:'자기장 단위 테슬라는 1 T = 1 N/(A·m) = 10⁴ G이며, 지구 자기장은 ~0.5 G(5×10⁻⁵ T) 수준이다.',
    answer:true, expl:'1 T는 큰 장(MRI 1.5~3 T). 오더 감각: 냉장고 자석 ~10⁻² T.' },
  { id:'u6-l1-03', level:1, type:'mc', tags:['원운동'], src:'교재 표준',
    statement:'균일 B에 수직 입사한 대전입자의 원운동 반지름과 주기는?',
    choices:['r=mv/qB, T=2πm/qB (T는 속력 무관!)','r=qB/mv','T가 빠를수록 길다','r는 B에 비례'],
    answer:0, expl:'주기의 속력 무관성 = 사이클로트론의 존재 이유. f=qB/2πm.' },
  { id:'u6-l1-04', level:1, type:'mc', tags:['속도 선택기'], src:'교재 표준',
    statement:'E와 B가 수직으로 겹친 속도 선택기를 직진 통과하는 조건은?',
    choices:['v=E/B (전하량·부호 무관)','v=B/E','양전하만 통과','무거울수록 통과'],
    answer:0, expl:'qE=qvB에서 q 소거 — 모든 종에 같은 v. 그 뒤 B만 있는 영역에서 질량 분리(질량분석).' },
  { id:'u6-l1-05', level:1, type:'tf', tags:['도선 힘'], src:'교재 표준',
    statement:'전류 도선이 받는 힘은 \\(\\vec F=I\\vec L\\times\\vec B\\)이고, 닫힌 회로가 균일 장에서 받는 알짜힘은 0이다(토크는 가능).',
    answer:true, expl:'ΣL=0이므로. 알짜힘이 필요하면 비균일 장 — 토크는 균일 장에서도(모터!).' },
  { id:'u6-l1-06', level:1, type:'mc', tags:['자기 쌍극자'], src:'교재 표준',
    statement:'전류 고리의 자기 모멘트 \\(\\vec\\mu=NI\\vec A\\)가 균일 B에서 받는 토크와 에너지는?',
    choices:['\\(\\tau=\\mu B\\sin\\theta,\\ U=-\\mu B\\cos\\theta\\)','τ=µBcosθ','U=+µBcosθ가 최소는 θ=180°','토크 항상 0'],
    answer:0, expl:'전기 쌍극자(p, E)와 완전 평행 구조 — U1과 짝으로 암기.' },

  /* ---------- L2 (12) ---------- */
  { id:'u6-l2-01', level:2, type:'num', tags:['힘 크기'], src:'창작 문제(검산됨)',
    params:{ v:{choices:[2,5],unit:'×10⁶ m/s'}, B:{choices:[0.5,1.2],unit:'T'}, th:{choices:[30,90]} },
    statement:function(p){ return '양성자(v='+p.v+'×10⁶ m/s)가 B='+p.B+' T와 '+p.th+'° 각도로 입사. 힘(N)과 가속도(m/s²)를 구하라. (m_p=1.67×10⁻²⁷)'; },
    solve:function(p){
      var F=1.602e-19*p.v*1e6*p.B*Math.sin(SVH.rad(p.th));
      return { ans:{F:F, a:F/1.67e-27}, unit:{F:'N', a:'m/s²'}, steps:[
        'F = qvBsinθ = '+SVH.fmt(F)+' N',
        'a = F/m = '+SVH.fmt(F/1.67e-27)+' m/s²' ] }; },
    hints:['sinθ 포함.'] },
  { id:'u6-l2-02', level:2, type:'num', tags:['원 반지름'], src:'창작 문제(검산됨)',
    params:{ V:{choices:[500,2000],unit:'V'}, B:{choices:[0.1,0.5],unit:'T'} },
    statement:function(p){ return p.V+' V로 가속된 전자가 B='+p.B+' T에 수직 입사. (a) 속력(m/s) (b) 반지름(mm)을 구하라.'; },
    solve:function(p){
      var v=Math.sqrt(2*1.602e-19*p.V/9.11e-31);
      var r=9.11e-31*v/(1.602e-19*p.B)*1000;
      return { ans:{v:v, r:r}, unit:{v:'m/s', r:'mm'}, steps:[
        'v = √(2eV/m) = '+SVH.fmt(v)+' m/s',
        'r = mv/eB = '+SVH.fmt(r)+' mm (U3 가속 + U6 회전의 결합)' ] }; },
    hints:['두 단원 공식 연결.'] },
  { id:'u6-l2-03', level:2, type:'num', tags:['사이클로트론 주파수'], src:'창작 문제(검산됨)',
    params:{ B:{choices:[0.5,1,1.5],unit:'T'} },
    statement:function(p){ return 'B='+p.B+' T에서 (a) 양성자 (b) 전자의 사이클로트론 주파수(MHz)를 구하라.'; },
    solve:function(p){
      var fp=1.602e-19*p.B/(2*Math.PI*1.67e-27)/1e6;
      var fe=1.602e-19*p.B/(2*Math.PI*9.11e-31)/1e6;
      return { ans:{fp:fp, fe:fe}, unit:{fp:'MHz', fe:'MHz'}, steps:[
        'f = qB/2πm: 양성자 '+SVH.fmt(fp)+' MHz',
        '전자 '+SVH.fmt(fe)+' MHz (m 반비례 — 1836배 빠르다)' ] }; },
    hints:['속력 무관.'] },
  { id:'u6-l2-04', level:2, type:'num', tags:['속도 선택'], src:'창작 문제(검산됨)',
    params:{ E:{choices:[1,3],unit:'×10⁵ V/m'}, B:{choices:[0.2,0.5],unit:'T'} },
    statement:function(p){ return 'E='+p.E+'×10⁵ V/m, B='+p.B+' T 속도 선택기의 통과 속력(m/s)은? 더 빠른 입자는 어느 쪽으로 휘나(자기력 우세=1)?'; },
    solve:function(p){
      var v=p.E*1e5/p.B;
      return { ans:{v:v, fast:1}, unit:{v:'m/s', fast:''}, steps:[
        'v = E/B = '+SVH.fmt(v)+' m/s',
        'v↑ → qvB↑ 자기력 우세(1) 쪽으로 휨 (선별의 원리)' ] }; },
    hints:['힘 균형.'] },
  { id:'u6-l2-05', level:2, type:'num', tags:['도선 힘'], src:'창작 문제(검산됨)',
    params:{ I:{choices:[5,10],unit:'A'}, L:{choices:[0.5,1],unit:'m'}, B:{choices:[0.2,0.5],unit:'T'}, th:{choices:[90,60]} },
    statement:function(p){ return 'I='+p.I+' A, L='+p.L+' m 직선 도선이 B='+p.B+' T와 '+p.th+'°. 힘(N)은?'; },
    solve:function(p){ var F=p.I*p.L*p.B*Math.sin(SVH.rad(p.th));
      return { ans:F, unit:'N', steps:[
        '도선 힘: \\(F=IL B\\sin\\theta\\) (qv→IL 치환)',
        'F = '+p.I+'×'+p.L+'×'+p.B+'×sin'+p.th+'° = '+SVH.fmt(F)+' N' ] }; },
    hints:['qv→IL 치환.'] },
  { id:'u6-l2-06', level:2, type:'num', tags:['부양 전류'], src:'기출 유형',
    params:{ lam:{choices:[10,40],unit:'g/m'}, B:{choices:[0.5,1],unit:'T'} },
    statement:function(p){ return '선밀도 '+p.lam+' g/m 도선을 수평 B='+p.B+' T(수평, 도선과 수직)에서 자기력으로 띄우려면 전류(A)는?'; },
    solve:function(p){ var I=p.lam/1000*9.8/p.B;
      return { ans:I, unit:'A', steps:[
        '단위길이: BI = λg → I = λg/B',
        '= '+SVH.fmt(I)+' A (자기 부상의 최소 모형)' ] }; },
    hints:['단위길이 균형.'] },
  { id:'u6-l2-07', level:2, type:'num', tags:['코일 토크'], src:'창작 문제(검산됨)',
    params:{ N:{choices:[50,100]}, I:{choices:[1,2],unit:'A'}, A:{choices:[20,50],unit:'cm²'}, B:{choices:[0.3,0.6],unit:'T'} },
    statement:function(p){ return 'N='+p.N+'회, I='+p.I+' A, A='+p.A+' cm² 코일이 B='+p.B+' T에서 면이 장과 평행(µ⊥B)할 때 토크(N·m)는?'; },
    solve:function(p){ var tau=p.N*p.I*p.A*1e-4*p.B;
      return { ans:tau, unit:'N·m', steps:[
        'µ = NIA = '+SVH.fmt(p.N*p.I*p.A*1e-4)+' A·m²',
        'τ = µBsin90° = '+SVH.fmt(tau)+' N·m (전동기·검류계의 심장)' ] }; },
    hints:['sinθ의 θ는 µ와 B 사이.'] },
  { id:'u6-l2-08', level:2, type:'num', tags:['홀 전압'], src:'교재 표준',
    params:{ I:{choices:[1,5],unit:'A'}, B:{choices:[1,2],unit:'T'}, t:{choices:[0.1,0.5],unit:'mm'} },
    statement:function(p){ return '구리 리본(두께 t='+p.t+' mm, n=8.5×10²⁸)에 I='+p.I+' A, B='+p.B+' T 수직. 홀 전압(µV)은?'; },
    solve:function(p){
      var V=p.I*p.B/(8.5e28*1.602e-19*p.t*1e-3)*1e6;
      return { ans:V, unit:'µV', steps:[
        'V_H = IB/(net) = '+SVH.fmt(V)+' µV',
        '(µV 수준 — 반도체(n 작음)로 만들면 mV: 홀 센서의 재료 선택)' ] }; },
    hints:['식 하나, 지수 조심.'] },
  { id:'u6-l2-09', level:2, type:'num', tags:['원운동 주기'], src:'창작 문제(검산됨)',
    params:{ B:{choices:[0.01,0.1],unit:'T'} },
    statement:function(p){ return 'B='+p.B+' T 속 전자의 원운동 주기(ns)는? 속력이 2배가 되면 주기는?'; },
    solve:function(p){
      var T=2*Math.PI*9.11e-31/(1.602e-19*p.B)*1e9;
      return { ans:{T:T, T2:T}, unit:{T:'ns', T2:'ns'}, steps:[
        'T = 2πm/eB = '+SVH.fmt(T)+' ns',
        '속력 2배 → 반지름 2배·주기 그대로 '+SVH.fmt(T)+' ns' ] }; },
    hints:['등시성.'] },
  { id:'u6-l2-10', level:2, type:'num', tags:['나선 운동'], src:'교재 표준',
    params:{ v:{choices:[2,4],unit:'×10⁶ m/s'}, th:{choices:[30,60]}, B:{choices:[0.2,0.4],unit:'T'} },
    statement:function(p){ return '양성자가 B와 '+p.th+'° 각도, v='+p.v+'×10⁶ m/s로 입사해 나선 운동한다. (a) 반지름(mm) (b) 피치(한 바퀴 전진 거리, mm)를 구하라.'; },
    solve:function(p){
      var v=p.v*1e6, th=SVH.rad(p.th);
      var r=1.67e-27*v*Math.sin(th)/(1.602e-19*p.B)*1000;
      var T=2*Math.PI*1.67e-27/(1.602e-19*p.B);
      var pitch=v*Math.cos(th)*T*1000;
      return { ans:{r:r, pitch:pitch}, unit:{r:'mm', pitch:'mm'}, steps:[
        'r = mv⊥/qB = '+SVH.fmt(r)+' mm (수직 성분만)',
        '피치 = v∥T = '+SVH.fmt(pitch)+' mm (오로라·자기병의 기하)' ] }; },
    hints:['성분 분해.'] },
  { id:'u6-l2-11', level:2, type:'num', tags:['운동 기전력 맛보기'], src:'창작 문제(검산됨)',
    params:{ L:{choices:[0.5,1],unit:'m'}, v:{choices:[5,10],unit:'m/s'}, B:{choices:[0.5,1],unit:'T'} },
    statement:function(p){ return '길이 L='+p.L+' m 막대가 v='+p.v+' m/s로 B='+p.B+' T를 가로지른다. 양단 전위차(V)는? (qE=qvB 평형)'; },
    solve:function(p){ var V=p.B*p.L*p.v;
      return { ans:V, unit:'V', steps:[
        '내부 전하 평형: E=vB → V = BLv = '+SVH.fmt(V)+' V',
        '(발전기의 씨앗 — 기말 유도 단원의 예고편)' ] }; },
    hints:['vB가 유효 장.'] },
  { id:'u6-l2-12', level:2, type:'num', tags:['일-무일 확인'], src:'창작 문제(검산됨)',
    params:{ B:{choices:[1,2],unit:'T'}, v:{choices:[3,6],unit:'×10⁶ m/s'}, n:{choices:[100,1000]} },
    statement:function(p){ return '전자가 B='+p.B+' T에서 원운동 '+p.n+'바퀴를 돌았다. 자기력이 한 일(J)과 최종 속력(초기 '+p.v+'×10⁶ 대비 배율)을 구하라.'; },
    solve:function(p){
      return { ans:{W:0, ratio:1}, unit:{W:'J', ratio:'배'}, steps:[
        'F⊥v 항상 → W = 0 J, 속력 1배(불변)',
        '(몇 바퀴든 무관 — 에너지를 바꾸려면 E장이 필요: 사이클로트론이 E를 "동기화"해 넣는 이유)' ] }; },
    hints:['정의에서 즉답.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u6-l3-01', level:3, type:'num', tags:['질량분석기'], src:'기출 유형',
    params:{ V:{choices:[2,5],unit:'kV'}, B:{choices:[0.2,0.5],unit:'T'}, A:{choices:[12,14]} },
    statement:function(p){ return '탄소 이온(질량수 '+p.A+', q=+e)을 '+p.V+' kV로 가속 후 B='+p.B+' T에 수직 입사. (a) 반지름(cm) (b) ¹²C와 ¹⁴C의 반지름비 √(12/14)... 값으로 r₁₄/r₁₂를 구하라. (u=1.66×10⁻²⁷)'; },
    solve:function(p){
      var m=p.A*1.66e-27;
      var v=Math.sqrt(2*1.602e-19*p.V*1000/m);
      var r=m*v/(1.602e-19*p.B)*100;
      return { ans:{r:r, ratio:Math.sqrt(14/12)}, unit:{r:'cm', ratio:''}, steps:[
        'v = √(2qV/m) = '+SVH.fmt(v)+' m/s',
        'r = mv/qB = √(2mV/q)/B = '+SVH.fmt(r)+' cm',
        'r∝√m → r₁₄/r₁₂ = '+SVH.fmt(Math.sqrt(14/12))+' (동위원소 분리 — 방사성탄소연대의 하드웨어)' ] }; },
    hints:['r∝√m 정리.'] },
  { id:'u6-l3-02', level:3, type:'num', tags:['J.J.톰슨 e/m'], src:'기출 유형',
    params:{ E:{choices:[1,2],unit:'×10⁴ V/m'}, B:{choices:[0.001,0.002],unit:'T'} },
    statement:function(p){ return '톰슨 실험: 속도선택 E='+p.E+'×10⁴ V/m, B='+p.B+' T → 이후 같은 B로 반지름 r을 측정하면 e/m=E/(rB²). r=5 cm일 때 e/m(C/kg)을 구하고 참값과 비교하라.'; },
    solve:function(p){
      var em=p.E*1e4/(0.05*p.B*p.B);
      return { ans:em, unit:'C/kg', steps:[
        'v = E/B → e/m = v/(rB) = E/(rB²)',
        '= '+SVH.fmt(em)+' C/kg (참값 1.76×10¹¹ 근처인지 — 전자 발견 1897의 재현)' ] }; },
    hints:['두 단계 합성.'] },
  { id:'u6-l3-03', level:3, type:'num', tags:['반원 사출'], src:'기출 유형',
    params:{ B:{choices:[0.1,0.3],unit:'T'}, v:{choices:[1,3],unit:'×10⁶ m/s'} },
    statement:function(p){ return '전자가 장 영역(B='+p.B+' T, 지면 안쪽)에 수직으로 들어가 반원을 그리고 나온다. (a) 반지름(mm) (b) 머문 시간(ns) (c) 들어온 지점과 나간 지점의 거리(mm)를 구하라. (v='+p.v+'×10⁶)'; },
    solve:function(p){
      var v=p.v*1e6;
      var r=9.11e-31*v/(1.602e-19*p.B)*1000;
      var t=Math.PI*9.11e-31/(1.602e-19*p.B)*1e9;
      return { ans:{r:r, t:t, d:2*r}, unit:{r:'mm', t:'ns', d:'mm'}, steps:[
        'r = mv/eB = '+SVH.fmt(r)+' mm',
        '반원 시간 = T/2 = πm/eB = '+SVH.fmt(t)+' ns (속력 무관)',
        '출입 간격 = 지름 2r = '+SVH.fmt(2*r)+' mm' ] }; },
    hints:['반원 기하.'] },
  { id:'u6-l3-04', level:3, type:'num', tags:['ㄷ자 도선 힘'], src:'기출 유형',
    params:{ I:{choices:[5,10],unit:'A'}, L:{choices:[10,20],unit:'cm'}, B:{choices:[0.4,0.8],unit:'T'} },
    statement:function(p){ return '균일 B('+p.B+' T, 지면 안쪽) 영역에 ㄷ자 도선(폭 L='+p.L+' cm)이 일부 담겨 I='+p.I+' A. 알짜힘(N)은 어느 부분이 만들고 크기는?'; },
    solve:function(p){ var F=p.I*p.L/100*p.B;
      return { ans:F, unit:'N', steps:[
        '옆 두 변의 힘은 상쇄, 바닥 변만 알짜',
        'F = ILB = '+SVH.fmt(F)+' N (전류천칭 실험의 원리)' ] }; },
    hints:['대칭 상쇄부터.'] },
  { id:'u6-l3-05', level:3, type:'num', tags:['검류계 설계'], src:'기출 유형',
    params:{ N:{choices:[100,200]}, A:{choices:[2,4],unit:'cm²'}, B:{choices:[0.2,0.5],unit:'T'}, kappa:{choices:[1,4],unit:'×10⁻⁸ N·m/°'} },
    statement:function(p){ return '검류계(N='+p.N+', A='+p.A+' cm², B='+p.B+' T, 비틀림 상수 κ='+p.kappa+'×10⁻⁸ N·m/°): 1°를 돌리는 전류(µA)는? (radial field로 sinθ=1 유지)'; },
    solve:function(p){
      var I=p.kappa*1e-8/(p.N*p.A*1e-4*p.B)*1e6;
      return { ans:I, unit:'µA', steps:[
        '평형: NIAB = κθ → I(1°) = κ/(NAB)',
        '= '+SVH.fmt(I)+' µA (감도의 공식 — N·A·B를 키우면 민감)' ] }; },
    hints:['토크 균형.'] },
  { id:'u6-l3-06', level:3, type:'num', tags:['사이클로트론 에너지'], src:'기출 유형',
    params:{ B:{choices:[1,1.5],unit:'T'}, R:{choices:[0.5,1],unit:'m'} },
    statement:function(p){ return '사이클로트론(B='+p.B+' T, 최대 반지름 R='+p.R+' m)의 양성자 (a) 최대 속력(m/s) (b) 최대 에너지(MeV)를 구하라.'; },
    solve:function(p){
      var v=1.602e-19*p.B*p.R/1.67e-27;
      var E=0.5*1.67e-27*v*v/1.602e-19/1e6;
      return { ans:{v:v, E:E}, unit:{v:'m/s', E:'MeV'}, steps:[
        'v = qBR/m = '+SVH.fmt(v)+' m/s',
        'KE = ½mv² = q²B²R²/2m = '+SVH.fmt(E)+' MeV',
        '(에너지 ∝ B²R² — 가속기가 커지는 이유)' ] }; },
    hints:['r=R에서 한계.'] },
  { id:'u6-l3-07', level:3, type:'num', tags:['평행판+B 복합'], src:'기출 유형',
    params:{ V:{choices:[200,400],unit:'V'}, d:{choices:[2,4],unit:'cm'}, B:{choices:[0.05,0.1],unit:'T'} },
    statement:function(p){ return '평행판(V='+p.V+' V, d='+p.d+' cm) 사이에 B('+p.B+' T)를 판과 평행하게 걸었다. 전자가 힘 균형으로 직진하는 속력(m/s)과, 이보다 "느린" 전자가 휘는 쪽(E쪽=1/B힘쪽... 전기력 우세=1)을 구하라.'; },
    solve:function(p){
      var E=p.V/(p.d/100), v=E/p.B;
      return { ans:{v:v, slow:1}, unit:{v:'m/s', slow:''}, steps:[
        'E = V/d = '+SVH.fmt(E)+' V/m → v = E/B = '+SVH.fmt(v)+' m/s',
        '느리면 qvB↓ → 전기력 우세(1)',
        '(속도 선택기를 평행판으로 직접 구성한 판)' ] }; },
    hints:['E부터 계산.'] },
  { id:'u6-l3-08', level:3, type:'num', tags:['경사 도선'], src:'기출 유형',
    params:{ m:{choices:[50,100],unit:'g'}, L:{choices:[0.5,1],unit:'m'}, th:{choices:[15,30]}, B:{choices:[0.5,1],unit:'T'} },
    statement:function(p){ return '경사각 '+p.th+'° 마찰 없는 레일 위 도선(m='+p.m+' g, L='+p.L+' m), 연직 위 B='+p.B+' T. 미끄러지지 않게 하는 전류(A)는? (수평 힘 BIL)'; },
    solve:function(p){
      var I=p.m/1000*9.8*Math.tan(SVH.rad(p.th))/(p.B*p.L);
      return { ans:I, unit:'A', steps:[
        '경사면 평형: BILcosθ = mgsinθ',
        'I = mg tanθ/(BL) = '+SVH.fmt(I)+' A (연직 B → 수평 힘의 기하)' ] }; },
    hints:['경사면 성분 분해.'] },
  { id:'u6-l3-09', level:3, type:'num', tags:['홀 캐리어 판별'], src:'기출 유형',
    params:{ I:{choices:[2,5],unit:'mA'}, B:{choices:[0.5,1],unit:'T'}, VH:{choices:[5,10],unit:'mV'}, t:{choices:[0.2,0.5],unit:'mm'} },
    statement:function(p){ return '반도체 시편(t='+p.t+' mm)에서 I='+p.I+' mA·B='+p.B+' T에 V_H='+p.VH+' mV. (a) 캐리어 밀도 n(/m³) (b) 부호가 +로 측정되면 캐리어는? (전자=−1/양공=1)'; },
    solve:function(p){
      var n=p.I*1e-3*p.B/(1.602e-19*p.t*1e-3*p.VH*1e-3);
      return { ans:{n:n, carrier:1}, unit:{n:'/m³', carrier:''}, steps:[
        'n = IB/(etV_H) = '+SVH.fmt(n)+' /m³ (구리보다 ~10⁶ 작음)',
        '+ 부호 → 양공(1) — 홀이 반도체 물리의 문을 연 방식' ] }; },
    hints:['홀 식 역산.'] },
  { id:'u6-l3-10', level:3, type:'num', tags:['자기병 개념'], src:'창작 문제(검산됨)',
    params:{ th:{choices:[30,45]}, k:{choices:[4,9]} },
    constraint:function(p){ return Math.abs(Math.pow(Math.sin(SVH.rad(p.th)),2)-1/p.k)>0.01; }, /* 경계각 정확 일치 배제 */
    statement:function(p){ return '자기 거울: 피치각 '+p.th+'°로 들어간 입자가 장이 '+p.k+'배로 세지는 지점에서 반사되는가? sin²θ_m = B₀/B_max 기준으로 판정하라(반사=1/통과=0). 반사 한계각(°)도 구하라.'; },
    solve:function(p){
      var thm=SVH.deg(Math.asin(Math.sqrt(1/p.k)));
      var refl=p.th>thm?1:0;
      return { ans:{thm:thm, refl:refl}, unit:{thm:'°', refl:''}, steps:[
        '한계각: sinθ_m = 1/√'+p.k+' → θ_m = '+SVH.fmt(thm)+'°',
        'θ='+p.th+'° '+(refl?'>':'≤')+' θ_m → '+(refl?'반사(1)':'통과(0) — 손실 원뿔'),
        '(밴앨런대·핵융합 가둠의 원리, µ 불변량)' ] }; },
    hints:['각도 비교.'] },
  { id:'u6-l3-11', level:3, type:'num', tags:['두 입자 분리'], src:'기출 유형',
    params:{ B:{choices:[0.2,0.4],unit:'T'}, V:{choices:[1,2],unit:'kV'} },
    statement:function(p){ return '같은 '+p.V+' kV로 가속된 양성자와 알파(q=2e, m=4u)가 B='+p.B+' T에 입사. 반지름비 r_α/r_p = √(m_αq_p/m_pq_α)... 값을 구하라.'; },
    solve:function(p){
      var ratio=Math.sqrt(4*1.66e-27/(1.67e-27)*1/2);
      return { ans:ratio, unit:'', steps:[
        'r = √(2mV/q)/B → r_α/r_p = √[(m_α/m_p)(q_p/q_α)] = √(4×½)',
        '≈ '+SVH.fmt(ratio)+' (√2 — 같은 전압도 종마다 다른 원)' ] }; },
    hints:['비율로 소거.'] },
  { id:'u6-l3-12', level:3, type:'num', tags:['정사각 코일 안정성'], src:'창작 문제(검산됨)',
    params:{ I:{choices:[2,4],unit:'A'}, a:{choices:[5,10],unit:'cm'}, B:{choices:[0.3,0.6],unit:'T'}, th:{choices:[10,20]} },
    statement:function(p){ return '정사각 코일(변 a='+p.a+' cm, I='+p.I+' A)이 B='+p.B+' T에서 평형(µ∥B)으로부터 '+p.th+'° 틀어졌다. (a) 복원 토크(N·m) (b) 퍼텐셜에너지 증가(mJ)를 구하라.'; },
    solve:function(p){
      var mu=p.I*Math.pow(p.a/100,2);
      var tau=mu*p.B*Math.sin(SVH.rad(p.th));
      var dU=mu*p.B*(1-Math.cos(SVH.rad(p.th)))*1000;
      return { ans:{tau:tau, dU:dU}, unit:{tau:'N·m', dU:'mJ'}, steps:[
        'µ = Ia² = '+SVH.fmt(mu)+' A·m²',
        'τ = µBsinθ = '+SVH.fmt(tau)+' N·m (평형 복원 방향)',
        'ΔU = µB(1−cosθ) = '+SVH.fmt(dU)+' mJ' ] }; },
    hints:['U 기준점 θ=0.'] },
  { id:'u6-l3-13', level:3, type:'num', tags:['전자빔 지구자기 편향'], src:'기출 유형',
    params:{ V:{choices:[10,20],unit:'kV'}, L:{choices:[0.3,0.5],unit:'m'} },
    statement:function(p){ return 'CRT 전자('+p.V+' kV 가속)가 L='+p.L+' m 비행하는 동안 지구 자기장(5×10⁻⁵ T, 수직 성분)에 의해 휘는 변위(µm)를 근사(y≈L²/2r)로 구하라.'; },
    solve:function(p){
      var v=Math.sqrt(2*1.602e-19*p.V*1000/9.11e-31);
      var r=9.11e-31*v/(1.602e-19*5e-5);
      var y=p.L*p.L/(2*r)*1e6;
      return { ans:y, unit:'µm', steps:[
        'v = '+SVH.fmt(v)+' m/s → r = mv/eB = '+SVH.fmt(r)+' m (거대한 원)',
        'y ≈ L²/2r = '+SVH.fmt(y)+' µm',
        '(구형 TV가 방위에 민감했던 이유 — 오더 추정 문제)' ] }; },
    hints:['활꼴 근사.'] },
  { id:'u6-l3-14', level:3, type:'num', tags:['전류 천칭'], src:'기출 유형',
    params:{ L:{choices:[10,20],unit:'cm'}, m:{choices:[2,5],unit:'g'}, I:{choices:[10,20],unit:'A'} },
    statement:function(p){ return '전류 천칭: 수평 도선(L='+p.L+' cm, I='+p.I+' A)의 자기력이 질량 '+p.m+' g 추와 평형. (a) 필요한 B(T) (b) 전류 방향을 뒤집으면?'; },
    solve:function(p){
      var B=p.m/1000*9.8/(p.I*p.L/100);
      return { ans:{B:B, flip:-1}, unit:{B:'T', flip:'(힘 반전=−1)'}, steps:[
        'BIL = mg → B = mg/IL = '+SVH.fmt(B)+' T',
        '방향 반전 → 힘도 반전(−1): 천칭이 반대로 기움 (B 측정 실험의 원리)' ] }; },
    hints:['균형식 하나.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u6-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 자기력은 운동에너지를 바꾸지 못한다<br>㉡ 사이클로트론 주기는 속력과 무관하다(비상대론)<br>㉢ 속도 선택기는 전하의 부호·크기와 무관하게 v=E/B를 선별한다<br>㉣ 균일 장 속 닫힌 전류 고리의 알짜힘은 0이지만 토크는 0이 아닐 수 있다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — 네 명제가 U6 뼈대.' },
  { id:'u6-l4-02', level:4, type:'num', tags:['질량분석 완주'], src:'기출 유형',
    params:{ V:{choices:[1,3],unit:'kV'}, B:{choices:[0.3,0.6],unit:'T'}, dm:{choices:[1,2],unit:'u'} },
    statement:function(p){ return '질량분석기('+p.V+' kV, B='+p.B+' T)에서 질량 m=20u와 m+Δm(Δm='+p.dm+'u)의 이온(+e)이 검출판에 닿는 위치(=2r) 차이(mm)를 구하라.'; },
    solve:function(p){
      function r(mu){ var m=mu*1.66e-27;
        return Math.sqrt(2*m*1.602e-19*p.V*1000)/(1.602e-19*p.B); }
      var d=2*(r(20+p.dm)-r(20))*1000;
      return { ans:d, unit:'mm', steps:[
        'r = √(2mqV)/qB: r₂₀='+SVH.fmt(r(20)*1000)+' mm, r₂₀₊='+SVH.fmt(r(20+p.dm)*1000)+' mm',
        '위치차 = 2Δr = '+SVH.fmt(d)+' mm',
        '(mm 분해능이면 동위원소가 갈라진다 — 장비 사양 감각)' ] }; },
    hints:['2r 간격.'] },
  { id:'u6-l4-03', level:4, type:'derive', tags:['유도'], src:'강의자료 대조',
    statement:'홀 전압 \\(V_H=\\dfrac{IB}{nqt}\\)를 힘 평형에서 유도하고, 캐리어 부호 판별 논리를 서술하라.',
    steps:[
      '캐리어 유동: I = nqAv_d, A=wt [왜] 미시상과 연결',
      '자기력 qv_dB가 옆으로 밀어 전하 축적 → 횡전기장 E_H 생성',
      '평형: qE_H = qv_dB → V_H = E_Hw = v_dBw',
      'v_d = I/(nqwt) 대입 → \\(V_H = IB/(nqt)\\) — 폭 w 소거!',
      '부호: 같은 I 방향이라도 +캐리어와 −캐리어는 "같은 쪽"으로 밀린다(v 반대×q 반대) → 축적 부호가 반대 → V_H 부호로 판별. 극한 체크: n↑ ⇒ V_H↓ ✓ · 차원 [A][T]/([m⁻³][C][m]) = V ✓'
    ],
    hints:['횡 방향 평형이 핵심.','w가 사라지는 것 확인.'],
    expl:'유도+판별 논리 세트 — 서술형으로 딱 좋은 크기.' },
  { id:'u6-l4-04', level:4, type:'num', tags:['사이클로트론 설계'], src:'기출 유형',
    params:{ E:{choices:[10,20],unit:'MeV'}, B:{choices:[1.5,2],unit:'T'} },
    statement:function(p){ return '양성자를 '+p.E+' MeV까지 가속하는 사이클로트론(B='+p.B+' T): (a) 필요한 반지름(m) (b) RF 주파수(MHz) (c) 회전 횟수(디 간극 전압 50 kV, 1회전당 2회 가속)를 구하라.'; },
    solve:function(p){
      var KE=p.E*1e6*1.602e-19;
      var v=Math.sqrt(2*KE/1.67e-27);
      var R=1.67e-27*v/(1.602e-19*p.B);
      var f=1.602e-19*p.B/(2*Math.PI*1.67e-27)/1e6;
      var n=p.E*1e6/(2*50e3);
      return { ans:{R:R, f:f, n:n}, unit:{R:'m', f:'MHz', n:'회'}, steps:[
        'v = '+SVH.fmt(v)+' m/s → R = mv/qB = '+SVH.fmt(R)+' m',
        'f = qB/2πm = '+SVH.fmt(f)+' MHz (전 궤도 공통 — 등시성 덕분)',
        'n = E/(2qV_gap) = '+SVH.fmt(n)+'회' ] }; },
    hints:['세 공식 순차.'] },
  { id:'u6-l4-05', level:4, type:'num', tags:['모터 1차 모델'], src:'기출 유형',
    params:{ N:{choices:[100,200]}, A:{choices:[10,20],unit:'cm²'}, B:{choices:[0.5,1],unit:'T'}, I:{choices:[1,2],unit:'A'} },
    statement:function(p){ return 'DC 모터 코일(N='+p.N+', A='+p.A+' cm², I='+p.I+' A, B='+p.B+' T): (a) 최대 토크(N·m) (b) 반 바퀴 평균 토크(=2/π×최대) (c) 1000 rpm에서 평균 기계 출력(W)을 구하라.'; },
    solve:function(p){
      var tmax=p.N*p.I*p.A*1e-4*p.B;
      var tavg=2/Math.PI*tmax;
      var P=tavg*1000*2*Math.PI/60;
      return { ans:{tmax:tmax, tavg:tavg, P:P}, unit:{tmax:'N·m', tavg:'N·m', P:'W'}, steps:[
        'τ_max = NIAB = '+SVH.fmt(tmax)+' N·m',
        '평균 = (2/π)τ_max = '+SVH.fmt(tavg)+' (sin 평균)',
        'P = τω = '+SVH.fmt(P)+' W (정류자가 sin을 |sin|으로 바꾼다)' ] }; },
    hints:['ω=2πn/60.'] },
  { id:'u6-l4-06', level:4, type:'num', tags:['E×B 드리프트'], src:'교재 표준',
    params:{ E:{choices:[100,200],unit:'V/m'}, B:{choices:[0.01,0.05],unit:'T'} },
    statement:function(p){ return 'E('+p.E+' V/m)⊥B('+p.B+' T)에서 임의 초기속도 입자의 안내중심 드리프트 속도 v=E/B(m/s)를 구하고, 전하 부호에 따라 방향이 바뀌는지(불변=0)를 답하라.'; },
    solve:function(p){
      return { ans:{v:p.E/p.B, sgn:0}, unit:{v:'m/s', sgn:''}, steps:[
        'v_drift = E/B = '+SVH.fmt(p.E/p.B)+' m/s (E×B 방향)',
        '부호 무관(0) — +도 −도 같은 쪽으로 흐른다(플라즈마 물리의 첫 정리)' ] }; },
    hints:['속도선택 조건의 재해석.'] },
  { id:'u6-l4-07', level:4, type:'num', tags:['임계 데이터 역산'], src:'기출 유형',
    params:{ r1:{choices:[10,20],unit:'cm'}, V:{choices:[500,1000],unit:'V'} },
    statement:function(p){ return '미지 이온(+e): '+p.V+' V 가속 후 B=0.1 T에서 r='+p.r1+' cm 원. (a) 질량(kg) (b) 원자량(u) — 무엇으로 추정되나?'; },
    solve:function(p){
      var m=Math.pow(1.602e-19*0.1*p.r1/100,2)/(2*1.602e-19*p.V);
      return { ans:{m:m, u:m/1.66e-27}, unit:{m:'kg', u:'u'}, steps:[
        'r=√(2mV/q)/B → m = (qBr)²/2qV = '+SVH.fmt(m)+' kg',
        '= '+SVH.fmt(m/1.66e-27)+' u (정수 근처면 해당 원소 추정 — 역문제 형식)' ] }; },
    hints:['r식을 m으로 풀기.'] },
  { id:'u6-l4-08', level:4, type:'num', tags:['벨트 위 도선 종합'], src:'기출 유형',
    params:{ m:{choices:[20,40],unit:'g'}, L:{choices:[0.4,0.8],unit:'m'}, mu:{choices:[0.2,0.4]}, B:{choices:[0.8,1.2],unit:'T'} },
    statement:function(p){ return '수평면 위 도선(m='+p.m+' g, L='+p.L+' m, 마찰계수 µ='+p.mu+'), 연직 B='+p.B+' T. 도선을 미끄러뜨리기 시작하는 최소 전류(A)와, B가 수평(도선 수직·힘이 위로)일 때의 최소 전류(A)를 비교하라.'; },
    solve:function(p){
      var W=p.m/1000*9.8;
      var I1=p.mu*W/(p.B*p.L);
      var I2=W/(p.B*p.L); // 들어올리기
      return { ans:{I1:I1, I2:I2}, unit:{I1:'A', I2:'A'}, steps:[
        '수평 밀기: BIL = µmg → I = '+SVH.fmt(I1)+' A',
        '들어올리기: BIL = mg → I = '+SVH.fmt(I2)+' A',
        '(µ<1이면 미는 쪽이 쉽다 — 힘 방향 설계 감각)' ] }; },
    hints:['두 평형식 비교.'] }
  ]
});
