/* U7 주파수응답·필터 — H(jω), LPF/HPF, -3dB 차단, dB, 보드 개형, 2차(RLC) 기초 */
SV_BANK.push({
  id: 'u7', no: 7, title: '주파수응답·필터', titleEn: 'Frequency Response & Filters',
  scope: '전달함수 H(jω) · 저역/고역통과 · 차단주파수(−3dB) · 데시벨 · 보드 개형 · RLC 2차 특성(ζ, ω₀) 기초',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u7-l1-01', level:1, type:'mc', tags:['H(jω)'], src:'교재 표준',
    statement:'주파수 응답 함수 \\(H(j\\omega)=\\mathbf{V}_{out}/\\mathbf{V}_{in}\\)에 대한 설명으로 옳은 것은?',
    choices:['크기 |H|는 이득, 각 ∠H는 출력의 위상 이동을 뜻한다','H는 항상 실수다','H는 입력 진폭에 따라 변한다','시간영역 과도응답을 직접 준다'],
    answer:0, expl:'선형 회로에서 H는 ω만의 복소함수. 입력 크기와 무관(선형성) — 정상상태 정현파 도구다.' },
  { id:'u7-l1-02', level:1, type:'mc', tags:['LPF 구조'], src:'기출 유형',
    statement:'저항 R과 축전기 C 각 1개로 저역통과 필터(LPF)를 만들 때 올바른 구성은?',
    choices:['R 직렬 + C에서 출력(출력을 C 양단에서)','C 직렬 + R에서 출력','R·C 병렬 후 직렬 출력','어느 쪽이든 같다'],
    answer:0, expl:'기출 6(a). 저주파: C 개방 → 입력 그대로 통과. 고주파: C 단락 → 출력 0. 출력을 R에서 따면 반대로 HPF.' },
  { id:'u7-l1-03', level:1, type:'tf', tags:['-3dB'], src:'교재 표준',
    statement:'차단 주파수 \\(\\omega_0=1/RC\\)에서 1차 필터의 이득은 최대의 \\(1/\\sqrt{2}\\)(≈0.707, −3 dB)이고 위상은 −45°다.',
    answer:true, expl:'|H|=1/√(1+1)=1/√2, ∠H=−tan⁻¹(1)=−45°. 전력으로는 절반이라 "반전력점"이라고도 한다.' },
  { id:'u7-l1-04', level:1, type:'mc', tags:['보드 기울기'], src:'교재 표준',
    statement:'1차 저역통과 필터에서 ω ≫ ω₀ 영역의 |H| 감쇠 기울기는?',
    choices:['−20 dB/decade (= −6 dB/octave)','−40 dB/decade','−3 dB/decade','0 dB/decade'],
    answer:0, expl:'|H|≈ω₀/ω → 10배마다 1/10 = −20 dB. 2차면 −40 dB/dec — 차수가 기울기를 정한다.' },
  { id:'u7-l1-05', level:1, type:'tf', tags:['위상 극한'], src:'기출 유형',
    statement:'1차 RC 저역통과 필터의 위상은 ω→0에서 0°, ω=ω₀에서 −45°, ω→∞에서 −90°로 변한다.',
    answer:true, expl:'기출 6(c)의 3점 세트. ∠H = −tan⁻¹(ω/ω₀)의 세 극한값이다.' },
  { id:'u7-l1-06', level:1, type:'mc', tags:['2차 분류'], src:'교재 표준',
    statement:'직렬 RLC 회로의 감쇠 특성 분류로 옳은 것은? (\\(\\zeta\\) = 감쇠비)',
    choices:['ζ<1 부족감쇠(진동), ζ=1 임계감쇠, ζ>1 과감쇠','ζ<1 과감쇠','ζ는 항상 1','ζ>1이면 진동한다'],
    answer:0, expl:'ζ = (R/2)√(C/L). 부족감쇠일 때만 링잉(진동)이 보인다 — 스코프 파형 판독 기준.' },

  /* ---------- L2 (12) ---------- */
  { id:'u7-l2-01', level:2, type:'num', tags:['차단주파수'], src:'기출 유형',
    params:{ R:{choices:[1,4.7,10],unit:'kΩ'}, C:{choices:[10,100,470],unit:'nF'} },
    statement:function(p){ return 'R='+p.R+' kΩ, C='+p.C+' nF인 RC 필터의 (a) ω₀(rad/s) (b) f₀(Hz)를 구하라.'; },
    solve:function(p){ var w0=1/(p.R*1000*p.C*1e-9), f0=w0/(2*Math.PI);
      return { ans:{w0:w0, f0:f0}, unit:{w0:'rad/s', f0:'Hz'}, steps:[
        'ω₀ = 1/RC = 1/('+SVH.fmt(p.R*1000)+'×'+SVH.fmt(p.C*1e-9)+') = '+SVH.fmt(w0)+' rad/s',
        'f₀ = ω₀/2π = '+SVH.fmt(f0)+' Hz' ] }; },
    hints:['ω₀=1/RC, f=ω/2π.'] },
  { id:'u7-l2-02', level:2, type:'num', tags:['LPF 이득'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[0.5,1,2,5,10]} },
    statement:function(p){ return '1차 LPF에서 ω='+p.k+'ω₀일 때 |H|를 구하라.'; },
    solve:function(p){ var m=1/Math.sqrt(1+p.k*p.k);
      return { ans:m, unit:'', steps:[
        '|H| = 1/√(1+(ω/ω₀)²) = 1/√(1+'+p.k+'²)',
        '= '+SVH.fmt(m)+(p.k===1?' (−3dB 지점 ✓)':'') ] }; },
    hints:['정규화 ω/ω₀만 대입.'] },
  { id:'u7-l2-03', level:2, type:'num', tags:['dB 변환'], src:'창작 문제(검산됨)',
    params:{ g:{choices:[0.01,0.1,0.5,2,10,100]} },
    statement:function(p){ return '전압 이득 '+p.g+'를 데시벨로 변환하라.'; },
    solve:function(p){ var db=20*Math.log10(p.g);
      return { ans:db, unit:'dB', steps:[
        'dB = 20log₁₀|H| = 20log₁₀('+p.g+')',
        '= '+SVH.fmt(db)+' dB (10배=+20dB, 절반≈−6dB 등 기준점을 외워두면 빠르다)' ] }; },
    hints:['전압비는 20log.'] },
  { id:'u7-l2-04', level:2, type:'num', tags:['위상'], src:'기출 유형',
    params:{ k:{choices:[0.5,1,2,4]} },
    statement:function(p){ return '1차 LPF에서 ω='+p.k+'ω₀일 때 위상 ∠H(°)를 구하라.'; },
    solve:function(p){ var ph=-SVH.deg(Math.atan(p.k));
      return { ans:ph, unit:'°', steps:[
        '∠H = −tan⁻¹(ω/ω₀) = −tan⁻¹('+p.k+')',
        '= '+SVH.fmt(ph)+'°' ] }; },
    hints:['위상은 arctan.'] },
  { id:'u7-l2-05', level:2, type:'num', tags:['HPF 이득'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[0.1,0.5,1,2]} },
    statement:function(p){ return '1차 고역통과 필터(HPF)에서 ω='+p.k+'ω₀일 때 |H|를 구하라.'; },
    solve:function(p){ var m=p.k/Math.sqrt(1+p.k*p.k);
      return { ans:m, unit:'', steps:[
        'HPF: |H| = (ω/ω₀)/√(1+(ω/ω₀)²) = '+p.k+'/√(1+'+p.k+'²)',
        '= '+SVH.fmt(m)+' (LPF와 거울상)' ] }; },
    hints:['분자에 ω/ω₀가 올라온다.'] },
  { id:'u7-l2-06', level:2, type:'num', tags:['설계 C'], src:'기출 유형',
    params:{ f0:{choices:[100,1000,5000],unit:'Hz'}, R:{choices:[1,10],unit:'kΩ'} },
    statement:function(p){ return '차단 주파수 f₀='+p.f0+' Hz인 RC LPF를 R='+p.R+' kΩ로 만들려 한다. C(nF)를 구하라.'; },
    solve:function(p){ var C=1/(2*Math.PI*p.f0*p.R*1000)*1e9;
      return { ans:C, unit:'nF', steps:[
        'C = 1/(2πf₀R)',
        '= 1/(2π×'+p.f0+'×'+SVH.fmt(p.R*1000)+') = '+SVH.fmt(C)+' nF' ] }; },
    hints:['f₀=1/2πRC를 C로.'] },
  { id:'u7-l2-07', level:2, type:'num', tags:['감쇠량 dB'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[10,100,1000]} },
    statement:function(p){ return '1차 LPF에서 잡음 주파수가 ω='+p.k+'ω₀에 있다. 그 주파수에서의 감쇠량(dB, 근사 아님 정확값)을 구하라.'; },
    solve:function(p){ var db=-20*Math.log10(Math.sqrt(1+p.k*p.k));
      return { ans:db, unit:'dB', steps:[
        '|H| = 1/√(1+'+p.k+'²) → dB = −20log₁₀√(1+'+p.k+'²)',
        '= '+SVH.fmt(db)+' dB (근사 −20log'+p.k+' = '+SVH.fmt(-20*Math.log10(p.k))+' dB와 비교)' ] }; },
    hints:['정확식과 점근 근사를 둘 다.'] },
  { id:'u7-l2-08', level:2, type:'num', tags:['RLC ω₀·ζ'], src:'창작 문제(검산됨)',
    params:{ R:{choices:[10,40,100],unit:'Ω'}, L:{choices:[10,40],unit:'mH'}, C:{choices:[1,10],unit:'µF'} },
    statement:function(p){ return '직렬 RLC: R='+p.R+' Ω, L='+p.L+' mH, C='+p.C+' µF. (a) ω₀ (b) 감쇠비 ζ를 구하라.'; },
    solve:function(p){
      var L=p.L/1000, C=p.C*1e-6;
      var w0=1/Math.sqrt(L*C), z=p.R/2*Math.sqrt(C/L);
      return { ans:{w0:w0, z:z}, unit:{w0:'rad/s', z:''}, steps:[
        'ω₀ = 1/√(LC) = '+SVH.fmt(w0)+' rad/s',
        'ζ = (R/2)√(C/L) = '+SVH.fmt(z)+' → '+(z<1?'부족감쇠(진동)':(z>1?'과감쇠':'임계감쇠')) ] }; },
    hints:['ζ 공식의 √(C/L)에 주의(반대로 쓰기 쉬움).'] },
  { id:'u7-l2-09', level:2, type:'num', tags:['임계 저항'], src:'창작 문제(검산됨)',
    params:{ L:{choices:[10,100],unit:'mH'}, C:{choices:[0.1,1,10],unit:'µF'} },
    statement:function(p){ return 'L='+p.L+' mH, C='+p.C+' µF 직렬 RLC가 임계감쇠가 되는 저항 R을 구하라.'; },
    solve:function(p){ var R=2*Math.sqrt(p.L/1000/(p.C*1e-6));
      return { ans:R, unit:'Ω', steps:[
        'ζ=1 → R = 2√(L/C)',
        '= 2√('+SVH.fmt(p.L/1000)+'/'+SVH.fmt(p.C*1e-6)+') = '+SVH.fmt(R)+' Ω',
        '(이보다 작으면 링잉, 크면 느릿한 과감쇠)' ] }; },
    hints:['ζ=1 조건을 R로.'] },
  { id:'u7-l2-10', level:2, type:'num', tags:['출력 진폭'], src:'기출 유형',
    params:{ Vin:{choices:[2,5,10],unit:'V'}, k:{choices:[0.5,2,3]} },
    statement:function(p){ return '진폭 '+p.Vin+' V, ω='+p.k+'ω₀인 정현파가 1차 LPF를 지난다. 출력 진폭을 구하라.'; },
    solve:function(p){ var v=p.Vin/Math.sqrt(1+p.k*p.k);
      return { ans:v, unit:'V', steps:[
        'V_out = V_in·|H| = '+p.Vin+'/√(1+'+p.k+'²)',
        '= '+SVH.fmt(v)+' V' ] }; },
    hints:['|H|를 곱하면 끝.'] },
  { id:'u7-l2-11', level:2, type:'num', tags:['보드 점근'], src:'창작 문제(검산됨)',
    params:{ dec:{choices:[1,2,3]} },
    statement:function(p){ return '1차 LPF의 점근 보드 선도에서 ω₀보다 '+p.dec+' decade 위 주파수의 근사 이득(dB)은?'; },
    solve:function(p){ var db=-20*p.dec;
      return { ans:db, unit:'dB', steps:[
        '점근선: ω₀ 이후 −20 dB/decade',
        p.dec+' decade → '+SVH.fmt(db)+' dB' ] }; },
    hints:['기울기 × decade 수.'] },
  { id:'u7-l2-12', level:2, type:'num', tags:['감쇠 진동수'], src:'창작 문제(검산됨)',
    params:{ w0:{choices:[100,1000],unit:'rad/s'}, z:{choices:[0.2,0.5,0.8]} },
    statement:function(p){ return 'ω₀='+p.w0+' rad/s, ζ='+p.z+'인 부족감쇠 2차계의 감쇠 진동수 \\(\\omega_d=\\omega_0\\sqrt{1-\\zeta^2}\\)를 구하라.'; },
    solve:function(p){ var wd=p.w0*Math.sqrt(1-p.z*p.z);
      return { ans:wd, unit:'rad/s', steps:[
        'ω_d = '+p.w0+'×√(1−'+p.z+'²)',
        '= '+SVH.fmt(wd)+' rad/s (실제 링잉의 주파수 — ζ가 클수록 느려진다)' ] }; },
    hints:['√(1−ζ²)만 붙이면 된다.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u7-l3-01', level:3, type:'num', tags:['기출 6 설계'], src:'기출 유형',
    params:{ ws:{choices:[2,5,10],unit:'rad/s'}, wn:{choices:[2000,5000],unit:'rad/s'}, R:{choices:[1,10],unit:'kΩ'} },
    statement:function(p){ return '로봇팔 전위차계 신호(최대 ω='+p.ws+' rad/s)에 ω≳'+p.wn+' rad/s 잡음이 실린다. R='+p.R+' kΩ로 RC LPF를 만들되 차단을 신호 최대의 10배(ω₀=10×'+p.ws+')에 두기로 했다. (a) C(µF) (b) 그때 잡음('+p.wn+' rad/s)의 감쇠량(dB)을 구하라.'; },
    solve:function(p){
      var w0=10*p.ws, C=1/(w0*p.R*1000)*1e6;
      var k=p.wn/w0, att=-20*Math.log10(Math.sqrt(1+k*k));
      return { ans:{C:C, att:att}, unit:{C:'µF', att:'dB'}, steps:[
        'ω₀ = '+w0+' rad/s → C = 1/(ω₀R) = '+SVH.fmt(C)+' µF',
        '잡음 위치 ω/ω₀ = '+SVH.fmt(k)+' → |H| = 1/√(1+'+SVH.fmt(k)+'²)',
        '감쇠 = '+SVH.fmt(att)+' dB — 신호(ω≤ω₀/10)는 거의 무손실, 잡음만 죽는다 (기출 6의 완성형)' ] }; },
    hints:['차단을 신호와 잡음 "사이"에.','신호 손실과 잡음 감쇠를 모두 확인.'] },
  { id:'u7-l3-02', level:3, type:'num', tags:['H(ω) 값 계산'], src:'기출 유형',
    params:{ R:{choices:[1,2],unit:'kΩ'}, C:{choices:[1,0.5],unit:'µF'}, w:{choices:[500,1000,2000],unit:'rad/s'} },
    statement:function(p){ return 'RC LPF(R='+p.R+' kΩ, C='+p.C+' µF)의 ω='+p.w+' rad/s에서 |H|와 ∠H(°)를 구하라.'; },
    solve:function(p){
      var w0=1/(p.R*1000*p.C*1e-6), k=p.w/w0;
      var m=1/Math.sqrt(1+k*k), ph=-SVH.deg(Math.atan(k));
      return { ans:{mag:m, ph:ph}, unit:{mag:'', ph:'°'}, steps:[
        'ω₀ = 1/RC = '+SVH.fmt(w0)+' rad/s → ω/ω₀ = '+SVH.fmt(k),
        '|H| = '+SVH.fmt(m)+', ∠H = −tan⁻¹('+SVH.fmt(k)+') = '+SVH.fmt(ph)+'°' ] }; },
    hints:['ω₀부터 계산해 정규화.'] },
  { id:'u7-l3-03', level:3, type:'num', tags:['HPF 허밍 제거'], src:'창작 문제(검산됨)',
    params:{ f0:{choices:[300,500],unit:'Hz'}, fh:{choices:[50,60],unit:'Hz'} },
    statement:function(p){ return '오디오 입력에서 '+p.fh+' Hz 전원 험을 줄이려 f₀='+p.f0+' Hz HPF를 쓴다. (a) 험의 감쇠량(dB) (b) 1 kHz 신호의 이득을 구하라.'; },
    solve:function(p){
      var k1=p.fh/p.f0, att=20*Math.log10(k1/Math.sqrt(1+k1*k1));
      var k2=1000/p.f0, g=k2/Math.sqrt(1+k2*k2);
      return { ans:{att:att, g:g}, unit:{att:'dB', g:''}, steps:[
        '험: ω/ω₀ = '+SVH.fmt(k1)+' → |H| = '+SVH.fmt(k1/Math.sqrt(1+k1*k1))+' = '+SVH.fmt(att)+' dB',
        '1 kHz: ω/ω₀ = '+SVH.fmt(k2)+' → |H| = '+SVH.fmt(g)+' (거의 통과)',
        '(HPF는 "낮은 것"을 버리는 필터 — 용도 매칭 연습)' ] }; },
    hints:['HPF 식에 두 주파수를 각각.'] },
  { id:'u7-l3-04', level:3, type:'num', tags:['위상→주파수 역산'], src:'창작 문제(검산됨)',
    params:{ ph:{choices:[30,60],unit:'°'}, f0:{choices:[200,400],unit:'Hz'} },
    statement:function(p){ return 'f₀='+p.f0+' Hz인 1차 LPF의 출력 위상이 −'+p.ph+'°가 되는 주파수 f를 구하라.'; },
    solve:function(p){ var f=p.f0*Math.tan(SVH.rad(p.ph));
      return { ans:f, unit:'Hz', steps:[
        'tan('+p.ph+'°) = f/f₀',
        'f = '+p.f0+'×'+SVH.fmt(Math.tan(SVH.rad(p.ph)))+' = '+SVH.fmt(f)+' Hz',
        '(위상 측정으로 주파수·차단을 역산하는 실험 기법)' ] }; },
    hints:['위상식을 뒤집는다.'] },
  { id:'u7-l3-05', level:3, type:'num', tags:['RLC 판별'], src:'기출 유형',
    params:{ R:{choices:[20,100,400],unit:'Ω'}, L:{choices:[10],unit:'mH'}, C:{choices:[1],unit:'µF'} },
    statement:function(p){ return '직렬 RLC(R='+p.R+' Ω, L='+p.L+' mH, C='+p.C+' µF)의 스텝 응답 형태를 판별하라: (a) ζ (b) 임계 저항 (c) 판정(부족=−1, 임계=0, 과=1).'; },
    solve:function(p){
      var L=p.L/1000, C=p.C*1e-6;
      var Rc=2*Math.sqrt(L/C), z=p.R/Rc;
      var t=z<0.999?-1:(z>1.001?1:0);
      return { ans:{z:z, Rc:Rc, t:t}, unit:{z:'', Rc:'Ω', t:''}, steps:[
        'R_c = 2√(L/C) = '+SVH.fmt(Rc)+' Ω',
        'ζ = R/R_c = '+SVH.fmt(z),
        (t<0?'ζ<1 → 부족감쇠: 오버슈트·링잉이 보인다':(t>0?'ζ>1 → 과감쇠: 느린 단조 접근':'임계감쇠: 가장 빠른 무진동')) ] }; },
    hints:['임계 저항과 비교가 제일 빠르다.'] },
  { id:'u7-l3-06', level:3, type:'num', tags:['대역 선택'], src:'창작 문제(검산됨)',
    params:{ f1:{choices:[100],unit:'Hz'}, f2:{choices:[10000],unit:'Hz'} },
    statement:function(p){ return '신호 대역이 '+p.f1+' Hz~'+p.f2+' Hz다. 양끝에서 이득이 최소 0.9 이상이 되도록 (a) LPF 차단 f_L의 최소값 (b) HPF 차단 f_H의 최대값을 구하라.'; },
    solve:function(p){
      var kmax=Math.sqrt(1/(0.9*0.9)-1); // |H|=0.9 → k
      var fL=p.f2/kmax, fH=p.f1*kmax;
      return { ans:{fL:fL, fH:fH}, unit:{fL:'Hz', fH:'Hz'}, steps:[
        '|H|=0.9 → (ω/ω₀) = √(1/0.81−1) = '+SVH.fmt(kmax),
        'LPF: 최악은 '+p.f2+' Hz → f_L ≥ '+p.f2+'/'+SVH.fmt(kmax)+' = '+SVH.fmt(fL)+' Hz',
        'HPF: 최악은 '+p.f1+' Hz → f_H ≤ '+SVH.fmt(fH)+' Hz (대역 확보 설계의 기본기)' ] }; },
    hints:['이득 조건을 k로 바꿔 경계 주파수에 적용.'] },
  { id:'u7-l3-07', level:3, type:'num', tags:['직렬 2단 dB 합'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[2,5,10]} },
    statement:function(p){ return '동일한 1차 LPF 2단을 버퍼로 격리해 종속 연결했다. ω='+p.k+'ω₀에서 총 이득(dB)을 구하라.'; },
    solve:function(p){
      var db1=-20*Math.log10(Math.sqrt(1+p.k*p.k));
      return { ans:2*db1, unit:'dB', steps:[
        '1단 이득 = '+SVH.fmt(db1)+' dB',
        '종속(격리) = dB 합 → '+SVH.fmt(2*db1)+' dB (기울기도 −40 dB/dec로 — 2차 필터의 효과)' ] }; },
    hints:['dB는 곱을 합으로 바꾼다.'] },
  { id:'u7-l3-08', level:3, type:'num', tags:['|H|→주파수'], src:'창작 문제(검산됨)',
    params:{ att:{choices:[20,40],unit:'dB'}, f0:{choices:[100,1000],unit:'Hz'} },
    statement:function(p){ return 'f₀='+p.f0+' Hz LPF에서 감쇠가 정확히 '+p.att+' dB가 되는 주파수를 구하라.'; },
    solve:function(p){
      var g=Math.pow(10,-p.att/20), k=Math.sqrt(1/(g*g)-1);
      return { ans:p.f0*k, unit:'Hz', steps:[
        '|H| = 10^{−'+p.att+'/20} = '+SVH.fmt(g),
        'k = √(1/|H|²−1) = '+SVH.fmt(k)+' → f = '+SVH.fmt(p.f0*k)+' Hz',
        '(점근 근사 '+SVH.fmt(p.f0*Math.pow(10,p.att/20))+' Hz와 비교 — 큰 감쇠에선 거의 같다)' ] }; },
    hints:['dB→비율→k 순서로 역산.'] },
  { id:'u7-l3-09', level:3, type:'num', tags:['RL 필터'], src:'창작 문제(검산됨)',
    params:{ R:{choices:[100,500],unit:'Ω'}, L:{choices:[10,50],unit:'mH'}, k:{choices:[0.5,2]} },
    statement:function(p){ return 'RL 회로(직렬 L, 출력은 R 양단)는 어떤 필터인가? ω₀=R/L을 구하고 ω='+p.k+'ω₀에서 |H|를 구하라. (LPF=0, HPF=1로 유형 답)'; },
    solve:function(p){
      var w0=p.R/(p.L/1000), m=1/Math.sqrt(1+p.k*p.k);
      return { ans:{type:0, w0:w0, mag:m}, unit:{type:'', w0:'rad/s', mag:''}, steps:[
        '고주파: Z_L=jωL 커짐 → R 출력 작아짐 → 저역통과(0)',
        'ω₀ = R/L = '+SVH.fmt(w0)+' rad/s',
        '|H| = 1/√(1+(ω/ω₀)²) = '+SVH.fmt(m)+' (RC LPF와 같은 함수형!)' ] }; },
    hints:['극한(ω→0, ∞)으로 유형 판정.'] },
  { id:'u7-l3-10', level:3, type:'num', tags:['Q와 대역폭'], src:'창작 문제(검산됨)',
    params:{ w0:{choices:[1000,5000],unit:'rad/s'}, z:{choices:[0.05,0.1,0.25]} },
    statement:function(p){ return '직렬 RLC 대역통과 응답에서 ω₀='+p.w0+' rad/s, ζ='+p.z+'. (a) 품질계수 Q=1/(2ζ) (b) −3dB 대역폭 B=ω₀/Q를 구하라.'; },
    solve:function(p){ var Q=1/(2*p.z), B=p.w0/Q;
      return { ans:{Q:Q, B:B}, unit:{Q:'', B:'rad/s'}, steps:[
        'Q = 1/(2ζ) = '+SVH.fmt(Q),
        'B = ω₀/Q = '+SVH.fmt(B)+' rad/s (ζ가 작을수록 뾰족한 공진 — 라디오 선국의 원리)' ] }; },
    hints:['Q와 ζ는 역수 관계(×2).'] },
  { id:'u7-l3-11', level:3, type:'num', tags:['λ 근 계산'], src:'창작 문제(검산됨)',
    params:{ w0:{choices:[10,100],unit:'rad/s'}, z:{choices:[0.6,0.8]} },
    statement:function(p){ return '특성방정식 \\(s^2+2\\zeta\\omega_0 s+\\omega_0^2=0\\) (ω₀='+p.w0+', ζ='+p.z+')의 근의 (a) 실수부 (b) 허수부(양수 쪽)를 구하라.'; },
    solve:function(p){
      var re=-p.z*p.w0, im=p.w0*Math.sqrt(1-p.z*p.z);
      return { ans:{re:re, im:im}, unit:{re:'1/s', im:'rad/s'}, steps:[
        's = −ζω₀ ± jω₀√(1−ζ²)',
        '실수부 = '+SVH.fmt(re)+' (감쇠율), 허수부 = '+SVH.fmt(im)+' (=ω_d)',
        '(실수부가 지수 봉투, 허수부가 진동 주파수 — 파형 읽기와 직결)' ] }; },
    hints:['근의 공식 표준형 그대로.'] },
  { id:'u7-l3-12', level:3, type:'num', tags:['입력 스펙트럼 필터링'], src:'기출 유형',
    params:{ A1:{choices:[4,6],unit:'V'}, A2:{choices:[2,3],unit:'V'}, k2:{choices:[10,20]} },
    statement:function(p){ return '입력 \\(v_{in}='+p.A1+'\\cos(0.1\\omega_0 t)+'+p.A2+'\\cos('+p.k2+'\\omega_0 t)\\)가 1차 LPF를 지난다. 출력 각 성분의 진폭을 구하라.'; },
    solve:function(p){
      var g1=1/Math.sqrt(1+0.01), g2=1/Math.sqrt(1+p.k2*p.k2);
      return { ans:{V1:p.A1*g1, V2:p.A2*g2}, unit:{V1:'V', V2:'V'}, steps:[
        '선형 → 성분별 |H| 곱(중첩): 0.1ω₀: |H|='+SVH.fmt(g1)+' → '+SVH.fmt(p.A1*g1)+' V',
        p.k2+'ω₀: |H|='+SVH.fmt(g2)+' → '+SVH.fmt(p.A2*g2)+' V',
        '(신호는 살고 고주파만 죽는다 — 필터링의 정량 그림)' ] }; },
    hints:['주파수 성분마다 따로 |H|.'] },
  { id:'u7-l3-13', level:3, type:'num', tags:['버퍼 없는 2단 로딩'], src:'창작 문제(검산됨)',
    params:{ R:{choices:[1,10],unit:'kΩ'} },
    statement:function(p){ return '같은 R='+p.R+' kΩ·C인 RC LPF 2단을 버퍼 없이 직결하면 DC 근처(ω→0)에서 뒷단이 앞단에 주는 부하 때문에 이득이 1보다 작아질까? ω→0 극한 이득과, 부하 효과가 사라지는 이유를 답하라. (이득 값으로)'; },
    solve:function(p){
      return { ans:1, unit:'', steps:[
        'ω→0: C 개방 → 뒷단 입력 임피던스 ∞ → 부하 효과 없음',
        '따라서 DC 이득 = 1 (문제는 중간 주파수 — 거기선 상호작용으로 −3dB점이 이동한다)',
        '(버퍼가 필요한 이유는 "차단 근처"의 로딩 때문이라는 것까지)' ] }; },
    hints:['ω→0에서 C가 어떻게 보이는지.'] },
  { id:'u7-l3-14', level:3, type:'num', tags:['오버슈트'], src:'창작 문제(검산됨)',
    params:{ z:{choices:[0.2,0.4,0.6]} },
    statement:function(p){ return 'ζ='+p.z+'인 부족감쇠 2차계의 스텝 응답 오버슈트 \\(M_p=e^{-\\pi\\zeta/\\sqrt{1-\\zeta^2}}\\)를 %로 구하라.'; },
    solve:function(p){
      var Mp=Math.exp(-Math.PI*p.z/Math.sqrt(1-p.z*p.z))*100;
      return { ans:Mp, unit:'%', steps:[
        'M_p = e^{−πζ/√(1−ζ²)}×100',
        '= '+SVH.fmt(Mp)+' % (ζ 0.2→~53%, 0.7→~5% — 자동제어(MECH387)와 공유되는 공식)' ] }; },
    hints:['지수 안 분모의 √(1−ζ²).'] },

  /* ---------- L4 (8) ---------- */
  { id:'u7-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 수동 RC 필터의 통과대역 이득은 1을 넘을 수 없다<br>㉡ −3dB점에서 출력 전력은 절반이다<br>㉢ 1차 LPF의 위상은 −90°를 넘어 지연될 수 있다<br>㉣ 필터 차수가 높을수록 저지대역 기울기가 가파르다',
    choices:['㉠㉡㉣','㉠㉢','㉡㉢㉣','전부'],
    answer:0, expl:'1차는 −90°가 한계(㉢ ✗). 수동 소자는 증폭 불가·전력 절반·차수∝기울기 모두 표준 결과.' },
  { id:'u7-l4-02', level:4, type:'derive', tags:['기출 6(b) 유도'], src:'기출 유형',
    statement:'RC 저역통과 필터의 \\(H(j\\omega)=V_o/V_i\\)를 임피던스 분압으로 유도하고, 크기·위상 식과 세 극한(ω→0, ω₀, ∞)을 정리하라. (기출 6(b)·(c) 완전 재현)',
    steps:[
      '구성: 입력 → R 직렬 → 출력 = C 양단. 임피던스 분압: \\(H=\\dfrac{Z_C}{R+Z_C}=\\dfrac{1/j\\omega C}{R+1/j\\omega C}\\) [왜] AC에서 분압 법칙은 복소 임피던스로 그대로',
      '분자·분모에 jωC 곱: \\(H=\\dfrac{1}{1+j\\omega RC}=\\dfrac{1}{1+j\\omega/\\omega_0}\\), \\(\\omega_0=1/RC\\)',
      '크기: \\(|H|=1/\\sqrt{1+(\\omega/\\omega_0)^2}\\), 위상: \\(\\angle H=-\\tan^{-1}(\\omega/\\omega_0)\\)',
      '세 극한: ω→0 ⇒ |H|=1, 0° (통과) · ω=ω₀ ⇒ 1/√2(−3dB), −45° · ω→∞ ⇒ ω₀/ω→0, −90° (차단)',
      '차원 체크: ωRC = (1/s)(Ω)(F) = 무차원 ✓ · 극한이 DC(C 개방)·고주파(C 단락) 직관과 일치 ✓'
    ],
    hints:['분압 → 정규화(ω/ω₀) → 크기/위상 분리.','세 극한 값 6개(크기3+위상3)를 표로.'],
    expl:'기출 6(b)(c)가 요구하는 서술 전체. 이 유도를 통째로 쓸 수 있으면 15점 문항이 안정권이다.' },
  { id:'u7-l4-03', level:4, type:'num', tags:['기출 6 풀세트'], src:'기출 유형',
    params:{ wmax:{choices:[2],unit:'rad/s'}, wn:{choices:[2000],unit:'rad/s'}, C:{choices:[1,10],unit:'µF'}, marg:{choices:[10,20]} },
    statement:function(p){ return '기출 6 완전판: 신호 최대 ω='+p.wmax+' rad/s, 잡음 ω≳'+p.wn+' rad/s. 차단을 ω₀='+p.marg+'×'+p.wmax+' rad/s로 두고 C='+p.C+' µF를 쓴다. (a) R(kΩ) (b) 신호 최대 주파수에서의 이득 (c) 잡음 하한에서의 감쇠(dB)를 구하라.'; },
    solve:function(p){
      var w0=p.marg*p.wmax, R=1/(w0*p.C*1e-6)/1000;
      var ks=p.wmax/w0, gs=1/Math.sqrt(1+ks*ks);
      var kn=p.wn/w0, an=-20*Math.log10(Math.sqrt(1+kn*kn));
      return { ans:{R:R, gs:gs, an:an}, unit:{R:'kΩ', gs:'', an:'dB'}, steps:[
        'R = 1/(ω₀C) = '+SVH.fmt(R)+' kΩ',
        '신호: ω/ω₀ = '+SVH.fmt(ks)+' → |H| = '+SVH.fmt(gs)+' (사실상 무손실)',
        '잡음: ω/ω₀ = '+SVH.fmt(kn)+' → '+SVH.fmt(an)+' dB',
        '(차단 위치 선택의 트레이드오프: 너무 낮으면 신호 손실, 너무 높으면 잡음 잔존)' ] }; },
    hints:['ω₀부터 확정 → R → 두 주파수 평가.'] },
  { id:'u7-l4-04', level:4, type:'num', tags:['미지 필터 역공학'], src:'기출 유형',
    params:{ g1:{choices:[0.995,0.99]}, f1:{choices:[100],unit:'Hz'}, g2:{choices:[0.1,0.05]}, },
    statement:function(p){ return '측정: f₁='+p.f1+' Hz에서 |H|='+p.g1+', 어떤 f₂에서 |H|='+p.g2+'인 1차 LPF다. (a) f₀ (b) f₂를 구하라.'; },
    solve:function(p){
      var k1=Math.sqrt(1/(p.g1*p.g1)-1), f0=p.f1/k1;
      var k2=Math.sqrt(1/(p.g2*p.g2)-1), f2=f0*k2;
      return { ans:{f0:f0, f2:f2}, unit:{f0:'Hz', f2:'Hz'}, steps:[
        'f₁에서: (f₁/f₀) = √(1/|H|²−1) = '+SVH.fmt(k1)+' → f₀ = '+SVH.fmt(f0)+' Hz',
        'f₂ = f₀×√(1/'+p.g2+'²−1) = '+SVH.fmt(f2)+' Hz',
        '(측정 두 점이면 1차 필터는 완전히 결정된다)' ] }; },
    hints:['|H|→k 역산을 두 번.'] },
  { id:'u7-l4-05', level:4, type:'num', tags:['RLC 스텝 종합'], src:'기출 유형',
    params:{ R:{choices:[40,80],unit:'Ω'}, L:{choices:[10],unit:'mH'}, C:{choices:[2.5,10],unit:'µF'} },
    statement:function(p){ return '직렬 RLC(R='+p.R+' Ω, L='+p.L+' mH, C='+p.C+' µF)의 스텝 응답에 대해 (a) ω₀ (b) ζ (c) ω_d(부족감쇠 아니면 0) (d) 오버슈트 %(부족감쇠 아니면 0)를 구하라.'; },
    solve:function(p){
      var L=p.L/1000, C=p.C*1e-6;
      var w0=1/Math.sqrt(L*C), z=p.R/2*Math.sqrt(C/L);
      var wd=z<1?w0*Math.sqrt(1-z*z):0;
      var Mp=z<1?Math.exp(-Math.PI*z/Math.sqrt(1-z*z))*100:0;
      return { ans:{w0:w0, z:z, wd:wd, Mp:Mp}, unit:{w0:'rad/s', z:'', wd:'rad/s', Mp:'%'}, steps:[
        'ω₀ = 1/√(LC) = '+SVH.fmt(w0)+' rad/s, ζ = (R/2)√(C/L) = '+SVH.fmt(z),
        (z<1?'부족감쇠: ω_d = '+SVH.fmt(wd)+' rad/s':'ζ≥1: 진동 없음(ω_d=0)'),
        (z<1?'M_p = e^{−πζ/√(1−ζ²)} = '+SVH.fmt(Mp)+' %':'오버슈트 0 %'),
        '(2차 3대 수치: ω₀·ζ·M_p — MECH387 시간응답의 예고편)' ] }; },
    hints:['ζ 판정 후 분기.'] },
  { id:'u7-l4-06', level:4, type:'num', tags:['설계 트레이드오프'], src:'창작 문제(검산됨)',
    params:{ fs:{choices:[1000],unit:'Hz'}, fn:{choices:[50000],unit:'Hz'}, gmin:{choices:[0.95,0.99]}, amin:{choices:[26,32],unit:'dB'} },
    statement:function(p){ return '요구: 신호 f_s='+p.fs+' Hz에서 이득 ≥'+p.gmin+', 잡음 f_n='+SVH.si(p.fn,'Hz')+'에서 감쇠 ≥'+p.amin+' dB. 1차 LPF의 f₀ 허용 범위 [f₀min, f₀max]를 구하고, 설계 가능 여부를 판정하라(가능=1/불가=0).'; },
    solve:function(p){
      var kg=Math.sqrt(1/(p.gmin*p.gmin)-1), f0min_g=p.fs/kg;      // 신호 조건: f0 ≥ fs/kg
      var ga=Math.pow(10,-p.amin/20), ka=Math.sqrt(1/(ga*ga)-1);   // 잡음 조건: f0 ≤ fn/ka
      var f0max=p.fn/ka;
      var ok=f0min_g<=f0max?1:0;
      return { ans:{f0min:f0min_g, f0max:f0max, ok:ok}, unit:{f0min:'Hz', f0max:'Hz', ok:''}, steps:[
        '신호: (f_s/f₀) ≤ '+SVH.fmt(kg)+' → f₀ ≥ '+SVH.fmt(f0min_g)+' Hz',
        '잡음: (f_n/f₀) ≥ '+SVH.fmt(ka)+' → f₀ ≤ '+SVH.fmt(f0max)+' Hz',
        (ok?'교집합 존재 → 설계 가능(1). 여유를 반씩 두는 기하평균 f₀=√(min·max)가 무난':'교집합 없음(0) → 1차로는 불가: 2차 이상 필요 — 차수 선택의 근거'),
        ] }; },
    hints:['두 부등식을 f₀로 정리해 교집합.'] },
  { id:'u7-l4-07', level:4, type:'num', tags:['보드 스케치 수치'], src:'기출 유형',
    params:{ f0:{choices:[1000],unit:'Hz'} },
    statement:function(p){ return 'f₀='+p.f0+' Hz LPF의 보드 크기 선도를 그리기 위한 5점: f = 0.1f₀, f₀/2, f₀, 2f₀, 10f₀의 정확한 이득(dB)을 구하라.'; },
    solve:function(p){
      function db(k){ return -20*Math.log10(Math.sqrt(1+k*k)); }
      return { ans:{a:db(0.1), b:db(0.5), c:db(1), d:db(2), e:db(10)}, unit:{a:'dB',b:'dB',c:'dB',d:'dB',e:'dB'}, steps:[
        '0.1f₀: '+SVH.fmt(db(0.1))+' dB (≈0), 0.5f₀: '+SVH.fmt(db(0.5))+' dB',
        'f₀: '+SVH.fmt(db(1))+' dB (−3), 2f₀: '+SVH.fmt(db(2))+' dB, 10f₀: '+SVH.fmt(db(10))+' dB (≈−20)',
        '점근선(0dB, −20dB/dec)과의 최대 오차가 f₀에서 3dB — 스케치 채점 포인트' ] }; },
    hints:['각 점에 정확식 대입 — 점근선과 비교.'] },
  { id:'u7-l4-08', level:4, type:'num', tags:['실험: 스코프 링잉'], src:'기출 유형',
    params:{ T:{choices:[2,4],unit:'ms'}, r:{choices:[0.5,0.25]} },
    statement:function(p){ return '스텝 입력 후 스코프 파형: 진동 주기 '+p.T+' ms, 연속한 두 봉우리의 진폭비 '+p.r+'. (a) ω_d (b) 감쇠율 σ=−ln(r)/T (c) ζ를 구하라. (로그 감쇠법)'; },
    solve:function(p){
      var wd=2*Math.PI/(p.T/1000);
      var sg=-Math.log(p.r)/(p.T/1000);
      var z=sg/Math.hypot(sg,wd);
      return { ans:{wd:wd, sg:sg, z:z}, unit:{wd:'rad/s', sg:'1/s', z:''}, steps:[
        'ω_d = 2π/T = '+SVH.fmt(wd)+' rad/s',
        'σ = −ln('+p.r+')/T = '+SVH.fmt(sg)+' 1/s (봉우리들이 e^{−σt} 봉투를 따른다)',
        'ζ = σ/√(σ²+ω_d²) = '+SVH.fmt(z)+' — 파형만으로 2차계 파라미터 완전 복원 (실험 3 대비)' ] }; },
    hints:['주기→ω_d, 진폭비→σ.','ζ = σ/ω₀, ω₀=√(σ²+ω_d²).'] }
  ]
});
