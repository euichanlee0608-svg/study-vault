# -*- coding: utf-8 -*-
"""MECH387 자동제어 U1~U7 콘텐츠 — 전공서적급 개편(2026-09-03).
개념=새 판(바텀업·한영병기·LaTeX·중요도 칩·시험 연결), 유도·예제=content_base.py 보관분 조립."""

from content_base import UNITS as _BASE, JS, EX

_old = {u["id"]: u for u in _BASE}

COURSE = { "id":"course",
  "bigpicture": r"""
<p><b>이 과목의 단 하나의 물음</b> — 동적 시스템(모터·로봇팔·서스펜션)이 <b>내가 원하는 대로 움직이게</b> 만들려면?
그 전에: 원하는 대로 움직이는지 <b>예측</b>부터 할 수 있어야 한다. 자동제어 전반부(중간범위)는 그 예측 언어의 건설이다 —
시간영역의 미분방정식을 \(s\)-영역의 대수로 바꾸고(라플라스), 시스템을 분수 하나(전달함수)로 요약하고,
그 분모의 근(극점<span class="en">(pole)</span>)이 응답의 운명임을 확인한다.</p>
<p><b>서사는 4막이다.</b></p>
<p>① <b>도구 (U1→U2)</b>: 복소수·ODE·행렬 리프레셔(U1) 위에 라플라스 변환(U2) —
미분을 \(s\) 곱으로 바꿔 ODE를 분수 조작으로 만드는 열쇠. 부분분수 역변환이 손계산의 몸통이다.</p>
<p>② <b>모델 (U3→U5)</b>: 물리계(질량-스프링-댐퍼, RLC, DC 모터)를 전달함수 \(G(s)\)로(U3),
서브시스템의 연결을 블록선도 대수로(U4 — 폐루프 \(T=\frac{G}{1+GH}\)가 과목 전체의 로고),
그리고 현대 제어의 표준 서식인 상태공간 \(\dot{x}=Ax+Bu\)로(U5). 고유값=극점이 두 세계를 잇는다.</p>
<p>③ <b>응답 (U6)</b>: 1차계는 τ 하나, 2차계는 \((\zeta,\omega_n)\) 두 개가 응답 모양의 전부다.
오버슈트 \(M_p\)·정착시간 \(T_s\) 등 사양<span class="en">(specification)</span>이 극점 위치와 1:1로 번역된다.</p>
<p>④ <b>안정성 (U7)</b>: 응답 이전의 생사 판정 — 모든 극점이 좌반평면<span class="en">(LHP)</span>에 있는가.
근을 직접 풀지 않고 판정하는 Routh–Hurwitz 표가 중간고사의 대미이자, 이득 범위 설계의 첫 도구다.</p>
<div class="mapline">U1 수학 도구 → U2 라플라스(s-영역) → U3 전달함수·물리 모델링 → U4 블록선도(폐루프) → U5 상태공간 → U6 시간응답(τ·ζ·ωn) → U7 안정성(Routh)</div>
<p><b>시험 전략</b> — Lec0 확정: 중간 10/22, 과제·출석 포함 평가. 출제 축:
<b>[계산]</b> 부분분수 역변환, 블록선도 축약, 2차계 사양(\(M_p, T_s\)), Routh 표(+이득 범위 K),
<b>[모델링]</b> 기계/전기계 → G(s) (자유물체도→ODE→변환), <b>[개념]</b> 극점-응답 대응, 초기값·최종값 정리의 사용 조건.
모든 문항은 결국 "s-평면 위 극점이 어디 있나"로 수렴한다 — 각 단원에서 그 문장을 반복 확인하라.</p>""" }

CONCEPTS = {

"u1": r"""
<div class="bigpic"><span class="bt">U1 큰그림</span>
제어 이론은 수학 위에 서 있다 — 정확히는 복소수(페이저·극점), 선형 ODE(시스템 그 자체), 행렬(상태공간), 테일러 전개(선형화) 네 기둥.
이 단원은 그 기둥을 "제어가 쓰는 형태"로 재조립하는 리프레셔다. 특히 <b>특성방정식의 근이 해의 모양을 정한다</b>는
ODE의 오래된 사실이, U3부터 "극점이 응답을 정한다"로 개명되어 과목 전체를 지배한다.</div>

<h4>1. 복소수 — 극형식과 오일러 <span class="en">(Complex Numbers &amp; Euler's Formula)</span><span class="tagm">계산 필수</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 앞으로 만날 극점은 \(s=-\sigma\pm j\omega\) 꼴 복소수다. 이 수를 곱하고 나누고, 크기·각도로 읽는 일이 일상이 된다.</div>
<p><b>정비</b> — 직교형 \(z=a+jb\)와 극형식 \(z=re^{j\theta}\ (r=\sqrt{a^2+b^2},\ \theta=\tan^{-1}(b/a))\)의 왕복.
덧셈은 직교형, 곱셈·나눗셈은 극형식(크기는 곱·나누고 각은 더하고 빼고)이 빠르다. 다리가 오일러 공식:</p>
<p>\[ e^{j\theta}=\cos\theta+j\sin\theta \]</p>
<p>이 한 줄이 \(e^{(-\sigma+j\omega)t}=e^{-\sigma t}(\cos\omega t+j\sin\omega t)\) — 즉 "복소 극점=감쇠 진동"이라는
U6의 핵심 번역을 미리 담고 있다. 사분면 판정(atan2)과 켤레근의 짝 성질(실계수 다항의 복소근은 쌍)까지가 실전 장비다.</p>
<p class="intuit">💡 <b>직관</b> — 복소수는 "크기+방향"을 가진 수. 실부는 자람/줄어듦(σ), 허부는 돌기(ω) — s-평면 읽기의 알파벳.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 극↔직교 변환, 복소 나눗셈(크기·각 분리). [함정] 2사분면 각도(atan에 π 보정), 각도 단위(rad/deg).</div>

<h4>2. 선형 ODE와 특성방정식 <span class="en">(Linear ODEs &amp; Characteristic Equation)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — \(m\ddot{y}+c\dot{y}+ky=0\)의 해가 언제 스르르 멎고 언제 출렁이는가? 계수만 보고 판정하고 싶다.</div>
<p><b>정비</b> — 지수 시도해 \(y=e^{st}\)를 넣으면 ODE가 대수방정식이 된다:</p>
<p>\[ ms^2+cs+k=0\quad(\text{특성방정식}^{\text{(characteristic equation)}}) \]</p>
<p>근 \(s_{1,2}\)의 위치가 해의 전부: 서로 다른 실근(과감쇠, 지수 둘의 합) / 중근(임계) / 복소근 \(-\sigma\pm j\omega_d\)
(부족감쇠, \(e^{-\sigma t}\)로 감싸인 진동). <b>실부의 부호가 안정성(U7), 허부가 진동수, 실부 크기가 감쇠 속도(U6)</b> —
이 문장이 이 과목에서 가장 많이 재사용되는 문장이다. 1차 ODE \(\tau\dot{y}+y=Ku\)의 해가 지수 접근이라는 것도
여기서 복습해 둔다(전전개 U6의 그 공식과 동일 구조).</p>
<p class="intuit">💡 <b>직관</b> — ODE를 푸는 게 아니라 "근을 읽는" 과목이다. 해의 모양 사전: 실근=미끄럼, 복소근=나선, 우반평면=폭주.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 판별식으로 감쇠 유형 분류, 근→해 형태 매칭. [개념] "복소근인데 왜 해는 실수인가"(켤레 쌍의 합).</div>

<h4>3. 행렬 미니멀 — 2×2 고유값 <span class="en">(Matrices &amp; Eigenvalues)</span><span class="tagm">계산 필수</span></h4>
<p>상태공간(U5)에 필요한 만큼만: 행렬식·역행렬·연립 풀이, 그리고 고유값:</p>
<p>\[ \det(sI-A)=0 \]</p>
<p>2×2면 \(s^2-\mathrm{tr}(A)s+\det A=0\) — trace와 det로 즉시. 고유값이 곧 그 시스템의 극점이라는 사실(U5)을 예고편으로 기억하라.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] tr·det 지름길로 고유값, 2×2 역행렬. [함정] 부호(sI−A이지 A−sI가 아님 — 결과는 같지만 중간식 채점).</div>

<h4>4. 테일러 선형화 <span class="en">(Taylor Linearization)</span><span class="tagc">개념 이해용</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 진자의 \(\sin\theta\), 밸브의 \(\sqrt{h}\) — 세상은 비선형인데 우리 도구(전달함수)는 선형 전용이다.</div>
<p><b>처방</b> — 동작점<span class="en">(operating point)</span> 근방에서 1차 테일러:</p>
<p>\[ f(x)\approx f(x_0)+f'(x_0)(x-x_0) \]</p>
<p>편차 변수 \(\Delta x=x-x_0\)로 갈아타면 선형 모델이 된다. 유효 범위는 "동작점 근처" —
진자 \(\sin\theta\approx\theta\)는 15°에서 오차 ~1%. U5 평형점 선형화(야코비안)의 1변수 판이다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 주어진 f와 동작점에서 기울기·편차 모델. [개념] 선형화가 유효한 조건.</div>""",

"u2": r"""
<div class="bigpic"><span class="bt">U2 큰그림</span>
이 과목의 엔진룸이다. 라플라스 변환은 시간영역의 미분·적분·합성곱을 s-영역의 곱셈·나눗셈으로 바꾼다 —
ODE가 분수 조작이 되고, 그 분수가 U3의 전달함수가 된다. 손계산의 8할은 <b>부분분수 역변환</b>:
분모를 인수분해해 "극점별 조각"으로 나누면, 각 조각이 시간영역의 기본 파형(지수·진동) 하나씩과 대응된다.
"분모의 근=응답의 모드"라는 과목 슬로건이 여기서 처음 물리적 실체를 얻는다.</div>

<h4>1. 변환의 정의와 기본쌍 <span class="en">(Laplace Transform &amp; Basic Pairs)</span><span class="tagm">계산 필수</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 미분방정식을 풀 때마다 적분상수·동차해·특수해 의식을 치른다. 초기조건까지 한 방에 흡수하는 변환은 없나?</div>
<p><b>정의</b> — \(F(s)=\int_0^\infty f(t)e^{-st}dt\). 외울 쌍은 소수 정예다:</p>
<p>\[ 1\to\frac1s,\quad e^{-at}\to\frac{1}{s+a},\quad t\to\frac{1}{s^2},\quad
\sin\omega t\to\frac{\omega}{s^2+\omega^2},\quad \cos\omega t\to\frac{s}{s^2+\omega^2} \]</p>
<p>확장 규칙 둘이면 사전이 완성된다: \(s\)-이동(\(e^{-at}f(t)\to F(s+a)\) — 감쇠 진동쌍 제조기),
\(t\)-이동(\(f(t-T)u(t-T)\to e^{-Ts}F(s)\) — 시간 지연). 표는 "외우는 것"이 아니라 "이동 정리로 생성하는 것"이다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] e^{−at}cosωt류 변환(이동 정리 조합). [함정] sin/cos 분자 혼동(ω vs s).</div>

<h4>2. 미분 정리 — ODE가 대수가 되는 순간 <span class="en">(Differentiation Theorem)</span><span class="tagx">시험 핵심</span></h4>
<p>변환의 존재 이유:</p>
<p>\[ \mathcal{L}[\dot f]=sF(s)-f(0),\qquad \mathcal{L}[\ddot f]=s^2F(s)-sf(0)-\dot f(0) \]</p>
<p>미분 한 번=\(s\) 곱 한 번(+초기조건 항). ODE 전체를 변환하면 \(Y(s)=\)(입력 항+초기조건 항)/(특성다항)이 되어
<b>해가 곧 부분분수 문제</b>로 바뀐다. 초기조건이 자동으로 실려 들어오는 것이 고전 해법 대비 결정적 이점.
보조 정리: 적분은 \(F(s)/s\), 최종값 \(\lim_{t\to\infty}f=\lim_{s\to0}sF(s)\)(단, <b>sF의 극점이 전부 LHP일 때만</b> — 사용 조건이 개념 문제 단골),
초기값 \(f(0^+)=\lim_{s\to\infty}sF(s)\).</p>
<p class="intuit">💡 <b>직관</b> — s는 "미분 연산자의 화신". 전전개 페이저의 jω를 복소 전체로 확장한 것 — 과도+정상상태를 한 번에 본다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] ODE→Y(s)→역변환 전 과정, 최종값으로 정상상태 오차(사용 조건 확인 필수). [함정] 불안정계에 최종값 정리 적용(오답 제조기).</div>

<h4>3. 부분분수 역변환 — 손계산의 몸통 <span class="en">(Partial Fraction Expansion)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — \(Y(s)=\frac{10}{s(s+2)(s+5)}\)를 시간으로 되돌려야 한다. 표에는 이런 분수가 없다 — 표에 있는 조각으로 쪼개자.</div>
<p><b>세 가지 경우</b> — ① 단순 실근: \(\frac{A}{s+p}\)들의 합, 계수는 커버업<span class="en">(cover-up)</span>
\(A=\left.(s+p)Y(s)\right|_{s=-p}\) — 손으로 가리고 대입. ② 중근: \(\frac{A}{s+p}+\frac{B}{(s+p)^2}\), \(B\)는 커버업·\(A\)는 미분 또는 통분 비교 → \(te^{-pt}\) 항 출현.
③ 복소근: 통째로 \(\frac{Cs+D}{(s+\sigma)^2+\omega^2}\)로 두고 완전제곱 → \(e^{-\sigma t}(\cos,\sin)\) 조합.</p>
<p>각 조각의 역변환이 곧 <b>모드</b><span class="en">(mode)</span>: 실극 \(-p\)는 지수 \(e^{-pt}\), 복소쌍은 감쇠 진동.
"분모의 근을 보면 답의 모양이 먼저 보이고, 계수는 나중에 채운다" — 이 순서로 풀면 실수가 급감한다.</p>"""
+JS("2.1", r"역변환 루틴: ① 분모 인수분해(근=모드 예고) ② 꼴 세우기(단순/중근/복소) ③ 커버업으로 계수 ④ 표 대응 ⑤ <b>검산 2종</b> — t=0 값(초기값 정리와 비교)·t→∞ 값(최종값 정리와 비교). 검산 두 줄이 부분분수 실수의 90%를 잡는다.")
+r"""
<div class="exambox"><span class="xt">시험 연결</span>[계산] 3근 커버업, 중근, 복소근 완전제곱 — 세 유형 각 1문항급. [함정] 중근에서 A(1차 항) 누락, 복소근을 실수 2근처럼 쪼개기.</div>""",

"u3": r"""
<div class="bigpic"><span class="bt">U3 큰그림</span>
물리 세계(뉴턴·키르히호프)를 s-영역의 분수 하나로 요약하는 단원이다. 전달함수 \(G(s)=\frac{Y(s)}{U(s)}\)는
"이 시스템은 입력을 어떻게 출력으로 바꾸는 기계인가"의 명함이고, 그 분모의 근(극점)·분자의 근(영점)이
시스템의 지문이다. 모델링 파이프라인은 언제나 같다: <b>자유물체도/회로도 → ODE → (초기조건 0) 라플라스 → G(s)</b>.
기계계·전기계·DC 모터가 같은 꼴의 G(s)로 수렴하는 것 — "물리가 달라도 수학은 하나" — 이 제어공학의 관점이다.</div>

<h4>1. 전달함수 — 정의와 극·영점 <span class="en">(Transfer Function, Poles &amp; Zeros)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 시스템을 ODE 통째로 들고 다니기는 무겁다. 입력→출력 관계만 남긴 요약이 필요하다.</div>
<p><b>정의</b> — <b>모든 초기조건 0</b>에서:</p>
<p>\[ G(s)=\frac{Y(s)}{U(s)}=\frac{N(s)}{D(s)} \]</p>
<p>분모 \(D(s)=0\)의 근이 극점(pole) — 응답 모드(\(e^{pt}\))를 낳는 시스템 고유의 성질.
분자 \(N(s)=0\)의 근이 영점(zero) — 모드의 <i>배합비</i>를 바꾸고 특정 입력을 차단한다.
"초기조건 0" 단서는 정의의 일부다(아니면 입력·초기조건 항이 섞여 비가 성립 안 함 — 개념 선지 단골).
s-평면에 ×(극)·○(영)을 찍는 순간 응답 개형(U6)·안정성(U7)이 미리 보인다.</p>
<p class="intuit">💡 <b>직관</b> — G(s)는 "주파수·성장률별 증폭 지도". 극점은 지도가 무한대로 솟는 산봉우리, 영점은 0으로 꺼지는 우물.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] ODE→G(s), 극·영점 찍기. [개념] 초기조건 0 단서, 극점=분모 근(전달함수 약분 전후 주의).</div>

<h4>2. 기계계 모델링 <span class="en">(Mechanical Systems)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 질량-스프링-댐퍼에 힘 \(f(t)\)를 가할 때 변위 \(x(t)\)의 전달함수는?</div>
<p><b>절차</b> — 자유물체도 → 뉴턴 2법칙:</p>
<p>\[ m\ddot{x}+c\dot{x}+kx=f\quad\xrightarrow{\ \mathcal{L},\ \text{IC}=0\ }\quad
G(s)=\frac{X(s)}{F(s)}=\frac{1}{ms^2+cs+k} \]</p>
<p>회전계는 사전 교체만: \(J\ddot\theta+b\dot\theta+K\theta=\tau\). 다자유도면 질량별 FBD로 연립 → 행렬식으로 소거.
기어(반경비 \(N_1/N_2\))는 토크는 비례·속도는 반비례, 관성·마찰을 한쪽 축으로 반영<span class="en">(reflection)</span>할 땐
\((N_1/N_2)^2\) 배 — 제곱을 빼먹는 것이 최다 실수다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 1자유도→G(s) 즉답 수준으로, 2자유도 연립 세우기, 기어 반영 관성. [함정] 반영 제곱, 부호(복원력 방향).</div>

<h4>3. 전기계와 DC 모터 <span class="en">(Electrical Systems &amp; DC Motor)</span><span class="tagm">계산 필수</span></h4>
<p>RLC는 전전개 임피던스로 즉시: \(Z_R=R, Z_L=Ls, Z_C=1/Cs\)(jω→s 일반화) — 전압분배가 곧 G(s)다.
직렬 RLC 출력 C 전압: \(G=\frac{1/LC}{s^2+(R/L)s+1/LC}\) — 기계계와 <b>같은 2차 꼴</b>(m↔L, c↔R, k↔1/C의 유추).</p>
<p>DC 모터(전기+기계 결합의 대표): 전기자 \(L_a\dot{i}+R_ai=v-K_e\dot\theta\), 기계 \(J\ddot\theta+b\dot\theta=K_ti\).
결합하면 \(\frac{\Theta(s)}{V(s)}=\frac{K_t}{s[(L_as+R_a)(Js+b)+K_eK_t]}\) — 적분기 \(1/s\)(전압→<i>각도</i>) 포함이 요점.
\(L_a\approx0\) 근사로 1차계 \(\frac{\Omega(s)}{V(s)}=\frac{K}{\tau s+1}\)가 되는 것까지가 표준 시퀀스다.</p>
<p class="intuit">💡 <b>직관</b> — 역기전력 \(K_e\dot\theta\)는 전기가 기계를 "느끼는" 통로, 토크 \(K_ti\)는 그 반대 — 결합 항이 곧 에너지 변환이다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 모터 결합 대수(블록선도로도, U4에서 재등장), L_a=0 1차 근사. [개념] 왜 각도 출력엔 1/s가 붙나(속도의 적분).</div>""",

"u4": r"""
<div class="bigpic"><span class="bt">U4 큰그림</span>
시스템은 부품(블록)의 연결이다. 이 단원은 연결의 대수 — 직렬은 곱, 병렬은 합, 그리고 이 과목의 로고인
피드백 공식 \(T=\frac{G}{1+GH}\) — 를 익혀 아무리 얽힌 선도도 분수 하나로 접는 기술이다.
합산점·분기점 이동은 "등가를 유지하며 지형을 정리"하는 국소 수술. 외란 경로 분석에서 피드백의 존재 이유
(외란 억제·민감도 저하)가 처음 정량적으로 드러난다 — 제어라는 과목명이 비로소 등장하는 순간이다.</div>

<h4>1. 세 가지 기본 연결 <span class="en">(Series, Parallel &amp; Feedback)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 제어기 G_c → 플랜트 G_p → 센서 H가 고리로 물려 있다. 전체 입출력 관계는?</div>
<p><b>공식</b> — 직렬 \(G_1G_2\)(곱), 병렬 \(G_1\pm G_2\)(합), 그리고 음(−) 피드백:</p>
<p>\[ T(s)=\frac{Y(s)}{R(s)}=\frac{G(s)}{1+G(s)H(s)} \]</p>
<p>유도는 3줄(수식 레이어): \(Y=GE,\ E=R-HY\)를 소거. 구조 암기법 — 분자는 "입력에서 출력까지의 앞길(전방 경로)",
분모는 "1+루프 한 바퀴(루프 이득 \(GH\))". 양(+) 피드백이면 \(1-GH\).
단위 피드백(H=1)이면 \(T=\frac{G}{1+G}\). <b>분모 \(1+GH=0\)이 곧 폐루프 특성방정식</b> — U7 안정성 판정의 대상이 정확히 이 식이다.</p>
<p class="intuit">💡 <b>직관</b> — 피드백은 "출력을 훔쳐봐 입력을 수정"하는 구조. 분모의 1+GH가 커질수록 시스템은 둔감·강인해진다(아래 외란).</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] T=G/(1+GH) 즉답+2중 루프. [함정] +피드백 부호, H 위치(피드백 경로의 블록) 누락. [개념] 분모=특성방정식.</div>

<h4>2. 합산점·분기점 이동 <span class="en">(Moving Summing Points &amp; Pickoff Points)</span><span class="tagm">계산 필수</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 루프가 엇갈려 있어 기본형 셋이 바로 안 보인다. 신호 등가를 지키며 지형을 정리해야 한다.</div>
<p><b>규칙</b> — 원리는 하나: <b>이동 전후 모든 신호가 동일</b>해야 한다. 블록 \(G\)를 "지나" 이동하면 보정 블록이 붙는다:
분기점을 블록 뒤로 → 가지에 \(1/G\), 앞으로 → 가지에 \(G\); 합산점을 블록 앞으로 → 들어오는 가지에 \(1/G\), 뒤로 → \(G\).
전략: 안쪽 루프부터 접는다 → 접을 때마다 그림을 다시 그린다 → 마지막에 기본형 3종만 남긴다.</p>
<p class="intuit">💡 <b>직관</b> — "신호가 겪는 총 변환은 불변"이라는 회계 원칙. 보정 블록은 장부 맞추기용 전표다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 2~3중 얽힌 루프 축약(중간 그림 채점 — 반드시 단계별로 그릴 것). [함정] 이동 방향과 보정(G인지 1/G인지) 뒤집기.</div>

<h4>3. 외란과 피드백의 존재 이유 <span class="en">(Disturbance Rejection)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 바람(외란 D)이 플랜트 입구에 끼어든다. 피드백은 이 침입자를 얼마나 눌러주는가?</div>
<p><b>분석</b> — 선형이라 중첩(전전개 U4와 같은 논리): 각 입력을 따로 켜고 더한다:</p>
<p>\[ Y=\frac{G_cG_p}{1+G_cG_pH}R+\frac{G_p}{1+G_cG_pH}D \]</p>
<p>외란 전달률의 분모에도 \(1+\)루프이득 — <b>루프이득을 키우면 외란이 그만큼 눌린다</b>.
개루프였다면 D가 \(G_p\) 통째로 통과했을 것. 파라미터 변동에 대한 민감도 \(S=\frac{1}{1+GH}\)도 같은 구조 —
"피드백의 값어치는 전부 분모 1+GH에 있다"가 이 단원의 결론 문장이다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] R·D 각각의 전달함수(중첩, 합산점 부호 주의). [서술] 피드백 유익 논증(외란·민감도) — 개루프와 대비하는 짧은 논술형.</div>""",

"u5": r"""
<div class="bigpic"><span class="bt">U5 큰그림</span>
전달함수는 입출력만 남긴 "블랙박스" 요약이다. 상태공간<span class="en">(state space)</span>은 반대로 상자 안 —
에너지를 담은 변수들(위치·속도·C 전압·L 전류)의 시간 전개 — 를 1차 연립으로 펼친 "화이트박스" 서식이다.
다변수·비선형·컴퓨터 해석에 강하고, 현대 제어(상태 피드백·관측기)의 모국어다. 중간범위에선 서식 자체와
<b>고유값=극점</b>이라는 두 세계의 환율, 그리고 평형점 선형화까지 — 소개 수준으로 간다.</div>

<h4>1. 상태변수와 표준형 <span class="en">(State Variables &amp; Standard Form)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 2차 ODE 하나는 다룰 만하다. 그런데 모터+링크+센서가 얽힌 6차라면? 고차 ODE 대신 1차 연립의 표준 서식으로 통일하자.</div>
<p><b>서식</b> — 상태 \(x\)(시스템의 "현재를 완전히 요약"하는 최소 변수 집합 — 보통 에너지 저장 변수), 입력 \(u\), 출력 \(y\):</p>
<p>\[ \dot{x}=Ax+Bu,\qquad y=Cx+Du \]</p>
<p>기계계 변환 레시피: \(x_1=y,\ x_2=\dot y\)로 두면 \(m\ddot y+c\dot y+ky=f\)가</p>
<p>\[ \dot{x}=\begin{bmatrix}0&1\\-k/m&-c/m\end{bmatrix}x+\begin{bmatrix}0\\1/m\end{bmatrix}f \]</p>
<p>— 첫 행은 정의(\(\dot x_1=x_2\)), 둘째 행이 물리. n차 ODE=상태 n개. RLC면 \(x=(v_C, i_L)\)이 자연 선택
(점프 못 하는 연속량 — 전전개 U5·U6과 이어진다).</p>
<p class="intuit">💡 <b>직관</b> — 상태 = "지금 이 순간을 저장한 세이브 파일". 미래는 세이브 파일+입력만으로 재생 가능(마르코프성의 결정론 판).</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] ODE→(A,B,C,D), RLC·2자유도 상태식 세우기. [개념] 상태변수의 자격(에너지 저장·연속성), 상태 수=차수.</div>

<h4>2. 두 세계의 환율 — TF↔SS와 고유값 <span class="en">(TF ↔ State Space, Eigenvalues = Poles)</span><span class="tagx">시험 핵심</span></h4>
<p>상태공간→전달함수는 공식 하나:</p>
<p>\[ G(s)=C(sI-A)^{-1}B+D \]</p>
<p>분모에 \(\det(sI-A)\)가 나타나므로:</p>
<p>\[ \text{A의 고유값}\ =\ \text{G(s)의 극점} \]</p>
<p>— U1의 고유값 계산이 그대로 안정성·응답 판정으로 승격된다(약분되는 경우가 예외라는 각주까지).
역방향(TF→SS)은 표준형 중 하나(제어 가능 표준형: 분모 계수를 마지막 행에 −부호로 나열)로 세우면 된다 —
같은 G(s)에 무한히 많은 (A,B,C,D)가 대응(좌표 선택의 자유)이라는 개념도 선지로 나온다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 2×2에서 C(sI−A)⁻¹B 손계산, 고유값=극점 확인. [개념] 실현의 비유일성, D≠0의 의미(직결 통로).</div>

<h4>3. 평형점 선형화 <span class="en">(Linearization about Equilibrium)</span><span class="tagm">계산 필수</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 진자 \(\ddot\theta=-\frac{g}{l}\sin\theta\)는 비선형이라 전달함수가 없다. 그러나 "매달린 점 근처"의 작은 흔들림이라면?</div>
<p><b>절차</b> — ① 평형점: \(\dot x=f(x)=0\)의 해 ② 야코비안 \(A=\partial f/\partial x|_{x^*}\) (1변수면 U1 테일러)
③ 편차 변수로 \(\Delta\dot x=A\Delta x\). 진자의 두 평형이 교과서적 대조: 아래(\(\theta^*=0\)) →
\(\ddot{\Delta\theta}=-\frac{g}{l}\Delta\theta\) 진동(고유값 순허수), 위(\(\theta^*=\pi\)) → \(+\frac{g}{l}\Delta\theta\)
발산(양의 실근=불안정) — <b>선형화 고유값의 실부가 국소 안정성을 판정</b>한다(U7의 예고).</p>
<p class="intuit">💡 <b>직관</b> — 비선형 지형의 한 점에 접평면을 깔면, 그 근방에선 우리의 전 선형 무기고가 작동한다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 평형점 2개 찾고 각각 선형화·안정성 판정(진자·물탱크가 2대 단골). [함정] 평형점 아닌 점에서 선형화(상수항 잔류).</div>""",

"u6": r"""
<div class="bigpic"><span class="bt">U6 큰그림</span>
모델(G(s))이 실제로 "어떻게 움직이는가"를 계단 입력으로 심문하는 단원이다. 1차계는 τ 하나,
2차계는 \((\zeta, \omega_n)\) 둘이 응답의 전부이고, 설계 사양(오버슈트 \(M_p\)·정착 \(T_s\)·첨두 \(T_p\))이
이 파라미터 — 곧 <b>극점 위치</b> — 와 1:1 공식으로 묶인다. "사양 ↔ s-평면 영역"의 왕복 번역이 시험의 몸통이며,
고차계는 지배극점 근사로 2차계 문법에 끌어들인다.</div>

<h4>1. 1차계 — τ의 세계 <span class="en">(First-Order Systems)</span><span class="tagm">계산 필수</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — \(G=\frac{K}{\tau s+1}\)에 계단을 넣으면 무엇이 얼마나 빨리 오는가?</div>
<p><b>응답</b> — \(y(t)=K(1-e^{-t/\tau})\): 극점 \(s=-1/\tau\) 하나가 전부다.
1τ에 63.2%, 정착시간(2%) \(T_s\approx4\tau\), 상승시간(10→90%) \(T_r\approx2.2\tau\).
초기 기울기 \(K/\tau\)의 접선이 τ에서 최종값과 만난다(그래프 판독 문제의 열쇠).
전전개 U6의 RC 곡선과 동일 수학 — 극점이 왼쪽 깊을수록(τ↓) 빠르다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 그래프에서 τ·K 역산, T_s=4τ. [개념] 극점 −1/τ와 속도의 대응.</div>

<h4>2. 2차계 — ζ와 ωn의 문법 <span class="en">(Second-Order Systems)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 서스펜션이 "출렁이며" 가라앉는다. 출렁임의 크기와 잦아드는 속도를 두 숫자로 설계하고 싶다.</div>
<p><b>표준형</b> —</p>
<p>\[ G(s)=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2},\qquad
s_{1,2}=-\zeta\omega_n\pm j\omega_n\sqrt{1-\zeta^2} \]</p>
<p>감쇠비 \(\zeta\)가 유형을 가른다: \(\zeta>1\) 과감쇠(실근 둘, 느릿한 합류) / \(=1\) 임계 / \(0<\zeta<1\)
부족감쇠(복소쌍, 감쇠 진동) / \(=0\) 지속 진동. 부족감쇠 계단응답의 사양 공식 4종이 이 단원의 화폐다:</p>
<p>\[ M_p=e^{-\pi\zeta/\sqrt{1-\zeta^2}},\qquad T_p=\frac{\pi}{\omega_d},\qquad
T_s\approx\frac{4}{\zeta\omega_n},\qquad \omega_d=\omega_n\sqrt{1-\zeta^2} \]</p>
<p>기하 번역이 백미다: 극점의 <b>실부 \(-\zeta\omega_n\)이 감쇠 속도(T_s)</b>, <b>허부 \(\omega_d\)가 진동수(T_p)</b>,
<b>원점 각 \(\cos\theta=\zeta\)가 오버슈트</b>. 사양("M_p≤10%, T_s≤2s")은 s-평면의 부채꼴 허용 영역으로 그려진다 —
설계란 극점을 그 영역에 넣는 일이라는 과목 후반부의 예고.</p>"""
+JS("6.1", r"사양 문제 양방향 루틴 — 순방향: G(s) 표준형 대조 → ω_n, ζ 추출 → 공식 4종 대입. 역방향: M_p→ζ(로그 역산), T_s→ζω_n, 필요하면 ω_n 분리 → 극점 위치/허용 K. 두 방향 모두 '표준형 계수 대조'가 1단계다 — 분모 상수항=ω_n², s 계수=2ζω_n.")
+r"""
<div class="exambox"><span class="xt">시험 연결</span>[계산] G→사양 4종, 사양→ζ·ω_n 역산(고배점). [함정] ω_d와 ω_n 혼동(T_p는 ω_d로!), M_p 백분율/소수.</div>

<h4>3. 추가 극·영점과 지배극점 <span class="en">(Additional Poles, Zeros &amp; Dominant Poles)</span><span class="tagc">개념 이해용</span></h4>
<p>실제 시스템은 3차 이상이지만: 다른 극점보다 5배 이상 왼쪽의 극점은 빨리 죽어 무시 가능 —
남은 복소쌍이 <b>지배극점</b><span class="en">(dominant poles)</span>이고 2차 공식이 근사 적용된다.
영점의 효과: LHP 영점은 응답을 빠르게+오버슈트 증가, <b>RHP 영점은 초기 역방향 반응</b>(자전거 핸들 — 비최소위상)이라는
정성 규칙까지. "언제 2차 근사가 유효한가"의 조건 판단이 개념 문제로 나온다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[개념] 지배극점 조건(5배 규칙), RHP 영점의 언더슈트. [계산] 3차계에서 지배쌍 골라 사양 근사.</div>""",

"u7": r"""
<div class="bigpic"><span class="bt">U7 큰그림</span>
응답 모양(U6) 이전에 생사부터 — 유계 입력에 유계 출력(BIBO)인가. 판정 기준은 단 한 줄:
<b>모든 극점의 실부가 음수(전부 LHP)</b>. 문제는 고차 다항의 근을 손으로 못 푼다는 것 —
Routh–Hurwitz 표가 "근을 풀지 않고 우반평면 근의 <i>개수</i>를 세는" 알고리즘으로 그 벽을 넘는다.
백미는 설계 접속: 특성방정식에 이득 K를 남겨두면 표의 부호 조건이 <b>안정 K 범위</b>를 토해낸다 —
해석(판정)이 설계(범위)로 바뀌는, 중간고사의 마지막 고개다.</div>

<h4>1. 안정성의 정의와 극점 기준 <span class="en">(BIBO Stability &amp; Pole Locations)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — "안정하다"를 수학으로 못 박아야 판정 알고리즘을 만들 수 있다.</div>
<p><b>정의와 기준</b> — BIBO<span class="en">(bounded-input bounded-output)</span> 안정 = 유계 입력이면 출력도 유계.
응답이 모드 \(e^{p_it}\)의 합이므로:</p>
<p>\[ \text{안정}\iff \mathrm{Re}(p_i)<0\ \ \forall i\ (\text{모든 극점이 LHP}) \]</p>
<p>허수축 위 단순 극(적분기 \(1/s\), 순진동)은 한계 안정<span class="en">(marginally stable)</span> —
유계지만 사라지지 않음, 허수축 중근이면 불안정(\(t\sin\omega t\) 발산). 판정 대상은 언제나
<b>폐루프</b> 특성방정식 \(1+GH=0\)이다(U4의 분모 — 개루프 G가 안정해도 폐루프는 다를 수 있다).</p>
<div class="exambox"><span class="xt">시험 연결</span>[개념] 안정/한계/불안정 3분류, 극점 위치 매칭. [함정] 개루프·폐루프 혼동, 허수축 중근.</div>

<h4>2. Routh–Hurwitz 판별 <span class="en">(Routh–Hurwitz Criterion)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — \(s^4+2s^3+3s^2+4s+5=0\)의 근이 전부 LHP인가? 4차 방정식을 풀지 않고 답하라.</div>
<p><b>절차</b> — 예비 검사(필요조건): 계수가 전부 존재하고 같은 부호 — 하나라도 어기면 즉시 불안정.
통과하면 Routh 표: 첫 두 행에 계수를 교대로 배치, 아래 행은 2×2 행렬식 조합</p>
<p>\[ b_1=\frac{a_1a_2-a_0a_3}{a_1}\ \text{꼴} \]</p>
<p>로 채운다. 판정: <b>1열의 부호 변화 횟수 = RHP 극점의 개수</b>(0이면 안정).
특수 경우 둘 — ① 1열에 0: ε로 치환해 극한 ② 전행 0: 바로 윗행으로 보조 다항 \(P(s)\)를 만들어 미분한 계수로 대체
(대칭 근 존재 신호, 허수축 근 후보 — 한계 안정 판정과 연결).</p>
<p class="intuit">💡 <b>직관</b> — 표는 "근을 좌우로 분류하는 부호 검사기". 놀라운 것은 나눗셈 몇 번으로 4차·5차의 생사가 갈린다는 사실이다.</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] 4~5차 표 완성+부호 변화 세기, 특수 경우 2종 각 1회씩은 손에 익힐 것. [함정] 행 정규화(양수 곱은 허용)로 계산 단순화 잊기, 부호 변화 개수≠불안정 여부만이 아니라 RHP 근 '개수'.</div>

<h4>3. 설계 접속 — 안정 이득 범위 <span class="en">(Stability Range of Gain K)</span><span class="tagx">시험 핵심</span></h4>
<div class="whyq"><b>❓ 문제 상황</b> — 제어기 이득 K를 얼마까지 올려도 되는가? 성능은 K가 클수록 좋아 보이는데, 한계가 있을 것이다.</div>
<p><b>절차</b> — 폐루프 특성방정식 \(1+KG(s)H(s)=0\)을 다항으로 정리(K가 계수에 들어감) → Routh 표를 K를 문자로 둔 채 작성 →
<b>1열 전부 양수</b> 조건을 K 부등식으로 풀면 안정 범위 \(0<K<K_{crit}\)가 나온다.
경계 \(K=K_{crit}\)에선 전행 0 → 보조 다항 \(P(s)=0\)의 허수근 \(\pm j\omega\)가 <b>지속 진동의 주파수</b> —
"임계 이득과 그때의 진동수"까지 한 세트로 묻는 것이 정형 문항이다(지글러-니콜스 튜닝의 이론적 뿌리).</p>
<p class="intuit">💡 <b>직관</b> — K를 올리면 극점들이 s-평면에서 이동하다 허수축을 넘는 순간이 온다. Routh는 그 순간을 대수로 잡아낸다(근궤적의 예고편).</p>
<div class="exambox"><span class="xt">시험 연결</span>[계산] K 범위+임계 진동수(중간 최다 배점 후보). [함정] K 부등식 방향(음수로 나눌 때), 1열 조건을 일부 행만 검사.</div>""",
}

UNITS = [COURSE] + [{**_old[k], "concept": CONCEPTS[k]} for k in ["u1","u2","u3","u4","u5","u6","u7"]]
