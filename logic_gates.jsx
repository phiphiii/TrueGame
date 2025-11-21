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
            return !inputs[0];
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

    return (
        <div className="gate-card">
            <div className="gate-header">
                <div className="gate-label">{label || type}</div>
            </div>

            <div className="gate-body-column">
                <div className="gate-output-wrap">
                    <div className={`gate-output ${out ? "on" : ""}`}>
                        {out ? 1 : 0}
                    </div>
                    <div className={`gate-output-line ${out ? "on" : ""}`} />
                </div>

                <div className="gate-gate-area">
                    <GatesSvg className="" name={type} inputs={numInputs} scale={1} />
                </div>

                <div className="gate-inputs-row">
                    {inputs.map((val, i) => (
                        <div key={i} className="gate-input-column">
                            <div
                                className={`gate-input-vertical ${
                                    val ? "on" : ""
                                }`}
                            />
                            <div
                                role="button"
                                aria-label={`input-${i}`}
                                onClick={() => toggle(i)}
                                className={`gate-input-button ${
                                    val ? "on" : ""
                                }`}
                            >
                                {val ? 1 : 0}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="gate-controls-row">
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