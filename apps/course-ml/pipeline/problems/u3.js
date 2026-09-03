/* U3 평가방법 — 혼동행렬 4형제, 정밀도/재현율/F1, ROC-AUC, 교차검증, 데이터 누수 */
SV_BANK.push({
  id: 'u3', no: 3, title: '평가방법', titleEn: 'Evaluation Methods',
  scope: '혼동행렬 · 정확도/정밀도/재현율/F1 · 특이도·ROC·AUC · k-겹 교차검증 · 홀드아웃 규율 · 데이터 누수',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u3-l1-01', level:1, type:'mc', tags:['혼동행렬'], src:'교재 표준',
    statement:'혼동행렬 용어가 옳게 짝지어진 것은?',
    choices:['FP=실제 음성을 양성으로(1종 오류), FN=실제 양성을 음성으로(2종 오류)','FP=양성을 음성으로','TP=음성을 음성으로','FN=1종 오류'],
    answer:0, expl:'행=실제, 열=예측(관례 확인!). FP=거짓 경보, FN=놓침 — 이름을 상황 언어로 번역해 두면 안 헷갈린다.' },
  { id:'u3-l1-02', level:1, type:'mc', tags:['정밀도·재현율'], src:'교재 표준',
    statement:'정의가 옳은 것은?',
    choices:['정밀도=TP/(TP+FP), 재현율=TP/(TP+FN)','정밀도=TP/(TP+FN)','재현율=TN/(TN+FP)','둘은 항상 같다'],
    answer:0, expl:'정밀도="양성이라 한 것 중 진짜", 재현율="진짜 중 잡아낸 것". 분모의 F가 다르다.' },
  { id:'u3-l1-03', level:1, type:'tf', tags:['트레이드오프'], src:'교재 표준',
    statement:'분류 문턱을 낮추면 재현율은 오르고 정밀도는 대체로 내려간다.',
    answer:true, expl:'더 많이 양성 판정 → 놓침(FN)↓·거짓경보(FP)↑. 문턱 스윕이 곧 ROC/PR 곡선이다.' },
  { id:'u3-l1-04', level:1, type:'mc', tags:['ROC'], src:'교재 표준',
    statement:'ROC 곡선의 축과 기준선은?',
    choices:['x=FPR, y=TPR, 대각선=무작위(AUC 0.5)','x=재현율, y=정밀도','대각선=완벽 분류기','AUC 0=무작위'],
    answer:0, expl:'완벽=좌상단(AUC 1). AUC는 "무작위 양성·음성 쌍에서 양성에 더 높은 점수를 줄 확률".' },
  { id:'u3-l1-05', level:1, type:'tf', tags:['교차검증'], src:'교재 표준',
    statement:'k-겹 교차검증은 데이터를 k등분해 각 겹을 한 번씩 검증에 쓰고 성능을 평균한다 — 홀드아웃보다 분산이 작다.',
    answer:true, expl:'모든 데이터가 검증에 한 번씩. k=N이면 LOOCV. 시험셋은 그와 별도로 봉인.' },
  { id:'u3-l1-06', level:1, type:'mc', tags:['누수'], src:'교재 표준',
    statement:'데이터 누수(leakage)의 예가 아닌 것은?',
    choices:['훈련 데이터만으로 표준화 파라미터를 만들어 시험에 적용','시험 데이터를 포함해 표준화 후 분할','시험셋으로 하이퍼파라미터 튜닝','미래 정보를 특징에 포함'],
    answer:0, expl:'①이 올바른 절차다. 전처리·튜닝·특징 모두 "시험 정보가 새는 문"이 될 수 있다.' },

  /* ---------- L2 (12) ---------- */
  { id:'u3-l2-01', level:2, type:'num', tags:['4지표 계산'], src:'창작 문제(검산됨)',
    params:{ TP:{choices:[30,40]}, FP:{choices:[10,20]}, FN:{choices:[10,20]}, TN:{choices:[40,50]} },
    statement:function(p){ return 'TP='+p.TP+', FP='+p.FP+', FN='+p.FN+', TN='+p.TN+': 정확도·정밀도·재현율(%)을 구하라.'; },
    solve:function(p){
      var acc=(p.TP+p.TN)/(p.TP+p.FP+p.FN+p.TN)*100;
      var pr=p.TP/(p.TP+p.FP)*100, rc=p.TP/(p.TP+p.FN)*100;
      return { ans:{acc:acc, pr:pr, rc:rc}, unit:{acc:'%', pr:'%', rc:'%'}, steps:[
        'acc = '+SVH.fmt(acc)+'%',
        'precision = TP/(TP+FP) = '+SVH.fmt(pr)+'%, recall = TP/(TP+FN) = '+SVH.fmt(rc)+'%' ] }; },
    hints:['분모 구분.'] },
  { id:'u3-l2-02', level:2, type:'num', tags:['F1'], src:'창작 문제(검산됨)',
    params:{ pr:{choices:[60,80]}, rc:{choices:[40,90]} },
    statement:function(p){ return '정밀도 '+p.pr+'%, 재현율 '+p.rc+'%의 F1(%)과 산술평균(%)을 비교하라.'; },
    solve:function(p){
      var f1=2*p.pr*p.rc/(p.pr+p.rc);
      return { ans:{F1:f1, avg:(p.pr+p.rc)/2}, unit:{F1:'%', avg:'%'}, steps:[
        'F1 = 조화평균 = '+SVH.fmt(f1)+'% ≤ 산술 '+SVH.fmt((p.pr+p.rc)/2)+'%',
        '(한쪽이 낮으면 F1이 가혹하게 깎는다 — 균형 강제 장치)' ] }; },
    hints:['2pr·rc/(pr+rc).'] },
  { id:'u3-l2-03', level:2, type:'num', tags:['특이도·FPR'], src:'창작 문제(검산됨)',
    params:{ TN:{choices:[80,90]}, FP:{choices:[10,20]} },
    statement:function(p){ return 'TN='+p.TN+', FP='+p.FP+': 특이도(%)와 FPR(%)을 구하라.'; },
    solve:function(p){ var sp=p.TN/(p.TN+p.FP)*100;
      return { ans:{spec:sp, FPR:100-sp}, unit:{spec:'%', FPR:'%'}, steps:[
        '특이도 = TN/(TN+FP) = '+SVH.fmt(sp)+'%',
        'FPR = 1−특이도 = '+SVH.fmt(100-sp)+'% (ROC의 x축)' ] }; },
    hints:['음성 쪽 지표.'] },
  { id:'u3-l2-04', level:2, type:'num', tags:['불균형 함정'], src:'기출 유형',
    params:{ P:{choices:[10,50]}, N:{choices:[990,950]} },
    statement:function(p){ return '양성 '+p.P+'/음성 '+p.N+'인 데이터에서 "전부 음성" 분류기의 (a) 정확도(%) (b) 재현율(%)을 구하라.'; },
    solve:function(p){
      return { ans:{acc:p.N/(p.P+p.N)*100, rc:0}, unit:{acc:'%', rc:'%'}, steps:[
        'acc = '+SVH.fmt(p.N/(p.P+p.N)*100)+'% (높다!)',
        'recall = 0% — 정확도 단독 보고가 금지되는 이유' ] }; },
    hints:['모두 음성이면 TP=0.'] },
  { id:'u3-l2-05', level:2, type:'num', tags:['k-겹 산수'], src:'창작 문제(검산됨)',
    params:{ N:{choices:[500,1000]}, k:{choices:[5,10]} },
    statement:function(p){ return 'N='+p.N+', k='+p.k+'겹 CV: (a) 겹당 검증 크기 (b) 총 훈련 횟수 (c) 각 훈련의 데이터 크기를 구하라.'; },
    solve:function(p){
      return { ans:{val:p.N/p.k, runs:p.k, tr:p.N*(p.k-1)/p.k}, unit:{val:'개', runs:'회', tr:'개'}, steps:[
        '검증 '+p.N/p.k+'개 × '+p.k+'회, 훈련 '+p.N*(p.k-1)/p.k+'개',
        '(k↑ → 훈련 많고 비용↑, LOOCV가 극단)' ] }; },
    hints:['(k−1)/k.'] },
  { id:'u3-l2-06', level:2, type:'num', tags:['CV 평균·편차'], src:'창작 문제(검산됨)',
    params:{ s:{choices:[[80,82,84,86,88],[70,75,80,85,90]]} },
    statement:function(p){ var s=p.s; return '5겹 정확도 ['+s.join(', ')+']%: 평균과 (모)표준편차를 구하라.'; },
    solve:function(p){
      var s=p.s, m=0, v=0;
      for(var i=0;i<5;i++) m+=s[i]; m/=5;
      for(var i=0;i<5;i++) v+=(s[i]-m)*(s[i]-m); v/=5;
      return { ans:{mean:m, sd:Math.sqrt(v)}, unit:{mean:'%', sd:'%p'}, steps:[
        '평균 '+SVH.fmt(m)+'%, σ = '+SVH.fmt(Math.sqrt(v))+'%p',
        '(평균±σ로 보고 — 한 숫자보다 정직하다)' ] }; },
    hints:['평균→편차 제곱.'] },
  { id:'u3-l2-07', level:2, type:'num', tags:['문턱 이동'], src:'창작 문제(검산됨)',
    params:{ TP:{choices:[40]}, FN:{choices:[10]}, dTP:{choices:[5,8]}, dFP:{choices:[15,25]} },
    statement:function(p){ return '문턱을 낮춰 TP '+p.TP+'→'+(p.TP+p.dTP)+', FP 10→'+(10+p.dFP)+' (FN '+p.FN+'→'+(p.FN-p.dTP)+'). 재현율 변화(%p)와 정밀도 변화(%p)를 구하라.'; },
    solve:function(p){
      var rc1=p.TP/(p.TP+p.FN)*100, rc2=(p.TP+p.dTP)/(p.TP+p.FN)*100;
      var pr1=p.TP/(p.TP+10)*100, pr2=(p.TP+p.dTP)/(p.TP+p.dTP+10+p.dFP)*100;
      return { ans:{dRC:rc2-rc1, dPR:pr2-pr1}, unit:{dRC:'%p', dPR:'%p'}, steps:[
        '재현율 '+SVH.fmt(rc1)+'→'+SVH.fmt(rc2)+' (+'+SVH.fmt(rc2-rc1)+')',
        '정밀도 '+SVH.fmt(pr1)+'→'+SVH.fmt(pr2)+' ('+SVH.fmt(pr2-pr1)+') — 트레이드오프의 수치 실물' ] }; },
    hints:['두 시점 각각 계산.'] },
  { id:'u3-l2-08', level:2, type:'num', tags:['AUC 손계산'], src:'교재 표준',
    params:{ pos:{choices:[[0.9,0.7],[0.8,0.6]]}, neg:{choices:[[0.5,0.3],[0.65,0.2]]} },
    statement:function(p){ return '양성 점수 ['+p.pos.join(', ')+'], 음성 점수 ['+p.neg.join(', ')+']. 모든 (양,음) 쌍 중 양성>음성 비율로 AUC를 구하라.'; },
    solve:function(p){
      var w=0, t=0;
      for(var i=0;i<2;i++) for(var j=0;j<2;j++){ t++; if(p.pos[i]>p.neg[j]) w++; else if(p.pos[i]===p.neg[j]) w+=0.5; }
      return { ans:w/t, unit:'', steps:[
        '쌍 4개 비교: 이긴 쌍 '+w+'/4',
        'AUC = '+SVH.fmt(w/t)+' (AUC의 확률 해석 그대로)' ] }; },
    hints:['쌍별 승패.'] },
  { id:'u3-l2-09', level:2, type:'num', tags:['정밀도@k'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[10,20]}, hit:{choices:[6,8]} },
    statement:function(p){ return '추천 상위 '+p.k+'개 중 '+p.hit+'개가 적중. (a) Precision@k(%) (b) 전체 양성이 40개면 Recall@k(%)를 구하라.'; },
    solve:function(p){
      return { ans:{pk:p.hit/p.k*100, rk:p.hit/40*100}, unit:{pk:'%', rk:'%'}, steps:[
        'P@k = '+SVH.fmt(p.hit/p.k*100)+'%',
        'R@k = '+p.hit+'/40 = '+SVH.fmt(p.hit/40*100)+'% (랭킹 평가의 기본형)' ] }; },
    hints:['분모가 다르다.'] },
  { id:'u3-l2-10', level:2, type:'num', tags:['오류 막대'], src:'교재 표준',
    params:{ acc:{choices:[85,90]}, N:{choices:[100,400]} },
    statement:function(p){ return '시험 정확도 '+p.acc+'% (N='+p.N+'). 표준오차 √(p(1−p)/N)를 %p로 구하고 ±2SE 구간을 답하라.'; },
    solve:function(p){
      var se=Math.sqrt(p.acc/100*(1-p.acc/100)/p.N)*100;
      return { ans:{SE:se, lo:p.acc-2*se, hi:p.acc+2*se}, unit:{SE:'%p', lo:'%', hi:'%'}, steps:[
        'SE = '+SVH.fmt(se)+'%p → 구간 ['+SVH.fmt(p.acc-2*se)+', '+SVH.fmt(p.acc+2*se)+']%',
        '(N=100에서 1%p 차이는 소음 — 비교 주장 전 필수 계산)' ] }; },
    hints:['이항 SE.'] },
  { id:'u3-l2-11', level:2, type:'num', tags:['다중 클래스 정확도'], src:'창작 문제(검산됨)',
    params:{ d:{choices:[[50,40,30],[60,30,20]]}, N:{choices:[150,200]} },
    statement:function(p){ var d=p.d; return '3클래스 혼동행렬 대각합이 ['+d.join('+')+'], 전체 N='+p.N+'. 정확도(%)와 무작위 기준선(1/3)을 비교하라.'; },
    solve:function(p){ var s=p.d[0]+p.d[1]+p.d[2];
      return { ans:{acc:s/p.N*100, base:33.3}, unit:{acc:'%', base:'%'}, steps:[
        'acc = '+s+'/'+p.N+' = '+SVH.fmt(s/p.N*100)+'%',
        '기준선 33.3% 대비 확인 (다중 클래스는 클래스별 재현율 표도 함께)' ] }; },
    hints:['대각합/전체.'] },
  { id:'u3-l2-12', level:2, type:'num', tags:['층화 필요성'], src:'창작 문제(검산됨)',
    params:{ P:{choices:[20,40]}, N:{choices:[200,400]}, k:{choices:[10]} },
    statement:function(p){ return '양성 '+p.P+'/전체 '+p.N+'을 '+p.k+'겹으로 무층화 분할하면 겹당 기대 양성 수는? 층화(stratified)가 보장하는 것은?'; },
    solve:function(p){ return { ans:p.P/p.k, unit:'개', steps:[
        '기대 '+p.P/p.k+'개 — 운 나쁘면 0개 겹 발생 가능',
        '층화 = 겹마다 클래스 비율 고정 → 지표 분산 감소' ] }; },
    hints:['기대값+분산 논리.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u3-l3-01', level:3, type:'num', tags:['행렬→전지표'], src:'기출 유형',
    params:{ TP:{choices:[45,60]}, FN:{choices:[15,20]}, FP:{choices:[30,40]}, TN:{choices:[110,180]} },
    statement:function(p){ return 'TP='+p.TP+', FN='+p.FN+', FP='+p.FP+', TN='+p.TN+': 정확도·정밀도·재현율·특이도·F1(%)을 모두 구하라.'; },
    solve:function(p){
      var tot=p.TP+p.FN+p.FP+p.TN;
      var acc=(p.TP+p.TN)/tot*100, pr=p.TP/(p.TP+p.FP)*100, rc=p.TP/(p.TP+p.FN)*100;
      var sp=p.TN/(p.TN+p.FP)*100, f1=2*pr*rc/(pr+rc);
      return { ans:{acc:acc, pr:pr, rc:rc, sp:sp, F1:f1}, unit:{acc:'%',pr:'%',rc:'%',sp:'%',F1:'%'}, steps:[
        'acc '+SVH.fmt(acc)+' · P '+SVH.fmt(pr)+' · R '+SVH.fmt(rc),
        '특이도 '+SVH.fmt(sp)+' · F1 '+SVH.fmt(f1)+'%',
        '(5지표 한 표 — 시험 손계산의 표준형)' ] }; },
    hints:['표 그려 채우기.'] },
  { id:'u3-l3-02', level:3, type:'num', tags:['베이즈 정리 유병률'], src:'기출 유형',
    params:{ prev:{choices:[1,5]}, sens:{choices:[90,99]}, spec:{choices:[90,95]} },
    statement:function(p){ return '유병률 '+p.prev+'%, 민감도 '+p.sens+'%, 특이도 '+p.spec+'%인 검사에서 양성 판정 시 실제 병일 확률(PPV, %)을 구하라.'; },
    solve:function(p){
      var pv=p.prev/100, se=p.sens/100, sp=p.spec/100;
      var ppv=pv*se/(pv*se+(1-pv)*(1-sp))*100;
      return { ans:ppv, unit:'%', steps:[
        'PPV = P(병|+) = prev·sens/[prev·sens+(1−prev)(1−spec)]',
        '= '+SVH.fmt(ppv)+'% — 직관보다 훨씬 낮다(기저율의 무서움)',
        '(정밀도=PPV: 평가 지표와 베이즈가 같은 것 — U6 다리)' ] }; },
    hints:['분모에 거짓 양성 몫.'] },
  { id:'u3-l3-03', level:3, type:'num', tags:['ROC 점 찍기'], src:'기출 유형',
    params:{ th:{choices:[0.5,0.7]} },
    statement:function(p){ return '점수: 양성 [0.9, 0.8, 0.4], 음성 [0.6, 0.3, 0.1]. 문턱 '+p.th+'에서 (TPR, FPR)을 구하라.'; },
    solve:function(p){
      var pos=[0.9,0.8,0.4], neg=[0.6,0.3,0.1];
      var tp=pos.filter(x=>x>=p.th).length, fp=neg.filter(x=>x>=p.th).length;
      return { ans:{TPR:tp/3*100, FPR:fp/3*100}, unit:{TPR:'%', FPR:'%'}, steps:[
        '문턱 '+p.th+': TP='+tp+'/3, FP='+fp+'/3',
        '(TPR, FPR) = ('+SVH.fmt(tp/3*100)+'%, '+SVH.fmt(fp/3*100)+'%) — 문턱 스윕이 곡선을 만든다' ] }; },
    hints:['점수≥문턱=양성 판정.'] },
  { id:'u3-l3-04', level:3, type:'num', tags:['AUC 6점 계산'], src:'기출 유형',
    params:{ n3:{choices:[0.55,0.75]} },
    statement:function(p){ return '양성 [0.9, 0.7, 0.6], 음성 [0.8, '+p.n3+', 0.2]의 AUC를 쌍 비교(9쌍)로 구하라.'; },
    solve:function(p){
      var pos=[0.9,0.7,0.6], neg=[0.8,p.n3,0.2];
      var w=0;
      for(var i=0;i<3;i++)for(var j=0;j<3;j++){ if(pos[i]>neg[j]) w++; else if(pos[i]===neg[j]) w+=0.5; }
      return { ans:w/9, unit:'', steps:[
        '9쌍 중 승 '+w,
        'AUC = '+SVH.fmt(w/9)+' (완벽 1·무작위 0.5 사이 어디쯤인지 감각)' ] }; },
    hints:['3×3 표.'] },
  { id:'u3-l3-05', level:3, type:'num', tags:['비용 최적 문턱'], src:'기출 유형',
    params:{ cFN:{choices:[10,50]}, cFP:{choices:[1,2]}, prev:{choices:[10,30]} },
    statement:function(p){ return 'FN 비용 '+p.cFN+', FP 비용 '+p.cFP+', 유병률 '+p.prev+'%. 양성 판정이 유리해지는 P(병|x)의 문턱(%)을 구하라.'; },
    solve:function(p){
      var th=p.cFP/(p.cFP+p.cFN)*100;
      return { ans:th, unit:'%', steps:[
        '문턱 = c_FP/(c_FP+c_FN) = '+SVH.fmt(th)+'%',
        '(비용 비대칭 → 0.5가 아닌 문턱 — U1-l3-14의 재방문, 유병률은 P(병|x) 계산에 이미 반영)' ] }; },
    hints:['기대비용 등식.'] },
  { id:'u3-l3-06', level:3, type:'num', tags:['McNemar 감각'], src:'교재 표준',
    params:{ b:{choices:[15,30]}, c:{choices:[5,10]} },
    statement:function(p){ return '두 모델 비교: A만 맞힌 사례 b='+p.b+', B만 맞힌 사례 c='+p.c+'. McNemar 통계량 (|b−c|−1)²/(b+c)를 구하고 3.84(5% 기준) 초과 여부(1/0)를 답하라.'; },
    solve:function(p){
      var s=Math.pow(Math.abs(p.b-p.c)-1,2)/(p.b+p.c);
      return { ans:{stat:s, sig:s>3.84?1:0}, unit:{stat:'', sig:''}, steps:[
        '통계량 = '+SVH.fmt(s),
        (s>3.84?'유의(1)':'유의하지 않음(0)')+' — 불일치 사례만이 정보다(둘 다 맞은 것은 무정보)' ] }; },
    hints:['b, c만 쓴다.'] },
  { id:'u3-l3-07', level:3, type:'num', tags:['거시·미시 평균'], src:'교재 표준',
    params:{ r1:{choices:[90]}, n1:{choices:[900]}, r2:{choices:[30,50]}, n2:{choices:[100]} },
    statement:function(p){ return '클래스1(n='+p.n1+') 재현율 '+p.r1+'%, 클래스2(n='+p.n2+') 재현율 '+p.r2+'%. (a) 매크로 평균 (b) 마이크로(=가중) 평균 재현율(%)을 구하라.'; },
    solve:function(p){
      var mac=(p.r1+p.r2)/2;
      var mic=(p.r1*p.n1+p.r2*p.n2)/(p.n1+p.n2);
      return { ans:{macro:mac, micro:mic}, unit:{macro:'%', micro:'%'}, steps:[
        '매크로 = 단순 평균 '+SVH.fmt(mac)+'% (소수 클래스에 공평)',
        '마이크로 = 가중 '+SVH.fmt(mic)+'% (다수 클래스가 지배)',
        '(어느 평균을 쓰는지 명시 — 불균형 보고의 예의)' ] }; },
    hints:['두 평균의 철학.'] },
  { id:'u3-l3-08', level:3, type:'num', tags:['중첩 CV 구조'], src:'교재 표준',
    params:{ ko:{choices:[5]}, ki:{choices:[3,4]}, m:{choices:[4,6]} },
    statement:function(p){ return '하이퍼파라미터 후보 '+p.m+'개를 안쪽 '+p.ki+'겹으로 고르고 바깥 '+p.ko+'겹으로 평가하는 중첩 CV의 총 훈련 횟수(탐색 포함, 바깥 재훈련 포함)를 구하라.'; },
    solve:function(p){
      var n=p.ko*(p.ki*p.m+1);
      return { ans:n, unit:'회', steps:[
        '바깥 겹마다: 안쪽 '+p.ki+'×'+p.m+' + 최종 재훈련 1',
        '총 '+p.ko+'×('+p.ki*p.m+'+1) = '+n+'회 (정직한 평가의 계산 비용)' ] }; },
    hints:['곱하고 더하기.'] },
  { id:'u3-l3-09', level:3, type:'num', tags:['누수 정량'], src:'기출 유형',
    params:{ cv:{choices:[95,98]}, real:{choices:[75,82]} },
    statement:function(p){ return '중복 샘플이 겹에 걸쳐 있던 CV 정확도 '+p.cv+'%, 중복 제거 후 '+p.real+'%. (a) 부풀림(%p) (b) 이런 누수를 막는 분할 원칙(그룹 단위 분할=1)을 답하라.'; },
    solve:function(p){ return { ans:{infl:p.cv-p.real, rule:1}, unit:{infl:'%p', rule:''}, steps:[
        '부풀림 = '+(p.cv-p.real)+'%p — 같은 환자/유저가 양쪽에 있으면 시험이 아니라 재시험',
        '그룹(환자·시계열) 단위 분할(1)이 원칙' ] }; },
    hints:['그룹 누수.'] },
  { id:'u3-l3-10', level:3, type:'num', tags:['PR 기준선'], src:'교재 표준',
    params:{ prev:{choices:[5,20]} },
    statement:function(p){ return '양성 비율 '+p.prev+'%인 데이터에서 (a) PR 곡선의 무작위 기준선(정밀도) (b) ROC 기준선 AUC를 구하라. 불균형에서 어느 곡선이 더 예민한가(PR=1)?'; },
    solve:function(p){ return { ans:{pr:p.prev, roc:0.5, pick:1}, unit:{pr:'%', roc:'', pick:''}, steps:[
        'PR 기준선 = 유병률 '+p.prev+'%, ROC 기준선 = 0.5(불균형 무관)',
        '불균형에선 PR이 차이를 크게 보여준다(1)' ] }; },
    hints:['기준선의 차이.'] },
  { id:'u3-l3-11', level:3, type:'num', tags:['필요 시험 크기'], src:'교재 표준',
    params:{ diff:{choices:[2,5]}, acc:{choices:[85,90]} },
    statement:function(p){ return '정확도 차 '+p.diff+'%p를 ±2SE로 구분하려면(SE差 근사 √2·√(p(1−p)/N)×2 ≤ diff) 필요한 N을 구하라. (p≈'+p.acc+'%)'; },
    solve:function(p){
      var pq=p.acc/100*(1-p.acc/100);
      var N=8*pq/Math.pow(p.diff/100,2);
      return { ans:N, unit:'개', steps:[
        'N ≥ 8p(1−p)/diff² = '+SVH.fmt(N),
        '(2%p 구분에 수천 개 — "우리 모델이 1% 좋다" 주장의 무게)' ] }; },
    hints:['SE 조건 역산.'] },
  { id:'u3-l3-12', level:3, type:'num', tags:['균형 정확도'], src:'교재 표준',
    params:{ rc:{choices:[80,95]}, sp:{choices:[40,60]} },
    statement:function(p){ return '재현율 '+p.rc+'%, 특이도 '+p.sp+'%: 균형 정확도((rc+sp)/2)를 구하고, 불균형에서 정확도 대신 쓰는 이유를 답하라.'; },
    solve:function(p){ return { ans:(p.rc+p.sp)/2, unit:'%', steps:[
        '균형 정확도 = '+SVH.fmt((p.rc+p.sp)/2)+'%',
        '(클래스별 성능의 평균 — 다수 클래스 무임승차 차단)' ] }; },
    hints:['두 클래스 대칭 평균.'] },
  { id:'u3-l3-13', level:3, type:'num', tags:['조합 탐색 비용'], src:'창작 문제(검산됨)',
    params:{ a:{choices:[4,5]}, b:{choices:[3,6]}, k:{choices:[5]}, t:{choices:[2,10]} },
    statement:function(p){ return '그리드 서치: 파라미터 2개(값 '+p.a+'×'+p.b+'개), '+p.k+'겹 CV, 1훈련 '+p.t+'분. 총 소요(시간)를 구하라.'; },
    solve:function(p){
      var min=p.a*p.b*p.k*p.t;
      return { ans:min/60, unit:'시간', steps:[
        p.a*p.b+'조합 × '+p.k+'겹 × '+p.t+'분 = '+min+'분 = '+SVH.fmt(min/60)+'시간',
        '(탐색 설계는 예산 산수부터)' ] }; },
    hints:['전부 곱.'] },
  { id:'u3-l3-14', level:3, type:'num', tags:['시계열 분할'], src:'교재 표준',
    params:{ N:{choices:[120,240]}, w:{choices:[60,120]}, h:{choices:[12,24]} },
    statement:function(p){ return '시계열 N='+p.N+'개월, 훈련창 '+p.w+'·검증창 '+p.h+'개월 롤링(창 이동 = 검증창 크기): 가능한 평가 횟수를 구하고, 무작위 k-겹을 쓰면 안 되는 이유를 답하라.'; },
    solve:function(p){
      var n=Math.floor((p.N-p.w)/p.h);
      return { ans:n, unit:'회', steps:[
        '('+p.N+'−'+p.w+')/'+p.h+' = '+n+'회',
        '무작위 분할 = 미래로 과거를 예측하는 누수 — 시간 순서 보존이 원칙' ] }; },
    hints:['(N−w)/h 내림.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u3-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 불균형 데이터에서 정확도 단독 보고는 오도할 수 있다<br>㉡ AUC는 무작위 양·음 쌍의 순위 정확도로 해석된다<br>㉢ 시험셋은 모델·하이퍼파라미터 선택에 쓰면 안 된다<br>㉣ 전처리 통계는 훈련 데이터에서만 추정한다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — 평가 규율의 헌법 4조.' },
  { id:'u3-l4-02', level:4, type:'num', tags:['종합 손계산'], src:'기출 유형',
    params:{ N:{choices:[200]}, prev:{choices:[20,30]}, rc:{choices:[80,90]}, sp:{choices:[85,90]} },
    statement:function(p){ return 'N='+p.N+', 유병률 '+p.prev+'%, 재현율 '+p.rc+'%, 특이도 '+p.sp+'%에서 혼동행렬 4칸을 복원하고 정밀도·F1(%)을 구하라.'; },
    solve:function(p){
      var P=p.N*p.prev/100, Ng=p.N-P;
      var TP=P*p.rc/100, FN=P-TP, TN=Ng*p.sp/100, FP=Ng-TN;
      var pr=TP/(TP+FP)*100, f1=2*pr*p.rc/(pr+p.rc);
      return { ans:{TP:TP, FP:FP, pr:pr, F1:f1}, unit:{TP:'', FP:'', pr:'%', F1:'%'}, steps:[
        'P='+P+', N='+Ng+' → TP='+SVH.fmt(TP)+', FN='+SVH.fmt(FN)+', TN='+SVH.fmt(TN)+', FP='+SVH.fmt(FP),
        '정밀도 = '+SVH.fmt(pr)+'%, F1 = '+SVH.fmt(f1)+'%',
        '(지표→행렬 역산 — 지표 정의를 정말 아는지 시험하는 방식)' ] }; },
    hints:['비율→개수 순서로.'] },
  { id:'u3-l4-03', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'F1이 정밀도·재현율의 "조화평균"인 이유를 유도하고, 산술평균 대비 성질(한쪽 0이면 0)을 증명하라.',
    steps:[
      'F1 정의: \\(F_1=\\dfrac{2PR}{P+R}\\) [왜] TP 관점 재작성: 2TP/(2TP+FP+FN)과 동치',
      '조화평균 \\(H=2/(1/P+1/R)\\)로 정리하면 동일 — "역수의 평균의 역수"',
      'R→0이면 F1→0 (산술평균은 P/2로 살아남음) — 한쪽 실패를 숨기지 못한다',
      'P=R일 때 F1=P=산술평균 — 균형점에서만 일치',
      '극한 체크: 완벽(1,1)⇒1 ✓ · H≤산술(AM-HM 부등식) ✓'
    ],
    hints:['2TP 형태와 조화평균 형태를 오가라.'],
    expl:'"왜 하필 조화평균?"에 대한 완결 답 — 서술형 후보.' },
  { id:'u3-l4-04', level:4, type:'num', tags:['ROC 전체 스윕'], src:'기출 유형',
    params:{ n2:{choices:[0.45,0.65]} },
    statement:function(p){ return '양성 [0.9, 0.6], 음성 [0.7, '+p.n2+']. 문턱을 점수 사이마다 옮기며 (TPR, FPR) 점들을 나열하고 사다리꼴로 AUC를 구하라.'; },
    solve:function(p){
      var pos=[0.9,0.6], neg=[0.7,p.n2];
      var w=0;
      for(var i=0;i<2;i++)for(var j=0;j<2;j++){ if(pos[i]>neg[j]) w++; else if(pos[i]===neg[j]) w+=0.5; }
      return { ans:w/4, unit:'', steps:[
        '점: (0,0)→문턱 내리며 → (1,1)',
        'AUC(쌍 비교와 동일) = '+SVH.fmt(w/4),
        '(점 나열과 쌍 비교가 같은 답 — 두 방법 교차 검산)' ] }; },
    hints:['쌍 비교가 빠른 검산.'] },
  { id:'u3-l4-05', level:4, type:'num', tags:['임상 시나리오'], src:'기출 유형',
    params:{ prev:{choices:[0.5,2]}, sens:{choices:[95]}, spec:{choices:[95,99]}, N:{choices:[100000]} },
    statement:function(p){ return '인구 '+p.N+'명 선별검사(유병률 '+p.prev+'%, 민감도 '+p.sens+'%, 특이도 '+p.spec+'%): (a) 양성 판정자 수 (b) 그중 실제 환자 비율(PPV, %) (c) 놓친 환자 수를 구하라.'; },
    solve:function(p){
      var P=p.N*p.prev/100, Ng=p.N-P;
      var TP=P*p.sens/100, FP=Ng*(1-p.spec/100);
      return { ans:{pos:TP+FP, PPV:TP/(TP+FP)*100, miss:P-TP}, unit:{pos:'명', PPV:'%', miss:'명'}, steps:[
        '양성 = TP '+SVH.fmt(TP)+' + FP '+SVH.fmt(FP)+' = '+SVH.fmt(TP+FP)+'명',
        'PPV = '+SVH.fmt(TP/(TP+FP)*100)+'% — 대부분 허탕',
        '놓침 = '+SVH.fmt(P-TP)+'명 (선별검사 정책 논쟁의 산수)' ] }; },
    hints:['나무 그림으로 4칸.'] },
  { id:'u3-l4-06', level:4, type:'num', tags:['모델 비교 보고'], src:'기출 유형',
    params:{ a:{choices:[86,88]}, b:{choices:[89,90]}, N:{choices:[500,1000]} },
    statement:function(p){ return 'A '+p.a+'% vs B '+p.b+'% (같은 시험셋 N='+p.N+'). (a) 차이(%p) (b) 차이의 대략적 SE(√(2p̄q̄/N), p̄=평균) (c) 차이>2SE인가(1/0)를 구하라.'; },
    solve:function(p){
      var pb=(p.a+p.b)/200, se=Math.sqrt(2*pb*(1-pb)/p.N)*100;
      var d=p.b-p.a;
      return { ans:{d:d, SE:se, sig:d>2*se?1:0}, unit:{d:'%p', SE:'%p', sig:''}, steps:[
        '차 = '+d+'%p, SE ≈ '+SVH.fmt(se)+'%p',
        (d>2*se?'구분 가능(1)':'소음 범위(0) — 같은 사례 대조(McNemar)가 더 예민'),
        '(비교 주장에는 항상 오차 막대)' ] }; },
    hints:['2SE 규칙.'] },
  { id:'u3-l4-07', level:4, type:'num', tags:['파이프라인 감사'], src:'기출 유형',
    params:{ s:{choices:[1,2]} },
    statement:function(p){ return '절차 감사 — ① 전체 데이터로 특징 선택 후 CV ② 겹 안에서 특징 선택 ③ 시험셋으로 λ 튜닝 ④ 튜닝은 검증, 시험은 1회. 올바른 절차 두 개의 번호 합을 구하라.'; },
    solve:function(p){ return { ans:6, unit:'(②+④)', steps:[
        '①은 선택 누수(시험 정보가 특징에), ③은 시험 오염',
        '②·④가 정도 → 합 6',
        '(누수는 코드가 아니라 "절차"에서 샌다)' ] }; },
    hints:['모든 학습된 것은 겹 안에서.'] },
  { id:'u3-l4-08', level:4, type:'num', tags:['운영 문턱 설계'], src:'기출 유형',
    params:{ rc:{choices:[[95,60],[90,70]]}, vol:{choices:[1000]}, cap:{choices:[100,150]} },
    statement:function(p){ var r=p.rc; return '문턱 A: 재현율 '+r[0]+'%·정밀도 '+r[1]+'%. 하루 '+p.vol+'건 중 양성 5%, 검토 인력 한도 '+p.cap+'건. A의 일일 양성 판정량(TP+FP)을 구하고 한도 내인지(1/0) 답하라.'; },
    solve:function(p){
      var r=p.rc;
      var TP=p.vol*0.05*r[0]/100;
      var flag=TP/(r[1]/100);
      return { ans:{flag:flag, ok:flag<=p.cap?1:0}, unit:{flag:'건', ok:''}, steps:[
        'TP = '+SVH.fmt(TP)+' → 판정량 = TP/정밀도 = '+SVH.fmt(flag)+'건',
        (flag<=p.cap?'한도 내(1)':'초과(0) — 문턱을 올려야')+' (지표를 운영 제약으로 번역하는 문제)' ] }; },
    hints:['정밀도=TP/판정량 역산.'] }
  ]
});
