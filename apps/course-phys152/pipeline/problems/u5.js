/* U5 전류·저항·DC 회로 — 유동속도, 비저항, 전력, 기전력·내부저항, 직렬병렬, 키르히호프, RC (W5) */
SV_BANK.push({
  id: 'u5', no: 5, title: '전류·저항·DC 회로', titleEn: 'Current, Resistance & DC Circuits',
  scope: '전류의 미시상(유동속도) · 비저항 ρ와 온도 · 옴 법칙·전력 · 기전력과 내부저항 · 직렬·병렬 · 키르히호프 · RC 충방전',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u5-l1-01', level:1, type:'mc', tags:['미시상'], src:'강의자료 대조',
    statement:'도선 속 전류의 미시적 그림으로 옳은 것은? \\(I=nqAv_d\\)',
    choices:['전자는 mm/s급 유동속도로 느리게 밀리지만, 장은 거의 빛속으로 전파되어 전구가 즉시 켜진다','전자가 빛속으로 흐른다','전자 속도=신호 속도','유동속도는 초속 수 km'],
    answer:0, expl:'v_d ~ 0.1 mm/s vs 신호 ~c. "전자가 아니라 장이 에너지를 나른다"는 노트 서사의 핵심.' },
  { id:'u5-l1-02', level:1, type:'tf', tags:['비저항'], src:'교재 표준',
    statement:'저항은 \\(R=\\rho L/A\\)로 재질(ρ)과 기하(L, A)로 분리되며, 금속의 ρ는 온도가 오르면 증가한다.',
    answer:true, expl:'ρ(T)=ρ₀[1+α(T−T₀)]. 길이 2배·지름 절반이면 R은 8배 — 기하 감각 문제 단골.' },
  { id:'u5-l1-03', level:1, type:'mc', tags:['전력'], src:'교재 표준',
    statement:'저항에서 소비 전력으로 옳은 것은?',
    choices:['P=IV=I²R=V²/R','P=IV만 저항에 성립','P=V/R','P=I/V'],
    answer:0, expl:'IV는 모든 소자, I²R·V²/R은 저항 전용. 무엇이 공통(직렬 I? 병렬 V?)인지 보고 고른다.' },
  { id:'u5-l1-04', level:1, type:'tf', tags:['기전력'], src:'교재 표준',
    statement:'실제 전지의 단자 전압은 \\(V=\\mathcal{E}-Ir\\)로, 전류가 흐르면 기전력보다 낮아진다.',
    answer:true, expl:'내부저항 r의 강하. 충전 중엔 V=ℰ+Ir로 역전 — 부호가 시험 포인트.' },
  { id:'u5-l1-05', level:1, type:'mc', tags:['키르히호프'], src:'교재 표준',
    statement:'키르히호프 법칙의 물리적 근거는?',
    choices:['접점 법칙=전하 보존, 고리 법칙=에너지 보존(전위의 일가성)','둘 다 옴 법칙','운동량 보존','실험 경험칙일 뿐'],
    answer:0, expl:'전전개에서 만든 그 법칙 — 물리 과목에선 "왜"가 답이다.' },
  { id:'u5-l1-06', level:1, type:'mc', tags:['RC 직관'], src:'교재 표준',
    statement:'RC 충전 회로에서 스위치를 닫는 순간과 충분히 지난 후의 축전기는?',
    choices:['처음엔 도선(전압 0), 나중엔 끊긴 선(전류 0)','처음부터 끊긴 선','항상 도선','τ에서 완전 충전'],
    answer:0, expl:'0⁺: v_C 연속=0 → 단락처럼. ∞: 완충 → 개방. τ=RC에서 63.2%.' },

  /* ---------- L2 (12) ---------- */
  { id:'u5-l2-01', level:2, type:'num', tags:['유동속도'], src:'교재 표준',
    params:{ I:{choices:[5,10],unit:'A'}, d:{choices:[1,2],unit:'mm'} },
    statement:function(p){ return '구리선(지름 '+p.d+' mm, n=8.5×10²⁸ /m³)에 I='+p.I+' A. 유동속도 v_d(mm/s)는?'; },
    solve:function(p){
      var A=Math.PI*Math.pow(p.d*1e-3/2,2);
      var v=p.I/(8.5e28*1.602e-19*A)*1000;
      return { ans:v, unit:'mm/s', steps:[
        'A = π(d/2)² = '+SVH.fmt(A)+' m²',
        'v_d = I/(neA) = '+SVH.fmt(v)+' mm/s (달팽이 속도 확인)' ] }; },
    hints:['I=nqAv_d 역산.'] },
  { id:'u5-l2-02', level:2, type:'num', tags:['저항 계산'], src:'창작 문제(검산됨)',
    params:{ L:{choices:[10,50],unit:'m'}, d:{choices:[0.5,1],unit:'mm'} },
    statement:function(p){ return '구리선(ρ=1.7×10⁻⁸ Ω·m, L='+p.L+' m, 지름 '+p.d+' mm)의 R(Ω)은?'; },
    solve:function(p){
      var A=Math.PI*Math.pow(p.d*1e-3/2,2);
      var R=1.7e-8*p.L/A;
      return { ans:R, unit:'Ω', steps:[
        'R = ρL/A = 1.7×10⁻⁸×'+p.L+'/'+SVH.fmt(A),
        '= '+SVH.fmt(R)+' Ω' ] }; },
    hints:['면적 계산 먼저.'] },
  { id:'u5-l2-03', level:2, type:'num', tags:['기하 스케일'], src:'창작 문제(검산됨)',
    params:{ kL:{choices:[2,3]}, kd:{choices:[2]} },
    statement:function(p){ return '같은 재질 도선의 길이를 '+p.kL+'배, 지름을 '+p.kd+'배로 하면 R은 몇 배?'; },
    solve:function(p){ var r=p.kL/Math.pow(p.kd,2);
      return { ans:r, unit:'배', steps:[
        'R ∝ L/d²',
        '= '+p.kL+'/'+p.kd+'² = '+SVH.fmt(r)+'배' ] }; },
    hints:['지름은 제곱으로.'] },
  { id:'u5-l2-04', level:2, type:'num', tags:['온도 계수'], src:'교재 표준',
    params:{ R0:{choices:[100,200],unit:'Ω'}, dT:{choices:[50,100],unit:'°C'} },
    statement:function(p){ return '구리 저항(R₀='+p.R0+' Ω, α=3.9×10⁻³/°C)이 ΔT='+p.dT+' °C 오르면 R(Ω)은?'; },
    solve:function(p){ var R=p.R0*(1+3.9e-3*p.dT);
      return { ans:R, unit:'Ω', steps:[
        'R = R₀(1+αΔT) = '+p.R0+'(1+'+SVH.fmt(3.9e-3*p.dT)+')',
        '= '+SVH.fmt(R)+' Ω (백금온도계·전구 필라멘트의 원리)' ] }; },
    hints:['선형 근사식.'] },
  { id:'u5-l2-05', level:2, type:'num', tags:['내부저항'], src:'기출 유형',
    params:{ emf:{choices:[9,12],unit:'V'}, r:{choices:[0.5,1],unit:'Ω'}, R:{choices:[5,10],unit:'Ω'} },
    statement:function(p){ return 'ℰ='+p.emf+' V, r='+p.r+' Ω 전지에 R='+p.R+' Ω 연결: (a) 전류 (b) 단자 전압 (c) 전지 효율(%)을 구하라.'; },
    solve:function(p){
      var I=p.emf/(p.r+p.R), V=p.emf-I*p.r;
      return { ans:{I:I, V:V, eff:V/p.emf*100}, unit:{I:'A', V:'V', eff:'%'}, steps:[
        'I = ℰ/(r+R) = '+SVH.fmt(I)+' A',
        'V = ℰ−Ir = '+SVH.fmt(V)+' V, 효율 = R/(R+r) = '+SVH.fmt(V/p.emf*100)+' %' ] }; },
    hints:['전전개 U1과 같은 회로, 언어만 물리.'] },
  { id:'u5-l2-06', level:2, type:'num', tags:['전력 요금'], src:'창작 문제(검산됨)',
    params:{ P:{choices:[1200,1500],unit:'W'}, h:{choices:[2,3],unit:'h'}, c:{choices:[150,200],unit:'원/kWh'} },
    statement:function(p){ return p.P+' W 기기를 하루 '+p.h+'시간, 30일 사용. (a) 월 전력량(kWh) (b) 요금(원, '+p.c+'원/kWh)을 구하라.'; },
    solve:function(p){ var E=p.P/1000*p.h*30;
      return { ans:{E:E, cost:E*p.c}, unit:{E:'kWh', cost:'원'}, steps:[
        'E = '+SVH.fmt(p.P/1000)+' kW × '+p.h*30+' h = '+SVH.fmt(E)+' kWh',
        '요금 = '+SVH.fmt(E*p.c)+' 원 (kWh = 에너지 단위 확인)' ] }; },
    hints:['kW×h.'] },
  { id:'u5-l2-07', level:2, type:'num', tags:['직렬 전력'], src:'창작 문제(검산됨)',
    params:{ emf:{choices:[12,24],unit:'V'}, R1:{choices:[2,4],unit:'Ω'}, R2:{choices:[4,8],unit:'Ω'} },
    statement:function(p){ return p.emf+' V에 R₁='+p.R1+', R₂='+p.R2+' Ω 직렬. 각 저항의 소비 전력(W)과 비 P₁:P₂를 구하라.'; },
    solve:function(p){
      var I=p.emf/(p.R1+p.R2);
      return { ans:{P1:I*I*p.R1, P2:I*I*p.R2}, unit:{P1:'W', P2:'W'}, steps:[
        'I = '+SVH.fmt(I)+' A (공통)',
        'P = I²R → '+SVH.fmt(I*I*p.R1)+', '+SVH.fmt(I*I*p.R2)+' W — 직렬은 큰 R이 뜨겁다' ] }; },
    hints:['직렬=I 공통 → I²R.'] },
  { id:'u5-l2-08', level:2, type:'num', tags:['병렬 전력'], src:'창작 문제(검산됨)',
    params:{ V:{choices:[120,220],unit:'V'}, P1:{choices:[60,100],unit:'W'}, P2:{choices:[40,60],unit:'W'} },
    statement:function(p){ return '전구 '+p.P1+' W와 '+p.P2+' W('+p.V+' V 정격)를 병렬로 정격 전압에 연결. (a) 총 전류(A) (b) 어느 전구가 밝은가(P₁=1/P₂=2)?'; },
    solve:function(p){
      var I=(p.P1+p.P2)/p.V;
      return { ans:{I:I, bright:1}, unit:{I:'A', bright:''}, steps:[
        'I = (P₁+P₂)/V = '+SVH.fmt(I)+' A',
        '병렬 = 정격대로 → '+p.P1+' W가 밝다(1). (직렬로 이으면 역전된다 — L3에서!)' ] }; },
    hints:['병렬=V 공통.'] },
  { id:'u5-l2-09', level:2, type:'num', tags:['혼합 회로'], src:'기출 유형',
    params:{ emf:{choices:[12,18],unit:'V'}, R1:{choices:[2,3],unit:'Ω'}, R2:{choices:[4,6],unit:'Ω'}, R3:{choices:[4,6],unit:'Ω'} },
    statement:function(p){ return 'ℰ='+p.emf+' V → R₁ 직렬 → (R₂∥R₃) (값 '+p.R1+'·'+p.R2+'·'+p.R3+' Ω). (a) 총 전류 (b) R₂의 전류(A)를 구하라.'; },
    solve:function(p){
      var Rp=p.R2*p.R3/(p.R2+p.R3), I=p.emf/(p.R1+Rp);
      var I2=I*p.R3/(p.R2+p.R3);
      return { ans:{I:I, I2:I2}, unit:{I:'A', I2:'A'}, steps:[
        'R_eq = '+p.R1+'+'+SVH.fmt(Rp)+' = '+SVH.fmt(p.R1+Rp)+' Ω → I = '+SVH.fmt(I)+' A',
        'I₂ = I·R₃/(R₂+R₃) = '+SVH.fmt(I2)+' A' ] }; },
    hints:['접기→분류.'] },
  { id:'u5-l2-10', level:2, type:'num', tags:['RC 시간상수'], src:'창작 문제(검산됨)',
    params:{ R:{choices:[100,470],unit:'kΩ'}, C:{choices:[10,47],unit:'µF'}, t:{choices:[5,10],unit:'s'} },
    statement:function(p){ return 'RC 충전(R='+p.R+' kΩ, C='+p.C+' µF, ℰ=10 V): (a) τ(s) (b) t='+p.t+' s에서 v_C(V)를 구하라.'; },
    solve:function(p){
      var tau=p.R*1000*p.C*1e-6;
      var v=10*(1-Math.exp(-p.t/tau));
      return { ans:{tau:tau, v:v}, unit:{tau:'s', v:'V'}, steps:[
        'τ = RC = '+SVH.fmt(tau)+' s',
        'v = ℰ(1−e^{−t/τ}) = '+SVH.fmt(v)+' V' ] }; },
    hints:['전전개 U6 공식 그대로.'] },
  { id:'u5-l2-11', level:2, type:'num', tags:['전하량 적산'], src:'창작 문제(검산됨)',
    params:{ I:{choices:[2,5],unit:'A'}, t:{choices:[10,60],unit:'min'} },
    statement:function(p){ return 'I='+p.I+' A가 '+p.t+'분 흘렀다. (a) 전하량(C) (b) 전자 개수를 구하라.'; },
    solve:function(p){
      var Q=p.I*p.t*60;
      return { ans:{Q:Q, n:Q/1.602e-19}, unit:{Q:'C', n:'개'}, steps:[
        'Q = It = '+SVH.fmt(Q)+' C',
        'n = Q/e = '+SVH.fmt(Q/1.602e-19)+' 개' ] }; },
    hints:['분→초.'] },
  { id:'u5-l2-12', level:2, type:'num', tags:['전류밀도'], src:'교재 표준',
    params:{ I:{choices:[10,20],unit:'A'}, d:{choices:[2,4],unit:'mm'} },
    statement:function(p){ return '지름 '+p.d+' mm 도선에 I='+p.I+' A: 전류밀도 J(A/mm²)와, 같은 J로 지름 2배 선이 나를 수 있는 전류(A)를 구하라.'; },
    solve:function(p){
      var A=Math.PI*Math.pow(p.d/2,2);
      var J=p.I/A;
      return { ans:{J:J, I2:4*p.I}, unit:{J:'A/mm²', I2:'A'}, steps:[
        'J = I/A = '+SVH.fmt(J)+' A/mm²',
        '지름 2배 → 면적 4배 → '+SVH.fmt(4*p.I)+' A (허용 전류 규격의 물리)' ] }; },
    hints:['J=I/A.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u5-l3-01', level:3, type:'num', tags:['두 고리 KVL'], src:'기출 유형',
    params:{ e1:{choices:[12,18],unit:'V'}, e2:{choices:[6,9],unit:'V'}, R1:{choices:[2,4],unit:'Ω'}, R2:{choices:[2,3],unit:'Ω'}, R3:{choices:[4,6],unit:'Ω'} },
    statement:function(p){ return '두 전지 회로: ℰ₁('+p.e1+' V)-R₁ 가지, ℰ₂('+p.e2+' V)-R₂ 가지가 R₃를 공유(둘 다 R₃로 밀어넣는 방향). R₃의 전류(A)를 구하라.'; },
    solve:function(p){
      // 절점법: (e1-v)/R1 + (e2-v)/R2 = v/R3
      var v=(p.e1/p.R1+p.e2/p.R2)/(1/p.R1+1/p.R2+1/p.R3);
      return { ans:v/p.R3, unit:'A', steps:[
        '절점 v: (ℰ₁−v)/R₁+(ℰ₂−v)/R₂ = v/R₃',
        'v = '+SVH.fmt(v)+' V → I₃ = v/R₃ = '+SVH.fmt(v/p.R3)+' A',
        '(밀리컨식 두 전지 병렬 급전 — Halliday 27장 단골)' ] }; },
    hints:['절점 하나로 끝나는 구조.'] },
  { id:'u5-l3-02', level:3, type:'num', tags:['전구 직렬 역전'], src:'기출 유형',
    params:{ V:{choices:[120,220],unit:'V'}, P1:{choices:[100],unit:'W'}, P2:{choices:[40,60],unit:'W'} },
    statement:function(p){ return p.P1+' W와 '+p.P2+' W 전구('+p.V+' V 정격)를 "직렬"로 '+p.V+' V에 연결. 각 전구의 실제 소비 전력(W)을 구하고 어느 쪽이 밝은지 답하라. (저항 불변 가정)'; },
    solve:function(p){
      var R1=p.V*p.V/p.P1, R2=p.V*p.V/p.P2;
      var I=p.V/(R1+R2);
      return { ans:{Pa:I*I*R1, Pb:I*I*R2}, unit:{Pa:'W', Pb:'W'}, steps:[
        'R = V²/P: R₁='+SVH.fmt(R1)+', R₂='+SVH.fmt(R2)+' Ω (작은 W = 큰 R!)',
        'I = '+SVH.fmt(I)+' A → P: '+SVH.fmt(I*I*R1)+' vs '+SVH.fmt(I*I*R2)+' W',
        '직렬에선 '+p.P2+' W 전구가 더 밝다 — 정격 표기의 함정 (명 기출 유형)' ] }; },
    hints:['정격→저항 변환부터.'] },
  { id:'u5-l3-03', level:3, type:'num', tags:['최대 전력 전달'], src:'기출 유형',
    params:{ emf:{choices:[12,24],unit:'V'}, r:{choices:[1,2],unit:'Ω'} },
    statement:function(p){ return 'ℰ='+p.emf+' V, r='+p.r+' Ω 전지에서 부하 R로 최대 전력을 뽑는 (a) R (b) P_max(W) (c) 그때 효율(%)을 구하라.'; },
    solve:function(p){
      var P=p.emf*p.emf/(4*p.r);
      return { ans:{R:p.r, P:P, eff:50}, unit:{R:'Ω', P:'W', eff:'%'}, steps:[
        'R = r = '+p.r+' Ω (정합)',
        'P_max = ℰ²/4r = '+SVH.fmt(P)+' W, 효율 50%',
        '(전전개 U4 정리의 물리 버전 — 전력계는 정합, 전력망은 r≪R)' ] }; },
    hints:['정합 조건.'] },
  { id:'u5-l3-04', level:3, type:'num', tags:['RC 방전 실험'], src:'기출 유형',
    params:{ V0:{choices:[9,12],unit:'V'}, R:{choices:[220,470],unit:'kΩ'}, C:{choices:[100,470],unit:'µF'}, f:{choices:[0.5,0.1]} },
    statement:function(p){ return 'RC 방전(V₀='+p.V0+' V, R='+p.R+' kΩ, C='+p.C+' µF): 전압이 V₀의 '+p.f+'배가 되는 시각(s)과 그 순간 전류(µA)를 구하라.'; },
    solve:function(p){
      var tau=p.R*1000*p.C*1e-6;
      var t=-tau*Math.log(p.f);
      var i=p.V0*p.f/(p.R*1000)*1e6;
      return { ans:{t:t, i:i}, unit:{t:'s', i:'µA'}, steps:[
        'τ = '+SVH.fmt(tau)+' s → t = −τln('+p.f+') = '+SVH.fmt(t)+' s',
        'i = v/R = '+SVH.fmt(i)+' µA (전압과 전류가 같은 τ로 감쇠)' ] }; },
    hints:['ln 역산.'] },
  { id:'u5-l3-05', level:3, type:'num', tags:['도선 접합'], src:'기출 유형',
    params:{ d1:{choices:[1,2],unit:'mm'}, k:{choices:[2,3]}, I:{choices:[5,10],unit:'A'} },
    statement:function(p){ return '지름 d₁='+p.d1+' mm 도선이 지름 '+p.k+'d₁ 도선과 접합되어 I='+p.I+' A가 흐른다. (a) 전류비 I₁:I₂ (b) 전류밀도비 J₁/J₂ (c) 유동속도비를 구하라.'; },
    solve:function(p){
      var k2=p.k*p.k;
      return { ans:{Iratio:1, J:k2, v:k2}, unit:{Iratio:'', J:'배', v:'배'}, steps:[
        '직렬 → 전류 동일(비 1)',
        'J = I/A → 가는 쪽이 '+k2+'배',
        'v_d ∝ J → 역시 '+k2+'배 (병목에서 빨라진다 — 강물 유추)' ] }; },
    hints:['연속 방정식 감각.'] },
  { id:'u5-l3-06', level:3, type:'num', tags:['전지 병렬'], src:'기출 유형',
    params:{ emf:{choices:[12],unit:'V'}, r:{choices:[1,2],unit:'Ω'}, n:{choices:[2,4]}, R:{choices:[5,10],unit:'Ω'} },
    statement:function(p){ return '동일 전지(ℰ='+p.emf+' V, r='+p.r+' Ω) '+p.n+'개 병렬에 R='+p.R+' Ω. (a) 부하 전류(A) (b) 전지 1개일 때 대비 개선율(%)을 구하라.'; },
    solve:function(p){
      var I=p.emf/(p.r/p.n+p.R);
      var I1=p.emf/(p.r+p.R);
      return { ans:{I:I, imp:(I/I1-1)*100}, unit:{I:'A', imp:'%'}, steps:[
        '병렬: ℰ 그대로, r/n = '+SVH.fmt(p.r/p.n)+' Ω',
        'I = '+SVH.fmt(I)+' A (1개: '+SVH.fmt(I1)+' A → +'+SVH.fmt((I/I1-1)*100)+'%)',
        '(r≪R이면 병렬 이득 미미 — 언제 병렬이 의미 있나까지)' ] }; },
    hints:['내부저항만 준다.'] },
  { id:'u5-l3-07', level:3, type:'num', tags:['휘트스톤 응용'], src:'기출 유형',
    params:{ R1:{choices:[100,200],unit:'Ω'}, R2:{choices:[300,400],unit:'Ω'}, R3:{choices:[150,250],unit:'Ω'} },
    statement:function(p){ return '휘트스톤 브리지 평형으로 미지 저항 측정: R₁='+p.R1+', R₂='+p.R2+', R₃='+p.R3+' Ω일 때 R_x=R₂R₃/R₁(Ω)을 구하라.'; },
    solve:function(p){ var Rx=p.R2*p.R3/p.R1;
      return { ans:Rx, unit:'Ω', steps:[
        '평형: R₁R_x=R₂R₃ → R_x = '+SVH.fmt(Rx)+' Ω',
        '(검류계 0 조정 → 정밀 저항 측정 — 실험실 표준)' ] }; },
    hints:['교차곱.'] },
  { id:'u5-l3-08', level:3, type:'num', tags:['전위계/전류계 오차'], src:'기출 유형',
    params:{ R:{choices:[1000,10000],unit:'Ω'}, Rv:{choices:[100],unit:'kΩ'} },
    statement:function(p){ return 'R='+p.R+' Ω를 전압계(R_V='+p.Rv+' kΩ)로 병렬 측정하면 몇 % 작게 읽히는가?'; },
    solve:function(p){
      var Rp=p.R*p.Rv*1000/(p.R+p.Rv*1000);
      var err=(1-Rp/p.R)*100;
      return { ans:err, unit:'%', steps:[
        '측정값 = R∥R_V = '+SVH.fmt(Rp)+' Ω',
        '오차 = '+SVH.fmt(err)+' % (R가 R_V에 비해 클수록 악화 — 계측 부하 효과)' ] }; },
    hints:['병렬이 항상 작다.'] },
  { id:'u5-l3-09', level:3, type:'num', tags:['RC 에너지 수지'], src:'기출 유형',
    params:{ emf:{choices:[10,20],unit:'V'}, C:{choices:[100,220],unit:'µF'} },
    statement:function(p){ return 'RC 충전 완료까지 (a) 전지가 공급한 에너지 (b) C에 저장된 에너지 (c) R에서 소산(µJ) — R값과 무관함을 보여라. (ℰ='+p.emf+' V, C='+p.C+' µF)'; },
    solve:function(p){
      var Q=p.C*p.emf, Eb=Q*p.emf, Ec=0.5*Q*p.emf;
      return { ans:{Eb:Eb, Ec:Ec, Er:Ec}, unit:{Eb:'µJ', Ec:'µJ', Er:'µJ'}, steps:[
        '전지: Qℰ = '+SVH.fmt(Eb)+' µJ',
        'C: ½Qℰ = '+SVH.fmt(Ec)+' µJ → R 소산 = 나머지 절반 '+SVH.fmt(Ec)+' µJ',
        '(충전 효율 50% — 전전개 U6-l4-07과 같은 정리, 물리답게 다시)' ] }; },
    hints:['Qℰ와 ½Qℰ.'] },
  { id:'u5-l3-10', level:3, type:'num', tags:['배선 규격'], src:'기출 유형',
    params:{ P:{choices:[3000,5000],unit:'W'}, V:{choices:[220],unit:'V'}, L:{choices:[20,30],unit:'m'}, loss:{choices:[2,5],unit:'%'} },
    statement:function(p){ return p.V+' V·'+p.P+' W 부하까지 왕복 '+2*p.L+' m 배선. 손실을 '+p.loss+'% 이하로 하려면 (a) 최대 배선 저항 (b) 구리선 최소 단면적(mm²)을 구하라.'; },
    solve:function(p){
      var I=p.P/p.V;
      var Rmax=p.loss/100*p.P/(I*I);
      var A=1.7e-8*2*p.L/Rmax*1e6;
      return { ans:{Rmax:Rmax, A:A}, unit:{Rmax:'Ω', A:'mm²'}, steps:[
        'I = P/V = '+SVH.fmt(I)+' A, 손실 I²R ≤ '+SVH.fmt(p.loss/100*p.P)+' W → R ≤ '+SVH.fmt(Rmax)+' Ω',
        'A = ρ(2L)/R = '+SVH.fmt(A)+' mm² (전선 굵기 규격표의 물리)' ] }; },
    hints:['손실 조건→R→A.'] },
  { id:'u5-l3-11', level:3, type:'num', tags:['비저항 미시식'], src:'강의자료 대조',
    params:{ tau:{choices:[2.5],unit:'×10⁻¹⁴ s'} },
    statement:function(p){ return '드루드 모형 \\(\\rho=m/(ne^2\\tau)\\)로 구리(n=8.5×10²⁸, τ='+p.tau+'×10⁻¹⁴ s)의 비저항을 구하고 실측 1.7×10⁻⁸과 비교하라(Ω·m).'; },
    solve:function(p){
      var rho=9.11e-31/(8.5e28*Math.pow(1.602e-19,2)*p.tau*1e-14);
      return { ans:rho, unit:'Ω·m', steps:[
        'ρ = m/(ne²τ) = '+SVH.fmt(rho)+' Ω·m',
        '실측과 같은 오더 — 고전 모형의 성공(비열은 실패 → 양자로, 기말 예고)' ] }; },
    hints:['상수 대입 신중히.'] },
  { id:'u5-l3-12', level:3, type:'num', tags:['퓨즈 설계'], src:'창작 문제(검산됨)',
    params:{ V:{choices:[220],unit:'V'}, Imax:{choices:[15,20],unit:'A'} },
    statement:function(p){ return p.V+' V 회로의 '+p.Imax+' A 차단기: (a) 허용 최대 부하 전력(kW) (b) 1.5 kW 기기 몇 대까지 동시 사용 가능한가?'; },
    solve:function(p){
      var P=p.V*p.Imax/1000;
      return { ans:{P:P, n:Math.floor(P/1.5)}, unit:{P:'kW', n:'대'}, steps:[
        'P_max = VI = '+SVH.fmt(P)+' kW',
        '1.5 kW × n ≤ P_max → n = '+Math.floor(P/1.5)+'대 (가정 배전의 산수)' ] }; },
    hints:['P=VI, 내림.'] },
  { id:'u5-l3-13', level:3, type:'num', tags:['RC 반충전 시간'], src:'창작 문제(검산됨)',
    params:{ R:{choices:[10,100],unit:'kΩ'}, C:{choices:[10,100],unit:'µF'} },
    statement:function(p){ return 'RC 충전(R='+p.R+' kΩ, C='+p.C+' µF)에서 (a) 절반 충전 시간 (b) 90% 충전 시간(s)을 구하라.'; },
    solve:function(p){
      var tau=p.R*1000*p.C*1e-6;
      return { ans:{t50:tau*Math.LN2, t90:tau*Math.log(10)}, unit:{t50:'s', t90:'s'}, steps:[
        't₅₀ = τln2 = '+SVH.fmt(tau*Math.LN2)+' s',
        't₉₀ = τln10 = '+SVH.fmt(tau*Math.log(10))+' s' ] }; },
    hints:['ln2와 ln10.'] },
  { id:'u5-l3-14', level:3, type:'num', tags:['제세동기'], src:'기출 유형',
    params:{ C:{choices:[100,150],unit:'µF'}, V:{choices:[2,4],unit:'kV'}, t:{choices:[2,10],unit:'ms'} },
    statement:function(p){ return '제세동기: C='+p.C+' µF를 '+p.V+' kV로 충전 후 '+p.t+' ms에 방출. (a) 에너지(J) (b) 평균 전력(kW)을 구하라.'; },
    solve:function(p){
      var U=0.5*p.C*1e-6*Math.pow(p.V*1000,2);
      return { ans:{U:U, P:U/(p.t/1000)/1000}, unit:{U:'J', P:'kW'}, steps:[
        'U = ½CV² = '+SVH.fmt(U)+' J',
        'P_avg = U/Δt = '+SVH.fmt(U/(p.t/1000)/1000)+' kW (축전기 = 순간 방출 전문가)' ] }; },
    hints:['U와 U/t.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u5-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 전구가 즉시 켜지는 것은 장의 전파 때문이지 전자의 이동 속도 때문이 아니다<br>㉡ RC 충전의 에너지 효율은 R와 무관하게 50%다<br>㉢ 직렬 연결된 전구는 정격 W가 작은 쪽이 더 밝다<br>㉣ 전압계는 입력저항이 클수록, 전류계는 작을수록 좋다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — ㉢은 l3-02의 반직관 결과.' },
  { id:'u5-l4-02', level:4, type:'num', tags:['다중 고리 완주'], src:'기출 유형',
    params:{ e1:{choices:[12,15],unit:'V'}, e2:{choices:[6,9],unit:'V'}, R:{choices:[2,3],unit:'Ω'} },
    statement:function(p){ return '모든 저항 R='+p.R+' Ω: ℰ₁('+p.e1+' V)-R-[중앙 R]-R-ℰ₂('+p.e2+' V, 반대 방향으로 미는 극성) 사다리. 중앙 R의 전류(A)와 방향(ℰ₁쪽 우세=1)을 구하라.'; },
    solve:function(p){
      // 절점 v (중앙 저항 위): (e1-v)/(2R)... 구조: e1-R-node-R-e2, node-R-접지
      var v=(p.e1/(2*p.R)+p.e2/(2*p.R))/(1/(2*p.R)+1/(2*p.R)+1/p.R);
      var I=v/p.R;
      return { ans:{I:I, dir:1}, unit:{I:'A', dir:''}, steps:[
        '절점법: (ℰ₁−v)/2R+(ℰ₂−v)/2R = v/R → v = '+SVH.fmt(v)+' V',
        'I_중앙 = v/R = '+SVH.fmt(I)+' A (두 전지가 협력해 밀어넣는 구조로 정리)' ] }; },
    hints:['가지 저항 합부터.'] },
  { id:'u5-l4-03', level:4, type:'derive', tags:['유도'], src:'강의자료 대조',
    statement:'RC 충전 에너지 효율 50%(R 무관)를 적분으로 증명하라.',
    steps:[
      '충전 전류 \\(i=({\\mathcal{E}}/{R})e^{-t/RC}\\) [왜] U6/전 단원 결과 소환',
      'R 소산: \\(W_R=\\int_0^\\infty i^2R\\,dt=\\dfrac{\\mathcal{E}^2}{R}\\cdot\\dfrac{RC}{2}=\\tfrac12C\\mathcal{E}^2\\) — R이 소거!',
      '전지 공급: \\(W_b=\\int \\mathcal{E}i\\,dt=\\mathcal{E}Q=C\\mathcal{E}^2\\)',
      '저장: \\(U_C=\\tfrac12C\\mathcal{E}^2\\) → 수지: 공급 = 저장 + 소산, 정확히 반반',
      '극한 체크: R→0에도 비율 불변(빨라질 뿐) ✓ · 차원: [C][V²]=[J] ✓'
    ],
    hints:['e^{-2t/RC} 적분에서 R이 사라지는 순간을 봐라.'],
    expl:'"왜 하필 절반?"의 완전한 답 — 서술형·구술형 단골.' },
  { id:'u5-l4-04', level:4, type:'num', tags:['전지 직·병렬 설계'], src:'기출 유형',
    params:{ emf:{choices:[1.5],unit:'V'}, r:{choices:[0.5],unit:'Ω'}, R:{choices:[1,4],unit:'Ω'} },
    statement:function(p){ return 'AA 전지(1.5 V, r=0.5 Ω) 4개로 R='+p.R+' Ω 부하 전류를 최대로 하려면 (a) 4직렬 (b) 2×2 (c) 4병렬 중 무엇인가? 각 전류(A)를 구하라. (최적: a=1/b=2/c=3)'; },
    solve:function(p){
      var Is=4*1.5/(4*0.5+p.R);
      var Ib=2*1.5/(0.5+p.R);
      var Ip=1.5/(0.125+p.R);
      var best=Is>=Ib&&Is>=Ip?1:(Ib>=Ip?2:3);
      return { ans:{Is:Is, Ib:Ib, Ip:Ip, best:best}, unit:{Is:'A', Ib:'A', Ip:'A', best:''}, steps:[
        '4직렬: 6V/(2+R) = '+SVH.fmt(Is)+' A · 2×2: 3V/(0.5+R) = '+SVH.fmt(Ib)+' A · 4병렬: 1.5V/(0.125+R) = '+SVH.fmt(Ip)+' A',
        '최적 = '+best+' (규칙: R≫r → 직렬, R≪r → 병렬, R≈r → 정방 배열)',
        '(배터리팩 설계의 근본 문제)' ] }; },
    hints:['R과 r의 크기 비교가 답을 정한다.'] },
  { id:'u5-l4-05', level:4, type:'num', tags:['2C-RC 회로'], src:'기출 유형',
    params:{ emf:{choices:[12,24],unit:'V'}, R1:{choices:[2,4],unit:'kΩ'}, R2:{choices:[4,6],unit:'kΩ'}, C:{choices:[10,20],unit:'µF'} },
    statement:function(p){ return 'ℰ('+p.emf+' V)-R₁-node, node-R₂-접지, node-C-접지 회로(RC 표준형). (a) t=0⁺ C 전류 (b) t→∞ v_C (c) τ(ms)를 구하라. (R kΩ, C µF)'; },
    solve:function(p){
      var i0=p.emf/p.R1; // mA
      var vinf=p.emf*p.R2/(p.R1+p.R2);
      var tau=p.R1*p.R2/(p.R1+p.R2)*p.C; // ms
      return { ans:{i0:i0, vinf:vinf, tau:tau}, unit:{i0:'mA', vinf:'V', tau:'ms'}, steps:[
        't=0⁺: C 단락 → i_C = ℰ/R₁ = '+SVH.fmt(i0)+' mA',
        '∞: 분압 '+SVH.fmt(vinf)+' V',
        'τ = (R₁∥R₂)C = '+SVH.fmt(tau)+' ms — 전전개 U6-l3-01의 물리 서술판' ] }; },
    hints:['3종 세트 절차.'] },
  { id:'u5-l4-06', level:4, type:'num', tags:['필라멘트 온도 추정'], src:'기출 유형',
    params:{ Rc:{choices:[10,15],unit:'Ω'}, P:{choices:[60,100],unit:'W'}, V:{choices:[120],unit:'V'} },
    statement:function(p){ return '전구('+p.P+' W/'+p.V+' V)의 상온(20°C) 저항이 '+p.Rc+' Ω이다. 텅스텐 α=4.5×10⁻³/°C로 동작 온도(°C)를 추정하라.'; },
    solve:function(p){
      var Rh=p.V*p.V/p.P;
      var T=20+(Rh/p.Rc-1)/4.5e-3;
      return { ans:T, unit:'°C', steps:[
        '동작 R = V²/P = '+SVH.fmt(Rh)+' Ω ('+SVH.fmt(Rh/p.Rc)+'배!)',
        'T = 20+(R/R₀−1)/α = '+SVH.fmt(T)+' °C (~2500°C 백열 — 켤 때 돌입전류의 이유)' ] }; },
    hints:['R비→ΔT.'] },
  { id:'u5-l4-07', level:4, type:'num', tags:['RC 깜빡이'], src:'기출 유형',
    params:{ emf:{choices:[90,120],unit:'V'}, Vf:{choices:[60,80],unit:'V'}, R:{choices:[1,2],unit:'MΩ'}, C:{choices:[1,2],unit:'µF'} },
    constraint:function(p){ return p.Vf<p.emf*0.9; },
    statement:function(p){ return '네온등 이완 발진기: C('+p.C+' µF)가 R('+p.R+' MΩ)로 충전되다 V_f='+p.Vf+' V에서 방전(점등)을 반복한다. 점멸 주기(s)를 구하라. (ℰ='+p.emf+' V, 방전 시간 무시)'; },
    solve:function(p){
      var tau=p.R*1e6*p.C*1e-6;
      var T=tau*Math.log(p.emf/(p.emf-p.Vf));
      return { ans:T, unit:'s', steps:[
        '충전 조건: V_f = ℰ(1−e^{−T/τ})',
        'T = τln[ℰ/(ℰ−V_f)] = '+SVH.fmt(T)+' s',
        '(RC로 시계 만들기 — 방향지시등·와이퍼의 원조)' ] }; },
    hints:['도달 시간 역산.'] },
  { id:'u5-l4-08', level:4, type:'num', tags:['에너지 오더 비교'], src:'기출 유형',
    params:{ C:{choices:[3000],unit:'F'}, V:{choices:[2.7],unit:'V'}, Wh:{choices:[10,12],unit:'Wh'} },
    statement:function(p){ return '수퍼커패시터(C='+p.C+' F, '+p.V+' V)와 리튬전지('+p.Wh+' Wh): (a) 커패시터 에너지(Wh) (b) 전지/커패시터 비를 구하고, 그럼에도 커패시터를 쓰는 이유를 답하라.'; },
    solve:function(p){
      var U=0.5*p.C*p.V*p.V/3600;
      return { ans:{U:U, ratio:p.Wh/U}, unit:{U:'Wh', ratio:'배'}, steps:[
        'U = ½CV² = '+SVH.fmt(0.5*p.C*p.V*p.V)+' J = '+SVH.fmt(U)+' Wh',
        '전지가 '+SVH.fmt(p.Wh/U)+'배 — 그러나 커패시터는 수십만 사이클·순간 대전력(l3-14)',
        '(에너지 밀도 vs 전력 밀도 — 소자 선택의 언어)' ] }; },
    hints:['J→Wh는 /3600.'] }
  ]
});
