/* U1 선수 리프레셔 — 복소수, ODE, 선형대수, 선형화의 최소 필수 (기획서 §13.4 지시 단원) */
SV_BANK.push({
  id: 'u1', no: 1, title: '선수 리프레셔', titleEn: 'Prerequisites Refresher',
  scope: '복소수 연산 · 오일러 공식 · 1·2차 ODE 해 · 특성방정식 · 2×2 행렬 · 테일러 선형화',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u1-l1-01', level:1, type:'mc', tags:['동적 시스템'], src:'강의자료 대조',
    statement:'이 과목이 다루는 "동적 시스템(dynamic system)"의 정의로 가장 정확한 것은?',
    choices:['시간에 따라 상태가 변하며 입력→출력 관계를 갖는 시스템','움직이는 기계 장치','전기 회로만을 지칭','비선형 시스템만을 지칭'],
    answer:0, expl:'Lec1의 정의. 목표는 ① 입력이 출력에 미치는 영향 이해 ② 원하는 출력을 위한 입력 설계 — 특히 피드백 시스템.' },
  { id:'u1-l1-02', level:1, type:'tf', tags:['선형성'], src:'교재 표준',
    statement:'시스템이 선형이려면 중첩(가산성)과 비례성(동차성)을 모두 만족해야 한다.',
    answer:true, expl:'L{af₁+bf₂}=aL{f₁}+bL{f₂}. 이 성질 덕에 라플라스·전달함수·중첩 해석이 전부 성립한다.' },
  { id:'u1-l1-03', level:1, type:'mc', tags:['복소평면'], src:'교재 표준',
    statement:'복소수 \\(s=\\sigma+j\\omega\\)가 제어에서 갖는 의미로 옳은 것은?',
    choices:['σ는 지수 감쇠/발산율, ω는 진동 주파수 — 극점 위치가 응답 모양을 정한다','σ는 진동, ω는 감쇠','크기만 의미 있다','실수부는 무시한다'],
    answer:0, expl:'\\(e^{st}=e^{\\sigma t}(\\cos\\omega t+j\\sin\\omega t)\\). 왼쪽 반평면(σ<0)=안정 — 이 과목 전체를 관통하는 그림.' },
  { id:'u1-l1-04', level:1, type:'tf', tags:['ODE'], src:'교재 표준',
    statement:'상수계수 선형 ODE \\(\\ddot y + a\\dot y + by = 0\\)의 해는 특성방정식 \\(\\lambda^2+a\\lambda+b=0\\)의 근이 결정한다.',
    answer:true, expl:'\\(y=e^{\\lambda t}\\)를 대입하면 특성방정식이 나온다. 근의 위치=응답의 성격 — 전달함수 극점의 원형.' },
  { id:'u1-l1-05', level:1, type:'mc', tags:['오일러'], src:'교재 표준',
    statement:'오일러 공식으로 옳은 것은?',
    choices:['\\(e^{j\\theta}=\\cos\\theta+j\\sin\\theta\\)','\\(e^{j\\theta}=\\sin\\theta+j\\cos\\theta\\)','\\(e^{j\\theta}=\\cos\\theta-j\\sin\\theta\\)','\\(e^{j\\theta}=j(\\cos\\theta+\\sin\\theta)\\)'],
    answer:0, expl:'복소 지수 ↔ 진동의 다리. 페이저·라플라스 역변환의 감쇠 정현파가 모두 여기서 나온다.' },
  { id:'u1-l1-06', level:1, type:'tf', tags:['행렬'], src:'교재 표준',
    statement:'2×2 행렬 \\(A\\)의 고유값은 \\(\\det(A-\\lambda I)=0\\)의 근이며, 상태공간 표현에서 시스템 극점과 같다.',
    answer:true, expl:'U5(상태공간)의 예고. det(sI−A)=0 ↔ 특성방정식 ↔ 전달함수 분모.' },

  /* ---------- L2 (12) ---------- */
  { id:'u1-l2-01', level:2, type:'num', tags:['복소수 크기·각'], src:'창작 문제(검산됨)',
    params:{ a:{min:1,max:6,step:1}, b:{min:1,max:6,step:1} },
    statement:function(p){ return '복소수 \\(z='+p.a+'+j'+p.b+'\\)의 크기와 각(°)을 구하라.'; },
    solve:function(p){ var m=Math.hypot(p.a,p.b), th=SVH.deg(Math.atan2(p.b,p.a));
      return { ans:{mag:m, ang:th}, unit:{mag:'', ang:'°'}, steps:[
        '|z| = √('+p.a+'²+'+p.b+'²) = '+SVH.fmt(m),
        '∠z = tan⁻¹('+p.b+'/'+p.a+') = '+SVH.fmt(th)+'°' ] }; },
    hints:['피타고라스 + arctan.'] },
  { id:'u1-l2-02', level:2, type:'num', tags:['복소수 곱'], src:'창작 문제(검산됨)',
    params:{ m1:{min:2,max:5,step:1}, a1:{choices:[30,45,60]}, m2:{min:2,max:4,step:1}, a2:{choices:[-30,-45,15]} },
    statement:function(p){ return '\\(('+p.m1+'\\angle '+p.a1+'°)('+p.m2+'\\angle '+p.a2+'°)\\)를 극형식으로 구하라.'; },
    solve:function(p){ var m=p.m1*p.m2, a=p.a1+p.a2;
      return { ans:{mag:m, ang:a}, unit:{mag:'', ang:'°'}, steps:[
        '곱 = 크기 곱, 각 합',
        '= '+SVH.fmt(m)+'∠'+SVH.fmt(a)+'°' ] }; },
    hints:['극형식 곱셈 규칙.'] },
  { id:'u1-l2-03', level:2, type:'num', tags:['복소수 나눗셈'], src:'창작 문제(검산됨)',
    params:{ a:{min:1,max:4,step:1}, b:{min:1,max:4,step:1}, c:{min:1,max:3,step:1}, d:{min:1,max:3,step:1} },
    statement:function(p){ return '\\(\\dfrac{'+p.a+'+j'+p.b+'}{'+p.c+'+j'+p.d+'}\\)의 실수부와 허수부를 구하라.'; },
    solve:function(p){ var den=p.c*p.c+p.d*p.d;
      var re=(p.a*p.c+p.b*p.d)/den, im=(p.b*p.c-p.a*p.d)/den;
      return { ans:{re:re, im:im}, unit:{re:'', im:''}, steps:[
        '분모 켤레 곱: 분모 = '+p.c+'²+'+p.d+'² = '+den,
        '분자 = ('+p.a+'+j'+p.b+')('+p.c+'−j'+p.d+') = '+SVH.fmt(p.a*p.c+p.b*p.d)+'+j('+SVH.fmt(p.b*p.c-p.a*p.d)+')',
        're = '+SVH.fmt(re)+', im = '+SVH.fmt(im) ] }; },
    hints:['켤레를 곱해 분모를 실수로.'] },
  { id:'u1-l2-04', level:2, type:'num', tags:['특성근'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[3,5,7]}, b:{choices:[2,4,6,10]} },
    statement:function(p){ return '특성방정식 \\(\\lambda^2+'+p.a+'\\lambda+'+p.b+'=0\\)의 두 근을 구하라(실근이면 λ₁>λ₂, 복소면 실수부·허수부).'; },
    solve:function(p){
      var D=p.a*p.a-4*p.b;
      if(D>=0){ var r1=(-p.a+Math.sqrt(D))/2, r2=(-p.a-Math.sqrt(D))/2;
        return { ans:{x1:r1, x2:r2}, unit:{x1:'', x2:''}, steps:[
          '판별식 D = '+p.a+'²−4·'+p.b+' = '+SVH.fmt(D)+' ≥ 0 → 실근',
          'λ = (−'+p.a+'±√'+SVH.fmt(D)+')/2 → '+SVH.fmt(r1)+', '+SVH.fmt(r2) ] }; }
      var re=-p.a/2, im=Math.sqrt(-D)/2;
      return { ans:{x1:re, x2:im}, unit:{x1:'(실수부)', x2:'(허수부)'}, steps:[
        'D = '+SVH.fmt(D)+' < 0 → 복소근',
        'λ = '+SVH.fmt(re)+' ± j'+SVH.fmt(im) ] }; },
    hints:['근의 공식, 판별식부터.'] },
  { id:'u1-l2-05', level:2, type:'num', tags:['1차 ODE'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4,5]}, y0:{min:2,max:8,step:2}, t1:{choices:[0.2,0.5]} },
    statement:function(p){ return '\\(\\dot y = -'+p.a+'y\\), y(0)='+p.y0+'의 해를 구하고 t='+p.t1+'에서 값을 구하라.'; },
    solve:function(p){ var y=p.y0*Math.exp(-p.a*p.t1);
      return { ans:y, unit:'', steps:[
        'y(t) = y₀e^{−'+p.a+'t} (1차 자율 ODE)',
        't='+p.t1+': '+p.y0+'×e^{−'+SVH.fmt(p.a*p.t1)+'} = '+SVH.fmt(y) ] }; },
    hints:['지수 감쇠 — 시정수 1/a.'] },
  { id:'u1-l2-06', level:2, type:'num', tags:['적분'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2,3]}, T:{choices:[1,2]} },
    statement:function(p){ return '\\(\\int_0^{'+p.T+'} e^{-'+p.a+'t}\\,dt\\)를 구하라.'; },
    solve:function(p){ var v=(1-Math.exp(-p.a*p.T))/p.a;
      return { ans:v, unit:'', steps:[
        '\\(\\int e^{-at}dt = -e^{-at}/a\\)',
        '= (1−e^{−'+SVH.fmt(p.a*p.T)+'})/'+p.a+' = '+SVH.fmt(v) ] }; },
    hints:['지수 적분의 부호와 1/a.'] },
  { id:'u1-l2-07', level:2, type:'num', tags:['행렬식·역행렬'], src:'창작 문제(검산됨)',
    params:{ a:{min:1,max:4,step:1}, b:{min:1,max:3,step:1}, c:{min:1,max:3,step:1}, d:{min:2,max:5,step:1} },
    constraint:function(p){ return p.a*p.d-p.b*p.c!==0; },
    statement:function(p){ return '\\(A=\\begin{bmatrix}'+p.a+'&'+p.b+'\\\\'+p.c+'&'+p.d+'\\end{bmatrix}\\)의 행렬식과, 역행렬의 (1,1) 성분을 구하라.'; },
    solve:function(p){ var det=p.a*p.d-p.b*p.c;
      return { ans:{det:det, inv11:p.d/det}, unit:{det:'', inv11:''}, steps:[
        'det = '+p.a+'·'+p.d+'−'+p.b+'·'+p.c+' = '+SVH.fmt(det),
        'A⁻¹ = (1/det)[[d,−b],[−c,a]] → (1,1) = '+p.d+'/'+SVH.fmt(det)+' = '+SVH.fmt(p.d/det) ] }; },
    hints:['2×2 역행렬 공식(대각 교환, 부대각 부호).'] },
  { id:'u1-l2-08', level:2, type:'num', tags:['고유값'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[-2,-3,-4]}, d:{choices:[-1,-2,-5]}, b:{choices:[0,1]} },
    statement:function(p){ return '\\(A=\\begin{bmatrix}'+p.a+'&'+p.b+'\\\\0&'+p.d+'\\end{bmatrix}\\)의 고유값 두 개를 구하라. (큰 값을 λ₁로)'; },
    solve:function(p){ var l1=Math.max(p.a,p.d), l2=Math.min(p.a,p.d);
      return { ans:{l1:l1, l2:l2}, unit:{l1:'', l2:''}, steps:[
        '상삼각 행렬 → 고유값 = 대각 성분',
        'λ = '+SVH.fmt(l1)+', '+SVH.fmt(l2)+' (둘 다 음수면 안정 — U5·U7 예고)' ] }; },
    hints:['삼각행렬의 고유값은 대각.'] },
  { id:'u1-l2-09', level:2, type:'num', tags:['정현파 항등식'], src:'창작 문제(검산됨)',
    params:{ A:{min:3,max:6,step:1}, B:{min:4,max:8,step:4} },
    statement:function(p){ return '\\('+p.A+'\\cos\\omega t+'+p.B+'\\sin\\omega t = R\\cos(\\omega t-\\phi)\\)의 R와 φ(°)를 구하라.'; },
    solve:function(p){ var R=Math.hypot(p.A,p.B), ph=SVH.deg(Math.atan2(p.B,p.A));
      return { ans:{R:R, ph:ph}, unit:{R:'', ph:'°'}, steps:[
        'R = √(A²+B²) = '+SVH.fmt(R),
        'φ = tan⁻¹(B/A) = '+SVH.fmt(ph)+'° (2차계 부족감쇠 응답 정리에 반복 등장)' ] }; },
    hints:['전개해 계수 비교하거나 페이저로.'] },
  { id:'u1-l2-10', level:2, type:'num', tags:['미분'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,3]}, w:{choices:[4,5]}, t1:{choices:[0,0.1]} },
    statement:function(p){ return '\\(y=e^{-'+p.a+'t}\\cos('+p.w+'t)\\)의 \\(\\dot y\\)를 t='+p.t1+'에서 구하라.'; },
    solve:function(p){
      var v=-p.a*Math.exp(-p.a*p.t1)*Math.cos(p.w*p.t1)-p.w*Math.exp(-p.a*p.t1)*Math.sin(p.w*p.t1);
      return { ans:v, unit:'', steps:[
        '곱미분: \\(\\dot y = -'+p.a+'e^{-'+p.a+'t}\\cos'+p.w+'t - '+p.w+'e^{-'+p.a+'t}\\sin'+p.w+'t\\)',
        't='+p.t1+' 대입 → '+SVH.fmt(v)+' (감쇠 정현파 미분은 앞으로 수없이 나온다)' ] }; },
    hints:['곱의 미분 + 연쇄율.'] },
  { id:'u1-l2-11', level:2, type:'num', tags:['부분분수 기초'], src:'창작 문제(검산됨)',
    params:{ p1:{choices:[1,2]}, p2:{choices:[3,4,5]} },
    statement:function(p){ return '\\(\\dfrac{1}{(s+'+p.p1+')(s+'+p.p2+')} = \\dfrac{A}{s+'+p.p1+'}+\\dfrac{B}{s+'+p.p2+'}\\)의 A·B를 구하라.'; },
    solve:function(p){ var A=1/(p.p2-p.p1), B=-A;
      return { ans:{A:A, B:B}, unit:{A:'', B:''}, steps:[
        '커버업: A = 1/(s+'+p.p2+')|_{s=−'+p.p1+'} = 1/('+p.p2+'−'+p.p1+') = '+SVH.fmt(A),
        'B = 1/(s+'+p.p1+')|_{s=−'+p.p2+'} = '+SVH.fmt(B)+' (합=0 확인)' ] }; },
    hints:['커버업(Heaviside) 방법이 제일 빠르다.'] },
  { id:'u1-l2-12', level:2, type:'num', tags:['지수·로그'], src:'창작 문제(검산됨)',
    params:{ r:{choices:[0.5,0.1,0.05]}, a:{choices:[2,4]} },
    statement:function(p){ return '\\(e^{-'+p.a+'t}='+p.r+'\\)이 되는 t를 구하라.'; },
    solve:function(p){ var t=-Math.log(p.r)/p.a;
      return { ans:t, unit:'s', steps:[
        't = −ln('+p.r+')/'+p.a,
        '= '+SVH.fmt(t)+' s (정착시간 공식 ln의 출처)' ] }; },
    hints:['양변 ln.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u1-l3-01', level:3, type:'num', tags:['1차 ODE+입력'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, K:{choices:[6,8,10]}, t1:{choices:[0.5,1]} },
    statement:function(p){ return '\\(\\dot y + '+p.a+'y = '+p.K+'\\), y(0)=0의 해를 구하고 t='+p.t1+'에서 값을 구하라.'; },
    solve:function(p){ var yss=p.K/p.a, y=yss*(1-Math.exp(-p.a*p.t1));
      return { ans:{yss:yss, y:y}, unit:{yss:'', y:''}, steps:[
        '정상해 y_ss = K/a = '+SVH.fmt(yss)+', 동차해 Ce^{−at}',
        'y(0)=0 → y = '+SVH.fmt(yss)+'(1−e^{−'+p.a+'t})',
        't='+p.t1+': '+SVH.fmt(y)+' (1차계 스텝 응답의 원형)' ] }; },
    hints:['특수해+동차해, 초기조건으로 C.'] },
  { id:'u1-l3-02', level:3, type:'num', tags:['2차 ODE 분류'], src:'창작 문제(검산됨)',
    params:{ c:{choices:[2,4,8,10]}, k:{choices:[4,16,25]} },
    statement:function(p){ return '\\(\\ddot y+'+p.c+'\\dot y+'+p.k+'y=0\\): (a) ω₀ (b) ζ (c) 감쇠 유형(부족=−1/임계=0/과=1)을 구하라.'; },
    solve:function(p){
      var w0=Math.sqrt(p.k), z=p.c/(2*w0);
      var t=z<0.999?-1:(z>1.001?1:0);
      return { ans:{w0:w0, z:z, t:t}, unit:{w0:'rad/s', z:'', t:''}, steps:[
        '표준형 \\(\\ddot y+2\\zeta\\omega_0\\dot y+\\omega_0^2y=0\\)과 비교',
        'ω₀ = √'+p.k+' = '+SVH.fmt(w0)+', ζ = '+p.c+'/(2ω₀) = '+SVH.fmt(z),
        (t<0?'ζ<1 부족감쇠(진동)':(t>0?'ζ>1 과감쇠':'임계감쇠')) ] }; },
    hints:['계수 비교로 ω₀·ζ.'] },
  { id:'u1-l3-03', level:3, type:'num', tags:['감쇠 정현파 해'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[0.5,0.6]}, w0:{choices:[5,10]} },
    statement:function(p){ return 'ζ='+p.z+', ω₀='+p.w0+'인 2차계의 근 \\(s=-\\sigma\\pm j\\omega_d\\): σ와 ω_d를 구하라.'; },
    solve:function(p){ var sg=p.z*p.w0, wd=p.w0*Math.sqrt(1-p.z*p.z);
      return { ans:{sg:sg, wd:wd}, unit:{sg:'1/s', wd:'rad/s'}, steps:[
        'σ = ζω₀ = '+SVH.fmt(sg)+' (봉투 감쇠율)',
        'ω_d = ω₀√(1−ζ²) = '+SVH.fmt(wd)+' (실제 진동 주파수)',
        '해 형태: \\(e^{-\\sigma t}(A\\cos\\omega_dt+B\\sin\\omega_dt)\\)' ] }; },
    hints:['근의 공식에서 실·허 분리.'] },
  { id:'u1-l3-04', level:3, type:'num', tags:['부분분수 중근'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2,3]} },
    statement:function(p){ return '\\(\\dfrac{1}{s(s+'+p.a+')^2}=\\dfrac{A}{s}+\\dfrac{B}{s+'+p.a+'}+\\dfrac{C}{(s+'+p.a+')^2}\\)의 A·B·C를 구하라.'; },
    solve:function(p){ var A=1/(p.a*p.a), C=-1/p.a, B=-A;
      return { ans:{A:A, B:B, C:C}, unit:{A:'',B:'',C:''}, steps:[
        'A = 1/(s+'+p.a+')²|₀ = '+SVH.fmt(A),
        'C = 1/s|_{−'+p.a+'} = '+SVH.fmt(C),
        'B: 양변 s→∞ 계수 비교(1/s 차수) 0 = A+B → B = '+SVH.fmt(B) ] }; },
    hints:['중근은 C 먼저(커버업), B는 계수 비교.'] },
  { id:'u1-l3-05', level:3, type:'num', tags:['연립 ODE→행렬'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[2,4]}, c:{choices:[1,3]} },
    statement:function(p){ return '\\(\\ddot x + '+p.c+'\\dot x + '+p.k+'x = 0\\)을 상태변수 \\(x_1=x, x_2=\\dot x\\)로 1차 연립 \\(\\dot{\\mathbf{x}}=A\\mathbf{x}\\)로 바꿀 때 A의 (2,1)·(2,2) 성분을 구하라.'; },
    solve:function(p){
      return { ans:{a21:-p.k, a22:-p.c}, unit:{a21:'', a22:''}, steps:[
        '\\(\\dot x_1 = x_2\\) → 1행 [0, 1]',
        '\\(\\dot x_2 = \\ddot x = -'+p.k+'x_1 -'+p.c+'x_2\\) → 2행 ['+(-p.k)+', '+(-p.c)+']',
        '(동반형(companion form) — U5 상태공간의 표준 절차)' ] }; },
    hints:['최고차 미분을 홀로 남기고 나머지를 넘긴다.'] },
  { id:'u1-l3-06', level:3, type:'num', tags:['테일러 선형화'], src:'창작 문제(검산됨)',
    params:{ x0:{choices:[1,2]}, n:{choices:[2,3]} },
    statement:function(p){ return '\\(f(x)=x^{'+p.n+'}\\)을 동작점 x₀='+p.x0+'에서 선형화하라: \\(f\\approx f(x_0)+m\\,\\delta x\\)의 f(x₀)와 기울기 m을 구하라.'; },
    solve:function(p){ var f0=Math.pow(p.x0,p.n), m=p.n*Math.pow(p.x0,p.n-1);
      return { ans:{f0:f0, m:m}, unit:{f0:'', m:''}, steps:[
        'f(x₀) = '+SVH.fmt(f0),
        'm = f′(x₀) = '+p.n+'x₀^{'+(p.n-1)+'} = '+SVH.fmt(m),
        '선형 모델: δf ≈ '+SVH.fmt(m)+'·δx (작은 편차에서만 유효)' ] }; },
    hints:['1차 테일러 전개.'] },
  { id:'u1-l3-07', level:3, type:'num', tags:['진자 선형화'], src:'교재 표준',
    params:{ L:{choices:[0.5,1,2],unit:'m'}, th:{choices:[10,20,30],unit:'°'} },
    statement:function(p){ return '진자 \\(\\ddot\\theta+(g/L)\\sin\\theta=0\\) (L='+p.L+' m, g=9.8)을 θ=0에서 선형화했을 때 (a) 고유진동수 ω₀ (b) θ='+p.th+'°에서 sinθ≈θ 근사의 상대오차(%)를 구하라.'; },
    solve:function(p){
      var w0=Math.sqrt(9.8/p.L);
      var th=SVH.rad(p.th), err=(th-Math.sin(th))/Math.sin(th)*100;
      return { ans:{w0:w0, err:err}, unit:{w0:'rad/s', err:'%'}, steps:[
        '선형화: sinθ≈θ → \\(\\ddot\\theta+(g/L)\\theta=0\\) → ω₀ = √(g/L) = '+SVH.fmt(w0),
        'θ='+p.th+'° = '+SVH.fmt(th)+' rad: 오차 = (θ−sinθ)/sinθ = '+SVH.fmt(err)+' %',
        '(선형화의 유효 범위를 수치로 확인 — Lec 계획의 Linearization 항목)' ] }; },
    hints:['라디안으로 바꿔 비교.'] },
  { id:'u1-l3-08', level:3, type:'num', tags:['스프링-질량 EOM'], src:'교재 표준',
    params:{ m:{choices:[1,2,4],unit:'kg'}, k:{choices:[16,36,64],unit:'N/m'} },
    statement:function(p){ return '질량 m='+p.m+' kg, 스프링 k='+p.k+' N/m (감쇠 없음). (a) EOM의 표준형 계수 ω₀ (b) 주기 T를 구하라.'; },
    solve:function(p){ var w0=Math.sqrt(p.k/p.m), T=2*Math.PI/w0;
      return { ans:{w0:w0, T:T}, unit:{w0:'rad/s', T:'s'}, steps:[
        '\\(m\\ddot x+kx=0\\) → ω₀ = √(k/m) = '+SVH.fmt(w0),
        'T = 2π/ω₀ = '+SVH.fmt(T)+' s' ] }; },
    hints:['뉴턴 2법칙 → 표준형.'] },
  { id:'u1-l3-09', level:3, type:'num', tags:['2×2 연립'], src:'창작 문제(검산됨)',
    params:{ a:{min:2,max:4,step:1}, b:{min:1,max:2,step:1}, c:{min:1,max:2,step:1}, d:{min:3,max:5,step:1}, e:{min:4,max:10,step:2}, f:{min:2,max:8,step:2} },
    constraint:function(p){ return p.a*p.d-p.b*p.c!==0; },
    statement:function(p){ return '연립 \\('+p.a+'x+'+p.b+'y='+p.e+',\\ '+p.c+'x+'+p.d+'y='+p.f+'\\)를 크래머로 풀어라.'; },
    solve:function(p){ var s=SVH.solve2(p.a,p.b,p.e,p.c,p.d,p.f);
      return { ans:{x:s[0], y:s[1]}, unit:{x:'', y:''}, steps:[
        'D = '+SVH.fmt(p.a*p.d-p.b*p.c),
        'x = '+SVH.fmt(s[0])+', y = '+SVH.fmt(s[1])+' (블록선도 연립·부분분수 계수에 반복 사용)' ] }; },
    hints:['크래머 공식.'] },
  { id:'u1-l3-10', level:3, type:'num', tags:['복소근→시간응답'], src:'창작 문제(검산됨)',
    params:{ sg:{choices:[1,2]}, wd:{choices:[3,4]}, t1:{choices:[0.5,1]} },
    statement:function(p){ return '특성근이 \\(s=-'+p.sg+'\\pm j'+p.wd+'\\)이고 \\(y(0)=1,\\dot y(0)=0\\)일 때 해 \\(y=e^{-\\sigma t}(\\cos\\omega_dt+\\frac{\\sigma}{\\omega_d}\\sin\\omega_dt)\\)의 t='+p.t1+' 값을 구하라.'; },
    solve:function(p){
      var y=Math.exp(-p.sg*p.t1)*(Math.cos(p.wd*p.t1)+p.sg/p.wd*Math.sin(p.wd*p.t1));
      return { ans:y, unit:'', steps:[
        '주어진 해에 대입: e^{−'+SVH.fmt(p.sg*p.t1)+'}(cos'+SVH.fmt(p.wd*p.t1)+'+'+SVH.fmt(p.sg/p.wd)+'sin'+SVH.fmt(p.wd*p.t1)+')',
        '= '+SVH.fmt(y)+' (근 위치 → 응답 수치의 직통 연결)' ] }; },
    hints:['그냥 대입 — 라디안 주의.'] },
  { id:'u1-l3-11', level:3, type:'num', tags:['오일러 활용'], src:'창작 문제(검산됨)',
    params:{ th:{choices:[30,45,60]} },
    statement:function(p){ return '오일러 공식으로 \\(\\cos'+p.th+'° = \\frac{e^{j\\theta}+e^{-j\\theta}}{2}\\)를 수치 확인하라: 우변을 계산해 cos'+p.th+'°와 비교하라. (값으로 답)'; },
    solve:function(p){ var v=Math.cos(SVH.rad(p.th));
      return { ans:v, unit:'', steps:[
        '\\(e^{j\\theta}+e^{-j\\theta} = 2\\cos\\theta\\) (허수부 상쇄)',
        '= '+SVH.fmt(v)+' — 역변환에서 복소 켤레쌍이 실수 정현파가 되는 이유' ] }; },
    hints:['켤레쌍 합은 실수.'] },
  { id:'u1-l3-12', level:3, type:'num', tags:['RLC-기계 유추'], src:'교재 표준',
    params:{ m:{choices:[2,4],unit:'kg'}, c:{choices:[8,12],unit:'N·s/m'}, k:{choices:[50,100],unit:'N/m'} },
    statement:function(p){ return '기계계 \\(m\\ddot x+c\\dot x+kx=F\\) (m='+p.m+', c='+p.c+', k='+p.k+')의 ζ를 구하고, 전기 유추(L↔m, R↔c, 1/C↔k)에서 대응하는 직렬 RLC의 ζ 식이 같음을 확인하라. (ζ 값으로)'; },
    solve:function(p){ var z=p.c/(2*Math.sqrt(p.k*p.m));
      return { ans:z, unit:'', steps:[
        'ζ = c/(2√(km)) = '+p.c+'/(2√'+SVH.fmt(p.k*p.m)+') = '+SVH.fmt(z),
        '전기: ζ = R/(2√(L/C))... = (R/2)√(C/L) — 유추로 같은 구조 (Nise Ch2 electric analogs)' ] }; },
    hints:['2차 표준형 계수 비교는 어느 물리계든 같다.'] },
  { id:'u1-l3-13', level:3, type:'num', tags:['로그 스케일'], src:'창작 문제(검산됨)',
    params:{ g:{choices:[0.5,2,10,100]} },
    statement:function(p){ return '이득 '+p.g+'을 dB로, 그리고 dB 20·log의 역으로 그 dB에서 이득을 복원해 일치를 확인하라. (dB 값으로 답)'; },
    solve:function(p){ var db=20*Math.log10(p.g);
      return { ans:db, unit:'dB', steps:[
        'dB = 20log₁₀('+p.g+') = '+SVH.fmt(db),
        '복원: 10^{'+SVH.fmt(db)+'/20} = '+SVH.fmt(Math.pow(10,db/20))+' ✓ (기말 보드선도의 산수)' ] }; },
    hints:['20log — 전압/이득 비.'] },
  { id:'u1-l3-14', level:3, type:'num', tags:['차원 검사'], src:'창작 문제(검산됨)',
    params:{ m:{choices:[1,2],unit:'kg'}, k:{choices:[9,25],unit:'N/m'} },
    statement:function(p){ return '\\(\\omega_0=\\sqrt{k/m}\\)의 단위가 rad/s임을 차원 분석으로 보이고, m='+p.m+' kg·k='+p.k+' N/m로 값을 구하라.'; },
    solve:function(p){ var w0=Math.sqrt(p.k/p.m);
      return { ans:w0, unit:'rad/s', steps:[
        '[k/m] = (N/m)/kg = (kg/s²)/kg = 1/s² → √ = 1/s ✓',
        'ω₀ = √('+p.k+'/'+p.m+') = '+SVH.fmt(w0)+' rad/s',
        '(모든 유도의 마지막에 차원 체크 — 이 과목의 습관)' ] }; },
    hints:['N = kg·m/s².'] },

  /* ---------- L4 (8) ---------- */
  { id:'u1-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 특성근의 실수부가 모두 음수면 자유응답은 0으로 수렴한다<br>㉡ 선형화는 동작점 근방에서만 유효하다<br>㉢ 복소 특성근은 항상 켤레쌍으로 나타난다(실계수 ODE)<br>㉣ 2×2 행렬의 고유값 합은 대각합(trace)과 같다',
    choices:['전부','㉠㉡㉢','㉠㉢㉣','㉡㉣'],
    answer:0, expl:'모두 참. ㉣: λ₁+λ₂=tr(A), λ₁λ₂=det(A) — 특성방정식 계수와 근의 관계.' },
  { id:'u1-l4-02', level:4, type:'num', tags:['MSD 완전 해석'], src:'기출 유형',
    params:{ m:{choices:[1,2],unit:'kg'}, c:{choices:[4,6],unit:'N·s/m'}, k:{choices:[20,40],unit:'N/m'} },
    statement:function(p){ return '질량-감쇠-스프링계(m='+p.m+', c='+p.c+', k='+p.k+')의 자유진동: (a) ω₀ (b) ζ (c) ω_d (d) 진폭이 1/e로 줄어드는 시간을 구하라.'; },
    solve:function(p){
      var w0=Math.sqrt(p.k/p.m), z=p.c/(2*Math.sqrt(p.k*p.m));
      var wd=w0*Math.sqrt(1-z*z), te=1/(z*w0);
      return { ans:{w0:w0, z:z, wd:wd, te:te}, unit:{w0:'rad/s', z:'', wd:'rad/s', te:'s'}, steps:[
        'ω₀ = √(k/m) = '+SVH.fmt(w0)+', ζ = c/(2√(km)) = '+SVH.fmt(z),
        'ω_d = ω₀√(1−ζ²) = '+SVH.fmt(wd),
        '봉투 e^{−ζω₀t} → 1/e 시간 = 1/(ζω₀) = '+SVH.fmt(te)+' s' ] }; },
    hints:['표준형 3종(ω₀·ζ·ω_d) + 봉투 시정수.'] },
  { id:'u1-l4-03', level:4, type:'num', tags:['선형화 유효범위'], src:'기출 유형',
    params:{ pct:{choices:[1,5]} },
    statement:function(p){ return 'sinθ≈θ 근사의 상대오차가 '+p.pct+'%가 되는 각도(°)를 구하라. (θ−sinθ)/sinθ = '+p.pct+'/100 을 수치로 풀어라.'; },
    solve:function(p){
      // 이분법으로 수치 풀이 (solver도 러너도 같은 코드)
      var target=p.pct/100, lo=0.01, hi=1.5;
      for(var i=0;i<60;i++){ var mid=(lo+hi)/2, e=(mid-Math.sin(mid))/Math.sin(mid); if(e<target) lo=mid; else hi=mid; }
      var th=SVH.deg((lo+hi)/2);
      return { ans:th, unit:'°', steps:[
        '오차식 (θ−sinθ)/sinθ는 θ와 함께 단조 증가 → 수치 풀이',
        'θ ≈ '+SVH.fmt(th)+'° ('+p.pct+'% 기준)',
        '(근사 θ³/6/θ = θ²/6 로도 추정 가능: θ≈√(6×'+target+') rad = '+SVH.fmt(SVH.deg(Math.sqrt(6*target)))+'° — 근접 확인)' ] }; },
    hints:['테일러 나머지 θ³/6로 초기 추정.'] },
  { id:'u1-l4-04', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'2차 ODE \\(\\ddot y+2\\zeta\\omega_0\\dot y+\\omega_0^2y=0\\) (0<ζ<1)의 일반해가 감쇠 정현파임을 특성방정식에서 유도하라.',
    steps:[
      '\\(y=e^{st}\\) 대입 → \\(s^2+2\\zeta\\omega_0 s+\\omega_0^2=0\\) [왜] 지수는 미분해도 자기 자신 — 선형 상수계수의 열쇠',
      '근: \\(s=-\\zeta\\omega_0\\pm\\omega_0\\sqrt{\\zeta^2-1}\\) — 0<ζ<1이면 근호 안이 음수 → \\(s=-\\zeta\\omega_0\\pm j\\omega_d\\), \\(\\omega_d=\\omega_0\\sqrt{1-\\zeta^2}\\)',
      '일반해: \\(y=e^{-\\zeta\\omega_0t}(C_1e^{j\\omega_dt}+C_2e^{-j\\omega_dt})\\) — 실해이려면 C₂=C₁* (켤레)',
      '오일러로 정리: \\(y=e^{-\\zeta\\omega_0t}(A\\cos\\omega_dt+B\\sin\\omega_dt)\\) — 봉투 × 진동',
      '극한 체크: ζ→0 ⇒ 순수 진동 ✓ · ζ→1 ⇒ ω_d→0 (임계) ✓ · 차원: [ζω₀]=1/s ✓'
    ],
    hints:['e^{st} 대입 → 복소근 → 오일러.','실수 해 조건이 켤레쌍을 강제한다.'],
    expl:'U6 시간응답·U7 안정성의 수학적 기초 — 이 유도가 몸에 있으면 절반은 끝.' },
  { id:'u1-l4-05', level:4, type:'num', tags:['부분분수 복소근'], src:'기출 유형',
    params:{ a:{choices:[2,4]}, w:{choices:[3,5]} },
    statement:function(p){ return '\\(F(s)=\\dfrac{'+(p.a*p.a+p.w*p.w)+'}{s[(s+'+p.a+')^2+'+(p.w*p.w)+']}\\)를 \\(\\frac{A}{s}+\\frac{Bs+C}{(s+'+p.a+')^2+'+(p.w*p.w)+'}\\)로 전개할 때 A·B·C를 구하라. (분자 = ω₀² = '+(p.a*p.a+p.w*p.w)+')'; },
    solve:function(p){
      var w02=p.a*p.a+p.w*p.w;
      var A=1;            // w02 / w02
      var B=-1, C=-2*p.a; // 표준 결과: 1/s - (s+2a)/((s+a)²+w²)
      return { ans:{A:A, B:B, C:C}, unit:{A:'',B:'',C:''}, steps:[
        'A = F(s)·s|₀ = '+w02+'/'+w02+' = 1',
        '통분 비교: 분자 '+w02+' = A[(s+'+p.a+')²+'+(p.w*p.w)+'] + (Bs+C)s',
        's² 계수: 0=A+B → B=−1 · s¹ 계수: 0=2aA+C → C=−'+(2*p.a),
        '(이 꼴이 2차계 스텝 응답 역변환의 표준 전개 — U6에서 재등장)' ] }; },
    hints:['A는 커버업, 나머지는 계수 비교.'] },
  { id:'u1-l4-06', level:4, type:'num', tags:['고유값 안정성'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,5]} },
    statement:function(p){ return '\\(A=\\begin{bmatrix}0&1\\\\-'+p.b+'&-'+p.a+'\\end{bmatrix}\\)의 (a) 특성방정식 계수 (b) 고유값 실수부 (c) 안정 여부(안정=1/불안정=0)를 구하라.'; },
    solve:function(p){
      var D=p.a*p.a-4*p.b;
      var re = D>=0 ? (-p.a+Math.sqrt(D))/2 : -p.a/2; // 최대 실수부
      return { ans:{tr:-p.a, det:p.b, re:re, stable:re<0?1:0}, unit:{tr:'(합)', det:'(곱)', re:'', stable:''}, steps:[
        'det(λI−A) = λ²+'+p.a+'λ+'+p.b+' (동반형이라 계수가 바로 보인다)',
        '근의 합 = −'+p.a+', 곱 = '+p.b+' → 최대 실수부 = '+SVH.fmt(re),
        '실수부 전부 음수 → 안정(1) — Routh(U7)의 2차 특례: 모든 계수 양수 ⇔ 안정' ] }; },
    hints:['동반형의 특성다항식은 마지막 행에서 읽는다.'] },
  { id:'u1-l4-07', level:4, type:'num', tags:['측정→모델'], src:'기출 유형',
    params:{ T:{choices:[0.5,1],unit:'s'}, r:{choices:[0.3,0.5]} },
    statement:function(p){ return '자유진동 실측: 주기 '+p.T+' s, 한 주기마다 진폭이 '+p.r+'배. (a) ω_d (b) ζω₀(=σ) (c) ζ (d) ω₀를 구하라. (로그 감쇠법 — MSD 파라미터 역추정)'; },
    solve:function(p){
      var wd=2*Math.PI/p.T, sg=-Math.log(p.r)/p.T;
      var w0=Math.hypot(sg,wd), z=sg/w0;
      return { ans:{wd:wd, sg:sg, z:z, w0:w0}, unit:{wd:'rad/s', sg:'1/s', z:'', w0:'rad/s'}, steps:[
        'ω_d = 2π/T = '+SVH.fmt(wd),
        'σ = −ln('+p.r+')/T = '+SVH.fmt(sg),
        'ω₀ = √(σ²+ω_d²) = '+SVH.fmt(w0)+', ζ = σ/ω₀ = '+SVH.fmt(z),
        '(실험 데이터→모델 파라미터 — HW·기말 실전 기술)' ] }; },
    hints:['주기와 감쇠비 두 측정이면 2차계는 완전 결정.'] },
  { id:'u1-l4-08', level:4, type:'num', tags:['비선형 탱크 선형화'], src:'기출 유형',
    params:{ A:{choices:[1,2],unit:'m²'}, k:{choices:[0.5,1]}, h0:{choices:[1,4],unit:'m'} },
    statement:function(p){ return '탱크 모델 \\(A\\dot h = q_{in} - k\\sqrt{h}\\) (A='+p.A+', k='+p.k+'). 동작점 h₀='+p.h0+' m에서 (a) 평형 유입량 q₀ (b) 선형화 계수 \\(\\partial(k\\sqrt h)/\\partial h|_{h_0}\\) (c) 선형화된 시정수 τ=A/그 계수를 구하라.'; },
    solve:function(p){
      var q0=p.k*Math.sqrt(p.h0);
      var m=p.k/(2*Math.sqrt(p.h0));
      var tau=p.A/m;
      return { ans:{q0:q0, m:m, tau:tau}, unit:{q0:'m³/s', m:'', tau:'s'}, steps:[
        '평형: q₀ = k√h₀ = '+SVH.fmt(q0),
        '기울기 = k/(2√h₀) = '+SVH.fmt(m),
        '선형 모델 \\(A\\,\\delta\\dot h = \\delta q - '+SVH.fmt(m)+'\\delta h\\) → τ = A/'+SVH.fmt(m)+' = '+SVH.fmt(tau)+' s',
        '(비선형→선형→1차계 시정수: Lec 계획 Linearization의 종착지)' ] }; },
    hints:['√h의 미분 = 1/(2√h).','시정수는 계수비.'] }
  ]
});
