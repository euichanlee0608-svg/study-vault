"""rlocus_core.js 독립 대조값 — numpy 만 쓰고, JS 와 **다른 경로**로 계산한다.
  · 이탈점: D'N−DN' 근이 아니라 실수축 위 K(σ)=−D/N 을 촘촘히 훑어 극값을 찾는다
  · 허수축 교차: 다항식 연립이 아니라 K 를 올리며 폐루프 극점 최대 실부의 부호가 바뀌는 곳을 이분법으로
  · 출발각: 각도 공식이 아니라 아주 작은 K 에서 극점이 실제로 움직인 방향
  · 계단응답: RK4 가 아니라 동반행렬 고유분해의 해석해
입력: stdin JSON [{name, N, D, K, t:[...]}], 출력: stdout JSON."""
import json, sys
import numpy as np


def K_of(N, D, x):
    return -np.polyval(D, x) / np.polyval(N, x)


def breakpoints(N, D):
    """dK/dσ = 0 인 실수점(K>0)을 수치 미분으로 — 부호 변화(단순)와 |dK| 극소≈0(중근)을 둘 다 잡는다.
    극점·영점 바로 옆(K 가 발산하는 곳)은 제외한다."""
    ps = np.roots(D); zs = np.roots(N) if len(N) > 1 else np.array([])
    sing = [r.real for r in np.concatenate([ps, zs]) if abs(r.imag) < 1e-9]
    lo, hi = (min(sing) - 20, max(sing) + 5) if sing else (-20, 5)
    xs = np.linspace(lo, hi, 800001); h = xs[1] - xs[0]
    with np.errstate(divide="ignore", invalid="ignore"):
        k = K_of(N, D, xs)
        dk = np.gradient(k, h)
    far = np.ones_like(xs, bool)
    for z in sing:
        far &= np.abs(xs - z) > 1e-2
    good = far & np.isfinite(k) & np.isfinite(dk) & (k > 0)
    out = []
    for i in range(1, len(xs) - 1):
        if not (good[i - 1] and good[i] and good[i + 1]):
            continue
        sc = 1 + abs(k[i])
        if np.sign(dk[i]) != np.sign(dk[i + 1]) and dk[i] != 0:
            x = xs[i] - dk[i] * h / (dk[i + 1] - dk[i])
        elif abs(dk[i]) <= abs(dk[i - 1]) and abs(dk[i]) <= abs(dk[i + 1]) and abs(dk[i]) < 1e-5 * sc:
            x = xs[i]
        else:
            continue
        out.append({"s": float(x), "K": float(K_of(N, D, x))})
    out.sort(key=lambda d: -d["s"])
    merged = []
    for d in out:
        if not merged or abs(merged[-1]["s"] - d["s"]) > 1e-3:
            merged.append(d)
    return merged


def maxre(N, D, K):
    return max(np.roots(np.polyadd(D, K * np.asarray(N, float))).real)


def jwcross(N, D):
    Ks = np.logspace(-4, 6, 4000)
    m = [maxre(N, D, K) for K in Ks]
    out = []
    for i in range(1, len(Ks)):
        if (m[i - 1] < 0) != (m[i] < 0):
            a, b = Ks[i - 1], Ks[i]
            for _ in range(200):
                c = 0.5 * (a + b)
                if (maxre(N, D, a) < 0) == (maxre(N, D, c) < 0):
                    a = c
                else:
                    b = c
            K = 0.5 * (a + b)
            r = np.roots(np.polyadd(D, K * np.asarray(N, float)))
            w = max(abs(x.imag) for x in r if abs(x.real) < 1e-5 * (1 + abs(x)))
            out.append({"K": float(K), "w": float(w)})
    return out


def departure(N, D):
    ps = np.roots(D)
    out = []
    for p in ps:
        if p.imag <= 1e-9:
            continue
        K = 1e-7
        r = np.roots(np.polyadd(D, K * np.asarray(N, float)))
        q = r[np.argmin(abs(r - p))]
        out.append(float(np.degrees(np.angle(q - p))))
    return out


def step(N, D, K, ts):
    den = np.polyadd(D, K * np.asarray(N, float)).astype(float)
    num = (K * np.asarray(N, float)).astype(float)
    a0 = den[0]
    den, num = den / a0, num / a0
    n = len(den) - 1
    b = np.concatenate([np.zeros(n + 1 - len(num)), num])
    d0 = b[0]
    c = b[1:] - d0 * den[1:]
    A = np.zeros((n, n))
    A[:-1, 1:] = np.eye(n - 1)
    A[-1, :] = -den[1:][::-1]
    B = np.zeros(n); B[-1] = 1
    Cv = c[::-1]
    lam, V = np.linalg.eig(A)
    Vi = np.linalg.inv(V)
    ys = []
    for t in ts:
        # x(t) = ∫0^t e^{Aτ} B dτ = V diag((e^{λt}-1)/λ) V^-1 B
        f = np.array([(np.exp(l * t) - 1) / l if abs(l) > 1e-12 else t for l in lam])
        x = (V @ np.diag(f) @ Vi @ B).real
        ys.append(float(Cv @ x + d0))
    return ys


def asym(N, D):
    ps, zs = np.roots(D), (np.roots(N) if len(N) > 1 else np.array([]))
    q = len(ps) - len(zs)
    return {"center": float((ps.sum() - zs.sum()).real / q), "count": q}


cases = json.load(sys.stdin)
res = {}
for c in cases:
    N, D = c["N"], c["D"]
    r = {"asym": asym(N, D) if len(D) > len(N) else None,
         "break": breakpoints(N, D), "jw": jwcross(N, D), "dep": departure(N, D)}
    if "K" in c:
        r["step"] = step(N, D, c["K"], c["t"])
    res[c["name"]] = r
json.dump(res, sys.stdout)
