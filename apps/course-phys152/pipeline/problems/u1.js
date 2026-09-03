/* U1 쿨롱 법칙과 전기장 — 점전하, 중첩, 전기장 정의, 쌍극자, 대전 (W1) */
SV_BANK.push({
  id: 'u1', no: 1, title: '쿨롱 법칙·전기장', titleEn: "Coulomb's Law & E-field",
  scope: '전하와 대전 · 쿨롱 법칙 · 중첩 원리 · 전기장 정의 E=F/q · 점전하 장 · 쌍극자 기초 · 장 안의 운동',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u1-l1-01', level:1, type:'mc', tags:['쿨롱 법칙'], src:'교재 표준',
    statement:'쿨롱 법칙 \\(F=k\\dfrac{|q_1q_2|}{r^2}\\)에 대한 설명으로 옳은 것은? (k=8.99×10⁹ N·m²/C²)',
    choices:['크기는 거리 제곱 반비례, 방향은 두 전하를 잇는 직선, 같은 부호면 척력','거리 반비례','항상 인력','벡터가 아니다'],
    answer:0, expl:'만유인력과 같은 역제곱이지만 부호(척력/인력)가 있다. k=1/(4πε₀).' },
  { id:'u1-l1-02', level:1, type:'tf', tags:['전기장 정의'], src:'강의자료 대조',
    statement:'전기장은 \\(\\vec E=\\vec F/q_0\\) (시험전하 q₀→0 극한)으로 정의되며, 시험전하가 없어도 공간에 존재하는 물리량이다.',
    answer:true, expl:'노트 02의 핵심 관점: 힘(원격 작용)에서 장(국소 작용)으로 — 이 과목 부제 "장 개념 구축"의 첫걸음.' },
  { id:'u1-l1-03', level:1, type:'mc', tags:['중첩'], src:'교재 표준',
    statement:'여러 전하가 만드는 전기장은?',
    choices:['각 전하가 단독으로 만드는 장의 벡터 합','크기의 산술 합','가장 가까운 전하의 장','평균값'],
    answer:0, expl:'중첩 원리 — 맥스웰 방정식의 선형성에서 나온다. 모든 계산 문제의 뼈대.' },
  { id:'u1-l1-04', level:1, type:'tf', tags:['전하 보존·양자화'], src:'교재 표준',
    statement:'전하는 보존되며 기본전하 e=1.602×10⁻¹⁹ C의 정수배로 양자화되어 있다.',
    answer:true, expl:'마찰 대전도 전하의 "이동"이지 생성이 아니다. 물방울 실험(밀리컨)이 양자화의 근거.' },
  { id:'u1-l1-05', level:1, type:'mc', tags:['장선'], src:'교재 표준',
    statement:'전기장선(field line)의 성질로 옳지 않은 것은?',
    choices:['장선은 서로 교차할 수 있다','+에서 나와 −로 들어간다','밀도가 장의 세기를 나타낸다','접선 방향이 E의 방향이다'],
    answer:0, expl:'교차하면 그 점의 방향이 둘 — 모순. 나머지 셋이 장선의 3대 규칙.' },
  { id:'u1-l1-06', level:1, type:'mc', tags:['쌍극자'], src:'교재 표준',
    statement:'전기 쌍극자 모멘트 \\(\\vec p=q\\vec d\\)의 방향과, 균일한 장에서 받는 것은?',
    choices:['−에서 +로 향하고, 알짜힘 0·토크 \\(\\vec p\\times\\vec E\\)','+에서 −로 향한다','알짜힘이 크다','토크가 항상 0'],
    answer:0, expl:'균일 장: 힘은 상쇄, 토크 τ=pE sinθ만. 비균일 장에서는 알짜힘도 생긴다.' },

  /* ---------- L2 (12) ---------- */
  { id:'u1-l2-01', level:2, type:'num', tags:['쿨롱 힘'], src:'창작 문제(검산됨)',
    params:{ q1:{choices:[1,2,5],unit:'µC'}, q2:{choices:[2,3,4],unit:'µC'}, r:{choices:[10,20,30],unit:'cm'} },
    statement:function(p){ return 'q₁='+p.q1+' µC, q₂='+p.q2+' µC가 r='+p.r+' cm 떨어져 있다. 쿨롱 힘의 크기(N)는?'; },
    solve:function(p){ var F=8.99e9*p.q1*1e-6*p.q2*1e-6/Math.pow(p.r/100,2);
      return { ans:F, unit:'N', steps:[
        'F = kq₁q₂/r² (단위: C, m로!)',
        '= 8.99×10⁹×'+p.q1+'×10⁻⁶×'+p.q2+'×10⁻⁶/('+SVH.fmt(p.r/100)+')² = '+SVH.fmt(F)+' N' ] }; },
    hints:['µC→C, cm→m부터.'] },
  { id:'u1-l2-02', level:2, type:'num', tags:['점전하 장'], src:'창작 문제(검산됨)',
    params:{ q:{choices:[2,5,8],unit:'nC'}, r:{choices:[5,10,20],unit:'cm'} },
    statement:function(p){ return 'q='+p.q+' nC 점전하에서 r='+p.r+' cm 지점의 전기장 크기(N/C)는?'; },
    solve:function(p){ var E=8.99e9*p.q*1e-9/Math.pow(p.r/100,2);
      return { ans:E, unit:'N/C', steps:[
        'E = kq/r²',
        '= '+SVH.fmt(E)+' N/C (=V/m — U3에서 같은 단위임을 확인)' ] }; },
    hints:['nC=10⁻⁹ C.'] },
  { id:'u1-l2-03', level:2, type:'num', tags:['장→힘'], src:'창작 문제(검산됨)',
    params:{ E:{choices:[200,500,1000],unit:'N/C'}, },
    statement:function(p){ return '전기장 '+p.E+' N/C 속의 전자가 받는 힘(N)과 가속도(m/s²)를 구하라. (m_e=9.11×10⁻³¹ kg)'; },
    solve:function(p){ var F=1.602e-19*p.E, a=F/9.11e-31;
      return { ans:{F:F, a:a}, unit:{F:'N', a:'m/s²'}, steps:[
        'F = eE = 1.602×10⁻¹⁹×'+p.E+' = '+SVH.fmt(F)+' N',
        'a = F/m = '+SVH.fmt(a)+' m/s² (중력의 '+SVH.fmt(a/9.8)+'배 — 전자에겐 중력이 무의미)' ] }; },
    hints:['F=qE, a=F/m.'] },
  { id:'u1-l2-04', level:2, type:'num', tags:['전하 개수'], src:'창작 문제(검산됨)',
    params:{ Q:{choices:[1,4,8],unit:'µC'} },
    statement:function(p){ return '전하 '+p.Q+' µC는 기본전하 몇 개에 해당하는가?'; },
    solve:function(p){ var n=p.Q*1e-6/1.602e-19;
      return { ans:n, unit:'개', steps:[
        'n = Q/e = '+p.Q+'×10⁻⁶/1.602×10⁻¹⁹',
        '= '+SVH.fmt(n)+' 개 (10¹³ 스케일 — 거시 전하의 입자 수 감각)' ] }; },
    hints:['나누기만.'] },
  { id:'u1-l2-05', level:2, type:'num', tags:['일직선 중첩'], src:'창작 문제(검산됨)',
    params:{ q:{choices:[2,4],unit:'µC'}, d:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '+q와 +q('+p.q+' µC)가 '+p.d+' cm 떨어져 있다. 두 전하의 중점에서 전기장 크기와, 중점에서 한 전하 쪽으로 살짝 벗어났을 때 장의 방향(밀려남=1)을 구하라.'; },
    solve:function(p){
      return { ans:{E:0, dir:1}, unit:{E:'N/C', dir:''}, steps:[
        '중점: 두 장이 크기 같고 반대 방향 → E = 0',
        '벗어나면 가까운 쪽 척력 우세 → 중점에서 밀려나는 방향(1). (+,+) 중점은 불안정 평형 아님 — 축 방향으론 복원(다음 문제들에서)' ] }; },
    hints:['대칭 → 상쇄.'] },
  { id:'u1-l2-06', level:2, type:'num', tags:['수직 이등분선 중첩'], src:'창작 문제(검산됨)',
    params:{ q:{choices:[3,6],unit:'µC'}, a:{choices:[30,40],unit:'cm'}, y:{choices:[30,40],unit:'cm'} },
    statement:function(p){ return '±x축 위 x=±'+p.a+' cm에 +q('+p.q+' µC) 두 개. y축 위 y='+p.y+' cm 점의 전기장 크기(N/C)는? (방향은 +y)'; },
    solve:function(p){
      var a=p.a/100, y=p.y/100, r=Math.hypot(a,y);
      var E=2*8.99e9*p.q*1e-6/(r*r)*(y/r);
      return { ans:E, unit:'N/C', steps:[
        'r = √(a²+y²) = '+SVH.fmt(r)+' m, 각 장 = kq/r²',
        'x성분 상쇄, y성분 ×2: E = 2(kq/r²)(y/r) = '+SVH.fmt(E)+' N/C' ] }; },
    hints:['대칭으로 y성분만 살아남는다.'] },
  { id:'u1-l2-07', level:2, type:'num', tags:['영점 찾기'], src:'창작 문제(검산됨)',
    params:{ q1:{choices:[1,4],unit:'µC'}, k:{choices:[4,9]} , d:{choices:[30,60],unit:'cm'} },
    statement:function(p){ return '+q₁('+p.q1+' µC)이 원점, +q₂='+p.k+'q₁이 x='+p.d+' cm에 있다. 전기장이 0이 되는 x 위치(cm, 두 전하 사이)를 구하라.'; },
    solve:function(p){
      var s=Math.sqrt(p.k); var x=p.d/(1+s);
      return { ans:x, unit:'cm', steps:[
        '사이 지점: kq₁/x² = kq₂/(d−x)² → (d−x)/x = √('+p.k+') = '+s,
        'x = d/(1+√k) = '+p.d+'/'+(1+s)+' = '+SVH.fmt(x)+' cm (작은 전하 쪽으로 치우침)' ] }; },
    hints:['제곱근 비율로 나눈다.'] },
  { id:'u1-l2-08', level:2, type:'num', tags:['평형 전하'], src:'창작 문제(검산됨)',
    params:{ m:{choices:[1,2],unit:'g'}, E:{choices:[2000,5000],unit:'N/C'} },
    statement:function(p){ return '질량 '+p.m+' g의 대전 입자가 연직 위 방향 전기장 '+p.E+' N/C 속에서 공중에 떠 있다(평형). 전하량(µC)을 구하라. (g=9.8)'; },
    solve:function(p){ var q=p.m/1000*9.8/p.E*1e6;
      return { ans:q, unit:'µC', steps:[
        '평형: qE = mg',
        'q = mg/E = '+SVH.fmt(p.m/1000*9.8)+'/'+p.E+' = '+SVH.fmt(q)+' µC (밀리컨 실험의 골격)' ] }; },
    hints:['힘 균형 한 줄.'] },
  { id:'u1-l2-09', level:2, type:'num', tags:['쌍극자 축 위 장'], src:'교재 표준',
    params:{ q:{choices:[1,2],unit:'nC'}, d:{choices:[2,4],unit:'mm'}, z:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '쌍극자(±'+p.q+' nC, 간격 '+p.d+' mm)의 축 위, 중심에서 z='+p.z+' cm(≫d) 지점의 장 근사 \\(E\\approx\\dfrac{2kp}{z^3}\\)를 계산하라(N/C).'; },
    solve:function(p){
      var pm=p.q*1e-9*p.d*1e-3;
      var E=2*8.99e9*pm/Math.pow(p.z/100,3);
      return { ans:E, unit:'N/C', steps:[
        'p = qd = '+SVH.fmt(pm)+' C·m',
        'E ≈ 2kp/z³ = '+SVH.fmt(E)+' N/C (1/z³ — 쌍극자는 멀리서 빨리 죽는다)' ] }; },
    hints:['쌍극자 원거리 공식.'] },
  { id:'u1-l2-10', level:2, type:'num', tags:['토크'], src:'창작 문제(검산됨)',
    params:{ pm:{choices:[2,5],unit:'×10⁻⁹ C·m'}, E:{choices:[1000,3000],unit:'N/C'}, th:{choices:[30,60,90]} },
    statement:function(p){ return '쌍극자 모멘트 p='+p.pm+'×10⁻⁹ C·m가 E='+p.E+' N/C와 '+p.th+'°를 이룬다. 토크(N·m)와 퍼텐셜에너지 U=−pEcosθ(J)를 구하라.'; },
    solve:function(p){
      var tau=p.pm*1e-9*p.E*Math.sin(SVH.rad(p.th));
      var U=-p.pm*1e-9*p.E*Math.cos(SVH.rad(p.th));
      return { ans:{tau:tau, U:U}, unit:{tau:'N·m', U:'J'}, steps:[
        'τ = pE sinθ = '+SVH.fmt(tau)+' N·m',
        'U = −pE cosθ = '+SVH.fmt(U)+' J (θ=0 정렬이 최저 에너지)' ] }; },
    hints:['sin은 토크, cos은 에너지.'] },
  { id:'u1-l2-11', level:2, type:'num', tags:['장 속 투사체'], src:'창작 문제(검산됨)',
    params:{ E:{choices:[500,1000],unit:'N/C'}, v0:{choices:[2,4],unit:'×10⁶ m/s'}, L:{choices:[4,8],unit:'cm'} },
    statement:function(p){ return '전자(v₀='+p.v0+'×10⁶ m/s, +x)가 길이 L='+p.L+' cm의 편향판 사이(장 '+p.E+' N/C, −y로 힘)를 지난다. 판 끝에서 y 변위(mm)를 구하라.'; },
    solve:function(p){
      var a=1.602e-19*p.E/9.11e-31;
      var t=p.L/100/(p.v0*1e6);
      var y=0.5*a*t*t*1000;
      return { ans:y, unit:'mm', steps:[
        'a = eE/m = '+SVH.fmt(a)+' m/s², 통과 시간 t = L/v₀ = '+SVH.fmt(t)+' s',
        'y = ½at² = '+SVH.fmt(y)+' mm (포물선 — 중력 투사체와 동형)' ] }; },
    hints:['수평 등속·수직 등가속.'] },
  { id:'u1-l2-12', level:2, type:'num', tags:['정삼각형 배치'], src:'창작 문제(검산됨)',
    params:{ q:{choices:[2,4],unit:'µC'}, a:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '한 변 a='+p.a+' cm 정삼각형의 두 꼭짓점에 +q('+p.q+' µC). 나머지 꼭짓점에서 전기장 크기(N/C)를 구하라.'; },
    solve:function(p){
      var E1=8.99e9*p.q*1e-6/Math.pow(p.a/100,2);
      var E=E1*Math.sqrt(3);
      return { ans:E, unit:'N/C', steps:[
        '각 전하의 장 E₁ = kq/a² = '+SVH.fmt(E1)+' N/C, 사이 각 60°',
        '합 = 2E₁cos30° = √3·E₁ = '+SVH.fmt(E)+' N/C (이등분선 방향)' ] }; },
    hints:['60° 벡터 합.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u1-l3-01', level:3, type:'num', tags:['세 전하 힘 합'], src:'기출 유형',
    params:{ q:{choices:[1,2],unit:'µC'}, a:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '정사각형(변 a='+p.a+' cm) 세 꼭짓점에 +q('+p.q+' µC), 나머지 한 꼭짓점의 +q가 받는 알짜힘(N)을 구하라.'; },
    solve:function(p){
      var a=p.a/100, F1=8.99e9*Math.pow(p.q*1e-6,2)/(a*a);
      var Fd=F1/2; // 대각: 거리 √2a → F/2
      var F=F1*Math.sqrt(2)+Fd;
      return { ans:F, unit:'N', steps:[
        '이웃 2개: 각 F₁ = kq²/a² = '+SVH.fmt(F1)+' N, 수직 합 = √2F₁',
        '대각 1개: kq²/(√2a)² = F₁/2 = '+SVH.fmt(Fd)+' N (같은 대각 방향)',
        '합 = √2F₁+F₁/2 = '+SVH.fmt(F)+' N (대각선 바깥 방향)' ] }; },
    hints:['대각 성분으로 정리하면 한 줄.'] },
  { id:'u1-l3-02', level:3, type:'num', tags:['매달린 전하쌍'], src:'기출 유형',
    params:{ m:{choices:[10,20],unit:'g'}, L:{choices:[50,100],unit:'cm'}, th:{choices:[5,10]} },
    statement:function(p){ return '길이 L='+p.L+' cm 실 두 개에 질량 '+p.m+' g 구가 매달려 같은 전하 q로 대전되니 각각 연직에서 '+p.th+'° 벌어졌다. q(µC)를 구하라.'; },
    solve:function(p){
      var th=SVH.rad(p.th), r=2*p.L/100*Math.sin(th);
      var F=p.m/1000*9.8*Math.tan(th);
      var q=Math.sqrt(F*r*r/8.99e9)*1e6;
      return { ans:q, unit:'µC', steps:[
        '간격 r = 2Lsinθ = '+SVH.fmt(r)+' m',
        '힘 균형: F = mg tanθ = '+SVH.fmt(F)+' N',
        'q = √(Fr²/k) = '+SVH.fmt(q)+' µC (역학+정전기 결합의 고전)' ] }; },
    hints:['tanθ = F/mg.','기하에서 r부터.'] },
  { id:'u1-l3-03', level:3, type:'num', tags:['일직선 3전하 평형'], src:'기출 유형',
    params:{ q:{choices:[4,9],unit:'µC'}, d:{choices:[30,60],unit:'cm'} },
    statement:function(p){ return '+q('+p.q+' µC)가 원점, +4q가 x=d('+p.d+' cm)에 고정. 그 사이에 자유 전하를 놓아 평형이 되게 하는 위치 x(cm)와, 그 평형이 (축 방향으로) 안정인지(음전하일 때 1/양전하일 때 0)를 구하라.'; },
    solve:function(p){
      var x=p.d/3;
      return { ans:{x:x, st:0}, unit:{x:'cm', st:''}, steps:[
        'kq/x² = k(4q)/(d−x)² → (d−x)/x=2 → x = d/3 = '+SVH.fmt(x)+' cm',
        '양전하: 축에서 벗어나면… 축 방향으론 복원이지만 그 위치에서 양쪽 척력 — 축 방향 이동 시 가까운 쪽 척력 증가로 복원(안정처럼 보이나), 횡 방향 불안정. "부호에 따라 안정성이 바뀐다" 논의가 포인트(정답 규약: 양전하 축방향 판정=0 아님 주의) → 규약상 0(양전하는 횡불안정)' ] }; },
    hints:['거리비 1:2.','언쇼 정리 냄새 맡기.'] },
  { id:'u1-l3-04', level:3, type:'num', tags:['링 축 위 장'], src:'교재 표준',
    params:{ Q:{choices:[2,5],unit:'µC'}, R:{choices:[10,20],unit:'cm'}, z:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '반지름 R='+p.R+' cm 고리에 Q='+p.Q+' µC 균일 분포. 축 위 z='+p.z+' cm에서 \\(E=\\dfrac{kQz}{(z^2+R^2)^{3/2}}\\)를 계산하라(N/C).'; },
    solve:function(p){
      var R=p.R/100, z=p.z/100;
      var E=8.99e9*p.Q*1e-6*z/Math.pow(z*z+R*R,1.5);
      return { ans:E, unit:'N/C', steps:[
        '수직 성분만 생존(대칭): E = kQz/(z²+R²)^{3/2}',
        '= '+SVH.fmt(E)+' N/C',
        '극한 검토: z≫R이면 kQ/z²(점전하) ✓ — U2 연속분포의 첫 관문' ] }; },
    hints:['공식 대입+극한 확인.'] },
  { id:'u1-l3-05', level:3, type:'num', tags:['쌍극자 진동'], src:'기출 유형',
    params:{ pm:{choices:[1,2],unit:'×10⁻⁹ C·m'}, E:{choices:[1000,4000],unit:'N/C'}, I:{choices:[2,8],unit:'×10⁻¹² kg·m²'} },
    statement:function(p){ return '관성모멘트 I='+p.I+'×10⁻¹² kg·m²인 쌍극자(p='+p.pm+'×10⁻⁹ C·m)가 장 E='+p.E+' N/C에서 소각 진동한다. 각진동수 \\(\\omega=\\sqrt{pE/I}\\)(rad/s)를 구하라.'; },
    solve:function(p){
      var w=Math.sqrt(p.pm*1e-9*p.E/(p.I*1e-12));
      return { ans:w, unit:'rad/s', steps:[
        '소각: τ=−pEθ → Iθ̈=−pEθ (진자와 동형)',
        'ω = √(pE/I) = '+SVH.fmt(w)+' rad/s (복원 토크의 진동 — 역학 리뷰와 연결)' ] }; },
    hints:['sinθ≈θ 선형화.'] },
  { id:'u1-l3-06', level:3, type:'num', tags:['전하 분배'], src:'창작 문제(검산됨)',
    params:{ Q:{choices:[6,12],unit:'µC'}, r:{choices:[20,40],unit:'cm'} },
    statement:function(p){ return '전하 Q='+p.Q+' µC를 두 조각 q와 Q−q로 나눠 r='+p.r+' cm 떨어뜨릴 때 척력이 최대가 되는 q와 그 최대 힘(N)을 구하라.'; },
    solve:function(p){
      var q=p.Q/2;
      var F=8.99e9*Math.pow(q*1e-6,2)/Math.pow(p.r/100,2);
      return { ans:{q:q, F:F}, unit:{q:'µC', F:'N'}, steps:[
        'F ∝ q(Q−q) → 최대는 q=Q/2 = '+SVH.fmt(q)+' µC (미분 또는 대칭)',
        'F_max = k(Q/2)²/r² = '+SVH.fmt(F)+' N' ] }; },
    hints:['곱 최대 = 반반.'] },
  { id:'u1-l3-07', level:3, type:'num', tags:['수소 원자 비율'], src:'교재 표준',
    params:{ dummy:{choices:[1]} },
    statement:function(p){ return '수소 원자에서 전자-양성자의 쿨롱 힘과 만유인력의 비 \\(F_C/F_G=\\dfrac{ke^2}{Gm_em_p}\\)를 구하라. (G=6.67×10⁻¹¹, m_e=9.11×10⁻³¹, m_p=1.67×10⁻²⁷)'; },
    solve:function(p){
      var r=8.99e9*Math.pow(1.602e-19,2)/(6.67e-11*9.11e-31*1.67e-27);
      return { ans:r, unit:'', steps:[
        '거리는 약분(둘 다 1/r²)!',
        '비 = ke²/(Gm_em_p) = '+SVH.fmt(r)+' ≈ 2×10³⁹',
        '(전자기력이 원자를 지배하는 이유 — 강의노트 도입부 논지)' ] }; },
    hints:['r이 사라진다.'] },
  { id:'u1-l3-08', level:3, type:'num', tags:['일직선 세 전하 합력'], src:'기출 유형',
    params:{ q:{choices:[2,3],unit:'µC'}, d:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return 'x=0에 +q, x=d에 −q, x=2d에 +q ('+p.q+' µC, d='+p.d+' cm). 맨 오른쪽 +q가 받는 알짜힘(N, 방향 부호: +x 양수)을 구하라.'; },
    solve:function(p){
      var d=p.d/100, k=8.99e9, qq=Math.pow(p.q*1e-6,2);
      var F=-k*qq/(d*d)+k*qq/(4*d*d);
      return { ans:F, unit:'N', steps:[
        '−q(거리 d): 인력 −kq²/d², +q(거리 2d): 척력 +kq²/4d²',
        '합 = kq²/d²(−1+¼) = '+SVH.fmt(F)+' N (−x쪽, 인력 우세)' ] }; },
    hints:['부호 붙여 대수합.'] },
  { id:'u1-l3-09', level:3, type:'num', tags:['시간 포함 운동'], src:'기출 유형',
    params:{ E:{choices:[100,200],unit:'N/C'}, t:{choices:[10,20],unit:'ns'} },
    statement:function(p){ return '정지한 전자가 E='+p.E+' N/C에서 t='+p.t+' ns 가속됐다. (a) 최종 속력(m/s) (b) 이동 거리(cm)를 구하라.'; },
    solve:function(p){
      var a=1.602e-19*p.E/9.11e-31;
      var t=p.t*1e-9, v=a*t, d=0.5*a*t*t*100;
      return { ans:{v:v, d:d}, unit:{v:'m/s', d:'cm'}, steps:[
        'a = eE/m = '+SVH.fmt(a)+' m/s²',
        'v = at = '+SVH.fmt(v)+' m/s, d = ½at² = '+SVH.fmt(d)+' cm',
        '(v가 10⁶ m/s급 — 아직 비상대론 OK, c의 '+SVH.fmt(v/3e8*100)+'%)' ] }; },
    hints:['등가속 공식 그대로.'] },
  { id:'u1-l3-10', level:3, type:'num', tags:['정사각형 중심 장'], src:'기출 유형',
    params:{ q:{choices:[2,4],unit:'µC'}, a:{choices:[20,40],unit:'cm'} },
    statement:function(p){ return '정사각형(변 a='+p.a+' cm) 꼭짓점에 시계방향으로 +q, +q, −q, −q ('+p.q+' µC). 중심의 전기장 크기(N/C)를 구하라.'; },
    solve:function(p){
      var r2=Math.pow(p.a/100,2)/2; // (a/√2)²
      var E1=8.99e9*p.q*1e-6/r2;
      var E=2*Math.SQRT2*E1;
      return { ans:E, unit:'N/C', steps:[
        '중심까지 r=a/√2 → 각 장 E₁ = kq/(a²/2) = '+SVH.fmt(E1)+' N/C',
        '배치상 넷 다 같은 변(위→아래) 성분 방향으로 합쳐짐: 인접 합 벡터 계산 → E = 2√2·E₁ = '+SVH.fmt(E)+' N/C',
        '(+는 밀고 −는 당겨 같은 방향 — 부호 배치 그림이 절반이다)' ] }; },
    hints:['+ 밀기, − 당기기 화살표 넷을 그려라.'] },
  { id:'u1-l3-11', level:3, type:'num', tags:['원둘레 결손'], src:'기출 유형',
    params:{ lam:{choices:[2,5],unit:'nC/m'}, R:{choices:[10,20],unit:'cm'}, th:{choices:[30,60]} },
    statement:function(p){ return '반지름 R='+p.R+' cm 고리(선밀도 λ='+p.lam+' nC/m)에서 각도 '+p.th+'° 조각을 떼어냈다. 중심의 전기장(N/C)은? (팁: 결손 조각의 장만 계산)'; },
    solve:function(p){
      // 중심에서 완전 고리는 0 → 결손 = -조각. 조각의 장 = kλ·2sin(θ/2)/R
      var R=p.R/100, th=SVH.rad(p.th);
      var E=8.99e9*p.lam*1e-9*2*Math.sin(th/2)/R;
      return { ans:E, unit:'N/C', steps:[
        '완전 고리 중심 장 = 0 → 결손 고리 = (−조각)의 장 = 조각 크기와 동일',
        '조각(호 θ): E = (kλ/R)·2sin(θ/2) = '+SVH.fmt(E)+' N/C, 방향은 결손 반대쪽',
        '(중첩의 영리한 사용 — "없는 것"을 "음의 있음"으로)' ] }; },
    hints:['빈 곳 = 반대 부호 조각 추가.'] },
  { id:'u1-l3-12', level:3, type:'num', tags:['µC·g 융합'], src:'기출 유형',
    params:{ q:{choices:[1,2],unit:'µC'}, m:{choices:[5,10],unit:'g'}, E:{choices:[2,5],unit:'×10⁴ N/C'} },
    statement:function(p){ return '수평 전기장 '+p.E+'×10⁴ N/C에서 실에 매달린 대전구(q='+p.q+' µC, m='+p.m+' g)가 기우는 각(°)과 실 장력(N)을 구하라.'; },
    solve:function(p){
      var F=p.q*1e-6*p.E*1e4, W=p.m/1000*9.8;
      var th=SVH.deg(Math.atan2(F,W)), T=Math.hypot(F,W);
      return { ans:{th:th, T:T}, unit:{th:'°', T:'N'}, steps:[
        'F_E = qE = '+SVH.fmt(F)+' N, W = '+SVH.fmt(W)+' N',
        'tanθ = F/W → θ = '+SVH.fmt(th)+'°, T = √(F²+W²) = '+SVH.fmt(T)+' N' ] }; },
    hints:['기울어진 진자 평형.'] },
  { id:'u1-l3-13', level:3, type:'num', tags:['속도 필터 예고'], src:'창작 문제(검산됨)',
    params:{ E:{choices:[1000,2000],unit:'N/C'}, v:{choices:[2,4],unit:'×10⁵ m/s'} },
    statement:function(p){ return '전자가 +x로 v='+p.v+'×10⁵ m/s. −y 방향 전기력을 정확히 상쇄해 직진시키려면(자기장은 U6에서!) 중력만으로 되는가? qE와 mg를 비교해 비율을 구하라. (E='+p.E+' N/C)'; },
    solve:function(p){
      var Fe=1.602e-19*p.E, Fg=9.11e-31*9.8;
      return { ans:Fe/Fg, unit:'배', steps:[
        'qE = '+SVH.fmt(Fe)+' N vs mg = '+SVH.fmt(Fg)+' N',
        '비 = '+SVH.fmt(Fe/Fg)+' — 중력으론 어림도 없다(10¹² 배)',
        '(자기력이 필요한 이유 → U6 속도 선택기의 예고)' ] }; },
    hints:['크기 비교만.'] },
  { id:'u1-l3-14', level:3, type:'num', tags:['이차원 합성'], src:'기출 유형',
    params:{ q1:{choices:[2,3],unit:'µC'}, q2:{choices:[4,6],unit:'µC'}, a:{choices:[30,60],unit:'cm'} },
    statement:function(p){ return '원점에 +q₁('+p.q1+' µC), (a,0)에 −q₂('+p.q2+' µC), a='+p.a+' cm. 점 (a, a)에서 전기장의 x·y 성분(N/C)을 구하라.'; },
    solve:function(p){
      var a=p.a/100, k=8.99e9;
      // q1: 위치차 (a,a), r=√2 a
      var r1=Math.SQRT2*a, E1=k*p.q1*1e-6/(r1*r1);
      var E1x=E1/Math.SQRT2, E1y=E1/Math.SQRT2;
      // q2(음전하): 점->전하 방향으로 당김. 전하 위치 (a,0), 점 (a,a): 장은 -y 방향, 크기 kq2/a²
      var E2=k*p.q2*1e-6/(a*a);
      var Ex=E1x, Ey=E1y-E2;
      return { ans:{Ex:Ex, Ey:Ey}, unit:{Ex:'N/C', Ey:'N/C'}, steps:[
        'q₁: r=√2a, E₁='+SVH.fmt(E1)+' → 성분 ('+SVH.fmt(E1x)+', '+SVH.fmt(E1y)+')',
        'q₂(−): 점에서 전하 쪽(−y)으로 '+SVH.fmt(E2),
        '합: E_x='+SVH.fmt(Ex)+', E_y='+SVH.fmt(Ey)+' N/C' ] }; },
    hints:['전하별 단위벡터를 정확히.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u1-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 전기장은 시험전하 없이도 존재하는 공간의 성질이다<br>㉡ 장선이 교차하지 않는 것은 장이 각 점에서 유일한 벡터이기 때문이다<br>㉢ 균일한 장 속 쌍극자의 알짜힘은 0이다<br>㉣ 정전기력만으로는 자유 전하를 안정 평형에 가둘 수 없다(언쇼)',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참. ㉣ 언쇼 정리는 가우스 법칙(U2)으로 증명된다 — 진공 중 E의 발산 0이라 3방향 모두 복원일 수 없다.' },
  { id:'u1-l4-02', level:4, type:'num', tags:['진동 주기 종합'], src:'기출 유형',
    params:{ q:{choices:[1,2],unit:'µC'}, Q:{choices:[4,8],unit:'µC'}, d:{choices:[20,40],unit:'cm'}, m:{choices:[1,2],unit:'g'} },
    statement:function(p){ return '+Q('+p.Q+' µC) 두 개가 x=±d(d='+p.d+' cm)에 고정, 원점의 −q('+p.q+' µC, m='+p.m+' g)가 x축 소진폭 진동한다. (a) 유효 스프링상수 k_eff=4kQq/d³ (b) 주기(s)를 구하라.'; },
    solve:function(p){
      var d=p.d/100;
      var keff=4*8.99e9*p.Q*1e-6*p.q*1e-6/Math.pow(d,3);
      var T=2*Math.PI*Math.sqrt(p.m/1000/keff);
      return { ans:{keff:keff, T:T}, unit:{keff:'N/m', T:'s'}, steps:[
        '소진폭 전개: F ≈ −(4kQq/d³)x → k_eff = '+SVH.fmt(keff)+' N/m',
        'T = 2π√(m/k_eff) = '+SVH.fmt(T)+' s',
        '(축 방향 안정·횡 방향 불안정 — 언쇼와 모순 없다)' ] }; },
    hints:['1/(d−x)²−1/(d+x)² ≈ 4x/d³.'] },
  { id:'u1-l4-03', level:4, type:'derive', tags:['유도'], src:'강의자료 대조',
    statement:'링(반지름 R, 전하 Q) 축 위 z에서 \\(E=\\dfrac{kQz}{(z^2+R^2)^{3/2}}\\)를 적분으로 유도하고, 극한 2개와 최대 지점을 구하라.',
    steps:[
      '조각 dq의 장 \\(dE=k\\,dq/(z^2+R^2)\\) — 모든 조각이 같은 거리 [왜] 링 대칭의 선물',
      '수평 성분은 짝지어 상쇄, 축 성분만: \\(dE_z=dE\\cdot\\dfrac{z}{\\sqrt{z^2+R^2}}\\)',
      '적분( dq만 남음): \\(E=\\dfrac{kz}{(z^2+R^2)^{3/2}}\\int dq=\\dfrac{kQz}{(z^2+R^2)^{3/2}}\\)',
      '극한: z≫R ⇒ kQ/z²(점전하) ✓ · z=0 ⇒ 0(대칭 상쇄) ✓',
      '최댓값: dE/dz=0 → z=R/√2 — 차원 체크: [k][C][m]/[m³]=[N/C] ✓'
    ],
    hints:['거리 같음+성분 상쇄가 전부.','미분해 봉우리까지.'],
    expl:'U2 원판·직선 유도의 원형 — "조각→성분→적분→극한" 4박자를 몸에 붙이는 문제.' },
  { id:'u1-l4-04', level:4, type:'num', tags:['쌍극자 원거리 전개'], src:'기출 유형',
    params:{ q:{choices:[1,2],unit:'nC'}, d:{choices:[2,4],unit:'mm'}, z:{choices:[4,8],unit:'cm'} },
    statement:function(p){ return '쌍극자(±q='+p.q+' nC, 간격 d='+p.d+' mm) 축 위 z='+p.z+' cm에서 (a) 정확한 장 (b) 근사 2kp/z³ (c) 상대오차(%)를 구하라.'; },
    solve:function(p){
      var k=8.99e9, q=p.q*1e-9, d=p.d*1e-3, z=p.z/100;
      var Eex=k*q*(1/Math.pow(z-d/2,2)-1/Math.pow(z+d/2,2));
      var Eap=2*k*q*d/Math.pow(z,3);
      var err=(Eex-Eap)/Eex*100;
      return { ans:{Eex:Eex, Eap:Eap, err:err}, unit:{Eex:'N/C', Eap:'N/C', err:'%'}, steps:[
        '정확: kq[1/(z−d/2)²−1/(z+d/2)²] = '+SVH.fmt(Eex)+' N/C',
        '근사: 2kp/z³ = '+SVH.fmt(Eap)+' N/C',
        '오차 '+SVH.fmt(err)+'% — z/d='+SVH.fmt(z/d)+'배에서 이 정도(근사의 신뢰 구간 감각)' ] }; },
    hints:['이항 전개 1차항이 근사식.'] },
  { id:'u1-l4-05', level:4, type:'num', tags:['밀리컨 완주'], src:'기출 유형',
    params:{ r:{choices:[1,2],unit:'µm'}, E:{choices:[2,4],unit:'×10⁵ N/C'} },
    statement:function(p){ return '반지름 r='+p.r+' µm 기름방울(ρ=900 kg/m³)이 연직 장 E='+p.E+'×10⁵ N/C에서 정지해 있다. (a) 무게(N) (b) 전하량(C) (c) 기본전하의 몇 배인가?'; },
    solve:function(p){
      var V=4/3*Math.PI*Math.pow(p.r*1e-6,3), W=900*V*9.8;
      var q=W/(p.E*1e5), n=q/1.602e-19;
      return { ans:{W:W, q:q, n:n}, unit:{W:'N', q:'C', n:'배'}, steps:[
        'W = ρ·(4/3)πr³·g = '+SVH.fmt(W)+' N',
        'q = W/E = '+SVH.fmt(q)+' C',
        'n = q/e = '+SVH.fmt(n)+' → 정수 근처인지 확인하는 것이 실험의 논리(양자화 증명)' ] }; },
    hints:['부피→질량→무게→평형.'] },
  { id:'u1-l4-06', level:4, type:'num', tags:['편향판 완주'], src:'기출 유형',
    params:{ V0:{choices:[2,4],unit:'×10⁷ m/s'}, E:{choices:[2,4],unit:'×10⁴ N/C'}, L:{choices:[2,4],unit:'cm'}, D:{choices:[20,40],unit:'cm'} },
    statement:function(p){ return 'CRT형 문제: 전자(v₀='+p.V0+'×10⁷ m/s)가 판(길이 L='+p.L+' cm, 장 '+p.E+'×10⁴ N/C) 통과 후 거리 D='+p.D+' cm의 스크린에 닿는다. (a) 판 내 변위 (b) 출사각 tanθ (c) 스크린 총 변위(cm)를 구하라.'; },
    solve:function(p){
      var v0=p.V0*1e7, E=p.E*1e4, L=p.L/100, D=p.D/100;
      var a=1.602e-19*E/9.11e-31, t=L/v0;
      var y1=0.5*a*t*t, tan=a*t/v0, y=(y1+D*tan)*100;
      return { ans:{y1:y1*100, tan:tan, y:y}, unit:{y1:'cm', tan:'', y:'cm'}, steps:[
        '판 내: y₁ = ½a(L/v₀)² = '+SVH.fmt(y1*100)+' cm',
        '출사 기울기 tanθ = v_y/v_x = aL/v₀² = '+SVH.fmt(tan),
        '스크린: y = y₁+D·tanθ = '+SVH.fmt(y)+' cm (판 중앙에서 직선 연장으로 봐도 같다는 기하 사실까지)' ] }; },
    hints:['포물선+직선의 2단 구성.'] },
  { id:'u1-l4-07', level:4, type:'num', tags:['대칭 깨기'], src:'기출 유형',
    params:{ q:{choices:[2,4],unit:'µC'}, a:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '정육각형(변 a='+p.a+' cm) 꼭짓점에 +q 다섯 개(+q='+p.q+' µC), 한 자리는 빈다. 중심 전기장의 크기(N/C)와 방향(빈 곳 쪽=1/반대쪽=−1)을 구하라.'; },
    solve:function(p){
      var E=8.99e9*p.q*1e-6/Math.pow(p.a/100,2);
      return { ans:{E:E, dir:-1}, unit:{E:'N/C', dir:''}, steps:[
        '여섯 개 꽉 차면 0 → 다섯 개 = (여섯) − (빈자리 하나) = −(빈자리 전하의 장)',
        '크기 = kq/a² = '+SVH.fmt(E)+' N/C (정육각형은 중심거리=변)',
        '방향: 빈자리 전하가 밀었을 방향의 반대 = 빈 곳 반대쪽... 정확히는 "+q가 있었다면 미는 방향"의 역 → 빈 곳에서 중심으로 향하던 척력의 반대 = 중심→빈곳 반대(−1)' ] }; },
    hints:['결손법(l3-11)의 재등장.'] },
  { id:'u1-l4-08', level:4, type:'num', tags:['3전하 벡터 완주'], src:'기출 유형',
    params:{ q:{choices:[1,2],unit:'µC'}, a:{choices:[30,50],unit:'cm'} },
    statement:function(p){ return '직각이등변: 원점 O에 −2q, (a,0)에 +q, (0,a)에 +q (q='+p.q+' µC, a='+p.a+' cm). 점 (a,a)에서 장의 크기(N/C)를 구하라.'; },
    solve:function(p){
      var a=p.a/100, k=8.99e9, q=p.q*1e-6;
      // +q at (a,0): 점(a,a) → 방향 (0,1), 거리 a → E=kq/a² ŷ
      // +q at (0,a): 방향 (1,0), E=kq/a² x̂
      // -2q at O: 거리 √2 a, 장은 점→O 방향 = (−1/√2,−1/√2), 크기 k2q/2a²=kq/a²
      var E1=k*q/(a*a);
      var Ex=E1-E1/Math.SQRT2, Ey=E1-E1/Math.SQRT2;
      var E=Math.hypot(Ex,Ey);
      return { ans:E, unit:'N/C', steps:[
        '+q들: 각각 x̂, ŷ로 kq/a² = '+SVH.fmt(E1),
        '−2q: 거리 √2a → 크기 k(2q)/(2a²)=kq/a², 방향 (−1,−1)/√2',
        '합: ('+SVH.fmt(Ex)+', '+SVH.fmt(Ey)+') → |E| = '+SVH.fmt(E)+' N/C (대각선 방향)' ] }; },
    hints:['세 벡터를 성분으로 — 음전하 방향 주의.'] }
  ]
});
