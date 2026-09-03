/* U2 연속 전하분포와 가우스 법칙 — 선·면·부피 분포, 선속, 대칭 3종(구·원통·평면) (W2~3) */
SV_BANK.push({
  id: 'u2', no: 2, title: '연속분포·가우스 법칙', titleEn: "Continuous Charge & Gauss's Law",
  scope: '전하밀도 λ·σ·ρ · 전기선속 Φ=∮E·dA · 가우스 법칙 Φ=q_enc/ε₀ · 대칭 3종(구·원통·평면) · 도체의 정전 성질',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u2-l1-01', level:1, type:'mc', tags:['가우스 법칙'], src:'강의자료 대조',
    statement:'가우스 법칙 \\(\\oint\\vec E\\cdot d\\vec A=q_{enc}/\\varepsilon_0\\)에 대한 설명으로 옳은 것은?',
    choices:['닫힌 면 밖의 전하는 선속에 기여하지 않는다(들어온 만큼 나감)','밖의 전하도 선속에 기여한다','E가 0이면 내부 전하도 반드시 0... 은 면 위 E=0일 때 이야기다 — 이 보기는 함정','비대칭 분포엔 성립하지 않는다'],
    answer:0, expl:'법칙 자체는 항상 성립(쿨롱+중첩과 동등). "계산 도구"로 쓰려면 대칭이 필요할 뿐.' },
  { id:'u2-l1-02', level:1, type:'tf', tags:['선속'], src:'교재 표준',
    statement:'전기선속 \\(\\Phi=\\vec E\\cdot\\vec A=EA\\cos\\theta\\)는 스칼라이며, 닫힌 면에서는 바깥 법선을 +로 잡는다.',
    answer:true, expl:'"장선 개수 세기". 나가면 +, 들어오면 −. 단위 N·m²/C.' },
  { id:'u2-l1-03', level:1, type:'mc', tags:['대칭 3종'], src:'강의자료 대조',
    statement:'가우스 법칙으로 E를 "풀 수 있는" 표준 대칭과 가우스면의 짝으로 옳은 것은?',
    choices:['구대칭-동심구면, 원통(선)대칭-동축원통, 평면대칭-필박스','구대칭-정육면체','아무 면이나 가능','평면대칭-구면'],
    answer:0, expl:'면 위에서 E가 일정·수직(또는 평행)이 되도록 — 그래야 적분이 E×면적으로 풀린다.' },
  { id:'u2-l1-04', level:1, type:'tf', tags:['도체'], src:'교재 표준',
    statement:'정전 평형인 도체 내부에서 E=0이고, 과잉 전하는 전부 표면에 있으며, 표면 바로 밖 장은 σ/ε₀로 표면에 수직이다.',
    answer:true, expl:'세 성질 모두 가우스 법칙의 따름정리 — 도체 문제의 3종 세트.' },
  { id:'u2-l1-05', level:1, type:'mc', tags:['구각 정리'], src:'교재 표준',
    statement:'균일 대전 구각(shell)에 대한 설명으로 옳은 것은?',
    choices:['밖에서는 중심 점전하처럼, 내부(빈 공간)에서는 E=0','내부에서도 점전하처럼','밖에서 E=0','표면에서 불연속 없음'],
    answer:0, expl:'뉴턴의 구각 정리의 전기 버전. 표면에서 σ/ε₀만큼 불연속(이건 U2 후반 포인트).' },
  { id:'u2-l1-06', level:1, type:'mc', tags:['밀도 정의'], src:'교재 표준',
    statement:'전하밀도의 짝으로 옳은 것은?',
    choices:['λ[C/m]-선, σ[C/m²]-면, ρ[C/m³]-부피','λ-면, σ-선','전부 C/m','ρ[C/m²]'],
    answer:0, expl:'dq = λdl = σdA = ρdV — 적분 문제의 첫 줄은 항상 이 치환이다.' },

  /* ---------- L2 (12) ---------- */
  { id:'u2-l2-01', level:2, type:'num', tags:['선속 계산'], src:'창작 문제(검산됨)',
    params:{ E:{choices:[200,500],unit:'N/C'}, A:{choices:[0.2,0.5],unit:'m²'}, th:{choices:[0,30,60]} },
    statement:function(p){ return '균일 장 E='+p.E+' N/C가 면적 A='+p.A+' m²의 평면과 법선각 '+p.th+'°로 지난다. 선속(N·m²/C)은?'; },
    solve:function(p){ var F=p.E*p.A*Math.cos(SVH.rad(p.th));
      return { ans:F, unit:'N·m²/C', steps:[
        'Φ = EAcosθ = '+p.E+'×'+p.A+'×cos'+p.th+'°',
        '= '+SVH.fmt(F) ] }; },
    hints:['법선과의 각.'] },
  { id:'u2-l2-02', level:2, type:'num', tags:['닫힌면 선속'], src:'창작 문제(검산됨)',
    params:{ q1:{choices:[2,5],unit:'µC'}, q2:{choices:[-3,-1],unit:'µC'} },
    statement:function(p){ return '닫힌 면 안에 '+p.q1+' µC와 '+p.q2+' µC, 밖에 +7 µC가 있다. 면을 나가는 총 선속(N·m²/C)은?'; },
    solve:function(p){ var F=(p.q1+p.q2)*1e-6/8.85e-12;
      return { ans:F, unit:'N·m²/C', steps:[
        'Φ = q_enc/ε₀ (밖의 7 µC는 무기여)',
        '= ('+p.q1+'+'+p.q2+')×10⁻⁶/8.85×10⁻¹² = '+SVH.fmt(F) ] }; },
    hints:['안의 합만.'] },
  { id:'u2-l2-03', level:2, type:'num', tags:['무한 직선'], src:'교재 표준',
    params:{ lam:{choices:[2,5,8],unit:'µC/m'}, r:{choices:[10,25,50],unit:'cm'} },
    statement:function(p){ return '무한 직선(λ='+p.lam+' µC/m)에서 r='+p.r+' cm 떨어진 곳의 E=λ/(2πε₀r)를 계산하라(N/C).'; },
    solve:function(p){ var E=p.lam*1e-6/(2*Math.PI*8.85e-12*p.r/100);
      return { ans:E, unit:'N/C', steps:[
        '원통 가우스면: E·2πrL = λL/ε₀',
        'E = λ/(2πε₀r) = '+SVH.fmt(E)+' N/C (1/r 감쇠 — 점전하 1/r²과 구별!)' ] }; },
    hints:['원통 옆면만 선속.'] },
  { id:'u2-l2-04', level:2, type:'num', tags:['무한 평면'], src:'교재 표준',
    params:{ sig:{choices:[1,4,8],unit:'µC/m²'} },
    statement:function(p){ return '무한 평면(σ='+p.sig+' µC/m²)의 장 E=σ/(2ε₀)를 계산하라(N/C). 거리 의존성은?'; },
    solve:function(p){ var E=p.sig*1e-6/(2*8.85e-12);
      return { ans:E, unit:'N/C', steps:[
        '필박스: 2EA = σA/ε₀ → E = σ/2ε₀ = '+SVH.fmt(E)+' N/C',
        '거리 무관(무한 평면의 특권) — 1, 1/r, 1/r² 삼형제 완성' ] }; },
    hints:['양쪽으로 나간다(2EA).'] },
  { id:'u2-l2-05', level:2, type:'num', tags:['도체 표면장'], src:'창작 문제(검산됨)',
    params:{ sig:{choices:[2,6],unit:'µC/m²'} },
    statement:function(p){ return '도체 표면(σ='+p.sig+' µC/m²) 바로 밖의 장 E=σ/ε₀(N/C)와, 무한 평면 σ/2ε₀의 2배인 이유를 답하라.'; },
    solve:function(p){ var E=p.sig*1e-6/8.85e-12;
      return { ans:E, unit:'N/C', steps:[
        'E = σ/ε₀ = '+SVH.fmt(E)+' N/C',
        '필박스의 안쪽 면은 도체 내부(E=0) → 선속이 한쪽뿐이라 2배',
        '(σ/2ε₀ vs σ/ε₀ 혼동이 단골 함정)' ] }; },
    hints:['한쪽 면만 산다.'] },
  { id:'u2-l2-06', level:2, type:'num', tags:['구 내부'], src:'교재 표준',
    params:{ Q:{choices:[4,8],unit:'µC'}, R:{choices:[20,40],unit:'cm'}, r:{choices:[5,10],unit:'cm'} },
    statement:function(p){ return '균일 대전 절연구(Q='+p.Q+' µC, R='+p.R+' cm) 내부 r='+p.r+' cm의 장 E=kQr/R³(N/C)를 계산하라.'; },
    solve:function(p){
      var E=8.99e9*p.Q*1e-6*(p.r/100)/Math.pow(p.R/100,3);
      return { ans:E, unit:'N/C', steps:[
        'q_enc = Q(r/R)³ → E = kQr/R³ = '+SVH.fmt(E)+' N/C',
        '(내부는 r에 비례, 외부는 1/r² — 중심에서 0, 표면에서 최대)' ] }; },
    hints:['부피비로 q_enc.'] },
  { id:'u2-l2-07', level:2, type:'num', tags:['구 외부'], src:'창작 문제(검산됨)',
    params:{ Q:{choices:[4,8],unit:'µC'}, R:{choices:[20,30],unit:'cm'}, r:{choices:[50,100],unit:'cm'} },
    statement:function(p){ return '같은 구(Q='+p.Q+' µC)의 외부 r='+p.r+' cm에서 장(N/C)은?'; },
    solve:function(p){ var E=8.99e9*p.Q*1e-6/Math.pow(p.r/100,2);
      return { ans:E, unit:'N/C', steps:[
        '외부는 전체가 중심 점전하처럼: E = kQ/r²',
        '= '+SVH.fmt(E)+' N/C (R값 무관!)' ] }; },
    hints:['구각 정리.'] },
  { id:'u2-l2-08', level:2, type:'num', tags:['평행판 사이'], src:'창작 문제(검산됨)',
    params:{ sig:{choices:[2,5],unit:'µC/m²'} },
    statement:function(p){ return '±σ('+p.sig+' µC/m²)로 대전된 평행한 두 무한 평면 (a) 사이의 장 (b) 바깥의 장(N/C)을 구하라.'; },
    solve:function(p){ var E=p.sig*1e-6/8.85e-12;
      return { ans:{Ein:E, Eout:0}, unit:{Ein:'N/C', Eout:'N/C'}, steps:[
        '사이: σ/2ε₀+σ/2ε₀ = σ/ε₀ = '+SVH.fmt(E)+' N/C (중첩 보강)',
        '밖: 상쇄 → 0 (축전기의 원리 — U4 예고)' ] }; },
    hints:['두 평면 장의 중첩.'] },
  { id:'u2-l2-09', level:2, type:'num', tags:['선속 분배'], src:'창작 문제(검산됨)',
    params:{ q:{choices:[2,6],unit:'µC'} },
    statement:function(p){ return '점전하 q='+p.q+' µC가 정육면체 중심에 있다. (a) 전체 선속 (b) 한 면을 지나는 선속(N·m²/C)을 구하라.'; },
    solve:function(p){ var F=p.q*1e-6/8.85e-12;
      return { ans:{F:F, F6:F/6}, unit:{F:'N·m²/C', F6:'N·m²/C'}, steps:[
        '전체 = q/ε₀ = '+SVH.fmt(F),
        '대칭 → 면당 1/6 = '+SVH.fmt(F/6)+' (적분 없이 대칭으로 — 가우스 사고법)' ] }; },
    hints:['6면 동등.'] },
  { id:'u2-l2-10', level:2, type:'num', tags:['모서리 전하'], src:'기출 유형',
    params:{ q:{choices:[3,9],unit:'µC'} },
    statement:function(p){ return '점전하 q='+p.q+' µC가 정육면체의 한 꼭짓점에 있다. 이 정육면체를 나가는 선속은 q/(8ε₀)이다. 값을 구하고 이유를 답하라(N·m²/C).'; },
    solve:function(p){ var F=p.q*1e-6/(8*8.85e-12);
      return { ans:F, unit:'N·m²/C', steps:[
        '꼭짓점 전하는 큐브 8개가 둘러싸야 완전히 포위 → 한 큐브 몫 = 1/8',
        'Φ = q/8ε₀ = '+SVH.fmt(F),
        '(대칭 논법의 대표 기출 유형)' ] }; },
    hints:['8개로 감싸는 상상.'] },
  { id:'u2-l2-11', level:2, type:'num', tags:['원통 도체'], src:'창작 문제(검산됨)',
    params:{ lam:{choices:[3,6],unit:'µC/m'}, r:{choices:[2,5],unit:'cm'} },
    statement:function(p){ return '반지름 1 cm 도체 원통(λ='+p.lam+' µC/m 표면 대전) (a) 내부(r=0.5 cm) 장 (b) 외부 r='+p.r+' cm 장(N/C)을 구하라.'; },
    solve:function(p){
      var E=p.lam*1e-6/(2*Math.PI*8.85e-12*p.r/100);
      return { ans:{Ein:0, Eout:E}, unit:{Ein:'N/C', Eout:'N/C'}, steps:[
        '내부: 도체 → 0',
        '외부: 축에 λ가 모인 것과 동일 → λ/2πε₀r = '+SVH.fmt(E)+' N/C' ] }; },
    hints:['도체+원통 대칭.'] },
  { id:'u2-l2-12', level:2, type:'num', tags:['밀도 환산'], src:'창작 문제(검산됨)',
    params:{ Q:{choices:[4,12],unit:'µC'}, R:{choices:[10,30],unit:'cm'} },
    statement:function(p){ return 'Q='+p.Q+' µC가 반지름 R='+p.R+' cm 구에 균일 분포. (a) 부피밀도 ρ(µC/m³) (b) 같은 Q가 표면에만 있을 때 σ(µC/m²)를 구하라.'; },
    solve:function(p){
      var R=p.R/100;
      var rho=p.Q/(4/3*Math.PI*Math.pow(R,3));
      var sig=p.Q/(4*Math.PI*R*R);
      return { ans:{rho:rho, sig:sig}, unit:{rho:'µC/m³', sig:'µC/m²'}, steps:[
        'ρ = Q/(4πR³/3) = '+SVH.fmt(rho)+' µC/m³',
        'σ = Q/4πR² = '+SVH.fmt(sig)+' µC/m²' ] }; },
    hints:['부피·표면적 공식.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u2-l3-01', level:3, type:'num', tags:['구 전 영역'], src:'기출 유형',
    params:{ Q:{choices:[6,9],unit:'µC'}, R:{choices:[30,60],unit:'cm'} },
    statement:function(p){ return '균일 절연구(Q='+p.Q+' µC, R='+p.R+' cm)에서 장이 최대인 위치와 그 값(N/C), 그리고 E가 표면값의 절반이 되는 내부·외부 위치(cm) 두 곳을 구하라.'; },
    solve:function(p){
      var R=p.R/100, Es=8.99e9*p.Q*1e-6/(R*R);
      var rin=R/2*100, rout=R*Math.SQRT2*100;
      return { ans:{Emax:Es, rin:rin, rout:rout}, unit:{Emax:'N/C', rin:'cm', rout:'cm'}, steps:[
        '최대 = 표면 r=R: E_s = kQ/R² = '+SVH.fmt(Es)+' N/C',
        '내부(∝r): 절반은 r=R/2 = '+SVH.fmt(rin)+' cm',
        '외부(∝1/r²): 절반은 r=√2R = '+SVH.fmt(rout)+' cm (양쪽 그래프를 그릴 수 있어야)' ] }; },
    hints:['내부 선형·외부 역제곱.'] },
  { id:'u2-l3-02', level:3, type:'num', tags:['동심 구각+도체'], src:'기출 유형',
    params:{ q:{choices:[2,4],unit:'µC'}, Q:{choices:[6,10],unit:'µC'} },
    statement:function(p){ return '중심에 점전하 +q('+p.q+' µC), 이를 감싼 중성 도체 구각(안 R₁, 밖 R₂). (a) 구각 안쪽 표면의 유도 전하 (b) 바깥 표면 전하 (c) 구각에 +Q('+p.Q+' µC)를 더 주면 바깥 표면 전하(µC)는?'; },
    solve:function(p){
      return { ans:{qin:-p.q, qout1:p.q, qout2:p.q+p.Q}, unit:{qin:'µC', qout1:'µC', qout2:'µC'}, steps:[
        '도체 내부 가우스면: E=0 → q_enc=0 → 안쪽 표면 −q = '+(-p.q)+' µC',
        '중성 보존 → 바깥 +q = '+p.q+' µC',
        '+Q 추가는 전부 바깥으로: '+(p.q+p.Q)+' µC (내부 배치는 불변!)' ] }; },
    hints:['도체 속 가우스면에서 출발.'] },
  { id:'u2-l3-03', level:3, type:'num', tags:['비균일 ρ(r)'], src:'기출 유형',
    params:{ a:{choices:[2,5],unit:'µC/m⁴'}, R:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return 'ρ(r)=ar (a='+p.a+' µC/m⁴)인 구(R='+p.R+' cm). (a) 총 전하(µC) (b) 내부 r에서 E(r)=ar²/(4ε₀)를 r=R/2에서 계산하라(N/C).'; },
    solve:function(p){
      var R=p.R/100, a=p.a*1e-6;
      var Q=a*Math.PI*Math.pow(R,4)*1e6; // ∫ar·4πr²dr = aπR⁴
      var E=a*Math.pow(R/2,2)/(4*8.85e-12);
      return { ans:{Q:Q, E:E}, unit:{Q:'µC', E:'N/C'}, steps:[
        'Q = ∫₀ᴿ ar·4πr²dr = aπR⁴ = '+SVH.fmt(Q)+' µC',
        'q_enc(r) = aπr⁴ → E = q_enc/(4πε₀r²) = ar²/4ε₀',
        'r=R/2: '+SVH.fmt(E)+' N/C (비균일이면 "부피비"가 아니라 적분!)' ] }; },
    hints:['dq=ρ·4πr²dr 적분.'] },
  { id:'u2-l3-04', level:3, type:'num', tags:['두 평면 3영역'], src:'기출 유형',
    params:{ s1:{choices:[4,6],unit:'µC/m²'}, s2:{choices:[2,3],unit:'µC/m²'} },
    statement:function(p){ return '평행 평면 A(+'+p.s1+' µC/m²), B(+'+p.s2+' µC/m²). 세 영역(왼·사이·오른)의 장 크기(N/C)를 구하라.'; },
    solve:function(p){
      var e=8.85e-12;
      var EL=(p.s1+p.s2)*1e-6/(2*e), EM=Math.abs(p.s1-p.s2)*1e-6/(2*e);
      return { ans:{EL:EL, EM:EM, ER:EL}, unit:{EL:'N/C', EM:'N/C', ER:'N/C'}, steps:[
        '왼쪽: 둘 다 왼쪽으로 σ/2ε₀ → (σ₁+σ₂)/2ε₀ = '+SVH.fmt(EL),
        '사이: 반대 방향 → |σ₁−σ₂|/2ε₀ = '+SVH.fmt(EM),
        '오른쪽: '+SVH.fmt(EL)+' (같은 부호 두 판의 3영역 패턴)' ] }; },
    hints:['영역별 화살표 더하기.'] },
  { id:'u2-l3-05', level:3, type:'num', tags:['동축 케이블'], src:'기출 유형',
    params:{ lam:{choices:[2,4],unit:'µC/m'}, r:{choices:[1,3],unit:'cm'} },
    statement:function(p){ return '동축: 안쪽 도선 +λ('+p.lam+' µC/m), 바깥 도체관(중성, 안 2 cm·밖 4 cm... r로 일반화). (a) 도선-관 사이 r='+p.r+' cm의 E (b) 관 벽 내부의 E (c) 관 안쪽 표면의 선밀도(µC/m)를 구하라.'; },
    solve:function(p){
      var E=p.lam*1e-6/(2*Math.PI*8.85e-12*p.r/100);
      return { ans:{E:E, Ewall:0, lin:-p.lam}, unit:{E:'N/C', Ewall:'N/C', lin:'µC/m'}, steps:[
        '사이: E = λ/2πε₀r = '+SVH.fmt(E)+' N/C',
        '관 벽 속: 도체 → 0 → 안쪽 표면에 −λ = '+(-p.lam)+' µC/m 유도',
        '(바깥 표면 +λ — 동심 구각의 원통 버전)' ] }; },
    hints:['벽 안 가우스 원통.'] },
  { id:'u2-l3-06', level:3, type:'num', tags:['균일장+점전하 선속'], src:'창작 문제(검산됨)',
    params:{ E:{choices:[100,300],unit:'N/C'}, R:{choices:[10,20],unit:'cm'}, q:{choices:[2,5],unit:'nC'} },
    statement:function(p){ return '균일 장 '+p.E+' N/C 속에 점전하 q='+p.q+' nC를 중심에 품은 반지름 R='+p.R+' cm 구면. 구면을 나가는 총 선속(N·m²/C)은?'; },
    solve:function(p){ var F=p.q*1e-9/8.85e-12;
      return { ans:F, unit:'N·m²/C', steps:[
        '균일 장의 닫힌면 선속 = 0 (들어온 만큼 나감)',
        '남는 것은 q/ε₀ = '+SVH.fmt(F)+' (R·E값 무관 — 법칙의 힘)' ] }; },
    hints:['중첩으로 분리.'] },
  { id:'u2-l3-07', level:3, type:'num', tags:['판+시트 도체 조합'], src:'기출 유형',
    params:{ sig:{choices:[3,6],unit:'µC/m²'} },
    statement:function(p){ return '접지 안 된 중성 도체 평판을 무한 시트(+σ='+p.sig+' µC/m²) 옆에 평행하게 놓았다. 도체 양면에 유도되는 면밀도(µC/m²)와 도체 내부 E를 구하라.'; },
    solve:function(p){
      return { ans:{near:-p.sig/2, far:p.sig/2, Ein:0}, unit:{near:'µC/m²', far:'µC/m²', Ein:'N/C'}, steps:[
        '내부 E=0 조건: 시트의 σ/2ε₀를 유도 전하가 상쇄해야',
        '가까운 면 −σ/2 = '+SVH.fmt(-p.sig/2)+', 먼 면 +σ/2 = '+SVH.fmt(p.sig/2)+' (중성 유지)',
        '(도체가 장을 "정리"하는 방식 — 유도 배치는 항상 내부 0 조건에서 역산)' ] }; },
    hints:['내부 0을 방정식으로.'] },
  { id:'u2-l3-08', level:3, type:'num', tags:['공동(cavity) 전하'], src:'기출 유형',
    params:{ q:{choices:[3,7],unit:'µC'}, Q:{choices:[5,9],unit:'µC'} },
    statement:function(p){ return '전하 +Q('+p.Q+' µC)를 가진 도체 안 공동에 점전하 +q('+p.q+' µC)가 있다. (a) 공동 벽 전하 (b) 도체 바깥 표면 전하(µC) (c) 바깥 장이 공동 속 q의 "위치"에 의존하는가(0=아니오)?'; },
    solve:function(p){
      return { ans:{wall:-p.q, out:p.q+p.Q, dep:0}, unit:{wall:'µC', out:'µC', dep:''}, steps:[
        '벽: −q = '+(-p.q)+' µC (도체 속 가우스면)',
        '바깥: Q+q = '+(p.q+p.Q)+' µC',
        '바깥 분포는 구형 대칭 유지 → 위치 무관(0) — 정전 차폐의 절반(안→밖 정보는 총량만)' ] }; },
    hints:['차폐 논리.'] },
  { id:'u2-l3-09', level:3, type:'num', tags:['원판 축상 장'], src:'교재 표준',
    params:{ sig:{choices:[2,4],unit:'µC/m²'}, R:{choices:[10,20],unit:'cm'}, z:{choices:[5,10],unit:'cm'} },
    statement:function(p){ return '원판(σ='+p.sig+' µC/m², R='+p.R+' cm) 축 위 z='+p.z+' cm에서 \\(E=\\dfrac{\\sigma}{2\\varepsilon_0}\\left[1-\\dfrac{z}{\\sqrt{z^2+R^2}}\\right]\\)를 계산하라(N/C).'; },
    solve:function(p){
      var z=p.z/100, R=p.R/100;
      var E=p.sig*1e-6/(2*8.85e-12)*(1-z/Math.hypot(z,R));
      return { ans:E, unit:'N/C', steps:[
        '대입: '+SVH.fmt(E)+' N/C',
        '극한 확인: z→0 ⇒ σ/2ε₀(무한판) ✓, z≫R ⇒ kQ/z²(점전하) ✓ — 기획서에도 있는 그 극한 체크' ] }; },
    hints:['링 적분 결과 공식.'] },
  { id:'u2-l3-10', level:3, type:'num', tags:['평면+판 사이 힘'], src:'창작 문제(검산됨)',
    params:{ sig:{choices:[5,10],unit:'µC/m²'}, A:{choices:[0.01,0.04],unit:'m²'} },
    statement:function(p){ return '축전기 한 판(σ='+p.sig+' µC/m², 면적 A='+p.A+' m²)이 상대 판의 장에서 받는 힘 F=σ²A/(2ε₀)를 계산하라(N). 왜 σ/ε₀가 아니라 σ/2ε₀를 쓰는가?'; },
    solve:function(p){
      var F=Math.pow(p.sig*1e-6,2)*p.A/(2*8.85e-12);
      return { ans:F, unit:'N', steps:[
        '판이 느끼는 장 = "상대 판"의 장 σ/2ε₀ (자기 장은 자기에게 힘 못 줌)',
        'F = qE = (σA)(σ/2ε₀) = '+SVH.fmt(F)+' N',
        '(정전 인력 — 축전기 판이 서로 당기는 힘, U4 에너지법과 교차 검산 가능)' ] }; },
    hints:['자기장 제외 원칙.'] },
  { id:'u2-l3-11', level:3, type:'num', tags:['구멍 뚫린 평면'], src:'기출 유형',
    params:{ sig:{choices:[4,8],unit:'µC/m²'}, R:{choices:[5,10],unit:'cm'}, z:{choices:[5,10],unit:'cm'} },
    statement:function(p){ return '무한 평면(σ='+p.sig+' µC/m²)에 반지름 R='+p.R+' cm 원형 구멍. 구멍 축 위 z='+p.z+' cm의 장(N/C)을 결손법으로 구하라.'; },
    solve:function(p){
      var z=p.z/100, R=p.R/100;
      var E=p.sig*1e-6/(2*8.85e-12)*(z/Math.hypot(z,R));
      return { ans:E, unit:'N/C', steps:[
        '평면 − 원판: σ/2ε₀ − σ/2ε₀[1−z/√(z²+R²)]',
        '= (σ/2ε₀)·z/√(z²+R²) = '+SVH.fmt(E)+' N/C',
        '(구멍 멀리서는 평면값 복원, 중심에서 0 — 극한 2개 확인)' ] }; },
    hints:['U1 결손법 + l3-09 공식.'] },
  { id:'u2-l3-12', level:3, type:'num', tags:['부분 삽입 전하'], src:'창작 문제(검산됨)',
    params:{ q:{choices:[4,8],unit:'µC'} },
    statement:function(p){ return '점전하 q='+p.q+' µC가 반구형 그릇의 평평한 면 중심(테두리 평면 위)에 있다. 반구 곡면을 지나는 선속(N·m²/C)은?'; },
    solve:function(p){ var F=p.q*1e-6/(2*8.85e-12);
      return { ans:F, unit:'N·m²/C', steps:[
        '전하를 완전히 감싸려면 구 전체 → 반구는 절반',
        'Φ = q/2ε₀ = '+SVH.fmt(F)+' (분배 논법의 변형)' ] }; },
    hints:['입체각 절반.'] },
  { id:'u2-l3-13', level:3, type:'num', tags:['내부 공동 장(중첩)'], src:'기출 유형',
    params:{ rho:{choices:[2,4],unit:'µC/m³'}, d:{choices:[5,10],unit:'cm'} },
    statement:function(p){ return '균일 ρ='+p.rho+' µC/m³ 구에 중심에서 d='+p.d+' cm 벗어난 구형 공동을 팠다. 공동 내부의 장은 균일하며 E=ρd/(3ε₀)임을 이용해 값을 구하라(N/C).'; },
    solve:function(p){
      var E=p.rho*1e-6*(p.d/100)/(3*8.85e-12);
      return { ans:E, unit:'N/C', steps:[
        '중첩: 꽉 찬 구(ρ) + 공동 자리 −ρ 구',
        '내부 장 ρr/3ε₀끼리 빼면 위치 무관 ρd/3ε₀ = '+SVH.fmt(E)+' N/C',
        '(균일! — 중첩의 백미, 기출 스타일 증명형)' ] }; },
    hints:['두 구의 내부 장 공식 빼기.'] },
  { id:'u2-l3-14', level:3, type:'num', tags:['원통 전 영역'], src:'기출 유형',
    params:{ rho:{choices:[3,6],unit:'µC/m³'}, R:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '균일 ρ='+p.rho+' µC/m³ 무한 원통(R='+p.R+' cm)의 (a) 내부 r=R/2 (b) 표면 (c) 외부 r=2R의 장(N/C)을 구하라.'; },
    solve:function(p){
      var R=p.R/100, rho=p.rho*1e-6, e=8.85e-12;
      var Ein=rho*(R/2)/(2*e), Es=rho*R/(2*e), Eout=rho*R*R/(2*e*2*R);
      return { ans:{Ein:Ein, Es:Es, Eout:Eout}, unit:{Ein:'N/C', Es:'N/C', Eout:'N/C'}, steps:[
        '내부: E = ρr/2ε₀ → r=R/2: '+SVH.fmt(Ein),
        '표면: ρR/2ε₀ = '+SVH.fmt(Es),
        '외부: ρR²/(2ε₀r) → r=2R: '+SVH.fmt(Eout)+' (내부 ∝r, 외부 ∝1/r)' ] }; },
    hints:['원통 가우스면 두 번.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u2-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 가우스 법칙은 대칭이 없어도 성립한다(계산 도구로서만 대칭 필요)<br>㉡ 도체 공동 속 전하는 밖에서 총량만 보이고 위치는 차폐된다<br>㉢ 균일 구 내부 E는 r에 비례한다<br>㉣ 무한 평면의 E가 거리 무관인 것은 장선이 퍼질 곳이 없기 때문이다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — 특히 ㉠(법칙 vs 도구)의 구분이 개념 문항 단골.' },
  { id:'u2-l4-02', level:4, type:'num', tags:['3층 구조 완주'], src:'기출 유형',
    params:{ q:{choices:[2,4],unit:'µC'}, rho:{choices:[1,2],unit:'µC/m³'}, R1:{choices:[10],unit:'cm'}, R2:{choices:[20],unit:'cm'} },
    statement:function(p){ return '중심 점전하 +q('+p.q+' µC) + 그를 감싼 균일 대전 껍질층(R₁='+p.R1+'~R₂='+p.R2+' cm, ρ='+p.rho+' µC/m³). (a) 껍질층 총 전하(µC) (b) r=15 cm에서 E (c) r=30 cm에서 E(N/C)를 구하라.'; },
    solve:function(p){
      var R1=p.R1/100, R2=p.R2/100, r=0.15;
      var Qsh=p.rho*(4/3*Math.PI*(Math.pow(R2,3)-Math.pow(R1,3))); // µC
      var qenc=p.q+p.rho*(4/3*Math.PI*(Math.pow(r,3)-Math.pow(R1,3)));
      var E15=8.99e9*qenc*1e-6/(r*r);
      var E30=8.99e9*(p.q+Qsh)*1e-6/(0.3*0.3);
      return { ans:{Qsh:Qsh, E15:E15, E30:E30}, unit:{Qsh:'µC', E15:'N/C', E30:'N/C'}, steps:[
        'Q_shell = ρ·(4π/3)(R₂³−R₁³) = '+SVH.fmt(Qsh)+' µC',
        'r=15cm: q_enc = q+ρ(4π/3)(r³−R₁³) = '+SVH.fmt(qenc)+' µC → E = '+SVH.fmt(E15),
        'r=30cm: 전체 '+SVH.fmt(p.q+Qsh)+' µC → E = '+SVH.fmt(E30)+' N/C' ] }; },
    hints:['영역마다 q_enc 재계산.'] },
  { id:'u2-l4-03', level:4, type:'derive', tags:['유도'], src:'강의자료 대조',
    statement:'가우스 법칙에서 도체의 3성질(내부 E=0 → 전하는 표면 → 표면장 σ/ε₀ 수직)을 순서대로 유도하라.',
    steps:[
      '정전 평형 정의: 전하가 안 움직인다 → 내부 자유전하에 힘 0 → 내부 \\(\\vec E=0\\) [왜] E≠0이면 전류가 흘러 "평형"이 아님',
      '내부 임의 가우스면: E=0 → Φ=0 → q_enc=0 어디서나 → 과잉 전하는 내부에 있을 수 없다 → 전부 표면으로',
      '표면 평행 성분: 있다면 표면 전류 → 평형 위배 → E는 표면 수직',
      '필박스(한 면은 도체 안): EA = σA/ε₀ → \\(E=\\sigma/\\varepsilon_0\\) — 무한판의 2배인 이유는 안쪽 면 선속이 0이라서',
      '극한 체크: σ→0 ⇒ E→0 ✓ · 차원 [C/m²]/[C²/N·m²]=[N/C] ✓'
    ],
    hints:['평형 정의 → 가우스 → 필박스 3연쇄.','각 단계가 앞 단계를 전제로.'],
    expl:'서술형 최빈출 — "왜"를 잇는 사슬을 통째로 재현할 수 있어야 한다.' },
  { id:'u2-l4-04', level:4, type:'num', tags:['비균일+최대점'], src:'기출 유형',
    params:{ rho0:{choices:[2,4],unit:'µC/m³'}, R:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return 'ρ(r)=ρ₀(1−r/R) (ρ₀='+p.rho0+' µC/m³, R='+p.R+' cm) 구. (a) 총 전하(µC) (b) 내부 E(r)=ρ₀r(4−3r/R)/(12ε₀)이 최대가 되는 r(cm) (c) 그 최대값(N/C)을 구하라.'; },
    solve:function(p){
      var R=p.R/100, r0=p.rho0*1e-6;
      var Q=r0*Math.PI*Math.pow(R,3)/3*1e6; // ∫ρ4πr² = 4πρ0(R³/3−R³/4)=πρ0R³/3
      var rm=2*R/3;
      var Em=r0*rm*(4-3*rm/R)/(12*8.85e-12);
      return { ans:{Q:Q, rm:rm*100, Em:Em}, unit:{Q:'µC', rm:'cm', Em:'N/C'}, steps:[
        'Q = 4πρ₀(R³/3−R³/4) = πρ₀R³/3 = '+SVH.fmt(Q)+' µC',
        'dE/dr=0: 4−6r/R=0 → r = 2R/3 = '+SVH.fmt(rm*100)+' cm',
        'E_max = '+SVH.fmt(Em)+' N/C (표면이 아닌 내부에 봉우리 — 균일 구와 대비)' ] }; },
    hints:['적분→미분 2연타.'] },
  { id:'u2-l4-05', level:4, type:'num', tags:['평면 3장 배열'], src:'기출 유형',
    params:{ s:{choices:[2,3],unit:'µC/m²'} },
    statement:function(p){ return '평행 시트 셋: σ₁=+'+p.s+', σ₂=−2·'+p.s+', σ₃=+'+p.s+' µC/m² (왼→오른). 네 영역 중 (a) 1–2 사이 (b) 2–3 사이의 장 크기(N/C)와 방향(+x=1/−x=−1)을 구하라.'; },
    solve:function(p){
      var e2=2*8.85e-12, s=p.s*1e-6;
      // 영역 II: +s/2e(우) +2s/2e(우? -2s 시트가 왼쪽에 있으면 장은 시트 쪽 → 좌?) 정리:
      // E(x) 방향 +x 기준: II: σ1 오른쪽(+s/2e), σ2 왼쪽으로 당김? -2s 시트의 장은 시트를 향함 → II에선 +x(시트가 오른쪽) → +2s/2e, σ3: 왼쪽(-s/2e)
      var E12=(s/e2)+(2*s/e2)-(s/e2);
      // 영역 III: σ1 +s/2e, σ2: 시트 왼쪽에 있으니 −x로 당김 → −2s/2e, σ3 −s/2e
      var E23=(s/e2)-(2*s/e2)-(s/e2);
      return { ans:{E12:Math.abs(E12), d12:E12>0?1:-1, E23:Math.abs(E23), d23:E23>=0?1:-1}, unit:{E12:'N/C', d12:'', E23:'N/C', d23:''}, steps:[
        '각 시트 σ/2ε₀ 화살표: I–II 사이 = (+1+2−1)·σ/2ε₀ = '+SVH.fmt(Math.abs(E12))+' N/C, +x(1)',
        'II–III 사이 = (+1−2−1)·σ/2ε₀ = '+SVH.fmt(Math.abs(E23))+' N/C, −x(−1)',
        '(음시트는 "자기 쪽으로 당기는 화살표" — 부호 표를 만들면 실수 없다)' ] }; },
    hints:['시트별 ±화살표 표.'] },
  { id:'u2-l4-06', level:4, type:'num', tags:['도체 사이 평형'], src:'기출 유형',
    params:{ sig:{choices:[1,2],unit:'µC/m²'}, m:{choices:[1,4],unit:'mg'} },
    statement:function(p){ return '수평 도체판(위판 아래면 σ=−'+p.sig+' µC/m², 아래판 위면 +'+p.sig+') 사이에서 질량 '+p.m+' mg 입자가 떠 있으려면 전하량(nC)은? (사이 장 = σ/ε₀)'; },
    solve:function(p){
      var E=p.sig*1e-6/8.85e-12;
      var q=p.m*1e-6*9.8/E*1e9;
      return { ans:q, unit:'nC', steps:[
        'E = σ/ε₀ = '+SVH.fmt(E)+' N/C (위로)',
        'q = mg/E = '+SVH.fmt(q)+' nC',
        '(축전기 속 부양 — U1 밀리컨과 U2 평행판의 결합)' ] }; },
    hints:['장부터, 그다음 평형.'] },
  { id:'u2-l4-07', level:4, type:'num', tags:['선+원통 조합'], src:'기출 유형',
    params:{ lam:{choices:[3,5],unit:'µC/m'}, lam2:{choices:[-2,-4],unit:'µC/m'}, r:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '축선 λ₁='+p.lam+' µC/m + 동축 원통껍질(반지름 5 cm) λ₂='+p.lam2+' µC/m. r='+p.r+' cm(껍질 밖)의 E(N/C)와, E=0이 되는 영역이 존재하는지(밖=0/안=1/없음=−1)를 구하라.'; },
    solve:function(p){
      var E=(p.lam+p.lam2)*1e-6/(2*Math.PI*8.85e-12*p.r/100);
      var ex=(p.lam+p.lam2)===0?0:-1;
      return { ans:{E:E, zero:ex}, unit:{E:'N/C', zero:''}, steps:[
        '밖: λ_tot = '+(p.lam+p.lam2)+' µC/m → E = '+SVH.fmt(E)+' N/C',
        '안(0<r<5cm): λ₁만 → 0 아님. 합이 0인 경우만 밖에서 0',
        '판정: '+(ex===0?'밖 전체 0(0)':'0 영역 없음(−1)') ] }; },
    hints:['영역별 λ_enc.'] },
  { id:'u2-l4-08', level:4, type:'num', tags:['선속 미분형 맛보기'], src:'강의자료 대조',
    params:{ a:{choices:[100,200],unit:'N/C/m'}, L:{choices:[10,20],unit:'cm'} },
    statement:function(p){ return '장이 \\(\\vec E=(a x)\\hat x\\) (a='+p.a+' N/C/m)인 영역의 한 변 L='+p.L+' cm 정육면체(한 꼭짓점 원점). (a) 총 선속 (b) 내부 전하(pC)를 구하라.'; },
    solve:function(p){
      var L=p.L/100;
      var F=p.a*L*L*L; // (E(L)-E(0))·A = aL·L²
      var q=F*8.85e-12*1e12;
      return { ans:{F:F, q:q}, unit:{F:'N·m²/C', q:'pC'}, steps:[
        'x면만 기여: Φ = [E(L)−E(0)]L² = aL³ = '+SVH.fmt(F),
        'q = ε₀Φ = '+SVH.fmt(q)+' pC',
        '(∂E_x/∂x = ρ/ε₀의 적분판 — 미분형 가우스 법칙(기말 Maxwell)의 예고)' ] }; },
    hints:['마주보는 면의 차만 남는다.'] }
  ]
});
