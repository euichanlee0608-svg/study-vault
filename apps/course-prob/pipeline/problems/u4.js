/* U4 포아송과정의 중첩·분해·일반화 — superposition, thinning, 비균질, 복합 포아송 (W3) */
SV_BANK.push({
  id: 'u4', no: 4, title: '포아송 중첩·분해·일반화', titleEn: 'Superposition, Thinning & Generalizations',
  scope: '중첩 Σλᵢ · 분해(thinning) pλ와 (1−p)λ의 독립 · 타입 경쟁 λᵢ/Σλ · 비균질 포아송 m(t)=∫λ(s)ds · 복합 포아송 E=λtE[Y], Var=λtE[Y²]',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u4-l1-01', level:1, type:'mc', tags:['중첩'], src:'강의자료 대조',
    statement:'독립인 포아송과정(율 λ₁, λ₂)을 합친 흐름은?',
    choices:['율 λ₁+λ₂인 포아송과정','포아송이 아니다','율 max(λ₁,λ₂)','율 λ₁λ₂'],
    answer:0, expl:'중첩(superposition) 정리. 미소구간 도착확률이 (λ₁+λ₂)h로 더해지고 독립·정상 증분이 보존된다 — U2 min 지수(rate 합)의 과정 버전.' },
  { id:'u4-l1-02', level:1, type:'mc', tags:['분해'], src:'강의자료 대조',
    statement:'율 λ 포아송 도착을 각 도착마다 독립적으로 확률 p로 타입1, 1−p로 타입2로 분류하면?',
    choices:['타입1은 율 pλ, 타입2는 율 (1−p)λ인 포아송과정','타입1만 포아송','두 흐름은 강하게 종속','율은 λ 그대로 둘로 복사'],
    answer:0, expl:'분해(thinning/splitting) 정리 — 확률적 체로 거른 부분 흐름도 다시 포아송이다.' },
  { id:'u4-l1-03', level:1, type:'tf', tags:['분해 독립성'], src:'강의자료 대조',
    statement:'thinning으로 갈라진 타입1 흐름과 타입2 흐름은 서로 독립이다 — "오늘 타입1이 많았다"는 타입2 건수에 대한 정보가 없다.',
    answer:true, expl:'분해 정리의 가장 반직관적 부분(시험 단골). 총량을 나눠 갖는 것 같지만, 포아송의 총량 자체가 랜덤이라 두 부분이 독립이 된다.' },
  { id:'u4-l1-04', level:1, type:'mc', tags:['비균질'], src:'교재 표준',
    statement:'율이 시간에 따라 변하는 비균질(nonhomogeneous) 포아송과정에서 N(t)의 분포는?',
    choices:['\\(Poisson\\big(m(t)=\\int_0^t\\lambda(s)ds\\big)\\)','Poisson(λ(t)·t)','정규분포','정의 불가'],
    answer:0, expl:'평균 함수 m(t)=∫λ(s)ds가 λt를 대체한다. 정상성만 포기하고 독립 증분은 유지 — 러시아워 모델링의 표준.' },
  { id:'u4-l1-05', level:1, type:'mc', tags:['복합 포아송'], src:'교재 표준',
    statement:'복합 포아송 \\(S(t)=\\sum_{i=1}^{N(t)}Y_i\\) (건수 N~Poisson, 건당 크기 Yᵢ iid)의 평균은?',
    choices:['\\(E[S]=\\lambda t\\,E[Y]\\)','λt','E[Y]','λtE[Y²]'],
    answer:0, expl:'"건수×건당 평균". 보험 총청구액·트래픽 총량·누적 지진 에너지의 모델. 분산은 λtE[Y²](제곱 모멘트!)임에 주의.' },
  { id:'u4-l1-06', level:1, type:'tf', tags:['타입 경쟁'], src:'강의자료 대조',
    statement:'중첩된 흐름에서 다음 도착이 타입 i일 확률은 \\(\\lambda_i/\\sum_j\\lambda_j\\)이고, 이는 도착 시각과 독립이다.',
    answer:true, expl:'U2 경쟁 지수 P(X₁<X₂)=λ₁/Σ의 재등장. "언제 오나"와 "누가 오나"가 분리되는 것이 포아송의 선물.' },

  /* ---------- L2 (12) ---------- */
  { id:'u4-l2-01', level:2, type:'num', tags:['중첩 계산'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[2,3],unit:'/시간'}, l2:{choices:[1,4],unit:'/시간'}, t:{choices:[0.5,1],unit:'시간'}, k:{choices:[1,2,3],unit:''} },
    statement:function(p){ return '전화(λ₁='+p.l1+')와 이메일(λ₂='+p.l2+')이 독립 포아송 도착. t='+p.t+'시간 동안 총 문의가 k='+p.k+'건일 확률은?'; },
    solve:function(p){ var m=(p.l1+p.l2)*p.t, f=1,i; for(i=2;i<=p.k;i++) f*=i;
      var v=Math.exp(-m)*Math.pow(m,p.k)/f;
      return { ans:v, unit:'', steps:[
        '중첩: 율 '+(p.l1+p.l2)+'/시간 → μ = '+SVH.fmt(m),
        'P = e^{−μ}μ^k/k! = '+SVH.fmt(v) ] }; },
    hints:['율부터 합친다.'] },
  { id:'u4-l2-02', level:2, type:'num', tags:['thinning'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[10,20],unit:'/시간'}, pr:{choices:[0.2,0.3],unit:''}, t:{choices:[0.5,1],unit:'시간'}, k:{choices:[1,2],unit:''} },
    statement:function(p){ return '고객이 λ='+p.lam+'/시간 도착, 각자 확률 '+p.pr+'로 구매. t='+p.t+'시간 동안 구매 고객이 정확히 k='+p.k+'명일 확률은?'; },
    solve:function(p){ var m=p.lam*p.pr*p.t, f=1,i; for(i=2;i<=p.k;i++) f*=i;
      var v=Math.exp(-m)*Math.pow(m,p.k)/f;
      return { ans:v, unit:'', steps:[
        'thinning: 구매 흐름 ~ Poisson(pλ='+SVH.fmt(p.lam*p.pr)+'/시간) → μ = '+SVH.fmt(m),
        'P = '+SVH.fmt(v)+' — 원 흐름은 잊고 pλ 하나로' ] }; },
    hints:['율에 p를 곱하면 끝.'] },
  { id:'u4-l2-03', level:2, type:'num', tags:['분해 평균'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[12,30],unit:'/시간'}, pr:{choices:[0.25,0.4],unit:''}, t:{choices:[2,4],unit:'시간'} },
    statement:function(p){ return 'λ='+p.lam+'/시간 도착이 확률 '+p.pr+'로 A형, 나머지 B형. t='+p.t+'시간의 기대 A·B 건수를 구하라.'; },
    solve:function(p){ return { ans:{EA:p.lam*p.pr*p.t, EB:p.lam*(1-p.pr)*p.t}, unit:{EA:'건', EB:'건'}, steps:[
        'E[A] = pλt = '+SVH.fmt(p.lam*p.pr*p.t)+'건',
        'E[B] = (1−p)λt = '+SVH.fmt(p.lam*(1-p.pr)*p.t)+'건 — 합은 λt로 복원' ] }; },
    hints:['율 분배.'] },
  { id:'u4-l2-04', level:2, type:'num', tags:['타입 확률'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[2,5],unit:'/시간'}, l2:{choices:[3,7],unit:'/시간'} },
    statement:function(p){ return '버스 λ₁='+p.l1+'/시간, 택시 λ₂='+p.l2+'/시간 독립 포아송 도착. 다음에 오는 것이 버스일 확률은?'; },
    solve:function(p){ var v=p.l1/(p.l1+p.l2);
      return { ans:v, unit:'', steps:[
        'P(버스 먼저) = λ₁/(λ₁+λ₂) = '+p.l1+'/'+(p.l1+p.l2),
        '= '+SVH.fmt(v)+' — U2 경쟁 지수의 도착 버전' ] }; },
    hints:['rate 비.'] },
  { id:'u4-l2-05', level:2, type:'num', tags:['연속 타입'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[2,4],unit:''}, l2:{choices:[1,3],unit:''}, k:{choices:[2,3],unit:''} },
    statement:function(p){ return '타입1(λ₁='+p.l1+')·타입2(λ₂='+p.l2+') 중첩 흐름에서 다음 k='+p.k+'건이 연속으로 모두 타입1일 확률은?'; },
    solve:function(p){ var v=Math.pow(p.l1/(p.l1+p.l2),p.k);
      return { ans:v, unit:'', steps:[
        '각 도착의 타입은 독립 베르누이(p=λ₁/Σ='+SVH.fmt(p.l1/(p.l1+p.l2))+')',
        'P = p^'+p.k+' = '+SVH.fmt(v)+' — 타입 열은 iid 동전던지기' ] }; },
    hints:['독립이라 거듭제곱.'] },
  { id:'u4-l2-06', level:2, type:'num', tags:['비균질 평균'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4],unit:''}, b:{choices:[1,2],unit:''}, t:{choices:[2,3],unit:'시간'} },
    statement:function(p){ return '율이 λ(s)='+p.a+'+'+p.b+'s (건/시간)로 증가. [0,'+p.t+']의 평균 함수 m(t)=at+bt²/2는?'; },
    solve:function(p){ var v=p.a*p.t+p.b*p.t*p.t/2;
      return { ans:v, unit:'건', steps:[
        'm(t) = ∫₀ᵗ(a+bs)ds = at+bt²/2',
        '= '+SVH.fmt(v)+'건 — λt 자리에 적분이 들어온다' ] }; },
    hints:['율의 적분=기대 건수.'] },
  { id:'u4-l2-07', level:2, type:'num', tags:['비균질 무도착'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2],unit:''}, b:{choices:[1,2],unit:''}, t:{choices:[1,2],unit:'시간'} },
    statement:function(p){ return 'λ(s)='+p.a+'+'+p.b+'s일 때 [0,'+p.t+'] 동안 무도착 확률 P=e^{−m(t)}는?'; },
    solve:function(p){ var m=p.a*p.t+p.b*p.t*p.t/2, v=Math.exp(-m);
      return { ans:v, unit:'', steps:[
        'm('+p.t+') = '+SVH.fmt(m),
        'P(N=0) = e^{−m} = '+SVH.fmt(v)+' — 공식 구조는 균질과 동일, μ만 교체' ] }; },
    hints:['m(t) 계산 후 e^{−m}.'] },
  { id:'u4-l2-08', level:2, type:'num', tags:['복합 평균'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[5,10],unit:'/일'}, t:{choices:[7,30],unit:'일'}, EY:{choices:[20,50],unit:'만원'} },
    statement:function(p){ return '주문이 λ='+p.lam+'/일, 건당 평균 '+p.EY+'만원. t='+p.t+'일 총 매출 기대 E[S]=λt·E[Y]는?'; },
    solve:function(p){ var v=p.lam*p.t*p.EY;
      return { ans:v, unit:'만원', steps:[
        'E[S] = E[N]E[Y] = '+(p.lam*p.t)+'×'+p.EY,
        '= '+SVH.fmt(v)+'만원 — 건수 랜덤이어도 평균은 곱으로' ] }; },
    hints:['기대 건수 × 건당 평균.'] },
  { id:'u4-l2-09', level:2, type:'num', tags:['복합 분산'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[4,8],unit:'/일'}, t:{choices:[5,10],unit:'일'}, EY:{choices:[10,20],unit:'만원'}, VY:{choices:[25,100],unit:''} },
    statement:function(p){ return '건수 λ='+p.lam+'/일, t='+p.t+'일, 건당 평균 '+p.EY+'·분산 '+p.VY+'. 총액의 평균과 분산 Var=λt·E[Y²]을 구하라.'; },
    solve:function(p){ var EY2=p.VY+p.EY*p.EY, m=p.lam*p.t;
      return { ans:{E:m*p.EY, V:m*EY2}, unit:{E:'만원', V:''}, steps:[
        'E[Y²] = Var+E² = '+SVH.fmt(EY2)+' → E[S] = '+SVH.fmt(m*p.EY),
        'Var(S) = λt·E[Y²] = '+SVH.fmt(m*EY2)+' — 분산엔 제곱 모멘트(건수 요동+크기 요동 합산)' ] }; },
    hints:['E[Y²]부터 만들기.'] },
  { id:'u4-l2-10', level:2, type:'num', tags:['결합 독립'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[1,2],unit:'/시간'}, l2:{choices:[2,3],unit:'/시간'}, t:{choices:[1,2],unit:'시간'}, a:{choices:[1,2],unit:''}, b:{choices:[1,3],unit:''} },
    statement:function(p){ return '독립 타입1(λ₁='+p.l1+')·타입2(λ₂='+p.l2+'). t='+p.t+'시간에 타입1이 '+p.a+'건이고 타입2가 '+p.b+'건일 확률은?'; },
    solve:function(p){ var m1=p.l1*p.t, m2=p.l2*p.t, f1=1,f2=1,i;
      for(i=2;i<=p.a;i++) f1*=i; for(i=2;i<=p.b;i++) f2*=i;
      var v=Math.exp(-m1)*Math.pow(m1,p.a)/f1*Math.exp(-m2)*Math.pow(m2,p.b)/f2;
      return { ans:v, unit:'', steps:[
        '독립(분해 정리) → 곱: Pois('+SVH.fmt(m1)+')['+p.a+']×Pois('+SVH.fmt(m2)+')['+p.b+']',
        '= '+SVH.fmt(v) ] }; },
    hints:['타입별로 따로 계산해 곱.'] },
  { id:'u4-l2-11', level:2, type:'num', tags:['첫 타입1 대기'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[6,12],unit:'/시간'}, pr:{choices:[0.25,0.5],unit:''} },
    statement:function(p){ return 'λ='+p.lam+'/시간 도착 중 비율 '+p.pr+'만 VIP. 첫 VIP까지의 기대 대기시간은? (VIP 흐름 ~ Exp(pλ) 간격)'; },
    solve:function(p){ var v=1/(p.lam*p.pr);
      return { ans:v, unit:'시간', steps:[
        'VIP 흐름 = 율 pλ = '+SVH.fmt(p.lam*p.pr)+'/시간 포아송',
        'E[대기] = 1/(pλ) = '+SVH.fmt(v)+'시간 — thinning 후엔 그냥 새 포아송처럼' ] }; },
    hints:['pλ의 지수 간격.'] },
  { id:'u4-l2-12', level:2, type:'num', tags:['관측 보정'], src:'창작 문제(검산됨)',
    params:{ lobs:{choices:[3,6],unit:'/일'}, pr:{choices:[0.5,0.75],unit:''} },
    statement:function(p){ return '검출률 '+p.pr+'인 센서가 하루 λ_obs='+p.lobs+'건을 기록한다. 실제 발생률 λ=λ_obs/p는?'; },
    solve:function(p){ var v=p.lobs/p.pr;
      return { ans:v, unit:'/일', steps:[
        '관측 흐름 = thinning(pλ) → λ = λ_obs/p = '+p.lobs+'/'+p.pr,
        '= '+SVH.fmt(v)+'/일 — 검출 못 한 (1−p)λ까지 복원하는 역보정' ] }; },
    hints:['thinning의 역산.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u4-l3-01', level:3, type:'num', tags:['긴급 무발생'], src:'기출 유형',
    params:{ lam:{choices:[10,20],unit:'/시간'}, pr:{choices:[0.05,0.1],unit:''}, t:{choices:[2,8],unit:'시간'} },
    statement:function(p){ return '신고가 λ='+p.lam+'/시간, 그중 비율 '+p.pr+'가 긴급. t='+p.t+'시간 동안 긴급 신고가 하나도 없을 확률은?'; },
    solve:function(p){ var v=Math.exp(-p.lam*p.pr*p.t);
      return { ans:v, unit:'', steps:[
        '긴급 흐름 ~ Poisson(pλ='+SVH.fmt(p.lam*p.pr)+'/시간)',
        'P(N=0) = e^{−pλt} = '+SVH.fmt(v)+' — thinning으로 한 줄' ] }; },
    hints:['pλt 지수.'] },
  { id:'u4-l3-02', level:3, type:'num', tags:['출처 이항'], src:'강의자료 대조',
    params:{ l1:{choices:[2,4],unit:''}, l2:{choices:[2,6],unit:''}, k:{choices:[3,5],unit:''}, j:{choices:[1,2],unit:''} },
    constraint:function(p){ return p.j <= p.k; },
    statement:function(p){ return '중첩 흐름(λ₁='+p.l1+', λ₂='+p.l2+')에서 총 k='+p.k+'건이 왔다. 그중 타입1이 j='+p.j+'건일 확률은? (Binomial(k, λ₁/Σ))'; },
    solve:function(p){ var q=p.l1/(p.l1+p.l2), C=1,i; for(i=0;i<p.j;i++){ C=C*(p.k-i)/(i+1); }
      var v=C*Math.pow(q,p.j)*Math.pow(1-q,p.k-p.j);
      return { ans:v, unit:'', steps:[
        '각 도착의 타입은 독립 베르누이(λ₁/Σ='+SVH.fmt(q)+')',
        'P = C('+p.k+','+p.j+')q^j(1−q)^{k−j} = '+SVH.fmt(v)+' — 총량 조건부는 이항(U3 조건부 균등의 타입판)' ] }; },
    hints:['중첩 총량 주어지면 이항.'] },
  { id:'u4-l3-03', level:3, type:'num', tags:['비균질 구간'], src:'창작 문제(검산됨)',
    params:{ c:{choices:[2,3],unit:''}, t1:{choices:[1,2],unit:'시간'}, t2:{choices:[3,4],unit:'시간'} },
    constraint:function(p){ return p.t1 < p.t2; },
    statement:function(p){ return 'λ(s)='+p.c+'s (선형 증가). 구간 ['+p.t1+', '+p.t2+']의 기대 건수 m=c(t₂²−t₁²)/2는?'; },
    solve:function(p){ var v=p.c*(p.t2*p.t2-p.t1*p.t1)/2;
      return { ans:v, unit:'건', steps:[
        'm = ∫cs ds = c(t₂²−t₁²)/2 = '+p.c+'×('+(p.t2*p.t2)+'−'+(p.t1*p.t1)+')/2',
        '= '+SVH.fmt(v)+'건 — 늦은 구간일수록 무겁다(정상성 상실)' ] }; },
    hints:['적분 구간만 조심.'] },
  { id:'u4-l3-04', level:3, type:'num', tags:['보험 총액'], src:'기출 유형',
    params:{ lam:{choices:[2,5],unit:'/월'}, t:{choices:[12,24],unit:'월'}, EY:{choices:[100,300],unit:'만원'}, sY:{choices:[50,100],unit:'만원'} },
    statement:function(p){ return '청구가 λ='+p.lam+'/월, 건당 평균 '+p.EY+'·표준편차 '+p.sY+'만원. t='+p.t+'개월 총청구액의 평균과 표준편차를 구하라.'; },
    solve:function(p){ var m=p.lam*p.t, EY2=p.sY*p.sY+p.EY*p.EY, V=m*EY2;
      return { ans:{E:m*p.EY, SD:Math.sqrt(V)}, unit:{E:'만원', SD:'만원'}, steps:[
        'E = λtE[Y] = '+SVH.fmt(m*p.EY)+'만원',
        'Var = λtE[Y²] = '+SVH.fmt(m)+'×'+SVH.fmt(EY2)+' → SD = '+SVH.fmt(Math.sqrt(V))+'만원 — 준비금 산정의 뼈대' ] }; },
    hints:['E[Y²]=σ²+μ².'] },
  { id:'u4-l3-05', level:3, type:'num', tags:['두 기간 결합'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[2,4],unit:'/시간'}, T1:{choices:[2,3],unit:'시간'}, l2:{choices:[6,8],unit:'/시간'}, T2:{choices:[1,2],unit:'시간'}, k:{choices:[8,12],unit:''} },
    statement:function(p){ return '한산 시간대(λ='+p.l1+', '+p.T1+'시간)+피크(λ='+p.l2+', '+p.T2+'시간)의 총 도착이 k='+p.k+'건일 확률은? (합은 Poisson(λ₁T₁+λ₂T₂))'; },
    solve:function(p){ var m=p.l1*p.T1+p.l2*p.T2, f=1,i; for(i=2;i<=p.k;i++) f*=i;
      var v=Math.exp(-m)*Math.pow(m,p.k)/f;
      return { ans:v, unit:'', steps:[
        'm = '+p.l1+'×'+p.T1+'+'+p.l2+'×'+p.T2+' = '+SVH.fmt(m)+' (구간별 기대의 합)',
        'P = '+SVH.fmt(v)+' — 조각별 균질 = 비균질의 실무형' ] }; },
    hints:['독립 구간 합은 μ 합.'] },
  { id:'u4-l3-06', level:3, type:'num', tags:['검출률 설계'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[8,16],unit:'/시간'}, t:{choices:[1,2],unit:'시간'}, r:{choices:[0.9,0.95],unit:''} },
    statement:function(p){ return '결함이 λ='+p.lam+'/시간 발생. t='+p.t+'시간 동안 미검출 결함이 0건일 확률을 '+p.r+' 이상으로 하려면 검출률 p의 하한 1+ln(r)/(λt)는?'; },
    solve:function(p){ var v=1+Math.log(p.r)/(p.lam*p.t);
      return { ans:v, unit:'', steps:[
        '미검출 흐름 = (1−p)λ → e^{−(1−p)λt} ≥ r → (1−p) ≤ −ln(r)/(λt)',
        'p ≥ 1+ln(r)/(λt) = '+SVH.fmt(v)+' — 품질 목표가 검출률 사양으로 번역' ] }; },
    hints:['(1−p)λ 흐름에 0건 조건.'] },
  { id:'u4-l3-07', level:3, type:'num', tags:['이중 분해'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[20,40],unit:'/시간'}, p1:{choices:[0.5,0.6],unit:''}, p2:{choices:[0.2,0.3],unit:''}, t:{choices:[1,2],unit:'시간'} },
    statement:function(p){ return '방문 λ='+p.lam+'/시간 → 가입률 '+p.p1+' → 유료전환율 '+p.p2+'. 유료 고객 흐름의 율과 t='+p.t+'시간 기대 수를 구하라.'; },
    solve:function(p){ var l=p.lam*p.p1*p.p2;
      return { ans:{lam:l, E:l*p.t}, unit:{lam:'/시간', E:'명'}, steps:[
        '두 번 걸러도 포아송: λp₁p₂ = '+SVH.fmt(l)+'/시간',
        'E = '+SVH.fmt(l*p.t)+'명 — 퍼널의 각 단이 thinning' ] }; },
    hints:['p들을 연달아 곱.'] },
  { id:'u4-l3-08', level:3, type:'num', tags:['표시 성공'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[3,6],unit:'/일'}, t:{choices:[5,10],unit:'일'}, q:{choices:[0.3,0.5],unit:''}, j:{choices:[2,4],unit:''} },
    statement:function(p){ return '시도가 λ='+p.lam+'/일 포아송, 각 시도 성공률 q='+p.q+'. t='+p.t+'일간 성공이 정확히 j='+p.j+'건일 확률은?'; },
    solve:function(p){ var m=p.lam*p.t*p.q, f=1,i; for(i=2;i<=p.j;i++) f*=i;
      var v=Math.exp(-m)*Math.pow(m,p.j)/f;
      return { ans:v, unit:'', steps:[
        '성공 흐름 ~ Poisson(λtq='+SVH.fmt(m)+') — 포아송 건수+베르누이 표시=포아송(thinning)',
        'P = '+SVH.fmt(v) ] }; },
    hints:['이항 조건화 대신 thinning 한 방.'] },
  { id:'u4-l3-09', level:3, type:'num', tags:['차이 과정'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[5,8],unit:'/시간'}, l2:{choices:[3,6],unit:'/시간'}, t:{choices:[2,4],unit:'시간'} },
    statement:function(p){ return '유입(λ₁='+p.l1+')·유출(λ₂='+p.l2+') 독립 포아송. t='+p.t+'시간 순증 D=N₁−N₂의 평균과 분산을 구하라.'; },
    solve:function(p){ return { ans:{E:(p.l1-p.l2)*p.t, V:(p.l1+p.l2)*p.t}, unit:{E:'건', V:''}, steps:[
        'E[D] = (λ₁−λ₂)t = '+SVH.fmt((p.l1-p.l2)*p.t),
        'Var(D) = (λ₁+λ₂)t = '+SVH.fmt((p.l1+p.l2)*p.t)+' — 차이의 분산은 더해진다(독립)' ] }; },
    hints:['분산엔 뺄셈이 없다.'] },
  { id:'u4-l3-10', level:3, type:'num', tags:['조건부 타입 기대'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[3,5],unit:''}, l2:{choices:[5,7],unit:''}, n:{choices:[10,20],unit:''} },
    statement:function(p){ return '중첩(λ₁='+p.l1+', λ₂='+p.l2+') 흐름에서 오늘 총 n='+p.n+'건이 왔다. 타입1 건수의 조건부 기대는?'; },
    solve:function(p){ var v=p.n*p.l1/(p.l1+p.l2);
      return { ans:v, unit:'건', steps:[
        '조건부 Binomial(n, λ₁/Σ) → E = nλ₁/Σ',
        '= '+p.n+'×'+SVH.fmt(p.l1/(p.l1+p.l2))+' = '+SVH.fmt(v)+'건' ] }; },
    hints:['이항 평균.'] },
  { id:'u4-l3-11', level:3, type:'num', tags:['워밍업 율'], src:'창작 문제(검산됨)',
    params:{ lm:{choices:[10,20],unit:'/시간'}, tau:{choices:[1,2],unit:'시간'}, t:{choices:[2,4],unit:'시간'} },
    statement:function(p){ return '오픈 직후 율이 λ(s)=λ_max(1−e^{−s/τ})로 상승(λ_max='+p.lm+', τ='+p.tau+'). m(t)=λ_max[t−τ(1−e^{−t/τ})]를 t='+p.t+'에서 구하라.'; },
    solve:function(p){ var v=p.lm*(p.t-p.tau*(1-Math.exp(-p.t/p.tau)));
      return { ans:v, unit:'건', steps:[
        'm(t) = λ_max∫(1−e^{−s/τ})ds = λ_max[t−τ(1−e^{−t/τ})]',
        '= '+SVH.fmt(v)+'건 — 정상 상태(λ_max t='+SVH.fmt(p.lm*p.t)+')보다 워밍업 손실만큼 작다' ] }; },
    hints:['지수항 적분은 −τe^{−s/τ}.'] },
  { id:'u4-l3-12', level:3, type:'num', tags:['복합-지수'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[4,8],unit:'/일'}, t:{choices:[10,30],unit:'일'}, mY:{choices:[5,10],unit:'만원'} },
    statement:function(p){ return '건수 λ='+p.lam+'/일, 건당 손해액 Y~Exp(평균 '+p.mY+'만원). t='+p.t+'일 총손해의 평균과 분산 Var=λt·2m²을 구하라.'; },
    solve:function(p){ var m=p.lam*p.t;
      return { ans:{E:m*p.mY, V:m*2*p.mY*p.mY}, unit:{E:'만원', V:''}, steps:[
        'E = λt·m = '+SVH.fmt(m*p.mY)+'만원',
        '지수는 E[Y²]=2m² → Var = '+SVH.fmt(m*2*p.mY*p.mY)+' — 분포 지식(2m²)이 그대로 답이 되는 유형' ] }; },
    hints:['지수의 2차 모멘트=2m².'] },
  { id:'u4-l3-13', level:3, type:'num', tags:['3분할'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[10,20],unit:'/시간'}, p1:{choices:[0.2,0.3],unit:''}, p2:{choices:[0.3,0.5],unit:''}, t:{choices:[1,2],unit:'시간'} },
    constraint:function(p){ return p.p1+p.p2 < 0.95; },
    statement:function(p){ return '도착 λ='+p.lam+'/시간이 소·중·대(비율 '+p.p1+', '+p.p2+', '+SVH.fmt(1-p.p1-p.p2)+')로 갈라진다. t='+p.t+'시간의 각 기대 건수를 구하라. (대형은 E3)'; },
    solve:function(p){ var b=p.lam*p.t;
      return { ans:{E1:b*p.p1, E2:b*p.p2, E3:b*(1-p.p1-p.p2)}, unit:{E1:'건', E2:'건', E3:'건'}, steps:[
        '3-way thinning: 각각 독립 Poisson(λpᵢt)',
        '= '+SVH.fmt(b*p.p1)+' · '+SVH.fmt(b*p.p2)+' · '+SVH.fmt(b*(1-p.p1-p.p2))+'건 — 다항 분해도 같은 정리' ] }; },
    hints:['비율×λt 셋.'] },
  { id:'u4-l3-14', level:3, type:'num', tags:['두 노선 대기'], src:'기출 유형',
    params:{ l1:{choices:[4,6],unit:'/시간'}, l2:{choices:[2,3],unit:'/시간'} },
    statement:function(p){ return '집에 가는 버스 두 노선(λ₁='+p.l1+', λ₂='+p.l2+'/시간, 독립). 아무거나 타면 되는 승객의 기대 대기시간과, 온 것이 1번 노선일 확률을 구하라.'; },
    solve:function(p){ var s=p.l1+p.l2;
      return { ans:{E:1/s, p1:p.l1/s}, unit:{E:'시간', p1:''}, steps:[
        '중첩 흐름 Exp(Σλ) 간격 → E[대기] = 1/'+s+' = '+SVH.fmt(1/s)+'시간',
        'P(1번) = '+SVH.fmt(p.l1/s)+' — 중첩(언제)+경쟁(무엇)의 종합 세트' ] }; },
    hints:['합 rate와 rate 비.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u4-l4-01', level:4, type:'derive', tags:['thinning 유도'], src:'강의자료 대조',
    statement:'포아송(λ)을 확률 p로 표시(thinning)한 흐름이 Poisson(pλ)이고 나머지와 독립임을 유도하라.',
    steps:[
      '결합 계산: P(N₁(t)=j, N₂(t)=k) = P(총 j+k건)·P(그중 j건이 표시) [왜] 총량 조건화+독립 표시',
      '= e^{−λt}(λt)^{j+k}/(j+k)! × C(j+k,j)p^j(1−p)^k',
      '정리(팩토리얼 소거): = [e^{−pλt}(pλt)^j/j!]·[e^{−(1−p)λt}((1−p)λt)^k/k!]',
      '곱으로 완전 분리 → 각각 Poisson(pλt), Poisson((1−p)λt)이며 서로 독립 — 반직관의 정체는 "총량도 랜덤"이라는 사실',
      '극한 체크: p=1 ⇒ 원 과정 복원 ✓ · 주변합: Σ_k로 더하면 N₁~Poisson(pλt) 단독 확인 ✓'
    ],
    hints:['조건화→이항→지수 재조립.','e^{−λt}=e^{−pλt}e^{−(1−p)λt} 분해가 열쇠.'],
    expl:'강의 개요의 "포아송과정의 중첩 및 분해" 후반부 — 결합이 곱으로 갈라지는 계산을 직접 봐야 독립성이 믿어진다.' },
  { id:'u4-l4-02', level:4, type:'num', tags:['비균질 종합'], src:'기출 유형',
    params:{ a:{choices:[2,3],unit:''}, b:{choices:[1,2],unit:''}, T:{choices:[2,4],unit:'시간'} },
    statement:function(p){ return 'λ(s)='+p.a+'+'+p.b+'s, 운영 T='+p.T+'시간: ① m(T) ② 무도착 확률 ③ 같은 총량의 등가 균질율 λ̄=m/T를 구하라.'; },
    solve:function(p){ var m=p.a*p.T+p.b*p.T*p.T/2;
      return { ans:{m:m, p0:Math.exp(-m), lbar:m/p.T}, unit:{m:'건', p0:'', lbar:'/시간'}, steps:[
        'm = aT+bT²/2 = '+SVH.fmt(m)+' → P(N=0) = e^{−m} = '+SVH.fmt(Math.exp(-m)),
        'λ̄ = m/T = '+SVH.fmt(m/p.T)+'/시간 — 건수 통계만 필요하면 평균율로 대체 가능(도착 위치 분포는 다름!)' ] }; },
    hints:['셋 다 m(T) 하나에서.'] },
  { id:'u4-l4-03', level:4, type:'derive', tags:['복합 모멘트'], src:'교재 표준',
    statement:'복합 포아송 \\(S=\\sum_{i=1}^{N}Y_i\\)의 E[S]=λtE[Y], Var(S)=λtE[Y²]을 조건화로 유도하라.',
    steps:[
      '조건부: E[S|N=n]=nE[Y], Var(S|N=n)=nVar(Y) [왜] 고정 n이면 iid 합',
      '타워: E[S]=E[N]E[Y]=λtE[Y]',
      '전분산(U1): Var(S)=E[Var(S|N)]+Var(E[S|N]) = E[N]Var(Y)+Var(N)E[Y]²',
      '포아송은 E[N]=Var(N)=λt → Var(S)=λt(Var(Y)+E[Y]²)=λtE[Y]² 아님 주의 → =λtE[Y²]',
      '극한 체크: Y≡1(상수) ⇒ S=N, Var=λt ✓ · 차원: [λt][Y²]=[S²] ✓'
    ],
    hints:['전분산 공식이 몸통.','마지막 줄에서 Var+E²=E[Y²]로 합쳐진다.'],
    expl:'U1 l4-07 전분산 공식의 대표 응용 — "건수 요동과 크기 요동이 모두 분산에 들어간다"가 결론.' },
  { id:'u4-l4-04', level:4, type:'num', tags:['신호+암계수'], src:'창작 문제(검산됨)',
    params:{ ls:{choices:[100,400],unit:'/s'}, ld:{choices:[25,100],unit:'/s'}, t:{choices:[1,4],unit:'s'} },
    statement:function(p){ return '검출기: 신호 λ_s='+p.ls+'/s + 암계수 λ_d='+p.ld+'/s (독립 중첩). 적분 t='+p.t+'s에서 SNR=λ_st/√((λ_s+λ_d)t)를 구하라.'; },
    solve:function(p){ var v=p.ls*p.t/Math.sqrt((p.ls+p.ld)*p.t);
      return { ans:v, unit:'', steps:[
        '신호 = λ_st, 잡음 = 총 계수의 SD = √((λ_s+λ_d)t) (중첩!)',
        'SNR = '+SVH.fmt(v)+' — 암계수가 분모에 얹히는 구조: 중첩 정리의 계측 응용' ] }; },
    hints:['잡음은 총 흐름에서 나온다.'] },
  { id:'u4-l4-05', level:4, type:'num', tags:['구간별 결합'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[2,3],unit:'/시간'}, l2:{choices:[5,8],unit:'/시간'}, T1:{choices:[2,3],unit:'시간'}, T2:{choices:[1,2],unit:'시간'}, k:{choices:[0,1],unit:''} },
    statement:function(p){ return '한산(λ='+p.l1+', '+p.T1+'h)→피크(λ='+p.l2+', '+p.T2+'h). 한산에 k='+p.k+'건이고 피크에 무도착일 확률은?'; },
    solve:function(p){ var m1=p.l1*p.T1, f=1,i; for(i=2;i<=p.k;i++) f*=i;
      var v=Math.exp(-m1)*Math.pow(m1,p.k)/f*Math.exp(-p.l2*p.T2);
      return { ans:v, unit:'', steps:[
        '독립 증분: Pois('+SVH.fmt(m1)+')['+p.k+'] × e^{−'+SVH.fmt(p.l2*p.T2)+'}',
        '= '+SVH.fmt(v)+' — 조각별 균질 모델의 결합 계산' ] }; },
    hints:['구간 곱.'] },
  { id:'u4-l4-06', level:4, type:'num', tags:['3자 경쟁 종합'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[1,2],unit:'/분'}, l2:{choices:[2,3],unit:'/분'}, l3:{choices:[1,4],unit:'/분'} },
    statement:function(p){ return '세 창구 호출(λ='+p.l1+', '+p.l2+', '+p.l3+'/분 독립). 다음 호출까지 기대 시간과 그것이 2번 창구일 확률을 구하라.'; },
    solve:function(p){ var s=p.l1+p.l2+p.l3;
      return { ans:{E:1/s, p2:p.l2/s}, unit:{E:'분', p2:''}, steps:[
        '중첩 율 Σ='+s+'/분 → E = 1/Σ = '+SVH.fmt(1/s)+'분',
        'P(2번) = λ₂/Σ = '+SVH.fmt(p.l2/s)+' — n자 경쟁도 같은 두 공식' ] }; },
    hints:['둘 다 Σλ에서.'] },
  { id:'u4-l4-07', level:4, type:'num', tags:['미검출 품질'], src:'기출 유형',
    params:{ lam:{choices:[5,10],unit:'/일'}, pr:{choices:[0.9,0.95],unit:''}, t:{choices:[1,5],unit:'일'} },
    statement:function(p){ return '결함 λ='+p.lam+'/일 발생, 검사가 확률 '+p.pr+'로 잡아낸다. t='+p.t+'일 출하분에 미검출 결함이 0건일 확률과 기대 미검출 수를 구하라.'; },
    solve:function(p){ var l=(1-p.pr)*p.lam;
      return { ans:{P0:Math.exp(-l*p.t), E:l*p.t}, unit:{P0:'', E:'건'}, steps:[
        '미검출 흐름 = (1−p)λ = '+SVH.fmt(l)+'/일 (thinning의 버려진 쪽도 포아송)',
        'P(0건) = '+SVH.fmt(Math.exp(-l*p.t))+', E = '+SVH.fmt(l*p.t)+'건 — 품질 지표 두 개가 한 율에서' ] }; },
    hints:['(1−p)λ로 새 과정.'] },
  { id:'u4-l4-08', level:4, type:'derive', tags:['중첩 유도'], src:'강의자료 대조',
    statement:'독립 포아송과정의 합이 율 λ₁+λ₂인 포아송과정임을 공리 검증으로 유도하라.',
    steps:[
      'N(t)=N₁(t)+N₂(t): N(0)=0 ✓, 독립 증분 ✓ (각자 독립 증분+서로 독립) [왜] 공리를 하나씩 검사하는 것이 증명',
      '미소구간: P(합에서 1건) = λ₁h(1−λ₂h)+λ₂h(1−λ₁h)+o(h) = (λ₁+λ₂)h+o(h)',
      'P(≥2건) = o(h) (각자 o(h), 동시 도착 λ₁λ₂h² = o(h))',
      '∴ 합은 율 λ₁+λ₂의 포아송과정 — 분포 확인법: 두 포아송 합 ~ Poisson(μ₁+μ₂)와 정합',
      '극한 체크: λ₂=0 ⇒ 원 과정 ✓ · n개 일반화: Σλᵢ (독립이면 몇 개든) ✓'
    ],
    hints:['공리 3종 세트 검사.','동시 도착이 o(h)인 것이 급소.'],
    expl:'서로 다른 원천의 무작위 흐름을 합쳐도 다시 포아송 — 트래픽 공학에서 포아송 가정이 견고한 이유(Palm–Khintchine의 맛보기).' }

]});
