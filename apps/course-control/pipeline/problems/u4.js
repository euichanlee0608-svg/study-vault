/* U4 블록선도 — 직렬·병렬·피드백 축약, 합산점/분기점 이동, 다중 루프, 외란 전달 */
SV_BANK.push({
  id: 'u4', no: 4, title: '블록선도 간략화', titleEn: 'Block Diagram Reduction',
  scope: '직렬·병렬·피드백 기본형 · 폐루프 T=G/(1+GH) · 합산점·분기점 이동 · 다중 루프 축약 · 외란 경로',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u4-l1-01', level:1, type:'mc', tags:['기본형'], src:'교재 표준',
    statement:'음(−)의 피드백 루프(전방 G, 피드백 H)의 폐루프 전달함수는?',
    choices:['\\(\\dfrac{G}{1+GH}\\)','\\(\\dfrac{G}{1-GH}\\)','\\(\\dfrac{GH}{1+G}\\)','\\(\\dfrac{1}{1+GH}\\)'],
    answer:0, expl:'양의 피드백이면 분모가 1−GH. "전방/(1+루프)"로 기억 — 루프이득 GH가 주인공.' },
  { id:'u4-l1-02', level:1, type:'tf', tags:['직렬·병렬'], src:'교재 표준',
    statement:'로딩(상호작용)이 없다면 직렬 블록은 곱, 병렬(합산) 블록은 합으로 축약된다.',
    answer:true, expl:'블록선도의 대전제 = 무로딩. 실물(회로 직결 등)에서는 버퍼 없으면 깨질 수 있다(전전개 U7의 로딩과 같은 주의).' },
  { id:'u4-l1-03', level:1, type:'mc', tags:['합산점 이동'], src:'교재 표준',
    statement:'합산점을 블록 G의 뒤(출력 쪽)로 옮길 때 옮겨지는 신호에 해야 하는 일은?',
    choices:['G를 곱한다','G로 나눈다','그대로 둔다','부호를 바꾼다'],
    answer:0, expl:'등가 유지 원칙: 경로별 총 이득이 변하면 안 된다. 앞으로 옮기면 1/G.' },
  { id:'u4-l1-04', level:1, type:'mc', tags:['분기점 이동'], src:'교재 표준',
    statement:'분기점(pickoff)을 블록 G의 앞(입력 쪽)으로 옮길 때 분기된 가지에는?',
    choices:['G를 곱한다','G로 나눈다','1+G를 곱한다','변화 없다'],
    answer:0, expl:'원래 분기 신호는 G·u였으므로, u에서 따면 G를 곱해야 같은 신호. 합산점과 방향 규칙이 반대라 헷갈리기 쉽다.' },
  { id:'u4-l1-05', level:1, type:'tf', tags:['단위 피드백'], src:'교재 표준',
    statement:'단위 피드백(H=1)에서 폐루프는 G/(1+G)이고, 개루프 이득이 클수록 폐루프 이득은 1에 접근한다.',
    answer:true, expl:'G≫1이면 T≈1 — 피드백이 "이득 불확실성"을 지우는 원리(로버스트니스의 씨앗).' },
  { id:'u4-l1-06', level:1, type:'mc', tags:['왜 피드백'], src:'강의자료 대조',
    statement:'피드백의 대표 효용이 아닌 것은?',
    choices:['시스템의 차수를 낮춘다','외란 영향 감소','파라미터 변화에 둔감','불안정 플랜트의 안정화 가능'],
    answer:0, expl:'차수는 그대로거나 늘어난다. 나머지 셋이 Lec1의 "왜 피드백인가" 3대 답.' },

  /* ---------- L2 (12) ---------- */
  { id:'u4-l2-01', level:2, type:'num', tags:['폐루프 DC'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[4,9,19]} },
    statement:function(p){ return '단위 피드백, \\(G='+p.K+'/(s+1)\\)의 폐루프 DC 이득을 구하라.'; },
    solve:function(p){ var T=p.K/(1+p.K);
      return { ans:T, unit:'', steps:[
        'T(0) = G(0)/(1+G(0)) = '+p.K+'/'+(1+p.K),
        '= '+SVH.fmt(T)+' (K가 클수록 1에 접근 — 정상 오차 '+SVH.fmt(1/(1+p.K))+')' ] }; },
    hints:['s=0을 먼저 넣고 축약해도 된다.'] },
  { id:'u4-l2-02', level:2, type:'num', tags:['폐루프 극점'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[2,6,10]}, a:{choices:[1,3]} },
    statement:function(p){ return '단위 피드백, \\(G=\\dfrac{'+p.K+'}{s+'+p.a+'}\\)의 폐루프 극점을 구하라.'; },
    solve:function(p){ var pol=-(p.a+p.K);
      return { ans:pol, unit:'', steps:[
        'T = '+p.K+'/(s+'+p.a+'+'+p.K+')',
        '극점 s = −'+(p.a+p.K)+' — 피드백이 극점을 왼쪽으로 민다(빨라진다!)' ] }; },
    hints:['분모 = s+a+K.'] },
  { id:'u4-l2-03', level:2, type:'num', tags:['직렬 축약'], src:'창작 문제(검산됨)',
    params:{ K1:{choices:[2,3]}, K2:{choices:[4,5]}, K3:{choices:[1,2]} },
    statement:function(p){ return '직렬 블록 '+p.K1+' → '+p.K2+' → '+p.K3+'와, 이 셋의 병렬 합산 구조의 등가 이득을 각각 구하라.'; },
    solve:function(p){ var ser=p.K1*p.K2*p.K3, par=p.K1+p.K2+p.K3;
      return { ans:{ser:ser, par:par}, unit:{ser:'', par:''}, steps:[
        '직렬 = 곱 = '+SVH.fmt(ser),
        '병렬 = 합 = '+SVH.fmt(par) ] }; },
    hints:['곱과 합.'] },
  { id:'u4-l2-04', level:2, type:'num', tags:['H≠1 피드백'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[10,20]}, h:{choices:[0.1,0.5]} },
    statement:function(p){ return '전방 G='+p.K+', 피드백 H='+p.h+'(센서 이득)의 폐루프 이득과, K가 2배로 변할 때 폐루프 이득의 새 값을 구하라.'; },
    solve:function(p){
      var T1=p.K/(1+p.K*p.h), T2=2*p.K/(1+2*p.K*p.h);
      return { ans:{T1:T1, T2:T2}, unit:{T1:'', T2:''}, steps:[
        'T = K/(1+Kh) = '+SVH.fmt(T1),
        'K 2배: '+SVH.fmt(T2)+' — 변화율이 개루프(2배)보다 훨씬 작다(둔감화 정량 체감)',
        '(Kh≫1이면 T≈1/h = '+SVH.fmt(1/p.h)+': 센서가 이득을 정한다)' ] }; },
    hints:['1/h 극한도 확인.'] },
  { id:'u4-l2-05', level:2, type:'num', tags:['양성 피드백'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[0.5,0.8]}, },
    statement:function(p){ return '양(+)의 피드백, 전방 G=1, 루프이득 '+p.K+'의 폐루프 이득을 구하고, 루프이득이 1에 가까워지면 무슨 일이 생기는지 답하라. (이득 값)'; },
    solve:function(p){ var T=1/(1-p.K);
      return { ans:T, unit:'', steps:[
        'T = 1/(1−'+p.K+') = '+SVH.fmt(T),
        '루프이득→1이면 T→∞: 발진 경계 (양성 피드백=증폭·발진기의 원리, 제어에선 보통 회피)' ] }; },
    hints:['분모 1−GH.'] },
  { id:'u4-l2-06', level:2, type:'num', tags:['오차 전달'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[9,19,49]} },
    statement:function(p){ return '단위 피드백 G='+p.K+'(정적)에서 기준 입력 r=1일 때 (a) 오차 e=r−y (b) 출력 y를 구하라.'; },
    solve:function(p){ var e=1/(1+p.K), y=p.K/(1+p.K);
      return { ans:{e:e, y:y}, unit:{e:'', y:''}, steps:[
        'E/R = 1/(1+G) → e = '+SVH.fmt(e),
        'y = 1−e = '+SVH.fmt(y)+' (오차 전달함수 1/(1+G) — 기말 정상상태 오차의 예고)' ] }; },
    hints:['e = r/(1+G).'] },
  { id:'u4-l2-07', level:2, type:'num', tags:['2차 폐루프'], src:'기출 유형',
    params:{ K:{choices:[4,16,25]} },
    statement:function(p){ return '단위 피드백, \\(G=\\dfrac{'+p.K+'}{s(s+2)}\\)의 폐루프 (a) ω₀ (b) ζ를 구하라.'; },
    solve:function(p){ var w0=Math.sqrt(p.K), z=1/w0;
      return { ans:{w0:w0, z:z}, unit:{w0:'rad/s', z:''}, steps:[
        'T = '+p.K+'/(s²+2s+'+p.K+')',
        'ω₀ = √K = '+SVH.fmt(w0)+', 2ζω₀=2 → ζ = 1/√K = '+SVH.fmt(z),
        '(K↑ → 빠르지만 진동↑: 이 트레이드오프가 과목 후반 전체의 주제)' ] }; },
    hints:['표준형 계수 비교.'] },
  { id:'u4-l2-08', level:2, type:'num', tags:['합산점 이동 검산'], src:'창작 문제(검산됨)',
    params:{ G:{choices:[3,5]}, d:{choices:[2,4]} },
    statement:function(p){ return '외란 d='+p.d+'가 블록 G='+p.G+' 뒤에 더해진다: y=Gu+d. 합산점을 G 앞으로 옮긴 등가에서 외란에 곱할 이득과, u=1일 때 y를 구하라.'; },
    solve:function(p){ var y=p.G+p.d;
      return { ans:{gain:1/p.G, y:y}, unit:{gain:'', y:''}, steps:[
        '앞으로 이동: y=G(u+d/G) → d에 1/G = '+SVH.fmt(1/p.G),
        '검산: y = '+p.G+'×1+'+p.d+' = '+SVH.fmt(y)+' (양쪽 동일 ✓)' ] }; },
    hints:['등가의 기준은 최종 y.'] },
  { id:'u4-l2-09', level:2, type:'num', tags:['내부 루프 먼저'], src:'창작 문제(검산됨)',
    params:{ K1:{choices:[2,4]}, K2:{choices:[3,5]}, h:{choices:[0.5,1]} },
    statement:function(p){ return '전방 K₁='+p.K1+' → [내부 루프: 전방 K₂='+p.K2+', 피드백 h='+p.h+'] 직렬의 총 이득을 구하라.'; },
    solve:function(p){ var inner=p.K2/(1+p.K2*p.h), T=p.K1*inner;
      return { ans:T, unit:'', steps:[
        '내부 루프 = '+p.K2+'/(1+'+SVH.fmt(p.K2*p.h)+') = '+SVH.fmt(inner),
        '직렬 곱 = '+SVH.fmt(T)+' (안쪽부터 접는다 — 다중 루프의 기본 순서)' ] }; },
    hints:['안쪽 루프를 하나의 블록으로.'] },
  { id:'u4-l2-10', level:2, type:'num', tags:['피드포워드+피드백'], src:'창작 문제(검산됨)',
    params:{ G:{choices:[4,9]}, F:{choices:[1,2]} },
    statement:function(p){ return '입력이 (a) 전방 경로 F='+p.F+'로 직접, (b) 단위 피드백 루프(전방 G='+p.G+')로도 전달되어 출력에서 합산된다. 총 DC 이득을 구하라.'; },
    solve:function(p){ var T=p.F+p.G/(1+p.G);
      return { ans:T, unit:'', steps:[
        '루프 몫 = '+SVH.fmt(p.G/(1+p.G))+', 직접 몫 = '+p.F,
        '합 = '+SVH.fmt(T)+' (피드포워드 구조의 원형)' ] }; },
    hints:['두 경로 병렬 합.'] },
  { id:'u4-l2-11', level:2, type:'num', tags:['센서 지연 근사'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[10,20]}, a:{choices:[5,10]} },
    statement:function(p){ return 'H(s)=\\(\\dfrac{'+p.a+'}{s+'+p.a+'}\\)(센서 1차 지연), 전방 G='+p.K+'인 루프의 폐루프 DC 이득을 구하라.'; },
    solve:function(p){ var T=p.K/(1+p.K);
      return { ans:T, unit:'', steps:[
        'H(0)=1 → DC에서는 단위 피드백과 동일',
        'T(0) = '+p.K+'/'+(1+p.K)+' = '+SVH.fmt(T)+' (센서 대역은 동특성에만 영향)' ] }; },
    hints:['DC는 H(0)만 본다.'] },
  { id:'u4-l2-12', level:2, type:'num', tags:['루프이득 읽기'], src:'창작 문제(검산됨)',
    params:{ K:{choices:[2,5]}, a:{choices:[1,2]}, h:{choices:[3,4]} },
    statement:function(p){ return '전방 \\(G=\\dfrac{'+p.K+'}{s+'+p.a+'}\\), 피드백 H='+p.h+'인 루프의 (a) 루프이득 L(0) (b) 폐루프 극점을 구하라.'; },
    solve:function(p){ var L0=p.K*p.h/p.a, pol=-(p.a+p.K*p.h);
      return { ans:{L0:L0, pol:pol}, unit:{L0:'', pol:''}, steps:[
        'L(s)=GH → L(0) = '+SVH.fmt(L0),
        '폐루프 분모: s+'+p.a+'+'+SVH.fmt(p.K*p.h)+' → 극점 '+SVH.fmt(pol) ] }; },
    hints:['분모 = 1+GH의 분자.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u4-l3-01', level:3, type:'num', tags:['외란 억제 정량'], src:'기출 유형',
    params:{ K:{choices:[9,19,49]}, d:{choices:[1,2]} },
    statement:function(p){ return '단위 피드백 정적 루프(G=K='+p.K+'), 출력단 외란 d='+p.d+'. (a) 개루프(피드백 없음)일 때 y의 외란 성분 (b) 폐루프일 때 외란 성분을 구하라.'; },
    solve:function(p){ var yol=p.d, ycl=p.d/(1+p.K);
      return { ans:{yol:yol, ycl:ycl}, unit:{yol:'', ycl:''}, steps:[
        '개루프: 외란이 그대로 '+SVH.fmt(yol),
        '폐루프: Y/D = 1/(1+G) → '+SVH.fmt(ycl)+' ('+SVH.fmt(1+p.K)+'배 억제)',
        '(피드백 효용의 정량 1번 — Lec1 서사의 계산판)' ] }; },
    hints:['외란 전달함수 1/(1+G).'] },
  { id:'u4-l3-02', level:3, type:'num', tags:['민감도'], src:'기출 유형',
    params:{ K:{choices:[9,19]}, dK:{choices:[10,20]} },
    statement:function(p){ return 'G=K='+p.K+' 단위 피드백에서 K가 '+p.dK+'% 증가할 때 (a) 개루프 이득 변화율 (b) 폐루프 이득 변화율(%)을 구하라.'; },
    solve:function(p){
      var K2=p.K*(1+p.dK/100);
      var T1=p.K/(1+p.K), T2=K2/(1+K2);
      var dT=(T2-T1)/T1*100;
      return { ans:{ol:p.dK, cl:dT}, unit:{ol:'%', cl:'%'}, steps:[
        '개루프: '+p.dK+'% 그대로',
        '폐루프: '+SVH.fmt(T1)+'→'+SVH.fmt(T2)+' → '+SVH.fmt(dT)+'%',
        '(민감도 S≈1/(1+K) = '+SVH.fmt(1/(1+p.K))+'배 — 근사와 정확값 비교)' ] }; },
    hints:['새 K로 다시 계산해 비율.'] },
  { id:'u4-l3-03', level:3, type:'num', tags:['다중 루프 축약'], src:'기출 유형',
    params:{ K:{choices:[10,20]}, a:{choices:[2,4]}, h2:{choices:[1,2]} },
    statement:function(p){ return '전방 \\(\\dfrac{'+p.K+'}{s(s+'+p.a+')}\\), 내부 속도 피드백 h₂s(= '+p.h2+'s), 외부 단위 피드백. 폐루프 분모 s²+c₁s+c₀의 c₁·c₀를 구하라.'; },
    solve:function(p){
      var c1=p.a+p.K*p.h2, c0=p.K;
      return { ans:{c1:c1, c0:c0}, unit:{c1:'', c0:''}, steps:[
        '내부 루프: '+p.K+'/[s(s+'+p.a+')+'+p.K+'·'+p.h2+'s] = '+p.K+'/[s(s+'+SVH.fmt(c1)+')]',
        '외부 단위 피드백: 분모 s²+'+SVH.fmt(c1)+'s+'+p.K,
        '(속도 피드백이 감쇠(c₁)를 키운다 — 서보 설계의 고전 수법)' ] }; },
    hints:['안쪽(hs)부터, 그 다음 바깥.'] },
  { id:'u4-l3-04', level:3, type:'num', tags:['원하는 ζ 설계'], src:'기출 유형',
    params:{ K:{choices:[16,25,36]}, zt:{choices:[0.5,0.7]} },
    statement:function(p){ return '위 구조(전방 K/[s(s+2)], 속도 피드백 hs, 외부 단위 피드백, K='+p.K+')에서 폐루프 ζ='+p.zt+'가 되도록 h를 정하라.'; },
    solve:function(p){
      var w0=Math.sqrt(p.K);
      var h=(2*p.zt*w0-2)/p.K;
      return { ans:h, unit:'', steps:[
        '분모: s²+(2+Kh)s+K → ω₀=√K='+SVH.fmt(w0),
        '2ζω₀ = 2+Kh → h = (2ζω₀−2)/K = '+SVH.fmt(h),
        '검산: c₁ = '+SVH.fmt(2+p.K*h)+' = 2×'+p.zt+'×'+SVH.fmt(w0)+' ✓' ] }; },
    hints:['계수 비교로 h를 역산.'] },
  { id:'u4-l3-05', level:3, type:'num', tags:['2입력 중첩'], src:'기출 유형',
    params:{ K:{choices:[4,9]}, r:{choices:[1,2]}, d:{choices:[1,3]} },
    statement:function(p){ return '단위 피드백 정적 G='+p.K+', 기준 r='+p.r+'과 출력단 외란 d='+p.d+'가 동시에 작용. 출력 y를 중첩으로 구하라.'; },
    solve:function(p){
      var y=p.K/(1+p.K)*p.r+p.d/(1+p.K);
      return { ans:y, unit:'', steps:[
        'Y = [G/(1+G)]r + [1/(1+G)]d',
        '= '+SVH.fmt(p.K/(1+p.K)*p.r)+' + '+SVH.fmt(p.d/(1+p.K))+' = '+SVH.fmt(y),
        '(두 입력 → 두 전달함수 — 선형이라 그냥 더한다)' ] }; },
    hints:['r·d 각각의 전달함수.'] },
  { id:'u4-l3-06', level:3, type:'num', tags:['블록 재배치'], src:'기출 유형',
    params:{ G1:{choices:[2,3]}, G2:{choices:[4,5]}, H:{choices:[0.5,1]} },
    statement:function(p){ return '전방 G₁→G₂ 직렬, 피드백 H가 G₁·G₂ 사이에서 분기해 입력 합산점으로. (a) 등가 피드백 H_eq(분기점을 출력으로 옮긴 후) (b) 폐루프 DC 이득을 구하라. (전부 정적 이득)'; },
    solve:function(p){
      var Heq=p.H/p.G2;
      var T=p.G1*p.G2/(1+p.G1*p.G2*Heq);
      return { ans:{Heq:Heq, T:T}, unit:{Heq:'', T:''}, steps:[
        '분기점을 G₂ 뒤로: 가지에 1/G₂ → H_eq = H/G₂ = '+SVH.fmt(Heq),
        'T = G₁G₂/(1+G₁G₂H_eq) = '+SVH.fmt(T),
        '검산(직접): 루프이득 = G₁H = '+SVH.fmt(p.G1*p.H)+' → T = '+SVH.fmt(p.G1*p.G2/(1+p.G1*p.H))+' ✓' ] }; },
    hints:['이동 규칙 적용 후 표준형.','직접 신호 추적으로 검산.'] },
  { id:'u4-l3-07', level:3, type:'num', tags:['속도+위치 이중 루프'], src:'기출 유형',
    params:{ Kv:{choices:[5,10]}, Kp:{choices:[2,4]} },
    statement:function(p){ return '모터 1/s(적분) 플랜트. 내부: 속도 피드백으로 1차계 \\(\\dfrac{K_v}{s+K_v}\\) 완성(K_v='+p.Kv+'). 외부: 위치 이득 K_p='+p.Kp+'와 단위 피드백. 폐루프 (a) ω₀ (b) ζ를 구하라.'; },
    solve:function(p){
      // T = Kp*Kv/[s(s+Kv)+Kp Kv] → s²+Kv s+KpKv
      var w0=Math.sqrt(p.Kp*p.Kv), z=p.Kv/(2*w0);
      return { ans:{w0:w0, z:z}, unit:{w0:'rad/s', z:''}, steps:[
        '외부 전방 = K_p·K_v/[s(s+K_v)] → 분모 s²+'+p.Kv+'s+'+SVH.fmt(p.Kp*p.Kv),
        'ω₀ = √(K_pK_v) = '+SVH.fmt(w0)+', ζ = K_v/(2ω₀) = '+SVH.fmt(z),
        '(캐스케이드 서보의 정석 구조 — 실무 위치 제어기 그 자체)' ] }; },
    hints:['안쪽 1차계 완성 후 바깥 적분과 결합.'] },
  { id:'u4-l3-08', level:3, type:'num', tags:['등가 단위 피드백화'], src:'기출 유형',
    params:{ K:{choices:[8,12]}, h:{choices:[2,4]} },
    statement:function(p){ return 'H='+p.h+'(정적) 피드백 루프(전방 G=K/s, K='+p.K+')를 "단위 피드백 + 전치 이득" 형태로 바꿔라: (a) 등가 전방 G′=GH의 계수 (b) 전치 이득 1/H (c) 폐루프 DC에서 y/r을 구하라.'; },
    solve:function(p){
      return { ans:{Kp:p.K*p.h, pre:1/p.h, dc:1/p.h}, unit:{Kp:'', pre:'', dc:''}, steps:[
        'T = G/(1+GH) = (1/H)·GH/(1+GH) → 전치 1/'+p.h+', 등가 전방 GH = '+SVH.fmt(p.K*p.h)+'/s',
        '적분기 루프의 DC: GH/(1+GH)→1 → y/r → 1/H = '+SVH.fmt(1/p.h),
        '(센서 이득이 최종 눈금을 정한다 — 계측 관점과 연결)' ] }; },
    hints:['T를 (1/H)·[GH/(1+GH)]로 항등 변형.'] },
  { id:'u4-l3-09', level:3, type:'num', tags:['외란 입력점의 중요성'], src:'기출 유형',
    params:{ K:{choices:[10,50]}, G2:{choices:[2,5]} },
    statement:function(p){ return '전방 = 제어기 K='+p.K+' → 플랜트 G₂='+p.G2+', 단위 피드백. 외란 d=1이 (a) 플랜트 입력단 (b) 플랜트 출력단에 들어올 때 각각 출력의 외란 성분을 구하라.'; },
    solve:function(p){
      var L=p.K*p.G2;
      var yin=p.G2/(1+L), yout=1/(1+L);
      return { ans:{yin:yin, yout:yout}, unit:{yin:'', yout:''}, steps:[
        '입력단: Y/D = G₂/(1+KG₂) = '+SVH.fmt(yin),
        '출력단: Y/D = 1/(1+KG₂) = '+SVH.fmt(yout),
        '(같은 외란도 들어오는 위치에 따라 '+SVH.fmt(p.G2)+'배 차이 — 블록선도를 정확히 그려야 하는 이유)' ] }; },
    hints:['외란 위치별로 전방 경로가 다르다.'] },
  { id:'u4-l3-10', level:3, type:'num', tags:['s영역 폐루프 극점'], src:'기출 유형',
    params:{ K:{choices:[6,10]}, a:{choices:[2,3]}, b:{choices:[4,5]} },
    statement:function(p){ return '단위 피드백, \\(G=\\dfrac{'+p.K+'}{(s+'+p.a+')(s+'+p.b+')}\\). 폐루프 특성방정식 s²+c₁s+c₀의 계수와 ζ를 구하라.'; },
    solve:function(p){
      var c1=p.a+p.b, c0=p.a*p.b+p.K;
      var z=c1/(2*Math.sqrt(c0));
      return { ans:{c1:c1, c0:c0, z:z}, unit:{c1:'', c0:'', z:''}, steps:[
        '1+G=0 → (s+'+p.a+')(s+'+p.b+')+'+p.K+' = 0',
        's²+'+SVH.fmt(c1)+'s+'+SVH.fmt(c0),
        'ζ = c₁/(2√c₀) = '+SVH.fmt(z)+' (K↑ → c₀↑ → ζ↓: 이득이 진동성을 키움)' ] }; },
    hints:['특성방정식 = 1+GH=0.'] },
  { id:'u4-l3-11', level:3, type:'num', tags:['정적 3루프'], src:'창작 문제(검산됨)',
    params:{ K1:{choices:[2,3]}, K2:{choices:[2,4]}, h1:{choices:[0.5,1]}, h2:{choices:[0.25,0.5]} },
    statement:function(p){ return '이중 루프(전부 정적): 안쪽 [전방 K₂='+p.K2+', 피드백 h₂='+p.h2+'], 그 앞 K₁='+p.K1+', 바깥 피드백 h₁='+p.h1+'. 전체 이득을 구하라.'; },
    solve:function(p){
      var inner=p.K2/(1+p.K2*p.h2);
      var T=p.K1*inner/(1+p.K1*inner*p.h1);
      return { ans:T, unit:'', steps:[
        '안: '+SVH.fmt(inner)+' → 전방 = '+SVH.fmt(p.K1*inner),
        '바깥: /(1+전방×'+p.h1+') = '+SVH.fmt(T),
        '(축약 2회면 어떤 이중 루프도 끝)' ] }; },
    hints:['같은 공식을 두 번.'] },
  { id:'u4-l3-12', level:3, type:'num', tags:['이득 여유 개념 준비'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]} },
    statement:function(p){ return '단위 피드백, \\(G=\\dfrac{K}{s(s+'+p.a+')^2}\\)... 대신 정적 등가 판단: 특성방정식 \\(s(s+'+p.a+')^2+K=0\\)에서 s=jω 대입 시 허수부=0이 되는 ω(≠0)와 그때 K(임계 이득)를 구하라.'; },
    solve:function(p){
      // s(s+a)^2 = s^3+2as^2+a^2 s ; jω: -jω³ -2aω² + ja²ω + K = 0
      // 실부: K-2aω²=0, 허부: ω(a²-ω²)=0 → ω=a
      var w=p.a, Kc=2*p.a*p.a*p.a;
      return { ans:{w:w, Kc:Kc}, unit:{w:'rad/s', Kc:''}, steps:[
        's=jω 대입, 허수부: ω(a²−ω²)=0 → ω = '+p.a,
        '실수부: K = 2aω² = 2·'+p.a+'³ = '+SVH.fmt(Kc),
        '(허수축 통과 = 안정 경계 — U7 Routh의 보조행 사건과 같은 지점)' ] }; },
    hints:['jω 대입해 실·허 분리.'] },
  { id:'u4-l3-13', level:3, type:'num', tags:['속도 상수 미리보기'], src:'기출 유형',
    params:{ K:{choices:[10,20]}, a:{choices:[2,5]} },
    statement:function(p){ return '단위 피드백, \\(G=\\dfrac{'+p.K+'}{s(s+'+p.a+')}\\)에 램프 입력 r=t. 정상 추종 오차 \\(e_{ss}=1/K_v\\), \\(K_v=\\lim sG\\)를 구하라.'; },
    solve:function(p){ var Kv=p.K/p.a, e=1/Kv;
      return { ans:{Kv:Kv, e:e}, unit:{Kv:'1/s', e:''}, steps:[
        'K_v = lim_{s→0} sG = '+p.K+'/'+p.a+' = '+SVH.fmt(Kv),
        'e_ss = 1/K_v = '+SVH.fmt(e)+' (타입 1 시스템의 램프 오차 — 기말 범위의 예고편이지만 HW 단골)' ] }; },
    hints:['sG의 s→0 극한.'] },
  { id:'u4-l3-14', level:3, type:'num', tags:['비단위 피드백 오차'], src:'기출 유형',
    params:{ K:{choices:[9,24]}, h:{choices:[0.5,2]} },
    statement:function(p){ return '전방 G=K='+p.K+', 피드백 H='+p.h+'. 스텝 r=1에서 (a) 출력 y (b) "실측 오차" r−y를 구하라. (r−y는 0으로 안 간다 — 왜인지 포함)'; },
    solve:function(p){
      var y=p.K/(1+p.K*p.h);
      return { ans:{y:y, e:1-y}, unit:{y:'', e:''}, steps:[
        'y = K/(1+KH) = '+SVH.fmt(y),
        'r−y = '+SVH.fmt(1-y)+' — 루프가 0으로 만드는 것은 r−Hy(비교기 신호)지 r−y가 아니다',
        '(H≠1이면 "무엇을 0으로 만드는 루프인가"를 물어야 한다 — 개념 함정 단골)' ] }; },
    hints:['비교기에 들어가는 신호가 무엇인지.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u4-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 폐루프 특성방정식은 1+GH=0이다<br>㉡ 피드백은 외란·파라미터 변화 영향을 (1+루프이득)배로 줄인다<br>㉢ 분기점을 블록 뒤로 옮기면 가지에 그 블록의 역수를 곱한다<br>㉣ 루프이득이 충분히 크면 폐루프 이득은 1/H로 수렴한다',
    choices:['전부','㉠㉡㉣','㉠㉢','㉡㉢㉣'],
    answer:0, expl:'전부 참. ㉢: 뒤로 옮기면 원 신호(u)를 만들기 위해 1/G — 방향별 규칙을 표로 정리해 둘 것.' },
  { id:'u4-l4-02', level:4, type:'num', tags:['종합 축약'], src:'기출 유형',
    params:{ K:{choices:[20,40]}, a:{choices:[4,5]}, h:{choices:[0.1,0.2]} },
    statement:function(p){ return '구조: 전방 \\(\\dfrac{'+p.K+'}{s(s+'+p.a+')}\\), 내부 속도 피드백 '+p.h+'s, 외부 단위 피드백, 외란 d가 플랜트 입력단. (a) 폐루프 분모 계수 c₁·c₀ (b) 폐루프 ζ (c) 스텝 외란의 정상 출력 성분을 구하라.'; },
    solve:function(p){
      var c1=p.a+p.K*p.h, c0=p.K;
      var z=c1/(2*Math.sqrt(c0));
      // 외란: Y/D = G/(1+G(hs+1))... 정적 극한: G(0)=∞(적분기) → Y/D(0)=  1/(hs+1)|0? 정확히:
      // Y/D = [K/(s(s+a))]/[1+K/(s(s+a))·(hs+1)] = K/[s(s+a)+K(hs+1)] → s→0: K/K = 1?? 
      // 주의: 외부 단위 피드백 포함 시 피드백 신호 = y·(hs+1)? 구조: 내부 hs + 외부 1 → 합성 H=1+hs
      var yd=1; // K/(0+K·1)=1 → 잘못? d 입력단: Y/D = P/(1+P·C·H)? 전방에 제어기 없음(이득 1) → Y/D = G/(1+G(1+hs)) → s→0: ∞/(1+∞)=1/(1+hs)|... = 1/(1)=1
      return { ans:{c1:c1, c0:c0, z:z, yd:1}, unit:{c1:'',c0:'',z:'',yd:''}, steps:[
        '합성 피드백 H(s)=1+'+p.h+'s → 분모 s(s+'+p.a+')+'+p.K+'(1+'+p.h+'s) = s²+'+SVH.fmt(c1)+'s+'+p.K,
        'ζ = '+SVH.fmt(z),
        '외란: Y/D = G/(1+GH) → s→0에서 G→∞ ⇒ Y/D→1/H(0)=1 — 적분 플랜트인데도 입력단 외란은 안 지워진다!',
        '(외란을 지우려면 "제어기에" 적분이 있어야 한다는 교훈 — 기말 PID의 동기)' ] }; },
    hints:['내·외부 피드백을 합쳐 H(s)로.','외란 극한은 G→∞로 판단.'] },
  { id:'u4-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'음의 피드백 공식 \\(T=\\dfrac{G}{1+GH}\\)를 신호 방정식에서 유도하고, 민감도 \\(S^T_G=\\dfrac{dT/T}{dG/G}=\\dfrac{1}{1+GH}\\)까지 유도하라.',
    steps:[
      '신호 정의: \\(e=r-Hy,\\ y=Ge\\) [왜] 블록선도는 이 두 식의 그림일 뿐',
      '대입: \\(y=G(r-Hy)\\) → \\(y(1+GH)=Gr\\) → \\(T=G/(1+GH)\\)',
      '민감도: \\(\\dfrac{dT}{dG}=\\dfrac{(1+GH)-GH}{(1+GH)^2}=\\dfrac{1}{(1+GH)^2}\\)',
      '정규화: \\(S=\\dfrac{dT}{dG}\\cdot\\dfrac{G}{T}=\\dfrac{1}{1+GH}\\) — 루프이득이 클수록 플랜트 변화에 둔감',
      '극한 체크: H=0 ⇒ T=G, S=1(개루프 그대로) ✓ · GH→∞ ⇒ T→1/H, S→0 ✓ · 차원: 무차원 ✓'
    ],
    hints:['e와 y 두 줄에서 시작.','몫의 미분 한 번.'],
    expl:'"피드백은 왜 좋은가"의 수학적 답 — 중간 서술형으로 나오기 딱 좋은 유도.' },
  { id:'u4-l4-04', level:4, type:'num', tags:['설계: K와 h 동시 결정'], src:'기출 유형',
    params:{ w0:{choices:[4,6]}, zt:{choices:[0.5,0.707]} },
    statement:function(p){ return '전방 \\(\\dfrac{K}{s(s+2)}\\), 합성 피드백 1+hs, 목표: ω₀='+p.w0+' rad/s, ζ='+p.zt+'. K와 h를 구하라.'; },
    solve:function(p){
      var K=p.w0*p.w0;
      var h=(2*p.zt*p.w0-2)/K;
      return { ans:{K:K, h:h}, unit:{K:'', h:''}, steps:[
        '분모 s²+(2+Kh)s+K → K = ω₀² = '+SVH.fmt(K),
        '2+Kh = 2ζω₀ → h = '+SVH.fmt(h),
        '(사양 2개 → 손잡이 2개: 대수 방정식 2개로 끝 — 중간 설계문항 포맷)' ] }; },
    hints:['c₀가 K, c₁이 h를 정한다.'] },
  { id:'u4-l4-05', level:4, type:'num', tags:['3파라미터 역산'], src:'기출 유형',
    params:{ c1:{choices:[6,8]}, c0:{choices:[25,64]} },
    statement:function(p){ return '측정된 폐루프 분모가 \\(s^2+'+p.c1+'s+'+p.c0+'\\) (단위 피드백, 전방 K/[s(s+a)]). (a) K (b) a (c) 이 폐루프의 정착시간 T_s≈4/(ζω₀)를 구하라.'; },
    solve:function(p){
      var K=p.c0, a=p.c1;
      var Ts=4/(p.c1/2);
      return { ans:{K:K, a:a, Ts:Ts}, unit:{K:'', a:'', Ts:'s'}, steps:[
        '비교: s²+as+K ↔ s²+'+p.c1+'s+'+p.c0+' → a='+p.c1+', K='+p.c0,
        'ζω₀ = c₁/2 = '+SVH.fmt(p.c1/2)+' → T_s ≈ 4/'+SVH.fmt(p.c1/2)+' = '+SVH.fmt(Ts)+' s',
        '(폐루프 측정 → 개루프 파라미터 복원)' ] }; },
    hints:['구조를 알면 계수 대응은 즉시.'] },
  { id:'u4-l4-06', level:4, type:'num', tags:['이중 외란 종합'], src:'기출 유형',
    params:{ K:{choices:[19,49]}, d1:{choices:[1,2]}, d2:{choices:[1,2]}, n:{choices:[0.1,0.2]} },
    statement:function(p){ return '단위 피드백 정적 G=K='+p.K+'. 출력 외란 d='+p.d1+', 센서 잡음 n='+p.n+'(피드백 신호에 더해짐), 기준 r='+p.d2+'. 출력 y를 세 성분 합으로 구하라.'; },
    solve:function(p){
      var S=1/(1+p.K), T=p.K/(1+p.K);
      var y=T*p.d2+S*p.d1-T*p.n;
      return { ans:y, unit:'', steps:[
        'Y = T·r + S·d − T·n (T='+SVH.fmt(T)+', S='+SVH.fmt(S)+')',
        '= '+SVH.fmt(T*p.d2)+' + '+SVH.fmt(S*p.d1)+' − '+SVH.fmt(T*p.n)+' = '+SVH.fmt(y),
        '(외란은 S로 줄지만 잡음은 T≈1로 통과 — 피드백의 근본 트레이드오프!)' ] }; },
    hints:['성분별 전달함수 3개.','잡음 항의 부호 주의.'] },
  { id:'u4-l4-07', level:4, type:'num', tags:['임계 이득(1차×3)'], src:'기출 유형',
    params:{ a:{choices:[1,2]} },
    statement:function(p){ return '단위 피드백, \\(G=\\dfrac{K}{(s+'+p.a+')^3}\\). 특성방정식에 s=jω를 대입해 (a) 발진 주파수 ω (b) 임계 이득 K_c를 구하라.'; },
    solve:function(p){
      // (jω+a)^3 + K = 0 → 전개: a³+3a²jω-3aω²-jω³ + K = 0
      // 허부: 3a²ω - ω³ = 0 → ω = √3 a ; 실부: K = 3aω² - a³ = 9a³ - a³ = 8a³
      var w=Math.sqrt(3)*p.a, Kc=8*Math.pow(p.a,3);
      return { ans:{w:w, Kc:Kc}, unit:{w:'rad/s', Kc:''}, steps:[
        '(jω+'+p.a+')³+K=0 전개, 허수부: 3a²ω−ω³=0 → ω = √3·'+p.a+' = '+SVH.fmt(w),
        '실수부: K = 3aω²−a³ = 8a³ = '+SVH.fmt(Kc),
        '(위상이 −180°가 되는 주파수에서 이득 1 — 기말 나이퀴스트의 예습이자 Routh 검산 대상)' ] }; },
    hints:['3제곱 전개를 실·허로.'] },
  { id:'u4-l4-08', level:4, type:'num', tags:['비교기 앞 이득'], src:'기출 유형',
    params:{ K:{choices:[10,100]}, h:{choices:[0.5,1]}, N:{choices:[2,4]} },
    statement:function(p){ return '기준 r에 전치 필터 N='+p.N+'을 거쳐 비교기로: y = [N·G/(1+GH)]r (G=K='+p.K+', H='+p.h+'). (a) DC 이득 (b) K→∞ 극한의 DC 이득을 구하고, 전치 필터로 H의 영향을 상쇄하는 N을 구하라.'; },
    solve:function(p){
      var T=p.N*p.K/(1+p.K*p.h);
      return { ans:{T:T, lim:p.N/p.h, Nc:p.h}, unit:{T:'', lim:'', Nc:''}, steps:[
        'DC = N·K/(1+Kh) = '+SVH.fmt(T),
        'K→∞: → N/h = '+SVH.fmt(p.N/p.h),
        '눈금 1:1로 만들려면 N/h=1 → N = h = '+p.h+' (전치 필터=스케일 보정의 역할)' ] }; },
    hints:['극한부터 보면 구조가 보인다.'] }
  ]
});
