/* U2 지수분포의 성질 — 무기억성, 실패율, 최솟값·경쟁, 신뢰도 (W2 전반) */
SV_BANK.push({
  id: 'u2', no: 2, title: '지수분포의 성질', titleEn: 'Properties of the Exponential Distribution',
  scope: '지수 pdf/cdf·생존함수 e^{−λt} · 무기억성(유일) · 상수 실패율 · E=1/λ, Var=1/λ² · min 지수 = Exp(Σλ) · 경쟁 P(X₁<X₂)=λ₁/(λ₁+λ₂) · 직렬/병렬 수명 · Erlang 예고',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u2-l1-01', level:1, type:'mc', tags:['정의'], src:'교재 표준',
    statement:'모수 λ>0인 지수분포 Exp(λ)의 밀도·생존함수로 옳은 것은? (t≥0)',
    choices:['\\(f(t)=\\lambda e^{-\\lambda t}\\), \\(P(X>t)=e^{-\\lambda t}\\)','f(t)=e^{−λt}, P(X>t)=λe^{−λt}','f(t)=λt, P(X>t)=1−λt','f는 t<0에서도 양수'],
    answer:0, expl:'꼬리(생존함수)가 순수 지수 e^{−λt} — 이 단원 모든 성질이 이 꼬리 하나에서 나온다. λ는 시간당 발생률(rate).' },
  { id:'u2-l1-02', level:1, type:'tf', tags:['무기억성'], src:'강의자료 대조',
    statement:'지수분포는 무기억성 \\(P(X>s+t\\mid X>s)=P(X>t)\\)을 가지며, 연속분포 중 이 성질을 갖는 것은 지수분포뿐이다.',
    answer:true, expl:'"이미 s만큼 살았다"는 정보가 남은 수명 분포를 바꾸지 못한다. 유일성 덕분에 "무기억 가정 = 지수 가정"이 동치가 된다(포아송과정의 기둥).' },
  { id:'u2-l1-03', level:1, type:'mc', tags:['실패율'], src:'교재 표준',
    statement:'실패율(hazard rate) \\(h(t)=f(t)/P(X>t)\\)에 대해 옳은 것은?',
    choices:['지수분포는 h(t)=λ로 상수 — 노화도 길들이기도 없다','지수분포는 h(t)가 증가','h(t)는 항상 감소','h는 확률이라 1을 못 넘는다'],
    answer:0, expl:'λe^{−λt}/e^{−λt}=λ. 상수 실패율=무기억성의 미분 버전. h는 순간 발생률이라 1을 넘을 수 있다(단위: 1/시간).' },
  { id:'u2-l1-04', level:1, type:'mc', tags:['모멘트'], src:'교재 표준',
    statement:'X~Exp(λ)의 평균과 분산은?',
    choices:['\\(E[X]=1/\\lambda,\\ \\mathrm{Var}(X)=1/\\lambda^2\\)','E=λ, Var=λ','E=1/λ, Var=1/λ','E=1/λ², Var=1/λ'],
    answer:0, expl:'표준편차=평균(CV=1)이 지수의 지문. λ는 rate(1/시간), 1/λ는 평균 대기시간 — 단위로 헷갈림을 방지하라.' },
  { id:'u2-l1-05', level:1, type:'tf', tags:['최솟값'], src:'강의자료 대조',
    statement:'독립인 \\(X_i\\sim Exp(\\lambda_i)\\)들의 최솟값은 \\(\\min_i X_i\\sim Exp(\\lambda_1+\\cdots+\\lambda_n)\\)이다.',
    answer:true, expl:'P(min>t)=Πe^{−λᵢt}=e^{−(Σλᵢ)t}. "여러 알람 중 첫 번째"가 다시 지수 — 포아송 중첩(U4)과 직렬 시스템 수명의 근거.' },
  { id:'u2-l1-06', level:1, type:'mc', tags:['경쟁'], src:'강의자료 대조',
    statement:'독립 \\(X_1\\sim Exp(\\lambda_1)\\), \\(X_2\\sim Exp(\\lambda_2)\\)일 때 \\(P(X_1<X_2)\\)는?',
    choices:['\\(\\dfrac{\\lambda_1}{\\lambda_1+\\lambda_2}\\)','λ₂/(λ₁+λ₂)','1/2 (항상)','λ₁λ₂'],
    answer:0, expl:'빠른 쪽(rate 큰 쪽)이 이길 확률이 rate 비례 — "경쟁하는 지수" 공식. U4에서 "다음 도착이 타입1일 확률"로 재등장.' },

  /* ---------- L2 (12) ---------- */
  { id:'u2-l2-01', level:2, type:'num', tags:['생존확률'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.2,0.5,1],unit:'/시간'}, t:{choices:[1,2,4],unit:'시간'} },
    statement:function(p){ return '수명 X~Exp(λ='+p.lam+'/시간)인 부품이 t='+p.t+'시간 이상 살아남을 확률은?'; },
    solve:function(p){ var v=Math.exp(-p.lam*p.t);
      return { ans:v, unit:'', steps:[
        'P(X>t) = e^{−λt} = e^{−'+SVH.fmt(p.lam*p.t)+'}',
        '= '+SVH.fmt(v)+' — λt(무차원)만 정하면 답이 정해진다' ] }; },
    hints:['λt부터 계산.'] },
  { id:'u2-l2-02', level:2, type:'num', tags:['구간확률'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.5,1],unit:'/시간'}, s:{choices:[1,2],unit:'시간'}, t:{choices:[3,4],unit:'시간'} },
    statement:function(p){ return 'X~Exp('+p.lam+')에서 P('+p.s+'<X<'+p.t+')는?'; },
    solve:function(p){ var v=Math.exp(-p.lam*p.s)-Math.exp(-p.lam*p.t);
      return { ans:v, unit:'', steps:[
        'P(s<X<t) = P(X>s)−P(X>t) = e^{−λs}−e^{−λt}',
        '= '+SVH.fmt(Math.exp(-p.lam*p.s))+'−'+SVH.fmt(Math.exp(-p.lam*p.t))+' = '+SVH.fmt(v)+' — 꼬리 두 개의 차' ] }; },
    hints:['cdf 말고 꼬리 차가 빠르다.'] },
  { id:'u2-l2-03', level:2, type:'num', tags:['평균·표준편차'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.25,0.5,2],unit:'/시간'} },
    statement:function(p){ return '고장률 λ='+p.lam+'/시간인 지수 수명의 평균(MTTF)과 표준편차는?'; },
    solve:function(p){ var v=1/p.lam;
      return { ans:{E:v, SD:v}, unit:{E:'시간', SD:'시간'}, steps:[
        'E[X] = 1/λ = '+SVH.fmt(v)+'시간 (MTTF)',
        'SD = 1/λ = '+SVH.fmt(v)+'시간 — 평균=표준편차(CV=1)가 지수의 지문' ] }; },
    hints:['둘이 같다.'] },
  { id:'u2-l2-04', level:2, type:'num', tags:['중앙값'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.1,0.5,1],unit:'/시간'} },
    statement:function(p){ return 'X~Exp(λ='+p.lam+')의 중앙값 t_{1/2}=ln2/λ는? (평균과 비교)'; },
    solve:function(p){ var v=Math.log(2)/p.lam;
      return { ans:v, unit:'시간', steps:[
        'e^{−λt}=1/2 → t = ln2/λ = 0.693×'+SVH.fmt(1/p.lam),
        '= '+SVH.fmt(v)+'시간 — 평균(1/λ)의 69%: 오른쪽 긴 꼬리가 평균을 끌어올린다' ] }; },
    hints:['꼬리=1/2로 놓고 로그.'] },
  { id:'u2-l2-05', level:2, type:'num', tags:['무기억성'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.2,0.5],unit:'/시간'}, s:{choices:[3,10],unit:'시간'}, t:{choices:[1,2],unit:'시간'} },
    statement:function(p){ return '이미 s='+p.s+'시간 작동한 부품(Exp(λ='+p.lam+'))이 추가로 t='+p.t+'시간 더 살 확률 P(X>s+t|X>s)는?'; },
    solve:function(p){ var v=Math.exp(-p.lam*p.t);
      return { ans:v, unit:'', steps:[
        '무기억성: P(X>s+t|X>s) = P(X>t) = e^{−'+SVH.fmt(p.lam*p.t)+'}',
        '= '+SVH.fmt(v)+' — s='+p.s+'이 몇이든 답이 같다: "중고도 새것과 같다"' ] }; },
    hints:['s는 미끼다.'] },
  { id:'u2-l2-06', level:2, type:'num', tags:['동일 min'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[2,3,5],unit:''}, lam:{choices:[0.5,1],unit:'/시간'} },
    statement:function(p){ return '같은 λ='+p.lam+'인 독립 지수 수명 부품 n='+p.n+'개 직렬 시스템(하나라도 고장=고장)의 평균 수명 E[min]=1/(nλ)은?'; },
    solve:function(p){ var v=1/(p.n*p.lam);
      return { ans:v, unit:'시간', steps:[
        'min ~ Exp(nλ='+SVH.fmt(p.n*p.lam)+')',
        'E = 1/(nλ) = '+SVH.fmt(v)+'시간 — 부품 수에 반비례로 짧아진다' ] }; },
    hints:['rate가 n배로 합쳐진다.'] },
  { id:'u2-l2-07', level:2, type:'num', tags:['경쟁 종합'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[1,2,3],unit:'/시간'}, l2:{choices:[1,2,4],unit:'/시간'} },
    statement:function(p){ return '두 서버 수명 X₁~Exp('+p.l1+'), X₂~Exp('+p.l2+'). 첫 고장까지 평균 시간과, 그것이 서버 1일 확률을 구하라.'; },
    solve:function(p){ var s=p.l1+p.l2;
      return { ans:{Emin:1/s, p1:p.l1/s}, unit:{Emin:'시간', p1:''}, steps:[
        'min ~ Exp('+s+') → E[min] = 1/'+s+' = '+SVH.fmt(1/s)+'시간',
        'P(1번 먼저) = λ₁/(λ₁+λ₂) = '+p.l1+'/'+s+' = '+SVH.fmt(p.l1/s)+' — 언제(min)와 누가(경쟁)는 독립이기도 하다' ] }; },
    hints:['합 rate와 rate 비.'] },
  { id:'u2-l2-08', level:2, type:'num', tags:['λ 역산'], src:'창작 문제(검산됨)',
    params:{ t0:{choices:[2,5,10],unit:'년'} },
    statement:function(p){ return '어떤 기기의 절반이 t₀='+p.t0+'년 안에 고장난다(지수 수명). λ=ln2/t₀와 MTTF를 구하라.'; },
    solve:function(p){ var lam=Math.log(2)/p.t0;
      return { ans:{lam:lam, MTTF:1/lam}, unit:{lam:'/년', MTTF:'년'}, steps:[
        '중앙값 t₀ → λ = ln2/t₀ = '+SVH.fmt(lam)+'/년',
        'MTTF = 1/λ = '+SVH.fmt(1/lam)+'년 — 중앙값의 1.44배' ] }; },
    hints:['중앙값 공식 역이용.'] },
  { id:'u2-l2-09', level:2, type:'num', tags:['평균 초과 확률'], src:'교재 표준',
    params:{ c:{choices:[1,2,3],unit:''} },
    statement:function(p){ return '지수 수명이 평균의 '+p.c+'배 이상 지속될 확률 P(X>c·E[X])=e^{−c}는? (λ와 무관함에 주목)'; },
    solve:function(p){ var v=Math.exp(-p.c);
      return { ans:v, unit:'', steps:[
        'P(X>c/λ) = e^{−λ·c/λ} = e^{−c}',
        '= '+SVH.fmt(v)+' — 평균 넘길 확률이 37%뿐: 지수는 "일찍 죽는 다수+오래 사는 소수"' ] }; },
    hints:['λ가 소거된다.'] },
  { id:'u2-l2-10', level:2, type:'num', tags:['직렬 이질'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[0.1,0.2],unit:'/년'}, l2:{choices:[0.3,0.5],unit:'/년'}, l3:{choices:[0.2,0.4],unit:'/년'} },
    statement:function(p){ return '고장률 '+p.l1+', '+p.l2+', '+p.l3+'/년인 세 부품 직렬 시스템의 유효 고장률과 MTTF는?'; },
    solve:function(p){ var s=p.l1+p.l2+p.l3;
      return { ans:{lam:s, MTTF:1/s}, unit:{lam:'/년', MTTF:'년'}, steps:[
        'λ_sys = Σλᵢ = '+SVH.fmt(s)+'/년 (min의 rate 합)',
        'MTTF = 1/λ_sys = '+SVH.fmt(1/s)+'년 — 신뢰도 공학의 기본 산수' ] }; },
    hints:['직렬=min=rate 합.'] },
  { id:'u2-l2-11', level:2, type:'num', tags:['신뢰도 목표'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.01,0.05],unit:'/시간'}, r:{choices:[0.9,0.99],unit:''} },
    statement:function(p){ return '고장률 λ='+p.lam+'/시간 장비가 신뢰도 '+p.r+' 이상을 유지하는 최대 운용시간 t=−ln(r)/λ는?'; },
    solve:function(p){ var v=-Math.log(p.r)/p.lam;
      return { ans:v, unit:'시간', steps:[
        'e^{−λt} ≥ r → t ≤ −ln(r)/λ = '+SVH.fmt(-Math.log(p.r))+'/'+p.lam,
        '= '+SVH.fmt(v)+'시간 — 정비 주기 설계의 기본형' ] }; },
    hints:['로그로 t를 꺼낸다.'] },
  { id:'u2-l2-12', level:2, type:'num', tags:['표준화'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.5,2,4],unit:'/시간'}, x:{choices:[1,2],unit:'시간'} },
    statement:function(p){ return 'X~Exp(λ='+p.lam+')에서 Y=λX는 Exp(1)이다. x='+p.x+'시간의 표준화 값 y=λx와 P(X>x)=e^{−y}를 구하라.'; },
    solve:function(p){ var y=p.lam*p.x;
      return { ans:{y:y, P:Math.exp(-y)}, unit:{y:'', P:''}, steps:[
        'y = λx = '+SVH.fmt(y)+' — 지수는 λ 하나 차이라 무차원 y축 하나로 통일된다',
        'P(X>x) = e^{−y} = '+SVH.fmt(Math.exp(-y)) ] }; },
    hints:['λt가 유일한 무차원 변수.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u2-l3-01', level:3, type:'num', tags:['병렬 수명'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[0.5,1],unit:'/년'}, l2:{choices:[1,2],unit:'/년'} },
    statement:function(p){ return '병렬(둘 다 고장나야 고장) 시스템: X₁~Exp('+p.l1+'), X₂~Exp('+p.l2+') 독립. E[max]=1/λ₁+1/λ₂−1/(λ₁+λ₂)는?'; },
    solve:function(p){ var v=1/p.l1+1/p.l2-1/(p.l1+p.l2);
      return { ans:v, unit:'년', steps:[
        'max = X₁+X₂−min이므로 E[max]=E[X₁]+E[X₂]−E[min]',
        '= '+SVH.fmt(1/p.l1)+'+'+SVH.fmt(1/p.l2)+'−'+SVH.fmt(1/(p.l1+p.l2))+' = '+SVH.fmt(v)+'년 — 이중화의 이득 정량화' ] }; },
    hints:['min+max=합 항등식.'] },
  { id:'u2-l3-02', level:3, type:'num', tags:['순서 확률'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[1,2],unit:''}, l2:{choices:[1,3],unit:''}, l3:{choices:[2,4],unit:''} },
    statement:function(p){ return '독립 Exp(λ₁='+p.l1+'), Exp(λ₂='+p.l2+'), Exp(λ₃='+p.l3+')이 정확히 X₁<X₂<X₃ 순서로 끝날 확률은?'; },
    solve:function(p){ var s=p.l1+p.l2+p.l3, v=(p.l1/s)*(p.l2/(p.l2+p.l3));
      return { ans:v, unit:'', steps:[
        '1등이 X₁: λ₁/Σ = '+SVH.fmt(p.l1/s)+'. 무기억성으로 남은 둘은 리셋 — 2등이 X₂: λ₂/(λ₂+λ₃) = '+SVH.fmt(p.l2/(p.l2+p.l3)),
        '곱 = '+SVH.fmt(v)+' — 경쟁을 단계별로 쪼개는 무기억성의 힘' ] }; },
    hints:['라운드마다 새 경쟁.'] },
  { id:'u2-l3-03', level:3, type:'num', tags:['min 꼬리'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[0.5,1],unit:'/시간'}, l2:{choices:[1,1.5],unit:'/시간'}, t:{choices:[0.5,1],unit:'시간'} },
    statement:function(p){ return '두 부품(λ₁='+p.l1+', λ₂='+p.l2+') 직렬 시스템이 t='+p.t+'시간 무고장일 확률 P(min>t)는?'; },
    solve:function(p){ var v=Math.exp(-(p.l1+p.l2)*p.t);
      return { ans:v, unit:'', steps:[
        'P(min>t) = P(X₁>t)P(X₂>t) = e^{−(λ₁+λ₂)t}',
        '= e^{−'+SVH.fmt((p.l1+p.l2)*p.t)+'} = '+SVH.fmt(v)+' — 직렬 신뢰도는 곱 = rate는 합' ] }; },
    hints:['둘 다 살아야 min>t.'] },
  { id:'u2-l3-04', level:3, type:'num', tags:['Erlang-2 꼬리'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[1,2],unit:'/시간'}, t:{choices:[1,2],unit:'시간'} },
    statement:function(p){ return '지수 수명 부품+예비품 1개(핫스왑): 총 수명 S₂=X₁+X₂. P(S₂>t)=e^{−λt}(1+λt)는? (λ='+p.lam+', t='+p.t+')'; },
    solve:function(p){ var m=p.lam*p.t, v=Math.exp(-m)*(1+m);
      return { ans:v, unit:'', steps:[
        'S₂>t ⇔ t까지 고장이 1건 이하(포아송 다리): e^{−λt}(1+λt)',
        '= '+SVH.fmt(v)+' — 지수 합(Erlang)의 꼬리는 포아송 부분합: U3의 핵심 항등식 예고' ] }; },
    hints:['고장 횟수로 번역하면 쉽다.'] },
  { id:'u2-l3-05', level:3, type:'num', tags:['Erlang 모멘트'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[2,3,5],unit:''}, lam:{choices:[1,2],unit:'/시간'} },
    statement:function(p){ return 'Erlang(k='+p.k+', λ='+p.lam+') = 지수 '+p.k+'개의 합. 평균과 분산은?'; },
    solve:function(p){ return { ans:{E:p.k/p.lam, V:p.k/(p.lam*p.lam)}, unit:{E:'시간', V:''}, steps:[
        'E = k/λ = '+SVH.fmt(p.k/p.lam)+' · Var = k/λ² = '+SVH.fmt(p.k/(p.lam*p.lam))+' (독립 합)',
        'CV = 1/√k < 1: 겹칠수록 규칙적 — 지수(CV=1)와 결정적(CV=0) 사이의 다리' ] }; },
    hints:['합이니 평균·분산 다 k배.'] },
  { id:'u2-l3-06', level:3, type:'num', tags:['3자 경쟁'], src:'창작 문제(검산됨)',
    params:{ l1:{choices:[0.2,0.5],unit:'/년'}, l2:{choices:[0.3,0.6],unit:'/년'}, l3:{choices:[0.5,1],unit:'/년'} },
    statement:function(p){ return '세 원인(λ='+p.l1+', '+p.l2+', '+p.l3+'/년)이 경쟁하는 시스템. 첫 고장까지 기대 시간과 원인이 3번일 확률을 구하라.'; },
    solve:function(p){ var s=p.l1+p.l2+p.l3;
      return { ans:{Emin:1/s, p3:p.l3/s}, unit:{Emin:'년', p3:''}, steps:[
        'E[min] = 1/Σλ = '+SVH.fmt(1/s)+'년',
        'P(원인=3) = λ₃/Σλ = '+SVH.fmt(p.l3/s)+' — 경쟁 위험(competing risks)의 기본 산수' ] }; },
    hints:['합 rate + rate 비.'] },
  { id:'u2-l3-07', level:3, type:'num', tags:['잔여수명'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.1,0.25],unit:'/년'}, s:{choices:[2,5],unit:'년'} },
    statement:function(p){ return 'λ='+p.lam+'/년 지수 수명 부품이 이미 s='+p.s+'년 사용됐다. 기대 잔여수명과 기대 총수명(현시점 기준)을 구하라.'; },
    solve:function(p){ return { ans:{Er:1/p.lam, Et:p.s+1/p.lam}, unit:{Er:'년', Et:'년'}, steps:[
        '무기억성 → 잔여 ~ Exp(λ): E[잔여] = 1/λ = '+SVH.fmt(1/p.lam)+'년 (새것과 동일!)',
        'E[총수명|생존] = s+1/λ = '+SVH.fmt(p.s+1/p.lam)+'년 — 오래 산 개체의 총수명 기대는 계속 늘어난다' ] }; },
    hints:['중고 보정이 없다.'] },
  { id:'u2-l3-08', level:3, type:'num', tags:['조건부 생존'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.2,0.5],unit:'/년'}, t:{choices:[1,2],unit:'년'}, u:{choices:[1,3],unit:'년'} },
    statement:function(p){ return 'λ='+p.lam+'/년 장비가 보증기간 t='+p.t+'년을 넘겼다. 추가로 u='+p.u+'년 더 무고장일 확률은?'; },
    solve:function(p){ var v=Math.exp(-p.lam*p.u);
      return { ans:v, unit:'', steps:[
        '무기억성: P = e^{−λu} = e^{−'+SVH.fmt(p.lam*p.u)+'}',
        '= '+SVH.fmt(v)+' — 보증 통과 이력은 프리미엄이 아니다(지수 가정 하에서)' ] }; },
    hints:['u만 남는다.'] },
  { id:'u2-l3-09', level:3, type:'num', tags:['분포 비교'], src:'창작 문제(검산됨)',
    params:{ c:{choices:[1.5,1.8],unit:''} },
    statement:function(p){ return '평균 m이 같은 두 수명 모형이 m의 '+p.c+'배를 넘길 확률: 지수 e^{−c}와 균등 U(0,2m)의 (2−c)/2를 비교하라.'; },
    solve:function(p){ return { ans:{pe:Math.exp(-p.c), pu:(2-p.c)/2}, unit:{pe:'', pu:''}, steps:[
        '지수: e^{−'+p.c+'} = '+SVH.fmt(Math.exp(-p.c))+' · 균등: (2−'+p.c+')/2 = '+SVH.fmt((2-p.c)/2),
        '평균이 같아도 꼬리가 다르면 위험 평가가 다르다 — 분포 가정이 곧 모델링 결정' ] }; },
    hints:['균등은 2m에서 꼬리가 끊긴다.'] },
  { id:'u2-l3-10', level:3, type:'num', tags:['max 재출발'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.5,1,2],unit:'/시간'} },
    statement:function(p){ return '같은 λ='+p.lam+'인 두 지수 수명의 E[max]를 "min 후 재출발"로 구하라: E[max]=1/(2λ)+1/λ.'; },
    solve:function(p){ var v=1/(2*p.lam)+1/p.lam;
      return { ans:v, unit:'시간', steps:[
        '첫 고장까지 Exp(2λ): 1/(2λ). 남은 하나는 무기억으로 리셋 → 추가 1/λ',
        'E[max] = '+SVH.fmt(1/(2*p.lam))+'+'+SVH.fmt(1/p.lam)+' = '+SVH.fmt(v)+'시간 — 재출발 논법은 U5 재생 아이디어의 씨앗' ] }; },
    hints:['단계별로 시계를 리셋.'] },
  { id:'u2-l3-11', level:3, type:'num', tags:['가용도 목표'], src:'창작 문제(검산됨)',
    params:{ r:{choices:[0.95,0.99],unit:''}, T:{choices:[100,1000],unit:'시간'} },
    statement:function(p){ return 'T='+p.T+'시간 임무에서 신뢰도 '+p.r+' 이상이 되려면 고장률 λ가 얼마 이하여야 하는가? (λ_max=−ln r/T)'; },
    solve:function(p){ var v=-Math.log(p.r)/p.T;
      return { ans:v, unit:'/시간', steps:[
        'e^{−λT} ≥ r → λ ≤ −ln(r)/T = '+SVH.fmt(-Math.log(p.r))+'/'+p.T,
        '= '+SVH.fmt(v)+'/시간 — 요구 신뢰도가 부품 사양(λ)으로 번역된다' ] }; },
    hints:['u2-l2-11의 역방향.'] },
  { id:'u2-l3-12', level:3, type:'num', tags:['누적 위험'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.002,0.01],unit:'/시간'}, t:{choices:[100,500],unit:'시간'} },
    statement:function(p){ return '고장률 λ='+p.lam+'/시간, 운용 t='+p.t+'시간의 누적 위험 H=λt와 신뢰도 R=e^{−H}를 구하라.'; },
    solve:function(p){ var Hh=p.lam*p.t;
      return { ans:{H:Hh, R:Math.exp(-Hh)}, unit:{H:'', R:''}, steps:[
        'H = λt = '+SVH.fmt(Hh)+' (무차원 누적 위험)',
        'R = e^{−H} = '+SVH.fmt(Math.exp(-Hh))+' — H가 0.1이면 R≈90%: H≈1−R 근사(작을 때)도 확인' ] }; },
    hints:['H 하나로 신뢰도가 결정.'] },
  { id:'u2-l3-13', level:3, type:'num', tags:['콜센터'], src:'기출 유형',
    params:{ lam:{choices:[2,3,5],unit:'/분'}, t:{choices:[0.5,1],unit:'분'} },
    statement:function(p){ return '문의 전화가 λ='+p.lam+'/분 지수 간격으로 도착. 다음 전화가 t='+p.t+'분 안에 올 확률과 평균 대기시간을 구하라.'; },
    solve:function(p){ var v=1-Math.exp(-p.lam*p.t);
      return { ans:{P:v, E:1/p.lam}, unit:{P:'', E:'분'}, steps:[
        'P(T≤t) = 1−e^{−λt} = '+SVH.fmt(v),
        'E[T] = 1/λ = '+SVH.fmt(1/p.lam)+'분 — 이 도착 간격 그림이 그대로 U3 포아송과정이 된다' ] }; },
    hints:['도착간격=지수.'] },
  { id:'u2-l3-14', level:3, type:'num', tags:['부품 혼합'], src:'창작 문제(검산됨)',
    params:{ w:{choices:[0.3,0.5],unit:''}, l1:{choices:[0.5,1],unit:'/년'}, l2:{choices:[2,4],unit:'/년'} },
    statement:function(p){ return '로트에 A형(비중 '+p.w+', λ='+p.l1+')과 B형('+SVH.fmt(1-p.w)+', λ='+p.l2+')이 섞여 있다. 임의 부품의 t=1년 생존확률(전확률)은?'; },
    solve:function(p){ var v=p.w*Math.exp(-p.l1)+(1-p.w)*Math.exp(-p.l2);
      return { ans:v, unit:'', steps:[
        'P(X>1) = w·e^{−λ₁}+(1−w)e^{−λ₂} = '+p.w+'×'+SVH.fmt(Math.exp(-p.l1))+'+'+SVH.fmt(1-p.w)+'×'+SVH.fmt(Math.exp(-p.l2)),
        '= '+SVH.fmt(v)+' — 혼합의 실패율은 상수가 아니게 된다(생존자는 A형 쏠림): 무기억성 상실!' ] }; },
    hints:['U1 전확률 + 지수 꼬리.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u2-l4-01', level:4, type:'derive', tags:['무기억성'], src:'강의자료 대조',
    statement:'지수분포의 무기억성을 유도하고, 역으로 무기억성이 지수분포를 유일하게 결정함을 논증하라.',
    steps:[
      '유도: P(X>s+t|X>s) = P(X>s+t)/P(X>s) = e^{−λ(s+t)}/e^{−λs} = e^{−λt} = P(X>t) [왜] 지수 꼬리의 곱 구조',
      '역방향: 무기억성 ⇔ 생존함수 G(t)=P(X>t)가 G(s+t)=G(s)G(t)를 만족',
      '코시 함수방정식: 단조 함수 중 해는 G(t)=e^{−λt} 꼴뿐 (G(1/n)=G(1)^{1/n}에서 유리수→연속 확장)',
      '∴ 연속분포에서 무기억성 = 지수분포 (이산에선 기하분포) — "무기억이라 가정"과 "지수라 가정"은 같은 말',
      '극한 체크: λt≪1 ⇒ P(X≤t)≈λt (짧은 구간 발생확률≈rate×시간 — U3 포아송 공리의 씨앗) ✓'
    ],
    hints:['꼬리의 지수법칙이 전부.','함수방정식 G(s+t)=G(s)G(t)를 기억.'],
    expl:'포아송과정(U3)·연속시간 마르코프(후반부)의 존립 근거 — "미래가 현재 상태만 본다"의 분포론적 뿌리.' },
  { id:'u2-l4-02', level:4, type:'num', tags:['Erlang-3 꼬리'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[1,2],unit:'/시간'}, t:{choices:[1,2],unit:'시간'} },
    statement:function(p){ return '예비품 2개(총 3개 순차 사용, 각 Exp(λ='+p.lam+')): P(S₃>t)=e^{−λt}(1+λt+(λt)²/2)를 t='+p.t+'에서 구하라.'; },
    solve:function(p){ var m=p.lam*p.t, v=Math.exp(-m)*(1+m+m*m/2);
      return { ans:v, unit:'', steps:[
        'S₃>t ⇔ [0,t] 고장 ≤2건: 포아송 부분합 e^{−λt}Σ_{k≤2}(λt)^k/k!',
        '= '+SVH.fmt(v)+' — Erlang 꼬리=포아송 cdf: 적분 없이 급수로 끝난다' ] }; },
    hints:['고장 수 ≤ k−1로 번역.'] },
  { id:'u2-l4-03', level:4, type:'derive', tags:['min·경쟁 유도'], src:'강의자료 대조',
    statement:'독립 지수들의 ① min~Exp(Σλ) ② P(X₁<X₂)=λ₁/(λ₁+λ₂)를 유도하라.',
    steps:[
      '① P(min>t) = P(모두>t) = Πe^{−λᵢt} = e^{−(Σλᵢ)t} [왜] 독립이라 생존의 곱 — min은 rate가 더해진 지수',
      '② P(X₁<X₂) = ∫₀^∞ P(X₂>t)·f₁(t)dt = ∫₀^∞ e^{−λ₂t}λ₁e^{−λ₁t}dt',
      '= λ₁∫₀^∞ e^{−(λ₁+λ₂)t}dt = λ₁/(λ₁+λ₂) — 적분 한 번',
      '보너스: min의 값과 "누가 이겼나"는 독립 — 무기억성의 숨은 선물(U4 분해 독립성의 원형)',
      '극한 체크: λ₂→0(2번이 불멸) ⇒ P(X₁<X₂)→1 ✓ · λ₁=λ₂ ⇒ 1/2 (대칭) ✓'
    ],
    hints:['min은 "전부 생존"의 곱.','경쟁은 조건부 적분 한 줄.'],
    expl:'이 두 결과가 U4 중첩(rate 합)·분해(타입 확률)의 수학적 몸통이다.' },
  { id:'u2-l4-04', level:4, type:'num', tags:['직렬·병렬 설계'], src:'기출 유형',
    params:{ l1:{choices:[0.1,0.2],unit:'/년'}, l2:{choices:[0.2,0.3],unit:'/년'}, t:{choices:[1,2],unit:'년'} },
    statement:function(p){ return '부품 A(λ='+p.l1+'), B(λ='+p.l2+'), t='+p.t+'년 기준: 직렬 신뢰도 R_s=e^{−(λ₁+λ₂)t}와 병렬 신뢰도 R_p=1−(1−e^{−λ₁t})(1−e^{−λ₂t})를 구하라.'; },
    solve:function(p){ var r1=Math.exp(-p.l1*p.t), r2=Math.exp(-p.l2*p.t);
      return { ans:{Rs:r1*r2, Rp:1-(1-r1)*(1-r2)}, unit:{Rs:'', Rp:''}, steps:[
        '직렬(둘 다 필요): R_s = R₁R₂ = '+SVH.fmt(r1*r2),
        '병렬(하나면 충분): R_p = 1−(1−R₁)(1−R₂) = '+SVH.fmt(1-(1-r1)*(1-r2))+' — 구조가 확률 연산(곱 vs 여곱)을 정한다' ] }; },
    hints:['직렬=AND, 병렬=OR.'] },
  { id:'u2-l4-05', level:4, type:'num', tags:['잔여수명 비교'], src:'기출 유형',
    params:{ m:{choices:[10,20],unit:'분'} },
    statement:function(p){ return '평균 '+p.m+'분 간격 버스. ① 간격이 Exp이면 임의 도착 승객의 기대 대기 = m ② 간격이 U(0,2m)이면 = 2m/3. 두 값을 구하라. (직관 m/2가 왜 틀리는지는 U5 검사역설)'; },
    solve:function(p){ return { ans:{Re:p.m, Ru:2*p.m/3}, unit:{Re:'분', Ru:'분'}, steps:[
        '지수: 무기억 → 잔여 ~ Exp, E = m = '+p.m+'분 (평균 간격만큼 통째로 기다린다!)',
        '균등: E[X²]/(2E[X]) = (4m²/3)/(2m) = 2m/3 = '+SVH.fmt(2*p.m/3)+'분 — 긴 간격에 걸릴 확률이 커서 m/2보다 크다' ] }; },
    hints:['내가 도착한 간격은 평범한 간격이 아니다.'] },
  { id:'u2-l4-06', level:4, type:'num', tags:['병렬 n개'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[2,3,4],unit:''}, lam:{choices:[0.5,1],unit:'/년'} },
    statement:function(p){ return '같은 λ='+p.lam+'인 부품 '+p.n+'개 병렬 시스템의 평균 수명 E[max]=(1/λ)(1+1/2+…+1/n)은?'; },
    solve:function(p){ var H=0,i; for(i=1;i<=p.n;i++) H+=1/i;
      var v=H/p.lam;
      return { ans:v, unit:'년', steps:[
        '재출발 사다리: Exp(nλ)→Exp((n−1)λ)→… 각 단계 1/(kλ)',
        '합 = H_n/λ = '+SVH.fmt(H)+'/'+p.lam+' = '+SVH.fmt(v)+'년 — 쿠폰 수집(U1)과 같은 조화수! n배가 아니라 ln n배' ] }; },
    hints:['이중화의 한계효용 체감.'] },
  { id:'u2-l4-07', level:4, type:'num', tags:['분위수 설계'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[0.1,0.5],unit:'/시간'}, q:{choices:[0.9,0.95,0.99],unit:''} },
    statement:function(p){ return 'λ='+p.lam+'/시간 지수 대기시간의 '+p.q+' 분위수 t_q=−ln(1−q)/λ는? (SLA: 이 시간 안에 '+SVH.fmt(p.q*100)+'% 처리)'; },
    solve:function(p){ var v=-Math.log(1-p.q)/p.lam;
      return { ans:v, unit:'시간', steps:[
        '1−e^{−λt}=q → t_q = −ln(1−'+p.q+')/λ = '+SVH.fmt(-Math.log(1-p.q))+'/'+p.lam,
        '= '+SVH.fmt(v)+'시간 — 99%는 평균의 4.6배: 꼬리 설계는 평균 설계와 다르다' ] }; },
    hints:['cdf를 t로 뒤집기.'] },
  { id:'u2-l4-08', level:4, type:'derive', tags:['지수↔포아송 다리'], src:'강의자료 대조',
    statement:'"도착 간격이 iid Exp(λ)"와 "계수 N(t)가 포아송과정"이 서로를 결정함을 양방향으로 논증하라.',
    steps:[
      '(→) 간격 iid Exp(λ)면: S_k=Erlang(k), 그리고 {N(t)≥k}⇔{S_k≤t} [왜] k번째 도착이 t 전이면 계수가 k 이상',
      'P(N(t)=k)=P(S_k≤t)−P(S_{k+1}≤t)를 계산하면 e^{−λt}(λt)^k/k! — 포아송 pmf가 나온다',
      '(←) 포아송과정이면: P(T₁>t)=P(N(t)=0)=e^{−λt} → 첫 간격이 Exp(λ)',
      '독립·정상 증분+무기억성으로 다음 간격도 같은 지수, 서로 독립 — 간격 그림 복원',
      '극한 체크: λt≪1에서 P(N=1)≈λt, P(N≥2)=o(t) — 미소구간 공리와 정합 ✓'
    ],
    hints:['{N≥k}⇔{S_k≤t} 다리가 전부.','양방향이라 어느 쪽을 정의로 삼아도 좋다.'],
    expl:'U3의 입구 — 포아송과정의 세 정의(공리·pmf·지수 간격)가 하나라는 선언.' }

]});
