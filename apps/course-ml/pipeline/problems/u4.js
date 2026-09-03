/* U4 결정트리 I — 엔트로피, 정보이득, ID3 분할 선택, 이득비 */
SV_BANK.push({
  id: 'u4', no: 4, title: '결정트리 I (엔트로피·정보이득)', titleEn: 'Decision Trees I',
  scope: '엔트로피 H(p) · 조건부 엔트로피 · 정보이득 · ID3 분할 선택 · 다지 분할 편향과 이득비(gain ratio)',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u4-l1-01', level:1, type:'mc', tags:['엔트로피'], src:'교재 표준',
    statement:'이진 엔트로피 \\(H(p)=-p\\log_2p-(1-p)\\log_2(1-p)\\)의 성질로 옳은 것은?',
    choices:['p=0.5에서 최대 1비트, p=0·1에서 0','p=1에서 최대','단위는 항상 nat','p에 선형'],
    answer:0, expl:'불확실성의 척도 — 반반이 제일 모른다. log₂면 비트.' },
  { id:'u4-l1-02', level:1, type:'mc', tags:['정보이득'], src:'교재 표준',
    statement:'정보이득 IG(S, A)의 정의는?',
    choices:['H(S) − Σ(|Sᵥ|/|S|)H(Sᵥ) — 분할로 줄어든 엔트로피','분할 후 엔트로피 합','H(S) 그 자체','자식 수'],
    answer:0, expl:'부모 엔트로피 − 자식들의 가중 평균 엔트로피. ID3는 IG 최대 특징을 고른다.' },
  { id:'u4-l1-03', level:1, type:'tf', tags:['탐욕성'], src:'교재 표준',
    statement:'ID3/C4.5는 탐욕(greedy) 알고리즘이라 전역 최적 트리를 보장하지 않는다.',
    answer:true, expl:'매 노드 지역 최선 분할. 최적 트리 탐색은 NP-hard — 탐욕이 실용 타협.' },
  { id:'u4-l1-04', level:1, type:'mc', tags:['다지 편향'], src:'교재 표준',
    statement:'값이 아주 많은 특징(예: 학번)이 IG에서 유리해지는 문제의 처방은?',
    choices:['이득비 = IG / 분할정보(SplitInfo)로 정규화','IG를 제곱','그 특징을 항상 먼저 사용','트리를 깊게'],
    answer:0, expl:'학번은 완벽 분할(IG 최대)이지만 일반화 0. SplitInfo=분할 자체의 엔트로피로 벌점.' },
  { id:'u4-l1-05', level:1, type:'tf', tags:['표현력'], src:'교재 표준',
    statement:'결정트리는 충분히 깊으면 임의의 불리언 함수를 표현할 수 있다(XOR 포함).',
    answer:true, expl:'경로=규칙(연언), 트리=규칙들의 선언 — 선형 모델이 못 하는 XOR도 2층이면 된다.' },
  { id:'u4-l1-06', level:1, type:'mc', tags:['잎 판정'], src:'교재 표준',
    statement:'재귀 분할이 멈추는 표준 조건이 아닌 것은?',
    choices:['IG가 최대일 때','노드가 순수(한 클래스)','특징 소진','샘플 수가 최소 기준 미만'],
    answer:0, expl:'IG 최대는 "계속 나누는" 조건이다. 나머지 셋(+깊이 제한)이 정지 조건.' },

  /* ---------- L2 (12) ---------- */
  { id:'u4-l2-01', level:2, type:'num', tags:['엔트로피 계산'], src:'창작 문제(검산됨)',
    params:{ p:{choices:[9,6,12]}, n:{choices:[5,6,4]} },
    statement:function(p){ return '양성 '+p.p+'/음성 '+p.n+'인 집합의 엔트로피(비트)를 구하라.'; },
    solve:function(p){
      var t=p.p+p.n, a=p.p/t, b=p.n/t;
      var H=(a>0?-a*Math.log2(a):0)+(b>0?-b*Math.log2(b):0);
      return { ans:H, unit:'비트', steps:[
        'p₊='+SVH.fmt(a)+', p₋='+SVH.fmt(b),
        'H = −'+SVH.fmt(a)+'log₂'+SVH.fmt(a)+'−'+SVH.fmt(b)+'log₂'+SVH.fmt(b)+' = '+SVH.fmt(H) ] }; },
    hints:['log₂=ln/ln2.'] },
  { id:'u4-l2-02', level:2, type:'num', tags:['극단값'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[8,16]} },
    statement:function(p){ return '(a) 전부 양성 '+p.n+'개 (b) 반반 '+p.n/2+':'+p.n/2+' (c) '+p.n+'-클래스 균등 분포의 엔트로피를 각각 구하라.'; },
    solve:function(p){
      return { ans:{a:0, b:1, c:Math.log2(p.n)}, unit:{a:'비트', b:'비트', c:'비트'}, steps:[
        '순수 = 0, 이진 반반 = 1',
        'k균등 = log₂k = '+SVH.fmt(Math.log2(p.n))+' (엔트로피의 눈금 3점)' ] }; },
    hints:['정의의 세 랜드마크.'] },
  { id:'u4-l2-03', level:2, type:'num', tags:['IG 손계산'], src:'교재 표준',
    params:{ split:{choices:[[6,2,3,3],[8,0,4,2]]} },
    statement:function(p){ var s=p.split; return '부모 [9+,5−]를 특징 A로 나눔: 가지1 ['+s[0]+'+,'+s[1]+'−], 가지2 ['+s[2]+'+,'+s[3]+'−]... 합이 안 맞으면 나머지는 가지3 [+'+(9-s[0]-s[2])+',−'+(5-s[1]-s[3])+']. IG(비트)를 구하라.'; },
    solve:function(p){
      function H(a,b){ var t=a+b; if(t===0) return 0; var x=a/t, y=b/t;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      var s=p.split;
      var g3p=9-s[0]-s[2], g3n=5-s[1]-s[3];
      var Hp=H(9,5);
      var t1=s[0]+s[1], t2=s[2]+s[3], t3=g3p+g3n;
      var Hc=(t1*H(s[0],s[1])+t2*H(s[2],s[3])+t3*H(g3p,g3n))/14;
      return { ans:Hp-Hc, unit:'비트', steps:[
        'H(부모) = H(9,5) = '+SVH.fmt(Hp),
        '가중 자식 = '+SVH.fmt(Hc),
        'IG = '+SVH.fmt(Hp-Hc)+' (미첼 교과서의 그 14샘플 스타일)' ] }; },
    hints:['가중치 = 가지 크기/전체.'] },
  { id:'u4-l2-04', level:2, type:'num', tags:['두 특징 비교'], src:'기출 유형',
    params:{ A:{choices:[[3,0,1,4],[4,0,0,4]]}, B:{choices:[[2,2,2,2],[3,1,1,3]]} },
    statement:function(p){ return '부모 [4+,4−]. 특징 A: ['+p.A[0]+'+,'+p.A[1]+'−]/['+p.A[2]+'+,'+p.A[3]+'−], 특징 B: ['+p.B[0]+'+,'+p.B[1]+'−]/['+p.B[2]+'+,'+p.B[3]+'−]. 각 IG를 구하고 ID3의 선택(A=1/B=2)을 답하라.'; },
    solve:function(p){
      function H(a,b){ var t=a+b; if(!t) return 0; var x=a/t,y=b/t;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      function IG(s){ return 1-((s[0]+s[1])*H(s[0],s[1])+(s[2]+s[3])*H(s[2],s[3]))/8; }
      var ia=IG(p.A), ib=IG(p.B);
      return { ans:{IGA:ia, IGB:ib, pick:ia>=ib?1:2}, unit:{IGA:'비트', IGB:'비트', pick:''}, steps:[
        'IG(A) = '+SVH.fmt(ia)+', IG(B) = '+SVH.fmt(ib),
        '선택 = '+(ia>=ib?'A(1)':'B(2)')+' (더 순수하게 가르는 쪽)' ] }; },
    hints:['부모 H=1(반반).'] },
  { id:'u4-l2-05', level:2, type:'num', tags:['SplitInfo'], src:'교재 표준',
    params:{ k:{choices:[2,4,8]}, },
    statement:function(p){ return 'N개를 '+p.k+'개 가지로 균등 분할할 때 SplitInfo(비트)와, 같은 IG라면 가지 수가 많을수록 이득비가 어떻게 되는지(감소=−1)를 답하라.'; },
    solve:function(p){ return { ans:{SI:Math.log2(p.k), dir:-1}, unit:{SI:'비트', dir:''}, steps:[
        'SplitInfo = log₂'+p.k+' = '+SVH.fmt(Math.log2(p.k)),
        '이득비 = IG/SI → 가지 많을수록 감소(−1) — 다지 편향 벌점' ] }; },
    hints:['균등이면 log₂k.'] },
  { id:'u4-l2-06', level:2, type:'num', tags:['연속 특징 분할'], src:'교재 표준',
    params:{ vals:{choices:[[1,3,5,7],[2,4,6,8]]} },
    statement:function(p){ var v=p.vals; return '연속 특징 값 '+v.join(', ')+' (레이블 −,−,+,+). 후보 문턱(인접 중점) 중 최적 문턱과 그 IG를 구하라.'; },
    solve:function(p){
      var v=p.vals, th=(v[1]+v[2])/2;
      return { ans:{th:th, IG:1}, unit:{th:'', IG:'비트'}, steps:[
        '후보: 중점 3개. 레이블 경계는 '+v[1]+'과 '+v[2]+' 사이 → 문턱 '+th,
        '그 분할은 완전 순수 → IG = H(2,2)−0 = 1비트',
        '(연속 특징 = 정렬 후 경계 중점만 검사)' ] }; },
    hints:['레이블이 바뀌는 곳.'] },
  { id:'u4-l2-07', level:2, type:'num', tags:['불확실성 감소율'], src:'창작 문제(검산됨)',
    params:{ H0:{choices:[1,0.97]}, H1:{choices:[0.4,0.6]} },
    statement:function(p){ return '분할 전 H='+p.H0+', 후 가중 H='+p.H1+'비트. IG와 감소율(%)을 구하라.'; },
    solve:function(p){ return { ans:{IG:p.H0-p.H1, pct:(p.H0-p.H1)/p.H0*100}, unit:{IG:'비트', pct:'%'}, steps:[
        'IG = '+SVH.fmt(p.H0-p.H1),
        '감소율 '+SVH.fmt((p.H0-p.H1)/p.H0*100)+'%' ] }; },
    hints:['차와 비율.'] },
  { id:'u4-l2-08', level:2, type:'num', tags:['트리 크기'], src:'창작 문제(검산됨)',
    params:{ d:{choices:[3,5]} },
    statement:function(p){ return '깊이 '+p.d+'의 완전 이진 트리: (a) 잎 수 (b) 내부 노드 수를 구하라.'; },
    solve:function(p){ return { ans:{leaf:Math.pow(2,p.d), inner:Math.pow(2,p.d)-1}, unit:{leaf:'개', inner:'개'}, steps:[
        '잎 2^'+p.d+' = '+Math.pow(2,p.d)+', 내부 2^'+p.d+'−1',
        '(깊이 1 증가 = 용량 2배 — 과적합 다이얼)' ] }; },
    hints:['2^d.'] },
  { id:'u4-l2-09', level:2, type:'num', tags:['3클래스 엔트로피'], src:'창작 문제(검산됨)',
    params:{ c:{choices:[[4,2,2],[6,1,1]]} },
    statement:function(p){ var c=p.c; return '클래스 분포 ['+c.join(', ')+']의 엔트로피(비트)를 구하라.'; },
    solve:function(p){
      var c=p.c, t=c[0]+c[1]+c[2], H=0;
      for(var i=0;i<3;i++){ var x=c[i]/t; if(x>0) H-=x*Math.log2(x); }
      return { ans:H, unit:'비트', steps:[
        '비율 ['+SVH.fmt(c[0]/t)+', '+SVH.fmt(c[1]/t)+', '+SVH.fmt(c[2]/t)+']',
        'H = '+SVH.fmt(H)+' (최대 log₂3=1.585와 비교)' ] }; },
    hints:['항 3개 합.'] },
  { id:'u4-l2-10', level:2, type:'num', tags:['규칙 추출'], src:'창작 문제(검산됨)',
    params:{ leaves:{choices:[4,6]} },
    statement:function(p){ return '잎이 '+p.leaves+'개인 트리에서 추출되는 if-then 규칙 수와, 각 규칙의 형태(경로의 AND=1)를 답하라.'; },
    solve:function(p){ return { ans:{rules:p.leaves, form:1}, unit:{rules:'개', form:''}, steps:[
        '규칙 = 잎 수 = '+p.leaves,
        '각 규칙 = 뿌리→잎 조건들의 연언(1) — 트리=해석 가능한 모델인 이유' ] }; },
    hints:['잎=규칙.'] },
  { id:'u4-l2-11', level:2, type:'num', tags:['완벽 분할 특징'], src:'기출 유형',
    params:{ N:{choices:[8,14]} },
    statement:function(p){ return 'ID(고유번호) 특징으로 N='+p.N+' 샘플을 나누면 (a) IG (b) SplitInfo (c) 이득비를 구하라. (부모 H=1 가정)'; },
    solve:function(p){
      var SI=Math.log2(p.N);
      return { ans:{IG:1, SI:SI, GR:1/SI}, unit:{IG:'비트', SI:'비트', GR:''}, steps:[
        'IG = 1(완전 순수) — 그러나!',
        'SplitInfo = log₂'+p.N+' = '+SVH.fmt(SI)+' → 이득비 = '+SVH.fmt(1/SI),
        '(이득비가 학번의 사기극을 적발한다)' ] }; },
    hints:['벌점의 실연.'] },
  { id:'u4-l2-12', level:2, type:'num', tags:['가지 순수도'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[[5,1],[7,1]]} },
    statement:function(p){ var a=p.a; return '가지 ['+a[0]+'+,'+a[1]+'−]의 (a) 다수결 예측 정확도(%) (b) 엔트로피(비트)를 구하라.'; },
    solve:function(p){
      var a=p.a, t=a[0]+a[1];
      var x=a[0]/t, y=a[1]/t;
      var H=-x*Math.log2(x)-y*Math.log2(y);
      return { ans:{acc:x*100, H:H}, unit:{acc:'%', H:'비트'}, steps:[
        '다수결 = '+SVH.fmt(x*100)+'%',
        'H = '+SVH.fmt(H)+' (정확도와 엔트로피는 반대로 움직인다)' ] }; },
    hints:['다수/전체.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u4-l3-01', level:3, type:'num', tags:['날씨 데이터 1단계'], src:'교재 표준',
    params:{ variant:{choices:[1,2]} },
    statement:function(p){ return '미첼 스타일 [9+,5−]: 특징 "바람"으로 약함 [6+,2−]/강함 [3+,3−] 분할. IG(바람)을 구하라.'; },
    solve:function(p){
      function H(a,b){ var t=a+b, x=a/t, y=b/t;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      var Hp=H(9,5);
      var IG=Hp-(8*H(6,2)+6*H(3,3))/14;
      return { ans:IG, unit:'비트', steps:[
        'H(9,5) = '+SVH.fmt(Hp),
        'IG = '+SVH.fmt(Hp)+' − [8/14·'+SVH.fmt(H(6,2))+' + 6/14·1] = '+SVH.fmt(IG),
        '(교과서 0.048의 그 계산 — 손으로 재현할 수 있어야 한다)' ] }; },
    hints:['H(6,2)=0.811.'] },
  { id:'u4-l3-02', level:3, type:'num', tags:['습도 vs 바람'], src:'교재 표준',
    params:{ variant:{choices:[1,2]} },
    statement:function(p){ return '같은 [9+,5−]에서 "습도": 높음 [3+,4−]/보통 [6+,1−]. IG(습도)를 구하고 l3-01의 IG(바람)과 비교해 승자를 답하라(습도=1).'; },
    solve:function(p){
      function H(a,b){ var t=a+b, x=a/t, y=b/t;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      var Hp=H(9,5);
      var IG=Hp-(7*H(3,4)+7*H(6,1))/14;
      return { ans:{IG:IG, win:1}, unit:{IG:'비트', win:''}, steps:[
        'IG(습도) = '+SVH.fmt(Hp)+' − [7/14·'+SVH.fmt(H(3,4))+'+7/14·'+SVH.fmt(H(6,1))+'] = '+SVH.fmt(IG),
        '> IG(바람) → 습도 승(1) (0.151 vs 0.048 — 교과서 수치)' ] }; },
    hints:['가중 절반씩.'] },
  { id:'u4-l3-03', level:3, type:'num', tags:['2단계 재귀'], src:'기출 유형',
    params:{ variant:{choices:[1,2]} },
    statement:function(p){ return '뿌리 분할 후 한 가지가 [3+,3−]가 됐다. 그 안에서 특징 C: [3+,0−]/[0+,3−] 분할. (a) 이 노드의 IG (b) 분할 후 이 가지 최종 잎 상태(순수=1)를 답하라.'; },
    solve:function(p){ return { ans:{IG:1, pure:1}, unit:{IG:'비트', pure:''}, steps:[
        '노드 H=1(반반) → 완전 분리 → IG = 1',
        '두 잎 모두 순수(1) → 이 가지 재귀 종료',
        '(재귀 = 같은 계산을 부분집합에 반복)' ] }; },
    hints:['부분집합에서 다시 시작.'] },
  { id:'u4-l3-04', level:3, type:'num', tags:['조건부 엔트로피 표'], src:'기출 유형',
    params:{ t:{choices:[[4,1,1,4],[3,2,1,4]]} },
    statement:function(p){ var t=p.t; return '결합 분포(개수): (A=0,y=+)='+t[0]+', (0,−)='+t[1]+', (1,+)='+t[2]+', (1,−)='+t[3]+'. H(y|A)를 구하라.'; },
    solve:function(p){
      function H(a,b){ var tt=a+b; if(!tt) return 0; var x=a/tt,y=b/tt;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      var t=p.t, N=t[0]+t[1]+t[2]+t[3];
      var Hc=((t[0]+t[1])*H(t[0],t[1])+(t[2]+t[3])*H(t[2],t[3]))/N;
      return { ans:Hc, unit:'비트', steps:[
        'A=0 가지 H('+t[0]+','+t[1]+')='+SVH.fmt(H(t[0],t[1]))+', A=1 가지 H('+t[2]+','+t[3]+')='+SVH.fmt(H(t[2],t[3])),
        'H(y|A) = 가중합 = '+SVH.fmt(Hc)+' (IG = H(y)−이 값)' ] }; },
    hints:['가지별 H 가중.'] },
  { id:'u4-l3-05', level:3, type:'num', tags:['상호정보=IG'], src:'교재 표준',
    params:{ t:{choices:[[4,1,1,4],[5,0,2,3]]} },
    statement:function(p){ var t=p.t; return '위와 같은 표(개수 '+t.join(',')+')에서 H(y)와 IG=H(y)−H(y|A)를 구하라.'; },
    solve:function(p){
      function H(a,b){ var tt=a+b; if(!tt) return 0; var x=a/tt,y=b/tt;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      var t=p.t, N=t[0]+t[1]+t[2]+t[3];
      var Hy=H(t[0]+t[2],t[1]+t[3]);
      var Hc=((t[0]+t[1])*H(t[0],t[1])+(t[2]+t[3])*H(t[2],t[3]))/N;
      return { ans:{Hy:Hy, IG:Hy-Hc}, unit:{Hy:'비트', IG:'비트'}, steps:[
        'H(y) = H('+(t[0]+t[2])+','+(t[1]+t[3])+') = '+SVH.fmt(Hy),
        'IG = '+SVH.fmt(Hy-Hc)+' — 상호정보 I(y;A)와 같은 양(정보이론과의 연결)' ] }; },
    hints:['주변 분포부터.'] },
  { id:'u4-l3-06', level:3, type:'num', tags:['연속 특징 전체 스캔'], src:'기출 유형',
    params:{ lab:{choices:[[0,0,1,0,1,1],[0,1,0,1,1,1]]} },
    statement:function(p){ var l=p.lab; return '정렬된 값 [10,20,30,40,50,60], 레이블 ['+l.join(',')+'] (1=+). 최적 문턱(중점)과 그 IG를 구하라. (경계 후보만 검사)'; },
    solve:function(p){
      function H(a,b){ var t=a+b; if(!t) return 0; var x=a/t,y=b/t;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      var l=p.lab, vals=[10,20,30,40,50,60];
      var P=l.reduce((a,b)=>a+b,0), N=6-P;
      var Hp=H(P,N), best=0, bth=0;
      for(var i=0;i<5;i++){
        if(l[i]===l[i+1]) continue;
        var lp=0,ln=0;
        for(var j=0;j<=i;j++){ if(l[j])lp++; else ln++; }
        var ig=Hp-((i+1)*H(lp,ln)+(5-i)*H(P-lp,N-ln))/6;
        if(ig>best){ best=ig; bth=(vals[i]+vals[i+1])/2; }
      }
      return { ans:{th:bth, IG:best}, unit:{th:'', IG:'비트'}, steps:[
        '레이블 경계마다 IG 계산 → 최적 문턱 '+bth,
        'IG = '+SVH.fmt(best)+' (경계 아닌 중점은 검사 불필요 — 정리로 보장)' ] }; },
    hints:['경계만 후보.'] },
  { id:'u4-l3-07', level:3, type:'num', tags:['이득비 비교'], src:'기출 유형',
    params:{ igA:{choices:[0.4,0.5]}, kA:{choices:[2]}, igB:{choices:[0.6,0.7]}, kB:{choices:[8,16]} },
    statement:function(p){ return 'A: IG='+p.igA+'(2지 균등), B: IG='+p.igB+'('+p.kB+'지 균등). 이득비로 승자를 정하라(A=1/B=2).'; },
    solve:function(p){
      var grA=p.igA/1, grB=p.igB/Math.log2(p.kB);
      return { ans:{grA:grA, grB:grB, pick:grA>=grB?1:2}, unit:{grA:'', grB:'', pick:''}, steps:[
        'GR(A) = '+p.igA+'/1 = '+SVH.fmt(grA)+', GR(B) = '+p.igB+'/'+SVH.fmt(Math.log2(p.kB))+' = '+SVH.fmt(grB),
        '승자 = '+(grA>=grB?'A(1)':'B(2)')+' — IG로는 B였는데 역전'+(grA>=grB?'!':'?'),
        '(C4.5가 ID3와 다른 선택을 하는 지점)' ] }; },
    hints:['SI로 나누고 비교.'] },
  { id:'u4-l3-08', level:3, type:'num', tags:['불순도 0.5 근사'], src:'창작 문제(검산됨)',
    params:{ p:{choices:[0.6,0.8,0.9]} },
    statement:function(p){ return 'p='+p.p+'에서 (a) 엔트로피 (b) 2p(1−p)(지니, U5 예고) (c) 오분류율 min(p,1−p)를 구해 세 불순도를 비교하라.'; },
    solve:function(p){
      var H=-p.p*Math.log2(p.p)-(1-p.p)*Math.log2(1-p.p);
      return { ans:{H:H, gini:2*p.p*(1-p.p), err:Math.min(p.p,1-p.p)}, unit:{H:'',gini:'',err:''}, steps:[
        'H='+SVH.fmt(H)+', Gini='+SVH.fmt(2*p.p*(1-p.p))+', Err='+SVH.fmt(Math.min(p.p,1-p.p)),
        '(모두 p=0.5 최대·0/1에서 0 — 곡률만 다르다)' ] }; },
    hints:['세 공식 대입.'] },
  { id:'u4-l3-09', level:3, type:'num', tags:['IG=0 함정'], src:'교재 표준',
    params:{ variant:{choices:[1,2]} },
    statement:function(p){ return 'XOR 데이터(4점, x₁·x₂ 각각 반반): 단일 특징 x₁의 IG를 구하라. IG=0인데 x₁이 "무용한" 특징인가(아님=0)?'; },
    solve:function(p){ return { ans:{IG:0, useless:0}, unit:{IG:'비트', useless:''}, steps:[
        'x₁=0 가지 [1+,1−], x₁=1 가지 [1+,1−] → 자식 H=1 → IG=0',
        '그러나 x₂와 "함께"면 완전 분리 — 탐욕 IG의 맹점(0)',
        '(그래도 트리는 일단 나누면 다음 층에서 해결 — 시작 특징만 임의)' ] }; },
    hints:['상호작용 특징.'] },
  { id:'u4-l3-10', level:3, type:'num', tags:['가중 IG(비용)'], src:'창작 문제(검산됨)',
    params:{ ig:{choices:[0.3,0.5]}, cost:{choices:[4,9]} },
    statement:function(p){ return '측정 비용이 있는 특징 선택: 비용 고려 점수 IG²/cost (Tan 방식 유사)로, IG='+p.ig+'·비용 '+p.cost+'인 특징과 IG=0.2·비용 1인 특징 중 승자를 정하라(비싼 쪽=1/싼 쪽=2).'; },
    solve:function(p){
      var s1=p.ig*p.ig/p.cost, s2=0.04;
      return { ans:{s1:s1, s2:s2, pick:s1>=s2?1:2}, unit:{s1:'', s2:'', pick:''}, steps:[
        '점수: '+SVH.fmt(s1)+' vs '+SVH.fmt(s2),
        '승자 '+(s1>=s2?'비싼 특징(1)':'싼 특징(2)')+' (의료 진단 트리의 실제 고려)' ] }; },
    hints:['IG²/비용.'] },
  { id:'u4-l3-11', level:3, type:'num', tags:['결측 분수 전파'], src:'교재 표준',
    params:{ n0:{choices:[6,8]}, n1:{choices:[2,4]} },
    statement:function(p){ return 'C4.5 결측 처리: 특징 A가 결측인 샘플 1개를 A=0 가지('+p.n0+'개)·A=1 가지('+p.n1+'개)에 비례 분배하면 각 가지로 가는 분수 가중치를 구하라.'; },
    solve:function(p){
      var t=p.n0+p.n1;
      return { ans:{w0:p.n0/t, w1:p.n1/t}, unit:{w0:'', w1:''}, steps:[
        'w = 가지 비율: '+SVH.fmt(p.n0/t)+' / '+SVH.fmt(p.n1/t),
        '(샘플이 쪼개져 흐른다 — 결측을 버리지 않는 우아한 처리)' ] }; },
    hints:['관측된 비율.'] },
  { id:'u4-l3-12', level:3, type:'num', tags:['트리 깊이와 데이터'], src:'창작 문제(검산됨)',
    params:{ N:{choices:[1000,10000]}, m:{choices:[5,20]} },
    statement:function(p){ return '잎당 최소 샘플 '+p.m+'개 제약에서 N='+p.N+'일 때 (a) 최대 잎 수 (b) 최대 깊이(완전 이진 가정, log₂)를 구하라.'; },
    solve:function(p){
      var L=Math.floor(p.N/p.m);
      return { ans:{L:L, d:Math.floor(Math.log2(L))}, unit:{L:'개', d:''}, steps:[
        '잎 ≤ N/m = '+L,
        '깊이 ≤ log₂'+L+' ≈ '+Math.floor(Math.log2(L))+' (규제 하이퍼파라미터의 산수)' ] }; },
    hints:['나눗셈+log.'] },
  { id:'u4-l3-13', level:3, type:'num', tags:['축평행 한계'], src:'교재 표준',
    params:{ variant:{choices:[1,2]} },
    statement:function(p){ return '대각선 경계(y=x)를 축평행 분할로 근사: 계단 '+ (p.variant===1?4:8) +'단이면 분할(내부 노드) 최소 몇 개가 필요한가?'; },
    solve:function(p){
      var k=p.variant===1?4:8;
      return { ans:2*k-1, unit:'개', steps:[
        '계단 1단마다 x·y 분할 교대 → 약 2k−1 = '+(2*k-1)+'개',
        '(선형 모델이면 1개 경계 — 모델과 문제의 "결" 맞춤 이야기)' ] }; },
    hints:['계단 세기.'] },
  { id:'u4-l3-14', level:3, type:'num', tags:['범주 병합'], src:'교재 표준',
    params:{ g:{choices:[[5,0],[4,1]]} },
    statement:function(p){ var g=p.g; return '3값 특징의 두 값이 각각 ['+g[0]+'+,'+g[1]+'−], ['+g[0]+'+,'+g[1]+'−]로 분포가 동일하다. 병합하면 (a) IG 변화(불변=0) (b) SplitInfo 변화(감소=−1) — 이득비에 유리한가(1)?'; },
    solve:function(p){ return { ans:{dIG:0, dSI:-1, better:1}, unit:{dIG:'', dSI:'', better:''}, steps:[
        '같은 분포 병합 → 자식 가중 H 불변 → IG 불변(0)',
        '가지 수↓ → SI 감소(−1) → 이득비 상승(1)',
        '(CART가 이진 분할을 고집하는 이유의 한 조각)' ] }; },
    hints:['동일 분포 합치기.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u4-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ IG는 상호정보 I(y;A)와 같다<br>㉡ 값이 많은 특징의 IG 편향은 이득비로 완화한다<br>㉢ 연속 특징 최적 문턱은 레이블 경계 중점만 검사하면 된다<br>㉣ IG=0인 특징도 상호작용으로 유용할 수 있다(XOR)',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — U4의 요약 4행시.' },
  { id:'u4-l4-02', level:4, type:'num', tags:['뿌리 선택 풀계산'], src:'기출 유형',
    params:{ hum:{choices:[[3,4,6,1]]}, wind:{choices:[[6,2,3,3]]} },
    statement:function(p){ return '[9+,5−]에서 습도 [3+,4−]/[6+,1−] vs 바람 [6+,2−]/[3+,3−] vs 온도 3지 [2+,2−]/[4+,2−]/[3+,1−]. 세 IG를 모두 구해 뿌리를 정하라(습도=1/바람=2/온도=3).'; },
    solve:function(p){
      function H(a,b){ var t=a+b; if(!t) return 0; var x=a/t,y=b/t;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      var Hp=H(9,5);
      var igH=Hp-(7*H(3,4)+7*H(6,1))/14;
      var igW=Hp-(8*H(6,2)+6*H(3,3))/14;
      var igT=Hp-(4*H(2,2)+6*H(4,2)+4*H(3,1))/14;
      var best=igH>=igW&&igH>=igT?1:(igW>=igT?2:3);
      return { ans:{igH:igH, igW:igW, igT:igT, root:best}, unit:{igH:'',igW:'',igT:'',root:''}, steps:[
        'IG: 습도 '+SVH.fmt(igH)+' · 바람 '+SVH.fmt(igW)+' · 온도 '+SVH.fmt(igT),
        '뿌리 = '+(best===1?'습도':best===2?'바람':'온도'),
        '(시험 계산형의 최대어 — 표를 그려 가중 H를 정리하며)' ] }; },
    hints:['H표 만들고 가중.'] },
  { id:'u4-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'이진 엔트로피 H(p)가 p=1/2에서 유일 최대(1비트)임을 미분으로 증명하라.',
    steps:[
      'H(p)=−p·log₂p−(1−p)log₂(1−p) [왜] 정의에서 출발',
      "H'(p)=log₂((1−p)/p) — ln2 소거 확인",
      "H'=0 ⇔ (1−p)/p=1 ⇔ p=1/2, H''=−1/[p(1−p)ln2]<0 → 오목·유일 최대",
      'H(1/2)=1비트 · 경계 H(0)=H(1)=0 (0log0≡0 규약)',
      '극한 체크: 오목성 → 분할의 가중평균 H ≤ 부모 H가 항상 성립(IG≥0의 이유) ✓'
    ],
    hints:['미분에서 log비.','오목성이 IG≥0을 준다.'],
    expl:'IG가 음수가 될 수 없는 이유까지 잇는 것이 만점 답안.' },
  { id:'u4-l4-04', level:4, type:'num', tags:['통신 해석'], src:'기출 유형',
    params:{ p:{choices:[0.1,0.25]} },
    statement:function(p){ return '레이블 분포 p='+p.p+'인 데이터 N=1000개의 레이블 전체를 전송하는 최소 기대 비트(엔트로피 부호화)를 구하라. 균등(0.5)이면 몇 비트인가?'; },
    solve:function(p){
      var H=-p.p*Math.log2(p.p)-(1-p.p)*Math.log2(1-p.p);
      return { ans:{bits:1000*H, uni:1000}, unit:{bits:'비트', uni:'비트'}, steps:[
        'H = '+SVH.fmt(H)+' 비트/샘플 → '+SVH.fmt(1000*H)+' 비트',
        '균등이면 1000비트 — 엔트로피=압축 한계(Shannon), IG=질문의 정보량',
        '(트리 = 스무고개 최적화라는 관점)' ] }; },
    hints:['N×H.'] },
  { id:'u4-l4-05', level:4, type:'num', tags:['다지 vs 이진 실험'], src:'기출 유형',
    params:{ k:{choices:[4,8]} },
    statement:function(p){ return 'k='+p.k+'값 특징(균등)을 (a) k지 분할 (b) 이진 그룹 분할(반반 병합)로 나눌 때 SplitInfo를 각각 구하고, 같은 IG=0.5라면 이득비 우세 쪽(이진=2)을 답하라.'; },
    solve:function(p){
      return { ans:{SIk:Math.log2(p.k), SI2:1, pick:2}, unit:{SIk:'비트', SI2:'비트', pick:''}, steps:[
        'k지: log₂'+p.k+' = '+SVH.fmt(Math.log2(p.k))+', 이진: 1',
        '같은 IG → 이득비는 이진 승(2)',
        '(트리가 뚱뚱해지는 것보다 깊어지는 것을 선호하는 설계 철학)' ] }; },
    hints:['SI 비교.'] },
  { id:'u4-l4-06', level:4, type:'num', tags:['희귀 클래스 분할'], src:'기출 유형',
    params:{ P:{choices:[10,20]}, N:{choices:[90,180]} },
    statement:function(p){ return '[+'+p.P+', −'+p.N+'] 데이터: (a) H(부모) (b) 어떤 분할이 [+'+p.P+', −0]/[+0, −'+p.N+']을 만들면 IG는? (c) 다수결만으로도 정확도가 이미 높은데 왜 이 분할이 가치 있는가(재현율 개선=1)?'; },
    solve:function(p){
      var t=p.P+p.N, x=p.P/t, y=p.N/t;
      var H=-x*Math.log2(x)-y*Math.log2(y);
      return { ans:{H:H, IG:H, why:1}, unit:{H:'비트', IG:'비트', why:''}, steps:[
        'H = '+SVH.fmt(H)+' (불균형이라 작다)',
        '완전 분리 → IG = H 전부 = '+SVH.fmt(H),
        '정확도는 이미 '+SVH.fmt(y*100)+'%였지만 재현율 0→100(1) — U3 지표와의 연결' ] }; },
    hints:['IG 최대=부모 H.'] },
  { id:'u4-l4-07', level:4, type:'num', tags:['스무고개 설계'], src:'기출 유형',
    params:{ n:{choices:[64,100]} },
    statement:function(p){ return p.n+'명 중 1명 맞히기: (a) 이상적 예/아니오 질문 수 (b) "특정인인가?" 식 질문의 기대 IG(첫 질문, 비트)를 구해 반반 질문과 비교하라.'; },
    solve:function(p){
      var q=Math.ceil(Math.log2(p.n));
      var pp=1/p.n;
      var Hq=-pp*Math.log2(pp)-(1-pp)*Math.log2(1-pp);
      return { ans:{q:q, IGone:Hq}, unit:{q:'개', IGone:'비트'}, steps:[
        '최적 = ⌈log₂'+p.n+'⌉ = '+q+'개 (매번 1비트)',
        '"특정인?" IG = H(1/'+p.n+') = '+SVH.fmt(Hq)+' 비트 ≪ 1',
        '(균형 분할=최대 정보 — ID3의 직관을 게임으로)' ] }; },
    hints:['반반의 힘.'] },
  { id:'u4-l4-08', level:4, type:'num', tags:['기출 리허설 풀코스'], src:'기출 유형',
    params:{ d:{choices:[[3,1,2,4],[4,0,1,5]]} },
    statement:function(p){ var d=p.d; return '10샘플 [+'+(d[0]+d[2])+', −'+(d[1]+d[3])+']: 특징 A로 ['+d[0]+'+,'+d[1]+'−]/['+d[2]+'+,'+d[3]+'−]. (a) H(부모) (b) H(y|A) (c) IG (d) SplitInfo (e) 이득비를 구하라.'; },
    solve:function(p){
      function H(a,b){ var t=a+b; if(!t) return 0; var x=a/t,y=b/t;
        return (x>0?-x*Math.log2(x):0)+(y>0?-y*Math.log2(y):0); }
      var d=p.d, N=10;
      var Hp=H(d[0]+d[2],d[1]+d[3]);
      var n1=d[0]+d[1], n2=d[2]+d[3];
      var Hc=(n1*H(d[0],d[1])+n2*H(d[2],d[3]))/N;
      var SI=H(n1,n2);
      return { ans:{Hp:Hp, Hc:Hc, IG:Hp-Hc, SI:SI, GR:(Hp-Hc)/SI}, unit:{Hp:'',Hc:'',IG:'',SI:'',GR:''}, steps:[
        'H(부모)='+SVH.fmt(Hp)+', H(y|A)='+SVH.fmt(Hc),
        'IG='+SVH.fmt(Hp-Hc)+', SI=H('+n1+','+n2+')='+SVH.fmt(SI),
        'GR = '+SVH.fmt((Hp-Hc)/SI)+' — 5량 한 세트, 시험 그대로' ] }; },
    hints:['다섯 값 순서대로.'] }
  ]
});
