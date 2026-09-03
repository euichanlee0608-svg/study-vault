"""독립 재계산 레지스트리 — solver(JS)와 별도 경로의 sympy/numpy 재계산.
verify_problems.py가 import. 문제 추가 시 여기에 같은 id로 등록해야 게이트를 통과한다."""
import math
import sympy as sp

IND = {}
def reg(pid):
    def deco(fn): IND[pid] = fn; return fn
    return deco

def _nodal(eqs, unknowns, subs=None):
    sol = sp.solve([sp.Eq(l, r) for l, r in eqs], unknowns, dict=True)
    assert len(sol) == 1, f"해가 유일하지 않음: {sol}"
    return {str(k): float(v) for k, v in sol[0].items()}

    def deco(fn): IND[pid] = fn; return fn
    return deco

def _nodal(eqs, unknowns, subs):
    """sympy로 절점/망로 방정식을 그대로 풀어 주는 공용 도우미 (독립 경로)"""
    sol = sp.solve([sp.Eq(l, r) for l, r in eqs], unknowns, dict=True)
    assert len(sol) == 1, f"해가 유일하지 않음: {sol}"
    return {str(k): float(v.subs(subs) if hasattr(v, "subs") else v) for k, v in sol[0].items()}

# ---- U1 회로 기초 ----
reg("u1-l2-01")(lambda p: p["Q"] / p["t"])
@reg("u1-l2-02")
def _(p):
    t = sp.symbols("t"); return float(sp.diff(p["a"]*t**2 + p["b"]*t, t).subs(t, p["t0"]))
reg("u1-l2-03")(lambda p: p["V"] / p["R"] * 1000.0)
reg("u1-l2-04")(lambda p: p["I"] / 1000.0 * p["R"])
reg("u1-l2-05")(lambda p: p["V"] * p["I"] / 1000.0)
reg("u1-l2-06")(lambda p: (p["I"]/1000.0)**2 * p["R"] * 1000.0)
reg("u1-l2-07")(lambda p: p["V"]**2 / p["R"])
reg("u1-l2-08")(lambda p: p["P"] * p["h"] * 3600.0 / 1000.0)
reg("u1-l2-09")(lambda p: p["i2"])
reg("u1-l2-10")(lambda p: p["Vs"] - p["V1"])
reg("u1-l2-11")(lambda p: 1.0 / p["R"] * 1000.0)
reg("u1-l2-12")(lambda p: p["V"] * p["I"])
reg("u1-l2-13")(lambda p: math.sqrt(p["Pmax"] * p["R"]))
reg("u1-l2-14")(lambda p: p["V1"] / (p["I1"]/1000.0))
reg("u1-l2-15")(lambda p: p["P1"] + p["P2"])
@reg("u1-l3-01")
def _(p):
    t = sp.symbols("t"); i = sp.diff(p["a"]*t**2, t)
    return float((i**2 * p["R"]).subs(t, p["t0"]))
@reg("u1-l3-02")
def _(p):
    I = sp.symbols("I")
    s = sp.solve(sp.Eq(p["Vs"], I*(p["R1"]+p["R2"])), I)[0]
    return float(s**2 * p["R2"])
@reg("u1-l3-03")
def _(p):
    iR = sp.symbols("iR")
    return float(sp.solve(sp.Eq(p["Is"], iR + p["k"]*iR), iR)[0])
@reg("u1-l3-04")
def _(p):
    loss = p["I"]**2 * p["R"]
    return {"loss": loss, "store": p["V"]*p["I"] - loss}
reg("u1-l3-05")(lambda p: 0.5 * p["Im"] * p["T"])
@reg("u1-l3-06")
def _(p):
    I, v1 = sp.symbols("I v1")
    sol = sp.solve([sp.Eq(p["Vs"], v1 + p["k"]*v1), sp.Eq(v1, I*p["R1"])], [I, v1], dict=True)[0]
    return float(sol[I])
reg("u1-l3-07")(lambda p: {"I": p["P"]/p["V"], "R": p["V"]**2/p["P"]})
reg("u1-l3-08")(lambda p: p["V"] * (p["G1"] + p["G2"]))
@reg("u1-l3-09")
def _(p):
    Vt = p["Vs"] - p["I"]*p["r"]
    assert Vt > 0, "물리 타당성: 단자 전압 양수"
    return {"Vt": Vt, "eff": Vt/p["Vs"]*100.0}
@reg("u1-l3-10")
def _(p):
    I = p["k"] * p["V"]**2
    return {"I": I, "R": p["V"]/I}
reg("u1-l4-02")(lambda p: p["Vs"]*p["I1"] - p["I1"]**2*p["R1"] - p["Vs"]*0.1)
@reg("u1-l4-03")
def _(p):
    vA, vB = sp.symbols("vA vB")
    sol = sp.solve([
        sp.Eq((vA-vB)/p["R2"], p["k"]*vA),                 # KCL @B
        sp.Eq(p["Is"], vA/p["R1"] + (vA-vB)/p["R2"]),      # KCL @A
    ], [vA, vB], dict=True)[0]
    return float(sol[vA])
@reg("u1-l4-05")
def _(p):
    v = sp.symbols("v")  # 아래 절점 전압 = 전압계가 읽는 값
    eq = sp.Eq((p["Vs"]-v)/p["R"], v/p["R"] + v/p["Rm"])   # 절점 KCL (독립 경로: 분압 공식 미사용)
    Vread = float(sp.solve(eq, v)[0])
    Vtrue = p["Vs"]/2.0
    return {"Vtrue": Vtrue, "Vread": Vread, "err": (Vtrue-Vread)/Vtrue*100.0}


# ---- U2 저항 회로망 ----
def _par(*rs):
    return 1.0/sum(1.0/r for r in rs)

reg("u2-l2-01")(lambda p: p["R1"]+p["R2"]+p["R3"])
reg("u2-l2-02")(lambda p: _par(p["R1"], p["R2"]))
reg("u2-l2-03")(lambda p: _par(*[p["R"]]*int(p["n"])))
reg("u2-l2-04")(lambda p: p["R1"] + _par(p["R2"], p["R3"]))
@reg("u2-l2-05")
def _(p):
    i = sp.symbols("i")  # 독립 경로: 분압 공식 대신 루프 방정식
    iv = sp.solve(sp.Eq(p["Vs"], i*(p["R1"]+p["R2"])), i)[0]
    return float(iv*p["R2"])
@reg("u2-l2-06")
def _(p):
    v = sp.symbols("v")  # 분류 공식 대신 공통 전압으로
    vv = sp.solve(sp.Eq(p["Is"], v/p["R1"]+v/p["R2"]), v)[0]
    return float(vv/p["R1"])
@reg("u2-l2-07")
def _(p):
    i = p["Vs"]/(p["R1"]+p["R2"]); return i*i*p["R2"]
reg("u2-l2-08")(lambda p: _par(p["R1"], p["R2"], p["R3"]))
@reg("u2-l2-09")
def _(p):
    R2 = sp.symbols("R2", positive=True)
    s = sp.solve(sp.Eq(_par_sym(p["R1"], R2), p["Rt"]), R2)
    return float(s[0])
def _par_sym(a, b):
    return a*b/(a+b)
reg("u2-l2-10")(lambda p: p["R"] + _par(p["R"], 2*p["R"]))
reg("u2-l2-11")(lambda p: p["Vs"]*(p["R2"]+p["R3"])/(p["R1"]+p["R2"]+p["R3"]))
reg("u2-l2-12")(lambda p: p["Vs"]*p["x"]/100.0)
@reg("u2-l2-13")
def _(p):
    return p["Vs"]/p["R1"] + p["Vs"]/p["R2"]  # 독립 경로: 가지 전류 합
@reg("u2-l2-14")
def _(p):
    v = sp.symbols("v")  # 절점 방정식으로
    vv = sp.solve(sp.Eq((p["Vs"]-v)/p["R1"], v/p["R2"]+v/p["R3"]), v)[0]
    return float(vv)
reg("u2-l2-15")(lambda p: p["Is"]*p["G1"]/(p["G1"]+p["G2"]+p["G3"]))
@reg("u2-l3-01")
def _(p):
    v = sp.symbols("v")
    VL = float(sp.solve(sp.Eq((p["Vs"]-v)/p["R"], v/p["R"]+v/p["RL"]), v)[0])
    return {"V0": p["Vs"]/2.0, "VL": VL}
reg("u2-l3-02")(lambda p: p["R2"]*p["R3"]/p["R1"])
@reg("u2-l3-03")
def _(p):
    # 독립 경로: 전체를 절점 방정식으로 (접기 미사용)
    v1, v2 = sp.symbols("v1 v2")  # v1: 병렬부, v2: 오른쪽 가지 중간
    R = p["R"]
    sol = sp.solve([
        sp.Eq((p["Vs"]-v1)/R, v1/R + (v1-v2)/R),
        sp.Eq((v1-v2)/R, v2/R),
    ], [v1, v2], dict=True)[0]
    return float(sol[v2])
@reg("u2-l3-04")
def _(p):
    P1 = p["Vs"]**2/p["R1"]; P2 = p["Vs"]**2/p["R2"]
    return {"P1": P1, "P2": P2, "Pt": P1+P2}
@reg("u2-l3-05")
def _(p):
    I = p["Imax"]/1000.0
    R2 = p["Vout"]/I; R1 = (p["Vs"]-p["Vout"])/I  # 독립 경로: R1을 전압강하로
    return {"R1": R1, "R2": R2}
@reg("u2-l3-06")
def _(p):
    v = sp.symbols("v")
    V = float(sp.solve(sp.Eq(p["Is"], v/p["R1"]+v/p["R2"]+v/p["R3"]), v)[0])
    return {"V": V, "I2": V/p["R2"]}
@reg("u2-l3-07")
def _(p):
    return {"Iopen": p["Vs"]/(p["R1"]+p["R2"]), "Iclosed": p["Vs"]/p["R1"]}
@reg("u2-l3-08")
def _(p):
    # 독립 경로: 평형 가정 없이 절점 방정식 전체 풀이 (v_in=1V 인가, R_in=1/I)
    va, vb = sp.symbols("va vb")
    R = p["R"]
    sol = sp.solve([
        sp.Eq((1-va)/R, va/R + (va-vb)/R),
        sp.Eq((1-vb)/R + (va-vb)/R, vb/R),
    ], [va, vb], dict=True)[0]
    Iin = (1-sol[va])/R + (1-sol[vb])/R
    return float(1/Iin)
@reg("u2-l3-09")
def _(p):
    Rw2 = 2*p["Rw"]; I = p["Vs"]/(Rw2+p["RL"])
    return {"VL": I*p["RL"], "Pw": I*I*Rw2}
@reg("u2-l3-10")
def _(p):
    R2 = p["Vs"]/p["I"]-p["R1"]
    assert R2 > 0, "물리 타당성: R2 양수"
    return {"R2": R2, "P2": p["I"]**2*R2}
@reg("u2-l4-02")
def _(p):
    # 독립 경로: 문제 위상 그대로 절점 방정식 (v1: 중간 병렬부, v2: 끝 병렬부)
    v1, v2 = sp.symbols("v1 v2")
    R = p["R"]
    sol = sp.solve([
        sp.Eq((p["Vs"]-v1)/R, v1/R + (v1-v2)/R),
        sp.Eq((v1-v2)/R, v2/R + v2/R),
    ], [v1, v2], dict=True)[0]
    return float(sol[v2]/R)
@reg("u2-l4-03")
def _(p):
    return p["Vs"]*p["R3"]/(p["R1"]+p["R3"]) - p["Vs"]*p["R4"]/(p["R2"]+p["R4"])
@reg("u2-l4-04")
def _(p):
    R2 = p["Rtot"]/p["k"]
    return {"R1": p["Rtot"]-R2, "R2": R2, "Vo": p["Vs"]/p["k"]}

# ---- U3 절점·망로 ----
@reg("u3-l2-01")
def _(p):
    v = sp.symbols("v")
    return float(sp.solve(sp.Eq(p["Is"], v/p["R1"]+v/p["R2"]), v)[0])
@reg("u3-l2-02")
def _(p):
    v1, v2 = sp.symbols("v1 v2")
    sol = sp.solve([sp.Eq(p["Is"], v1/p["R1"]+(v1-v2)/p["R2"]),
                    sp.Eq((v1-v2)/p["R2"], v2/p["R3"])], [v1, v2], dict=True)[0]
    return {"v1": float(sol[v1]), "v2": float(sol[v2])}
reg("u3-l2-03")(lambda p: p["Vs"]/(p["R1"]+p["R2"]))
def _u3_mesh2(p, V2=0.0):
    i1, i2 = sp.symbols("i1 i2")
    sol = sp.solve([sp.Eq(p["Vs" if "Vs" in p else "V1"], i1*p["R1"]+(i1-i2)*p["R2"]),
                    sp.Eq(V2, (i2-i1)*p["R2"]+i2*p["R3"])], [i1, i2], dict=True)[0]
    return float(sol[i1]), float(sol[i2])
@reg("u3-l2-04")
def _(p):
    i1, i2 = _u3_mesh2(p)
    return {"i1": i1, "i2": i2}
@reg("u3-l2-05")
def _(p):
    i1, i2 = _u3_mesh2(p)
    return i1 - i2
@reg("u3-l2-06")
def _(p):
    v2 = sp.symbols("v2")
    return float(sp.solve(sp.Eq((p["Vs"]-v2)/p["R1"], v2/p["R2"]), v2)[0])
@reg("u3-l2-07")
def _(p):
    v1, v2 = sp.symbols("v1 v2")
    sol = sp.solve([sp.Eq(p["Is"], v1/p["R1"]+v2/p["R2"]),
                    sp.Eq(v1-v2, p["Vs"])], [v1, v2], dict=True)[0]
    return {"v1": float(sol[v1]), "v2": float(sol[v2])}
@reg("u3-l2-08")
def _(p):
    i1, i2 = sp.symbols("i1 i2")
    sol = sp.solve([sp.Eq(i1-i2, p["Is"]),
                    sp.Eq(p["Vs"], i1*p["R1"]+i2*p["R3"])], [i1, i2], dict=True)[0]
    return {"i1": float(sol[i1]), "i2": float(sol[i2])}
reg("u3-l2-09")(lambda p: p["Vs"]/p["R1"]+p["Vs"]/p["R2"])
@reg("u3-l2-10")
def _(p):
    v = sp.symbols("v")
    return float(sp.solve(sp.Eq(p["Is"], v/p["R1"]+p["k"]*v/p["R2"]), v)[0])
@reg("u3-l2-11")
def _(p):
    i = sp.symbols("i")
    return float(sp.solve(sp.Eq(p["Vs"], i*p["R1"]+i*p["R2"]+p["k"]*i), i)[0])
@reg("u3-l2-12")
def _(p):
    v1, v2 = sp.symbols("v1 v2")
    sol = sp.solve([sp.Eq(p["I1"], v1/p["R1"]+(v1-v2)/p["R2"]),
                    sp.Eq(p["I2"]+(v1-v2)/p["R2"], v2/p["R3"])], [v1, v2], dict=True)[0]
    return {"v1": float(sol[v1]), "v2": float(sol[v2])}
@reg("u3-l2-13")
def _(p):
    i1, i2 = sp.symbols("i1 i2")
    sol = sp.solve([sp.Eq(p["V1"], i1*p["R1"]+(i1-i2)*p["R2"]),
                    sp.Eq(p["V2"], (i2-i1)*p["R2"]+i2*p["R3"])], [i1, i2], dict=True)[0]
    return {"i1": float(sol[i1]), "i2": float(sol[i2])}
@reg("u3-l2-14")
def _(p):
    v1, v2 = sp.symbols("v1 v2")
    sol = sp.solve([sp.Eq(p["Is"], v1/p["R1"]+(v1-v2)/p["R2"]),
                    sp.Eq((v1-v2)/p["R2"], v2/p["R3"])], [v1, v2], dict=True)[0]
    dv = float(sol[v1]-sol[v2])
    return {"v": dv, "P": dv*dv/p["R2"]}
@reg("u3-l2-15")
def _(p):
    import numpy as np
    A = np.array([[p["G1"]+p["G2"], -p["G2"]], [-p["G2"], p["G2"]+p["G3"]]], float)
    return float(np.linalg.solve(A, [p["I"], 0])[1])
@reg("u3-l3-01")
def _(p):
    v1, v2, v3 = sp.symbols("v1 v2 v3"); R = p["R"]
    sol = sp.solve([sp.Eq(p["Is"], v1/R+(v1-v2)/R),
                    sp.Eq((v1-v2)/R, v2/R+(v2-v3)/R),
                    sp.Eq((v2-v3)/R, v3/R)], [v1, v2, v3], dict=True)[0]
    return float(sol[v3])
@reg("u3-l3-02")
def _(p):
    import numpy as np
    R = p["R"]
    A = np.array([[2*R, -R, 0], [-R, 3*R, -R], [0, -R, 2*R]], float)
    return float(np.linalg.solve(A, [p["Vs"], 0, 0])[2])
@reg("u3-l3-03")
def _(p):
    v1, v2, i = sp.symbols("v1 v2 i")  # i: 전압원 전류(1→2)
    G2 = 1/p["R2"]+1/p["R3"]
    sol = sp.solve([sp.Eq(v1-v2, p["Vs"]),
                    sp.Eq(0, v1/p["R1"] + i),            # KCL@1 (유입 없음, i는 1에서 2로 빠져나감)
                    sp.Eq(i + p["Is"], v2*G2)], [v1, v2, i], dict=True)[0]
    return {"v1": float(sol[v1]), "v2": float(sol[v2]), "i12": float(sol[i])}
@reg("u3-l3-04")
def _(p):
    i1, i2, vI = sp.symbols("i1 i2 vI")
    sol = sp.solve([sp.Eq(i1-i2, p["Is"]),
                    sp.Eq(p["V1"], i1*p["R1"]+vI),                 # 메시1 KVL
                    sp.Eq(vI, i2*(p["R2"]+p["R3"]))],              # 메시2 KVL
                   [i1, i2, vI], dict=True)[0]
    return {"i1": float(sol[i1]), "i2": float(sol[i2]), "vI": float(sol[vI])}
@reg("u3-l3-05")
def _(p):
    v1, v2, ix = sp.symbols("v1 v2 ix")
    sol = sp.solve([sp.Eq(ix, (v1-v2)/p["R2"]),
                    sp.Eq(p["Is"], v1/p["R1"] + ix),
                    sp.Eq(ix, p["k"]*ix)], [v1, v2, ix], dict=True)[0]
    return {"v1": float(sol[v1]), "v2": float(sol[v2])}
@reg("u3-l3-06")
def _(p):
    i1, i2 = sp.symbols("i1 i2")
    sol = sp.solve([sp.Eq(p["Vs"], i1*p["R1"]+(i1-i2)*p["R2"]),
                    sp.Eq(p["k"]*i1, (i2-i1)*p["R2"]+i2*p["R3"])], [i1, i2], dict=True)[0]
    return {"i1": float(sol[i1]), "i2": float(sol[i2])}
@reg("u3-l3-07")
def _(p):
    v2 = sp.symbols("v2")
    G2 = 1/p["R2"]+1/p["R3"]
    v2v = float(sp.solve(sp.Eq((p["Vs"]-v2)/p["R1"]+p["Is"], v2*G2), v2)[0])
    return (p["Vs"]-v2v)/p["R1"]
@reg("u3-l3-08")
def _(p):
    i2, i3 = sp.symbols("i2 i3")
    i1 = p["Is"]
    sol = sp.solve([
        sp.Eq(0, 1*(i2-i1) + sp.Rational(1,2)*i2 + sp.Rational(1,5)*(i2-i3)),
        sp.Eq(0, sp.Rational(1,4)*(i3-i1) + sp.Rational(1,5)*(i3-i2) + sp.Rational(1,3)*i3),
    ], [i2, i3], dict=True)[0]
    return float(sol[i3]-sol[i2])
@reg("u3-l3-09")
def _(p):
    v1, v2 = sp.symbols("v1 v2")
    sol = sp.solve([sp.Eq(p["Is"], v1/p["R1"]+(v1-v2)/p["R2"]),
                    sp.Eq((v1-v2)/p["R2"], v2/p["R3"])], [v1, v2], dict=True)[0]
    v1v, v2v = float(sol[v1]), float(sol[v2])
    Psrc = v1v*p["Is"]
    Pr = v1v**2/p["R1"]+(v1v-v2v)**2/p["R2"]+v2v**2/p["R3"]
    assert abs(Psrc-Pr) < 1e-9*max(1, abs(Psrc)), "전력 수지 불일치"
    return {"Psrc": Psrc, "Pr": Pr}
@reg("u3-l3-10")
def _(p):
    i = p["Vs"]/(p["R1"]+p["R2"])
    return {"a": p["Vs"], "b": i*p["R1"]}
@reg("u3-l4-02")
def _(p):
    v1, v2, v3, i = sp.symbols("v1 v2 v3 i")  # i: 전압원 전류 2→3
    sol = sp.solve([
        sp.Eq(v3-v2, p["V"]),
        sp.Eq(p["I"], v1/p["R2"] + (v1-v2)/p["R1"]),
        sp.Eq((v1-v2)/p["R1"], v2/p["R3"] + i),   # KCL@2
        sp.Eq(i, v3/p["R4"]),                       # KCL@3
    ], [v1, v2, v3, i], dict=True)[0]
    return {"v1": float(sol[v1]), "v2": float(sol[v2]), "v3": float(sol[v3]), "i23": float(sol[i])}
@reg("u3-l4-03")
def _(p):
    import numpy as np
    A = np.array([[p["R1"]+p["R2"], -p["R2"], 0],
                  [-p["R2"], p["R2"]+p["R3"]+p["R4"], -p["R3"]],
                  [0, -p["R3"], p["R3"]+p["R5"]]], float)
    i = np.linalg.solve(A, [p["Vs"], 0, 0])
    return float(i[1]*p["R4"])
@reg("u3-l4-04")
def _(p):
    v1, v2 = sp.symbols("v1 v2")
    sol = sp.solve([sp.Eq(p["Is"], v1/p["R1"]+(v1-v2)/p["R2"]),
                    sp.Eq((v1-v2)/p["R2"]+p["k"]*v1, v2/p["R3"])], [v1, v2], dict=True)[0]
    v1v, v2v = float(sol[v1]), float(sol[v2])
    return {"v1": v1v, "v2": v2v, "Pdep": p["k"]*v1v*v2v}

# ---- U4 회로 정리 ----
reg("u4-l2-01")(lambda p: {"Is": p["Vs"]/p["R"], "R": p["R"]})
reg("u4-l2-02")(lambda p: {"Vs": p["Is"]*p["R"], "R": p["R"]})
@reg("u4-l2-03")
def _(p):
    # 독립 경로: V_T는 절점식, R_T는 시험전원법(전원 단락 후 v_t=1V 인가)
    v = sp.symbols("v")
    VT = float(sp.solve(sp.Eq((p["Vs"]-v)/p["R1"], v/p["R2"]), v)[0])
    it = 1.0/p["R1"] + 1.0/p["R2"]
    return {"VT": VT, "RT": 1.0/it}
@reg("u4-l2-04")
def _(p):
    return {"IN": p["Vs"]/p["R1"], "RN": _par(p["R1"], p["R2"])}
@reg("u4-l2-05")
def _(p):
    RT = p["Voc"]/p["Isc"]
    return {"RT": RT, "Pm": p["Voc"]**2/(4*RT)}
@reg("u4-l2-06")
def _(p):
    i = p["VT"]/(p["RT"]+p["RL"])
    return {"I": i, "V": i*p["RL"], "P": i*i*p["RL"]}
@reg("u4-l2-07")
def _(p):
    return {"RL": p["RT"], "Pm": p["VT"]**2/(4.0*p["RT"]), "eff": 50.0}
@reg("u4-l2-08")
def _(p):
    # 독립 경로: 중첩 대신 절점법 한 방 + 각 기여는 선형계로
    v = sp.symbols("v")
    va = float(sp.solve(sp.Eq((p["V1"]-v)/p["R1"], v/p["R2"]), v)[0])
    vb = float(sp.solve(sp.Eq((p["V2"]-v)/p["R2"], v/p["R1"]), v)[0])
    vfull = float(sp.solve(sp.Eq((p["V1"]-v)/p["R1"] + (p["V2"]-v)/p["R2"], 0), v)[0])
    assert abs((va+vb)-vfull) < 1e-9, "중첩 합 ≠ 전체 해"
    return {"va": va, "vb": vb, "v": vfull}
@reg("u4-l2-09")
def _(p):
    v = sp.symbols("v")
    va = float(sp.solve(sp.Eq((p["Vs"]-v)/p["R1"], v/p["R2"]), v)[0])
    vb = float(sp.solve(sp.Eq(p["Is"], v/p["R1"]+v/p["R2"]), v)[0])
    vfull = float(sp.solve(sp.Eq((p["Vs"]-v)/p["R1"]+p["Is"], v/p["R2"]), v)[0])
    assert abs((va+vb)-vfull) < 1e-9
    return {"va": va, "vb": vb, "v": vfull}
reg("u4-l2-10")(lambda p: p["R3"] + _par(p["R1"], p["R2"]))
@reg("u4-l2-11")
def _(p):
    i = (p["IN"]*p["RN"])/(p["RN"]+p["RL"])  # 테브난 경로 하나로 두 답 모두 대조
    return {"Ia": i, "Ib": i}
reg("u4-l2-12")(lambda p: p["Io1"]*p["Vs2"]/p["Vs1"])
reg("u4-l2-13")(lambda p: {"VT": p["V1"]+p["V2"], "RT": p["R1"]+p["R2"]})
reg("u4-l2-14")(lambda p: {"IN": p["I1"]+p["I2"], "RN": _par(p["R1"], p["R2"])})
@reg("u4-l2-15")
def _(p):
    V = p["VT"]*p["RL"]/(p["RT"]+p["RL"])
    return {"V": V, "r": V/p["VT"]*100.0}
@reg("u4-l3-01")
def _(p):
    v = sp.symbols("v")
    VT = float(sp.solve(sp.Eq((p["Vs"]-v)/p["R1"], v/p["R2"]), v)[0])
    return {"VT": VT, "RT": p["R3"] + _par(p["R1"], p["R2"])}
@reg("u4-l3-02")
def _(p):
    # 독립 경로: 변환 없이 V_oc(절점)·R_T(끄고 접기)
    v = sp.symbols("v")
    VT = float(sp.solve(sp.Eq((p["Vs"]-v)/p["R1"], v/p["R2"]), v)[0])
    return {"VT": VT, "RT": p["R3"] + _par(p["R1"], p["R2"])}
@reg("u4-l3-03")
def _(p):
    v = sp.symbols("v")
    va = float(sp.solve(sp.Eq((p["V1"]-v)/p["R1"], v/p["R2"]), v)[0])
    vb = float(sp.solve(sp.Eq((p["V2"]-v)/p["R2"], v/p["R1"]), v)[0])
    vc = float(sp.solve(sp.Eq(p["Is"], v/p["R1"]+v/p["R2"]), v)[0])
    vfull = float(sp.solve(sp.Eq((p["V1"]-v)/p["R1"] + (p["V2"]-v)/p["R2"] + p["Is"], 0), v)[0])
    assert abs((va+vb+vc)-vfull) < 1e-9
    return {"va": va, "vb": vb, "vc": vc, "v": vfull}
@reg("u4-l3-04")
def _(p):
    VL = p["Voc"]*p["frac"]
    RT = sp.symbols("RT", positive=True)
    return float(sp.solve(sp.Eq(VL, p["Voc"]*p["RL"]/(RT+p["RL"])), RT)[0])
reg("u4-l3-05")(lambda p: 1.0/(1.0/p["R1"]+p["k"]))
@reg("u4-l3-06")
def _(p):
    v = sp.symbols("v")
    VT = float(sp.solve(sp.Eq((p["Vs"]-v)/p["R1"], v/p["R2"]), v)[0])
    RT = _par(p["R1"], p["R2"])
    return {"RL": RT, "Pm": VT*VT/(4*RT)}
@reg("u4-l3-07")
def _(p):
    RL = p["m"]*p["RT"]; i = p["VT"]/(p["RT"]+RL)
    return {"P": i*i*RL, "eff": RL/(p["RT"]+RL)*100.0}
@reg("u4-l3-08")
def _(p):
    VT = p["Vs"]*(p["R3"]/(p["R1"]+p["R3"]) - p["R4"]/(p["R2"]+p["R4"]))
    RT = _par(p["R1"], p["R3"]) + _par(p["R2"], p["R4"])
    return {"VT": VT, "RT": RT}
@reg("u4-l3-09")
def _(p):
    # 독립 경로: I_sc를 절점식으로 (단락 단자 전위 0)
    v = sp.symbols("v")  # 전류원 절점 전압 (단락 시)
    vv = float(sp.solve(sp.Eq(p["Is"], v/p["R1"] + v/p["R2"]), v)[0])
    IN = vv/p["R2"]
    RN = p["R1"]+p["R2"]
    IL = IN*RN/(RN+p["RL"])
    return {"IN": IN, "RN": RN, "IL": IL}
@reg("u4-l3-10")
def _(p):
    v = sp.symbols("v")
    vfull = float(sp.solve(sp.Eq((p["Vs"]-v)/p["R1"]+p["Is"], v/p["R2"]), v)[0])
    return {"v": vfull, "vsum": vfull}
@reg("u4-l4-02")
def _(p):
    v = sp.symbols("v")
    Voc = float(sp.solve(sp.Eq((p["Vs"]-v)/p["R1"]+p["Is"], v/p["R2"]), v)[0])
    RT = p["R3"] + _par(p["R1"], p["R2"])
    return {"Voc": Voc, "RT": RT, "Pm": Voc*Voc/(4*RT)}
@reg("u4-l4-03")
def _(p):
    v = sp.symbols("v")
    Voc = float(sp.solve(sp.Eq(p["Is"], v/p["R1"]+p["k"]*v), v)[0])
    Isc = float(p["Is"])
    return {"Voc": Voc, "Isc": Isc, "RT": Voc/Isc}
@reg("u4-l4-04")
def _(p):
    RL = sp.symbols("RL", positive=True)
    roots = sp.solve(sp.Eq(p["Preq"], p["Vs"]**2*RL/(p["RT"]+RL)**2), RL)
    roots = sorted(float(r) for r in roots)
    assert len(roots) == 2 and roots[0] > 0, f"근 이상: {roots}"
    assert abs(roots[0]*roots[1]-p["RT"]**2) < 1e-6*p["RT"]**2, "비에트(곱=R_T²) 위반"
    return {"RL1": roots[1], "RL2": roots[0]}
