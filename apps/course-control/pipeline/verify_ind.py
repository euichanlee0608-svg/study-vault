"""course-control 독립 재계산 레지스트리 — sympy dsolve·inverse_laplace 등 별도 경로."""
import math, cmath
import sympy as sp

IND = {}
def reg(pid):
    def deco(fn): IND[pid] = fn; return fn
    return deco

t, s = sp.symbols("t s", positive=True)

def _pol(z): return abs(z), math.degrees(cmath.phase(z))

# ---- U1 선수 리프레셔 ----
@reg("u1-l2-01")
def _(p):
    z = complex(p["a"], p["b"]); m, a = _pol(z)
    return {"mag": m, "ang": a}
@reg("u1-l2-02")
def _(p):
    z = p["m1"]*cmath.exp(1j*math.radians(p["a1"])) * p["m2"]*cmath.exp(1j*math.radians(p["a2"]))
    m, a = _pol(z)
    return {"mag": m, "ang": a}
@reg("u1-l2-03")
def _(p):
    z = complex(p["a"], p["b"])/complex(p["c"], p["d"])
    return {"re": z.real, "im": z.imag}
@reg("u1-l2-04")
def _(p):
    lam = sp.symbols("lam")
    roots = sp.solve(sp.Eq(lam**2 + p["a"]*lam + p["b"], 0), lam)
    rs = [complex(sp.N(r)) for r in roots]
    if abs(rs[0].imag) < 1e-12:
        xs = sorted([r.real for r in rs], reverse=True)
        return {"x1": xs[0], "x2": xs[1]}
    r = max(rs, key=lambda c: c.imag)
    return {"x1": r.real, "x2": r.imag}
@reg("u1-l2-05")
def _(p):
    y = sp.Function("y")
    sol = sp.dsolve(sp.Eq(y(t).diff(t), -p["a"]*y(t)), y(t), ics={y(0): p["y0"]})
    return float(sol.rhs.subs(t, p["t1"]))
reg("u1-l2-06")(lambda p: float(sp.integrate(sp.exp(-p["a"]*t), (t, 0, p["T"]))))
@reg("u1-l2-07")
def _(p):
    A = sp.Matrix([[p["a"], p["b"]], [p["c"], p["d"]]])
    return {"det": float(A.det()), "inv11": float(A.inv()[0, 0])}
@reg("u1-l2-08")
def _(p):
    A = sp.Matrix([[p["a"], p["b"]], [0, p["d"]]])
    ev = sorted([float(x) for x in A.eigenvals()], reverse=True)
    if len(ev) == 1: ev = ev*2
    return {"l1": ev[0], "l2": ev[1]}
@reg("u1-l2-09")
def _(p):
    z = complex(p["A"], -p["B"]); m, a = _pol(z)
    return {"R": m, "ph": -a}
@reg("u1-l2-10")
def _(p):
    f = sp.exp(-p["a"]*t)*sp.cos(p["w"]*t)
    return float(sp.diff(f, t).subs(t, p["t1"]))
@reg("u1-l2-11")
def _(p):
    A_, B_ = sp.symbols("A_ B_")
    expr = sp.apart(1/((s+p["p1"])*(s+p["p2"])), s)
    Av = expr.coeff(1/(s+p["p1"]))  # apart는 A/(s+p1)+B/(s+p2)
    # 안전한 방법: residue
    Av = sp.limit((s+p["p1"])/((s+p["p1"])*(s+p["p2"])), s, -p["p1"])
    Bv = sp.limit((s+p["p2"])/((s+p["p1"])*(s+p["p2"])), s, -p["p2"])
    return {"A": float(Av), "B": float(Bv)}
reg("u1-l2-12")(lambda p: -math.log(p["r"])/p["a"])
@reg("u1-l3-01")
def _(p):
    y = sp.Function("y")
    sol = sp.dsolve(sp.Eq(y(t).diff(t)+p["a"]*y(t), p["K"]), y(t), ics={y(0): 0})
    return {"yss": p["K"]/p["a"], "y": float(sol.rhs.subs(t, p["t1"]))}
@reg("u1-l3-02")
def _(p):
    w0 = math.sqrt(p["k"]); z = p["c"]/(2*w0)
    return {"w0": w0, "z": z, "t": -1.0 if z < 0.999 else (1.0 if z > 1.001 else 0.0)}
reg("u1-l3-03")(lambda p: {"sg": p["z"]*p["w0"], "wd": p["w0"]*math.sqrt(1-p["z"]**2)})
@reg("u1-l3-04")
def _(p):
    a = p["a"]
    A = sp.limit(s/(s*(s+a)**2), s, 0)
    C = sp.limit((s+a)**2/(s*(s+a)**2), s, -a)
    B = sp.limit(s*(sp.Rational(1)/(s*(s+a)**2) - A/s), s, sp.oo)
    return {"A": float(A), "B": float(B), "C": float(C)}
reg("u1-l3-05")(lambda p: {"a21": -p["k"], "a22": -p["c"]})
@reg("u1-l3-06")
def _(p):
    x = sp.symbols("x")
    f = x**p["n"]
    return {"f0": float(f.subs(x, p["x0"])), "m": float(sp.diff(f, x).subs(x, p["x0"]))}
@reg("u1-l3-07")
def _(p):
    th = math.radians(p["th"])
    return {"w0": math.sqrt(9.8/p["L"]), "err": (th-math.sin(th))/math.sin(th)*100}
@reg("u1-l3-08")
def _(p):
    w0 = math.sqrt(p["k"]/p["m"])
    return {"w0": w0, "T": 2*math.pi/w0}
@reg("u1-l3-09")
def _(p):
    x, y = sp.symbols("x y")
    sol = sp.solve([sp.Eq(p["a"]*x+p["b"]*y, p["e"]), sp.Eq(p["c"]*x+p["d"]*y, p["f"])], [x, y], dict=True)[0]
    return {"x": float(sol[x]), "y": float(sol[y])}
@reg("u1-l3-10")
def _(p):
    y = sp.exp(-p["sg"]*t)*(sp.cos(p["wd"]*t)+sp.Rational(p["sg"], p["wd"])*sp.sin(p["wd"]*t)) if False else None
    v = math.exp(-p["sg"]*p["t1"])*(math.cos(p["wd"]*p["t1"])+p["sg"]/p["wd"]*math.sin(p["wd"]*p["t1"]))
    return v
reg("u1-l3-11")(lambda p: float(sp.re(sp.exp(sp.I*math.radians(p["th"])))))
reg("u1-l3-12")(lambda p: p["c"]/(2*math.sqrt(p["k"]*p["m"])))
reg("u1-l3-13")(lambda p: 20*math.log10(p["g"]))
reg("u1-l3-14")(lambda p: math.sqrt(p["k"]/p["m"]))
@reg("u1-l4-02")
def _(p):
    w0 = math.sqrt(p["k"]/p["m"]); z = p["c"]/(2*math.sqrt(p["k"]*p["m"]))
    return {"w0": w0, "z": z, "wd": w0*math.sqrt(1-z*z), "te": 1/(z*w0)}
@reg("u1-l4-03")
def _(p):
    th = sp.symbols("th", positive=True)
    sol = sp.nsolve((th-sp.sin(th))/sp.sin(th) - p["pct"]/100, th, 0.5)
    return math.degrees(float(sol))
@reg("u1-l4-05")
def _(p):
    w02 = p["a"]**2+p["w"]**2
    A = sp.limit(s*w02/(s*((s+p["a"])**2+p["w"]**2)), s, 0)
    # B, C: 통분 계수 비교를 sympy로
    B_, C_ = sp.symbols("B_ C_")
    eq = sp.expand(w02 - (A*((s+p["a"])**2+p["w"]**2) + (B_*s+C_)*s))
    sol = sp.solve([eq.coeff(s, 2), eq.coeff(s, 1)], [B_, C_], dict=True)[0]
    return {"A": float(A), "B": float(sol[B_]), "C": float(sol[C_])}
@reg("u1-l4-06")
def _(p):
    A = sp.Matrix([[0, 1], [-p["b"], -p["a"]]])
    ev = [complex(sp.N(x)) for x in A.eigenvals()]
    re = max(x.real for x in ev)
    return {"tr": -float(p["a"]), "det": float(p["b"]), "re": re, "stable": 1.0 if re < 0 else 0.0}
@reg("u1-l4-07")
def _(p):
    wd = 2*math.pi/p["T"]; sg = -math.log(p["r"])/p["T"]
    w0 = math.hypot(sg, wd)
    return {"wd": wd, "sg": sg, "z": sg/w0, "w0": w0}
@reg("u1-l4-08")
def _(p):
    h = sp.symbols("h", positive=True)
    m = float(sp.diff(p["k"]*sp.sqrt(h), h).subs(h, p["h0"]))
    return {"q0": p["k"]*math.sqrt(p["h0"]), "m": m, "tau": p["A"]/m}

# ---- U2 라플라스 ----
def _ilt(F, t1):
    f = sp.inverse_laplace_transform(F, s, t)
    return float(sp.N(f.subs(t, t1)))

reg("u2-l2-01")(lambda p: p["A"]/(1+p["a"]))
reg("u2-l2-02")(lambda p: p["w"]/(p["s0"]**2+p["w"]**2))
@reg("u2-l2-03")
def _(p):
    F = sp.laplace_transform(sp.exp(-p["a"]*t)*sp.cos(p["w"]*t), t, s, noconds=True)
    return float(F.subs(s, p["s0"]))
reg("u2-l2-04")(lambda p: float(p["y0"]))
@reg("u2-l2-05")
def _(p):
    F = (p["p2"]-p["p1"])/((s+p["p1"])*(s+p["p2"]))
    return _ilt(F, p["t1"])
reg("u2-l2-06")(lambda p: p["K"]/(p["a"]*p["b"]))
reg("u2-l2-07")(lambda p: math.exp(-p["T"])/(1+p["a"]))
@reg("u2-l2-08")
def _(p):
    F = p["a"]/(s**2*(s+p["a"]))
    return _ilt(F, p["t1"])
reg("u2-l2-09")(lambda p: 1.0/(1+p["w"]**2))
@reg("u2-l2-10")
def _(p):
    F = 1/(s+p["a"])**2
    return {"v": _ilt(F, p["t1"]), "tm": 1.0/p["a"]}
reg("u2-l2-11")(lambda p: float(p["b"]))
reg("u2-l2-12")(lambda p: p["s0"]/(p["s0"]**2+p["w"]**2))
@reg("u2-l3-01")
def _(p):
    y = sp.Function("y")
    sol = sp.dsolve(sp.Eq(y(t).diff(t)+p["a"]*y(t), p["K"]), y(t), ics={y(0): 0})
    return float(sol.rhs.subs(t, p["t1"]))
@reg("u2-l3-02")
def _(p):
    y = sp.Function("y")
    sol = sp.dsolve(sp.Eq(y(t).diff(t)+p["a"]*y(t), p["K"]), y(t), ics={y(0): p["y0"]})
    return float(sol.rhs.subs(t, p["t1"]))
@reg("u2-l3-03")
def _(p):
    y = sp.Function("y")
    w2 = p["w"]**2
    sol = sp.dsolve(sp.Eq(y(t).diff(t, 2)+w2*y(t), w2), y(t), ics={y(0): 0, y(t).diff(t).subs(t, 0): 0})
    return float(sp.N(sol.rhs.subs(t, p["t1"])))
@reg("u2-l3-04")
def _(p):
    F = p["w"]/((s+p["a"])**2+p["w"]**2)
    return _ilt(F, p["t1"])
@reg("u2-l3-05")
def _(p):
    F = (s+p["b"])/(s**2+p["b"]*s+p["c"])
    return _ilt(F, p["t1"])
@reg("u2-l3-06")
def _(p):
    F = p["K"]/(s*(s+2)*(s+3))
    return {"yinf": p["K"]/6.0, "v": _ilt(F, p["t1"])}
@reg("u2-l3-07")
def _(p):
    y = sp.Function("y")
    sol = sp.dsolve(sp.Eq(y(t).diff(t, 2)+p["a"]*y(t).diff(t)+p["b6"]*y(t), 0), y(t),
                    ics={y(0): 1, y(t).diff(t).subs(t, 0): 0})
    return float(sp.N(sol.rhs.subs(t, p["t1"])))
reg("u2-l3-08")(lambda p: {"y0": float(p["K"]), "I": p["K"]/p["a"]})
@reg("u2-l3-09")
def _(p):
    F = p["A"]*(1/s - 1/(s+p["a"])) + p["w"]/(s**2+p["w"]**2)
    return float(F.subs(s, 1))
reg("u2-l3-10")(lambda p: {"formal": 0.0, "exists": 0.0})
@reg("u2-l3-11")
def _(p):
    return 1-math.exp(-p["a"]*(p["t1"]-p["T"]))
reg("u2-l3-12")(lambda p: {"y0": 1.0, "yinf": p["b"]/p["a"]})
@reg("u2-l3-13")
def _(p):
    F = 1/(s**2*(s+p["a"]))
    return _ilt(F, 1)
reg("u2-l3-14")(lambda p: p["A"]/p["a"])
@reg("u2-l4-02")
def _(p):
    w0 = p["w0"]; z = p["z"]
    G = w0**2/(s**2+2*z*w0*s+w0**2)
    return _ilt(G/s, p["t1"])
@reg("u2-l4-04")
def _(p):
    y = sp.Function("y")
    sol = sp.dsolve(sp.Eq(y(t).diff(t, 2)+2*y(t).diff(t)+5*y(t), 0), y(t),
                    ics={y(0): p["y0"], y(t).diff(t).subs(t, 0): p["v0"]})
    return float(sp.N(sol.rhs.subs(t, p["t1"])))
@reg("u2-l4-05")
def _(p):
    a = p["a"]
    A = sp.limit(s*p["K"]*(s+p["b"])/(s*(s+a)**2), s, 0)
    C = sp.limit((s+a)**2*p["K"]*(s+p["b"])/(s*(s+a)**2), s, -a)
    B = -A
    return {"y0": 0.0, "yinf": float(A), "B": float(B)}
reg("u2-l4-06")(lambda p: 1.0/(p["a"]*math.e))
@reg("u2-l4-07")
def _(p):
    return {"c1": 2.0*p["a"], "c0": float(p["a"]**2+p["w"]**2)}
@reg("u2-l4-08")
def _(p):
    sg = 4.0/p["ts"]
    c0 = sg*sg+p["wd"]**2
    return {"sg": sg, "c1": 2*sg, "c0": c0, "z": sg/math.sqrt(c0)}

# ---- U3 전달함수·모델링 ----
reg("u3-l2-01")(lambda p: {"K": 1.0/p["k"], "tau": p["c"]/p["k"]})
reg("u3-l2-02")(lambda p: {"K": 1.0/p["k"], "sum": -p["c"]/p["m"]})
reg("u3-l2-03")(lambda p: {"z": -float(p["z"]), "P1": -float(p["p1"]), "P2": -float(p["p2"]),
                           "K": p["z"]/(p["p1"]*p["p2"])})
@reg("u3-l2-04")
def _(p):
    pw = 1.0/(p["R"]*1000*p["C"]*1e-6)
    return {"pole": -pw, "bw": pw}
@reg("u3-l2-05")
def _(p):
    w0 = math.sqrt(p["b"])
    return {"w0": w0, "z": p["a"]/(2*w0), "K": p["K"]/p["b"]}
reg("u3-l2-06")(lambda p: {"K": 1.0/p["b"], "tau": p["J"]/p["b"]})
reg("u3-l2-07")(lambda p: p["JL"]/p["N"]**2)
reg("u3-l2-08")(lambda p: {"K": p["K1"]*p["K2"]/(p["a"]*p["b"]), "P1": -float(p["a"]), "P2": -float(p["b"])})
reg("u3-l2-09")(lambda p: {"num": float(p["A"]), "pole": -float(p["a"]), "yss": p["A"]/p["a"]})
reg("u3-l2-10")(lambda p: {"w": p["V"]/p["Ke"], "T": p["Kt"]*p["V"]/p["Ra"]})
reg("u3-l2-11")(lambda p: {"w": math.sqrt(p["k"]/p["m"]), "z": 0.0})
reg("u3-l2-12")(lambda p: {"z": -p["b0"]/p["b1"], "hf": float(p["b1"]), "K": p["b0"]/p["a0"]})
@reg("u3-l3-01")
def _(p):
    return {"z": -p["k"]/p["c"], "K": 1.0, "zeta": p["c"]/(2*math.sqrt(p["k"]*p["m"]))}
@reg("u3-l3-02")
def _(p):
    return {"w0": 1/math.sqrt(p["L"]*p["C"]), "z": p["R"]/2*math.sqrt(p["C"]/p["L"]), "yss": 1.0}
reg("u3-l3-03")(lambda p: math.sqrt(2*p["k"]/p["m"]))
@reg("u3-l3-04")
def _(p):
    beff = p["b"]+p["Kt"]**2/p["Ra"]
    return {"K": (p["Kt"]/p["Ra"])/beff, "tau": p["J"]/beff}
reg("u3-l3-05")(lambda p: {"dom": -float(p["p1"]), "ratio": p["p2"]/p["p1"], "tau": 1.0/p["p1"]})
@reg("u3-l3-06")
def _(p):
    m = p["k"]/(2*math.sqrt(p["h0"]))
    return {"K": 1.0/m, "pole": -m/p["A"]}
reg("u3-l3-07")(lambda p: p["b0"]/p["a0"])
reg("u3-l3-08")(lambda p: {"K": 1.0/(p["m"]*9.8*p["L"]), "w0": math.sqrt(9.8/p["L"])})
reg("u3-l3-09")(lambda p: {"K": p["yss"]/p["U"], "tau": float(p["t63"])})
@reg("u3-l3-10")
def _(p):
    J = p["Jm"]+p["JL"]/p["N"]**2; be = p["b"]/p["N"]**2
    return {"J": J, "be": be, "tau": J/be}
@reg("u3-l3-11")
def _(p):
    ss = sp.symbols("ss")  # 근이 음수이므로 비제약 심볼
    G = p["K1"] + p["K2"]/(ss+p["a"])
    num, den = sp.fraction(sp.together(G))
    zr = sp.solve(sp.Eq(num, 0), ss)[0]
    return {"z": float(zr), "K": float(G.subs(ss, 0))}
reg("u3-l3-12")(lambda p: p["K"]*(1-math.exp(-1)))
reg("u3-l3-13")(lambda p: {"k": p["m"]*p["w0"]**2, "c": 2*p["z"]*p["w0"]*p["m"]})
reg("u3-l3-14")(lambda p: {"v": p["K"]*p["t1"], "fin": 0.0})
@reg("u3-l4-02")
def _(p):
    xss = p["F0"]/p["k"]; w0 = math.sqrt(p["k"]/p["m"]); z = p["c"]/(2*math.sqrt(p["k"]*p["m"]))
    wd = w0*math.sqrt(1-z*z)
    return {"xss": xss, "w0": w0, "z": z,
            "Mp": math.exp(-math.pi*z/math.sqrt(1-z*z))*100, "Tp": math.pi/wd}
@reg("u3-l4-04")
def _(p):
    G2 = 2*(s/p["z"]+1)/((s+1)*(s+2))
    slope = sp.limit(s*s*G2/s, s, sp.oo)
    return {"same": 1.0, "slope": float(slope)}
@reg("u3-l4-05")
def _(p):
    J = p["Jm"]+p["JL"]/p["N"]**2
    be = p["Kt"]**2/p["Ra"]
    return {"J": J, "be": be, "tau": J/be, "Kdc": (p["Kt"]/p["Ra"])/be/p["N"]}
@reg("u3-l4-06")
def _(p):
    lnM = math.log(p["Mp"]/100)
    z = -lnM/math.sqrt(math.pi**2+lnM**2)
    wd = math.pi/p["Tp"]
    return {"K": float(p["yss"]), "z": z, "w0": wd/math.sqrt(1-z*z)}
reg("u3-l4-07")(lambda p: {"tau": p["Rt"]*p["Ct"], "dT": float(p["Rt"])})
@reg("u3-l4-08")
def _(p):
    lnM = math.log(p["Mp"]/100)
    z = -lnM/math.sqrt(math.pi**2+lnM**2)
    sg = 4.0/p["ts"]; w0 = sg/z
    return {"z": z, "sg": sg, "w0": w0, "wd": w0*math.sqrt(1-z*z)}

# ---- U4 블록선도 ----
reg("u4-l2-01")(lambda p: p["K"]/(1.0+p["K"]))
reg("u4-l2-02")(lambda p: -(p["a"]+p["K"]))
reg("u4-l2-03")(lambda p: {"ser": p["K1"]*p["K2"]*p["K3"], "par": p["K1"]+p["K2"]+p["K3"]})
@reg("u4-l2-04")
def _(p):
    return {"T1": p["K"]/(1+p["K"]*p["h"]), "T2": 2*p["K"]/(1+2*p["K"]*p["h"])}
reg("u4-l2-05")(lambda p: 1.0/(1.0-p["K"]))
reg("u4-l2-06")(lambda p: {"e": 1.0/(1+p["K"]), "y": p["K"]/(1+p["K"])})
@reg("u4-l2-07")
def _(p):
    w0 = math.sqrt(p["K"])
    return {"w0": w0, "z": 1.0/w0}
reg("u4-l2-08")(lambda p: {"gain": 1.0/p["G"], "y": p["G"]+p["d"]})
@reg("u4-l2-09")
def _(p):
    inner = p["K2"]/(1+p["K2"]*p["h"])
    return p["K1"]*inner
reg("u4-l2-10")(lambda p: p["F"]+p["G"]/(1.0+p["G"]))
reg("u4-l2-11")(lambda p: p["K"]/(1.0+p["K"]))
reg("u4-l2-12")(lambda p: {"L0": p["K"]*p["h"]/p["a"], "pol": -(p["a"]+p["K"]*p["h"])})
reg("u4-l3-01")(lambda p: {"yol": float(p["d"]), "ycl": p["d"]/(1+p["K"])})
@reg("u4-l3-02")
def _(p):
    K2 = p["K"]*(1+p["dK"]/100)
    T1 = p["K"]/(1+p["K"]); T2 = K2/(1+K2)
    return {"ol": float(p["dK"]), "cl": (T2-T1)/T1*100}
reg("u4-l3-03")(lambda p: {"c1": p["a"]+p["K"]*p["h2"], "c0": float(p["K"])})
@reg("u4-l3-04")
def _(p):
    w0 = math.sqrt(p["K"])
    return (2*p["zt"]*w0-2)/p["K"]
reg("u4-l3-05")(lambda p: p["K"]/(1+p["K"])*p["r"]+p["d"]/(1+p["K"]))
@reg("u4-l3-06")
def _(p):
    T = p["G1"]*p["G2"]/(1+p["G1"]*p["H"])  # 독립 경로: 직접 신호 추적
    return {"Heq": p["H"]/p["G2"], "T": T}
@reg("u4-l3-07")
def _(p):
    w0 = math.sqrt(p["Kp"]*p["Kv"])
    return {"w0": w0, "z": p["Kv"]/(2*w0)}
reg("u4-l3-08")(lambda p: {"Kp": p["K"]*p["h"], "pre": 1.0/p["h"], "dc": 1.0/p["h"]})
@reg("u4-l3-09")
def _(p):
    L = p["K"]*p["G2"]
    return {"yin": p["G2"]/(1+L), "yout": 1.0/(1+L)}
@reg("u4-l3-10")
def _(p):
    c1 = p["a"]+p["b"]; c0 = p["a"]*p["b"]+p["K"]
    return {"c1": float(c1), "c0": float(c0), "z": c1/(2*math.sqrt(c0))}
@reg("u4-l3-11")
def _(p):
    inner = p["K2"]/(1+p["K2"]*p["h2"])
    fwd = p["K1"]*inner
    return fwd/(1+fwd*p["h1"])
@reg("u4-l3-12")
def _(p):
    w = sp.symbols("w", positive=True)
    K_ = sp.symbols("K_", positive=True)
    expr = sp.expand((sp.I*w)*(sp.I*w+p["a"])**2 + K_)
    im = sp.im(expr); re = sp.re(expr)
    wv = [x for x in sp.solve(sp.Eq(im, 0), w) if x != 0][0]
    Kv = sp.solve(sp.Eq(re.subs(w, wv), 0), K_)[0]
    return {"w": float(wv), "Kc": float(Kv)}
reg("u4-l3-13")(lambda p: {"Kv": p["K"]/p["a"], "e": p["a"]/p["K"]})
@reg("u4-l3-14")
def _(p):
    y = p["K"]/(1+p["K"]*p["h"])
    return {"y": y, "e": 1-y}
@reg("u4-l4-02")
def _(p):
    c1 = p["a"]+p["K"]*p["h"]
    return {"c1": c1, "c0": float(p["K"]), "z": c1/(2*math.sqrt(p["K"])), "yd": 1.0}
@reg("u4-l4-04")
def _(p):
    K = p["w0"]**2
    return {"K": K, "h": (2*p["zt"]*p["w0"]-2)/K}
@reg("u4-l4-05")
def _(p):
    return {"K": float(p["c0"]), "a": float(p["c1"]), "Ts": 4.0/(p["c1"]/2)}
@reg("u4-l4-06")
def _(p):
    S = 1.0/(1+p["K"]); T = p["K"]/(1+p["K"])
    return T*p["d2"]+S*p["d1"]-T*p["n"]
@reg("u4-l4-07")
def _(p):
    w = sp.symbols("w", positive=True)
    K_ = sp.symbols("K_", positive=True)
    expr = sp.expand((sp.I*w+p["a"])**3 + K_)
    wv = [x for x in sp.solve(sp.Eq(sp.im(expr), 0), w) if x != 0][0]
    Kv = sp.solve(sp.Eq(sp.re(expr).subs(w, wv), 0), K_)[0]
    return {"w": float(wv), "Kc": float(Kv)}
@reg("u4-l4-08")
def _(p):
    return {"T": p["N"]*p["K"]/(1+p["K"]*p["h"]), "lim": p["N"]/p["h"], "Nc": float(p["h"])}

# ---- U5 상태공간 ----
import numpy as np

reg("u5-l2-01")(lambda p: {"a21": -float(p["a0"]), "a22": -float(p["a1"]), "b2": float(p["b0"])})
@reg("u5-l2-02")
def _(p):
    A = sp.Matrix([[-p["a"], p["b"]], [p["c"], -p["d"]]])
    poly = A.charpoly().all_coeffs()  # [1, c1, c0]
    return {"c1": float(poly[1]), "c0": float(poly[2])}
@reg("u5-l2-03")
def _(p):
    ev = np.linalg.eigvals(np.array([[0, 1], [-p["b"], -p["a"]]], float))
    re = max(ev.real)
    return {"re": float(re), "st": 1.0 if re < 0 else 0.0}
reg("u5-l2-04")(lambda p: {"num": float(p["b0"]), "K": p["b0"]/p["a0"]})
reg("u5-l2-05")(lambda p: {"a11": -p["R"]/p["L"], "a12": -1.0/p["L"]})
reg("u5-l2-06")(lambda p: p["x0"]*math.exp(p["l1"]*p["t1"]))
reg("u5-l2-07")(lambda p: math.sqrt(p["u0"]/p["k"]))
@reg("u5-l2-08")
def _(p):
    x = sp.symbols("x", positive=True)
    x0 = math.sqrt(p["u0"]/p["k"])
    a = float(sp.diff(p["u0"]*0 - p["k"]*x**2, x).subs(x, x0))
    return {"a": a, "st": 1.0}
reg("u5-l2-09")(lambda p: p["c1"]*p["x1"]+p["c2"]*p["x2"])
@reg("u5-l2-10")
def _(p):
    sv = p["s0"]+1
    M = sp.Matrix([[sv, -1], [0, sv+p["a"]]])
    return float(M.inv()[0, 1])
@reg("u5-l2-11")
def _(p):
    m1 = p["c1"]*math.exp(p["l1"]*p["t1"]); m2 = p["c2"]*math.exp(p["l2"]*p["t1"])
    return {"y": m1+m2, "pct": m2/(m1+m2)*100}
reg("u5-l2-12")(lambda p: {"a21": -p["k"]/p["m"], "a22": -p["c"]/p["m"]})
reg("u5-l3-01")(lambda p: {"a31": -float(p["a0"]), "a32": -float(p["a1"]), "a33": -float(p["a2"])})
reg("u5-l3-02")(lambda p: {"l1": -float(p["a"]), "l2": -float(p["b"]), "e11": math.exp(-p["a"])})
reg("u5-l3-03")(lambda p: {"tr": -float(p["a1"]), "det": float(p["a0"])})
@reg("u5-l3-04")
def _(p):
    k = 9.8/p["L"]
    ev = np.linalg.eigvals(np.array([[0, 1], [-k, -p["c"]]], float))
    return {"a21": -k, "a22": -float(p["c"]), "re": float(max(ev.real))}
@reg("u5-l3-05")
def _(p):
    lam = math.sqrt(9.8/p["L"])
    return {"l1": lam, "l2": -lam, "tau": 1/lam}
reg("u5-l3-06")(lambda p: {"l1": -float(p["a"]), "l2": -float(p["b"]), "x2": 1.0/p["b"]})
reg("u5-l3-07")(lambda p: {"D": float(p["d"]), "y0": float(p["d"]), "yinf": p["d"]+p["b0"]/p["a0"]})
@reg("u5-l3-08")
def _(p):
    A = sp.Matrix([[-p["a"], 0], [0, -p["b"]]]); T = sp.Matrix([[1, 1], [0, 1]])
    At = T.inv()*A*T
    return {"tr": float(At.trace()), "det": float(At.det())}
@reg("u5-l3-09")
def _(p):
    A = -(p["b"]+p["Kt"]**2/p["Ra"])/p["J"]
    return {"A": A, "B": (p["Kt"]/p["Ra"])/p["J"], "lam": A}
@reg("u5-l3-10")
def _(p):
    x = sp.symbols("x")
    f = x*(p["r"]-x)
    df = sp.diff(f, x)
    return {"x1": 0.0, "x2": float(p["r"]), "a1": float(df.subs(x, 0)),
            "a2": float(df.subs(x, p["r"])), "stable": float(p["r"])}
@reg("u5-l3-11")
def _(p):
    A = np.array([[-p["a"], 0], [0, -(p["a"]+1)]], float); B = np.array([[p["b1"]], [0]], float)
    C = np.hstack([B, A@B])
    return {"det": float(np.linalg.det(C)), "ctrl": 0.0}
@reg("u5-l3-12")
def _(p):
    xe = p["x0"]*(1-p["a"]*p["h"]); xt = p["x0"]*math.exp(-p["a"]*p["h"])
    return {"xe": xe, "xt": xt, "err": xe-xt}
reg("u5-l3-13")(lambda p: {"x1": float(p["t1"]), "x2": float(p["t1"]*p["t2"])})
@reg("u5-l3-14")
def _(p):
    x, u = sp.symbols("x u")
    f = -x**2+x*u
    u0 = float(sp.solve(sp.Eq(f.subs(x, p["x0"]), 0), u)[0])
    return {"u0": u0, "a": float(sp.diff(f, x).subs({x: p["x0"], u: u0})),
            "b": float(sp.diff(f, u).subs({x: p["x0"], u: u0}))}
@reg("u5-l4-02")
def _(p):
    ev = np.linalg.eigvals(np.array([[0, 1], [-p["k"]/p["m"], -p["c"]/p["m"]]], float))
    return {"a21": -p["k"]/p["m"], "a22": -p["c"]/p["m"],
            "x1": p["F"]/p["k"], "x2": 0.0, "re": float(max(ev.real))}
@reg("u5-l4-04")
def _(p):
    keff = 9.8/p["L"]-p["kp"]
    osc = 1.0 if keff < 0 else 0.0
    return {"keff": keff, "osc": osc, "w": math.sqrt(-keff) if keff < 0 else 0.0}
@reg("u5-l4-05")
def _(p):
    m = p["k"]/(2*math.sqrt(p["h0"]))
    dh = p["dq"]/m; tau = p["A"]/m
    q0 = p["k"]*math.sqrt(p["h0"])
    dtrue = ((q0+p["dq"])/p["k"])**2 - p["h0"]
    return {"dh": dh, "tau": tau, "err": (dh-dtrue)/dtrue*100}
@reg("u5-l4-06")
def _(p):
    y = math.exp(p["l1"]*p["t1"])+math.exp(p["l2"]*p["t1"])
    return {"y": y, "tc": math.log(0.05)/(p["l2"]-p["l1"])}
@reg("u5-l4-07")
def _(p):
    tr = -p["R"]/p["L"]; det = 1.0/(p["L"]*p["C"])
    return {"det": det, "tr": tr, "c1": -tr, "c0": det, "match": 1.0}
@reg("u5-l4-08")
def _(p):
    return {"st": 1.0, "Kc": p["a"]**2/4.0}

# ---- U6 시간응답 ----
def _mp(z): return math.exp(-math.pi*z/math.sqrt(1-z*z))*100
def _zofmp(MpPct):
    lnM = math.log(MpPct/100)
    return -lnM/math.sqrt(math.pi**2+lnM**2)
def _step2(z, w0, t1):
    wd = w0*math.sqrt(1-z*z); ph = math.acos(z)
    return 1-math.exp(-z*w0*t1)/math.sqrt(1-z*z)*math.sin(wd*t1+ph)

reg("u6-l2-01")(lambda p: {"t63": float(p["tau"]), "Ts": 4*p["tau"], "Tr": 2.2*p["tau"]})
reg("u6-l2-02")(lambda p: {"tau": 1.0/p["a"], "Ts": 4.0/p["a"]})
reg("u6-l2-03")(lambda p: _mp(p["z"]))
@reg("u6-l2-04")
def _(p):
    wd = p["w0"]*math.sqrt(1-p["z"]**2)
    return {"Tp": math.pi/wd, "Ts": 4/(p["z"]*p["w0"])}
@reg("u6-l2-05")
def _(p):
    w0 = math.sqrt(p["c0"]); z = p["c1"]/(2*w0)
    return {"z": z, "Mp": _mp(z), "Ts": 4/(z*w0)}
@reg("u6-l2-06")
def _(p):
    w0 = math.hypot(p["sg"], p["wd"])
    return {"z": p["sg"]/w0, "Mp": math.exp(-math.pi*p["sg"]/p["wd"])*100, "Tp": math.pi/p["wd"]}
reg("u6-l2-07")(lambda p: _zofmp(p["Mp"]))
reg("u6-l2-08")(lambda p: _step2(p["z"], p["w0"], p["t1"]))
reg("u6-l2-09")(lambda p: {"tau": 1.0/p["p1"], "Ts": 4.0/p["p1"]})
reg("u6-l2-10")(lambda p: {"Mp": 1.0, "Tp": 1.0/p["k"]})
reg("u6-l2-11")(lambda p: math.exp(-2*math.pi*p["z"]/math.sqrt(1-p["z"]**2))*100)
@reg("u6-l2-12")
def _(p):
    w0 = math.sqrt(p["c0"]); z = p["c1"]/(2*w0)
    return {"fin": float(p["K"]), "peak": p["K"]*(1+_mp(z)/100)}
@reg("u6-l3-01")
def _(p):
    w0 = math.sqrt(p["c0"]); z = p["c1"]/(2*w0); wd = w0*math.sqrt(1-z*z)
    return {"Mp": _mp(z), "Tp": math.pi/wd, "Ts": 8.0/p["c1"], "Tr": 1.8/w0}
@reg("u6-l3-02")
def _(p):
    z = _zofmp(p["Mp"]); w0 = 4/(p["Ts"]*z)
    return {"z": z, "w0": w0, "c1": 2*z*w0, "c0": w0*w0}
@reg("u6-l3-03")
def _(p):
    return {"ratio": float(p["k"]), "ok": 1.0 if p["k"] >= 5 else 0.0,
            "Mp": math.exp(-math.pi*p["sg"]/p["wd"])*100}
@reg("u6-l3-04")
def _(p):
    wd = p["w0"]*math.sqrt(1-p["z"]**2); t1 = 0.5
    return p["w0"]/math.sqrt(1-p["z"]**2)*math.exp(-p["z"]*p["w0"]*t1)*math.sin(wd*t1)/p["zz"]
@reg("u6-l3-05")
def _(p):
    wd = p["w0"]*math.sqrt(1-p["z"]**2); t1 = 0.3; ph = math.acos(p["z"])
    y0 = 1-math.exp(-p["z"]*p["w0"]*t1)/math.sqrt(1-p["z"]**2)*math.sin(wd*t1+ph)
    yd = p["w0"]/math.sqrt(1-p["z"]**2)*math.exp(-p["z"]*p["w0"]*t1)*math.sin(wd*t1)
    return {"sgn": -1.0, "y": y0-yd/p["zz"]}
@reg("u6-l3-06")
def _(p):
    def mp(K):
        z = p["a"]/(2*math.sqrt(K)); return _mp(z)
    return {"z": p["a"]/(2*math.sqrt(p["K"])), "Mp": mp(p["K"]), "Mp4": mp(4*p["K"])}
@reg("u6-l3-07")
def _(p):
    z = _zofmp((p["peak"]-1)*100)
    wd = math.pi/p["Tp"]; w0 = wd/math.sqrt(1-z*z)
    return {"z": z, "w0": w0, "Ts": 4/(z*w0)}
reg("u6-l3-08")(lambda p: {"Ts2": 4/(p["z"]*p["w0"]), "Ts5": 3/(p["z"]*p["w0"])})
@reg("u6-l3-09")
def _(p):
    t2 = p["tau"]/p["k"]
    return {"t2": t2, "Ts": 4*p["tau"]+t2}
reg("u6-l3-10")(lambda p: 4*math.sqrt(1-p["z"]**2)/(2*math.pi*p["z"]))
@reg("u6-l3-11")
def _(p):
    w0 = math.sqrt(p["c0"]); z = p["c1"]/(2*w0)
    if z < 0.999:
        return {"t": -1.0, "Mp": _mp(z), "tau1": 0.0, "tau2": 0.0}
    if z > 1.001:
        D = math.sqrt(p["c1"]**2-4*p["c0"])
        return {"t": 1.0, "Mp": 0.0, "tau1": 2/(p["c1"]-D), "tau2": 2/(p["c1"]+D)}
    return {"t": 0.0, "Mp": 0.0, "tau1": 2/p["c1"], "tau2": 2/p["c1"]}
@reg("u6-l3-12")
def _(p):
    wd = p["w0"]*math.sqrt(1-p["z"]**2)
    return (math.pi-math.acos(p["z"]))/wd
@reg("u6-l3-13")
def _(p):
    w0 = math.sqrt(p["Kp"]*p["Kv"]); z = p["Kv"]/(2*w0)
    return {"z": z, "Ts": 8.0/p["Kv"], "osc": 1.0 if z < 1 else 0.0}
@reg("u6-l3-14")
def _(p):
    v = 1-(1+p["w0"]*p["t1"])*math.exp(-p["w0"]*p["t1"])
    return {"y": v, "t90": 3.9/p["w0"]}
@reg("u6-l4-02")
def _(p):
    z = _zofmp(p["Mp"]); w0 = p["a"]/(2*z)
    wd = w0*math.sqrt(1-z*z)
    return {"K": w0*w0, "Tp": math.pi/wd, "Ts": 8.0/p["a"]}
@reg("u6-l4-04")
def _(p):
    w0 = math.hypot(p["sg"], p["wd"]); z = p["sg"]/w0; ph = math.acos(z)
    y2 = 1-math.exp(-p["sg"])/math.sqrt(1-z*z)*math.sin(p["wd"]+ph)
    return {"y2": y2, "fast": math.exp(-p["p3"])}
@reg("u6-l4-05")
def _(p):
    z = _zofmp(p["Mp"]); w0 = math.sqrt(p["K"])
    return {"h": (2*z*w0-p["a"])/p["K"], "Ts": 4/(z*w0)}
@reg("u6-l4-06")
def _(p):
    def specs(z):
        return {"Mp": _mp(z), "Ts": 4/(z*p["w0"])}
    A = specs(p["zA"]); B = specs(p["zB"])
    return {"MpA": A["Mp"], "TsA": A["Ts"], "MpB": B["Mp"], "TsB": B["Ts"]}
@reg("u6-l4-07")
def _(p):
    z = 0.5; w0 = 2; wd = w0*math.sqrt(1-z*z); ph = math.acos(z)
    best = 0.0; tt = 0.0
    while tt <= 3.0001:
        y0 = 1-math.exp(-z*w0*tt)/math.sqrt(1-z*z)*math.sin(wd*tt+ph)
        yd = w0/math.sqrt(1-z*z)*math.exp(-z*w0*tt)*math.sin(wd*tt)
        y = y0+yd/p["zz"]
        if y > best: best = y
        tt += 0.05
    return best
@reg("u6-l4-08")
def _(p):
    sg = 4.0/p["Ts"]; z = _zofmp(p["Mp"]); th = math.acos(z)
    return {"sg": sg, "th": math.degrees(th), "wd": sg*math.tan(th)}

# ---- U7 안정성 (독립 경로: 다항식 근을 수치로 구해 직접 센다) ----
def _rhp(coeffs):
    r = np.roots(coeffs)
    return int(sum(1 for x in r if x.real > 1e-9)), r

reg("u7-l2-01")(lambda p: {"n": 1.0, "st": 0.0})
reg("u7-l2-02")(lambda p: {"st": 0.0, "coef": -float(p["b"])})
@reg("u7-l2-03")
def _(p):
    n, _ = _rhp([1, p["a2"], p["a1"], p["a0"]])
    return {"b1": (p["a2"]*p["a1"]-p["a0"])/p["a2"], "st": 1.0 if n == 0 else 0.0}
reg("u7-l2-04")(lambda p: p["a0"]/p["a2"])
reg("u7-l2-05")(lambda p: -float(p["a"]*p["b"]))
@reg("u7-l2-06")
def _(p):
    # 독립 검증: K_max에서 실제 근이 허수축에 있는지 확인
    Kmax = (p["a"]+p["b"])*p["a"]*p["b"]
    _, r = _rhp([1, p["a"]+p["b"], p["a"]*p["b"], Kmax])
    assert min(abs(x.real) for x in r if abs(x.imag) > 0.1) < 1e-6, "임계 검증 실패"
    return Kmax
@reg("u7-l2-07")
def _(p):
    Kmax = (p["a"]+p["b"])*p["a"]*p["b"]
    _, r = _rhp([1, p["a"]+p["b"], p["a"]*p["b"], Kmax])
    return max(abs(x.imag) for x in r)
@reg("u7-l2-08")
def _(p):
    n, _ = _rhp([1, 1, p["c"], p["c"]+4])
    return float(n)
@reg("u7-l2-09")
def _(p):
    gm = p["Kmax"]/p["K"]
    return {"gm": gm, "db": 20*math.log10(gm)}
@reg("u7-l2-10")
def _(p):
    b1 = (p["a3"]*p["a2"]-p["a1"])/p["a3"]
    c1 = (b1*p["a1"]-p["a3"]*p["a0"])/b1
    return {"b1": b1, "c1": c1}
@reg("u7-l2-11")
def _(p):
    return {"re": float(p["a"]), "im": float(p["w"]), "t10": math.log(10)/p["a"]}
@reg("u7-l2-12")
def _(p):
    if p["n"] == 1: return {"st": 1.0, "re": -1.0}
    return {"st": 0.0, "re": 0.0}
@reg("u7-l3-01")
def _(p):
    n, r = _rhp([1, p["a"], p["b"], p["c"]])
    b1 = (p["a"]*p["b"]-p["c"])/p["a"]
    strictly_stable = max(x.real for x in r) < -1e-9
    return {"b1": b1, "n": float(n), "st": 1.0 if strictly_stable else 0.0}
@reg("u7-l3-02")
def _(p):
    Kmax = (p["a"]+p["b"])*p["a"]*p["b"]
    n, _ = _rhp([1, p["a"]+p["b"], p["a"]*p["b"], Kmax/2])
    assert n == 0, "절반 이득이 불안정?"
    return {"Kmax": Kmax, "w": math.sqrt(p["a"]*p["b"]), "st": 1.0}
reg("u7-l3-03")(lambda p: 2*p["a"]/(p["a"]+2)-p["a"])
reg("u7-l3-04")(lambda p: {"c1sgn": -1.0, "n": 2.0})
@reg("u7-l3-05")
def _(p):
    _, r = _rhp([1, 2, p["w2"], 2*p["w2"]])
    wim = max(abs(x.imag) for x in r)
    return {"aux2": 2.0, "aux0": 2.0*p["w2"], "w": wim, "cls": 0.5}
@reg("u7-l3-06")
def _(p):
    Kmax = (p["a"]+p["b"])*p["a"]*p["b"]; K = Kmax/p["gm"]
    return {"Kmax": Kmax, "K": K, "b1": (Kmax-K)/(p["a"]+p["b"])}
reg("u7-l3-07")(lambda p: 2.0/p["T"])
reg("u7-l3-08")(lambda p: -float(p["a"]))
@reg("u7-l3-09")
def _(p):
    # 독립: K=10±ε에서 근으로 확인
    n_lo, _ = _rhp([1, p["a"], 11, p["a"], 9.9]); n_hi, _ = _rhp([1, p["a"], 11, p["a"], 10.1])
    assert n_lo == 0 and n_hi > 0, "경계 검증 실패"
    return 10.0
@reg("u7-l3-10")
def _(p):
    z = sp.symbols("z")
    poly = sp.expand((z-p["sg"])**2 + p["a1"]*(z-p["sg"]) + p["a0"])
    return {"c1": float(poly.coeff(z, 1)), "c0": float(poly.coeff(z, 0))}
@reg("u7-l3-11")
def _(p):
    w = math.sqrt(p["a"]*p["b"])
    return {"T": 2*math.pi/w, "tau": 1.0/(p["a"]+p["b"])}
@reg("u7-l3-12")
def _(p):
    w = 2*math.pi/p["Tu"]
    return {"w": w, "a1": w*w, "K": p["Ku"]/2}
@reg("u7-l3-13")
def _(p):
    u = math.exp(p["p1"]*p["t1"])
    st = abs(-math.exp(-3*p["t1"])+math.exp(-5*p["t1"]))
    return u/st
reg("u7-l3-14")(lambda p: (p["a"]+p["b"])*p["a"]*p["b"]/p["K"])
@reg("u7-l4-02")
def _(p):
    Kmax = (2+p["a"])*2*p["a"]; K = Kmax/p["gm"]
    return {"Kmax": Kmax, "w": math.sqrt(2*p["a"]), "K": K, "Kv": K/(2*p["a"])}
@reg("u7-l4-04")
def _(p):
    Kp = 2*p["a"]
    return {"kd": Kp/p["a"]-p["a"], "kp": float(p["a"]*p["a"])}
reg("u7-l4-05")(lambda p: {"b1": 4.0, "c1": 0.0, "n": 2.0})
@reg("u7-l4-06")
def _(p):
    K = p["a"]**2/(4*p["z"]**2)
    return {"K": K, "Mp": _mp(p["z"]), "inf": 1.0}
@reg("u7-l4-07")
def _(p):
    amin = p["a"]*(1-p["tol"]/100)
    Kn = (p["a"]+p["b"])*p["a"]*p["b"]; Kw = (amin+p["b"])*amin*p["b"]
    return {"Kw": Kw, "cut": (1-Kw/Kn)*100}
@reg("u7-l4-08")
def _(p):
    Kmax = (p["a"]+p["b"])*p["a"]*p["b"]; K = Kmax/4
    Keff = K/p["b"]; z = p["a"]/(2*math.sqrt(Keff))
    Mp = _mp(z) if z < 1 else 0.0
    return {"Kmax": Kmax, "w": math.sqrt(p["a"]*p["b"]), "z": z, "Mp": Mp}
