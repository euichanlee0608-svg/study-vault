/* U7 전류가 만드는 자기장 — 비오-사바르, 직선·고리·솔레노이드, 앙페르 법칙, 평행 도선 힘 (W7) */
SV_BANK.push({
  id: 'u7', no: 7, title: '전류의 자기장', titleEn: 'Magnetic Fields of Currents',
  scope: '비오-사바르 법칙 · 직선 도선 B=µ₀I/2πr · 고리 중심·축상 · 솔레노이드·토로이드 · 앙페르 법칙 · 평행 도선 간 힘',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u7-l1-01', level:1, type:'mc', tags:['비오-사바르'], src:'교재 표준',
    statement:'비오-사바르 법칙 \\(d\\vec B=\\dfrac{\\mu_0}{4\\pi}\\dfrac{Id\\vec l\\times\\hat r}{r^2}\\)에 대한 설명으로 옳은 것은?',
    choices:['전류 요소가 만드는 dB는 dl과 r̂ 모두에 수직(오른손)이고 1/r²','dB는 dl에 평행','1/r 감쇠','µ₀=8.85×10⁻¹²'],
    answer:0, expl:'쿨롱 법칙의 자기 판 — 다만 "외적"이라 방향이 비틀린다. µ₀=4π×10⁻⁷ T·m/A.' },
  { id:'u7-l1-02', level:1, type:'tf', tags:['직선 도선'], src:'교재 표준',
    statement:'무한 직선 전류의 자기장은 \\(B=\\dfrac{\\mu_0I}{2\\pi r}\\)이고 장선은 도선을 감싸는 동심원(오른손 규칙)이다.',
    answer:true, expl:'1/r 감쇠 — 전기의 무한 선전하 λ/2πε₀r과 완전 대응 구조.' },
  { id:'u7-l1-03', level:1, type:'mc', tags:['앙페르 법칙'], src:'강의자료 대조',
    statement:'앙페르 법칙 \\(\\oint\\vec B\\cdot d\\vec l=\\mu_0I_{enc}\\)의 위상은?',
    choices:['가우스 법칙의 자기 대응 — 대칭(직선·솔레노이드·토로이드)에서 B를 즉시 준다','비오-사바르보다 약한 근사','폐곡면 적분이다','정자기 아닌 경우에도 이 형태 그대로 완전하다'],
    answer:0, expl:'폐곡선(면 아님!) 적분. 시변 E가 있으면 변위전류 보정(기말 Maxwell) — 지금은 정상전류.' },
  { id:'u7-l1-04', level:1, type:'tf', tags:['솔레노이드'], src:'교재 표준',
    statement:'이상 솔레노이드 내부는 균일 \\(B=\\mu_0nI\\) (n=단위길이당 감김수), 외부는 ≈0이다.',
    answer:true, expl:'"자기의 평행판 축전기". 토로이드는 B=µ₀NI/2πr로 내부에 갇힌다.' },
  { id:'u7-l1-05', level:1, type:'mc', tags:['평행 도선'], src:'교재 표준',
    statement:'평행한 두 전류 도선 사이 힘은?',
    choices:['같은 방향 전류끼리 인력, 단위길이당 \\(F/L=\\mu_0I_1I_2/2\\pi d\\)','같은 방향이면 척력','힘이 없다','거리 제곱 반비례'],
    answer:0, expl:'한 도선의 B 속에 놓인 다른 도선의 IL×B. 과거 암페어(A)의 정의였던 힘.' },
  { id:'u7-l1-06', level:1, type:'mc', tags:['자기 가우스'], src:'교재 표준',
    statement:'자기에 대한 가우스 법칙 \\(\\oint\\vec B\\cdot d\\vec A=0\\)의 의미는?',
    choices:['자기 홀극이 없다 — 장선은 끊기지 않는 폐곡선','자기장이 항상 0','전류가 없으면 B=0','B는 보존장'],
    answer:0, expl:'N/S는 항상 쌍. 장선이 "시작·끝"이 없다는 것 — 전기와의 근본 차이.' },

  /* ---------- L2 (12) ---------- */
  { id:'u7-l2-01', level:2, type:'num', tags:['직선 B'], src:'창작 문제(검산됨)',
    params:{ I:{choices:[5,20],unit:'A'}, r:{choices:[2,10],unit:'cm'} },
    statement:function(p){ return 'I='+p.I+' A 직선 도선에서 r='+p.r+' cm의 B(µT)는? 지구 자기장(50 µT)과 비교하라.'; },
    solve:function(p){ var B=4e-7*Math.PI*p.I/(2*Math.PI*p.r/100)*1e6;
      return { ans:B, unit:'µT', steps:[
        'B = µ₀I/2πr = '+SVH.fmt(B)+' µT',
        '지구장의 '+SVH.fmt(B/50)+'배 (가전 도선 옆 자기장 오더)' ] }; },
    hints:['µ₀/2π = 2×10⁻⁷.'] },
  { id:'u7-l2-02', level:2, type:'num', tags:['고리 중심'], src:'창작 문제(검산됨)',
    params:{ I:{choices:[2,10],unit:'A'}, R:{choices:[5,10],unit:'cm'}, N:{choices:[1,10]} },
    statement:function(p){ return 'N='+p.N+'회, R='+p.R+' cm 고리(I='+p.I+' A)의 중심 B=µ₀NI/2R(µT)를 구하라.'; },
    solve:function(p){ var B=4e-7*Math.PI*p.N*p.I/(2*p.R/100)*1e6;
      return { ans:B, unit:'µT', steps:[
        '고리 중심: \\(B=\\mu_0NI/2R\\) (직선의 2πr 대신 2R)',
        'B = '+SVH.fmt(B)+' µT' ] }; },
    hints:['직선과 다른 계수(2R).'] },
  { id:'u7-l2-03', level:2, type:'num', tags:['솔레노이드'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[500,2000],unit:'회/m'}, I:{choices:[1,5],unit:'A'} },
    statement:function(p){ return 'n='+p.n+' 회/m 솔레노이드(I='+p.I+' A)의 내부 B(mT)는?'; },
    solve:function(p){ var B=4e-7*Math.PI*p.n*p.I*1000;
      return { ans:B, unit:'mT', steps:[
        '솔레노이드 내부: \\(B=\\mu_0 n I\\)',
        '= 4π×10⁻⁷×'+p.n+'×'+p.I+' = '+SVH.fmt(B)+' mT (감김 밀도가 전부 — 길이·굵기 무관)' ] }; },
    hints:['n 단위 확인.'] },
  { id:'u7-l2-04', level:2, type:'num', tags:['평행 도선 힘'], src:'창작 문제(검산됨)',
    params:{ I:{choices:[10,50],unit:'A'}, d:{choices:[2,10],unit:'cm'} },
    statement:function(p){ return '같은 I='+p.I+' A가 같은 방향으로 흐르는 두 도선(간격 d='+p.d+' cm)의 단위길이당 힘(mN/m)과 종류(인력=1)를 구하라.'; },
    solve:function(p){ var F=4e-7*Math.PI*p.I*p.I/(2*Math.PI*p.d/100)*1000;
      return { ans:{F:F, kind:1}, unit:{F:'mN/m', kind:''}, steps:[
        '한 도선의 장 B=µ₀I/2πd 속의 다른 도선: F/L = BI = µ₀I²/2πd',
        '= '+SVH.fmt(F)+' mN/m, 같은 방향 → 인력(1)' ] }; },
    hints:['2×10⁻⁷·I²/d.'] },
  { id:'u7-l2-05', level:2, type:'num', tags:['두 도선 중간'], src:'창작 문제(검산됨)',
    params:{ I1:{choices:[5,10],unit:'A'}, I2:{choices:[5,15],unit:'A'}, d:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '같은 방향 I₁='+p.I1+', I₂='+p.I2+' A 도선(간격 d='+p.d+' cm)의 정중앙에서 B(µT)는? (두 장은 반대 방향)'; },
    solve:function(p){
      var r=p.d/200;
      var B=Math.abs(p.I1-p.I2)*2e-7/r*1e6;
      return { ans:B, unit:'µT', steps:[
        '중앙: 두 장이 반대 → |B₁−B₂| = (µ₀/2πr)|I₁−I₂|',
        '= '+SVH.fmt(B)+' µT (I₁=I₂면 0)' ] }; },
    hints:['오른손으로 방향부터.'] },
  { id:'u7-l2-06', level:2, type:'num', tags:['고리 축상'], src:'교재 표준',
    params:{ I:{choices:[5,10],unit:'A'}, R:{choices:[5,10],unit:'cm'}, z:{choices:[5,10],unit:'cm'} },
    statement:function(p){ return '고리(R='+p.R+' cm, I='+p.I+' A) 축 위 z='+p.z+' cm의 \\(B=\\dfrac{\\mu_0IR^2}{2(z^2+R^2)^{3/2}}\\)(µT)를 구하라.'; },
    solve:function(p){
      var R=p.R/100, z=p.z/100;
      var B=4e-7*Math.PI*p.I*R*R/(2*Math.pow(z*z+R*R,1.5))*1e6;
      return { ans:B, unit:'µT', steps:[
        'B = µ₀IR²/[2(z²+R²)^{3/2}] = '+SVH.fmt(B)+' µT',
        '극한: z=0 → µ₀I/2R ✓, z≫R → µ₀µ/2πz³(쌍극자) ✓' ] }; },
    hints:['전기 링 E와 닮은꼴.'] },
  { id:'u7-l2-07', level:2, type:'num', tags:['앙페르 내부'], src:'교재 표준',
    params:{ I:{choices:[10,50],unit:'A'}, R:{choices:[2,4],unit:'mm'}, f:{choices:[0.5,0.25]} },
    statement:function(p){ return '균일 전류 도선(반지름 R='+p.R+' mm, I='+p.I+' A) 내부 r='+p.f+'R의 B(mT)는?'; },
    solve:function(p){
      var B=4e-7*Math.PI*p.I*p.f/(2*Math.PI*p.R*1e-3)*1000;
      return { ans:B, unit:'mT', steps:[
        '내부: B = µ₀Ir/2πR² = (µ₀I/2πR)·(r/R)',
        '= '+SVH.fmt(B)+' mT (내부 ∝r, 외부 ∝1/r — U2 원통 전하와 동형)' ] }; },
    hints:['I_enc = I(r/R)².'] },
  { id:'u7-l2-08', level:2, type:'num', tags:['토로이드'], src:'창작 문제(검산됨)',
    params:{ N:{choices:[500,1000]}, I:{choices:[1,2],unit:'A'}, r:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '토로이드(N='+p.N+', I='+p.I+' A)의 중심 반지름 r='+p.r+' cm에서 B(mT)는?'; },
    solve:function(p){ var B=4e-7*Math.PI*p.N*p.I/(2*Math.PI*p.r/100)*1000;
      return { ans:B, unit:'mT', steps:[
        '앙페르 원형 고리: B·2πr = µ₀NI → B = µ₀NI/2πr',
        '= '+SVH.fmt(B)+' mT (내부에만 존재 — 핵융합로 기하)' ] }; },
    hints:['앙페르 고리 = 원.'] },
  { id:'u7-l2-09', level:2, type:'num', tags:['자기 모멘트'], src:'창작 문제(검산됨)',
    params:{ I:{choices:[2,5],unit:'A'}, R:{choices:[5,10],unit:'cm'} },
    statement:function(p){ return '고리(R='+p.R+' cm, I='+p.I+' A)의 (a) 자기 모멘트(A·m²) (b) 먼 축상(z=1 m)의 쌍극자 근사 B=µ₀µ/2πz³(nT)를 구하라.'; },
    solve:function(p){
      var mu=p.I*Math.PI*Math.pow(p.R/100,2);
      var B=4e-7*Math.PI*mu/(2*Math.PI*1)*1e9;
      return { ans:{mu:mu, B:B}, unit:{mu:'A·m²', B:'nT'}, steps:[
        'µ = IπR² = '+SVH.fmt(mu)+' A·m²',
        'B = µ₀µ/2πz³ = '+SVH.fmt(B)+' nT (전기 쌍극자 2kp/z³의 완전 대응)' ] }; },
    hints:['µ=IA.'] },
  { id:'u7-l2-10', level:2, type:'num', tags:['감김수 설계'], src:'창작 문제(검산됨)',
    params:{ B:{choices:[10,50],unit:'mT'}, L:{choices:[20,50],unit:'cm'}, I:{choices:[2,5],unit:'A'} },
    statement:function(p){ return '길이 L='+p.L+' cm 솔레노이드로 B='+p.B+' mT를 만들려면(I='+p.I+' A) 총 감김수 N은?'; },
    solve:function(p){
      var N=p.B*1e-3*p.L/100/(4e-7*Math.PI*p.I);
      return { ans:N, unit:'회', steps:[
        'N = BL/µ₀I = '+SVH.fmt(N)+'회',
        '(전자석 설계 1단계 — 촘촘히 감을수록 적은 전류로)' ] }; },
    hints:['n=N/L 역산.'] },
  { id:'u7-l2-11', level:2, type:'num', tags:['반원 도선'], src:'기출 유형',
    params:{ I:{choices:[4,8],unit:'A'}, R:{choices:[5,10],unit:'cm'} },
    statement:function(p){ return '반원(R='+p.R+' cm)+직선 연장 두 개(중심을 지나는 선상)로 된 도선(I='+p.I+' A)의 중심 B(µT)는? (직선 부분 기여는?)'; },
    solve:function(p){
      var B=4e-7*Math.PI*p.I/(4*p.R/100)*1e6;
      return { ans:B, unit:'µT', steps:[
        '직선 연장: dl∥r̂ → 기여 0!',
        '반원 = 고리의 절반: B = µ₀I/4R = '+SVH.fmt(B)+' µT' ] }; },
    hints:['외적 0 판정 먼저.'] },
  { id:'u7-l2-12', level:2, type:'num', tags:['B 중첩 직각'], src:'창작 문제(검산됨)',
    params:{ I1:{choices:[3,6],unit:'A'}, I2:{choices:[4,8],unit:'A'}, r:{choices:[5,10],unit:'cm'} },
    statement:function(p){ return '서로 수직인 두 직선 도선(I₁='+p.I1+', I₂='+p.I2+' A)에서 각각 r='+p.r+' cm 떨어진 점(두 장이 서로 수직인 배치)의 합성 B(µT)는?'; },
    solve:function(p){
      var B1=2e-7*p.I1/(p.r/100)*1e6, B2=2e-7*p.I2/(p.r/100)*1e6;
      return { ans:Math.hypot(B1,B2), unit:'µT', steps:[
        'B₁='+SVH.fmt(B1)+', B₂='+SVH.fmt(B2)+' µT (수직)',
        '합 = √(B₁²+B₂²) = '+SVH.fmt(Math.hypot(B1,B2))+' µT' ] }; },
    hints:['피타고라스.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u7-l3-01', level:3, type:'num', tags:['세 도선 힘'], src:'기출 유형',
    params:{ I:{choices:[10,20],unit:'A'}, d:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '같은 방향 I('+p.I+' A) 도선 셋이 간격 d='+p.d+' cm로 일렬. 가운데 도선이 받는 힘과, 왼쪽 끝 도선의 단위길이당 힘(mN/m)을 구하라.'; },
    solve:function(p){
      var F1=2e-7*p.I*p.I/(p.d/100)*1000;
      var Fend=F1+F1/2;
      return { ans:{Fmid:0, Fend:Fend}, unit:{Fmid:'mN/m', Fend:'mN/m'}, steps:[
        '가운데: 양쪽 인력 상쇄 → 0',
        '끝: 이웃(d)+먼 것(2d) = F+F/2 = '+SVH.fmt(Fend)+' mN/m (안쪽으로)' ] }; },
    hints:['거리별 합.'] },
  { id:'u7-l3-02', level:3, type:'num', tags:['B=0 지점'], src:'기출 유형',
    params:{ I1:{choices:[3,6],unit:'A'}, k:{choices:[2,3]}, d:{choices:[12,24],unit:'cm'} },
    statement:function(p){ return '반대 방향 I₁='+p.I1+' A와 I₂='+p.k+'I₁(간격 d='+p.d+' cm). B=0 지점은 어느 쪽 바깥, I₁에서 몇 cm인가?'; },
    solve:function(p){
      var x=p.d/(p.k-1);
      return { ans:x, unit:'cm', steps:[
        '반대 전류 → 사이에선 보강, 바깥(약한 I₁ 쪽)에서 상쇄 가능',
        'µ₀I₁/2πx = µ₀I₂/2π(x+d) → x = d/(k−1) = '+SVH.fmt(x)+' cm (I₁ 바깥쪽)' ] }; },
    hints:['방향 지도 먼저.'] },
  { id:'u7-l3-03', level:3, type:'num', tags:['정사각 중심'], src:'기출 유형',
    params:{ I:{choices:[5,10],unit:'A'}, a:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '한 변 a='+p.a+' cm 정사각 고리(I='+p.I+' A)의 중심 B=2√2µ₀I/πa(µT)를 구하라.'; },
    solve:function(p){
      var B=2*Math.SQRT2*4e-7*Math.PI*p.I/(Math.PI*p.a/100)*1e6;
      return { ans:B, unit:'µT', steps:[
        '유한 직선 4개(각 45°~135° 기여) 합 = 2√2µ₀I/πa',
        '= '+SVH.fmt(B)+' µT (같은 둘레 원보다 '+SVH.fmt(B/(4e-7*Math.PI*p.I/(2*(2*p.a/100/Math.PI))*1e6))+'배)' ] }; },
    hints:['유한 도선 공식×4.'] },
  { id:'u7-l3-04', level:3, type:'num', tags:['동축 케이블 전역'], src:'기출 유형',
    params:{ I:{choices:[5,10],unit:'A'}, a:{choices:[1],unit:'mm'}, b:{choices:[3],unit:'mm'}, c:{choices:[4],unit:'mm'} },
    statement:function(p){ return '동축(심 a='+p.a+' mm, 외피 안 b='+p.b+'·밖 c='+p.c+' mm, 왕복 I='+p.I+' A): (a) 사이 r=2 mm의 B(mT) (b) 바깥(r>c)의 B를 구하라.'; },
    solve:function(p){
      var B=2e-7*p.I/(2e-3)*1000;
      return { ans:{B:B, Bout:0}, unit:{B:'mT', Bout:'mT'}, steps:[
        '사이: 심 전류만 감김 → B = µ₀I/2πr = '+SVH.fmt(B)+' mT',
        '밖: I_enc = I−I = 0 → B=0 (동축이 EMI를 가두는 이유)' ] }; },
    hints:['I_enc 부호 합.'] },
  { id:'u7-l3-05', level:3, type:'num', tags:['헬름홀츠'], src:'교재 표준',
    params:{ N:{choices:[100,200]}, I:{choices:[1,2],unit:'A'}, R:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '헬름홀츠 코일(N='+p.N+', R='+p.R+' cm, 간격=R, I='+p.I+' A) 중앙의 \\(B=(4/5)^{3/2}\\mu_0NI/R\\)(mT)를 구하라.'; },
    solve:function(p){
      var B=Math.pow(0.8,1.5)*4e-7*Math.PI*p.N*p.I/(p.R/100)*1000;
      return { ans:B, unit:'mT', steps:[
        'B = 0.7155·µ₀NI/R = '+SVH.fmt(B)+' mT',
        '(간격=R에서 B″=0 → 중앙이 판판하게 균일 — 실험실 표준 장치)' ] }; },
    hints:['(4/5)^{3/2}≈0.716.'] },
  { id:'u7-l3-06', level:3, type:'num', tags:['직사각 고리-도선 힘'], src:'기출 유형',
    params:{ I1:{choices:[10,20],unit:'A'}, I2:{choices:[2,5],unit:'A'}, a:{choices:[2,4],unit:'cm'}, b:{choices:[6,10],unit:'cm'}, L:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '무한 도선(I₁='+p.I1+' A) 옆 a='+p.a+' cm에 평행 변(길이 L='+p.L+' cm)이 오는 직사각 고리(I₂='+p.I2+' A, 먼 변까지 b='+p.b+' cm). 알짜힘(µN)과 방향(도선 쪽=1)을 구하라. (가까운 변 전류가 I₁과 같은 방향)'; },
    solve:function(p){
      var F=2e-7*p.I1*p.I2*p.L/100*(1/(p.a/100)-1/(p.b/100))*1e6;
      return { ans:{F:F, dir:1}, unit:{F:'µN', dir:''}, steps:[
        '가까운 변 인력 − 먼 변 척력: F = (µ₀I₁I₂L/2π)(1/a−1/b)',
        '= '+SVH.fmt(F)+' µN, 도선 쪽(1) (수직 변의 힘은 상쇄)',
        '(비균일 장 → 알짜힘 — 균일 장 0과 대비)' ] }; },
    hints:['두 평행 변만 살아남는다.'] },
  { id:'u7-l3-07', level:3, type:'num', tags:['자기장 안 자기장'], src:'기출 유형',
    params:{ n:{choices:[1000,2000],unit:'회/m'}, I:{choices:[2,4],unit:'A'}, v:{choices:[1,2],unit:'×10⁶ m/s'} },
    statement:function(p){ return '솔레노이드(n='+p.n+', I='+p.I+' A) 안에서 전자가 축에 수직 v='+p.v+'×10⁶ m/s로 움직인다. 원운동 반지름(mm)은?'; },
    solve:function(p){
      var B=4e-7*Math.PI*p.n*p.I;
      var r=9.11e-31*p.v*1e6/(1.602e-19*B)*1000;
      return { ans:r, unit:'mm', steps:[
        'B = µ₀nI = '+SVH.fmt(B*1000)+' mT',
        'r = mv/eB = '+SVH.fmt(r)+' mm (U6×U7 결합 — 장을 만들고 그 안에서 돌리기)' ] }; },
    hints:['두 단원 직결.'] },
  { id:'u7-l3-08', level:3, type:'num', tags:['지자기 상쇄'], src:'기출 유형',
    params:{ Be:{choices:[30,50],unit:'µT'}, R:{choices:[20,40],unit:'cm'}, N:{choices:[10,20]} },
    statement:function(p){ return '수평 지자기 '+p.Be+' µT를 중심에서 상쇄하려는 코일(N='+p.N+', R='+p.R+' cm)의 전류(A)와 코일 면의 방향(자기북 향함=1)을 구하라.'; },
    solve:function(p){
      var I=p.Be*1e-6*2*(p.R/100)/(4e-7*Math.PI*p.N);
      return { ans:{I:I, dir:1}, unit:{I:'A', dir:''}, steps:[
        'µ₀NI/2R = B_e → I = 2RB_e/µ₀N = '+SVH.fmt(I)+' A',
        '코일 축이 지자기와 반평행 장을 만들도록(면은 북향, 1)',
        '(자기 실험의 영점 잡기 — 실측 보정 감각)' ] }; },
    hints:['고리 중심 공식 역산.'] },
  { id:'u7-l3-09', level:3, type:'num', tags:['시트 전류'], src:'교재 표준',
    params:{ K:{choices:[100,500],unit:'A/m'} },
    statement:function(p){ return '무한 전류 시트(면전류밀도 K='+p.K+' A/m)의 양쪽 B=µ₀K/2(µT)를 구하라. 전기의 무엇과 대응하는가?'; },
    solve:function(p){ var B=4e-7*Math.PI*p.K/2*1e6;
      return { ans:B, unit:'µT', steps:[
        '앙페르 직사각 고리: 2BL = µ₀KL → B = µ₀K/2 = '+SVH.fmt(B)+' µT',
        '(σ/2ε₀의 자기 판 — 거리 무관, 방향은 시트에 평행)' ] }; },
    hints:['필박스 대신 직사각.'] },
  { id:'u7-l3-10', level:3, type:'num', tags:['원운동 전류의 B'], src:'기출 유형',
    params:{ v:{choices:[2.19],unit:'×10⁶ m/s'}, r:{choices:[0.0529],unit:'nm'} },
    statement:function(p){ return '보어 수소: 전자(v='+p.v+'×10⁶ m/s, r='+p.r+' nm)의 궤도 운동이 핵 위치에 만드는 (a) 등가 전류(mA) (b) B(T)를 구하라.'; },
    solve:function(p){
      var T=2*Math.PI*p.r*1e-9/(p.v*1e6);
      var I=1.602e-19/T*1000;
      var B=4e-7*Math.PI*I/1000/(2*p.r*1e-9);
      return { ans:{I:I, B:B}, unit:{I:'mA', B:'T'}, steps:[
        'I = e/T = ev/2πr = '+SVH.fmt(I)+' mA (원자 하나가 mA!)',
        'B = µ₀I/2r = '+SVH.fmt(B)+' T (~12 T — 원자 내부는 강자장 세계)' ] }; },
    hints:['주기→전류.'] },
  { id:'u7-l3-11', level:3, type:'num', tags:['유한 직선'], src:'교재 표준',
    params:{ I:{choices:[10,20],unit:'A'}, L:{choices:[20,40],unit:'cm'}, d:{choices:[5,10],unit:'cm'} },
    statement:function(p){ return '길이 L='+p.L+' cm 유한 직선(I='+p.I+' A)의 수직이등분선 위 d='+p.d+' cm에서 \\(B=\\dfrac{\\mu_0I}{2\\pi d}\\cdot\\dfrac{L}{\\sqrt{L^2+4d^2}}\\)(µT)를 구하라.'; },
    solve:function(p){
      var L=p.L/100, d=p.d/100;
      var B=2e-7*p.I/d*L/Math.sqrt(L*L+4*d*d)*1e6;
      return { ans:B, unit:'µT', steps:[
        '비오-사바르 적분 결과 대입 = '+SVH.fmt(B)+' µT',
        '극한: L→∞ ⇒ µ₀I/2πd ✓ (무한 공식 회수)' ] }; },
    hints:['각도인자 = sinθ.'] },
  { id:'u7-l3-12', level:3, type:'num', tags:['속 빈 도체 내강'], src:'기출 유형',
    params:{ I:{choices:[20,40],unit:'A'}, R:{choices:[5],unit:'mm'}, r:{choices:[2],unit:'mm'} },
    statement:function(p){ return '균일 전류 원통(R='+p.R+' mm, I='+p.I+' A)에 축과 나란한 원통 구멍(반지름 '+p.r+' mm, 중심 간 거리 2.5 mm)이 있다. 구멍 내부의 B가 균일함을 이용해 크기(mT)를 구하라: B=µ₀Jd/2 (J=전류밀도, d=축간 거리).'; },
    solve:function(p){
      var A=Math.PI*(Math.pow(p.R*1e-3,2)-Math.pow(p.r*1e-3,2));
      var J=p.I/A;
      var B=4e-7*Math.PI*J*2.5e-3/2*1000;
      return { ans:B, unit:'mT', steps:[
        'J = I/(πR²−πr²) = '+SVH.fmt(J)+' A/m²',
        '중첩(꽉 참 + 역방향 작은 원통): 구멍 안 B = µ₀Jd/2 = '+SVH.fmt(B)+' mT (균일!)',
        '(U2-l3-13 공동 전기장의 자기 판 — 같은 수학)' ] }; },
    hints:['결손 중첩 재등장.'] },
  { id:'u7-l3-13', level:3, type:'num', tags:['MRI 오더'], src:'창작 문제(검산됨)',
    params:{ B:{choices:[1.5,3],unit:'T'}, R:{choices:[30],unit:'cm'}, n:{choices:[2000],unit:'회/m'} },
    statement:function(p){ return 'MRI급 B='+p.B+' T를 n='+p.n+' 회/m 솔레노이드로: (a) 필요한 전류(A) (b) 구리 코일이면 왜 곤란한가(전류 크기로 답). 초전도의 필요성을 논하라.'; },
    solve:function(p){
      var I=p.B/(4e-7*Math.PI*p.n);
      return { ans:I, unit:'A', steps:[
        'I = B/µ₀n = '+SVH.fmt(I)+' A',
        '수백 A를 상시 → 구리면 I²R 열로 녹는다 → 초전도(R=0) 채택',
        '(장비 스펙을 물리로 읽기)' ] }; },
    hints:['µ₀n으로 나누기.'] },
  { id:'u7-l3-14', level:3, type:'num', tags:['레일건 힘'], src:'기출 유형',
    params:{ I:{choices:[1000,5000],unit:'A'}, d:{choices:[2,5],unit:'cm'} },
    statement:function(p){ return '레일 간격 d='+p.d+' cm, 전류 I='+p.I+' A인 레일건에서 발사체가 받는 힘 근사 F≈(µ₀I²/2π)ln(정수)... 간단 모형 F=BId (B=레일 사이 유효장 µ₀I/2πd×2 근사)로 크기(N)를 구하라.'; },
    solve:function(p){
      var B=2*2e-7*p.I/(p.d/100);
      var F=B*p.I*(p.d/100);
      return { ans:F, unit:'N', steps:[
        'B_유효 ≈ 2·µ₀I/2πd = '+SVH.fmt(B*1000)+' mT',
        'F = BId = µ₀I²/π = '+SVH.fmt(F)+' N (모형 의존이지만 I² 스케일이 요점)',
        '(I²에 비례 — 대전류의 세계)' ] }; },
    hints:['I² 스케일 확인.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u7-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 앙페르 법칙의 I_enc는 고리를 "경계로 하는 임의 면"을 지나는 전류다<br>㉡ 솔레노이드 내부 B는 위치·굵기와 거의 무관하게 µ₀nI다<br>㉢ 같은 방향 평행 전류는 당긴다<br>㉣ ∮B·dA=0은 자기 홀극 부재를 뜻한다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참. ㉠의 "임의 면"이 기말 변위전류 논쟁(축전기 사이 면)의 복선이다.' },
  { id:'u7-l4-02', level:4, type:'num', tags:['자기 저울 완주'], src:'기출 유형',
    params:{ I1:{choices:[50,100],unit:'A'}, lam:{choices:[5,10],unit:'g/m'}, d0:{choices:[1,2],unit:'cm'} },
    statement:function(p){ return '고정 도선(I₁='+p.I1+' A) 위 d='+p.d0+' cm에 같은 방향 전류의 가벼운 도선(λ='+p.lam+' g/m)이 자기 인력...아니 척력으로 떠 있으려면 위 도선 전류가 반대 방향이어야 한다. (a) 필요한 I₂(A) (b) 평형의 안정성(수직 방향 안정=1)을 구하라.'; },
    solve:function(p){
      var I2=p.lam/1000*9.8*2*Math.PI*(p.d0/100)/(4e-7*Math.PI*p.I1);
      return { ans:{I2:I2, st:1}, unit:{I2:'A', st:''}, steps:[
        'µ₀I₁I₂/2πd = λg → I₂ = '+SVH.fmt(I2)+' A (반대 방향, 척력 부양)',
        '수직: 가까워지면 척력↑ → 복원 → 안정(1) (수평은 불안정 — 가이드 필요)',
        '(자기 부상의 평형 분석)' ] }; },
    hints:['힘 균형+미소 변위.'] },
  { id:'u7-l4-03', level:4, type:'derive', tags:['유도'], src:'강의자료 대조',
    statement:'앙페르 법칙으로 이상 솔레노이드 내부 \\(B=\\mu_0nI\\)를 유도하라(외부 B≈0 논증 포함).',
    steps:[
      '대칭: 내부 B는 축에 평행·균일 후보, 외부는 "먼 곳에서 0"이어야 함 [왜] 무한 솔레노이드의 병진 대칭',
      '직사각 앙페르 고리(한 변 내부 L, 한 변 외부): \\(\\oint\\vec B\\cdot d\\vec l=B_{in}L-B_{out}L\\) (수직 변 기여 0)',
      '감긴 전류: I_enc = nLI',
      '외부 변을 아무리 멀리 놓아도 식이 같아야 → B_out은 위치 무관 → 0일 수밖에. 따라서 \\(B_{in}=\\mu_0nI\\)',
      '극한 체크: n↑, I↑ 비례 ✓ · 유한 솔레노이드 끝단은 절반(µ₀nI/2) — 실물 보정. 차원: [T·m/A][1/m][A]=[T] ✓'
    ],
    hints:['수직 변이 죽고 평행 변만 남는 고리.','외부 0의 논증이 점수 포인트.'],
    expl:'가우스의 "필박스"에 대응하는 앙페르의 "직사각" — 시험 유도 1순위.' },
  { id:'u7-l4-04', level:4, type:'num', tags:['3도선 정삼각'], src:'기출 유형',
    params:{ I:{choices:[10,20],unit:'A'}, a:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '정삼각형 꼭짓점의 평행 도선 3개(모두 같은 방향 I='+p.I+' A, 변 a='+p.a+' cm): 한 도선이 받는 단위길이당 합력(mN/m)과 방향(중심 향함=1)을 구하라.'; },
    solve:function(p){
      var F1=2e-7*p.I*p.I/(p.a/100)*1000;
      var F=F1*Math.sqrt(3);
      return { ans:{F:F, dir:1}, unit:{F:'mN/m', dir:''}, steps:[
        '이웃 두 인력, 각 '+SVH.fmt(F1)+' mN/m, 사이각 60°',
        '합 = 2F₁cos30° = √3F₁ = '+SVH.fmt(F)+' mN/m, 중심 향함(1)',
        '(같은 방향 전류 다발은 스스로 조인다 — 핀치 효과)' ] }; },
    hints:['벡터합 60°.'] },
  { id:'u7-l4-05', level:4, type:'num', tags:['비균일 J 앙페르'], src:'기출 유형',
    params:{ J0:{choices:[100,200],unit:'A/m²'}, R:{choices:[2,4],unit:'cm'} },
    statement:function(p){ return 'J(r)=J₀(r/R) (J₀='+p.J0+' A/m², R='+p.R+' cm)인 도선: (a) 총 전류(mA) (b) 표면에서 B(µT) (c) 내부 B(r)∝r² 확인 — r=R/2의 B(µT)를 구하라.'; },
    solve:function(p){
      var R=p.R/100;
      var I=2*Math.PI*p.J0*R*R/3;
      var Bs=2e-7*I/R*1e6;
      var Bh=Bs/4; // I_enc ∝ r³ → B ∝ r² → (1/2)²
      return { ans:{I:I*1000, Bs:Bs, Bh:Bh}, unit:{I:'mA', Bs:'µT', Bh:'µT'}, steps:[
        'I = ∫J·2πr dr = 2πJ₀R²/3 = '+SVH.fmt(I*1000)+' mA',
        '표면: B = µ₀I/2πR = '+SVH.fmt(Bs)+' µT',
        'I_enc∝r³ → B = µ₀I r²/2πR³ → r=R/2: '+SVH.fmt(Bh)+' µT (∝r² 확인)' ] }; },
    hints:['적분→앙페르 2회.'] },
  { id:'u7-l4-06', level:4, type:'num', tags:['헬름홀츠+입자'], src:'기출 유형',
    params:{ N:{choices:[100],unit:''}, R:{choices:[15,20],unit:'cm'}, V:{choices:[100,200],unit:'V'}, rbeam:{choices:[5,8],unit:'cm'} },
    statement:function(p){ return 'e/m 실험: 헬름홀츠(N='+p.N+', R='+p.R+' cm)로 '+p.V+' V 가속 전자를 r='+p.rbeam+' cm 원으로 만들려면 코일 전류(A)는?'; },
    solve:function(p){
      var v=Math.sqrt(2*1.602e-19*p.V/9.11e-31);
      var B=9.11e-31*v/(1.602e-19*p.rbeam/100);
      var I=B*(p.R/100)/(Math.pow(0.8,1.5)*4e-7*Math.PI*p.N);
      return { ans:I, unit:'A', steps:[
        'v = '+SVH.fmt(v)+' m/s → 필요 B = mv/er = '+SVH.fmt(B*1000)+' mT',
        'I = BR/(0.7155µ₀N) = '+SVH.fmt(I)+' A',
        '(학부 e/m 실험 장치의 설계 계산 전체)' ] }; },
    hints:['U3→U6→U7 삼단 결합.'] },
  { id:'u7-l4-07', level:4, type:'num', tags:['지구 자기 모멘트'], src:'창작 문제(검산됨)',
    params:{ B:{choices:[30,60],unit:'µT'} },
    statement:function(p){ return '지구 적도 자기장 '+p.B+' µT를 쌍극자 근사 B=µ₀m/4πR³로 설명하는 지구 자기 모멘트 m(A·m²)을 구하라. (R=6.37×10⁶ m)'; },
    solve:function(p){
      var m=p.B*1e-6*4*Math.PI*Math.pow(6.37e6,3)/(4e-7*Math.PI);
      return { ans:m, unit:'A·m²', steps:[
        'm = 4πR³B/µ₀ = '+SVH.fmt(m)+' A·m²',
        '(~10²³ A·m² — 외핵 전류의 스케일, 오더 추정형)' ] }; },
    hints:['쌍극자식 역산.'] },
  { id:'u7-l4-08', level:4, type:'num', tags:['중간 종합 리허설'], src:'기출 유형',
    params:{ I:{choices:[10,20],unit:'A'}, d:{choices:[10],unit:'cm'}, q:{choices:[2],unit:'µC'}, v:{choices:[1,2],unit:'×10⁵ m/s'} },
    statement:function(p){ return '중간 리허설: 반대 방향 두 도선(I='+p.I+' A, 간격 d='+p.d+' cm) 정중앙을 +q('+p.q+' µC) 입자가 도선과 평행하게 v='+p.v+'×10⁵ m/s로 지난다. (a) 중앙 B(µT) (b) 받는 힘(N)과 방향(한 도선 쪽=±1 — 크기만 채점)을 구하라.'; },
    solve:function(p){
      var B=2*2e-7*p.I/(p.d/200)*1e6; // 반대 방향 → 보강, r=d/2
      var F=p.q*1e-6*p.v*1e5*B*1e-6;
      return { ans:{B:B, F:F}, unit:{B:'µT', F:'N'}, steps:[
        '반대 전류 → 중앙 보강: B = 2·(µ₀I/2π(d/2)) = '+SVH.fmt(B)+' µT',
        'F = qvB = '+SVH.fmt(F)+' N (v∥도선, B⊥v → F는 도선 향함/멀어짐)',
        '(U6 힘 + U7 장 — 중간 마지막 문항의 전형적 결합)' ] }; },
    hints:['장 만들기→힘 받기 순서.'] }
  ]
});
