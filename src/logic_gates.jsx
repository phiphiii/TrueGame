import React, { useState } from "react";
import GatesSvg from "./gates_svg.jsx";

export const computeOutput = (type, inputs) => {
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

export const Gate = ({ id = 0, type = "AND", numInputs = 2, scale = 1 }) => {
    console.log(`Gate ${id}: type=${type}, numInputs=${numInputs}`);
    return (
        <GatesSvg className="" name={type} inputs={numInputs} scale={scale} />
    );
};

export default function LogicGatesDemo() {
    const gateConfigs = [
        { type: "AND", inputs: 2 },
        { type: "OR", inputs: 2 },
        { type: "XOR", inputs: 2 },
        { type: "NAND", inputs: 2 },
        { type: "NOR", inputs: 2 },
        { type: "XNOR", inputs: 2 },
        { type: "NOT", inputs: 1 }
    ];

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {gateConfigs.map((config, index) => (
                    <GateCard key={config.type} id={index} type={config.type} initialInputs={config.inputs} />
                ))}
            </div>
        </div>
    );
}

function GateCard({ id, type, initialInputs }) {
    const [numInputs, setNumInputs] = useState(initialInputs);
    const [inputs, setInputs] = useState(Array.from({ length: initialInputs }, () => false));

    const handleNumInputsChange = (newCount) => {
        setNumInputs(newCount);
        setInputs(Array.from({ length: newCount }, (_, i) => inputs[i] || false));
    };

    const toggle = (i) => {
        setInputs((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
    };

    const out = computeOutput(type, inputs);

    return (
        <div className="gate-card">
            <div className="gate-header">
                <div className="gate-label">{type}</div>
            </div>

            <div className="gate-body-column">
                <div className="gate-output-wrap">
                    <div className={`gate-output ${out ? "on" : ""}`}>
                        {out ? 1 : 0}
                    </div>
                    <div className={`gate-output-line ${out ? "on" : ""}`} />
                </div>

                <div className="gate-gate-area">
                    <Gate id={id} type={type} numInputs={numInputs} scale={1} />
                </div>

                <div className="gate-inputs-row">
                    {inputs.map((val, i) => (
                        <div key={i} className="gate-input-column">
                            <div className={`gate-input-vertical ${val ? "on" : ""}`} />
                            <div
                                role="button"
                                aria-label={`input-${i}`}
                                onClick={() => toggle(i)}
                                className={`gate-input-button ${val ? "on" : ""}`}
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
                        onChange={(e) => handleNumInputsChange(Number(e.target.value))}
                        disabled={type === "NOT"}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </div>
            </div>
        </div>
    );
}