"""course-ml 독립 재계산 — 정보이론·확률 손계산의 별도 구현(log2/지니/베이즈)."""
import math
import sympy as sp

IND = {}
def reg(pid):
    def deco(fn): IND[pid] = fn; return fn
    return deco

def H2(a, b):
    t = a+b
    if t == 0: return 0.0
    x, y = a/t, b/t
    s = 0.0
    if x > 0: s -= x*math.log2(x)
    if y > 0: s -= y*math.log2(y)
    return s

def GN(a, b):
    t = a+b
    if t == 0: return 0.0
    x = a/t
    return 2*x*(1-x)

# ---- U1 ----
@reg("u1-l2-01")
def _(p):
    inp = 2**p["n"]
    return {"inp": float(inp), "fn": float(2**inp)}
reg("u1-l2-02")(lambda p: float(3**p["n"]+1))
@reg("u1-l2-03")
def _(p):
    N = 2**p["n"]
    return {"N": float(N), "t": N/1000}
reg("u1-l2-04")(lambda p: 2.0 if p["pos"] >= 2 else 0.0)
@reg("u1-l2-05")
def _(p):
    t = p["N"]*p["tr"]/100; r = (p["N"]-t)/2
    return {"train": t, "val": r, "test": r}
reg("u1-l2-06")(lambda p: float(p["pos"]))
reg("u1-l2-07")(lambda p: {"comb": float(p["a"]*p["b"]*p["c"]), "dim": float(p["a"]+p["b"]+p["c"])})
reg("u1-l2-08")(lambda p: p["H"]/2**p["k"])
reg("u1-l2-09")(lambda p: {"cost": p["N"]*p["c"]/10000, "bad": p["N"]*p["err"]/100})
reg("u1-l2-10")(lambda p: {"gap": float(p["tr"]-p["te"]), "diag": 1.0})
reg("u1-l2-11")(lambda p: (p["TP"]+p["TN"])/(p["TP"]+p["FP"]+p["FN"]+p["TN"])*100)
reg("u1-l2-12")(lambda p: p["e2"]-(p["e1"]-p["e2"]))
reg("u1-l3-01")(lambda p: {"S": 1.0, "fixed": float(p["f"])})
reg("u1-l3-02")(lambda p: float(p["f"]))
reg("u1-l3-03")(lambda p: {"pred": 0.0, "cons": 0.0})
@reg("u1-l3-04")
def _(p):
    allf = 2.0**(2**p["n"]); conj = 3.0**p["n"]+1
    return {"all": allf, "conj": conj, "cut": (1-conj/allf)*100}
reg("u1-l3-05")(lambda p: {"conj": 0.0, "lin": 0.0, "feat": 1.0})
@reg("u1-l3-06")
def _(p):
    L = 2*p["n"]
    return {"L": float(L), "c2": L*(L-1)/2-p["n"]}
@reg("u1-l3-07")
def _(p):
    d = p["px"]**2
    return {"d": float(d), "c": 10.0, "w": float((d+1)*10)}
reg("u1-l3-08")(lambda p: p["N"]/2**p["n"]*100)
reg("u1-l3-09")(lambda p: {"Sfix": 2.0, "G": 2.0})
reg("u1-l3-10")(lambda p: math.log2(p["H"]))
@reg("u1-l3-11")
def _(p):
    red = ((100-p["maj"])-(100-p["model"]))/(100-p["maj"])*100
    return {"red": red, "ok": 1.0 if red > 0 else 0.0}
reg("u1-l3-12")(lambda p: {"bad": p["N"]*p["e"]/100, "acc": float(100-p["e"])})
reg("u1-l3-13")(lambda p: (math.log(p["H"])+math.log(100/p["del"]))/(p["eps"]/100))
reg("u1-l3-14")(lambda p: p["cFP"]/(p["cFP"]+p["cFN"])*100)
reg("u1-l4-02")(lambda p: {"Sq": 1.0, "G": 1.0, "un": 0.0})
@reg("u1-l4-04")
def _(p):
    H = 3.0**p["n"]+1
    return (math.log(H)+math.log(100/p["del"]))/(p["eps"]/100)
reg("u1-l4-05")(lambda p: float(p["b"]-p["N"]))
@reg("u1-l4-06")
def _(p):
    return {"A": 1.0, "B": 2.0, "best": 1.0 if p["teA"] > p["teB"] else 2.0}
@reg("u1-l4-07")
def _(p):
    red = ((100-p["acc0"])-(100-p["accF"]))/(100-p["acc0"])*100
    return {"red": red, "per": (p["cost"]-1)/(p["accF"]-p["acc0"])}
@reg("u1-l4-08")
def _(p):
    lnH = p["n"]*math.log(3)
    return {"lnH": lnH, "eps": (lnH+math.log(20))/p["m"]*100, "full": 0.0}

# ---- U2 ----
@reg("u2-l2-01")
def _(p):
    return {"xbar": 2.5, "ybar": p["a"]+1.5*p["b"], "w": float(p["b"])}
@reg("u2-l2-02")
def _(p):
    xs=[0,1,2,3]; ys=[1,2,4,p["y4"]]
    xb=1.5; yb=sum(ys)/4
    sxy=sum((xs[i]-xb)*(ys[i]-yb) for i in range(4))
    sxx=sum((x-xb)**2 for x in xs)
    w=sxy/sxx
    return {"w": w, "b": yb-w*xb}
@reg("u2-l2-03")
def _(p):
    es=[p["e1"],p["e2"],p["e3"],p["e4"]]
    sse=sum(e*e for e in es)
    return {"SSE": float(sse), "MSE": sse/4, "RMSE": math.sqrt(sse/4)}
reg("u2-l2-04")(lambda p: {"R2": 1-p["SSE"]/p["SST"], "base": 0.0})
@reg("u2-l2-05")
def _(p):
    w=p["w0"]
    for _ in range(2): w=w-p["eta"]*2*(w-3)
    return w
reg("u2-l2-06")(lambda p: 1.0/p["a"])
reg("u2-l2-07")(lambda p: (p["x"]-p["mu"])/p["sd"])
reg("u2-l2-08")(lambda p: {"y": float(p["w"]*p["x"]+p["b"]), "trust": 0.0})
@reg("u2-l2-09")
def _(p):
    mse=(3+p["e"]**2)/4; mae=(3+p["e"])/4
    return {"MSE": mse, "MAE": mae, "share": p["e"]**2/(3+p["e"]**2)*100}
reg("u2-l2-10")(lambda p: {"lin": float(p["d"]+1), "poly": float(p["deg"]+1)})
@reg("u2-l2-11")
def _(p):
    r2=p["r"]**2
    return {"R2": r2, "un": (1-r2)*100}
reg("u2-l2-12")(lambda p: p["s1"]/p["s2"])
@reg("u2-l3-01")
def _(p):
    xs=[1,2,3]; ys=[2,4,p["y3"]]
    xb=2; yb=sum(ys)/3
    sxy=sum((xs[i]-xb)*(ys[i]-yb) for i in range(3))
    w=sxy/2; b=yb-w*xb
    sse=sum((ys[i]-(w*xs[i]+b))**2 for i in range(3))
    return {"w": w, "b": b, "SSE": sse}
reg("u2-l3-02")(lambda p: {"se": 0.0, "sxe": 0.0})
@reg("u2-l3-03")
def _(p):
    f=(1-2*p["eta"])**p["n"]
    return {"w": f, "factor": f}
@reg("u2-l3-04")
def _(p):
    wr=8/(p["sxx"]+p["lam"]); wo=8/p["sxx"]
    return {"w": wr, "shrink": (1-wr/wo)*100}
@reg("u2-l3-05")
def _(p):
    return {"mse": float(p["bias"]**2+p["varr"]+p["noise"]), "floor": float(p["noise"])}
reg("u2-l3-06")(lambda p: {"over": 9.0, "pick": 1.0, "ratio": p["te9"]/p["tr9"]})
reg("u2-l3-07")(lambda p: {"per": p["w"]/p["sd"], "ratio": 4.0})
reg("u2-l3-08")(lambda p: {"steps": float(p["N"]/p["B"]), "cost": p["B"]/p["N"]*100})
reg("u2-l3-09")(lambda p: {"prem": float(p["w"]), "ref": 0.0})
@reg("u2-l3-10")
def _(p):
    vif=1/(1-p["r"]**2)
    return {"VIF": vif, "risky": 1.0 if vif > 10 else 0.0}
reg("u2-l3-11")(lambda p: (math.exp(p["w"])-1)*100)
reg("u2-l3-12")(lambda p: {"rx": 2.0, "bott": float(p["trBig"])})
@reg("u2-l3-13")
def _(p):
    b, w = sp.symbols("b w")
    sol = sp.solve([sp.Eq(p["n"]*b+p["sx"]*w, p["sy"]),
                    sp.Eq(p["sx"]*b+p["sxx"]*w, p["sxy"])], [b, w], dict=True)[0]
    return {"b": float(sol[b]), "w": float(sol[w])}
@reg("u2-l3-14")
def _(p):
    e = p["ep"]
    return {"epoch": float(e[0]), "save": float(e[1]-e[2])}
@reg("u2-l4-02")
def _(p):
    xs=[1,2,3,4]; ys=[2,p["y2"],7,8]
    xb=2.5; yb=sum(ys)/4
    sxy=sum((xs[i]-xb)*(ys[i]-yb) for i in range(4))
    sxx=sum((x-xb)**2 for x in xs)
    sst=sum((y-yb)**2 for y in ys)
    w=sxy/sxx; b=yb-w*xb
    sse=sum((ys[i]-(w*xs[i]+b))**2 for i in range(4))
    return {"w": w, "b": b, "R2": 1-sse/sst}
reg("u2-l4-04")(lambda p: {"lam": 1.0, "why": 1.0})
@reg("u2-l4-05")
def _(p):
    return {"deg": 2.0, "red": (1-p["mse2"]/p["mse1"])*100, "diag": 1.0}
@reg("u2-l4-06")
def _(p):
    f=1-2*p["eta"]; w3=f**3
    return {"sign": 1.0 if w3 > 0 else -1.0, "mag": abs(w3)}
reg("u2-l4-07")(lambda p: {"ev": p["R2"]*100, "band": float(4*p["rmse"]), "add": 1.0})
reg("u2-l4-08")(lambda p: {"ratio": (p["d"]+1)/p["N"], "tr": 0.0, "trust": 0.0})

# ---- U3 ----
@reg("u3-l2-01")
def _(p):
    tot=p["TP"]+p["FP"]+p["FN"]+p["TN"]
    return {"acc": (p["TP"]+p["TN"])/tot*100, "pr": p["TP"]/(p["TP"]+p["FP"])*100,
            "rc": p["TP"]/(p["TP"]+p["FN"])*100}
@reg("u3-l2-02")
def _(p):
    return {"F1": 2*p["pr"]*p["rc"]/(p["pr"]+p["rc"]), "avg": (p["pr"]+p["rc"])/2}
@reg("u3-l2-03")
def _(p):
    sps=p["TN"]/(p["TN"]+p["FP"])*100
    return {"spec": sps, "FPR": 100-sps}
reg("u3-l2-04")(lambda p: {"acc": p["N"]/(p["P"]+p["N"])*100, "rc": 0.0})
@reg("u3-l2-05")
def _(p):
    return {"val": float(p["N"]/p["k"]), "runs": float(p["k"]), "tr": float(p["N"]*(p["k"]-1)/p["k"])}
@reg("u3-l2-06")
def _(p):
    s=p["s"]; m=sum(s)/5
    v=sum((x-m)**2 for x in s)/5
    return {"mean": m, "sd": math.sqrt(v)}
@reg("u3-l2-07")
def _(p):
    rc1=p["TP"]/(p["TP"]+p["FN"])*100; rc2=(p["TP"]+p["dTP"])/(p["TP"]+p["FN"])*100
    pr1=p["TP"]/(p["TP"]+10)*100; pr2=(p["TP"]+p["dTP"])/(p["TP"]+p["dTP"]+10+p["dFP"])*100
    return {"dRC": rc2-rc1, "dPR": pr2-pr1}
@reg("u3-l2-08")
def _(p):
    w=0.0
    for a in p["pos"]:
        for b in p["neg"]:
            if a > b: w += 1
            elif a == b: w += 0.5
    return w/4
reg("u3-l2-09")(lambda p: {"pk": p["hit"]/p["k"]*100, "rk": p["hit"]/40*100})
@reg("u3-l2-10")
def _(p):
    se=math.sqrt(p["acc"]/100*(1-p["acc"]/100)/p["N"])*100
    return {"SE": se, "lo": p["acc"]-2*se, "hi": p["acc"]+2*se}
@reg("u3-l2-11")
def _(p):
    s=sum(p["d"])
    return {"acc": s/p["N"]*100, "base": 33.3}
reg("u3-l2-12")(lambda p: float(p["P"]/p["k"]))
@reg("u3-l3-01")
def _(p):
    tot=p["TP"]+p["FN"]+p["FP"]+p["TN"]
    acc=(p["TP"]+p["TN"])/tot*100
    pr=p["TP"]/(p["TP"]+p["FP"])*100; rc=p["TP"]/(p["TP"]+p["FN"])*100
    sps=p["TN"]/(p["TN"]+p["FP"])*100
    return {"acc": acc, "pr": pr, "rc": rc, "sp": sps, "F1": 2*pr*rc/(pr+rc)}
@reg("u3-l3-02")
def _(p):
    pv=p["prev"]/100; se=p["sens"]/100; spc=p["spec"]/100
    return pv*se/(pv*se+(1-pv)*(1-spc))*100
@reg("u3-l3-03")
def _(p):
    pos=[0.9,0.8,0.4]; neg=[0.6,0.3,0.1]
    tp=sum(1 for x in pos if x >= p["th"]); fp=sum(1 for x in neg if x >= p["th"])
    return {"TPR": tp/3*100, "FPR": fp/3*100}
@reg("u3-l3-04")
def _(p):
    pos=[0.9,0.7,0.6]; neg=[0.8,p["n3"],0.2]
    w=0.0
    for a in pos:
        for b in neg:
            if a > b: w += 1
            elif a == b: w += 0.5
    return w/9
reg("u3-l3-05")(lambda p: p["cFP"]/(p["cFP"]+p["cFN"])*100)
@reg("u3-l3-06")
def _(p):
    s=(abs(p["b"]-p["c"])-1)**2/(p["b"]+p["c"])
    return {"stat": s, "sig": 1.0 if s > 3.84 else 0.0}
@reg("u3-l3-07")
def _(p):
    return {"macro": (p["r1"]+p["r2"])/2,
            "micro": (p["r1"]*p["n1"]+p["r2"]*p["n2"])/(p["n1"]+p["n2"])}
reg("u3-l3-08")(lambda p: float(p["ko"]*(p["ki"]*p["m"]+1)))
reg("u3-l3-09")(lambda p: {"infl": float(p["cv"]-p["real"]), "rule": 1.0})
reg("u3-l3-10")(lambda p: {"pr": float(p["prev"]), "roc": 0.5, "pick": 1.0})
@reg("u3-l3-11")
def _(p):
    pq=p["acc"]/100*(1-p["acc"]/100)
    return 8*pq/(p["diff"]/100)**2
reg("u3-l3-12")(lambda p: (p["rc"]+p["sp"])/2)
reg("u3-l3-13")(lambda p: p["a"]*p["b"]*p["k"]*p["t"]/60)
reg("u3-l3-14")(lambda p: float(math.floor((p["N"]-p["w"])/p["h"])))
@reg("u3-l4-02")
def _(p):
    P=p["N"]*p["prev"]/100; Ng=p["N"]-P
    TP=P*p["rc"]/100; TN=Ng*p["sp"]/100; FP=Ng-TN
    pr=TP/(TP+FP)*100
    return {"TP": TP, "FP": FP, "pr": pr, "F1": 2*pr*p["rc"]/(pr+p["rc"])}
@reg("u3-l4-04")
def _(p):
    pos=[0.9,0.6]; neg=[0.7,p["n2"]]
    w=0.0
    for a in pos:
        for b in neg:
            if a > b: w += 1
            elif a == b: w += 0.5
    return w/4
@reg("u3-l4-05")
def _(p):
    P=p["N"]*p["prev"]/100; Ng=p["N"]-P
    TP=P*p["sens"]/100; FP=Ng*(1-p["spec"]/100)
    return {"pos": TP+FP, "PPV": TP/(TP+FP)*100, "miss": P-TP}
@reg("u3-l4-06")
def _(p):
    pb=(p["a"]+p["b"])/200; se=math.sqrt(2*pb*(1-pb)/p["N"])*100
    d=p["b"]-p["a"]
    return {"d": float(d), "SE": se, "sig": 1.0 if d > 2*se else 0.0}
reg("u3-l4-07")(lambda p: 6.0)
@reg("u3-l4-08")
def _(p):
    r=p["rc"]
    TP=p["vol"]*0.05*r[0]/100
    flag=TP/(r[1]/100)
    return {"flag": flag, "ok": 1.0 if flag <= p["cap"] else 0.0}

# ---- U4 ----
reg("u4-l2-01")(lambda p: H2(p["p"], p["n"]))
reg("u4-l2-02")(lambda p: {"a": 0.0, "b": 1.0, "c": math.log2(p["n"])})
@reg("u4-l2-03")
def _(p):
    s=p["split"]
    g3p=9-s[0]-s[2]; g3n=5-s[1]-s[3]
    Hp=H2(9,5)
    Hc=((s[0]+s[1])*H2(s[0],s[1])+(s[2]+s[3])*H2(s[2],s[3])+(g3p+g3n)*H2(g3p,g3n))/14
    return Hp-Hc
@reg("u4-l2-04")
def _(p):
    def IG(s): return 1-((s[0]+s[1])*H2(s[0],s[1])+(s[2]+s[3])*H2(s[2],s[3]))/8
    ia=IG(p["A"]); ib=IG(p["B"])
    return {"IGA": ia, "IGB": ib, "pick": 1.0 if ia >= ib else 2.0}
reg("u4-l2-05")(lambda p: {"SI": math.log2(p["k"]), "dir": -1.0})
@reg("u4-l2-06")
def _(p):
    v=p["vals"]
    return {"th": (v[1]+v[2])/2, "IG": 1.0}
reg("u4-l2-07")(lambda p: {"IG": p["H0"]-p["H1"], "pct": (p["H0"]-p["H1"])/p["H0"]*100})
reg("u4-l2-08")(lambda p: {"leaf": float(2**p["d"]), "inner": float(2**p["d"]-1)})
@reg("u4-l2-09")
def _(p):
    c=p["c"]; t=sum(c); H=0.0
    for x in c:
        if x > 0: H -= x/t*math.log2(x/t)
    return H
reg("u4-l2-10")(lambda p: {"rules": float(p["leaves"]), "form": 1.0})
@reg("u4-l2-11")
def _(p):
    SI=math.log2(p["N"])
    return {"IG": 1.0, "SI": SI, "GR": 1/SI}
@reg("u4-l2-12")
def _(p):
    a=p["a"]; t=a[0]+a[1]
    return {"acc": a[0]/t*100, "H": H2(a[0],a[1])}
@reg("u4-l3-01")
def _(p):
    Hp=H2(9,5)
    return Hp-(8*H2(6,2)+6*H2(3,3))/14
@reg("u4-l3-02")
def _(p):
    Hp=H2(9,5)
    return {"IG": Hp-(7*H2(3,4)+7*H2(6,1))/14, "win": 1.0}
reg("u4-l3-03")(lambda p: {"IG": 1.0, "pure": 1.0})
@reg("u4-l3-04")
def _(p):
    t=p["t"]; N=sum(t)
    return ((t[0]+t[1])*H2(t[0],t[1])+(t[2]+t[3])*H2(t[2],t[3]))/N
@reg("u4-l3-05")
def _(p):
    t=p["t"]; N=sum(t)
    Hy=H2(t[0]+t[2],t[1]+t[3])
    Hc=((t[0]+t[1])*H2(t[0],t[1])+(t[2]+t[3])*H2(t[2],t[3]))/N
    return {"Hy": Hy, "IG": Hy-Hc}
@reg("u4-l3-06")
def _(p):
    l=p["lab"]; vals=[10,20,30,40,50,60]
    P=sum(l); N=6-P
    Hp=H2(P,N); best=0.0; bth=0.0
    for i in range(5):
        if l[i]==l[i+1]: continue
        lp=sum(l[:i+1]); ln=(i+1)-lp
        ig=Hp-((i+1)*H2(lp,ln)+(5-i)*H2(P-lp,N-ln))/6
        if ig > best: best=ig; bth=(vals[i]+vals[i+1])/2
    return {"th": bth, "IG": best}
@reg("u4-l3-07")
def _(p):
    grA=p["igA"]; grB=p["igB"]/math.log2(p["kB"])
    return {"grA": grA, "grB": grB, "pick": 1.0 if grA >= grB else 2.0}
@reg("u4-l3-08")
def _(p):
    x=p["p"]
    return {"H": H2(x*100, (1-x)*100), "gini": 2*x*(1-x), "err": min(x, 1-x)}
reg("u4-l3-09")(lambda p: {"IG": 0.0, "useless": 0.0})
@reg("u4-l3-10")
def _(p):
    s1=p["ig"]**2/p["cost"]; s2=0.04
    return {"s1": s1, "s2": s2, "pick": 1.0 if s1 >= s2 else 2.0}
@reg("u4-l3-11")
def _(p):
    t=p["n0"]+p["n1"]
    return {"w0": p["n0"]/t, "w1": p["n1"]/t}
@reg("u4-l3-12")
def _(p):
    L=math.floor(p["N"]/p["m"])
    return {"L": float(L), "d": float(math.floor(math.log2(L)))}
reg("u4-l3-13")(lambda p: float(2*(4 if p["variant"]==1 else 8)-1))
reg("u4-l3-14")(lambda p: {"dIG": 0.0, "dSI": -1.0, "better": 1.0})
@reg("u4-l4-02")
def _(p):
    Hp=H2(9,5)
    igH=Hp-(7*H2(3,4)+7*H2(6,1))/14
    igW=Hp-(8*H2(6,2)+6*H2(3,3))/14
    igT=Hp-(4*H2(2,2)+6*H2(4,2)+4*H2(3,1))/14
    best=1.0 if igH>=igW and igH>=igT else (2.0 if igW>=igT else 3.0)
    return {"igH": igH, "igW": igW, "igT": igT, "root": best}
@reg("u4-l4-04")
def _(p):
    x=p["p"]
    H=-x*math.log2(x)-(1-x)*math.log2(1-x)
    return {"bits": 1000*H, "uni": 1000.0}
reg("u4-l4-05")(lambda p: {"SIk": math.log2(p["k"]), "SI2": 1.0, "pick": 2.0})
@reg("u4-l4-06")
def _(p):
    H=H2(p["P"], p["N"])
    return {"H": H, "IG": H, "why": 1.0}
@reg("u4-l4-07")
def _(p):
    q=math.ceil(math.log2(p["n"]))
    pp=1/p["n"]
    return {"q": float(q), "IGone": -pp*math.log2(pp)-(1-pp)*math.log2(1-pp)}
@reg("u4-l4-08")
def _(p):
    d=p["d"]; N=10
    Hp=H2(d[0]+d[2], d[1]+d[3])
    n1=d[0]+d[1]; n2=d[2]+d[3]
    Hc=(n1*H2(d[0],d[1])+n2*H2(d[2],d[3]))/N
    SI=H2(n1,n2)
    return {"Hp": Hp, "Hc": Hc, "IG": Hp-Hc, "SI": SI, "GR": (Hp-Hc)/SI}

# ---- U5 ----
reg("u5-l2-01")(lambda p: GN(p["a"], p["b"]))
@reg("u5-l2-02")
def _(p):
    s=p["s"]
    return GN(6,4)-((s[0]+s[1])*GN(s[0],s[1])+(s[2]+s[3])*GN(s[2],s[3]))/10
@reg("u5-l2-03")
def _(p):
    c=p["c"]; t=sum(c)
    return {"G": 1-sum((x/t)**2 for x in c), "max": 2/3}
reg("u5-l2-04")(lambda p: 1.0 if p["after"] >= p["before"] else 0.0)
@reg("u5-l2-05")
def _(p):
    c1=p["e1"]+p["al"]*p["L1"]; c2=p["e2"]+p["al"]*p["L2"]
    return {"c1": float(c1), "c2": float(c2), "pick": 1.0 if c1 <= c2 else 2.0}
reg("u5-l2-06")(lambda p: p["de"]/p["dL"])
@reg("u5-l2-07")
def _(p):
    y=p["ys"]; m=sum(y)/3
    return {"pred": m, "SSE": sum((x-m)**2 for x in y)}
@reg("u5-l2-08")
def _(p):
    v=p["v"]
    return v[0]-(v[1]+v[2])/2
@reg("u5-l2-09")
def _(p):
    d=p["d"]; g=d[1]-d[2]
    return {"gap": float(g), "diag": 1.0 if g > 10 else 0.0}
reg("u5-l2-10")(lambda p: 0.2)
@reg("u5-l2-11")
def _(p):
    return {"a": 1.0 if p["N"] >= p["n"] else 0.0, "b": 0.0}
@reg("u5-l2-12")
def _(p):
    a=p["a"]
    return {"err": float(a[1]), "rate": a[1]/(a[0]+a[1])*100}
@reg("u5-l3-01")
def _(p):
    def gain(s): return GN(6,6)-((s[0]+s[1])*GN(s[0],s[1])+(s[2]+s[3])*GN(s[2],s[3]))/12
    ga=gain(p["A"]); gb=gain(p["B"])
    return {"gA": ga, "gB": gb, "pick": 1.0 if ga >= gb else 2.0}
@reg("u5-l3-02")
def _(p):
    n=p["node"]
    return {"tr": 0.0, "val": 1.0 if n[3] >= n[2] else 0.0, "rule": 2.0}
@reg("u5-l3-03")
def _(p):
    l=p["lab"]; P=sum(l)
    Gp=GN(P,4-P); best=-1.0; bth=0.0
    for i in range(3):
        lp=sum(l[:i+1])
        g=Gp-((i+1)*GN(lp,i+1-lp)+(3-i)*GN(P-lp,3-i-(P-lp)))/4
        if g > best: best=g; bth=i+1.5
    return {"th": bth, "gain": best}
@reg("u5-l3-04")
def _(p):
    t=p["t"]
    def best(al):
        c=[t[0]+al*t[1], t[2]+al*t[3], t[4]+al*t[5]]
        m=min(c)
        return 1.0 if c[0]==m else (2.0 if c[1]==m else 3.0)
    return {"a05": best(0.5), "a2": best(2)}
reg("u5-l3-05")(lambda p: {"acc": 50.0, "post": 1.0})
@reg("u5-l3-06")
def _(p):
    y=p["ys"]; m=sum(y)/4
    sse0=sum((x-m)**2 for x in y)
    mL=(y[0]+y[1])/2; mR=(y[2]+y[3])/2
    sse1=(y[0]-mL)**2+(y[1]-mL)**2+(y[2]-mR)**2+(y[3]-mR)**2
    return {"mL": mL, "mR": mR, "red": sse0-sse1}
reg("u5-l3-07")(lambda p: {"var_": 1.0, "fix": 1.0})
reg("u5-l3-08")(lambda p: 1.0 if 2*p["w"] > 8 else 0.0)
reg("u5-l3-09")(lambda p: (p["e"]+0.5)/p["n"]*100)
reg("u5-l3-10")(lambda p: p["g1"]*p["n1"]/100+p["g2"]*p["n2"]/100)
@reg("u5-l3-11")
def _(p):
    t=p["tbl"]
    accs=[t[1],t[3],t[5],t[7]]; leaves=[t[0],t[2],t[4],t[6]]
    bi=accs.index(max(accs))
    return {"best": float(leaves[bi]), "diag": 1.0}
@reg("u5-l3-12")
def _(p):
    e1=min(p["l1"])+min(p["l2"])
    P=p["l1"][0]+p["l2"][0]; N=p["l1"][1]+p["l2"][1]
    e2=min(P,N)
    return {"sub": float(e1), "leaf": float(e2), "inc": float(e2-e1)}
reg("u5-l3-13")(lambda p: {"reg": float(p["L"]), "cuts": float(p["L"]-1)})
@reg("u5-l3-14")
def _(p):
    e=p["err"]; d=[2,4,6,8]
    return {"depth": float(d[e.index(min(e))]), "move": 1.0}
@reg("u5-l4-02")
def _(p):
    s=p["s"]; P=s[0]+s[2]; N=s[1]+s[3]; T=P+N
    Gp=GN(P,N)
    Gc=((s[0]+s[1])*GN(s[0],s[1])+(s[2]+s[3])*GN(s[2],s[3]))/T
    IG=H2(P,N)-((s[0]+s[1])*H2(s[0],s[1])+(s[2]+s[3])*H2(s[2],s[3]))/T
    return {"Gp": Gp, "Gc": Gc, "gain": Gp-Gc, "IG": IG}
@reg("u5-l4-04")
def _(p):
    t=p["t"]
    n=(2.0 if t[2]>=t[1] else 1.0) if t[1]>=t[0] else 0.0
    return n
@reg("u5-l4-05")
def _(p):
    c=p["cv"]; al=[0,0.5,1,2]
    return {"alpha": float(al[c.index(max(c))]), "diag": 1.0}
@reg("u5-l4-06")
def _(p):
    l=p["leaf"]
    cn=l[0]*p["cFN"]; cp=l[1]
    return {"cn": float(cn), "cp": float(cp), "pick": 1.0 if cp <= cn else 0.0}
@reg("u5-l4-07")
def _(p):
    s=p["sc"]
    return 2.0 if (s[0]-s[1]) <= 1 else 1.0
@reg("u5-l4-08")
def _(p):
    s=p["s"]; P=s[0]+s[2]; N=s[1]+s[3]; T=P+N
    gg=GN(P,N)-((s[0]+s[1])*GN(s[0],s[1])+(s[2]+s[3])*GN(s[2],s[3]))/T
    ig=H2(P,N)-((s[0]+s[1])*H2(s[0],s[1])+(s[2]+s[3])*H2(s[2],s[3]))/T
    acc=(max(s[0],s[1])+max(s[2],s[3]))/T*100
    return {"gini": gg, "IG": ig, "acc": acc}

# ---- U6 ----
@reg("u6-l2-01")
def _(p):
    a=p["prior"]/100*p["like"]/100; b=(1-p["prior"]/100)*p["alt"]/100
    return a/(a+b)*100
@reg("u6-l2-02")
def _(p):
    o=p["pr"]/100*p["lr"]
    return {"odds": o, "prob": o/(1+o)*100}
@reg("u6-l2-03")
def _(p):
    s=p["s"]; t=s[0]+s[1]
    return {"pp": s[0]/t*100, "pn": s[1]/t*100}
@reg("u6-l2-04")
def _(p):
    return {"ml": p["nx"]/p["nc"], "lap": (p["nx"]+1)/(p["nc"]+2)}
reg("u6-l2-05")(lambda p: {"score": 0.0, "win": 0.0})
@reg("u6-l2-06")
def _(p):
    lg=p["n"]*math.log10(p["p1"])
    return {"lg": lg, "ok": 1.0 if lg > -308 else 0.0}
@reg("u6-l2-07")
def _(p):
    t=p["t"]
    sps=0.5*t[0]*t[1]; sn=0.5*t[2]*t[3]
    return {"pick": 1.0 if sps >= sn else 0.0, "post": sps/(sps+sn)*100}
@reg("u6-l2-08")
def _(p):
    pv=p["prev"]/100; se=p["sens"]/100; fp=1-p["spec"]/100
    a=pv*se*se; b=(1-pv)*fp*fp
    return a/(a+b)*100
@reg("u6-l2-09")
def _(p):
    return 1/(math.sqrt(2*math.pi)*p["sd"])*math.exp(-(p["x"]-p["mu"])**2/(2*p["sd"]**2))
@reg("u6-l2-10")
def _(p):
    nb=p["C"]*p["n"]+(p["C"]-1)
    full=p["C"]*(2**p["n"]-1)+(p["C"]-1)
    return {"nb": float(nb), "full": float(full)}
@reg("u6-l2-11")
def _(p):
    o=p["pr"]/(100-p["pr"])
    return {"odds": o, "logit": math.log(o)}
@reg("u6-l2-12")
def _(p):
    o=p["like"]/99
    return {"odds": o, "prob": o/(1+o)*100}
@reg("u6-l3-01")
def _(p):
    s=0.4*0.6*0.5; h=0.6*0.1*0.2
    return {"s": s, "h": h, "post": s/(s+h)*100}
reg("u6-l3-02")(lambda p: {"ml": 0.0, "lap": 1/(p["nc"]+p["V"])})
@reg("u6-l3-03")
def _(p):
    t=p["t"]
    a=t[0]+t[1]+t[2]; b=t[3]+t[4]+t[5]
    return {"A": a, "B": b, "pick": 1.0 if a >= b else 2.0}
reg("u6-l3-04")(lambda p: (100-p["prior"])/p["prior"])
@reg("u6-l3-05")
def _(p):
    m1=p["l1"]*p["p1"]; m2=p["l2"]*(100-p["p1"])
    return {"ML": 1.0, "MAP": 1.0 if m1 >= m2 else 2.0}
@reg("u6-l3-06")
def _(p):
    mid=(p["m1"]+p["m2"])/2
    return {"pick": 1.0 if p["x"] >= mid else 2.0, "bd": mid}
@reg("u6-l3-07")
def _(p):
    t=p["t"]
    pc=1-t[0]-t[1]
    a=t[0]*t[2]*t[3]; b=t[1]*t[4]*t[5]; c=pc*t[6]*t[7]
    m=max(a,b,c)
    return {"a": a, "b": b, "c": c, "pick": 1.0 if a==m else (2.0 if b==m else 3.0)}
reg("u6-l3-08")(lambda p: {"times": float(p["dup"]), "eff": 1.0})
@reg("u6-l3-09")
def _(p):
    o=p["lr"]**p["n"]
    return o/(1+o)*100
@reg("u6-l3-10")
def _(p):
    return {"est": (p["nx"]+p["al"])/(p["nc"]+2*p["al"]), "lim": 0.5}
@reg("u6-l3-11")
def _(p):
    w=p["w"]; lo=0.5+w[0]+w[1]
    return {"lo": lo, "pick": 1.0 if lo >= 0 else 0.0, "post": 1/(1+math.exp(-lo))*100}
reg("u6-l3-12")(lambda p: float(p["f"][0]))
@reg("u6-l3-13")
def _(p):
    return {"LRp": p["sens"]/(100-p["spec"]), "LRn": (100-p["sens"])/p["spec"]}
@reg("u6-l3-14")
def _(p):
    lo=-1+1.5-0.5+0.8; lo0=1.5-0.5+0.8
    return {"lo": lo, "pick": 1.0 if lo >= 0 else 0.0,
            "change": 0.0 if (lo >= 0) == (lo0 >= 0) else 1.0}
@reg("u6-l4-02")
def _(p):
    pfs=(2+1)/(3+2); pls=(3+1)/(3+2)
    pfh=(1+1)/(5+2); plh=(1+1)/(5+2)
    ps=3/8*pfs*pls; ph=5/8*pfh*plh
    return {"pfs": pfs, "s": ps, "h": ph, "pick": 1.0 if ps >= ph else 0.0}
@reg("u6-l4-04")
def _(p):
    o0=p["prev"]/(100-p["prev"])
    return float(math.ceil(math.log(1/o0)/math.log(p["lr"])))
@reg("u6-l4-05")
def _(p):
    np_=2*p["d"]+1
    return {"np": float(np_), "ratio": p["N"]/np_, "why": 1.0}
@reg("u6-l4-06")
def _(p):
    th=1/(1+p["cFN"])*100
    return {"th": th, "pick": 1.0 if p["post"] >= th else 0.0}
reg("u6-l4-07")(lambda p: {"gap": float(p["conf"]-p["acc"]), "cause": 1.0, "ok": 1.0})
@reg("u6-l4-08")
def _(p):
    sps=0.25*0.8*0.3; sn=0.75*0.2*0.6
    return {"sp": sps, "sn": sn, "post": sps/(sps+sn)*100, "pick": 1.0 if sps >= sn else 0.0}
