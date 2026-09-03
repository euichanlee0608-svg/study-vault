/* U5 축전기·인덕터·페이저 — C/L v-i, 에너지, DC 정상상태, 정현파, 페이저, 임피던스, AC 해석 */
SV_BANK.push({
  id: 'u5', no: 5, title: '축전기·인덕터·페이저', titleEn: 'C, L & Phasors',
  scope: 'C·L의 v–i 관계와 에너지 · DC 정상상태(C개방·L단락) · 정현파 표현 · 페이저 변환 · 임피던스 · AC 정상상태 해석',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u5-l1-01', level:1, type:'mc', tags:['v-i 관계'], src:'교재 표준',
    statement:'축전기와 인덕터의 v–i 관계로 옳은 것은?',
    choices:['\\(i_C=C\\,dv/dt\\), \\(v_L=L\\,di/dt\\)','\\(v_C=C\\,di/dt\\), \\(i_L=L\\,dv/dt\\)','\\(i_C=v/C\\), \\(v_L=i/L\\)','둘 다 \\(v=iR\\) 형태'],
    answer:0, expl:'C는 전압 변화가 전류를, L은 전류 변화가 전압을 만든다. 그래서 vC와 iL은 불연속일 수 없다(다음 단원 초기조건의 근거).' },
  { id:'u5-l1-02', level:1, type:'tf', tags:['DC 정상상태'], src:'교재 표준',
    statement:'DC 정상상태에서 축전기는 개방 회로, 인덕터는 단락 회로처럼 동작한다.',
    answer:true, expl:'정상상태 = 시간 변화 0 → i_C=C·0=0(개방), v_L=L·0=0(단락). 과도 문제의 t<0, t→∞ 계산이 전부 이 규칙이다.' },
  { id:'u5-l1-03', level:1, type:'mc', tags:['연속성'], src:'교재 표준',
    statement:'스위칭 순간에도 불연속일 수 없는 물리량 쌍은?',
    choices:['축전기 전압 \\(v_C\\)와 인덕터 전류 \\(i_L\\)','축전기 전류와 인덕터 전압','모든 소자의 전압','모든 소자의 전류'],
    answer:0, expl:'에너지(½Cv²·½Li²)가 순간 점프하려면 무한 전력이 필요하므로. i_C·v_L은 얼마든지 점프한다.' },
  { id:'u5-l1-04', level:1, type:'mc', tags:['페이저'], src:'교재 표준',
    statement:'\\(v(t)=V_m\\cos(\\omega t+\\phi)\\)의 페이저 표현과, 임피던스가 옳게 짝지어진 것은?',
    choices:['\\(\\mathbf{V}=V_m\\angle\\phi\\), \\(Z_R=R,\\ Z_L=j\\omega L,\\ Z_C=1/j\\omega C\\)','\\(\\mathbf{V}=V_m\\angle\\omega t\\), \\(Z_L=1/j\\omega L\\)','\\(\\mathbf{V}=V_m e^{j\\omega t}\\), \\(Z_C=j\\omega C\\)','페이저는 크기만 갖는다'],
    answer:0, expl:'페이저는 ω를 떼고 진폭·위상만 남긴 복소수. L은 +90°(전압 앞섬), C는 −90°.' },
  { id:'u5-l1-05', level:1, type:'tf', tags:['위상'], src:'교재 표준',
    statement:'직렬 RC 회로에 정현파 전압을 걸면 전류는 전압보다 위상이 앞선다(leading).',
    answer:true, expl:'용량성 회로 = 전류 앞섬(ICE의 I 먼저), 유도성 = 전류 뒤짐(ELI). 임피던스 각이 음수(−)라는 말과 같다.' },
  { id:'u5-l1-06', level:1, type:'mc', tags:['적용 조건'], src:'기출 유형',
    statement:'페이저 해석에 대한 진술 중 옳은 것은?',
    choices:['같은 주파수의 정현파 정상상태에서만 유효하다','과도응답도 페이저로 구한다','주파수가 달라도 페이저끼리 더할 수 있다','DC에는 절대 못 쓴다(ω=0 대입도 불가)'],
    answer:0, expl:'페이저 = 단일 주파수 정상상태 도구. 서로 다른 ω는 중첩으로 각각 풀어야 한다. ω=0 극한은 DC와 일치(임피던스 극한 체크에 쓰인다).' },

  /* ---------- L2 (12) ---------- */
  { id:'u5-l2-01', level:2, type:'num', tags:['C 전류'], src:'창작 문제(검산됨)',
    params:{ C:{choices:[10,22,47,100],unit:'µF'}, slope:{min:100,max:900,step:100,unit:'V/s'} },
    statement:function(p){ return p.C+' µF 축전기 전압이 '+p.slope+' V/s로 일정하게 증가한다. 축전기 전류는 몇 mA인가?'; },
    solve:function(p){ var I=p.C*1e-6*p.slope*1000;
      return { ans:I, unit:'mA', steps:[
        '\\(i_C=C\\,dv/dt\\)',
        'i = '+p.C+'×10⁻⁶ × '+p.slope+' = '+SVH.fmt(p.C*1e-6*p.slope)+' A = '+SVH.fmt(I)+' mA' ] }; },
    hints:['전압 기울기가 곧 dv/dt.','단위: µF×V/s = µA×10⁶?? — 지수 계산을 놓치지 말 것.'] },
  { id:'u5-l2-02', level:2, type:'num', tags:['L 전압'], src:'창작 문제(검산됨)',
    params:{ L:{choices:[10,50,100,200],unit:'mH'}, slope:{min:20,max:200,step:20,unit:'A/s'} },
    statement:function(p){ return p.L+' mH 인덕터 전류가 '+p.slope+' A/s로 증가한다. 인덕터 양단 전압은?'; },
    solve:function(p){ var V=p.L/1000*p.slope;
      return { ans:V, unit:'V', steps:[
        '\\(v_L=L\\,di/dt\\)',
        'v = '+SVH.fmt(p.L/1000)+' × '+p.slope+' = '+SVH.fmt(V)+' V' ] }; },
    hints:['mH → H 변환 먼저.'] },
  { id:'u5-l2-03', level:2, type:'num', tags:['에너지'], src:'창작 문제(검산됨)',
    params:{ C:{choices:[47,100,220,470],unit:'µF'}, V:{min:5,max:25,step:5,unit:'V'} },
    statement:function(p){ return p.C+' µF 축전기가 '+p.V+' V로 충전되어 있다. 저장 에너지는 몇 mJ인가?'; },
    solve:function(p){ var E=0.5*p.C*1e-6*p.V*p.V*1000;
      return { ans:E, unit:'mJ', steps:[
        '\\(w=\\tfrac12 Cv^2\\)',
        'w = ½×'+p.C+'×10⁻⁶×'+p.V+'² = '+SVH.fmt(E)+' mJ' ] }; },
    hints:['½Cv² — v가 제곱.'] },
  { id:'u5-l2-04', level:2, type:'num', tags:['에너지'], src:'창작 문제(검산됨)',
    params:{ L:{choices:[50,100,500],unit:'mH'}, I:{min:1,max:5,step:1,unit:'A'} },
    statement:function(p){ return p.L+' mH 인덕터에 '+p.I+' A가 흐른다. 저장 에너지는 몇 mJ인가?'; },
    solve:function(p){ var E=0.5*p.L/1000*p.I*p.I*1000;
      return { ans:E, unit:'mJ', steps:[
        '\\(w=\\tfrac12 Li^2\\)',
        'w = ½×'+SVH.fmt(p.L/1000)+'×'+p.I+'² = '+SVH.fmt(E)+' mJ' ] }; },
    hints:['½Li².'] },
  { id:'u5-l2-05', level:2, type:'num', tags:['C 합성'], src:'창작 문제(검산됨)',
    params:{ C1:{choices:[10,20,30,60],unit:'µF'}, C2:{choices:[10,20,30,60],unit:'µF'} },
    statement:function(p){ return 'C₁='+p.C1+' µF, C₂='+p.C2+' µF일 때 (a) 병렬 합성 (b) 직렬 합성 용량을 구하라.'; },
    solve:function(p){ var par=p.C1+p.C2, ser=p.C1*p.C2/(p.C1+p.C2);
      return { ans:{par:par, ser:ser}, unit:{par:'µF', ser:'µF'}, steps:[
        '병렬: \\(C_{eq}=C_1+C_2\\) = '+SVH.fmt(par)+' µF (저항과 반대!)',
        '직렬: \\(C_{eq}=\\dfrac{C_1C_2}{C_1+C_2}\\) = '+SVH.fmt(ser)+' µF' ] }; },
    hints:['C의 합성 규칙은 R과 반대다.'] },
  { id:'u5-l2-06', level:2, type:'num', tags:['정현파 읽기'], src:'창작 문제(검산됨)',
    params:{ Vm:{min:5,max:20,step:5,unit:'V'}, f:{choices:[50,60,100,400],unit:'Hz'} },
    statement:function(p){ return '\\(v(t)='+p.Vm+'\\cos(2\\pi\\cdot'+p.f+'t)\\) V의 (a) 각주파수 ω (b) 주기 T(ms)를 구하라.'; },
    solve:function(p){ var w=2*Math.PI*p.f, T=1000/p.f;
      return { ans:{w:w, T:T}, unit:{w:'rad/s', T:'ms'}, steps:[
        'ω = 2πf = '+SVH.fmt(w)+' rad/s',
        'T = 1/f = '+SVH.fmt(T)+' ms' ] }; },
    hints:['ω=2πf, T=1/f.'] },
  { id:'u5-l2-07', level:2, type:'num', tags:['임피던스'], src:'창작 문제(검산됨)',
    params:{ L:{choices:[0.1,0.5,1,2],unit:'H'}, C:{choices:[100,250,500],unit:'µF'}, w:{min:2,max:20,step:2,unit:'rad/s'} },
    statement:function(p){ return 'ω='+p.w+' rad/s에서 (a) L='+p.L+' H의 임피던스 크기 (b) C='+p.C+' µF의 임피던스 크기를 구하라.'; },
    solve:function(p){ var ZL=p.w*p.L, ZC=1/(p.w*p.C*1e-6);
      return { ans:{ZL:ZL, ZC:ZC}, unit:{ZL:'Ω', ZC:'Ω'}, steps:[
        '|Z_L| = ωL = '+SVH.fmt(ZL)+' Ω (각 +90°)',
        '|Z_C| = 1/ωC = '+SVH.fmt(ZC)+' Ω (각 −90°)' ] }; },
    hints:['ωL과 1/ωC.'] },
  { id:'u5-l2-08', level:2, type:'num', tags:['직렬 임피던스'], src:'창작 문제(검산됨)',
    params:{ R:{min:3,max:12,step:3,unit:'Ω'}, X:{min:4,max:16,step:4,unit:'Ω'} },
    statement:function(p){ return 'R='+p.R+' Ω와 유도성 리액턴스 X_L='+p.X+' Ω가 직렬이다. 임피던스의 크기와 각을 구하라.'; },
    solve:function(p){ var m=Math.hypot(p.R,p.X), a=SVH.deg(Math.atan2(p.X,p.R));
      return { ans:{mag:m, ang:a}, unit:{mag:'Ω', ang:'°'}, steps:[
        '\\(Z=R+jX_L\\) → |Z| = √('+p.R+'²+'+p.X+'²) = '+SVH.fmt(m)+' Ω',
        '∠Z = tan⁻¹('+p.X+'/'+p.R+') = '+SVH.fmt(a)+'°' ] }; },
    hints:['복소수 크기·각.'] },
  { id:'u5-l2-09', level:2, type:'num', tags:['옴 법칙(페이저)'], src:'창작 문제(검산됨)',
    params:{ Vm:{min:10,max:50,step:10,unit:'V'}, R:{min:3,max:9,step:3,unit:'Ω'}, X:{min:4,max:12,step:4,unit:'Ω'} },
    statement:function(p){ return '전압 페이저 \\(\\mathbf{V}='+p.Vm+'\\angle 0°\\) V가 \\(Z='+p.R+'+j'+p.X+'\\) Ω에 걸린다. 전류 페이저(크기·각)를 구하라.'; },
    solve:function(p){ var m=p.Vm/Math.hypot(p.R,p.X), a=-SVH.deg(Math.atan2(p.X,p.R));
      return { ans:{mag:m, ang:a}, unit:{mag:'A', ang:'°'}, steps:[
        '\\(\\mathbf{I}=\\mathbf{V}/Z\\): 크기 = '+p.Vm+'/'+SVH.fmt(Math.hypot(p.R,p.X))+' = '+SVH.fmt(m)+' A',
        '각 = 0° − ∠Z = '+SVH.fmt(a)+'° (유도성이라 전류가 뒤진다)' ] }; },
    hints:['나눗셈 = 크기 나누고 각 빼기.'] },
  { id:'u5-l2-10', level:2, type:'num', tags:['시간영역 복원'], src:'기출 유형',
    params:{ Im:{choices:[2,5,8],unit:'A'}, ang:{choices:[-60,-45,-30,30,45],unit:'°'}, w:{choices:[2,4,10],unit:'rad/s'} },
    statement:function(p){ return '전류 페이저가 \\('+p.Im+'\\angle '+p.ang+'°\\) A, ω='+p.w+' rad/s이다. 시간영역 i(t)의 t=0에서의 값을 구하라.'; },
    solve:function(p){ var v=p.Im*Math.cos(SVH.rad(p.ang));
      return { ans:v, unit:'A', steps:[
        '복원: \\(i(t)='+p.Im+'\\cos('+p.w+'t'+(p.ang>=0?'+':'−')+Math.abs(p.ang)+'°)\\) A',
        't=0: i(0) = '+p.Im+'cos('+p.ang+'°) = '+SVH.fmt(v)+' A' ] }; },
    hints:['페이저 → Vm cos(ωt+φ).','기출 3번이 요구하는 마지막 단계다.'] },
  { id:'u5-l2-11', level:2, type:'num', tags:['공진'], src:'창작 문제(검산됨)',
    params:{ L:{choices:[10,40,100],unit:'mH'}, C:{choices:[10,100,250],unit:'µF'} },
    statement:function(p){ return 'L='+p.L+' mH, C='+p.C+' µF의 공진 각주파수 \\(\\omega_0=1/\\sqrt{LC}\\)를 구하라.'; },
    solve:function(p){ var w0=1/Math.sqrt(p.L/1000*p.C*1e-6);
      return { ans:w0, unit:'rad/s', steps:[
        'ω₀ = 1/√(LC) = 1/√('+SVH.fmt(p.L/1000)+'×'+SVH.fmt(p.C*1e-6)+')',
        '= '+SVH.fmt(w0)+' rad/s (이때 X_L=X_C — U7 필터의 기준점)' ] }; },
    hints:['단위 변환부터 (mH·µF).'] },
  { id:'u5-l2-12', level:2, type:'num', tags:['DC 정상상태'], src:'기출 유형',
    params:{ Vs:{min:10,max:20,step:5,unit:'V'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:4,max:12,step:4,unit:'Ω'} },
    statement:function(p){ return 'DC '+p.Vs+' V 전원 → R₁='+p.R1+' Ω → (C ∥ R₂='+p.R2+' Ω) 회로가 정상상태다. (a) C의 전압 (b) C의 전류를 구하라.'; },
    solve:function(p){ var v=p.Vs*p.R2/(p.R1+p.R2);
      return { ans:{vC:v, iC:0}, unit:{vC:'V', iC:'A'}, steps:[
        '정상상태 C = 개방 → R₁·R₂ 분압만 남는다',
        'v_C = '+p.Vs+'×'+p.R2+'/'+(p.R1+p.R2)+' = '+SVH.fmt(v)+' V, i_C = 0 A',
        '(과도 단원에서 t<0 초기값 구하기가 정확히 이 계산)' ] }; },
    hints:['C를 지우고(개방) 그려 본다.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u5-l3-01', level:3, type:'num', tags:['RL 직렬 완전 해석'], src:'기출 유형',
    params:{ Vm:{min:10,max:30,step:10,unit:'V'}, R:{min:3,max:9,step:3,unit:'Ω'}, L:{choices:[1,2,3],unit:'H'}, w:{choices:[2,3,4],unit:'rad/s'} },
    statement:function(p){ return '\\(v_s='+p.Vm+'\\cos('+p.w+'t)\\) V가 R='+p.R+' Ω, L='+p.L+' H 직렬에 걸린다. 전류의 진폭과 위상(°)을 구하라.'; },
    solve:function(p){ var X=p.w*p.L, m=p.Vm/Math.hypot(p.R,X), a=-SVH.deg(Math.atan2(X,p.R));
      return { ans:{Im:m, ph:a}, unit:{Im:'A', ph:'°'}, steps:[
        'X_L = ωL = '+SVH.fmt(X)+' Ω → Z = '+p.R+'+j'+SVH.fmt(X)+' Ω',
        '|I| = '+p.Vm+'/√('+p.R+'²+'+SVH.fmt(X)+'²) = '+SVH.fmt(m)+' A',
        '위상 = −tan⁻¹(X/R) = '+SVH.fmt(a)+'° → \\(i(t)='+SVH.fmt(m)+'\\cos('+p.w+'t'+(a>=0?'+':'−')+SVH.fmt(Math.abs(a))+'°)\\) A' ] }; },
    hints:['임피던스부터.','전류 위상은 −∠Z.'] },
  { id:'u5-l3-02', level:3, type:'num', tags:['RC 직렬 완전 해석'], src:'기출 유형',
    params:{ Vm:{min:10,max:30,step:10,unit:'V'}, R:{min:4,max:12,step:4,unit:'Ω'}, Xc:{min:3,max:9,step:3,unit:'Ω'} },
    statement:function(p){ return '전압 '+p.Vm+'∠0° V, R='+p.R+' Ω와 용량성 리액턴스 X_C='+p.Xc+' Ω 직렬 회로에서 축전기 양단 전압 페이저(크기·각)를 구하라.'; },
    solve:function(p){
      var Z=Math.hypot(p.R,p.Xc), Im=p.Vm/Z, phI=SVH.deg(Math.atan2(p.Xc,p.R));
      var Vc=Im*p.Xc, phVc=phI-90;
      return { ans:{Vc:Vc, ph:phVc}, unit:{Vc:'V', ph:'°'}, steps:[
        'Z = '+p.R+'−j'+p.Xc+' → |Z|='+SVH.fmt(Z)+' Ω, ∠Z=−'+SVH.fmt(phI)+'°',
        'I = '+SVH.fmt(Im)+'∠'+SVH.fmt(phI)+'° A (전류 앞섬)',
        'V_C = I·(−jX_C) = '+SVH.fmt(Vc)+'∠'+SVH.fmt(phVc)+'° V (전류보다 90° 뒤)' ] }; },
    hints:['V_C = I × Z_C — 크기 곱, 각 −90°.'] },
  { id:'u5-l3-03', level:3, type:'num', tags:['페이저 분압'], src:'기출 유형',
    params:{ Vm:{choices:[20,25,30],unit:'V'}, R:{min:6,max:12,step:3,unit:'Ω'}, X:{min:6,max:12,step:3,unit:'Ω'} },
    statement:function(p){ return '기출 3번 축소형: '+p.Vm+'∠0° V → R='+p.R+' Ω 직렬 → L(X_L='+p.X+' Ω). 인덕터 전압 페이저(크기·각)를 분압으로 구하라.'; },
    solve:function(p){
      var Zm=Math.hypot(p.R,p.X), phZ=SVH.deg(Math.atan2(p.X,p.R));
      var Vl=p.Vm*p.X/Zm, ph=90-phZ;
      return { ans:{VL:Vl, ph:ph}, unit:{VL:'V', ph:'°'}, steps:[
        '분압(페이저): \\(\\mathbf{V}_L=\\mathbf{V}\\dfrac{jX_L}{R+jX_L}\\)',
        '크기 = '+p.Vm+'×'+p.X+'/'+SVH.fmt(Zm)+' = '+SVH.fmt(Vl)+' V',
        '각 = 90° − '+SVH.fmt(phZ)+'° = '+SVH.fmt(ph)+'°' ] }; },
    hints:['분압 공식은 페이저에서도 그대로 — 복소수로만.'] },
  { id:'u5-l3-04', level:3, type:'num', tags:['병렬 어드미턴스'], src:'창작 문제(검산됨)',
    params:{ R:{min:4,max:10,step:2,unit:'Ω'}, X:{min:4,max:10,step:2,unit:'Ω'}, Vm:{min:12,max:24,step:6,unit:'V'} },
    statement:function(p){ return '전압원 '+p.Vm+'∠0° V에 R='+p.R+' Ω와 L(X_L='+p.X+' Ω)이 병렬이다. 전원 전류의 크기와 각을 구하라.'; },
    solve:function(p){
      var Ir=p.Vm/p.R, Il=p.Vm/p.X; // Il은 -90°
      var m=Math.hypot(Ir,Il), a=-SVH.deg(Math.atan2(Il,Ir));
      return { ans:{mag:m, ang:a}, unit:{mag:'A', ang:'°'}, steps:[
        '가지별: I_R = '+SVH.fmt(Ir)+'∠0°, I_L = '+SVH.fmt(Il)+'∠−90°',
        '합(직각): |I| = √('+SVH.fmt(Ir)+'²+'+SVH.fmt(Il)+'²) = '+SVH.fmt(m)+' A',
        '각 = −tan⁻¹('+SVH.fmt(Il)+'/'+SVH.fmt(Ir)+') = '+SVH.fmt(a)+'°' ] }; },
    hints:['병렬은 가지 전류를 페이저로 더한다.'] },
  { id:'u5-l3-05', level:3, type:'num', tags:['정현파 합성'], src:'창작 문제(검산됨)',
    params:{ A:{min:3,max:9,step:3}, B:{min:4,max:12,step:4} },
    statement:function(p){ return '\\(v(t)='+p.A+'\\cos\\omega t + '+p.B+'\\sin\\omega t\\) 를 \\(V_m\\cos(\\omega t-\\phi)\\) 꼴로 바꿔 \\(V_m\\)과 \\(\\phi\\)(°)를 구하라.'; },
    solve:function(p){ var m=Math.hypot(p.A,p.B), ph=SVH.deg(Math.atan2(p.B,p.A));
      return { ans:{Vm:m, ph:ph}, unit:{Vm:'', ph:'°'}, steps:[
        'sin = −90° cos → 페이저: '+p.A+'∠0° + '+p.B+'∠−90° = '+p.A+' − j'+p.B,
        'V_m = √('+p.A+'²+'+p.B+'²) = '+SVH.fmt(m)+', φ = tan⁻¹('+p.B+'/'+p.A+') = '+SVH.fmt(ph)+'°',
        '검토: t=0 값 '+p.A+' = V_m cos(−φ) = '+SVH.fmt(m*Math.cos(SVH.rad(-ph)))+' ✓' ] }; },
    hints:['sinωt = cos(ωt−90°).','페이저 덧셈으로.'] },
  { id:'u5-l3-06', level:3, type:'num', tags:['RLC 직렬'], src:'기출 유형',
    params:{ R:{min:3,max:9,step:3,unit:'Ω'}, XL:{min:5,max:15,step:5,unit:'Ω'}, XC:{min:2,max:12,step:2,unit:'Ω'}, Vm:{min:10,max:30,step:10,unit:'V'} },
    constraint:function(p){ return p.XL!==p.XC; },
    statement:function(p){ return 'R='+p.R+' Ω, X_L='+p.XL+' Ω, X_C='+p.XC+' Ω 직렬에 '+p.Vm+'∠0° V. (a) 합성 임피던스 크기·각 (b) 회로가 유도성인지 용량성인지 판정하라. (유도성=1, 용량성=−1로 답)'; },
    solve:function(p){
      var X=p.XL-p.XC, m=Math.hypot(p.R,X), a=SVH.deg(Math.atan2(X,p.R));
      return { ans:{mag:m, ang:a, type:X>0?1:-1}, unit:{mag:'Ω', ang:'°', type:''}, steps:[
        '순 리액턴스 X = X_L − X_C = '+SVH.fmt(X)+' Ω',
        '|Z| = √(R²+X²) = '+SVH.fmt(m)+' Ω, ∠Z = '+SVH.fmt(a)+'°',
        (X>0?'X>0 → 유도성(전류 뒤짐)':'X<0 → 용량성(전류 앞섬)') ] }; },
    hints:['리액턴스는 부호를 갖고 합쳐진다.'] },
  { id:'u5-l3-07', level:3, type:'num', tags:['에너지 시간함수'], src:'창작 문제(검산됨)',
    params:{ L:{choices:[0.5,1,2],unit:'H'}, Im:{min:2,max:6,step:2,unit:'A'}, w:{choices:[2,4],unit:'rad/s'} },
    statement:function(p){ return 'L='+p.L+' H에 \\(i(t)='+p.Im+'\\cos('+p.w+'t)\\) A가 흐른다. (a) 최대 저장 에너지 (b) 에너지가 최대→0으로 가는 데 걸리는 시간을 구하라.'; },
    solve:function(p){
      var Emax=0.5*p.L*p.Im*p.Im, T4=(Math.PI/2)/p.w;
      return { ans:{Emax:Emax, t:T4}, unit:{Emax:'J', t:'s'}, steps:[
        'w(t)=½Li² — 최대는 |i|=I_m일 때: '+SVH.fmt(Emax)+' J',
        'i가 최대→0: cos이 1→0, 즉 ¼주기 = (π/2)/ω = '+SVH.fmt(T4)+' s',
        '(에너지는 전원↔인덕터를 주기의 절반마다 왕복한다)' ] }; },
    hints:['에너지는 i²을 따라간다.','cos 1→0은 ωt=π/2.'] },
  { id:'u5-l3-08', level:3, type:'num', tags:['C 충전 전하'], src:'창작 문제(검산됨)',
    params:{ C1:{choices:[20,40,60],unit:'µF'}, C2:{choices:[20,40,60],unit:'µF'}, Vs:{min:10,max:30,step:10,unit:'V'} },
    statement:function(p){ return 'C₁='+p.C1+' µF와 C₂='+p.C2+' µF가 직렬로 '+p.Vs+' V 전원에 연결되어 정상상태다. (a) 공통 전하 q (b) 각 축전기 전압을 구하라.'; },
    solve:function(p){
      var Ceq=p.C1*p.C2/(p.C1+p.C2), q=Ceq*1e-6*p.Vs*1e6; // µC
      var v1=q/p.C1, v2=q/p.C2;
      return { ans:{q:q, v1:v1, v2:v2}, unit:{q:'µC', v1:'V', v2:'V'}, steps:[
        '직렬 = 같은 전하: C_eq = '+SVH.fmt(Ceq)+' µF → q = C_eqV = '+SVH.fmt(q)+' µC',
        'v₁ = q/C₁ = '+SVH.fmt(v1)+' V, v₂ = q/C₂ = '+SVH.fmt(v2)+' V',
        '검토: v₁+v₂ = '+SVH.fmt(v1+v2)+' = V_s ✓ (작은 C에 큰 전압!)' ] }; },
    hints:['직렬 C는 전하가 공통.','전압은 C에 반비례 분배.'] },
  { id:'u5-l3-09', level:3, type:'num', tags:['L 합성·전류 분배'], src:'창작 문제(검산됨)',
    params:{ L1:{choices:[20,40,60],unit:'mH'}, L2:{choices:[30,60,120],unit:'mH'} },
    statement:function(p){ return 'L₁='+p.L1+' mH ∥ L₂='+p.L2+' mH의 (a) 합성 인덕턴스 (b) 총 전류의 몇 %가 L₁로 흐르는가? (자속 결합 없음, AC 정상상태)'; },
    solve:function(p){
      var Leq=p.L1*p.L2/(p.L1+p.L2), pct=p.L2/(p.L1+p.L2)*100;
      return { ans:{Leq:Leq, pct:pct}, unit:{Leq:'mH', pct:'%'}, steps:[
        'L 병렬은 R과 같은 규칙: L_eq = '+SVH.fmt(Leq)+' mH',
        '전류 분배도 저항처럼(리액턴스 ∝ L): L₁ 몫 = L₂/(L₁+L₂) = '+SVH.fmt(pct)+' %' ] }; },
    hints:['L은 R과 같은 합성 규칙(C만 반대).'] },
  { id:'u5-l3-10', level:3, type:'num', tags:['주파수에 따른 거동'], src:'창작 문제(검산됨)',
    params:{ R:{min:10,max:50,step:10,unit:'Ω'}, C:{choices:[100,200,500],unit:'µF'}, k:{choices:[0.5,2,5]} },
    statement:function(p){ return 'R='+p.R+' Ω, C='+p.C+' µF 직렬 회로에서 ω = '+p.k+'/(RC)일 때 |Z|를 R의 배수로 구하라. (|Z|/R)'; },
    solve:function(p){
      var ratio=Math.sqrt(1+1/(p.k*p.k));
      return { ans:ratio, unit:'', steps:[
        'X_C = 1/(ωC) = RC/(kC)·(1/R)⁻¹... 정리하면 X_C = R/k',
        '|Z|/R = √(1+(X_C/R)²) = √(1+1/'+p.k+'²) = '+SVH.fmt(ratio),
        '(ω가 커질수록(k↑) C가 투명해져 |Z|→R — U7 고역통과의 물리)' ] }; },
    hints:['ω=k/RC를 X_C에 대입해 R로 정규화.'] },
  { id:'u5-l3-11', level:3, type:'num', tags:['페이저 KCL'], src:'창작 문제(검산됨)',
    params:{ I1:{min:2,max:6,step:2,unit:'A'}, I2:{min:2,max:6,step:2,unit:'A'} },
    statement:function(p){ return '절점에 \\(i_1='+p.I1+'\\cos\\omega t\\) A가 들어오고 \\(i_2='+p.I2+'\\sin\\omega t\\) A가 나간다. 세 번째 가지로 나가는 전류의 진폭과 위상(°)을 구하라.'; },
    solve:function(p){
      var m=Math.hypot(p.I1,p.I2), a=SVH.deg(Math.atan2(-(-p.I2),p.I1)); // I3 = I1 - I2∠-90 = I1 + jI2
      return { ans:{Im:m, ph:a}, unit:{Im:'A', ph:'°'}, steps:[
        '페이저: I₁ = '+p.I1+'∠0°, I₂ = '+p.I2+'∠−90°',
        'KCL: I₃ = I₁ − I₂ = '+p.I1+' + j'+p.I2,
        '|I₃| = '+SVH.fmt(m)+' A, ∠ = '+SVH.fmt(a)+'° → \\(i_3='+SVH.fmt(m)+'\\cos(\\omega t+'+SVH.fmt(a)+'°)\\)' ] }; },
    hints:['KCL은 페이저에서도 성립.','−(∠−90°) = +j.'] },
  { id:'u5-l3-12', level:3, type:'num', tags:['C 그래프 해석'], src:'창작 문제(검산됨)',
    params:{ C:{choices:[2,5,10],unit:'µF'}, V1:{min:4,max:10,step:2,unit:'V'}, t1:{choices:[2,4],unit:'ms'} },
    statement:function(p){ return p.C+' µF 축전기 전압이 0에서 '+p.V1+' V까지 '+p.t1+' ms 동안 선형 증가 후 일정하다. (a) 증가 구간 전류 (b) 일정 구간 전류 (c) 최종 저장 에너지를 구하라.'; },
    solve:function(p){
      var i=p.C*1e-6*p.V1/(p.t1/1000)*1000, E=0.5*p.C*1e-6*p.V1*p.V1*1e6;
      return { ans:{i:i, i2:0, E:E}, unit:{i:'mA', i2:'mA', E:'µJ'}, steps:[
        '증가 구간: i = C·dv/dt = '+p.C+'µ × '+SVH.fmt(p.V1/(p.t1/1000))+' V/s = '+SVH.fmt(i)+' mA',
        '일정 구간: dv/dt=0 → i = 0',
        'E = ½CV² = '+SVH.fmt(E)+' µJ' ] }; },
    hints:['구간별 기울기만 보면 된다.'] },
  { id:'u5-l3-13', level:3, type:'num', tags:['위상차 측정'], src:'창작 문제(검산됨)',
    params:{ f:{choices:[50,100,200],unit:'Hz'}, dt:{choices:[0.5,1,2],unit:'ms'} },
    constraint:function(p){ return p.dt/1000 < 1/(2*p.f); },
    statement:function(p){ return '오실로스코프에서 '+p.f+' Hz 정현파 두 개의 마루가 '+p.dt+' ms 어긋나 있다. 위상차는 몇 °인가?'; },
    solve:function(p){ var ph=360*p.f*p.dt/1000;
      return { ans:ph, unit:'°', steps:[
        '한 주기 T = '+SVH.fmt(1000/p.f)+' ms = 360°',
        'Δφ = 360°×Δt/T = 360×'+p.f+'×'+SVH.fmt(p.dt/1000)+' = '+SVH.fmt(ph)+'°',
        '(실험 2 오실로스코프 측정의 표준 계산)' ] }; },
    hints:['시간차/주기 × 360°.'] },
  { id:'u5-l3-14', level:3, type:'num', tags:['복소 연산 종합'], src:'창작 문제(검산됨)',
    params:{ R1:{min:2,max:6,step:2,unit:'Ω'}, X1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, X2:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '\\(Z_1='+p.R1+'+j'+p.X1+'\\) Ω(RL)과 \\(Z_2='+p.R2+'-j'+p.X2+'\\) Ω(RC)의 병렬 합성 임피던스 크기와 각을 구하라.'; },
    solve:function(p){
      var Z1=SVH.cx(p.R1,p.X1), Z2=SVH.cx(p.R2,-p.X2);
      var Zp=SVH.cpar(Z1,Z2);
      return { ans:{mag:SVH.cmag(Zp), ang:SVH.cang(Zp)}, unit:{mag:'Ω', ang:'°'}, steps:[
        '곱: Z₁Z₂ = '+SVH.fmt(SVH.cmul(Z1,Z2).re)+'+j'+SVH.fmt(SVH.cmul(Z1,Z2).im),
        '합: Z₁+Z₂ = '+(p.R1+p.R2)+'+j'+(p.X1-p.X2),
        'Z_p = 곱/합 → |Z| = '+SVH.fmt(SVH.cmag(Zp))+' Ω, ∠ = '+SVH.fmt(SVH.cang(Zp))+'°' ] }; },
    hints:['병렬 = 곱/합, 복소수로 그대로.','유도성과 용량성이 일부 상쇄된다.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u5-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ DC 정상상태에서 인덕터의 전압은 0이다<br>㉡ 축전기 전류는 스위칭 순간 불연속일 수 있다<br>㉢ 서로 다른 주파수의 두 페이저는 직접 더할 수 있다<br>㉣ 직렬 RLC에서 X_L=X_C이면 임피던스는 순저항 R이 된다',
    choices:['㉠㉡㉣','㉠㉢㉣','㉡㉢','전부'],
    answer:0, expl:'페이저는 같은 ω끼리만(㉢ ✗). 공진(㉣)에서 리액턴스 상쇄 → |Z| 최소 = R.' },
  { id:'u5-l4-02', level:4, type:'num', tags:['기출 3번 재현'], src:'기출 유형',
    params:{ Vm:{choices:[20,25,30],unit:'V'}, R:{choices:[12],unit:'Ω'}, L1:{choices:[3,6],unit:'H'}, R2:{choices:[6],unit:'Ω'}, w:{choices:[2],unit:'rad/s'} },
    statement:function(p){ return '기출 3번 구조: \\(V='+p.Vm+'\\angle 0°\\) V, ω='+p.w+' rad/s. 직렬 R='+p.R+' Ω·L='+p.L1+' H 다음에 R₂='+p.R2+' Ω가 병렬로 매달린 구조에서 R₂ 양단 전압 \\(V_2\\)의 크기·각을 구하고 시간영역으로 써라. (t=0 값으로 검증)'; },
    solve:function(p){
      var ZL=SVH.cx(0,p.w*p.L1);
      var Zser=SVH.cx(p.R,p.w*p.L1);
      var Z2=SVH.cx(p.R2,0);
      // V2 = V * Z2/(Zser+Z2)
      var V=SVH.cx(p.Vm,0);
      var V2=SVH.cmul(V, SVH.cdiv(Z2, SVH.cadd(Zser,Z2)));
      var m=SVH.cmag(V2), a=SVH.cang(V2);
      return { ans:{V2:m, ph:a, v0:m*Math.cos(SVH.rad(a))}, unit:{V2:'V', ph:'°', v0:'V'}, steps:[
        'Z_직렬 = '+p.R+'+j'+SVH.fmt(p.w*p.L1)+' Ω, 분압: \\(V_2=V\\dfrac{R_2}{R+j\\omega L+R_2}\\)',
        '분모 = '+(p.R+p.R2)+'+j'+SVH.fmt(p.w*p.L1)+' → |V₂| = '+SVH.fmt(m)+' V, ∠ = '+SVH.fmt(a)+'°',
        '\\(v_2(t)='+SVH.fmt(m)+'\\cos('+p.w+'t'+(a>=0?'+':'−')+SVH.fmt(Math.abs(a))+'°)\\) V',
        't=0 검증: v₂(0) = '+SVH.fmt(m*Math.cos(SVH.rad(a)))+' V' ] }; },
    hints:['병렬 저항까지 분압 한 방으로.','시간영역 복원까지가 만점 조건(기출 채점 기준).'] },
  { id:'u5-l4-03', level:4, type:'num', tags:['기말 P1형 2단 회로'], src:'기출 유형',
    params:{ Im:{choices:[4,6],unit:'A'}, w:{choices:[2],unit:'rad/s'}, R:{choices:[5,10],unit:'Ω'}, L:{choices:[0.5,1],unit:'H'}, C:{choices:[0.1,0.5],unit:'F'} },
    statement:function(p){ return '전류원 \\('+p.Im+'\\cos('+p.w+'t)\\) A가 [L='+p.L+' H 직렬 R='+p.R+' Ω] ∥ [C='+p.C+' F] 에 연결되어 있다. 저항 R에 흐르는 전류의 진폭·위상을 구하라. (기말 P1 유형)'; },
    solve:function(p){
      var ZRL=SVH.cx(p.R,p.w*p.L);
      var ZC=SVH.cx(0,-1/(p.w*p.C));
      // 분류: I_RL = I * ZC/(ZRL+ZC)
      var I=SVH.cx(p.Im,0);
      var IRL=SVH.cmul(I, SVH.cdiv(ZC, SVH.cadd(ZRL,ZC)));
      return { ans:{Im:SVH.cmag(IRL), ph:SVH.cang(IRL)}, unit:{Im:'A', ph:'°'}, steps:[
        'Z_RL = '+p.R+'+j'+SVH.fmt(p.w*p.L)+' Ω, Z_C = −j'+SVH.fmt(1/(p.w*p.C))+' Ω',
        '전류 분배(반대편 임피던스): \\(I_{RL}=I\\dfrac{Z_C}{Z_{RL}+Z_C}\\)',
        '|I_RL| = '+SVH.fmt(SVH.cmag(IRL))+' A, ∠ = '+SVH.fmt(SVH.cang(IRL))+'°' ] }; },
    hints:['분류 법칙도 복소수 그대로.','분모의 리액턴스 상쇄에 주의.'] },
  { id:'u5-l4-04', level:4, type:'num', tags:['미지 소자 판별'], src:'기출 유형',
    params:{ Vm:{choices:[10,20],unit:'V'}, Im:{choices:[2,4],unit:'A'}, ph:{choices:[-60,-45,-30]} },
    statement:function(p){ return '블랙박스에 \\(v='+p.Vm+'\\cos(100t)\\) V를 걸었더니 \\(i='+p.Im+'\\cos(100t'+p.ph+'°)\\) A가 흘렀다. 박스를 R+L 직렬로 모델링할 때 R과 L을 구하라.'; },
    solve:function(p){
      var Zm=p.Vm/p.Im, R=Zm*Math.cos(SVH.rad(-p.ph)), X=Zm*Math.sin(SVH.rad(-p.ph)), L=X/100;
      return { ans:{R:R, L:L*1000}, unit:{R:'Ω', L:'mH'}, steps:[
        '|Z| = V_m/I_m = '+SVH.fmt(Zm)+' Ω, ∠Z = −(전류 위상) = '+(-p.ph)+'°',
        'R = |Z|cos∠ = '+SVH.fmt(R)+' Ω, X_L = |Z|sin∠ = '+SVH.fmt(X)+' Ω',
        'L = X_L/ω = '+SVH.fmt(L*1000)+' mH — 전류가 뒤지므로(음의 위상) 유도성 판정과 일치' ] }; },
    hints:['임피던스의 크기와 각을 측정치에서 역산.','∠Z = 전압 위상 − 전류 위상.'] },
  { id:'u5-l4-05', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'축전기의 v–i 관계 \\(i=C\\,dv/dt\\)에서 출발해 임피던스 \\(Z_C=1/(j\\omega C)\\)를 유도하고, 극한으로 물리적 의미를 검증하라.',
    steps:[
      '정상상태 가정: \\(v(t)=V_m e^{j\\omega t}\\) (복소 지수 표기 — 실제 신호는 실수부) [왜] 미분을 곱셈으로 바꾸기 위해',
      '대입: \\(i=C\\dfrac{d}{dt}(V_m e^{j\\omega t}) = j\\omega C\\,V_m e^{j\\omega t}\\) — 미분이 \\(j\\omega\\) 곱으로',
      '임피던스 정의 \\(Z=\\mathbf{V}/\\mathbf{I}\\): \\(Z_C=\\dfrac{V_m}{j\\omega C V_m}=\\dfrac{1}{j\\omega C}=-\\dfrac{j}{\\omega C}\\)',
      '각도 해석: −90° → 축전기 전압은 전류보다 90° 뒤진다(전류가 먼저 흘러 들어가야 전압이 쌓인다)',
      '극한 체크: ω→0 ⇒ |Z_C|→∞ (DC 개방 ✓), ω→∞ ⇒ 0 (고주파 단락 ✓) · 차원: 1/[(1/s)(C/V)] = V·s/C = Ω ✓'
    ],
    hints:['e^{jωt}를 넣으면 d/dt가 jω로.','유도 후 ω 극한 2개로 DC 규칙을 회수해 본다.'],
    expl:'기말 P4(임피던스로 H(ω) 유도)의 출발점. L도 같은 방법으로 Z_L=jωL.' },
  { id:'u5-l4-06', level:4, type:'num', tags:['공진 설계'], src:'창작 문제(검산됨)',
    params:{ f0:{choices:[1,5,10],unit:'kHz'}, L:{choices:[10,40],unit:'mH'}, R:{choices:[10,20],unit:'Ω'} },
    statement:function(p){ return '직렬 RLC를 f₀='+p.f0+' kHz에서 공진시키려 한다. L='+p.L+' mH일 때 (a) 필요한 C(µF) (b) 공진에서 전류가 최대가 되는 이유를 반영한, '+p.R+' Ω·V_m=10 V 기준 공진 전류 진폭을 구하라.'; },
    solve:function(p){
      var w0=2*Math.PI*p.f0*1000, C=1/(w0*w0*p.L/1000)*1e6, I=10/p.R;
      return { ans:{C:C, I:I}, unit:{C:'µF', I:'A'}, steps:[
        'ω₀ = 2πf₀ = '+SVH.fmt(w0)+' rad/s, 공진 조건 ω₀²=1/LC',
        'C = 1/(ω₀²L) = '+SVH.fmt(C)+' µF',
        '공진에서 X_L=X_C 상쇄 → Z=R → I_max = V/R = '+SVH.fmt(I)+' A' ] }; },
    hints:['공진 조건에서 C를 역산.','공진 = 리액턴스 소멸.'] },
  { id:'u5-l4-07', level:4, type:'num', tags:['3소자 종합'], src:'기출 유형',
    params:{ Vm:{choices:[10,20],unit:'V'}, R:{choices:[4,8],unit:'Ω'}, XL:{choices:[6,10],unit:'Ω'}, XC:{choices:[3,6],unit:'Ω'} },
    constraint:function(p){ return p.XL!==p.XC; }, /* 병렬 LC 공진(Z→∞) 배제 */
    statement:function(p){ return p.Vm+'∠0° V가 R='+p.R+' Ω 직렬 후 [L(X_L='+p.XL+' Ω) ∥ C(X_C='+p.XC+' Ω)]에 연결. 병렬부 양단 전압의 크기·각을 구하라.'; },
    solve:function(p){
      var ZL=SVH.cx(0,p.XL), ZC=SVH.cx(0,-p.XC);
      var Zp=SVH.cpar(ZL,ZC);
      var V=SVH.cx(p.Vm,0);
      var Vp=SVH.cmul(V, SVH.cdiv(Zp, SVH.cadd(SVH.cx(p.R,0),Zp)));
      return { ans:{V:SVH.cmag(Vp), ph:SVH.cang(Vp)}, unit:{V:'V', ph:'°'}, steps:[
        'L∥C: \\(Z_p=\\dfrac{(jX_L)(-jX_C)}{j(X_L-X_C)}\\) = '+SVH.fmt(SVH.cmag(Zp))+'∠'+SVH.fmt(SVH.cang(Zp))+'° Ω (순수 리액턴스)',
        '분압: V_p = V·Z_p/(R+Z_p)',
        '|V_p| = '+SVH.fmt(SVH.cmag(Vp))+' V, ∠ = '+SVH.fmt(SVH.cang(Vp))+'°' ] }; },
    hints:['L∥C는 순허수 — 부호가 어느 쪽 우세인지 먼저.','그 다음은 평범한 분압.'] },
  { id:'u5-l4-08', level:4, type:'num', tags:['오실로스코프 역산'], src:'기출 유형',
    params:{ Vm:{choices:[8,12],unit:'V'}, f:{choices:[100,200],unit:'Hz'}, R:{choices:[100,200],unit:'Ω'}, ph:{choices:[30,45,60]} },
    statement:function(p){ return '실험: 함수발생기('+p.Vm+' V 진폭, '+p.f+' Hz)를 R='+p.R+' Ω와 미지 축전기 직렬에 연결했더니 전류(R 전압으로 측정)가 전압보다 '+p.ph+'° 앞섰다. C를 µF로 구하라.'; },
    solve:function(p){
      var Xc=p.R*Math.tan(SVH.rad(p.ph));
      var C=1/(2*Math.PI*p.f*Xc)*1e6;
      return { ans:C, unit:'µF', steps:[
        '전류 앞섬 '+p.ph+'° → ∠Z = −'+p.ph+'° → tan'+p.ph+'° = X_C/R',
        'X_C = R·tan'+p.ph+'° = '+SVH.fmt(Xc)+' Ω',
        'C = 1/(2πf·X_C) = '+SVH.fmt(C)+' µF (실험 2에서 C 측정하는 실제 절차)' ] }; },
    hints:['위상각에서 X_C/R를 얻는다.','X_C에서 C 역산.'] }
  ]
});
