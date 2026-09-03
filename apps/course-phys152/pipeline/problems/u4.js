/* U4 축전기와 유전체 — C 정의, 평행판, 직렬·병렬, 에너지, 유전체 (W4, 퀴즈1 범위 끝) */
SV_BANK.push({
  id: 'u4', no: 4, title: '축전기·유전체', titleEn: 'Capacitance & Dielectrics',
  scope: 'C=Q/V · 평행판·구형·원통형 C · 직렬·병렬 · 저장 에너지 U=Q²/2C · 에너지 밀도 · 유전체 κ · 연결 문제',
  problems: [

  /* ---------- L1 (6) ---------- */
  { id:'u4-l1-01', level:1, type:'mc', tags:['정의'], src:'교재 표준',
    statement:'전기용량 C=Q/V에 대한 설명으로 옳은 것은?',
    choices:['기하와 매질만의 함수 — Q나 V를 바꿔도 C는 불변','Q에 비례해 커진다','V에 비례한다','도체 재질(구리 vs 알루미늄)에 민감하다'],
    answer:0, expl:'평행판 C=ε₀A/d처럼 모양이 정한다. Q를 늘리면 V가 같이 늘어 비는 일정.' },
  { id:'u4-l1-02', level:1, type:'tf', tags:['직렬·병렬'], src:'교재 표준',
    statement:'축전기는 병렬에서 C가 더해지고(전압 공통), 직렬에서 역수가 더해진다(전하 공통) — 저항과 반대다.',
    answer:true, expl:'병렬=판 면적 늘리기, 직렬=간격 늘리기로 기억. 전하/전압 공통 조건이 문제 풀이의 첫 줄.' },
  { id:'u4-l1-03', level:1, type:'mc', tags:['에너지'], src:'교재 표준',
    statement:'축전기 저장 에너지로 옳은 것은?',
    choices:['\\(U=\\dfrac{Q^2}{2C}=\\dfrac{1}{2}CV^2=\\dfrac{1}{2}QV\\)','U=QV','U=Q²/C','U=CV'],
    answer:0, expl:'세 형태 동일 — 무엇이 고정인지(Q? V?)에 따라 골라 쓰는 것이 연결 문제의 열쇠.' },
  { id:'u4-l1-04', level:1, type:'tf', tags:['에너지 밀도'], src:'강의자료 대조',
    statement:'전기장 자체가 에너지를 담는다: 에너지 밀도 \\(u=\\tfrac12\\varepsilon_0E^2\\) [J/m³].',
    answer:true, expl:'평행판에서 유도되지만 모든 장에 일반적으로 성립 — "장의 실재성"의 정량 표현(노트의 장 개념 서사).' },
  { id:'u4-l1-05', level:1, type:'mc', tags:['유전체'], src:'교재 표준',
    statement:'유전체(상수 κ)를 축전기에 가득 채우면?',
    choices:['C가 κ배, (전지 분리 시) V는 1/κ배, 내부 장도 1/κ배','C가 1/κ배','장이 κ배','아무 변화 없음'],
    answer:0, expl:'분극 전하가 내부 장을 상쇄. C=κε₀A/d — 유전체는 "용량 증폭기"이자 절연 강화재.' },
  { id:'u4-l1-06', level:1, type:'mc', tags:['전지 유무'], src:'교재 표준',
    statement:'유전체 삽입 문제의 제1 질문은?',
    choices:['"전지가 연결된 채인가(V 고정), 분리됐나(Q 고정)"','κ 값','판 면적','유전체 두께'],
    answer:0, expl:'V 고정: Q=κQ₀·U=κU₀↑. Q 고정: V=V₀/κ·U=U₀/κ↓. 조건 하나로 결론이 정반대 — 최다 오답 지점.' },

  /* ---------- L2 (12) ---------- */
  { id:'u4-l2-01', level:2, type:'num', tags:['평행판'], src:'창작 문제(검산됨)',
    params:{ A:{choices:[100,400],unit:'cm²'}, d:{choices:[1,2],unit:'mm'} },
    statement:function(p){ return '평행판(A='+p.A+' cm², d='+p.d+' mm)의 C(pF)는?'; },
    solve:function(p){ var C=8.85e-12*p.A*1e-4/(p.d*1e-3)*1e12;
      return { ans:C, unit:'pF', steps:[
        'C = ε₀A/d = 8.85×10⁻¹²×'+SVH.fmt(p.A*1e-4)+'/'+SVH.fmt(p.d*1e-3),
        '= '+SVH.fmt(C)+' pF (pF 스케일 감각 — 1 F가 왜 거대한지)' ] }; },
    hints:['단위 변환이 문제의 전부.'] },
  { id:'u4-l2-02', level:2, type:'num', tags:['Q·V·C'], src:'창작 문제(검산됨)',
    params:{ C:{choices:[10,47],unit:'µF'}, V:{choices:[9,12],unit:'V'} },
    statement:function(p){ return 'C='+p.C+' µF를 V='+p.V+' V로 충전: (a) Q(µC) (b) U(µJ)를 구하라.'; },
    solve:function(p){ var Q=p.C*p.V, U=0.5*p.C*p.V*p.V;
      return { ans:{Q:Q, U:U}, unit:{Q:'µC', U:'µJ'}, steps:[
        'Q = CV = '+SVH.fmt(Q)+' µC',
        'U = ½CV² = '+SVH.fmt(U)+' µJ' ] }; },
    hints:['µ 단위끼리는 그대로 곱해도 된다.'] },
  { id:'u4-l2-03', level:2, type:'num', tags:['병렬'], src:'창작 문제(검산됨)',
    params:{ C1:{choices:[2,6],unit:'µF'}, C2:{choices:[3,4],unit:'µF'}, V:{choices:[12,24],unit:'V'} },
    statement:function(p){ return 'C₁='+p.C1+', C₂='+p.C2+' µF 병렬을 '+p.V+' V에 연결. (a) C_eq (b) 각 전하(µC)를 구하라.'; },
    solve:function(p){
      return { ans:{Ceq:p.C1+p.C2, Q1:p.C1*p.V, Q2:p.C2*p.V}, unit:{Ceq:'µF', Q1:'µC', Q2:'µC'}, steps:[
        '병렬: C_eq = '+(p.C1+p.C2)+' µF (V 공통)',
        'Q₁='+SVH.fmt(p.C1*p.V)+', Q₂='+SVH.fmt(p.C2*p.V)+' µC (큰 C가 전하 더)' ] }; },
    hints:['V 공통에서 출발.'] },
  { id:'u4-l2-04', level:2, type:'num', tags:['직렬'], src:'창작 문제(검산됨)',
    params:{ C1:{choices:[2,6],unit:'µF'}, C2:{choices:[3,6],unit:'µF'}, V:{choices:[10,20],unit:'V'} },
    statement:function(p){ return 'C₁='+p.C1+', C₂='+p.C2+' µF 직렬을 '+p.V+' V에 연결. (a) C_eq (b) 공통 전하 (c) 각 전압(V)을 구하라.'; },
    solve:function(p){
      var Ce=p.C1*p.C2/(p.C1+p.C2), Q=Ce*p.V;
      return { ans:{Ceq:Ce, Q:Q, V1:Q/p.C1, V2:Q/p.C2}, unit:{Ceq:'µF', Q:'µC', V1:'V', V2:'V'}, steps:[
        '직렬: C_eq = 곱/합 = '+SVH.fmt(Ce)+' µF',
        'Q = C_eqV = '+SVH.fmt(Q)+' µC (공통)',
        'V₁='+SVH.fmt(Q/p.C1)+', V₂='+SVH.fmt(Q/p.C2)+' V — 작은 C에 큰 V(전전개 U5와 동일)' ] }; },
    hints:['Q 공통에서 출발.'] },
  { id:'u4-l2-05', level:2, type:'num', tags:['유전체 C'], src:'창작 문제(검산됨)',
    params:{ C0:{choices:[5,10],unit:'pF'}, kap:{choices:[2.6,3.7,80]} },
    statement:function(p){ return '진공 C₀='+p.C0+' pF 축전기에 κ='+p.kap+' 유전체를 가득 채우면 C(pF)는? (κ=80은 무엇?)'; },
    solve:function(p){ var C=p.C0*p.kap;
      return { ans:C, unit:'pF', steps:[
        'C = κC₀ = '+SVH.fmt(C)+' pF',
        '(κ=80 ≈ 물 — 극성 분자의 위력)' ] }; },
    hints:['κ배.'] },
  { id:'u4-l2-06', level:2, type:'num', tags:['장·σ'], src:'창작 문제(검산됨)',
    params:{ V:{choices:[100,300],unit:'V'}, d:{choices:[1,3],unit:'mm'} },
    statement:function(p){ return '평행판(V='+p.V+' V, d='+p.d+' mm)의 (a) 내부 장(kV/m) (b) 판의 σ(µC/m²)를 구하라.'; },
    solve:function(p){
      var E=p.V/(p.d*1e-3);
      var s=8.85e-12*E*1e6;
      return { ans:{E:E/1000, s:s}, unit:{E:'kV/m', s:'µC/m²'}, steps:[
        'E = V/d = '+SVH.fmt(E/1000)+' kV/m',
        'σ = ε₀E = '+SVH.fmt(s)+' µC/m² (U2 도체 표면장 역산)' ] }; },
    hints:['E=V/d, σ=ε₀E.'] },
  { id:'u4-l2-07', level:2, type:'num', tags:['에너지 밀도'], src:'창작 문제(검산됨)',
    params:{ E:{choices:[1,3],unit:'MV/m'} },
    statement:function(p){ return 'E='+p.E+' MV/m인 영역의 에너지 밀도(J/m³)와, 1 L 부피의 에너지(mJ)를 구하라.'; },
    solve:function(p){
      var u=0.5*8.85e-12*Math.pow(p.E*1e6,2);
      return { ans:{u:u, EL:u*1e-3*1000}, unit:{u:'J/m³', EL:'mJ'}, steps:[
        'u = ½ε₀E² = '+SVH.fmt(u)+' J/m³',
        '1 L: '+SVH.fmt(u*1e-3*1000)+' mJ (절연파괴 직전 공기도 에너지는 소박 — 왜 배터리를 쓰는지)' ] }; },
    hints:['E² 주의.'] },
  { id:'u4-l2-08', level:2, type:'num', tags:['구형 C'], src:'교재 표준',
    params:{ R:{choices:[10,50],unit:'cm'} },
    statement:function(p){ return '고립 도체구(R='+p.R+' cm)의 C=4πε₀R(pF)를 구하라. 지구(R=6.4×10⁶ m)라면 몇 µF?'; },
    solve:function(p){
      var C=(p.R/100)/8.99e9*1e12;
      var Ce=6.4e6/8.99e9*1e6;
      return { ans:{C:C, Cearth:Ce}, unit:{C:'pF', Cearth:'µF'}, steps:[
        'C = R/k = '+SVH.fmt(C)+' pF',
        '지구: '+SVH.fmt(Ce)+' µF — 지구조차 mF가 안 된다(1 F의 위엄)' ] }; },
    hints:['C=R/k 꼴이 빠르다.'] },
  { id:'u4-l2-09', level:2, type:'num', tags:['κ 삽입: V 고정'], src:'창작 문제(검산됨)',
    params:{ C0:{choices:[4,8],unit:'µF'}, V:{choices:[12,24],unit:'V'}, kap:{choices:[2,3]} },
    statement:function(p){ return '전지('+p.V+' V) 연결 유지 상태로 κ='+p.kap+' 삽입: (a) 새 Q(µC) (b) 새 U(µJ) (c) U 증가분은 어디서 왔나?'; },
    solve:function(p){
      var Q=p.kap*p.C0*p.V, U=0.5*p.kap*p.C0*p.V*p.V;
      return { ans:{Q:Q, U:U}, unit:{Q:'µC', U:'µJ'}, steps:[
        'V 고정: Q = κC₀V = '+SVH.fmt(Q)+' µC (전지가 전하 추가 공급)',
        'U = ½κC₀V² = '+SVH.fmt(U)+' µJ (κ배 증가)',
        '전지가 일을 했다 — 게다가 유전체는 안으로 빨려 들어간다(인력)' ] }; },
    hints:['고정된 것부터 쓴다.'] },
  { id:'u4-l2-10', level:2, type:'num', tags:['κ 삽입: Q 고정'], src:'창작 문제(검산됨)',
    params:{ C0:{choices:[4,8],unit:'µF'}, V0:{choices:[12,24],unit:'V'}, kap:{choices:[2,4]} },
    statement:function(p){ return '충전('+p.V0+' V) 후 전지 분리, κ='+p.kap+' 삽입: (a) 새 V (b) 새 U/U₀ 비를 구하라.'; },
    solve:function(p){
      return { ans:{V:p.V0/p.kap, ratio:1/p.kap}, unit:{V:'V', ratio:'배'}, steps:[
        'Q 고정: V = V₀/κ = '+SVH.fmt(p.V0/p.kap)+' V',
        'U = Q²/2κC₀ → 1/κ = '+SVH.fmt(1/p.kap)+'배 (에너지 감소분 = 유전체를 당겨 넣은 일)' ] }; },
    hints:['Q²/2C 형태가 편하다.'] },
  { id:'u4-l2-11', level:2, type:'num', tags:['혼합 회로'], src:'창작 문제(검산됨)',
    params:{ C1:{choices:[6,12],unit:'µF'}, C2:{choices:[3,6],unit:'µF'}, C3:{choices:[2,4],unit:'µF'}, V:{choices:[12,18],unit:'V'} },
    statement:function(p){ return '(C₁ ∥ C₂) 직렬 C₃ (값 '+p.C1+'·'+p.C2+'·'+p.C3+' µF), 전원 '+p.V+' V. (a) C_eq (b) C₃의 전압(V)을 구하라.'; },
    solve:function(p){
      var Cp=p.C1+p.C2, Ce=Cp*p.C3/(Cp+p.C3);
      var Q=Ce*p.V, V3=Q/p.C3;
      return { ans:{Ceq:Ce, V3:V3}, unit:{Ceq:'µF', V3:'V'}, steps:[
        '병렬 '+SVH.fmt(Cp)+' µF → 직렬 곱/합 = '+SVH.fmt(Ce)+' µF',
        'Q = '+SVH.fmt(Q)+' µC → V₃ = Q/C₃ = '+SVH.fmt(V3)+' V' ] }; },
    hints:['접기→Q→나누기.'] },
  { id:'u4-l2-12', level:2, type:'num', tags:['내압 직렬'], src:'창작 문제(검산됨)',
    params:{ C:{choices:[10,20],unit:'µF'}, Vr:{choices:[50,100],unit:'V'}, n:{choices:[2,3]} },
    statement:function(p){ return '내압 '+p.Vr+' V, C='+p.C+' µF 축전기 '+p.n+'개를 직렬로: (a) 총 내압 (b) C_eq(µF)를 구하라.'; },
    solve:function(p){
      return { ans:{Vmax:p.n*p.Vr, Ceq:p.C/p.n}, unit:{Vmax:'V', Ceq:'µF'}, steps:[
        '같은 C 직렬 → 전압 균등 분배 → 내압 '+p.n+'배 = '+SVH.fmt(p.n*p.Vr)+' V',
        'C_eq = C/n = '+SVH.fmt(p.C/p.n)+' µF (용량은 손해 — 내압과 맞바꿈)' ] }; },
    hints:['직렬의 실무 이유.'] },

  /* ---------- L3 (14) ---------- */
  { id:'u4-l3-01', level:3, type:'num', tags:['재연결(공유) 문제'], src:'기출 유형',
    params:{ C1:{choices:[2,4],unit:'µF'}, V1:{choices:[12,24],unit:'V'}, C2:{choices:[4,8],unit:'µF'} },
    statement:function(p){ return '충전된 C₁('+p.C1+' µF, '+p.V1+' V)을 전지에서 떼어 중성 C₂('+p.C2+' µF)와 병렬 연결. (a) 공통 V (b) 손실 에너지(µJ)를 구하라.'; },
    solve:function(p){
      var Q=p.C1*p.V1, V=Q/(p.C1+p.C2);
      var U0=0.5*p.C1*p.V1*p.V1, U1=0.5*(p.C1+p.C2)*V*V;
      return { ans:{V:V, dU:U0-U1}, unit:{V:'V', dU:'µJ'}, steps:[
        '전하 보존: Q='+SVH.fmt(Q)+' µC → V = Q/(C₁+C₂) = '+SVH.fmt(V)+' V',
        'U: '+SVH.fmt(U0)+' → '+SVH.fmt(U1)+' µJ, 손실 '+SVH.fmt(U0-U1)+' µJ',
        '(전하는 보존, 에너지는 아님 — 도선 열·복사로. U3-l4-08과 같은 구조)' ] }; },
    hints:['Q 보존이 유일한 법.'] },
  { id:'u4-l3-02', level:3, type:'num', tags:['부분 유전체(면적 분할)'], src:'기출 유형',
    params:{ C0:{choices:[6,12],unit:'pF'}, kap:{choices:[3,5]} },
    statement:function(p){ return '평행판(진공 C₀='+p.C0+' pF)의 면적 절반에만 κ='+p.kap+' 유전체(두께 전체). 새 C(pF)는?'; },
    solve:function(p){ var C=p.C0/2*(1+p.kap);
      return { ans:C, unit:'pF', steps:[
        '면적 분할 = 병렬: C = C₀/2 + κC₀/2',
        '= '+SVH.fmt(C)+' pF' ] }; },
    hints:['옆으로 나뉘면 병렬.'] },
  { id:'u4-l3-03', level:3, type:'num', tags:['부분 유전체(두께 분할)'], src:'기출 유형',
    params:{ C0:{choices:[6,12],unit:'pF'}, kap:{choices:[2,4]} },
    statement:function(p){ return '같은 축전기의 두께 절반에만 κ='+p.kap+' (면적 전체). 새 C(pF)는?'; },
    solve:function(p){ var C=2*p.kap/(1+p.kap)*p.C0;
      return { ans:C, unit:'pF', steps:[
        '두께 분할 = 직렬: (2C₀)와 (2κC₀)의 직렬',
        'C = 2κC₀/(1+κ) = '+SVH.fmt(C)+' pF (면적/두께 분할 구분이 최다 실수)' ] }; },
    hints:['위아래로 나뉘면 직렬.'] },
  { id:'u4-l3-04', level:3, type:'num', tags:['판 간격 당기기'], src:'기출 유형',
    params:{ C0:{choices:[5,10],unit:'µF'}, V0:{choices:[10,20],unit:'V'}, k:{choices:[2,3]} },
    statement:function(p){ return '충전('+p.V0+' V) 후 분리한 평행판(C₀='+p.C0+' µF)의 간격을 '+p.k+'배로 벌린다. (a) 새 V (b) 에너지 변화(µJ)와 그 출처를 구하라.'; },
    solve:function(p){
      var Q=p.C0*p.V0;
      var U0=0.5*p.C0*p.V0*p.V0, U1=U0*p.k;
      return { ans:{V:p.V0*p.k, dU:U1-U0}, unit:{V:'V', dU:'µJ'}, steps:[
        'Q 고정, C→C₀/'+p.k+' → V = '+SVH.fmt(p.V0*p.k)+' V',
        'U = Q²/2C → '+p.k+'배: 증가분 '+SVH.fmt(U1-U0)+' µJ',
        '출처 = 판 사이 인력을 거슬러 당긴 "사람의 일" (장이 에너지 창고라는 증거)' ] }; },
    hints:['Q²/2C에 C만 바꾼다.'] },
  { id:'u4-l3-05', level:3, type:'num', tags:['에너지 밀도 검증'], src:'기출 유형',
    params:{ C:{choices:[100,200],unit:'pF'}, V:{choices:[50,100],unit:'V'}, A:{choices:[100],unit:'cm²'} },
    statement:function(p){ return '평행판(C='+p.C+' pF, A='+p.A+' cm², V='+p.V+' V)에서 (a) U=½CV² (b) u·(부피)로 각각 에너지(nJ)를 구해 일치를 확인하라.'; },
    solve:function(p){
      var U=0.5*p.C*1e-12*p.V*p.V*1e9;
      // d = ε0 A / C
      var d=8.85e-12*p.A*1e-4/(p.C*1e-12);
      var E=p.V/d, u=0.5*8.85e-12*E*E;
      var U2=u*p.A*1e-4*d*1e9;
      return { ans:{U:U, U2:U2}, unit:{U:'nJ', U2:'nJ'}, steps:[
        '직접: U = ½CV² = '+SVH.fmt(U)+' nJ',
        'd = ε₀A/C = '+SVH.fmt(d*1000)+' mm → E = '+SVH.fmt(E)+' V/m',
        'u·Ad = '+SVH.fmt(U2)+' nJ — 일치 ✓ (에너지는 "장이 있는 부피"에 산다)' ] }; },
    hints:['두 경로 계산.'] },
  { id:'u4-l3-06', level:3, type:'num', tags:['직렬+κ'], src:'기출 유형',
    params:{ C:{choices:[6,12],unit:'µF'}, kap:{choices:[3]}, V:{choices:[20,40],unit:'V'} },
    statement:function(p){ return '동일 C('+p.C+' µF) 두 개 직렬, 전원 '+p.V+' V. 한쪽에만 κ='+p.kap+' 삽입(연결 유지). (a) 새 C_eq (b) 유전체 없는 쪽 전압(V)을 구하라.'; },
    solve:function(p){
      var Ce=p.kap*p.C/(1+p.kap);
      var Q=Ce*p.V, V1=Q/p.C;
      return { ans:{Ceq:Ce, V1:V1}, unit:{Ceq:'µF', V1:'V'}, steps:[
        'C_eq = κC/(1+κ) = '+SVH.fmt(Ce)+' µF',
        'Q = '+SVH.fmt(Q)+' µC → 진공 쪽 V = Q/C = '+SVH.fmt(V1)+' V',
        '(유전체 쪽 전압이 낮아지고 진공 쪽이 높아짐 — 절연파괴 위험은 진공 쪽!)' ] }; },
    hints:['직렬 Q 공통 재활용.'] },
  { id:'u4-l3-07', level:3, type:'num', tags:['원통 축전기'], src:'교재 표준',
    params:{ b_a:{choices:[2,3]}, L:{choices:[10,50],unit:'cm'} },
    statement:function(p){ return '동축 원통(b/a='+p.b_a+', 길이 L='+p.L+' cm)의 C=2πε₀L/ln(b/a)를 계산하라(pF).'; },
    solve:function(p){
      var C=2*Math.PI*8.85e-12*p.L/100/Math.log(p.b_a)*1e12;
      return { ans:C, unit:'pF', steps:[
        'C = 2πε₀L/ln(b/a) = '+SVH.fmt(C)+' pF',
        '(U2 동축 장 → U3 ln 전위차 → C — 3단원 연결의 결정판)' ] }; },
    hints:['ln이 들어간 C.'] },
  { id:'u4-l3-08', level:3, type:'num', tags:['판 인력'], src:'기출 유형',
    params:{ C:{choices:[100,300],unit:'pF'}, V:{choices:[100,200],unit:'V'}, d:{choices:[1,2],unit:'mm'} },
    statement:function(p){ return '평행판(C='+p.C+' pF, V='+p.V+' V, d='+p.d+' mm)의 판 사이 인력 F=Q²/(2ε₀A)=U/d... 간단히 F=½QE=½QV/d로 계산하라(mN).'; },
    solve:function(p){
      var Q=p.C*1e-12*p.V;
      var F=0.5*Q*p.V/(p.d*1e-3)*1000;
      return { ans:F, unit:'mN', steps:[
        'Q = CV = '+SVH.fmt(Q)+' C',
        'F = ½QV/d = '+SVH.fmt(F)+' mN (½은 "상대 판의 장만" — U2-l3-10과 같은 논리)' ] }; },
    hints:['σ/2ε₀ 논리 재활용.'] },
  { id:'u4-l3-09', level:3, type:'num', tags:['C-V 곡선 적분'], src:'창작 문제(검산됨)',
    params:{ C:{choices:[10,40],unit:'µF'}, V:{choices:[10,20],unit:'V'} },
    statement:function(p){ return '왜 U=½QV인가: C='+p.C+' µF를 0→'+p.V+' V로 충전하며 dW=v·dq를 적분해 U(µJ)를 구하고 QV와 비교하라.'; },
    solve:function(p){
      var U=0.5*p.C*p.V*p.V;
      return { ans:{U:U, QV:p.C*p.V*p.V}, unit:{U:'µJ', QV:'µJ'}, steps:[
        'W = ∫₀^Q (q/C)dq = Q²/2C = '+SVH.fmt(U)+' µJ',
        'QV = '+SVH.fmt(p.C*p.V*p.V)+' µJ의 절반 — 나중 전하일수록 비싸게 올라가는 평균 효과' ] }; },
    hints:['q/C를 q로 적분.'] },
  { id:'u4-l3-10', level:3, type:'num', tags:['3개 브리지형'], src:'기출 유형',
    params:{ C:{choices:[6,12],unit:'µF'}, V:{choices:[12,24],unit:'V'} },
    statement:function(p){ return '동일 C('+p.C+' µF) 3개: 두 개 직렬 가지와 한 개 단독 가지가 병렬, 전원 '+p.V+' V. (a) C_eq (b) 총 저장 에너지(µJ)를 구하라.'; },
    solve:function(p){
      var Ce=p.C/2+p.C;
      var U=0.5*Ce*p.V*p.V;
      return { ans:{Ceq:Ce, U:U}, unit:{Ceq:'µF', U:'µJ'}, steps:[
        'C_eq = C/2 + C = '+SVH.fmt(Ce)+' µF',
        'U = ½C_eqV² = '+SVH.fmt(U)+' µJ' ] }; },
    hints:['가지별로 접기.'] },
  { id:'u4-l3-11', level:3, type:'num', tags:['유전체 뽑기 일'], src:'기출 유형',
    params:{ C0:{choices:[5,10],unit:'µF'}, V0:{choices:[10,20],unit:'V'}, kap:{choices:[2,4]} },
    statement:function(p){ return 'κ='+p.kap+'가 든 축전기(κC₀, C₀='+p.C0+' µF)를 '+p.V0+' V로 충전 후 분리, 유전체를 꺼낸다. 필요한 외부 일(µJ)을 구하라.'; },
    solve:function(p){
      var Q=p.kap*p.C0*p.V0;
      var U0=0.5*p.kap*p.C0*p.V0*p.V0;
      var U1=Q*Q/(2*p.C0);
      return { ans:U1-U0, unit:'µJ', steps:[
        'Q = κC₀V₀ = '+SVH.fmt(Q)+' µC 고정',
        'U: '+SVH.fmt(U0)+' → Q²/2C₀ = '+SVH.fmt(U1)+' µJ',
        'W_ext = ΔU = '+SVH.fmt(U1-U0)+' µJ > 0 (유전체는 빨려 들어가려 하므로 꺼내려면 일이 든다)' ] }; },
    hints:['Q 고정·C 감소.'] },
  { id:'u4-l3-12', level:3, type:'num', tags:['V 고정 뽑기'], src:'기출 유형',
    params:{ C0:{choices:[5,10],unit:'µF'}, V:{choices:[10,20],unit:'V'}, kap:{choices:[2,3]} },
    statement:function(p){ return '같은 상황이지만 전지('+p.V+' V) 연결 유지로 유전체를 꺼낸다. (a) 축전기 에너지 변화 (b) 전지로 돌아간 에너지(µJ)를 구하라.'; },
    solve:function(p){
      var dU=0.5*p.C0*p.V*p.V*(1-p.kap);
      var dQ=p.C0*p.V*(1-p.kap);
      var Wbat=-dQ*p.V; // 전지가 받은 에너지 = -ΔQ·V
      return { ans:{dU:dU, Wbat:Wbat}, unit:{dU:'µJ', Wbat:'µJ'}, steps:[
        'ΔU = ½C₀V²(1−κ) = '+SVH.fmt(dU)+' µJ (감소)',
        '전하 ΔQ = C₀V(1−κ) < 0 → 전지로 회수 = |ΔQ|V = '+SVH.fmt(Wbat)+' µJ',
        '(에너지 장부: 사람 일 + 축전기 감소 = 전지 충전 — 3자 수지)' ] }; },
    hints:['V 고정은 전지 장부까지.'] },
  { id:'u4-l3-13', level:3, type:'num', tags:['구형 축전기'], src:'교재 표준',
    params:{ a:{choices:[5,10],unit:'cm'}, b:{choices:[15,20],unit:'cm'} },
    statement:function(p){ return '동심 구 축전기(a='+p.a+', b='+p.b+' cm)의 C=4πε₀ab/(b−a)를 계산하라(pF). b→∞ 극한은?'; },
    solve:function(p){
      var a=p.a/100, b=p.b/100;
      var C=a*b/(b-a)/8.99e9*1e12;
      return { ans:C, unit:'pF', steps:[
        'C = ab/[k(b−a)] = '+SVH.fmt(C)+' pF',
        'b→∞: C→a/k = 고립구 (l2-08 회수) — 극한 체크 습관' ] }; },
    hints:['ab/(b−a) 패턴.'] },
  { id:'u4-l3-14', level:3, type:'num', tags:['RC 예고: 시간 상수'], src:'창작 문제(검산됨)',
    params:{ C:{choices:[100,470],unit:'µF'}, R:{choices:[1,10],unit:'kΩ'} },
    statement:function(p){ return '이 축전기(C='+p.C+' µF)가 R='+p.R+' kΩ로 방전하면 시간상수 τ=RC(s)는? 63.2% 방전 시간은?'; },
    solve:function(p){ var tau=p.R*1000*p.C*1e-6;
      return { ans:{tau:tau, t63:tau}, unit:{tau:'s', t63:'s'}, steps:[
        'τ = RC = '+SVH.fmt(tau)+' s',
        '(다음 단원 DC 회로의 다리 — 전전개 U6과 같은 물리)' ] }; },
    hints:['kΩ·µF→ms 반사신경.'] },

  /* ---------- L4 (8) ---------- */
  { id:'u4-l4-01', level:4, type:'mc', tags:['개념 종합'], src:'기출 유형',
    statement:'옳은 것을 모두 고르면?<br>㉠ C는 기하·매질만의 함수다<br>㉡ 재연결 문제에서 보존되는 것은 에너지가 아니라 전하다<br>㉢ V 고정 κ 삽입 시 U는 κ배 증가, Q 고정이면 1/κ로 감소<br>㉣ 에너지 밀도 ½ε₀E²는 축전기 밖 임의의 장에도 적용된다',
    choices:['전부','㉠㉡㉢','㉡㉢㉣','㉠㉣'],
    answer:0, expl:'전부 참 — 특히 ㉡·㉢이 퀴즈1의 저격 포인트.' },
  { id:'u4-l4-02', level:4, type:'num', tags:['퀴즈1형 종합'], src:'기출 유형',
    params:{ C1:{choices:[3,6],unit:'µF'}, C2:{choices:[6,12],unit:'µF'}, V:{choices:[12,24],unit:'V'} },
    statement:function(p){ return 'C₁('+p.C1+')과 C₂('+p.C2+' µF)를 직렬로 '+p.V+' V 충전 → 전원 분리 → 떼어서 +끼리 −끼리 병렬 재연결. (a) 재연결 후 공통 V (b) 총 에너지 변화(µJ)를 구하라.'; },
    solve:function(p){
      var Ce=p.C1*p.C2/(p.C1+p.C2), Q=Ce*p.V;
      var U0=0.5*Ce*p.V*p.V;
      var V1=2*Q/(p.C1+p.C2);
      var U1=0.5*(p.C1+p.C2)*V1*V1;
      return { ans:{V1:V1, dU:U1-U0}, unit:{V1:'V', dU:'µJ'}, steps:[
        '직렬 충전: 각자 Q = '+SVH.fmt(Q)+' µC',
        '병렬 재연결: 총 2Q, V = 2Q/(C₁+C₂) = '+SVH.fmt(V1)+' V',
        'U: '+SVH.fmt(U0)+' → '+SVH.fmt(U1)+' µJ (Δ='+SVH.fmt(U1-U0)+' — 재배열 손실)' ] }; },
    hints:['각 판의 전하 부호를 그림으로.'] },
  { id:'u4-l4-03', level:4, type:'derive', tags:['유도'], src:'강의자료 대조',
    statement:'평행판에서 에너지 밀도 \\(u=\\tfrac12\\varepsilon_0E^2\\)를 U=½CV²에서 유도하고, 이것이 "장 자체의 에너지"로 읽히는 이유를 서술하라.',
    steps:[
      'U = ½CV², C=ε₀A/d, V=Ed 대입 [왜] 기하를 장 변수로 갈아끼우기',
      'U = ½(ε₀A/d)(Ed)² = ½ε₀E²·(Ad)',
      'Ad = 장이 존재하는 부피 → u=U/(Ad)=½ε₀E²',
      '기하(A,d)가 소거되고 E만 남음 — 축전기가 아니라 "장이 있는 곳"의 성질로 승격',
      '극한 체크: E=0 ⇒ u=0 ✓ · 차원: [C²/N·m²][N²/C²]=[N/m²]=[J/m³] ✓ (EM파 에너지의 복선)'
    ],
    hints:['C·V를 모두 E와 기하로.','부피로 나누는 순간이 개념 도약.'],
    expl:'노트의 "장의 실재성" 서사를 계산으로 완성 — 서술형 대비 1순위.' },
  { id:'u4-l4-04', level:4, type:'num', tags:['설계: 목표 C·내압'], src:'기출 유형',
    params:{ Ct:{choices:[2,5],unit:'µF'}, Vt:{choices:[100,200],unit:'V'}, C:{choices:[2,5],unit:'µF'}, Vr:{choices:[50,100],unit:'V'} },
    constraint:function(p){ return p.Ct===p.C && p.Vt===2*p.Vr; },
    statement:function(p){ return '단위 축전기(C='+p.C+' µF, 내압 '+p.Vr+' V)로 목표 C_eq='+p.Ct+' µF·내압 '+p.Vt+' V를 만들려면 최소 몇 개가 필요한가? (직렬 n × 병렬 m 배열의 n, m과 총수)'; },
    solve:function(p){
      var n=p.Vt/p.Vr; // 직렬 수
      var m=n; // Ceq = mC/n = C → m=n
      return { ans:{n:n, m:m, total:n*m}, unit:{n:'', m:'', total:'개'}, steps:[
        '내압: 직렬 n = '+p.Vt+'/'+p.Vr+' = '+n,
        'C_eq = (m/n)C = C → m = n = '+m,
        '총 '+n*m+'개 ('+n+'직렬×'+m+'병렬) — 배터리팩·필름콘덴서 뱅크의 실제 산수' ] }; },
    hints:['내압이 n을, 용량이 m을 정한다.'] },
  { id:'u4-l4-05', level:4, type:'num', tags:['κ 부분+전지 수지 완주'], src:'기출 유형',
    params:{ C0:{choices:[4,8],unit:'µF'}, V:{choices:[10,20],unit:'V'}, kap:{choices:[3,5]} },
    statement:function(p){ return '전지('+p.V+' V) 연결 유지, C₀='+p.C0+' µF의 면적 절반에 κ='+p.kap+' 삽입. (a) 새 C (b) 추가로 흘러든 전하(µC) (c) 전지가 한 일 vs 축전기 에너지 증가(µJ) 비교.'; },
    solve:function(p){
      var C=p.C0/2*(1+p.kap);
      var dQ=(C-p.C0)*p.V;
      var Wb=dQ*p.V;
      var dU=0.5*(C-p.C0)*p.V*p.V;
      return { ans:{C:C, dQ:dQ, Wb:Wb, dU:dU}, unit:{C:'µF', dQ:'µC', Wb:'µJ', dU:'µJ'}, steps:[
        'C = C₀(1+κ)/2 = '+SVH.fmt(C)+' µF',
        'ΔQ = ΔC·V = '+SVH.fmt(dQ)+' µC → 전지 일 = ΔQ·V = '+SVH.fmt(Wb)+' µJ',
        'ΔU = ½ΔC·V² = '+SVH.fmt(dU)+' µJ = 전지 일의 절반 — 나머지 절반은 유전체를 당겨 넣는 역학적 일',
        '(수지 3분할: 전지 = 저장 + 인력일)' ] }; },
    hints:['½ 차이의 행방을 말할 수 있어야.'] },
  { id:'u4-l4-06', level:4, type:'num', tags:['절연파괴 설계'], src:'기출 유형',
    params:{ A:{choices:[100,200],unit:'cm²'}, kap:{choices:[2.6,3.7]}, Eb:{choices:[16,60],unit:'MV/m'}, V:{choices:[500,1000],unit:'V'} },
    statement:function(p){ return 'κ='+p.kap+', 파괴장 '+p.Eb+' MV/m인 유전체로 '+p.V+' V용 축전기(A='+p.A+' cm²) 설계: (a) 안전율 2로 최소 두께(µm) (b) 그때 C(nF)를 구하라.'; },
    solve:function(p){
      var d=2*p.V/(p.Eb*1e6)*1e6;
      var C=p.kap*8.85e-12*p.A*1e-4/(d*1e-6)*1e9;
      return { ans:{d:d, C:C}, unit:{d:'µm', C:'nF'}, steps:[
        'E = V/d ≤ E_b/2 → d ≥ 2V/E_b = '+SVH.fmt(d)+' µm',
        'C = κε₀A/d = '+SVH.fmt(C)+' nF',
        '(얇을수록 C 크지만 파괴 위험 — 유전체 선택의 실제 트레이드오프)' ] }; },
    hints:['안전율이 d를 정한다.'] },
  { id:'u4-l4-07', level:4, type:'num', tags:['혼합망+에너지 분배'], src:'기출 유형',
    params:{ C:{choices:[4,8],unit:'µF'}, V:{choices:[12,24],unit:'V'} },
    statement:function(p){ return '동일 C('+p.C+' µF) 4개: [2개 직렬] ∥ [2개 직렬], 전원 '+p.V+' V. (a) C_eq (b) 각 축전기의 전압·에너지(µJ) (c) 한 개가 단락(고장)되면 그 가지 나머지 축전기의 전압은?'; },
    solve:function(p){
      var Ce=p.C; // C/2 + C/2
      var U=0.5*p.C*Math.pow(p.V/2,2);
      return { ans:{Ceq:Ce, Veach:p.V/2, U:U, Vfault:p.V}, unit:{Ceq:'µF', Veach:'V', U:'µJ', Vfault:'V'}, steps:[
        'C_eq = C/2+C/2 = '+SVH.fmt(Ce)+' µF',
        '각 전압 V/2 = '+SVH.fmt(p.V/2)+' V, 각 에너지 '+SVH.fmt(U)+' µJ',
        '단락 시 남은 하나가 전체 '+p.V+' V를 다 받는다 — 내압 초과 연쇄 고장의 메커니즘' ] }; },
    hints:['대칭 → 고장 시나리오.'] },
  { id:'u4-l4-08', level:4, type:'num', tags:['평행판 안 유전판 힘'], src:'기출 유형',
    params:{ C0:{choices:[10,20],unit:'pF'}, V:{choices:[100,200],unit:'V'}, kap:{choices:[2,3]}, L:{choices:[4,10],unit:'cm'} },
    statement:function(p){ return '전지('+p.V+' V) 연결 상태의 평행판(변 L='+p.L+' cm 정사각, 진공 C₀='+p.C0+' pF)에 κ='+p.kap+' 유전판을 x만큼 삽입. 빨려드는 힘 F=(κ−1)C₀V²/(2L)을 계산하라(µN).'; },
    solve:function(p){
      var F=(p.kap-1)*p.C0*1e-12*p.V*p.V/(2*p.L/100)*1e6;
      return { ans:F, unit:'µN', steps:[
        'C(x) = C₀[1+(κ−1)x/L] → dC/dx = (κ−1)C₀/L',
        'V 고정: F = ½V²dC/dx = '+SVH.fmt(F)+' µN (안쪽으로)',
        '(에너지법의 힘 계산 — 전지 항까지 포함하면 부호가 +로 정리되는 것이 포인트)' ] }; },
    hints:['F=+½V²dC/dx (V 고정).'] }
  ]
});
