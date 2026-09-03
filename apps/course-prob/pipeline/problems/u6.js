/* U6 이산시간 마르코프 연쇄 — 전이행렬, C-K, 정상분포 πP=π, 흡수 분석, 장기 보상 (W6, 행렬 관점) */
SV_BANK.push({
  id: 'u6', no: 6, title: '이산시간 마르코프 연쇄', titleEn: 'Discrete-Time Markov Chains',
  scope: '마르코프성 · 전이행렬 P(행합 1) · 채프먼-콜모고로프 P^{(n)}=Pⁿ · 정상분포 πP=π · 2상태 폐형식 · 수렴 속도 |1−a−b|ⁿ · 도박꾼 파산 · 흡수확률·기대흡수시간 (I−Q)⁻¹ · 장기 보상 Σπᵢrᵢ',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u6-l1-01', level:1, type:'mc', tags:['마르코프성'], src:'강의자료 대조',
    statement:'마르코프성(Markov property)의 올바른 서술은?',
    choices:['\\(P(X_{n+1}=j\\mid X_n=i, X_{n-1},\\dots,X_0)=P(X_{n+1}=j\\mid X_n=i)\\) — 미래는 현재 상태만 본다','미래가 과거 전체에 의존','모든 상태가 등확률','시간이 연속이어야 함'],
    answer:0, expl:'"경로는 잊고 현 위치만". 조건부확률(U1)의 언어로 쓴 무기억성(U2)의 이산시간 판 — 덕분에 행렬 하나로 전 과정이 기술된다.' },
  { id:'u6-l1-02', level:1, type:'mc', tags:['전이행렬'], src:'강의자료 대조',
    statement:'전이행렬 P=[p_{ij}]의 필수 성질은?',
    choices:['모든 성분 ≥0이고 각 행의 합이 1 (행=현재 상태, 열=다음 상태)','각 열의 합이 1','대칭행렬','행렬식이 1'],
    answer:0, expl:'행 i는 "상태 i에서의 다음 스텝 분포"라 합이 1(확률행렬, stochastic matrix). 행 관점 규약을 고정해야 곱셈 방향(πP)이 안 헷갈린다.' },
  { id:'u6-l1-03', level:1, type:'tf', tags:['C-K'], src:'강의자료 대조',
    statement:'n스텝 전이확률 행렬은 1스텝 행렬의 거듭제곱이다: \\(P^{(n)}=P^n\\) (채프먼-콜모고로프).',
    answer:true, expl:'중간 시점의 상태로 전확률 분해(U1)를 하면 행렬 곱이 나온다 — "행렬 관점에서의 마르코프 연쇄 분석"(강의 개요)의 심장.' },
  { id:'u6-l1-04', level:1, type:'mc', tags:['정상분포'], src:'강의자료 대조',
    statement:'정상분포(stationary distribution) π의 정의는?',
    choices:['\\(\\pi P=\\pi\\), \\(\\sum_i\\pi_i=1\\) — 한 스텝 지나도 분포가 그대로','πP=0','P의 행 평균','임의의 초기분포'],
    answer:0, expl:'행벡터 π가 P의 고유값 1의 왼쪽 고유벡터. 기약·비주기 유한 연쇄에선 초기분포와 무관하게 이 π로 수렴하고, 장기 체류 비율이기도 하다.' },
  { id:'u6-l1-05', level:1, type:'tf', tags:['에르고딕'], src:'교재 표준',
    statement:'유한 상태에서 기약(모든 상태 왕래 가능)+비주기이면 극한분포가 유일하게 존재하며 정상분포와 일치한다.',
    answer:true, expl:'에르고딕 정리. 기약이 깨지면(고립 그룹) 초기값 의존, 주기적이면(2-사이클) 진동 — 반례 두 개도 함께 기억.' },
  { id:'u6-l1-06', level:1, type:'mc', tags:['흡수상태'], src:'교재 표준',
    statement:'흡수상태(absorbing state)의 정의는?',
    choices:['p_{ii}=1 — 들어가면 못 나오는 상태','p_{ii}=0','가장 확률 높은 상태','초기 상태'],
    answer:0, expl:'파산·게임 종료·완치 같은 종착점. 흡수 연쇄 분석은 "어디로(흡수확률)·언제(기대시간)" 두 질문에 (I−Q)⁻¹로 답한다.' },

  /* ---------- L2 (12) ---------- */
  { id:'u6-l2-01', level:2, type:'num', tags:['2스텝'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.2,0.3,0.4],unit:''}, b:{choices:[0.1,0.2,0.5],unit:''} },
    statement:function(p){ return '2상태 연쇄 P=[[1−a, a],[b, 1−b]], a='+p.a+', b='+p.b+'. 두 스텝 뒤에도 상태 1에 있을 확률 p₁₁⁽²⁾은?'; },
    solve:function(p){ var v=(1-p.a)*(1-p.a)+p.a*p.b;
      return { ans:v, unit:'', steps:[
        '경로 두 갈래: 1→1→1 ('+(SVH.fmt((1-p.a)*(1-p.a)))+') + 1→2→1 ('+SVH.fmt(p.a*p.b)+')',
        '= '+SVH.fmt(v)+' — P²의 (1,1) 성분: C-K의 최소 사례' ] }; },
    hints:['중간 상태로 분기해 더한다.'] },
  { id:'u6-l2-02', level:2, type:'num', tags:['경로 확률'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.3,0.4],unit:''}, b:{choices:[0.2,0.3],unit:''} },
    statement:function(p){ return '같은 P(a='+p.a+', b='+p.b+')에서 상태 1 출발, 경로 1→2→2가 나올 확률은?'; },
    solve:function(p){ var v=p.a*(1-p.b);
      return { ans:v, unit:'', steps:[
        'P = p₁₂·p₂₂ = '+p.a+'×'+(1-p.b).toFixed(1),
        '= '+SVH.fmt(v)+' — 특정 경로는 전이확률의 곱(마르코프성이 곱을 정당화)' ] }; },
    hints:['한 경로=곱, 여러 경로=합.'] },
  { id:'u6-l2-03', level:2, type:'num', tags:['정상분포'], src:'강의자료 대조',
    params:{ a:{choices:[0.1,0.2,0.4],unit:''}, b:{choices:[0.1,0.3,0.6],unit:''} },
    statement:function(p){ return 'P=[[1−a, a],[b, 1−b]] (a='+p.a+', b='+p.b+')의 정상분포에서 π₁=b/(a+b)은?'; },
    solve:function(p){ var v=p.b/(p.a+p.b);
      return { ans:v, unit:'', steps:[
        'πP=π의 첫 성분: π₁(1−a)+π₂b=π₁ → aπ₁=bπ₂, 정규화와 결합',
        'π₁ = b/(a+b) = '+SVH.fmt(v)+' — "나가는 율 균형": a·π₁ = b·π₂' ] }; },
    hints:['유출=유입 균형식.'] },
  { id:'u6-l2-04', level:2, type:'num', tags:['π 완성'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.15,0.25],unit:''}, b:{choices:[0.35,0.6],unit:''} },
    statement:function(p){ return '위 연쇄(a='+p.a+', b='+p.b+')의 π=(π₁, π₂)를 모두 구하라.'; },
    solve:function(p){ var s=p.a+p.b;
      return { ans:{p1:p.b/s, p2:p.a/s}, unit:{p1:'', p2:''}, steps:[
        'π₁ = b/(a+b) = '+SVH.fmt(p.b/s)+', π₂ = a/(a+b) = '+SVH.fmt(p.a/s),
        '합 = 1 ✓ — 잘 나가는 상태일수록(자기 이탈률↓) 점유가 크다' ] }; },
    hints:['비 b:a로 나눠 갖는다.'] },
  { id:'u6-l2-05', level:2, type:'num', tags:['체류시간'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.1,0.25,0.5],unit:''} },
    statement:function(p){ return '상태 1의 이탈 확률이 스텝당 a='+p.a+'. 연속 체류 스텝 수의 기댓값 E=1/a는?'; },
    solve:function(p){ var v=1/p.a;
      return { ans:v, unit:'스텝', steps:[
        '체류 스텝 ~ 기하분포(성공=이탈, p=a) → E = 1/a',
        '= '+SVH.fmt(v)+'스텝 — U1 기하 기댓값의 재사용: 마르코프 체류는 언제나 기하' ] }; },
    hints:['기하분포 평균.'] },
  { id:'u6-l2-06', level:2, type:'num', tags:['3상태 경로'], src:'창작 문제(검산됨)',
    params:{ p12:{choices:[0.3,0.5],unit:''}, p23:{choices:[0.4,0.6],unit:''}, p33:{choices:[0.7,0.9],unit:''} },
    statement:function(p){ return '3상태 연쇄에서 p₁₂='+p.p12+', p₂₃='+p.p23+', p₃₃='+p.p33+'. 상태 1 출발 경로 1→2→3→3의 확률은?'; },
    solve:function(p){ var v=p.p12*p.p23*p.p33;
      return { ans:v, unit:'', steps:[
        'P = p₁₂p₂₃p₃₃ = '+p.p12+'×'+p.p23+'×'+p.p33,
        '= '+SVH.fmt(v)+' — 상태 수가 늘어도 경로 곱 원리는 동일' ] }; },
    hints:['화살표 따라 곱.'] },
  { id:'u6-l2-07', level:2, type:'num', tags:['n스텝 폐형식'], src:'교재 표준',
    params:{ a:{choices:[0.2,0.3],unit:''}, b:{choices:[0.2,0.4],unit:''}, n:{choices:[2,3,5],unit:''} },
    statement:function(p){ return '2상태 연쇄의 폐형식 \\(p_{11}^{(n)}=\\frac{b}{a+b}+\\frac{a}{a+b}(1-a-b)^n\\)을 a='+p.a+', b='+p.b+', n='+p.n+'에서 계산하라.'; },
    solve:function(p){ var s=p.a+p.b, v=p.b/s+p.a/s*Math.pow(1-s,p.n);
      return { ans:v, unit:'', steps:[
        '정상항 '+SVH.fmt(p.b/s)+' + 과도항 '+SVH.fmt(p.a/s)+'×('+SVH.fmt(1-s)+')^'+p.n,
        '= '+SVH.fmt(v)+' — 고유값 1(평형)과 1−a−b(기억 소멸률)의 이중주' ] }; },
    hints:['π₁+나머지×감쇠ⁿ.'] },
  { id:'u6-l2-08', level:2, type:'num', tags:['랜덤워크 기대'], src:'창작 문제(검산됨)',
    params:{ pr:{choices:[0.4,0.55,0.6],unit:''}, i:{choices:[3,5],unit:''} },
    statement:function(p){ return '자본 i='+p.i+'에서 시작, 매 게임 +1(확률 p='+p.pr+') 또는 −1. 한 게임 후 기대 자본 E=i+2p−1은?'; },
    solve:function(p){ var v=p.i+2*p.pr-1;
      return { ans:v, unit:'', steps:[
        'E[X₁|X₀=i] = i+1·p+(−1)(1−p) = i+2p−1',
        '= '+SVH.fmt(v)+' — 도박꾼 연쇄의 1스텝 드리프트: p>1/2이면 오르막' ] }; },
    hints:['±1의 기대 이동.'] },
  { id:'u6-l2-09', level:2, type:'num', tags:['초기분포'], src:'창작 문제(검산됨)',
    params:{ w:{choices:[0.5,0.7],unit:''}, a:{choices:[0.2,0.3],unit:''}, b:{choices:[0.1,0.4],unit:''} },
    statement:function(p){ return '초기분포 P(X₀=1)='+p.w+'. 한 스텝 뒤 P(X₁=2)=w·a+(1−w)(1−b)는? (a='+p.a+', b='+p.b+')'; },
    solve:function(p){ var v=p.w*p.a+(1-p.w)*(1-p.b);
      return { ans:v, unit:'', steps:[
        '행벡터 곱: (w, 1−w)P의 둘째 성분 = w·a+(1−w)(1−b)',
        '= '+SVH.fmt(v)+' — 분포의 시간 전개 = 왼쪽에서 P 곱하기' ] }; },
    hints:['πₙ₊₁=πₙP.'] },
  { id:'u6-l2-10', level:2, type:'num', tags:['장기 일수'], src:'기출 유형',
    params:{ a:{choices:[0.3,0.4],unit:''}, b:{choices:[0.6,0.7],unit:''} },
    statement:function(p){ return '날씨 연쇄: 맑음→비 확률 a='+p.a+', 비→맑음 b='+p.b+'. 연간(365일) 기대 맑은 날 수 365·π_맑음은?'; },
    solve:function(p){ var v=365*p.b/(p.a+p.b);
      return { ans:v, unit:'일', steps:[
        'π_맑음 = b/(a+b) = '+SVH.fmt(p.b/(p.a+p.b)),
        '×365 = '+SVH.fmt(v)+'일 — 정상분포=장기 체류 비율(에르고딕)의 실전 사용' ] }; },
    hints:['π 곱하기 기간.'] },
  { id:'u6-l2-11', level:2, type:'num', tags:['수렴 오차'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.2,0.3],unit:''}, b:{choices:[0.3,0.5],unit:''}, n:{choices:[3,5,10],unit:''} },
    statement:function(p){ return 'a='+p.a+', b='+p.b+' 연쇄의 n='+p.n+'스텝 후 과도항 크기 |1−a−b|ⁿ은? (평형까지의 거리 스케일)'; },
    solve:function(p){ var v=Math.pow(Math.abs(1-p.a-p.b),p.n);
      return { ans:v, unit:'', steps:[
        '|1−a−b| = '+SVH.fmt(Math.abs(1-p.a-p.b))+' — 두 번째 고유값의 절댓값',
        'ⁿ = '+SVH.fmt(v)+' — 매 스텝 이 비율로 초기 기억이 지워진다' ] }; },
    hints:['감쇠 인자의 거듭제곱.'] },
  { id:'u6-l2-12', level:2, type:'num', tags:['재방문 시간'], src:'교재 표준',
    params:{ a:{choices:[0.2,0.4],unit:''}, b:{choices:[0.1,0.3],unit:''} },
    statement:function(p){ return 'a='+p.a+', b='+p.b+' 연쇄에서 상태 1의 평균 재방문 시간 m₁=1/π₁=(a+b)/b는?'; },
    solve:function(p){ var v=(p.a+p.b)/p.b;
      return { ans:v, unit:'스텝', steps:[
        'm₁ = 1/π₁ = (a+b)/b = '+SVH.fmt(v)+'스텝',
        '자주 머무는 상태일수록(π↑) 빨리 돌아온다 — 재생 이론(U5)과 만나는 지점: 방문이 재생점' ] }; },
    hints:['카츠 공식 1/π.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u6-l3-01', level:3, type:'num', tags:['3상태 π'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.1,0.2,0.3],unit:''}, b:{choices:[0.1,0.2,0.3],unit:''}, c:{choices:[0.1,0.2,0.3],unit:''} },
    statement:function(p){ return 'P의 행: (1−2a, a, a), (b, 1−2b, b), (c, c, 1−2c) — a='+p.a+', b='+p.b+', c='+p.c+'. 정상분포 π=(π₁,π₂,π₃)를 구하라. (π ∝ (1, a/b, a/c))'; },
    solve:function(p){ var w1=1, w2=p.a/p.b, w3=p.a/p.c, s=w1+w2+w3;
      return { ans:{p1:w1/s, p2:w2/s, p3:w3/s}, unit:{p1:'', p2:'', p3:''}, steps:[
        '상세균형: π₁a=π₂b, π₁a=π₃c → π ∝ (1, a/b, a/c) = (1, '+SVH.fmt(w2)+', '+SVH.fmt(w3)+')',
        '정규화 → ('+SVH.fmt(w1/s)+', '+SVH.fmt(w2/s)+', '+SVH.fmt(w3/s)+') — 이탈이 느린 상태(분모 작음)에 몰린다' ] }; },
    hints:['쌍별 유량 균형이 성립하는 구조.'] },
  { id:'u6-l3-02', level:3, type:'num', tags:['3상태 C-K'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.2,0.3],unit:''}, b:{choices:[0.1,0.2],unit:''}, c:{choices:[0.2,0.3],unit:''} },
    statement:function(p){ return '위 3상태 P(a='+p.a+', b='+p.b+', c='+p.c+')에서 두 스텝 전이확률 p₁₂⁽²⁾을 구하라.'; },
    solve:function(p){ var r1=[1-2*p.a,p.a,p.a], v=r1[0]*p.a+r1[1]*(1-2*p.b)+r1[2]*p.c;
      return { ans:v, unit:'', steps:[
        '중간 상태 합: p₁₁p₁₂+p₁₂p₂₂+p₁₃p₃₂ = '+SVH.fmt(r1[0]*p.a)+'+'+SVH.fmt(r1[1]*(1-2*p.b))+'+'+SVH.fmt(r1[2]*p.c),
        '= '+SVH.fmt(v)+' — P²의 (1,2): 행렬 곱 한 성분을 손으로' ] }; },
    hints:['행1×열2 내적.'] },
  { id:'u6-l3-03', level:3, type:'num', tags:['공정 파산'], src:'교재 표준',
    params:{ i:{choices:[2,3,5],unit:''}, N:{choices:[8,10],unit:''} },
    constraint:function(p){ return p.i < p.N; },
    statement:function(p){ return '공정 도박(p=1/2): 자본 i='+p.i+', 목표 N='+p.N+'. 목표 달성 확률과 파산 확률을 구하라.'; },
    solve:function(p){ return { ans:{win:p.i/p.N, ruin:1-p.i/p.N}, unit:{win:'', ruin:''}, steps:[
        '공정 게임: P(달성) = i/N = '+p.i+'/'+p.N+' = '+SVH.fmt(p.i/p.N)+' (자본 비례!)',
        'P(파산) = '+SVH.fmt(1-p.i/p.N)+' — 마팅게일 논법의 대표 결과' ] }; },
    hints:['선형 경계값 문제.'] },
  { id:'u6-l3-04', level:3, type:'num', tags:['편향 파산'], src:'교재 표준',
    params:{ pr:{choices:[0.4,0.45,0.6],unit:''}, i:{choices:[3,5],unit:''}, N:{choices:[10],unit:''} },
    statement:function(p){ return '승률 p='+p.pr+'(≠1/2), 자본 i='+p.i+', 목표 N='+p.N+'. 목표 달성 확률 \\(\\frac{1-(q/p)^i}{1-(q/p)^N}\\)은?'; },
    solve:function(p){ var r=(1-p.pr)/p.pr, v=(1-Math.pow(r,p.i))/(1-Math.pow(r,p.N));
      return { ans:v, unit:'', steps:[
        'q/p = '+SVH.fmt(r)+' → (1−r^i)/(1−r^N) = '+SVH.fmt(v),
        (p.pr<0.5?'불리한 게임에선 목표 확률이 지수적으로 붕괴 — 카지노가 이기는 수학':'유리하면 i가 작아도 꽤 높다 — 드리프트의 위력') ] }; },
    hints:['r=q/p 하나로 정리.'] },
  { id:'u6-l3-05', level:3, type:'num', tags:['공정 게임 길이'], src:'교재 표준',
    params:{ i:{choices:[2,4,5],unit:''}, N:{choices:[8,10],unit:''} },
    constraint:function(p){ return p.i < p.N; },
    statement:function(p){ return '공정 도박(i='+p.i+', N='+p.N+')에서 게임이 끝날 때까지의 기대 판 수 E=i(N−i)는?'; },
    solve:function(p){ var v=p.i*(p.N-p.i);
      return { ans:v, unit:'판', steps:[
        'E[T] = i(N−i) = '+p.i+'×'+(p.N-p.i)+' = '+v+'판',
        '가운데서 시작할수록 오래 걸린다(포물선) — 1스텝 조건화(U1 l4-04 틀)로 유도되는 값' ] }; },
    hints:['경계 0, 내부 차분방정식.'] },
  { id:'u6-l3-06', level:3, type:'num', tags:['성공 런'], src:'창작 문제(검산됨)',
    params:{ pr:{choices:[0.5,0.6,0.8],unit:''}, k:{choices:[2,3],unit:''} },
    statement:function(p){ return '성공률 p='+p.pr+' 시행에서 연속 k='+p.k+'회 성공이 처음 나올 때까지의 기대 시행 수 E=(p^{−k}−1)/(1−p)는?'; },
    solve:function(p){ var E=0,j; for(j=1;j<=p.k;j++){ E=(E+1)/p.pr; }
      return { ans:E, unit:'회', steps:[
        '재귀: 런 j−1 달성 후 성공이면 j, 실패면 처음부터 → E_j=(E_{j−1}+1)/p',
        '= '+SVH.fmt(E)+'회 — 상태(현재 런 길이)를 둔 마르코프 1스텝 분석' ] }; },
    hints:['런 길이가 상태다.'] },
  { id:'u6-l3-07', level:3, type:'num', tags:['시장 점유'], src:'기출 유형',
    params:{ a:{choices:[0.1,0.2],unit:''}, b:{choices:[0.2,0.3],unit:''}, N:{choices:[1000,5000],unit:'명'} },
    statement:function(p){ return '매달 우리→경쟁사 이탈률 a='+p.a+', 반대 유입률 b='+p.b+'. 총 '+p.N+'명 시장의 장기 우리 고객 수 N·π₁은?'; },
    solve:function(p){ var v=p.N*p.b/(p.a+p.b);
      return { ans:v, unit:'명', steps:[
        'π₁ = b/(a+b) = '+SVH.fmt(p.b/(p.a+p.b)),
        '×'+p.N+' = '+SVH.fmt(v)+'명 — 초기 점유율과 무관(에르고딕): 이탈·유입률만이 운명을 정한다' ] }; },
    hints:['2상태 π 응용.'] },
  { id:'u6-l3-08', level:3, type:'num', tags:['흡수 기대시간'], src:'창작 문제(검산됨)',
    params:{ a1:{choices:[0.2,0.3],unit:''}, a2:{choices:[0.2,0.3],unit:''}, b1:{choices:[0.1,0.2],unit:''}, b2:{choices:[0.3,0.4],unit:''} },
    statement:function(p){ return '일시 상태 {1,2}, 흡수 상태 3. Q=[['+p.a1+', '+p.a2+'],['+p.b1+', '+p.b2+']] (나머지는 흡수로). 상태 1에서 흡수까지 기대 스텝 t₁을 (I−Q)t=1로 구하라.'; },
    solve:function(p){ var A=1-p.a1, B=-p.a2, C=-p.b1, D=1-p.b2, det=A*D-B*C,
      t1=(D*1-B*1)/det;
      return { ans:t1, unit:'스텝', steps:[
        '(I−Q) = [['+SVH.fmt(A)+', '+SVH.fmt(B)+'],['+SVH.fmt(C)+', '+SVH.fmt(D)+']], 우변 (1,1)',
        't₁ = (D−B)/det = '+SVH.fmt(t1)+'스텝 — 기본 행렬(fundamental matrix) (I−Q)⁻¹의 행합' ] }; },
    hints:['t=1+Qt를 정리하면 (I−Q)t=1.'] },
  { id:'u6-l3-09', level:3, type:'num', tags:['2스텝 분포'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.25,0.35],unit:''}, b:{choices:[0.15,0.45],unit:''} },
    statement:function(p){ return '상태 1에서 출발(a='+p.a+', b='+p.b+'). 두 스텝 뒤 상태 2에 있을 확률 p₁₂⁽²⁾은?'; },
    solve:function(p){ var v=(1-p.a)*p.a+p.a*(1-p.b);
      return { ans:v, unit:'', steps:[
        '1→1→2 ('+SVH.fmt((1-p.a)*p.a)+') + 1→2→2 ('+SVH.fmt(p.a*(1-p.b))+')',
        '= '+SVH.fmt(v)+' — 검산: p₁₁⁽²⁾+p₁₂⁽²⁾=1' ] }; },
    hints:['두 경로 합.'] },
  { id:'u6-l3-10', level:3, type:'num', tags:['체류 분포'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.2,0.4],unit:''}, m:{choices:[2,3,4],unit:''} },
    statement:function(p){ return '상태 1 이탈률 a='+p.a+'. 정확히 m='+p.m+'스텝 머문 뒤 이탈할 확률 (1−a)^{m−1}a는?'; },
    solve:function(p){ var v=Math.pow(1-p.a,p.m-1)*p.a;
      return { ans:v, unit:'', steps:[
        'P(체류='+p.m+') = (1−a)^{m−1}a = '+SVH.fmt(v),
        '기하분포 그 자체 — 연속시간 판(후반부)에선 이 자리가 지수분포로 바뀐다' ] }; },
    hints:['버티기 m−1번, 이탈 1번.'] },
  { id:'u6-l3-11', level:3, type:'num', tags:['출생사망 π'], src:'창작 문제(검산됨)',
    params:{ pu:{choices:[0.2,0.3],unit:''}, pd:{choices:[0.1,0.4],unit:''} },
    statement:function(p){ return '상태 {0,1,2} 출생사망 연쇄: 위로 p='+p.pu+', 아래로 q='+p.pd+'(경계는 반사, 나머진 제자리). 상세균형 π∝(1, p/q, (p/q)²)로 π₀와 π₂를 구하라.'; },
    solve:function(p){ var r=p.pu/p.pd, s=1+r+r*r;
      return { ans:{p0:1/s, p2:r*r/s}, unit:{p0:'', p2:''}, steps:[
        '상세균형 π_{i}p = π_{i+1}q → 비율 r=p/q='+SVH.fmt(r)+' 등비',
        'π₀ = 1/(1+r+r²) = '+SVH.fmt(1/s)+', π₂ = r²/합 = '+SVH.fmt(r*r/s)+' — 대기행렬(후반부 M/M/1)의 뼈대' ] }; },
    hints:['이웃 간 유량 균형.'] },
  { id:'u6-l3-12', level:3, type:'num', tags:['장기 보상'], src:'강의자료 대조',
    params:{ a:{choices:[0.2,0.3],unit:''}, b:{choices:[0.3,0.4],unit:''}, r1:{choices:[100,200],unit:'만원'}, r2:{choices:[20,50],unit:'만원'} },
    statement:function(p){ return '상태 1(가동, 스텝당 '+p.r1+'만원)·상태 2(정비, '+p.r2+'만원), a='+p.a+', b='+p.b+'. 장기 평균 보상률 Σπᵢrᵢ는?'; },
    solve:function(p){ var s=p.a+p.b, v=p.b/s*p.r1+p.a/s*p.r2;
      return { ans:v, unit:'만원/스텝', steps:[
        'π = ('+SVH.fmt(p.b/s)+', '+SVH.fmt(p.a/s)+')',
        'rate = '+SVH.fmt(v)+'만원/스텝 — 마르코프 보상 = π 가중평균: U5 재생보상과 한 가족' ] }; },
    hints:['π 구하고 내적.'] },
  { id:'u6-l3-13', level:3, type:'num', tags:['수렴 스텝 수'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.2,0.3],unit:''}, b:{choices:[0.2,0.4],unit:''}, eps:{choices:[0.01,0.001],unit:''} },
    statement:function(p){ return 'a='+p.a+', b='+p.b+' 연쇄에서 과도항이 ε='+p.eps+' 이하가 되는 최소 스텝 수 n=ln(ε)/ln|1−a−b|(실수값)는?'; },
    solve:function(p){ var v=Math.log(p.eps)/Math.log(Math.abs(1-p.a-p.b));
      return { ans:v, unit:'스텝', steps:[
        '|1−a−b|ⁿ ≤ ε → n ≥ ln ε/ln|1−a−b| = '+SVH.fmt(Math.log(p.eps))+'/'+SVH.fmt(Math.log(Math.abs(1-p.a-p.b))),
        '= '+SVH.fmt(v)+'스텝 — 믹싱 타임의 1차 감각: 이후는 초기 조건이 사실상 지워진 상태' ] }; },
    hints:['로그로 n을 꺼낸다.'] },
  { id:'u6-l3-14', level:3, type:'num', tags:['자기상관'], src:'교재 표준',
    params:{ a:{choices:[0.2,0.3],unit:''}, b:{choices:[0.3,0.5],unit:''} },
    statement:function(p){ return '정상 상태의 2상태 연쇄(a='+p.a+', b='+p.b+')에서 상태 1 지시변수의 lag-1 자기상관 Corr(I_n, I_{n+1})=1−a−b는?'; },
    solve:function(p){ var v=1-p.a-p.b;
      return { ans:v, unit:'', steps:[
        '두 번째 고유값이 그대로 자기상관: 1−a−b = '+SVH.fmt(v),
        (v>0?'양(+): 상태가 끈적하다(관성)':'음(−): 매 스텝 튀는 경향(진동)')+' — 시계열 관점에서 본 마르코프 연쇄' ] }; },
    hints:['감쇠 인자=상관.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u6-l4-01', level:4, type:'derive', tags:['C-K 유도'], src:'강의자료 대조',
    statement:'채프먼-콜모고로프 방정식 \\(p_{ij}^{(m+n)}=\\sum_k p_{ik}^{(m)}p_{kj}^{(n)}\\)을 유도하고 행렬 거듭제곱 해석을 밝혀라.',
    steps:[
      '중간 시점 m의 상태 k로 분할: P(X_{m+n}=j|X₀=i) = Σ_k P(X_m=k|X₀=i)P(X_{m+n}=j|X_m=k, X₀=i) [왜] U1 전확률 분해',
      '마르코프성으로 마지막 조건에서 X₀ 삭제: = Σ_k p_{ik}^{(m)}p_{kj}^{(n)}',
      '이 합은 정확히 행렬 곱의 (i,j) 성분 → P^{(m+n)}=P^{(m)}P^{(n)}',
      '귀납으로 P^{(n)}=Pⁿ — "n스텝 미래 = 행렬 n제곱": 계산·고유값 분석·수렴 이론이 전부 여기서 출발',
      '극한 체크: n=1 ⇒ 자명 ✓ · 행합 보존: Pⁿ도 확률행렬 ✓ · 대각화하면 고유값ⁿ — 수렴 속도(u6-l2-11)의 근거 ✓'
    ],
    hints:['전확률+마르코프성 두 줄.','합의 모양=행렬 곱.'],
    expl:'강의 개요 "행렬 관점에서의 마르코프 연쇄 분석"의 헌법 조항 — 이후 모든 계산이 이 등식의 각주다.' },
  { id:'u6-l4-02', level:4, type:'num', tags:['도박꾼 종합'], src:'기출 유형',
    params:{ pr:{choices:[0.45,0.48],unit:''}, i:{choices:[5,10],unit:''}, N:{choices:[20],unit:''} },
    statement:function(p){ return '승률 p='+p.pr+', 자본 i='+p.i+', 목표 N='+p.N+'. 목표 달성 확률과 파산 확률을 구하라.'; },
    solve:function(p){ var r=(1-p.pr)/p.pr, w=(1-Math.pow(r,p.i))/(1-Math.pow(r,p.N));
      return { ans:{win:w, ruin:1-w}, unit:{win:'', ruin:''}, steps:[
        'r=q/p='+SVH.fmt(r)+': P(달성) = (1−r^i)/(1−r^N) = '+SVH.fmt(w),
        'P(파산) = '+SVH.fmt(1-w)+' — 승률 몇 %p 차이가 지수 r^i로 증폭되는 것을 눈으로 확인' ] }; },
    hints:['미세한 편향의 지수적 결과.'] },
  { id:'u6-l4-03', level:4, type:'derive', tags:['2상태 완전 해'], src:'교재 표준',
    statement:'2상태 연쇄 P=[[1−a,a],[b,1−b]]의 정상분포와 n스텝 폐형식 \\(p_{11}^{(n)}=\\frac{b}{a+b}+\\frac{a}{a+b}(1-a-b)^n\\)을 유도하라.',
    steps:[
      '정상: πP=π ⇒ aπ₁=bπ₂ (유출=유입), Σπ=1 ⇒ π=(b, a)/(a+b) [왜] 균형식 하나+정규화면 2상태는 끝',
      '점화식: p₁₁^{(n+1)} = p₁₁^{(n)}(1−a)+(1−p₁₁^{(n)})b — 1스텝 조건화',
      '정리: x_{n+1} = b+(1−a−b)x_n — 아핀 점화식, 고정점 x*=b/(a+b)',
      '편차 y_n=x_n−x*는 등비(공비 1−a−b) → x_n = x*+(1−x*)(1−a−b)ⁿ (x₀=1 대입) = 폐형식',
      '극한 체크: n→∞ ⇒ π₁ (0<a+b<2일 때) ✓ · a+b=1 ⇒ 한 스텝 만에 평형(공비 0) ✓ · a=b=0 ⇒ 움직이지 않음 ✓'
    ],
    hints:['고정점+등비 편차 — 등비수열 문제로 환원.','U6 전체에서 가장 재사용되는 유도.'],
    expl:'경사하강 수렴(ML)·RC 방전(회로)과 같은 "고정점+기하 감쇠" 구조 — 과목을 넘나드는 패턴이다.' },
  { id:'u6-l4-04', level:4, type:'num', tags:['흡수 2문제'], src:'기출 유형',
    params:{ a:{choices:[0.3,0.4],unit:''}, pA:{choices:[0.2,0.3],unit:''}, b:{choices:[0.2,0.3],unit:''}, pB:{choices:[0.3,0.4],unit:''} },
    constraint:function(p){ return (1-p.a-p.pA) >= 0.05 && (1-p.b-p.pB) >= 0.05; },
    statement:function(p){ return '일시 {1,2}, 흡수 {A,B}: 1에서 →2 확률 '+p.a+', →A '+p.pA+', 잔류 나머지 / 2에서 →1 확률 '+p.b+', →B '+p.pB+', 잔류 나머지. 상태 1의 A-흡수 확률 h₁과 기대 흡수시간 t₁을 구하라.'; },
    solve:function(p){ var s1=1-p.a-p.pA, s2=1-p.b-p.pB,
      A11=1-s1, A12=-p.a, A21=-p.b, A22=1-s2, det=A11*A22-A12*A21,
      h1=(A22*p.pA-A12*0)/det, t1=(A22*1-A12*1)/det;
      return { ans:{h1:h1, t1:t1}, unit:{h1:'', t1:'스텝'}, steps:[
        '(I−Q)h=(p_A, 0): h₁ = '+SVH.fmt(h1)+' — A로 끝날 확률',
        '(I−Q)t=(1, 1): t₁ = '+SVH.fmt(t1)+'스텝 — 같은 행렬, 우변만 교체: 흡수 분석의 이중 사용' ] }; },
    hints:['h와 t가 같은 (I−Q)를 공유.'] },
  { id:'u6-l4-05', level:4, type:'num', tags:['선형 미로'], src:'창작 문제(검산됨)',
    params:{ r:{choices:[0.2,0.3,0.4],unit:''} },
    statement:function(p){ return '방 1→2→3→출구 선형 미로: 각 방에서 전진 확률 1−r, 후퇴(방 1은 제자리) 확률 r='+p.r+'. 방 1에서 출구까지 기대 이동 횟수 t₁을 구하라.'; },
    solve:function(p){ var f=1-p.r,
      // t3=1+r*t2, t2=1+r*t1+f*t3, t1=1+r*t1+f*t2 → 3원 연립을 직접 소거
      // t1=(1+f*t2)/f? from t1: t1(1-r)=1+f t2 → t1=(1+f t2)/f
      // 대입 소거를 수치로: 선형계 풀기
      a11=1-p.r, a12=-f, a13=0, b1=1,
      a21=-p.r, a22=1, a23=-f, b2=1,
      a31=0, a32=-p.r, a33=1, b3=1;
      // 3x3 가우스 소거
      var m=[[a11,a12,a13,b1],[a21,a22,a23,b2],[a31,a32,a33,b3]], i,j,k2,piv;
      for(i=0;i<3;i++){ piv=m[i][i];
        for(j=i;j<4;j++) m[i][j]/=piv;
        for(k2=0;k2<3;k2++){ if(k2!==i){ var fac=m[k2][i]; for(j=i;j<4;j++) m[k2][j]-=fac*m[i][j]; } } }
      return { ans:m[0][3], unit:'회', steps:[
        't₁=1+r·t₁+(1−r)t₂, t₂=1+r·t₁+(1−r)t₃, t₃=1+r·t₂ 의 3원 연립',
        '가우스 소거 → t₁ = '+SVH.fmt(m[0][3])+'회 — 1스텝 조건화(U1 l4-04)의 다상태 확장' ] }; },
    hints:['각 방의 기대시간에 연립.'] },
  { id:'u6-l4-06', level:4, type:'derive', tags:['상태분류·극한'], src:'교재 표준',
    statement:'상태 분류(재귀/일시·주기)와 유한 기약·비주기 연쇄의 극한 정리를 서사로 정리하라.',
    steps:[
      '재귀(recurrent): 돌아올 확률 1 / 일시(transient): <1 — 유한 기약 연쇄는 전부 재귀 [왜] 어딘가는 무한히 방문해야 하고 왕래 가능하면 전염된다',
      '주기 d: 복귀 가능 시점들의 최대공약수. d=1이면 비주기 — p_{ii}>0 하나만 있어도 비주기',
      '기약+비주기(에르고딕) ⇒ Pⁿ의 모든 행이 π로 수렴: 초기 조건 망각',
      '해석 3종 세트: π = ①정상분포(πP=π) ②극한분포(n→∞) ③장기 체류 비율(시간 평균) — 에르고딕 정리로 셋이 일치',
      '극한 체크: 주기 2 반례(0↔1 확정 이동)는 πP=π는 있으나 Pⁿ 진동 — 조건의 필요성 확인 ✓ · 가약 반례: 두 섬이면 초기 의존 ✓'
    ],
    hints:['정의→조건→수렴→해석 순서.','반례 두 개가 서술형 만점 포인트.'],
    expl:'"π를 구하라"가 정당한 질문이 되는 조건을 명시하는 단원의 이론적 지붕.' },
  { id:'u6-l4-07', level:4, type:'num', tags:['비용 종합'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.2,0.3],unit:''}, b:{choices:[0.3,0.4],unit:''}, r1:{choices:[50,80],unit:'만원'}, r2:{choices:[10,20],unit:'만원'}, c:{choices:[30,60],unit:'만원'} },
    statement:function(p){ return '상태별 스텝 수익(가동 '+p.r1+', 정비 '+p.r2+'만원), 상태 전환(1→2 또는 2→1)마다 수수료 '+p.c+'만원(a='+p.a+', b='+p.b+'). 장기 순수익률 Σπᵢrᵢ − c(π₁a+π₂b)는?'; },
    solve:function(p){ var s=p.a+p.b, p1=p.b/s, p2=p.a/s, v=p1*p.r1+p2*p.r2-p.c*(p1*p.a+p2*p.b);
      return { ans:v, unit:'만원/스텝', steps:[
        'π = ('+SVH.fmt(p1)+', '+SVH.fmt(p2)+'), 전환 빈도 = π₁a+π₂b = '+SVH.fmt(p1*p.a+p2*p.b)+'/스텝',
        '순수익률 = '+SVH.fmt(v)+'만원/스텝 — 상태 보상+전이 비용이 모두 π로 계산되는 종합형' ] }; },
    hints:['전환 빈도도 π 가중.'] },
  { id:'u6-l4-08', level:4, type:'num', tags:['재방문·재생 다리'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.25,0.4],unit:''}, b:{choices:[0.2,0.5],unit:''}, T:{choices:[100,300],unit:'스텝'} },
    statement:function(p){ return 'a='+p.a+', b='+p.b+' 연쇄를 T='+p.T+'스텝 돌릴 때 상태 1 방문 기대 횟수(≈Tπ₁)와 평균 재방문 간격(1/π₁)을 구하라.'; },
    solve:function(p){ var p1=p.b/(p.a+p.b);
      return { ans:{visits:p.T*p1, gap:1/p1}, unit:{visits:'회', gap:'스텝'}, steps:[
        '방문 횟수 ≈ Tπ₁ = '+p.T+'×'+SVH.fmt(p1)+' = '+SVH.fmt(p.T*p1)+'회',
        '재방문 간격 = 1/π₁ = '+SVH.fmt(1/p1)+'스텝 — 상태 1 방문을 재생점으로 보면 U5 장기율 정리(N(t)/t→1/μ)와 동일 문장' ] }; },
    hints:['마르코프↔재생의 왕복 번역.'] }

]});
