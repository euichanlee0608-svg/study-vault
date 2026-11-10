/* U9 근궤적 — Nise 8판 8장(기말범위 W10~11, Lec0 주차표). 실험실: ../lab/root-locus.html */
SV_BANK.push({
  id: 'u9', no: 9, title: '근궤적', titleEn: 'Root Locus',
  scope: '정의·각도/크기 조건 · 실수축 구간 · 점근선 · 이탈·유입점 · 허수축 교차 · 출발·도착각 · 이득 설계(ζ·%OS)',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u9-l1-01', level:1, type:'mc', tags:['근궤적 정의'], src:'교재 표준',
    statement:'근궤적(root locus)의 정의로 가장 정확한 것은?',
    choices:['특성방정식 \\(1+KG(s)H(s)=0\\)의 근이 K가 0에서 ∞로 변할 때 s-평면에 그리는 궤적',
             '개루프 전달함수 \\(G(s)H(s)\\)의 극점이 K에 따라 움직이는 궤적',
             '단위 계단응답 y(t)가 시간에 따라 그리는 곡선',
             '주파수 ω를 0에서 ∞로 바꿀 때 \\(G(j\\omega)H(j\\omega)\\)가 그리는 궤적'],
    answer:0, expl:'움직이는 것은 폐루프 극점(특성방정식의 근)이다. 개루프 극점·영점은 K와 무관하게 고정된 출발점·도착점이고, 마지막 보기는 나이퀴스트 선도다.' },
  { id:'u9-l1-02', level:1, type:'tf', tags:['근궤적 대칭'], src:'교재 표준',
    statement:'실계수 시스템의 근궤적은 항상 실수축에 대해 대칭이다.',
    answer:true, expl:'특성방정식 \\(D(s)+KN(s)=0\\)의 계수가 실수이므로 복소근은 켤레 쌍으로만 나온다 — 위 가지가 있으면 아래 가지가 거울상으로 있다.' },
  { id:'u9-l1-03', level:1, type:'mc', tags:['각도 조건'], src:'교재 표준',
    statement:'점 s가 근궤적(K > 0) 위에 있을 조건인 각도 조건은?',
    choices:['\\(\\angle KG(s)H(s)=(2k+1)\\cdot180^\\circ\\)', '\\(\\angle KG(s)H(s)=k\\cdot360^\\circ\\)', '\\(|KG(s)H(s)|=0\\)', '\\(\\angle G(s)H(s)=90^\\circ\\)'],
    answer:0, expl:'\\(KG(s)H(s)=-1\\)이어야 하므로 크기는 1, 각은 180°의 홀수배. 각도 조건으로 궤적 위치를 정하고, 크기 조건 \\(K=1/|G(s)H(s)|\\)로 그 점의 K를 구한다. k·360°는 K < 0(보조 근궤적)의 조건이다.' },
  { id:'u9-l1-04', level:1, type:'mc', tags:['가지 수'], src:'교재 표준',
    statement:'개루프 극점이 3개, 영점이 1개인 시스템의 근궤적 가지(branch) 수는?',
    choices:['3', '1', '2', '4'],
    answer:0, expl:'가지 수 = 폐루프 극점 수 = 특성방정식 차수 = max(n, m) = 3. 그중 1개는 영점으로 들어가고, n − m = 2개는 점근선을 따라 무한대로 간다.' },
  { id:'u9-l1-05', level:1, type:'tf', tags:['출발점·도착점'], src:'교재 표준',
    statement:'근궤적의 각 가지는 K = 0일 때 개루프 영점에서 출발한다.',
    answer:false, expl:'K = 0이면 특성방정식이 \\(D(s)=0\\) — 개루프 극점에서 출발한다. K → ∞에서는 \\(N(s)=0\\), 곧 유한 영점(또는 무한대의 영점)으로 들어간다.' },
  { id:'u9-l1-06', level:1, type:'mc', tags:['실수축 구간'], src:'교재 표준',
    statement:'실수축 위의 점이 근궤적(K > 0)에 속할 조건은?',
    choices:['그 점 오른쪽에 있는 실수 극점과 실수 영점 개수의 합이 홀수', '그 점 왼쪽에 있는 실수 극점과 실수 영점 개수의 합이 홀수',
             '그 점 오른쪽에 있는 실수 극점 개수가 짝수', '복소 극점이 없을 때만 실수축에 궤적이 생긴다'],
    answer:0, expl:'실수축 위 시험점에서 왼쪽 극점·영점은 각 0°, 켤레 쌍은 서로 상쇄, 오른쪽 것만 180°씩 기여한다. 합이 180°의 홀수배가 되려면 오른쪽 개수가 홀수.' },

  /* ---------- L2 (12) ---------- */
  { id:'u9-l2-01', level:2, type:'num', tags:['점근선'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,4]}, c:{choices:[5,6]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{(s+'+p.a+')(s+'+p.b+')(s+'+p.c+')}\\)의 근궤적에서 (a) 점근선 중심 \\(\\sigma_a\\) (b) 점근선 개수를 구하라.'; },
    solve:function(p){
      var sa=-(p.a+p.b+p.c)/3;
      return { ans:{sa:sa, q:3}, unit:{sa:'', q:'개'}, steps:[
        'n = 3, m = 0 → 점근선 n − m = 3개(각 60°, 180°, 300°)',
        'σa = (Σ극점 − Σ영점)/(n − m) = ('+(-p.a)+(-p.b)+(-p.c)+')/3 = '+SVH.fmt(sa) ] }; },
    hints:['극점의 합에서 영점의 합을 빼고 n − m으로 나눈다.'] },
  { id:'u9-l2-02', level:2, type:'num', tags:['점근선'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,3]}, b:{choices:[5,6]}, z:{choices:[1,4]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K(s+'+p.z+')}{s(s+'+p.a+')(s+'+p.b+')}\\)의 (a) 점근선 중심 \\(\\sigma_a\\) (b) 점근선이 양의 실수축과 이루는 각 중 0°~180° 사이의 것(도)을 구하라.'; },
    solve:function(p){
      var sa=(0-p.a-p.b+p.z)/2;
      return { ans:{sa:sa, th:90}, unit:{sa:'', th:'°'}, steps:[
        'n − m = 3 − 1 = 2 → 각 (2k+1)·180°/2 = 90°, 270°',
        'σa = (0 − '+p.a+' − '+p.b+' − (−'+p.z+'))/2 = '+SVH.fmt(sa) ] }; },
    hints:['영점은 Σ영점에 −z로 들어간다 — 빼면 +z.'] },
  { id:'u9-l2-03', level:2, type:'num', tags:['이탈점'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,5,7]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{(s+'+p.a+')(s+'+p.b+')}\\)의 실수축 이탈점 \\(\\sigma_b\\)와 그때의 이득 K를 구하라.'; },
    solve:function(p){
      var sb=-(p.a+p.b)/2, K=Math.pow((p.b-p.a)/2,2);
      return { ans:{sb:sb, K:K}, unit:{sb:'', K:''}, steps:[
        'K(σ) = −(σ+'+p.a+')(σ+'+p.b+'), dK/dσ = −(2σ+'+(p.a+p.b)+') = 0',
        'σb = −'+SVH.fmt((p.a+p.b)/2)+' (두 극점의 한가운데)',
        'K = −(σb+'+p.a+')(σb+'+p.b+') = ('+SVH.fmt((p.b-p.a)/2)+')² = '+SVH.fmt(K) ] }; },
    hints:['실수축 위에서 K(σ) = −D(σ)/N(σ)가 극대인 점이 이탈점.'] },
  { id:'u9-l2-04', level:2, type:'num', tags:['감쇠비 설계'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4,6]}, z:{choices:[0.5,0.6,0.8]} },
    statement:function(p){ return '단위 피드백 \\(G(s)=\\dfrac{K}{s(s+'+p.a+')}\\)에서 폐루프 감쇠비가 ζ = '+p.z+'가 되는 K를 구하라.'; },
    solve:function(p){
      var K=p.a*p.a/(4*p.z*p.z);
      return { ans:K, unit:'', steps:[
        '특성식 s² + '+p.a+'s + K = 0 → 2ζωn = '+p.a+', ωn² = K',
        'ζ = '+p.a+'/(2√K) → K = a²/(4ζ²) = '+SVH.fmt(K) ] }; },
    hints:['표준형 s² + 2ζωn s + ωn²과 계수를 맞춘다.'] },
  { id:'u9-l2-05', level:2, type:'num', tags:['크기 조건'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, w:{choices:[1,2,3]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')}\\)의 근궤적 위의 점 \\(s_0=-'+(p.a/2)+'+j'+p.w+'\\)에서의 이득 K를 크기 조건으로 구하라.'; },
    solve:function(p){
      var K=(p.a/2)*(p.a/2)+p.w*p.w;
      return { ans:K, unit:'', steps:[
        'K = |s₀|·|s₀+'+p.a+'| (극점에서 s₀까지 거리의 곱 ÷ 영점 거리의 곱)',
        '두 거리 모두 √('+SVH.fmt(p.a/2)+'² + '+p.w+'²) → K = '+SVH.fmt(p.a*p.a/4)+' + '+(p.w*p.w)+' = '+SVH.fmt(K) ] }; },
    hints:['K = (극점까지 거리의 곱)/(영점까지 거리의 곱). 영점이 없으면 분모는 1.'] },
  { id:'u9-l2-06', level:2, type:'num', tags:['각도 조건'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[0,1]}, b:{choices:[2,3]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{'+(p.a===0?'s':'(s+'+p.a+')')+'(s+'+p.b+')}\\)와 시험점 \\(s_0=-1+j\\)에 대해 (a) 두 극점에서 s₀로 그은 벡터 각의 합 \\(\\angle(s_0+'+p.a+')+\\angle(s_0+'+p.b+')\\)(도, 각각 0°~180°) (b) s₀가 근궤적 위에 있으면 1, 아니면 0을 구하라.'; },
    solve:function(p){
      var t1=SVH.deg(Math.atan2(1,p.a-1)), t2=SVH.deg(Math.atan2(1,p.b-1)), ang=t1+t2, on=Math.abs(ang-180)<1e-6?1:0;
      return { ans:{ang:ang, on:on}, unit:{ang:'°', on:''}, steps:[
        '∠(s₀+'+p.a+') = ∠('+(p.a-1)+' + j) = '+SVH.fmt(t1)+'°, ∠(s₀+'+p.b+') = ∠('+(p.b-1)+' + j) = '+SVH.fmt(t2)+'°',
        '합 = '+SVH.fmt(ang)+'° → ∠G = −'+SVH.fmt(ang)+'° '+(on?'= −180° → 근궤적 위(1)':'≠ (2k+1)·180° → 근궤적 밖(0)') ] }; },
    hints:['∠G = Σ∠(영점 벡터) − Σ∠(극점 벡터). 극점만 있으면 극점 각의 합이 180°여야 한다.'] },
  { id:'u9-l2-07', level:2, type:'num', tags:['허수축 교차'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,4,5]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\)의 근궤적이 허수축과 만나는 점에서 (a) 이득 K (b) 진동수 ω(rad/s)를 구하라.'; },
    solve:function(p){
      var S=p.a+p.b, P=p.a*p.b, K=S*P, w=Math.sqrt(P);
      return { ans:{K:K, w:w}, unit:{K:'', w:'rad/s'}, steps:[
        '특성식 s³ + '+S+'s² + '+P+'s + K = 0에 s = jω 대입',
        '실부: K − '+S+'ω² = 0, 허부: ω('+P+' − ω²) = 0 → ω = √'+P+' = '+SVH.fmt(w),
        'K = '+S+'·'+P+' = '+SVH.fmt(K)+' (Routh 의 K_max 와 같다)' ] }; },
    hints:['s = jω를 넣고 실부·허부를 각각 0으로. Routh 표의 행 전체 0 조건과 같은 답이 나온다.'] },
  { id:'u9-l2-08', level:2, type:'num', tags:['출발각'], src:'창작 문제(검산됨)',
    params:{ b:{choices:[1,2]}, c:{choices:[3,4,5]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{(s+'+p.c+')(s^2+2s+'+(1+p.b*p.b)+')}\\)의 복소 극점 \\(-1+j'+p.b+'\\)에서의 출발각(도)을 구하라.'; },
    solve:function(p){
      var tc=SVH.deg(Math.atan2(p.b,p.c-1)), th=180-90-tc;
      return { ans:th, unit:'°', steps:[
        '다른 극점에서 −1+j'+p.b+'로: 켤레 극점에서 90°, −'+p.c+'에서 atan('+p.b+'/'+(p.c-1)+') = '+SVH.fmt(tc)+'°',
        'θd = 180° − (90° + '+SVH.fmt(tc)+'°) = '+SVH.fmt(th)+'°' ] }; },
    hints:['θd = 180° − Σ(다른 극점에서의 각) + Σ(영점에서의 각).'] },
  { id:'u9-l2-09', level:2, type:'num', tags:['점근선'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,4]}, c:{choices:[5,6]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')(s+'+p.c+')}\\)의 (a) 점근선 중심 \\(\\sigma_a\\) (b) 첫 번째 점근선 각(k = 0, 도)을 구하라.'; },
    solve:function(p){
      var sa=-(p.a+p.b+p.c)/4;
      return { ans:{sa:sa, th1:45}, unit:{sa:'', th1:'°'}, steps:[
        'n − m = 4 → 각 (2k+1)·180°/4 = 45°, 135°, 225°, 315°',
        'σa = (0 − '+p.a+' − '+p.b+' − '+p.c+')/4 = '+SVH.fmt(sa) ] }; },
    hints:['네 점근선은 σa에서 X자로 뻗는다.'] },
  { id:'u9-l2-10', level:2, type:'num', tags:['폐루프 극점'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, K:{choices:[5,10,13]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')}\\), K = '+p.K+'일 때 폐루프 극점 \\(\\sigma\\pm j\\omega\\)의 (a) 실부 σ (b) 허부 ω(> 0)를 구하라.'; },
    solve:function(p){
      var re=-p.a/2, im=Math.sqrt(p.K-p.a*p.a/4);
      return { ans:{re:re, im:im}, unit:{re:'', im:''}, steps:[
        's² + '+p.a+'s + '+p.K+' = 0 → s = −'+SVH.fmt(p.a/2)+' ± j√('+p.K+' − '+SVH.fmt(p.a*p.a/4)+')',
        'σ = '+SVH.fmt(re)+', ω = '+SVH.fmt(im)+' — K를 바꿔도 실부는 그대로(수직 궤적)' ] }; },
    hints:['근의 공식. K > a²/4이면 복소근.'] },
  { id:'u9-l2-11', level:2, type:'num', tags:['이탈점'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,4,5]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\)의 실수축 이탈점 \\(\\sigma_b\\)(0과 −'+p.a+' 사이)와 그때의 K를 구하라.'; },
    solve:function(p){
      var S=p.a+p.b, P=p.a*p.b, sb=(-S+Math.sqrt(S*S-3*P))/3, K=-sb*(sb+p.a)*(sb+p.b);
      return { ans:{sb:sb, K:K}, unit:{sb:'', K:''}, steps:[
        'K(σ) = −σ(σ+'+p.a+')(σ+'+p.b+') → dK/dσ = 0 ⇔ 3σ² + '+(2*S)+'σ + '+P+' = 0',
        'σ = (−'+S+' ± √('+(S*S)+' − '+(3*P)+'))/3 → 0과 −'+p.a+' 사이의 근 σb = '+SVH.fmt(sb),
        'K = −σb(σb+'+p.a+')(σb+'+p.b+') = '+SVH.fmt(K) ] }; },
    hints:['다른 근은 −a와 −b 사이에 떨어져 실수축 궤적 구간 밖이다.'] },
  { id:'u9-l2-12', level:2, type:'num', tags:['이탈점','유입점'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, z:{choices:[3,4,5]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K(s+'+p.z+')}{s(s+'+p.a+')}\\)의 (a) 이탈점 \\(\\sigma_1\\)(0과 −'+p.a+' 사이) (b) 유입점 \\(\\sigma_2\\)(−'+p.z+'보다 왼쪽)를 구하라.'; },
    solve:function(p){
      var r=Math.sqrt(p.z*p.z-p.a*p.z), s1=-p.z+r, s2=-p.z-r;
      return { ans:{s1:s1, s2:s2}, unit:{s1:'', s2:''}, steps:[
        'd/dσ[σ(σ+'+p.a+')/(σ+'+p.z+')] = 0 ⇔ σ² + '+(2*p.z)+'σ + '+(p.a*p.z)+' = 0',
        'σ = −'+p.z+' ± √('+(p.z*p.z)+' − '+(p.a*p.z)+') = −'+p.z+' ± '+SVH.fmt(r),
        'σ₁ = '+SVH.fmt(s1)+', σ₂ = '+SVH.fmt(s2)+' — 복소 부분은 중심 −'+p.z+', 반지름 '+SVH.fmt(r)+'인 원' ] }; },
    hints:['영점이 있으면 dK/dσ = 0은 N\'D − ND\' = 0. 두 근이 원의 지름 양 끝이다.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u9-l3-01', level:3, type:'num', tags:['%OS 설계','감쇠비 설계'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[4,6,8]}, os:{choices:[5,10,20]} },
    statement:function(p){ return '단위 피드백 \\(G(s)=\\dfrac{K}{s(s+'+p.a+')}\\)에서 계단응답 최대 오버슈트를 '+p.os+'%로 만들려 한다. (a) 필요한 감쇠비 ζ (b) 그 ζ가 되는 K를 구하라.'; },
    solve:function(p){
      var L=Math.log(p.os/100), z=-L/Math.sqrt(Math.PI*Math.PI+L*L), K=p.a*p.a/(4*z*z);
      return { ans:{zeta:z, K:K}, unit:{zeta:'', K:''}, steps:[
        'ζ = −ln(%OS/100)/√(π² + ln²(%OS/100)) = '+SVH.fmt(z),
        '근궤적 위 ζ선과의 교점: s² + '+p.a+'s + K에서 ζ = '+p.a+'/(2√K)',
        'K = a²/(4ζ²) = '+SVH.fmt(K) ] }; },
    hints:['%OS → ζ → (근궤적과 ζ선의 교점) → 크기 조건으로 K. 2차계라 교점을 공식으로 바로 얻는다.'] },
  { id:'u9-l3-02', level:3, type:'num', tags:['정착시간','수직 궤적'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4,5]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')}\\)에서 (a) 폐루프가 부족감쇠(진동)일 때의 2% 정착시간 \\(T_s\\)(초) (b) 부족감쇠가 되기 시작하는 K(이 값보다 크면 진동)를 구하라.'; },
    solve:function(p){
      var Ts=8/p.a, Km=p.a*p.a/4;
      return { ans:{Ts:Ts, Kmin:Km}, unit:{Ts:'s', Kmin:''}, steps:[
        '이탈점 −'+SVH.fmt(p.a/2)+' (K = a²/4 = '+SVH.fmt(Km)+') 뒤로 궤적은 Re s = −'+SVH.fmt(p.a/2)+'인 수직선',
        'Ts ≈ 4/(ζωn) = 4/'+SVH.fmt(p.a/2)+' = '+SVH.fmt(Ts)+' s — K를 더 올려도 정착시간은 그대로, 오버슈트만 커진다' ] }; },
    hints:['정착시간은 극점의 실부만으로 정해진다(4/σ).'] },
  { id:'u9-l3-03', level:3, type:'num', tags:['이탈점','근의 합'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[4,5,6]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\)에서 두 가지가 실수축을 떠나는 순간(이탈점)의 (a) 이득 \\(K_b\\) (b) 그때 남은 세 번째 폐루프 극점의 위치를 구하라.'; },
    solve:function(p){
      var S=p.a+p.b, P=p.a*p.b, sb=(-S+Math.sqrt(S*S-3*P))/3, Kb=-sb*(sb+p.a)*(sb+p.b), p3=-S-2*sb;
      return { ans:{Kb:Kb, p3:p3}, unit:{Kb:'', p3:''}, steps:[
        '이탈점: 3σ² + '+(2*S)+'σ + '+P+' = 0의 큰 근 σb = '+SVH.fmt(sb),
        'Kb = −σb(σb+'+p.a+')(σb+'+p.b+') = '+SVH.fmt(Kb),
        '폐루프 극점의 합 = −'+S+'(K와 무관, n − m ≥ 2) → 이탈점의 중근 2개 + p₃: p₃ = −'+S+' − 2σb = '+SVH.fmt(p3) ] }; },
    hints:['n − m ≥ 2이면 폐루프 극점의 합은 개루프 극점의 합과 같다(s^{n−1} 계수가 K에 무관).'] },
  { id:'u9-l3-04', level:3, type:'num', tags:['원형 근궤적','최소 감쇠비'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, z:{choices:[3,4,5]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K(s+'+p.z+')}{s(s+'+p.a+')}\\)의 복소 근궤적은 −'+p.z+'을 중심으로 하는 원이다. (a) 원의 반지름 (b) 이 궤적에서 얻을 수 있는 최소 감쇠비 \\(\\zeta_{min}\\) (c) 그때의 K를 구하라.'; },
    solve:function(p){
      var r=Math.sqrt(p.z*p.z-p.a*p.z), zm=Math.sqrt(p.a/p.z), d=Math.sqrt(p.a*p.z), th=Math.acos(zm);
      var s={re:-d*Math.cos(th), im:d*Math.sin(th)};
      var K=SVH.cmag(s)*SVH.cmag(SVH.cadd(s,SVH.cx(p.a,0)))/SVH.cmag(SVH.cadd(s,SVH.cx(p.z,0)));
      return { ans:{r:r, zmin:zm, K:K}, unit:{r:'', zmin:'', K:''}, steps:[
        '이탈·유입점 −'+p.z+' ± √('+(p.z*p.z)+' − '+(p.a*p.z)+') → 반지름 r = '+SVH.fmt(r),
        '원점에서 원에 그은 접선이 ζ가 가장 작은 방향: sin θ = r/'+p.z+' → ζ = cos θ = √(a/z) = '+SVH.fmt(zm),
        '접점: 원점에서 거리 √(az) = '+SVH.fmt(d)+' → s = '+SVH.fmt(s.re)+' + j'+SVH.fmt(s.im),
        'K = |s||s+'+p.a+'|/|s+'+p.z+'| = '+SVH.fmt(K) ] }; },
    hints:['ζ = cos(원점에서 본 각). 원점에서 원에 접하는 직선이 가장 큰 각(가장 작은 ζ).'] },
  { id:'u9-l3-05', level:3, type:'num', tags:['출발각'], src:'창작 문제(검산됨)',
    params:{ b:{choices:[1,2]}, c:{choices:[4,5]}, z:{choices:[2,3]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K(s+'+p.z+')}{(s+'+p.c+')(s^2+2s+'+(1+p.b*p.b)+')}\\)의 복소 극점 \\(-1+j'+p.b+'\\)에서의 출발각(도)을 구하라.'; },
    solve:function(p){
      var tc=SVH.deg(Math.atan2(p.b,p.c-1)), tz=SVH.deg(Math.atan2(p.b,p.z-1)), th=180-90-tc+tz;
      return { ans:th, unit:'°', steps:[
        '극점에서의 각: 켤레 극점 90°, −'+p.c+'에서 '+SVH.fmt(tc)+'°',
        '영점 −'+p.z+'에서의 각: atan('+p.b+'/'+(p.z-1)+') = '+SVH.fmt(tz)+'°',
        'θd = 180° − 90° − '+SVH.fmt(tc)+'° + '+SVH.fmt(tz)+'° = '+SVH.fmt(th)+'°' ] }; },
    hints:['영점의 각은 더하고 다른 극점의 각은 뺀다.'] },
  { id:'u9-l3-06', level:3, type:'num', tags:['감쇠비 설계','최대 시각'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,4]}, z:{choices:[0.5,0.6]} },
    statement:function(p){ return '단위 피드백 \\(G(s)=\\dfrac{K}{(s+'+p.a+')(s+'+p.b+')}\\)에서 폐루프 감쇠비를 ζ = '+p.z+'로 하는 (a) K (b) 그때의 최대 시각 \\(T_p\\)(초)를 구하라.'; },
    solve:function(p){
      var S=p.a+p.b, P=p.a*p.b, K=S*S/(4*p.z*p.z)-P, wn=Math.sqrt(P+K), Tp=Math.PI/(wn*Math.sqrt(1-p.z*p.z));
      return { ans:{K:K, Tp:Tp}, unit:{K:'', Tp:'s'}, steps:[
        '특성식 s² + '+S+'s + ('+P+' + K) → 2ζωn = '+S+', ωn² = '+P+' + K',
        'ωn = '+S+'/(2·'+p.z+') = '+SVH.fmt(wn)+' → K = ωn² − '+P+' = '+SVH.fmt(K),
        'Tp = π/(ωn√(1−ζ²)) = '+SVH.fmt(Tp)+' s' ] }; },
    hints:['ζ와 실부(= 합/2)가 정해지면 ωn이 정해진다.'] },
  { id:'u9-l3-07', level:3, type:'num', tags:['감쇠비 설계','정상상태 오차'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4]}, z:{choices:[0.5,0.707]} },
    statement:function(p){ return '단위 피드백 \\(G(s)=\\dfrac{K}{s(s+'+p.a+')}\\)를 ζ = '+p.z+'로 설계했다. (a) 그 K (b) 단위 램프 입력의 정상상태 오차 \\(e_{ss}\\)를 구하라.'; },
    solve:function(p){
      var K=p.a*p.a/(4*p.z*p.z), ess=p.a/K;
      return { ans:{K:K, ess:ess}, unit:{K:'', ess:''}, steps:[
        'K = a²/(4ζ²) = '+SVH.fmt(K),
        'Kv = lim s·G(s) = K/'+p.a+' = '+SVH.fmt(K/p.a)+' → e_ss = 1/Kv = '+SVH.fmt(ess),
        '근궤적의 한계: ζ를 키우면 K가 줄어 램프 오차가 커진다 — 둘을 같이 맞추려면 보상기(U10)' ] }; },
    hints:['1형 시스템의 램프 오차 = 1/Kv, Kv = lim_{s→0} sG(s).'] },
  { id:'u9-l3-08', level:3, type:'num', tags:['허수축 교차','삼중 극점'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2,3]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{(s+'+p.a+')^3}\\)의 근궤적이 허수축과 만나는 (a) K (b) ω(rad/s)를 구하라.'; },
    solve:function(p){
      var a=p.a, K=8*a*a*a, w=a*Math.sqrt(3);
      return { ans:{K:K, w:w}, unit:{K:'', w:'rad/s'}, steps:[
        '세 가지는 −'+a+'에서 60°, 180°, 300°로 출발해 그대로 직선(점근선과 일치)',
        '(s+'+a+')³ = −K → s = −'+a+' + K^{1/3}e^{±j60°}: 허수축에서 실부 0 → K^{1/3}·½ = '+a+' → K = 8a³ = '+K,
        'ω = K^{1/3}·sin60° = '+(2*a)+'·(√3/2) = '+SVH.fmt(w) ] }; },
    hints:['(s+a)³ + K = 0을 직접 푼다 — 세제곱근 세 개.'] },
  { id:'u9-l3-09', level:3, type:'num', tags:['이득 여유','허수축 교차'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,4]}, K0:{choices:[2,4]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\)를 K = '+p.K0+'로 운전한다. (a) 안정 한계 \\(K_{max}\\) (b) 이득 여유(배수) \\(K_{max}/K\\) (c) 이득 여유(dB)를 구하라.'; },
    solve:function(p){
      var Km=p.a*p.b*(p.a+p.b), GM=Km/p.K0, dB=20*Math.log10(GM);
      return { ans:{Kmax:Km, GM:GM, GMdB:dB}, unit:{Kmax:'', GM:'배', GMdB:'dB'}, steps:[
        '허수축 교차: Kmax = ab(a+b) = '+Km,
        '이득 여유 = '+Km+'/'+p.K0+' = '+SVH.fmt(GM)+'배 = 20log₁₀ = '+SVH.fmt(dB)+' dB',
        '같은 값을 보드 선도에서는 위상 −180°에서의 크기로 읽는다(U11 예고)' ] }; },
    hints:['근궤적에서 이득 여유 = (허수축 교차 K)/(현재 K).'] },
  { id:'u9-l3-10', level:3, type:'num', tags:['근의 합','설계'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,3]}, b:{choices:[5,6]}, sg:{choices:[0.5,0.8]} },
    constraint:function(p){ var p3=2*p.sg-(p.a+p.b); return p.a*p.b-p.sg*p.sg+2*p.sg*p3>0; },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\)의 폐루프 복소 극점 쌍의 실부를 \\(-'+p.sg+'\\)로 만들려 한다. (a) 세 번째 폐루프 극점 \\(p_3\\) (b) 복소 극점의 허부 ω(> 0) (c) 필요한 K를 구하라.'; },
    solve:function(p){
      var S=p.a+p.b, P=p.a*p.b, p3=2*p.sg-S, w=Math.sqrt(P-p.sg*p.sg+2*p.sg*p3), K=-p3*(p.sg*p.sg+w*w);
      return { ans:{p3:p3, w:w, K:K}, unit:{p3:'', w:'', K:''}, steps:[
        '극점의 합: 2(−'+p.sg+') + p₃ = −'+S+' → p₃ = '+SVH.fmt(p3),
        '(s² + '+SVH.fmt(2*p.sg)+'s + '+p.sg+'² + ω²)(s − p₃)의 s 계수 = '+P+' → ω² = '+SVH.fmt(w*w)+', ω = '+SVH.fmt(w),
        '상수항: K = −p₃('+p.sg+'² + ω²) = '+SVH.fmt(K) ] }; },
    hints:['폐루프 특성식을 (원하는 2차 인수)·(s − p₃)로 놓고 계수를 맞춘다.'] },
  { id:'u9-l3-11', level:3, type:'num', tags:['PD 보상','유입점','감쇠비 설계'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[1,2,3]}, zt:{choices:[0.5,0.707,0.8]} },
    statement:function(p){ return '이중 적분기에 PD 보상을 붙인 \\(G(s)H(s)=\\dfrac{K(s+'+p.z+')}{s^2}\\)에서 (a) 실수축 유입점 (b) 그때의 K (c) 폐루프 감쇠비가 ζ = '+p.zt+'가 되는 K를 구하라.'; },
    solve:function(p){
      var sbi=-2*p.z, Kbi=4*p.z, K=4*p.z*p.zt*p.zt;
      return { ans:{sbi:sbi, Kbi:Kbi, K:K}, unit:{sbi:'', Kbi:'', K:''}, steps:[
        '특성식 s² + Ks + '+p.z+'K = 0 — 궤적은 −'+p.z+'을 중심, 반지름 '+p.z+'인 원(원점을 지난다)',
        '판별식 0: K² = 4·'+p.z+'K → K = '+Kbi+', 중근 s = −K/2 = '+sbi,
        'ωn² = '+p.z+'K, 2ζωn = K → K = 4zζ² = '+SVH.fmt(K) ] }; },
    hints:['영점이 없으면 이중 적분기는 허수축 위에서 진동만 한다 — PD의 영점이 궤적을 왼쪽으로 끌어온다.'] },
  { id:'u9-l3-12', level:3, type:'num', tags:['도착각'], src:'창작 문제(검산됨)',
    params:{ b:{choices:[1,2]}, c:{choices:[3,4]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K(s^2+2s+'+(1+p.b*p.b)+')}{s(s+'+p.c+')}\\)의 복소 영점 \\(-1+j'+p.b+'\\)로의 도착각(도, −180°~180°)을 구하라.'; },
    solve:function(p){
      var t0=SVH.deg(Math.atan2(p.b,-1)), tc=SVH.deg(Math.atan2(p.b,p.c-1)), th=180+t0+tc-90;
      th=((th+180)%360+360)%360-180;
      return { ans:th, unit:'°', steps:[
        '극점에서 영점으로의 각: 원점에서 '+SVH.fmt(t0)+'°, −'+p.c+'에서 '+SVH.fmt(tc)+'°, 켤레 영점에서 90°',
        'θa = 180° + Σ(극점 각) − Σ(다른 영점 각) = 180 + '+SVH.fmt(t0)+' + '+SVH.fmt(tc)+' − 90 → '+SVH.fmt(th)+'°' ] }; },
    hints:['도착각은 출발각 식에서 극점·영점의 역할과 부호를 바꾼 것.'] },
  { id:'u9-l3-13', level:3, type:'num', tags:['영점 위치','허수축 교차'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[2,3]}, z:{choices:[6,8]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K(s+'+p.z+')}{s(s+'+p.a+')(s+'+p.b+')}\\)의 (a) 안정 한계 \\(K_{max}\\) (b) 그때의 진동수 ω(rad/s)를 구하라.'; },
    solve:function(p){
      var S=p.a+p.b, P=p.a*p.b, Km=P*S/(p.z-S), w=Math.sqrt(Km*p.z/S);
      return { ans:{Kmax:Km, w:w}, unit:{Kmax:'', w:'rad/s'}, steps:[
        '특성식 s³ + '+S+'s² + ('+P+' + K)s + '+p.z+'K',
        'Routh: '+S+'('+P+' + K) > '+p.z+'K → K < '+P*S+'/('+p.z+' − '+S+') = '+SVH.fmt(Km),
        '보조식 '+S+'s² + '+p.z+'K = 0 → ω = √('+p.z+'K/'+S+') = '+SVH.fmt(w) ] }; },
    hints:['영점이 극점의 합보다 더 왼쪽(z > a + b)에 있으면 점근선 중심이 오른쪽으로 밀려 불안정 구간이 생긴다.'] },
  { id:'u9-l3-14', level:3, type:'num', tags:['감쇠비 설계','최대 시각','정착시간'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[2,4,6]}, z:{choices:[0.4,0.6]} },
    statement:function(p){ return '단위 피드백 \\(G(s)=\\dfrac{K}{s(s+'+p.a+')}\\)를 ζ = '+p.z+'로 설계했을 때 (a) 최대 시각 \\(T_p\\) (b) 2% 정착시간 \\(T_s\\)(초)를 구하라.'; },
    solve:function(p){
      var wn=p.a/(2*p.z), Tp=Math.PI/(wn*Math.sqrt(1-p.z*p.z)), Ts=4/(p.z*wn);
      return { ans:{Tp:Tp, Ts:Ts}, unit:{Tp:'s', Ts:'s'}, steps:[
        '2ζωn = '+p.a+' → ωn = '+SVH.fmt(wn),
        'Tp = π/(ωn√(1−ζ²)) = '+SVH.fmt(Tp)+' s, Ts = 4/(ζωn) = '+SVH.fmt(Ts)+' s' ] }; },
    hints:['이 시스템은 ζ를 바꿔도 ζωn = a/2가 고정 — Ts는 같고 Tp만 바뀐다.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u9-l4-01', level:4, type:'num', tags:['근궤적 스케치','점근선','이탈점','허수축 교차'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2,3]}, b:{choices:[4,5,6]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\)의 근궤적을 그리기 위한 (a) 점근선 중심 \\(\\sigma_a\\) (b) 이탈점 \\(\\sigma_b\\) (c) 허수축 교차 K (d) 교차 진동수 ω를 구하라.'; },
    solve:function(p){
      var S=p.a+p.b, P=p.a*p.b, sa=-S/3, sb=(-S+Math.sqrt(S*S-3*P))/3, K=S*P, w=Math.sqrt(P);
      return { ans:{sa:sa, sb:sb, K:K, w:w}, unit:{sa:'', sb:'', K:'', w:'rad/s'}, steps:[
        '실수축 구간: [−'+p.a+', 0], (−∞, −'+p.b+'] · 점근선 60°/180°/300°, σa = −'+S+'/3 = '+SVH.fmt(sa),
        '이탈점: 3σ² + '+(2*S)+'σ + '+P+' = 0의 큰 근 → σb = '+SVH.fmt(sb),
        '허수축: s = jω 대입 → ω = √'+P+' = '+SVH.fmt(w)+', K = '+K,
        '스케치: 0과 −'+p.a+'에서 출발한 두 가지가 σb에서 만나 위아래로 갈라지고 ±j'+SVH.fmt(w)+'에서 허수축을 넘어 60° 점근선에 붙는다' ] }; },
    hints:['스케치 규칙 순서: 실수축 구간 → 점근선 → 이탈점 → 허수축 교차.'] },
  { id:'u9-l4-02', level:4, type:'num', tags:['원형 근궤적','이탈점','유입점'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, z:{choices:[3,4,6]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K(s+'+p.z+')}{s(s+'+p.a+')}\\)의 (a) 이탈점 \\(\\sigma_1\\) (b) 그때의 \\(K_1\\) (c) 유입점 \\(\\sigma_2\\) (d) 그때의 \\(K_2\\)를 구하라.'; },
    solve:function(p){
      var r=Math.sqrt(p.z*p.z-p.a*p.z), s1=-p.z+r, s2=-p.z-r;
      var Kf=function(x){ return -x*(x+p.a)/(x+p.z); }, K1=Kf(s1), K2=Kf(s2);
      return { ans:{s1:s1, K1:K1, s2:s2, K2:K2}, unit:{s1:'', K1:'', s2:'', K2:''}, steps:[
        'σ² + '+(2*p.z)+'σ + '+(p.a*p.z)+' = 0 → σ = −'+p.z+' ± '+SVH.fmt(r),
        'K(σ) = −σ(σ+'+p.a+')/(σ+'+p.z+'): K₁ = '+SVH.fmt(K1)+', K₂ = '+SVH.fmt(K2),
        'K₁ < K < K₂에서 폐루프 극점이 원 위의 복소 쌍, K > K₂면 다시 실수(하나는 영점 −'+p.z+'으로, 하나는 −∞로)' ] }; },
    hints:['이탈점에서 K가 국소 최대, 유입점에서 국소 최소(실수축 위 K(σ)).'] },
  { id:'u9-l4-03', level:4, type:'num', tags:['근궤적 스케치','출발각','허수축 교차'], src:'창작 문제(검산됨)',
    params:{ b:{choices:[1,2]}, c:{choices:[3,4]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{(s+'+p.c+')(s^2+2s+'+(1+p.b*p.b)+')}\\)의 (a) 점근선 중심 \\(\\sigma_a\\) (b) 극점 \\(-1+j'+p.b+'\\)의 출발각(도) (c) 허수축 교차 K (d) 교차 진동수 ω를 구하라.'; },
    solve:function(p){
      var r2=1+p.b*p.b, c=p.c, sa=-(c+2)/3, th=90-SVH.deg(Math.atan2(p.b,c-1));
      var a2=c+2, a1=2*c+r2, a0=c*r2, K=a2*a1-a0, w=Math.sqrt(a1);
      return { ans:{sa:sa, th:th, K:K, w:w}, unit:{sa:'', th:'°', K:'', w:'rad/s'}, steps:[
        'σa = (−'+c+' − 1 − 1)/3 = '+SVH.fmt(sa)+', 점근선 60°/180°/300°',
        'θd = 180° − 90° − atan('+p.b+'/'+(c-1)+') = '+SVH.fmt(th)+'°',
        '특성식 s³ + '+a2+'s² + '+a1+'s + ('+a0+' + K) → Routh: K = '+a2+'·'+a1+' − '+a0+' = '+SVH.fmt(K),
        'ω = √'+a1+' = '+SVH.fmt(w) ] }; },
    hints:['복소 극점이 있으면 출발각부터 — 가지가 위로 올라가는지 오른쪽으로 꺾이는지가 여기서 정해진다.'] },
  { id:'u9-l4-04', level:4, type:'num', tags:['근의 합','설계','2차 근사'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[6,8]}, sg:{choices:[0.4,0.6]} },
    constraint:function(p){ var p3=2*p.sg-(p.a+p.b); return p.a*p.b-p.sg*p.sg+2*p.sg*p3>0; },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\)의 지배극점 실부를 \\(-'+p.sg+'\\)로 설계한다. (a) 세 번째 극점 \\(p_3\\) (b) 지배극점 허부 ω (c) K (d) 지배극점의 ζ (e) \\(|p_3|/'+p.sg+'\\)(2차 근사 타당성 비율)을 구하라.'; },
    solve:function(p){
      var S=p.a+p.b, P=p.a*p.b, p3=2*p.sg-S, w=Math.sqrt(P-p.sg*p.sg+2*p.sg*p3), K=-p3*(p.sg*p.sg+w*w);
      var z=p.sg/Math.sqrt(p.sg*p.sg+w*w), ratio=-p3/p.sg;
      return { ans:{p3:p3, w:w, K:K, zeta:z, ratio:ratio}, unit:{p3:'', w:'', K:'', zeta:'', ratio:'배'}, steps:[
        '극점의 합 −'+S+' → p₃ = '+SVH.fmt(p3),
        's 계수 비교 → ω = '+SVH.fmt(w)+', 상수항 → K = '+SVH.fmt(K),
        'ζ = '+p.sg+'/√('+p.sg+'² + ω²) = '+SVH.fmt(z),
        '|p₃|/σ = '+SVH.fmt(ratio)+'배 — 5배 이상이면 2차 근사가 잘 맞는다' ] }; },
    hints:['2차 근사는 나머지 극점이 지배극점보다 5배 이상 왼쪽에 있을 때 믿는다.'] },
  { id:'u9-l4-05', level:4, type:'num', tags:['PD 보상','정착시간 설계'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[1,2]}, Ts:{choices:[4,8]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K(s+'+p.z+')}{s^2}\\)에서 2% 정착시간을 '+p.Ts+'초로 하려 한다. (a) K (b) 그때의 감쇠비 ζ (c) 최대 시각 \\(T_p\\)(초)를 구하라.'; },
    solve:function(p){
      var K=8/p.Ts, wn=Math.sqrt(K*p.z), z=K/(2*wn), Tp=Math.PI/(wn*Math.sqrt(1-z*z));
      return { ans:{K:K, zeta:z, Tp:Tp}, unit:{K:'', zeta:'', Tp:'s'}, steps:[
        '특성식 s² + Ks + '+p.z+'K → 실부 −K/2, Ts = 4/(K/2) = 8/K → K = '+SVH.fmt(K),
        'ωn = √('+p.z+'K) = '+SVH.fmt(wn)+', ζ = K/(2ωn) = '+SVH.fmt(z),
        'Tp = π/(ωn√(1−ζ²)) = '+SVH.fmt(Tp)+' s (폐루프 영점 −'+p.z+' 때문에 실제 오버슈트는 2차 공식보다 크다)' ] }; },
    hints:['정착시간은 실부만으로 정해진다. 이 계에서 실부 = −K/2.'] },
  { id:'u9-l4-06', level:4, type:'num', tags:['감쇠비 설계','ζ선 교점','근의 합'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,4,5]}, z:{choices:[0.5,0.6]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{s(s+'+p.a+')(s+'+p.b+')}\\)의 근궤적이 ζ = '+p.z+'인 선과 만나는 점(위쪽)을 구하라: (a) 실부 (b) 허부 (c) 그 점의 K (d) 그때의 세 번째 폐루프 극점.'; },
    solve:function(p){
      var phi=Math.PI-Math.acos(p.z), c=Math.cos(phi), sn=Math.sin(phi);
      var f=function(r){ var x=r*c, y=r*sn; return phi+Math.atan2(y,x+p.a)+Math.atan2(y,x+p.b)-Math.PI; };
      var lo=1e-9, hi=100;
      for(var i=0;i<200;i++){ var m=(lo+hi)/2; if(f(m)<0) lo=m; else hi=m; }
      var r=(lo+hi)/2, s={re:r*c, im:r*sn};
      var K=SVH.cmag(s)*SVH.cmag(SVH.cadd(s,SVH.cx(p.a,0)))*SVH.cmag(SVH.cadd(s,SVH.cx(p.b,0)));
      var p3=-(p.a+p.b)-2*s.re;
      return { ans:{re:s.re, im:s.im, K:K, p3:p3}, unit:{re:'', im:'', K:'', p3:''}, steps:[
        'ζ선: s = r·e^{j('+SVH.fmt(SVH.deg(phi))+'°)} 위에서 각도 조건 ∠s + ∠(s+'+p.a+') + ∠(s+'+p.b+') = 180°를 r에 대해 푼다',
        'r = '+SVH.fmt(r)+' → s = '+SVH.fmt(s.re)+' + j'+SVH.fmt(s.im),
        '크기 조건: K = |s||s+'+p.a+'||s+'+p.b+'| = '+SVH.fmt(K),
        '극점의 합 −'+(p.a+p.b)+' → p₃ = '+SVH.fmt(p3) ] }; },
    hints:['시험에서는 ζ선 위의 점 몇 개를 찍어 각도 합이 180°가 되는 곳을 찾는다 — 실험실에서 ζ선을 켜고 확인해 보라.'] },
  { id:'u9-l4-07', level:4, type:'num', tags:['근궤적 스케치','이탈점','허수축 교차'], src:'창작 문제(검산됨)',
    params:{ b:{choices:[2,3]}, c:{choices:[4,5,6]} },
    statement:function(p){ return '\\(G(s)H(s)=\\dfrac{K}{(s+1)(s+'+p.b+')(s+'+p.c+')}\\)의 (a) 점근선 중심 (b) 이탈점(−1과 −'+p.b+' 사이) (c) 이탈점의 K (d) 허수축 교차 K (e) 교차 진동수 ω를 구하라.'; },
    solve:function(p){
      var S1=1+p.b+p.c, S2=p.b+p.c+p.b*p.c, S3=p.b*p.c, sa=-S1/3, sb=(-S1+Math.sqrt(S1*S1-3*S2))/3;
      var Kb=-(sb+1)*(sb+p.b)*(sb+p.c), Km=S1*S2-S3, w=Math.sqrt(S2);
      return { ans:{sa:sa, sb:sb, Kb:Kb, Kmax:Km, w:w}, unit:{sa:'', sb:'', Kb:'', Kmax:'', w:'rad/s'}, steps:[
        'σa = −'+S1+'/3 = '+SVH.fmt(sa),
        'D\'(σ) = 3σ² + '+(2*S1)+'σ + '+S2+' = 0의 큰 근 σb = '+SVH.fmt(sb)+', Kb = −D(σb) = '+SVH.fmt(Kb),
        '특성식 s³ + '+S1+'s² + '+S2+'s + ('+S3+' + K): Routh → K = '+S1+'·'+S2+' − '+S3+' = '+Km,
        'ω = √'+S2+' = '+SVH.fmt(w) ] }; },
    hints:['극점만 있으면 이탈점 조건은 D\'(σ) = 0.'] },
  { id:'u9-l4-08', level:4, type:'derive', tags:['점근선 유도'], src:'교재 표준',
    statement:'근궤적 점근선의 중심 \\(\\sigma_a=\\dfrac{\\sum p_i-\\sum z_j}{n-m}\\)과 각 \\(\\dfrac{(2k+1)180^\\circ}{n-m}\\)을 유도하라.',
    steps:['특성방정식 \\(D(s)+KN(s)=0\\), \\(D=s^n+a_{n-1}s^{n-1}+\\cdots\\), \\(N=s^m+b_{m-1}s^{m-1}+\\cdots\\). 근과 계수의 관계로 \\(a_{n-1}=-\\sum p_i\\), \\(b_{m-1}=-\\sum z_j\\).',
           'K → ∞에서 무한대로 가는 근은 |s|가 크므로 \\(D/N=-K\\)를 큰 s로 전개: \\(D/N=s^{q}+(a_{n-1}-b_{m-1})s^{q-1}+\\cdots\\), \\(q=n-m\\).',
           '이를 \\((s-\\sigma_a)^q=s^q-q\\sigma_a s^{q-1}+\\cdots\\)와 맞추면 \\(-q\\sigma_a=a_{n-1}-b_{m-1}\\) → \\(\\sigma_a=(\\sum p_i-\\sum z_j)/q\\).',
           '\\((s-\\sigma_a)^q\\approx-K\\) → \\(s-\\sigma_a=K^{1/q}e^{j(2k+1)\\pi/q}\\): σa에서 \\((2k+1)180^\\circ/q\\) 방향의 반직선.',
           '극한 확인: K → ∞에서 q개의 근이 이 직선을 따라 무한히 멀어지고 나머지 m개는 영점으로 수렴한다. 차원: σa는 극점과 같은 단위(1/s).'],
    hints:['큰 s에서 D/N은 (s − σa)^{n−m}처럼 보인다.'] },
  ]
});
