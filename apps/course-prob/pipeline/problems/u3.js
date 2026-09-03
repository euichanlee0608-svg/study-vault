/* U3 포아송과정의 뜻 — 계수과정 공리, pmf, 도착간격, Erlang 대기시간, 조건부 균등성 (W2 후반~W3) */
SV_BANK.push({
  id: 'u3', no: 3, title: '포아송과정의 뜻', titleEn: 'The Poisson Process',
  scope: '계수과정 N(t) · 독립·정상 증분 공리 · P(N(t)=k)=e^{−λt}(λt)^k/k! · E=Var=λt · 도착간격 iid Exp(λ) · S_k~Erlang(k,λ) · {N(t)≥k}⇔{S_k≤t} · 조건부 균등성(이항)',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u3-l1-01', level:1, type:'mc', tags:['공리'], src:'강의자료 대조',
    statement:'율 λ인 포아송과정의 정의 조건이 아닌 것은?',
    choices:['도착 간격이 점점 짧아진다','N(0)=0','겹치지 않는 구간의 증분은 독립','증분 분포는 구간 길이에만 의존(정상성), 미소구간 도착확률 ≈ λh'],
    answer:0, expl:'포아송과정은 완전히 균질한 우연 — 간격은 iid Exp(λ)로 통계적으로 늘 같다. 짧아지는 건 비균질(U4) 이야기.' },
  { id:'u3-l1-02', level:1, type:'tf', tags:['pmf'], src:'교재 표준',
    statement:'율 λ 포아송과정에서 \\(P(N(t)=k)=e^{-\\lambda t}\\dfrac{(\\lambda t)^k}{k!}\\)이다.',
    answer:true, expl:'구간 길이 t 동안의 도착 수 ~ Poisson(μ=λt). μ는 "율×시간"의 무차원 기대 건수 — 모든 계산이 μ부터 시작한다.' },
  { id:'u3-l1-03', level:1, type:'mc', tags:['도착간격'], src:'강의자료 대조',
    statement:'포아송과정의 도착 간격 \\(T_1,T_2,\\dots\\)의 분포는?',
    choices:['서로 독립인 Exp(λ)','정규분포','간격이 갈수록 길어짐','균등분포'],
    answer:0, expl:'무기억성(U2)의 과정 버전 — "언제 봐도 다음 도착까지 Exp(λ)". 이 성질이 시뮬레이션(지수 간격 누적)의 근거다.' },
  { id:'u3-l1-04', level:1, type:'mc', tags:['평균=분산'], src:'교재 표준',
    statement:'N(t)의 평균과 분산은?',
    choices:['둘 다 λt','평균 λt, 분산 λ²t','평균 λ, 분산 t','둘 다 λ/t'],
    answer:0, expl:'E=Var=λt — 관측 데이터에서 분산/평균(Fano 인자)이 1에서 벗어나면 포아송 가정을 의심하는 진단으로 쓴다.' },
  { id:'u3-l1-05', level:1, type:'tf', tags:['독립 증분'], src:'교재 표준',
    statement:'겹치지 않는 두 구간의 도착 수는 독립이다: 오전에 폭주했다는 사실이 오후 분포를 바꾸지 않는다.',
    answer:true, expl:'독립 증분. 결합확률이 곱으로 풀리는 근거이며, "오전 폭주 후 오후는 잠잠하겠지"라는 도박사 오류를 정면으로 부정한다.' },
  { id:'u3-l1-06', level:1, type:'mc', tags:['대기시간'], src:'강의자료 대조',
    statement:'k번째 도착 시각 \\(S_k=T_1+\\cdots+T_k\\)의 분포와 핵심 항등식은?',
    choices:['S_k~Erlang(k,λ)이고 {N(t)≥k}⇔{S_k≤t}','S_k~Exp(kλ)','S_k~Poisson','S_k는 t와 무관'],
    answer:0, expl:'"k번째 도착이 t 이전" = "t까지 k건 이상". 이 다리로 Erlang 꼬리를 포아송 부분합으로 계산한다(적분 불필요).' },

  /* ---------- L2 (12) ---------- */
  { id:'u3-l2-01', level:2, type:'num', tags:['pmf'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[2,3,4],unit:'/시간'}, t:{choices:[0.5,1,2],unit:'시간'}, k:{choices:[0,1,2,3],unit:''} },
    statement:function(p){ return 'λ='+p.lam+'/시간 포아송 도착. t='+p.t+'시간 동안 정확히 k='+p.k+'건 도착할 확률은?'; },
    solve:function(p){ var m=p.lam*p.t, f=1,i; for(i=2;i<=p.k;i++) f*=i;
      var v=Math.exp(-m)*Math.pow(m,p.k)/f;
      return { ans:v, unit:'', steps:[
        'μ = λt = '+SVH.fmt(m)+' (기대 건수부터!)',
        'P = e^{−μ}μ^k/k! = '+SVH.fmt(v) ] }; },
    hints:['μ=λt 계산이 1단계.'] },
  { id:'u3-l2-02', level:2, type:'num', tags:['무도착'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.5,2,6],unit:'/시간'}, t:{choices:[0.5,1],unit:'시간'} },
    statement:function(p){ return 'λ='+p.lam+'/시간일 때 t='+p.t+'시간 동안 도착이 전혀 없을 확률은?'; },
    solve:function(p){ var v=Math.exp(-p.lam*p.t);
      return { ans:v, unit:'', steps:[
        'P(N(t)=0) = e^{−λt} = e^{−'+SVH.fmt(p.lam*p.t)+'} = '+SVH.fmt(v),
        '= P(첫 간격 > t): 같은 사건의 두 얼굴(계수 ↔ 간격)' ] }; },
    hints:['k=0 항만 남는다.'] },
  { id:'u3-l2-03', level:2, type:'num', tags:['평균·분산'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[3,5,10],unit:'/시간'}, t:{choices:[2,8],unit:'시간'} },
    statement:function(p){ return 'λ='+p.lam+'/시간, t='+p.t+'시간 관측. E[N(t)], Var[N(t)]와 표준편차를 구하라. (SD는 √λt)'; },
    solve:function(p){ var m=p.lam*p.t;
      return { ans:{E:m, SD:Math.sqrt(m)}, unit:{E:'건', SD:'건'}, steps:[
        'E = Var = λt = '+SVH.fmt(m),
        'SD = √(λt) = '+SVH.fmt(Math.sqrt(m))+' — 상대 요동 SD/E=1/√μ: 건수가 쌓일수록 매끈해진다' ] }; },
    hints:['포아송은 평균=분산.'] },
  { id:'u3-l2-04', level:2, type:'num', tags:['꼬리'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[1,2,3],unit:''} },
    statement:function(p){ return '기대 건수 μ=λt='+p.mu+'일 때 2건 이상 도착할 확률 P(N≥2)=1−e^{−μ}(1+μ)는?'; },
    solve:function(p){ var v=1-Math.exp(-p.mu)*(1+p.mu);
      return { ans:v, unit:'', steps:[
        'P(N≥2) = 1−P(0)−P(1) = 1−e^{−μ}(1+μ)',
        '= '+SVH.fmt(v)+' — "이상/이하"는 부분합으로' ] }; },
    hints:['여사건 두 항.'] },
  { id:'u3-l2-05', level:2, type:'num', tags:['정상 증분'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[2,4],unit:'/시간'}, s:{choices:[3,10],unit:'시'}, w:{choices:[0.5,1],unit:'시간'}, k:{choices:[1,2],unit:''} },
    statement:function(p){ return 'λ='+p.lam+'/시간. '+p.s+'시부터 '+p.w+'시간 동안 정확히 k='+p.k+'건 도착할 확률은? (시작 시각과 무관함에 주목)'; },
    solve:function(p){ var m=p.lam*p.w, f=1,i; for(i=2;i<=p.k;i++) f*=i;
      var v=Math.exp(-m)*Math.pow(m,p.k)/f;
      return { ans:v, unit:'', steps:[
        '정상성: 분포는 구간 길이 '+p.w+'에만 의존 → μ = '+SVH.fmt(m),
        'P = e^{−μ}μ^'+p.k+'/'+p.k+'! = '+SVH.fmt(v)+' — 시작점 '+p.s+'시는 미끼' ] }; },
    hints:['길이만 본다.'] },
  { id:'u3-l2-06', level:2, type:'num', tags:['독립 증분 곱'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[1,2],unit:'/시간'}, a:{choices:[0,1],unit:''}, b:{choices:[1,2],unit:''} },
    statement:function(p){ return 'λ='+p.lam+'/시간. 1시간째까지 '+p.a+'건, 그다음 1시간에 '+p.b+'건 도착할 결합확률은?'; },
    solve:function(p){ var f1=1,f2=1,i; for(i=2;i<=p.a;i++) f1*=i; for(i=2;i<=p.b;i++) f2*=i;
      var pa=Math.exp(-p.lam)*Math.pow(p.lam,p.a)/f1, pb=Math.exp(-p.lam)*Math.pow(p.lam,p.b)/f2;
      return { ans:pa*pb, unit:'', steps:[
        '독립 증분: P = P(N(1)='+p.a+')×P(증분='+p.b+') = '+SVH.fmt(pa)+'×'+SVH.fmt(pb),
        '= '+SVH.fmt(pa*pb)+' — 겹치지 않는 구간은 곱으로 쪼갠다' ] }; },
    hints:['구간 두 개 = 포아송 두 개의 곱.'] },
  { id:'u3-l2-07', level:2, type:'num', tags:['k번째 도착'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[2,3,5],unit:''}, lam:{choices:[2,4],unit:'/시간'} },
    statement:function(p){ return 'λ='+p.lam+'/시간 도착에서 k='+p.k+'번째 도착까지의 기대 시간 E[S_k]=k/λ와 분산 k/λ²을 구하라.'; },
    solve:function(p){ return { ans:{E:p.k/p.lam, V:p.k/(p.lam*p.lam)}, unit:{E:'시간', V:''}, steps:[
        'S_k = 간격 k개의 합(Erlang) → E = k/λ = '+SVH.fmt(p.k/p.lam)+'시간',
        'Var = k/λ² = '+SVH.fmt(p.k/(p.lam*p.lam))+' — U2 Erlang 모멘트의 재사용' ] }; },
    hints:['지수 k개의 합.'] },
  { id:'u3-l2-08', level:2, type:'num', tags:['조건부 이항'], src:'강의자료 대조',
    params:{ k:{choices:[3,4,5],unit:''}, j:{choices:[1,2],unit:''}, st:{choices:[0.25,0.5],unit:''} },
    constraint:function(p){ return p.j <= p.k; },
    statement:function(p){ return 'N(t)='+p.k+'건이 관측됐다. 앞부분 [0, '+p.st+'t]에 정확히 j='+p.j+'건이 있을 확률은? (조건부는 Binomial(k, s/t))'; },
    solve:function(p){ var C=1,i; for(i=0;i<p.j;i++){ C=C*(p.k-i)/(i+1); }
      var v=C*Math.pow(p.st,p.j)*Math.pow(1-p.st,p.k-p.j);
      return { ans:v, unit:'', steps:[
        '조건부 균등성: k건 각각이 독립적으로 확률 s/t='+p.st+'로 앞 구간에 떨어진다',
        'P = C('+p.k+','+p.j+')(s/t)^j(1−s/t)^{k−j} = '+SVH.fmt(v)+' — 포아송이 이항으로 바뀌는 마법' ] }; },
    hints:['각 도착이 동전던지기가 된다.'] },
  { id:'u3-l2-09', level:2, type:'num', tags:['간격 꼬리'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[3,6],unit:'/시간'}, x:{choices:[0.5,1],unit:'시간'} },
    statement:function(p){ return 'λ='+p.lam+'/시간 도착에서 한 간격이 x='+p.x+'시간을 넘길 확률 P(T>x)는?'; },
    solve:function(p){ var v=Math.exp(-p.lam*p.x);
      return { ans:v, unit:'', steps:[
        'T ~ Exp(λ) → P(T>x) = e^{−'+SVH.fmt(p.lam*p.x)+'}',
        '= '+SVH.fmt(v)+' — 계수 관점(N=0)과 같은 답: 관점 전환 연습' ] }; },
    hints:['간격=지수.'] },
  { id:'u3-l2-10', level:2, type:'num', tags:['율 추정'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[36,60,120],unit:'건'}, T:{choices:[12,24],unit:'시간'}, u:{choices:[2,3],unit:'시간'} },
    statement:function(p){ return 'T='+p.T+'시간 동안 '+p.n+'건이 관측됐다. 율 추정치 λ̂=n/T와, 향후 u='+p.u+'시간의 기대 건수를 구하라.'; },
    solve:function(p){ var lam=p.n/p.T;
      return { ans:{lam:lam, E:lam*p.u}, unit:{lam:'/시간', E:'건'}, steps:[
        'λ̂ = n/T = '+SVH.fmt(lam)+'/시간',
        'E[N(u)] = λ̂u = '+SVH.fmt(lam*p.u)+'건 — 실무에서 λ는 이렇게 잰다' ] }; },
    hints:['율=건수/시간.'] },
  { id:'u3-l2-11', level:2, type:'num', tags:['상대 요동'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[4,100],unit:'/시간'}, t:{choices:[1,25],unit:'시간'} },
    statement:function(p){ return 'λ='+p.lam+'/시간, t='+p.t+'시간의 변동계수 CV=SD/E=1/√(λt)는?'; },
    solve:function(p){ var v=1/Math.sqrt(p.lam*p.t);
      return { ans:v, unit:'', steps:[
        'CV = √(λt)/(λt) = 1/√(λt) = 1/√'+SVH.fmt(p.lam*p.t),
        '= '+SVH.fmt(v)+' — 표본이 커질수록 √ 법칙으로 안정(U1 1/√N과 같은 뿌리)' ] }; },
    hints:['1/√μ.'] },
  { id:'u3-l2-12', level:2, type:'num', tags:['인접비'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[2,4,8],unit:''}, k:{choices:[1,3,5],unit:''} },
    statement:function(p){ return 'μ='+p.mu+' 포아송에서 인접 확률비 P(N=k+1)/P(N=k)=μ/(k+1)을 k='+p.k+'에서 구하라.'; },
    solve:function(p){ var v=p.mu/(p.k+1);
      return { ans:v, unit:'', steps:[
        'P(k+1)/P(k) = μ/(k+1) = '+p.mu+'/'+(p.k+1)+' = '+SVH.fmt(v),
        (v>1?'>1: 아직 오르막 — 최빈값은 ⌊μ⌋ 근처':'<1: 내리막 — 최빈값을 지났다') ] }; },
    hints:['pmf 비에서 e^{−μ}가 소거.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u3-l3-01', level:3, type:'num', tags:['조건부 균등'], src:'강의자료 대조',
    params:{ t:{choices:[10,20],unit:'분'}, s:{choices:[2,5],unit:'분'} },
    constraint:function(p){ return p.s < p.t; },
    statement:function(p){ return '[0,'+p.t+'분]에 도착이 정확히 1건 있었다. 그 도착이 처음 '+p.s+'분 안에 있었을 확률은?'; },
    solve:function(p){ var v=p.s/p.t;
      return { ans:v, unit:'', steps:[
        '조건부 균등성: N(t)=1이면 도착 시각 ~ U(0,t)',
        'P = s/t = '+p.s+'/'+p.t+' = '+SVH.fmt(v)+' — λ가 답에서 사라진다!' ] }; },
    hints:['균등이라 길이 비.'] },
  { id:'u3-l3-02', level:3, type:'num', tags:['결합 분해'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[2,3],unit:'/시간'}, j:{choices:[1,2],unit:''}, k:{choices:[3,4],unit:''} },
    constraint:function(p){ return p.j <= p.k; },
    statement:function(p){ return 'λ='+p.lam+'/시간. P(N(1)='+p.j+' 그리고 N(2)='+p.k+')를 독립 증분으로 구하라.'; },
    solve:function(p){ var f1=1,f2=1,i,d=p.k-p.j; for(i=2;i<=p.j;i++) f1*=i; for(i=2;i<=d;i++) f2*=i;
      var v=Math.exp(-p.lam)*Math.pow(p.lam,p.j)/f1 * Math.exp(-p.lam)*Math.pow(p.lam,d)/f2;
      return { ans:v, unit:'', steps:[
        'N(2)='+p.k+' ⇔ 증분 N(2)−N(1)='+d+': P = P(N(1)='+p.j+')·P(증분='+d+')',
        '= '+SVH.fmt(v)+' — 결합은 언제나 "겹치지 않는 조각의 곱"으로 재작성' ] }; },
    hints:['N(2)를 증분으로 번역부터.'] },
  { id:'u3-l3-03', level:3, type:'num', tags:['S₂ 분포'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[2,4],unit:'/시간'}, t:{choices:[0.5,1],unit:'시간'} },
    statement:function(p){ return 'λ='+p.lam+'/시간에서 두 번째 도착이 t='+p.t+'시간 안에 일어날 확률 P(S₂≤t)=1−e^{−λt}(1+λt)는?'; },
    solve:function(p){ var m=p.lam*p.t, v=1-Math.exp(-m)*(1+m);
      return { ans:v, unit:'', steps:[
        '{S₂≤t} ⇔ {N(t)≥2}: 다리 항등식',
        '= 1−e^{−μ}(1+μ) = '+SVH.fmt(v)+' — U2 Erlang 꼬리의 재등장(적분 0회)' ] }; },
    hints:['계수로 번역하면 부분합.'] },
  { id:'u3-l3-04', level:3, type:'num', tags:['둘째 간격'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[1,3],unit:'/시간'}, x:{choices:[0.5,1],unit:'시간'} },
    statement:function(p){ return '첫 도착이 이미 있었다. 이후 x='+p.x+'시간 동안 추가 도착이 없을 확률은? (λ='+p.lam+')'; },
    solve:function(p){ var v=Math.exp(-p.lam*p.x);
      return { ans:v, unit:'', steps:[
        '간격 독립+무기억: 다음 간격 ~ Exp(λ) 새로 시작',
        'P(T₂>x) = e^{−'+SVH.fmt(p.lam*p.x)+'} = '+SVH.fmt(v)+' — 과거 도착 이력은 아무 정보가 없다' ] }; },
    hints:['리셋.'] },
  { id:'u3-l3-05', level:3, type:'num', tags:['건수 구간'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[30,50],unit:'/시간'}, t:{choices:[4,8],unit:'시간'} },
    statement:function(p){ return '콜센터 λ='+p.lam+'/시간, 근무 t='+p.t+'시간. 기대 건수 μ와 "μ±1σ" 구간(μ−√μ, μ+√μ)을 구하라.'; },
    solve:function(p){ var m=p.lam*p.t, s=Math.sqrt(m);
      return { ans:{lo:m-s, hi:m+s}, unit:{lo:'건', hi:'건'}, steps:[
        'μ = '+SVH.fmt(m)+', σ = √μ = '+SVH.fmt(s),
        '구간 ('+SVH.fmt(m-s)+', '+SVH.fmt(m+s)+') — 인력 계획의 1차 감각(μ가 크면 정규 근사)' ] }; },
    hints:['σ=√μ.'] },
  { id:'u3-l3-06', level:3, type:'num', tags:['도착시각 합'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[3,4,6],unit:''}, t:{choices:[10,12],unit:'분'} },
    statement:function(p){ return 'N(t)='+p.k+'건(t='+p.t+'분)이 주어졌을 때 도착 시각 합의 기댓값 E[ΣSᵢ|N=k]=kt/2는?'; },
    solve:function(p){ var v=p.k*p.t/2;
      return { ans:v, unit:'분', steps:[
        '조건부 균등: 각 도착 ~ U(0,t), 기대 t/2',
        '합 = k·t/2 = '+SVH.fmt(v)+'분 — 균등성 덕에 순서 무시하고 더한다' ] }; },
    hints:['균등 k개의 합.'] },
  { id:'u3-l3-07', level:3, type:'num', tags:['현재 관점'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[2,5],unit:'/시간'}, u:{choices:[0.5,2],unit:'시간'} },
    statement:function(p){ return '지금 시각 τ에 서서: 다음 도착까지 기대 시간과, 앞으로 u='+p.u+'시간 동안의 기대 도착 수를 구하라. (λ='+p.lam+')'; },
    solve:function(p){ return { ans:{E1:1/p.lam, E2:p.lam*p.u}, unit:{E1:'시간', E2:'건'}, steps:[
        '무기억: E[다음까지] = 1/λ = '+SVH.fmt(1/p.lam)+'시간 (τ가 언제든)',
        'E[N(τ,τ+u)] = λu = '+SVH.fmt(p.lam*p.u)+'건 — 정상성: 미래 창의 길이만 중요' ] }; },
    hints:['둘 다 τ 무관.'] },
  { id:'u3-l3-08', level:3, type:'num', tags:['홀수 도착'], src:'교재 표준',
    params:{ mu:{choices:[0.5,1,2],unit:''} },
    statement:function(p){ return 'μ='+p.mu+' 포아송에서 도착 수가 홀수일 확률 P(홀수)=(1−e^{−2μ})/2는?'; },
    solve:function(p){ var v=(1-Math.exp(-2*p.mu))/2;
      return { ans:v, unit:'', steps:[
        'Σ홀수 항 = (e^{μ}−e^{−μ})e^{−μ}/2 = (1−e^{−2μ})/2',
        '= '+SVH.fmt(v)+' — e^{±μ} 급수의 합·차 트릭: 짝수는 (1+e^{−2μ})/2' ] }; },
    hints:['sinh 급수.'] },
  { id:'u3-l3-09', level:3, type:'num', tags:['공분산'], src:'교재 표준',
    params:{ lam:{choices:[2,3],unit:'/시간'}, s:{choices:[1,2],unit:'시간'}, t:{choices:[3,5],unit:'시간'} },
    statement:function(p){ return 'λ='+p.lam+'일 때 Cov(N(s), N(t)) = λ·min(s,t)를 s='+p.s+', t='+p.t+'에서 구하라.'; },
    solve:function(p){ var v=p.lam*Math.min(p.s,p.t);
      return { ans:v, unit:'', steps:[
        'N(t)=N(s)+증분(독립) → Cov = Var(N(s)) = λs',
        '= '+SVH.fmt(v)+' — 겹치는 구간 [0,s]만 상관을 만든다' ] }; },
    hints:['공통 부분의 분산.'] },
  { id:'u3-l3-10', level:3, type:'num', tags:['간격 전부'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[2,3],unit:''}, lam:{choices:[2,4],unit:'/시간'}, x:{choices:[0.3,0.5],unit:'시간'} },
    statement:function(p){ return '처음 k='+p.k+'개 간격이 모두 x='+p.x+'시간을 넘길 확률 P=e^{−kλx}는? (λ='+p.lam+')'; },
    solve:function(p){ var v=Math.exp(-p.k*p.lam*p.x);
      return { ans:v, unit:'', steps:[
        '간격은 iid Exp(λ): P = (e^{−λx})^k = e^{−'+SVH.fmt(p.k*p.lam*p.x)+'}',
        '= '+SVH.fmt(v)+' — "여유 있는 스케줄"의 확률은 지수적으로 희귀하다' ] }; },
    hints:['독립의 곱.'] },
  { id:'u3-l3-11', level:3, type:'num', tags:['단위 환산'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.5,1.5],unit:'/분'}, T:{choices:[2,5],unit:'분'} },
    statement:function(p){ return '요청이 분당 λ='+p.lam+'건 포아송 도착. T='+p.T+'분 무요청일 확률과 시간당 율(λ×60)을 구하라.'; },
    solve:function(p){ return { ans:{P:Math.exp(-p.lam*p.T), lamH:p.lam*60}, unit:{P:'', lamH:'/시간'}, steps:[
        'P(N=0) = e^{−'+SVH.fmt(p.lam*p.T)+'} = '+SVH.fmt(Math.exp(-p.lam*p.T)),
        'λ = '+SVH.fmt(p.lam*60)+'/시간 — λt는 단위가 맞아야 무차원: 단위 실수가 최다 오답원' ] }; },
    hints:['λ와 t의 단위 통일.'] },
  { id:'u3-l3-12', level:3, type:'num', tags:['조건부 기대'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[6,9,12],unit:''}, st:{choices:[0.25,0.5],unit:''} },
    statement:function(p){ return 'N(t)='+p.k+'일 때 앞 구간 [0, '+p.st+'t]의 조건부 기대 건수 E[N(s)|N(t)=k]=k·(s/t)는?'; },
    solve:function(p){ var v=p.k*p.st;
      return { ans:v, unit:'건', steps:[
        '조건부 이항 Binomial(k, s/t)의 평균 = k(s/t)',
        '= '+p.k+'×'+p.st+' = '+SVH.fmt(v)+' — 총량이 정해지면 비율대로 나눠 갖는다' ] }; },
    hints:['이항 평균 np.'] },
  { id:'u3-l3-13', level:3, type:'num', tags:['합 과정'], src:'창작 문제(검산됨)',
    params:{ m1:{choices:[1,2],unit:''}, m2:{choices:[1.5,3],unit:''}, k:{choices:[2,3,4],unit:''} },
    statement:function(p){ return '독립 관측창 두 개에서 기대 건수 μ₁='+p.m1+', μ₂='+p.m2+'. 총 건수가 k='+p.k+'일 확률은? (합은 Poisson(μ₁+μ₂))'; },
    solve:function(p){ var m=p.m1+p.m2, f=1,i; for(i=2;i<=p.k;i++) f*=i;
      var v=Math.exp(-m)*Math.pow(m,p.k)/f;
      return { ans:v, unit:'', steps:[
        '포아송 합 = Poisson(μ₁+μ₂='+SVH.fmt(m)+') — 재생산성',
        'P = '+SVH.fmt(v)+' — U4 중첩 정리의 분포 버전' ] }; },
    hints:['μ를 더한 뒤 한 번에.'] },
  { id:'u3-l3-14', level:3, type:'num', tags:['다리 항등식'], src:'강의자료 대조',
    params:{ k:{choices:[2,3],unit:''}, mu:{choices:[1.5,2.5],unit:''} },
    statement:function(p){ return 'μ=λt='+p.mu+'에서 P(S_'+p.k+'>t)=P(N(t)≤'+(p.k-1)+')=Σ_{j<k}e^{−μ}μ^j/j!을 구하라. (Erlang 꼬리=포아송 cdf)'; },
    solve:function(p){ var s=0,f=1,j; for(j=0;j<p.k;j++){ if(j>0) f*=j; s+=Math.pow(p.mu,j)/f; }
      var v=Math.exp(-p.mu)*s;
      return { ans:v, unit:'', steps:[
        '{S_k>t} ⇔ {N(t)<k}: k번째가 아직 안 왔다 = 건수가 k 미만',
        '= e^{−μ}Σ_{j=0}^{'+(p.k-1)+'}μ^j/j! = '+SVH.fmt(v)+' — 이 다리 하나로 Erlang 적분이 전부 급수가 된다' ] }; },
    hints:['사건 번역이 계산을 대체.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u3-l4-01', level:4, type:'derive', tags:['pmf 유도'], src:'교재 표준',
    statement:'미소구간 공리(P(1건)=λh+o(h), P(≥2건)=o(h), 독립 증분)에서 \\(P_k(t)=e^{-\\lambda t}(\\lambda t)^k/k!\\)를 유도하라.',
    steps:[
      'P₀(t+h) = P₀(t)(1−λh)+o(h) [왜] t까지 0건 그리고 (t,t+h]에도 0건 — 독립 증분으로 곱',
      '(P₀(t+h)−P₀(t))/h → P₀\'=−λP₀, P₀(0)=1 ⇒ P₀(t)=e^{−λt}',
      '일반항: P_k\' = −λP_k+λP_{k−1} (k건 유지 vs k−1건에서 한 건 도착)',
      '귀납으로 풀면 P_k(t)=e^{−λt}(λt)^k/k! — 예: P₁=λte^{−λt} 확인',
      '극한 체크: Σ_kP_k=e^{−λt}e^{λt}=1 ✓ · t→0 ⇒ P₀→1 ✓ · E=Σk·P_k=λt ✓'
    ],
    hints:['미분방정식 사다리.','P₀부터 위로 올라간다.'],
    expl:'"율 λ의 순수 우연"이라는 물리적 가정 3줄이 pmf를 강제한다 — 포아송이 어디서나 나타나는 이유.' },
  { id:'u3-l4-02', level:4, type:'num', tags:['조건부 종합'], src:'기출 유형',
    params:{ k:{choices:[8,10],unit:''}, st:{choices:[0.25,0.4],unit:''} },
    statement:function(p){ return '하루(t) 동안 k='+p.k+'건 접수됐다. 오전 비중 s/t='+p.st+'일 때 오전 건수의 조건부 평균과 분산을 구하라.'; },
    solve:function(p){ var m=p.k*p.st, v=p.k*p.st*(1-p.st);
      return { ans:{E:m, V:v}, unit:{E:'건', V:''}, steps:[
        '조건부 Binomial(k='+p.k+', p='+p.st+'): E = kp = '+SVH.fmt(m),
        'Var = kp(1−p) = '+SVH.fmt(v)+' — 총량 고정 조건이 분산을 포아송(=평균)보다 줄인다' ] }; },
    hints:['이항 평균·분산.'] },
  { id:'u3-l4-03', level:4, type:'derive', tags:['Erlang 유도'], src:'강의자료 대조',
    statement:'다리 항등식 {N(t)≥k}⇔{S_k≤t}로 S_k의 밀도 \\(f_{S_k}(t)=\\lambda e^{-\\lambda t}\\dfrac{(\\lambda t)^{k-1}}{(k-1)!}\\) (Erlang)을 유도하라.',
    steps:[
      'P(S_k≤t) = P(N(t)≥k) = 1−Σ_{j=0}^{k−1}e^{−λt}(λt)^j/j! [왜] 사건 번역이 cdf를 공짜로 준다',
      '미분: 합의 항별 미분에서 인접 항이 연쇄 상쇄(telescoping)',
      '남는 항 = λe^{−λt}(λt)^{k−1}/(k−1)! — Erlang(k,λ) 밀도',
      '해석: "마지막 순간 t에 k번째 도착(λ), 그 전까지 k−1건(포아송)" — 밀도의 확률적 독해',
      '극한 체크: k=1 ⇒ λe^{−λt}(지수) ✓ · E=k/λ, k↑ ⇒ CLT로 정규 접근 ✓'
    ],
    hints:['cdf를 번역으로 얻고 미분만.','상쇄가 일어나는 걸 직접 확인.'],
    expl:'U5 재생과정에서 일반 분포 간격으로 확장할 때 이 다리({N≥k}⇔{S_k≤t})만은 그대로 살아남는다 — 구조의 핵심.' },
  { id:'u3-l4-04', level:4, type:'num', tags:['모멘트 트릭'], src:'교재 표준',
    params:{ mu:{choices:[0.5,1,2],unit:''} },
    statement:function(p){ return 'μ='+p.mu+' 포아송 N에 대해 E[(−1)^N]=e^{−2μ}를 구하라. (짝수−홀수 확률차)'; },
    solve:function(p){ var v=Math.exp(-2*p.mu);
      return { ans:v, unit:'', steps:[
        'E[z^N]=e^{μ(z−1)} (확률생성함수)에 z=−1 대입: e^{−2μ}',
        '= '+SVH.fmt(v)+' — P(짝수)−P(홀수)=e^{−2μ}: u3-l3-08과 한 몸' ] }; },
    hints:['생성함수 한 방.'] },
  { id:'u3-l4-05', level:4, type:'num', tags:['SLA 설계'], src:'기출 유형',
    params:{ T:{choices:[1,2],unit:'년'}, r:{choices:[0.95,0.99],unit:''} },
    statement:function(p){ return '서버 장애가 포아송 도착. T='+p.T+'년 무장애 확률을 '+p.r+' 이상으로 만들려면 장애율 λ 상한 −ln(r)/T (/년)은?'; },
    solve:function(p){ var v=-Math.log(p.r)/p.T;
      return { ans:v, unit:'/년', steps:[
        'P(N(T)=0)=e^{−λT} ≥ r → λ ≤ −ln(r)/T',
        '= '+SVH.fmt(v)+'/년 — 가용성 목표가 허용 장애율로 번역된다(U2 신뢰도 문제의 계수 버전)' ] }; },
    hints:['0건 확률로 세팅.'] },
  { id:'u3-l4-06', level:4, type:'num', tags:['결합 조건'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[2,3],unit:'/시간'}, a:{choices:[1,2],unit:'시간'}, b:{choices:[1,2],unit:'시간'}, j:{choices:[1,2],unit:''}, k:{choices:[3,4],unit:''} },
    constraint:function(p){ return p.j <= p.k; },
    statement:function(p){ return 'λ='+p.lam+'/시간. 창1(길이 '+p.a+')에 '+p.j+'건, 이어지는 창2(길이 '+p.b+')까지 누적 '+p.k+'건일 확률 P(N(a)='+p.j+', N(a+b)='+p.k+')는?'; },
    solve:function(p){ var d=p.k-p.j, m1=p.lam*p.a, m2=p.lam*p.b, f1=1,f2=1,i;
      for(i=2;i<=p.j;i++) f1*=i; for(i=2;i<=d;i++) f2*=i;
      var v=Math.exp(-m1)*Math.pow(m1,p.j)/f1*Math.exp(-m2)*Math.pow(m2,d)/f2;
      return { ans:v, unit:'', steps:[
        '증분 번역: 창2 단독 '+d+'건. 독립 곱:',
        'P = Pois(μ₁='+SVH.fmt(m1)+')['+p.j+'] × Pois(μ₂='+SVH.fmt(m2)+')['+d+'] = '+SVH.fmt(v) ] }; },
    hints:['누적을 증분으로 쪼개기.'] },
  { id:'u3-l4-07', level:4, type:'num', tags:['샷 노이즈'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[1e4,1e6],unit:'/s'}, t:{choices:[0.001,0.01],unit:'s'} },
    statement:function(p){ return '광검출기에 광자가 λ='+SVH.fmt(p.lam)+'/s 포아송 도착. 적분시간 t='+p.t+'s의 기대 광자 수 μ와 SNR=μ/σ=√μ를 구하라.'; },
    solve:function(p){ var m=p.lam*p.t;
      return { ans:{mu:m, SNR:Math.sqrt(m)}, unit:{mu:'개', SNR:''}, steps:[
        'μ = λt = '+SVH.fmt(m),
        'SNR = μ/√μ = √μ = '+SVH.fmt(Math.sqrt(m))+' — 샷 노이즈: 신호를 2배 모으면 SNR은 √2배 (계측의 근본 한계)' ] }; },
    hints:['포아송 잡음 σ=√μ.'] },
  { id:'u3-l4-08', level:4, type:'derive', tags:['조건부 균등성'], src:'교재 표준',
    statement:'N(t)=1일 때 도착 시각이 U(0,t)임을 유도하고, 일반 k건의 "순서통계량" 서술로 확장하라.',
    steps:[
      'P(S₁≤s | N(t)=1) = P(N(s)=1, N(t)−N(s)=0)/P(N(t)=1) [왜] 결합을 증분 곱으로',
      '= [λse^{−λs}·e^{−λ(t−s)}] / [λte^{−λt}] = s/t — λ가 완전 소거',
      'cdf가 s/t ⇒ U(0,t): 도착은 구간 어디든 평등하게',
      '일반화: N(t)=k이면 도착 시각들은 iid U(0,t)의 순서통계량과 동일 분포 — "포아송 = 완전 무작위 산포"의 정확한 의미',
      '극한 체크: s=t ⇒ 확률 1 ✓ · 이 성질에서 조건부 이항(u3-l2-08)·기대 kt/2(u3-l3-06)가 즉시 따라나온다 ✓'
    ],
    hints:['분자를 증분 곱으로 쪼개면 소거가 보인다.','"어디든 평등"이 결론.'],
    expl:'시뮬레이션 지름길(총 건수 뽑고 위치는 균등 산포)과 U4 thinning 독립성의 논리적 기반.' }

]});
