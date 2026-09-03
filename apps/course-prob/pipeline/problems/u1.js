/* U1 확률 리뷰와 확률과정 입문 — 공리·조건부·베이즈·기대/분산·주요 분포·{X(t)} 정의와 2×2 구분 (W1 + 선수 리뷰) */
SV_BANK.push({
  id: 'u1', no: 1, title: '확률 리뷰·확률과정 입문', titleEn: 'Probability Review & Intro to Stochastic Processes',
  scope: '확률 공리 · 조건부확률 · 전확률·베이즈 · 기댓값·분산·공분산 · 이항·기하·포아송·균등·지수 · 확률과정 {X(t)} 정의 · 상태공간×시간지표 2×2 구분 · 표본경로',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u1-l1-01', level:1, type:'mc', tags:['확률과정 정의'], src:'강의자료 대조',
    statement:'확률과정 \\(\\{X(t),\\ t\\in T\\}\\)의 올바른 정의는?',
    choices:['시간 지표 t로 매개된 확률변수들의 족(family) — 각 t마다 X(t)가 확률변수','하나의 확률변수','시간의 결정적 함수','확률이 시간에 따라 변하지 않는 상수'],
    answer:0, expl:'"시간 축 위에 늘어선 확률변수들". 실험을 한 번 하면 시간 함수 하나(표본경로)가 뽑힌다 — 확률변수의 값이 숫자였다면, 확률과정의 값은 함수다.' },
  { id:'u1-l1-02', level:1, type:'mc', tags:['2×2 구분'], src:'강의자료 대조',
    statement:'상태공간(이산/연속)×시간지표(이산/연속) 2×2 구분에서 짝이 옳은 것은?',
    choices:['매 슬롯 도착 패킷 수=이산상태·이산시간, 시각 t의 대기 인원=이산상태·연속시간','시각 t의 온도=이산상태·이산시간','매일 주가 종가=연속시간','대기 인원=연속상태'],
    answer:0, expl:'구분 기준 두 개를 독립으로 묻는다: 값이 셀 수 있나(상태), 관측 시점이 셀 수 있나(시간). 포아송과정은 이산상태·연속시간의 대표.' },
  { id:'u1-l1-03', level:1, type:'tf', tags:['표본경로'], src:'교재 표준',
    statement:'확률과정에서 실험을 한 번 수행해 얻는 결과는 숫자 하나가 아니라 시간의 함수 하나(표본경로, sample path)다.',
    answer:true, expl:'주사위(확률변수)는 한 번 던지면 숫자, 확률과정은 한 번 "돌리면" 궤적. 같은 과정을 다시 돌리면 다른 경로가 나온다.' },
  { id:'u1-l1-04', level:1, type:'mc', tags:['조건부확률'], src:'교재 표준',
    statement:'조건부확률의 정의로 옳은 것은? (P(B)>0)',
    choices:['\\(P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}\\)','P(A)+P(B)','P(A∩B)·P(B)','P(A)/P(B)'],
    answer:0, expl:'"B가 일어난 세계로 우주를 줄이고 그 안에서 A의 비중을 재라". 마르코프 연쇄(U6)의 전이확률이 전부 이 정의 위에 선다.' },
  { id:'u1-l1-05', level:1, type:'tf', tags:['독립'], src:'교재 표준',
    statement:'두 사건이 독립이면 \\(P(A\\cap B)=P(A)P(B)\\)이고, 이때 \\(P(A\\mid B)=P(A)\\)다.',
    answer:true, expl:'"B를 알아도 A에 대한 정보가 갱신되지 않는다"의 수식 번역. 포아송과정의 독립 증분(U3)이 이 성질의 과정 버전이다.' },
  { id:'u1-l1-06', level:1, type:'mc', tags:['분산 성질'], src:'교재 표준',
    statement:'\\(\\mathrm{Var}(aX+b)\\)는?',
    choices:['\\(a^2\\,\\mathrm{Var}(X)\\)','a·Var(X)','a²Var(X)+b','Var(X)+b'],
    answer:0, expl:'평행이동 b는 퍼짐을 못 바꾸고, 배율 a는 제곱으로 들어간다(분산은 제곱 스케일). 표준편차로는 |a|배.' },

  /* ---------- L2 (12) ---------- */
  { id:'u1-l2-01', level:2, type:'num', tags:['합사건'], src:'창작 문제(검산됨)',
    params:{ pA:{choices:[0.3,0.4,0.5],unit:''}, pB:{choices:[0.2,0.3],unit:''}, pAB:{choices:[0.05,0.1],unit:''} },
    statement:function(p){ return 'P(A)='+p.pA+', P(B)='+p.pB+', P(A∩B)='+p.pAB+'일 때 P(A∪B)는?'; },
    solve:function(p){ var v=p.pA+p.pB-p.pAB;
      return { ans:v, unit:'', steps:[
        '포함–배제: P(A∪B) = P(A)+P(B)−P(A∩B) (겹친 부분을 한 번 빼준다)',
        '= '+p.pA+'+'+p.pB+'−'+p.pAB+' = '+SVH.fmt(v) ] }; },
    hints:['겹침을 두 번 세지 않기.'] },
  { id:'u1-l2-02', level:2, type:'num', tags:['조건부'], src:'창작 문제(검산됨)',
    params:{ pAB:{choices:[0.06,0.12,0.2],unit:''}, pB:{choices:[0.3,0.4],unit:''} },
    statement:function(p){ return 'P(A∩B)='+p.pAB+', P(B)='+p.pB+'일 때 P(A|B)는?'; },
    solve:function(p){ var v=p.pAB/p.pB;
      return { ans:v, unit:'', steps:[
        'P(A|B) = P(A∩B)/P(B)',
        '= '+p.pAB+'/'+p.pB+' = '+SVH.fmt(v)+' — 우주를 B로 줄인 뒤의 비중' ] }; },
    hints:['정의 그대로.'] },
  { id:'u1-l2-03', level:2, type:'num', tags:['전확률'], src:'창작 문제(검산됨)',
    params:{ w:{choices:[0.2,0.3,0.5],unit:''}, a:{choices:[0.8,0.9],unit:''}, b:{choices:[0.1,0.2,0.3],unit:''} },
    statement:function(p){ return '공장 1(비중 '+p.w+', 양품률 '+p.a+')과 공장 2(비중 '+(1-p.w).toFixed(1)+', 양품률 '+p.b+'). 임의 제품이 양품일 확률은?'; },
    solve:function(p){ var v=p.w*p.a+(1-p.w)*p.b;
      return { ans:v, unit:'', steps:[
        '전확률: P(양품) = P(공장1)P(양품|1)+P(공장2)P(양품|2)',
        '= '+p.w+'×'+p.a+'+'+SVH.fmt(1-p.w)+'×'+p.b+' = '+SVH.fmt(v)+' — 시나리오별 가중평균' ] }; },
    hints:['분할 × 조건부 → 합.'] },
  { id:'u1-l2-04', level:2, type:'num', tags:['베이즈'], src:'창작 문제(검산됨)',
    params:{ w:{choices:[0.2,0.3,0.5],unit:''}, a:{choices:[0.8,0.9],unit:''}, b:{choices:[0.1,0.2,0.3],unit:''} },
    statement:function(p){ return '위와 같은 두 공장. 양품이 관측됐을 때 그것이 공장 1 제품일 확률(사후확률)은?'; },
    solve:function(p){ var v=p.w*p.a/(p.w*p.a+(1-p.w)*p.b);
      return { ans:v, unit:'', steps:[
        '베이즈: P(1|양품) = P(1)P(양품|1) / P(양품)',
        '= '+SVH.fmt(p.w*p.a)+'/'+SVH.fmt(p.w*p.a+(1-p.w)*p.b)+' = '+SVH.fmt(v)+' — 관측이 사전확률 '+p.w+'을 갱신했다' ] }; },
    hints:['분모는 전확률(앞 문제).'] },
  { id:'u1-l2-05', level:2, type:'num', tags:['기댓값'], src:'창작 문제(검산됨)',
    params:{ x1:{choices:[0,1],unit:''}, x2:{choices:[2,3],unit:''}, x3:{choices:[5,10],unit:''}, p1:{choices:[0.2,0.5],unit:''}, p2:{choices:[0.3,0.4],unit:''} },
    constraint:function(p){ return p.p1+p.p2 < 0.95; },
    statement:function(p){ return 'X가 '+p.x1+'('+p.p1+'), '+p.x2+'('+p.p2+'), '+p.x3+'('+SVH.fmt(1-p.p1-p.p2)+')의 분포를 가진다. E[X]는?'; },
    solve:function(p){ var p3=1-p.p1-p.p2, v=p.x1*p.p1+p.x2*p.p2+p.x3*p3;
      return { ans:v, unit:'', steps:[
        'E[X] = Σx·p(x) = '+p.x1+'×'+p.p1+'+'+p.x2+'×'+p.p2+'+'+p.x3+'×'+SVH.fmt(p3),
        '= '+SVH.fmt(v)+' — 확률 가중 무게중심' ] }; },
    hints:['세 번째 확률은 1−나머지.'] },
  { id:'u1-l2-06', level:2, type:'num', tags:['분산'], src:'창작 문제(검산됨)',
    params:{ x1:{choices:[0,1],unit:''}, x2:{choices:[2,4],unit:''}, p1:{choices:[0.3,0.5,0.7],unit:''} },
    statement:function(p){ return 'X가 '+p.x1+'(확률 '+p.p1+'), '+p.x2+'(확률 '+SVH.fmt(1-p.p1)+') 두 값을 가진다. E[X]와 Var(X)를 구하라.'; },
    solve:function(p){ var q=1-p.p1, E=p.x1*p.p1+p.x2*q, E2=p.x1*p.x1*p.p1+p.x2*p.x2*q, V=E2-E*E;
      return { ans:{EX:E, VX:V}, unit:{EX:'', VX:''}, steps:[
        'E[X] = '+SVH.fmt(E)+', E[X²] = '+SVH.fmt(E2),
        'Var = E[X²]−(E[X])² = '+SVH.fmt(E2)+'−'+SVH.fmt(E*E)+' = '+SVH.fmt(V)+' — 계산은 언제나 이 지름길로' ] }; },
    hints:['정의식보다 E[X²]−E[X]²이 빠르다.'] },
  { id:'u1-l2-07', level:2, type:'num', tags:['이항분포'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[4,5,6],unit:''}, k:{choices:[1,2,3],unit:''}, pr:{choices:[0.2,0.3,0.5],unit:''} },
    constraint:function(p){ return p.k <= p.n; },
    statement:function(p){ return '성공률 p='+p.pr+'인 시행 n='+p.n+'회에서 정확히 k='+p.k+'회 성공할 확률 \\(\\binom{n}{k}p^k(1-p)^{n-k}\\)은?'; },
    solve:function(p){ var C=1,i; for(i=0;i<p.k;i++){ C=C*(p.n-i)/(i+1); }
      var v=C*Math.pow(p.pr,p.k)*Math.pow(1-p.pr,p.n-p.k);
      return { ans:v, unit:'', steps:[
        'C('+p.n+','+p.k+') = '+SVH.fmt(C)+' — 성공 위치 고르는 경우의 수',
        '× p^k(1−p)^{n−k} = '+SVH.fmt(v) ] }; },
    hints:['조합 × 한 배치의 확률.'] },
  { id:'u1-l2-08', level:2, type:'num', tags:['기하분포'], src:'창작 문제(검산됨)',
    params:{ pr:{choices:[0.1,0.25,0.5],unit:''}, k:{choices:[2,3,4],unit:''} },
    statement:function(p){ return '성공률 p='+p.pr+'. 첫 성공이 k='+p.k+'번째 시행에서 나올 확률과 E[X]=1/p를 구하라.'; },
    solve:function(p){ var v=Math.pow(1-p.pr,p.k-1)*p.pr;
      return { ans:{pk:v, EX:1/p.pr}, unit:{pk:'', EX:'회'}, steps:[
        'P(X='+p.k+') = (1−p)^{k−1}p = '+SVH.fmt(v)+' — 실패 '+(p.k-1)+'번 뒤 성공',
        'E[X] = 1/p = '+SVH.fmt(1/p.pr)+'회 — 지수분포의 이산 쌍둥이(무기억성도 공유)' ] }; },
    hints:['실패^(k−1)×성공.'] },
  { id:'u1-l2-09', level:2, type:'num', tags:['포아송분포'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[1,2,3.5],unit:''}, k:{choices:[0,1,2,3],unit:''} },
    statement:function(p){ return '평균 μ='+p.mu+'인 포아송분포에서 \\(P(X=k)=e^{-\\mu}\\mu^k/k!\\), k='+p.k+'의 값은?'; },
    solve:function(p){ var f=1,i; for(i=2;i<=p.k;i++) f*=i;
      var v=Math.exp(-p.mu)*Math.pow(p.mu,p.k)/f;
      return { ans:v, unit:'', steps:[
        'k! = '+f+', μ^k = '+SVH.fmt(Math.pow(p.mu,p.k)),
        'P = e^{−'+p.mu+'}×'+SVH.fmt(Math.pow(p.mu,p.k))+'/'+f+' = '+SVH.fmt(v)+' — U3 포아송과정의 심장 공식' ] }; },
    hints:['e^{−μ}부터 계산.'] },
  { id:'u1-l2-10', level:2, type:'num', tags:['균등분포'], src:'창작 문제(검산됨)',
    params:{ b:{choices:[4,10,20],unit:''}, c:{choices:[1,2,3],unit:''} },
    constraint:function(p){ return p.c < p.b; },
    statement:function(p){ return 'X~U(0,'+p.b+')일 때 P(X>'+p.c+')와 E[X]를 구하라.'; },
    solve:function(p){ var v=(p.b-p.c)/p.b;
      return { ans:{pv:v, EX:p.b/2}, unit:{pv:'', EX:''}, steps:[
        'P(X>c) = (b−c)/b = '+SVH.fmt(v)+' — 길이의 비',
        'E[X] = b/2 = '+SVH.fmt(p.b/2)+' — U3 조건부 균등성에서 재등장할 분포' ] }; },
    hints:['균등은 길이가 곧 확률.'] },
  { id:'u1-l2-11', level:2, type:'num', tags:['지수 미리보기'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.5,1,2],unit:'/시간'}, t:{choices:[1,2,3],unit:'시간'} },
    statement:function(p){ return 'X~Exp(λ='+p.lam+'/시간)일 때 생존확률 \\(P(X>t)=e^{-\\lambda t}\\), t='+p.t+'시간의 값은?'; },
    solve:function(p){ var v=Math.exp(-p.lam*p.t);
      return { ans:v, unit:'', steps:[
        'P(X>'+p.t+') = e^{−'+p.lam+'×'+p.t+'} = e^{−'+SVH.fmt(p.lam*p.t)+'}',
        '= '+SVH.fmt(v)+' — U2 전체가 이 꼬리 하나에서 나온다' ] }; },
    hints:['지수 생존함수.'] },
  { id:'u1-l2-12', level:2, type:'num', tags:['표준화'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[50,100],unit:''}, sig:{choices:[5,10],unit:''}, x:{choices:[60,110,115],unit:''} },
    statement:function(p){ return '평균 μ='+p.mu+', 표준편차 σ='+p.sig+'인 분포에서 관측값 x='+p.x+'의 표준화 점수 z=(x−μ)/σ는?'; },
    solve:function(p){ var v=(p.x-p.mu)/p.sig;
      return { ans:v, unit:'', steps:[
        'z = ('+p.x+'−'+p.mu+')/'+p.sig,
        '= '+SVH.fmt(v)+' — "평균에서 몇 σ 떨어졌나"의 무차원화(U5 재생 CLT에서 사용)' ] }; },
    hints:['단위를 σ로 바꾸는 것.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u1-l3-01', level:3, type:'num', tags:['베이즈 진단'], src:'기출 유형',
    params:{ pi:{choices:[0.001,0.01,0.1],unit:''}, se:{choices:[0.95,0.99],unit:''}, sp:{choices:[0.9,0.95],unit:''} },
    statement:function(p){ return '유병률 π='+p.pi+', 민감도 '+p.se+', 특이도 '+p.sp+'인 검사에서 양성이 나왔다. 실제 병일 확률(PPV)은?'; },
    solve:function(p){ var v=p.pi*p.se/(p.pi*p.se+(1-p.pi)*(1-p.sp));
      return { ans:v, unit:'', steps:[
        'PPV = πse/(πse+(1−π)(1−sp)) = '+SVH.fmt(p.pi*p.se)+'/'+SVH.fmt(p.pi*p.se+(1-p.pi)*(1-p.sp)),
        '= '+SVH.fmt(v)+' — 희귀병이면 양성이어도 오탐이 다수: 사전확률이 지배한다' ] }; },
    hints:['분모 = 진짜양성+가짜양성.'] },
  { id:'u1-l3-02', level:3, type:'num', tags:['여사건'], src:'창작 문제(검산됨)',
    params:{ pr:{choices:[0.05,0.1,0.2],unit:''}, n:{choices:[3,5,10],unit:''} },
    statement:function(p){ return '각 시행 성공률 p='+p.pr+'인 독립 시행 n='+p.n+'회에서 적어도 1회 성공할 확률은?'; },
    solve:function(p){ var v=1-Math.pow(1-p.pr,p.n);
      return { ans:v, unit:'', steps:[
        'P(≥1) = 1−P(전부 실패) = 1−(1−p)^n',
        '= 1−'+SVH.fmt(Math.pow(1-p.pr,p.n))+' = '+SVH.fmt(v)+' — "적어도"는 여사건이 정석' ] }; },
    hints:['전부 실패의 반대.'] },
  { id:'u1-l3-03', level:3, type:'num', tags:['선형성'], src:'창작 문제(검산됨)',
    params:{ EX:{choices:[2,3],unit:''}, EY:{choices:[1,5],unit:''}, a:{choices:[2,3],unit:''}, b:{choices:[1,4],unit:''} },
    statement:function(p){ return 'E[X]='+p.EX+', E[Y]='+p.EY+'일 때 E['+p.a+'X+'+p.b+'Y]는? (독립 여부와 무관함에 주목)'; },
    solve:function(p){ var v=p.a*p.EX+p.b*p.EY;
      return { ans:v, unit:'', steps:[
        '기댓값 선형성: E[aX+bY] = aE[X]+bE[Y] — 독립이 아니어도 항상 성립',
        '= '+p.a+'×'+p.EX+'+'+p.b+'×'+p.EY+' = '+SVH.fmt(v) ] }; },
    hints:['선형성엔 조건이 없다(분산과 대비).'] },
  { id:'u1-l3-04', level:3, type:'num', tags:['독립 합'], src:'창작 문제(검산됨)',
    params:{ EX:{choices:[2,4],unit:''}, VX:{choices:[1,3],unit:''}, EY:{choices:[1,3],unit:''}, VY:{choices:[2,4],unit:''} },
    statement:function(p){ return '독립인 X(E='+p.EX+', Var='+p.VX+'), Y(E='+p.EY+', Var='+p.VY+')에 대해 S=X+Y의 평균과 분산은?'; },
    solve:function(p){ return { ans:{ES:p.EX+p.EY, VS:p.VX+p.VY}, unit:{ES:'', VS:''}, steps:[
        'E[S] = '+p.EX+'+'+p.EY+' = '+(p.EX+p.EY)+' (항상)',
        'Var(S) = '+p.VX+'+'+p.VY+' = '+(p.VX+p.VY)+' — 분산의 합은 독립(무상관)일 때만' ] }; },
    hints:['평균은 공짜, 분산은 독립 필요.'] },
  { id:'u1-l3-05', level:3, type:'num', tags:['조건부 기댓값'], src:'기출 유형',
    params:{ w:{choices:[0.3,0.4,0.6],unit:''}, m1:{choices:[10,20],unit:''}, m2:{choices:[40,60],unit:''} },
    statement:function(p){ return '요청이 확률 '+p.w+'로 캐시 적중(평균 처리 '+p.m1+'µs), 아니면 미스(평균 '+p.m2+'µs). 전체 평균 처리시간 E[T]=E[E[T|적중여부]]는?'; },
    solve:function(p){ var v=p.w*p.m1+(1-p.w)*p.m2;
      return { ans:v, unit:'µs', steps:[
        '반복 기댓값(타워): E[T] = P(적중)E[T|적중]+P(미스)E[T|미스]',
        '= '+p.w+'×'+p.m1+'+'+SVH.fmt(1-p.w)+'×'+p.m2+' = '+SVH.fmt(v)+' µs — 시나리오 평균의 평균' ] }; },
    hints:['전확률의 기댓값 버전.'] },
  { id:'u1-l3-06', level:3, type:'num', tags:['포아송 꼬리'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[0.5,1,2],unit:''} },
    statement:function(p){ return '평균 μ='+p.mu+' 포아송에서 P(X≥1)=1−e^{−μ}는?'; },
    solve:function(p){ var v=1-Math.exp(-p.mu);
      return { ans:v, unit:'', steps:[
        'P(X≥1) = 1−P(X=0) = 1−e^{−μ}',
        '= '+SVH.fmt(v)+' — U3에서 "t 동안 도착 있음"으로 매일 쓴다' ] }; },
    hints:['0건의 여사건.'] },
  { id:'u1-l3-07', level:3, type:'num', tags:['포아송 근사'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[50,100],unit:''}, pr:{choices:[0.02,0.05],unit:''}, k:{choices:[1,2],unit:''} },
    statement:function(p){ return '희귀 사건: n='+p.n+', p='+p.pr+' 이항의 P(X='+p.k+')를 정확값과 포아송 근사(μ=np)로 각각 구하라.'; },
    solve:function(p){ var C=1,i; for(i=0;i<p.k;i++){ C=C*(p.n-i)/(i+1); }
      var pb=C*Math.pow(p.pr,p.k)*Math.pow(1-p.pr,p.n-p.k);
      var mu=p.n*p.pr, f=1; for(i=2;i<=p.k;i++) f*=i;
      var pp=Math.exp(-mu)*Math.pow(mu,p.k)/f;
      return { ans:{binom:pb, pois:pp}, unit:{binom:'', pois:''}, steps:[
        '정확(이항): '+SVH.fmt(pb)+' · 근사(포아송 μ=np='+SVH.fmt(mu)+'): '+SVH.fmt(pp),
        '거의 일치 — "많은 시행 × 작은 확률 = 포아송"이 포아송과정 공리(U3)의 밑그림' ] }; },
    hints:['μ=np 하나로 요약된다.'] },
  { id:'u1-l3-08', level:3, type:'num', tags:['최댓값 분포'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[2,3,5],unit:''}, x:{choices:[0.5,0.8,0.9],unit:''} },
    statement:function(p){ return '독립 U(0,1) 확률변수 '+p.n+'개의 최댓값 M에 대해 P(M≤'+p.x+')=x^n은?'; },
    solve:function(p){ var v=Math.pow(p.x,p.n);
      return { ans:v, unit:'', steps:[
        '최댓값이 x 이하 ⇔ 전부 x 이하: 독립이라 곱 → x^n',
        '= '+p.x+'^'+p.n+' = '+SVH.fmt(v)+' — min/max는 "전부/하나라도"로 번역(U2 min 지수의 예습)' ] }; },
    hints:['max≤x ⇔ 모두 ≤x.'] },
  { id:'u1-l3-09', level:3, type:'num', tags:['기하 무기억'], src:'창작 문제(검산됨)',
    params:{ pr:{choices:[0.2,0.3,0.5],unit:''}, n:{choices:[2,3],unit:''} },
    statement:function(p){ return '기하분포(성공률 p='+p.pr+')에서 P(X>m+n | X>m)=P(X>n)=(1−p)^n을 n='+p.n+'으로 확인하라.'; },
    solve:function(p){ var v=Math.pow(1-p.pr,p.n);
      return { ans:v, unit:'', steps:[
        'P(X>n) = (1−p)^n = '+SVH.fmt(v),
        '이미 m번 실패했어도 남은 기다림의 분포는 처음과 동일 — 무기억성. 연속판이 지수분포(U2)' ] }; },
    hints:['조건부가 원래 꼬리와 같다.'] },
  { id:'u1-l3-10', level:3, type:'num', tags:['계수과정 감각'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[2,4,6],unit:'/시간'}, t:{choices:[0.5,2,3],unit:'시간'} },
    statement:function(p){ return '시간당 평균 λ='+p.lam+'건 도착하는 계수과정 N(t). t='+p.t+'시간 동안의 기대 도착 수와 분산(포아송 가정)은?'; },
    solve:function(p){ var m=p.lam*p.t;
      return { ans:{E:m, V:m}, unit:{E:'건', V:''}, steps:[
        'E[N(t)] = λt = '+SVH.fmt(m)+'건',
        'Var[N(t)] = λt = '+SVH.fmt(m)+' — 평균=분산이 포아송의 지문(U3 본론)' ] }; },
    hints:['둘 다 λt.'] },
  { id:'u1-l3-11', level:3, type:'num', tags:['pdf 적분'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0.2,0.3],unit:''}, b:{choices:[0.6,0.8,1],unit:''} },
    constraint:function(p){ return p.a < p.b; },
    statement:function(p){ return '밀도 f(x)=2x (0≤x≤1)인 X에 대해 P('+p.a+'<X<'+p.b+')=b²−a²은?'; },
    solve:function(p){ var v=p.b*p.b-p.a*p.a;
      return { ans:v, unit:'', steps:[
        'P = ∫ 2x dx = [x²] = '+p.b+'²−'+p.a+'²',
        '= '+SVH.fmt(v)+' — 연속 확률은 밀도의 적분(넓이)' ] }; },
    hints:['원시함수 x².'] },
  { id:'u1-l3-12', level:3, type:'num', tags:['공분산'], src:'창작 문제(검산됨)',
    params:{ EXY:{choices:[7,10],unit:''}, EX:{choices:[2,3],unit:''}, EY:{choices:[2,3],unit:''} },
    statement:function(p){ return 'E[XY]='+p.EXY+', E[X]='+p.EX+', E[Y]='+p.EY+'일 때 Cov(X,Y)는?'; },
    solve:function(p){ var v=p.EXY-p.EX*p.EY;
      return { ans:v, unit:'', steps:[
        'Cov = E[XY]−E[X]E[Y] = '+p.EXY+'−'+(p.EX*p.EY),
        '= '+SVH.fmt(v)+(p.EXY-p.EX*p.EY>0?' > 0: 같이 움직이는 경향':' — 부호가 방향, 크기는 스케일 의존') ] }; },
    hints:['분산 지름길의 2변수판.'] },
  { id:'u1-l3-13', level:3, type:'num', tags:['상관계수'], src:'창작 문제(검산됨)',
    params:{ cov:{choices:[2,3,6],unit:''}, sx:{choices:[2,3],unit:''}, sy:{choices:[2,4],unit:''} },
    constraint:function(p){ return p.cov <= p.sx*p.sy; },
    statement:function(p){ return 'Cov(X,Y)='+p.cov+', σ_X='+p.sx+', σ_Y='+p.sy+'일 때 상관계수 ρ는?'; },
    solve:function(p){ var v=p.cov/(p.sx*p.sy);
      return { ans:v, unit:'', steps:[
        'ρ = Cov/(σ_Xσ_Y) = '+p.cov+'/'+(p.sx*p.sy),
        '= '+SVH.fmt(v)+' — 스케일을 지운 −1~1 표준화: 1이면 완전 선형' ] }; },
    hints:['공분산의 무차원화.'] },
  { id:'u1-l3-14', level:3, type:'num', tags:['마르코프 부등식'], src:'교재 표준',
    params:{ EX:{choices:[2,5,10],unit:''}, a:{choices:[20,50],unit:''} },
    statement:function(p){ return '음이 아닌 X, E[X]='+p.EX+'일 때 마르코프 부등식이 주는 P(X≥'+p.a+')의 상한 E[X]/a는?'; },
    solve:function(p){ var v=p.EX/p.a;
      return { ans:v, unit:'', steps:[
        'P(X≥a) ≤ E[X]/a = '+p.EX+'/'+p.a+' = '+SVH.fmt(v),
        '분포를 몰라도 평균만으로 꼬리를 누르는 만능(그러나 느슨한) 도구' ] }; },
    hints:['평균/문턱.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u1-l4-01', level:4, type:'derive', tags:['전확률·베이즈'], src:'교재 표준',
    statement:'분할 \\(\\{B_i\\}\\)에 대한 전확률 공식과 베이즈 정리를 곱셈규칙에서 유도하라.',
    steps:[
      '분할: B_i들이 서로소이고 합집합이 전체 [왜] A를 조각내는 칸막이가 필요하다',
      'A = ∪(A∩B_i) (서로소 합) ⇒ P(A) = ΣP(A∩B_i)',
      '곱셈규칙 P(A∩B_i)=P(B_i)P(A|B_i) 대입 ⇒ 전확률 P(A)=ΣP(B_i)P(A|B_i)',
      '베이즈: P(B_j|A) = P(A∩B_j)/P(A) = P(B_j)P(A|B_j) / ΣP(B_i)P(A|B_i) — 사전→사후 갱신 공식',
      '극한 체크: 어떤 B_j가 확실(P=1)이면 사후도 그대로 ✓ · ΣP(B_j|A)=1 (정규화) ✓'
    ],
    hints:['칸막이(분할)+곱셈규칙 두 개면 끝.','베이즈 분모는 언제나 전확률.'],
    expl:'U6 마르코프 연쇄의 n스텝 분해(C-K 방정식)가 정확히 이 전확률 논법의 반복이다.' },
  { id:'u1-l4-02', level:4, type:'num', tags:['몬티홀 일반화'], src:'교재 표준',
    params:{ n:{choices:[3,4,5],unit:''} },
    statement:function(p){ return '문 '+p.n+'개 몬티홀: 하나 고른 뒤 사회자가 염소 문 1개를 연다. 바꿨을 때 당첨 확률 (n−1)/(n(n−2))은? (안 바꾸면 1/n)'; },
    solve:function(p){ var v=(p.n-1)/(p.n*(p.n-2));
      return { ans:v, unit:'', steps:[
        '처음 오답(확률 (n−1)/n)이었다면, 남은 n−2개 중 정답 1개 → 조건부 1/(n−2)',
        'P(바꿔서 당첨) = (n−1)/n × 1/(n−2) = '+SVH.fmt(v)+' > 1/n='+SVH.fmt(1/p.n)+' — 사회자의 행동이 정보다(베이즈 갱신)' ] }; },
    hints:['처음이 틀렸을 때만 바꾸기가 이긴다.'] },
  { id:'u1-l4-03', level:4, type:'num', tags:['쿠폰 수집'], src:'교재 표준',
    params:{ n:{choices:[3,4,5,6],unit:''} },
    statement:function(p){ return '종류 n='+p.n+'개 쿠폰을 전부 모으는 기대 구매 수 E=n(1+1/2+…+1/n)은?'; },
    solve:function(p){ var H=0,i; for(i=1;i<=p.n;i++) H+=1/i;
      var v=p.n*H;
      return { ans:v, unit:'개', steps:[
        '새 종류 j번째를 얻는 데 성공률 (n−j+1)/n인 기하 대기 → 기대 n/(n−j+1)',
        '합하면 nH_n = '+p.n+'×'+SVH.fmt(H)+' = '+SVH.fmt(v)+'개 — 기하 대기의 선형 결합(U2 병렬 수명에서 재등장)' ] }; },
    hints:['단계별 기하분포로 쪼갠다.'] },
  { id:'u1-l4-04', level:4, type:'derive', tags:['기하 기댓값'], src:'교재 표준',
    statement:'기하분포 E[X]=1/p를 재귀(1단계 조건화)로 유도하라.',
    steps:[
      '첫 시행에서 조건화: 성공(확률 p)이면 X=1, 실패(1−p)면 이미 1회 쓰고 처음부터 다시 [왜] 무기억성 — 실패해도 게임은 리셋',
      'E[X] = p·1 + (1−p)(1+E[X])',
      '정리: E[X] = 1+(1−p)E[X] ⇒ pE[X] = 1',
      '∴ E[X] = 1/p — 급수 미분 없이 한 줄',
      '극한 체크: p→1 ⇒ E→1(첫 방 성공) ✓ · p→0 ⇒ E→∞ ✓'
    ],
    hints:['"실패하면 리셋"을 식으로.','같은 기법이 U6 기대 흡수시간의 원형.'],
    expl:'1단계 조건화(first-step analysis)는 이 과목 최강 무기 — U5 재생, U6 흡수시간이 전부 이 틀이다.' },
  { id:'u1-l4-05', level:4, type:'num', tags:['교란순열'], src:'교재 표준',
    params:{ n:{choices:[4,5,6],unit:''} },
    statement:function(p){ return 'n='+p.n+'명이 모자를 무작위로 나눠 가질 때 아무도 자기 모자를 못 받을 확률 \\(\\sum_{k=0}^{n}(-1)^k/k!\\)은?'; },
    solve:function(p){ var s=0,f=1,k; for(k=0;k<=p.n;k++){ if(k>0) f*=k; s+=Math.pow(-1,k)/f; }
      return { ans:s, unit:'', steps:[
        '포함–배제로 "적어도 한 명 일치"를 걷어내면 D_n/n! = Σ(−1)^k/k!',
        '= '+SVH.fmt(s)+' → n이 커지면 e^{−1}≈0.3679로 수렴 — 포함–배제의 대표 응용' ] }; },
    hints:['e^{−1} 근처가 나와야 정상.'] },
  { id:'u1-l4-06', level:4, type:'num', tags:['랜덤워크'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[2,4,6],unit:''} },
    statement:function(p){ return '공정한 ±1 랜덤워크 \\(S_n=\\sum X_i\\). Var(S_'+p.n+')와 P(S_'+p.n+'=0)을 구하라.'; },
    solve:function(p){ var C=1,i,h=p.n/2; for(i=0;i<h;i++){ C=C*(p.n-i)/(i+1); }
      var v=C/Math.pow(2,p.n);
      return { ans:{V:p.n, p0:v}, unit:{V:'', p0:''}, steps:[
        'E[X_i]=0, Var=1 → Var(S_n)=n='+p.n+' (독립 합) — 퍼짐은 √n으로 자란다',
        'P(S_n=0) = C(n,n/2)/2^n = '+SVH.fmt(v)+' — 가장 단순한 확률과정의 표본경로 통계' ] }; },
    hints:['원점 복귀 = +1과 −1이 반반.'] },
  { id:'u1-l4-07', level:4, type:'num', tags:['조건부 분산'], src:'기출 유형',
    params:{ w:{choices:[0.3,0.5],unit:''}, m1:{choices:[10,20],unit:''}, m2:{choices:[40,60],unit:''}, v1:{choices:[4,9],unit:''}, v2:{choices:[16,25],unit:''} },
    statement:function(p){ return '혼합: 확률 '+p.w+'로 그룹1(평균 '+p.m1+', 분산 '+p.v1+'), 아니면 그룹2(평균 '+p.m2+', 분산 '+p.v2+'). 전체 평균과 분산(Var=E[Var|G]+Var(E[·|G]))을 구하라.'; },
    solve:function(p){ var q=1-p.w, E=p.w*p.m1+q*p.m2, within=p.w*p.v1+q*p.v2, between=p.w*Math.pow(p.m1-E,2)+q*Math.pow(p.m2-E,2);
      return { ans:{E:E, V:within+between}, unit:{E:'', V:''}, steps:[
        'E = '+SVH.fmt(E)+' · 그룹 내 분산 평균 = '+SVH.fmt(within)+', 그룹 간(평균 차) 분산 = '+SVH.fmt(between),
        'Var = within+between = '+SVH.fmt(within+between)+' — 전분산 공식: U4 복합 포아송 분산의 뼈대' ] }; },
    hints:['안쪽 흩어짐+바깥쪽 흩어짐.'] },
  { id:'u1-l4-08', level:4, type:'derive', tags:['확률과정 지도'], src:'강의자료 대조',
    statement:'확률과정의 2×2 분류(상태공간×시간지표)를 세우고, 이 과목 전·후반부의 주인공들을 그 지도 위에 배치하라.',
    steps:[
      '축 두 개: 상태공간 S가 이산/연속, 시간지표 T가 이산/연속 [왜] "값이 셀 수 있나"와 "시점이 셀 수 있나"는 독립적 물음',
      '이산상태·이산시간: 마르코프 연쇄(U6) — 행렬 하나(P)로 전부 기술',
      '이산상태·연속시간: 포아송과정(U3~U4)·연속시간 마르코프(후반) — 계수·점프가 자연스러운 언어',
      '연속상태 칸: 이산시간=시계열, 연속시간=브라운 운동류(이 과목 범위 밖) — 지도를 알아야 범위가 보인다',
      '극한 체크: 시간 격자 Δt→0이면 이산시간이 연속시간으로, 상태 격자를 좁히면 이산상태가 연속상태로 이행 ✓'
    ],
    hints:['축은 언제나 두 개.','과목 로드맵을 그림 하나로.'],
    expl:'W1 강의의 "확률과정의 뜻과 그 구분" 그대로 — 시험 첫 문제 후보이자, 각 단원이 지도의 어느 칸인지 아는 것이 큰그림이다.' }

]});
