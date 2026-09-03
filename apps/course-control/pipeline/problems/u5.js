/* U5 상태공간 표현·선형화 — 소개 수준(강의계획 명시): 표현·변환·고유값, 깊은 해석은 제외 */
SV_BANK.push({
  id: 'u5', no: 5, title: '상태공간·선형화', titleEn: 'State Space & Linearization',
  scope: '상태변수 선택 · \\(\\dot{x}=Ax+Bu,\\ y=Cx+Du\\) · TF↔상태공간 변환 · 고유값=극점 · 평형점 선형화 (소개 수준)',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u5-l1-01', level:1, type:'mc', tags:['상태의 정의'], src:'교재 표준',
    statement:'"상태(state)"의 정의로 가장 정확한 것은?',
    choices:['현재 이후의 거동을 입력과 함께 완전히 결정하는 최소 변수 집합','출력의 모든 이력','입력의 목록','에너지 그 자체'],
    answer:0, expl:'보통 에너지 저장 요소당 1개(질량의 속도·스프링 변위·C 전압·L 전류). 최소성이 정의의 핵심.' },
  { id:'u5-l1-02', level:1, type:'tf', tags:['형태'], src:'교재 표준',
    statement:'선형 시불변 시스템의 상태방정식은 \\(\\dot{\\mathbf{x}}=A\\mathbf{x}+B u,\\ y=C\\mathbf{x}+Du\\) 형태다.',
    answer:true, expl:'A: 시스템(동역학), B: 입력, C: 출력 선택, D: 직결 항. 대부분의 물리계는 D=0.' },
  { id:'u5-l1-03', level:1, type:'mc', tags:['차수'], src:'교재 표준',
    statement:'n차 미분방정식을 상태공간으로 바꾸면?',
    choices:['n개의 1차 연립 ODE','1개의 n차 방정식 유지','n² 개 방정식','항상 2개'],
    answer:0, expl:'상태 벡터 차원 = 시스템 차수 = 독립 에너지 저장 요소 수.' },
  { id:'u5-l1-04', level:1, type:'tf', tags:['고유값=극점'], src:'교재 표준',
    statement:'전달함수의 극점은 A 행렬의 고유값과 같다(소거가 없다면).',
    answer:true, expl:'G(s)=C(sI−A)⁻¹B+D의 분모가 det(sI−A) — 특성다항식. 소거(비가관측/비가제어)가 있으면 일부만 보인다.' },
  { id:'u5-l1-05', level:1, type:'mc', tags:['평형점'], src:'교재 표준',
    statement:'비선형계 \\(\\dot x=f(x,u)\\)의 평형점 \\((x_0,u_0)\\)의 조건은?',
    choices:['\\(f(x_0,u_0)=0\\)','\\(x_0=0\\)','\\(u_0=0\\)','f의 최댓값'],
    answer:0, expl:'거기서 멈춰 있을 수 있는 점. 선형화 A=∂f/∂x, B=∂f/∂u는 이 점에서 평가한다.' },
  { id:'u5-l1-06', level:1, type:'tf', tags:['표현의 비유일성'], src:'교재 표준',
    statement:'같은 시스템의 상태공간 표현은 상태변수 선택에 따라 여러 개일 수 있으나, 전달함수(입출력 관계)는 하나다.',
    answer:true, expl:'좌표 변환 x=Tz로 무한히 많은 (A,B,C) — 고유값·TF는 불변량이다.' },

  /* ---------- L2 (12) ---------- */
  { id:'u5-l2-01', level:2, type:'num', tags:['동반형 작성'], src:'창작 문제(검산됨)',
    params:{ a1:{choices:[3,5]}, a0:{choices:[6,10]}, b0:{choices:[2,4]} },
    statement:function(p){ return '\\(\\ddot y+'+p.a1+'\\dot y+'+p.a0+'y='+p.b0+'u\\)의 동반형 A·B에서 (a) A의 (2,1)·(2,2) (b) B의 2행을 구하라.'; },
    solve:function(p){
      return { ans:{a21:-p.a0, a22:-p.a1, b2:p.b0}, unit:{a21:'',a22:'',b2:''}, steps:[
        'x₁=y, x₂=ẏ: A = [[0,1],[−'+p.a0+',−'+p.a1+']]',
        'B = [0, '+p.b0+']ᵀ (입력은 최고차 식에만)' ] }; },
    hints:['계수에 −부호 붙여 마지막 행.'] },
  { id:'u5-l2-02', level:2, type:'num', tags:['특성다항식'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,4]}, c:{choices:[1,2]}, d:{choices:[4,5]} },
    statement:function(p){ return '\\(A=\\begin{bmatrix}-'+p.a+'&'+p.b+'\\\\'+p.c+'&-'+p.d+'\\end{bmatrix}\\)의 특성다항식 \\(s^2+c_1s+c_0\\)의 c₁·c₀를 구하라.'; },
    solve:function(p){ var c1=p.a+p.d, c0=p.a*p.d-p.b*p.c;
      return { ans:{c1:c1, c0:c0}, unit:{c1:'',c0:''}, steps:[
        'c₁ = −tr(A) = '+SVH.fmt(c1),
        'c₀ = det(A) = '+p.a+'·'+p.d+'−'+p.b+'·'+p.c+' = '+SVH.fmt(c0),
        '(tr·det만으로 2차 특성다항식 완성)' ] }; },
    hints:['s²−tr·s+det ... 부호 주의: +c₁s에 c₁=−tr.'] },
  { id:'u5-l2-03', level:2, type:'num', tags:['안정 판정'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,3]}, b:{choices:[1,4]} },
    statement:function(p){ return 'A=[[0,1],[−'+p.b+',−'+p.a+']]의 (a) 고유값 실수부(최대) (b) 안정 여부(1/0)를 구하라.'; },
    solve:function(p){
      var D=p.a*p.a-4*p.b;
      var re=D>=0?(-p.a+Math.sqrt(D))/2:-p.a/2;
      return { ans:{re:re, st:re<0?1:0}, unit:{re:'', st:''}, steps:[
        'λ²+'+p.a+'λ+'+p.b+'=0 → 최대 실수부 = '+SVH.fmt(re),
        '음수 → 안정(1) (계수 모두 양수인 2차의 특례와 일치)' ] }; },
    hints:['판별식으로 분기.'] },
  { id:'u5-l2-04', level:2, type:'num', tags:['TF 복원'], src:'창작 문제(검산됨)',
    params:{ a0:{choices:[6,8]}, a1:{choices:[5,6]}, b0:{choices:[3,12]} },
    statement:function(p){ return '동반형 A=[[0,1],[−'+p.a0+',−'+p.a1+']], B=[0,'+p.b0+']ᵀ, C=[1,0]의 전달함수 G(s)의 (a) 분자 (b) DC 이득을 구하라.'; },
    solve:function(p){ var K=p.b0/p.a0;
      return { ans:{num:p.b0, K:K}, unit:{num:'',K:''}, steps:[
        'G = '+p.b0+'/(s²+'+p.a1+'s+'+p.a0+') (동반형+C=[1,0]의 표준 결과)',
        'DC = '+SVH.fmt(K) ] }; },
    hints:['동반형은 눈으로 복원 가능.'] },
  { id:'u5-l2-05', level:2, type:'num', tags:['RLC 상태선택'], src:'교재 표준',
    params:{ L:{choices:[1,2]}, C:{choices:[0.5,1]}, R:{choices:[2,3]} },
    statement:function(p){ return '직렬 RLC(전원 u, 상태 x₁=i_L, x₂=v_C)의 A 행렬 성분 (1,1)과 (1,2)를 구하라. (L='+p.L+', C='+p.C+', R='+p.R+')'; },
    solve:function(p){
      return { ans:{a11:-p.R/p.L, a12:-1/p.L}, unit:{a11:'',a12:''}, steps:[
        'KVL: L(di/dt) = u − Ri − v_C',
        'A(1,·) = [−R/L, −1/L] = ['+SVH.fmt(-p.R/p.L)+', '+SVH.fmt(-1/p.L)+']',
        '(2행은 C(dv/dt)=i → [1/C, 0])' ] }; },
    hints:['에너지 저장 소자당 상태 1개.'] },
  { id:'u5-l2-06', level:2, type:'num', tags:['자유응답'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[-1,-2]}, x0:{choices:[3,5]}, t1:{choices:[0.5,1]} },
    statement:function(p){ return '대각계 \\(\\dot x='+p.l1+'x\\), x(0)='+p.x0+'의 t='+p.t1+' 값을 구하라.'; },
    solve:function(p){ var v=p.x0*Math.exp(p.l1*p.t1);
      return { ans:v, unit:'', steps:[
        'x = x₀e^{'+p.l1+'t} — 고유값이 곧 모드의 지수',
        '= '+SVH.fmt(v) ] }; },
    hints:['1차 모드 하나.'] },
  { id:'u5-l2-07', level:2, type:'num', tags:['평형점 계산'], src:'창작 문제(검산됨)',
    params:{ u0:{choices:[4,9]}, k:{choices:[1,2]} },
    statement:function(p){ return '\\(\\dot x=u-'+p.k+'x^2\\)에서 u₀='+p.u0+'일 때 평형점 x₀(양수)를 구하라.'; },
    solve:function(p){ var x0=Math.sqrt(p.u0/p.k);
      return { ans:x0, unit:'', steps:[
        '평형 조건: \\(\\dot x=0\\) → 0 = u₀−'+p.k+'x₀²',
        'x₀ = √('+p.u0+'/'+p.k+') = '+SVH.fmt(x0)+' (양의 물리해 선택)' ] }; },
    hints:['ẋ=0으로 놓는다.'] },
  { id:'u5-l2-08', level:2, type:'num', tags:['야코비안'], src:'창작 문제(검산됨)',
    params:{ u0:{choices:[4,16]}, k:{choices:[1]} },
    statement:function(p){ return '위 시스템의 평형점에서 선형화 계수 a=∂f/∂x를 구하고 안정성(1/0)을 답하라. (u₀='+p.u0+')'; },
    solve:function(p){ var x0=Math.sqrt(p.u0/p.k), a=-2*p.k*x0;
      return { ans:{a:a, st:1}, unit:{a:'', st:''}, steps:[
        'a = −2kx₀ = '+SVH.fmt(a)+' < 0 → 평형 안정(1)',
        '(선형화 δẋ = aδx + δu — 동작점이 클수록 더 빨리 정착)' ] }; },
    hints:['x²의 미분.'] },
  { id:'u5-l2-09', level:2, type:'num', tags:['C 행렬 역할'], src:'창작 문제(검산됨)',
    params:{ x1:{choices:[2,3]}, x2:{choices:[4,6]}, c1:{choices:[1,2]}, c2:{choices:[0,1]} },
    statement:function(p){ return '상태 x=['+p.x1+', '+p.x2+']ᵀ, C=['+p.c1+', '+p.c2+'], D=0일 때 출력 y를 구하라.'; },
    solve:function(p){ var y=p.c1*p.x1+p.c2*p.x2;
      return { ans:y, unit:'', steps:[
        'y = Cx = '+p.c1+'×'+p.x1+'+'+p.c2+'×'+p.x2+' = '+SVH.fmt(y),
        '(C는 "무엇을 재는가"의 행렬 — 센서 선택)' ] }; },
    hints:['행렬 곱 한 줄.'] },
  { id:'u5-l2-10', level:2, type:'num', tags:['(sI−A) 역'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, s0:{choices:[0,1]} },
    statement:function(p){ return 'A=[[0,1],[0,−'+p.a+']] (적분기+1차)에서 \\((sI-A)^{-1}\\)의 (1,2) 성분을 s='+p.s0+'에서... 대신 일반식으로 구해 s='+(p.s0+1)+'에서 값을 구하라.'; },
    solve:function(p){ var sv=p.s0+1, v=1/(sv*(sv+p.a));
      return { ans:v, unit:'', steps:[
        'sI−A = [[s,−1],[0,s+'+p.a+']] → 역의 (1,2) = 1/[s(s+'+p.a+')]',
        's='+sv+': '+SVH.fmt(v)+' (G(s)의 핵심 성분이 이렇게 나온다)' ] }; },
    hints:['상삼각의 역행렬.'] },
  { id:'u5-l2-11', level:2, type:'num', tags:['모드 분해'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[-1]}, l2:{choices:[-4,-5]}, c1:{choices:[2,3]}, c2:{choices:[1,2]}, t1:{choices:[1]} },
    statement:function(p){ return '자유응답이 \\(y='+p.c1+'e^{'+p.l1+'t}+'+p.c2+'e^{'+p.l2+'t}\\)일 때 (a) t='+p.t1+'의 y (b) 두 모드 크기가 같아지는... 대신 t='+p.t1+'에서 빠른 모드가 차지하는 비율(%)을 구하라.'; },
    solve:function(p){
      var m1=p.c1*Math.exp(p.l1*p.t1), m2=p.c2*Math.exp(p.l2*p.t1);
      return { ans:{y:m1+m2, pct:m2/(m1+m2)*100}, unit:{y:'', pct:'%'}, steps:[
        '느린 모드 '+SVH.fmt(m1)+', 빠른 모드 '+SVH.fmt(m2),
        '합 '+SVH.fmt(m1+m2)+', 빠른 모드 비중 '+SVH.fmt(m2/(m1+m2)*100)+' % (수치로 보는 지배극점)' ] }; },
    hints:['각 항을 따로 평가.'] },
  { id:'u5-l2-12', level:2, type:'num', tags:['이산 개념 아님—단위 확인'], src:'창작 문제(검산됨)',
    params:{ m:{choices:[1,2]}, c:{choices:[3,4]}, k:{choices:[8,10]} },
    statement:function(p){ return 'MSD(m='+p.m+', c='+p.c+', k='+p.k+')의 상태방정식에서 A(2,1)=−k/m, A(2,2)=−c/m의 값을 구하라.'; },
    solve:function(p){
      return { ans:{a21:-p.k/p.m, a22:-p.c/p.m}, unit:{a21:'1/s²', a22:'1/s'}, steps:[
        'A(2,1) = −'+p.k+'/'+p.m+' = '+SVH.fmt(-p.k/p.m)+' [1/s²]',
        'A(2,2) = −'+p.c+'/'+p.m+' = '+SVH.fmt(-p.c/p.m)+' [1/s] (성분마다 차원이 다르다!)' ] }; },
    hints:['물리 EOM을 m으로 나눔.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u5-l3-01', level:3, type:'num', tags:['3차 동반형'], src:'창작 문제(검산됨)',
    params:{ a2:{choices:[2,3]}, a1:{choices:[5,7]}, a0:{choices:[4,6]} },
    statement:function(p){ return '\\(\\dddot y+'+p.a2+'\\ddot y+'+p.a1+'\\dot y+'+p.a0+'y=u\\)의 동반형 A 3행을 구하라.'; },
    solve:function(p){
      return { ans:{a31:-p.a0, a32:-p.a1, a33:-p.a2}, unit:{a31:'',a32:'',a33:''}, steps:[
        '3행 = [−a₀, −a₁, −a₂] = [−'+p.a0+', −'+p.a1+', −'+p.a2+']',
        '(위 두 행은 [0,1,0], [0,0,1] — 사다리 구조)' ] }; },
    hints:['계수 역순+부호.'] },
  { id:'u5-l3-02', level:3, type:'num', tags:['고유값 완전'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[3,5]}, b:{choices:[2,6]} },
    statement:function(p){ return 'A=[[−'+p.a+',1],[0,−'+p.b+']]의 (a) 고유값 둘 (b) e^{At}의 (1,1) 성분이 t=1에서 갖는 값을 구하라.'; },
    solve:function(p){
      var v=Math.exp(-p.a);
      return { ans:{l1:-p.a, l2:-p.b, e11:v}, unit:{l1:'',l2:'',e11:''}, steps:[
        '삼각 → λ = −'+p.a+', −'+p.b,
        'e^{At}(1,1) = e^{−'+p.a+'t} → t=1: '+SVH.fmt(v)+' (대각 모드는 독립 감쇠)' ] }; },
    hints:['삼각행렬의 지수도 대각은 그대로.'] },
  { id:'u5-l3-03', level:3, type:'num', tags:['TF→상태공간→검증'], src:'기출 유형',
    params:{ b0:{choices:[8,12]}, a1:{choices:[6,7]}, a0:{choices:[8,12]} },
    statement:function(p){ return '\\(G=\\dfrac{'+p.b0+'}{s^2+'+p.a1+'s+'+p.a0+'}\\)를 동반형으로 쓰고, tr(A)와 det(A)가 −a₁·a₀와 일치함을 확인하라. (tr, det 값)'; },
    solve:function(p){
      return { ans:{tr:-p.a1, det:p.a0}, unit:{tr:'', det:''}, steps:[
        'A=[[0,1],[−'+p.a0+',−'+p.a1+']] → tr = −'+p.a1+', det = '+p.a0,
        '특성다항식 s²−tr·s+det = s²+'+p.a1+'s+'+p.a0+' ✓ (분모 재현)' ] }; },
    hints:['tr=합, det=곱의 부호 규칙.'] },
  { id:'u5-l3-04', level:3, type:'num', tags:['진자 상태공간'], src:'기출 유형',
    params:{ L:{choices:[0.5,1]}, c:{choices:[0.4,1]} },
    statement:function(p){ return '감쇠 진자 \\(\\ddot\\theta+'+p.c+'\\dot\\theta+(g/L)\\sin\\theta=u\\) (L='+p.L+', g=9.8)를 θ=0에서 선형화한 A의 (2,1)·(2,2)와 고유값 실수부를 구하라.'; },
    solve:function(p){
      var k=9.8/p.L;
      var D=p.c*p.c-4*k;
      var re=D>=0?(-p.c+Math.sqrt(D))/2:-p.c/2;
      return { ans:{a21:-k, a22:-p.c, re:re}, unit:{a21:'',a22:'',re:''}, steps:[
        'sinθ≈θ → A=[[0,1],[−'+SVH.fmt(k)+',−'+p.c+']]',
        '고유값 실수부 = '+SVH.fmt(re)+' (감쇠가 작아 복소근 — 흔들리며 멈춘다)' ] }; },
    hints:['선형화 후 동반형.'] },
  { id:'u5-l3-05', level:3, type:'num', tags:['도립 진자 불안정'], src:'기출 유형',
    params:{ L:{choices:[0.5,1]} },
    statement:function(p){ return '도립(거꾸로) 진자: θ=π 근방 선형화 \\(\\ddot\\phi-(g/L)\\phi=0\\) (L='+p.L+'). (a) 고유값 둘 (b) 불안정 모드의 시정수(발산 e배 시간)를 구하라.'; },
    solve:function(p){
      var lam=Math.sqrt(9.8/p.L);
      return { ans:{l1:lam, l2:-lam, tau:1/lam}, unit:{l1:'',l2:'',tau:'s'}, steps:[
        'λ = ±√(g/L) = ±'+SVH.fmt(lam),
        '양의 고유값 → 불안정. e배 시간 = 1/λ = '+SVH.fmt(1/lam)+' s',
        '(이 시간 안에 제어가 개입해야 세울 수 있다 — 피드백 필요성의 대표 사례)' ] }; },
    hints:['부호가 뒤집힌 스프링.'] },
  { id:'u5-l3-06', level:3, type:'num', tags:['2탱크 연립'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[1,3]} },
    statement:function(p){ return '2탱크: \\(\\dot x_1=-'+p.a+'x_1+u,\\ \\dot x_2='+p.a+'x_1-'+p.b+'x_2\\). (a) A의 고유값 둘 (b) u=1 스텝의 정상 x₂를 구하라.'; },
    solve:function(p){
      return { ans:{l1:-p.a, l2:-p.b, x2:p.a/(p.a*p.b)}, unit:{l1:'',l2:'',x2:''}, steps:[
        '하삼각 → λ = −'+p.a+', −'+p.b,
        '정상: x₁=1/'+p.a+', x₂ = '+p.a+'x₁/'+p.b+' = 1/'+p.b+' = '+SVH.fmt(1/p.b),
        '(직렬 1차계 둘 = 극점 둘의 물리적 그림)' ] }; },
    hints:['정상상태는 ẋ=0 연립.'] },
  { id:'u5-l3-07', level:3, type:'num', tags:['출력에 D'], src:'창작 문제(검산됨)',
    params:{ d:{choices:[1,2]}, b0:{choices:[3,4]}, a0:{choices:[6,8]} },
    statement:function(p){ return 'G(s) = '+p.d+' + \\(\\dfrac{'+p.b0+'}{s+'+p.a0+'}\\) (D≠0 시스템). (a) D (b) 스텝 입력의 y(0⁺) (c) y(∞)를 구하라.'; },
    solve:function(p){
      return { ans:{D:p.d, y0:p.d, yinf:p.d+p.b0/p.a0}, unit:{D:'',y0:'',yinf:''}, steps:[
        'D = 직결항 = '+p.d+' → y(0⁺) = D×1 = '+p.d+' (즉시 점프!)',
        'y(∞) = G(0) = '+p.d+'+'+SVH.fmt(p.b0/p.a0)+' = '+SVH.fmt(p.d+p.b0/p.a0),
        '(D는 분자·분모 같은 차수의 흔적)' ] }; },
    hints:['D가 있으면 스텝에 즉답 성분.'] },
  { id:'u5-l3-08', level:3, type:'num', tags:['좌표 변환 불변량'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,3]}, b:{choices:[4,5]} },
    statement:function(p){ return 'A=[[−'+p.a+',0],[0,−'+p.b+']]를 T=[[1,1],[0,1]]로 변환한 \\(\\tilde A=T^{-1}AT\\)의 (a) tr (b) det를 구해 불변임을 확인하라.'; },
    solve:function(p){
      return { ans:{tr:-(p.a+p.b), det:p.a*p.b}, unit:{tr:'',det:''}, steps:[
        '유사 변환은 고유값 보존 → tr = −'+(p.a+p.b)+', det = '+p.a*p.b+' 그대로',
        '(직접 계산해도 같다 — 불변량 확인이 계산 검산보다 빠를 때가 많다)' ] }; },
    hints:['유사 변환의 성질.'] },
  { id:'u5-l3-09', level:3, type:'num', tags:['모터 상태공간'], src:'기출 유형',
    params:{ J:{choices:[0.5,1]}, b:{choices:[1,2]}, Kt:{choices:[1,2]}, Ra:{choices:[2]} },
    statement:function(p){ return '전기자 인덕턴스 무시 DC 모터(1차): \\(J\\dot\\omega=-(b+K_t^2/R_a)\\omega+(K_t/R_a)V\\). (a) A(스칼라) (b) B (c) 고유값을 구하라. (J='+p.J+', b='+p.b+', K_t='+p.Kt+', R_a='+p.Ra+')'; },
    solve:function(p){
      var A=-(p.b+p.Kt*p.Kt/p.Ra)/p.J, B=(p.Kt/p.Ra)/p.J;
      return { ans:{A:A, B:B, lam:A}, unit:{A:'',B:'',lam:''}, steps:[
        'A = −(b+K_t²/R_a)/J = '+SVH.fmt(A),
        'B = (K_t/R_a)/J = '+SVH.fmt(B),
        '1차라 고유값=A 자신 = '+SVH.fmt(A)+' (U3 시정수의 역수와 부호)' ] }; },
    hints:['1차계는 스칼라 상태방정식.'] },
  { id:'u5-l3-10', level:3, type:'num', tags:['평형 2개'], src:'기출 유형',
    params:{ r:{choices:[2,4]} },
    statement:function(p){ return '\\(\\dot x = x('+p.r+'-x)\\) (로지스틱형). (a) 평형점 둘 (b) 각 평형의 선형화 계수 (c) 안정한 평형점을 구하라.'; },
    solve:function(p){
      return { ans:{x1:0, x2:p.r, a1:p.r, a2:-p.r, stable:p.r}, unit:{x1:'',x2:'',a1:'',a2:'',stable:''}, steps:[
        '평형: x=0, x='+p.r,
        '∂f/∂x = '+p.r+'−2x → x=0에서 +'+p.r+'(불안정), x='+p.r+'에서 −'+p.r+'(안정)',
        '(같은 시스템에 안정·불안정 평형이 공존 — 선형화는 "점"의 이야기)' ] }; },
    hints:['f=0 근 두 개, 각각 미분.'] },
  { id:'u5-l3-11', level:3, type:'num', tags:['가제어 소개'], src:'교재 표준',
    params:{ a:{choices:[2,3]}, b1:{choices:[1]}, },
    statement:function(p){ return 'A=[[−'+p.a+',0],[0,−'+(p.a+1)+']], B=['+p.b1+',0]ᵀ. 가제어성 행렬 [B, AB]의 행렬식을 구하고 제어 가능 여부(1/0)를 답하라.'; },
    solve:function(p){
      return { ans:{det:0, ctrl:0}, unit:{det:'', ctrl:''}, steps:[
        'AB = [−'+p.a+'·'+p.b1+', 0]ᵀ → [B, AB] = [['+p.b1+',−'+p.a*p.b1+'],[0,0]]',
        'det = 0 → 제어 불가(0): 둘째 모드에 입력이 닿지 않는다',
        '(소개 수준: "B가 0인 모드는 못 움직인다"는 직관 확인)' ] }; },
    hints:['둘째 상태에 B성분이 없다.'] },
  { id:'u5-l3-12', level:3, type:'num', tags:['수치 적분 한 스텝'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, h:{choices:[0.1,0.2]}, x0:{choices:[1,2]} },
    statement:function(p){ return '\\(\\dot x=-'+p.a+'x\\), x(0)='+p.x0+'를 오일러법(스텝 h='+p.h+')으로 한 스텝 진행한 값과 참값을 비교하라: (a) 오일러 x₁ (b) 참값 (c) 오차.'; },
    solve:function(p){
      var xe=p.x0*(1-p.a*p.h), xt=p.x0*Math.exp(-p.a*p.h);
      return { ans:{xe:xe, xt:xt, err:xe-xt}, unit:{xe:'',xt:'',err:''}, steps:[
        '오일러: x₁ = x₀(1−ah) = '+SVH.fmt(xe),
        '참값: x₀e^{−ah} = '+SVH.fmt(xt),
        '오차 = '+SVH.fmt(xe-xt)+' (시뮬레이션이 왜 h에 민감한지 — HW 수치문제 대비)' ] }; },
    hints:['(1−ah)는 e^{−ah}의 1차 근사.'] },
  { id:'u5-l3-13', level:3, type:'num', tags:['직렬 RC 2단 상태'], src:'창작 문제(검산됨)',
    params:{ t1:{choices:[1,2]}, t2:{choices:[3,4]} },
    statement:function(p){ return '독립(버퍼) 1차계 두 개: \\(\\dot x_1=-x_1/'+p.t1+'+u,\\ \\dot x_2=-x_2/'+p.t2+'+x_1\\). u=1 스텝의 정상 (a) x₁ (b) x₂를 구하라.'; },
    solve:function(p){
      var x1=p.t1, x2=p.t1*p.t2;
      return { ans:{x1:x1, x2:x2}, unit:{x1:'',x2:''}, steps:[
        '정상: x₁ = τ₁·u = '+p.t1+', x₂ = τ₂·x₁ = '+SVH.fmt(x2),
        '(DC 이득이 곱으로 쌓인다 — 직렬 구조의 상태공간 확인)' ] }; },
    hints:['ẋ=0 대입 순서대로.'] },
  { id:'u5-l3-14', level:3, type:'num', tags:['선형화 B'], src:'기출 유형',
    params:{ x0:{choices:[1,2]}, u0:{choices:[2,3]} },
    statement:function(p){ return '\\(\\dot x=-x^2+xu\\)의 평형 (x₀='+p.x0+', 대응 u₀)에서 (a) u₀ (b) a=∂f/∂x (c) b=∂f/∂u를 구하라.'; },
    solve:function(p){
      var u0=p.x0; // 0=-x0²+x0·u0 → u0=x0
      var a=-2*p.x0+u0, b=p.x0;
      return { ans:{u0:u0, a:a, b:b}, unit:{u0:'',a:'',b:''}, steps:[
        '평형: 0 = −x₀²+x₀u₀ → u₀ = x₀ = '+u0,
        'a = −2x₀+u₀ = '+SVH.fmt(a)+', b = x₀ = '+SVH.fmt(b),
        '(B도 동작점에 의존 — 입력 유효성이 상태에 따라 변한다)' ] }; },
    hints:['두 편미분 모두 평형점에서 평가.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u5-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 상태 차원 = 독립 에너지 저장 요소 수<br>㉡ 고유값은 좌표 변환에 불변이다<br>㉢ det(sI−A)=0 이 특성방정식이다<br>㉣ 선형화 모델의 타당성은 동작점 근방으로 제한된다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — "소개 수준"에서 시험이 물을 수 있는 핵심 4명제.' },
  { id:'u5-l4-02', level:4, type:'num', tags:['MSD 상태공간 풀코스'], src:'기출 유형',
    params:{ m:{choices:[1,2]}, c:{choices:[2,4]}, k:{choices:[8,18]}, F:{choices:[4,6]} },
    statement:function(p){ return 'MSD(m='+p.m+', c='+p.c+', k='+p.k+')에 스텝 힘 F='+p.F+'. 상태공간으로 (a) A(2,·) (b) 정상 상태 벡터 (x₁,x₂) (c) 고유값 실수부를 구하라.'; },
    solve:function(p){
      var xss=p.F/p.k;
      var D=(p.c/p.m)*(p.c/p.m)-4*p.k/p.m;
      var re=D>=0?(-p.c/p.m+Math.sqrt(D))/2:-p.c/(2*p.m);
      return { ans:{a21:-p.k/p.m, a22:-p.c/p.m, x1:xss, x2:0, re:re}, unit:{a21:'',a22:'',x1:'m',x2:'m/s',re:''}, steps:[
        'A(2,·)=[−k/m, −c/m]=['+SVH.fmt(-p.k/p.m)+', '+SVH.fmt(-p.c/p.m)+']',
        '정상: ẋ=0 → x₂=0, x₁=F/k='+SVH.fmt(xss),
        '고유값 실수부 = '+SVH.fmt(re)+' (<0 안정)' ] }; },
    hints:['정상 속도는 0이라는 물리 직관 확인.'] },
  { id:'u5-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'상태방정식에서 전달함수 공식 \\(G(s)=C(sI-A)^{-1}B+D\\)를 유도하라.',
    steps:[
      '라플라스(초기 0): \\(sX(s)=AX(s)+BU(s)\\) [왜] TF 정의가 초기 0 전제',
      '정리: \\((sI-A)X=BU\\) → \\(X=(sI-A)^{-1}BU\\) — 행렬이라 나눗셈 대신 역행렬',
      '출력: \\(Y=CX+DU=[C(sI-A)^{-1}B+D]U\\) → G(s) 완성',
      '분모: \\((sI-A)^{-1}=\\mathrm{adj}(sI-A)/\\det(sI-A)\\) → 극점 = det(sI−A)=0 = 고유값',
      '극한 체크: A 대각이면 (sI−A)⁻¹ 대각 = 1/(s−λᵢ) — 모드별 1차계 합 ✓ · 차원: [C][s⁻¹][B]=[y]/[u] ✓'
    ],
    hints:['스칼라 유도를 행렬로 그대로.','역행렬의 분모가 특성다항식.'],
    expl:'고유값=극점의 증명이자, "표현은 많아도 TF는 하나"의 근거.' },
  { id:'u5-l4-04', level:4, type:'num', tags:['도립진자+제어 예고'], src:'기출 유형',
    params:{ L:{choices:[1]}, kp:{choices:[15,20]} },
    statement:function(p){ return '도립 진자 선형화 \\(\\ddot\\phi=(g/L)\\phi+u\\) (L='+p.L+', g=9.8)에 비례 제어 u=−k_pφ (k_p='+p.kp+')를 걸면 닫힌 계는 \\(\\ddot\\phi=(g/L-k_p)\\phi\\)다. (a) 유효 강성 (b) 진동 여부(진동=1/발산=0) (c) 진동이면 그 주파수를 구하라.'; },
    solve:function(p){
      var keff=9.8/p.L-p.kp;
      var osc=keff<0?1:0;
      var w=osc?Math.sqrt(-keff):0;
      return { ans:{keff:keff, osc:osc, w:w}, unit:{keff:'', osc:'', w:'rad/s'}, steps:[
        '유효 계수 = g/L−k_p = '+SVH.fmt(keff),
        (keff<0?'음수 → 복원력 생김 → 진동(1), ω = √'+SVH.fmt(-keff)+' = '+SVH.fmt(w):'양수 → 여전히 발산(0): 이득 부족'),
        '(감쇠가 없어 계속 흔들린다 — 미분 제어가 왜 필요한지의 예고)' ] }; },
    hints:['이득이 중력 항을 이겨야 한다.'] },
  { id:'u5-l4-05', level:4, type:'num', tags:['비선형 밸브 완주'], src:'기출 유형',
    params:{ A:{choices:[2]}, k:{choices:[1]}, h0:{choices:[4,9]}, dq:{choices:[0.1,0.2]} },
    statement:function(p){ return '탱크(A='+p.A+', 유출 k√h, h₀='+p.h0+')에서 유입이 δq='+p.dq+'만큼 스텝 증가. 선형 모델로 (a) 새 정상 수위 변화 δh_ss (b) 시정수 (c) 실제 비선형 새 평형과의 오차(%)를 구하라.'; },
    solve:function(p){
      var m=p.k/(2*Math.sqrt(p.h0));
      var dh=p.dq/m, tau=p.A/m;
      var q0=p.k*Math.sqrt(p.h0);
      var hnew=Math.pow((q0+p.dq)/p.k,2), dtrue=hnew-p.h0;
      var err=(dh-dtrue)/dtrue*100;
      return { ans:{dh:dh, tau:tau, err:err}, unit:{dh:'m', tau:'s', err:'%'}, steps:[
        '선형: δh_ss = δq/m = '+SVH.fmt(dh)+' m (m='+SVH.fmt(m)+')',
        'τ = A/m = '+SVH.fmt(tau)+' s',
        '비선형 참값: '+SVH.fmt(dtrue)+' m → 선형화 오차 '+SVH.fmt(err)+' %',
        '(작은 δq에선 오차 작음 — 선형화의 정당성과 한계를 같은 문제에서)' ] }; },
    hints:['참 평형은 √h 식을 직접 뒤집는다.'] },
  { id:'u5-l4-06', level:4, type:'num', tags:['모드 응답 완주'], src:'기출 유형',
    params:{ l1:{choices:[-1]}, l2:{choices:[-3,-5]}, t1:{choices:[0.5,1]} },
    statement:function(p){ return '대각계 x(0)=[1,1]ᵀ, Λ=diag('+p.l1+','+p.l2+'), y=x₁+x₂. (a) y(t) 식의 t='+p.t1+' 값 (b) 느린 모드만 남는 근사가 5% 이내가 되는 시각(빠른 모드 ≤ 느린 모드의 5%)을 구하라.'; },
    solve:function(p){
      var y=Math.exp(p.l1*p.t1)+Math.exp(p.l2*p.t1);
      // e^{l2 t} = 0.05 e^{l1 t} → t = ln(0.05)/(l2-l1)
      var tc=Math.log(0.05)/(p.l2-p.l1);
      return { ans:{y:y, tc:tc}, unit:{y:'', tc:'s'}, steps:[
        'y = e^{'+p.l1+'t}+e^{'+p.l2+'t} → t='+p.t1+': '+SVH.fmt(y),
        '비율 조건: e^{('+p.l2+'−'+p.l1+')t} = 0.05 → t = '+SVH.fmt(tc)+' s',
        '(그 후는 1차계로 근사 가능 — 지배극점 근사의 정량 기준)' ] }; },
    hints:['모드 비율에 ln.'] },
  { id:'u5-l4-07', level:4, type:'num', tags:['RLC→상태→TF 왕복'], src:'기출 유형',
    params:{ R:{choices:[3,5]}, L:{choices:[1]}, C:{choices:[0.25,0.5]} },
    statement:function(p){ return '직렬 RLC(u→v_C 출력, x=[i_L, v_C])의 (a) det(A) (b) tr(A) (c) 복원된 TF 분모 s²+c₁s+c₀의 계수와 U3 직접 모델링 결과의 일치 여부(1)를 구하라. (R='+p.R+', L='+p.L+', C='+p.C+')'; },
    solve:function(p){
      var tr=-p.R/p.L, det=1/(p.L*p.C);
      return { ans:{det:det, tr:tr, c1:-tr, c0:det, match:1}, unit:{det:'',tr:'',c1:'',c0:'',match:''}, steps:[
        'A=[[−R/L,−1/L],[1/C,0]] → tr=−'+SVH.fmt(p.R/p.L)+', det = 1/LC = '+SVH.fmt(det),
        '분모: s²+'+SVH.fmt(-tr)+'s+'+SVH.fmt(det)+' = LCs²+RCs+1 나누기 LC ✓ 일치(1)',
        '(두 표현이 같은 물리 — 왕복 확인이 시험 검산법)' ] }; },
    hints:['tr·det로 분모 재구성.'] },
  { id:'u5-l4-08', level:4, type:'num', tags:['임계 이득(상태공간 관점)'], src:'기출 유형',
    params:{ a:{choices:[2,4]} },
    statement:function(p){ return '피드백 u=−Kx₁을 건 이중 적분기 \\(\\ddot y=u-'+p.a+'\\dot y\\)... 정리하면 \\(\\ddot y+'+p.a+'\\dot y+Ky=0\\). (a) 임의 K>0에서 안정 여부(1/0) (b) ζ=1이 되는 K를 구하라.'; },
    solve:function(p){
      var Kc=p.a*p.a/4;
      return { ans:{st:1, Kc:Kc}, unit:{st:'', Kc:''}, steps:[
        '계수 '+p.a+'>0, K>0 → 2차 특례로 항상 안정(1)',
        'ζ=1: a=2√K → K = a²/4 = '+SVH.fmt(Kc),
        '(이득이 감쇠비를 정한다: K<'+SVH.fmt(Kc)+' 과감쇠, 초과 시 진동)' ] }; },
    hints:['2차 표준형 비교.'] }
  ]
});
