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
  ]
});
