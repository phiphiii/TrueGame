import React, { useState } from "react";

const computeOutput = (type, inputs) => {
    const vals = inputs.map(Boolean);
    const countTrue = vals.filter(Boolean).length;

    switch (type) {
        case "AND":
            return vals.length > 0 && vals.every(Boolean);
        case "OR":
            return vals.some(Boolean);
        case "XOR":
            return countTrue % 2 === 1;
        case "NAND":
            return !(vals.length > 0 && vals.every(Boolean));
        case "NOR":
            return !vals.some(Boolean);
        case "XNOR":
            return countTrue % 2 === 0;
        case "NOT":
            return !vals[0];
        default:
            return false;
    }
};

const Gate = ({ type = "AND", label }) => {
    const isUnary = type === "NOT";
    const initialCount = isUnary ? 1 : 2;
    const [numInputs, setNumInputs] = useState(initialCount);
    const [inputs, setInputs] = useState(Array.from({ length: initialCount }, () => false));

    const toggle = (i) =>
        setInputs((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

    const changeNumInputs = (newCount) => {
        setNumInputs(newCount);
        setInputs((prev) => {
            const next = prev.slice(0, newCount);
            while (next.length < newCount) next.push(false);
            return next;
        });
    };

    const out = computeOutput(type, inputs);

    const style = {
        container: {
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            width: 220,
            margin: 8,
            fontFamily: "sans-serif",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        },
        row: { display: "flex", justifyContent: "space-between", alignItems: "center", margin: "6px 0" },
        output: {
            width: 12,
            height: 36,

            background: out ? "#2ecc71" : "#e74c3c",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        label: { fontSize: 14, fontWeight: 600 },
        controls: { display: "flex", gap: 8, alignItems: "center" },
    };

    return (
        
        <div style={style.container}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={style.label}>{label || type}</div>
                <div style={style.output}>{out ? 1 : 0}</div>
                
            </div>

            <div style={{ marginTop: 8, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 12 }}>Inputs:</div>
                <div style={style.controls}>
                    <select
                        value={numInputs}
                        onChange={(e) => changeNumInputs(Number(e.target.value))}
                        disabled={isUnary}
                    >
                        {!isUnary && <option value={2}>2</option>}
                        {!isUnary && <option value={3}>3</option>}
                        {!isUnary && <option value={4}>4</option>}
                        {isUnary && <option value={1}>1</option>}
                    </select>
                </div>
            </div>

            <div>
                {inputs.map((val, i) => (
                    <div key={i} style={style.row}>
                        <div>Wejście {i + 1}</div>
                        <label style={{ cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={val}
                                onChange={() => toggle(i)}
                                style={{ marginRight: 8 }}
                            />
                            {val ? "1" : "0"}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function LogicGatesDemo() {
    const gateTypes = ["AND", "OR", "XOR", "NAND", "NOR", "XNOR", "NOT"];
    return (
        <div>
            {/* SVG wyświetlone na stronie */}
            <div style={{ marginBottom: 12 }}>
                <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,10 100,100 0,100" fill="black" />
                <polygon points="50,22 88,94 12,94" fill="white" />
                <circle r="10" cx="50" cy="10" fill="black" />
                <circle r="6" cx="50" cy="10" fill="white" />
            </svg>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {gateTypes.map((t) => (
                    <Gate key={t} type={t} />
                ))}
            </div>
        </div>
    );
}