/* U2 회귀·선형모델 — 최소제곱, 잔차, R², 경사하강, 규제 맛보기 */
SV_BANK.push({
  id: 'u2', no: 2, title: '회귀·선형모델', titleEn: 'Regression & Linear Models',
  scope: '단순 선형회귀(최소제곱 폐형식) · 잔차와 MSE · R² · 경사하강(학습률) · 다항 특징 · 규제(릿지) 직관',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u2-l1-01', level:1, type:'mc', tags:['목적함수'], src:'교재 표준',
    statement:'최소제곱 회귀가 최소화하는 것은?',
    choices:['잔차 제곱합 \\(\\sum(y_i-\\hat y_i)^2\\)','잔차 절댓값 합','잔차 합','최대 잔차'],
    answer:0, expl:'제곱합 = 미분 가능·폐형식 존재·가우스 노이즈 MLE. 절댓값(L1)은 이상치에 강건한 대안.' },
  { id:'u2-l1-02', level:1, type:'tf', tags:['폐형식'], src:'교재 표준',
    statement:'단순 선형회귀 \\(\\hat y=wx+b\\)의 최적해는 \\(w=S_{xy}/S_{xx}\\), \\(b=\\bar y-w\\bar x\\)로 닫힌 형태다.',
    answer:true, expl:'S_xy=Σ(x−x̄)(y−ȳ), S_xx=Σ(x−x̄)². 회귀선은 항상 (x̄, ȳ)를 지난다.' },
  { id:'u2-l1-03', level:1, type:'mc', tags:['R²'], src:'교재 표준',
    statement:'결정계수 R²의 해석으로 옳은 것은?',
    choices:['모델이 설명하는 분산 비율 1−SSE/SST','상관계수 그 자체','기울기 크기','항상 0~1은 아니어도 훈련 최소제곱에선 0~1'],
    answer:0, expl:'R²=1−SSE/SST. 단순회귀에선 상관계수의 제곱과 일치. (보기 ④도 사실이지만 "해석"은 ①)' },
  { id:'u2-l1-04', level:1, type:'mc', tags:['경사하강'], src:'교재 표준',
    statement:'경사하강 \\(w\\leftarrow w-\\eta\\nabla J\\)에서 학습률 η가 너무 크면?',
    choices:['발산(진동 증폭)할 수 있다','항상 더 빨리 수렴','전역 최소 보장','아무 영향 없다'],
    answer:0, expl:'2차 손실에선 η>2/λ_max에서 발산. 너무 작으면 느림 — η는 첫 번째 하이퍼파라미터.' },
  { id:'u2-l1-05', level:1, type:'tf', tags:['볼록성'], src:'교재 표준',
    statement:'선형회귀의 제곱 손실은 볼록해서 경사하강이 (적절한 η로) 전역 최소에 수렴한다.',
    answer:true, expl:'그릇 모양 하나 — 국소 최소 걱정 없음. 신경망(비볼록)과의 대비 포인트.' },
  { id:'u2-l1-06', level:1, type:'mc', tags:['다항 회귀'], src:'교재 표준',
    statement:'다항 회귀 \\(y=w_0+w_1x+w_2x^2\\)는?',
    choices:['특징을 (x, x²)로 늘린 "선형" 모델이다(파라미터에 선형)','비선형 모델이라 폐형식 없음','볼록이 아니다','경사하강 불가'],
    answer:0, expl:'"선형"은 파라미터 기준. 특징 확장이 표현력을 만든다(XOR 교훈의 회귀판).' },

  /* ---------- L2 (12) ---------- */
  { id:'u2-l2-01', level:2, type:'num', tags:['평균·중심화'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[1,2]}, b:{choices:[3,5]} },
    statement:function(p){ return '데이터 x=[1,2,3,4], y=['+p.a+','+(p.a+p.b)+','+(p.a+2*p.b)+','+(p.a+3*p.b)+'] (완전 선형). (a) x̄·ȳ (b) 기울기 w를 구하라.'; },
    solve:function(p){
      var ybar=p.a+1.5*p.b;
      return { ans:{xbar:2.5, ybar:ybar, w:p.b}, unit:{xbar:'', ybar:'', w:''}, steps:[
        'x̄=2.5, ȳ='+SVH.fmt(ybar),
        '완전 선형 → w = 인접 차 = '+p.b+' (공식으로도 동일)' ] }; },
    hints:['등차 구조 활용.'] },
  { id:'u2-l2-02', level:2, type:'num', tags:['최소제곱 손계산'], src:'교재 표준',
    params:{ y4:{choices:[5,7,9]} },
    statement:function(p){ return 'x=[0,1,2,3], y=[1,2,4,'+p.y4+']의 최소제곱 (a) w (b) b를 구하라.'; },
    solve:function(p){
      var xs=[0,1,2,3], ys=[1,2,4,p.y4];
      var xb=1.5, yb=(1+2+4+p.y4)/4;
      var sxy=0,sxx=0;
      for(var i=0;i<4;i++){ sxy+=(xs[i]-xb)*(ys[i]-yb); sxx+=(xs[i]-xb)*(xs[i]-xb); }
      var w=sxy/sxx, b=yb-w*xb;
      return { ans:{w:w, b:b}, unit:{w:'', b:''}, steps:[
        'x̄=1.5, ȳ='+SVH.fmt(yb)+', S_xy='+SVH.fmt(sxy)+', S_xx='+SVH.fmt(sxx),
        'w = '+SVH.fmt(w)+', b = ȳ−wx̄ = '+SVH.fmt(b),
        '(4점 손계산 — 시험 단골 크기)' ] }; },
    hints:['중심화 곱합/제곱합.'] },
  { id:'u2-l2-03', level:2, type:'num', tags:['잔차·MSE'], src:'창작 문제(검산됨)',
    params:{ e1:{choices:[1,2]}, e2:{choices:[-1,-2]}, e3:{choices:[0,1]}, e4:{choices:[2,3]} },
    statement:function(p){ return '잔차가 ['+p.e1+','+p.e2+','+p.e3+','+p.e4+']일 때 (a) SSE (b) MSE (c) RMSE를 구하라.'; },
    solve:function(p){
      var sse=p.e1*p.e1+p.e2*p.e2+p.e3*p.e3+p.e4*p.e4;
      return { ans:{SSE:sse, MSE:sse/4, RMSE:Math.sqrt(sse/4)}, unit:{SSE:'', MSE:'', RMSE:''}, steps:[
        'SSE = '+sse+', MSE = '+SVH.fmt(sse/4)+', RMSE = '+SVH.fmt(Math.sqrt(sse/4)),
        '(RMSE는 y와 같은 단위 — 보고용으로 애용)' ] }; },
    hints:['제곱→평균→루트.'] },
  { id:'u2-l2-04', level:2, type:'num', tags:['R² 계산'], src:'창작 문제(검산됨)',
    params:{ SSE:{choices:[10,20]}, SST:{choices:[100,200]} },
    statement:function(p){ return 'SSE='+p.SSE+', SST='+p.SST+'일 때 R²와, "평균만 예측하는 모델"의 R²를 구하라.'; },
    solve:function(p){ var r2=1-p.SSE/p.SST;
      return { ans:{R2:r2, base:0}, unit:{R2:'', base:''}, steps:[
        'R² = 1−'+p.SSE+'/'+p.SST+' = '+SVH.fmt(r2),
        '평균 모델: SSE=SST → R²=0 (기준선의 정의)' ] }; },
    hints:['1−비율.'] },
  { id:'u2-l2-05', level:2, type:'num', tags:['경사 1스텝'], src:'창작 문제(검산됨)',
    params:{ w0:{choices:[0,1]}, eta:{choices:[0.1,0.2]} },
    statement:function(p){ return 'J(w)=(w−3)², w₀='+p.w0+', η='+p.eta+'로 경사하강 2스텝 후 w를 구하라.'; },
    solve:function(p){
      var w=p.w0;
      for(var i=0;i<2;i++) w=w-p.eta*2*(w-3);
      return { ans:w, unit:'', steps:[
        '∇J=2(w−3). 스텝마다 w←w−'+p.eta+'·2(w−3)',
        '2스텝 후 w = '+SVH.fmt(w)+' (3으로 수축 — 비율 (1−2η)² 확인)' ] }; },
    hints:['반복 대입.'] },
  { id:'u2-l2-06', level:2, type:'num', tags:['학습률 한계'], src:'교재 표준',
    params:{ a:{choices:[1,2,4]} },
    statement:function(p){ return 'J(w)='+p.a+'w²의 경사하강이 수렴하는 학습률 조건 η<1/'+p.a+'... 정확히는 |1−2ηa|<1에서 η_max를 구하라.'; },
    solve:function(p){ var em=1/p.a;
      return { ans:em, unit:'', steps:[
        'w←(1−2η'+p.a+')w → 수렴 조건 |1−2η'+p.a+'|<1',
        'η < 1/'+p.a+' = '+SVH.fmt(em)+' (곡률이 클수록 조심 — η=1/2a가 한 방 수렴)' ] }; },
    hints:['수축 인자 절댓값.'] },
  { id:'u2-l2-07', level:2, type:'num', tags:['표준화'], src:'창작 문제(검산됨)',
    params:{ mu:{choices:[50,100]}, sd:{choices:[10,20]}, x:{choices:[70,130]} },
    statement:function(p){ return '평균 '+p.mu+', 표준편차 '+p.sd+'인 특징에서 x='+p.x+'의 z-점수를 구하라. 왜 경사하강 전에 표준화하는가?'; },
    solve:function(p){ var z=(p.x-p.mu)/p.sd;
      return { ans:z, unit:'', steps:[
        'z = (x−µ)/σ = '+SVH.fmt(z),
        '스케일 차이 → 손실 등고선 길쭉 → 지그재그 — 표준화가 등고선을 둥글게(수렴 가속)' ] }; },
    hints:['(x−µ)/σ.'] },
  { id:'u2-l2-08', level:2, type:'num', tags:['예측·외삽'], src:'창작 문제(검산됨)',
    params:{ w:{choices:[2,3]}, b:{choices:[1,5]}, x:{choices:[10,20]} },
    statement:function(p){ return '학습된 ŷ='+p.w+'x+'+p.b+'로 x='+p.x+'를 예측하라. 훈련 x 범위가 [0,5]였다면 이 예측을 신뢰할 수 있는가(외삽 주의=0)?'; },
    solve:function(p){ return { ans:{y:p.w*p.x+p.b, trust:0}, unit:{y:'', trust:''}, steps:[
        'ŷ = '+(p.w*p.x+p.b),
        '범위 밖 외삽(0) — 선형 가정이 밖에서도 성립한다는 보장은 데이터에 없다' ] }; },
    hints:['대입+범위 확인.'] },
  { id:'u2-l2-09', level:2, type:'num', tags:['이상치 민감도'], src:'창작 문제(검산됨)',
    params:{ e:{choices:[10,20]} },
    statement:function(p){ return '잔차 [1,1,1,'+p.e+']에서 (a) MSE (b) MAE를 구하고, 이상치의 기여율(%)을 MSE 기준으로 구하라.'; },
    solve:function(p){
      var mse=(3+p.e*p.e)/4, mae=(3+p.e)/4;
      return { ans:{MSE:mse, MAE:mae, share:p.e*p.e/(3+p.e*p.e)*100}, unit:{MSE:'', MAE:'', share:'%'}, steps:[
        'MSE = '+SVH.fmt(mse)+', MAE = '+SVH.fmt(mae),
        '이상치 기여 = '+SVH.fmt(p.e*p.e/(3+p.e*p.e)*100)+'% — 제곱 손실이 이상치에 끌려가는 이유' ] }; },
    hints:['제곱 vs 절댓값.'] },
  { id:'u2-l2-10', level:2, type:'num', tags:['파라미터 수'], src:'창작 문제(검산됨)',
    params:{ d:{choices:[10,50]}, deg:{choices:[2,3]} },
    statement:function(p){ return '특징 '+p.d+'개 선형회귀의 파라미터 수(절편 포함)와, 단일 변수 '+p.deg+'차 다항 회귀의 파라미터 수를 구하라.'; },
    solve:function(p){ return { ans:{lin:p.d+1, poly:p.deg+1}, unit:{lin:'개', poly:'개'}, steps:[
        '선형: d+1 = '+(p.d+1),
        '다항: 차수+1 = '+(p.deg+1)+' (모델 크기 세기 습관)' ] }; },
    hints:['+1 절편.'] },
  { id:'u2-l2-11', level:2, type:'num', tags:['상관→R²'], src:'교재 표준',
    params:{ r:{choices:[0.6,0.8,0.9]} },
    statement:function(p){ return '단순회귀에서 상관계수 r='+p.r+'일 때 R²와 "설명 못 하는 분산" 비율(%)을 구하라.'; },
    solve:function(p){ var r2=p.r*p.r;
      return { ans:{R2:r2, un:(1-r2)*100}, unit:{R2:'', un:'%'}, steps:[
        'R² = r² = '+SVH.fmt(r2),
        '미설명 = '+SVH.fmt((1-r2)*100)+'% (r=0.9도 19%는 남는다)' ] }; },
    hints:['제곱.'] },
  { id:'u2-l2-12', level:2, type:'num', tags:['원점 회귀'], src:'교재 표준',
    params:{ s1:{choices:[10,20]}, s2:{choices:[4,5]} },
    statement:function(p){ return '절편 없는 모델 ŷ=wx의 최적 w=Σxy/Σx². Σxy='+p.s1+', Σx²='+p.s2+'일 때 w를 구하라.'; },
    solve:function(p){ return { ans:p.s1/p.s2, unit:'', steps:[
        'w = '+p.s1+'/'+p.s2+' = '+SVH.fmt(p.s1/p.s2),
        '(물리 법칙형(원점 통과) 회귀 — 중심화 없는 버전)' ] }; },
    hints:['한 줄 공식.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u2-l3-01', level:3, type:'num', tags:['최소제곱 유도값'], src:'교재 표준',
    params:{ y3:{choices:[5,6]} },
    statement:function(p){ return 'x=[1,2,3], y=[2,4,'+p.y3+']: (a) w·b (b) 각 예측치 (c) SSE를 구하라.'; },
    solve:function(p){
      var xb=2, yb=(6+p.y3)/3;
      var sxy=(1-2)*(2-yb)+(3-2)*(p.y3-yb);
      var w=sxy/2, b=yb-w*xb;
      var sse=0, ys=[2,4,p.y3];
      for(var i=0;i<3;i++){ var e=ys[i]-(w*(i+1)+b); sse+=e*e; }
      return { ans:{w:w, b:b, SSE:sse}, unit:{w:'',b:'',SSE:''}, steps:[
        'S_xy='+SVH.fmt(sxy)+', S_xx=2 → w='+SVH.fmt(w)+', b='+SVH.fmt(b),
        '예측 후 SSE = '+SVH.fmt(sse)+' (잔차 합=0 검산 포함)' ] }; },
    hints:['3점이면 손으로 2분.'] },
  { id:'u2-l3-02', level:3, type:'num', tags:['잔차 성질 검산'], src:'교재 표준',
    params:{ y4:{choices:[6,8]} },
    statement:function(p){ return 'x=[0,1,2,3], y=[1,3,4,'+p.y4+']의 최소제곱 적합 후 (a) 잔차 합 (b) Σxᵢeᵢ를 구해 두 직교 조건을 확인하라.'; },
    solve:function(p){ return { ans:{se:0, sxe:0}, unit:{se:'', sxe:''}, steps:[
        '정규방정식의 의미: ∂J/∂b=0 ⇒ Σe=0, ∂J/∂w=0 ⇒ Σxe=0',
        '수치로도 0 (부동소수 오차 내) — 잔차는 특징과 직교',
        '(적합이 맞았는지 검산하는 두 줄)' ] }; },
    hints:['정규방정식 자체가 답.'] },
  { id:'u2-l3-03', level:3, type:'num', tags:['경사하강 궤적'], src:'창작 문제(검산됨)',
    params:{ eta:{choices:[0.1,0.4]}, n:{choices:[3,5]} },
    statement:function(p){ return 'J=w², w₀=1, η='+p.eta+': '+p.n+'스텝 후 w와 수축비 (1−2η)^n을 구하라.'; },
    solve:function(p){
      var f=Math.pow(1-2*p.eta,p.n);
      return { ans:{w:f, factor:f}, unit:{w:'', factor:''}, steps:[
        'w_n = (1−2η)ⁿw₀ = '+SVH.fmt(f),
        '(η=0.4면 부호 진동하며 수렴 — 감쇠 진동, 제어의 ζ와 같은 그림)' ] }; },
    hints:['등비수열.'] },
  { id:'u2-l3-04', level:3, type:'num', tags:['릿지 수축'], src:'교재 표준',
    params:{ lam:{choices:[1,4]}, sxx:{choices:[4,8]} },
    statement:function(p){ return '릿지 회귀(단순, 중심화): w_ridge = S_xy/(S_xx+λ). S_xy=8, S_xx='+p.sxx+', λ='+p.lam+'일 때 w와 OLS 대비 수축률(%)을 구하라.'; },
    solve:function(p){
      var wr=8/(p.sxx+p.lam), wo=8/p.sxx;
      return { ans:{w:wr, shrink:(1-wr/wo)*100}, unit:{w:'', shrink:'%'}, steps:[
        'w_ridge = 8/'+(p.sxx+p.lam)+' = '+SVH.fmt(wr)+' (OLS '+SVH.fmt(wo)+')',
        '수축 '+SVH.fmt((1-wr/wo)*100)+'% — λ가 계수를 0쪽으로 당긴다(과적합 제동)' ] }; },
    hints:['분모에 λ.'] },
  { id:'u2-l3-05', level:3, type:'num', tags:['편향-분산 수치'], src:'교재 표준',
    params:{ bias:{choices:[2,3]}, varr:{choices:[1,4]}, noise:{choices:[1,2]} },
    statement:function(p){ return '기대 시험 MSE = 편향²+분산+잡음. 편향='+p.bias+', 분산='+p.varr+', 잡음분산='+p.noise+'일 때 (a) 총 MSE (b) 모델을 아무리 좋게 해도 못 내려가는 하한을 구하라.'; },
    solve:function(p){
      return { ans:{mse:p.bias*p.bias+p.varr+p.noise, floor:p.noise}, unit:{mse:'', floor:''}, steps:[
        'MSE = '+p.bias+'²+'+p.varr+'+'+p.noise+' = '+(p.bias*p.bias+p.varr+p.noise),
        '하한 = 잡음 '+p.noise+' (베이즈 오류 — 완벽한 모델의 한계)' ] }; },
    hints:['세 항 분해.'] },
  { id:'u2-l3-06', level:3, type:'num', tags:['차수 선택'], src:'기출 유형',
    params:{ tr1:{choices:[8,10]}, te1:{choices:[9,11]}, tr9:{choices:[0.5,1]}, te9:{choices:[15,25]} },
    statement:function(p){ return '1차: 훈련 MSE '+p.tr1+'/검증 '+p.te1+'. 9차: 훈련 '+p.tr9+'/검증 '+p.te9+'. (a) 어느 쪽이 과적합인가(9차=9) (b) 선택할 모델(1차=1) (c) 9차의 격차 배율(검증/훈련)을 구하라.'; },
    solve:function(p){
      return { ans:{over:9, pick:1, ratio:p.te9/p.tr9}, unit:{over:'차', pick:'차', ratio:'배'}, steps:[
        '9차: 훈련↓검증↑ → 과적합',
        '선택은 "검증" 기준 → 1차',
        '격차 '+SVH.fmt(p.te9/p.tr9)+'배 (훈련 오류는 거짓말한다)' ] }; },
    hints:['검증이 심판.'] },
  { id:'u2-l3-07', level:3, type:'num', tags:['가중치 해석'], src:'기출 유형',
    params:{ w:{choices:[0.5,2]}, sd:{choices:[10,20]} },
    statement:function(p){ return '표준화된 특징의 계수 w='+p.w+' (원 단위 σ='+p.sd+'). (a) 원 단위 1 증가당 ŷ 변화 (b) 두 특징(계수 0.5 vs 2, 둘 다 표준화)의 중요도 비를 구하라.'; },
    solve:function(p){
      return { ans:{per:p.w/p.sd, ratio:4}, unit:{per:'/단위', ratio:'배'}, steps:[
        '원 단위 효과 = w/σ = '+SVH.fmt(p.w/p.sd),
        '표준화 계수끼리는 직접 비교 가능: 2/0.5 = 4배',
        '(표준화가 "계수=중요도" 해석을 허락한다)' ] }; },
    hints:['σ로 되돌리기.'] },
  { id:'u2-l3-08', level:3, type:'num', tags:['배치 vs SGD'], src:'교재 표준',
    params:{ N:{choices:[10000,100000]}, B:{choices:[32,100]} },
    statement:function(p){ return 'N='+p.N+', 배치 '+p.B+'인 미니배치 SGD: (a) 1에폭당 갱신 횟수 (b) 풀배치 대비 1갱신 계산량 비율(%)을 구하라.'; },
    solve:function(p){
      return { ans:{steps:p.N/p.B, cost:p.B/p.N*100}, unit:{steps:'회', cost:'%'}, steps:[
        '갱신 = N/B = '+p.N/p.B+'회/에폭',
        '1갱신 비용 = B/N = '+SVH.fmt(p.B/p.N*100)+'% — 잡음 낀 방향을 자주 밟는 전략' ] }; },
    hints:['나누기 두 번.'] },
  { id:'u2-l3-09', level:3, type:'num', tags:['더미 변수'], src:'기출 유형',
    params:{ b:{choices:[100,150]}, w:{choices:[20,30]} },
    statement:function(p){ return '집값 = '+p.b+' + '+p.w+'·(강남 여부 0/1) + 0.5·면적. (a) 같은 면적에서 강남 프리미엄 (b) 이 인코딩에서 기준(reference) 범주는?(강남 아님=0으로 답)'; },
    solve:function(p){ return { ans:{prem:p.w, ref:0}, unit:{prem:'', ref:''}, steps:[
        '프리미엄 = 더미 계수 = '+p.w,
        '기준 = 0으로 코딩된 범주(비강남) — 계수는 "기준 대비 차이"다' ] }; },
    hints:['더미 계수 해석.'] },
  { id:'u2-l3-10', level:3, type:'num', tags:['다중공선성 감각'], src:'교재 표준',
    params:{ r:{choices:[0.95,0.99]} },
    statement:function(p){ return '두 특징의 상관 r='+p.r+'. 분산팽창계수 VIF=1/(1−r²)를 구하고, 계수 해석이 위험한 수준(VIF>10)인지(1/0) 답하라.'; },
    solve:function(p){ var vif=1/(1-p.r*p.r);
      return { ans:{VIF:vif, risky:vif>10?1:0}, unit:{VIF:'', risky:''}, steps:[
        'VIF = 1/(1−'+p.r+'²) = '+SVH.fmt(vif),
        (vif>10?'위험(1)':'허용(0)')+' — 예측은 되어도 "어느 특징 덕"인지는 흔들린다' ] }; },
    hints:['1/(1−r²).'] },
  { id:'u2-l3-11', level:3, type:'num', tags:['로그 변환'], src:'기출 유형',
    params:{ w:{choices:[0.05,0.1]} },
    statement:function(p){ return 'ln(y) = b + '+p.w+'·x 모델에서 x가 1 증가하면 y는 약 몇 % 증가하는가(정확값 (e^w−1)×100)?'; },
    solve:function(p){ var pct=(Math.exp(p.w)-1)*100;
      return { ans:pct, unit:'%', steps:[
        '정확: (e^'+p.w+'−1)×100 = '+SVH.fmt(pct)+'%',
        '(작은 w에선 ≈100w% — 로그 모델의 계수는 "퍼센트 효과")' ] }; },
    hints:['지수 되돌리기.'] },
  { id:'u2-l3-12', level:3, type:'num', tags:['학습곡선 진단'], src:'기출 유형',
    params:{ trBig:{choices:[5,8]}, teBig:{choices:[6,9]}, gap:{choices:[1,2]} },
    statement:function(p){ return '데이터를 늘려도 훈련·검증 오류가 '+p.trBig+'·'+p.teBig+'% 근처로 수렴해 붙었다(격차 ≈'+p.gap+'%p). 처방은? (더 많은 데이터=1/더 큰 모델·특징=2) 그리고 현재 병목 오류(%)를 답하라.'; },
    solve:function(p){ return { ans:{rx:2, bott:p.trBig}, unit:{rx:'', bott:'%'}, steps:[
        '수렴+격차 작음 = 편향(과소적합) 지배 → 표현력 확대(2)',
        '병목 = 훈련 오류 '+p.trBig+'% (데이터를 더 부어도 이 아래로 안 내려간다)' ] }; },
    hints:['곡선 수렴 = 데이터 무익.'] },
  { id:'u2-l3-13', level:3, type:'num', tags:['정규방정식 2×2'], src:'교재 표준',
    params:{ sx:{choices:[6,10]}, sxx:{choices:[14,30]}, sy:{choices:[9,12]}, sxy:{choices:[20,32]}, n:{choices:[3,4]} },
    constraint:function(p){ return (p.n*p.sxx-p.sx*p.sx)>0; },
    statement:function(p){ return '정규방정식 [[n,Σx],[Σx,Σx²]][b,w]ᵀ=[Σy,Σxy]ᵀ (n='+p.n+', Σx='+p.sx+', Σx²='+p.sxx+', Σy='+p.sy+', Σxy='+p.sxy+')를 풀어 w·b를 구하라.'; },
    solve:function(p){
      var s=SVH.solve2(p.n,p.sx,p.sy,p.sx,p.sxx,p.sxy);
      return { ans:{b:s[0], w:s[1]}, unit:{b:'', w:''}, steps:[
        '크래머: det = '+(p.n*p.sxx-p.sx*p.sx),
        'b = '+SVH.fmt(s[0])+', w = '+SVH.fmt(s[1]),
        '(중심화 공식과 동일 결과 — 행렬 관점의 첫 발)' ] }; },
    hints:['2×2 연립.'] },
  { id:'u2-l3-14', level:3, type:'num', tags:['조기 종료'], src:'교재 표준',
    params:{ ep:{choices:[[3,20,12],[5,18,10]]} },
    statement:function(p){ var e=p.ep; return '검증 오류가 에폭 '+e[0]+'에서 최소('+e[2]+'%)였고 이후 상승해 마지막 에폭 오류는 '+e[1]+'%다. (a) 채택할 체크포인트 에폭 (b) 조기 종료로 아낀 오류(%p)를 구하라.'; },
    solve:function(p){ var e=p.ep;
      return { ans:{epoch:e[0], save:e[1]-e[2]}, unit:{epoch:'', save:'%p'}, steps:[
        '최소 검증 시점 = 에폭 '+e[0],
        '절약 = '+(e[1]-e[2])+'%p — 조기 종료는 공짜 규제' ] }; },
    hints:['검증 최소점.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u2-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 최소제곱 잔차는 합이 0이고 특징과 직교한다<br>㉡ 다항 회귀도 파라미터에 대해선 선형이라 폐형식이 있다<br>㉢ 릿지의 λ↑는 편향↑·분산↓ 방향이다<br>㉣ 모델 선택은 훈련 오류가 아니라 검증 오류로 한다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — 회귀 단원의 4대 기둥.' },
  { id:'u2-l4-02', level:4, type:'num', tags:['풀 손계산'], src:'기출 유형',
    params:{ y2:{choices:[3,5]} },
    statement:function(p){ return 'x=[1,2,3,4], y=[2,'+p.y2+',7,8]: (a) w·b (b) R²를 구하라. (SST부터)'; },
    solve:function(p){
      var xs=[1,2,3,4], ys=[2,p.y2,7,8];
      var xb=2.5, yb=(17+p.y2)/4;
      var sxy=0,sxx=0,sst=0;
      for(var i=0;i<4;i++){ sxy+=(xs[i]-xb)*(ys[i]-yb); sxx+=(xs[i]-xb)*(xs[i]-xb); sst+=(ys[i]-yb)*(ys[i]-yb); }
      var w=sxy/sxx, b=yb-w*xb, sse=0;
      for(var i=0;i<4;i++){ var e=ys[i]-(w*xs[i]+b); sse+=e*e; }
      return { ans:{w:w, b:b, R2:1-sse/sst}, unit:{w:'',b:'',R2:''}, steps:[
        'S_xy='+SVH.fmt(sxy)+', S_xx='+SVH.fmt(sxx)+' → w='+SVH.fmt(w)+', b='+SVH.fmt(b),
        'SSE='+SVH.fmt(sse)+', SST='+SVH.fmt(sst)+' → R²='+SVH.fmt(1-sse/sst),
        '(시험 계산형의 표준 분량 — 표를 그려 정리하며 풀 것)' ] }; },
    hints:['표: x−x̄, y−ȳ, 곱, 제곱.'] },
  { id:'u2-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'단순 선형회귀 최소제곱해 \\(w=S_{xy}/S_{xx}\\), \\(b=\\bar y-w\\bar x\\)를 편미분으로 유도하라.',
    steps:[
      'J=Σ(yᵢ−wxᵢ−b)² [왜] 볼록 → 1계 조건이 전역 최소',
      '∂J/∂b=−2Σ(yᵢ−wxᵢ−b)=0 → \\(b=\\bar y-w\\bar x\\) (회귀선은 평균점 통과)',
      '∂J/∂w=−2Σxᵢ(yᵢ−wxᵢ−b)=0에 b 대입',
      '중심화 변수로 정리: \\(w=\\dfrac{\\sum(x_i-\\bar x)(y_i-\\bar y)}{\\sum(x_i-\\bar x)^2}=S_{xy}/S_{xx}\\)',
      '극한 체크: 완전 상관 데이터 ⇒ 잔차 0 ✓ · x 분산 0 ⇒ 정의 불가(수직선) ✓ · 차원 [y]/[x] ✓'
    ],
    hints:['b 먼저 소거.','중심화가 식을 반으로 줄인다.'],
    expl:'중간 서술형으로 그대로 나올 수 있는 크기의 유도.' },
  { id:'u2-l4-04', level:4, type:'num', tags:['릿지 λ 선택'], src:'기출 유형',
    params:{ v0:{choices:[12,15]}, v1:{choices:[9,10]}, v2:{choices:[11,13]} },
    statement:function(p){ return 'λ=0: 검증 MSE '+p.v0+', λ=1: '+p.v1+', λ=10: '+p.v2+'. (a) 선택 λ (b) λ=10이 나빠진 이유(과잉 수축=편향↑)를 답하고, U자 곡선의 최저 근처 λ를 답하라.'; },
    solve:function(p){ return { ans:{lam:1, why:1}, unit:{lam:'', why:'(편향↑=1)'}, steps:[
        '검증 최소 = λ=1',
        'λ 과대 → 수축 과잉 → 과소적합(편향↑, 1)',
        '(규제 강도도 하이퍼파라미터 — 검증으로 고른다)' ] }; },
    hints:['U자의 밑.'] },
  { id:'u2-l4-05', level:4, type:'num', tags:['특징 확장 실험'], src:'기출 유형',
    params:{ mse1:{choices:[40,60]}, mse2:{choices:[12,18]}, mse9tr:{choices:[1,2]}, mse9te:{choices:[80,120]} },
    statement:function(p){ return '검증 MSE — 1차: '+p.mse1+', 2차: '+p.mse2+', 9차: 훈련 '+p.mse9tr+'/검증 '+p.mse9te+'. (a) 선택 차수 (b) 2차 선택 시 1차 대비 오류 감소율(%) (c) 9차 진단(과적합=1)을 답하라.'; },
    solve:function(p){
      return { ans:{deg:2, red:(1-p.mse2/p.mse1)*100, diag:1}, unit:{deg:'차', red:'%', diag:''}, steps:[
        '검증 최소 = 2차',
        '감소율 = '+SVH.fmt((1-p.mse2/p.mse1)*100)+'%',
        '9차: 훈련≪검증 → 과적합(1) — 표현력과 데이터의 균형점 찾기' ] }; },
    hints:['검증 열만 본다.'] },
  { id:'u2-l4-06', level:4, type:'num', tags:['경사하강 진동 해석'], src:'기출 유형',
    params:{ a:{choices:[1,2]}, eta:{choices:[0.8,0.9]} },
    statement:function(p){ return 'J='+p.a+'w², η='+p.eta+'/'+p.a+' (즉 수축인자 1−2η·a = '+(1-2*p.eta)+'): w₀=1에서 3스텝 궤적의 부호와 |w₃|를 구하라.'; },
    solve:function(p){
      var f=1-2*p.eta;
      var w3=Math.pow(f,3);
      return { ans:{sign:w3>0?1:-1, mag:Math.abs(w3)}, unit:{sign:'', mag:''}, steps:[
        '인자 '+SVH.fmt(f)+' (음수!) → 부호 교대 진동',
        'w₃ = '+SVH.fmt(w3)+' → 부호 '+(w3>0?'+1':'−1')+', 크기 '+SVH.fmt(Math.abs(w3)),
        '(|인자|<1이라 진동하며 수렴 — 발산 직전의 그림)' ] }; },
    hints:['음수 인자 세제곱.'] },
  { id:'u2-l4-07', level:4, type:'num', tags:['모델 보고서'], src:'기출 유형',
    params:{ R2:{choices:[0.85,0.92]}, rmse:{choices:[5,8]}, n:{choices:[50,200]} },
    statement:function(p){ return 'R²='+p.R2+', RMSE='+p.rmse+'(만원), n='+p.n+'. (a) 설명 분산(%) (b) 예측 ±2·RMSE 구간 폭 (c) 이 보고에 반드시 추가해야 할 것(검증/시험 성능인지 훈련인지 명시=1)을 답하라.'; },
    solve:function(p){ return { ans:{ev:p.R2*100, band:4*p.rmse, add:1}, unit:{ev:'%', band:'만원', add:''}, steps:[
        '설명 '+SVH.fmt(p.R2*100)+'%',
        '±2RMSE 폭 = '+4*p.rmse+'만원',
        '어느 데이터의 지표인지 명시(1) — 훈련 R²는 자랑이 아니다' ] }; },
    hints:['보고 문법.'] },
  { id:'u2-l4-08', level:4, type:'num', tags:['이론-실험 연결'], src:'기출 유형',
    params:{ d:{choices:[5,10]}, N:{choices:[20,50]} },
    statement:function(p){ return '특징 '+p.d+'개(다항·교차항 포함) 선형 모델, 데이터 N='+p.N+'. (a) 파라미터/데이터 비율 (b) N=d+1이면 훈련 MSE는 얼마가 되나(0) (c) 그때 검증 성능을 신뢰할 수 있나(0)?'; },
    solve:function(p){
      return { ans:{ratio:(p.d+1)/p.N, tr:0, trust:0}, unit:{ratio:'', tr:'', trust:''}, steps:[
        '비율 = '+SVH.fmt((p.d+1)/p.N),
        'N=파라미터 수 → 완전 보간 → 훈련 MSE 0',
        '그러나 일반화는 별개(0) — "자유도 ≥ 데이터"의 경고등' ] }; },
    hints:['보간 조건.'] }
  ]
});
