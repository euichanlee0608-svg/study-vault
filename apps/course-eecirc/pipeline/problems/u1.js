/* U1 회로 기초 — 전하·전류·전압·전력, 수동부호규약, 전원, 옴 법칙, KCL/KVL */
SV_BANK.push({
  id: 'u1', no: 1, title: '회로 기초', titleEn: 'Circuit Fundamentals',
  scope: '전하·전류·전압·전력 · 수동부호규약 · 독립/종속 전원 · 옴 법칙 · KCL/KVL',
  problems: [

  /* ---------- L1 개념확인 (10) ---------- */
  { id:'u1-l1-01', level:1, type:'tf', tags:['정의'], src:'교재 표준',
    statement:'전류(current)는 단위 시간당 단면을 통과하는 전하량으로, \\(i = dq/dt\\) 로 정의된다.',
    answer:true, expl:'정의 그대로다. 단위는 A = C/s. 시험에서는 q(t)가 주어지고 미분으로 i(t)를 구하는 형태로 나온다.' },
  { id:'u1-l1-02', level:1, type:'tf', tags:['정의'], src:'교재 표준',
    statement:'전압은 단위 전하가 두 점 사이를 이동할 때 주고받는 에너지이며, 항상 두 점 사이에서 정의된다.',
    answer:true, expl:'v = dw/dq (J/C = V). "한 점의 전압"은 기준(접지)을 정했을 때만 의미가 있다.' },
  { id:'u1-l1-03', level:1, type:'mc', tags:['수동부호규약'], src:'교재 표준',
    statement:'수동부호규약(passive sign convention)에서 소자가 전력을 흡수하는 경우는?',
    choices:['전류가 + 단자로 들어갈 때 \\(p=vi>0\\)','전류가 + 단자에서 나올 때 \\(p=vi>0\\)','부호와 무관하게 저항이면 흡수','전압이 음수이면 항상 공급'],
    answer:0, expl:'전류 기준 방향이 + 단자로 들어가도록 잡으면 p = vi가 흡수 전력. p<0이면 그 소자는 공급 중이다.' },
  { id:'u1-l1-04', level:1, type:'tf', tags:['KCL'], src:'교재 표준',
    statement:'KCL(키르히호프 전류 법칙)은 전하 보존에서, KVL(전압 법칙)은 에너지 보존에서 나온다.',
    answer:true, expl:'절점에 전하가 쌓이지 않는다 → KCL. 폐경로를 한 바퀴 돌면 단위 전하의 에너지 변화가 0 → KVL.' },
  { id:'u1-l1-05', level:1, type:'mc', tags:['브랜치·노드'], src:'기출 유형',
    statement:'회로 용어에 대한 설명 중 옳은 것은?',
    choices:['브랜치(branch)는 두 단자를 가진 회로의 임의 부분으로, 하나 이상의 소자를 포함할 수 있다','노드(node)는 반드시 세 개 이상의 소자가 만나야 한다','루프(loop)는 소자를 지나지 않는 경로다','브랜치는 단일 소자만을 뜻한다'],
    answer:0, expl:'기출 1번 스타일. 브랜치는 2단자로 볼 수 있는 임의의 부분(소자 여러 개 가능). 노드는 2개 소자만 만나도 노드다.' },
  { id:'u1-l1-06', level:1, type:'mc', tags:['전원'], src:'교재 표준',
    statement:'이상 전압원과 이상 전류원의 성질로 옳은 것은?',
    choices:['전압원은 전류와 무관하게 단자 전압을 유지하고, 전류원은 전압과 무관하게 전류를 유지한다','전압원은 내부저항이 무한대다','전류원은 개방되어도 문제가 없다','전압원은 단락시켜도 전류가 유한하다'],
    answer:0, expl:'이상 전압원 내부저항 = 0, 이상 전류원 내부저항 = ∞. 전류원 개방·전압원 단락은 모순(정의 위배)이다.' },
  { id:'u1-l1-07', level:1, type:'tf', tags:['종속전원'], src:'교재 표준',
    statement:'종속 전원(dependent source)의 값은 회로의 다른 곳의 전압이나 전류에 의해 결정되며, 트랜지스터·OP-amp 모델링에 쓰인다.',
    answer:true, expl:'VCVS·VCCS·CCVS·CCCS 네 종류. 해석할 때 제어 변수를 회로 변수로 표현해서 함께 풀어야 한다.' },
  { id:'u1-l1-08', level:1, type:'mc', tags:['저항'], src:'기출 유형',
    statement:'저항 부품에 대한 진술 중 옳은 것은?',
    choices:['가변저항(potentiometer)의 저항값은 온도·회로 조건에 따라 변할 수 있어 고정밀 회로에는 부적합할 수 있다','금속피막(metal-film) 저항은 정밀도가 낮아 고정밀 회로에 못 쓴다','저항의 컨덕턴스는 G = R이다','탄소피막 저항이 금속피막보다 항상 정밀하다'],
    answer:0, expl:'기출 1번 스타일. 금속피막은 흔하고 저렴하면서 "정밀한" 쪽이다(허용오차 작음). G = 1/R (단위 S).' },
  { id:'u1-l1-09', level:1, type:'tf', tags:['옴 법칙'], src:'교재 표준',
    statement:'옴 법칙 \\(v = iR\\) 은 모든 2단자 소자에 성립한다.',
    answer:false, expl:'저항(선형 저항)에만 성립한다. 다이오드처럼 비선형 소자, C·L처럼 동적 소자에는 성립하지 않는다.' },
  { id:'u1-l1-10', level:1, type:'mc', tags:['단위'], src:'교재 표준',
    statement:'단위 관계로 옳지 않은 것은?',
    choices:['1 W = 1 V·A','1 V = 1 J/C','1 A = 1 C/s','1 Ω = 1 A/V'],
    answer:3, expl:'Ω = V/A다 (A/V는 컨덕턴스 지멘스 S). 나머지는 정의 그대로.' },

  /* ---------- L2 기본 계산 (15) ---------- */
  { id:'u1-l2-01', level:2, type:'num', tags:['전하·전류'], src:'창작 문제(검산됨)',
    params:{ Q:{min:20,max:240,step:10,unit:'C'}, t:{min:4,max:60,step:2,unit:'s'} },
    statement:function(p){ return '어떤 도선 단면을 '+p.t+' s 동안 전하 '+p.Q+' C이 일정하게 통과했다. 전류는 몇 A인가?'; },
    solve:function(p){ var I=p.Q/p.t;
      return { ans:I, unit:'A', steps:[
        '일정 전류이므로 \\(I = \\Delta q/\\Delta t\\).',
        'I = '+p.Q+' / '+p.t+' = '+SVH.fmt(I)+' A' ] }; },
    hints:['전류의 정의는 단위 시간당 전하량이다.','\\(I = \\Delta q / \\Delta t\\)'] },
  { id:'u1-l2-02', level:2, type:'num', tags:['전하·전류','미분'], src:'창작 문제(검산됨)',
    params:{ a:{min:2,max:9,step:1}, b:{min:1,max:8,step:1}, t0:{min:1,max:4,step:1,unit:'s'} },
    statement:function(p){ return '전하가 \\(q(t) = '+p.a+'t^2 + '+p.b+'t\\) [C] 로 흐른다. \\(t = '+p.t0+'\\) s에서 전류는?'; },
    solve:function(p){ var I=2*p.a*p.t0+p.b;
      return { ans:I, unit:'A', steps:[
        '\\(i = dq/dt = 2\\cdot'+p.a+'\\,t + '+p.b+'\\)',
        't = '+p.t0+' 대입: i = '+(2*p.a)+'·'+p.t0+' + '+p.b+' = '+SVH.fmt(I)+' A' ] }; },
    hints:['전류는 전하의 시간 미분이다.','다항식 미분 후 t₀를 대입한다.'] },
  { id:'u1-l2-03', level:2, type:'num', tags:['옴 법칙'], src:'창작 문제(검산됨)',
    params:{ V:{min:3,max:36,step:1,unit:'V'}, R:{min:100,max:4700,step:100,unit:'Ω'} },
    statement:function(p){ return p.R+' Ω 저항 양단에 '+p.V+' V가 걸려 있다. 전류는 몇 mA인가?'; },
    solve:function(p){ var I=p.V/p.R;
      return { ans:I*1000, unit:'mA', steps:[
        '옴 법칙 \\(I = V/R\\).',
        'I = '+p.V+' / '+p.R+' = '+SVH.fmt(I)+' A = '+SVH.fmt(I*1000)+' mA' ] }; },
    hints:['옴 법칙을 쓴다.','A를 mA로 바꾸려면 ×1000.'] },
  { id:'u1-l2-04', level:2, type:'num', tags:['옴 법칙'], src:'창작 문제(검산됨)',
    params:{ I:{min:2,max:50,step:2,unit:'mA'}, R:{min:220,max:6800,step:220,unit:'Ω'} },
    statement:function(p){ return '저항 '+p.R+' Ω에 전류 '+p.I+' mA가 흐른다. 저항 양단 전압은?'; },
    solve:function(p){ var V=p.I/1000*p.R;
      return { ans:V, unit:'V', steps:[
        '\\(V = IR\\), 전류를 A로: '+p.I+' mA = '+SVH.fmt(p.I/1000)+' A',
        'V = '+SVH.fmt(p.I/1000)+' × '+p.R+' = '+SVH.fmt(V)+' V' ] }; },
    hints:['mA → A 단위 변환부터.','V = IR'] },
  { id:'u1-l2-05', level:2, type:'num', tags:['전력'], src:'창작 문제(검산됨)',
    params:{ V:{min:5,max:48,step:1,unit:'V'}, I:{min:100,max:900,step:50,unit:'mA'} },
    statement:function(p){ return '소자에 '+p.V+' V가 걸리고 + 단자로 '+p.I+' mA가 들어간다. 이 소자가 흡수하는 전력은?'; },
    solve:function(p){ var P=p.V*p.I/1000;
      return { ans:P, unit:'W', steps:[
        '수동부호규약: 전류가 + 단자로 들어가므로 \\(p = vi\\)가 흡수 전력.',
        'p = '+p.V+' × '+SVH.fmt(p.I/1000)+' = '+SVH.fmt(P)+' W (p > 0 → 흡수)' ] }; },
    hints:['수동부호규약을 확인한다.','p = vi, 단위는 W.'] },
  { id:'u1-l2-06', level:2, type:'num', tags:['전력','옴 법칙'], src:'창작 문제(검산됨)',
    params:{ R:{min:10,max:470,step:10,unit:'Ω'}, I:{min:50,max:800,step:50,unit:'mA'} },
    statement:function(p){ return p.R+' Ω 저항에 '+p.I+' mA가 흐른다. 저항이 소비하는 전력은 몇 mW인가?'; },
    solve:function(p){ var P=Math.pow(p.I/1000,2)*p.R;
      return { ans:P*1000, unit:'mW', steps:[
        '\\(p = i^2 R\\).',
        'p = ('+SVH.fmt(p.I/1000)+')² × '+p.R+' = '+SVH.fmt(P)+' W = '+SVH.fmt(P*1000)+' mW' ] }; },
    hints:['전력 공식 세 형태 중 i와 R이 주어졌다.','p = i²R'] },
  { id:'u1-l2-07', level:2, type:'num', tags:['전력','옴 법칙'], src:'창작 문제(검산됨)',
    params:{ V:{min:5,max:24,step:1,unit:'V'}, R:{min:47,max:1000,step:47,unit:'Ω'} },
    statement:function(p){ return p.R+' Ω 저항 양단에 '+p.V+' V가 걸린다. 소비 전력은?'; },
    solve:function(p){ var P=p.V*p.V/p.R;
      return { ans:P, unit:'W', steps:[
        '\\(p = v^2/R\\).',
        'p = '+p.V+'² / '+p.R+' = '+SVH.fmt(P)+' W' ] }; },
    hints:['v와 R이 주어졌다.','p = v²/R'] },
  { id:'u1-l2-08', level:2, type:'num', tags:['에너지'], src:'창작 문제(검산됨)',
    params:{ P:{min:20,max:200,step:10,unit:'W'}, h:{min:2,max:24,step:1,unit:'h'} },
    statement:function(p){ return p.P+' W를 소비하는 기기를 '+p.h+'시간 사용했다. 소비 에너지는 몇 kJ인가?'; },
    solve:function(p){ var E=p.P*p.h*3600/1000;
      return { ans:E, unit:'kJ', steps:[
        '\\(w = p\\,t\\), 시간을 초로: '+p.h+' h = '+(p.h*3600)+' s',
        'w = '+p.P+' × '+(p.h*3600)+' = '+SVH.fmt(p.P*p.h*3600)+' J = '+SVH.fmt(E)+' kJ' ] }; },
    hints:['에너지 = 전력 × 시간.','시간 단위를 초로 바꾼다.'] },
  { id:'u1-l2-09', level:2, type:'num', tags:['KCL'], src:'창작 문제(검산됨)',
    params:{ i1:{min:1,max:9,step:1,unit:'A'}, i2:{min:1,max:9,step:1,unit:'A'} },
    statement:function(p){ return '한 절점에 전류 '+p.i1+' A와 '+p.i2+' A가 들어오고, 두 가지로 나간다. 한 가지로 '+p.i1+' A가 나간다면 나머지 가지의 전류(나가는 방향 기준)는?'; },
    solve:function(p){ var i=p.i2;
      return { ans:i, unit:'A', steps:[
        'KCL: 들어오는 합 = 나가는 합.',
        '('+p.i1+' + '+p.i2+') = '+p.i1+' + i → i = '+SVH.fmt(i)+' A' ] }; },
    hints:['절점에서 전류는 쌓이지 않는다.','들어오는 합 = 나가는 합'] },
  { id:'u1-l2-10', level:2, type:'num', tags:['KVL'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:9,max:36,step:3,unit:'V'}, V1:{min:1,max:8,step:1,unit:'V'} },
    constraint:function(p){ return p.Vs-p.V1>0; },
    statement:function(p){ return '전압원 '+p.Vs+' V와 저항 두 개가 직렬 폐루프를 이룬다. 첫 저항에 '+p.V1+' V가 걸리면 둘째 저항 전압은?'; },
    solve:function(p){ var V2=p.Vs-p.V1;
      return { ans:V2, unit:'V', steps:[
        'KVL: 루프 전압 합 = 0 → \\(V_s = V_1 + V_2\\).',
        'V₂ = '+p.Vs+' − '+p.V1+' = '+SVH.fmt(V2)+' V' ] }; },
    hints:['폐루프를 한 바퀴 돌며 전압을 더한다.','전원 상승 = 소자 강하의 합'] },
  { id:'u1-l2-11', level:2, type:'num', tags:['컨덕턴스'], src:'창작 문제(검산됨)',
    params:{ R:{min:20,max:500,step:20,unit:'Ω'} },
    statement:function(p){ return p.R+' Ω 저항의 컨덕턴스는 몇 mS인가?'; },
    solve:function(p){ var G=1/p.R*1000;
      return { ans:G, unit:'mS', steps:[
        '\\(G = 1/R\\).',
        'G = 1/'+p.R+' = '+SVH.fmt(1/p.R)+' S = '+SVH.fmt(G)+' mS' ] }; },
    hints:['컨덕턴스는 저항의 역수.','S → mS는 ×1000.'] },
  { id:'u1-l2-12', level:2, type:'num', tags:['전원·전력'], src:'창작 문제(검산됨)',
    params:{ V:{min:6,max:24,step:2,unit:'V'}, I:{min:1,max:5,step:1,unit:'A'} },
    statement:function(p){ return '배터리('+p.V+' V)의 + 단자에서 전류 '+p.I+' A가 나간다. 배터리가 공급하는 전력은?'; },
    solve:function(p){ var P=p.V*p.I;
      return { ans:P, unit:'W', steps:[
        '전류가 + 단자에서 나가므로 수동부호규약 기준 p = vi < 0 (흡수 기준) → 공급 전력은 +vi.',
        'p공급 = '+p.V+' × '+p.I+' = '+SVH.fmt(P)+' W' ] }; },
    hints:['전류가 + 단자에서 나가면 그 소자는 공급 중이다.','공급 전력 = vi'] },
  { id:'u1-l2-13', level:2, type:'num', tags:['저항 정격'], src:'창작 문제(검산됨)',
    params:{ R:{choices:[100,220,330,470,680,1000],unit:'Ω'}, Pmax:{choices:[0.25,0.5,1,2],unit:'W'} },
    statement:function(p){ return '정격 '+p.Pmax+' W인 '+p.R+' Ω 저항에 걸 수 있는 최대 전압은?'; },
    solve:function(p){ var V=Math.sqrt(p.Pmax*p.R);
      return { ans:V, unit:'V', steps:[
        '\\(p = v^2/R \\le P_{max}\\) → \\(v_{max} = \\sqrt{P_{max} R}\\).',
        'v = √('+p.Pmax+' × '+p.R+') = '+SVH.fmt(V)+' V' ] }; },
    hints:['정격 전력을 넘지 않을 조건을 세운다.','v = √(P·R)'] },
  { id:'u1-l2-14', level:2, type:'num', tags:['옴 법칙','그래프'], src:'창작 문제(검산됨)',
    params:{ V1:{min:2,max:10,step:1,unit:'V'}, I1:{min:10,max:100,step:10,unit:'mA'} },
    statement:function(p){ return '어떤 선형 저항의 v–i 특성 직선이 점 ('+p.I1+' mA, '+p.V1+' V)를 지난다. 저항값은?'; },
    solve:function(p){ var R=p.V1/(p.I1/1000);
      return { ans:R, unit:'Ω', steps:[
        '선형 저항의 v–i 특성은 원점을 지나는 직선, 기울기 = R.',
        'R = '+p.V1+' / '+SVH.fmt(p.I1/1000)+' = '+SVH.fmt(R)+' Ω' ] }; },
    hints:['v–i 직선의 기울기가 저항이다.','단위 변환 주의(mA→A).'] },
  { id:'u1-l2-15', level:2, type:'num', tags:['전력 수지'], src:'창작 문제(검산됨)',
    params:{ P1:{min:5,max:40,step:5,unit:'W'}, P2:{min:5,max:40,step:5,unit:'W'} },
    statement:function(p){ return '회로에 소자가 셋뿐이다. 두 소자가 각각 '+p.P1+' W, '+p.P2+' W를 흡수한다면 셋째 소자가 공급하는 전력은?'; },
    solve:function(p){ var P=p.P1+p.P2;
      return { ans:P, unit:'W', steps:[
        '에너지 보존: 회로 전체 흡수 전력 합 = 0 (공급은 음의 흡수).',
        'p₃(공급) = '+p.P1+' + '+p.P2+' = '+SVH.fmt(P)+' W' ] }; },
    hints:['회로 전체에서 전력의 총합은 0이다.','흡수 합 = 공급 합'] },

  /* ---------- L3 응용·복합 (10) ---------- */
  { id:'u1-l3-01', level:3, type:'num', tags:['미분','전력'], src:'창작 문제(검산됨)',
    params:{ a:{min:2,max:6,step:1}, R:{min:2,max:20,step:2,unit:'Ω'}, t0:{min:1,max:3,step:1,unit:'s'} },
    statement:function(p){ return '전하 \\(q(t)='+p.a+'t^2\\) [C] 가 '+p.R+' Ω 저항을 통과한다. \\(t='+p.t0+'\\) s에서 저항이 소비하는 순시 전력은?'; },
    solve:function(p){ var I=2*p.a*p.t0, P=I*I*p.R;
      return { ans:P, unit:'W', steps:[
        '\\(i = dq/dt = 2\\cdot'+p.a+'t\\) → i('+p.t0+') = '+SVH.fmt(I)+' A',
        '\\(p = i^2R\\) = '+SVH.fmt(I)+'² × '+p.R+' = '+SVH.fmt(P)+' W' ] }; },
    hints:['먼저 전류를 미분으로 구한다.','p = i²R에 대입.'] },
  { id:'u1-l3-02', level:3, type:'num', tags:['KCL','KVL'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:10,max:30,step:2,unit:'V'}, R1:{min:2,max:10,step:1,unit:'Ω'}, R2:{min:2,max:10,step:1,unit:'Ω'} },
    statement:function(p){ return '전압원 '+p.Vs+' V에 R₁='+p.R1+' Ω, R₂='+p.R2+' Ω가 직렬로 연결된 단일 루프에서, R₂가 흡수하는 전력은?'; },
    solve:function(p){ var I=p.Vs/(p.R1+p.R2), P=I*I*p.R2;
      return { ans:P, unit:'W', steps:[
        'KVL: \\(V_s = I(R_1+R_2)\\) → I = '+p.Vs+'/'+(p.R1+p.R2)+' = '+SVH.fmt(I)+' A',
        '\\(p_{R2} = I^2R_2\\) = '+SVH.fmt(I)+'² × '+p.R2+' = '+SVH.fmt(P)+' W' ] }; },
    hints:['직렬 루프 전류부터 구한다.','그 전류로 i²R.'] },
  { id:'u1-l3-03', level:3, type:'num', tags:['종속전원'], src:'창작 문제(검산됨)',
    params:{ Is:{min:1,max:5,step:1,unit:'A'}, k:{min:2,max:4,step:1}, R:{min:2,max:8,step:2,unit:'Ω'} },
    statement:function(p){ return '전류원 '+p.Is+' A가 절점 A로 전류를 밀어넣고, 절점 A에서 저항 R='+p.R+' Ω와 종속 전류원(값 \\('+p.k+'i_R\\), 절점 A에서 나가는 방향)이 병렬로 접지에 연결되어 있다. \\(i_R\\)은 R로 흐르는 전류다. \\(i_R\\)은?'; },
    solve:function(p){ var iR=p.Is/(1+p.k);
      return { ans:iR, unit:'A', steps:[
        'KCL @A: \\(I_s = i_R + '+p.k+'i_R = (1+'+p.k+')i_R\\)',
        '\\(i_R = '+p.Is+'/'+(1+p.k)+' = '+SVH.fmt(iR)+'\\) A' ] }; },
    hints:['절점 A에서 KCL을 세운다.','종속 전원 값도 i_R로 표현된다.'] },
  { id:'u1-l3-04', level:3, type:'num', tags:['전력 수지','전원'], src:'창작 문제(검산됨)',
    params:{ V:{min:10,max:24,step:2,unit:'V'}, I:{min:2,max:6,step:1,unit:'A'}, R:{min:1,max:3,step:1,unit:'Ω'} },
    statement:function(p){ return '충전기가 배터리를 충전 중이다: 충전기 전압 '+p.V+' V, 전류 '+p.I+' A가 배터리 + 단자로 들어간다. 배터리 내부저항 '+p.R+' Ω에서 열로 새는 전력과 실제 저장되는 전력을 나눠 구하라. (배터리 = 내부 기전력 + 직렬 내부저항 모델, 단자 전압이 '+p.V+' V)'; },
    solve:function(p){ var Ploss=p.I*p.I*p.R, Pin=p.V*p.I, Pstore=Pin-Ploss;
      return { ans:{loss:Ploss, store:Pstore}, unit:{loss:'W', store:'W'}, steps:[
        '단자로 들어가는 총 전력: \\(p = VI\\) = '+p.V+'×'+p.I+' = '+SVH.fmt(Pin)+' W',
        '내부저항 손실: \\(I^2r\\) = '+p.I+'²×'+p.R+' = '+SVH.fmt(Ploss)+' W',
        '저장 전력 = '+SVH.fmt(Pin)+' − '+SVH.fmt(Ploss)+' = '+SVH.fmt(Pstore)+' W' ] }; },
    hints:['총 유입 전력에서 내부 손실을 뺀다.','손실은 I²r.'] },
  { id:'u1-l3-05', level:3, type:'num', tags:['적분','에너지'], src:'창작 문제(검산됨)',
    params:{ Im:{min:2,max:8,step:1,unit:'A'}, T:{min:2,max:6,step:2,unit:'s'} },
    statement:function(p){ return '전류가 t=0에서 '+p.Im+' A로 시작해 t='+p.T+' s에 0으로 선형 감소한다. 이 동안 단면을 통과한 총 전하는?'; },
    solve:function(p){ var Q=0.5*p.Im*p.T;
      return { ans:Q, unit:'C', steps:[
        '\\(q = \\int i\\,dt\\) = 전류–시간 그래프 아래 면적.',
        '삼각형 면적 = ½ × '+p.Im+' × '+p.T+' = '+SVH.fmt(Q)+' C' ] }; },
    hints:['전하는 전류의 적분(그래프 면적).','삼각형 면적 공식.'] },
  { id:'u1-l3-06', level:3, type:'num', tags:['KVL','종속전원'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:12,max:24,step:2,unit:'V'}, R1:{min:2,max:6,step:1,unit:'Ω'}, k:{min:1,max:3,step:1} },
    statement:function(p){ return '단일 루프: 전압원 '+p.Vs+' V → R₁='+p.R1+' Ω → 종속 전압원(값 \\('+p.k+'v_1\\), 전류 방향 기준 전압 강하, \\(v_1\\)은 R₁ 전압). 루프 전류는?'; },
    solve:function(p){ var I=p.Vs/(p.R1*(1+p.k));
      return { ans:I, unit:'A', steps:[
        'KVL: \\(V_s = v_1 + '+p.k+'v_1 = (1+'+p.k+')v_1\\), \\(v_1 = IR_1\\)',
        'I = '+p.Vs+'/('+(1+p.k)+'×'+p.R1+') = '+SVH.fmt(I)+' A' ] }; },
    hints:['v₁ = IR₁로 종속 전원 값을 치환.','KVL을 한 바퀴.'] },
  { id:'u1-l3-07', level:3, type:'num', tags:['실용','전력'], src:'창작 문제(검산됨)',
    params:{ P:{choices:[800,1200,1500,1800],unit:'W'}, V:{choices:[110,220],unit:'V'} },
    statement:function(p){ return '정격 '+p.P+' W / '+p.V+' V 전열기가 정격 전압에서 동작한다. 부하 전류와 등가 저항을 구하라.'; },
    solve:function(p){ var I=p.P/p.V, R=p.V*p.V/p.P;
      return { ans:{I:I, R:R}, unit:{I:'A', R:'Ω'}, steps:[
        '\\(I = P/V\\) = '+p.P+'/'+p.V+' = '+SVH.fmt(I)+' A',
        '\\(R = V^2/P\\) = '+p.V+'²/'+p.P+' = '+SVH.fmt(R)+' Ω' ] }; },
    hints:['정격 전력·전압에서 I = P/V.','R = V²/P.'] },
  { id:'u1-l3-08', level:3, type:'num', tags:['KCL','컨덕턴스'], src:'창작 문제(검산됨)',
    params:{ V:{min:6,max:24,step:2,unit:'V'}, G1:{min:1,max:5,step:1,unit:'mS'}, G2:{min:1,max:5,step:1,unit:'mS'} },
    statement:function(p){ return '전압 '+p.V+' V가 걸린 절점에서 접지로 컨덕턴스 G₁='+p.G1+' mS, G₂='+p.G2+' mS 두 소자가 병렬 연결되어 있다. 절점으로 유입되어야 하는 총 전류는 몇 mA인가?'; },
    solve:function(p){ var I=p.V*(p.G1+p.G2);
      return { ans:I, unit:'mA', steps:[
        '각 소자 전류 \\(i = Gv\\): i₁ = '+p.G1+'×'+p.V+' = '+SVH.fmt(p.G1*p.V)+' mA, i₂ = '+SVH.fmt(p.G2*p.V)+' mA',
        'KCL: 유입 = i₁+i₂ = '+SVH.fmt(I)+' mA (mS×V = mA)' ] }; },
    hints:['컨덕턴스에선 i = Gv가 편하다.','병렬이라 전압이 같다.'] },
  { id:'u1-l3-09', level:3, type:'num', tags:['효율'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:10,max:14,step:1,unit:'V'}, r:{choices:[0.5,1,1.5,2],unit:'Ω'}, I:{min:1,max:4,step:1,unit:'A'} },
    statement:function(p){ return '기전력 '+p.Vs+' V, 내부저항 '+p.r+' Ω인 전원이 부하에 '+p.I+' A를 공급한다. 부하 단자 전압과 전달 효율(부하전력/총공급전력)을 구하라.'; },
    solve:function(p){ var Vt=p.Vs-p.I*p.r, eff=Vt/p.Vs*100;
      return { ans:{Vt:Vt, eff:eff}, unit:{Vt:'V', eff:'%'}, steps:[
        '단자 전압: \\(V_t = V_s - I r\\) = '+p.Vs+' − '+p.I+'×'+p.r+' = '+SVH.fmt(Vt)+' V',
        '효율 = \\(V_t I / V_s I = V_t/V_s\\) = '+SVH.fmt(Vt)+'/'+p.Vs+' = '+SVH.fmt(eff)+' %' ] }; },
    hints:['내부저항 강하를 빼면 단자 전압.','효율에서 전류는 약분된다.'] },
  { id:'u1-l3-10', level:3, type:'num', tags:['비선형 소자'], src:'창작 문제(검산됨)',
    params:{ k:{choices:[0.5,1,2],unit:'mA/V²'}, V:{min:2,max:6,step:1,unit:'V'} },
    statement:function(p){ return '비선형 소자의 특성이 \\(i = '+p.k+'v^2\\) [mA, V] 이다. v = '+p.V+' V에서 (a) 전류, (b) 정적 저항 \\(R = v/i\\) 를 구하라. (kΩ)'; },
    solve:function(p){ var I=p.k*p.V*p.V, R=p.V/I;
      return { ans:{I:I, R:R}, unit:{I:'mA', R:'kΩ'}, steps:[
        'i = '+p.k+'×'+p.V+'² = '+SVH.fmt(I)+' mA',
        '정적 저항 R = v/i = '+p.V+'/'+SVH.fmt(I)+' = '+SVH.fmt(R)+' kΩ (V/mA = kΩ)',
        '(비선형이라 동작점마다 R이 다르다 — 옴 법칙이 "성립하지 않는" 것의 실제 의미)' ] }; },
    hints:['주어진 특성식에 대입.','정적 저항은 그 점에서의 v/i.'] },

  /* ---------- L4 시험급 (5) ---------- */
  { id:'u1-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'다음 진술 중 옳은 것을 모두 고른 조합은?<br>㉠ 중첩의 원리는 회로의 선형성에서 나온다<br>㉡ 테브난·노턴 등가는 비선형 회로에도 항상 적용된다<br>㉢ 이상 전류원 두 개를 서로 다른 값으로 직렬 연결하면 모순이다<br>㉣ 수동부호규약에서 p<0이면 소자가 전력을 공급한다',
    choices:['㉠㉢㉣','㉠㉡㉣','㉡㉢','㉠㉡㉢㉣'],
    answer:0, expl:'기출 1번(30점 다지선다) 유형. 테브난/노턴은 선형 회로에만 적용(㉡ 틀림). 중첩의 근거는 선형성이지 결합·교환법칙이 아니다.' },
  { id:'u1-l4-02', level:4, type:'num', tags:['전력 수지 종합'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:20,max:40,step:5,unit:'V'}, I1:{min:1,max:3,step:1,unit:'A'}, R1:{min:2,max:5,step:1,unit:'Ω'} },
    statement:function(p){ return '회로에 소자 4개: 전압원 '+p.Vs+' V(전류 '+p.I1+' A가 − 단자로 들어감 = 공급), 저항 R₁='+p.R1+' Ω(전류 '+p.I1+' A), 소자 X, 그리고 '+p.I1+' A가 흐르는 전류원(흡수 '+(p.Vs)+'×0.1 W). 전력 보존으로 소자 X의 흡수 전력을 구하라.'; },
    solve:function(p){ var Psup=p.Vs*p.I1, PR=p.I1*p.I1*p.R1, Pcs=p.Vs*0.1, PX=Psup-PR-Pcs;
      return { ans:PX, unit:'W', steps:[
        '공급 총량: \\(V_sI\\) = '+SVH.fmt(Psup)+' W',
        '저항 흡수: \\(I^2R_1\\) = '+SVH.fmt(PR)+' W, 전류원 흡수: '+SVH.fmt(Pcs)+' W',
        '보존: \\(p_X = '+SVH.fmt(Psup)+' − '+SVH.fmt(PR)+' − '+SVH.fmt(Pcs)+' = '+SVH.fmt(PX)+'\\) W',
        '검토: 모든 소자 흡수 합 = 공급 합 ✓' ] }; },
    hints:['회로 전체 전력 합 = 0.','각 소자의 흡수/공급 부호를 먼저 정리한다.'] },
  { id:'u1-l4-03', level:4, type:'num', tags:['종속전원','KCL·KVL 종합'], src:'창작 문제(검산됨)',
    params:{ Is:{min:2,max:6,step:1,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, R2:{min:3,max:9,step:3,unit:'Ω'}, k:{min:1,max:2,step:1} },
    statement:function(p){ return '절점 A: 전류원 '+p.Is+' A 유입. A에서 접지로 R₁='+p.R1+' Ω, 그리고 A→B로 R₂='+p.R2+' Ω. 절점 B에서 접지로 종속 전류원 \\('+p.k+'v_A\\) [A] (B에서 접지로, \\(v_A\\)는 A 전압)가 연결되고 B에는 다른 소자가 없다. \\(v_A\\)를 구하라.'; },
    solve:function(p){
      // KCL@B: (vA-vB)/R2 = k*vA  → vB = vA(1 - k R2)
      // KCL@A: Is = vA/R1 + (vA-vB)/R2 = vA/R1 + k vA
      var vA=p.Is/(1/p.R1+p.k);
      return { ans:vA, unit:'V', steps:[
        'KCL @B: R₂로 들어온 전류가 전부 종속 전원으로 → \\((v_A-v_B)/R_2 = '+p.k+'v_A\\)',
        'KCL @A: \\(I_s = v_A/R_1 + (v_A-v_B)/R_2 = v_A/R_1 + '+p.k+'v_A\\)',
        '\\(v_A = I_s/(1/R_1 + '+p.k+')\\) = '+p.Is+'/('+SVH.fmt(1/p.R1)+'+'+p.k+') = '+SVH.fmt(vA)+' V' ] }; },
    hints:['B에서 KCL을 먼저 세우면 (v_A−v_B)/R₂가 종속 전원 값과 같다.','그 결과를 A의 KCL에 대입.'] },
  { id:'u1-l4-04', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'수동부호규약에서 전력 \\(p = vi\\)가 "흡수"를 뜻함을 전압·전류의 정의(\\(v=dw/dq\\), \\(i=dq/dt\\))에서 출발해 유도하고, 부호가 뒤집히는 두 경우를 정리하라.',
    steps:[
      '전압 정의: 단위 전하가 + 단자에서 − 단자로 이동하며 소자에 넘겨주는 에너지 \\(v = dw/dq\\). [무엇을] 에너지 관점 정의를 소환 [왜] 전력은 에너지의 시간율이므로',
      '전류 정의: \\(i = dq/dt\\) — 기준 방향을 + 단자로 들어가게 잡는다. [왜] 이 방향이면 전하가 에너지를 "놓고 가는" 쪽',
      '연쇄율: \\(p = \\dfrac{dw}{dt} = \\dfrac{dw}{dq}\\cdot\\dfrac{dq}{dt} = vi\\) — 이때 w는 소자가 받은 에너지이므로 p>0 = 흡수',
      '부호 반전 경우 ①: 실제 전류가 기준과 반대(i<0) → p<0 = 공급. ②: v<0(단자 극성 반대) → 역시 공급',
      '차원 체크: [V][A] = (J/C)(C/s) = J/s = W ✓ · 극한 체크: i=0 또는 v=0이면 p=0 (에너지 교환 없음) ✓'
    ],
    hints:['p = dw/dt에서 시작해 연쇄율로 분해한다.','기준 방향의 역할이 핵심이다.'],
    expl:'시험 서술형 대비: "왜 vi가 흡수인가"를 정의에서 유도할 수 있으면 부호 실수가 사라진다.' },
  { id:'u1-l4-05', level:4, type:'num', tags:['실험 연계','계측'], src:'기출 유형',
    params:{ Rm:{choices:[10000,50000,100000],unit:'Ω'}, R:{choices:[10000,20000,50000],unit:'Ω'}, Vs:{min:10,max:20,step:5,unit:'V'} },
    statement:function(p){ return '내부저항 '+SVH.si(p.Rm,'Ω')+'인 전압계로, '+p.Vs+' V 전원에 직렬 연결된 같은 값의 저항 R='+SVH.si(p.R,'Ω')+' 두 개 중 아래쪽 저항의 전압을 측정한다. (a) 참값 (b) 전압계가 읽는 값 (c) 오차율(%)을 구하라. (계측기의 부하 효과 — 실험 1 대비)'; },
    solve:function(p){
      var Vtrue=p.Vs/2;
      var Rpar=p.R*p.Rm/(p.R+p.Rm);
      var Vread=p.Vs*Rpar/(p.R+Rpar);
      var err=(Vtrue-Vread)/Vtrue*100;
      return { ans:{Vtrue:Vtrue, Vread:Vread, err:err}, unit:{Vtrue:'V', Vread:'V', err:'%'}, steps:[
        '참값: 같은 저항 분압 → \\(V = V_s/2\\) = '+SVH.fmt(Vtrue)+' V',
        '전압계 연결 시 아래 저항과 병렬: \\(R\\|R_m\\) = '+SVH.fmt(Rpar)+' Ω',
        '읽는 값: \\(V_s \\dfrac{R\\|R_m}{R + R\\|R_m}\\) = '+SVH.fmt(Vread)+' V',
        '오차율 = ('+SVH.fmt(Vtrue)+'−'+SVH.fmt(Vread)+')/'+SVH.fmt(Vtrue)+' × 100 = '+SVH.fmt(err)+' %',
        '(전압계 내부저항이 클수록 오차↓ — 이상 전압계는 R_m→∞)' ] }; },
    hints:['전압계는 측정 대상과 병렬로 붙는다.','병렬 등가를 만든 뒤 분압.'] },

  { id:'u1-l3-11', level:3, type:'num', tags:['정격·여유'], src:'창작 문제(검산됨)',
    params:{ R:{choices:[100,220,470],unit:'Ω'}, Pr:{choices:[0.25,0.5,1],unit:'W'}, m:{choices:[2,4]} },
    statement:function(p){ return p.Pr+' W 정격의 '+p.R+' Ω 저항을 정격의 1/'+p.m+'만 쓰는 보수 설계를 한다. (a) 허용 최대 전압 (b) 허용 최대 전류(mA)를 구하라.'; },
    solve:function(p){ var P=p.Pr/p.m, V=Math.sqrt(P*p.R), I=Math.sqrt(P/p.R)*1000;
      return { ans:{V:V, I:I}, unit:{V:'V', I:'mA'}, steps:[
        '사용 전력 한도 P = '+p.Pr+'/'+p.m+' = '+SVH.fmt(P)+' W',
        'V = √(PR) = '+SVH.fmt(V)+' V, I = √(P/R) = '+SVH.fmt(I)+' mA',
        '검토: VI = '+SVH.fmt(V*I/1000)+' W = P ✓' ] }; },
    hints:['여유율은 전력에 적용.','V·I 두 식이 같은 P에서 나온다.'] },
  { id:'u1-l3-12', level:3, type:'num', tags:['비선형 동작점'], src:'창작 문제(검산됨)',
    params:{ Vs:{min:6,max:12,step:2,unit:'V'}, R:{choices:[1,2],unit:'kΩ'}, k:{choices:[0.5,1],unit:'mA/V²'} },
    statement:function(p){ return '전원 '+p.Vs+' V — R='+p.R+' kΩ — 비선형 소자(\\(i='+p.k+'v^2\\) [mA, V]) 직렬 회로의 동작점: 소자 전압 v를 구하라.'; },
    solve:function(p){
      // Vs = R·i + v = R·k·v² + v (R kΩ, k mA/V² → RK 곱은 V 단위 정합)
      var a=p.R*p.k, b=1, c=-p.Vs;
      var v=(-b+Math.sqrt(b*b-4*a*c))/(2*a);
      return { ans:v, unit:'V', steps:[
        'KVL: \\(V_s = R\\,i + v = '+SVH.fmt(a)+'v^2 + v\\) (kΩ×mA=V로 단위 정합)',
        '이차방정식 '+SVH.fmt(a)+'v²+v−'+p.Vs+'=0 → v = '+SVH.fmt(v)+' V (양의 근)',
        '검토: i = '+SVH.fmt(p.k*v*v)+' mA, R 강하 '+SVH.fmt(p.R*p.k*v*v)+' V, 합 = '+SVH.fmt(p.R*p.k*v*v+v)+' ≈ '+p.Vs+' ✓' ] }; },
    hints:['KVL에 소자 특성식을 대입하면 v의 이차방정식.','물리적 근(양수)을 고른다.'] },
  { id:'u1-l3-13', level:3, type:'num', tags:['적분 종합'], src:'창작 문제(검산됨)',
    params:{ I1:{min:2,max:6,step:2,unit:'A'}, t1:{choices:[2,4],unit:'s'}, t2:{choices:[6,8],unit:'s'} },
    statement:function(p){ return '전류 파형: 0→'+p.t1+' s 동안 0에서 '+p.I1+' A로 선형 증가, 이후 t='+p.t2+' s까지 '+p.I1+' A 유지. (a) 총 통과 전하 (b) 평균 전류를 구하라.'; },
    solve:function(p){
      var Q=0.5*p.I1*p.t1+p.I1*(p.t2-p.t1);
      var Iavg=Q/p.t2;
      return { ans:{Q:Q, Iavg:Iavg}, unit:{Q:'C', Iavg:'A'}, steps:[
        '면적: 삼각형 ½·'+p.I1+'·'+p.t1+' = '+SVH.fmt(0.5*p.I1*p.t1)+' + 직사각형 '+p.I1+'×'+(p.t2-p.t1)+' = '+SVH.fmt(p.I1*(p.t2-p.t1)),
        'Q = '+SVH.fmt(Q)+' C',
        '평균 전류 = Q/전체시간 = '+SVH.fmt(Iavg)+' A' ] }; },
    hints:['전하 = 그래프 면적을 조각으로.'] },
  { id:'u1-l3-14', level:3, type:'num', tags:['배터리 용량'], src:'창작 문제(검산됨)',
    params:{ Ah:{choices:[2,5,10],unit:'Ah'}, V:{choices:[3.7,12],unit:'V'}, P:{choices:[5,10,20],unit:'W'} },
    statement:function(p){ return p.V+' V, '+p.Ah+' Ah 배터리가 있다. (a) 저장 에너지(Wh) (b) '+p.P+' W 부하를 몇 시간 구동할 수 있는가? (이상 방전 가정)'; },
    solve:function(p){ var Wh=p.V*p.Ah, h=Wh/p.P;
      return { ans:{Wh:Wh, h:h}, unit:{Wh:'Wh', h:'h'}, steps:[
        '에너지 = V×Ah = '+SVH.fmt(Wh)+' Wh',
        '구동 시간 = '+SVH.fmt(Wh)+'/'+p.P+' = '+SVH.fmt(h)+' h',
        '(Ah는 전하 용량, Wh가 에너지 — 단위 구분이 채점 포인트)' ] }; },
    hints:['Ah×V=Wh.'] },
  { id:'u1-l4-06', level:4, type:'num', tags:['종속전원 전력 종합'], src:'기출 유형',
    params:{ Is:{min:2,max:4,step:1,unit:'A'}, R1:{min:2,max:6,step:2,unit:'Ω'}, k:{choices:[0.5,1.5]} },
    statement:function(p){ return '절점 v: 전류원 '+p.Is+' A 유입, R₁='+p.R1+' Ω로 접지, 종속 전류원 '+p.k+'v [A]가 절점에서 접지로. (a) v (b) 각 소자의 전력(공급 +/흡수 −로 부호 명시: 전류원, R₁, 종속 전원)을 구하고 합이 0임을 보여라.'; },
    solve:function(p){
      var v=p.Is/(1/p.R1+p.k);
      var Ps=v*p.Is;            // 전류원 공급
      var Pr=v*v/p.R1;          // R 흡수
      var Pd=v*(p.k*v);         // 종속 전원 흡수(전류가 +v에서 접지로)
      return { ans:{v:v, Ps:Ps, Pr:Pr, Pd:Pd}, unit:{v:'V', Ps:'W', Pr:'W', Pd:'W'}, steps:[
        'KCL: v = I_s/(1/R₁+'+p.k+') = '+SVH.fmt(v)+' V',
        '전류원 공급 = vI_s = '+SVH.fmt(Ps)+' W',
        'R₁ 흡수 = v²/R₁ = '+SVH.fmt(Pr)+' W, 종속 전원 흡수 = v·('+p.k+'v) = '+SVH.fmt(Pd)+' W',
        '수지: '+SVH.fmt(Ps)+' = '+SVH.fmt(Pr)+'+'+SVH.fmt(Pd)+' ✓ (종속 전원도 전력을 흡수/공급하는 실소자)' ] }; },
    hints:['종속 전원 전력도 p=vi로 그냥 계산.','합이 안 맞으면 부호 실수.'] },
  { id:'u1-l4-07', level:4, type:'num', tags:['허용오차 최악설계'], src:'기출 유형',
    params:{ Vs:{choices:[10,15],unit:'V'}, R:{choices:[100,220],unit:'Ω'}, tol:{choices:[5,10],unit:'%'} },
    statement:function(p){ return '±'+p.tol+'% 허용오차의 R='+p.R+' Ω 저항에 '+p.Vs+' V가 걸린다. 소비 전력의 (a) 최솟값 (b) 최댓값 (c) 공칭값 대비 최대 편차(%)를 구하라. (최악 상황 설계)'; },
    solve:function(p){
      var Rmin=p.R*(1-p.tol/100), Rmax=p.R*(1+p.tol/100);
      var Pmax=p.Vs*p.Vs/Rmin, Pmin=p.Vs*p.Vs/Rmax, P0=p.Vs*p.Vs/p.R;
      var dev=Math.max(Pmax-P0, P0-Pmin)/P0*100;
      return { ans:{Pmin:Pmin, Pmax:Pmax, dev:dev}, unit:{Pmin:'W', Pmax:'W', dev:'%'}, steps:[
        'P = V²/R → R 최소일 때 전력 최대: P_max = '+SVH.fmt(Pmax)+' W (R='+SVH.fmt(Rmin)+')',
        'P_min = '+SVH.fmt(Pmin)+' W',
        '최대 편차 = '+SVH.fmt(dev)+' % — 정격 선정 때 이 최악값 기준으로 (기출 1번 부품 진술의 실무 배경)' ] }; },
    hints:['반비례라 R 최소가 전력 최대.','편차는 양쪽을 다 보고 큰 쪽.'] },
  { id:'u1-l4-08', level:4, type:'derive', tags:['유도'], src:'교재 표준',
    statement:'키르히호프 전압 법칙(KVL)이 에너지 보존에서 나옴을 보이고, "전위"가 정의되기 위한 조건(보존장)과 연결해 서술하라.',
    steps:[
      '단위 전하를 폐경로로 한 바퀴 옮긴다고 하자. 각 소자에서 주고받는 에너지 = 그 소자의 전압(정의 v=dw/dq) [왜] 전압의 정의를 경로에 적용',
      '한 바퀴 돌아 제자리: 전하의 상태가 같으므로 순 에너지 변화 = 0 (에너지 보존)',
      '따라서 \\(\\sum_k v_k = 0\\) — 경로의 방향 규약(강하 +, 상승 −)만 일관되면 된다',
      '이것이 가능한 이유: 회로의 전기장이 보존장(∮E·dl=0)이라 "전위"라는 스칼라가 존재 — 절점전압법의 존재 근거',
      '극한 체크: 소자 하나뿐인 루프면 v=0(단락) ✓ · 시변 자기장이 루프를 관통하면 이 전제가 깨진다(유도 기전력)는 한계까지 알면 만점'
    ],
    hints:['단위 전하 사고실험.','전위가 왜 존재하는가까지 잇는다.'],
    expl:'기출 1번 개념 다지선다에서 "KVL의 근거"를 묻는 진술 판별의 근본.' },
  ]
});
