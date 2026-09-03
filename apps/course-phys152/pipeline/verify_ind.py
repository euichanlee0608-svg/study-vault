"""course-phys152 독립 재계산 — 물리 상수 기반 별도 구현. k=8.99e9, e0=8.85e-12, e=1.602e-19."""
import math, cmath
import sympy as sp

IND = {}
def reg(pid):
    def deco(fn): IND[pid] = fn; return fn
    return deco

K = 8.99e9; E0 = 8.85e-12; QE = 1.602e-19; ME = 9.11e-31; MP = 1.67e-27
MU0 = 4e-7*math.pi; G = 9.8; U = 1.66e-27

# ---- U1 쿨롱·전기장 ----
reg("u1-l2-01")(lambda p: K*p["q1"]*1e-6*p["q2"]*1e-6/(p["r"]/100)**2)
reg("u1-l2-02")(lambda p: K*p["q"]*1e-9/(p["r"]/100)**2)
@reg("u1-l2-03")
def _(p):
    F = QE*p["E"]
    return {"F": F, "a": F/ME}
reg("u1-l2-04")(lambda p: p["Q"]*1e-6/QE)
reg("u1-l2-05")(lambda p: {"E": 0.0, "dir": 1.0})
@reg("u1-l2-06")
def _(p):
    a = p["a"]/100; y = p["y"]/100; r = math.hypot(a, y)
    return 2*K*p["q"]*1e-6/r**2*(y/r)
@reg("u1-l2-07")
def _(p):
    x = sp.symbols("x", positive=True)
    sol = sp.solve(sp.Eq(1/x**2, p["k"]/(p["d"]-x)**2), x)
    xs = [float(s) for s in sol if 0 < float(s) < p["d"]]
    return xs[0]
reg("u1-l2-08")(lambda p: p["m"]/1000*G/p["E"]*1e6)
reg("u1-l2-09")(lambda p: 2*K*(p["q"]*1e-9*p["d"]*1e-3)/(p["z"]/100)**3)
@reg("u1-l2-10")
def _(p):
    pm = p["pm"]*1e-9
    return {"tau": pm*p["E"]*math.sin(math.radians(p["th"])),
            "U": -pm*p["E"]*math.cos(math.radians(p["th"]))}
@reg("u1-l2-11")
def _(p):
    a = QE*p["E"]/ME; t = p["L"]/100/(p["v0"]*1e6)
    return 0.5*a*t*t*1000
reg("u1-l2-12")(lambda p: math.sqrt(3)*K*p["q"]*1e-6/(p["a"]/100)**2)
@reg("u1-l3-01")
def _(p):
    a = p["a"]/100; F1 = K*(p["q"]*1e-6)**2/a**2
    return F1*math.sqrt(2)+F1/2
@reg("u1-l3-02")
def _(p):
    th = math.radians(p["th"]); r = 2*p["L"]/100*math.sin(th)
    F = p["m"]/1000*G*math.tan(th)
    return math.sqrt(F*r*r/K)*1e6
reg("u1-l3-03")(lambda p: {"x": p["d"]/3.0, "st": 0.0})
@reg("u1-l3-04")
def _(p):
    R = p["R"]/100; z = p["z"]/100
    return K*p["Q"]*1e-6*z/(z*z+R*R)**1.5
reg("u1-l3-05")(lambda p: math.sqrt(p["pm"]*1e-9*p["E"]/(p["I"]*1e-12)))
@reg("u1-l3-06")
def _(p):
    q = p["Q"]/2
    return {"q": q, "F": K*(q*1e-6)**2/(p["r"]/100)**2}
reg("u1-l3-07")(lambda p: K*QE**2/(6.67e-11*ME*MP))
@reg("u1-l3-08")
def _(p):
    d = p["d"]/100; qq = (p["q"]*1e-6)**2
    return -K*qq/d**2+K*qq/(4*d*d)
@reg("u1-l3-09")
def _(p):
    a = QE*p["E"]/ME; t = p["t"]*1e-9
    return {"v": a*t, "d": 0.5*a*t*t*100}
@reg("u1-l3-10")
def _(p):
    r2 = (p["a"]/100)**2/2
    E1 = K*p["q"]*1e-6/r2
    return 2*math.sqrt(2)*E1
@reg("u1-l3-11")
def _(p):
    R = p["R"]/100; th = math.radians(p["th"])
    return K*p["lam"]*1e-9*2*math.sin(th/2)/R
@reg("u1-l3-12")
def _(p):
    F = p["q"]*1e-6*p["E"]*1e4; W = p["m"]/1000*G
    return {"th": math.degrees(math.atan2(F, W)), "T": math.hypot(F, W)}
reg("u1-l3-13")(lambda p: QE*p["E"]/(ME*G))
@reg("u1-l3-14")
def _(p):
    a = p["a"]/100
    r1 = math.sqrt(2)*a; E1 = K*p["q1"]*1e-6/r1**2
    E2 = K*p["q2"]*1e-6/a**2
    return {"Ex": E1/math.sqrt(2), "Ey": E1/math.sqrt(2)-E2}
@reg("u1-l4-02")
def _(p):
    d = p["d"]/100
    keff = 4*K*p["Q"]*1e-6*p["q"]*1e-6/d**3
    return {"keff": keff, "T": 2*math.pi*math.sqrt(p["m"]/1000/keff)}
@reg("u1-l4-04")
def _(p):
    q = p["q"]*1e-9; d = p["d"]*1e-3; z = p["z"]/100
    Eex = K*q*(1/(z-d/2)**2-1/(z+d/2)**2)
    Eap = 2*K*q*d/z**3
    return {"Eex": Eex, "Eap": Eap, "err": (Eex-Eap)/Eex*100}
@reg("u1-l4-05")
def _(p):
    V = 4/3*math.pi*(p["r"]*1e-6)**3; W = 900*V*G
    q = W/(p["E"]*1e5)
    return {"W": W, "q": q, "n": q/QE}
@reg("u1-l4-06")
def _(p):
    v0 = p["V0"]*1e7; E = p["E"]*1e4; L = p["L"]/100; D = p["D"]/100
    a = QE*E/ME; t = L/v0
    y1 = 0.5*a*t*t; tan = a*t/v0
    return {"y1": y1*100, "tan": tan, "y": (y1+D*tan)*100}
@reg("u1-l4-07")
def _(p):
    return {"E": K*p["q"]*1e-6/(p["a"]/100)**2, "dir": -1.0}
@reg("u1-l4-08")
def _(p):
    a = p["a"]/100; q = p["q"]*1e-6
    E1 = K*q/a**2
    Ex = E1-E1/math.sqrt(2)
    return math.hypot(Ex, Ex)

# ---- U2 가우스 ----
reg("u2-l2-01")(lambda p: p["E"]*p["A"]*math.cos(math.radians(p["th"])))
reg("u2-l2-02")(lambda p: (p["q1"]+p["q2"])*1e-6/E0)
reg("u2-l2-03")(lambda p: p["lam"]*1e-6/(2*math.pi*E0*p["r"]/100))
reg("u2-l2-04")(lambda p: p["sig"]*1e-6/(2*E0))
reg("u2-l2-05")(lambda p: p["sig"]*1e-6/E0)
reg("u2-l2-06")(lambda p: K*p["Q"]*1e-6*(p["r"]/100)/(p["R"]/100)**3)
reg("u2-l2-07")(lambda p: K*p["Q"]*1e-6/(p["r"]/100)**2)
@reg("u2-l2-08")
def _(p):
    return {"Ein": p["sig"]*1e-6/E0, "Eout": 0.0}
@reg("u2-l2-09")
def _(p):
    F = p["q"]*1e-6/E0
    return {"F": F, "F6": F/6}
reg("u2-l2-10")(lambda p: p["q"]*1e-6/(8*E0))
@reg("u2-l2-11")
def _(p):
    return {"Ein": 0.0, "Eout": p["lam"]*1e-6/(2*math.pi*E0*p["r"]/100)}
@reg("u2-l2-12")
def _(p):
    R = p["R"]/100
    return {"rho": p["Q"]/(4/3*math.pi*R**3), "sig": p["Q"]/(4*math.pi*R*R)}
@reg("u2-l3-01")
def _(p):
    R = p["R"]/100
    return {"Emax": K*p["Q"]*1e-6/R**2, "rin": p["R"]/2, "rout": p["R"]*math.sqrt(2)}
reg("u2-l3-02")(lambda p: {"qin": -float(p["q"]), "qout1": float(p["q"]), "qout2": float(p["q"]+p["Q"])})
@reg("u2-l3-03")
def _(p):
    r = sp.symbols("r", positive=True)
    R = p["R"]/100; a = p["a"]*1e-6
    Q = float(sp.integrate(a*r*4*sp.pi*r**2, (r, 0, R)))*1e6
    E = a*(R/2)**2/(4*E0)
    return {"Q": Q, "E": E}
@reg("u2-l3-04")
def _(p):
    EL = (p["s1"]+p["s2"])*1e-6/(2*E0); EM = abs(p["s1"]-p["s2"])*1e-6/(2*E0)
    return {"EL": EL, "EM": EM, "ER": EL}
@reg("u2-l3-05")
def _(p):
    return {"E": p["lam"]*1e-6/(2*math.pi*E0*p["r"]/100), "Ewall": 0.0, "lin": -float(p["lam"])}
reg("u2-l3-06")(lambda p: p["q"]*1e-9/E0)
reg("u2-l3-07")(lambda p: {"near": -p["sig"]/2, "far": p["sig"]/2, "Ein": 0.0})
reg("u2-l3-08")(lambda p: {"wall": -float(p["q"]), "out": float(p["q"]+p["Q"]), "dep": 0.0})
@reg("u2-l3-09")
def _(p):
    z = p["z"]/100; R = p["R"]/100
    return p["sig"]*1e-6/(2*E0)*(1-z/math.hypot(z, R))
reg("u2-l3-10")(lambda p: (p["sig"]*1e-6)**2*p["A"]/(2*E0))
@reg("u2-l3-11")
def _(p):
    z = p["z"]/100; R = p["R"]/100
    return p["sig"]*1e-6/(2*E0)*(z/math.hypot(z, R))
reg("u2-l3-12")(lambda p: p["q"]*1e-6/(2*E0))
reg("u2-l3-13")(lambda p: p["rho"]*1e-6*(p["d"]/100)/(3*E0))
@reg("u2-l3-14")
def _(p):
    R = p["R"]/100; rho = p["rho"]*1e-6
    return {"Ein": rho*(R/2)/(2*E0), "Es": rho*R/(2*E0), "Eout": rho*R*R/(2*E0*2*R)}
@reg("u2-l4-02")
def _(p):
    R1 = p["R1"]/100; R2 = p["R2"]/100; r = 0.15
    Qsh = p["rho"]*(4/3*math.pi*(R2**3-R1**3))
    qenc = p["q"]+p["rho"]*(4/3*math.pi*(r**3-R1**3))
    return {"Qsh": Qsh, "E15": K*qenc*1e-6/r**2, "E30": K*(p["q"]+Qsh)*1e-6/0.09}
@reg("u2-l4-04")
def _(p):
    r = sp.symbols("r", positive=True)
    R = p["R"]/100; r0 = p["rho0"]*1e-6
    Q = float(sp.integrate(r0*(1-r/R)*4*sp.pi*r**2, (r, 0, R)))*1e6
    rm = 2*R/3
    Em = r0*rm*(4-3*rm/R)/(12*E0)
    return {"Q": Q, "rm": rm*100, "Em": Em}
@reg("u2-l4-05")
def _(p):
    s = p["s"]*1e-6; e2 = 2*E0
    E12 = (s+2*s-s)/e2; E23 = (s-2*s-s)/e2
    return {"E12": abs(E12), "d12": 1.0 if E12 > 0 else -1.0,
            "E23": abs(E23), "d23": 1.0 if E23 >= 0 else -1.0}
@reg("u2-l4-06")
def _(p):
    E = p["sig"]*1e-6/E0
    return p["m"]*1e-6*G/E*1e9
@reg("u2-l4-07")
def _(p):
    lt = p["lam"]+p["lam2"]
    E = lt*1e-6/(2*math.pi*E0*p["r"]/100)
    return {"E": E, "zero": 0.0 if lt == 0 else -1.0}
@reg("u2-l4-08")
def _(p):
    L = p["L"]/100
    F = p["a"]*L**3
    return {"F": F, "q": F*E0*1e12}

# ---- U3 전위 ----
reg("u3-l2-01")(lambda p: K*p["q"]*1e-6/(p["r"]/100))
reg("u3-l2-02")(lambda p: p["q"]*1e-6*p["dV"]*1000)
@reg("u3-l2-03")
def _(p):
    E = p["V"]*QE
    return {"E": E, "v": math.sqrt(2*E/ME)}
reg("u3-l2-04")(lambda p: -p["E"]*p["d"]/100)
@reg("u3-l2-05")
def _(p):
    return {"V": 0.0, "E": 2*K*p["q"]*1e-6/(p["d"]/200)**2}
@reg("u3-l2-06")
def _(p):
    x = sp.symbols("x")
    V = p["a"]*x**2-p["b"]*x
    return float(-sp.diff(V, x).subs(x, p["x"]))
@reg("u3-l2-07")
def _(p):
    V = K*p["Q"]*1e-6/(p["R"]/100)
    return {"Vs": V, "Vc": V}
reg("u3-l2-08")(lambda p: K*p["Q"]*1e-6/math.hypot(p["z"]/100, p["R"]/100))
@reg("u3-l2-09")
def _(p):
    Uu = K*p["q1"]*1e-6*p["q2"]*1e-6/(p["r"]/100)
    return {"U": Uu, "KE": Uu}
reg("u3-l2-10")(lambda p: p["dV"]/p["E"]*1000)
reg("u3-l2-11")(lambda p: 3*K*(p["q"]*1e-6)**2/(p["a"]/100))
reg("u3-l2-12")(lambda p: p["lam"]*1e-6/(2*math.pi*E0)*math.log(p["k"]))
@reg("u3-l3-01")
def _(p):
    Vs = K*p["Q"]*1e-6/(p["R"]/100)
    return {"Vs": Vs, "V0": 1.5*Vs}
@reg("u3-l3-02")
def _(p):
    Uu = K*p["Q"]*1e-6*p["q"]*1e-6/(p["r0"]/100)
    return math.sqrt(2*Uu/(p["m"]/1000))
reg("u3-l3-03")(lambda p: K*2*p["Z"]*QE**2/(p["E0"]*1e6*QE)*1e15)
@reg("u3-l3-04")
def _(p):
    z = sp.symbols("z", positive=True)
    V = K*p["Q"]*1e-6/sp.sqrt(z**2+(p["R"]/100)**2)
    return float(-sp.diff(V, z).subs(z, p["z"]/100))
@reg("u3-l3-05")
def _(p):
    q1 = p["Q"]*p["R1"]/(p["R1"]+p["R2"]); q2 = p["Q"]-q1
    return {"q1": q1, "q2": q2, "V": K*q1*1e-6/(p["R1"]/100)}
@reg("u3-l3-06")
def _(p):
    E = p["V"]/(p["d"]/100)
    v = math.sqrt(2*QE*p["V"]/ME)
    a = QE*E/ME
    return {"E": E, "v": v, "t": v/a*1e9}
reg("u3-l3-07")(lambda p: K*p["pm"]*1e-9*math.cos(math.radians(p["th"]))/(p["r"]/100)**2)
reg("u3-l3-08")(lambda p: (4+math.sqrt(2))*K*(p["q"]*1e-6)**2/(p["a"]/100))
@reg("u3-l3-09")
def _(p):
    x, y = sp.symbols("x y")
    V = p["a"]*x**2*y-p["b"]*y**2
    Ex = float(-sp.diff(V, x).subs({x: p["x"], y: p["y"]}))
    Ey = float(-sp.diff(V, y).subs({x: p["x"], y: p["y"]}))
    return {"Ex": Ex, "Ey": Ey, "E": math.hypot(Ex, Ey)}
@reg("u3-l3-10")
def _(p):
    v = p["v"]*1e7
    return {"V": 0.5*ME*v*v/QE, "ratio": 1836.0}
@reg("u3-l3-11")
def _(p):
    q = p["q"]*1e-6
    return K*q*(1/(p["R1"]/100)-1/(p["R2"]/100)+1/(p["R3"]/100))
@reg("u3-l3-12")
def _(p):
    Uu = -K*QE**2/(p["r"]*1e-9)/QE
    return {"U": Uu, "K": -Uu/2, "E": Uu/2}
@reg("u3-l3-13")
def _(p):
    R = p["R"]/100
    return {"V": p["Eb"]*1e6*R/1000, "Q": p["Eb"]*1e6*R*R/K*1e6}
@reg("u3-l3-14")
def _(p):
    return {"W": p["q"]*1e-6*(p["V1"]-p["V2"])*1000, "same": 1.0}
@reg("u3-l4-02")
def _(p):
    R = p["R"]/100
    Vs = K*p["Q"]*1e-6/R
    Vh = K*p["Q"]*1e-6/(2*R)*(3-0.25)
    return {"Vs": Vs, "Vh": Vh, "W": -(1.5*Vs-Vs)}
@reg("u3-l4-04")
def _(p):
    R = p["R"]/100
    dV = K*p["Q"]*1e-6*(1/R-1/(math.sqrt(2)*R))
    return math.sqrt(2*p["q"]*1e-6*dV/(p["m"]/1000))
@reg("u3-l4-05")
def _(p):
    E = p["V"]*1e6*p["q"]
    return {"E": E, "m": E/(4186*100)}
@reg("u3-l4-06")
def _(p):
    return {"E": p["dV"]/(p["d"]/1000), "W": p["q"]*1e-6*3*p["dV"]*1000, "W2": 0.0}
reg("u3-l4-07")(lambda p: -K*QE**2/(p["d"]*1e-9)/QE)
@reg("u3-l4-08")
def _(p):
    R1 = p["R1"]/100; R2 = p["R2"]/100; Q = p["Q"]*1e-6
    return {"U1": K*Q*Q/(2*R1), "U2": K*Q*Q/(2*(R1+R2))}

# ---- U4 축전기 ----
reg("u4-l2-01")(lambda p: E0*p["A"]*1e-4/(p["d"]*1e-3)*1e12)
reg("u4-l2-02")(lambda p: {"Q": p["C"]*p["V"], "U": 0.5*p["C"]*p["V"]**2})
reg("u4-l2-03")(lambda p: {"Ceq": float(p["C1"]+p["C2"]), "Q1": p["C1"]*p["V"], "Q2": p["C2"]*p["V"]})
@reg("u4-l2-04")
def _(p):
    Ce = p["C1"]*p["C2"]/(p["C1"]+p["C2"]); Q = Ce*p["V"]
    return {"Ceq": Ce, "Q": Q, "V1": Q/p["C1"], "V2": Q/p["C2"]}
reg("u4-l2-05")(lambda p: p["C0"]*p["kap"])
@reg("u4-l2-06")
def _(p):
    E = p["V"]/(p["d"]*1e-3)
    return {"E": E/1000, "s": E0*E*1e6}
@reg("u4-l2-07")
def _(p):
    u = 0.5*E0*(p["E"]*1e6)**2
    return {"u": u, "EL": u}
@reg("u4-l2-08")
def _(p):
    return {"C": (p["R"]/100)/K*1e12, "Cearth": 6.4e6/K*1e6}
@reg("u4-l2-09")
def _(p):
    return {"Q": p["kap"]*p["C0"]*p["V"], "U": 0.5*p["kap"]*p["C0"]*p["V"]**2}
reg("u4-l2-10")(lambda p: {"V": p["V0"]/p["kap"], "ratio": 1.0/p["kap"]})
@reg("u4-l2-11")
def _(p):
    Cp = p["C1"]+p["C2"]; Ce = Cp*p["C3"]/(Cp+p["C3"])
    return {"Ceq": Ce, "V3": Ce*p["V"]/p["C3"]}
reg("u4-l2-12")(lambda p: {"Vmax": float(p["n"]*p["Vr"]), "Ceq": p["C"]/p["n"]})
@reg("u4-l3-01")
def _(p):
    Q = p["C1"]*p["V1"]; V = Q/(p["C1"]+p["C2"])
    U0 = 0.5*p["C1"]*p["V1"]**2; U1 = 0.5*(p["C1"]+p["C2"])*V*V
    return {"V": V, "dU": U0-U1}
reg("u4-l3-02")(lambda p: p["C0"]/2*(1+p["kap"]))
reg("u4-l3-03")(lambda p: 2*p["kap"]/(1+p["kap"])*p["C0"])
@reg("u4-l3-04")
def _(p):
    U0 = 0.5*p["C0"]*p["V0"]**2
    return {"V": p["V0"]*p["k"], "dU": U0*p["k"]-U0}
@reg("u4-l3-05")
def _(p):
    Uu = 0.5*p["C"]*1e-12*p["V"]**2*1e9
    return {"U": Uu, "U2": Uu}
@reg("u4-l3-06")
def _(p):
    Ce = p["kap"]*p["C"]/(1+p["kap"]); Q = Ce*p["V"]
    return {"Ceq": Ce, "V1": Q/p["C"]}
reg("u4-l3-07")(lambda p: 2*math.pi*E0*p["L"]/100/math.log(p["b_a"])*1e12)
@reg("u4-l3-08")
def _(p):
    Q = p["C"]*1e-12*p["V"]
    return 0.5*Q*p["V"]/(p["d"]*1e-3)*1000
@reg("u4-l3-09")
def _(p):
    q = sp.symbols("q", positive=True)
    Q = p["C"]*p["V"]
    W = float(sp.integrate(q/p["C"], (q, 0, Q)))
    return {"U": W, "QV": Q*p["V"]}
@reg("u4-l3-10")
def _(p):
    Ce = p["C"]/2+p["C"]
    return {"Ceq": Ce, "U": 0.5*Ce*p["V"]**2}
@reg("u4-l3-11")
def _(p):
    Q = p["kap"]*p["C0"]*p["V0"]
    U0 = 0.5*p["kap"]*p["C0"]*p["V0"]**2
    return Q*Q/(2*p["C0"])-U0
@reg("u4-l3-12")
def _(p):
    dU = 0.5*p["C0"]*p["V"]**2*(1-p["kap"])
    dQ = p["C0"]*p["V"]*(1-p["kap"])
    return {"dU": dU, "Wbat": -dQ*p["V"]}
@reg("u4-l3-13")
def _(p):
    a = p["a"]/100; b = p["b"]/100
    return a*b/(b-a)/K*1e12
@reg("u4-l3-14")
def _(p):
    tau = p["R"]*1000*p["C"]*1e-6
    return {"tau": tau, "t63": tau}
@reg("u4-l4-02")
def _(p):
    Ce = p["C1"]*p["C2"]/(p["C1"]+p["C2"]); Q = Ce*p["V"]
    U0 = 0.5*Ce*p["V"]**2
    V1 = 2*Q/(p["C1"]+p["C2"])
    return {"V1": V1, "dU": 0.5*(p["C1"]+p["C2"])*V1*V1-U0}
@reg("u4-l4-04")
def _(p):
    n = p["Vt"]/p["Vr"]
    return {"n": n, "m": n, "total": n*n}
@reg("u4-l4-05")
def _(p):
    C = p["C0"]/2*(1+p["kap"])
    dQ = (C-p["C0"])*p["V"]
    return {"C": C, "dQ": dQ, "Wb": dQ*p["V"], "dU": 0.5*(C-p["C0"])*p["V"]**2}
@reg("u4-l4-06")
def _(p):
    d = 2*p["V"]/(p["Eb"]*1e6)*1e6
    return {"d": d, "C": p["kap"]*E0*p["A"]*1e-4/(d*1e-6)*1e9}
@reg("u4-l4-07")
def _(p):
    return {"Ceq": float(p["C"]), "Veach": p["V"]/2, "U": 0.5*p["C"]*(p["V"]/2)**2, "Vfault": float(p["V"])}
reg("u4-l4-08")(lambda p: (p["kap"]-1)*p["C0"]*1e-12*p["V"]**2/(2*p["L"]/100)*1e6)

# ---- U5 전류·DC ----
@reg("u5-l2-01")
def _(p):
    A = math.pi*(p["d"]*1e-3/2)**2
    return p["I"]/(8.5e28*QE*A)*1000
@reg("u5-l2-02")
def _(p):
    A = math.pi*(p["d"]*1e-3/2)**2
    return 1.7e-8*p["L"]/A
reg("u5-l2-03")(lambda p: p["kL"]/p["kd"]**2)
reg("u5-l2-04")(lambda p: p["R0"]*(1+3.9e-3*p["dT"]))
@reg("u5-l2-05")
def _(p):
    I = p["emf"]/(p["r"]+p["R"]); V = p["emf"]-I*p["r"]
    return {"I": I, "V": V, "eff": V/p["emf"]*100}
@reg("u5-l2-06")
def _(p):
    E = p["P"]/1000*p["h"]*30
    return {"E": E, "cost": E*p["c"]}
@reg("u5-l2-07")
def _(p):
    I = p["emf"]/(p["R1"]+p["R2"])
    return {"P1": I*I*p["R1"], "P2": I*I*p["R2"]}
reg("u5-l2-08")(lambda p: {"I": (p["P1"]+p["P2"])/p["V"], "bright": 1.0})
@reg("u5-l2-09")
def _(p):
    Rp = p["R2"]*p["R3"]/(p["R2"]+p["R3"]); I = p["emf"]/(p["R1"]+Rp)
    return {"I": I, "I2": I*p["R3"]/(p["R2"]+p["R3"])}
@reg("u5-l2-10")
def _(p):
    tau = p["R"]*1000*p["C"]*1e-6
    return {"tau": tau, "v": 10*(1-math.exp(-p["t"]/tau))}
@reg("u5-l2-11")
def _(p):
    Q = p["I"]*p["t"]*60
    return {"Q": Q, "n": Q/QE}
@reg("u5-l2-12")
def _(p):
    A = math.pi*(p["d"]/2)**2
    return {"J": p["I"]/A, "I2": 4.0*p["I"]}
@reg("u5-l3-01")
def _(p):
    v = sp.symbols("v")
    vv = float(sp.solve(sp.Eq((p["e1"]-v)/p["R1"]+(p["e2"]-v)/p["R2"], v/p["R3"]), v)[0])
    return vv/p["R3"]
@reg("u5-l3-02")
def _(p):
    R1 = p["V"]**2/p["P1"]; R2 = p["V"]**2/p["P2"]
    I = p["V"]/(R1+R2)
    return {"Pa": I*I*R1, "Pb": I*I*R2}
reg("u5-l3-03")(lambda p: {"R": float(p["r"]), "P": p["emf"]**2/(4*p["r"]), "eff": 50.0})
@reg("u5-l3-04")
def _(p):
    tau = p["R"]*1000*p["C"]*1e-6
    return {"t": -tau*math.log(p["f"]), "i": p["V0"]*p["f"]/(p["R"]*1000)*1e6}
reg("u5-l3-05")(lambda p: {"Iratio": 1.0, "J": float(p["k"]**2), "v": float(p["k"]**2)})
@reg("u5-l3-06")
def _(p):
    I = p["emf"]/(p["r"]/p["n"]+p["R"]); I1 = p["emf"]/(p["r"]+p["R"])
    return {"I": I, "imp": (I/I1-1)*100}
reg("u5-l3-07")(lambda p: p["R2"]*p["R3"]/p["R1"])
@reg("u5-l3-08")
def _(p):
    Rp = p["R"]*p["Rv"]*1000/(p["R"]+p["Rv"]*1000)
    return (1-Rp/p["R"])*100
@reg("u5-l3-09")
def _(p):
    Q = p["C"]*p["emf"]
    return {"Eb": Q*p["emf"], "Ec": 0.5*Q*p["emf"], "Er": 0.5*Q*p["emf"]}
@reg("u5-l3-10")
def _(p):
    I = p["P"]/p["V"]
    Rmax = p["loss"]/100*p["P"]/(I*I)
    return {"Rmax": Rmax, "A": 1.7e-8*2*p["L"]/Rmax*1e6}
reg("u5-l3-11")(lambda p: ME/(8.5e28*QE**2*p["tau"]*1e-14))
@reg("u5-l3-12")
def _(p):
    P = p["V"]*p["Imax"]/1000
    return {"P": P, "n": float(math.floor(P/1.5))}
@reg("u5-l3-13")
def _(p):
    tau = p["R"]*1000*p["C"]*1e-6
    return {"t50": tau*math.log(2), "t90": tau*math.log(10)}
@reg("u5-l3-14")
def _(p):
    Uu = 0.5*p["C"]*1e-6*(p["V"]*1000)**2
    return {"U": Uu, "P": Uu/(p["t"]/1000)/1000}
@reg("u5-l4-02")
def _(p):
    v = sp.symbols("v")
    R = p["R"]
    vv = float(sp.solve(sp.Eq((p["e1"]-v)/(2*R)+(p["e2"]-v)/(2*R), v/R), v)[0])
    return {"I": vv/R, "dir": 1.0}
@reg("u5-l4-04")
def _(p):
    Is = 4*1.5/(4*0.5+p["R"]); Ib = 2*1.5/(0.5+p["R"]); Ip = 1.5/(0.125+p["R"])
    best = 1.0 if Is >= Ib and Is >= Ip else (2.0 if Ib >= Ip else 3.0)
    return {"Is": Is, "Ib": Ib, "Ip": Ip, "best": best}
@reg("u5-l4-05")
def _(p):
    return {"i0": p["emf"]/p["R1"], "vinf": p["emf"]*p["R2"]/(p["R1"]+p["R2"]),
            "tau": p["R1"]*p["R2"]/(p["R1"]+p["R2"])*p["C"]}
@reg("u5-l4-06")
def _(p):
    Rh = p["V"]**2/p["P"]
    return 20+(Rh/p["Rc"]-1)/4.5e-3
@reg("u5-l4-07")
def _(p):
    tau = p["R"]*1e6*p["C"]*1e-6
    return tau*math.log(p["emf"]/(p["emf"]-p["Vf"]))
@reg("u5-l4-08")
def _(p):
    Uu = 0.5*p["C"]*p["V"]**2/3600
    return {"U": Uu, "ratio": p["Wh"]/Uu}

# ---- U6 자기력 ----
@reg("u6-l2-01")
def _(p):
    F = QE*p["v"]*1e6*p["B"]*math.sin(math.radians(p["th"]))
    return {"F": F, "a": F/MP}
@reg("u6-l2-02")
def _(p):
    v = math.sqrt(2*QE*p["V"]/ME)
    return {"v": v, "r": ME*v/(QE*p["B"])*1000}
@reg("u6-l2-03")
def _(p):
    return {"fp": QE*p["B"]/(2*math.pi*MP)/1e6, "fe": QE*p["B"]/(2*math.pi*ME)/1e6}
reg("u6-l2-04")(lambda p: {"v": p["E"]*1e5/p["B"], "fast": 1.0})
reg("u6-l2-05")(lambda p: p["I"]*p["L"]*p["B"]*math.sin(math.radians(p["th"])))
reg("u6-l2-06")(lambda p: p["lam"]/1000*G/p["B"])
reg("u6-l2-07")(lambda p: p["N"]*p["I"]*p["A"]*1e-4*p["B"])
reg("u6-l2-08")(lambda p: p["I"]*p["B"]/(8.5e28*QE*p["t"]*1e-3)*1e6)
@reg("u6-l2-09")
def _(p):
    T = 2*math.pi*ME/(QE*p["B"])*1e9
    return {"T": T, "T2": T}
@reg("u6-l2-10")
def _(p):
    v = p["v"]*1e6; th = math.radians(p["th"])
    r = MP*v*math.sin(th)/(QE*p["B"])*1000
    T = 2*math.pi*MP/(QE*p["B"])
    return {"r": r, "pitch": v*math.cos(th)*T*1000}
reg("u6-l2-11")(lambda p: p["B"]*p["L"]*p["v"])
reg("u6-l2-12")(lambda p: {"W": 0.0, "ratio": 1.0})
@reg("u6-l3-01")
def _(p):
    m = p["A"]*U
    v = math.sqrt(2*QE*p["V"]*1000/m)
    return {"r": m*v/(QE*p["B"])*100, "ratio": math.sqrt(14/12)}
reg("u6-l3-02")(lambda p: p["E"]*1e4/(0.05*p["B"]**2))
@reg("u6-l3-03")
def _(p):
    v = p["v"]*1e6
    r = ME*v/(QE*p["B"])*1000
    return {"r": r, "t": math.pi*ME/(QE*p["B"])*1e9, "d": 2*r}
reg("u6-l3-04")(lambda p: p["I"]*p["L"]/100*p["B"])
reg("u6-l3-05")(lambda p: p["kappa"]*1e-8/(p["N"]*p["A"]*1e-4*p["B"])*1e6)
@reg("u6-l3-06")
def _(p):
    v = QE*p["B"]*p["R"]/MP
    return {"v": v, "E": 0.5*MP*v*v/QE/1e6}
@reg("u6-l3-07")
def _(p):
    E = p["V"]/(p["d"]/100)
    return {"v": E/p["B"], "slow": 1.0}
reg("u6-l3-08")(lambda p: p["m"]/1000*G*math.tan(math.radians(p["th"]))/(p["B"]*p["L"]))
@reg("u6-l3-09")
def _(p):
    n = p["I"]*1e-3*p["B"]/(QE*p["t"]*1e-3*p["VH"]*1e-3)
    return {"n": n, "carrier": 1.0}
@reg("u6-l3-10")
def _(p):
    thm = math.degrees(math.asin(math.sqrt(1.0/p["k"])))
    return {"thm": thm, "refl": 1.0 if p["th"] > thm else 0.0}
reg("u6-l3-11")(lambda p: math.sqrt(4*U/MP*0.5))
@reg("u6-l3-12")
def _(p):
    mu = p["I"]*(p["a"]/100)**2
    return {"tau": mu*p["B"]*math.sin(math.radians(p["th"])),
            "dU": mu*p["B"]*(1-math.cos(math.radians(p["th"])))*1000}
@reg("u6-l3-13")
def _(p):
    v = math.sqrt(2*QE*p["V"]*1000/ME)
    r = ME*v/(QE*5e-5)
    return p["L"]**2/(2*r)*1e6
@reg("u6-l3-14")
def _(p):
    return {"B": p["m"]/1000*G/(p["I"]*p["L"]/100), "flip": -1.0}
@reg("u6-l4-02")
def _(p):
    def r(mu):
        m = mu*U
        return math.sqrt(2*m*QE*p["V"]*1000)/(QE*p["B"])
    return 2*(r(20+p["dm"])-r(20))*1000
@reg("u6-l4-04")
def _(p):
    KE = p["E"]*1e6*QE
    v = math.sqrt(2*KE/MP)
    return {"R": MP*v/(QE*p["B"]), "f": QE*p["B"]/(2*math.pi*MP)/1e6, "n": p["E"]*1e6/(2*50e3)}
@reg("u6-l4-05")
def _(p):
    tmax = p["N"]*p["I"]*p["A"]*1e-4*p["B"]
    tavg = 2/math.pi*tmax
    return {"tmax": tmax, "tavg": tavg, "P": tavg*1000*2*math.pi/60}
reg("u6-l4-06")(lambda p: {"v": p["E"]/p["B"], "sgn": 0.0})
@reg("u6-l4-07")
def _(p):
    m = (QE*0.1*p["r1"]/100)**2/(2*QE*p["V"])
    return {"m": m, "u": m/U}
@reg("u6-l4-08")
def _(p):
    W = p["m"]/1000*G
    return {"I1": p["mu"]*W/(p["B"]*p["L"]), "I2": W/(p["B"]*p["L"])}

# ---- U7 전류의 자기장 ----
reg("u7-l2-01")(lambda p: MU0*p["I"]/(2*math.pi*p["r"]/100)*1e6)
reg("u7-l2-02")(lambda p: MU0*p["N"]*p["I"]/(2*p["R"]/100)*1e6)
reg("u7-l2-03")(lambda p: MU0*p["n"]*p["I"]*1000)
@reg("u7-l2-04")
def _(p):
    return {"F": MU0*p["I"]**2/(2*math.pi*p["d"]/100)*1000, "kind": 1.0}
reg("u7-l2-05")(lambda p: abs(p["I1"]-p["I2"])*2e-7/(p["d"]/200)*1e6)
@reg("u7-l2-06")
def _(p):
    R = p["R"]/100; z = p["z"]/100
    return MU0*p["I"]*R*R/(2*(z*z+R*R)**1.5)*1e6
reg("u7-l2-07")(lambda p: MU0*p["I"]*p["f"]/(2*math.pi*p["R"]*1e-3)*1000)
reg("u7-l2-08")(lambda p: MU0*p["N"]*p["I"]/(2*math.pi*p["r"]/100)*1000)
@reg("u7-l2-09")
def _(p):
    mu = p["I"]*math.pi*(p["R"]/100)**2
    return {"mu": mu, "B": MU0*mu/(2*math.pi)*1e9}
reg("u7-l2-10")(lambda p: p["B"]*1e-3*p["L"]/100/(MU0*p["I"]))
reg("u7-l2-11")(lambda p: MU0*p["I"]/(4*p["R"]/100)*1e6)
@reg("u7-l2-12")
def _(p):
    B1 = 2e-7*p["I1"]/(p["r"]/100)*1e6; B2 = 2e-7*p["I2"]/(p["r"]/100)*1e6
    return math.hypot(B1, B2)
@reg("u7-l3-01")
def _(p):
    F1 = 2e-7*p["I"]**2/(p["d"]/100)*1000
    return {"Fmid": 0.0, "Fend": F1*1.5}
reg("u7-l3-02")(lambda p: p["d"]/(p["k"]-1.0))
reg("u7-l3-03")(lambda p: 2*math.sqrt(2)*MU0*p["I"]/(math.pi*p["a"]/100)*1e6)
@reg("u7-l3-04")
def _(p):
    return {"B": 2e-7*p["I"]/2e-3*1000, "Bout": 0.0}
reg("u7-l3-05")(lambda p: 0.8**1.5*MU0*p["N"]*p["I"]/(p["R"]/100)*1000)
@reg("u7-l3-06")
def _(p):
    F = 2e-7*p["I1"]*p["I2"]*p["L"]/100*(100/p["a"]-100/p["b"])*1e6
    return {"F": F, "dir": 1.0}
@reg("u7-l3-07")
def _(p):
    B = MU0*p["n"]*p["I"]
    return ME*p["v"]*1e6/(QE*B)*1000
@reg("u7-l3-08")
def _(p):
    return {"I": p["Be"]*1e-6*2*(p["R"]/100)/(MU0*p["N"]), "dir": 1.0}
reg("u7-l3-09")(lambda p: MU0*p["K"]/2*1e6)
@reg("u7-l3-10")
def _(p):
    T = 2*math.pi*p["r"]*1e-9/(p["v"]*1e6)
    I = QE/T*1000
    return {"I": I, "B": MU0*I/1000/(2*p["r"]*1e-9)}
@reg("u7-l3-11")
def _(p):
    L = p["L"]/100; d = p["d"]/100
    return 2e-7*p["I"]/d*L/math.sqrt(L*L+4*d*d)*1e6
@reg("u7-l3-12")
def _(p):
    A = math.pi*((p["R"]*1e-3)**2-(p["r"]*1e-3)**2)
    J = p["I"]/A
    return MU0*J*2.5e-3/2*1000
reg("u7-l3-13")(lambda p: p["B"]/(MU0*p["n"]))
@reg("u7-l3-14")
def _(p):
    return MU0*p["I"]**2/math.pi
@reg("u7-l4-02")
def _(p):
    I2 = p["lam"]/1000*G*2*math.pi*(p["d0"]/100)/(MU0*p["I1"])
    return {"I2": I2, "st": 1.0}
@reg("u7-l4-04")
def _(p):
    F1 = 2e-7*p["I"]**2/(p["a"]/100)*1000
    return {"F": math.sqrt(3)*F1, "dir": 1.0}
@reg("u7-l4-05")
def _(p):
    r = sp.symbols("r", positive=True)
    R = p["R"]/100
    I = float(sp.integrate(p["J0"]*(r/R)*2*sp.pi*r, (r, 0, R)))
    Bs = 2e-7*I/R*1e6
    return {"I": I*1000, "Bs": Bs, "Bh": Bs/4}
@reg("u7-l4-06")
def _(p):
    v = math.sqrt(2*QE*p["V"]/ME)
    B = ME*v/(QE*p["rbeam"]/100)
    return B*(p["R"]/100)/(0.8**1.5*MU0*p["N"])
reg("u7-l4-07")(lambda p: p["B"]*1e-6*4*math.pi*(6.37e6)**3/MU0)
@reg("u7-l4-08")
def _(p):
    B = 2*2e-7*p["I"]/(p["d"]/200)*1e6
    return {"B": B, "F": p["q"]*1e-6*p["v"]*1e5*B*1e-6}
