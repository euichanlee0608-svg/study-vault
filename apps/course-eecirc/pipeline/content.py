# -*- coding: utf-8 -*-
"""전전개(전기전자회로개론) U1~U7 콘텐츠 — 전공서적급 개편(2026-09-03).
개념(concept)=이 파일 새 판(바텀업·한영병기·LaTeX 관습 기호·중요도 칩·시험 연결),
유도(derive)·예제(worked)=content_base.py 보관분을 그대로 조립."""

from content_base import UNITS as _BASE, JS, EX

_old = {u["id"]: u for u in _BASE}

COURSE = { "id":"course",
  "bigpicture": r"""
<p><b>이 과목의 단 하나의 물음</b> — 임의의 회로망이 주어졌을 때, 모든 지점의 전압 \(V\)와 전류 \(I\)를
<b>체계적으로</b>(감이 아니라 절차로) 구하는 방법은 무엇인가. 답은 놀랄 만큼 경제적이다:
법칙은 단 셋 — 옴 법칙<span class="en">(Ohm's law)</span> \(V=IR\), 키르히호프 전류법칙 KCL, 전압법칙 KVL — 이고,
나머지 전부는 이 셋을 빠르고 안전하게 굴리는 <b>기술</b>이다.</p>
<p><b>서사는 3막이다.</b></p>
<p>① <b>저항 회로의 완성 (U1→U4)</b>: 언어와 법칙(U1) → 직렬·병렬 압축과 분배(U2) →
연립방정식의 기계화인 절점·망로 해석(U3) → 회로를 두 부품으로 요약하는 테브난·노턴과 중첩(U4).
U4가 끝나면 어떤 저항 회로도 "풀 수 있는가"가 아니라 "몇 분 걸리는가"의 문제가 된다.</p>
<p>② <b>시간이 흐르기 시작한다 (U5→U6)</b>: 축전기 \(i=C\,dv/dt\)와 인덕터 \(v=L\,di/dt\)가 미분을 데려온다(U5 전반).
정현파 정상상태라면 페이저<span class="en">(phasor)</span>가 미분방정식을 복소 산수로 바꾸고(U5 후반) —
임피던스 \(Z\)만 끼우면 ①막의 모든 기술이 그대로 재사용된다. 스위치가 딸깍하는 순간의 과도응답은
시정수 \(\tau\) 하나로 요약되는 1차 지수 곡선이다(U6).</p>
<p>③ <b>주파수의 눈 (U7)</b>: 회로를 "주파수별 필터"로 읽는다. 전달함수 \(H(j\omega)\), −3dB 차단주파수,
보드 선도<span class="en">(Bode plot)</span> — 신호 처리·통신·제어(MECH387)로 나가는 관문이다.</p>
<div class="mapline">U1 법칙 3종 → U2 등가·분배 → U3 절점·망로(기계화) → U4 테브난·중첩(요약) → U5 C·L·페이저 → U6 과도응답(τ) → U7 주파수응답·필터</div>
<p><b>시험 전략</b> — 기출 구조(중간 1세트 분석): 다중선택 개념 30점 + 절점/망로 대형 계산 + 페이저 + RC 스위칭 20점 + 필터 설계 15점.
즉 <b>[개념]</b> 수동부호규약·전원 성질·정리들의 성립 조건, <b>[계산]</b> 절점·망로 연립과 완전응답 공식
\(v(t)=v_\infty+(v_0-v_\infty)e^{-t/\tau}\), <b>[설계]</b> 차단주파수 맞추는 RC 선정.
전 단원에서 "회로를 그리고 기준(부호·방향)을 먼저 박는" 습관이 점수의 절반이다.</p>""" }

CONCEPTS = {

"u1": r"""
<div class="bigpic"><span class="bt">U1 큰그림</span>
회로 해석의 헌법을 제정하는 단원이다. 변수 4개(전하 \(q\)·전류 \(I\)·전압 \(V\)·전력 \(P\)), 법칙 3개(옴·KCL·KVL),
그리고 부호를 다스리는 규약 1개(수동부호규약). 이후 여섯 단원은 새 법칙을 단 하나도 추가하지 않는다 —
전부 이 헌법의 시행령이다. 여기서 부호가 흔들리면 U3 연립에서 반드시 무너진다.</div>

<h4>1. 네 가지 변수 — 회로의 언어 <span class="en">(Charge, Current, Voltage, Power)</span><span class="tagm">계산 필수</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — "전기가 흐른다"를 계산 가능한 양으로 바꿔야 한다. 무엇이 흐르고, 무엇이 밀며, 무엇이 소비되는가?</div>
<p><b>개념 등장</b> — 흐르는 것은 전하 \(q\)[C]. 그 시간율이 전류:</p>
<p>\[ I=\frac{dq}{dt}\ \ [\mathrm{A=C/s}] \]</p>
<p>미는 것은 전압 — 단위 전하가 두 점 사이를 이동할 때 주고받는 에너지 \(V=dw/dq\) [V=J/C].
전압은 언제나 <b>두 점 사이</b>의 양(높이차와 같다)이라 기준점(접지) 선언이 먼저다.
에너지의 시간율이 전력:</p>
<p>\[ P=VI\ \ [\mathrm{W=J/s}] \]</p>
<p>전류는 방향(화살표), 전압은 극성(+/−)을 <b>먼저 임의로 박고</b> 계산 결과의 부호로 실제를 읽는다 —
"화살표를 잘못 그려도 답은 음수로 알려준다"가 회로 해석의 태도다.</p>
<p class="intuit">💡 <b>직관</b> — 수로 비유: 전류=유량, 전압=수위차, 전력=수차가 뽑는 일률. 비유는 KCL(물은 안 새고)·KVL(한 바퀴 돌면 제자리)까지 정확히 이어진다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] q↔I 적분, P=VI=I²R=V²/R 3형제 환산. [개념] 전압이 "두 점 사이" 양임을 묻는 선지 — 한 점의 전압은 기준 선언 후에만 의미.</div>

<h4>2. 수동부호규약 — 부호의 헌법 <span class="en">(Passive Sign Convention)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — P=VI로 계산했더니 −20W가 나왔다. 이 소자는 전력을 먹는가, 내놓는가? 규약 없이는 답이 없다.</div>
<p><b>규약</b> — 전류 화살표가 전압의 <b>+ 단자로 들어가게</b> 잡았을 때:</p>
<p>\[ P=VI>0\ \Rightarrow\ \text{흡수(소비)},\qquad P<0\ \Rightarrow\ \text{공급} \]</p>
<p>저항은 항상 흡수(\(P=I^2R\ge0\)), 전원은 대개 공급이지만 충전당하는 배터리처럼 흡수일 수도 있다 —
부호가 그 역할을 판정한다. 회로 전체에선 \(\sum P=0\)(에너지 보존): 모든 문제의 공짜 검산기다.</p>
<p class="intuit">💡 <b>직관</b> — "+로 들어가며 떨어지면 소비". 규약은 진리가 아니라 약속이지만, 온 세계 교재가 같은 약속을 쓴다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[개념] 다중선택 단골 — 각 소자의 P 부호 판정, ΣP=0 검산. [함정] 화살표가 −단자로 들어가게 그려진 그림에서 부호 뒤집기.</div>

<h4>3. 전원 — 이상 전원과 종속 전원 <span class="en">(Independent &amp; Dependent Sources)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 트랜지스터 증폭기를 회로 이론으로 다루려면 "다른 곳의 전압·전류에 조종되는 전원"이 필요하다.</div>
<p><b>개념</b> — 이상 전압원은 전류와 무관하게 \(V\)를 유지(내부저항 0), 이상 전류원은 전압과 무관하게 \(I\)를 유지(내부저항 ∞).
종속 전원<span class="en">(dependent source)</span>은 제어 변수에 비례하는 전원 4종(VCVS·VCCS·CCVS·CCCS) —
증폭기·트랜지스터의 회로 모델이다. 해석 규칙: <b>종속 전원은 켠 채로 둔다</b>(중첩·테브난에서 끄는 것은 독립 전원만, U4).</p>
<div class="exambox"><span class="xt">시험 연결</span>[개념] 이상 전원의 정의(내부저항), 종속 전원 4종 구별. [계산] 종속 전원 낀 회로는 U3·U4에서 집중 — 여기선 정의를 정확히.</div>

<h4>4. 법칙 3종 — 옴·KCL·KVL <span class="en">(Ohm's Law &amp; Kirchhoff's Laws)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 소자 하나의 성질(옴)만으론 회로망을 못 푼다. 소자들이 <b>연결</b>됐다는 사실 자체가 주는 방정식이 필요하다.</div>
<p><b>법칙</b> — ① 옴 법칙 \(V=IR\): 저항 양단 전압은 전류에 비례(수동부호규약 방향으로).
② KCL<span class="en">(Kirchhoff's Current Law)</span>: 임의 절점에서 \(\sum I_{in}=\sum I_{out}\) — 전하 보존.
③ KVL<span class="en">(Kirchhoff's Voltage Law)</span>: 임의 폐루프에서 \(\sum V=0\) — 에너지 보존(한 바퀴 돌면 제 높이).</p>
<p>구조적 사실: 절점 \(n\)개·가지 \(b\)개 회로에서 독립 KCL은 \(n-1\)개, 독립 KVL은 \(b-n+1\)개 —
합치면 미지수 \(b\)개(가지 전류)와 정확히 맞는다. U3의 절점법·망로법은 이 세기를 체계적으로 뽑는 알고리즘일 뿐이다.</p>
<p class="intuit">💡 <b>직관</b> — KCL은 "물이 안 샌다", KVL은 "등산로 한 바퀴의 고도차 합=0". 옴은 소자의 사정, K법칙은 연결의 사정.</p>
<p>🔗 <b>연결</b> — U2의 직렬·병렬 공식은 전부 K법칙 2~3줄 유도의 캐시(암기용 결과)다. 유도 과정을 한 번은 손으로 — 수식 레이어.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 단일 루프·단일 절점 직접 적용. [서술] 독립 방정식 개수(n−1, b−n+1). [함정] KVL 순회 부호(전압 상승 +로 통일할 것).</div>""",

"u2": r"""
<div class="bigpic"><span class="bt">U2 큰그림</span>
U1의 법칙을 "매번 연립"으로 쓰면 느리다. 이 단원은 자주 나오는 연결 패턴 — 직렬·병렬·분배·사다리·브리지 — 을
공식으로 캐시해서 회로를 <b>눈으로 압축</b>하는 기술을 만든다. U3(연립이 정말 필요한 경우)와의 분업이 포인트:
등가로 줄일 수 있는 데까지 줄이고, 남는 것만 연립한다. U5에서 임피던스가 등장하면 이 공식들이 복소수 버전으로 전부 재사용된다.</div>

<h4>1. 직렬·병렬 등가 <span class="en">(Series &amp; Parallel Equivalents)</span><span class="tagm">계산 필수</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 저항 열 개짜리 회로도, 전원에서 보면 "하나의 저항"처럼 행동한다. 그 하나를 빨리 구하자.</div>
<p><b>공식</b> — 같은 전류가 꿰뚫으면 직렬: \(R_{eq}=R_1+R_2+\cdots\) (KVL에서).
같은 전압이 걸리면 병렬: \(\dfrac{1}{R_{eq}}=\dfrac{1}{R_1}+\dfrac{1}{R_2}+\cdots\) (KCL에서), 두 개면 \(R_{eq}=\dfrac{R_1R_2}{R_1+R_2}\).</p>
<p>감각 세 개: 병렬 등가는 가장 작은 저항보다 작다 · 같은 값 \(n\)개 병렬은 \(R/n\) ·
큰 저항과 작은 저항의 병렬은 작은 쪽 근처(큰 쪽은 "거의 없는 길"). 판정 기준은 <b>모양이 아니라 연결</b>(같은 두 절점 사이=병렬)이다.</p>
<p class="intuit">💡 <b>직관</b> — 직렬은 좁은 길이 이어진 것(저항 누적), 병렬은 차선이 늘어난 것(컨덕턴스 \(G=1/R\) 누적).</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] R_eq 사다리 압축(끝에서부터 접는다). [함정] 그림을 90° 돌려 그린 병렬, 도선으로 단락된 저항(=0Ω 취급).</div>

<h4>2. 분배 법칙 — 전압은 저항에, 전류는 컨덕턴스에 <span class="en">(Voltage &amp; Current Division)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 전체를 다 풀지 않고 "이 저항에 걸리는 전압만" 빨리 알고 싶다.</div>
<p><b>공식</b> — 직렬(같은 I)에서 전압분배와, 2병렬(같은 V)에서 전류분배:</p>
<p>\[ V_k=V\,\frac{R_k}{R_1+R_2+\cdots} \qquad\qquad I_1=I\,\frac{R_2}{R_1+R_2} \]</p>
<p>전류분배 분자에 <b>상대편 저항</b>이 오는 것(전류는 쉬운 길을 더 간다)이 최다 실수 지점.
n갈래 일반형은 \(I_k=I\,G_k/\sum G\) — "전류는 컨덕턴스 비례"로 기억하면 헷갈리지 않는다.</p>
<p><b>응용 — 분압기의 부하 효과</b><span class="en">(loading effect)</span>: 분압기 출력에 부하 \(R_L\)을 달면
아래 저항이 \(R_2\parallel R_L\)로 바뀌어 출력이 처진다. "측정기가 회로를 바꾼다"의 첫 사례 — U4 테브난이 이 문제의 정식 해법이다.</p>
<p class="intuit">💡 <b>직관</b> — 분배는 비례배분: 전압은 "누가 더 버티나(R)", 전류는 "누가 더 잘 통하나(G)".</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 2단 분배 연쇄(등가→분배→분배), 부하 낀 분압기. [함정] 전류분배 분자 바꿔치기, 분배 공식을 병렬 전압에 잘못 적용.</div>

<h4>3. 브리지와 균형 <span class="en">(Wheatstone Bridge)</span><span class="tagm">계산 필수</span></h4>
<p>브리지 균형 조건 \(R_1R_4=R_2R_3\)(맞은편 곱 동일)이면 가운데 가지에 전류가 없다 — 검류계 0을 이용한 정밀 저항 측정의 원리.
균형이면 가운데를 떼거나 붙여도 같아서 회로가 직·병렬로 붕괴한다. 불균형 브리지는 U3(절점법)이나 U4(테브난)의 몫 —
"균형 확인 먼저"가 풀이 순서다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 균형 판정 후 등가 계산. [개념] 균형의 물리(가운데 양단 등전위).</div>""",

"u3": r"""
<div class="bigpic"><span class="bt">U3 큰그림</span>
등가·분배(U2)로 안 줄어드는 회로의 최종 병기 — 미지수를 최소로 잡고 연립을 <b>기계적으로</b> 세우는 두 알고리즘이다.
절점전압법은 KCL을, 망로전류법은 KVL을 자동화한다. 기출 대형 계산 문제의 본체이며,
U5에서 임피던스로 바꿔 끼우면 AC 회로에서도 글자 하나 안 바뀌고 재사용된다. 여기서의 실력 = 부호 규율이다.</div>

<h4>1. 절점전압법 <span class="en">(Nodal Analysis)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 가지 전류를 전부 미지수로 잡으면 b개 연립이다. 더 적은 미지수로 같은 정보를 담을 수 없나?</div>
<p><b>알고리즘</b> — 미지수를 절점전압 \(V_1,V_2,\dots\)(기준 절점=0V 선언)으로 잡으면 가지 전류는 옴 법칙으로 자동 표현된다:
① 기준 절점(가지 많은 곳) 선택 ② 나머지 각 절점에 KCL — 나가는 전류를 \((V_i-V_j)/R\)로 적는다 ③ 연립 풀기.
\(n-1\)개 방정식으로 끝. 전형 2절점계는:</p>
<p>\[ \Big(\tfrac1{R_1}+\tfrac1{R_2}\Big)V_1-\tfrac1{R_2}V_2=I_{s1},\quad\cdots \]</p>
<p>— 대각(자기 컨덕턴스 합)·비대각(−공유 컨덕턴스)의 대칭 패턴이라 검산이 쉽다.</p>
<p><b>변칙 두 개</b> — 전압원이 두 비기준 절점 사이에 끼면 그 전류를 못 쓰므로 두 절점을 묶어
<b>초절점</b><span class="en">(supernode)</span>: 묶음 KCL 1개+전압 제약 \(V_a-V_b=V_s\) 1개.
종속 전원은 제어 변수를 절점전압으로 번역해 대입 — 방정식 수는 안 는다.</p>
<p class="intuit">💡 <b>직관</b> — 절점전압법은 "수위(전위)를 미지수로, 물길(전류)은 수위차/저항으로" — KCL이 수지 균형식이 된다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 2~3절점+종속 전원+초절점이 대형 문항의 표준 배합. [함정] 나가는 방향 통일 안 함, 전압원 가지에 옴 법칙 적용(금지 — 초절점으로).</div>

<h4>2. 망로전류법 <span class="en">(Mesh Analysis)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 절점은 적고 루프가 많은(사다리형) 회로는 절점법이 오히려 크다. 쌍대 도구가 필요하다.</div>
<p><b>알고리즘</b> — 평면회로의 각 창(mesh)에 순환 망로전류 \(I_1,I_2,\dots\)(관례: 전부 시계방향)를 잡고 KVL:
공유 가지 전류는 \(I_i-I_j\). \(b-n+1\)개 방정식. 전류원이 두 망로에 걸치면
<b>초망로</b><span class="en">(supermesh)</span>: 전류원 가지를 비켜 합친 KVL+전류 제약 \(I_i-I_j=I_s\).</p>
<p><b>선택 기준</b> — 미지수 개수(\(n-1\) vs \(b-n+1\)) 적은 쪽, 전압원 많으면 망로·전류원 많으면 절점이 대체로 유리.
둘 다 익혀 교차 검산하는 것이 시험장 안전벨트다. 전압원을 지나는 전류는 KVL이 아니라 <b>그 절점의 KCL</b>로 회수한다.</p>
<p class="intuit">💡 <b>직관</b> — 절점법:KCL:전위 = 망로법:KVL:순환류. 완전한 쌍대(dual) — 하나를 알면 거울에 비친 다른 하나다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 시계방향 통일 후 (자기 저항 합)I_i−(공유)I_j=Σ전압상승 패턴. [함정] 공유 가지 부호, 초망로에서 제약식 누락.</div>""",

"u4": r"""
<div class="bigpic"><span class="bt">U4 큰그림</span>
연립(U3)은 만능이지만, "전원이 여럿일 때 기여를 나눠 보고 싶다", "부하만 바꿔가며 여러 번 풀고 싶다"는 질문엔 비효율적이다.
이 단원의 정리들 — 중첩·전원 변환·테브난/노턴·최대 전력 전달 — 은 회로의 <b>선형성</b>이 주는 특권이다.
특히 테브난 등가는 "복잡한 회로 전체를 \(V_{th}\)와 \(R_{th}\) 둘로 요약"하는, 회로 이론에서 가장 실무적인 정리다(계측·모델링·U6 시정수까지).</div>

<h4>1. 선형성과 중첩 <span class="en">(Linearity &amp; Superposition)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 전원이 3개인 회로. 각 전원이 출력에 얼마나 기여하는지 따로 보고 싶다(설계 감각의 기본).</div>
<p><b>정리</b> — R·독립전원·종속전원으로 된 회로는 선형이라, 임의 응답은 전원별 기여의 합:</p>
<p>\[ y=\sum_k y^{(k)}\quad(\text{전원 k만 켜고 나머지는 끔}) \]</p>
<p>"끈다" = 전압원은 <b>단락</b>(0V), 전류원은 <b>개방</b>(0A). <b>종속 전원은 절대 끄지 않는다</b>(회로의 일부다).
전력은 \(I^2R\)이 비선형이라 중첩 불가 — 전류를 합한 뒤 제곱해야 한다(최다 출제 함정).</p>
<p class="intuit">💡 <b>직관</b> — 선형 세계에선 "원인을 쪼개 결과를 더한다"가 합법. 이 한 줄이 U7 주파수 해석(성분별 처리)의 근거이기도 하다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 2전원 중첩(각 회로가 U2 수준으로 붕괴하는 쾌감). [함정] 전력 중첩 금지, 종속 전원 끄기 금지 — 개념 선지 단골.</div>

<h4>2. 전원 변환 <span class="en">(Source Transformation)</span><span class="tagm">계산 필수</span></h4>
<p>직렬 \(V_s\)-\(R\) ↔ 병렬 \(I_s\)-\(R\)은 단자 밖에서 완전 동일(\(V_s=I_sR\)).
변환을 연쇄하면 회로가 한쪽으로 "말려 들어가며" 단순화된다 — 테브난의 육체노동 버전.
주의: 변환 순간 <b>내부</b> 변수(그 R의 전류 등)는 의미가 바뀌므로, 묻는 변수는 끝까지 단자 밖에 두어야 한다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 변환 2~3연쇄로 단일 루프 만들기. [함정] 묻는 소자를 변환에 삼켜버리기.</div>

<h4>3. 테브난·노턴 등가 <span class="en">(Thévenin &amp; Norton Equivalents)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 부하 \(R_L\)을 5가지 값으로 바꿔가며 전류를 구하라. 매번 전체 연립을 다시? 회로를 한 번만 풀고 요약해 두자.</div>
<p><b>정리</b> — 선형 2단자 회로는 단자 밖에서 전압원 \(V_{th}\)+직렬 \(R_{th}\)(테브난) 또는
전류원 \(I_N\)+병렬 \(R_N\)(노턴)과 완전히 등가다:</p>
<p>\[ V_{th}=V_{oc}\ (\text{개방 전압}),\qquad I_N=I_{sc}\ (\text{단락 전류}),\qquad
R_{th}=R_N=\frac{V_{oc}}{I_{sc}} \]</p>
<p>\(R_{th}\) 구하는 법 3종: ① 독립전원 끄고 단자에서 본 등가저항(종속 전원 없을 때) ② \(V_{oc}/I_{sc}\)
③ 시험전원 인가(종속 전원 있으면 ②·③만). 측정 기반 등가(두 부하점에서 V·I 재서 직선의 절편·기울기)도 같은 그림 —
"모든 선형 회로는 단자에서 보면 직선 \(V=V_{oc}-R_{th}I\)"이라는 문장이 이 단원의 요지다.</p>
<p class="intuit">💡 <b>직관</b> — 테브난은 회로의 "명함": 밖에서 물어볼 수 있는 것(개방 전압·내부 저항) 둘만 남기고 전부 접는다.</p>
<p>🔗 <b>연결</b> — U6에서 C가 보는 저항 = R_th → τ=R_thC. U2 부하 효과의 정식 해법. 최대 전력 전달의 무대.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] V_oc(절점법)→I_sc 또는 R_th→부하 질문. 종속 전원 낀 R_th(시험전원법)가 고배점. [함정] R_th 구할 때 종속 전원까지 끄는 오답.</div>

<h4>4. 최대 전력 전달 <span class="en">(Maximum Power Transfer)</span><span class="tagm">계산 필수</span></h4>
<p>테브난 등가에 부하를 달면 \(P_L=\Big(\dfrac{V_{th}}{R_{th}+R_L}\Big)^2R_L\) — 미분하면 \(R_L=R_{th}\)에서 최대:</p>
<p>\[ P_{max}=\frac{V_{th}^2}{4R_{th}} \]</p>
<p>이때 효율은 50%(절반은 \(R_{th}\)가 태운다) — "최대 전력"과 "최대 효율"은 다른 목표라는 개념 선지가 함께 나온다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 테브난 요약 후 P_max 한 줄. [개념] 매칭 조건과 효율 50%.</div>""",

"u5": r"""
<div class="bigpic"><span class="bt">U5 큰그림</span>
저항 세계(대수)에 시간(미분)이 들어온다. 전반부: C와 L의 \(v\)–\(i\) 관계·에너지·DC 정상상태 규칙.
후반부: 정현파 정상상태<span class="en">(sinusoidal steady state)</span>라면 미분방정식을 풀 필요가 없다는 대발견 —
페이저 변환이 \(d/dt\)를 \(j\omega\) 곱으로 바꿔, 임피던스 \(Z\)라는 "복소 저항"으로 U1~U4의 모든 기술을 재사용하게 한다.
이 단원이 서면 U6(과도)·U7(주파수응답)은 각각 "지수 하나"와 "H(jω) 읽기"로 줄어든다.</div>

<h4>1. 축전기와 인덕터 <span class="en">(Capacitor &amp; Inductor)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 저항은 현재만 산다(\(V=IR\)). 에너지를 <b>저장</b>했다가 내놓는 소자는 어떤 수식이 필요한가?</div>
<p><b>관계식</b> — 축전기는 전하를(전기장에), 인덕터는 전류를(자기장에) 저장한다:</p>
<p>\[ i_C=C\frac{dv}{dt},\qquad v_L=L\frac{di}{dt},\qquad
W_C=\tfrac12Cv^2,\qquad W_L=\tfrac12Li^2 \]</p>
<p>따라오는 연속성 규칙: \(v_C\)와 \(i_L\)은 <b>순간 점프 불가</b>(점프하면 무한 전류/전압) —
U6 스위칭에서 초기값을 잇는 다리다. DC 정상상태(모든 미분=0)에선:</p>
<p>\[ \text{C는 개방}^{\ (i_C=0)},\qquad \text{L은 단락}^{\ (v_L=0)} \]</p>
<p>— 이 두 줄로 DC 회로의 C·L을 지우고 저항 회로(U1~U4)로 되돌린다. 결합 규칙은 저항과 쌍대: C는 병렬이 합, L은 직렬이 합.</p>
<p class="intuit">💡 <b>직관</b> — C는 "전압의 관성"(수조: 수위 급변 불가), L은 "전류의 관성"(플라이휠: 유량 급변 불가).</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] DC 정상상태에서 C·L 지우고 풀기, 저장 에너지. [개념] 연속성(무엇이 점프 못 하나), C·L 결합 규칙의 쌍대성.</div>

<h4>2. 페이저 — 미분방정식의 우회로 <span class="en">(Phasor)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — \(v_s=V_m\cos(\omega t+\phi)\)가 걸린 RLC 회로의 정상상태. 미분방정식을 세우면 매번 삼각함수 지옥이다.
선형 회로에 정현파를 넣으면 <b>같은 ω의 정현파</b>만 나온다는 사실을 이용할 수 없나?</div>
<p><b>변환</b> — 진폭과 위상만 남긴 복소수로 신호를 표현한다:</p>
<p>\[ v(t)=V_m\cos(\omega t+\phi)\ \longleftrightarrow\ \mathbf{V}=V_m\angle\phi \]</p>
<p>핵심 성질: \(\dfrac{d}{dt}\ \longleftrightarrow\ j\omega\times\). 미분이 곱셈이 되는 순간 소자 관계식이 전부 "옴 법칙 꼴"이 된다:</p>
<p>\[ \mathbf{V}=Z\mathbf{I}:\qquad Z_R=R,\qquad Z_L=j\omega L,\qquad Z_C=\frac{1}{j\omega C} \]</p>
<p>임피던스<span class="en">(impedance)</span> \(Z\)는 복소 저항 — 크기는 진폭비, 각은 위상차.
L은 +90°(전류가 전압에 뒤짐<span class="en">(lag)</span>), C는 −90°(앞섬<span class="en">(lead)</span>) — "ELI the ICE man".
ω 극한 감각: DC(ω→0)에서 L단락·C개방, 고주파(ω→∞)에서 L개방·C단락 — DC 규칙과 정합.</p>"""
+JS("5.1", r"AC 문제 5단계 기계: ① 소스를 페이저로 ② 소자를 Z로 ③ <b>U1~U4의 아무 기술</b>(등가·분배·절점·테브난)을 복소수로 실행 ④ 결과 페이저 \(V_m\angle\phi\) ⑤ 시간역: \(V_m\cos(\omega t+\phi)\). 새 이론이 아니라 '숫자가 복소수가 된 옛 이론'임을 몸에 붙이는 것이 이 단원의 전부다.")
+r"""<p class="intuit">💡 <b>직관</b> — 페이저는 회전하는 벡터의 "스냅숏". 모두 같은 ω로 돌므로 상대 각도(위상차)만 기록하면 충분하다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] RL·RC 직렬의 Z, 전류 페이저, 위상차 판독(기출 페이저 문항의 표준형). [함정] 시간역변환 생략, ELI/ICE 방향 뒤집기, 극좌표↔직교좌표 변환 실수.</div>""",

"u6": r"""
<div class="bigpic"><span class="bt">U6 큰그림</span>
스위치가 딸깍하는 순간과 새 평형 사이 — 과도응답<span class="en">(transient response)</span>이다.
1차 회로(C 하나 또는 L 하나)의 답은 언제나 지수 곡선 하나이고, 시정수 \(\tau\)가 빠르기의 전부다.
이 단원의 상품은 공식 하나: \(x(t)=x_\infty+(x_0-x_\infty)e^{-t/\tau}\) — "3점 요약"(처음·끝·빠르기)만 하면
미분방정식 없이 답이 나온다. 기출 RC 스위칭 20점 문항이 정확히 이 절차를 묻는다.</div>

<h4>1. 시정수 — 빠르기의 단위 <span class="en">(Time Constant)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — RC 방전 \(v'=-v/RC\)의 해 \(v=V_0e^{-t/RC}\)에서, 회로마다 다른 "감쇠 속도"를 한 숫자로 요약하자.</div>
<p><b>개념</b> — 시정수:</p>
<p>\[ \tau_{RC}=RC,\qquad \tau_{RL}=\frac{L}{R} \]</p>
<p>1τ에 63.2% 진행, 5τ면 완료로 간주(0.7%). 여기서의 \(R\)은 <b>그 C(또는 L)가 바라보는 테브난 저항 \(R_{th}\)</b>(U4의 재사용!) —
전원 끄고 C 단자에서 본 등가저항이다. 반감기 \(t_{1/2}=\tau\ln2\), 실험에선 63.2% 지점이나 초기 기울기 접선이 τ를 준다.</p>
<p class="intuit">💡 <b>직관</b> — τ=저장 용량×새는 통로의 저항. 큰 물통(C↑)·좁은 배수구(R↑)일수록 천천히 빠진다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] R_th로 τ 구하기(테브난과 결합), 63.2%·반감기 판독. [함정] 스위칭 후 회로의 R_th를 스위칭 전 걸로 계산.</div>

<h4>2. 완전응답 — 3점 요약법 <span class="en">(Complete Response)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — t=0에 스위치가 움직였다. 미분방정식을 세우지 않고 v(t)를 쓰는 절차가 필요하다.</div>
<p><b>공식</b> — 1차 회로의 모든 응답은:</p>
<p>\[ x(t)=x_\infty+(x_0-x_\infty)e^{-t/\tau} \]</p>
<p>절차 4단계: ① \(x_0\): 스위칭 <b>직전</b> DC 정상상태(C개방·L단락)를 풀고 연속성(\(v_C\)·\(i_L\) 불변)으로 넘긴다
② \(x_\infty\): 스위칭 <b>후</b> 회로의 새 DC 정상상태 ③ \(\tau\): 스위칭 후 회로의 \(R_{th}\)로
④ 대입. 시작점에서 끝점으로 지수 활강 — 그래프까지 그려 검산한다(단조, 5τ 완료).
이중 스위칭은 구간별로 같은 절차를 반복하되, 앞 구간의 끝값이 뒤 구간의 \(x_0\)이 된다.</p>
<p class="intuit">💡 <b>직관</b> — "어디서 출발해(x₀), 어디로 가며(x∞), 얼마나 빨리 가나(τ)" — 1차 시스템의 이력서는 세 줄이면 끝난다.</p>
<p>🔗 <b>연결</b> — U5 연속성이 ①을, U4 테브난이 ③을 담당 — 앞 단원들이 부품으로 조립되는 단원이다. 같은 지수 구조가 자동제어(MECH387)의 1차 시스템·ML 경사하강 수렴에도 재방송된다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 기출 20점 표준형: 직전 정상상태→x₀→x∞→τ→v(t)→특정 시각 값. [함정] x₀를 스위칭 후 회로로 계산(연속성 위반), τ의 R 선택 오류.</div>""",

"u7": r"""
<div class="bigpic"><span class="bt">U7 큰그림</span>
같은 회로가 주파수에 따라 다르게 행동한다 — 회로를 "주파수별 통과/차단 장치(필터)"로 읽는 눈이 이 단원이다.
페이저(U5)에서 ω를 변수로 승격시킨 것이 전달함수 \(H(j\omega)\)이고, 그 크기를 로그 눈금에 그린 것이 보드 선도다.
기출 필터 설계 15점(차단주파수 맞추는 RC 선정)이 여기서 나오며, 2차 RLC의 ζ·ω₀는 자동제어(MECH387)와의 접속 단자다.</div>

<h4>1. 전달함수 <span class="en">(Transfer Function)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 입력 정현파의 주파수를 바꿔가며 출력을 재면, 회로의 "주파수 취향"이 드러난다. 그 취향을 함수 하나로.</div>
<p><b>개념</b> — 출력/입력 페이저 비:</p>
<p>\[ H(j\omega)=\frac{\mathbf{V}_{out}}{\mathbf{V}_{in}},\qquad
|H|=\text{이득},\quad \angle H=\text{위상차} \]</p>
<p>RC 저역통과<span class="en">(low-pass)</span>가 원형이다 — 전압분배(U2)를 임피던스로:</p>
<p>\[ H=\frac{1/j\omega C}{R+1/j\omega C}=\frac{1}{1+j\omega RC},\qquad
|H|=\frac{1}{\sqrt{1+(\omega/\omega_c)^2}},\quad \omega_c=\frac{1}{RC} \]</p>
<p>차단주파수<span class="en">(cutoff frequency)</span> \(\omega_c\)에서 \(|H|=1/\sqrt2\)(전력 절반, <b>−3dB</b>), 위상 −45°.
R과 C의 자리를 바꾸면 고역통과 \(H=\dfrac{j\omega/\omega_c}{1+j\omega/\omega_c}\). 극한 검산이 습관이다:
ω→0과 ω→∞에서 C를 개방/단락으로 갈아끼워 |H|이 1인지 0인지 — 회로만 보고 필터 종류를 판정한다.</p>
<p class="intuit">💡 <b>직관</b> — 저역통과는 "C가 고주파를 접지로 흘려버리는" 회로. 필터 판정은 공식보다 극한 두 개가 빠르다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[설계] 원하는 f_c=1/(2πRC)에 R 또는 C 선정(기출 15점형). [계산] 주어진 ω에서 |H|·∠H. [개념] 극한으로 LPF/HPF 판정.</div>

<h4>2. 데시벨과 보드 선도 <span class="en">(Decibels &amp; Bode Plot)</span><span class="tagm">계산 필수</span></h4>
<p>이득을 로그로: \(G_{dB}=20\log_{10}|H|\) — 곱이 합이 되어 필터 연쇄가 덧셈이 된다.
기준점 셋만 외운다: 1배=0dB, \(1/\sqrt2\)=−3dB, 10배=20dB.
1차 저역통과의 보드 개형: \(\omega_c\)까지 0dB 평탄 → 이후 <b>−20dB/decade</b> 직선 하강(꺾은선 근사, 실제 곡선은 모서리에서 −3dB).
위상은 0°→−45°(ω_c)→−90°. 이 개형 읽기가 MECH387 보드 선도의 출발점이다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] dB 환산, 10ω_c에서 −20dB 등 개형 수치. [개념] −20dB/dec의 의미(주파수 10배당 이득 1/10).</div>

<h4>3. 2차 회로 맛보기 — RLC와 공진 <span class="en">(Second-Order &amp; Resonance)</span><span class="tagc">개념 이해용</span></h4>
<p>C와 L이 함께 있으면 2차: 특성 주파수 \(\omega_0=1/\sqrt{LC}\), 감쇠비 ζ에 따라 과감쇠/임계/부족감쇠.
직렬 RLC는 \(\omega_0\)에서 \(Z_L+Z_C=0\) — 공진<span class="en">(resonance)</span>: 임피던스 최소·전류 최대,
선택도 \(Q=\omega_0L/R\)가 대역폭 \(\Delta\omega=\omega_0/Q\)를 정한다. 깊은 해석은 자동제어(MECH387 2차 시스템)로 —
여기선 ω₀·ζ·Q의 정의와 공진의 물리(L·C 에너지 교환)까지가 범위다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] ω₀=1/√(LC), Q와 대역폭. [개념] 공진 시 Z 순저항, 전류 최대.</div>""",
}

UNITS = [COURSE] + [{**_old[k], "concept": CONCEPTS[k]} for k in ["u1","u2","u3","u4","u5","u6","u7"]]
