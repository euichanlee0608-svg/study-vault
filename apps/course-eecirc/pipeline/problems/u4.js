/* U4 회로 정리 — 중첩, 전원 변환, 테브난/노턴 등가, 최대 전력 전달, 부하 효과 */
SV_BANK.push({
  id: 'u4', no: 4, title: '회로 정리 (테브난·중첩)', titleEn: 'Network Theorems',
  scope: '선형성·중첩 · 전원 변환 · 테브난/노턴 등가 · V_oc/I_sc · 최대 전력 전달 · 측정 기반 등가',
  problems: [

  /* ---------- L1 (10) ---------- */
  { id:'u4-l1-01', level:1, type:'mc', tags:['중첩'], src:'기출 유형',
    statement:'중첩의 원리(superposition)의 근거는?',
    choices:['회로의 선형성(비례성+가산성)','결합법칙과 교환법칙','에너지 보존','전하 보존'],
    answer:0, expl:'기출 1(d)가 정확히 이 함정("결합법칙·교환법칙 때문"이라는 진술은 틀림). 중첩은 선형 소자·선형 방정식이라서 성립한다.' },
  { id:'u4-l1-02', level:1, type:'mc', tags:['전원 끄기'], src:'교재 표준',
    statement:'중첩 계산에서 전원을 "끌 때"의 올바른 대체는?',
    choices:['전압원 → 단락, 전류원 → 개방','전압원 → 개방, 전류원 → 단락','둘 다 개방','둘 다 단락'],
    answer:0, expl:'끈 전압원은 0 V(=단락), 끈 전류원은 0 A(=개방). 종속 전원은 끄지 않는다!' },
  { id:'u4-l1-03', level:1, type:'tf', tags:['종속 전원'], src:'교재 표준',
    statement:'중첩을 적용할 때 종속 전원도 독립 전원처럼 하나씩 꺼 가며 계산한다.',
    answer:false, expl:'종속 전원은 회로의 일부(소자)다. 항상 켠 채로 두고 독립 전원만 하나씩 살린다.' },
  { id:'u4-l1-04', level:1, type:'tf', tags:['적용 범위'], src:'기출 유형',
    statement:'테브난·노턴 등가는 선형 회로에도 비선형 회로에도 항상 적용할 수 있다.',
    answer:false, expl:'기출 1(f). 선형 회로(내부가 선형 소자+전원)에만 성립한다. 비선형 부하가 "밖에" 달리는 것은 괜찮다.' },
  { id:'u4-l1-05', level:1, type:'mc', tags:['테브난 구성'], src:'교재 표준',
    statement:'테브난 등가의 두 요소는?',
    choices:['개방 전압 \\(V_{oc}\\)와 등가 저항 \\(R_T\\)의 직렬','단락 전류와 저항의 병렬','전압원 하나','저항 하나'],
    answer:0, expl:'V_T=V_oc, 직렬 R_T. 노턴은 I_N=I_sc와 R_T 병렬 — 서로 전원 변환 관계다.' },
  { id:'u4-l1-06', level:1, type:'mc', tags:['R_T 구하기'], src:'교재 표준',
    statement:'독립 전원만 있는 회로의 테브난 저항을 구하는 표준 방법은?',
    choices:['모든 독립 전원을 끄고(전압원 단락·전류원 개방) 단자에서 본 등가 저항','전원을 켠 채 단자 저항을 잰다','\\(V_{oc}\\times I_{sc}\\)','아무 저항이나 더한다'],
    answer:0, expl:'전원 끄고 접기. 종속 전원이 있으면 이 방법은 못 쓰고 V_oc/I_sc 또는 시험 전원법을 쓴다.' },
  { id:'u4-l1-07', level:1, type:'tf', tags:['Voc/Isc'], src:'기출 유형',
    statement:'실물 회로의 테브난 등가를 얻으려면 단자의 개방 전압과 단락 전류를 측정하면 된다: \\(R_T = V_{oc}/I_{sc}\\).',
    answer:true, expl:'기출 1(g)의 "단자에서 직접 측정" 진술. 단, 실제로 단락시키기 위험한 회로면 부하 두 개로 재는 방법을 쓴다(L3).' },
  { id:'u4-l1-08', level:1, type:'mc', tags:['최대 전력'], src:'교재 표준',
    statement:'테브난 등가(\\(V_T, R_T\\))에 부하 \\(R_L\\)을 달 때 부하 전력이 최대가 되는 조건과 그때의 전력은?',
    choices:['\\(R_L=R_T\\), \\(P_{max}=V_T^2/4R_T\\)','\\(R_L\\to\\infty\\), \\(P=V_T^2/R_T\\)','\\(R_L=0\\), \\(P=\\infty\\)','\\(R_L=2R_T\\), \\(P=V_T^2/8R_T\\)'],
    answer:0, expl:'정합(matching) 조건. 그때 효율은 50%라는 것도 함께 기억(전력 최대 ≠ 효율 최대).' },
  { id:'u4-l1-09', level:1, type:'tf', tags:['부하 효과'], src:'기출 유형',
    statement:'전원(소스) 저항이 부하 저항과 비슷한 크기이면, 부하를 연결했을 때 단자 전압이 개방 전압보다 눈에 띄게 낮아진다.',
    answer:true, expl:'기출 1(j). \\(V_L=V_s R_L/(R_s+R_L)\\) — R_s ≪ R_L이어야 개방 전압에 가깝다. 계측(전압계 부하 효과)과 같은 원리.' },
  { id:'u4-l1-10', level:1, type:'mc', tags:['전원 변환'], src:'교재 표준',
    statement:'전압원 \\(V_s\\)+직렬 \\(R\\) ↔ 전류원 \\(I_s\\)+병렬 \\(R\\) 변환의 올바른 관계는?',
    choices:['\\(I_s=V_s/R\\), 저항은 같은 값 유지','\\(I_s=V_sR\\)','\\(I_s=V_s/R^2\\)','저항이 역수가 된다'],
    answer:0, expl:'외부에서 본 v–i 관계가 같아지는 조건. 변환할 때마다 극성·방향을 그림으로 확인할 것.' },

  /* ---------- L2 (15) ---------- */
  { id:'u4-l2-01', level:2, type:'num', tags:['전원 변환'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:6,max:24,step:2,unit:'V'}, R:{min:2,max:12,step:2,unit:'Ω'} },
    statement:function(p){ return '전압원 '+p.Vs+' V + 직렬 '+p.R+' Ω를 전류원+병렬 저항으로 변환하면?'; },
    solve:function(p){ var I=p.Vs/p.R;
      return { ans:{Is:I, R:p.R}, unit:{Is:'A', R:'Ω'}, steps:[
        '\\(I_s = V_s/R\\) = '+p.Vs+'/'+p.R+' = '+SVH.fmt(I)+' A',
        '저항은 같은 값 '+p.R+' Ω를 병렬로 (외부 v–i 특성 동일 확인: 개방 시 '+p.Vs+' V ✓)' ] }; },
    hints:['개방 전압·단락 전류가 같아야 한다.'] },
  { id:'u4-l2-02', level:2, type:'num', tags:['전원 변환 역'], src:'창작 문제(검산됨)',
    params:{ Is:{min:1,max:6,step:1,unit:'A'}, R:{min:3,max:15,step:3,unit:'Ω'} },
    statement:function(p){ return '전류원 '+p.Is+' A + 병렬 '+p.R+' Ω를 전압원+직렬 저항으로 변환하면?'; },
    solve:function(p){ var V=p.Is*p.R;
      return { ans:{Vs:V, R:p.R}, unit:{Vs:'V', R:'Ω'}, steps:[
        '\\(V_s = I_sR\\) = '+p.Is+'×'+p.R+' = '+SVH.fmt(V)+' V',
        '같은 R을 직렬로' ] }; },
    hints:['반대 방향 변환.'] },
  { id:'u4-l2-03', level:2, type:'num', tags:['테브난(분압기)'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:9,max:24,step:3,unit:'V'}, R1:{min:1,max:9,step:1,unit:'kΩ'}, R2:{min:1,max:9,step:1,unit:'kΩ'} },
    statement:function(p){ return p.Vs+' V 전원의 분압기(R₁='+p.R1+' kΩ 위, R₂='+p.R2+' kΩ 아래)의 출력 단자 테브난 등가(V_T, R_T)는?'; },
    solve:function(p){ var VT=p.Vs*p.R2/(p.R1+p.R2), RT=SVH.par(p.R1,p.R2);
      return { ans:{VT:VT, RT:RT}, unit:{VT:'V', RT:'kΩ'}, steps:[
        'V_T = 개방 전압 = 분압 '+SVH.fmt(VT)+' V',
        'R_T = 전원 끄고(단락) 위·아래가 병렬 = R₁∥R₂ = '+SVH.fmt(RT)+' kΩ',
        '(분압기 출력 임피던스가 R₁∥R₂라는 사실은 실무 단골)' ] }; },
    hints:['전원을 단락하면 R₁이 어디에 붙는지 그림으로.'] },
  { id:'u4-l2-04', level:2, type:'num', tags:['노턴'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:10,max:30,step:5,unit:'V'}, R1:{min:2,max:10,step:2,unit:'Ω'}, R2:{min:2,max:10,step:2,unit:'Ω'} },
    statement:function(p){ return '전압원 '+p.Vs+' V → 직렬 R₁='+p.R1+' Ω → 단자(단자 병렬로 R₂='+p.R2+' Ω). 이 단자의 노턴 등가(I_N, R_N)는?'; },
    solve:function(p){ var IN=p.Vs/p.R1, RN=SVH.par(p.R1,p.R2);
      return { ans:{IN:IN, RN:RN}, unit:{IN:'A', RN:'Ω'}, steps:[
        'I_N = 단자 단락 전류: 단락하면 R₂는 무시되고 I = V_s/R₁ = '+SVH.fmt(IN)+' A',
        'R_N = 전원 끄고 R₁∥R₂ = '+SVH.fmt(RN)+' Ω' ] }; },
    hints:['단락하면 병렬 저항엔 전류가 안 간다.'] },
  { id:'u4-l2-05', level:2, type:'num', tags:['Voc/Isc'], src:'기출 유형',
    params:{ Voc:{min:6,max:24,step:2,unit:'V'}, Isc:{min:1,max:8,step:1,unit:'A'} },
    statement:function(p){ return '어떤 선형 회로의 단자에서 개방 전압 '+p.Voc+' V, 단락 전류 '+p.Isc+' A를 측정했다. 테브난 저항과, 부하 정합 시 최대 전력을 구하라.'; },
    solve:function(p){ var RT=p.Voc/p.Isc, Pm=p.Voc*p.Voc/(4*RT);
      return { ans:{RT:RT, Pm:Pm}, unit:{RT:'Ω', Pm:'W'}, steps:[
        'R_T = V_oc/I_sc = '+SVH.fmt(RT)+' Ω',
        'P_max = V_oc²/(4R_T) = '+SVH.fmt(Pm)+' W (R_L=R_T일 때)' ] }; },
    hints:['측정 두 개면 등가가 나온다.'] },
  { id:'u4-l2-06', level:2, type:'num', tags:['부하 전류'], src:'창작 문제(검산됨)',
    params:{ VT:{min:6,max:24,step:2,unit:'V'}, RT:{min:2,max:10,step:2,unit:'Ω'}, RL:{min:2,max:20,step:2,unit:'Ω'} },
    statement:function(p){ return '테브난 등가 V_T='+p.VT+' V, R_T='+p.RT+' Ω에 부하 R_L='+p.RL+' Ω을 달았다. 부하 전류·전압·전력을 구하라.'; },
    solve:function(p){ var I=p.VT/(p.RT+p.RL), V=I*p.RL, P=I*I*p.RL;
      return { ans:{I:I, V:V, P:P}, unit:{I:'A', V:'V', P:'W'}, steps:[
        'I = V_T/(R_T+R_L) = '+SVH.fmt(I)+' A',
        'V = IR_L = '+SVH.fmt(V)+' V, P = I²R_L = '+SVH.fmt(P)+' W' ] }; },
    hints:['등가가 있으면 부하 계산은 한 루프.'] },
  { id:'u4-l2-07', level:2, type:'num', tags:['최대 전력'], src:'창작 문제(검산됨)',
    params:{ VT:{min:8,max:20,step:4,unit:'V'}, RT:{min:2,max:10,step:1,unit:'Ω'} },
    statement:function(p){ return 'V_T='+p.VT+' V, R_T='+p.RT+' Ω인 전원에서 (a) 최대 전력을 받는 R_L (b) 그때 부하 전력 (c) 그때 효율을 구하라.'; },
    solve:function(p){ var Pm=p.VT*p.VT/(4*p.RT);
      return { ans:{RL:p.RT, Pm:Pm, eff:50}, unit:{RL:'Ω', Pm:'W', eff:'%'}, steps:[
        '정합: R_L = R_T = '+p.RT+' Ω',
        'P_max = V_T²/4R_T = '+SVH.fmt(Pm)+' W',
        '이때 R_T에도 같은 전력이 떨어지므로 효율 = 50 %' ] }; },
    hints:['정합 조건과 그 대가(효율)를 같이 답한다.'] },
  { id:'u4-l2-08', level:2, type:'num', tags:['중첩 2전원'], src:'창작 문제(검산됨)',
    params:{ V1:{min:6,max:18,step:3,unit:'V'}, V2:{min:3,max:12,step:3,unit:'V'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '전압원 V₁='+p.V1+' V — R₁='+p.R1+' Ω — (중간 절점) — R₂='+p.R2+' Ω — 전압원 V₂='+p.V2+' V(둘 다 +가 안쪽, 접지 공유). 중간 절점 전압을 중첩으로 구하라.'; },
    solve:function(p){
      var va=p.V1*p.R2/(p.R1+p.R2); // V2 끔
      var vb=p.V2*p.R1/(p.R1+p.R2); // V1 끔
      return { ans:{va:va, vb:vb, v:va+vb}, unit:{va:'V', vb:'V', v:'V'}, steps:[
        'V₂를 끄면(단락): 분압 v_a = V₁R₂/(R₁+R₂) = '+SVH.fmt(va)+' V',
        'V₁을 끄면: v_b = V₂R₁/(R₁+R₂) = '+SVH.fmt(vb)+' V',
        '합: v = '+SVH.fmt(va+vb)+' V (선형이므로 그냥 더한다)' ] }; },
    hints:['끈 전압원 자리는 전선(단락)이 된다.'] },
  { id:'u4-l2-09', level:2, type:'num', tags:['중첩 V+I'], src:'기출 유형',
    params:{ Vs:{min:6,max:18,step:6,unit:'V'}, Is:{min:1,max:4,step:1,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '전압원 '+p.Vs+' V — R₁='+p.R1+' Ω — 절점 — R₂='+p.R2+' Ω — 접지, 그리고 전류원 '+p.Is+' A가 절점으로 유입. 절점 전압을 중첩으로 구하라.'; },
    solve:function(p){
      var va=p.Vs*p.R2/(p.R1+p.R2);
      var vb=p.Is*SVH.par(p.R1,p.R2);
      return { ans:{va:va, vb:vb, v:va+vb}, unit:{va:'V', vb:'V', v:'V'}, steps:[
        '전류원 끔(개방): 분압 v_a = '+SVH.fmt(va)+' V',
        '전압원 끔(단락): R₁∥R₂에 I_s → v_b = I_s(R₁∥R₂) = '+SVH.fmt(vb)+' V',
        'v = v_a + v_b = '+SVH.fmt(va+vb)+' V' ] }; },
    hints:['전원 종류별 끄는 방법이 다르다.'] },
  { id:'u4-l2-10', level:2, type:'num', tags:['R_T 접기'], src:'창작 문제(검산됨)',
    params:{ R1:{min:2,max:8,step:2,unit:'Ω'}, R2:{min:2,max:8,step:2,unit:'Ω'}, R3:{min:2,max:8,step:2,unit:'Ω'} },
    statement:function(p){ return '전압원(값 무관) — R₁='+p.R1+' Ω — 단자A, 단자A—접지에 R₂='+p.R2+' Ω, 직렬로 이어지는 R₃='+p.R3+' Ω가 단자 바깥에 있다. 단자(R₃ 끝—접지)에서 본 테브난 저항은?'; },
    solve:function(p){ var RT=p.R3+SVH.par(p.R1,p.R2);
      return { ans:RT, unit:'Ω', steps:[
        '전원 단락 → 안쪽은 R₁∥R₂ = '+SVH.fmt(SVH.par(p.R1,p.R2))+' Ω',
        '직렬 R₃ 더해 R_T = '+SVH.fmt(RT)+' Ω' ] }; },
    hints:['단자에서 "안으로" 보며 접는다.'] },
  { id:'u4-l2-11', level:2, type:'num', tags:['노턴→테브난'], src:'창작 문제(검산됨)',
    params:{ IN:{min:2,max:8,step:2,unit:'A'}, RN:{min:3,max:12,step:3,unit:'Ω'}, RL:{min:3,max:12,step:3,unit:'Ω'} },
    statement:function(p){ return '노턴 등가 I_N='+p.IN+' A, R_N='+p.RN+' Ω에 부하 R_L='+p.RL+' Ω. 부하 전류를 (a) 분류로 (b) 테브난 변환 후 직렬로 각각 구해 일치를 확인하라.'; },
    solve:function(p){
      var Ia=p.IN*p.RN/(p.RN+p.RL);
      var VT=p.IN*p.RN, Ib=VT/(p.RN+p.RL);
      return { ans:{Ia:Ia, Ib:Ib}, unit:{Ia:'A', Ib:'A'}, steps:[
        '(a) 분류: I_L = I_N·R_N/(R_N+R_L) = '+SVH.fmt(Ia)+' A',
        '(b) V_T = I_NR_N = '+SVH.fmt(VT)+' V → I_L = V_T/(R_N+R_L) = '+SVH.fmt(Ib)+' A',
        '일치 ✓ — 같은 물리의 두 표현' ] }; },
    hints:['등가끼리는 어떤 계산이든 같은 답.'] },
  { id:'u4-l2-12', level:2, type:'num', tags:['비례성'], src:'창작 문제(검산됨)',
    params:{ Vs1:{min:5,max:15,step:5,unit:'V'}, Io1:{min:1,max:3,step:1,unit:'A'}, Vs2:{min:20,max:40,step:10,unit:'V'} },
    statement:function(p){ return '선형 저항 회로에서 입력 '+p.Vs1+' V일 때 어떤 가지 전류가 '+p.Io1+' A였다. 입력을 '+p.Vs2+' V로 바꾸면 그 가지 전류는?'; },
    solve:function(p){ var I=p.Io1*p.Vs2/p.Vs1;
      return { ans:I, unit:'A', steps:[
        '선형성(비례성): 출력 ∝ 입력 (전원 1개)',
        'I = '+p.Io1+' × '+p.Vs2+'/'+p.Vs1+' = '+SVH.fmt(I)+' A' ] }; },
    hints:['전원이 하나면 스케일링이 전부다.'] },
  { id:'u4-l2-13', level:2, type:'num', tags:['등가 전압원 직렬'], src:'창작 문제(검산됨)',
    params:{ V1:{min:3,max:12,step:3,unit:'V'}, V2:{min:3,max:12,step:3,unit:'V'}, R1:{min:1,max:5,step:1,unit:'Ω'}, R2:{min:1,max:5,step:1,unit:'Ω'} },
    statement:function(p){ return '(V₁='+p.V1+' V, R₁='+p.R1+' Ω)과 (V₂='+p.V2+' V, R₂='+p.R2+' Ω) 두 실제 전압원(전지)이 같은 극성으로 직렬이다. 합성 테브난 등가는?'; },
    solve:function(p){ var VT=p.V1+p.V2, RT=p.R1+p.R2;
      return { ans:{VT:VT, RT:RT}, unit:{VT:'V', RT:'Ω'}, steps:[
        '직렬 전압원은 더해진다: V_T = '+p.V1+'+'+p.V2+' = '+SVH.fmt(VT)+' V',
        '내부저항도 직렬 합: R_T = '+p.R1+'+'+p.R2+' = '+SVH.fmt(RT)+' Ω' ] }; },
    hints:['전지 직렬의 모델화.'] },
  { id:'u4-l2-14', level:2, type:'num', tags:['등가 전류원 병렬'], src:'창작 문제(검산됨)',
    params:{ I1:{min:1,max:5,step:1,unit:'A'}, I2:{min:1,max:5,step:1,unit:'A'}, R1:{min:2,max:8,step:2,unit:'Ω'}, R2:{min:2,max:8,step:2,unit:'Ω'} },
    statement:function(p){ return '(I₁='+p.I1+' A, R₁='+p.R1+' Ω 병렬)과 (I₂='+p.I2+' A, R₂='+p.R2+' Ω 병렬) 두 노턴 전원이 같은 방향으로 병렬 결합. 합성 노턴 등가는?'; },
    solve:function(p){ var IN=p.I1+p.I2, RN=SVH.par(p.R1,p.R2);
      return { ans:{IN:IN, RN:RN}, unit:{IN:'A', RN:'Ω'}, steps:[
        '병렬 전류원은 더해진다: I_N = '+p.I1+'+'+p.I2+' = '+SVH.fmt(IN)+' A',
        '저항은 병렬 합성: R_N = R₁∥R₂ = '+SVH.fmt(RN)+' Ω' ] }; },
    hints:['노턴끼리 병렬은 그냥 더하기.'] },
  { id:'u4-l2-15', level:2, type:'num', tags:['개방 전압 vs 부하'], src:'기출 유형',
    params:{ VT:{min:10,max:20,step:2,unit:'V'}, RT:{choices:[100,500,1000],unit:'Ω'}, RL:{choices:[1000,10000],unit:'Ω'} },
    statement:function(p){ return '내부저항 '+p.RT+' Ω, 개방 전압 '+p.VT+' V인 신호원에 R_L='+SVH.si(p.RL,'Ω')+' 입력저항 계측기를 연결했다. 계측기가 읽는 전압과 개방 전압 대비 비율(%)은?'; },
    solve:function(p){ var V=p.VT*p.RL/(p.RT+p.RL), r=V/p.VT*100;
      return { ans:{V:V, r:r}, unit:{V:'V', r:'%'}, steps:[
        'V = V_T·R_L/(R_T+R_L) = '+SVH.fmt(V)+' V',
        '비율 = '+SVH.fmt(r)+' % → R_L ≫ R_T일수록 100%에 접근(기출 1(j)의 정량판)' ] }; },
    hints:['좋은 전압 측정 = 큰 입력저항.'] },

  /* ---------- L3 (10) ---------- */
  { id:'u4-l3-01', level:3, type:'num', tags:['테브난 종합'], src:'기출 유형',
    params:{ Vs:{min:12,max:24,step:4,unit:'V'}, R1:{min:2,max:8,step:2,unit:'Ω'}, R2:{min:2,max:8,step:2,unit:'Ω'}, R3:{min:1,max:5,step:1,unit:'Ω'} },
    statement:function(p){ return '전압원 '+p.Vs+' V — R₁='+p.R1+' Ω — 절점A(—접지 R₂='+p.R2+' Ω) — R₃='+p.R3+' Ω — 단자B. 단자 B—접지의 테브난 등가를 구하라.'; },
    solve:function(p){
      var VT=p.Vs*p.R2/(p.R1+p.R2); // 개방이라 R3 전류 0
      var RT=p.R3+SVH.par(p.R1,p.R2);
      return { ans:{VT:VT, RT:RT}, unit:{VT:'V', RT:'Ω'}, steps:[
        '개방 시 R₃ 전류 0 → V_oc = 절점A 전압 = 분압 '+SVH.fmt(VT)+' V (R₃ 강하 없음!)',
        'R_T = R₃ + R₁∥R₂ = '+SVH.fmt(RT)+' Ω' ] }; },
    hints:['개방 단자로는 전류가 못 흐른다 — R₃의 역할에 주의.'] },
  { id:'u4-l3-02', level:3, type:'num', tags:['2단 전원 변환'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:12,max:24,step:6,unit:'V'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, R3:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '전압원 '+p.Vs+' V+직렬 R₁='+p.R1+' Ω → (절점—접지 R₂='+p.R2+' Ω) → 직렬 R₃='+p.R3+' Ω → 단자. 전원 변환을 반복해 단자 테브난 등가를 구하라.'; },
    solve:function(p){
      var I1=p.Vs/p.R1, Rp=SVH.par(p.R1,p.R2);
      var V2=I1*Rp, RT=Rp+p.R3;
      return { ans:{VT:V2, RT:RT}, unit:{VT:'V', RT:'Ω'}, steps:[
        '변환1: ('+p.Vs+' V, '+p.R1+' Ω 직렬) → ('+SVH.fmt(I1)+' A, '+p.R1+' Ω 병렬)',
        'R₁∥R₂ = '+SVH.fmt(Rp)+' Ω → 다시 전압원으로: V = I·R = '+SVH.fmt(V2)+' V',
        'R₃ 직렬 흡수 → V_T='+SVH.fmt(V2)+' V, R_T='+SVH.fmt(RT)+' Ω' ] }; },
    hints:['변환→병렬 합→역변환→직렬 합의 리듬.'] },
  { id:'u4-l3-03', level:3, type:'num', tags:['중첩 3전원'], src:'창작 문제(검산됨)',
    params:{ V1:{min:6,max:12,step:6,unit:'V'}, V2:{min:6,max:12,step:6,unit:'V'}, Is:{min:1,max:3,step:1,unit:'A'}, R1:{min:2,max:4,step:2,unit:'Ω'}, R2:{min:2,max:4,step:2,unit:'Ω'} },
    statement:function(p){ return 'u4-l2-08 회로(V₁, R₁, 절점, R₂, V₂)에 전류원 '+p.Is+' A가 절점으로 추가 유입된다. 절점 전압을 중첩 3항으로 구하라.'; },
    solve:function(p){
      var va=p.V1*p.R2/(p.R1+p.R2), vb=p.V2*p.R1/(p.R1+p.R2), vc=p.Is*SVH.par(p.R1,p.R2);
      return { ans:{va:va, vb:vb, vc:vc, v:va+vb+vc}, unit:{va:'V', vb:'V', vc:'V', v:'V'}, steps:[
        'V₁만: '+SVH.fmt(va)+' V · V₂만: '+SVH.fmt(vb)+' V · I_s만: '+SVH.fmt(vc)+' V',
        '합 = '+SVH.fmt(va+vb+vc)+' V — 절점법으로 한 번에 풀어 검산 가능' ] }; },
    hints:['전원 3개 = 항 3개.'] },
  { id:'u4-l3-04', level:3, type:'num', tags:['측정 기반 R_T'], src:'기출 유형',
    params:{ Voc:{min:10,max:20,step:2,unit:'V'}, RL:{choices:[10,20,50],unit:'Ω'}, frac:{choices:[0.5,0.6,0.8]} },
    statement:function(p){ var VL=p.Voc*p.frac; return '개방 전압이 '+p.Voc+' V인 회로에 R_L='+p.RL+' Ω을 달았더니 단자 전압이 '+SVH.fmt(VL)+' V가 되었다. 테브난 저항은? (단락이 위험해 V_oc/I_sc를 못 쓰는 상황)'; },
    solve:function(p){ var VL=p.Voc*p.frac, RT=p.RL*(p.Voc-VL)/VL;
      return { ans:RT, unit:'Ω', steps:[
        '분압 역산: \\(V_L = V_{oc}\\dfrac{R_L}{R_T+R_L}\\)',
        'R_T = R_L(V_oc−V_L)/V_L = '+SVH.fmt(RT)+' Ω',
        '(안전한 실측법 — 기출 1(g)의 실무 확장)' ] }; },
    hints:['분압식을 R_T에 대해 푼다.'] },
  { id:'u4-l3-05', level:3, type:'num', tags:['종속 전원 R_T'], src:'기출 유형',
    params:{ R1:{min:2,max:6,step:2,unit:'Ω'}, k:{choices:[0.5,2]} },
    statement:function(p){ return '단자에 시험 전압 \\(v_t\\)를 걸었더니 유입 전류가 \\(i_t = v_t/'+p.R1+' + '+p.k+'v_t\\) [A]로 측정되는 회로(내부에 종속 전원 존재). 테브난 저항은?'; },
    solve:function(p){ var RT=1/(1/p.R1+p.k);
      return { ans:RT, unit:'Ω', steps:[
        '종속 전원 회로의 R_T = 시험 전원법: \\(R_T = v_t/i_t\\)',
        'R_T = 1/(1/'+p.R1+'+'+p.k+') = '+SVH.fmt(RT)+' Ω',
        '(전원 끄고 접기가 불가능한 이유: 종속 전원은 끌 수 없다)' ] }; },
    hints:['R_T = v_t/i_t 정의로 돌아간다.'] },
  { id:'u4-l3-06', level:3, type:'num', tags:['최대 전력 설계'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:12,max:24,step:6,unit:'V'}, R1:{min:2,max:8,step:2,unit:'Ω'}, R2:{min:2,max:8,step:2,unit:'Ω'} },
    statement:function(p){ return '분압기 전원(V_s='+p.Vs+' V, 위 R₁='+p.R1+' Ω, 아래 R₂='+p.R2+' Ω)의 출력에 부하를 단다. (a) 최대 전력을 받는 R_L (b) 그때 부하 전력을 구하라.'; },
    solve:function(p){
      var VT=p.Vs*p.R2/(p.R1+p.R2), RT=SVH.par(p.R1,p.R2), Pm=VT*VT/(4*RT);
      return { ans:{RL:RT, Pm:Pm}, unit:{RL:'Ω', Pm:'W'}, steps:[
        '테브난 먼저: V_T='+SVH.fmt(VT)+' V, R_T=R₁∥R₂='+SVH.fmt(RT)+' Ω',
        'R_L = R_T = '+SVH.fmt(RT)+' Ω, P_max = V_T²/4R_T = '+SVH.fmt(Pm)+' W' ] }; },
    hints:['최대 전력 문제는 "테브난부터".'] },
  { id:'u4-l3-07', level:3, type:'num', tags:['효율 곡선'], src:'창작 문제(검산됨)',
    params:{ VT:{min:10,max:20,step:5,unit:'V'}, RT:{min:2,max:6,step:2,unit:'Ω'}, m:{choices:[2,3,4]} },
    statement:function(p){ return 'V_T='+p.VT+' V, R_T='+p.RT+' Ω 전원에 R_L='+p.m+'R_T를 달았다. 부하 전력과 효율을 구하고, 정합(R_L=R_T) 때와 비교하라.'; },
    solve:function(p){
      var RL=p.m*p.RT, I=p.VT/(p.RT+RL), P=I*I*RL, eff=RL/(p.RT+RL)*100, Pm=p.VT*p.VT/(4*p.RT);
      return { ans:{P:P, eff:eff}, unit:{P:'W', eff:'%'}, steps:[
        'I = '+SVH.fmt(I)+' A → P = I²R_L = '+SVH.fmt(P)+' W (정합 최대 '+SVH.fmt(Pm)+' W보다 작다)',
        '효율 = R_L/(R_T+R_L) = '+SVH.fmt(eff)+' % (정합 50%보다 높다)',
        '→ "최대 전력"과 "고효율"은 다른 목표라는 것이 결론' ] }; },
    hints:['전력은 정합에서 최대, 효율은 R_L이 클수록 상승.'] },
  { id:'u4-l3-08', level:3, type:'num', tags:['브리지 테브난'], src:'기출 유형',
    params:{ Vs:{min:10,max:20,step:5,unit:'V'}, R1:{min:100,max:300,step:100,unit:'Ω'}, R2:{min:100,max:300,step:100,unit:'Ω'}, R3:{min:100,max:300,step:100,unit:'Ω'}, R4:{min:100,max:300,step:100,unit:'Ω'} },
    statement:function(p){ return '브리지('+p.Vs+' V, 왼쪽 R₁ 위·R₃ 아래, 오른쪽 R₂ 위·R₄ 아래)의 가운데 두 중점 단자에서 본 테브난 등가(V_T, R_T)를 구하라. (검류계 달기 전 준비 계산)'; },
    solve:function(p){
      var VT=p.Vs*(p.R3/(p.R1+p.R3)-p.R4/(p.R2+p.R4));
      var RT=SVH.par(p.R1,p.R3)+SVH.par(p.R2,p.R4);
      return { ans:{VT:VT, RT:RT}, unit:{VT:'V', RT:'Ω'}, steps:[
        'V_T = 두 분압의 차 = '+SVH.fmt(VT)+' V',
        'R_T = 전원 단락 시 (R₁∥R₃)+(R₂∥R₄) = '+SVH.fmt(RT)+' Ω',
        '(가운데에 어떤 검류계(R_g)를 달아도 전류 = V_T/(R_T+R_g) 로 즉시 계산된다)' ] }; },
    hints:['전원을 단락하면 좌우 가지가 각각 병렬로 접힌다.'] },
  { id:'u4-l3-09', level:3, type:'num', tags:['노턴 실전'], src:'창작 문제(검산됨)',
    params:{ Is:{min:2,max:6,step:2,unit:'A'}, R1:{min:2,max:8,step:2,unit:'Ω'}, R2:{min:2,max:8,step:2,unit:'Ω'}, RL:{min:1,max:9,step:2,unit:'Ω'} },
    statement:function(p){ return '전류원 '+p.Is+' A ∥ R₁='+p.R1+' Ω 다음에 직렬 R₂='+p.R2+' Ω를 거쳐 단자. (a) 단자 노턴 등가 (b) R_L='+p.RL+' Ω 연결 시 부하 전류를 구하라.'; },
    solve:function(p){
      var RN=p.R1+p.R2;
      var IN=p.Is*p.R1/(p.R1+p.R2); // 단락 시 분류
      var IL=IN*RN/(RN+p.RL);
      return { ans:{IN:IN, RN:RN, IL:IL}, unit:{IN:'A', RN:'Ω', IL:'A'}, steps:[
        'R_N = 전원 개방 후 R₁+R₂ = '+SVH.fmt(RN)+' Ω',
        'I_N = 단자 단락 시 R₁·R₂ 분류 = I_s·R₁/(R₁+R₂) = '+SVH.fmt(IN)+' A',
        'I_L = I_N·R_N/(R_N+R_L) = '+SVH.fmt(IL)+' A' ] }; },
    hints:['I_sc 계산에서 단락이 어디로 이어지는지 그림.'] },
  { id:'u4-l3-10', level:3, type:'num', tags:['중첩 검산'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:6,max:18,step:6,unit:'V'}, Is:{min:1,max:3,step:1,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return 'u4-l2-09 회로를 절점법으로 한 번에 풀어 중첩 결과와 일치함을 보여라. (같은 파라미터: '+p.Vs+' V, '+p.Is+' A, R₁='+p.R1+', R₂='+p.R2+' Ω)'; },
    solve:function(p){
      var v=(p.Vs/p.R1+p.Is)/(1/p.R1+1/p.R2);
      var va=p.Vs*p.R2/(p.R1+p.R2), vb=p.Is*SVH.par(p.R1,p.R2);
      return { ans:{v:v, vsum:va+vb}, unit:{v:'V', vsum:'V'}, steps:[
        '절점법: \\((V_s-v)/R_1 + I_s = v/R_2\\) → v = '+SVH.fmt(v)+' V',
        '중첩 합 = '+SVH.fmt(va)+'+'+SVH.fmt(vb)+' = '+SVH.fmt(va+vb)+' V → 일치 ✓',
        '(시험장 전략: 중첩으로 풀고 절점법으로 검산, 또는 그 반대)' ] }; },
    hints:['두 방법이 다르면 어딘가 부호 실수다.'] },

  /* ---------- L4 (5) ---------- */
  { id:'u4-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 중첩의 근거는 결합법칙·교환법칙이다<br>㉡ 테브난 등가는 외부에서 본 v–i 관계만 보존하며, 내부 전력 분배까지 재현하지는 않는다<br>㉢ 최대 전력 전달 조건에서 전달 효율은 50%다<br>㉣ 종속 전원만 있는(독립 전원 없는) 회로의 V_oc는 0이다',
    choices:['㉡㉢㉣','㉠㉡㉢','㉠㉣','전부'],
    answer:0, expl:'㉠은 기출의 함정(근거는 선형성). ㉣: 독립 전원이 없으면 스스로 전압을 만들 수 없어 V_oc=0 (R_T만 남는다).' },
  { id:'u4-l4-02', level:4, type:'num', tags:['테브난 풀코스'], src:'기출 유형',
    params:{ Vs:{min:12,max:24,step:4,unit:'V'}, Is:{min:1,max:3,step:1,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, R3:{min:1,max:5,step:2,unit:'Ω'} },
    statement:function(p){ return '전압원 '+p.Vs+' V — R₁='+p.R1+' Ω — 절점A — R₃='+p.R3+' Ω — 단자B. 절점A—접지: R₂='+p.R2+' Ω와 전류원 '+p.Is+' A(절점A로 유입). (a) V_oc (b) R_T (c) 정합 부하 최대 전력을 구하라.'; },
    solve:function(p){
      var vA=(p.Vs/p.R1+p.Is)/(1/p.R1+1/p.R2);
      var RT=p.R3+SVH.par(p.R1,p.R2);
      var Pm=vA*vA/(4*RT);
      return { ans:{Voc:vA, RT:RT, Pm:Pm}, unit:{Voc:'V', RT:'Ω', Pm:'W'}, steps:[
        '개방 → R₃ 전류 0 → V_oc = v_A. 절점법: \\((V_s-v_A)/R_1+I_s = v_A/R_2\\) → v_A = '+SVH.fmt(vA)+' V',
        '전원 끄기(V단락·I개방): R_T = R₃+R₁∥R₂ = '+SVH.fmt(RT)+' Ω',
        'P_max = V_oc²/4R_T = '+SVH.fmt(Pm)+' W' ] }; },
    hints:['V_oc는 절점법, R_T는 끄고 접기 — 역할 분담.','R₃는 개방 전압에 안 나타난다.'] },
  { id:'u4-l4-03', level:4, type:'num', tags:['종속 전원 테브난'], src:'기출 유형',
    params:{ Is:{min:2,max:4,step:1,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, k:{choices:[0.25,0.5]} },
    statement:function(p){ return '단자 안쪽: 전류원 '+p.Is+' A가 절점으로 유입, 절점—접지 R₁='+p.R1+' Ω, 그리고 전압제어 전류원 \\('+p.k+'v\\) A(절점에서 접지로, v는 절점 전압). 절점이 곧 단자다. (a) V_oc (b) I_sc (c) R_T를 구하라.'; },
    solve:function(p){
      var Voc=p.Is/(1/p.R1+p.k);
      var Isc=p.Is; // 단락 시 v=0 → 종속 전원 0, R1도 0
      var RT=Voc/Isc;
      return { ans:{Voc:Voc, Isc:Isc, RT:RT}, unit:{Voc:'V', Isc:'A', RT:'Ω'}, steps:[
        'V_oc: KCL \\(I_s = v/R_1 + '+p.k+'v\\) → '+SVH.fmt(Voc)+' V',
        'I_sc: 단락하면 v=0 → 종속 전원·R₁ 전류 모두 0 → I_sc = I_s = '+SVH.fmt(Isc)+' A',
        'R_T = V_oc/I_sc = '+SVH.fmt(RT)+' Ω (전원 끄고 접기로는 못 구하는 값 — 종속 전원의 존재가 R_T를 바꿨다)' ] }; },
    hints:['종속 전원 회로의 3종 세트: V_oc, I_sc, 비율.','단락이 제어 변수 v를 0으로 만든다.'] },
  { id:'u4-l4-04', level:4, type:'num', tags:['설계 검증'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:20,max:40,step:10,unit:'V'}, RT:{min:4,max:10,step:2,unit:'Ω'}, Preq:{choices:[4,6,8],unit:'W'} },
    constraint:function(p){ return p.Vs*p.Vs/(4*p.RT) > p.Preq*1.05; },
    statement:function(p){ return 'V_T='+p.Vs+' V, R_T='+p.RT+' Ω 전원에서 부하가 정확히 '+p.Preq+' W를 받도록 R_L을 정하려 한다. 가능한 R_L 두 값을 구하라. (이차방정식 — 최대 가능 전력이 '+SVH.fmt(p.Vs*p.Vs/(4*p.RT))+' W임을 먼저 확인)'; },
    solve:function(p){
      // P = V² RL/(RT+RL)² → P RL² + (2 P RT − V²) RL + P RT² = 0
      var a=p.Preq, b=2*p.Preq*p.RT-p.Vs*p.Vs, c=p.Preq*p.RT*p.RT;
      var disc=Math.sqrt(b*b-4*a*c);
      var RL1=(-b+disc)/(2*a), RL2=(-b-disc)/(2*a);
      return { ans:{RL1:RL1, RL2:RL2}, unit:{RL1:'Ω', RL2:'Ω'}, steps:[
        '\\(P = \\dfrac{V^2R_L}{(R_T+R_L)^2}\\) → \\(PR_L^2+(2PR_T-V^2)R_L+PR_T^2=0\\)',
        '근의 공식: R_L = '+SVH.fmt(RL1)+' Ω 또는 '+SVH.fmt(RL2)+' Ω',
        '두 근의 곱 = R_T² (비에트) — 정합점 R_T를 사이에 둔 대칭쌍. 효율은 큰 쪽이 유리' ] }; },
    hints:['부하 전력식을 R_L의 이차방정식으로.','해가 둘인 이유를 정합점과 연결해 설명.'] },
  { id:'u4-l4-05', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'최대 전력 전달 정리(\\(R_L=R_T\\)에서 \\(P_L\\) 최대, \\(P_{max}=V_T^2/4R_T\\))를 미분으로 유도하라.',
    steps:[
      '부하 전력: \\(P_L = i^2R_L = \\left(\\dfrac{V_T}{R_T+R_L}\\right)^2 R_L\\) [무엇을] 한 루프 전류로 표현 [왜] 변수 R_L 하나의 함수로 만들기 위해',
      '극값: \\(\\dfrac{dP_L}{dR_L} = V_T^2\\dfrac{(R_T+R_L)^2 - R_L\\cdot 2(R_T+R_L)}{(R_T+R_L)^4} = V_T^2\\dfrac{R_T-R_L}{(R_T+R_L)^3} = 0\\)',
      '\\(R_L = R_T\\)에서 유일한 극값. 부호 확인: R_L<R_T이면 도함수 +, R_L>R_T이면 − → 최대 ✓',
      '대입: \\(P_{max} = V_T^2 R_T/(2R_T)^2 = V_T^2/4R_T\\)',
      '극한 체크: R_L→0이면 P→0 (전압 없음), R_L→∞이면 P→0 (전류 없음) — 사이 어딘가 최대가 있어야 한다는 직관과 일치 · 차원 체크: [V²/Ω]=[W] ✓'
    ],
    hints:['P_L(R_L)을 쓰고 미분해 0.','끝점 두 극한이 모두 0임을 먼저 보이면 논리가 탄탄해진다.'],
    expl:'유도 과정 자체가 시험 단골. "몫의 미분에서 분자만 보면 된다"는 요령도 함께.' }
  ]
});
