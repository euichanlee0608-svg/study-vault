/* U2 라플라스 변환 — 정의, 변환쌍, 성질, 역변환(부분분수), 초기·최종값 정리 */
SV_BANK.push({
  id: 'u2', no: 2, title: '라플라스 변환', titleEn: 'Laplace Transform',
  scope: '정의와 변환쌍 · 선형성·미분·적분·이동 정리 · 부분분수 역변환(단순·중근·복소근) · 초기값·최종값 정리 · ODE 풀이',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u2-l1-01', level:1, type:'mc', tags:['정의'], src:'교재 표준',
    statement:'라플라스 변환의 정의와 존재 의의로 옳은 것은?',
    choices:['\\(F(s)=\\int_0^\\infty f(t)e^{-st}dt\\) — 미분방정식을 대수방정식으로 바꾼다','\\(F(s)=\\int_{-\\infty}^{\\infty}f(t)e^{-st}dt\\)','적분을 미분으로 바꾼다','주파수 응답만을 위한 도구다'],
    answer:0, expl:'단방향(0⁻~∞) 정의. \\(\\mathcal{L}\\{\\dot f\\}=sF(s)-f(0)\\) 덕에 ODE가 s의 대수식이 된다 — 과목의 엔진.' },
  { id:'u2-l1-02', level:1, type:'mc', tags:['변환쌍'], src:'교재 표준',
    statement:'기본 변환쌍으로 옳지 않은 것은?',
    choices:['\\(\\mathcal{L}\\{t\\}=1/s\\)','\\(\\mathcal{L}\\{1\\}=1/s\\)','\\(\\mathcal{L}\\{e^{-at}\\}=1/(s+a)\\)','\\(\\mathcal{L}\\{\\sin\\omega t\\}=\\omega/(s^2+\\omega^2)\\)'],
    answer:0, expl:'\\(\\mathcal{L}\\{t\\}=1/s^2\\)다. 램프=1/s², 스텝=1/s, 임펄스=1 — 입력 3형제는 즉답 수준으로.' },
  { id:'u2-l1-03', level:1, type:'tf', tags:['미분 정리'], src:'교재 표준',
    statement:'\\(\\mathcal{L}\\{\\ddot f\\}=s^2F(s)-sf(0)-\\dot f(0)\\)이다.',
    answer:true, expl:'미분 1회당 s 곱 + 초기조건. 초기조건이 0이면 그냥 s² — 전달함수 정의의 전제.' },
  { id:'u2-l1-04', level:1, type:'mc', tags:['이동 정리'], src:'교재 표준',
    statement:'주파수 이동 정리로 옳은 것은?',
    choices:['\\(\\mathcal{L}\\{e^{-at}f(t)\\}=F(s+a)\\)','\\(\\mathcal{L}\\{e^{-at}f(t)\\}=F(s-a)\\)','\\(\\mathcal{L}\\{f(t-T)\\}=F(s+T)\\)','시간 이동은 s를 곱한다'],
    answer:0, expl:'감쇠 e^{-at}가 s를 +a 이동. 시간 지연 f(t−T)u(t−T)는 e^{-Ts}F(s) — 두 이동을 혼동하지 말 것.' },
  { id:'u2-l1-05', level:1, type:'tf', tags:['최종값 정리'], src:'교재 표준',
    statement:'최종값 정리 \\(\\lim_{t\\to\\infty}f(t)=\\lim_{s\\to0}sF(s)\\)는 sF(s)의 극점이 모두 좌반평면에 있을 때만 쓸 수 있다.',
    answer:true, expl:'수렴하지 않는 신호(불안정·지속 진동)에 쓰면 엉뚱한 값이 나온다 — 적용 조건 확인이 채점 포인트.' },
  { id:'u2-l1-06', level:1, type:'mc', tags:['역변환 전략'], src:'교재 표준',
    statement:'유리함수 F(s)의 역변환 표준 절차는?',
    choices:['부분분수로 쪼개 변환쌍 표로 돌아간다','수치 적분한다','s에 jω를 대입한다','미분해서 단순화한다'],
    answer:0, expl:'단순근→지수, 중근→t·지수, 복소근→감쇠 정현파. 세 패턴이 전부다.' },

  /* ---------- L2 (12) ---------- */
  { id:'u2-l2-01', level:2, type:'num', tags:['변환 계산'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,3,5]}, A:{min:2,max:8,step:2} },
    statement:function(p){ return '\\(f(t)='+p.A+'e^{-'+p.a+'t}\\)의 F(s)를 구하고 s=1에서 값을 구하라.'; },
    solve:function(p){ var v=p.A/(1+p.a);
      return { ans:v, unit:'', steps:[
        'F(s) = '+p.A+'/(s+'+p.a+')',
        's=1: '+p.A+'/'+(1+p.a)+' = '+SVH.fmt(v) ] }; },
    hints:['지수 변환쌍에 선형성.'] },
  { id:'u2-l2-02', level:2, type:'num', tags:['sin 변환'], src:'창작 문제(검산됨)',
    params:{ w:{choices:[2,3,4]}, s0:{choices:[1,2]} },
    statement:function(p){ return '\\(\\mathcal{L}\\{\\sin '+p.w+'t\\}\\)를 쓰고 s='+p.s0+'에서 값을 구하라.'; },
    solve:function(p){ var v=p.w/(p.s0*p.s0+p.w*p.w);
      return { ans:v, unit:'', steps:[
        'F(s) = '+p.w+'/(s²+'+(p.w*p.w)+')',
        's='+p.s0+': '+SVH.fmt(v) ] }; },
    hints:['sin은 분자 ω.'] },
  { id:'u2-l2-03', level:2, type:'num', tags:['감쇠 정현파 변환'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, w:{choices:[3,4]}, s0:{choices:[0,1]} },
    statement:function(p){ return '\\(\\mathcal{L}\\{e^{-'+p.a+'t}\\cos '+p.w+'t\\}\\)를 쓰고 s='+p.s0+'에서 값을 구하라.'; },
    solve:function(p){ var v=(p.s0+p.a)/((p.s0+p.a)*(p.s0+p.a)+p.w*p.w);
      return { ans:v, unit:'', steps:[
        '이동 정리: cos 변환의 s → s+'+p.a,
        'F(s) = (s+'+p.a+')/[(s+'+p.a+')²+'+(p.w*p.w)+'] → s='+p.s0+': '+SVH.fmt(v) ] }; },
    hints:['cos 변환쌍 + 주파수 이동.'] },
  { id:'u2-l2-04', level:2, type:'num', tags:['미분 정리 적용'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, y0:{choices:[1,3]} },
    statement:function(p){ return '\\(\\dot y+'+p.a+'y=0,\\ y(0)='+p.y0+'\\)을 라플라스로 풀어 Y(s)의 s=0에서 값 y(0⁺) 검증용으로 \\(\\lim_{s\\to\\infty}sY(s)\\)를 구하라.'; },
    solve:function(p){
      return { ans:p.y0, unit:'', steps:[
        'sY−'+p.y0+'+'+p.a+'Y=0 → Y = '+p.y0+'/(s+'+p.a+')',
        '초기값 정리: lim sY(s) (s→∞) = '+p.y0+' = y(0) ✓' ] }; },
    hints:['초기값 정리로 자기 검산.'] },
  { id:'u2-l2-05', level:2, type:'num', tags:['부분분수 역변환'], src:'창작 문제(검산됨)',
    params:{ p1:{choices:[1,2]}, p2:{choices:[4,5,6]}, t1:{choices:[0.5,1]} },
    statement:function(p){ return '\\(F(s)=\\dfrac{'+(p.p2-p.p1)+'}{(s+'+p.p1+')(s+'+p.p2+')}\\)의 f(t)를 구하고 t='+p.t1+'에서 값을 구하라.'; },
    solve:function(p){
      var v=Math.exp(-p.p1*p.t1)-Math.exp(-p.p2*p.t1);
      return { ans:v, unit:'', steps:[
        '커버업: A='+(p.p2-p.p1)+'/('+p.p2+'−'+p.p1+')=1, B=−1',
        'f(t) = e^{−'+p.p1+'t} − e^{−'+p.p2+'t}',
        't='+p.t1+': '+SVH.fmt(v) ] }; },
    hints:['분자가 극점 간격이라 계수가 ±1.'] },
  { id:'u2-l2-06', level:2, type:'num', tags:['최종값 정리'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[6,10,12]}, a:{choices:[2,3]}, b:{choices:[4,5]} },
    statement:function(p){ return '\\(Y(s)=\\dfrac{'+p.K+'}{s(s+'+p.a+')(s+'+p.b+')}\\)의 최종값 \\(y(\\infty)\\)를 구하라. (적용 가능성 확인 포함)'; },
    solve:function(p){ var v=p.K/(p.a*p.b);
      return { ans:v, unit:'', steps:[
        'sY(s)의 극점 −'+p.a+', −'+p.b+' 모두 좌반평면 → 정리 적용 가능',
        'y(∞) = lim_{s→0} sY = '+p.K+'/('+p.a+'×'+p.b+') = '+SVH.fmt(v) ] }; },
    hints:['s를 곱하고 s=0.'] },
  { id:'u2-l2-07', level:2, type:'num', tags:['시간 지연'], src:'창작 문제(검산됨)',
    params:{ T:{choices:[1,2]}, a:{choices:[2,3]} },
    statement:function(p){ return '\\(f(t)=e^{-'+p.a+'(t-'+p.T+')}u(t-'+p.T+')\\)의 F(s)를 구하고 s=1에서 값을 구하라.'; },
    solve:function(p){ var v=Math.exp(-p.T)/(1+p.a);
      return { ans:v, unit:'', steps:[
        '지연 정리: F(s) = e^{−'+p.T+'s}/(s+'+p.a+')',
        's=1: e^{−'+p.T+'}/'+(1+p.a)+' = '+SVH.fmt(v) ] }; },
    hints:['지연 = e^{-Ts} 곱.'] },
  { id:'u2-l2-08', level:2, type:'num', tags:['램프 응답 성분'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, t1:{choices:[1,2]} },
    statement:function(p){ return '\\(F(s)=\\dfrac{'+p.a+'}{s^2(s+'+p.a+')}\\) = \\(\\frac{A}{s^2}+\\frac{B}{s}+\\frac{C}{s+'+p.a+'}\\)를 전개해 f(t)를 구하고 t='+p.t1+' 값을 구하라.'; },
    solve:function(p){
      var A=1, B=-1/p.a, C=1/p.a;
      var v=p.t1-1/p.a+Math.exp(-p.a*p.t1)/p.a;
      return { ans:v, unit:'', steps:[
        'A=1(커버업 s²), C='+SVH.fmt(C)+'(커버업), B: s 계수 비교 → '+SVH.fmt(B),
        'f(t) = t − 1/'+p.a+' + e^{−'+p.a+'t}/'+p.a,
        't='+p.t1+': '+SVH.fmt(v)+' (1차계 램프 추종 — 정상 지연 1/a)' ] }; },
    hints:['s² 중근 커버업 후 계수 비교.'] },
  { id:'u2-l2-09', level:2, type:'num', tags:['적분 정리'], src:'창작 문제(검산됨)',
    params:{ w:{choices:[2,3]} },
    statement:function(p){ return '적분 정리 \\(\\mathcal{L}\\{\\int_0^t f\\,d\\tau\\}=F(s)/s\\)로 \\(\\int_0^t\\cos'+p.w+'\\tau\\,d\\tau\\)의 변환을 구하고, 직접 적분한 결과의 변환과 s=1에서 비교하라. (값)'; },
    solve:function(p){ var v=1/(1+p.w*p.w);
      return { ans:v, unit:'', steps:[
        '적분 정리: [s/(s²+'+(p.w*p.w)+')]/s = 1/(s²+'+(p.w*p.w)+')',
        '직접: ∫cos = sin('+p.w+'t)/'+p.w+' → 변환 = 1/(s²+'+(p.w*p.w)+') 동일 ✓ s=1: '+SVH.fmt(v) ] }; },
    hints:['두 경로가 같아야 정상.'] },
  { id:'u2-l2-10', level:2, type:'num', tags:['t·지수'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,3]}, t1:{choices:[0.5,1]} },
    statement:function(p){ return '\\(F(s)=\\dfrac{1}{(s+'+p.a+')^2}\\)의 f(t)와 t='+p.t1+' 값, 그리고 f가 최대가 되는 시각을 구하라.'; },
    solve:function(p){
      var v=p.t1*Math.exp(-p.a*p.t1), tm=1/p.a;
      return { ans:{v:v, tm:tm}, unit:{v:'', tm:'s'}, steps:[
        '중근 쌍: f(t) = t·e^{−'+p.a+'t}',
        't='+p.t1+': '+SVH.fmt(v),
        '최대: df/dt=0 → t = 1/'+p.a+' = '+SVH.fmt(tm)+' s (임계감쇠 응답의 모양)' ] }; },
    hints:['중근 = t 곱.','미분해 극대.'] },
  { id:'u2-l2-11', level:2, type:'num', tags:['초기값 정리'], src:'창작 문제(검산됨)',
    params:{ b:{choices:[3,5]}, a:{choices:[2,4]} },
    statement:function(p){ return '\\(F(s)=\\dfrac{'+p.b+'s+2}{s^2+'+p.a+'s+8}\\)의 f(0⁺)를 초기값 정리로 구하라.'; },
    solve:function(p){
      return { ans:p.b, unit:'', steps:[
        'f(0⁺) = lim_{s→∞} sF(s) = lim '+p.b+'s²/s² = '+p.b,
        '(분자·분모 최고차 계수의 비 — 차수가 같아야 유한)' ] }; },
    hints:['s 곱하고 s→∞.'] },
  { id:'u2-l2-12', level:2, type:'num', tags:['cos 변환'], src:'창작 문제(검산됨)',
    params:{ w:{choices:[2,5]}, s0:{choices:[1,3]} },
    statement:function(p){ return '\\(\\mathcal{L}\\{\\cos '+p.w+'t\\}\\)의 s='+p.s0+' 값을 구하라.'; },
    solve:function(p){ var v=p.s0/(p.s0*p.s0+p.w*p.w);
      return { ans:v, unit:'', steps:[
        'F(s) = s/(s²+'+(p.w*p.w)+')',
        's='+p.s0+': '+SVH.fmt(v)+' (cos은 분자 s, sin은 분자 ω)' ] }; },
    hints:['cos ↔ s/(s²+ω²).'] },

  /* ---------- L3 (14) ---------- */
  { id:'u2-l3-01', level:3, type:'num', tags:['ODE 완주'], src:'기출 유형',
    params:{ a:{choices:[3,5]}, K:{choices:[6,10]}, t1:{choices:[0.5,1]} },
    statement:function(p){ return '\\(\\dot y+'+p.a+'y='+p.K+'u(t)\\), y(0)=0을 라플라스로 풀어 y(t)와 t='+p.t1+' 값을 구하라.'; },
    solve:function(p){
      var yss=p.K/p.a, v=yss*(1-Math.exp(-p.a*p.t1));
      return { ans:v, unit:'', steps:[
        'Y = '+p.K+'/[s(s+'+p.a+')] = '+SVH.fmt(yss)+'[1/s − 1/(s+'+p.a+')]',
        'y(t) = '+SVH.fmt(yss)+'(1−e^{−'+p.a+'t})',
        't='+p.t1+': '+SVH.fmt(v)+' — 최종값 정리로 '+SVH.fmt(yss)+' 확인 ✓' ] }; },
    hints:['변환→부분분수→역변환→검산 4단계.'] },
  { id:'u2-l3-02', level:3, type:'num', tags:['초기조건 있는 ODE'], src:'기출 유형',
    params:{ a:{choices:[2,4]}, y0:{choices:[2,5]}, K:{choices:[8,12]}, t1:{choices:[0.5]} },
    statement:function(p){ return '\\(\\dot y+'+p.a+'y='+p.K+'\\), y(0)='+p.y0+'의 y(t)와 t='+p.t1+' 값을 구하라.'; },
    solve:function(p){
      var yss=p.K/p.a, v=yss+(p.y0-yss)*Math.exp(-p.a*p.t1);
      return { ans:v, unit:'', steps:[
        'sY−'+p.y0+'+'+p.a+'Y='+p.K+'/s → Y = ['+p.K+'/s+'+p.y0+']/(s+'+p.a+')',
        '역변환: y = '+SVH.fmt(yss)+'+('+p.y0+'−'+SVH.fmt(yss)+')e^{−'+p.a+'t} (U6 1차계 일반형과 동일 구조)',
        't='+p.t1+': '+SVH.fmt(v) ] }; },
    hints:['초기조건이 분자에 들어온다.'] },
  { id:'u2-l3-03', level:3, type:'num', tags:['2차 ODE 스텝'], src:'기출 유형',
    params:{ w:{choices:[2,3]}, t1:{choices:[1,2]} },
    statement:function(p){ return '\\(\\ddot y+'+(p.w*p.w)+'y='+(p.w*p.w)+'u(t)\\), 초기 0의 y(t)와 t='+p.t1+' 값을 구하라. (무감쇠 스텝 응답)'; },
    solve:function(p){
      var v=1-Math.cos(p.w*p.t1);
      return { ans:v, unit:'', steps:[
        'Y = '+(p.w*p.w)+'/[s(s²+'+(p.w*p.w)+')] = 1/s − s/(s²+'+(p.w*p.w)+')',
        'y = 1 − cos'+p.w+'t (진폭 2로 영원히 진동 — ζ=0의 의미)',
        't='+p.t1+': '+SVH.fmt(v) ] }; },
    hints:['부분분수에서 cos이 나온다.'] },
  { id:'u2-l3-04', level:3, type:'num', tags:['복소근 역변환'], src:'기출 유형',
    params:{ a:{choices:[1,2]}, w:{choices:[2,3]}, t1:{choices:[0.5,1]} },
    statement:function(p){ return '\\(F(s)=\\dfrac{'+p.w+'}{(s+'+p.a+')^2+'+(p.w*p.w)+'}\\)의 f(t)와 t='+p.t1+' 값을 구하라.'; },
    solve:function(p){ var v=Math.exp(-p.a*p.t1)*Math.sin(p.w*p.t1);
      return { ans:v, unit:'', steps:[
        '완전제곱꼴 그대로 이동 정리: f = e^{−'+p.a+'t}sin'+p.w+'t',
        't='+p.t1+': '+SVH.fmt(v)+' (전개하지 말고 꼴을 맞추는 것이 요령)' ] }; },
    hints:['(s+a)²+ω² 꼴을 보면 감쇠 sin/cos.'] },
  { id:'u2-l3-05', level:3, type:'num', tags:['복소근+완전제곱 변형'], src:'기출 유형',
    params:{ b:{choices:[2,4]}, c:{choices:[13,20,29]}, t1:{choices:[0.5]} },
    constraint:function(p){ return p.c>p.b*p.b/4; },
    statement:function(p){ return '\\(F(s)=\\dfrac{s+'+p.b+'}{s^2+'+p.b+'s+'+p.c+'}\\)를 완전제곱으로 정리해 f(t)를 구하고 t='+p.t1+' 값을 구하라.'; },
    solve:function(p){
      var a=p.b/2, w=Math.sqrt(p.c-a*a);
      var v=Math.exp(-a*p.t1)*(Math.cos(w*p.t1)+(a/w)*Math.sin(w*p.t1));
      return { ans:v, unit:'', steps:[
        '분모 = (s+'+SVH.fmt(a)+')²+'+SVH.fmt(w*w)+' → σ='+SVH.fmt(a)+', ω_d='+SVH.fmt(w),
        '분자 s+'+p.b+' = (s+'+SVH.fmt(a)+')+'+SVH.fmt(a)+' → cos항 + (σ/ω_d)sin항',
        'f = e^{−'+SVH.fmt(a)+'t}[cos'+SVH.fmt(w)+'t+'+SVH.fmt(a/w)+'sin'+SVH.fmt(w)+'t], t='+p.t1+': '+SVH.fmt(v) ] }; },
    hints:['분자를 (s+a)와 상수로 쪼갠다.'] },
  { id:'u2-l3-06', level:3, type:'num', tags:['3극점 전개'], src:'기출 유형',
    params:{ K:{choices:[24,30]}, t1:{choices:[0.5]} },
    statement:function(p){ return '\\(Y(s)=\\dfrac{'+p.K+'}{s(s+2)(s+3)}\\)의 y(t)를 구하고 (a) y(∞) (b) t='+p.t1+' 값을 구하라.'; },
    solve:function(p){
      var A=p.K/6, B=-p.K/2, C=p.K/3;
      var yinf=A;
      var v=A+B*Math.exp(-2*p.t1)+C*Math.exp(-3*p.t1);
      return { ans:{yinf:yinf, v:v}, unit:{yinf:'', v:''}, steps:[
        '커버업: A='+p.K+'/6='+SVH.fmt(A)+', B='+p.K+'/(−2·1)='+SVH.fmt(B)+', C='+p.K+'/(−3·−1)='+SVH.fmt(C),
        'y = '+SVH.fmt(A)+' '+(B<0?'−':'+')+' '+SVH.fmt(Math.abs(B))+'e^{−2t} + '+SVH.fmt(C)+'e^{−3t}',
        'y(∞)='+SVH.fmt(yinf)+' (최종값 정리 일치), t='+p.t1+': '+SVH.fmt(v) ] }; },
    hints:['세 극점 커버업 세 번.'] },
  { id:'u2-l3-07', level:3, type:'num', tags:['미분방정식 2차 완주'], src:'기출 유형',
    params:{ a:{choices:[5,7]}, b6:{choices:[6,12]}, t1:{choices:[0.5,1]} },
    constraint:function(p){ return p.a*p.a>4*p.b6; },
    statement:function(p){ return '\\(\\ddot y+'+p.a+'\\dot y+'+p.b6+'y=0\\), y(0)=1, \\(\\dot y(0)=0\\)의 y(t)와 t='+p.t1+' 값을 구하라. (과감쇠)'; },
    solve:function(p){
      var D=Math.sqrt(p.a*p.a-4*p.b6);
      var r1=(-p.a+D)/2, r2=(-p.a-D)/2;
      var A=-r2/(r1-r2), B=r1/(r1-r2);
      var v=A*Math.exp(r1*p.t1)+B*Math.exp(r2*p.t1);
      return { ans:v, unit:'', steps:[
        '근: '+SVH.fmt(r1)+', '+SVH.fmt(r2)+' (실근 2개)',
        'Y = (s+'+p.a+')/[(s−λ₁)(s−λ₂)] → A='+SVH.fmt(A)+', B='+SVH.fmt(B),
        'y = '+SVH.fmt(A)+'e^{'+SVH.fmt(r1)+'t}+'+SVH.fmt(B)+'e^{'+SVH.fmt(r2)+'t}, t='+p.t1+': '+SVH.fmt(v) ] }; },
    hints:['초기조건 반영: 분자 = s+a (y0=1, ẏ0=0일 때).'] },
  { id:'u2-l3-08', level:3, type:'num', tags:['tf에서 응답까지'], src:'기출 유형',
    params:{ K:{choices:[4,8]}, a:{choices:[2,4]} },
    statement:function(p){ return '시스템 \\(G(s)=\\dfrac{'+p.K+'}{s+'+p.a+'}\\)에 임펄스 입력. (a) 출력 y(t) (b) 출력의 총 적분 \\(\\int_0^\\infty y\\,dt\\)를 구하라.'; },
    solve:function(p){
      var I=p.K/p.a;
      return { ans:{y0:p.K, I:I}, unit:{y0:'(t=0값)', I:''}, steps:[
        '임펄스 응답 = 역변환 그 자체: y = '+p.K+'e^{−'+p.a+'t} → y(0⁺)='+p.K,
        '∫y dt = Y(0) = G(0) = '+SVH.fmt(I)+' (s=0 대입 = 적분값 — DC 이득의 의미)' ] }; },
    hints:['G(0)=DC 이득=총 적분.'] },
  { id:'u2-l3-09', level:3, type:'num', tags:['주기 신호 조합'], src:'창작 문제(검산됨)',
    params:{ A:{choices:[2,3]}, w:{choices:[2,4]}, a:{choices:[1,2]} },
    statement:function(p){ return '\\(f(t)='+p.A+'(1-e^{-'+p.a+'t})+\\sin'+p.w+'t\\)의 F(s)를 구하고 s=1에서 값을 구하라.'; },
    solve:function(p){
      var v=p.A*(1/1-1/(1+p.a))+p.w/(1+p.w*p.w);
      return { ans:v, unit:'', steps:[
        'F = '+p.A+'[1/s − 1/(s+'+p.a+')] + '+p.w+'/(s²+'+(p.w*p.w)+')',
        's=1: '+p.A+'(1−'+SVH.fmt(1/(1+p.a))+')+'+SVH.fmt(p.w/(1+p.w*p.w))+' = '+SVH.fmt(v) ] }; },
    hints:['선형성으로 항별 변환.'] },
  { id:'u2-l3-10', level:3, type:'num', tags:['최종값 정리 함정'], src:'기출 유형',
    params:{ w:{choices:[2,3]} },
    statement:function(p){ return '\\(F(s)=\\dfrac{'+p.w+'}{s^2+'+(p.w*p.w)+'}\\) (sin'+p.w+'t)에 최종값 정리를 형식 적용한 값과, 실제 극한의 존재 여부(존재=1/부재=0)를 답하라.'; },
    solve:function(p){
      return { ans:{formal:0, exists:0}, unit:{formal:'', exists:''}, steps:[
        '형식 적용: lim s·F = 0 — 그러나!',
        'sF의 극점 ±j'+p.w+'가 허수축 → 적용 조건 위반. sin은 진동해 극한 부재(0)',
        '(조건 확인 없이 쓰면 "0으로 수렴"이라는 오답 — 시험 함정 단골)' ] }; },
    hints:['정리의 전제(극점 위치)부터.'] },
  { id:'u2-l3-11', level:3, type:'num', tags:['지연 응답'], src:'창작 문제(검산됨)',
    params:{ T:{choices:[1,2]}, a:{choices:[2,3]}, t1:{choices:[2.5,3]} },
    constraint:function(p){ return p.t1>p.T; },
    statement:function(p){ return '\\(Y(s)=\\dfrac{e^{-'+p.T+'s}}{s(s+'+p.a+')}\\)·'+p.a+'의 y(t)를 구하고 t='+p.t1+' 값을 구하라.'; },
    solve:function(p){
      var v=1-Math.exp(-p.a*(p.t1-p.T));
      return { ans:v, unit:'', steps:[
        '지연 없는 부분: '+p.a+'/[s(s+'+p.a+')] → 1−e^{−'+p.a+'t}',
        '지연 정리: y = [1−e^{−'+p.a+'(t−'+p.T+')}]u(t−'+p.T+')',
        't='+p.t1+': '+SVH.fmt(v)+' (수송 지연이 있는 공정 모델의 원형)' ] }; },
    hints:['먼저 지연 없이 역변환, 마지막에 t→t−T.'] },
  { id:'u2-l3-12', level:3, type:'num', tags:['s영역 대수'], src:'기출 유형',
    params:{ a:{choices:[2,3]}, b:{choices:[4,6]} },
    statement:function(p){ return '\\(\\dot y+'+p.a+'y=\\dot u+'+p.b+'u\\)에서 (초기 0) 전달함수 G(s)=Y/U를 구하고, u=단위 스텝일 때 y(0⁺)와 y(∞)를 구하라.'; },
    solve:function(p){
      return { ans:{y0:1, yinf:p.b/p.a}, unit:{y0:'', yinf:''}, steps:[
        'G = (s+'+p.b+')/(s+'+p.a+')',
        'y(0⁺) = lim_{s→∞} s·G/s = 1 (분자 s의 즉시 전달 — 영점 효과)',
        'y(∞) = G(0) = '+p.b+'/'+p.a+' = '+SVH.fmt(p.b/p.a)+' (점프 후 정착 — U6 영점 있는 응답의 예고)' ] }; },
    hints:['초기값·최종값 정리를 G에 바로.'] },
  { id:'u2-l3-13', level:3, type:'num', tags:['부분분수 4항'], src:'기출 유형',
    params:{ a:{choices:[1,2]} },
    statement:function(p){ return '\\(F(s)=\\dfrac{1}{s^2(s+'+p.a+')}\\)를 전개해 f(t)를 구하고 t=1에서 값을 구하라.'; },
    solve:function(p){
      var v=1/p.a*1-1/(p.a*p.a)+Math.exp(-p.a)/(p.a*p.a);
      return { ans:v, unit:'', steps:[
        '전개: 1/[s²(s+'+p.a+')] = (1/'+p.a+')/s² − (1/'+(p.a*p.a)+')/s + (1/'+(p.a*p.a)+')/(s+'+p.a+')',
        'f = t/'+p.a+' − 1/'+(p.a*p.a)+' + e^{−'+p.a+'t}/'+(p.a*p.a),
        't=1: '+SVH.fmt(v)+' (램프 추종 오차 구조)' ] }; },
    hints:['s² 커버업 → s 계수 비교 → 극점 커버업.'] },
  { id:'u2-l3-14', level:3, type:'num', tags:['에너지·적분 응용'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, A:{choices:[3,5]} },
    statement:function(p){ return '\\(f(t)='+p.A+'e^{-'+p.a+'t}\\)에 대해 \\(\\int_0^\\infty f(t)dt\\)를 (a) 직접 적분 (b) F(0)으로 각각 구해 일치를 확인하라. (값)'; },
    solve:function(p){ var v=p.A/p.a;
      return { ans:v, unit:'', steps:[
        '직접: '+p.A+'/'+p.a+' = '+SVH.fmt(v),
        'F(s)='+p.A+'/(s+'+p.a+') → F(0)='+SVH.fmt(v)+' ✓ (같은 값 — s=0 대입=총 적분의 일반 원리)' ] }; },
    hints:['두 경로 모두 한 줄씩.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u2-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 최종값 정리는 sF(s)의 극점이 모두 좌반평면일 때만 유효하다<br>㉡ \\(\\mathcal{L}\\{t f(t)\\}=-dF/ds\\)<br>㉢ 시간 지연 T는 s영역에서 \\(e^{-Ts}\\) 곱이다<br>㉣ 부분분수의 복소 켤레 극점쌍은 실수 감쇠 정현파 하나로 합쳐진다',
    choices:['전부','㉠㉢','㉠㉡㉢','㉡㉣'],
    answer:0, expl:'전부 참. ㉡은 s미분 정리 — t·e^{-at} 쌍(중근)의 출처이기도 하다.' },
  { id:'u2-l4-02', level:4, type:'num', tags:['2차 스텝 완주(부족감쇠)'], src:'기출 유형',
    params:{ z:{choices:[0.5,0.6]}, w0:{choices:[2,4]}, t1:{choices:[1]} },
    statement:function(p){ return '\\(G(s)=\\dfrac{\\omega_0^2}{s^2+2\\zeta\\omega_0 s+\\omega_0^2}\\) (ζ='+p.z+', ω₀='+p.w0+')의 단위 스텝 응답 \\(y(t)=1-\\dfrac{e^{-\\zeta\\omega_0t}}{\\sqrt{1-\\zeta^2}}\\sin(\\omega_dt+\\phi)\\), \\(\\phi=\\cos^{-1}\\zeta\\)를 이용해 t='+p.t1+'에서 y를 구하라.'; },
    solve:function(p){
      var wd=p.w0*Math.sqrt(1-p.z*p.z), ph=Math.acos(p.z);
      var v=1-Math.exp(-p.z*p.w0*p.t1)/Math.sqrt(1-p.z*p.z)*Math.sin(wd*p.t1+ph);
      return { ans:v, unit:'', steps:[
        'ω_d = '+SVH.fmt(wd)+', φ = cos⁻¹'+p.z+' = '+SVH.fmt(ph)+' rad',
        'y(1) = 1 − e^{−'+SVH.fmt(p.z*p.w0)+'}/'+SVH.fmt(Math.sqrt(1-p.z*p.z))+'·sin('+SVH.fmt(wd)+'+'+SVH.fmt(ph)+')',
        '= '+SVH.fmt(v)+' (U6 표준 공식의 수치 체감 — 유도는 부분분수 복소근 전개)' ] }; },
    hints:['공식에 정확 대입 — 라디안.'] },
  { id:'u2-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'미분 정리 \\(\\mathcal{L}\\{\\dot f\\}=sF(s)-f(0)\\)을 정의에서 부분적분으로 유도하고, 이것이 "ODE→대수"의 열쇠임을 설명하라.',
    steps:[
      '정의: \\(\\mathcal{L}\\{\\dot f\\}=\\int_0^\\infty \\dot f e^{-st}dt\\) [무엇을] 도함수를 정의에 [왜] 성질은 전부 정의에서 나온다',
      '부분적분(u=e^{-st}, dv=ḟdt): \\(=[fe^{-st}]_0^\\infty + s\\int_0^\\infty fe^{-st}dt\\)',
      '수렴 조건(f가 지수 차수)에서 상한 소멸: \\(=-f(0)+sF(s)\\)',
      '반복 적용: \\(\\mathcal{L}\\{\\ddot f\\}=s^2F-sf(0)-\\dot f(0)\\) — 미분마다 s 곱 + 초기항',
      '의의: n차 ODE가 s의 n차 대수식으로 → 풀고 역변환. 극한 체크: f 상수면 ḟ=0 ↔ sF−f(0)=0 ✓ · 차원: [s][F]=[f] ✓'
    ],
    hints:['부분적분 한 번.','경계항이 초기조건이 된다.'],
    expl:'전달함수(U3)의 "초기조건 0" 가정이 어디서 오는지도 이 유도가 답한다.' },
  { id:'u2-l4-04', level:4, type:'num', tags:['임의 초기조건 2차'], src:'기출 유형',
    params:{ y0:{choices:[1,2]}, v0:{choices:[0,2]}, t1:{choices:[0.5]} },
    statement:function(p){ return '\\(\\ddot y+2\\dot y+5y=0\\), y(0)='+p.y0+', \\(\\dot y(0)='+p.v0+'\\)을 라플라스로 풀어 t='+p.t1+'의 y를 구하라.'; },
    solve:function(p){
      // Y = [y0 s + (v0+2y0)]/(s²+2s+5), 분모=(s+1)²+4
      var A=p.y0, B=(p.v0+2*p.y0-p.y0)/2; // cos계수 A, sin계수: (v0+ y0)/2? 정리:
      // y = e^{-t}[y0 cos2t + ((v0+y0)/2) sin2t]
      var c2=(p.v0+p.y0)/2;
      var v=Math.exp(-p.t1)*(p.y0*Math.cos(2*p.t1)+c2*Math.sin(2*p.t1));
      return { ans:v, unit:'', steps:[
        'Y = ['+p.y0+'s+'+(p.v0+2*p.y0)+']/[(s+1)²+4]',
        '분자 재배열: '+p.y0+'(s+1)+'+SVH.fmt(p.v0+p.y0)+' → cos항 '+p.y0+', sin항 '+SVH.fmt(c2),
        'y = e^{−t}['+p.y0+'cos2t+'+SVH.fmt(c2)+'sin2t], t='+p.t1+': '+SVH.fmt(v) ] }; },
    hints:['분자를 (s+1)과 상수로 나눠 cos·sin 배정.'] },
  { id:'u2-l4-05', level:4, type:'num', tags:['정리 종합 검산'], src:'기출 유형',
    params:{ K:{choices:[10,20]}, a:{choices:[2,5]}, b:{choices:[4,10]} },
    statement:function(p){ return '\\(Y(s)=\\dfrac{'+p.K+'(s+'+p.b+')}{s(s+'+p.a+')^2}\\): (a) y(0⁺) (b) y(∞) (c) 전개 후 e^{−'+p.a+'t} 항의 계수(단독 지수항)를 구하라.'; },
    solve:function(p){
      var y0=0;                       // lim s·Y, s→∞: 차수 차 2 → 0
      var yinf=p.K*p.b/(p.a*p.a);
      // Y = A/s + B/(s+a) + C/(s+a)^2 ; A=K b/a², C = K(b-a)/(-a)?? 커버업: C = K(s+b)/s |_{s=-a} = K(b-a)/(-a)
      var A=yinf, C=p.K*(p.b-p.a)/(-p.a), B=-A;
      return { ans:{y0:y0, yinf:yinf, B:B}, unit:{y0:'', yinf:'', B:''}, steps:[
        '초기값: 분모 3차·분자 1차 → y(0⁺)=0',
        '최종값(조건 OK): '+p.K+'·'+p.b+'/'+(p.a*p.a)+' = '+SVH.fmt(yinf),
        '커버업 A='+SVH.fmt(A)+', C='+SVH.fmt(C)+' → s→∞ 계수합 0=A+B → B='+SVH.fmt(B) ] }; },
    hints:['세 정리·기법(초기·최종·커버업)을 한 문제에.'] },
  { id:'u2-l4-06', level:4, type:'num', tags:['s미분 정리'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,3]}, t1:{choices:[1]} },
    statement:function(p){ return 's미분 정리로 \\(\\mathcal{L}\\{t e^{-'+p.a+'t}\\}\\)를 유도해 쓰고, t·e^{−at}의 최댓값이 1/(ae)임을 확인하라. (최댓값으로 답)'; },
    solve:function(p){
      var v=1/(p.a*Math.E);
      return { ans:v, unit:'', steps:[
        '−d/ds[1/(s+'+p.a+')] = 1/(s+'+p.a+')² ✓ (중근 쌍 재확인)',
        '최대: t=1/'+p.a+'에서 (1/'+p.a+')e^{−1} = '+SVH.fmt(v),
        '(중근 응답의 봉우리 높이 — 임계감쇠 응답 스케치에 쓰인다)' ] }; },
    hints:['F(s) 미분에 −부호.','극대는 미분=0.'] },
  { id:'u2-l4-07', level:4, type:'num', tags:['역산: f(t)→F(s) 판독'], src:'기출 유형',
    params:{ a:{choices:[1,2]}, w:{choices:[2,3]}, y0:{choices:[3,5]} },
    statement:function(p){ return '측정된 응답이 \\(y(t)='+p.y0+'e^{-'+p.a+'t}\\cos('+p.w+'t)\\)이다. (a) Y(s) (b) 이 신호를 만든 2차 시스템 특성다항식의 계수(s² + c₁s + c₀)를 구하라.'; },
    solve:function(p){
      var c1=2*p.a, c0=p.a*p.a+p.w*p.w;
      return { ans:{c1:c1, c0:c0}, unit:{c1:'', c0:''}, steps:[
        'Y = '+p.y0+'(s+'+p.a+')/[(s+'+p.a+')²+'+(p.w*p.w)+']',
        '분모 전개: s²+'+SVH.fmt(c1)+'s+'+SVH.fmt(c0),
        '(파형 → 극점 → 특성다항식: 시스템 식별의 첫걸음)' ] }; },
    hints:['감쇠율→σ, 진동수→ω_d, 분모=(s+σ)²+ω_d².'] },
  { id:'u2-l4-08', level:4, type:'num', tags:['설계형: 원하는 응답'], src:'기출 유형',
    params:{ ts:{choices:[1,2],unit:'s'}, wd:{choices:[4,6],unit:'rad/s'} },
    statement:function(p){ return '원하는 응답: 봉투 시정수 1/σ = '+p.ts+'/4 s(2% 정착 '+p.ts+' s 목표), 진동 주파수 ω_d='+p.wd+' rad/s. (a) 필요한 극점 s=−σ±jω_d의 σ (b) 특성다항식 s²+c₁s+c₀ (c) 해당 ζ를 구하라.'; },
    solve:function(p){
      var sg=4/p.ts;
      var c1=2*sg, c0=sg*sg+p.wd*p.wd;
      var z=sg/Math.sqrt(c0);
      return { ans:{sg:sg, c1:c1, c0:c0, z:z}, unit:{sg:'1/s', c1:'', c0:'', z:''}, steps:[
        '정착 T_s≈4/σ → σ = 4/'+p.ts+' = '+SVH.fmt(sg),
        '다항식: (s+σ)²+ω_d² = s²+'+SVH.fmt(c1)+'s+'+SVH.fmt(c0),
        'ζ = σ/ω₀ = σ/√c₀ = '+SVH.fmt(z)+' (사양→극점→다항식: 제어 설계의 기본 문형)' ] }; },
    hints:['성능 사양이 극점 위치를 정한다.'] }
  ]
});
