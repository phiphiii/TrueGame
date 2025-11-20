import React, { useState } from "react";
import GatesSvg from "./gates_svg.jsx";

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
    const [inputs, setInputs] = useState(
        Array.from({ length: initialCount }, () => false)
    );

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
            width: 320,
            margin: 8,
            fontFamily: "sans-serif",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        output: {
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: out ? "#2ecc71" : "#e74c3c",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
        },
    };

    return (
        <div style={style.container}>
            <div style={style.header}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {label || type}
                </div>
                <div style={style.output}>{out ? 1 : 0}</div>
            </div>

            {/* tutaj wstawiamy grafikę bramki */}
            <div style={{ marginTop: 8, marginBottom: 8, display: "flex", justifyContent: "center" }}>
                <GatesSvg className="" name={type} />
            </div>

            <div
                style={{
                    marginTop: 8,
                    marginBottom: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ fontSize: 12 }}>Inputs:</div>
                <div>
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
        </div>
    );
};

export default function LogicGatesDemo() {
    const gateTypes = ["AND", "OR", "XOR", "NAND", "NOR", "XNOR", "NOT"];
    return (
        <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {gateTypes.map((t) => (
                    <Gate key={t} type={t} />
                ))}
            </div>
        </div>
    );
}