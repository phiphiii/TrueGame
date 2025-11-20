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
            width: 360,
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

        /* replaced horizontal layout with vertical: output(top) -> gate -> inputs(bottom) */
        bodyColumn: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            marginTop: 10,
        },
        gateArea: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 120,
            /* allow lines to visually overlap gate */
            paddingTop: 6,
            paddingBottom: 6,
            position: "relative",
            zIndex: 1,
            background: "transparent",
        },
        /* vertical output line above gate */
        outputLine: {
            width: 6,
            height: 56,
            background: out ? "#2ecc71" : "#e74c3c",
            marginTop: 0,
            /* overlap slightly with gate */
            marginBottom: -40,
        },
        /* inputs placed horizontally under gate, each with vertical line */
        inputsRow: {
            display: "flex",
            gap: 18,
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: 6,
        },
        inputColumn: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        inputVerticalLine: (val) => ({
            width: 6,
            height: 50,
            background: val ? "#2ecc71" : "#e74c3c",

            /* overlap slightly into gate area so it's visually connected */
            marginTop: -38,
        }),
        inputButton: (val) => ({
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: val ? "#2ecc71" : "#e74c3c",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            cursor: "pointer",
            userSelect: "none",
            border: "2px solid rgba(0,0,0,0.06)",
        }),

        controlsRow: {
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
    };

    return (
        <div style={style.container}>
            <div style={style.header}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {label || type}
                </div>
                
            </div>

            {/* body: output(top) -> gate center -> inputs(bottom) */}
            <div style={style.bodyColumn}>
                {/* output indicator on top with connecting line into gate */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={style.output}>{out ? 1 : 0}</div>
                    <div style={style.outputLine} />
                </div>

                {/* gate SVG center */}
                <div style={style.gateArea}>
                    <GatesSvg className="" name={type} inputs={numInputs}/>
                </div>

                {/* inputs row: each input has a vertical line going up into the gate */}
                <div style={style.inputsRow}>
                    {inputs.map((val, i) => (
                        <div key={i} style={style.inputColumn}>
                            <div style={style.inputVerticalLine(val)} />
                            <div
                                role="button"
                                aria-label={`input-${i}`}
                                onClick={() => toggle(i)}
                                style={style.inputButton(val)}
                            >
                                {val ? 1 : 0}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={style.controlsRow}>
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