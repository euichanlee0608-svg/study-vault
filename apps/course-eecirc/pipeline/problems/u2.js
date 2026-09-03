/* U2 저항 회로망 — 직렬·병렬, 분압·분류, 등가저항, 브리지 균형, 부하 효과 */
SV_BANK.push({
  id: 'u2', no: 2, title: '저항 회로망', titleEn: 'Resistive Networks',
  scope: '직렬·병렬 등가 · 전압 분배 · 전류 분배 · 사다리 회로 · 브리지 균형 · 분압기의 부하 효과',
  problems: [

  /* ---------- L1 (10) ---------- */
  { id:'u2-l1-01', level:1, type:'tf', tags:['직렬'], src:'교재 표준',
    statement:'직렬 연결된 저항들에는 같은 전류가 흐르고, 등가저항은 각 저항의 합이다.',
    answer:true, expl:'직렬 = 같은 전류. \\(R_{eq}=\\sum R_i\\). 전압은 저항비로 나뉜다.' },
  { id:'u2-l1-02', level:1, type:'tf', tags:['병렬'], src:'교재 표준',
    statement:'병렬 연결에서는 각 저항에 같은 전압이 걸리고, 컨덕턴스가 더해진다.',
    answer:true, expl:'병렬 = 같은 전압. \\(G_{eq}=\\sum G_i\\), 즉 \\(1/R_{eq}=\\sum 1/R_i\\).' },
  { id:'u2-l1-03', level:1, type:'mc', tags:['병렬 성질'], src:'교재 표준',
    statement:'서로 다른 두 저항을 병렬 연결한 등가저항에 대한 설명으로 옳은 것은?',
    choices:['두 저항 중 작은 값보다도 항상 작다','두 값의 평균이다','큰 값과 작은 값 사이다','두 저항의 합이다'],
    answer:0, expl:'경로가 늘면 전류가 더 잘 흐른다 → 등가는 최솟값보다 작다. 같은 값 R 두 개면 R/2.' },
  { id:'u2-l1-04', level:1, type:'mc', tags:['단락·개방'], src:'교재 표준',
    statement:'저항 R에 단락(short)을 병렬로 붙이면 그 구간의 등가저항은?',
    choices:['0','R','∞','R/2'],
    answer:0, expl:'R ∥ 0 = 0. 반대로 개방(∞)을 병렬로 붙이면 R 그대로다. 회로 단순화의 기본 규칙.' },
  { id:'u2-l1-05', level:1, type:'tf', tags:['분압'], src:'교재 표준',
    statement:'전압 분배 법칙 \\(v_k = v_s R_k/\\sum R\\) 은 그 직렬 가지에 다른 부하가 병렬로 연결되어 있어도 그대로 성립한다.',
    answer:false, expl:'부하가 붙으면 해당 저항이 부하와 병렬로 바뀌어 분배비가 달라진다 — "분압기의 부하 효과" (기출 개념).' },
  { id:'u2-l1-06', level:1, type:'mc', tags:['분류'], src:'교재 표준',
    statement:'두 저항 병렬 분류(current divider)에서 \\(R_1\\)로 흐르는 전류는? (전체 전류 \\(i_s\\))',
    choices:['\\(i_s\\dfrac{R_2}{R_1+R_2}\\)','\\(i_s\\dfrac{R_1}{R_1+R_2}\\)','\\(i_s\\dfrac{R_1R_2}{R_1+R_2}\\)','\\(i_s/2\\)'],
    answer:0, expl:'전류는 "반대편 저항" 비율로 나뉜다 — 저항이 작은 쪽으로 더 많이 흐른다.' },
  { id:'u2-l1-07', level:1, type:'tf', tags:['전력'], src:'교재 표준',
    statement:'같은 전압원에 저항 두 개를 직렬로 걸 때보다 병렬로 걸 때 전원이 공급하는 총 전력이 크다.',
    answer:true, expl:'병렬 등가가 더 작아 전류가 많이 흐른다. \\(P=V^2/R_{eq}\\)에서 R_eq가 작을수록 P가 크다.' },
  { id:'u2-l1-08', level:1, type:'mc', tags:['브리지'], src:'교재 표준',
    statement:'휘트스톤 브리지가 평형(balanced)이 되는 조건은? (위쪽 \\(R_1,R_2\\), 아래쪽 \\(R_3,R_4\\), 검류계는 가운데)',
    choices:['\\(R_1R_4 = R_2R_3\\)','\\(R_1+R_4 = R_2+R_3\\)','\\(R_1R_2 = R_3R_4\\)','\\(R_1=R_4\\)'],
    answer:0, expl:'양쪽 분압비가 같으면 가운데 전압차 0 → 교차곱 조건. 평형이면 가운데 소자는 지워도 된다.' },
  { id:'u2-l1-09', level:1, type:'tf', tags:['가변저항'], src:'기출 유형',
    statement:'전위차계(potentiometer)는 3단자 가변 분압기로, 와이퍼 위치에 따라 출력 전압을 연속적으로 바꿀 수 있다.',
    answer:true, expl:'각도·위치 센서로 쓰는 이유(기출 6번 로봇팔 맥락). 다만 온도·마모로 저항값이 변할 수 있다는 한계도 기출 1번에 나왔다.' },
  { id:'u2-l1-10', level:1, type:'mc', tags:['등가 개념'], src:'교재 표준',
    statement:'"단자쌍에서 등가"라는 말의 정확한 의미는?',
    choices:['그 두 단자에서 본 v–i 관계가 같다','회로 내부 구조가 같다','소비 전력이 항상 같다','내부 각 소자의 전류가 같다'],
    answer:0, expl:'등가는 단자 관점의 개념. 내부 전력 분배까지 같을 필요는 없다 — 테브난 등가(U4)에서 중요해진다.' },

  /* ---------- L2 (15) ---------- */
  { id:'u2-l2-01', level:2, type:'num', tags:['직렬'], src:'창작 문제(검산됨)',
    params:{ R1:{min:100,max:900,step:100,unit:'Ω'}, R2:{min:100,max:900,step:100,unit:'Ω'}, R3:{min:100,max:900,step:100,unit:'Ω'} },
    statement:function(p){ return 'R₁='+p.R1+' Ω, R₂='+p.R2+' Ω, R₃='+p.R3+' Ω를 직렬 연결한 등가저항은?'; },
    solve:function(p){ var R=p.R1+p.R2+p.R3;
      return { ans:R, unit:'Ω', steps:['직렬은 같은 전류 → 전압 강하가 더해진다: \\(R_{eq}=R_1+R_2+R_3\\)','R_eq = '+p.R1+'+'+p.R2+'+'+p.R3+' = '+SVH.fmt(R)+' Ω'] }; },
    hints:['직렬은 그냥 더한다.'] },
  { id:'u2-l2-02', level:2, type:'num', tags:['병렬'], src:'창작 문제(검산됨)',
    params:{ R1:{min:10,max:100,step:10,unit:'Ω'}, R2:{min:10,max:100,step:10,unit:'Ω'} },
    statement:function(p){ return p.R1+' Ω ∥ '+p.R2+' Ω 병렬 등가저항은?'; },
    solve:function(p){ var R=SVH.par(p.R1,p.R2);
      return { ans:R, unit:'Ω', steps:['두 저항 병렬: \\(R_{eq}=\\dfrac{R_1R_2}{R_1+R_2}\\)','R_eq = '+p.R1+'×'+p.R2+'/'+(p.R1+p.R2)+' = '+SVH.fmt(R)+' Ω (최솟값보다 작은지 확인)'] }; },
    hints:['두 개 병렬은 곱/합.'] },
  { id:'u2-l2-03', level:2, type:'num', tags:['병렬'], src:'창작 문제(검산됨)',
    params:{ R:{min:60,max:600,step:60,unit:'Ω'}, n:{min:2,max:6,step:1} },
    statement:function(p){ return '같은 값 '+p.R+' Ω 저항 '+p.n+'개를 모두 병렬 연결하면 등가저항은?'; },
    solve:function(p){ var Re=p.R/p.n;
      return { ans:Re, unit:'Ω', steps:['같은 값 n개 병렬 → 컨덕턴스 n배: \\(R_{eq}=R/n\\)','R_eq = '+p.R+'/'+p.n+' = '+SVH.fmt(Re)+' Ω'] }; },
    hints:['컨덕턴스가 n배가 된다.'] },
  { id:'u2-l2-04', level:2, type:'num', tags:['혼합'], src:'창작 문제(검산됨)',
    params:{ R1:{min:100,max:500,step:100,unit:'Ω'}, R2:{min:100,max:500,step:100,unit:'Ω'}, R3:{min:100,max:500,step:100,unit:'Ω'} },
    statement:function(p){ return 'R₁='+p.R1+' Ω가 (R₂='+p.R2+' Ω ∥ R₃='+p.R3+' Ω)와 직렬이다. 전체 등가저항은?'; },
    solve:function(p){ var Rp=SVH.par(p.R2,p.R3), R=p.R1+Rp;
      return { ans:R, unit:'Ω', steps:[
        '병렬 먼저: R₂∥R₃ = '+SVH.fmt(Rp)+' Ω',
        '직렬 합: '+p.R1+' + '+SVH.fmt(Rp)+' = '+SVH.fmt(R)+' Ω' ] }; },
    hints:['안쪽 병렬부터 정리한다.'] },
  { id:'u2-l2-05', level:2, type:'num', tags:['분압'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:5,max:24,step:1,unit:'V'}, R1:{min:1,max:9,step:1,unit:'kΩ'}, R2:{min:1,max:9,step:1,unit:'kΩ'} },
    statement:function(p){ return p.Vs+' V 전원에 R₁='+p.R1+' kΩ, R₂='+p.R2+' kΩ가 직렬 연결. R₂ 양단 전압은?'; },
    solve:function(p){ var V=p.Vs*p.R2/(p.R1+p.R2);
      return { ans:V, unit:'V', steps:['분압 법칙: \\(V_2=V_s\\dfrac{R_2}{R_1+R_2}\\)','V₂ = '+p.Vs+'×'+p.R2+'/'+(p.R1+p.R2)+' = '+SVH.fmt(V)+' V'] }; },
    hints:['자기 저항/전체 합.'] },
  { id:'u2-l2-06', level:2, type:'num', tags:['분류'], src:'창작 문제(검산됨)',
    params:{ Is:{min:2,max:12,step:1,unit:'A'}, R1:{min:2,max:12,step:2,unit:'Ω'}, R2:{min:2,max:12,step:2,unit:'Ω'} },
    statement:function(p){ return '전체 전류 '+p.Is+' A가 R₁='+p.R1+' Ω, R₂='+p.R2+' Ω 병렬로 갈라진다. R₁의 전류는?'; },
    solve:function(p){ var I=p.Is*p.R2/(p.R1+p.R2);
      return { ans:I, unit:'A', steps:['분류 법칙(반대편 저항이 분자): \\(i_1=i_s\\dfrac{R_2}{R_1+R_2}\\)','i₁ = '+p.Is+'×'+p.R2+'/'+(p.R1+p.R2)+' = '+SVH.fmt(I)+' A'] }; },
    hints:['반대편 저항이 분자.'] },
  { id:'u2-l2-07', level:2, type:'num', tags:['분압·전력'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:9,max:24,step:3,unit:'V'}, R1:{min:100,max:400,step:100,unit:'Ω'}, R2:{min:100,max:400,step:100,unit:'Ω'} },
    statement:function(p){ return p.Vs+' V 전원 + R₁='+p.R1+' Ω + R₂='+p.R2+' Ω 직렬 회로에서 R₂의 소비 전력은?'; },
    solve:function(p){ var I=p.Vs/(p.R1+p.R2), P=I*I*p.R2;
      return { ans:P, unit:'W', steps:[
        'I = '+p.Vs+'/'+(p.R1+p.R2)+' = '+SVH.fmt(I)+' A',
        'P₂ = I²R₂ = '+SVH.fmt(P)+' W' ] }; },
    hints:['루프 전류부터.','P=i²R.'] },
  { id:'u2-l2-08', level:2, type:'num', tags:['3병렬'], src:'창작 문제(검산됨)',
    params:{ R1:{min:20,max:120,step:20,unit:'Ω'}, R2:{min:20,max:120,step:20,unit:'Ω'}, R3:{min:20,max:120,step:20,unit:'Ω'} },
    statement:function(p){ return p.R1+' Ω, '+p.R2+' Ω, '+p.R3+' Ω 세 저항의 병렬 등가저항은?'; },
    solve:function(p){ var R=SVH.par3(p.R1,p.R2,p.R3);
      return { ans:R, unit:'Ω', steps:[
        '\\(1/R_{eq} = 1/'+p.R1+'+1/'+p.R2+'+1/'+p.R3+'\\) = '+SVH.fmt(1/p.R1+1/p.R2+1/p.R3)+' S',
        'R_eq = '+SVH.fmt(R)+' Ω' ] }; },
    hints:['역수 합의 역수.'] },
  { id:'u2-l2-09', level:2, type:'num', tags:['설계'], src:'창작 문제(검산됨)',
    params:{ R1:{min:100,max:1000,step:100,unit:'Ω'}, Rt:{min:20,max:90,step:10,unit:'Ω'} },
    constraint:function(p){ return p.Rt < p.R1; },
    statement:function(p){ return 'R₁='+p.R1+' Ω에 어떤 저항 R₂를 병렬로 붙여 등가 '+p.Rt+' Ω를 만들려 한다. R₂는?'; },
    solve:function(p){ var R2=p.R1*p.Rt/(p.R1-p.Rt);
      return { ans:R2, unit:'Ω', steps:[
        '\\(1/R_2 = 1/R_t - 1/R_1\\)',
        'R₂ = R₁R_t/(R₁−R_t) = '+SVH.fmt(R2)+' Ω' ] }; },
    hints:['컨덕턴스로 빼면 한 줄.','목표 컨덕턴스에서 기존 것을 뺀다.'] },
  { id:'u2-l2-10', level:2, type:'num', tags:['사다리'], src:'창작 문제(검산됨)',
    params:{ R:{min:10,max:60,step:10,unit:'Ω'} },
    statement:function(p){ return '모두 '+p.R+' Ω인 저항으로: R 직렬 — (R ∥ (R 직렬 R)). 전체 등가저항은?'; },
    solve:function(p){ var Rp=SVH.par(p.R,2*p.R), R=p.R+Rp;
      return { ans:R, unit:'Ω', steps:[
        '안쪽: R+R = '+(2*p.R)+' Ω, 병렬: R∥2R = '+SVH.fmt(Rp)+' Ω',
        '직렬: '+p.R+' + '+SVH.fmt(Rp)+' = '+SVH.fmt(R)+' Ω' ] }; },
    hints:['가장 안쪽부터 접는다.'] },
  { id:'u2-l2-11', level:2, type:'num', tags:['분압 3단'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:10,max:30,step:5,unit:'V'}, R1:{min:1,max:5,step:1,unit:'kΩ'}, R2:{min:1,max:5,step:1,unit:'kΩ'}, R3:{min:1,max:5,step:1,unit:'kΩ'} },
    statement:function(p){ return p.Vs+' V에 R₁·R₂·R₃('+p.R1+'·'+p.R2+'·'+p.R3+' kΩ)가 직렬. R₂와 R₃에 걸리는 전압의 합은?'; },
    solve:function(p){ var V=p.Vs*(p.R2+p.R3)/(p.R1+p.R2+p.R3);
      return { ans:V, unit:'V', steps:['연속 구간 분압: \\(V=V_s\\dfrac{R_2+R_3}{R_1+R_2+R_3}\\)','V = '+p.Vs+'×'+(p.R2+p.R3)+'/'+(p.R1+p.R2+p.R3)+' = '+SVH.fmt(V)+' V'] }; },
    hints:['연속 구간의 분압은 그 구간 합/전체 합.'] },
  { id:'u2-l2-12', level:2, type:'num', tags:['전위차계'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:5,max:12,step:1,unit:'V'}, Rp:{choices:[1,5,10],unit:'kΩ'}, x:{min:10,max:90,step:10,unit:'%'} },
    statement:function(p){ return '총 '+p.Rp+' kΩ 전위차계에 '+p.Vs+' V를 걸었다. 와이퍼가 아래에서 '+p.x+'% 위치일 때 무부하 출력 전압은?'; },
    solve:function(p){ var V=p.Vs*p.x/100;
      return { ans:V, unit:'V', steps:['전위차계 = 위치비 분압기: \\(V_{out}=V_s\\dfrac{xR_p}{R_p}=V_s x\\)','V = '+p.Vs+'×'+(p.x/100)+' = '+SVH.fmt(V)+' V (무부하면 총 저항값과 무관!)'] }; },
    hints:['분압비 = 위치비.','무부하라는 조건이 핵심.'] },
  { id:'u2-l2-13', level:2, type:'num', tags:['등가·전류'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:12,max:36,step:4,unit:'V'}, R1:{min:100,max:300,step:50,unit:'Ω'}, R2:{min:100,max:300,step:50,unit:'Ω'} },
    statement:function(p){ return p.Vs+' V 전원에 R₁='+p.R1+' Ω ∥ R₂='+p.R2+' Ω가 연결되어 있다. 전원이 내보내는 총 전류는?'; },
    solve:function(p){ var Re=SVH.par(p.R1,p.R2), I=p.Vs/Re;
      return { ans:I, unit:'A', steps:[
        'R_eq = '+SVH.fmt(Re)+' Ω',
        'I = V/R_eq = '+SVH.fmt(I)+' A (또는 각 가지 전류 합)' ] }; },
    hints:['등가로 접거나, 가지별로 구해 더하거나 — 같아야 한다.'] },
  { id:'u2-l2-14', level:2, type:'num', tags:['혼합·전압'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:10,max:20,step:2,unit:'V'}, R1:{min:2,max:8,step:2,unit:'Ω'}, R2:{min:4,max:12,step:4,unit:'Ω'}, R3:{min:4,max:12,step:4,unit:'Ω'} },
    statement:function(p){ return p.Vs+' V 전원 → R₁='+p.R1+' Ω 직렬 → (R₂='+p.R2+' Ω ∥ R₃='+p.R3+' Ω). 병렬부 양단 전압은?'; },
    solve:function(p){ var Rp=SVH.par(p.R2,p.R3), V=p.Vs*Rp/(p.R1+Rp);
      return { ans:V, unit:'V', steps:[
        'R₂∥R₃ = '+SVH.fmt(Rp)+' Ω',
        '분압: V = '+p.Vs+' × '+SVH.fmt(Rp)+'/'+SVH.fmt(p.R1+Rp)+' = '+SVH.fmt(V)+' V' ] }; },
    hints:['병렬을 하나로 접은 뒤 분압.'] },
  { id:'u2-l2-15', level:2, type:'num', tags:['컨덕턴스 분류'], src:'창작 문제(검산됨)',
    params:{ Is:{min:6,max:18,step:2,unit:'mA'}, G1:{min:1,max:5,step:1,unit:'mS'}, G2:{min:1,max:5,step:1,unit:'mS'}, G3:{min:1,max:5,step:1,unit:'mS'} },
    statement:function(p){ return '전류 '+p.Is+' mA가 컨덕턴스 G₁·G₂·G₃('+p.G1+'·'+p.G2+'·'+p.G3+' mS) 병렬로 갈라진다. G₁의 전류는?'; },
    solve:function(p){ var I=p.Is*p.G1/(p.G1+p.G2+p.G3);
      return { ans:I, unit:'mA', steps:['컨덕턴스 분류(자기 것/합): \\(i_1=i_s\\dfrac{G_1}{G_1+G_2+G_3}\\)','i₁ = '+p.Is+'×'+p.G1+'/'+(p.G1+p.G2+p.G3)+' = '+SVH.fmt(I)+' mA'] }; },
    hints:['컨덕턴스에선 "자기 것/합" — 저항 분류와 반대 모양.'] },

  /* ---------- L3 (10) ---------- */
  { id:'u2-l3-01', level:3, type:'num', tags:['부하 효과'], src:'기출 유형',
    params:{ Vs:{min:10,max:20,step:2,unit:'V'}, R:{min:1,max:9,step:2,unit:'kΩ'}, RL:{min:1,max:9,step:2,unit:'kΩ'} },
    statement:function(p){ return '같은 값 R='+p.R+' kΩ 두 개로 만든 분압기(입력 '+p.Vs+' V)의 출력에 부하 R_L='+p.RL+' kΩ이 붙었다. (a) 무부하 출력 (b) 부하 시 출력을 구하라.'; },
    solve:function(p){ var V0=p.Vs/2, Rp=SVH.par(p.R,p.RL), VL=p.Vs*Rp/(p.R+Rp);
      return { ans:{V0:V0, VL:VL}, unit:{V0:'V', VL:'V'}, steps:[
        '무부하: 같은 저항 분압 = '+SVH.fmt(V0)+' V',
        '부하 시 아래쪽이 R∥R_L = '+SVH.fmt(Rp)+' kΩ로 변함',
        'V_L = '+p.Vs+'×'+SVH.fmt(Rp)+'/'+SVH.fmt(p.R+Rp)+' = '+SVH.fmt(VL)+' V (항상 무부하보다 낮다)' ] }; },
    hints:['부하는 아래 저항과 병렬이 된다.','기출 1번의 "부하 효과" 개념의 계산판.'] },
  { id:'u2-l3-02', level:3, type:'num', tags:['브리지 균형'], src:'창작 문제(검산됨)',
    params:{ R1:{min:100,max:900,step:100,unit:'Ω'}, R2:{min:100,max:900,step:100,unit:'Ω'}, R3:{min:100,max:900,step:100,unit:'Ω'} },
    statement:function(p){ return '휘트스톤 브리지 R₁='+p.R1+' Ω, R₂='+p.R2+' Ω, R₃='+p.R3+' Ω일 때 평형을 만드는 R₄(미지 저항)는? (R₁·R₄ = R₂·R₃ 배치)'; },
    solve:function(p){ var R4=p.R2*p.R3/p.R1;
      return { ans:R4, unit:'Ω', steps:['평형 조건(양쪽 분압비 동일): \\(R_1R_4=R_2R_3\\)','R₄ = R₂R₃/R₁ = '+p.R2+'×'+p.R3+'/'+p.R1+' = '+SVH.fmt(R4)+' Ω'] }; },
    hints:['교차곱이 같아야 한다.'] },
  { id:'u2-l3-03', level:3, type:'num', tags:['사다리 전체 해석'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:12,max:24,step:4,unit:'V'}, R:{min:2,max:10,step:2,unit:'Ω'} },
    statement:function(p){ return '모두 '+p.R+' Ω: 전원 '+p.Vs+' V → R(직렬) → 병렬 [R, (R 직렬 R)]. 마지막 저항(사다리 끝 R)에 걸리는 전압은?'; },
    solve:function(p){
      var Rp=SVH.par(p.R,2*p.R), Vp=p.Vs*Rp/(p.R+Rp), Vlast=Vp/2;
      return { ans:Vlast, unit:'V', steps:[
        '병렬부 등가 R∥2R = '+SVH.fmt(Rp)+' Ω → 병렬부 전압 = '+SVH.fmt(Vp)+' V',
        '오른쪽 가지(R–R 직렬) 내부 분압: 끝 R에는 절반 = '+SVH.fmt(Vlast)+' V' ] }; },
    hints:['접어서 병렬부 전압부터.','그 가지 안에서 다시 분압.'] },
  { id:'u2-l3-04', level:3, type:'num', tags:['전력 배분'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:12,max:24,step:6,unit:'V'}, R1:{min:4,max:12,step:4,unit:'Ω'}, R2:{min:4,max:12,step:4,unit:'Ω'} },
    statement:function(p){ return p.Vs+' V 전원에 R₁='+p.R1+' Ω ∥ R₂='+p.R2+' Ω. 각 저항의 소비 전력과 총 전력을 구하라.'; },
    solve:function(p){ var P1=p.Vs*p.Vs/p.R1, P2=p.Vs*p.Vs/p.R2, Pt=P1+P2;
      return { ans:{P1:P1,P2:P2,Pt:Pt}, unit:{P1:'W',P2:'W',Pt:'W'}, steps:[
        '병렬 = 같은 전압: P₁ = V²/R₁ = '+SVH.fmt(P1)+' W, P₂ = '+SVH.fmt(P2)+' W',
        '총합 '+SVH.fmt(Pt)+' W = V²/R_eq 로도 확인 가능 (작은 저항이 더 뜨겁다)' ] }; },
    hints:['병렬은 전압이 공통 → P=V²/R가 편하다.'] },
  { id:'u2-l3-05', level:3, type:'num', tags:['설계·정격'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:12,max:24,step:4,unit:'V'}, Vout:{min:3,max:9,step:1,unit:'V'}, Imax:{choices:[1,2,5],unit:'mA'} },
    constraint:function(p){ return p.Vout < p.Vs; },
    statement:function(p){ return p.Vs+' V에서 '+p.Vout+' V를 만드는 분압기를 설계한다. 분압기 자체에 흐르는 전류를 정확히 '+p.Imax+' mA로 하려면 R₁(위)과 R₂(아래)는?'; },
    solve:function(p){ var Rtot=p.Vs/(p.Imax/1000), R2=p.Vout/(p.Imax/1000), R1=Rtot-R2;
      return { ans:{R1:R1, R2:R2}, unit:{R1:'Ω', R2:'Ω'}, steps:[
        '총 저항: R₁+R₂ = V_s/I = '+SVH.fmt(Rtot)+' Ω',
        'R₂ = V_out/I = '+SVH.fmt(R2)+' Ω → R₁ = '+SVH.fmt(R1)+' Ω',
        '검토: 분압 '+p.Vs+'×'+SVH.fmt(R2)+'/'+SVH.fmt(Rtot)+' = '+SVH.fmt(p.Vs*R2/Rtot)+' V ✓' ] }; },
    hints:['전류 조건이 총 저항을 정한다.','출력 전압 조건이 R₂를 정한다.'] },
  { id:'u2-l3-06', level:3, type:'num', tags:['분류 3가지'], src:'창작 문제(검산됨)',
    params:{ Is:{min:6,max:24,step:6,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:3,max:12,step:3,unit:'Ω'}, R3:{min:4,max:12,step:4,unit:'Ω'} },
    statement:function(p){ return '전류원 '+p.Is+' A가 R₁·R₂·R₃('+p.R1+'·'+p.R2+'·'+p.R3+' Ω) 3병렬에 연결. R₂의 전류와 공통 전압을 구하라.'; },
    solve:function(p){ var Re=SVH.par3(p.R1,p.R2,p.R3), V=p.Is*Re, I2=V/p.R2;
      return { ans:{V:V, I2:I2}, unit:{V:'V', I2:'A'}, steps:[
        'R_eq = '+SVH.fmt(Re)+' Ω → 공통 전압 V = I·R_eq = '+SVH.fmt(V)+' V',
        'I₂ = V/R₂ = '+SVH.fmt(I2)+' A' ] }; },
    hints:['3가지 이상 분류는 "전압 먼저" 전략이 실수가 적다.'] },
  { id:'u2-l3-07', level:3, type:'num', tags:['개방·단락 분석'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:12,max:24,step:4,unit:'V'}, R1:{min:100,max:300,step:100,unit:'Ω'}, R2:{min:100,max:300,step:100,unit:'Ω'} },
    statement:function(p){ return p.Vs+' V → R₁='+p.R1+' Ω → R₂='+p.R2+' Ω 직렬 회로에서, R₂ 양단에 스위치가 병렬로 있다. (a) 스위치 열림 (b) 닫힘일 때 R₁의 전류를 각각 구하라.'; },
    solve:function(p){ var Iopen=p.Vs/(p.R1+p.R2), Iclosed=p.Vs/p.R1;
      return { ans:{Iopen:Iopen, Iclosed:Iclosed}, unit:{Iopen:'A', Iclosed:'A'}, steps:[
        '열림: I = V/(R₁+R₂) = '+SVH.fmt(Iopen)+' A',
        '닫힘: R₂가 단락되어 I = V/R₁ = '+SVH.fmt(Iclosed)+' A (전류 증가 — 과도 단원의 스위칭 회로 읽기 연습)' ] }; },
    hints:['닫힌 스위치 = 저항 0의 경로.','병렬의 0은 전체를 0으로.'] },
  { id:'u2-l3-08', level:3, type:'num', tags:['균형 브리지 등가'], src:'창작 문제(검산됨)',
    params:{ R:{min:60,max:240,step:60,unit:'Ω'} },
    statement:function(p){ return '다섯 저항이 모두 '+p.R+' Ω인 휘트스톤 브리지(가운데 포함)의 입력 단자 등가저항은?'; },
    solve:function(p){ var Re=p.R;
      return { ans:Re, unit:'Ω', steps:[
        '모두 같은 값 → 브리지 평형 → 가운데 저항엔 전류 0, 제거 가능',
        '남는 회로: (R+R) ∥ (R+R) = 2R∥2R = R = '+SVH.fmt(Re)+' Ω' ] }; },
    hints:['먼저 평형인지 확인한다.','평형이면 가운데는 없는 셈.'] },
  { id:'u2-l3-09', level:3, type:'num', tags:['실용 배선'], src:'창작 문제(검산됨)',
    params:{ Vs:{choices:[12,24],unit:'V'}, Rw:{choices:[0.5,1,1.5],unit:'Ω'}, RL:{min:5,max:20,step:5,unit:'Ω'} },
    statement:function(p){ return p.Vs+' V 전원에서 왕복 전선 저항 총 '+(2*p.Rw)+' Ω(편도 '+p.Rw+' Ω×2)을 거쳐 부하 '+p.RL+' Ω에 전력을 보낸다. 부하 전압과 전선 손실 전력을 구하라.'; },
    solve:function(p){ var Rw2=2*p.Rw, I=p.Vs/(Rw2+p.RL), VL=I*p.RL, Pw=I*I*Rw2;
      return { ans:{VL:VL, Pw:Pw}, unit:{VL:'V', Pw:'W'}, steps:[
        'I = '+p.Vs+'/'+SVH.fmt(Rw2+p.RL)+' = '+SVH.fmt(I)+' A',
        '부하 전압 = IR_L = '+SVH.fmt(VL)+' V, 전선 손실 = I²R_w = '+SVH.fmt(Pw)+' W' ] }; },
    hints:['전선도 직렬 저항이다.','왕복이므로 2배.'] },
  { id:'u2-l3-10', level:3, type:'num', tags:['등가저항 역산'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:10,max:30,step:5,unit:'V'}, I:{min:1,max:5,step:1,unit:'A'}, R1:{min:1,max:4,step:1,unit:'Ω'} },
    constraint:function(p){ return p.Vs/p.I - p.R1 > 0.5; },
    statement:function(p){ return p.Vs+' V 전원이 R₁='+p.R1+' Ω와 미지 저항 R₂의 직렬 회로에 '+p.I+' A를 흘린다. R₂와, R₂에서 소비되는 전력을 구하라.'; },
    solve:function(p){ var R2=p.Vs/p.I-p.R1, P2=p.I*p.I*R2;
      return { ans:{R2:R2, P2:P2}, unit:{R2:'Ω', P2:'W'}, steps:[
        'R_total = V/I = '+SVH.fmt(p.Vs/p.I)+' Ω → R₂ = '+SVH.fmt(R2)+' Ω',
        'P₂ = I²R₂ = '+SVH.fmt(P2)+' W' ] }; },
    hints:['전체 저항부터 역산.'] },

  /* ---------- L4 (5) ---------- */
  { id:'u2-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 진술을 모두 고른 것은?<br>㉠ 분압기 출력에 부하를 달면 출력 전압은 항상 낮아진다<br>㉡ 전류 분배에서 전류는 저항이 큰 가지로 더 많이 흐른다<br>㉢ 평형 브리지의 가운데 소자는 제거해도 나머지 회로에 영향이 없다<br>㉣ 같은 값 R 저항 n개 병렬의 등가는 R/n이다',
    choices:['㉠㉢㉣','㉠㉡㉣','㉢㉣','㉠㉡㉢'],
    answer:0, expl:'㉡이 반대다(작은 저항으로 더 많이). 부하 효과·평형 브리지·R/n은 모두 표준 결과.' },
  { id:'u2-l4-02', level:4, type:'num', tags:['사다리 종합'], src:'기출 유형',
    params:{ Vs:{min:12,max:36,step:6,unit:'V'}, R:{min:2,max:8,step:2,unit:'Ω'} },
    statement:function(p){ return '모두 '+p.R+' Ω인 2단 사다리: 전원 '+p.Vs+' V → R → [병렬: R, (R → [병렬: R, R])]. 맨 끝 저항의 전류를 구하라. (계산 순서를 명시할 것)'; },
    solve:function(p){
      var R=p.R;
      var s3=SVH.par(R,R);        // 끝단 병렬
      var s2=R+s3;                 // 직렬
      var s1=SVH.par(R,s2);        // 중간 병렬
      var Rt=R+s1;
      var It=p.Vs/Rt;
      var Vmid=It*s1;              // 중간 병렬부 전압
      var I2=Vmid/s2;              // 오른쪽 가지 전류
      var Vend=I2*s3;              // 끝 병렬부 전압
      var Iend=Vend/R;
      return { ans:Iend, unit:'A', steps:[
        '뒤에서 접기: R∥R='+SVH.fmt(s3)+', +R='+SVH.fmt(s2)+', ∥R='+SVH.fmt(s1)+', +R=총 '+SVH.fmt(Rt)+' Ω',
        '전원 전류 '+SVH.fmt(It)+' A → 중간 병렬부 전압 '+SVH.fmt(Vmid)+' V',
        '오른쪽 가지 전류 '+SVH.fmt(I2)+' A → 끝 병렬부 전압 '+SVH.fmt(Vend)+' V',
        '끝 저항 전류 = '+SVH.fmt(Iend)+' A' ] }; },
    hints:['뒤에서 앞으로 접고, 다시 앞에서 뒤로 전개.','각 단계 전압을 기록하며 간다.'] },
  { id:'u2-l4-03', level:4, type:'num', tags:['불평형 브리지'], src:'기출 유형',
    params:{ Vs:{min:10,max:20,step:5,unit:'V'}, R1:{min:100,max:300,step:100,unit:'Ω'}, R2:{min:100,max:300,step:100,unit:'Ω'}, R3:{min:100,max:300,step:100,unit:'Ω'}, R4:{min:100,max:300,step:100,unit:'Ω'} },
    statement:function(p){ return '브리지: '+p.Vs+' V 전원, 왼쪽 가지 위 R₁='+p.R1+' Ω·아래 R₃='+p.R3+' Ω, 오른쪽 가지 위 R₂='+p.R2+' Ω·아래 R₄='+p.R4+' Ω. 가운데는 (이상)전압계만 있다. 전압계가 읽는 값 \\(V_{AB}\\)(왼쪽 중점 − 오른쪽 중점)를 구하라.'; },
    solve:function(p){ var VA=p.Vs*p.R3/(p.R1+p.R3), VB=p.Vs*p.R4/(p.R2+p.R4), V=VA-VB;
      return { ans:V, unit:'V', steps:[
        '이상 전압계 = 전류 0 → 두 가지는 독립 분압기',
        'V_A = '+SVH.fmt(VA)+' V, V_B = '+SVH.fmt(VB)+' V',
        'V_AB = '+SVH.fmt(V)+' V (0이면 평형 — 교차곱 확인)' ] }; },
    hints:['이상 전압계는 개방과 같다.','각 가지를 따로 분압.'] },
  { id:'u2-l4-04', level:4, type:'num', tags:['감쇠기 설계'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:10,max:20,step:5,unit:'V'}, k:{choices:[2,4,5,10]}, Rtot:{choices:[10,20,50],unit:'kΩ'} },
    statement:function(p){ return '입력 '+p.Vs+' V를 정확히 1/'+p.k+'로 줄이는 분압기를, 총 저항 '+p.Rtot+' kΩ로 설계하라. R₁(위)·R₂(아래) 값과 출력 전압을 구하라.'; },
    solve:function(p){ var R2=p.Rtot/p.k, R1=p.Rtot-R2, Vo=p.Vs/p.k;
      return { ans:{R1:R1, R2:R2, Vo:Vo}, unit:{R1:'kΩ', R2:'kΩ', Vo:'V'}, steps:[
        '비율 조건: R₂/(R₁+R₂) = 1/'+p.k+' → R₂ = '+SVH.fmt(R2)+' kΩ',
        '총합 조건: R₁ = '+SVH.fmt(R1)+' kΩ',
        '출력 = '+SVH.fmt(Vo)+' V. 검토: 비율 '+SVH.fmt(R2/p.Rtot)+' = 1/'+p.k+' ✓' ] }; },
    hints:['두 조건(비율·총합)으로 2미지수.'] },
  { id:'u2-l4-05', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'전압 분배 법칙 \\(v_2 = v_s\\dfrac{R_2}{R_1+R_2}\\) 를 KVL과 옴 법칙에서 유도하고, 극한으로 검증하라.',
    steps:[
      '직렬 루프이므로 두 저항에 같은 전류 i가 흐른다 [무엇을] KCL의 직렬 특수화 [왜] 갈라질 절점이 없으므로',
      'KVL: \\(v_s = iR_1 + iR_2 = i(R_1+R_2)\\) → \\(i = v_s/(R_1+R_2)\\)',
      '옴 법칙으로 \\(v_2 = iR_2 = v_s\\dfrac{R_2}{R_1+R_2}\\)',
      '극한 검증: \\(R_2\\to\\infty\\)(개방)이면 v₂→v_s ✓, \\(R_2\\to 0\\)(단락)이면 v₂→0 ✓, R₁=R₂이면 절반 ✓',
      '차원 체크: 저항비는 무차원이므로 [V] 유지 ✓ — 부하가 붙으면 이 유도의 첫 줄(같은 전류)이 깨진다는 것까지 말할 수 있어야 한다'
    ],
    hints:['직렬 = 같은 전류에서 출발.','극한 3개(개방·단락·동일)로 검증.'],
    expl:'유도 자체가 기출 1번 개념 문항들(부하 효과)의 뿌리다.' },

  { id:'u2-l3-11', level:3, type:'num', tags:['2단 분압 로딩'], src:'기출 유형',
    params:{ Vs:{choices:[12,24],unit:'V'}, R:{choices:[1,10],unit:'kΩ'} },
    statement:function(p){ return '모두 '+p.R+' kΩ인 분압기 2단을 버퍼 없이 직결: [R–R 분압] 출력에 다시 [R–R 분압]. 최종 출력 전압을 구하라. (이상적 ½×½='+SVH.fmt(p.Vs/4)+' V와 비교)'; },
    solve:function(p){
      var R=p.R;
      // v1 절점: (Vs-v1)/R = v1/R + (v1-v2)/R ; v2: (v1-v2)/R = v2/R
      var s=SVH.solve2(3/R,-1/R,p.Vs/R,-1/R,2/R,0);
      return { ans:s[1], unit:'V', steps:[
        '뒷단이 앞단의 아래 저항에 병렬로 걸린다 → 이상값(¼)보다 낮아진다',
        '절점 2개 연립: v₁='+SVH.fmt(s[0])+' V, v₂='+SVH.fmt(s[1])+' V',
        '이상 '+SVH.fmt(p.Vs/4)+' V 대비 '+SVH.fmt(s[1]/(p.Vs/4)*100)+'% — 버퍼가 필요한 이유의 정량화' ] }; },
    hints:['단순 곱(½×½)이 왜 틀리는지부터.','절점법 2미지수.'] },
  { id:'u2-l3-12', level:3, type:'num', tags:['4단 사다리'], src:'기출 유형',
    params:{ R:{min:2,max:8,step:2,unit:'Ω'} },
    statement:function(p){ return '모두 '+p.R+' Ω인 4단 사다리: 직렬R→병렬R→직렬R→병렬R (뒤가 개방). 입력 등가저항을 구하라.'; },
    solve:function(p){
      var R=p.R;
      var z=R;            // 마지막 병렬 R (개방 종단)
      z=R+z;              // 직렬
      z=SVH.par(R,z);     // 병렬
      z=R+z;              // 직렬
      return { ans:z, unit:'Ω', steps:[
        '뒤에서 접기: R(끝 병렬) → +R = '+SVH.fmt(2*R)+' → ∥R = '+SVH.fmt(SVH.par(R,2*R))+' → +R = '+SVH.fmt(z)+' Ω',
        '(단수가 늘수록 황금비 R(1+√5)/2 ≈ '+SVH.fmt(R*1.618)+' Ω로 수렴한다는 것도 알아두면 검산 감각)' ] }; },
    hints:['맨 끝부터 한 단씩.'] },
  { id:'u2-l3-13', level:3, type:'num', tags:['온도 드리프트'], src:'창작 문제(검산됨)',
    params:{ Vs:{choices:[10],unit:'V'}, R:{choices:[1000],unit:'Ω'}, alpha:{choices:[0.0039],unit:'1/°C'}, dT:{choices:[25,50],unit:'°C'} },
    statement:function(p){ return '같은 1 kΩ 저항 두 개의 분압기(출력=½V_s)에서 아래 저항만 구리 권선형이라 온도가 '+p.dT+' °C 오르면 R(1+αΔT), α='+p.alpha+'/°C로 변한다. (a) 새 출력 전압 (b) 출력 변화율(%)을 구하라.'; },
    solve:function(p){
      var R2=p.R*(1+p.alpha*p.dT);
      var v=p.Vs*R2/(p.R+R2), dv=(v-p.Vs/2)/(p.Vs/2)*100;
      return { ans:{v:v, dv:dv}, unit:{v:'V', dv:'%'}, steps:[
        'R₂ = 1000(1+'+p.alpha+'×'+p.dT+') = '+SVH.fmt(R2)+' Ω',
        'V = '+p.Vs+'×'+SVH.fmt(R2)+'/'+SVH.fmt(p.R+R2)+' = '+SVH.fmt(v)+' V',
        '변화율 = '+SVH.fmt(dv)+' % (기출 1번 "가변저항 온도 안정성" 진술의 정량판)' ] }; },
    hints:['한쪽만 변하면 분압비가 틀어진다.'] },
  { id:'u2-l3-14', level:3, type:'num', tags:['정격 한계 회로'], src:'기출 유형',
    params:{ R:{choices:[100,220],unit:'Ω'}, Pr:{choices:[0.25,0.5],unit:'W'} },
    statement:function(p){ return '같은 R='+p.R+' Ω('+p.Pr+' W 정격) 두 개를 (a) 직렬 (b) 병렬로 연결했을 때 전체에 걸 수 있는 최대 전압을 각각 구하라.'; },
    solve:function(p){
      var Vser=2*Math.sqrt(p.Pr*p.R); // 직렬: 각자에 절반 전압, 각자 P=Vh²/R ≤ Pr → Vh=√(PrR), 전체=2Vh
      var Vpar=Math.sqrt(p.Pr*p.R);   // 병렬: 각자에 전체 전압
      return { ans:{Vser:Vser, Vpar:Vpar}, unit:{Vser:'V', Vpar:'V'}, steps:[
        '직렬: 각 저항에 V/2 → (V/2)²/R ≤ P_r → V_max = 2√(P_rR) = '+SVH.fmt(Vser)+' V',
        '병렬: 각 저항에 V 전부 → V_max = √(P_rR) = '+SVH.fmt(Vpar)+' V',
        '(직렬이 전압 한계 2배 — 총 정격 전력은 두 경우 모두 2P_r로 같다는 점이 함정)' ] }; },
    hints:['한계는 "개별 저항"의 정격에서 나온다.'] },
  { id:'u2-l4-06', level:4, type:'num', tags:['분류 설계 2조건'], src:'기출 유형',
    params:{ Is:{choices:[10,20],unit:'mA'}, I1:{choices:[2,4],unit:'mA'}, R1:{choices:[6,12],unit:'kΩ'} },
    constraint:function(p){ return p.I1<p.Is/2; },
    statement:function(p){ return '전체 '+p.Is+' mA를 두 가지로 나눈다: R₁='+p.R1+' kΩ 가지에 정확히 '+p.I1+' mA가 흐르게 하는 (a) R₂ (b) 그때 공통 전압 (c) 각 저항의 소비 전력(mW)을 구하라.'; },
    solve:function(p){
      var V=p.I1*p.R1;                 // mA×kΩ=V
      var I2=p.Is-p.I1, R2=V/I2;
      var P1=V*p.I1, P2=V*I2;
      return { ans:{R2:R2, V:V, P1:P1, P2:P2}, unit:{R2:'kΩ', V:'V', P1:'mW', P2:'mW'}, steps:[
        '공통 전압 V = I₁R₁ = '+SVH.fmt(V)+' V',
        'I₂ = '+SVH.fmt(I2)+' mA → R₂ = V/I₂ = '+SVH.fmt(R2)+' kΩ',
        'P₁ = '+SVH.fmt(P1)+' mW, P₂ = '+SVH.fmt(P2)+' mW (전류 많이 가져간 쪽이 뜨겁다)' ] }; },
    hints:['병렬 = 공통 전압에서 출발하면 설계가 한 줄씩 풀린다.'] },
  { id:'u2-l4-07', level:4, type:'num', tags:['브리지 감도'], src:'기출 유형',
    params:{ Vs:{choices:[10],unit:'V'}, R:{choices:[100,350],unit:'Ω'}, dR:{choices:[0.5,1],unit:'Ω'} },
    statement:function(p){ return '스트레인게이지 브리지: 네 저항 모두 R='+p.R+' Ω로 평형, 한 저항만 R+ΔR(ΔR='+p.dR+' Ω)로 변했다. (a) 출력 전압(mV, 정확값) (b) 근사식 V_s·ΔR/4R와의 차이를 구하라.'; },
    solve:function(p){
      var Vex=p.Vs*( (p.R+p.dR)/(2*p.R+p.dR) - 0.5 )*1000;
      var Vap=p.Vs*p.dR/(4*p.R)*1000;
      return { ans:{Vex:Vex, Vap:Vap}, unit:{Vex:'mV', Vap:'mV'}, steps:[
        '정확: V = V_s[(R+ΔR)/(2R+ΔR) − ½] = '+SVH.fmt(Vex)+' mV',
        '근사: V ≈ V_sΔR/4R = '+SVH.fmt(Vap)+' mV',
        '차이 '+SVH.fmt(Math.abs(Vex-Vap))+' mV — ΔR≪R라 근사가 잘 맞는다(센서 공학의 표준 결과)' ] }; },
    hints:['변한 가지만 분압을 다시 쓴다.','ΔR 1차 근사와 비교.'] },
  { id:'u2-l4-08', level:4, type:'num', tags:['전압 강하 규격 설계'], src:'기출 유형',
    params:{ Vs:{choices:[12,24],unit:'V'}, RL:{choices:[6,12],unit:'Ω'}, reg:{choices:[95,98],unit:'%'} },
    statement:function(p){ return p.Vs+' V 전원에서 부하 R_L='+p.RL+' Ω까지 배선한다. 부하 전압이 전원의 '+p.reg+'% 이상이어야 할 때 (a) 허용 최대 왕복 배선 저항 (b) 그때 배선 손실 전력을 구하라.'; },
    solve:function(p){
      var f=p.reg/100;
      var Rw=p.RL*(1-f)/f;
      var I=p.Vs/(Rw+p.RL), Pw=I*I*Rw;
      return { ans:{Rw:Rw, Pw:Pw}, unit:{Rw:'Ω', Pw:'W'}, steps:[
        '분압 조건: R_L/(R_w+R_L) ≥ '+f+' → R_w ≤ R_L(1−'+f+')/'+f+' = '+SVH.fmt(Rw)+' Ω',
        '경계에서 I = '+SVH.fmt(I)+' A → 배선 손실 = I²R_w = '+SVH.fmt(Pw)+' W',
        '(배선 굵기 선정 계산의 원형 — 실험·실무 공용)' ] }; },
    hints:['조건을 분압 부등식으로.','경계값에서 손실 평가.'] },
  ]
});
