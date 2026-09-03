/* U3 전달함수와 모델링 — 정의·극영점, 기계(병진·회전)·전기 계의 TF, 기어, DC 모터 */
SV_BANK.push({
  id: 'u3', no: 3, title: '전달함수·모델링', titleEn: 'Transfer Functions & Modeling',
  scope: '전달함수 정의(초기조건 0) · 극점·영점 · 병진/회전 기계계 · RLC 전기계 · 기어비 반영 · DC 모터 모델',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u3-l1-01', level:1, type:'mc', tags:['정의'], src:'교재 표준',
    statement:'전달함수 G(s)의 정확한 정의는?',
    choices:['초기조건을 0으로 둔 출력·입력 라플라스 비 Y(s)/U(s)','임의 초기조건에서의 Y/U','시간영역 출력/입력','임펄스 입력에서만 정의'],
    answer:0, expl:'초기조건 0 가정이 정의의 일부(미분 정리의 초기항 소거). 임펄스 응답의 변환과 같다는 것도 함께.' },
  { id:'u3-l1-02', level:1, type:'mc', tags:['극·영점'], src:'교재 표준',
    statement:'극점(pole)과 영점(zero)의 역할로 옳은 것은?',
    choices:['극점은 응답의 모드(지수·진동)를, 영점은 각 모드의 크기 배합을 정한다','영점이 안정성을 정한다','극점은 진폭만 정한다','둘은 항상 상쇄된다'],
    answer:0, expl:'분모 근=극점=자연 모드. 분자 근=영점은 모드 계수(잔차)를 바꾼다 — U6 "영점 있는 응답"의 기초.' },
  { id:'u3-l1-03', level:1, type:'tf', tags:['기계 임피던스'], src:'교재 표준',
    statement:'병진 기계계에서 질량 m, 감쇠 c, 스프링 k의 s영역 임피던스(힘/변위)는 각각 \\(ms^2, cs, k\\)이다.',
    answer:true, expl:'F=mẍ, cẋ, kx의 라플라스. "합쳐서 (ms²+cs+k)X=F" — 기계 회로의 옴 법칙처럼 쓰인다.' },
  { id:'u3-l1-04', level:1, type:'mc', tags:['DC 이득'], src:'교재 표준',
    statement:'안정한 시스템의 스텝 입력 정상 출력을 가장 빨리 구하는 방법은?',
    choices:['G(0)에 스텝 크기를 곱한다','임펄스 응답을 적분한다... 는 다른 값이다','극점을 모두 구한다','시뮬레이션뿐'],
    answer:0, expl:'DC 이득 G(0). (임펄스 응답 적분도 G(0)으로 같다 — 보기의 함정 문구 주의)' },
  { id:'u3-l1-05', level:1, type:'tf', tags:['기어'], src:'교재 표준',
    statement:'기어비 N₁:N₂로 부하를 입력축으로 환산하면 관성·감쇠는 \\((N_1/N_2)^2\\)배가 된다.',
    answer:true, expl:'토크는 N₂/N₁배, 각도는 N₁/N₂배 → 임피던스(토크/각도)는 제곱배. 모터 설계 계산의 단골.' },
  { id:'u3-l1-06', level:1, type:'mc', tags:['선형화 위치'], src:'강의자료 대조',
    statement:'비선형 시스템의 전달함수를 얻는 표준 절차는?',
    choices:['평형점에서 선형화한 뒤 편차 변수로 라플라스 변환','비선형 그대로 라플라스','전달함수는 불가능하다','수치해만 가능'],
    answer:0, expl:'주차표의 Linearization 항목. TF는 선형 시스템의 개념 — 선형화가 선행돼야 한다.' },

  /* ---------- L2 (12) ---------- */
  { id:'u3-l2-01', level:2, type:'num', tags:['1차계 TF'], src:'창작 문제(검산됨)',
    params:{ c:{choices:[2,4]}, k:{choices:[8,12]} },
    statement:function(p){ return '\\('+p.c+'\\dot y+'+p.k+'y=u\\)의 (a) G(s) 분모 계수 (b) DC 이득 (c) 시정수를 구하라.'; },
    solve:function(p){ var K=1/p.k, tau=p.c/p.k;
      return { ans:{K:K, tau:tau}, unit:{K:'', tau:'s'}, steps:[
        'G = 1/('+p.c+'s+'+p.k+')',
        'DC 이득 = G(0) = 1/'+p.k+' = '+SVH.fmt(K),
        'τ = '+p.c+'/'+p.k+' = '+SVH.fmt(tau)+' s (표준형 K/(τs+1)로 읽는 습관)' ] }; },
    hints:['상수항으로 나눠 표준형.'] },
  { id:'u3-l2-02', level:2, type:'num', tags:['MSD TF'], src:'창작 문제(검산됨)',
    params:{ m:{choices:[1,2]}, c:{choices:[3,5]}, k:{choices:[10,20]} },
    statement:function(p){ return '\\(m\\ddot x+c\\dot x+kx=F\\) (m='+p.m+', c='+p.c+', k='+p.k+')의 X/F에서 (a) G(0) (b) 극점의 실수부 합을 구하라.'; },
    solve:function(p){ var K=1/p.k, sum=-p.c/p.m;
      return { ans:{K:K, sum:sum}, unit:{K:'', sum:''}, steps:[
        'G = 1/('+p.m+'s²+'+p.c+'s+'+p.k+') → G(0) = '+SVH.fmt(K),
        '근의 합 = −c/m = '+SVH.fmt(sum)+' (비에트 — 근을 안 구해도 아는 값)' ] }; },
    hints:['비에트 공식 활용.'] },
  { id:'u3-l2-03', level:2, type:'num', tags:['극·영점 위치'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[1,2]}, p1:{choices:[3,4]}, p2:{choices:[5,6]} },
    statement:function(p){ return '\\(G(s)=\\dfrac{s+'+p.z+'}{(s+'+p.p1+')(s+'+p.p2+')}\\)의 (a) 영점 (b) 극점 두 개 (c) G(0)을 구하라.'; },
    solve:function(p){ var K=p.z/(p.p1*p.p2);
      return { ans:{z:-p.z, P1:-p.p1, P2:-p.p2, K:K}, unit:{z:'',P1:'',P2:'',K:''}, steps:[
        '영점 s=−'+p.z+', 극점 s=−'+p.p1+', −'+p.p2,
        'G(0) = '+p.z+'/'+(p.p1*p.p2)+' = '+SVH.fmt(K) ] }; },
    hints:['분자·분모의 근.'] },
  { id:'u3-l2-04', level:2, type:'num', tags:['RC 회로 TF'], src:'창작 문제(검산됨)',
    params:{ R:{choices:[1,2],unit:'kΩ'}, C:{choices:[100,500],unit:'µF'} },
    statement:function(p){ return 'RC 저역(입력→C 전압) 회로(R='+p.R+' kΩ, C='+p.C+' µF)의 G(s)=1/(RCs+1)에서 (a) 극점 (b) 대역폭(=|극점|)을 구하라.'; },
    solve:function(p){ var pw=1/(p.R*1000*p.C*1e-6);
      return { ans:{pole:-pw, bw:pw}, unit:{pole:'1/s', bw:'rad/s'}, steps:[
        'RC = '+SVH.fmt(p.R*1000*p.C*1e-6)+' s → 극점 s = −1/RC = '+SVH.fmt(-pw),
        '대역폭 = 1/RC = '+SVH.fmt(pw)+' rad/s (전전개 U7과 같은 회로, 언어만 제어식)' ] }; },
    hints:['1차계 극점 = −1/τ.'] },
  { id:'u3-l2-05', level:2, type:'num', tags:['표준형 변환'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, b:{choices:[8,16]}, K:{choices:[24,32]} },
    statement:function(p){ return '\\(G(s)=\\dfrac{'+p.K+'}{s^2+'+p.a+'s+'+p.b+'}\\)의 (a) ω₀ (b) ζ (c) DC 이득을 구하라.'; },
    solve:function(p){ var w0=Math.sqrt(p.b), z=p.a/(2*w0), K=p.K/p.b;
      return { ans:{w0:w0, z:z, K:K}, unit:{w0:'rad/s', z:'', K:''}, steps:[
        'ω₀ = √'+p.b+' = '+SVH.fmt(w0)+', ζ = '+p.a+'/(2ω₀) = '+SVH.fmt(z),
        'DC = '+p.K+'/'+p.b+' = '+SVH.fmt(K) ] }; },
    hints:['분모 상수항=ω₀², s계수=2ζω₀.'] },
  { id:'u3-l2-06', level:2, type:'num', tags:['회전계'], src:'창작 문제(검산됨)',
    params:{ J:{choices:[0.5,1,2],unit:'kg·m²'}, b:{choices:[2,4],unit:'N·m·s'} },
    statement:function(p){ return '관성 J='+p.J+' kg·m², 점성 b='+p.b+' N·m·s인 회전계 \\(J\\dot\\omega+b\\omega=T\\)의 (a) 정상 각속도/토크 이득 (b) 시정수를 구하라.'; },
    solve:function(p){ var K=1/p.b, tau=p.J/p.b;
      return { ans:{K:K, tau:tau}, unit:{K:'rad/s/N·m', tau:'s'}, steps:[
        'G = 1/(Js+b) → DC = 1/b = '+SVH.fmt(K),
        'τ = J/b = '+SVH.fmt(tau)+' s (관성↑=느림, 마찰↑=빠르지만 최종속도↓)' ] }; },
    hints:['1차계 표준형과 동일 구조.'] },
  { id:'u3-l2-07', level:2, type:'num', tags:['기어 환산'], src:'교재 표준',
    params:{ N:{choices:[2,5,10]}, JL:{choices:[8,20,50],unit:'kg·m²'} },
    statement:function(p){ return '감속비 '+p.N+':1(모터가 '+p.N+'배 빠름)의 부하 관성 J_L='+p.JL+' kg·m²를 모터축으로 환산한 등가 관성을 구하라.'; },
    solve:function(p){ var Je=p.JL/(p.N*p.N);
      return { ans:Je, unit:'kg·m²', steps:[
        '환산: J_eq = J_L/N² = '+p.JL+'/'+(p.N*p.N)+' = '+SVH.fmt(Je),
        '(감속비 제곱으로 줄어든다 — 로봇 구동계 설계의 핵심 수)' ] }; },
    hints:['속도비 제곱.'] },
  { id:'u3-l2-08', level:2, type:'num', tags:['직렬 연결'], src:'창작 문제(검산됨)',
    params:{ K1:{choices:[2,4]}, a:{choices:[1,3]}, K2:{choices:[3,5]}, b:{choices:[2,6]} },
    statement:function(p){ return '\\(G_1=\\dfrac{'+p.K1+'}{s+'+p.a+'}\\)과 \\(G_2=\\dfrac{'+p.K2+'}{s+'+p.b+'}\\)를 직렬(비상호작용) 연결한 전체 TF의 (a) DC 이득 (b) 극점 두 개를 구하라.'; },
    solve:function(p){ var K=p.K1*p.K2/(p.a*p.b);
      return { ans:{K:K, P1:-p.a, P2:-p.b}, unit:{K:'',P1:'',P2:''}, steps:[
        '직렬 = 곱: G = '+(p.K1*p.K2)+'/[(s+'+p.a+')(s+'+p.b+')]',
        'DC = '+SVH.fmt(K)+', 극점 −'+p.a+'·−'+p.b+' 유지' ] }; },
    hints:['블록 직렬은 TF 곱(로딩 없음 가정).'] },
  { id:'u3-l2-09', level:2, type:'num', tags:['임펄스↔TF'], src:'창작 문제(검산됨)',
    params:{ A:{choices:[3,6]}, a:{choices:[2,4]} },
    statement:function(p){ return '임펄스 응답이 \\(g(t)='+p.A+'e^{-'+p.a+'t}\\)인 시스템의 (a) G(s) 분자 (b) 극점 (c) 스텝 응답 최종값을 구하라.'; },
    solve:function(p){ var yss=p.A/p.a;
      return { ans:{num:p.A, pole:-p.a, yss:yss}, unit:{num:'',pole:'',yss:''}, steps:[
        'G = L{g} = '+p.A+'/(s+'+p.a+')',
        '스텝 최종값 = G(0) = '+SVH.fmt(yss) ] }; },
    hints:['임펄스 응답의 변환 = TF.'] },
  { id:'u3-l2-10', level:2, type:'num', tags:['모터 정상 특성'], src:'교재 표준',
    params:{ Kt:{choices:[0.5,1],unit:'N·m/A'}, Ke:{choices:[0.5,1],unit:'V·s'}, Ra:{choices:[2,4],unit:'Ω'}, V:{choices:[12,24],unit:'V'} },
    constraint:function(p){ return p.Kt===p.Ke; },
    statement:function(p){ return 'DC 모터(K_t=K_e='+p.Kt+', R_a='+p.Ra+' Ω, 무부하·무마찰)의 전압 '+p.V+' V에서 (a) 무부하 각속도 (b) 정지(스톨) 토크를 구하라.'; },
    solve:function(p){ var w=p.V/p.Ke, T=p.Kt*p.V/p.Ra;
      return { ans:{w:w, T:T}, unit:{w:'rad/s', T:'N·m'}, steps:[
        '무부하: 역기전력=V → ω = V/K_e = '+SVH.fmt(w),
        '스톨: ω=0 → i=V/R_a → T = K_tV/R_a = '+SVH.fmt(T),
        '(토크-속도 직선의 양 끝점 — 모터 모델링의 시작)' ] }; },
    hints:['역기전력 평형과 옴 법칙.'] },
  { id:'u3-l2-11', level:2, type:'num', tags:['단위 확인'], src:'창작 문제(검산됨)',
    params:{ m:{choices:[2,4]}, k:{choices:[18,32]} },
    statement:function(p){ return 'G(s)=1/(ms²+k) (m='+p.m+', k='+p.k+')의 극점은 \\(\\pm j\\omega\\) 꼴이다. ω를 구하고 이 시스템의 감쇠비 ζ를 답하라.'; },
    solve:function(p){ var w=Math.sqrt(p.k/p.m);
      return { ans:{w:w, z:0}, unit:{w:'rad/s', z:''}, steps:[
        '극점: s²=−k/m → s=±j'+SVH.fmt(w),
        'ζ=0 (감쇠항 없음 — 허수축 극점=지속 진동, 안정 경계)' ] }; },
    hints:['c=0이면 ζ=0.'] },
  { id:'u3-l2-12', level:2, type:'num', tags:['영점 읽기'], src:'창작 문제(검산됨)',
    params:{ b1:{choices:[2,4]}, b0:{choices:[6,12]}, a0:{choices:[8,24]} },
    statement:function(p){ return '\\(G(s)=\\dfrac{'+p.b1+'s+'+p.b0+'}{s^2+5s+'+p.a0+'}\\)의 (a) 영점 (b) 고주파 근사 이득(s→∞에서 sG) (c) G(0)을 구하라.'; },
    solve:function(p){
      return { ans:{z:-p.b0/p.b1, hf:p.b1, K:p.b0/p.a0}, unit:{z:'',hf:'',K:''}, steps:[
        '영점 = −'+p.b0+'/'+p.b1+' = '+SVH.fmt(-p.b0/p.b1),
        's→∞: G≈'+p.b1+'/s → sG→'+p.b1+' (초기 기울기와 연결)',
        'G(0) = '+SVH.fmt(p.b0/p.a0) ] }; },
    hints:['양 극한이 응답의 양 끝을 말해 준다.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u3-l3-01', level:3, type:'num', tags:['2자유도→TF'], src:'기출 유형',
    params:{ m:{choices:[1,2]}, c:{choices:[2,4]}, k:{choices:[5,10]} },
    statement:function(p){ return '\\(m\\ddot x+c\\dot x+kx=c\\dot u+ku\\) (베이스 가진 모델, m='+p.m+', c='+p.c+', k='+p.k+')의 X/U에서 (a) 영점 (b) DC 이득 (c) ζ를 구하라.'; },
    solve:function(p){
      var z=-p.k/p.c, K=1, zeta=p.c/(2*Math.sqrt(p.k*p.m));
      return { ans:{z:z, K:K, zeta:zeta}, unit:{z:'',K:'',zeta:''}, steps:[
        'G = ('+p.c+'s+'+p.k+')/('+p.m+'s²+'+p.c+'s+'+p.k+')',
        '영점 = −k/c = '+SVH.fmt(z)+', DC = k/k = 1 (저주파에서 바닥을 그대로 따라감)',
        'ζ = c/(2√(km)) = '+SVH.fmt(zeta)+' (차량 서스펜션의 원형)' ] }; },
    hints:['우변에도 미분이 있으면 분자가 생긴다.'] },
  { id:'u3-l3-02', level:3, type:'num', tags:['RLC TF'], src:'기출 유형',
    params:{ R:{choices:[2,4],unit:'Ω'}, L:{choices:[1],unit:'H'}, C:{choices:[0.05,0.1],unit:'F'} },
    statement:function(p){ return '직렬 RLC(입력 전압→C 전압) G=1/(LCs²+RCs+1) (R='+p.R+', L='+p.L+', C='+p.C+')의 (a) ω₀ (b) ζ (c) 스텝 최종값을 구하라.'; },
    solve:function(p){
      var w0=1/Math.sqrt(p.L*p.C), z=p.R/2*Math.sqrt(p.C/p.L);
      return { ans:{w0:w0, z:z, yss:1}, unit:{w0:'rad/s', z:'', yss:''}, steps:[
        'ω₀ = 1/√(LC) = '+SVH.fmt(w0)+', ζ = (R/2)√(C/L) = '+SVH.fmt(z),
        '최종값 = G(0) = 1 (C가 최종적으로 입력 전압을 그대로) — 전전개 U7과 완전 동일 물리' ] }; },
    hints:['계수 비교 두 개.'] },
  { id:'u3-l3-03', level:3, type:'num', tags:['질량 2개 연성'], src:'기출 유형',
    params:{ m:{choices:[1,2]}, k:{choices:[4,9]} },
    statement:function(p){ return '두 질량 m(='+p.m+')이 스프링 k(='+p.k+')로 연결되고 벽은 없다(자유-자유). 특성방정식 \\(m^2s^4+2mks^2=0\\)의 0 아닌 진동 모드 주파수 ω를 구하라.'; },
    solve:function(p){ var w=Math.sqrt(2*p.k/p.m);
      return { ans:w, unit:'rad/s', steps:[
        's²(ms²+2k)=0 → s=0(강체 이동 모드) 또는 s²=−2k/m',
        'ω = √(2k/m) = '+SVH.fmt(w)+' (서로 반대로 진동하는 모드)' ] }; },
    hints:['s² 인수 = 강체 모드.'] },
  { id:'u3-l3-04', level:3, type:'num', tags:['모터+관성 TF'], src:'교재 표준',
    params:{ J:{choices:[0.1,0.2]}, b:{choices:[0.5,1]}, Kt:{choices:[1,2]}, Ra:{choices:[2,4]} },
    statement:function(p){ return '전기자 제어 DC 모터(인덕턴스 무시): \\(J\\dot\\omega+b\\omega = K_t i,\\ i=(V-K_t\\omega)/R_a\\). Ω(s)/V(s)의 (a) DC 이득 (b) 시정수를 구하라. (K_e=K_t='+p.Kt+', J='+p.J+', b='+p.b+', R_a='+p.Ra+')'; },
    solve:function(p){
      var beff=p.b+p.Kt*p.Kt/p.Ra;
      var K=(p.Kt/p.Ra)/beff, tau=p.J/beff;
      return { ans:{K:K, tau:tau}, unit:{K:'rad/s/V', tau:'s'}, steps:[
        '전류 소거: \\(J\\dot\\omega+(b+K_t^2/R_a)\\omega=(K_t/R_a)V\\)',
        '유효 감쇠 b_eff = '+SVH.fmt(beff)+' (역기전력이 전기적 감쇠로!)',
        'DC = '+SVH.fmt(K)+', τ = J/b_eff = '+SVH.fmt(tau)+' s' ] }; },
    hints:['i를 대입해 1차계로.','역기전력 항이 감쇠에 더해진다.'] },
  { id:'u3-l3-05', level:3, type:'num', tags:['극점→응답 예측'], src:'기출 유형',
    params:{ p1:{choices:[1,2]}, p2:{choices:[8,10]} },
    statement:function(p){ return '극점이 s=−'+p.p1+', −'+p.p2+'인 2차계에서 (a) 지배 극점 (b) 두 모드의 시정수 비 (c) 5τ 기준으로 빠른 모드가 사실상 사라진 뒤 남는 모드의 시정수를 구하라.'; },
    solve:function(p){
      return { ans:{dom:-p.p1, ratio:p.p2/p.p1, tau:1/p.p1}, unit:{dom:'',ratio:'배',tau:'s'}, steps:[
        '지배 극점 = 원점에 가까운 −'+p.p1+' (느린 모드가 오래 남는다)',
        'τ 비 = '+SVH.fmt(p.p2/p.p1)+'배 → '+(p.p2/p.p1>=5?'1차계 근사 타당':'근사 주의'),
        '남는 τ = 1/'+p.p1+' = '+SVH.fmt(1/p.p1)+' s (U6 지배극점 근사의 근거)' ] }; },
    hints:['|실수부| 작은 쪽이 지배.'] },
  { id:'u3-l3-06', level:3, type:'num', tags:['비선형 모델 선형화→TF'], src:'기출 유형',
    params:{ A:{choices:[1,2]}, k:{choices:[0.5,1]}, h0:{choices:[1,4]} },
    statement:function(p){ return 'U1의 탱크 \\(A\\dot h=q-k\\sqrt h\\)를 h₀='+p.h0+'에서 선형화한 편차 모델의 (a) 전달함수 δH/δQ의 DC 이득 (b) 극점을 구하라. (A='+p.A+', k='+p.k+')'; },
    solve:function(p){
      var m=p.k/(2*Math.sqrt(p.h0));
      var K=1/m, pole=-m/p.A;
      return { ans:{K:K, pole:pole}, unit:{K:'', pole:'1/s'}, steps:[
        '선형 모델: Aδḣ = δq − '+SVH.fmt(m)+'δh → G = (1/A)/(s+'+SVH.fmt(m)+'/A)',
        'DC = 1/'+SVH.fmt(m)+' = '+SVH.fmt(K)+', 극점 = −'+SVH.fmt(m)+'/'+p.A+' = '+SVH.fmt(pole),
        '(동작점이 다르면 TF도 달라진다 — 선형화 모델의 국소성)' ] }; },
    hints:['U1-l4-08의 후속 — 편차 방정식을 라플라스.'] },
  { id:'u3-l3-07', level:3, type:'num', tags:['TF→ODE 역변환'], src:'창작 문제(검산됨)',
    params:{ b0:{choices:[5,10]}, a1:{choices:[3,6]}, a0:{choices:[9,18]} },
    statement:function(p){ return '\\(G(s)=\\dfrac{'+p.b0+'}{s^2+'+p.a1+'s+'+p.a0+'}\\)에 대응하는 ODE의 계수와, 입력 u=1(스텝) 정상상태에서 \\(\\ddot y=\\dot y=0\\)을 이용한 y_ss를 구하라.'; },
    solve:function(p){ var yss=p.b0/p.a0;
      return { ans:yss, unit:'', steps:[
        'ODE: \\(\\ddot y+'+p.a1+'\\dot y+'+p.a0+'y='+p.b0+'u\\)',
        '정상: '+p.a0+'y_ss='+p.b0+' → y_ss = '+SVH.fmt(yss)+' (G(0)과 동일 — 두 관점 일치)' ] }; },
    hints:['TF↔ODE는 계수 그대로.'] },
  { id:'u3-l3-08', level:3, type:'num', tags:['팬듈럼 TF'], src:'기출 유형',
    params:{ L:{choices:[0.5,1]}, m:{choices:[1,2]} },
    statement:function(p){ return '길이 L='+p.L+' m, 질량 m='+p.m+' kg 진자(감쇠 무시)를 하단 토크 T로 구동: 선형화 EOM \\(mL^2\\ddot\\theta+mgL\\theta=T\\). (a) Θ/T의 DC 이득 (b) 고유진동수를 구하라. (g=9.8)'; },
    solve:function(p){
      var K=1/(p.m*9.8*p.L), w0=Math.sqrt(9.8/p.L);
      return { ans:{K:K, w0:w0}, unit:{K:'rad/N·m', w0:'rad/s'}, steps:[
        'G = 1/(mL²s²+mgL)',
        'DC = 1/(mgL) = '+SVH.fmt(K)+' (정적 처짐각/토크)',
        'ω₀ = √(g/L) = '+SVH.fmt(w0)+' (L만의 함수 — 질량 무관!)' ] }; },
    hints:['mL²로 묶어 표준형.'] },
  { id:'u3-l3-09', level:3, type:'num', tags:['시정수 실험 식별'], src:'기출 유형',
    params:{ yss:{choices:[4,8]}, t63:{choices:[0.5,2],unit:'s'}, U:{choices:[2]} },
    statement:function(p){ return '스텝 크기 '+p.U+'를 넣었더니 출력이 최종값 '+p.yss+'에 접근하며 63.2% 도달에 '+p.t63+' s 걸렸다. 1차 모델 K/(τs+1)의 K·τ를 구하라.'; },
    solve:function(p){ var K=p.yss/p.U;
      return { ans:{K:K, tau:p.t63}, unit:{K:'', tau:'s'}, steps:[
        'K = y_ss/입력 = '+p.yss+'/'+p.U+' = '+SVH.fmt(K),
        'τ = 63.2% 도달 시간 = '+p.t63+' s (정의 그대로)',
        '(스텝 실험 2측정 → 1차 모델 완성: 공정 식별의 최소형)' ] }; },
    hints:['K는 크기 비, τ는 63.2%.'] },
  { id:'u3-l3-10', level:3, type:'num', tags:['기어 系 TF'], src:'교재 표준',
    params:{ N:{choices:[2,4]}, Jm:{choices:[0.5,1]}, JL:{choices:[8,16]}, b:{choices:[1,2]} },
    statement:function(p){ return '모터(J_m='+p.Jm+') → 기어 '+p.N+':1 → 부하(J_L='+p.JL+', 감쇠 b='+p.b+'는 부하축). 모터축 기준 (a) 총 관성 (b) 등가 감쇠 (c) Ω_m/T_m 1차계의 시정수를 구하라.'; },
    solve:function(p){
      var J=p.Jm+p.JL/(p.N*p.N), be=p.b/(p.N*p.N), tau=J/be;
      return { ans:{J:J, be:be, tau:tau}, unit:{J:'kg·m²', be:'N·m·s', tau:'s'}, steps:[
        'J_eq = J_m+J_L/N² = '+SVH.fmt(J),
        'b_eq = b/N² = '+SVH.fmt(be),
        'τ = J_eq/b_eq = '+SVH.fmt(tau)+' s (환산 후엔 1축 문제)' ] }; },
    hints:['부하 쪽 전부 N²로 나눠 끌어온다.'] },
  { id:'u3-l3-11', level:3, type:'num', tags:['병렬 경로'], src:'창작 문제(검산됨)',
    params:{ K1:{choices:[2,3]}, K2:{choices:[4,6]}, a:{choices:[2,5]} },
    statement:function(p){ return '입력이 두 경로 \\(G_1='+p.K1+'\\)(직결)과 \\(G_2=\\dfrac{'+p.K2+'}{s+'+p.a+'}\\)로 갈라져 합산 출력된다. (a) 전체 TF의 영점 (b) DC 이득을 구하라.'; },
    solve:function(p){
      // G = K1 + K2/(s+a) = (K1 s + K1 a + K2)/(s+a)
      var z=-(p.K1*p.a+p.K2)/p.K1, K=p.K1+p.K2/p.a;
      return { ans:{z:z, K:K}, unit:{z:'', K:''}, steps:[
        '병렬 = 합: G = ('+p.K1+'s+'+(p.K1*p.a+p.K2)+')/(s+'+p.a+')',
        '영점 = '+SVH.fmt(z)+', DC = '+SVH.fmt(K),
        '(합쳤더니 영점이 "생겼다" — 영점은 경로 간 간섭의 산물)' ] }; },
    hints:['통분하면 분자가 1차식.'] },
  { id:'u3-l3-12', level:3, type:'num', tags:['정규화·무차원화'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[10,20]}, tau:{choices:[0.2,0.5]} },
    statement:function(p){ return '\\(G=\\dfrac{'+p.K+'}{'+p.tau+'s+1}\\)에서 시간축을 \\(t\'=t/'+p.tau+'\\)로 무차원화하면 TF는 K/(s\'+1)이 된다. 원래 시스템에서 t='+p.tau+' s일 때 스텝 응답값을 구하라. (입력 1)'; },
    solve:function(p){ var v=p.K*(1-Math.exp(-1));
      return { ans:v, unit:'', steps:[
        't=τ ⇔ t\'=1 → y = K(1−e^{−1})',
        '= '+SVH.fmt(v)+' (정규화 곡선 하나로 모든 1차계를 읽는 기술)' ] }; },
    hints:['63.2%×K.'] },
  { id:'u3-l3-13', level:3, type:'num', tags:['물리 파라미터 역산'], src:'기출 유형',
    params:{ w0:{choices:[3,5]}, z:{choices:[0.25,0.5]}, m:{choices:[2,4]} },
    statement:function(p){ return '측정: ω₀='+p.w0+' rad/s, ζ='+p.z+'. 질량 m='+p.m+' kg인 MSD의 (a) k (b) c를 역산하라.'; },
    solve:function(p){ var k=p.m*p.w0*p.w0, c=2*p.z*p.w0*p.m;
      return { ans:{k:k, c:c}, unit:{k:'N/m', c:'N·s/m'}, steps:[
        'k = mω₀² = '+SVH.fmt(k),
        'c = 2ζω₀m = '+SVH.fmt(c),
        '(사양→물리 부품값: 설계 방향의 계산)' ] }; },
    hints:['표준형 계수 비교의 역방향.'] },
  { id:'u3-l3-14', level:3, type:'num', tags:['적분기 플랜트'], src:'교재 표준',
    params:{ K:{choices:[2,5]}, t1:{choices:[2,3]} },
    statement:function(p){ return '적분기 플랜트 \\(G='+p.K+'/s\\)(예: 밸브 열림→수위 속도)의 단위 스텝 응답과 t='+p.t1+'에서 값을 구하라. 이 시스템의 스텝 정상값이 존재하는가? (존재=1/무한=0)'; },
    solve:function(p){ var v=p.K*p.t1;
      return { ans:{v:v, fin:0}, unit:{v:'', fin:''}, steps:[
        'Y = '+p.K+'/s² → y = '+p.K+'t (램프!)',
        't='+p.t1+': '+SVH.fmt(v)+' · 정상값 없음(0) — 원점 극점 = 적분 동작',
        '(피드백을 걸어야 안정한 위치 제어가 된다는 동기 부여)' ] }; },
    hints:['1/s² 역변환.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u3-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 전달함수는 선형 시불변 시스템에서만 정의된다<br>㉡ 극점은 분모, 영점은 분자의 근이다<br>㉢ 임펄스 응답과 전달함수는 라플라스 쌍이다<br>㉣ 기어로 부하를 환산하면 관성은 속도비의 제곱으로 변한다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — 네 명제가 이 단원의 뼈대 요약이다.' },
  { id:'u3-l4-02', level:4, type:'num', tags:['MSD 풀코스'], src:'기출 유형',
    params:{ m:{choices:[2]}, c:{choices:[4,8]}, k:{choices:[50,100]}, F0:{choices:[10,20]} },
    statement:function(p){ return 'MSD(m='+p.m+', c='+p.c+', k='+p.k+')에 스텝 힘 F₀='+p.F0+' N. (a) 정상 변위 (b) ω₀·ζ (c) 오버슈트 % (d) 첫 봉우리 시각 T_p를 구하라.'; },
    solve:function(p){
      var xss=p.F0/p.k, w0=Math.sqrt(p.k/p.m), z=p.c/(2*Math.sqrt(p.k*p.m));
      var wd=w0*Math.sqrt(1-z*z);
      var Mp=Math.exp(-Math.PI*z/Math.sqrt(1-z*z))*100, Tp=Math.PI/wd;
      return { ans:{xss:xss, w0:w0, z:z, Mp:Mp, Tp:Tp}, unit:{xss:'m', w0:'rad/s', z:'', Mp:'%', Tp:'s'}, steps:[
        'x_ss = F₀/k = '+SVH.fmt(xss)+' m',
        'ω₀='+SVH.fmt(w0)+', ζ='+SVH.fmt(z)+' (부족감쇠 확인)',
        'M_p = e^{−πζ/√(1−ζ²)} = '+SVH.fmt(Mp)+' %, T_p = π/ω_d = '+SVH.fmt(Tp)+' s',
        '(모델링→사양 계산의 전체 흐름 — U6에서 공식들이 유도된다)' ] }; },
    hints:['정상값은 k만, 동특성은 ω₀·ζ가.'] },
  { id:'u3-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'MSD \\(m\\ddot x+c\\dot x+kx=F\\)에서 전달함수 \\(X/F=1/(ms^2+cs+k)\\)를 유도하고, "초기조건 0" 가정의 역할과 표준형(ω₀·ζ) 변환까지 서술하라.',
    steps:[
      '뉴턴 2법칙에서 EOM 확정 [왜] 모델링의 출발은 언제나 물리 법칙',
      '라플라스(미분 정리): \\(m[s^2X-sx(0)-\\dot x(0)]+c[sX-x(0)]+kX=F(s)\\)',
      '초기조건 0 → \\((ms^2+cs+k)X=F\\) → \\(G=1/(ms^2+cs+k)\\) — 초기항이 남으면 입력 외 항이 생겨 "비"가 정의되지 않는다',
      '표준형: 분모÷m → \\(s^2+2\\zeta\\omega_0s+\\omega_0^2\\), \\(\\omega_0=\\sqrt{k/m}\\), \\(\\zeta=c/2\\sqrt{km}\\)',
      '극한 체크: s→0 ⇒ G→1/k(정적 강성의 역수) ✓ · c=0 ⇒ 허수 극점(무감쇠) ✓ · 차원: 1/[N/m]=[m/N] ✓'
    ],
    hints:['미분 정리의 초기항을 명시하고 지워라.','마지막에 표준형 계수 비교.'],
    expl:'HW·중간의 "모델링→TF" 문항 서술 틀 그대로.' },
  { id:'u3-l4-04', level:4, type:'num', tags:['영점 효과 정량'], src:'기출 유형',
    params:{ a:{choices:[1,2]}, z:{choices:[0.5,4]} },
    statement:function(p){ return '\\(G_1=\\dfrac{2}{(s+1)(s+2)}\\)에 영점을 넣은 \\(G_2=\\dfrac{2(s/'+p.z+'+1)}{(s+1)(s+2)}\\)... 두 시스템의 (a) DC 이득 비교값(같으면 1) (b) G₂ 스텝 응답의 초기 기울기 \\(\\dot y(0^+)=\\lim s^2G_2/s\\)를 구하라.'; },
    solve:function(p){
      var slope=2/p.z; // lim s·[sG2/s] = lim s G2 = 2*(s/z)/(s²)*s → 2/z
      return { ans:{same:1, slope:slope}, unit:{same:'', slope:''}, steps:[
        'DC: G₂(0)=2×1/2=1=G₁(0) → 같음(1) — 영점은 DC를 안 바꾼다(s/z+1 형태)',
        '초기 기울기 = lim_{s→∞} s²·G₂·(1/s) = 2/'+p.z+' = '+SVH.fmt(slope),
        '(가까운 영점(z 작음) → 초기 반응 급함·오버슈트 증가: U6 영점 효과의 수치 근거)' ] }; },
    hints:['초기 기울기는 s²Y의 s→∞ 극한.'] },
  { id:'u3-l4-05', level:4, type:'num', tags:['모터-부하 종합'], src:'기출 유형',
    params:{ Kt:{choices:[1]}, Ra:{choices:[2]}, Jm:{choices:[0.5]}, JL:{choices:[8,18]}, N:{choices:[2,3]} },
    statement:function(p){ return 'DC 모터(K_t=K_e='+p.Kt+', R_a='+p.Ra+', J_m='+p.Jm+') + 기어 '+p.N+':1 + 부하 J_L='+p.JL+' (마찰 무시). (a) 모터축 총 관성 (b) 유효 감쇠(역기전력) (c) Ω_m/V 시정수 (d) 부하축 정상 각속도/V를 구하라.'; },
    solve:function(p){
      var J=p.Jm+p.JL/(p.N*p.N);
      var be=p.Kt*p.Kt/p.Ra;
      var tau=J/be;
      var Kdc=(p.Kt/p.Ra)/be/p.N; // 모터 정상 ω=V/Ke → 부하 = /N
      return { ans:{J:J, be:be, tau:tau, Kdc:Kdc}, unit:{J:'kg·m²', be:'N·m·s', tau:'s', Kdc:'rad/s/V'}, steps:[
        'J = '+p.Jm+'+'+p.JL+'/'+(p.N*p.N)+' = '+SVH.fmt(J),
        'b_eff = K_t²/R_a = '+SVH.fmt(be)+' (물리 마찰이 없어도 감쇠 존재)',
        'τ = J/b_eff = '+SVH.fmt(tau)+' s',
        '부하 정상 속도 = (V/K_e)/N → 이득 '+SVH.fmt(Kdc)+' rad/s/V' ] }; },
    hints:['U3-l3-04+U3-l3-10의 종합.'] },
  { id:'u3-l4-06', level:4, type:'num', tags:['미지 시스템 식별'], src:'기출 유형',
    params:{ Mp:{choices:[16.3,9.5]}, Tp:{choices:[0.5,1],unit:'s'}, yss:{choices:[2,4]} },
    statement:function(p){ return '스텝(크기 1) 실험: 최종값 '+p.yss+', 오버슈트 '+p.Mp+'%, 첫 봉우리 '+p.Tp+' s. 2차 모델 \\(K\\omega_0^2/(s^2+2\\zeta\\omega_0s+\\omega_0^2)\\)의 (a) K (b) ζ (c) ω₀를 역산하라.'; },
    solve:function(p){
      var lnM=Math.log(p.Mp/100);
      var z=-lnM/Math.sqrt(Math.PI*Math.PI+lnM*lnM);
      var wd=Math.PI/p.Tp, w0=wd/Math.sqrt(1-z*z);
      return { ans:{K:p.yss, z:z, w0:w0}, unit:{K:'', z:'', w0:'rad/s'}, steps:[
        'K = 최종값/입력 = '+p.yss,
        'ζ = −lnM/√(π²+ln²M) = '+SVH.fmt(z)+' (오버슈트 공식의 역산)',
        'ω_d = π/T_p = '+SVH.fmt(wd)+' → ω₀ = '+SVH.fmt(w0),
        '(그래프 3측정 → 모델 3파라미터: HW·실무 공용 절차)' ] }; },
    hints:['M_p→ζ, T_p→ω_d→ω₀ 순서.'] },
  { id:'u3-l4-07', level:4, type:'num', tags:['유압/열 유추'], src:'교재 표준',
    params:{ Rt:{choices:[2,5]}, Ct:{choices:[3,10]} },
    statement:function(p){ return '열계: 열저항 R='+p.Rt+' K/W, 열용량 C='+p.Ct+' J/K인 1차 모델 \\(RC\\dot T+T=T_{env}+R\\,q\\). (a) 시정수 (b) 히터 q=1 W 스텝에 대한 정상 온도 상승을 구하라.'; },
    solve:function(p){ var tau=p.Rt*p.Ct;
      return { ans:{tau:tau, dT:p.Rt}, unit:{tau:'s', dT:'K'}, steps:[
        'τ = RC = '+SVH.fmt(tau)+' s (전기 RC와 동일 수학)',
        '정상: ΔT = R·q = '+p.Rt+' K',
        '(전기·기계·열·유체가 같은 1·2차 표준형으로 — 유추 모델링의 힘)' ] }; },
    hints:['전기 유추 표를 떠올려라.'] },
  { id:'u3-l4-08', level:4, type:'num', tags:['설계: 극점 배치 준비'], src:'기출 유형',
    params:{ ts:{choices:[2,4],unit:'s'}, Mp:{choices:[5,10],unit:'%'} },
    statement:function(p){ return '요구 사양: 2% 정착 T_s≤'+p.ts+' s, 오버슈트 ≤'+p.Mp+'%. (a) 필요한 최소 ζ (b) 필요한 최소 ζω₀ (c) 그 경계에서의 ω₀와 극점 실수부·허수부를 구하라.'; },
    solve:function(p){
      var lnM=Math.log(p.Mp/100);
      var z=-lnM/Math.sqrt(Math.PI*Math.PI+lnM*lnM);
      var sg=4/p.ts, w0=sg/z, wd=w0*Math.sqrt(1-z*z);
      return { ans:{z:z, sg:sg, w0:w0, wd:wd}, unit:{z:'', sg:'1/s', w0:'rad/s', wd:'rad/s'}, steps:[
        'M_p 조건 → ζ ≥ '+SVH.fmt(z),
        'T_s≈4/(ζω₀) → ζω₀ ≥ 4/'+p.ts+' = '+SVH.fmt(sg),
        '경계: ω₀ = '+SVH.fmt(w0)+', 극점 = −'+SVH.fmt(sg)+' ± j'+SVH.fmt(wd),
        '(사양 → s평면 허용 영역: 제어 설계의 문법 — 중간 마지막 문항 유형)' ] }; },
    hints:['두 사양이 각각 ζ와 σ를 제한한다.'] }
  ]
});
