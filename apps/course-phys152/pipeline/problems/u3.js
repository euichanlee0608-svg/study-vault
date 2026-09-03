/* U3 전위 — 정의, 점전하 전위, 중첩, E↔V 관계, 등전위면, 전위 에너지 (W3~4) */
SV_BANK.push({
  id: 'u3', no: 3, title: '전위 (Electric Potential)', titleEn: 'Electric Potential',
  scope: '전위·전위차 정의 · 점전하/분포의 V · 중첩(스칼라!) · E=−∇V · 등전위면 · 전위 에너지 U · 전자볼트',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u3-l1-01', level:1, type:'mc', tags:['정의'], src:'강의자료 대조',
    statement:'전위 V의 정의로 옳은 것은?',
    choices:['단위 전하당 전위 에너지 V=U/q, 즉 \\(V_b-V_a=-\\int_a^b\\vec E\\cdot d\\vec l\\)','전기장의 크기','힘/전하','에너지 그 자체'],
    answer:0, expl:'장의 선적분에 −부호 — 장 방향으로 가면 전위는 내려간다. 단위 J/C=V.' },
  { id:'u3-l1-02', level:1, type:'tf', tags:['스칼라 중첩'], src:'교재 표준',
    statement:'여러 전하의 전위는 각 전위의 "산술 합"이다(벡터 합 불필요) — 이것이 V로 먼저 계산하는 실익이다.',
    answer:true, expl:'V=Σkqᵢ/rᵢ. 방향 없는 덧셈 → 복잡한 배치일수록 V→E 순서가 유리.' },
  { id:'u3-l1-03', level:1, type:'mc', tags:['E와 V'], src:'교재 표준',
    statement:'E와 V의 관계로 옳은 것은?',
    choices:['\\(E_x=-\\partial V/\\partial x\\) — 장은 전위가 가장 가파르게 감소하는 방향','E=V/r 항상','V가 0이면 E도 0','E가 0이면 V도 0'],
    answer:0, expl:'V=0≠E=0 (쌍극자 수직이등분선), E=0≠V=0 (두 +전하 중점). 반례 두 개가 시험 단골.' },
  { id:'u3-l1-04', level:1, type:'tf', tags:['등전위면'], src:'교재 표준',
    statement:'등전위면은 장선과 항상 수직이고, 등전위면 위에서 전하를 옮기는 정전기 일은 0이다.',
    answer:true, expl:'수직이 아니면 면 위 성분의 일이 생겨 "등전위" 모순. 도체 표면도 등전위면.' },
  { id:'u3-l1-05', level:1, type:'mc', tags:['기준점'], src:'교재 표준',
    statement:'전위의 기준(0점)에 대한 설명으로 옳은 것은?',
    choices:['임의로 정할 수 있으며 보통 무한대(또는 접지)를 0으로 — 물리는 전위차만 안다','반드시 무한대','반드시 접지','원점이 항상 0'],
    answer:0, expl:'절대값이 아닌 차가 물리량. 무한 분포(무한선·무한판)는 무한대를 0으로 못 잡는 것도 포인트.' },
  { id:'u3-l1-06', level:1, type:'mc', tags:['eV'], src:'교재 표준',
    statement:'1 eV(전자볼트)의 정의로 옳은 것은?',
    choices:['전자가 1 V 전위차를 지날 때 에너지 = 1.602×10⁻¹⁹ J','1 V','전자의 정지 에너지','1 J'],
    answer:0, expl:'원자·양자 스케일의 통화 단위. 기말(광전효과)에서 주연이 된다.' },

  /* ---------- L2 (12) ---------- */
  { id:'u3-l2-01', level:2, type:'num', tags:['점전하 V'], src:'창작 문제(검산됨)',
    params:{ q:{choices:[2,5],unit:'µC'}, r:{choices:[20,50],unit:'cm'} },
    statement:function(p){ return 'q='+p.q+' µC에서 r='+p.r+' cm 지점의 전위(V, 무한대 기준)는?'; },
    solve:function(p){ var V=8.99e9*p.q*1e-6/(p.r/100);
      return { ans:V, unit:'V', steps:[
        'V = kq/r (1/r! — 장의 1/r²과 구별)',
        '= '+SVH.fmt(V)+' V' ] }; },
    hints:['1/r.'] },
  { id:'u3-l2-02', level:2, type:'num', tags:['전위차→일'], src:'창작 문제(검산됨)',
    params:{ q:{choices:[2,4],unit:'µC'}, dV:{choices:[100,500],unit:'V'} },
    statement:function(p){ return 'q='+p.q+' µC를 전위가 '+p.dV+' V 높은 곳으로 옮기는 외부 일(mJ)은?'; },
    solve:function(p){ var W=p.q*1e-6*p.dV*1000;
      return { ans:W, unit:'mJ', steps:[
        'W_ext = qΔV = '+p.q+'µ×'+p.dV,
        '= '+SVH.fmt(W)+' mJ (전기력이 한 일은 −W_ext)' ] }; },
    hints:['W=qΔV.'] },
  { id:'u3-l2-03', level:2, type:'num', tags:['가속 전자'], src:'창작 문제(검산됨)',
    params:{ V:{choices:[100,500,1000],unit:'V'} },
    statement:function(p){ return '정지 전자가 '+p.V+' V로 가속됐다. (a) 운동에너지(eV와 J) (b) 속력(m/s)을 구하라.'; },
    solve:function(p){
      var E=p.V*1.602e-19;
      var v=Math.sqrt(2*E/9.11e-31);
      return { ans:{E:E, v:v}, unit:{E:'J', v:'m/s'}, steps:[
        'KE = eV = '+p.V+' eV = '+SVH.fmt(E)+' J',
        'v = √(2KE/m) = '+SVH.fmt(v)+' m/s (c 대비 '+SVH.fmt(v/3e8*100)+'% — 수 kV부터 상대론 냄새)' ] }; },
    hints:['에너지 보존.'] },
  { id:'u3-l2-04', level:2, type:'num', tags:['균일장 전위'], src:'창작 문제(검산됨)',
    params:{ E:{choices:[200,1000],unit:'V/m'}, d:{choices:[2,5],unit:'cm'} },
    statement:function(p){ return '균일 장 E='+p.E+' V/m에서 장 방향으로 d='+p.d+' cm 이동 시 전위 변화(V)는?'; },
    solve:function(p){ var dv=-p.E*p.d/100;
      return { ans:dv, unit:'V', steps:[
        'ΔV = −Ed = −'+p.E+'×'+SVH.fmt(p.d/100),
        '= '+SVH.fmt(dv)+' V (장 방향 = 내리막)' ] }; },
    hints:['부호가 답의 절반.'] },
  { id:'u3-l2-05', level:2, type:'num', tags:['두 전하 중점'], src:'창작 문제(검산됨)',
    params:{ q:{choices:[3,6],unit:'µC'}, d:{choices:[40,60],unit:'cm'} },
    statement:function(p){ return '+q와 −q('+p.q+' µC)가 d='+p.d+' cm 떨어져 있다. (a) 중점의 V (b) 중점의 E(N/C)를 구하라.'; },
    solve:function(p){
      var E=2*8.99e9*p.q*1e-6/Math.pow(p.d/200,2);
      return { ans:{V:0, E:E}, unit:{V:'V', E:'N/C'}, steps:[
        'V = kq/r−kq/r = 0 (스칼라 상쇄)',
        'E = 두 장이 같은 방향(+→−) → 2kq/(d/2)² = '+SVH.fmt(E)+' N/C',
        '(V=0인데 E≠0 — l1-03의 실물)' ] }; },
    hints:['V는 부호합, E는 벡터합.'] },
  { id:'u3-l2-06', level:2, type:'num', tags:['V에서 E'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[3,5]}, b:{choices:[2,4]}, x:{choices:[1,2]} },
    statement:function(p){ return 'V(x)='+p.a+'x²−'+p.b+'x [V, m]일 때 x='+p.x+' m에서 E_x(V/m)는?'; },
    solve:function(p){ var E=-(2*p.a*p.x-p.b);
      return { ans:E, unit:'V/m', steps:[
        'E_x = −dV/dx = −(2·'+p.a+'x−'+p.b+')',
        'x='+p.x+': '+SVH.fmt(E)+' V/m' ] }; },
    hints:['미분+부호.'] },
  { id:'u3-l2-07', level:2, type:'num', tags:['구 도체 전위'], src:'창작 문제(검산됨)',
    params:{ Q:{choices:[2,5],unit:'µC'}, R:{choices:[10,25],unit:'cm'} },
    statement:function(p){ return '대전 도체구(Q='+p.Q+' µC, R='+p.R+' cm)의 (a) 표면 전위 (b) 중심 전위(V)는?'; },
    solve:function(p){ var V=8.99e9*p.Q*1e-6/(p.R/100);
      return { ans:{Vs:V, Vc:V}, unit:{Vs:'V', Vc:'V'}, steps:[
        '표면: kQ/R = '+SVH.fmt(V)+' V',
        '내부 E=0 → 전위 일정 → 중심도 '+SVH.fmt(V)+' V (0이 아니라 "같음"!)' ] }; },
    hints:['E=0 ⇒ V 상수.'] },
  { id:'u3-l2-08', level:2, type:'num', tags:['링 축 전위'], src:'교재 표준',
    params:{ Q:{choices:[3,6],unit:'µC'}, R:{choices:[10,20],unit:'cm'}, z:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '고리(Q='+p.Q+' µC, R='+p.R+' cm) 축 위 z='+p.z+' cm에서 V=kQ/√(z²+R²)를 계산하라(V).'; },
    solve:function(p){
      var V=8.99e9*p.Q*1e-6/Math.hypot(p.z/100,p.R/100);
      return { ans:V, unit:'V', steps:[
        '모든 조각이 같은 거리 √(z²+R²) → 적분이 그냥 합',
        'V = '+SVH.fmt(V)+' V (E보다 훨씬 쉬운 이유: 스칼라)' ] }; },
    hints:['거리 하나로 끝.'] },
  { id:'u3-l2-09', level:2, type:'num', tags:['퍼텐셜 에너지 쌍'], src:'창작 문제(검산됨)',
    params:{ q1:{choices:[2,4],unit:'µC'}, q2:{choices:[3,5],unit:'µC'}, r:{choices:[30,60],unit:'cm'} },
    statement:function(p){ return 'q₁='+p.q1+' µC와 q₂='+p.q2+' µC가 r='+p.r+' cm 떨어져 있다. 계의 전위 에너지 U(J)와, 놓아주면 무한대에서 갖게 될 총 운동에너지(J)를 구하라.'; },
    solve:function(p){ var U=8.99e9*p.q1*1e-6*p.q2*1e-6/(p.r/100);
      return { ans:{U:U, KE:U}, unit:{U:'J', KE:'J'}, steps:[
        'U = kq₁q₂/r = '+SVH.fmt(U)+' J',
        '척력계 → 전부 운동에너지로: KE_total = '+SVH.fmt(U)+' J' ] }; },
    hints:['U가 곧 방출 가능 에너지.'] },
  { id:'u3-l2-10', level:2, type:'num', tags:['등전위 간격'], src:'창작 문제(검산됨)',
    params:{ E:{choices:[500,2000],unit:'V/m'}, dV:{choices:[10,50],unit:'V'} },
    statement:function(p){ return '균일 장 '+p.E+' V/m에서 '+p.dV+' V 간격의 등전위면 사이 거리(mm)는?'; },
    solve:function(p){ var d=p.dV/p.E*1000;
      return { ans:d, unit:'mm', steps:[
        'd = ΔV/E = '+p.dV+'/'+p.E,
        '= '+SVH.fmt(d)+' mm (장이 셀수록 등고선이 빽빽 — 지형도 독법)' ] }; },
    hints:['E=ΔV/d.'] },
  { id:'u3-l2-11', level:2, type:'num', tags:['세 전하 조립 에너지'], src:'교재 표준',
    params:{ q:{choices:[1,2],unit:'µC'}, a:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '정삼각형(변 a='+p.a+' cm) 꼭짓점에 +q('+p.q+' µC) 셋을 무한대에서 조립하는 일(J)은?'; },
    solve:function(p){ var W=3*8.99e9*Math.pow(p.q*1e-6,2)/(p.a/100);
      return { ans:W, unit:'J', steps:[
        '쌍 3개, 각 kq²/a',
        'W = 3kq²/a = '+SVH.fmt(W)+' J (쌍의 개수 세기가 전부)' ] }; },
    hints:['nC2 쌍 합.'] },
  { id:'u3-l2-12', level:2, type:'num', tags:['전위차 적분'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[2,4],unit:'µC/m'}, r1:{choices:[2,5],unit:'cm'}, k:{choices:[2,4]} },
    statement:function(p){ return '무한 직선(λ='+p.lam+' µC/m)에서 r₁='+p.r1+' cm → r₂='+p.k+'r₁ 사이 전위차 V(r₁)−V(r₂) = (λ/2πε₀)ln(r₂/r₁)를 계산하라(V).'; },
    solve:function(p){
      var dv=p.lam*1e-6/(2*Math.PI*8.85e-12)*Math.log(p.k);
      return { ans:dv, unit:'V', steps:[
        'ΔV = ∫E dr = (λ/2πε₀)ln(r₂/r₁)',
        '= '+SVH.fmt(dv)+' V (무한대 기준이 불가한 대표 사례 — 차이만 정의)' ] }; },
    hints:['1/r 적분 = ln.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u3-l3-01', level:3, type:'num', tags:['균일구 전위 프로파일'], src:'기출 유형',
    params:{ Q:{choices:[4,8],unit:'µC'}, R:{choices:[20,40],unit:'cm'} },
    statement:function(p){ return '균일 절연구(Q='+p.Q+' µC, R='+p.R+' cm)의 (a) 표면 전위 (b) 중심 전위 V(0)=3kQ/2R (V)를 구하라. 중심이 표면보다 높은 이유는?'; },
    solve:function(p){
      var Vs=8.99e9*p.Q*1e-6/(p.R/100);
      return { ans:{Vs:Vs, V0:1.5*Vs}, unit:{Vs:'V', V0:'V'}, steps:[
        'V_s = kQ/R = '+SVH.fmt(Vs)+' V',
        'V(0) = (3/2)kQ/R = '+SVH.fmt(1.5*Vs)+' V',
        '내부에도 E가 안쪽을 향해 있어 들어갈수록 오르막 — 도체(평평)와 대비' ] }; },
    hints:['내부 E∝r 적분.'] },
  { id:'u3-l3-02', level:3, type:'num', tags:['탈출 속도형'], src:'기출 유형',
    params:{ q:{choices:[2,4],unit:'µC'}, m:{choices:[1,2],unit:'g'}, Q:{choices:[5,10],unit:'µC'}, r0:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '고정 +Q('+p.Q+' µC)에서 r₀='+p.r0+' cm에 있던 +q('+p.q+' µC, '+p.m+' g)를 놓았다. 무한대에서의 속력(m/s)은?'; },
    solve:function(p){
      var U=8.99e9*p.Q*1e-6*p.q*1e-6/(p.r0/100);
      var v=Math.sqrt(2*U/(p.m/1000));
      return { ans:v, unit:'m/s', steps:[
        'U = kQq/r₀ = '+SVH.fmt(U)+' J → 전부 KE로',
        'v = √(2U/m) = '+SVH.fmt(v)+' m/s' ] }; },
    hints:['보존 한 줄.'] },
  { id:'u3-l3-03', level:3, type:'num', tags:['최접근 거리'], src:'기출 유형',
    params:{ E0:{choices:[2,5],unit:'MeV'}, Z:{choices:[79]} },
    statement:function(p){ return '알파 입자(q=2e, KE='+p.E0+' MeV)가 금 원자핵(Z='+p.Z+')을 정면 돌진. 최접근 거리(fm)를 구하라. (러더퍼드)'; },
    solve:function(p){
      var d=8.99e9*2*p.Z*Math.pow(1.602e-19,2)/(p.E0*1e6*1.602e-19)*1e15;
      return { ans:d, unit:'fm', steps:[
        'KE = k(2e)(Ze)/d → d = 2Zke²/KE',
        '= '+SVH.fmt(d)+' fm (10⁻¹⁴ m — 핵 크기의 발견 논리, 기말 양자 파트 예고)' ] }; },
    hints:['정지점 = 전부 퍼텐셜.'] },
  { id:'u3-l3-04', level:3, type:'num', tags:['축상 V→E 유도'], src:'기출 유형',
    params:{ Q:{choices:[2,4],unit:'µC'}, R:{choices:[10,20],unit:'cm'}, z:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '링 전위 V(z)=kQ/√(z²+R²)를 미분해 E_z=−dV/dz를 구하고 z='+p.z+' cm에서 값(N/C)을 U1의 직접 결과와 비교하라.'; },
    solve:function(p){
      var z=p.z/100, R=p.R/100;
      var E=8.99e9*p.Q*1e-6*z/Math.pow(z*z+R*R,1.5);
      return { ans:E, unit:'N/C', steps:[
        '−d/dz[kQ(z²+R²)^{−1/2}] = kQz/(z²+R²)^{3/2}',
        '= '+SVH.fmt(E)+' N/C — U1 적분 결과와 동일 ✓',
        '(V 먼저 → 미분이 벡터 적분보다 쉽다는 것의 실증)' ] }; },
    hints:['연쇄율 미분.'] },
  { id:'u3-l3-05', level:3, type:'num', tags:['두 도체구 연결'], src:'기출 유형',
    params:{ R1:{choices:[10,20],unit:'cm'}, R2:{choices:[30,40],unit:'cm'}, Q:{choices:[8,12],unit:'µC'} },
    statement:function(p){ return '전하 Q='+p.Q+' µC를 가진 R₁='+p.R1+' cm 구를 먼 곳의 중성 R₂='+p.R2+' cm 구와 도선으로 연결. 평형 후 (a) 각 전하 q₁·q₂(µC) (b) 공통 전위(V)를 구하라.'; },
    solve:function(p){
      var q1=p.Q*p.R1/(p.R1+p.R2), q2=p.Q*p.R2/(p.R1+p.R2);
      var V=8.99e9*q1*1e-6/(p.R1/100);
      return { ans:{q1:q1, q2:q2, V:V}, unit:{q1:'µC', q2:'µC', V:'V'}, steps:[
        '조건: V₁=V₂ → q∝R',
        'q₁ = QR₁/(R₁+R₂) = '+SVH.fmt(q1)+', q₂ = '+SVH.fmt(q2)+' µC',
        'V = kq₁/R₁ = '+SVH.fmt(V)+' V (큰 구가 전하를 더 — 그러나 표면장은 작은 구가 세다: σ∝1/R, 피뢰침!)' ] }; },
    hints:['등전위 조건.'] },
  { id:'u3-l3-06', level:3, type:'num', tags:['평행판 사이 운동'], src:'기출 유형',
    params:{ V:{choices:[200,400],unit:'V'}, d:{choices:[2,4],unit:'cm'} },
    statement:function(p){ return '전위차 '+p.V+' V, 간격 d='+p.d+' cm 평행판에서 (a) 장(V/m) (b) −판에서 놓은 전자가 +판에 닿는 속력(m/s) (c) 걸린 시간(ns)을 구하라.'; },
    solve:function(p){
      var E=p.V/(p.d/100);
      var v=Math.sqrt(2*1.602e-19*p.V/9.11e-31);
      var a=1.602e-19*E/9.11e-31;
      var t=v/a*1e9;
      return { ans:{E:E, v:v, t:t}, unit:{E:'V/m', v:'m/s', t:'ns'}, steps:[
        'E = V/d = '+SVH.fmt(E)+' V/m',
        'v = √(2eV/m) = '+SVH.fmt(v)+' m/s (거리 무관 — 에너지는 전위차만)',
        't = v/a = '+SVH.fmt(t)+' ns' ] }; },
    hints:['에너지로 v, 운동학으로 t.'] },
  { id:'u3-l3-07', level:3, type:'num', tags:['쌍극자 전위'], src:'교재 표준',
    params:{ pm:{choices:[2,5],unit:'×10⁻⁹ C·m'}, r:{choices:[10,20],unit:'cm'}, th:{choices:[0,60]} },
    statement:function(p){ return '쌍극자(p='+p.pm+'×10⁻⁹ C·m) 원거리 전위 V=kp cosθ/r²를 r='+p.r+' cm, θ='+p.th+'°에서 계산하라(V).'; },
    solve:function(p){
      var V=8.99e9*p.pm*1e-9*Math.cos(SVH.rad(p.th))/Math.pow(p.r/100,2);
      return { ans:V, unit:'V', steps:[
        'V = kp cosθ/r² = '+SVH.fmt(V)+' V',
        '(1/r² 감쇠·θ=90°에서 0 — 수직이등분면 전체가 V=0 등전위면)' ] }; },
    hints:['공식 대입+대칭 해석.'] },
  { id:'u3-l3-08', level:3, type:'num', tags:['에너지로 배치 비교'], src:'기출 유형',
    params:{ q:{choices:[1,2],unit:'µC'}, a:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '정사각형(변 a='+p.a+' cm) 꼭짓점의 +q 넷(q='+p.q+' µC) 조립 에너지 U=(4+√2)kq²/a... 정확히는 (4+√2)·kq²/a인지 유도 계산하라(J).'; },
    solve:function(p){
      var kqa=8.99e9*Math.pow(p.q*1e-6,2)/(p.a/100);
      var U=(4+Math.SQRT2)*kqa;
      return { ans:U, unit:'J', steps:[
        '변 쌍 4개(거리 a) + 대각 쌍 2개(거리 √2a)',
        'U = 4kq²/a + 2kq²/√2a = (4+√2)kq²/a = '+SVH.fmt(U)+' J' ] }; },
    hints:['쌍 6개를 거리별로.'] },
  { id:'u3-l3-09', level:3, type:'num', tags:['V(x,y)→E벡터'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, b:{choices:[3,6]}, x:{choices:[1,2]}, y:{choices:[1,2]} },
    statement:function(p){ return 'V(x,y)='+p.a+'x²y−'+p.b+'y² [V]. 점 ('+p.x+','+p.y+')에서 E의 (a) x성분 (b) y성분 (c) 크기(V/m)를 구하라.'; },
    solve:function(p){
      var Ex=-2*p.a*p.x*p.y, Ey=-(p.a*p.x*p.x-2*p.b*p.y);
      return { ans:{Ex:Ex, Ey:Ey, E:Math.hypot(Ex,Ey)}, unit:{Ex:'V/m', Ey:'V/m', E:'V/m'}, steps:[
        'E_x = −∂V/∂x = −2axy = '+SVH.fmt(Ex),
        'E_y = −∂V/∂y = −(ax²−2by) = '+SVH.fmt(Ey),
        '|E| = '+SVH.fmt(Math.hypot(Ex,Ey))+' V/m (그래디언트의 실전)' ] }; },
    hints:['편미분 두 번.'] },
  { id:'u3-l3-10', level:3, type:'num', tags:['전자총 설계'], src:'기출 유형',
    params:{ v:{choices:[1,2],unit:'×10⁷ m/s'} },
    statement:function(p){ return '전자를 v='+p.v+'×10⁷ m/s로 가속하려면 필요한 전압(V)은? 양성자를 같은 속력으로 가속하려면 몇 배 전압이 필요한가? (m_p/m_e=1836)'; },
    solve:function(p){
      var v=p.v*1e7;
      var V=0.5*9.11e-31*v*v/1.602e-19;
      return { ans:{V:V, ratio:1836}, unit:{V:'V', ratio:'배'}, steps:[
        'V = mv²/2e = '+SVH.fmt(V)+' V',
        '같은 v → 에너지 ∝ m → 1836배 (같은 "전압"이면 같은 에너지지만 속력은 다르다 — 구분!)' ] }; },
    hints:['eV=½mv².'] },
  { id:'u3-l3-11', level:3, type:'num', tags:['동심 도체 전위'], src:'기출 유형',
    params:{ q:{choices:[2,4],unit:'µC'}, R1:{choices:[10],unit:'cm'}, R2:{choices:[20],unit:'cm'}, R3:{choices:[30],unit:'cm'} },
    statement:function(p){ return '중심 점전하 +q('+p.q+' µC), 중성 도체 구각(안 R₂='+p.R2+', 밖 R₃='+p.R3+' cm). r=R₁='+p.R1+' cm 지점(구각 안 빈 공간)의 전위(V)를 구하라. (세 구간 적분 합)'; },
    solve:function(p){
      var k=8.99e9, q=p.q*1e-6;
      var V=k*q*(1/(p.R1/100)-1/(p.R2/100)+1/(p.R3/100));
      return { ans:V, unit:'V', steps:[
        'V(R₁) = ∫∞→R₃(점전하) + 0(도체 내) + ∫R₂→R₁(점전하)',
        '= kq[1/R₁−1/R₂+1/R₃] = '+SVH.fmt(V)+' V',
        '(도체 구간은 "전위 유지" — 구간별 적분의 표준 기출형)' ] }; },
    hints:['E(r) 구간별로 적분.'] },
  { id:'u3-l3-12', level:3, type:'num', tags:['수소 원자 에너지'], src:'교재 표준',
    params:{ r:{choices:[0.0529],unit:'nm'} },
    statement:function(p){ return '보어 반지름 r='+p.r+' nm의 수소: (a) 퍼텐셜 U=−ke²/r(eV) (b) KE=+ke²/2r(eV) (c) 총 에너지(eV)를 구하라.'; },
    solve:function(p){
      var U=-8.99e9*Math.pow(1.602e-19,2)/(p.r*1e-9)/1.602e-19;
      return { ans:{U:U, K:-U/2, E:U/2}, unit:{U:'eV', K:'eV', E:'eV'}, steps:[
        'U = −ke²/r = '+SVH.fmt(U)+' eV',
        'KE(원운동 조건) = −U/2 = '+SVH.fmt(-U/2)+' eV',
        'E = U/2 = '+SVH.fmt(U/2)+' eV ≈ −13.6 eV (기말 양자화의 준비 — 비리얼)' ] }; },
    hints:['쿨롱=구심력 조건.'] },
  { id:'u3-l3-13', level:3, type:'num', tags:['도체구 최대 전압'], src:'기출 유형',
    params:{ R:{choices:[10,30],unit:'cm'}, Eb:{choices:[3],unit:'MV/m'} },
    statement:function(p){ return '공기 절연파괴 장 '+p.Eb+' MV/m. 반지름 R='+p.R+' cm 도체구가 가질 수 있는 (a) 최대 전위(kV) (b) 최대 전하(µC)를 구하라.'; },
    solve:function(p){
      var R=p.R/100;
      var V=p.Eb*1e6*R/1000, Q=p.Eb*1e6*R*R/8.99e9*1e6;
      return { ans:{V:V, Q:Q}, unit:{V:'kV', Q:'µC'}, steps:[
        '표면 E=kQ/R²≤E_b, V=kQ/R=E·R',
        'V_max = E_bR = '+SVH.fmt(V)+' kV, Q_max = '+SVH.fmt(Q)+' µC',
        '(클수록 고전압 가능 — 밴더그래프가 큰 이유·뾰족하면 방전하는 이유)' ] }; },
    hints:['V=ER 관계.'] },
  { id:'u3-l3-14', level:3, type:'num', tags:['일-에너지 경로 독립'], src:'창작 문제(검산됨)',
    params:{ q:{choices:[2,5],unit:'µC'}, V1:{choices:[300,500],unit:'V'}, V2:{choices:[100,200],unit:'V'} },
    statement:function(p){ return 'q='+p.q+' µC를 전위 '+p.V1+' V 점에서 '+p.V2+' V 점으로 옮긴다. (a) 전기력이 한 일(mJ) (b) 다른 경로로 가면 일은? (같음=1)'; },
    solve:function(p){ var W=p.q*1e-6*(p.V1-p.V2)*1000;
      return { ans:{W:W, same:1}, unit:{W:'mJ', same:''}, steps:[
        'W_field = q(V₁−V₂) = '+SVH.fmt(W)+' mJ (내리막이라 양수)',
        '보존장 → 경로 무관(1) — "전위"가 존재하는 바로 그 이유' ] }; },
    hints:['V는 상태함수.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u3-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ V=0인 점에서 E≠0일 수 있다<br>㉡ E=0인 영역에서 V는 일정하다<br>㉢ 도체 표면에서 σ는 곡률이 큰(뾰족한) 곳에 몰린다<br>㉣ 전위는 스칼라라서 중첩이 산술합이다',
    choices:['전부','㉠㉡㉣','㉡㉢㉣','㉠㉢'],
    answer:0, expl:'전부 참. ㉢은 l3-05(피뢰침)의 결론 — 등전위 조건 kq/R 동일 → σ∝1/R.' },
  { id:'u3-l4-02', level:4, type:'num', tags:['가우스+전위 통합'], src:'기출 유형',
    params:{ Q:{choices:[4,6],unit:'µC'}, R:{choices:[20,30],unit:'cm'} },
    statement:function(p){ return '균일 절연구(Q='+p.Q+' µC, R='+p.R+' cm): 표면 기준 무한대까지 (a) V(R) (b) V(R/2) (c) 전자를 표면에서 중심까지 보내는 데 외부가 할 일(음수면 전기력이 해줌, eV)을 구하라.'; },
    solve:function(p){
      var k=8.99e9, R=p.R/100;
      var Vs=k*p.Q*1e-6/R;
      var Vh=k*p.Q*1e-6/(2*R)*(3-Math.pow(0.5,2)); // V(r)=kQ(3-r²/R²)/2R
      var W=-(1)*(1.5*Vs-Vh)*(-1); // 전자 q=-e: W_ext = qΔV = (-e)(V0-Vs) → eV 단위로: -(V0-Vs)
      var dV=1.5*Vs-Vs; // V0-Vs
      var Wext=-(1.5*Vs-Vh)*0; // 정리 아래 steps에서 명확화
      var W_eV=-( (1.5*Vs) - Vs ); // (-e)(V(0)-V(R)) / e = -(V0-VR)
      return { ans:{Vs:Vs, Vh:Vh, W:W_eV}, unit:{Vs:'V', Vh:'V', W:'eV'}, steps:[
        'V(R) = kQ/R = '+SVH.fmt(Vs)+' V',
        '내부식 V(r)=kQ(3−r²/R²)/2R → V(R/2) = '+SVH.fmt(Vh)+' V',
        '전자(−e): W_ext = (−e)(V(0)−V(R)) = −(V₀−V_R) eV = '+SVH.fmt(W_eV)+' eV (음수 = 전기력이 안으로 끌어줌... 부호 논의가 핵심)' ] }; },
    hints:['내부 전위식 유도 또는 암기.','전자 부호 반전 주의.'] },
  { id:'u3-l4-03', level:4, type:'derive', tags:['유도'], src:'강의자료 대조',
    statement:'균일 절연구 내부 전위 \\(V(r)=\\dfrac{kQ}{2R}\\left(3-\\dfrac{r^2}{R^2}\\right)\\)를 E(r) 적분으로 유도하라.',
    steps:[
      '바깥 적분: \\(V(R)=\\int_R^\\infty kQ/r^2\\,dr=kQ/R\\) [왜] 무한대 0 기준',
      '내부 장: \\(E=kQr/R^3\\) (가우스, U2)',
      '이어 적분: \\(V(r)=V(R)+\\int_r^R kQr\'/R^3dr\'=kQ/R+\\dfrac{kQ}{2R^3}(R^2-r^2)\\)',
      '정리: \\(V(r)=\\dfrac{kQ}{2R}(3-r^2/R^2)\\) — 중심에서 (3/2)kQ/R',
      '극한 체크: r=R ⇒ kQ/R 연속 ✓ · dV/dr|₀=0 (중심 E=0) ✓ · 차원 [V] ✓'
    ],
    hints:['두 구간 적분을 이어붙인다.','연속성·미분값으로 검산.'],
    expl:'가우스(U2)→전위(U3) 연결 유도의 대표 — 퀴즈1 저격 범위.' },
  { id:'u3-l4-04', level:4, type:'num', tags:['축상 왕복 진동'], src:'기출 유형',
    params:{ Q:{choices:[3,6],unit:'µC'}, R:{choices:[10,20],unit:'cm'}, q:{choices:[1,2],unit:'µC'}, m:{choices:[1,2],unit:'g'} },
    statement:function(p){ return '고리(+Q='+p.Q+' µC, R='+p.R+' cm) 축 위 z=R에서 놓은 −q('+p.q+' µC, m='+p.m+' g)가 중심을 지나 반대편 z=−R까지 왕복한다. 중심 통과 속력(m/s)을 에너지로 구하라.'; },
    solve:function(p){
      var k=8.99e9, R=p.R/100;
      var dV=k*p.Q*1e-6*(1/R-1/(Math.SQRT2*R));
      var v=Math.sqrt(2*p.q*1e-6*dV/(p.m/1000));
      return { ans:v, unit:'m/s', steps:[
        'V(0)−V(R축) = kQ(1/R − 1/√2R) = '+SVH.fmt(dV)+' V',
        '−q는 전위 높은 곳(중심)으로 가속: ½mv² = qΔV',
        'v = '+SVH.fmt(v)+' m/s (대칭이라 반대편 z=−R에서 속력 0 — 진동)' ] }; },
    hints:['링 전위 두 점 차.'] },
  { id:'u3-l4-05', level:4, type:'num', tags:['번개 추정'], src:'기출 유형',
    params:{ V:{choices:[100,300],unit:'MV'}, q:{choices:[20,30],unit:'C'} },
    statement:function(p){ return '구름-지면 전위차 '+p.V+' MV, 이동 전하 '+p.q+' C인 번개의 (a) 방출 에너지(J) (b) 이 에너지로 물 몇 kg을 0→100°C 데울 수 있나? (c=4186 J/kg·K)'; },
    solve:function(p){
      var E=p.V*1e6*p.q;
      var mkg=E/(4186*100);
      return { ans:{E:E, m:mkg}, unit:{E:'J', m:'kg'}, steps:[
        'E = qV = '+SVH.fmt(E)+' J',
        'm = E/(cΔT) = '+SVH.fmt(mkg)+' kg (~'+SVH.fmt(mkg/1000)+'톤 — 오더 감각 문제)' ] }; },
    hints:['qV 한 줄+열량.'] },
  { id:'u3-l4-06', level:4, type:'num', tags:['등전위 지도 판독'], src:'기출 유형',
    params:{ dV:{choices:[10,20],unit:'V'}, d:{choices:[5,10],unit:'mm'}, q:{choices:[2,5],unit:'µC'} },
    statement:function(p){ return '지도에서 '+p.dV+' V 간격 등전위선이 국소적으로 d='+p.d+' mm 간격이다. (a) 그 지점 |E|(V/m) (b) +q('+p.q+' µC)가 등전위선 3칸을 내려갈 때 전기력이 한 일(mJ) (c) 등전위선을 따라 5 cm 움직일 때 일(J)을 구하라.'; },
    solve:function(p){
      var E=p.dV/(p.d/1000);
      var W=p.q*1e-6*3*p.dV*1000;
      return { ans:{E:E, W:W, W2:0}, unit:{E:'V/m', W:'mJ', W2:'J'}, steps:[
        '|E| ≈ ΔV/Δd = '+SVH.fmt(E)+' V/m',
        'W = qΔV = q·3·'+p.dV+' = '+SVH.fmt(W)+' mJ',
        '등전위 따라 = 0 J (지형도 독법 3종 세트)' ] }; },
    hints:['간격→기울기.'] },
  { id:'u3-l4-07', level:4, type:'num', tags:['분자 결합 에너지'], src:'기출 유형',
    params:{ d:{choices:[0.24,0.28],unit:'nm'} },
    statement:function(p){ return 'NaCl 이온쌍(±e, 간격 d='+p.d+' nm)의 (a) 쿨롱 결합 에너지(eV) (b) 실측 해리 에너지가 이보다 작은 이유 한 가지... 계산은 (a)만: U=−ke²/d.'; },
    solve:function(p){
      var U=-8.99e9*Math.pow(1.602e-19,2)/(p.d*1e-9)/1.602e-19;
      return { ans:U, unit:'eV', steps:[
        'U = −ke²/d = '+SVH.fmt(U)+' eV',
        '(실제 해리 ≈ 4.3 eV보다 깊은 이유: 반발 항·전자 재배치 비용 — 모델의 한계 논의)' ] }; },
    hints:['부호 포함 그대로.'] },
  { id:'u3-l4-08', level:4, type:'num', tags:['도체+점전하 에너지 수지'], src:'기출 유형',
    params:{ Q:{choices:[2,4],unit:'µC'}, R1:{choices:[10],unit:'cm'}, R2:{choices:[20,40],unit:'cm'} },
    statement:function(p){ return 'R₁='+p.R1+' cm 도체구(Q='+p.Q+' µC)를 도선으로 먼 R₂='+p.R2+' cm 중성구에 연결(l3-05 상황). 연결 전후 계의 정전 에너지 U=Q²/2C 형태로: (a) 전 (b) 후(J) (c) 사라진 에너지의 행방을 답하라. (C_구=R/k 사용)'; },
    solve:function(p){
      var k=8.99e9, R1=p.R1/100, R2=p.R2/100, Q=p.Q*1e-6;
      var U1=k*Q*Q/(2*R1);
      var U2=k*Q*Q/(2*(R1+R2));
      return { ans:{U1:U1, U2:U2}, unit:{U1:'J', U2:'J'}, steps:[
        '전: U = kQ²/2R₁ = '+SVH.fmt(U1)+' J',
        '후: 등전위 병렬 = 반지름 합 → U = kQ²/2(R₁+R₂) = '+SVH.fmt(U2)+' J',
        '차 '+SVH.fmt(U1-U2)+' J는 도선 저항 열·스파크로 — "전하 보존돼도 에너지는 준다" (U4 축전기 연결 문제의 예습)' ] }; },
    hints:['구의 C=R/k, 병렬 합.'] }
  ]
});
