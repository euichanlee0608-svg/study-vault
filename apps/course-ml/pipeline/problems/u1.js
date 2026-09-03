/* U1 ML 개요·개념학습 — 학습 정의, 유형, 가설공간, 귀납 편향, 버전공간, 과제 정형화 */
SV_BANK.push({
  id: 'u1', no: 1, title: 'ML 개요·개념학습', titleEn: 'Intro & Concept Learning',
  scope: '학습의 정의(T·P·E) · 지도/비지도/강화 · 가설공간과 귀납 편향 · 개념학습·버전공간 · 과제의 입출력 정형화',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u1-l1-01', level:1, type:'mc', tags:['정의'], src:'교재 표준',
    statement:'미첼(Mitchell)의 학습 정의로 옳은 것은?',
    choices:['과제 T의 성능 P가 경험 E로 향상되면 학습한다','데이터를 저장하면 학습이다','규칙을 코딩하면 학습이다','P와 무관하게 E가 늘면 학습이다'],
    answer:0, expl:'⟨T, P, E⟩ 3요소 — 문제를 받으면 셋을 먼저 명시하는 것이 이 과목의 문법이다.' },
  { id:'u1-l1-02', level:1, type:'mc', tags:['학습 유형'], src:'교재 표준',
    statement:'짝이 옳지 않은 것은?',
    choices:['강화학습 — 정답 레이블 쌍 (x, y)로 학습','지도학습 — 레이블 있는 데이터','비지도학습 — 레이블 없이 구조 발견','강화학습 — 보상 신호로 정책 개선'],
    answer:0, expl:'강화학습은 (상태, 행동, 보상) — 레이블 쌍이 아니라 지연 보상. 스팸분류=지도, 군집=비지도.' },
  { id:'u1-l1-03', level:1, type:'tf', tags:['귀납 편향'], src:'교재 표준',
    statement:'귀납 편향(inductive bias) 없이는 학습기가 본 적 없는 입력에 대해 일반화할 수 없다.',
    answer:true, expl:'편향 = 가설공간 제한/선호. 무편향이면 훈련 데이터 암기만 가능 — "공짜 점심 없음"의 뿌리.' },
  { id:'u1-l1-04', level:1, type:'mc', tags:['분류 vs 회귀'], src:'교재 표준',
    statement:'출력이 옳게 짝지어진 것은?',
    choices:['분류=이산 레이블, 회귀=연속 값','분류=연속, 회귀=이산','둘 다 이산','군집=지도학습'],
    answer:0, expl:'스팸 여부=분류, 집값=회귀. 출력 공간이 알고리즘 선택의 첫 분기.' },
  { id:'u1-l1-05', level:1, type:'tf', tags:['버전공간'], src:'교재 표준',
    statement:'버전공간(version space)은 훈련 데이터와 일치(consistent)하는 모든 가설의 집합이다.',
    answer:true, expl:'개념학습의 핵심 객체. 데이터가 늘수록 줄어들며, S(최특수)와 G(최일반) 경계로 표현된다.' },
  { id:'u1-l1-06', level:1, type:'mc', tags:['과적합 예고'], src:'교재 표준',
    statement:'훈련 정확도 99%, 시험 정확도 60%인 모델의 진단은?',
    choices:['과적합 — 훈련 데이터의 잡음까지 암기','과소적합','데이터 부족과 무관하게 정상','시험이 쉬웠다'],
    answer:0, expl:'훈련↔시험 격차가 과적합의 지문. U3(평가)·U5(가지치기)의 중심 서사.' },

  /* ---------- L2 (12) ---------- */
  { id:'u1-l2-01', level:2, type:'num', tags:['가설공간 크기'], src:'교재 표준',
    params:{ n:{choices:[3,4,5]} },
    statement:function(p){ return '불리언 특징 '+p.n+'개의 (a) 서로 다른 입력 개수 (b) 가능한 불리언 함수(개념) 개수를 구하라.'; },
    solve:function(p){ var inp=Math.pow(2,p.n);
      return { ans:{inp:inp, fn:Math.pow(2,inp)}, unit:{inp:'개', fn:'개'}, steps:[
        '입력 = 2^'+p.n+' = '+inp,
        '함수 = 2^(2^'+p.n+') = '+SVH.fmt(Math.pow(2,inp))+' (폭발 — 편향 없는 탐색이 불가능한 이유)' ] }; },
    hints:['이중 지수.'] },
  { id:'u1-l2-02', level:2, type:'num', tags:['연언 가설 수'], src:'교재 표준',
    params:{ n:{choices:[3,4,6]} },
    statement:function(p){ return '각 특징이 {0, 1, ?(무관)} 값을 갖는 연언(conjunctive) 가설공간('+p.n+'특징)의 크기(∅ 포함)를 구하라.'; },
    solve:function(p){ var h=Math.pow(3,p.n)+1;
      return { ans:h, unit:'개', steps:[
        '특징당 3택 → 3^'+p.n+' = '+Math.pow(3,p.n)+', 공가설 ∅ 추가',
        '= '+h+' (전체 함수보다 극적으로 작다 — 편향의 대가로 일반화 획득)' ] }; },
    hints:['3^n + 1.'] },
  { id:'u1-l2-03', level:2, type:'num', tags:['샘플 복잡도 감각'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[10,20]} },
    statement:function(p){ return '특징 '+p.n+'개 데이터에서 가능한 입력 전부를 한 번씩 보려면 몇 샘플이 필요한가? 초당 1000개면 몇 초?'; },
    solve:function(p){ var N=Math.pow(2,p.n);
      return { ans:{N:N, t:N/1000}, unit:{N:'개', t:'초'}, steps:[
        '2^'+p.n+' = '+SVH.fmt(N),
        '≈ '+SVH.fmt(N/1000)+'초 — "다 보고 배우기"는 불가능, 일반화가 필수인 이유' ] }; },
    hints:['지수의 위력.'] },
  { id:'u1-l2-04', level:2, type:'num', tags:['Find-S 손계산'], src:'교재 표준',
    params:{ pos:{choices:[2,3]} },
    statement:function(p){ return 'Find-S: 초기 S=⟨∅⟩에서 양성 예제를 차례로 흡수한다. 특징 4개, 양성 예제끼리 첫 두 특징만 일치하고 나머지가 다르면, '+p.pos+'개 양성 처리 후 S의 "?" 개수는?'; },
    solve:function(p){ var q=p.pos>=2?2:0;
      return { ans:q, unit:'개', steps:[
        '첫 양성 → S=그 예제 그대로(? 없음)',
        '둘째부터: 불일치 특징을 ?로 일반화 → 뒤 2개 특징이 ? = '+q+'개',
        '(Find-S는 최특수 경계만 추적 — 음성 예제를 안 쓰는 한계까지)' ] }; },
    hints:['불일치→?.'] },
  { id:'u1-l2-05', level:2, type:'num', tags:['데이터 분할'], src:'창작 문제(검산됨)',
    params:{ N:{choices:[1000,5000]}, tr:{choices:[60,80]} },
    statement:function(p){ return 'N='+p.N+' 데이터를 train '+p.tr+'% / 나머지 반반 val·test로 나누면 각각 몇 개인가?'; },
    solve:function(p){
      var t=p.N*p.tr/100, r=(p.N-t)/2;
      return { ans:{train:t, val:r, test:r}, unit:{train:'개', val:'개', test:'개'}, steps:[
        'train = '+t+', val = test = '+r,
        '(test는 마지막 한 번만 — U3 평가 규율의 기초)' ] }; },
    hints:['비율 계산.'] },
  { id:'u1-l2-06', level:2, type:'num', tags:['다수결 기준선'], src:'창작 문제(검산됨)',
    params:{ pos:{choices:[70,90,95]} },
    statement:function(p){ return '양성이 '+p.pos+'%인 데이터에서 "무조건 양성" 분류기의 정확도는? 이것이 왜 위험한 기준선인가?'; },
    solve:function(p){ return { ans:p.pos, unit:'%', steps:[
        '정확도 = '+p.pos+'% (아무것도 안 배워도!)',
        '불균형 데이터에서 정확도만 보면 속는다 — U3 정밀도/재현율의 동기' ] }; },
    hints:['다수 클래스 비율.'] },
  { id:'u1-l2-07', level:2, type:'num', tags:['특징 조합'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[3,4]}, b:{choices:[2,5]}, c:{choices:[2,3]} },
    statement:function(p){ return '범주 특징 3개(값 '+p.a+'·'+p.b+'·'+p.c+'개)로 만들 수 있는 서로 다른 입력 조합 수와, 원-핫 인코딩 시 총 차원을 구하라.'; },
    solve:function(p){
      return { ans:{comb:p.a*p.b*p.c, dim:p.a+p.b+p.c}, unit:{comb:'개', dim:'차원'}, steps:[
        '조합 = 곱 = '+(p.a*p.b*p.c),
        '원-핫 = 합 = '+(p.a+p.b+p.c)+' 차원 (입력 표현 설계의 산수)' ] }; },
    hints:['곱 vs 합.'] },
  { id:'u1-l2-08', level:2, type:'num', tags:['버전공간 축소'], src:'교재 표준',
    params:{ H:{choices:[64,256]}, k:{choices:[2,3]} },
    statement:function(p){ return '가설 '+p.H+'개 중 각 예제가 평균 절반을 탈락시키면, '+p.k+'개 예제 후 남는 가설 수는?'; },
    solve:function(p){ var n=p.H/Math.pow(2,p.k);
      return { ans:n, unit:'개', steps:[
        p.H+'×(1/2)^'+p.k+' = '+SVH.fmt(n),
        '(정보 1비트 = 절반 탈락 — U4 엔트로피의 예고)' ] }; },
    hints:['반감 반복.'] },
  { id:'u1-l2-09', level:2, type:'num', tags:['레이블 비용'], src:'창작 문제(검산됨)',
    params:{ N:{choices:[10000,50000]}, c:{choices:[50,200],unit:'원'}, err:{choices:[2,5]} },
    statement:function(p){ return '레이블 1건 '+p.c+'원, '+p.N+'건 구축 비용과, 라벨러 오류율 '+p.err+'%일 때 오염 레이블 수를 구하라.'; },
    solve:function(p){
      return { ans:{cost:p.N*p.c/10000, bad:p.N*p.err/100}, unit:{cost:'만원', bad:'건'}, steps:[
        '비용 = '+SVH.fmt(p.N*p.c/10000)+'만원',
        '오염 ≈ '+p.N*p.err/100+'건 — 데이터 품질이 모델 상한을 정한다' ] }; },
    hints:['곱셈 두 번.'] },
  { id:'u1-l2-10', level:2, type:'num', tags:['일반화 격차'], src:'창작 문제(검산됨)',
    params:{ tr:{choices:[95,99]}, te:{choices:[70,85]} },
    statement:function(p){ return '훈련 정확도 '+p.tr+'%, 시험 '+p.te+'%: (a) 일반화 격차(%p) (b) 진단(과적합=1/과소=0)을 답하라.'; },
    solve:function(p){ return { ans:{gap:p.tr-p.te, diag:1}, unit:{gap:'%p', diag:''}, steps:[
        '격차 = '+(p.tr-p.te)+'%p',
        '훈련 높고 격차 큼 → 과적합(1). 둘 다 낮으면 과소적합' ] }; },
    hints:['두 수의 차와 절대 수준.'] },
  { id:'u1-l2-11', level:2, type:'num', tags:['혼동행렬 예고'], src:'창작 문제(검산됨)',
    params:{ TP:{choices:[40,60]}, FP:{choices:[10,20]}, FN:{choices:[10,15]}, TN:{choices:[30,50]} },
    statement:function(p){ return 'TP='+p.TP+', FP='+p.FP+', FN='+p.FN+', TN='+p.TN+'일 때 정확도(%)를 구하라.'; },
    solve:function(p){ var acc=(p.TP+p.TN)/(p.TP+p.FP+p.FN+p.TN)*100;
      return { ans:acc, unit:'%', steps:[
        '맞힌 것 = 대각 TP+TN = '+(p.TP+p.TN)+', 전체 = '+(p.TP+p.FP+p.FN+p.TN),
        'acc = '+SVH.fmt(acc)+'% (U3에서 4형제 완성)' ] }; },
    hints:['대각 합/전체.'] },
  { id:'u1-l2-12', level:2, type:'num', tags:['학습곡선 읽기'], src:'창작 문제(검산됨)',
    params:{ e1:{choices:[30,40]}, e2:{choices:[15,20]}, k:{choices:[4]} },
    statement:function(p){ return '데이터 N에서 시험 오류 '+p.e1+'%, 4N에서 '+p.e2+'%. 오류가 데이터 배수의 로그에 선형이라 가정하면 16N에서 예상 오류(%)는?'; },
    solve:function(p){ var e=p.e2-(p.e1-p.e2);
      return { ans:e, unit:'%', steps:[
        'log₄ 스케일 등차: '+p.e1+'→'+p.e2+'→'+e,
        '(외삽은 가정 명시가 생명 — 데이터 추가의 한계효용 감각)' ] }; },
    hints:['등차 외삽.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u1-l3-01', level:3, type:'num', tags:['버전공간 S·G 손계산'], src:'교재 표준',
    params:{ f:{choices:[3,4]} },
    statement:function(p){ return '특징 '+p.f+'개(불리언) 연언 공간. 양성 (1,1,…,1)과 음성 (0,1,…,1)을 본 후: (a) S 경계의 가설 수 (b) 그 S가 확정하는(?가 아닌) 특징 수는?'; },
    solve:function(p){
      return { ans:{S:1, fixed:p.f}, unit:{S:'개', fixed:'개'}, steps:[
        '양성 1개 → S = 그 예제 자체(모든 특징 확정)',
        '음성은 S를 못 움직인다(이미 배제) → S 그대로 1개, 확정 '+p.f+'개',
        '(음성은 G를 조인다 — S·G의 역할 분담)' ] }; },
    hints:['양성→S, 음성→G.'] },
  { id:'u1-l3-02', level:3, type:'num', tags:['G 경계 분기'], src:'교재 표준',
    params:{ f:{choices:[3,4]} },
    statement:function(p){ return '초기 G=⟨?,…,?⟩('+p.f+'특징)에서 음성 예제 (0,0,…,0)을 보면 G는 몇 개의 최일반 가설로 분기하는가? (각 특징을 1로 고정하는 방식)'; },
    solve:function(p){ return { ans:p.f, unit:'개', steps:[
        '음성을 배제하는 최소 특수화 = 특징 하나를 반대값(1)으로 고정',
        '→ '+p.f+'개 가설로 분기 (G는 "덤불"처럼 자란다)' ] }; },
    hints:['특징 수만큼.'] },
  { id:'u1-l3-03', level:3, type:'num', tags:['불일치 판정'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[4,5]} },
    statement:function(p){ return '가설 h=⟨1,?,0,…⟩(첫째=1, 셋째=0, 나머지 ?)이 있다. 입력 '+p.n+'개 특징 전부 1인 예제를 h는 양성으로 분류하는가(1/0)? 레이블이 양성이면 h는 일치하는가(1/0)?'; },
    solve:function(p){ return { ans:{pred:0, cons:0}, unit:{pred:'', cons:''}, steps:[
        '셋째 특징: h는 0 요구, 예제는 1 → 음성 예측(0)',
        '실제 양성 → 불일치(0) → h는 버전공간에서 탈락',
        '(가설-예제 대조의 기계적 절차)' ] }; },
    hints:['조건 하나라도 어긋나면 음성.'] },
  { id:'u1-l3-04', level:3, type:'num', tags:['귀납 편향 강도'], src:'교재 표준',
    params:{ n:{choices:[3,4]} },
    statement:function(p){ return '특징 '+p.n+'개에서 (a) 전체 개념 수 (b) 연언 개념 수(∅ 포함)를 구하고, 연언 편향이 배제하는 개념의 비율(%)을 구하라.'; },
    solve:function(p){
      var all=Math.pow(2,Math.pow(2,p.n)), conj=Math.pow(3,p.n)+1;
      return { ans:{all:all, conj:conj, cut:(1-conj/all)*100}, unit:{all:'', conj:'', cut:'%'}, steps:[
        '전체 = '+SVH.fmt(all)+', 연언 = '+conj,
        '배제율 = '+SVH.fmt((1-conj/all)*100)+'% — 거의 다 버린다(그래서 배울 수 있다)' ] }; },
    hints:['두 공간 크기 비교.'] },
  { id:'u1-l3-05', level:3, type:'num', tags:['XOR의 교훈'], src:'교재 표준',
    params:{ dummy:{choices:[1]} },
    statement:function(p){ return 'XOR(두 특징이 다르면 양성)을 연언 가설로 표현할 수 있는가(0)? 2차원에서 선형 분리 가능한가(0)? 표현하려면 무엇이 필요한가 — 특징 x₁x₂(곱)를 추가하면 선형 분리 가능한가(1)?'; },
    solve:function(p){ return { ans:{conj:0, lin:0, feat:1}, unit:{conj:'', lin:'', feat:''}, steps:[
        '연언 불가(0): "다르면"은 AND로 못 쓴다',
        '선형 불가(0): 유명한 XOR 문제',
        '특징 추가(x₁x₂)로 가능(1) — 표현력은 가설공간 또는 특징에서 온다(커널·신경망의 복선)' ] }; },
    hints:['1969 퍼셉트론 논쟁.'] },
  { id:'u1-l3-06', level:3, type:'num', tags:['k-CNF 크기 비교'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[4,5]} },
    statement:function(p){ return '특징 '+p.n+'개에서 리터럴(x 또는 ¬x) 개수와, 크기 2 연언(서로 다른 두 리터럴의 AND, 순서 무시) 개수를 구하라.'; },
    solve:function(p){
      var L=2*p.n;
      var c2=L*(L-2)/2; // 같은 변수 쌍(x∧¬x) 제외: 2n리터럴 중 2개 조합 - n(모순쌍)
      var c2v=L*(L-1)/2-p.n;
      return { ans:{L:L, c2:c2v}, unit:{L:'개', c2:'개'}, steps:[
        '리터럴 = 2n = '+L,
        '쌍 C('+L+',2)−모순쌍 '+p.n+' = '+c2v+' (가설공간 설계 = 조합론)' ] }; },
    hints:['조합에서 모순 제외.'] },
  { id:'u1-l3-07', level:3, type:'num', tags:['과제 정형화'], src:'기출 유형',
    params:{ px:{choices:[28,32]} },
    statement:function(p){ return '손글씨 숫자 인식('+p.px+'×'+p.px+' 흑백): (a) 입력 차원 (b) 출력 클래스 수 (c) 선형 분류기(클래스별 가중치+편향)의 파라미터 수를 구하라.'; },
    solve:function(p){
      var d=p.px*p.px;
      return { ans:{d:d, c:10, w:(d+1)*10}, unit:{d:'차원', c:'개', w:'개'}, steps:[
        '입력 = '+d+'차원, 클래스 10',
        '파라미터 = (d+1)×10 = '+(d+1)*10+' (정형화 → 모델 크기 산수)' ] }; },
    hints:['(입력+1)×클래스.'] },
  { id:'u1-l3-08', level:3, type:'num', tags:['암기 학습의 한계'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[20,30]}, N:{choices:[1000,10000]} },
    statement:function(p){ return '순수 암기(룩업) 학습기가 '+p.n+'특징 불리언 입력에서 N='+p.N+' 훈련샘플을 외웠다. 무작위 새 입력이 "본 적 있는" 확률(%)을 구하라.'; },
    solve:function(p){ var pr=p.N/Math.pow(2,p.n)*100;
      return { ans:pr, unit:'%', steps:[
        'P = N/2^'+p.n+' = '+SVH.fmt(pr)+'%',
        '≈ 0 — 암기는 일반화가 아니다(편향의 필요성, 수치 증명)' ] }; },
    hints:['커버리지 비율.'] },
  { id:'u1-l3-09', level:3, type:'num', tags:['후보 제거 종합'], src:'교재 표준',
    params:{ f:{choices:[3]} },
    statement:function(p){ return '특징 3개 연언 공간, 예제: +(1,1,1), −(0,0,0), +(1,1,0). 최종 (a) S (b) G의 ? 위치를 추론해 S의 확정 특징 수와 G 가설 수를 구하라.'; },
    solve:function(p){ return { ans:{Sfix:2, G:2}, unit:{Sfix:'개', G:'개'}, steps:[
        '+(1,1,1) → S=⟨1,1,1⟩. +(1,1,0) → 셋째 불일치 → S=⟨1,1,?⟩ (확정 2)',
        '−(0,0,0) → G 분기 {⟨1,?,?⟩,⟨?,1,?⟩,⟨?,?,1⟩}, S와 모순인 ⟨?,?,1⟩ 탈락 → G 2개',
        '(S↑·G↓가 만나면 수렴 — 후보 제거의 전체 그림)' ] }; },
    hints:['양성은 S를, 음성은 G를.'] },
  { id:'u1-l3-10', level:3, type:'num', tags:['능동 질의'], src:'교재 표준',
    params:{ H:{choices:[16,64]} },
    statement:function(p){ return '버전공간에 가설 '+p.H+'개. 매 질의가 정확히 절반을 자르는 최적 질의만 한다면 수렴(1개)까지 필요한 질의 수는?'; },
    solve:function(p){ var q=Math.log2(p.H);
      return { ans:q, unit:'회', steps:[
        'log₂'+p.H+' = '+q+'회',
        '(최적 질의 = 1비트 정보 — 능동학습·스무고개·이진탐색이 같은 수학)' ] }; },
    hints:['log₂.'] },
  { id:'u1-l3-11', level:3, type:'num', tags:['기준선 비교'], src:'기출 유형',
    params:{ maj:{choices:[80,90]}, model:{choices:[85,92]} },
    statement:function(p){ return '다수결 기준선 '+p.maj+'%, 내 모델 '+p.model+'%. (a) 오류 감소율(%) = (기준오류−모델오류)/기준오류 (b) 모델이 유의미한가(감소율>0 → 1).'; },
    solve:function(p){
      var red=((100-p.maj)-(100-p.model))/(100-p.maj)*100;
      return { ans:{red:red, ok:red>0?1:0}, unit:{red:'%', ok:''}, steps:[
        '오류: '+(100-p.maj)+'% → '+(100-p.model)+'%',
        '감소율 = '+SVH.fmt(red)+'% '+(red>0?'(유의미 1)':'(무의미 0)'),
        '(정확도 차가 아니라 "오류 감소율"로 말하는 습관)' ] }; },
    hints:['오류 기준으로 환산.'] },
  { id:'u1-l3-12', level:3, type:'num', tags:['노이즈와 일치'], src:'교재 표준',
    params:{ N:{choices:[100,200]}, e:{choices:[5,10]} },
    statement:function(p){ return '레이블 노이즈 '+p.e+'%인 N='+p.N+' 데이터에 "완벽 일치"하는 가설을 찾았다. 이 가설이 잡음까지 외웠을 최소 예제 수와, 참 개념의 훈련 일치율 기대(%)를 구하라.'; },
    solve:function(p){
      return { ans:{bad:p.N*p.e/100, acc:100-p.e}, unit:{bad:'개', acc:'%'}, steps:[
        '오염 '+p.N*p.e/100+'개를 "맞히려면" 외워야 한다',
        '참 개념은 '+(100-p.e)+'%만 일치 — 완벽 일치를 요구하면 오히려 틀린 가설을 고른다(과적합의 논리적 기원)' ] }; },
    hints:['완벽 = 의심.'] },
  { id:'u1-l3-13', level:3, type:'num', tags:['훈련 크기 설계'], src:'창작 문제(검산됨)',
    params:{ H:{choices:[1000000]}, eps:{choices:[5,10]}, del:{choices:[5]} },
    statement:function(p){ return 'PAC 상한 m ≥ (1/ε)(ln|H|+ln(1/δ))로, |H|=10⁶, ε='+p.eps+'%, δ='+p.del+'%일 때 필요한 샘플 수를 구하라.'; },
    solve:function(p){
      var m=(Math.log(p.H)+Math.log(100/p.del))/(p.eps/100);
      return { ans:m, unit:'개', steps:[
        'm ≥ (1/'+(p.eps/100)+')(ln10⁶+ln'+(100/p.del)+') = '+SVH.fmt(m),
        '(가설공간 log에만 의존 — 크기보다 "구조"가 중요하다는 이론의 첫 맛)' ] }; },
    hints:['ln 두 개 더해 나누기.'] },
  { id:'u1-l3-14', level:3, type:'num', tags:['비용 민감 판단'], src:'기출 유형',
    params:{ cFN:{choices:[100,500]}, cFP:{choices:[1,10]} },
    statement:function(p){ return '암 진단: FN 비용 '+p.cFN+', FP 비용 '+p.cFP+'. 환자가 암일 확률 p일 때 "양성 판정"이 유리한 최소 p(%)를 구하라. (기대비용 비교)'; },
    solve:function(p){
      var th=p.cFP/(p.cFP+p.cFN)*100;
      return { ans:th, unit:'%', steps:[
        '양성 판정 기대비용 (1−p)·c_FP vs 음성 p·c_FN',
        '경계 p* = c_FP/(c_FP+c_FN) = '+SVH.fmt(th)+'%',
        '(비대칭 비용 → 문턱을 낮춘다 — U3 ROC·U6 베이즈 결정의 다리)' ] }; },
    hints:['기대비용 등식.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u1-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 편향 없는 학습기는 일반화할 수 없다<br>㉡ 버전공간은 S·G 두 경계로 완전히 표현된다(연언 공간)<br>㉢ 노이즈가 있으면 훈련 완벽 일치는 오히려 해로울 수 있다<br>㉣ 강화학습은 지연 보상으로 배운다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — U1의 4대 명제.' },
  { id:'u1-l4-02', level:4, type:'num', tags:['후보제거 풀트레이스'], src:'기출 유형',
    params:{ dummy:{choices:[1,2]} },
    statement:function(p){ return '특징 3개(하늘·바람·물, 각 2값) 연언 공간. 예제: +(맑,강,따), +(맑,강,차), −(흐,강,따). 최종 S와 G를 추론해 (a) S의 ? 개수 (b) |G| (c) 버전공간이 (맑,약,따)를 만장일치 분류할 수 있는가(불가=0)를 답하라.'; },
    solve:function(p){ return { ans:{Sq:1, G:1, un:0}, unit:{Sq:'개', G:'개', un:''}, steps:[
        '+2개: S=⟨맑,강,?⟩ (? 1개)',
        '−(흐,강,따): G 후보 {⟨맑,?,?⟩,⟨?,약?,…⟩…} 중 S 포용하는 ⟨맑,?,?⟩만 생존 → |G|=1',
        '(맑,약,따): S는 음성(바람 불일치), G는 양성 → 불일치(0) — 버전공간이 "모른다"고 답하는 영역',
        '(S≠G 사이 = 아직 배울 게 남은 곳)' ] }; },
    hints:['예제 순서대로 경계 갱신.'] },
  { id:'u1-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'"무편향 학습 불가능" 논증을 완성하라: 가설공간이 모든 함수를 포함하면 미관측 입력의 예측이 결정 불가능함을 보여라.',
    steps:[
      '훈련 집합 D와 일치하는 가설 전체 = 버전공간 VS [왜] 일치가 유일한 제약',
      '미관측 입력 x*: VS 안에는 x*를 +로 찍는 가설과 −로 찍는 가설이 "정확히 짝"으로 존재(전체 함수 공간이므로 x* 값만 다른 쌍이 항상 있다)',
      '만장일치 투표 = 항상 동수 → 예측 불가',
      '따라서 일반화하려면 VS를 기울이는 사전 선호(편향)가 필수',
      '극한 체크: 편향 최강(가설 1개)=학습 불필요/불가, 최약(전체)=일반화 불가 — 스펙트럼의 양끝. 실전은 그 사이 어딘가'
    ],
    hints:['x* 값만 다른 가설 쌍의 존재.','투표 동수 논리.'],
    expl:'"왜 모델은 가정을 갖는가"의 근본 답 — 서술형 1순위.' },
  { id:'u1-l4-04', level:4, type:'num', tags:['PAC 응용 설계'], src:'기출 유형',
    params:{ n:{choices:[10,20]}, eps:{choices:[5]}, del:{choices:[1,5]} },
    statement:function(p){ return '연언 가설공간(특징 '+p.n+'개, |H|=3^n+1)에서 ε='+p.eps+'%, δ='+p.del+'% PAC 보장에 필요한 샘플 m을 구하라.'; },
    solve:function(p){
      var H=Math.pow(3,p.n)+1;
      var m=(Math.log(H)+Math.log(100/p.del))/(p.eps/100);
      return { ans:m, unit:'개', steps:[
        'ln|H| = ln(3^'+p.n+'+1) ≈ '+SVH.fmt(p.n*Math.log(3)),
        'm ≥ '+SVH.fmt(m)+' — 특징 수에 "선형"(지수 아님!)',
        '(편향 덕분에 현실적 샘플로 학습 가능 — U1 서사의 정량 결론)' ] }; },
    hints:['ln 3^n = n·ln3.'] },
  { id:'u1-l4-05', level:4, type:'num', tags:['오컴 정량'], src:'기출 유형',
    params:{ b:{choices:[10,20]}, N:{choices:[100]} },
    statement:function(p){ return '설명 길이 '+p.b+'비트짜리 가설이 N='+p.N+' 샘플에 전부 일치했다. 무작위 가설이 우연히 전부 맞힐 확률 상한 2^'+p.b+'·2^{−'+p.N+'}을 구하라(log₂ 값으로).'; },
    solve:function(p){
      var lg=p.b-p.N;
      return { ans:lg, unit:'(log₂ 확률)', steps:[
        'P ≤ |H_b|·2^{−N} = 2^{'+p.b+'−'+p.N+'} → log₂P = '+lg,
        '짧은 가설의 일치는 우연이기 어렵다 — 오컴 면도날의 정량 버전',
        '(U5 가지치기의 이론적 뒷배)' ] }; },
    hints:['비트 산수.'] },
  { id:'u1-l4-06', level:4, type:'num', tags:['데이터 vs 모델 진단'], src:'기출 유형',
    params:{ trA:{choices:[65,70]}, teA:{choices:[63,68]}, trB:{choices:[99]}, teB:{choices:[75,80]} },
    statement:function(p){ return '모델 A: 훈련 '+p.trA+'/시험 '+p.teA+'%. 모델 B: 훈련 '+p.trB+'/시험 '+p.teB+'%. 각각의 처방(더 큰 모델=1/규제·데이터=2)을 답하고, 시험 성능이 더 높은 모델을 고르라(A=1/B=2).'; },
    solve:function(p){
      var best=p.teA>p.teB?1:2;
      return { ans:{A:1, B:2, best:best}, unit:{A:'', B:'', best:''}, steps:[
        'A: 둘 다 낮고 격차 작음 → 과소적합 → 표현력 확대(1)',
        'B: 훈련 높고 격차 큼 → 과적합 → 규제·데이터(2)',
        '선택은 시험 성능: '+(best===1?'A':'B')+' — 진단과 선택은 다른 질문' ] }; },
    hints:['격차·수준 2축 진단.'] },
  { id:'u1-l4-07', level:4, type:'num', tags:['특징 설계 실험'], src:'기출 유형',
    params:{ acc0:{choices:[75,80]}, accF:{choices:[88,92]}, cost:{choices:[2,5]} },
    statement:function(p){ return '특징 엔지니어링으로 정확도 '+p.acc0+'→'+p.accF+'%, 추론 비용 '+p.cost+'배. (a) 오류 감소율(%) (b) "오류 1%p 감소당 비용 배수"를 구하라.'; },
    solve:function(p){
      var red=((100-p.acc0)-(100-p.accF))/(100-p.acc0)*100;
      var per=(p.cost-1)/(p.accF-p.acc0);
      return { ans:{red:red, per:per}, unit:{red:'%', per:'배/%p'}, steps:[
        '오류 '+(100-p.acc0)+'→'+(100-p.accF)+'%: 감소율 '+SVH.fmt(red)+'%',
        '비용 효율 = '+SVH.fmt(per)+' 배/%p (개선을 비용으로 나눠 말하기 — 실무 보고 문법)' ] }; },
    hints:['개선/비용.'] },
  { id:'u1-l4-08', level:4, type:'num', tags:['이론 종합'], src:'기출 유형',
    params:{ n:{choices:[8,12]}, m:{choices:[500,1000]} },
    statement:function(p){ return '특징 '+p.n+'개: (a) 연언 공간 ln|H| (b) m='+p.m+'으로 달성 가능한 ε (δ=5%) (c) 전체 함수 공간이면 같은 m으로 ε 보장이 가능한가(불가=0)?'; },
    solve:function(p){
      var lnH=p.n*Math.log(3);
      var eps=(lnH+Math.log(20))/p.m*100;
      return { ans:{lnH:lnH, eps:eps, full:0}, unit:{lnH:'', eps:'%', full:''}, steps:[
        'ln|H| ≈ '+SVH.fmt(lnH),
        'ε = (ln|H|+ln20)/m = '+SVH.fmt(eps)+'%',
        '전체 공간: ln|H|=2^'+p.n+'·ln2 = '+SVH.fmt(Math.pow(2,p.n)*Math.log(2))+' → ε>100%, 보장 불가(0)',
        '(편향의 가치를 한 문제로 총정리)' ] }; },
    hints:['두 공간 대조.'] }
  ]
});
