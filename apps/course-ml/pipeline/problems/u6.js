/* U6 베이즈 기초·나이브 베이즈 — 베이즈 정리, MAP/ML, NB 표 계산, 라플라스 평활 */
SV_BANK.push({
  id: 'u6', no: 6, title: '베이즈·나이브 베이즈', titleEn: 'Bayesian Learning & Naive Bayes',
  scope: '베이즈 정리 · 사전/우도/사후 · MAP vs ML · 나이브 베이즈 표 계산 · 라플라스 평활 · 로그 확률 · 조건부 독립 가정',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u6-l1-01', level:1, type:'mc', tags:['베이즈 정리'], src:'교재 표준',
    statement:'베이즈 정리 \\(P(h|D)=\\dfrac{P(D|h)P(h)}{P(D)}\\)에서 각 항의 이름은?',
    choices:['사후=우도×사전/증거','사전=P(h|D)','우도=P(h)','증거=P(D|h)'],
    answer:0, expl:'P(h)=사전, P(D|h)=우도, P(h|D)=사후, P(D)=증거(정규화). 넷의 이름이 언어의 절반.' },
  { id:'u6-l1-02', level:1, type:'mc', tags:['MAP vs ML'], src:'교재 표준',
    statement:'MAP과 ML 가설의 관계로 옳은 것은?',
    choices:['MAP=argmax P(D|h)P(h), 사전이 균등하면 ML과 일치','ML이 항상 MAP','MAP=argmax P(D|h)','둘은 무관'],
    answer:0, expl:'ML은 우도만, MAP은 사전까지. 균등 사전 = 사전이 승부에 무영향.' },
  { id:'u6-l1-03', level:1, type:'tf', tags:['나이브 가정'], src:'교재 표준',
    statement:'나이브 베이즈는 "클래스가 주어지면 특징들이 조건부 독립"이라 가정하여 \\(P(x_1..x_n|c)=\\prod P(x_i|c)\\)로 분해한다.',
    answer:true, expl:'거짓이기 쉬운 가정인데도 분류가 잘 되는 경우가 많다 — 순위만 맞으면 되니까.' },
  { id:'u6-l1-04', level:1, type:'mc', tags:['평활'], src:'교재 표준',
    statement:'라플라스 평활 \\(P(x|c)=\\dfrac{n_{x,c}+1}{n_c+|V|}\\)이 해결하는 문제는?',
    choices:['훈련에 없던 값의 확률 0 → 곱 전체 0이 되는 붕괴','과적합 일반','계산 속도','결측치'],
    answer:0, expl:'미등장=불가능이 아니다. +1(또는 +α)로 0을 없앤다.' },
  { id:'u6-l1-05', level:1, type:'tf', tags:['로그 확률'], src:'교재 표준',
    statement:'확률 곱은 언더플로를 피해 로그 합으로 계산하며, argmax는 로그를 취해도 불변이다.',
    answer:true, expl:'0.01¹⁰⁰ 같은 수는 로그로만 안전. 단조 변환 = 순위 보존.' },
  { id:'u6-l1-06', level:1, type:'mc', tags:['생성 vs 판별'], src:'교재 표준',
    statement:'나이브 베이즈의 분류는?',
    choices:['생성 모델 — P(x|c)P(c)를 모델링해 사후 비교','판별 모델 — 경계 직접 학습','비확률적','군집'],
    answer:0, expl:'로지스틱(판별)과의 대비 축. 데이터 적을 때 생성 모델이 유리한 경향.' },

  /* ---------- L2 (12) ---------- */
  { id:'u6-l2-01', level:2, type:'num', tags:['베이즈 기본'], src:'창작 문제(검산됨)',
    params:{ prior:{choices:[10,30]}, like:{choices:[80,90]}, alt:{choices:[20,30]} },
    statement:function(p){ return 'P(h)='+p.prior+'%, P(D|h)='+p.like+'%, P(D|¬h)='+p.alt+'%. P(h|D)(%)를 구하라.'; },
    solve:function(p){
      var a=p.prior/100*p.like/100, b=(1-p.prior/100)*p.alt/100;
      return { ans:a/(a+b)*100, unit:'%', steps:[
        '분자 = '+SVH.fmt(a)+', 증거 = '+SVH.fmt(a+b),
        '사후 = '+SVH.fmt(a/(a+b)*100)+'%' ] }; },
    hints:['두 경로 합이 분모.'] },
  { id:'u6-l2-02', level:2, type:'num', tags:['사전 vs 우도'], src:'창작 문제(검산됨)',
    params:{ pr:{choices:[1,5]}, lr:{choices:[10,20]} },
    statement:function(p){ return '사전 오즈 '+p.pr+':100, 우도비 '+p.lr+'. 사후 오즈와 사후 확률(%)을 구하라.'; },
    solve:function(p){
      var odds=p.pr/100*p.lr;
      return { ans:{odds:odds, prob:odds/(1+odds)*100}, unit:{odds:'', prob:'%'}, steps:[
        '사후 오즈 = 사전 오즈×LR = '+SVH.fmt(odds),
        '확률 = odds/(1+odds) = '+SVH.fmt(odds/(1+odds)*100)+'% (오즈 곱셈이 베이즈의 지름길)' ] }; },
    hints:['오즈로 곱하기.'] },
  { id:'u6-l2-03', level:2, type:'num', tags:['NB 사전'], src:'창작 문제(검산됨)',
    params:{ s:{choices:[[9,5],[10,4]]} },
    statement:function(p){ var s=p.s; return '훈련: 클래스+ '+s[0]+'개, − '+s[1]+'개. 사전 P(+)·P(−)(%)를 구하라.'; },
    solve:function(p){ var s=p.s, t=s[0]+s[1];
      return { ans:{pp:s[0]/t*100, pn:s[1]/t*100}, unit:{pp:'%', pn:'%'}, steps:[
        'P(+) = '+s[0]+'/'+t+' = '+SVH.fmt(s[0]/t*100)+'%',
        'P(−) = '+SVH.fmt(s[1]/t*100)+'%' ] }; },
    hints:['빈도.'] },
  { id:'u6-l2-04', level:2, type:'num', tags:['조건부 표'], src:'창작 문제(검산됨)',
    params:{ nx:{choices:[3,6]}, nc:{choices:[9,10]} },
    statement:function(p){ return '클래스 + 샘플 '+p.nc+'개 중 특징 x=1이 '+p.nx+'개. (a) P(x=1|+) (b) 라플라스(+1, |V|=2) 버전을 구하라.'; },
    solve:function(p){
      return { ans:{ml:p.nx/p.nc, lap:(p.nx+1)/(p.nc+2)}, unit:{ml:'', lap:''}, steps:[
        'ML: '+p.nx+'/'+p.nc+' = '+SVH.fmt(p.nx/p.nc),
        '라플라스: ('+p.nx+'+1)/('+p.nc+'+2) = '+SVH.fmt((p.nx+1)/(p.nc+2)) ] }; },
    hints:['+1, +|V|.'] },
  { id:'u6-l2-05', level:2, type:'num', tags:['0 확률 붕괴'], src:'창작 문제(검산됨)',
    params:{ n:{choices:[5,8]} },
    statement:function(p){ return '특징 '+p.n+'개 NB에서 한 특징의 P(xᵢ|c)=0이면 그 클래스 점수는? 라플라스 없이 이 클래스가 이길 수 있는가(0)?'; },
    solve:function(p){ return { ans:{score:0, win:0}, unit:{score:'', win:''}, steps:[
        '곱에 0 하나 → 전체 0',
        '절대 못 이김(0) — 한 번도 못 본 단어가 클래스를 사형시킨다(평활의 이유)' ] }; },
    hints:['곱의 성질.'] },
  { id:'u6-l2-06', level:2, type:'num', tags:['로그 변환'], src:'창작 문제(검산됨)',
    params:{ p1:{choices:[0.01,0.1]}, n:{choices:[50,100]} },
    statement:function(p){ return '확률 '+p.p1+'을 '+p.n+'번 곱한 값의 log₁₀와, 이 수를 부동소수(최소 ~10⁻³⁰⁸)로 직접 계산 가능한가(0/1)를 답하라.'; },
    solve:function(p){
      var lg=p.n*Math.log10(p.p1);
      return { ans:{lg:lg, ok:lg>-308?1:0}, unit:{lg:'', ok:''}, steps:[
        'log₁₀ = '+p.n+'×'+SVH.fmt(Math.log10(p.p1))+' = '+SVH.fmt(lg),
        (lg>-308?'가능(1)이지만 위험':'언더플로(0)')+' — 로그 합이 정석인 이유' ] }; },
    hints:['n·log p.'] },
  { id:'u6-l2-07', level:2, type:'num', tags:['2특징 NB'], src:'교재 표준',
    params:{ t:{choices:[[0.6,0.7,0.3,0.2],[0.5,0.8,0.4,0.3]]} },
    statement:function(p){ var t=p.t; return 'P(+)=0.5. P(x₁=1|+)='+t[0]+', P(x₂=1|+)='+t[1]+', P(x₁=1|−)='+t[2]+', P(x₂=1|−)='+t[3]+'. 입력 (1,1)의 판정(+=1/−=0)과 사후 P(+|x)(%)를 구하라.'; },
    solve:function(p){
      var t=p.t;
      var sp=0.5*t[0]*t[1], sn=0.5*t[2]*t[3];
      return { ans:{pick:sp>=sn?1:0, post:sp/(sp+sn)*100}, unit:{pick:'', post:'%'}, steps:[
        '점수: + '+SVH.fmt(sp)+' vs − '+SVH.fmt(sn),
        '판정 '+(sp>=sn?'+(1)':'−(0)')+', 사후 '+SVH.fmt(sp/(sp+sn)*100)+'%' ] }; },
    hints:['곱 두 개 비교.'] },
  { id:'u6-l2-08', level:2, type:'num', tags:['검사 재검'], src:'교재 표준',
    params:{ prev:{choices:[1,10]}, sens:{choices:[90,95]}, spec:{choices:[90,95]} },
    statement:function(p){ return '유병률 '+p.prev+'%, 민감도 '+p.sens+'%·특이도 '+p.spec+'% 검사에서 양성 2회 연속(독립 가정)일 때 사후(%)를 구하라.'; },
    solve:function(p){
      var pv=p.prev/100, se=p.sens/100, fp=1-p.spec/100;
      var a=pv*se*se, b=(1-pv)*fp*fp;
      return { ans:a/(a+b)*100, unit:'%', steps:[
        '우도비 제곱: LR² = ('+SVH.fmt(se/fp)+')²',
        '사후 = '+SVH.fmt(a/(a+b)*100)+'% (반복 검사의 힘 — NB의 곱 구조 그대로)' ] }; },
    hints:['우도 제곱.'] },
  { id:'u6-l2-09', level:2, type:'num', tags:['가우시안 NB 한 항'], src:'교재 표준',
    params:{ mu:{choices:[170,175]}, sd:{choices:[5,10]}, x:{choices:[180]} },
    statement:function(p){ return '가우시안 NB: 클래스 내 µ='+p.mu+', σ='+p.sd+'에서 x='+p.x+'의 밀도 \\(\\frac{1}{\\sqrt{2\\pi}\\sigma}e^{-(x-\\mu)^2/2\\sigma^2}\\)를 구하라.'; },
    solve:function(p){
      var d=1/(Math.sqrt(2*Math.PI)*p.sd)*Math.exp(-Math.pow(p.x-p.mu,2)/(2*p.sd*p.sd));
      return { ans:d, unit:'', steps:[
        'z = ('+p.x+'−'+p.mu+')/'+p.sd+' = '+SVH.fmt((p.x-p.mu)/p.sd),
        '밀도 = '+SVH.fmt(d)+' (연속 특징은 밀도로 — 확률 아님 주의)' ] }; },
    hints:['정규 밀도 대입.'] },
  { id:'u6-l2-10', level:2, type:'num', tags:['파라미터 수'], src:'교재 표준',
    params:{ n:{choices:[10,20]}, C:{choices:[2,4]} },
    statement:function(p){ return '이진 특징 '+p.n+'개·클래스 '+p.C+'개: (a) NB 파라미터 수(클래스별 특징확률+사전) (b) 완전 결합분포 파라미터 수를 구하라.'; },
    solve:function(p){
      var nb=p.C*p.n+(p.C-1);
      var full=p.C*(Math.pow(2,p.n)-1)+(p.C-1);
      return { ans:{nb:nb, full:full}, unit:{nb:'개', full:'개'}, steps:[
        'NB = C·n+(C−1) = '+nb,
        '완전 = C(2ⁿ−1)+(C−1) = '+SVH.fmt(full)+' — 독립 가정의 절약이 곧 학습 가능성' ] }; },
    hints:['선형 vs 지수.'] },
  { id:'u6-l2-11', level:2, type:'num', tags:['오즈-로그오즈'], src:'창작 문제(검산됨)',
    params:{ pr:{choices:[75,90]} },
    statement:function(p){ return '사후 확률 '+p.pr+'%의 (a) 오즈 (b) 로그오즈(자연로그)를 구하라.'; },
    solve:function(p){ var o=p.pr/(100-p.pr);
      return { ans:{odds:o, logit:Math.log(o)}, unit:{odds:'', logit:''}, steps:[
        '오즈 = '+SVH.fmt(o)+', logit = '+SVH.fmt(Math.log(o)),
        '(NB의 로그오즈는 특징별 기여의 "합" — 선형 모델과의 연결)' ] }; },
    hints:['p/(1−p).'] },
  { id:'u6-l2-12', level:2, type:'num', tags:['사전의 힘'], src:'창작 문제(검산됨)',
    params:{ like:{choices:[3,5]} },
    statement:function(p){ return '우도비 '+p.like+'(h 우세)여도 사전이 1:99면 사후 오즈와 h의 사후 확률(%)은?'; },
    solve:function(p){ var o=p.like/99;
      return { ans:{odds:o, prob:o/(1+o)*100}, unit:{odds:'', prob:'%'}, steps:[
        '오즈 = '+p.like+'/99 = '+SVH.fmt(o),
        '확률 '+SVH.fmt(o/(1+o)*100)+'% — 증거가 사전을 못 이기는 구간(기저율)' ] }; },
    hints:['오즈 곱.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u6-l3-01', level:3, type:'num', tags:['NB 풀테이블'], src:'기출 유형',
    params:{ v:{choices:[1,2]} },
    statement:function(p){ return '스팸 필터: P(스팸)=0.4. 스팸에서 P(무료)=0.6, P(링크)=0.5. 정상에서 P(무료)=0.1, P(링크)=0.2. "무료+링크" 메일의 (a) 스팸 점수 (b) 정상 점수 (c) 사후 P(스팸)(%)을 구하라.'; },
    solve:function(p){
      var s=0.4*0.6*0.5, h=0.6*0.1*0.2;
      return { ans:{s:s, h:h, post:s/(s+h)*100}, unit:{s:'', h:'', post:'%'}, steps:[
        '스팸: 0.4×0.6×0.5 = '+SVH.fmt(s),
        '정상: 0.6×0.1×0.2 = '+SVH.fmt(h),
        '사후 = '+SVH.fmt(s/(s+h)*100)+'% — NB 표 계산의 원형' ] }; },
    hints:['사전×우도들.'] },
  { id:'u6-l3-02', level:3, type:'num', tags:['미등장 단어+평활'], src:'기출 유형',
    params:{ nc:{choices:[8,10]}, V:{choices:[4,6]} },
    statement:function(p){ return '스팸 '+p.nc+'통에서 한 번도 안 나온 단어 w: (a) ML 추정 P(w|스팸) (b) 라플라스(|V|='+p.V+') 추정을 구하라.'; },
    solve:function(p){
      return { ans:{ml:0, lap:1/(p.nc+p.V)}, unit:{ml:'', lap:''}, steps:[
        'ML = 0/'+p.nc+' = 0 (붕괴 위험)',
        '라플라스 = 1/('+p.nc+'+'+p.V+') = '+SVH.fmt(1/(p.nc+p.V)) ] }; },
    hints:['분자 0+1.'] },
  { id:'u6-l3-03', level:3, type:'num', tags:['로그 합 판정'], src:'기출 유형',
    params:{ t:{choices:[[-1,-2,-3,-0.5,-3,-2.5],[-0.7,-1.5,-2,-1,-2.2,-1.8]]} },
    statement:function(p){ var t=p.t; return '로그(ln) 점수 — 클래스A: 사전 '+t[0]+', 특징 '+t[1]+'·'+t[2]+' / 클래스B: '+t[3]+', '+t[4]+'·'+t[5]+'. 합산해 판정(A=1/B=2)하고 점수차를 구하라.'; },
    solve:function(p){ var t=p.t;
      var a=t[0]+t[1]+t[2], b=t[3]+t[4]+t[5];
      return { ans:{A:a, B:b, pick:a>=b?1:2}, unit:{A:'', B:'', pick:''}, steps:[
        'A = '+SVH.fmt(a)+', B = '+SVH.fmt(b),
        '판정 '+(a>=b?'A(1)':'B(2)')+', 차 '+SVH.fmt(Math.abs(a-b))+' (곱→합의 실전)' ] }; },
    hints:['그냥 더한다.'] },
  { id:'u6-l3-04', level:3, type:'num', tags:['우도비 문턱'], src:'기출 유형',
    params:{ prior:{choices:[5,20]} },
    statement:function(p){ return '사전 P(+)='+p.prior+'%. 판정이 +가 되기 위한 최소 우도비 LR = P(x|+)/P(x|−)를 구하라. (0.5 문턱)'; },
    solve:function(p){
      var lr=(100-p.prior)/p.prior;
      return { ans:lr, unit:'', steps:[
        '조건: 사전오즈×LR ≥ 1 → LR ≥ '+SVH.fmt(lr),
        '(희귀 클래스일수록 증거가 세야 한다 — 정량화)' ] }; },
    hints:['오즈 역수.'] },
  { id:'u6-l3-05', level:3, type:'num', tags:['MAP vs ML 갈림'], src:'교재 표준',
    params:{ l1:{choices:[0.8,0.9]}, l2:{choices:[0.6,0.7]}, p1:{choices:[20,30]} },
    statement:function(p){ return '가설 h₁: 우도 '+p.l1+'·사전 '+p.p1+'%. h₂: 우도 '+p.l2+'·사전 '+(100-p.p1)+'%. (a) ML 선택(h₁=1) (b) MAP 선택을 구하라.'; },
    solve:function(p){
      var m1=p.l1*p.p1, m2=p.l2*(100-p.p1);
      return { ans:{ML:1, MAP:m1>=m2?1:2}, unit:{ML:'', MAP:''}, steps:[
        'ML: 우도만 → h₁(1)',
        'MAP: '+SVH.fmt(m1)+' vs '+SVH.fmt(m2)+' → h'+(m1>=m2?'₁(1)':'₂(2)'),
        '(사전이 판정을 뒤집는 순간)' ] }; },
    hints:['곱해서 비교.'] },
  { id:'u6-l3-06', level:3, type:'num', tags:['가우시안 NB 판정'], src:'기출 유형',
    params:{ m1:{choices:[170]}, m2:{choices:[160]}, sd:{choices:[5,8]}, x:{choices:[166,168]} },
    statement:function(p){ return '키 특징: 남 µ='+p.m1+'·여 µ='+p.m2+'(σ 공통 '+p.sd+', 사전 반반). x='+p.x+'의 판정(남=1/여=2)과 결정 경계를 구하라.'; },
    solve:function(p){
      var mid=(p.m1+p.m2)/2;
      return { ans:{pick:p.x>=mid?1:2, bd:mid}, unit:{pick:'', bd:''}, steps:[
        '등분산·등사전 → 경계 = 평균의 중점 '+mid,
        'x='+p.x+' '+(p.x>=mid?'≥':'<')+' '+mid+' → '+(p.x>=mid?'남(1)':'여(2)'),
        '(가우시안 NB = 가까운 평균 분류의 확률적 정체)' ] }; },
    hints:['중점 경계.'] },
  { id:'u6-l3-07', level:3, type:'num', tags:['다클래스 NB'], src:'기출 유형',
    params:{ t:{choices:[[0.5,0.4,0.3,0.3,0.5,0.2,0.2,0.6,0.9],[0.4,0.5,0.2,0.4,0.4,0.3,0.2,0.7,0.8]]} },
    statement:function(p){ var t=p.t; return '3클래스(사전 '+t[0]+'/'+t[1]+'/'+(1-t[0]-t[1]).toFixed(1)+'), 특징 우도 A:'+t[2]+'·'+t[3]+', B:'+t[4]+'·'+t[5]+', C:'+t[6]+'·'+t[7]+'. 점수 셋을 구해 승자를 정하라(A=1/B=2/C=3).'; },
    solve:function(p){ var t=p.t;
      var pc=1-t[0]-t[1];
      var a=t[0]*t[2]*t[3], b=t[1]*t[4]*t[5], c=pc*t[6]*t[7];
      var m=Math.max(a,b,c);
      return { ans:{a:a, b:b, c:c, pick:a===m?1:(b===m?2:3)}, unit:{a:'',b:'',c:'',pick:''}, steps:[
        '점수: A '+SVH.fmt(a)+' · B '+SVH.fmt(b)+' · C '+SVH.fmt(c),
        '승자 = '+(a===m?'A':(b===m?'B':'C')) ] }; },
    hints:['셋 다 곱.'] },
  { id:'u6-l3-08', level:3, type:'num', tags:['독립 가정 위반'], src:'교재 표준',
    params:{ dup:{choices:[2,3]} },
    statement:function(p){ return '완전 중복 특징(같은 값 복사) '+p.dup+'개를 NB에 넣으면 그 특징의 로그우도 기여가 몇 배로 과대계상되는가? 판정 확신에는 어떤 영향(과신=1)?'; },
    solve:function(p){ return { ans:{times:p.dup, eff:1}, unit:{times:'배', eff:''}, steps:[
        '같은 항이 '+p.dup+'번 곱해짐 = '+p.dup+'배 과대',
        '사후가 극단으로 쏠림 — 과신(1). 순위는 유지될 수 있으나 확률은 못 믿는다',
        '(NB 확률 보정(calibration)이 필요한 이유)' ] }; },
    hints:['곱의 중복.'] },
  { id:'u6-l3-09', level:3, type:'num', tags:['순차 갱신'], src:'교재 표준',
    params:{ prior:{choices:[50]}, lr:{choices:[2,3]}, n:{choices:[3,4]} },
    statement:function(p){ return '사전 50%에서 우도비 '+p.lr+'짜리 독립 증거를 '+p.n+'개 받으면 사후(%)는?'; },
    solve:function(p){
      var o=Math.pow(p.lr,p.n);
      return { ans:o/(1+o)*100, unit:'%', steps:[
        '오즈 = 1×'+p.lr+'^'+p.n+' = '+SVH.fmt(o),
        '사후 = '+SVH.fmt(o/(1+o)*100)+'% (증거는 오즈에 "곱"으로 쌓인다)' ] }; },
    hints:['LR^n.'] },
  { id:'u6-l3-10', level:3, type:'num', tags:['평활 강도 α'], src:'교재 표준',
    params:{ nx:{choices:[0,2]}, nc:{choices:[10]}, al:{choices:[1,10]} },
    statement:function(p){ return 'n_x='+p.nx+', n_c='+p.nc+', |V|=2에서 α='+p.al+' 평활 추정 (n_x+α)/(n_c+α|V|)을 구하고 α→∞ 극한을 답하라.'; },
    solve:function(p){
      var e=(p.nx+p.al)/(p.nc+p.al*2);
      return { ans:{est:e, lim:0.5}, unit:{est:'', lim:''}, steps:[
        '추정 = '+SVH.fmt(e),
        'α→∞ ⇒ 1/|V| = 0.5 (데이터 무시, 균등으로) — α는 사전의 세기' ] }; },
    hints:['극한 확인.'] },
  { id:'u6-l3-11', level:3, type:'num', tags:['결정 경계 로그오즈'], src:'교재 표준',
    params:{ w:{choices:[[1.2,-0.8],[0.9,-1.1]]} },
    statement:function(p){ var w=p.w; return 'NB의 로그오즈가 log-odds = 0.5 + '+w[0]+'x₁ + '+w[1]+'x₂ 형태로 정리됐다. 입력 (1,1)의 (a) 로그오즈 (b) 판정(+=1) (c) 사후(%)를 구하라.'; },
    solve:function(p){ var w=p.w;
      var lo=0.5+w[0]+w[1];
      var pr=1/(1+Math.exp(-lo))*100;
      return { ans:{lo:lo, pick:lo>=0?1:0, post:pr}, unit:{lo:'', pick:'', post:'%'}, steps:[
        '로그오즈 = '+SVH.fmt(lo)+' → '+(lo>=0?'+(1)':'−(0)'),
        '사후 = σ(로그오즈) = '+SVH.fmt(pr)+'% (NB=선형 판별의 한 형태)' ] }; },
    hints:['시그모이드.'] },
  { id:'u6-l3-12', level:3, type:'num', tags:['문서 NB(빈도)'], src:'기출 유형',
    params:{ f:{choices:[[3,1],[2,2]]} },
    statement:function(p){ var f=p.f; return '다항 NB: 단어 w가 문서에 '+f[0]+'회. log P(w|스팸)=−1, log P(w|정상)=−2 (ln). 이 단어가 주는 로그점수 차(스팸−정상)를 구하라.'; },
    solve:function(p){ var f=p.f;
      return { ans:f[0]*1, unit:'', steps:[
        '빈도×로그우도차 = '+f[0]+'×(−1−(−2)) = '+f[0],
        '(다항 NB: 반복 등장은 그만큼 곱해진다 — 베르누이 NB와의 차이)' ] }; },
    hints:['횟수 가중.'] },
  { id:'u6-l3-13', level:3, type:'num', tags:['혼동행렬→우도'], src:'기출 유형',
    params:{ sens:{choices:[80,90]}, spec:{choices:[70,95]} },
    statement:function(p){ return '검사기의 민감도 '+p.sens+'%·특이도 '+p.spec+'%를 NB 우도로 번역: (a) LR+ = sens/(1−spec) (b) LR− = (1−sens)/spec을 구하라.'; },
    solve:function(p){
      return { ans:{LRp:p.sens/(100-p.spec), LRn:(100-p.sens)/p.spec}, unit:{LRp:'', LRn:''}, steps:[
        'LR+ = '+SVH.fmt(p.sens/(100-p.spec))+' (양성 결과의 증거력)',
        'LR− = '+SVH.fmt((100-p.sens)/p.spec)+' (음성 결과의 증거력)',
        '(U3 지표 ↔ U6 베이즈의 사전 연결)' ] }; },
    hints:['정의 대입.'] },
  { id:'u6-l3-14', level:3, type:'num', tags:['공동 스팸 판정'], src:'기출 유형',
    params:{ v:{choices:[1,2]} },
    statement:function(p){ return '단어 3개 등장, 로그우도차(스팸−정상) [+1.5, −0.5, +0.8], 사전 로그오즈 −1 (스팸이 적음). (a) 총 로그오즈 (b) 판정(스팸=1) (c) 없던 사전(0)이면 판정이 달라지는가(동일=0/달라짐=1)?'; },
    solve:function(p){
      var lo=-1+1.5-0.5+0.8;
      var lo0=1.5-0.5+0.8;
      return { ans:{lo:lo, pick:lo>=0?1:0, change:(lo>=0)===(lo0>=0)?0:1}, unit:{lo:'', pick:'', change:''}, steps:[
        '합 = −1+1.5−0.5+0.8 = '+SVH.fmt(lo)+' → '+(lo>=0?'스팸(1)':'정상(0)'),
        '사전 제거 시 '+SVH.fmt(lo0)+' → '+((lo>=0)===(lo0>=0)?'판정 동일(0)':'판정 역전(1)'),
        '(사전 한 항이 저울 전체를 기울일 수 있다)' ] }; },
    hints:['합산 두 번.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u6-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 균등 사전에서 MAP=ML<br>㉡ 라플라스 평활은 "가짜 관측"을 더한 MAP 추정으로 해석된다<br>㉢ NB의 조건부 독립이 깨져도 순위(argmax)는 맞을 수 있다<br>㉣ 로그 변환은 argmax를 보존한다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — ㉡(디리클레 사전)은 심화지만 해석은 그대로 시험감.' },
  { id:'u6-l4-02', level:4, type:'num', tags:['NB 풀문제(평활 포함)'], src:'기출 유형',
    params:{ v:{choices:[1,2]} },
    statement:function(p){ return '훈련: 스팸 3통(무료 2, 링크 3), 정상 5통(무료 1, 링크 1). |V|=2, 라플라스 +1(문서 기준 베르누이). 새 메일 "무료=1, 링크=1": (a) P(무료|스팸)·P(링크|스팸) (b) 스팸·정상 점수 (c) 판정을 구하라.'; },
    solve:function(p){
      var pfs=(2+1)/(3+2), pls=(3+1)/(3+2);
      var pfh=(1+1)/(5+2), plh=(1+1)/(5+2);
      var ps=3/8*pfs*pls, ph=5/8*pfh*plh;
      return { ans:{pfs:pfs, s:ps, h:ph, pick:ps>=ph?1:0}, unit:{pfs:'', s:'', h:'', pick:''}, steps:[
        '스팸: P(무료)=(2+1)/(3+2)='+SVH.fmt(pfs)+', P(링크)='+SVH.fmt(pls),
        '점수: 스팸 '+SVH.fmt(ps)+' vs 정상 '+SVH.fmt(ph),
        '판정 '+(ps>=ph?'스팸(1)':'정상(0)')+' — 표→평활→곱→비교 완주' ] }; },
    hints:['(개수+1)/(문서+2).'] },
  { id:'u6-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'베이즈 정리를 결합확률 두 표현에서 유도하고, "증거 P(D)는 argmax에 불필요"함을 보여라.',
    steps:[
      '결합: \\(P(h,D)=P(D|h)P(h)=P(h|D)P(D)\\) [왜] 곱 규칙의 두 순서',
      '나누기: \\(P(h|D)=P(D|h)P(h)/P(D)\\)',
      'P(D)=Σ_h P(D|h)P(h) — 모든 가설 공통 상수',
      '따라서 argmax_h는 분자만 비교 — NB가 정규화 없이 점수 비교로 끝나는 이유',
      '극한 체크: 사전 균등 ⇒ 우도 비교(ML) ✓ · 확률 자체가 필요하면 그때만 정규화'
    ],
    hints:['곱 규칙 대칭.'],
    expl:'모든 베이즈 계산 문제의 헌법 유도.' },
  { id:'u6-l4-04', level:4, type:'num', tags:['3중 검사 시나리오'], src:'기출 유형',
    params:{ prev:{choices:[0.1,1]}, lr:{choices:[10,20]} },
    statement:function(p){ return '유병률 '+p.prev+'%에서 LR+='+p.lr+'인 독립 검사를 연속 양성으로 몇 번 받아야 사후가 50%를 넘는가?'; },
    solve:function(p){
      var o0=p.prev/(100-p.prev);
      var n=Math.ceil(Math.log(1/o0)/Math.log(p.lr));
      return { ans:n, unit:'회', steps:[
        '조건: o₀·LRⁿ ≥ 1 → n ≥ ln(1/o₀)/ln(LR)',
        '= '+n+'회 (희귀병 확진에 검사를 겹치는 수학)' ] }; },
    hints:['로그로 풀기.'] },
  { id:'u6-l4-05', level:4, type:'num', tags:['NB vs 결정트리 선택'], src:'기출 유형',
    params:{ N:{choices:[50,100]}, d:{choices:[1000,5000]} },
    statement:function(p){ return '문서 분류: N='+p.N+', 특징(단어) '+p.d+'개. (a) NB 파라미터 수(2클래스) (b) 샘플/파라미터 비 (c) 이 조건에서 NB가 트리보다 유리한 이유(파라미터당 데이터 공유=1)를 답하라.'; },
    solve:function(p){
      var np=2*p.d+1;
      return { ans:{np:np, ratio:p.N/np, why:1}, unit:{np:'개', ratio:'', why:''}, steps:[
        '파라미터 '+np+'개, 비율 '+SVH.fmt(p.N/np),
        '각 파라미터가 "한 특징 통계"라 적은 데이터로도 안정(1) — 고차원·소표본의 표준 선택',
        '(생성 모델의 데이터 효율 논거)' ] }; },
    hints:['카운트 통계의 안정성.'] },
  { id:'u6-l4-06', level:4, type:'num', tags:['오분류 비용 결합'], src:'기출 유형',
    params:{ post:{choices:[20,40]}, cFN:{choices:[10,5]} },
    statement:function(p){ return 'NB 사후 P(+|x)='+p.post+'%. FN 비용 '+p.cFN+'·FP 비용 1일 때 (a) 비용 문턱(%) (b) 판정(+=1)을 구하라.'; },
    solve:function(p){
      var th=1/(1+p.cFN)*100;
      return { ans:{th:th, pick:p.post>=th?1:0}, unit:{th:'%', pick:''}, steps:[
        '문턱 = c_FP/(c_FP+c_FN) = '+SVH.fmt(th)+'%',
        p.post+'% '+(p.post>=th?'≥':'<')+' 문턱 → '+(p.post>=th?'+(1)':'−(0)'),
        '(U1·U3·U6 세 단원의 문턱 공식이 하나로 만난다)' ] }; },
    hints:['사후 vs 비용 문턱.'] },
  { id:'u6-l4-07', level:4, type:'num', tags:['보정 진단'], src:'기출 유형',
    params:{ conf:{choices:[90,99]}, acc:{choices:[70,80]} },
    statement:function(p){ return 'NB가 "확신 '+p.conf+'%"라 한 사례들의 실제 정확도가 '+p.acc+'%다. (a) 보정 오차(%p) (b) 원인 후보(독립 가정 위반=1) (c) 순위 기반 결정(argmax)은 여전히 쓸 만한가(1)?'; },
    solve:function(p){ return { ans:{gap:p.conf-p.acc, cause:1, ok:1}, unit:{gap:'%p', cause:'', ok:''}, steps:[
        '과신 '+(p.conf-p.acc)+'%p',
        '중복 정보의 이중 곱(1) — l3-08의 실측판',
        '순위는 대체로 유지(1): "분류는 되지만 확률은 보정하라"' ] }; },
    hints:['확신 vs 실측.'] },
  { id:'u6-l4-08', level:4, type:'num', tags:['중간 종합 리허설'], src:'기출 유형',
    params:{ v:{choices:[1,2]} },
    statement:function(p){ return '리허설: 사전 P(+)=0.25. 특징 우도 P(x₁=1|+)=0.8/P(x₁=1|−)=0.2, P(x₂=0|+)=0.3/P(x₂=0|−)=0.6. 입력 (x₁=1, x₂=0): (a) 두 점수 (b) 사후 P(+)(%) (c) 0.5 문턱 판정을 구하라.'; },
    solve:function(p){
      var sp=0.25*0.8*0.3, sn=0.75*0.2*0.6;
      return { ans:{sp:sp, sn:sn, post:sp/(sp+sn)*100, pick:sp>=sn?1:0}, unit:{sp:'',sn:'',post:'%',pick:''}, steps:[
        '+: 0.25×0.8×0.3 = '+SVH.fmt(sp)+' / −: 0.75×0.2×0.6 = '+SVH.fmt(sn),
        '사후 = '+SVH.fmt(sp/(sp+sn)*100)+'%',
        '판정 '+(sp>=sn?'+(1)':'−(0)')+' (x₂=0 조건의 우도를 쓰는 것이 함정 포인트)' ] }; },
    hints:['관측값에 맞는 우도 행.'] }
  ]
});
