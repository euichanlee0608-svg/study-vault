/* U3 절점·망로 해석 — 절점전압법(초노드), 망로전류법(초메시), 종속 전원 처리 */
SV_BANK.push({
  id: 'u3', no: 3, title: '절점·망로 해석', titleEn: 'Nodal & Mesh Analysis',
  scope: '절점전압법 · 초노드 · 망로전류법 · 초메시 · 종속 전원이 낀 연립 · 전압원 전류 구하기',
  problems: [

  /* ---------- L1 (10) ---------- */
  { id:'u3-l1-01', level:1, type:'mc', tags:['기준 절점'], src:'교재 표준',
    statement:'절점전압법에서 기준 절점(reference node)에 대한 설명으로 옳은 것은?',
    choices:['임의로 하나를 골라 전위 0으로 두며, 보통 연결이 가장 많은 절점을 고른다','반드시 전원의 − 단자여야 한다','물리적 접지가 있어야만 정할 수 있다','회로마다 유일하게 정해져 있다'],
    answer:0, expl:'기준은 선택의 문제다. 연결 많은 절점(흔히 아래 공통선)을 고르면 식이 간단해진다.' },
  { id:'u3-l1-02', level:1, type:'tf', tags:['식 개수'], src:'교재 표준',
    statement:'절점이 n개인 회로의 절점전압법 미지수(방정식) 개수는 n−1개다.',
    answer:true, expl:'기준 절점 하나를 0으로 두므로. 전압원이 있으면 초노드로 더 줄기도 한다.' },
  { id:'u3-l1-03', level:1, type:'mc', tags:['초노드'], src:'교재 표준',
    statement:'두 비기준 절점 사이에 (이상)전압원이 끼어 있을 때 절점전압법의 표준 처리는?',
    choices:['두 절점을 초노드로 묶어 KCL을 세우고, 전압원 값으로 구속식 \\(v_a-v_b=V_s\\)를 추가한다','전압원을 개방으로 바꾼다','전압원을 저항으로 근사한다','그 절점들은 풀 수 없다'],
    answer:0, expl:'전압원 자체의 전류는 미지수라 KCL에 못 쓴다 → 경계를 함께 묶고(초노드), 부족한 정보는 구속식으로.' },
  { id:'u3-l1-04', level:1, type:'tf', tags:['망로법 조건'], src:'교재 표준',
    statement:'망로전류법은 평면(planar) 회로에서 정의되는 메시(mesh)에 KVL을 적용하는 방법이다.',
    answer:true, expl:'교차 없이 그릴 수 있는 회로의 "창문"들이 메시. 비평면 회로면 일반 루프 해석으로.' },
  { id:'u3-l1-05', level:1, type:'mc', tags:['초메시'], src:'교재 표준',
    statement:'두 메시의 공통 가지에 전류원이 있을 때 망로전류법의 표준 처리는?',
    choices:['두 메시를 초메시로 묶어 KVL을 세우고, 전류원 값으로 \\(i_a-i_b=I_s\\) 구속식을 추가한다','전류원을 단락으로 바꾼다','전류원 전압을 0으로 둔다','두 메시 전류를 같다고 둔다'],
    answer:0, expl:'전류원 양단 전압이 미지수라 KVL에 바로 못 쓴다 → 초메시. 초노드와 완전한 쌍대.' },
  { id:'u3-l1-06', level:1, type:'tf', tags:['전원 선택'], src:'교재 표준',
    statement:'전류원이 많은 회로는 절점법이, 전압원이 많은 회로는 망로법이 대체로 유리하다.',
    answer:true, expl:'전류원은 KCL(절점)에, 전압원은 KVL(망로)에 바로 들어가기 때문. 다만 "구하려는 값"이 무엇이냐도 기준이 된다.' },
  { id:'u3-l1-07', level:1, type:'mc', tags:['부호 규약'], src:'교재 표준',
    statement:'절점 a에서 저항 R로 절점 b와 연결될 때, a에서 나가는 전류의 표준 표현은?',
    choices:['\\((v_a-v_b)/R\\)','\\((v_b-v_a)/R\\)','\\(v_a/R\\)','\\(R(v_a-v_b)\\)'],
    answer:0, expl:'"내 전위 − 상대 전위"를 저항으로 나눈 것이 나가는 전류. 이 부호 하나로 연립의 절반이 결정된다.' },
  { id:'u3-l1-08', level:1, type:'tf', tags:['종속 전원'], src:'교재 표준',
    statement:'종속 전원이 있으면 제어 변수(예: \\(i_x, v_x\\))를 절점전압이나 망로전류로 표현하는 보조식이 하나 더 필요하다.',
    answer:true, expl:'미지수를 늘리지 않으려면 제어 변수를 기본 미지수로 바꿔 넣는 것이 표준 절차다.' },
  { id:'u3-l1-09', level:1, type:'mc', tags:['해의 검증'], src:'교재 표준',
    statement:'절점/망로 해를 구한 뒤 가장 실전적인 검증 방법은?',
    choices:['안 쓴 법칙으로 확인(절점법이면 임의 루프 KVL, 망로법이면 임의 절점 KCL) 또는 전력 수지 확인','같은 식을 한 번 더 푼다','수치를 반올림해 본다','저항을 모두 더해 본다'],
    answer:0, expl:'같은 경로 재계산은 같은 실수를 반복한다. 다른 법칙·전력 보존으로 교차 검증하는 것이 시험장 표준.' },
  { id:'u3-l1-10', level:1, type:'tf', tags:['전압원 전류'], src:'기출 유형',
    statement:'절점법으로 회로를 다 푼 뒤에도, 전압원을 흐르는 전류는 그 전압원이 연결된 절점의 KCL로 따로 구해야 한다.',
    answer:true, expl:'기출 2(a)가 정확히 이것: 절점전압들을 구한 뒤 전압원 절점에서 KCL로 전원 전류를 계산한다.' },

  /* ---------- L2 (15) ---------- */
  { id:'u3-l2-01', level:2, type:'num', tags:['절점 1개'], src:'창작 문제(검산됨)',
    params:{ Is:{min:2,max:10,step:1,unit:'A'}, R1:{min:2,max:10,step:2,unit:'Ω'}, R2:{min:2,max:10,step:2,unit:'Ω'} },
    statement:function(p){ return '절점 v: 전류원 '+p.Is+' A 유입, v에서 접지로 R₁='+p.R1+' Ω, R₂='+p.R2+' Ω. 절점전압 v는?'; },
    solve:function(p){ var v=p.Is/(1/p.R1+1/p.R2);
      return { ans:v, unit:'V', steps:[
        'KCL: \\(I_s = v/R_1 + v/R_2\\)',
        'v = '+p.Is+'/('+SVH.fmt(1/p.R1)+'+'+SVH.fmt(1/p.R2)+') = '+SVH.fmt(v)+' V' ] }; },
    hints:['나가는 전류 합 = 들어오는 전류.','컨덕턴스 합으로 나눈다.'] },
  { id:'u3-l2-02', level:2, type:'num', tags:['절점 2개'], src:'창작 문제(검산됨)',
    params:{ Is:{min:2,max:8,step:2,unit:'A'}, R1:{min:2,max:8,step:2,unit:'Ω'}, R2:{min:2,max:8,step:2,unit:'Ω'}, R3:{min:2,max:8,step:2,unit:'Ω'} },
    statement:function(p){ return '전류원 '+p.Is+' A가 절점 1로 유입. 절점 1—접지 R₁='+p.R1+' Ω, 절점 1—절점 2 R₂='+p.R2+' Ω, 절점 2—접지 R₃='+p.R3+' Ω. \\(v_1, v_2\\)를 구하라.'; },
    solve:function(p){
      var a11=1/p.R1+1/p.R2, a12=-1/p.R2, a21=-1/p.R2, a22=1/p.R2+1/p.R3;
      var s=SVH.solve2(a11,a12,p.Is,a21,a22,0);
      return { ans:{v1:s[0], v2:s[1]}, unit:{v1:'V', v2:'V'}, steps:[
        'KCL@1: \\((1/R_1+1/R_2)v_1 - v_2/R_2 = I_s\\)',
        'KCL@2: \\(-v_1/R_2 + (1/R_2+1/R_3)v_2 = 0\\)',
        '연립 풀이: v₁ = '+SVH.fmt(s[0])+' V, v₂ = '+SVH.fmt(s[1])+' V' ] }; },
    hints:['절점마다 KCL 한 줄.','대각 = 자기 컨덕턴스 합, 비대각 = −공유 컨덕턴스.'] },
  { id:'u3-l2-03', level:2, type:'num', tags:['망로 1개'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:6,max:24,step:2,unit:'V'}, R1:{min:2,max:10,step:2,unit:'Ω'}, R2:{min:2,max:10,step:2,unit:'Ω'} },
    statement:function(p){ return '단일 메시: '+p.Vs+' V 전원, R₁='+p.R1+' Ω, R₂='+p.R2+' Ω 직렬. 메시 전류는?'; },
    solve:function(p){ var i=p.Vs/(p.R1+p.R2);
      return { ans:i, unit:'A', steps:[
        'KVL: \\(V_s = i(R_1+R_2)\\)',
        'i = '+p.Vs+'/'+(p.R1+p.R2)+' = '+SVH.fmt(i)+' A' ] }; },
    hints:['한 바퀴 KVL이면 끝.'] },
  { id:'u3-l2-04', level:2, type:'num', tags:['망로 2개'], src:'기출 유형',
    params:{ Vs:{min:6,max:18,step:2,unit:'V'}, R1:{min:2,max:8,step:2,unit:'Ω'}, R2:{min:2,max:8,step:2,unit:'Ω'}, R3:{min:2,max:8,step:2,unit:'Ω'} },
    statement:function(p){ return '메시 1: 전원 '+p.Vs+' V와 R₁='+p.R1+' Ω, 공유 가지 R₂='+p.R2+' Ω. 메시 2: R₂와 R₃='+p.R3+' Ω. 두 메시 전류(같은 방향, 시계)를 구하라.'; },
    solve:function(p){
      var s=SVH.solve2(p.R1+p.R2, -p.R2, p.Vs, -p.R2, p.R2+p.R3, 0);
      return { ans:{i1:s[0], i2:s[1]}, unit:{i1:'A', i2:'A'}, steps:[
        '메시1: \\((R_1+R_2)i_1 - R_2 i_2 = V_s\\)',
        '메시2: \\(-R_2 i_1 + (R_2+R_3)i_2 = 0\\)',
        'i₁ = '+SVH.fmt(s[0])+' A, i₂ = '+SVH.fmt(s[1])+' A' ] }; },
    hints:['대각 = 메시 저항 합, 비대각 = −공유 저항.','전원은 전류 방향으로 상승이면 +.'] },
  { id:'u3-l2-05', level:2, type:'num', tags:['공유 가지 전류'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:8,max:20,step:4,unit:'V'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, R3:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '위 문제와 같은 2메시 회로('+p.Vs+' V, R₁='+p.R1+', R₂='+p.R2+', R₃='+p.R3+' Ω)에서 공유 가지 R₂에 실제로 흐르는 전류는? (메시1 방향 기준)'; },
    solve:function(p){
      var s=SVH.solve2(p.R1+p.R2, -p.R2, p.Vs, -p.R2, p.R2+p.R3, 0);
      var i=s[0]-s[1];
      return { ans:i, unit:'A', steps:[
        '두 메시 전류를 먼저: i₁='+SVH.fmt(s[0])+' A, i₂='+SVH.fmt(s[1])+' A',
        '공유 가지 전류 = i₁ − i₂ = '+SVH.fmt(i)+' A (겹치는 방향이 반대이므로 차)' ] }; },
    hints:['공유 가지에는 두 메시 전류가 겹친다.'] },
  { id:'u3-l2-06', level:2, type:'num', tags:['절점+전압원(접지 연결)'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:6,max:18,step:3,unit:'V'}, R1:{min:2,max:8,step:2,unit:'Ω'}, R2:{min:2,max:8,step:2,unit:'Ω'} },
    statement:function(p){ return '전압원 '+p.Vs+' V가 접지와 절점 1 사이에 직접 연결(+가 절점 1). 절점 1—절점 2에 R₁='+p.R1+' Ω, 절점 2—접지에 R₂='+p.R2+' Ω. v₂는?'; },
    solve:function(p){ var v2=p.Vs*p.R2/(p.R1+p.R2);
      return { ans:v2, unit:'V', steps:[
        '접지에 붙은 전압원 → \\(v_1 = V_s\\) (미지수 소거!)',
        'KCL@2: \\((v_1-v_2)/R_1 = v_2/R_2\\) → v₂ = '+SVH.fmt(v2)+' V' ] }; },
    hints:['접지 연결 전압원은 그 절점전압을 그냥 정해 준다.'] },
  { id:'u3-l2-07', level:2, type:'num', tags:['초노드'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:2,max:8,step:2,unit:'V'}, Is:{min:2,max:6,step:1,unit:'A'}, R1:{min:2,max:8,step:2,unit:'Ω'}, R2:{min:2,max:8,step:2,unit:'Ω'} },
    statement:function(p){ return '절점 1—절점 2 사이에 전압원 '+p.Vs+' V(+가 절점 1). 전류원 '+p.Is+' A가 절점 1로 유입, 절점 1—접지 R₁='+p.R1+' Ω, 절점 2—접지 R₂='+p.R2+' Ω. v₁, v₂를 구하라.'; },
    solve:function(p){
      // 초노드 KCL: Is = v1/R1 + v2/R2, 구속: v1 - v2 = Vs
      var v2=(p.Is-p.Vs/p.R1)/(1/p.R1+1/p.R2), v1=v2+p.Vs;
      return { ans:{v1:v1, v2:v2}, unit:{v1:'V', v2:'V'}, steps:[
        '초노드(1+2) KCL: \\(I_s = v_1/R_1 + v_2/R_2\\)',
        '구속식: \\(v_1 - v_2 = '+p.Vs+'\\)',
        '대입 풀이: v₂ = '+SVH.fmt(v2)+' V, v₁ = '+SVH.fmt(v1)+' V' ] }; },
    hints:['전압원 경계를 하나로 묶어 KCL.','부족한 한 식은 전압원 값.'] },
  { id:'u3-l2-08', level:2, type:'num', tags:['초메시'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:8,max:20,step:4,unit:'V'}, Is:{min:1,max:4,step:1,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R3:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '2메시 회로: 메시1에 전원 '+p.Vs+' V·R₁='+p.R1+' Ω, 메시2에 R₃='+p.R3+' Ω, 공유 가지에 전류원 '+p.Is+' A(메시1 방향으로). i₁, i₂(시계)를 구하라.'; },
    solve:function(p){
      // 구속: i1 - i2 = Is, 초메시 KVL: Vs = i1 R1 + i2 R3
      var i2=(p.Vs-p.Is*p.R1)/(p.R1+p.R3), i1=i2+p.Is;
      return { ans:{i1:i1, i2:i2}, unit:{i1:'A', i2:'A'}, steps:[
        '구속식: \\(i_1 - i_2 = '+p.Is+'\\) (공유 전류원)',
        '초메시 KVL(바깥 한 바퀴): \\(V_s = i_1R_1 + i_2R_3\\)',
        'i₂ = '+SVH.fmt(i2)+' A, i₁ = '+SVH.fmt(i1)+' A' ] }; },
    hints:['전류원 가지를 피해서 큰 루프로 KVL.','전류원은 구속식으로.'] },
  { id:'u3-l2-09', level:2, type:'num', tags:['전압원 전류'], src:'기출 유형',
    params:{ Vs:{min:6,max:15,step:3,unit:'V'}, R1:{min:2,max:6,step:1,unit:'Ω'}, R2:{min:2,max:6,step:1,unit:'Ω'} },
    statement:function(p){ return '전압원 '+p.Vs+' V(접지—절점1)에 절점1—접지로 R₁='+p.R1+' Ω, R₂='+p.R2+' Ω가 병렬로 매달려 있다. 전압원이 내보내는 전류는? (기출 2(a) 최소형)'; },
    solve:function(p){ var i=p.Vs/p.R1+p.Vs/p.R2;
      return { ans:i, unit:'A', steps:[
        'v₁ = V_s로 확정. 전압원 전류는 절점1 KCL로:',
        'i = v₁/R₁ + v₁/R₂ = '+SVH.fmt(p.Vs/p.R1)+'+'+SVH.fmt(p.Vs/p.R2)+' = '+SVH.fmt(i)+' A' ] }; },
    hints:['전압원 전류는 마지막에 KCL로 회수한다.'] },
  { id:'u3-l2-10', level:2, type:'num', tags:['종속 전원(절점)'], src:'창작 문제(검산됨)',
    params:{ Is:{min:2,max:6,step:1,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, k:{min:1,max:3,step:1} },
    statement:function(p){ return '절점 v: 전류원 '+p.Is+' A 유입, v—접지 R₁='+p.R1+' Ω, v—접지로 전압제어 전류원 \\('+p.k+'v/'+p.R2+'\\) A(나가는 방향). v는?'; },
    solve:function(p){ var v=p.Is/(1/p.R1+p.k/p.R2);
      return { ans:v, unit:'V', steps:[
        'KCL: \\(I_s = v/R_1 + '+p.k+'v/'+p.R2+'\\)',
        'v = '+p.Is+'/('+SVH.fmt(1/p.R1)+'+'+SVH.fmt(p.k/p.R2)+') = '+SVH.fmt(v)+' V' ] }; },
    hints:['종속 전원 값이 이미 v로 표현되어 있다 — 그대로 KCL에.'] },
  { id:'u3-l2-11', level:2, type:'num', tags:['종속 전원(망로)'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:10,max:20,step:2,unit:'V'}, R1:{min:2,max:6,step:1,unit:'Ω'}, R2:{min:2,max:6,step:1,unit:'Ω'}, k:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '단일 메시: '+p.Vs+' V → R₁='+p.R1+' Ω → R₂='+p.R2+' Ω → 전류제어 전압원 \\('+p.k+'i\\) V(전류 방향 기준 강하). 메시 전류 i는?'; },
    solve:function(p){ var i=p.Vs/(p.R1+p.R2+p.k);
      return { ans:i, unit:'A', steps:[
        'KVL: \\(V_s = iR_1 + iR_2 + '+p.k+'i\\)',
        'i = '+p.Vs+'/'+(p.R1+p.R2+p.k)+' = '+SVH.fmt(i)+' A (종속 전압원이 저항처럼 더해진 꼴)' ] }; },
    hints:['ki 항을 묶으면 등가 저항처럼 보인다.'] },
  { id:'u3-l2-12', level:2, type:'num', tags:['절점 2개+2전원'], src:'기출 유형',
    params:{ I1:{min:1,max:4,step:1,unit:'A'}, I2:{min:1,max:4,step:1,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, R3:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '전류원 '+p.I1+' A → 절점1 유입, 전류원 '+p.I2+' A → 절점2 유입. 절점1—접지 R₁='+p.R1+' Ω, 절점1—절점2 R₂='+p.R2+' Ω, 절점2—접지 R₃='+p.R3+' Ω. v₁, v₂는?'; },
    solve:function(p){
      var s=SVH.solve2(1/p.R1+1/p.R2, -1/p.R2, p.I1, -1/p.R2, 1/p.R2+1/p.R3, p.I2);
      return { ans:{v1:s[0], v2:s[1]}, unit:{v1:'V', v2:'V'}, steps:[
        'KCL@1: \\((G_1+G_2)v_1 - G_2v_2 = I_1\\)',
        'KCL@2: \\(-G_2v_1 + (G_2+G_3)v_2 = I_2\\)',
        'v₁ = '+SVH.fmt(s[0])+' V, v₂ = '+SVH.fmt(s[1])+' V' ] }; },
    hints:['우변에 각 절점의 유입 전류원.'] },
  { id:'u3-l2-13', level:2, type:'num', tags:['망로 2개+2전원'], src:'창작 문제(검산됨)',
    params:{ V1:{min:6,max:18,step:3,unit:'V'}, V2:{min:3,max:12,step:3,unit:'V'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, R3:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '메시1: 전원 '+p.V1+' V·R₁='+p.R1+' Ω, 공유 R₂='+p.R2+' Ω, 메시2: R₃='+p.R3+' Ω·전원 '+p.V2+' V(메시2 전류를 미는 방향). i₁, i₂(시계)는?'; },
    solve:function(p){
      var s=SVH.solve2(p.R1+p.R2, -p.R2, p.V1, -p.R2, p.R2+p.R3, p.V2);
      return { ans:{i1:s[0], i2:s[1]}, unit:{i1:'A', i2:'A'}, steps:[
        '메시1: \\((R_1+R_2)i_1 - R_2i_2 = '+p.V1+'\\)',
        '메시2: \\(-R_2i_1 + (R_2+R_3)i_2 = '+p.V2+'\\)',
        'i₁ = '+SVH.fmt(s[0])+' A, i₂ = '+SVH.fmt(s[1])+' A' ] }; },
    hints:['각 메시의 전원 부호를 방향 기준으로.'] },
  { id:'u3-l2-14', level:2, type:'num', tags:['가지 전압 회수'], src:'창작 문제(검산됨)',
    params:{ Is:{min:3,max:9,step:3,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, R3:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return 'u3-l2-02와 같은 회로('+p.Is+' A, R₁·R₂·R₃='+p.R1+'·'+p.R2+'·'+p.R3+' Ω)에서 R₂(절점1—절점2)에 걸리는 전압과 소비 전력을 구하라.'; },
    solve:function(p){
      var s=SVH.solve2(1/p.R1+1/p.R2, -1/p.R2, p.Is, -1/p.R2, 1/p.R2+1/p.R3, 0);
      var v=s[0]-s[1], P=v*v/p.R2;
      return { ans:{v:v, P:P}, unit:{v:'V', P:'W'}, steps:[
        'v₁='+SVH.fmt(s[0])+' V, v₂='+SVH.fmt(s[1])+' V',
        'R₂ 전압 = v₁−v₂ = '+SVH.fmt(v)+' V, 전력 = v²/R₂ = '+SVH.fmt(P)+' W' ] }; },
    hints:['가지 전압 = 두 절점전압의 차.'] },
  { id:'u3-l2-15', level:2, type:'num', tags:['식 세우기 검산'], src:'창작 문제(검산됨)',
    params:{ G1:{min:1,max:4,step:1,unit:'S'}, G2:{min:1,max:4,step:1,unit:'S'}, G3:{min:1,max:4,step:1,unit:'S'}, I:{min:2,max:10,step:2,unit:'A'} },
    statement:function(p){ return '컨덕턴스 행렬식이 \\(\\begin{bmatrix}'+(p.G1+p.G2)+' & -'+p.G2+'\\\\ -'+p.G2+' & '+(p.G2+p.G3)+'\\end{bmatrix}\\begin{bmatrix}v_1\\\\v_2\\end{bmatrix}=\\begin{bmatrix}'+p.I+'\\\\0\\end{bmatrix}\\) 일 때 v₂는? (G단위 S)'; },
    solve:function(p){
      var s=SVH.solve2(p.G1+p.G2, -p.G2, p.I, -p.G2, p.G2+p.G3, 0);
      return { ans:s[1], unit:'V', steps:[
        '크래머: \\(v_2 = \\dfrac{G_2 I}{(G_1+G_2)(G_2+G_3)-G_2^2}\\)',
        'v₂ = '+SVH.fmt(s[1])+' V' ] }; },
    hints:['2×2는 크래머가 빠르다.'] },

  /* ---------- L3 (10) ---------- */
  { id:'u3-l3-01', level:3, type:'num', tags:['절점 3개'], src:'창작 문제(검산됨)',
    params:{ Is:{min:2,max:6,step:2,unit:'A'}, R:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '모든 저항 '+p.R+' Ω: 전류원 '+p.Is+' A → 절점1. 절점1—접지, 절점1—절점2, 절점2—접지, 절점2—절점3, 절점3—접지 각각 R. v₃를 구하라.'; },
    solve:function(p){
      var G=1/p.R;
      var s=SVH.solve3([[2*G,-G,0],[-G,3*G,-G],[0,-G,2*G]],[p.Is,0,0]);
      return { ans:s[2], unit:'V', steps:[
        '절점 3개 KCL (모두 G=1/R): 대각 [2G, 3G, 2G], 비대각 −G',
        '연립 해: v₁='+SVH.fmt(s[0])+', v₂='+SVH.fmt(s[1])+', v₃='+SVH.fmt(s[2])+' V' ] }; },
    hints:['3×3도 규칙은 같다: 대각=자기 합, 비대각=−공유.'] },
  { id:'u3-l3-02', level:3, type:'num', tags:['망로 3개'], src:'기출 유형',
    params:{ Vs:{min:6,max:12,step:3,unit:'V'}, R:{min:1,max:4,step:1,unit:'Ω'} },
    statement:function(p){ return '3메시 사다리(모든 저항 '+p.R+' Ω, 각 메시 사이 공유 저항도 '+p.R+' Ω): 메시1에만 전원 '+p.Vs+' V. 메시 저항행렬 대각 [2R,3R,2R], 비대각 −R일 때 i₃는?'; },
    solve:function(p){
      var s=SVH.solve3([[2*p.R,-p.R,0],[-p.R,3*p.R,-p.R],[0,-p.R,2*p.R]],[p.Vs,0,0]);
      return { ans:s[2], unit:'A', steps:[
        '행렬 그대로 연립: i₁='+SVH.fmt(s[0])+', i₂='+SVH.fmt(s[1])+', i₃='+SVH.fmt(s[2])+' A',
        '멀어질수록 전류가 줄어드는지(감쇠) 확인 — 사다리의 직관' ] }; },
    hints:['크래머 or 소거법.','기출 2(b)가 정확히 3메시 연립이다.'] },
  { id:'u3-l3-03', level:3, type:'num', tags:['초노드 종합'], src:'기출 유형',
    params:{ Vs:{min:2,max:6,step:1,unit:'V'}, Is:{min:2,max:6,step:2,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, R3:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '절점1—절점2에 전압원 '+p.Vs+' V(+절점1). 절점1—접지 R₁='+p.R1+' Ω, 절점2—접지 R₂='+p.R2+' Ω와 R₃='+p.R3+' Ω(병렬), 전류원 '+p.Is+' A가 절점2로 유입. v₁·v₂와 전압원을 흐르는 전류(1→2 방향)를 구하라.'; },
    solve:function(p){
      var G2=1/p.R2+1/p.R3;
      var v2=(p.Is-p.Vs/p.R1)/(1/p.R1+G2), v1=v2+p.Vs;
      var i12=v2*G2-p.Is; // KCL@2: i(1→2) + Is = v2·G2
      return { ans:{v1:v1, v2:v2, i12:i12}, unit:{v1:'V', v2:'V', i12:'A'}, steps:[
        '초노드 KCL: \\(I_s = v_1/R_1 + v_2(1/R_2+1/R_3)\\), 구속 \\(v_1-v_2=V_s\\)',
        'v₂ = '+SVH.fmt(v2)+' V, v₁ = '+SVH.fmt(v1)+' V',
        '전압원 전류(1→2): 절점2 KCL로 회수 — \\(i_{12} + I_s = v_2(G_2+G_3)\\) → i₁₂ = '+SVH.fmt(i12)+' A' ] }; },
    hints:['다 푼 뒤 전압원 전류는 어느 한쪽 절점 KCL로.','부호(방향)를 명시하고 시작.'] },
  { id:'u3-l3-04', level:3, type:'num', tags:['초메시 종합'], src:'창작 문제(검산됨)',
    params:{ V1:{min:8,max:16,step:4,unit:'V'}, Is:{min:1,max:3,step:1,unit:'A'}, R1:{min:2,max:4,step:1,unit:'Ω'}, R2:{min:2,max:4,step:1,unit:'Ω'}, R3:{min:2,max:4,step:1,unit:'Ω'} },
    statement:function(p){ return '2메시: 메시1에 전원 '+p.V1+' V·R₁='+p.R1+' Ω·공유 저항 R₂='+p.R2+' Ω 아님 — 공유 가지에는 전류원 '+p.Is+' A(메시1 방향)와 직렬 저항 없음. 메시2에 R₂='+p.R2+' Ω·R₃='+p.R3+' Ω. i₁·i₂와 전류원 양단 전압(메시1 쪽 +)을 구하라.'; },
    solve:function(p){
      var i2=(p.V1-p.Is*p.R1)/(p.R1+p.R2+p.R3), i1=i2+p.Is;
      var vI=p.V1-i1*p.R1; // 메시1 KVL로 전류원 전압 회수
      return { ans:{i1:i1, i2:i2, vI:vI}, unit:{i1:'A', i2:'A', vI:'V'}, steps:[
        '구속: \\(i_1-i_2 = '+p.Is+'\\)',
        '초메시 KVL: \\(V_1 = i_1R_1 + i_2(R_2+R_3)\\) → i₂='+SVH.fmt(i2)+', i₁='+SVH.fmt(i1)+' A',
        '전류원 전압: 메시1 KVL 되짚기 \\(v_I = V_1 - i_1R_1\\) = '+SVH.fmt(vI)+' V' ] }; },
    hints:['전류원 전압은 마지막에 한 메시 KVL로 회수.'] },
  { id:'u3-l3-05', level:3, type:'num', tags:['종속+절점 2개'], src:'창작 문제(검산됨)',
    params:{ Is:{min:2,max:6,step:2,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, k:{min:1,max:2,step:1} },
    statement:function(p){ return '절점1: 전류원 '+p.Is+' A 유입, R₁='+p.R1+' Ω로 접지. 절점1—절점2 R₂='+p.R2+' Ω. 절점2—접지에 전류제어 전류원 \\('+p.k+'i_x\\)(아래로), \\(i_x\\)는 R₂의 1→2 전류. v₁, v₂는?'; },
    solve:function(p){
      // KCL@2: ix = k ix → ix(1-k)=0 ... 주의! 절점2에 다른 소자가 없으면 k=1일 때 부정.
      // 실제: KCL@2: (v1-v2)/R2 = k*(v1-v2)/R2 → (1-k)(v1-v2)=0 → k≠1이면 v1=v2 → ix=0
      // 그러면 KCL@1: Is = v1/R1 → v1=Is*R1
      var v1, v2;
      if (p.k !== 1) { v1 = p.Is*p.R1; v2 = v1; }
      return { ans:{v1:v1, v2:v2}, unit:{v1:'V', v2:'V'}, steps:[
        'KCL@2: \\(i_x = '+p.k+'i_x\\) → \\((1-'+p.k+')i_x = 0\\) → k≠1이므로 \\(i_x=0\\)',
        '즉 R₂에 전류가 없다 → v₁ = v₂',
        'KCL@1: \\(I_s = v_1/R_1\\) → v₁ = '+SVH.fmt(p.Is*p.R1)+' V = v₂',
        '(종속 전원 문제에서 "전류가 0이 강제되는" 특수 구조 — 방정식이 말해 주는 것을 믿어라)' ] };
    },
    constraint:function(p){ return p.k!==1; },
    hints:['절점2에 연결된 소자가 R₂와 종속 전원뿐이다.','KCL@2를 세우면 ix가 결정된다.'] },
  { id:'u3-l3-06', level:3, type:'num', tags:['종속+망로'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:10,max:20,step:5,unit:'V'}, R1:{min:2,max:4,step:1,unit:'Ω'}, R2:{min:2,max:4,step:1,unit:'Ω'}, R3:{min:2,max:4,step:1,unit:'Ω'}, k:{min:2,max:4,step:2,unit:'Ω'} },
    statement:function(p){ return '2메시: 메시1 전원 '+p.Vs+' V·R₁='+p.R1+' Ω, 공유 R₂='+p.R2+' Ω, 메시2 R₃='+p.R3+' Ω와 전류제어 전압원 \\('+p.k+'i_1\\) V(메시2 전류와 같은 방향으로 미는 극성). i₁, i₂는?'; },
    solve:function(p){
      // 메시1: (R1+R2)i1 - R2 i2 = Vs
      // 메시2: -R2 i1 + (R2+R3) i2 = k i1  →  -(R2+k) i1 + (R2+R3) i2 = 0
      var s=SVH.solve2(p.R1+p.R2, -p.R2, p.Vs, -(p.R2+p.k), p.R2+p.R3, 0);
      return { ans:{i1:s[0], i2:s[1]}, unit:{i1:'A', i2:'A'}, steps:[
        '메시1: \\((R_1+R_2)i_1 - R_2i_2 = V_s\\)',
        '메시2: \\(-R_2i_1 + (R_2+R_3)i_2 = '+p.k+'i_1\\) → 종속항을 좌변으로',
        'i₁ = '+SVH.fmt(s[0])+' A, i₂ = '+SVH.fmt(s[1])+' A' ] }; },
    hints:['종속 전원 값(k·i₁)을 미지수 쪽으로 넘겨 정리한다.'] },
  { id:'u3-l3-07', level:3, type:'num', tags:['혼합 전원 절점'], src:'기출 유형',
    params:{ Vs:{min:3,max:9,step:3,unit:'V'}, Is:{min:1,max:4,step:1,unit:'A'}, R1:{min:2,max:4,step:2,unit:'Ω'}, R2:{min:2,max:4,step:2,unit:'Ω'}, R3:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '기출 2(a) 축소형: 전압원 '+p.Vs+' V(접지—절점1), 절점1—절점2 R₁='+p.R1+' Ω, 절점2—접지 R₂='+p.R2+' Ω, R₃='+p.R3+' Ω 병렬, 전류원 '+p.Is+' A 절점2 유입. 전압원을 흐르는 전류(전원에서 절점1로)를 구하라.'; },
    solve:function(p){
      var G2=1/p.R2+1/p.R3;
      // v1=Vs, KCL@2: (Vs-v2)/R1 + Is = v2*G2
      var v2=(p.Vs/p.R1+p.Is)/(1/p.R1+G2);
      var i=(p.Vs-v2)/p.R1; // 전압원 전류 = R1로 나가는 전류
      return { ans:i, unit:'A', steps:[
        'v₁ = '+p.Vs+' V (접지 연결 전압원)',
        'KCL@2: \\((v_1-v_2)/R_1 + I_s = v_2(1/R_2+1/R_3)\\) → v₂ = '+SVH.fmt(v2)+' V',
        '전압원 전류 = 절점1에서 나가는 유일한 경로 R₁의 전류 = (v₁−v₂)/R₁ = '+SVH.fmt(i)+' A' ] }; },
    hints:['절점1에 붙은 소자를 전부 나열하면 전압원 전류가 KCL로 나온다.'] },
  { id:'u3-l3-08', level:3, type:'num', tags:['브리지 망로'], src:'기출 유형',
    params:{ Is:{min:1,max:3,step:1,unit:'A'} },
    statement:function(p){ return '기출 4번 유형: 전류원 '+p.Is+' A가 브리지 회로(위 1 Ω·½ Ω, 가운데 ⅕ Ω, 아래 ¼ Ω·⅓ Ω)를 구동한다. 전류원이 메시1을 통째로 지나므로 \\(i_1='+p.Is+'\\) A로 고정된다. 가운데 가지(⅕ Ω)의 전류 \\(i_1-i_2... \\) 대신, 메시 2·3 연립을 풀어 \\(i=i_3-i_2\\)를 구하라. (메시2: 위 ½·가운데 ⅕ 공유·아래?? — 배열: 메시2 = [1, ½, ⅕], 메시3 = [¼, ⅓, ⅕])'; },
    solve:function(p){
      // 메시1 = 전류원 → i1 = Is. 저항(모두 Ω): 메시2: 1(i2-i1) + 1/2 i2 + 1/5 (i2-i3) = 0
      // 메시3: 1/4(i3-i1) + 1/5(i3-i2) + 1/3 i3 = 0
      var A=[[1+0.5+0.2, -0.2],[ -0.2, 0.25+0.2+1/3]];
      var b=[1*p.Is, 0.25*p.Is];
      var s=SVH.solve2(A[0][0],A[0][1],b[0],A[1][0],A[1][1],b[1]);
      var i=s[1]-s[0];
      return { ans:i, unit:'A', steps:[
        '전류원 메시: \\(i_1 = '+p.Is+'\\) A로 즉시 확정',
        '메시2: \\(1(i_2-i_1)+\\tfrac12 i_2+\\tfrac15(i_2-i_3)=0\\) → 1.7i₂ − 0.2i₃ = '+SVH.fmt(p.Is)+'',
        '메시3: \\(\\tfrac14(i_3-i_1)+\\tfrac15(i_3-i_2)+\\tfrac13 i_3=0\\) → −0.2i₂ + 0.7833i₃ = '+SVH.fmt(0.25*p.Is),
        'i₂='+SVH.fmt(s[0])+' A, i₃='+SVH.fmt(s[1])+' A → 가운데 가지 전류 i = i₃−i₂ = '+SVH.fmt(i)+' A' ] }; },
    hints:['전류원이 한 메시만 지나면 그 메시 전류는 공짜.','남은 2×2만 풀면 된다.'] },
  { id:'u3-l3-09', level:3, type:'num', tags:['해 검증'], src:'창작 문제(검산됨)',
    params:{ Is:{min:2,max:8,step:2,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'}, R3:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return 'u3-l2-02 회로('+p.Is+' A, R₁·R₂·R₃)에서 전원이 공급하는 전력과 세 저항이 소비하는 전력의 합을 각각 구해 일치함을 보여라.'; },
    solve:function(p){
      var s=SVH.solve2(1/p.R1+1/p.R2,-1/p.R2,p.Is,-1/p.R2,1/p.R2+1/p.R3,0);
      var v1=s[0], v2=s[1];
      var Psrc=v1*p.Is;
      var Pr=v1*v1/p.R1+(v1-v2)*(v1-v2)/p.R2+v2*v2/p.R3;
      return { ans:{Psrc:Psrc, Pr:Pr}, unit:{Psrc:'W', Pr:'W'}, steps:[
        'v₁='+SVH.fmt(v1)+' V, v₂='+SVH.fmt(v2)+' V',
        '전원 공급 = v₁·I_s = '+SVH.fmt(Psrc)+' W',
        '저항 합 = v₁²/R₁+(v₁−v₂)²/R₂+v₂²/R₃ = '+SVH.fmt(Pr)+' W → 일치 ✓ (전력 수지 검증법)' ] }; },
    hints:['전류원의 공급 전력은 그 양단 전압 × 전류.','일치하지 않으면 계산 실수.'] },
  { id:'u3-l3-10', level:3, type:'num', tags:['접지 이동'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:6,max:12,step:2,unit:'V'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:2,max:6,step:2,unit:'Ω'} },
    statement:function(p){ return '전원 '+p.Vs+' V + R₁ + R₂ 직렬 루프에서, 기준(0 V)을 (a) 전원 − 단자 (b) R₁—R₂ 사이 절점으로 잡을 때 각각 전원 + 단자의 절점전압을 구하라. (R₁='+p.R1+', R₂='+p.R2+' Ω)'; },
    solve:function(p){
      var i=p.Vs/(p.R1+p.R2);
      var a=p.Vs;
      var b=i*p.R1;
      return { ans:{a:a, b:b}, unit:{a:'V', b:'V'}, steps:[
        '(a) − 단자가 0이면 + 단자는 그냥 V_s = '+SVH.fmt(a)+' V',
        '(b) 중간 절점이 0이면 + 단자 = R₁ 위쪽 = +iR₁ = '+SVH.fmt(b)+' V',
        '절점전압은 기준에 따라 바뀌지만 "가지 전압·전류"는 불변 — 접지는 좌표 원점일 뿐' ] }; },
    hints:['루프 전류는 기준과 무관하게 하나다.','기준에서 목표 절점까지 전압을 누적한다.'] },

  /* ---------- L4 (5) ---------- */
  { id:'u3-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ 초노드 내부의 전압원 전류는 KCL 식에 나타나지 않는다<br>㉡ 망로 전류는 실제 가지 전류와 항상 같다<br>㉢ 종속 전원이 있어도 절점/망로법의 틀은 유지되고 보조식만 추가된다<br>㉣ 절점법 해는 임의 루프 KVL로 교차 검증할 수 있다',
    choices:['㉠㉢㉣','㉠㉡㉢','㉡㉣','전부'],
    answer:0, expl:'공유 가지에서는 가지 전류 = 메시 전류의 조합(차)이므로 ㉡이 틀렸다.' },
  { id:'u3-l4-02', level:4, type:'num', tags:['기출 2(a) 재현'], src:'기출 유형',
    params:{ V:{min:2,max:5,step:1,unit:'V'}, I:{min:1,max:3,step:1,unit:'A'}, R1:{min:1,max:3,step:1,unit:'Ω'}, R2:{min:1,max:3,step:1,unit:'Ω'}, R3:{min:2,max:4,step:1,unit:'Ω'}, R4:{min:2,max:4,step:1,unit:'Ω'} },
    statement:function(p){ return '절점 구조: 전류원 '+p.I+' A → 절점1 유입. 절점1—절점2 R₁='+p.R1+' Ω. 절점2—절점3에 전압원 '+p.V+' V(+가 절점3). 절점2—접지 R₃='+p.R3+' Ω, 절점3—접지 R₄='+p.R4+' Ω, 절점1—접지 R₂='+p.R2+' Ω. 절점전압을 모두 구하고 전압원을 흐르는 전류(2→3)를 구하라.'; },
    solve:function(p){
      // 초노드(2,3): v3 - v2 = V
      // KCL@1: I = v1/R2 + (v1-v2)/R1
      // KCL@(2+3): (v1-v2)/R1 = v2/R3 + v3/R4
      // 풀이: 미지수 v1, v2 (v3=v2+V)
      var a11=1/p.R2+1/p.R1, a12=-1/p.R1, b1=p.I;
      var a21=-1/p.R1, a22=1/p.R1+1/p.R3+1/p.R4, b2=-p.V/p.R4;
      var s=SVH.solve2(a11,a12,b1,a21,a22,b2);
      var v1=s[0], v2=s[1], v3=v2+p.V;
      var i23=v3/p.R4; // KCL@3: i(2→3, 전압원 통과) = R4로 나가는 전류
      return { ans:{v1:v1, v2:v2, v3:v3, i23:i23}, unit:{v1:'V', v2:'V', v3:'V', i23:'A'}, steps:[
        '구속: \\(v_3 = v_2 + '+p.V+'\\) (초노드)',
        'KCL@1: \\(I = v_1/R_2 + (v_1-v_2)/R_1\\)',
        '초노드 KCL: \\((v_1-v_2)/R_1 = v_2/R_3 + v_3/R_4\\) → v₃ 치환 후 2×2',
        'v₁='+SVH.fmt(v1)+', v₂='+SVH.fmt(v2)+', v₃='+SVH.fmt(v3)+' V',
        '전압원 전류(2→3) = 절점3 KCL: 전부 R₄로 → \\(i = v_3/R_4\\) = '+SVH.fmt(i23)+' A' ] }; },
    hints:['초노드 + 구속식 → 2미지수.','전압원 전류는 절점3 KCL이 제일 짧다.'] },
  { id:'u3-l4-03', level:4, type:'num', tags:['기출 2(b) 재현'], src:'기출 유형',
    params:{ Vs:{min:9,max:15,step:3,unit:'V'}, R1:{choices:[50],unit:'Ω'}, R2:{choices:[20],unit:'Ω'}, R3:{choices:[20],unit:'Ω'}, R4:{choices:[10],unit:'Ω'}, R5:{choices:[15],unit:'Ω'} },
    statement:function(p){ return '3메시 회로(기출 2(b) 구조): 메시1 [전원 '+p.Vs+' V, R₁='+p.R1+' Ω, 공유(1·2) R₂='+p.R2+' Ω], 메시2 [R₂, R₃='+p.R3+' Ω(공유 2·3), R₄='+p.R4+' Ω], 메시3 [R₃, R₅='+p.R5+' Ω]. R₄ 양단 전압(메시2 단독 소자)을 구하라. 모두 시계 방향.'; },
    solve:function(p){
      var A=[[p.R1+p.R2, -p.R2, 0],
             [-p.R2, p.R2+p.R3+p.R4, -p.R3],
             [0, -p.R3, p.R3+p.R5]];
      var s=SVH.solve3(A,[p.Vs,0,0]);
      var v=s[1]*p.R4;
      return { ans:v, unit:'V', steps:[
        '메시 행렬(대각=합, 비대각=−공유): [[ '+(p.R1+p.R2)+', −'+p.R2+', 0],[−'+p.R2+', '+(p.R2+p.R3+p.R4)+', −'+p.R3+'],[0, −'+p.R3+', '+(p.R3+p.R5)+']]',
        'i₁='+SVH.fmt(s[0])+', i₂='+SVH.fmt(s[1])+', i₃='+SVH.fmt(s[2])+' A',
        'R₄는 메시2에만 속함 → v = i₂R₄ = '+SVH.fmt(v)+' V' ] }; },
    hints:['3×3 연립 — 행렬 규칙으로 기계적으로.','단독 소자 전압 = 그 메시 전류 × R.'] },
  { id:'u3-l4-04', level:4, type:'num', tags:['종속 전원 종합'], src:'기출 유형',
    params:{ Is:{min:2,max:4,step:1,unit:'A'}, R1:{min:2,max:4,step:1,unit:'Ω'}, R2:{min:2,max:4,step:1,unit:'Ω'}, R3:{min:2,max:4,step:1,unit:'Ω'}, k:{min:1,max:2,step:1} },
    statement:function(p){ return '절점1: 전류원 '+p.Is+' A 유입, R₁='+p.R1+' Ω → 접지, R₂='+p.R2+' Ω → 절점2. 절점2: R₃='+p.R3+' Ω → 접지, 그리고 전압제어 전류원 \\('+p.k+'v_1\\) A가 절점2로 유입(v₁은 절점1 전압). v₁·v₂와, 종속 전원이 공급하는 전력을 구하라.'; },
    constraint:function(p){ /* 특이(해 없음) 조합 배제: 종속 이득이 임계점에 걸리면 회로가 불안정 */
      var det=(1/p.R1+1/p.R2)*(-(1/p.R2+1/p.R3))-(-1/p.R2)*(1/p.R2+p.k);
      return Math.abs(det)>0.05; },
    solve:function(p){
      // KCL@1: Is = v1/R1 + (v1-v2)/R2
      // KCL@2: (v1-v2)/R2 + k*v1 = v2/R3
      var a11=1/p.R1+1/p.R2, a12=-1/p.R2, b1=p.Is;
      var a21=1/p.R2+p.k, a22=-(1/p.R2+1/p.R3), b2=0;
      var s=SVH.solve2(a11,a12,b1,a21,a22,b2);
      var v1=s[0], v2=s[1];
      var Pdep=p.k*v1*v2; // 공급 전력 = 전류(k v1) × 양단 전압(v2), 유입 방향이므로 공급=I*V
      return { ans:{v1:v1, v2:v2, Pdep:Pdep}, unit:{v1:'V', v2:'V', Pdep:'W'}, steps:[
        'KCL@1: \\(I_s = v_1/R_1 + (v_1-v_2)/R_2\\)',
        'KCL@2: \\((v_1-v_2)/R_2 + '+p.k+'v_1 = v_2/R_3\\)',
        'v₁='+SVH.fmt(v1)+' V, v₂='+SVH.fmt(v2)+' V',
        '종속 전원 공급 전력 = ('+p.k+'v₁)·v₂ = '+SVH.fmt(Pdep)+' W (전류가 +전위 쪽으로 유입 → 공급)' ] }; },
    hints:['종속 전원도 KCL에선 그냥 전류다.','전력 부호는 방향·극성으로 판단.'] },
  { id:'u3-l4-05', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'2절점 회로(각 절점—접지 컨덕턴스 \\(G_1, G_3\\), 절점 사이 \\(G_2\\), 절점1 유입 전류원 \\(I_s\\))의 절점 방정식을 행렬형 \\(\\mathbf{G}\\mathbf{v}=\\mathbf{i}\\) 로 유도하고, 행렬의 대칭성과 대각 우세가 왜 생기는지 설명하라.',
    steps:[
      'KCL@1: 나가는 전류 합 = 유입. \\(G_1v_1 + G_2(v_1-v_2) = I_s\\) [왜] 각 가지 전류를 절점전압으로 표현',
      'KCL@2: \\(G_3v_2 + G_2(v_2-v_1) = 0\\)',
      '정리: \\(\\begin{bmatrix}G_1+G_2 & -G_2\\\\ -G_2 & G_2+G_3\\end{bmatrix}\\begin{bmatrix}v_1\\\\v_2\\end{bmatrix}=\\begin{bmatrix}I_s\\\\0\\end{bmatrix}\\)',
      '대칭성: 비대각 원소는 둘 다 "−(공유 컨덕턴스)" — 같은 소자를 양쪽에서 본 것이므로 같다 (종속 전원이 끼면 깨진다)',
      '대각 우세: 대각 = 자기에게 붙은 모든 컨덕턴스 합 ≥ |비대각 합| — 물리적으로 "자기 전압을 올리면 나가는 전류가 는다"는 안정성',
      '차원 체크: [S][V]=[A] ✓ · 극한 체크: \\(G_2\\to 0\\)이면 두 절점이 분리되어 대각행렬(독립 두 회로) ✓'
    ],
    hints:['각 절점 KCL을 컨덕턴스로 쓰고 행렬로 재배열.','비대각이 왜 마이너스인지 말로 설명해 보라.'],
    expl:'행렬 규칙(대각=합, 비대각=−공유)을 "외우는 것"에서 "유도하는 것"으로 바꿔 준다 — 시험장에서 검산 도구가 된다.' }
  ]
});
