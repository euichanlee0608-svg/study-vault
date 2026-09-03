"""course-prob 독립 재계산 — 확률 손계산의 별도 구현(math.comb/factorial·급수·numpy 행렬 경로)."""
import math

IND = {}
def reg(pid):
    def deco(fn): IND[pid] = fn; return fn
    return deco

# ---- U1 ----
reg("u1-l2-01")(lambda p: p["pA"]+p["pB"]-p["pAB"])
reg("u1-l2-02")(lambda p: p["pAB"]/p["pB"])
reg("u1-l2-03")(lambda p: p["w"]*p["a"]+(1-p["w"])*p["b"])
reg("u1-l2-04")(lambda p: p["w"]*p["a"]/(p["w"]*p["a"]+(1-p["w"])*p["b"]))
@reg("u1-l2-05")
def _(p):
    p3 = 1-p["p1"]-p["p2"]
    assert p3 > 0, "p3<=0"
    return p["x1"]*p["p1"]+p["x2"]*p["p2"]+p["x3"]*p3
@reg("u1-l2-06")
def _(p):
    q = 1-p["p1"]
    E = p["x1"]*p["p1"]+p["x2"]*q
    E2 = p["x1"]**2*p["p1"]+p["x2"]**2*q
    return {"EX": E, "VX": E2-E*E}
@reg("u1-l2-07")
def _(p):
    n, k = int(p["n"]), int(p["k"])
    return math.comb(n, k)*p["pr"]**k*(1-p["pr"])**(n-k)
@reg("u1-l2-08")
def _(p):
    return {"pk": (1-p["pr"])**(int(p["k"])-1)*p["pr"], "EX": 1/p["pr"]}
@reg("u1-l2-09")
def _(p):
    k = int(p["k"])
    return math.exp(-p["mu"])*p["mu"]**k/math.factorial(k)
@reg("u1-l2-10")
def _(p):
    return {"pv": (p["b"]-p["c"])/p["b"], "EX": p["b"]/2}
reg("u1-l2-11")(lambda p: math.exp(-p["lam"]*p["t"]))
reg("u1-l2-12")(lambda p: (p["x"]-p["mu"])/p["sig"])

reg("u1-l3-01")(lambda p: p["pi"]*p["se"]/(p["pi"]*p["se"]+(1-p["pi"])*(1-p["sp"])))
reg("u1-l3-02")(lambda p: 1-(1-p["pr"])**int(p["n"]))
reg("u1-l3-03")(lambda p: p["a"]*p["EX"]+p["b"]*p["EY"])
@reg("u1-l3-04")
def _(p):
    return {"ES": p["EX"]+p["EY"], "VS": p["VX"]+p["VY"]}
reg("u1-l3-05")(lambda p: p["w"]*p["m1"]+(1-p["w"])*p["m2"])
reg("u1-l3-06")(lambda p: 1-math.exp(-p["mu"]))
@reg("u1-l3-07")
def _(p):
    n, k = int(p["n"]), int(p["k"])
    pb = math.comb(n, k)*p["pr"]**k*(1-p["pr"])**(n-k)
    mu = n*p["pr"]
    return {"binom": pb, "pois": math.exp(-mu)*mu**k/math.factorial(k)}
reg("u1-l3-08")(lambda p: p["x"]**int(p["n"]))
reg("u1-l3-09")(lambda p: (1-p["pr"])**int(p["n"]))
@reg("u1-l3-10")
def _(p):
    m = p["lam"]*p["t"]
    return {"E": m, "V": m}
reg("u1-l3-11")(lambda p: p["b"]**2-p["a"]**2)
reg("u1-l3-12")(lambda p: p["EXY"]-p["EX"]*p["EY"])
reg("u1-l3-13")(lambda p: p["cov"]/(p["sx"]*p["sy"]))
reg("u1-l3-14")(lambda p: p["EX"]/p["a"])

@reg("u1-l4-02")
def _(p):
    n = int(p["n"])
    return (n-1)/(n*(n-2))
@reg("u1-l4-03")
def _(p):
    n = int(p["n"])
    return n*sum(1/i for i in range(1, n+1))
@reg("u1-l4-05")
def _(p):
    n = int(p["n"])
    return sum((-1)**k/math.factorial(k) for k in range(n+1))
@reg("u1-l4-06")
def _(p):
    n = int(p["n"])
    return {"V": float(n), "p0": math.comb(n, n//2)/2**n}
@reg("u1-l4-07")
def _(p):
    w, q = p["w"], 1-p["w"]
    E = w*p["m1"]+q*p["m2"]
    V = w*p["v1"]+q*p["v2"] + w*(p["m1"]-E)**2+q*(p["m2"]-E)**2
    return {"E": E, "V": V}

# ---- U2 ----
reg("u2-l2-01")(lambda p: math.exp(-p["lam"]*p["t"]))
reg("u2-l2-02")(lambda p: math.exp(-p["lam"]*p["s"])-math.exp(-p["lam"]*p["t"]))
@reg("u2-l2-03")
def _(p):
    return {"E": 1/p["lam"], "SD": 1/p["lam"]}
reg("u2-l2-04")(lambda p: math.log(2)/p["lam"])
reg("u2-l2-05")(lambda p: math.exp(-p["lam"]*p["t"]))
reg("u2-l2-06")(lambda p: 1/(p["n"]*p["lam"]))
@reg("u2-l2-07")
def _(p):
    s = p["l1"]+p["l2"]
    return {"Emin": 1/s, "p1": p["l1"]/s}
@reg("u2-l2-08")
def _(p):
    lam = math.log(2)/p["t0"]
    return {"lam": lam, "MTTF": 1/lam}
reg("u2-l2-09")(lambda p: math.exp(-p["c"]))
@reg("u2-l2-10")
def _(p):
    s = p["l1"]+p["l2"]+p["l3"]
    return {"lam": s, "MTTF": 1/s}
reg("u2-l2-11")(lambda p: -math.log(p["r"])/p["lam"])
@reg("u2-l2-12")
def _(p):
    y = p["lam"]*p["x"]
    return {"y": y, "P": math.exp(-y)}

reg("u2-l3-01")(lambda p: 1/p["l1"]+1/p["l2"]-1/(p["l1"]+p["l2"]))
@reg("u2-l3-02")
def _(p):
    s = p["l1"]+p["l2"]+p["l3"]
    return (p["l1"]/s)*(p["l2"]/(p["l2"]+p["l3"]))
reg("u2-l3-03")(lambda p: math.exp(-(p["l1"]+p["l2"])*p["t"]))
@reg("u2-l3-04")
def _(p):
    m = p["lam"]*p["t"]
    return math.exp(-m)*(1+m)
@reg("u2-l3-05")
def _(p):
    return {"E": p["k"]/p["lam"], "V": p["k"]/p["lam"]**2}
@reg("u2-l3-06")
def _(p):
    s = p["l1"]+p["l2"]+p["l3"]
    return {"Emin": 1/s, "p3": p["l3"]/s}
@reg("u2-l3-07")
def _(p):
    return {"Er": 1/p["lam"], "Et": p["s"]+1/p["lam"]}
reg("u2-l3-08")(lambda p: math.exp(-p["lam"]*p["u"]))
@reg("u2-l3-09")
def _(p):
    return {"pe": math.exp(-p["c"]), "pu": (2-p["c"])/2}
reg("u2-l3-10")(lambda p: 1/(2*p["lam"])+1/p["lam"])
reg("u2-l3-11")(lambda p: -math.log(p["r"])/p["T"])
@reg("u2-l3-12")
def _(p):
    Hh = p["lam"]*p["t"]
    return {"H": Hh, "R": math.exp(-Hh)}
@reg("u2-l3-13")
def _(p):
    return {"P": 1-math.exp(-p["lam"]*p["t"]), "E": 1/p["lam"]}
reg("u2-l3-14")(lambda p: p["w"]*math.exp(-p["l1"])+(1-p["w"])*math.exp(-p["l2"]))

@reg("u2-l4-02")
def _(p):
    m = p["lam"]*p["t"]
    return math.exp(-m)*(1+m+m*m/2)
@reg("u2-l4-04")
def _(p):
    r1 = math.exp(-p["l1"]*p["t"]); r2 = math.exp(-p["l2"]*p["t"])
    return {"Rs": r1*r2, "Rp": 1-(1-r1)*(1-r2)}
@reg("u2-l4-05")
def _(p):
    return {"Re": float(p["m"]), "Ru": 2*p["m"]/3}
@reg("u2-l4-06")
def _(p):
    n = int(p["n"])
    return sum(1/k for k in range(1, n+1))/p["lam"]
reg("u2-l4-07")(lambda p: -math.log(1-p["q"])/p["lam"])

# ---- U3 ----
def _pois(mu, k):
    k = int(k)
    return math.exp(-mu)*mu**k/math.factorial(k)

reg("u3-l2-01")(lambda p: _pois(p["lam"]*p["t"], p["k"]))
reg("u3-l2-02")(lambda p: math.exp(-p["lam"]*p["t"]))
@reg("u3-l2-03")
def _(p):
    m = p["lam"]*p["t"]
    return {"E": m, "SD": math.sqrt(m)}
@reg("u3-l2-04")
def _(p):
    return 1-math.exp(-p["mu"])*(1+p["mu"])
reg("u3-l2-05")(lambda p: _pois(p["lam"]*p["w"], p["k"]))
reg("u3-l2-06")(lambda p: _pois(p["lam"], p["a"])*_pois(p["lam"], p["b"]))
@reg("u3-l2-07")
def _(p):
    return {"E": p["k"]/p["lam"], "V": p["k"]/p["lam"]**2}
@reg("u3-l2-08")
def _(p):
    k, j = int(p["k"]), int(p["j"])
    return math.comb(k, j)*p["st"]**j*(1-p["st"])**(k-j)
reg("u3-l2-09")(lambda p: math.exp(-p["lam"]*p["x"]))
@reg("u3-l2-10")
def _(p):
    lam = p["n"]/p["T"]
    return {"lam": lam, "E": lam*p["u"]}
reg("u3-l2-11")(lambda p: 1/math.sqrt(p["lam"]*p["t"]))
reg("u3-l2-12")(lambda p: p["mu"]/(p["k"]+1))

reg("u3-l3-01")(lambda p: p["s"]/p["t"])
reg("u3-l3-02")(lambda p: _pois(p["lam"], p["j"])*_pois(p["lam"], p["k"]-p["j"]))
@reg("u3-l3-03")
def _(p):
    m = p["lam"]*p["t"]
    return 1-math.exp(-m)*(1+m)
reg("u3-l3-04")(lambda p: math.exp(-p["lam"]*p["x"]))
@reg("u3-l3-05")
def _(p):
    m = p["lam"]*p["t"]; s = math.sqrt(m)
    return {"lo": m-s, "hi": m+s}
reg("u3-l3-06")(lambda p: p["k"]*p["t"]/2)
@reg("u3-l3-07")
def _(p):
    return {"E1": 1/p["lam"], "E2": p["lam"]*p["u"]}
reg("u3-l3-08")(lambda p: (1-math.exp(-2*p["mu"]))/2)
reg("u3-l3-09")(lambda p: p["lam"]*min(p["s"], p["t"]))
reg("u3-l3-10")(lambda p: math.exp(-p["k"]*p["lam"]*p["x"]))
@reg("u3-l3-11")
def _(p):
    return {"P": math.exp(-p["lam"]*p["T"]), "lamH": p["lam"]*60}
reg("u3-l3-12")(lambda p: p["k"]*p["st"])
reg("u3-l3-13")(lambda p: _pois(p["m1"]+p["m2"], p["k"]))
@reg("u3-l3-14")
def _(p):
    return sum(_pois(p["mu"], j) for j in range(int(p["k"])))

@reg("u3-l4-02")
def _(p):
    return {"E": p["k"]*p["st"], "V": p["k"]*p["st"]*(1-p["st"])}
reg("u3-l4-04")(lambda p: math.exp(-2*p["mu"]))
reg("u3-l4-05")(lambda p: -math.log(p["r"])/p["T"])
reg("u3-l4-06")(lambda p: _pois(p["lam"]*p["a"], p["j"])*_pois(p["lam"]*p["b"], p["k"]-p["j"]))
@reg("u3-l4-07")
def _(p):
    m = p["lam"]*p["t"]
    return {"mu": m, "SNR": math.sqrt(m)}

# ---- U4 ----
reg("u4-l2-01")(lambda p: _pois((p["l1"]+p["l2"])*p["t"], p["k"]))
reg("u4-l2-02")(lambda p: _pois(p["lam"]*p["pr"]*p["t"], p["k"]))
@reg("u4-l2-03")
def _(p):
    return {"EA": p["lam"]*p["pr"]*p["t"], "EB": p["lam"]*(1-p["pr"])*p["t"]}
reg("u4-l2-04")(lambda p: p["l1"]/(p["l1"]+p["l2"]))
reg("u4-l2-05")(lambda p: (p["l1"]/(p["l1"]+p["l2"]))**int(p["k"]))
reg("u4-l2-06")(lambda p: p["a"]*p["t"]+p["b"]*p["t"]**2/2)
reg("u4-l2-07")(lambda p: math.exp(-(p["a"]*p["t"]+p["b"]*p["t"]**2/2)))
reg("u4-l2-08")(lambda p: p["lam"]*p["t"]*p["EY"])
@reg("u4-l2-09")
def _(p):
    m = p["lam"]*p["t"]
    return {"E": m*p["EY"], "V": m*(p["VY"]+p["EY"]**2)}
reg("u4-l2-10")(lambda p: _pois(p["l1"]*p["t"], p["a"])*_pois(p["l2"]*p["t"], p["b"]))
reg("u4-l2-11")(lambda p: 1/(p["lam"]*p["pr"]))
reg("u4-l2-12")(lambda p: p["lobs"]/p["pr"])

reg("u4-l3-01")(lambda p: math.exp(-p["lam"]*p["pr"]*p["t"]))
@reg("u4-l3-02")
def _(p):
    k, j = int(p["k"]), int(p["j"])
    q = p["l1"]/(p["l1"]+p["l2"])
    return math.comb(k, j)*q**j*(1-q)**(k-j)
reg("u4-l3-03")(lambda p: p["c"]*(p["t2"]**2-p["t1"]**2)/2)
@reg("u4-l3-04")
def _(p):
    m = p["lam"]*p["t"]
    EY2 = p["sY"]**2+p["EY"]**2
    return {"E": m*p["EY"], "SD": math.sqrt(m*EY2)}
reg("u4-l3-05")(lambda p: _pois(p["l1"]*p["T1"]+p["l2"]*p["T2"], p["k"]))
reg("u4-l3-06")(lambda p: 1+math.log(p["r"])/(p["lam"]*p["t"]))
@reg("u4-l3-07")
def _(p):
    l = p["lam"]*p["p1"]*p["p2"]
    return {"lam": l, "E": l*p["t"]}
reg("u4-l3-08")(lambda p: _pois(p["lam"]*p["t"]*p["q"], p["j"]))
@reg("u4-l3-09")
def _(p):
    return {"E": (p["l1"]-p["l2"])*p["t"], "V": (p["l1"]+p["l2"])*p["t"]}
reg("u4-l3-10")(lambda p: p["n"]*p["l1"]/(p["l1"]+p["l2"]))
reg("u4-l3-11")(lambda p: p["lm"]*(p["t"]-p["tau"]*(1-math.exp(-p["t"]/p["tau"]))))
@reg("u4-l3-12")
def _(p):
    m = p["lam"]*p["t"]
    return {"E": m*p["mY"], "V": m*2*p["mY"]**2}
@reg("u4-l3-13")
def _(p):
    b = p["lam"]*p["t"]
    return {"E1": b*p["p1"], "E2": b*p["p2"], "E3": b*(1-p["p1"]-p["p2"])}
@reg("u4-l3-14")
def _(p):
    s = p["l1"]+p["l2"]
    return {"E": 1/s, "p1": p["l1"]/s}

@reg("u4-l4-02")
def _(p):
    m = p["a"]*p["T"]+p["b"]*p["T"]**2/2
    return {"m": m, "p0": math.exp(-m), "lbar": m/p["T"]}
reg("u4-l4-04")(lambda p: p["ls"]*p["t"]/math.sqrt((p["ls"]+p["ld"])*p["t"]))
reg("u4-l4-05")(lambda p: _pois(p["l1"]*p["T1"], p["k"])*math.exp(-p["l2"]*p["T2"]))
@reg("u4-l4-06")
def _(p):
    s = p["l1"]+p["l2"]+p["l3"]
    return {"E": 1/s, "p2": p["l2"]/s}
@reg("u4-l4-07")
def _(p):
    l = (1-p["pr"])*p["lam"]
    return {"P0": math.exp(-l*p["t"]), "E": l*p["t"]}

# ---- U5 ----
reg("u5-l2-01")(lambda p: 60/p["mu"])
reg("u5-l2-02")(lambda p: p["t"]/p["mu"])
reg("u5-l2-03")(lambda p: p["ER"]/p["EX"])
reg("u5-l2-04")(lambda p: (p["b"]**2/3)/(p["b"]/2))
@reg("u5-l2-05")
def _(p):
    return {"EI": 2*p["m"], "ratio": 2.0}
reg("u5-l2-06")(lambda p: (p["b"]**2/3)/(2*p["b"]/2))
reg("u5-l2-07")(lambda p: float(p["m"]))
reg("u5-l2-08")(lambda p: p["up"]/(p["up"]+p["dn"]))
reg("u5-l2-09")(lambda p: p["c"]/p["mu"])
@reg("u5-l2-10")
def _(p):
    cv = p["sd"]/p["mu"]
    return {"cv": cv, "EI": p["mu"]*(1+cv**2)}
reg("u5-l2-11")(lambda p: p["on"]/(p["on"]+p["off"]))
reg("u5-l2-12")(lambda p: math.sqrt(p["t"]*p["sd"]**2/p["mu"]**3))

@reg("u5-l3-01")
def _(p):
    return {"Ea": p["b"]/3, "Es": 2*p["b"]/3}
@reg("u5-l3-02")
def _(p):
    return {"We": float(p["m"]), "Wd": p["m"]/2}
@reg("u5-l3-03")
def _(p):
    A = p["up"]/(p["up"]+p["dn"])
    return {"days": A*p["t"], "n": p["t"]/(p["up"]+p["dn"])}
@reg("u5-l3-04")
def _(p):
    return {"rA": p["cf"]/p["mu"], "rB": p["cp"]/p["T"]}
reg("u5-l3-05")(lambda p: math.exp(-p["lam"]*p["x"]))
reg("u5-l3-06")(lambda p: 1-p["x"]**2/p["b"]**2)
reg("u5-l3-07")(lambda p: p["al"]*p["mu"]*(1+p["cv"]**2))
@reg("u5-l3-08")
def _(p):
    EI = p["mu"]*(1+p["cv"]**2)
    return {"EI": EI, "ER": EI/2}
reg("u5-l3-09")(lambda p: p["w"]*p["dn"]/(p["up"]+p["dn"]))
@reg("u5-l3-10")
def _(p):
    m = 1/p["lam"]
    return {"rate": p["lam"], "EI": 2*m, "ER": m}
@reg("u5-l3-11")
def _(p):
    return {"EI": 2*p["b"]/3, "ER": p["b"]/3}
reg("u5-l3-12")(lambda p: p["fee"]*p["t"]/p["mu"])
@reg("u5-l3-13")
def _(p):
    m = p["t"]/p["mu"]
    s = math.sqrt(p["t"]*p["sd"]**2/p["mu"]**3)
    return {"E": m, "lo": m-s}
reg("u5-l3-14")(lambda p: (p["g"]*p["up"]-p["c"]*p["dn"])/(p["up"]+p["dn"]))

@reg("u5-l4-02")
def _(p):
    q = math.exp(-p["lam"]*p["T"])
    EL = (1-q)/p["lam"]
    return {"EL": EL, "rate": (p["cp"]*q+p["cf"]*(1-q))/EL}
@reg("u5-l4-04")
def _(p):
    return {"det": p["mu"]/2, "unif": 2*p["mu"]/3, "exp": float(p["mu"])}
reg("u5-l4-05")(lambda p: p["A"]*p["dn"]/(1-p["A"]))
@reg("u5-l4-07")
def _(p):
    m = p["t"]/p["mu"]
    s = math.sqrt(p["t"]*p["sd"]**2/p["mu"]**3)
    return (p["n"]-m)/s
reg("u5-l4-08")(lambda p: (p["g"]*p["up"]-p["pen"])/(p["up"]+p["dn"]))

# ---- U6 ---- (행렬류는 numpy 독립 경로: JS 폐형식/가우스소거 vs numpy 행렬거듭제곱/solve)
import numpy as np

def _P2(a, b):
    return np.array([[1-a, a], [b, 1-b]])

@reg("u6-l2-01")
def _(p):
    return float(np.linalg.matrix_power(_P2(p["a"], p["b"]), 2)[0, 0])
reg("u6-l2-02")(lambda p: p["a"]*(1-p["b"]))
@reg("u6-l2-03")
def _(p):
    P = _P2(p["a"], p["b"])
    w, v = np.linalg.eig(P.T)
    vec = np.real(v[:, np.argmin(np.abs(w-1))])
    vec = vec/vec.sum()
    return float(vec[0])
@reg("u6-l2-04")
def _(p):
    P = _P2(p["a"], p["b"])
    w, v = np.linalg.eig(P.T)
    vec = np.real(v[:, np.argmin(np.abs(w-1))]); vec = vec/vec.sum()
    return {"p1": float(vec[0]), "p2": float(vec[1])}
reg("u6-l2-05")(lambda p: 1/p["a"])
reg("u6-l2-06")(lambda p: p["p12"]*p["p23"]*p["p33"])
@reg("u6-l2-07")
def _(p):
    return float(np.linalg.matrix_power(_P2(p["a"], p["b"]), int(p["n"]))[0, 0])
reg("u6-l2-08")(lambda p: p["i"]+2*p["pr"]-1)
reg("u6-l2-09")(lambda p: p["w"]*p["a"]+(1-p["w"])*(1-p["b"]))
reg("u6-l2-10")(lambda p: 365*p["b"]/(p["a"]+p["b"]))
reg("u6-l2-11")(lambda p: abs(1-p["a"]-p["b"])**int(p["n"]))
reg("u6-l2-12")(lambda p: (p["a"]+p["b"])/p["b"])

def _P3(a, b, c):
    return np.array([[1-2*a, a, a], [b, 1-2*b, b], [c, c, 1-2*c]])

@reg("u6-l3-01")
def _(p):
    P = _P3(p["a"], p["b"], p["c"])
    A = np.vstack([(P.T-np.eye(3))[:2], np.ones(3)])
    pi = np.linalg.solve(A, np.array([0, 0, 1.0]))
    return {"p1": float(pi[0]), "p2": float(pi[1]), "p3": float(pi[2])}
@reg("u6-l3-02")
def _(p):
    P = _P3(p["a"], p["b"], p["c"])
    return float((P @ P)[0, 1])
@reg("u6-l3-03")
def _(p):
    return {"win": p["i"]/p["N"], "ruin": 1-p["i"]/p["N"]}
@reg("u6-l3-04")
def _(p):
    # 독립 경로: 흡수확률 선형계 h_i = p·h_{i+1}+q·h_{i-1}
    N = int(p["N"]); pr = p["pr"]
    A = np.zeros((N+1, N+1)); rhs = np.zeros(N+1)
    A[0, 0] = 1; A[N, N] = 1; rhs[N] = 1
    for i in range(1, N):
        A[i, i] = 1; A[i, i+1] = -pr; A[i, i-1] = -(1-pr)
    h = np.linalg.solve(A, rhs)
    return float(h[int(p["i"])])
@reg("u6-l3-05")
def _(p):
    # 독립 경로: 기대시간 선형계
    N = int(p["N"])
    A = np.zeros((N+1, N+1)); rhs = np.zeros(N+1)
    A[0, 0] = 1; A[N, N] = 1
    for i in range(1, N):
        A[i, i] = 1; A[i, i+1] = -0.5; A[i, i-1] = -0.5; rhs[i] = 1
    t = np.linalg.solve(A, rhs)
    return float(t[int(p["i"])])
@reg("u6-l3-06")
def _(p):
    k = int(p["k"]); pr = p["pr"]
    return (pr**(-k)-1)/(1-pr)
reg("u6-l3-07")(lambda p: p["N"]*p["b"]/(p["a"]+p["b"]))
@reg("u6-l3-08")
def _(p):
    Q = np.array([[p["a1"], p["a2"]], [p["b1"], p["b2"]]])
    t = np.linalg.solve(np.eye(2)-Q, np.ones(2))
    return float(t[0])
@reg("u6-l3-09")
def _(p):
    return float(np.linalg.matrix_power(_P2(p["a"], p["b"]), 2)[0, 1])
reg("u6-l3-10")(lambda p: (1-p["a"])**(int(p["m"])-1)*p["a"])
@reg("u6-l3-11")
def _(p):
    # 독립 경로: 전이행렬 세워 고유벡터
    pu, pd = p["pu"], p["pd"]
    P = np.array([[1-pu, pu, 0], [pd, 1-pu-pd, pu], [0, pd, 1-pd]])
    A = np.vstack([(P.T-np.eye(3))[:2], np.ones(3)])
    pi = np.linalg.solve(A, np.array([0, 0, 1.0]))
    return {"p0": float(pi[0]), "p2": float(pi[2])}
@reg("u6-l3-12")
def _(p):
    s = p["a"]+p["b"]
    return p["b"]/s*p["r1"]+p["a"]/s*p["r2"]
reg("u6-l3-13")(lambda p: math.log(p["eps"])/math.log(abs(1-p["a"]-p["b"])))
@reg("u6-l3-14")
def _(p):
    # 독립 경로: 정상 결합분포에서 상관 직접 계산
    a, b = p["a"], p["b"]
    p1 = b/(a+b)
    EII = p1*(1-a)
    var = p1*(1-p1)
    return (EII-p1*p1)/var

@reg("u6-l4-02")
def _(p):
    N = int(p["N"]); pr = p["pr"]
    A = np.zeros((N+1, N+1)); rhs = np.zeros(N+1)
    A[0, 0] = 1; A[N, N] = 1; rhs[N] = 1
    for i in range(1, N):
        A[i, i] = 1; A[i, i+1] = -pr; A[i, i-1] = -(1-pr)
    h = np.linalg.solve(A, rhs)
    w = float(h[int(p["i"])])
    return {"win": w, "ruin": 1-w}
@reg("u6-l4-04")
def _(p):
    s1 = 1-p["a"]-p["pA"]; s2 = 1-p["b"]-p["pB"]
    Q = np.array([[s1, p["a"]], [p["b"], s2]])
    IQ = np.eye(2)-Q
    h = np.linalg.solve(IQ, np.array([p["pA"], 0.0]))
    t = np.linalg.solve(IQ, np.ones(2))
    return {"h1": float(h[0]), "t1": float(t[0])}
@reg("u6-l4-05")
def _(p):
    r = p["r"]; f = 1-r
    A = np.array([[1-r, -f, 0], [-r, 1, -f], [0, -r, 1]])
    t = np.linalg.solve(A, np.ones(3))
    return float(t[0])
@reg("u6-l4-07")
def _(p):
    s = p["a"]+p["b"]; p1 = p["b"]/s; p2 = p["a"]/s
    return p1*p["r1"]+p2*p["r2"]-p["c"]*(p1*p["a"]+p2*p["b"])
@reg("u6-l4-08")
def _(p):
    p1 = p["b"]/(p["a"]+p["b"])
    return {"visits": p["T"]*p1, "gap": 1/p1}
