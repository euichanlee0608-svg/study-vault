/* U5 재생과정과 재생보상정리 — 수명 변수 분석, N(t)/t→1/μ, 보상률, 잔여수명·검사역설, 교체정책 (W4~W5) */
SV_BANK.push({
  id: 'u5', no: 5, title: '재생과정·재생보상정리', titleEn: 'Renewal Processes & Renewal Reward',
  scope: '재생과정(iid 일반 간격) · N(t)/t→1/μ · 기본재생정리 · 재생보상정리 rate=E[R]/E[X] · 가용도 · 잔여수명·나이 · 검사역설 E[X_I]=E[X²]/E[X] · 교체정책 비용률',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u5-l1-01', level:1, type:'mc', tags:['정의'], src:'강의자료 대조',
    statement:'재생과정(renewal process)의 정의로 옳은 것은?',
    choices:['도착 간격이 iid인 (일반 분포의) 양의 확률변수인 계수과정 — 포아송의 일반화','간격이 반드시 지수분포','간격이 서로 종속','시간이 이산적'],
    answer:0, expl:'지수 조건을 버리고 iid만 남긴 것. 무기억성은 사라지지만 "재생 시점마다 확률적으로 새로 시작"은 남는다 — 그것이 이름의 뜻.' },
  { id:'u5-l1-02', level:1, type:'mc', tags:['장기율'], src:'강의자료 대조',
    statement:'평균 간격 μ=E[X]인 재생과정에서 t→∞일 때 N(t)/t는?',
    choices:['1/μ로 수렴(확률 1) — 평균 10분 간격이면 시간당 6번','μ로 수렴','0으로 수렴','수렴하지 않음'],
    answer:0, expl:'대수법칙의 재생판. "단위 시간당 횟수 = 1/평균 간격"이라는 당연해 보이는 문장이 정리로 보증된다.' },
  { id:'u5-l1-03', level:1, type:'tf', tags:['기본재생정리'], src:'교재 표준',
    statement:'기본재생정리(elementary renewal theorem): \\(E[N(t)]/t\\to 1/\\mu\\).',
    answer:true, expl:'경로별 수렴(l1-02)과 별개로 기댓값도 같은 극한 — m(t)=E[N(t)]를 재생함수라 부른다.' },
  { id:'u5-l1-04', level:1, type:'mc', tags:['재생보상'], src:'강의자료 대조',
    statement:'사이클마다 보상 \\(R_i\\)(iid, 간격 X와 짝)를 받을 때 장기 보상률은?',
    choices:['\\(\\dfrac{E[R]}{E[X]}\\) — "사이클당 평균 보상 ÷ 사이클 평균 길이"','E[R]E[X]','E[R/X]','E[R]−E[X]'],
    answer:0, expl:'재생보상정리(renewal reward theorem). E[R/X]가 아니라 비율의 극한이 E[R]/E[X]인 것이 요점 — 비용률·가용도·평균 이득이 전부 이 한 줄.' },
  { id:'u5-l1-05', level:1, type:'tf', tags:['검사역설'], src:'강의자료 대조',
    statement:'임의 시점이 걸친 간격(관측 간격)의 평균은 \\(E[X_I]=E[X^2]/E[X]\\ge E[X]\\)이다 — 검사역설(inspection paradox).',
    answer:true, expl:'긴 간격일수록 임의 시점에 걸릴 확률이 길이에 비례해 크다(length-biased). 등호는 결정적 간격일 때만.' },
  { id:'u5-l1-06', level:1, type:'mc', tags:['잔여수명'], src:'교재 표준',
    statement:'장기 평균 잔여수명(residual life)은?',
    choices:['\\(\\dfrac{E[X^2]}{2E[X]}\\)','E[X]/2 (항상)','E[X] (항상)','0'],
    answer:0, expl:'관측 간격 E[X²]/E[X]의 "반쯤 지점"이라 2로 나눈 값. 지수면 1/λ(=전체 평균!), 결정적이면 μ/2 — 버스 대기 문제의 정답 공식.' },

  /* ---------- L2 (12) ---------- */
  { id:'u5-l2-01', level:2, type:'num', tags:['장기율'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[5,10,20],unit:'분'} },
    statement:function(p){ return '부품 평균 수명 μ='+p.mu+'분(즉시 교체). 장기 교체율(회/시간)은?'; },
    solve:function(p){ var v=60/p.mu;
      return { ans:v, unit:'회/시간', steps:[
        '율 = 1/μ = 1/'+p.mu+'분 = '+SVH.fmt(60/p.mu)+'회/시간',
        '분포 모양과 무관 — 평균만 알면 되는 것이 재생 정리의 힘' ] }; },
    hints:['단위 환산 주의.'] },
  { id:'u5-l2-02', level:2, type:'num', tags:['기대 횟수'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[2,4],unit:'년'}, t:{choices:[20,40],unit:'년'} },
    statement:function(p){ return '평균 수명 μ='+p.mu+'년 장비를 t='+p.t+'년 운용. 근사 기대 교체 횟수 E[N(t)]≈t/μ는?'; },
    solve:function(p){ var v=p.t/p.mu;
      return { ans:v, unit:'회', steps:[
        'E[N(t)] ≈ t/μ = '+p.t+'/'+p.mu+' = '+SVH.fmt(v)+'회',
        '기본재생정리의 실무 사용법 — t가 μ보다 충분히 클 때 근사' ] }; },
    hints:['t/μ.'] },
  { id:'u5-l2-03', level:2, type:'num', tags:['보상률'], src:'창작 문제(검산됨)',
    params:{ EX:{choices:[2,5],unit:'일'}, ER:{choices:[10,30],unit:'만원'} },
    statement:function(p){ return '사이클 평균 길이 E[X]='+p.EX+'일, 사이클당 평균 수익 E[R]='+p.ER+'만원. 장기 수익률(만원/일)은?'; },
    solve:function(p){ var v=p.ER/p.EX;
      return { ans:v, unit:'만원/일', steps:[
        'rate = E[R]/E[X] = '+p.ER+'/'+p.EX,
        '= '+SVH.fmt(v)+'만원/일 — 사이클 통계 둘이면 장기율이 끝난다' ] }; },
    hints:['비율의 정리.'] },
  { id:'u5-l2-04', level:2, type:'num', tags:['검사역설·균등'], src:'창작 문제(검산됨)',
    params:{ b:{choices:[10,20,30],unit:'분'} },
    statement:function(p){ return '간격 X~U(0,'+p.b+'분)인 재생과정. 관측 간격 평균 E[X_I]=E[X²]/E[X]는? (E[X]='+(0).toFixed(0)+''+''+SVH.fmt(p.b/2)+'분과 비교)'; },
    solve:function(p){ var v=(p.b*p.b/3)/(p.b/2);
      return { ans:v, unit:'분', steps:[
        'E[X²]=b²/3, E[X]=b/2 → E[X_I] = (b²/3)/(b/2) = 2b/3',
        '= '+SVH.fmt(v)+'분 > '+SVH.fmt(p.b/2)+'분 — 긴 간격에 더 자주 걸린다' ] }; },
    hints:['2차 모멘트/1차 모멘트.'] },
  { id:'u5-l2-05', level:2, type:'num', tags:['검사역설·지수'], src:'창작 문제(검산됨)',
    params:{ m:{choices:[5,10],unit:'분'} },
    statement:function(p){ return '간격 X~Exp(평균 '+p.m+'분). 관측 간격 평균 E[X_I]과 원래 평균의 비를 구하라.'; },
    solve:function(p){ return { ans:{EI:2*p.m, ratio:2}, unit:{EI:'분', ratio:'배'}, steps:[
        '지수: E[X²]=2m² → E[X_I] = 2m²/m = 2m = '+SVH.fmt(2*p.m)+'분',
        '비 = 2배 — CV=1인 지수의 검사역설은 정확히 두 배' ] }; },
    hints:['E[X²]=2m².'] },
  { id:'u5-l2-06', level:2, type:'num', tags:['잔여·균등'], src:'창작 문제(검산됨)',
    params:{ b:{choices:[12,30],unit:'분'} },
    statement:function(p){ return '간격 U(0,'+p.b+'분) 재생과정에 임의 시점 도착. 평균 잔여 대기 E[R]=E[X²]/(2E[X])는?'; },
    solve:function(p){ var v=(p.b*p.b/3)/(2*p.b/2);
      return { ans:v, unit:'분', steps:[
        'E[R] = (b²/3)/(2·b/2) = b/3 = '+SVH.fmt(v)+'분',
        '단순 직관 E[X]/2 = '+SVH.fmt(p.b/4)+'분보다 길다 — 검사역설의 절반' ] }; },
    hints:['관측 간격의 절반.'] },
  { id:'u5-l2-07', level:2, type:'num', tags:['잔여·지수'], src:'창작 문제(검산됨)',
    params:{ m:{choices:[6,10,15],unit:'분'} },
    statement:function(p){ return '버스 간격 Exp(평균 '+p.m+'분). 임의 도착 승객의 평균 대기시간은?'; },
    solve:function(p){ return { ans:p.m, unit:'분', steps:[
        'E[R] = E[X²]/(2E[X]) = 2m²/(2m) = m = '+p.m+'분',
        '무기억성과 일치(U2) — 평균 간격만큼 통째로 기다린다: 두 경로가 같은 답' ] }; },
    hints:['지수는 잔여=원래 평균.'] },
  { id:'u5-l2-08', level:2, type:'num', tags:['가용도'], src:'강의자료 대조',
    params:{ up:{choices:[90,200],unit:'시간'}, dn:{choices:[10,20],unit:'시간'} },
    statement:function(p){ return '가동 평균 '+p.up+'시간 → 고장 → 수리 평균 '+p.dn+'시간 반복. 장기 가용도 A=μ_up/(μ_up+μ_dn)는?'; },
    solve:function(p){ var v=p.up/(p.up+p.dn);
      return { ans:v, unit:'', steps:[
        '사이클=가동+수리, 보상=가동시간: A = '+p.up+'/'+(p.up+p.dn),
        '= '+SVH.fmt(v)+' — 재생보상정리의 최다 출제 응용(교대 재생)' ] }; },
    hints:['보상=사이클 중 가동분.'] },
  { id:'u5-l2-09', level:2, type:'num', tags:['비용률'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[3,6],unit:'년'}, c:{choices:[60,120],unit:'만원'} },
    statement:function(p){ return '평균 수명 μ='+p.mu+'년 설비, 교체마다 비용 '+p.c+'만원. 장기 비용률(만원/년)은?'; },
    solve:function(p){ var v=p.c/p.mu;
      return { ans:v, unit:'만원/년', steps:[
        'rate = E[비용]/E[사이클] = '+p.c+'/'+p.mu,
        '= '+SVH.fmt(v)+'만원/년 — 감가상각의 확률론적 정당화' ] }; },
    hints:['보상 자리에 비용.'] },
  { id:'u5-l2-10', level:2, type:'num', tags:['CV 계산'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[4,10],unit:'분'}, sd:{choices:[2,4],unit:'분'} },
    statement:function(p){ return '간격 평균 μ='+p.mu+'분, 표준편차 σ='+p.sd+'분. CV=σ/μ와 관측 간격 평균 E[X_I]=μ(1+CV²)을 구하라.'; },
    solve:function(p){ var cv=p.sd/p.mu, v=p.mu*(1+cv*cv);
      return { ans:{cv:cv, EI:v}, unit:{cv:'', EI:'분'}, steps:[
        'CV = '+SVH.fmt(cv)+' → E[X_I] = μ(1+CV²) = '+p.mu+'×'+SVH.fmt(1+cv*cv),
        '= '+SVH.fmt(v)+'분 — 역설의 크기는 변동성(CV)이 정한다' ] }; },
    hints:['E[X²]=μ²(1+CV²).'] },
  { id:'u5-l2-11', level:2, type:'num', tags:['교대 비율'], src:'창작 문제(검산됨)',
    params:{ on:{choices:[25,50],unit:'분'}, off:{choices:[5,10],unit:'분'} },
    statement:function(p){ return '기계가 평균 '+p.on+'분 작업↔'+p.off+'분 세팅을 반복. 장기적으로 작업 중일 시간 비율은?'; },
    solve:function(p){ var v=p.on/(p.on+p.off);
      return { ans:v, unit:'', steps:[
        'P(작업 중) = μ_on/(μ_on+μ_off) = '+p.on+'/'+(p.on+p.off),
        '= '+SVH.fmt(v)+' — 분포 무관, 평균만: 교대 재생(alternating renewal)의 기본 정리' ] }; },
    hints:['가용도와 같은 식.'] },
  { id:'u5-l2-12', level:2, type:'num', tags:['횟수 요동'], src:'교재 표준',
    params:{ mu:{choices:[2,5],unit:'분'}, sd:{choices:[1,2],unit:'분'}, t:{choices:[200,500],unit:'분'} },
    statement:function(p){ return '간격 평균 μ='+p.mu+'분·표준편차 σ='+p.sd+'분, 관측 t='+p.t+'분. N(t)의 근사 표준편차 SD≈√(tσ²/μ³)는?'; },
    solve:function(p){ var v=Math.sqrt(p.t*p.sd*p.sd/Math.pow(p.mu,3));
      return { ans:v, unit:'회', steps:[
        '재생 CLT: Var[N(t)] ≈ tσ²/μ³',
        'SD = '+SVH.fmt(v)+'회 — 간격이 불규칙(σ↑)할수록 횟수도 출렁인다' ] }; },
    hints:['μ³이 분모.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u5-l3-01', level:3, type:'num', tags:['나이+잔여'], src:'창작 문제(검산됨)',
    params:{ b:{choices:[9,15],unit:'분'} },
    statement:function(p){ return '간격 U(0,'+p.b+'분) 재생과정의 장기 평균 나이(age)와 관측 간격 평균을 구하라. (나이=잔여, 합=관측 간격)'; },
    solve:function(p){ return { ans:{Ea:p.b/3, Es:2*p.b/3}, unit:{Ea:'분', Es:'분'}, steps:[
        '평균 나이 = 평균 잔여 = E[X²]/(2E[X]) = b/3 = '+SVH.fmt(p.b/3)+'분 (대칭)',
        '나이+잔여 = 관측 간격 = 2b/3 = '+SVH.fmt(2*p.b/3)+'분 — 세 양이 한 세트' ] }; },
    hints:['앞뒤 대칭.'] },
  { id:'u5-l3-02', level:3, type:'num', tags:['버스 두 모델'], src:'기출 유형',
    params:{ m:{choices:[8,12],unit:'분'} },
    statement:function(p){ return '평균 '+p.m+'분 간격 버스: ① 지수 간격 ② 정확히 '+p.m+'분 결정적 간격. 각각 임의 도착 승객의 평균 대기를 구하라.'; },
    solve:function(p){ return { ans:{We:p.m, Wd:p.m/2}, unit:{We:'분', Wd:'분'}, steps:[
        '지수: E[X²]/(2E[X]) = m = '+p.m+'분 (검사역설 최대급)',
        '결정적: m/2 = '+SVH.fmt(p.m/2)+'분 (역설 없음) — 같은 "평균 간격"이라도 대기는 2배 차이: 분산이 서비스 품질' ] }; },
    hints:['CV 1 vs 0.'] },
  { id:'u5-l3-03', level:3, type:'num', tags:['가동률 심화'], src:'창작 문제(검산됨)',
    params:{ up:{choices:[45,95],unit:'일'}, dn:{choices:[5,10],unit:'일'}, t:{choices:[365],unit:'일'} },
    statement:function(p){ return '가동 평균 '+p.up+'일↔수리 '+p.dn+'일. 연간(t='+p.t+'일) 기대 가동일수와 기대 고장 횟수를 구하라.'; },
    solve:function(p){ var A=p.up/(p.up+p.dn);
      return { ans:{days:A*p.t, n:p.t/(p.up+p.dn)}, unit:{days:'일', n:'회'}, steps:[
        '가용도 A = '+SVH.fmt(A)+' → 가동일 = '+SVH.fmt(A*p.t)+'일',
        '고장 횟수 ≈ t/사이클 = '+p.t+'/'+(p.up+p.dn)+' = '+SVH.fmt(p.t/(p.up+p.dn))+'회 — 두 지표가 한 사이클에서' ] }; },
    hints:['사이클 길이=up+down.'] },
  { id:'u5-l3-04', level:3, type:'num', tags:['정책 비용 비교'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[4,6],unit:'년'}, cf:{choices:[100,200],unit:'만원'}, cp:{choices:[30,50],unit:'만원'}, T:{choices:[2,3],unit:'년'} },
    statement:function(p){ return 'A안: 고장 시 교체(평균 μ='+p.mu+'년, 건당 '+p.cf+'만원). B안: 매 T='+p.T+'년 계획 교체(건당 '+p.cp+'만원, 고장 없다고 가정). 두 비용률(만원/년)을 구하라.'; },
    solve:function(p){ return { ans:{rA:p.cf/p.mu, rB:p.cp/p.T}, unit:{rA:'만원/년', rB:'만원/년'}, steps:[
        'A = '+p.cf+'/'+p.mu+' = '+SVH.fmt(p.cf/p.mu)+' · B = '+p.cp+'/'+p.T+' = '+SVH.fmt(p.cp/p.T),
        '재생보상률 비교가 정책 결정 — 실제 문제는 두 효과가 섞인 min(X,T) 사이클(l4-02)' ] }; },
    hints:['각 정책=각 재생과정.'] },
  { id:'u5-l3-05', level:3, type:'num', tags:['나이 분포'], src:'교재 표준',
    params:{ lam:{choices:[0.5,1],unit:'/시간'}, x:{choices:[1,2],unit:'시간'} },
    statement:function(p){ return '지수 간격(λ='+p.lam+') 재생과정에서 장기 나이 분포 P(A>x)=e^{−λx}를 x='+p.x+'에서 구하라. (극한 나이분포 밀도 = (1−F(x))/μ)'; },
    solve:function(p){ var v=Math.exp(-p.lam*p.x);
      return { ans:v, unit:'', steps:[
        '극한 밀도 f_A(x) = (1−F(x))/μ = λe^{−λx} → P(A>x) = e^{−λx}',
        '= '+SVH.fmt(v)+' — 지수는 나이도 지수(무기억의 또 다른 얼굴)' ] }; },
    hints:['(1−F)/μ 적분.'] },
  { id:'u5-l3-06', level:3, type:'num', tags:['length-biased'], src:'교재 표준',
    params:{ b:{choices:[10,20],unit:'분'}, x:{choices:[4,8],unit:'분'} },
    constraint:function(p){ return p.x < p.b; },
    statement:function(p){ return '간격 U(0,'+p.b+')에서 임의 시점이 걸친 간격이 x='+p.x+'분보다 길 확률 P(X_I>x)=1−x²/b²는?'; },
    solve:function(p){ var v=1-p.x*p.x/(p.b*p.b);
      return { ans:v, unit:'', steps:[
        'length-biased 밀도 g(u)=u·f(u)/μ = 2u/b² → P(X_I>x) = 1−x²/b²',
        '= '+SVH.fmt(v)+' > 원래 확률 1−x/b='+SVH.fmt(1-p.x/p.b)+' — 긴 간격 쪽으로 휘어 있다' ] }; },
    hints:['길이 가중 밀도 u·f(u)/μ.'] },
  { id:'u5-l3-07', level:3, type:'num', tags:['보상=비례'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[5,8],unit:'분'}, cv:{choices:[0.5,1],unit:''}, al:{choices:[2,4],unit:'만원/분²'} },
    statement:function(p){ return '사이클 길이 X(평균 '+p.mu+'분, CV='+p.cv+')마다 보상 R=α·X² (α='+p.al+'만원/분²). 장기 보상률 αE[X²]/E[X]=αμ(1+CV²)은?'; },
    solve:function(p){ var v=p.al*p.mu*(1+p.cv*p.cv);
      return { ans:v, unit:'만원/분', steps:[
        'rate = αE[X²]/E[X] = α·μ(1+CV²) = '+p.al+'×'+p.mu+'×'+SVH.fmt(1+p.cv*p.cv),
        '= '+SVH.fmt(v)+' — 보상이 길이의 비선형 함수면 분산이 수익률에 들어온다' ] }; },
    hints:['E[X²]=μ²(1+CV²) ÷ μ.'] },
  { id:'u5-l3-08', level:3, type:'num', tags:['검사역설 일반'], src:'강의자료 대조',
    params:{ mu:{choices:[10,20],unit:'분'}, cv:{choices:[0,0.5,1],unit:''} },
    statement:function(p){ return '간격 평균 μ='+p.mu+'분, CV='+p.cv+'. 관측 간격 평균과 평균 잔여 대기를 구하라.'; },
    solve:function(p){ var EI=p.mu*(1+p.cv*p.cv);
      return { ans:{EI:EI, ER:EI/2}, unit:{EI:'분', ER:'분'}, steps:[
        'E[X_I] = μ(1+CV²) = '+SVH.fmt(EI)+'분',
        'E[대기] = E[X_I]/2 = '+SVH.fmt(EI/2)+'분 — CV=0이면 μ/2, CV=1(지수)이면 μ: 한 공식으로 전 스펙트럼' ] }; },
    hints:['잔여=관측/2 (대칭).'] },
  { id:'u5-l3-09', level:3, type:'num', tags:['수리공 수입'], src:'창작 문제(검산됨)',
    params:{ up:{choices:[20,40],unit:'일'}, dn:{choices:[2,4],unit:'일'}, w:{choices:[30,50],unit:'만원/일'} },
    statement:function(p){ return '기계: 가동 평균 '+p.up+'일↔수리 '+p.dn+'일. 수리 중에만 일당 '+p.w+'만원을 버는 수리공의 장기 수입률(만원/일)은?'; },
    solve:function(p){ var v=p.w*p.dn/(p.up+p.dn);
      return { ans:v, unit:'만원/일', steps:[
        '사이클당 수입 = w·μ_dn = '+(p.w*p.dn)+'만원, 사이클 = '+(p.up+p.dn)+'일',
        'rate = '+SVH.fmt(v)+'만원/일 = w×(수리 비율) — 보상률=비율×단가의 구조' ] }; },
    hints:['수리 비율부터.'] },
  { id:'u5-l3-10', level:3, type:'num', tags:['포아송 특례'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.2,0.5],unit:'/분'} },
    statement:function(p){ return '지수 간격(λ='+p.lam+'/분) 재생과정에서 ① 장기율 ② 관측 간격 평균 ③ 평균 잔여를 구하라.'; },
    solve:function(p){ var m=1/p.lam;
      return { ans:{rate:p.lam, EI:2*m, ER:m}, unit:{rate:'/분', EI:'분', ER:'분'}, steps:[
        '율 = λ = '+p.lam+'/분 · E[X_I] = 2/λ = '+SVH.fmt(2*m)+'분 (2배!)',
        'E[잔여] = 1/λ = '+SVH.fmt(m)+'분 — 포아송은 재생 이론의 깔끔한 특례로 재조명된다' ] }; },
    hints:['셋 다 앞 공식 대입.'] },
  { id:'u5-l3-11', level:3, type:'num', tags:['타이어 검사'], src:'기출 유형',
    params:{ b:{choices:[6,8],unit:'만km'} },
    statement:function(p){ return '타이어 수명 U(0,'+p.b+'만km)(즉시 교체). 무작위 시점 검사에서 ① 장착 중 타이어의 기대 총수명 ② 기대 잔여수명을 구하라.'; },
    solve:function(p){ return { ans:{EI:2*p.b/3, ER:p.b/3}, unit:{EI:'만km', ER:'만km'}, steps:[
        '검사가 잡은 타이어는 length-biased: E = 2b/3 = '+SVH.fmt(2*p.b/3)+'만km (> 평균 b/2)',
        '잔여 = b/3 = '+SVH.fmt(p.b/3)+'만km — 검사 데이터로 평균 수명을 추정하면 과대평가되는 이유' ] }; },
    hints:['모집단 평균≠표본(검사) 평균.'] },
  { id:'u5-l3-12', level:3, type:'num', tags:['통행 보상'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[3,5],unit:'분'}, fee:{choices:[2,4],unit:'천원'}, t:{choices:[600,1200],unit:'분'} },
    statement:function(p){ return '차량이 평균 '+p.mu+'분 간격(재생)으로 통과, 대당 요금 '+p.fee+'천원. t='+p.t+'분 동안 기대 수입(천원)은?'; },
    solve:function(p){ var v=p.fee*p.t/p.mu;
      return { ans:v, unit:'천원', steps:[
        '수입률 = fee/μ = '+SVH.fmt(p.fee/p.mu)+'천원/분',
        '× t = '+SVH.fmt(v)+'천원 — 재생보상 → 총량은 rate×시간' ] }; },
    hints:['율 계산 후 스케일.'] },
  { id:'u5-l3-13', level:3, type:'num', tags:['횟수 신뢰구간'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[2,4],unit:'분'}, sd:{choices:[1,2],unit:'분'}, t:{choices:[400,800],unit:'분'} },
    statement:function(p){ return '간격(μ='+p.mu+', σ='+p.sd+'분), t='+p.t+'분. N(t)의 근사 평균과 ±1σ 구간의 하한(t/μ−√(tσ²/μ³))을 구하라.'; },
    solve:function(p){ var m=p.t/p.mu, s=Math.sqrt(p.t*p.sd*p.sd/Math.pow(p.mu,3));
      return { ans:{E:m, lo:m-s}, unit:{E:'회', lo:'회'}, steps:[
        'E ≈ t/μ = '+SVH.fmt(m)+'회, SD ≈ '+SVH.fmt(s)+'회',
        '하한 ≈ '+SVH.fmt(m-s)+'회 — 처리량 보장 설계의 1차 감각(재생 CLT)' ] }; },
    hints:['l2-12 재사용.'] },
  { id:'u5-l3-14', level:3, type:'num', tags:['부분 가동 보상'], src:'창작 문제(검산됨)',
    params:{ up:{choices:[18,28],unit:'일'}, dn:{choices:[2,4],unit:'일'}, g:{choices:[100,200],unit:'만원/일'}, c:{choices:[50,80],unit:'만원/일'} },
    statement:function(p){ return '가동 중 '+p.g+'만원/일 수익, 수리 중 '+p.c+'만원/일 비용(가동 '+p.up+'일↔수리 '+p.dn+'일). 장기 순수익률(만원/일)은?'; },
    solve:function(p){ var v=(p.g*p.up-p.c*p.dn)/(p.up+p.dn);
      return { ans:v, unit:'만원/일', steps:[
        '사이클 순수익 = '+p.g+'×'+p.up+'−'+p.c+'×'+p.dn+' = '+(p.g*p.up-p.c*p.dn)+'만원',
        '÷ 사이클 '+(p.up+p.dn)+'일 = '+SVH.fmt(v)+'만원/일 — 이익·비용을 한 사이클에 다 싣고 나누면 끝' ] }; },
    hints:['사이클 단위 회계.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u5-l4-01', level:4, type:'derive', tags:['장기율 유도'], src:'교재 표준',
    statement:'재생과정에서 \\(N(t)/t\\to1/\\mu\\)를 대수법칙+끼워넣기(squeeze)로 유도하라.',
    steps:[
      '샌드위치: S_{N(t)} ≤ t < S_{N(t)+1} [왜] N(t)번째 재생은 t 이전, 다음 재생은 t 이후 — 정의 그대로',
      'N(t)로 나눔: S_{N(t)}/N(t) ≤ t/N(t) < S_{N(t)+1}/N(t)',
      '대수법칙: S_n/n → μ (iid 평균), 그리고 t→∞면 N(t)→∞',
      '양끝이 μ로 수렴 → t/N(t)→μ, 뒤집으면 N(t)/t → 1/μ (확률 1)',
      '극한 체크: 지수 간격이면 1/μ=λ (포아송과 정합) ✓ · μ=∞(무거운 꼬리)면 율 0 ✓'
    ],
    hints:['정의 부등식 한 줄이 전부.','역수 취하기 전 샌드위치.'],
    expl:'"평균만 알면 장기율이 나온다" — 분포 자유(distribution-free)라는 점이 재생 이론의 상품성이다.' },
  { id:'u5-l4-02', level:4, type:'num', tags:['계획교체 정책'], src:'기출 유형',
    params:{ lam:{choices:[0.1,0.2],unit:'/월'}, T:{choices:[3,6],unit:'월'}, cp:{choices:[10,20],unit:'만원'}, cf:{choices:[100,150],unit:'만원'} },
    statement:function(p){ return '수명 Exp(λ='+p.lam+'/월), T='+p.T+'월마다 계획교체('+p.cp+'만원), 그 전 고장 시 긴급교체('+p.cf+'만원). 사이클 평균 길이 E=(1−e^{−λT})/λ와 비용률 [c_p e^{−λT}+c_f(1−e^{−λT})]/E를 구하라.'; },
    solve:function(p){ var q=Math.exp(-p.lam*p.T), EL=(1-q)/p.lam, cost=p.cp*q+p.cf*(1-q);
      return { ans:{EL:EL, rate:cost/EL}, unit:{EL:'월', rate:'만원/월'}, steps:[
        '사이클=min(X,T): E[min] = ∫₀ᵀe^{−λt}dt = (1−e^{−λT})/λ = '+SVH.fmt(EL)+'월',
        '기대 비용 = '+SVH.fmt(cost)+' → rate = '+SVH.fmt(cost/EL)+'만원/월 — 지수 수명이면 T를 어떻게 잡아도 λc_f보다 못 내려간다(무기억: 예방교체 무익)' ] }; },
    hints:['P(계획)=e^{−λT}.','E[min(X,T)]는 생존함수 적분.'] },
  { id:'u5-l4-03', level:4, type:'derive', tags:['재생보상 유도'], src:'강의자료 대조',
    statement:'재생보상정리 \\(\\dfrac{R(t)}{t}\\to\\dfrac{E[R]}{E[X]}\\)를 장기율 정리로부터 유도하라.',
    steps:[
      '누적 보상 분해: R(t) ≈ Σ_{i=1}^{N(t)} R_i (완결 사이클 합 + 진행 중 조각은 유계) [왜] 사이클마다 보상이 쌓인다',
      'R(t)/t = [Σ R_i/N(t)] × [N(t)/t]',
      '첫 인자 → E[R] (iid 대수법칙), 둘째 인자 → 1/μ (u5-l4-01)',
      '∴ R(t)/t → E[R]/E[X] — 곱의 극한. R과 X가 사이클 안에서 종속이어도 성립하는 것이 강력',
      '극한 체크: R_i=X_i(보상=시간)면 rate=1 ✓ · R_i=1(횟수 세기)면 1/μ로 장기율 복원 ✓'
    ],
    hints:['"사이클 평균 × 사이클 빈도"로 쪼갠다.','마지막 미완 사이클은 t로 나누면 죽는다.'],
    expl:'강의 개요의 "재생보상정리의 뜻과 응용" 그 자체 — 가용도·비용률·평균 이득이 전부 이 곱 분해다.' },
  { id:'u5-l4-04', level:4, type:'num', tags:['3분포 역설 비교'], src:'기출 유형',
    params:{ mu:{choices:[10,20],unit:'분'} },
    statement:function(p){ return '평균 μ='+p.mu+'분이 같은 세 간격 분포 — 결정적, U(0,2μ), Exp — 의 평균 잔여 대기를 각각 구하라.'; },
    solve:function(p){ return { ans:{det:p.mu/2, unif:2*p.mu/3, exp:p.mu}, unit:{det:'분', unif:'분', exp:'분'}, steps:[
        '공식 E[R]=μ(1+CV²)/2: CV=0 → μ/2='+SVH.fmt(p.mu/2)+' · CV²=1/3 → 2μ/3='+SVH.fmt(2*p.mu/3)+' · CV=1 → μ='+p.mu,
        '규칙적일수록 대기가 짧다 — "배차 간격 평균"만으론 서비스가 정해지지 않는다' ] }; },
    hints:['E[R]=μ(1+CV²)/2 하나로 셋.'] },
  { id:'u5-l4-05', level:4, type:'num', tags:['SLA 역산'], src:'창작 문제(검산됨)',
    params:{ A:{choices:[0.95,0.99],unit:''}, dn:{choices:[2,5],unit:'시간'} },
    statement:function(p){ return '수리 평균이 '+p.dn+'시간으로 고정일 때 가용도 '+p.A+' 이상을 위해 필요한 평균 무고장시간(MTTF) 하한 μ_up=A·μ_dn/(1−A)을 구하라.'; },
    solve:function(p){ var v=p.A*p.dn/(1-p.A);
      return { ans:v, unit:'시간', steps:[
        'A=μ_up/(μ_up+μ_dn)을 μ_up에 대해 풀면 μ_up = A·μ_dn/(1−A)',
        '= '+SVH.fmt(v)+'시간 — 가용도 목표가 신뢰성 사양(MTTF)으로 번역: 99%는 95%보다 5배 이상 비싸다' ] }; },
    hints:['가용도 식 역산.'] },
  { id:'u5-l4-06', level:4, type:'derive', tags:['검사역설 유도'], src:'강의자료 대조',
    statement:'관측 간격의 length-biased 밀도 \\(g(u)=u f(u)/\\mu\\)와 \\(E[X_I]=E[X^2]/E[X]\\), 평균 잔여 \\(E[X^2]/(2E[X])\\)를 유도하라.',
    steps:[
      '긴 간격일수록 임의 시점을 덮을 확률이 길이에 비례 [왜] 시간축에서 각 간격이 차지하는 몫 = 자기 길이',
      '표집 가중 ∝ u·f(u), 정규화 상수 = ∫u f(u)du = μ → g(u) = u f(u)/μ',
      'E[X_I] = ∫u·g(u)du = E[X²]/μ = E[X²]/E[X] ≥ μ (코시-슈바르츠, 등호는 결정적)',
      '잔여: 걸린 간격 안 위치는 균등 → E[잔여] = E[X_I]/2 = E[X²]/(2μ) = μ(1+CV²)/2',
      '극한 체크: 결정적(CV=0) ⇒ 역설 소멸, E[X_I]=μ ✓ · 지수 ⇒ 2μ와 잔여 μ (u5-l2-05·07 정합) ✓'
    ],
    hints:['가중치=길이가 전부.','반쯤 지점이라 2로 나눈다.'],
    expl:'"검사·조사로 얻은 표본은 length-biased"라는 통계적 경고까지 겸하는 정리 — 시험 서술형 1순위.' },
  { id:'u5-l4-07', level:4, type:'num', tags:['재생 CLT'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[2,4],unit:'분'}, sd:{choices:[1,2],unit:'분'}, t:{choices:[400,900],unit:'분'}, n:{choices:[220,240],unit:'회'} },
    statement:function(p){ return '간격(μ='+p.mu+', σ='+p.sd+'), t='+p.t+'분에 N(t)≥'+p.n+'회를 원한다. z=(n−t/μ)/√(tσ²/μ³)를 구하라. (z가 크게 양수면 달성 어려움)'; },
    solve:function(p){ var m=p.t/p.mu, s=Math.sqrt(p.t*p.sd*p.sd/Math.pow(p.mu,3)), z=(p.n-m)/s;
      return { ans:z, unit:'', steps:[
        '평균 '+SVH.fmt(m)+'회, SD '+SVH.fmt(s)+'회',
        'z = ('+p.n+'−'+SVH.fmt(m)+')/'+SVH.fmt(s)+' = '+SVH.fmt(z)+' — 재생 CLT로 처리량 목표를 z-점수로 진단' ] }; },
    hints:['표준화(U1 l2-12)로 마무리.'] },
  { id:'u5-l4-08', level:4, type:'num', tags:['페널티 SLA'], src:'창작 문제(검산됨)',
    params:{ up:{choices:[95,190],unit:'시간'}, dn:{choices:[5,10],unit:'시간'}, g:{choices:[10,20],unit:'만원/시간'}, pen:{choices:[500,1000],unit:'만원'} },
    statement:function(p){ return '가동 '+p.up+'시간↔수리 '+p.dn+'시간, 가동 중 '+p.g+'만원/시간 수익, 다운 1회마다 위약금 '+p.pen+'만원. 장기 순수익률(만원/시간)은?'; },
    solve:function(p){ var v=(p.g*p.up-p.pen)/(p.up+p.dn);
      return { ans:v, unit:'만원/시간', steps:[
        '사이클 순수익 = '+p.g+'×'+p.up+'−'+p.pen+' = '+(p.g*p.up-p.pen)+'만원',
        'rate = '+SVH.fmt(v)+'만원/시간 — 시간 비례 보상과 사건 비례 벌금이 한 사이클 회계로 통합된다' ] }; },
    hints:['보상의 형태가 달라도 사이클로 묶으면 같다.'] }

]});
