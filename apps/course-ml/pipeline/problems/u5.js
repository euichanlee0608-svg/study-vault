/* U5 결정트리 II — 지니, CART, 과적합·가지치기, 검증 기반 축소 */
SV_BANK.push({
  id: 'u5', no: 5, title: '결정트리 II (지니·가지치기)', titleEn: 'Decision Trees II',
  scope: '지니 불순도 · CART 이진 분할 · 과적합과 정지 규칙 · 축소(사후) 가지치기 · 비용-복잡도 α · 회귀 트리 맛보기',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u5-l1-01', level:1, type:'mc', tags:['지니'], src:'교재 표준',
    statement:'지니 불순도 \\(G=1-\\sum p_k^2\\)에 대한 설명으로 옳은 것은?',
    choices:['이진 반반에서 최대 0.5, 순수에서 0 — 엔트로피와 개형이 비슷하다','최대 1','로그가 필요하다','p에 선형'],
    answer:0, expl:'"무작위 두 샘플이 다른 클래스일 확률". 로그가 없어 빠르다 — CART의 선택.' },
  { id:'u5-l1-02', level:1, type:'tf', tags:['CART'], src:'교재 표준',
    statement:'CART는 모든 분할을 이진으로 하며 분류엔 지니, 회귀엔 분산(MSE) 감소를 쓴다.',
    answer:true, expl:'다지 분할 대신 범주 그룹핑 이진 — U4-l3-14의 철학을 구현한 알고리즘.' },
  { id:'u5-l1-03', level:1, type:'mc', tags:['과적합 신호'], src:'교재 표준',
    statement:'트리를 끝까지(순수 잎까지) 키우면 흔히 생기는 일은?',
    choices:['훈련 100%·시험 하락 — 잡음까지 암기','훈련·시험 모두 최고','항상 최적','표현력 부족'],
    answer:0, expl:'잎당 샘플 1개 수준까지 쪼개면 잡음 학습. 그래서 정지 규칙 또는 사후 가지치기.' },
  { id:'u5-l1-04', level:1, type:'mc', tags:['사전 vs 사후'], src:'교재 표준',
    statement:'사전 정지(pre-pruning)와 사후 가지치기(post-pruning)의 비교로 옳은 것은?',
    choices:['사전은 빠르지만 근시안(수평선 효과), 사후는 다 키운 뒤 검증으로 잘라 안전','사후가 항상 빠르다','사전이 항상 정확','둘은 동일'],
    answer:0, expl:'IG가 0이어도(XOR) 다음 층에 보물이 있을 수 있다 — 사전 정지의 맹점.' },
  { id:'u5-l1-05', level:1, type:'tf', tags:['축소 가지치기'], src:'교재 표준',
    statement:'축소-오류 가지치기(reduced-error pruning)는 검증 성능이 나빠지지 않는 한 부트리를 잎으로 바꾸는 것을 반복한다.',
    answer:true, expl:'검증셋이 심판. 다수결 레이블로 치환 — 단순하고 강력한 표준.' },
  { id:'u5-l1-06', level:1, type:'mc', tags:['비용-복잡도'], src:'교재 표준',
    statement:'비용-복잡도 가지치기의 목적함수는?',
    choices:['오류 + α×잎 수 — α가 클수록 작은 트리','오류 − α×잎 수','잎 수만','깊이만'],
    answer:0, expl:'α는 복잡도 벌점 다이얼(릿지 λ의 트리판). CV로 α 선택.' },

  /* ---------- L2 (12) ---------- */
  { id:'u5-l2-01', level:2, type:'num', tags:['지니 계산'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[6,8]}, b:{choices:[2,4]} },
    statement:function(p){ return '['+p.a+'+, '+p.b+'−]의 지니 불순도를 구하라.'; },
    solve:function(p){
      var t=p.a+p.b, x=p.a/t;
      var G=1-x*x-(1-x)*(1-x);
      return { ans:G, unit:'', steps:[
        'G = 1−('+SVH.fmt(x)+')²−('+SVH.fmt(1-x)+')² = '+SVH.fmt(G),
        '(=2p(1−p) 이진 특례)' ] }; },
    hints:['제곱합 빼기.'] },
  { id:'u5-l2-02', level:2, type:'num', tags:['지니 이득'], src:'교재 표준',
    params:{ s:{choices:[[4,0,2,4],[5,1,1,3]]} },
    statement:function(p){ var s=p.s; return '부모 [6+,4−] → ['+s[0]+'+,'+s[1]+'−]/['+s[2]+'+,'+s[3]+'−]. 지니 이득(부모G−가중자식G)을 구하라.'; },
    solve:function(p){
      function G(a,b){ var t=a+b; if(!t) return 0; var x=a/t; return 2*x*(1-x); }
      var s=p.s, Gp=G(6,4);
      var Gc=((s[0]+s[1])*G(s[0],s[1])+(s[2]+s[3])*G(s[2],s[3]))/10;
      return { ans:Gp-Gc, unit:'', steps:[
        'G(부모)='+SVH.fmt(Gp)+', 가중 자식='+SVH.fmt(Gc),
        '이득 = '+SVH.fmt(Gp-Gc)+' (IG와 같은 틀, 불순도만 교체)' ] }; },
    hints:['가중 평균 구조 동일.'] },
  { id:'u5-l2-03', level:2, type:'num', tags:['3클래스 지니'], src:'창작 문제(검산됨)',
    params:{ c:{choices:[[3,3,4],[5,3,2]]} },
    statement:function(p){ var c=p.c; return '분포 ['+c.join(',')+']의 지니와 최대 가능 지니(3클래스)를 구하라.'; },
    solve:function(p){
      var c=p.c, t=c[0]+c[1]+c[2], G=1;
      for(var i=0;i<3;i++) G-=Math.pow(c[i]/t,2);
      return { ans:{G:G, max:2/3}, unit:{G:'', max:''}, steps:[
        'G = 1−Σp² = '+SVH.fmt(G),
        '최대 = 1−3(1/3)² = 2/3 (k클래스 최대 1−1/k)' ] }; },
    hints:['1−1/k.'] },
  { id:'u5-l2-04', level:2, type:'num', tags:['검증 가지치기 판정'], src:'교재 표준',
    params:{ before:{choices:[85,88]}, after:{choices:[86,90]} },
    statement:function(p){ return '부트리를 잎으로 치환 시 검증 정확도 '+p.before+'→'+p.after+'%. 가지치기 하는가(1/0)?'; },
    solve:function(p){ return { ans:p.after>=p.before?1:0, unit:'', steps:[
        '검증이 '+(p.after>=p.before?'유지/개선':'하락'),
        '→ '+(p.after>=p.before?'친다(1) — 단순한 쪽 우선(오컴)':'유지(0)') ] }; },
    hints:['검증 기준.'] },
  { id:'u5-l2-05', level:2, type:'num', tags:['α 목적함수'], src:'교재 표준',
    params:{ e1:{choices:[10,12]}, L1:{choices:[8,10]}, e2:{choices:[14,15]}, L2:{choices:[3,4]}, al:{choices:[1,2]} },
    statement:function(p){ return '큰 트리(오류 '+p.e1+', 잎 '+p.L1+') vs 작은 트리(오류 '+p.e2+', 잎 '+p.L2+'), α='+p.al+'. 비용-복잡도 점수로 승자를 정하라(큰=1/작은=2).'; },
    solve:function(p){
      var c1=p.e1+p.al*p.L1, c2=p.e2+p.al*p.L2;
      return { ans:{c1:c1, c2:c2, pick:c1<=c2?1:2}, unit:{c1:'', c2:'', pick:''}, steps:[
        '점수: '+c1+' vs '+c2,
        '승자 = '+(c1<=c2?'큰 트리(1)':'작은 트리(2)')+' — α가 저울추' ] }; },
    hints:['오류+α·잎.'] },
  { id:'u5-l2-06', level:2, type:'num', tags:['임계 α'], src:'교재 표준',
    params:{ de:{choices:[3,5]}, dL:{choices:[4,6]} },
    statement:function(p){ return '부트리를 치면 오류 +'+p.de+', 잎 −'+p.dL+'. 가지치기가 이득이 되는 α의 최소값을 구하라.'; },
    solve:function(p){ var a=p.de/p.dL;
      return { ans:a, unit:'', steps:[
        '조건: '+p.de+' ≤ α×'+p.dL+' → α ≥ '+SVH.fmt(a),
        '(부트리마다 임계 α — 약한 고리부터 잘리는 경로의 원리)' ] }; },
    hints:['Δ오류/Δ잎.'] },
  { id:'u5-l2-07', level:2, type:'num', tags:['회귀 트리 잎'], src:'교재 표준',
    params:{ ys:{choices:[[2,4,6],[3,5,10]]} },
    statement:function(p){ var y=p.ys; return '회귀 트리 잎에 y=['+y.join(',')+']. (a) 잎의 예측값 (b) 잎 SSE를 구하라.'; },
    solve:function(p){
      var y=p.ys, m=(y[0]+y[1]+y[2])/3, sse=0;
      for(var i=0;i<3;i++) sse+=(y[i]-m)*(y[i]-m);
      return { ans:{pred:m, SSE:sse}, unit:{pred:'', SSE:''}, steps:[
        '예측 = 평균 '+SVH.fmt(m)+' (제곱손실 최소화)',
        'SSE = '+SVH.fmt(sse) ] }; },
    hints:['평균이 최적.'] },
  { id:'u5-l2-08', level:2, type:'num', tags:['분산 감소'], src:'교재 표준',
    params:{ v:{choices:[[10,2,4],[8,1,3]]} },
    statement:function(p){ var v=p.v; return '부모 분산 '+v[0]+', 자식(반반) 분산 '+v[1]+'·'+v[2]+'. 분산 감소량을 구하라.'; },
    solve:function(p){ var v=p.v, red=v[0]-(v[1]+v[2])/2;
      return { ans:red, unit:'', steps:[
        '감소 = '+v[0]+'−('+v[1]+'+'+v[2]+')/2 = '+SVH.fmt(red),
        '(회귀 트리의 "IG" — 같은 틀, 불순도=분산)' ] }; },
    hints:['가중 평균 빼기.'] },
  { id:'u5-l2-09', level:2, type:'num', tags:['깊이 규제 효과'], src:'창작 문제(검산됨)',
    params:{ d:{choices:[[3,80,78],[10,99,74]]} },
    statement:function(p){ var d=p.d; return '깊이 '+d[0]+' 트리: 훈련 '+d[1]+'%/검증 '+d[2]+'%. 격차(%p)와 진단(과적합=1/적정=0, 격차>10 기준)을 답하라.'; },
    solve:function(p){ var d=p.d, g=d[1]-d[2];
      return { ans:{gap:g, diag:g>10?1:0}, unit:{gap:'%p', diag:''}, steps:[
        '격차 = '+g+'%p → '+(g>10?'과적합(1)':'적정(0)'),
        '(깊이 = 트리의 제1 규제 다이얼)' ] }; },
    hints:['격차 기준.'] },
  { id:'u5-l2-10', level:2, type:'num', tags:['지니 vs 엔트로피 속도'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[1000000,10000000]} },
    statement:function(p){ return '분할 후보 '+SVH.si(p.n,'회')+' 평가에서 지니(곱셈 2회)가 엔트로피(log 2회, log≈곱셈 5배 비용) 대비 절약하는 상대 비용 비율을 구하라. (지니/엔트로피)'; },
    solve:function(p){ return { ans:0.2, unit:'', steps:[
        '비용비 ≈ 2/(2×5) = 0.2',
        '(결과는 대개 비슷, 속도는 지니 — CART의 실용주의)' ] }; },
    hints:['연산 비용 모델.'] },
  { id:'u5-l2-11', level:2, type:'num', tags:['최소 분할 샘플'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[5,20]}, N:{choices:[40,100]} },
    statement:function(p){ return 'min_samples_split='+p.n+'일 때, 샘플 '+p.N+'개 노드는 분할 가능한가(1/0)? '+(p.n-1)+'개면?'; },
    solve:function(p){ return { ans:{a:p.N>=p.n?1:0, b:0}, unit:{a:'', b:''}, steps:[
        p.N+'≥'+p.n+' → 가능(1) / '+(p.n-1)+'개 → 불가(0)',
        '(하이퍼파라미터의 동작 방식을 정확히)' ] }; },
    hints:['부등호 하나.'] },
  { id:'u5-l2-12', level:2, type:'num', tags:['다수결 잎 오류'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[[7,3],[9,1]]} },
    statement:function(p){ var a=p.a; return '잎 ['+a[0]+'+,'+a[1]+'−]를 잎으로 확정하면 훈련 오류 수와 오류율(%)은?'; },
    solve:function(p){ var a=p.a;
      return { ans:{err:a[1], rate:a[1]/(a[0]+a[1])*100}, unit:{err:'개', rate:'%'}, steps:[
        '다수결 + → 오류 = 소수 '+a[1]+'개 ('+SVH.fmt(a[1]/(a[0]+a[1])*100)+'%)',
        '(가지치기 판단의 원료)' ] }; },
    hints:['소수 클래스 수.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u5-l3-01', level:3, type:'num', tags:['지니 분할 선택'], src:'기출 유형',
    params:{ A:{choices:[[5,1,1,5],[6,0,2,4]]}, B:{choices:[[4,2,2,4],[3,3,3,3]]} },
    statement:function(p){ return '부모 [6+,6−]. A: ['+p.A.join(',')+'], B: ['+p.B.join(',')+'] (각 [+,−,+,−] 두 가지). 지니 이득으로 승자(A=1/B=2)를 정하라.'; },
    solve:function(p){
      function G(a,b){ var t=a+b; if(!t) return 0; var x=a/t; return 2*x*(1-x); }
      function gain(s){ return G(6,6)-((s[0]+s[1])*G(s[0],s[1])+(s[2]+s[3])*G(s[2],s[3]))/12; }
      var ga=gain(p.A), gb=gain(p.B);
      return { ans:{gA:ga, gB:gb, pick:ga>=gb?1:2}, unit:{gA:'', gB:'', pick:''}, steps:[
        '이득: A '+SVH.fmt(ga)+' vs B '+SVH.fmt(gb),
        '승자 '+(ga>=gb?'A(1)':'B(2)') ] }; },
    hints:['G(6,6)=0.5.'] },
  { id:'u5-l3-02', level:3, type:'num', tags:['가지치기 시뮬'], src:'기출 유형',
    params:{ node:{choices:[[20,5,90,88],[30,8,85,86]]} },
    statement:function(p){ var n=p.node; return '부트리(훈련 정확 '+n[0]+'/'+(n[0]+n[1])+' 노드 샘플)와 잎 치환. 검증: 유지 '+n[2]+'% vs 치환 '+n[3]+'%. (a) 훈련 기준 결정(유지=0) (b) 검증 기준 결정(치환=1이면 1) — 어느 기준을 따르나(검증=2)?'; },
    solve:function(p){ var n=p.node;
      return { ans:{tr:0, val:n[3]>=n[2]?1:0, rule:2}, unit:{tr:'', val:'', rule:''}, steps:[
        '훈련은 항상 "유지"가 유리(0) — 그래서 못 믿는다',
        '검증: '+(n[3]>=n[2]?'치환(1)':'유지(0)'),
        '따르는 것은 검증(2) — 가지치기의 헌법' ] }; },
    hints:['누가 심판인가.'] },
  { id:'u5-l3-03', level:3, type:'num', tags:['연속 지니 스캔'], src:'기출 유형',
    params:{ lab:{choices:[[1,1,0,0],[1,0,1,0]]} },
    statement:function(p){ var l=p.lab; return '값 [1,2,3,4], 레이블 ['+l.join(',')+']: 각 중점 문턱의 지니 이득을 구해 최적 문턱을 정하라.'; },
    solve:function(p){
      function G(a,b){ var t=a+b; if(!t) return 0; var x=a/t; return 2*x*(1-x); }
      var l=p.lab, P=l.reduce((a,b)=>a+b,0);
      var Gp=G(P,4-P), best=-1, bth=0;
      for(var i=0;i<3;i++){
        var lp=0; for(var j=0;j<=i;j++) lp+=l[j];
        var g=Gp-((i+1)*G(lp,i+1-lp)+(3-i)*G(P-lp,3-i-(P-lp)))/4;
        if(g>best){ best=g; bth=(i+1)+0.5; }
      }
      return { ans:{th:bth, gain:best}, unit:{th:'', gain:''}, steps:[
        '문턱 1.5/2.5/3.5 스캔',
        '최적 '+bth+', 이득 '+SVH.fmt(best)+' ('+(best===Gp?'완전 분리':'부분 분리')+')' ] }; },
    hints:['세 후보 전수.'] },
  { id:'u5-l3-04', level:3, type:'num', tags:['α 경로'], src:'교재 표준',
    params:{ t:{choices:[[0,10,2,6,5,3],[1,12,3,7,6,4]]} },
    statement:function(p){ var t=p.t; return '트리 크기별 (오류, 잎): 큰('+t[0]+','+t[1]+'), 중('+t[2]+','+t[3]+'), 작('+t[4]+','+t[5]+'). α=0.5와 α=2에서 각각 최적 트리(큰=1/중=2/작=3)를 정하라.'; },
    solve:function(p){
      var t=p.t;
      function best(al){
        var c=[t[0]+al*t[1], t[2]+al*t[3], t[4]+al*t[5]];
        var m=Math.min(c[0],c[1],c[2]);
        return c[0]===m?1:(c[1]===m?2:3);
      }
      return { ans:{a05:best(0.5), a2:best(2)}, unit:{a05:'', a2:''}, steps:[
        'α=0.5: 점수 비교 → '+best(0.5),
        'α=2: → '+best(2)+' (α↑ = 작은 트리로 이동 — 경로의 그림)' ] }; },
    hints:['각 α에서 3점 비교.'] },
  { id:'u5-l3-05', level:3, type:'num', tags:['수평선 효과'], src:'교재 표준',
    params:{ variant:{choices:[1,2]} },
    statement:function(p){ return 'XOR 데이터에서 사전 정지 "IG<0.01이면 중단"을 적용하면 뿌리에서 멈춘다. (a) 그 트리의 정확도(%) (b) 사후 가지치기라면 깊이 2 트리를 발견하는가(1)?'; },
    solve:function(p){ return { ans:{acc:50, post:1}, unit:{acc:'%', post:''}, steps:[
        '뿌리 IG=0 → 중단 → 다수결 50%',
        '사후: 일단 키우면 2층에서 100% → 발견(1)',
        '(수평선 효과의 교과서 사례)' ] }; },
    hints:['U4-l3-09 후속.'] },
  { id:'u5-l3-06', level:3, type:'num', tags:['회귀 분할 계산'], src:'기출 유형',
    params:{ ys:{choices:[[1,2,7,8],[2,3,8,9]]} },
    statement:function(p){ var y=p.ys; return 'x=[1,2,3,4], y=['+y.join(',')+']: 문턱 2.5 분할의 (a) 좌우 잎 예측 (b) SSE 감소량을 구하라.'; },
    solve:function(p){
      var y=p.ys;
      var m=(y[0]+y[1]+y[2]+y[3])/4, sse0=0;
      for(var i=0;i<4;i++) sse0+=(y[i]-m)*(y[i]-m);
      var mL=(y[0]+y[1])/2, mR=(y[2]+y[3])/2;
      var sse1=Math.pow(y[0]-mL,2)+Math.pow(y[1]-mL,2)+Math.pow(y[2]-mR,2)+Math.pow(y[3]-mR,2);
      return { ans:{mL:mL, mR:mR, red:sse0-sse1}, unit:{mL:'', mR:'', red:''}, steps:[
        '잎 예측: 좌 '+SVH.fmt(mL)+', 우 '+SVH.fmt(mR),
        'SSE '+SVH.fmt(sse0)+'→'+SVH.fmt(sse1)+', 감소 '+SVH.fmt(sse0-sse1),
        '(계단 함수 근사 — 회귀 트리의 그림)' ] }; },
    hints:['평균 2개, SSE 2번.'] },
  { id:'u5-l3-07', level:3, type:'num', tags:['불안정성'], src:'교재 표준',
    params:{ variant:{choices:[1,2]} },
    statement:function(p){ return '데이터 1개 변경으로 뿌리 특징이 바뀌어 트리 전체가 달라졌다. 이 성질(고분산=1)과, 이를 이용/완화하는 대표 기법(배깅=랜덤포레스트, 기말)의 원리(평균으로 분산↓=1)를 답하라.'; },
    solve:function(p){ return { ans:{var_:1, fix:1}, unit:{var_:'', fix:''}, steps:[
        '트리 = 고분산 학습기(1) — 탐욕 분기의 나비효과',
        '배깅: 부트스트랩 트리 평균 → 분산↓(1) (기말 앙상블 예고)' ] }; },
    hints:['분산 큰 모델의 처방.'] },
  { id:'u5-l3-08', level:3, type:'num', tags:['클래스 가중 지니'], src:'기출 유형',
    params:{ w:{choices:[5,10]} },
    statement:function(p){ return '양성 가중치 '+p.w+'배(비용 반영): [2+, 8−] 노드의 가중 다수결 판정(+=1/−=0)을 구하라. (가중 후 2×'+p.w+' vs 8)'; },
    solve:function(p){ return { ans:2*p.w>8?1:0, unit:'', steps:[
        '가중 표: +'+2*p.w+' vs −8',
        '판정 '+(2*p.w>8?'+ (1)':'− (0)')+' — 비용이 잎 레이블을 바꾼다(U3 문턱 이동의 트리판)' ] }; },
    hints:['가중 후 다수결.'] },
  { id:'u5-l3-09', level:3, type:'num', tags:['오류 상한 가지치기(비관적)'], src:'교재 표준',
    params:{ e:{choices:[2,3]}, n:{choices:[20,40]} },
    statement:function(p){ return 'C4.5 비관적 추정 맛보기: 잎 오류 '+p.e+'/'+p.n+'에 연속성 보정 +0.5를 더한 추정 오류율(%)을 구하라.'; },
    solve:function(p){ return { ans:(p.e+0.5)/p.n*100, unit:'%', steps:[
        '(e+0.5)/n = '+SVH.fmt((p.e+0.5)/p.n*100)+'%',
        '(훈련 오류를 그대로 안 믿고 위로 보정 — 검증셋 없이 가지치는 아이디어)' ] }; },
    hints:['+0.5 보정.'] },
  { id:'u5-l3-10', level:3, type:'num', tags:['특징 중요도'], src:'교재 표준',
    params:{ g1:{choices:[0.2,0.3]}, n1:{choices:[100]}, g2:{choices:[0.1,0.15]}, n2:{choices:[40,60]} },
    statement:function(p){ return '특징 A가 두 노드에서 사용됨: (지니 이득, 노드 샘플) = ('+p.g1+', '+p.n1+'), ('+p.g2+', '+p.n2+'). 샘플 가중 중요도(전체 N=100 기준 합)를 구하라.'; },
    solve:function(p){
      var imp=p.g1*p.n1/100+p.g2*p.n2/100;
      return { ans:imp, unit:'', steps:[
        '중요도 = Σ(이득×노드비율) = '+SVH.fmt(imp),
        '(sklearn feature_importances_의 정체)' ] }; },
    hints:['가중합.'] },
  { id:'u5-l3-11', level:3, type:'num', tags:['잎 수 vs 성능 곡선'], src:'기출 유형',
    params:{ tbl:{choices:[[2,70,4,80,8,84,16,82],[2,65,4,78,8,83,16,80]]} },
    statement:function(p){ var t=p.tbl; return '잎 수별 검증 정확도: '+t[0]+'잎 '+t[1]+'%, '+t[2]+'잎 '+t[3]+'%, '+t[4]+'잎 '+t[5]+'%, '+t[6]+'잎 '+t[7]+'%. 최적 잎 수와, 16잎의 진단(과적합=1)을 답하라.'; },
    solve:function(p){ var t=p.tbl;
      var accs=[t[1],t[3],t[5],t[7]], leaves=[t[0],t[2],t[4],t[6]];
      var bi=accs.indexOf(Math.max(...accs));
      return { ans:{best:leaves[bi], diag:1}, unit:{best:'잎', diag:''}, steps:[
        '검증 최고 = '+leaves[bi]+'잎',
        '16잎에서 하락 → 과적합 시작(1) — 검증 곡선의 꼭대기 찾기' ] }; },
    hints:['최고점 인덱스.'] },
  { id:'u5-l3-12', level:3, type:'num', tags:['서브트리 치환 계산'], src:'기출 유형',
    params:{ l1:{choices:[[8,1],[6,1]]}, l2:{choices:[[1,5],[2,6]]} },
    statement:function(p){ return '부트리: 잎A ['+p.l1.join('+,')+'−], 잎B ['+p.l2.join('+,')+'−]. (a) 부트리 훈련 오류 (b) 잎으로 합칠 때(다수결) 오류 (c) 오류 증가분을 구하라.'; },
    solve:function(p){
      var e1=Math.min(p.l1[0],p.l1[1])+Math.min(p.l2[0],p.l2[1]);
      var P=p.l1[0]+p.l2[0], N=p.l1[1]+p.l2[1];
      var e2=Math.min(P,N);
      return { ans:{sub:e1, leaf:e2, inc:e2-e1}, unit:{sub:'개', leaf:'개', inc:'개'}, steps:[
        '부트리 오류 = '+e1+', 합친 잎 ['+P+'+,'+N+'−] 오류 = '+e2,
        '증가 '+(e2-e1)+'개 — 이 값과 α·Δ잎을 저울질(비용-복잡도)' ] }; },
    hints:['소수 합 vs 합의 소수.'] },
  { id:'u5-l3-13', level:3, type:'num', tags:['결정 경계 개수'], src:'창작 문제(검산됨)',
    params:{ L:{choices:[4,8]} },
    statement:function(p){ return '2차원 입력에서 잎 '+p.L+'개짜리 CART 트리가 만드는 (a) 사각형 영역 수 (b) 내부 분할 수를 구하라.'; },
    solve:function(p){ return { ans:{reg:p.L, cuts:p.L-1}, unit:{reg:'개', cuts:'개'}, steps:[
        '영역 = 잎 = '+p.L+', 분할 = 잎−1 = '+(p.L-1),
        '(공간을 직사각형 타일로 — 트리의 기하학)' ] }; },
    hints:['이진 트리 항등식.'] },
  { id:'u5-l3-14', level:3, type:'num', tags:['데이터 크기와 깊이'], src:'기출 유형',
    params:{ N:{choices:[100,1000]}, err:{choices:[[15,10,9,12],[20,12,10,14]]} },
    statement:function(p){ var e=p.err; return 'N='+p.N+'에서 깊이 2/4/6/8의 검증 오류 ['+e.join(', ')+']%. (a) 최적 깊이 (b) N을 10배로 늘리면 최적 깊이는 어느 쪽으로 움직이나(깊어짐=1)?'; },
    solve:function(p){ var e=p.err, d=[2,4,6,8];
      var bi=e.indexOf(Math.min(...e));
      return { ans:{depth:d[bi], move:1}, unit:{depth:'', move:''}, steps:[
        '최적 = 깊이 '+d[bi],
        '데이터↑ → 분산 부담↓ → 더 깊게 허용(1) — 용량은 데이터와 함께 큰다' ] }; },
    hints:['최소 오류 + 스케일 직관.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u5-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 지니와 엔트로피는 대개 비슷한 분할을 고른다<br>㉡ 사후 가지치기는 수평선 효과를 피할 수 있다<br>㉢ 비용-복잡도의 α는 CV로 고른다<br>㉣ 회귀 트리 잎의 최적 상수 예측은 평균이다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참.' },
  { id:'u5-l4-02', level:4, type:'num', tags:['지니 풀계산'], src:'기출 유형',
    params:{ s:{choices:[[7,1,2,5],[6,2,1,6]]} },
    statement:function(p){ var s=p.s; return '부모 ['+(s[0]+s[2])+'+,'+(s[1]+s[3])+'−] → A: ['+s[0]+'+,'+s[1]+'−]/['+s[2]+'+,'+s[3]+'−]. (a) 부모 지니 (b) 가중 자식 지니 (c) 이득 (d) 대응 IG(엔트로피)도 구해 두 기준 비교.'; },
    solve:function(p){
      function G(a,b){ var t=a+b; if(!t) return 0; var x=a/t; return 2*x*(1-x); }
      function H(a,b){ var t=a+b; if(!t) return 0; var x=a/t,y=b/t;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      var s=p.s, P=s[0]+s[2], N=s[1]+s[3], T=P+N;
      var Gp=G(P,N), Gc=((s[0]+s[1])*G(s[0],s[1])+(s[2]+s[3])*G(s[2],s[3]))/T;
      var IG=H(P,N)-((s[0]+s[1])*H(s[0],s[1])+(s[2]+s[3])*H(s[2],s[3]))/T;
      return { ans:{Gp:Gp, Gc:Gc, gain:Gp-Gc, IG:IG}, unit:{Gp:'',Gc:'',gain:'',IG:'비트'}, steps:[
        'G(부모)='+SVH.fmt(Gp)+', 가중='+SVH.fmt(Gc)+', 이득='+SVH.fmt(Gp-Gc),
        'IG='+SVH.fmt(IG)+' — 순위는 대개 일치(수치는 다름)' ] }; },
    hints:['두 불순도 병렬 계산.'] },
  { id:'u5-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'지니 \\(G=1-\\sum p_k^2\\)가 "무작위 두 샘플이 다른 클래스일 확률"임을 유도하고, 이진에서 2p(1−p)임을 확인하라.',
    steps:[
      '복원 추출 두 샘플이 같은 클래스일 확률 = Σp_k² [왜] 클래스 k 둘 다일 확률 p_k²의 합',
      '다를 확률 = 1−Σp_k² = G — 정의의 확률적 정체',
      '이진: 1−p²−(1−p)² = 2p(1−p) ✓',
      '회귀 유추: "두 샘플 차이의 기대"가 분산 — 지니↔분산의 평행 구조',
      '극한 체크: 순수 ⇒ 0 ✓ · k균등 ⇒ 1−1/k ✓'
    ],
    hints:['같을 확률부터.'],
    expl:'공식 암기를 확률 이야기로 바꿔 주는 유도 — 서술형 대비.' },
  { id:'u5-l4-04', level:4, type:'num', tags:['REP 풀시뮬'], src:'기출 유형',
    params:{ t:{choices:[[88,90,86],[85,87,84]]} },
    statement:function(p){ var t=p.t; return '검증 정확도: 전체 트리 '+t[0]+'%, 부트리1 치환 시 '+t[1]+'%, 이후 부트리2 추가 치환 시 '+t[2]+'%. 축소-오류 가지치기의 최종 상태(치환 수)를 구하라.'; },
    solve:function(p){ var t=p.t;
      var n=t[1]>=t[0]?(t[2]>=t[1]?2:1):0;
      return { ans:n, unit:'회 치환', steps:[
        '1차: '+t[0]+'→'+t[1]+' '+(t[1]>=t[0]?'채택':'기각'),
        '2차: '+t[1]+'→'+t[2]+' '+(t[2]>=t[1]?'채택':'기각'),
        '최종 치환 '+n+'회 — 나빠지기 직전까지 자른다' ] }; },
    hints:['탐욕 반복.'] },
  { id:'u5-l4-05', level:4, type:'num', tags:['α 선택 CV'], src:'기출 유형',
    params:{ cv:{choices:[[82,86,88,85],[80,85,87,84]]} },
    statement:function(p){ var c=p.cv; return 'α∈{0, 0.5, 1, 2}의 CV 정확도 ['+c.join(', ')+']%. (a) 선택 α (b) α=0(무가지치기)의 문제 진단(과적합=1)을 답하라.'; },
    solve:function(p){ var c=p.cv, al=[0,0.5,1,2];
      var bi=c.indexOf(Math.max(...c));
      return { ans:{alpha:al[bi], diag:1}, unit:{alpha:'', diag:''}, steps:[
        '최고 CV = α='+al[bi],
        'α=0이 최고가 아님 → 무규제는 과적합(1) — 릿지 λ 선택과 같은 그림' ] }; },
    hints:['CV 최댓값.'] },
  { id:'u5-l4-06', level:4, type:'num', tags:['비대칭 비용 트리'], src:'기출 유형',
    params:{ cFN:{choices:[10,20]}, leaf:{choices:[[3,7],[4,6]]} },
    statement:function(p){ var l=p.leaf; return 'FN 비용 '+p.cFN+'·FP 비용 1. 잎 ['+l[0]+'+,'+l[1]+'−]의 (a) − 판정 기대비용 (b) + 판정 기대비용 (c) 최적 판정(+=1/−=0)을 구하라.'; },
    solve:function(p){ var l=p.leaf;
      var cn=l[0]*p.cFN, cp=l[1]*1;
      return { ans:{cn:cn, cp:cp, pick:cp<=cn?1:0}, unit:{cn:'', cp:'', pick:''}, steps:[
        '− 판정: FN '+l[0]+'건×'+p.cFN+' = '+cn,
        '+ 판정: FP '+l[1]+'건×1 = '+cp,
        '판정 '+(cp<=cn?'+(1)':'−(0)')+' — 다수결('+(l[0]>l[1]?'+':'−')+')과 달라질 수 있다!' ] }; },
    hints:['비용 가중 다수결.'] },
  { id:'u5-l4-07', level:4, type:'num', tags:['트리 vs 선형 선택'], src:'기출 유형',
    params:{ sc:{choices:[[85,84,3],[88,80,5]]} },
    statement:function(p){ var s=p.sc; return '트리 CV '+s[0]+'% vs 로지스틱 CV '+s[1]+'% (SE '+s[2]+'%p... 아니 1%p 가정). "1-SE 규칙"(최고 성능 −1SE 내에서 가장 단순한 모델)으로 선택하라(트리=1/선형=2, 선형이 더 단순 가정).'; },
    solve:function(p){ var s=p.sc;
      var pick=(s[0]-s[1])<=1?2:1;
      return { ans:pick, unit:'', steps:[
        '차 '+(s[0]-s[1])+'%p vs 1SE=1%p',
        (pick===2?'범위 내 → 단순한 선형(2)':'범위 밖 → 트리(1)'),
        '(1-SE 규칙 — 동률이면 단순한 쪽, 오컴의 운영화)' ] }; },
    hints:['차이 vs SE.'] },
  { id:'u5-l4-08', level:4, type:'num', tags:['중간 리허설'], src:'기출 유형',
    params:{ s:{choices:[[5,3,4,0],[6,2,3,1]]} },
    statement:function(p){ var s=p.s; return '12샘플 [+'+(s[0]+s[2])+',−'+(s[1]+s[3])+'] → 분할 ['+s[0]+'+,'+s[1]+'−]/['+s[2]+'+,'+s[3]+'−]. (a) 지니 이득 (b) IG (c) 분할 후 각 잎의 다수결 훈련 정확도(%)를 구하라.'; },
    solve:function(p){
      function G(a,b){ var t=a+b; if(!t) return 0; var x=a/t; return 2*x*(1-x); }
      function H(a,b){ var t=a+b; if(!t) return 0; var x=a/t,y=b/t;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      var s=p.s, P=s[0]+s[2], N=s[1]+s[3], T=P+N;
      var gg=G(P,N)-((s[0]+s[1])*G(s[0],s[1])+(s[2]+s[3])*G(s[2],s[3]))/T;
      var ig=H(P,N)-((s[0]+s[1])*H(s[0],s[1])+(s[2]+s[3])*H(s[2],s[3]))/T;
      var acc=(Math.max(s[0],s[1])+Math.max(s[2],s[3]))/T*100;
      return { ans:{gini:gg, IG:ig, acc:acc}, unit:{gini:'', IG:'비트', acc:'%'}, steps:[
        '지니 이득 '+SVH.fmt(gg)+' · IG '+SVH.fmt(ig),
        '분할 후 정확도 = '+SVH.fmt(acc)+'%',
        '(세 관점(지니·정보·정확도)을 한 분할에 — 시험 종합형)' ] }; },
    hints:['세 기준 병렬.'] }
  ]
});
