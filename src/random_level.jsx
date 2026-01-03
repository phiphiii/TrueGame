import React, { useState, useEffect } from "react";
import GatesSvg from "./gates_svg.jsx";
import "./index.css";

const gateTypes = ["AND","OR","XOR","NAND","NOR","XNOR"];

function computeOutput(type, inputs) {
    const vals = inputs.map(Boolean);
    const countTrue = vals.filter(Boolean).length;
    switch (type) {
        case "AND": return vals.length > 0 && vals.every(Boolean);
        case "OR": return vals.some(Boolean);
        case "XOR": return countTrue % 2 === 1;
        case "NAND": return !(vals.length > 0 && vals.every(Boolean));
        case "NOR": return !vals.some(Boolean);
        case "XNOR": return countTrue % 2 === 0;
        case "NOT": return !vals[0];
        default: return false;
    }
}

function makePyramid(levels = 4) {
    const rows = [];
    
    // Generate first row of gates with random number of inputs each
    const firstRowGateCount = Math.max(1, 2 ** (levels - 2));
    const firstRowGates = [];
    let totalInputs = 0;
    
    for (let i = 0; i < firstRowGateCount; i++) {
        const numInputs = 2 + Math.floor(Math.random() * 3); // 2-4 inputs
        const t = gateTypes[Math.floor(Math.random() * gateTypes.length)];
        const inputIndices = [];
        for (let j = 0; j < numInputs; j++) {
            inputIndices.push(totalInputs + j);
        }
        totalInputs += numInputs;
        firstRowGates.push({ type: t, value: false, inputs: inputIndices });
    }
    
    // Create input nodes
    const bottom = Array.from({ length: totalInputs }).map(() => ({ type: "INPUT", value: false }));
    rows.push(bottom);
    rows.push(firstRowGates);
    
    // Build upper rows
    for (let r = 2; r < levels; r++) {
        const prev = rows[r - 1];
        const count = Math.floor(prev.length / 2);
        const row = [];
        for (let i = 0; i < count; i++) {
            const t = gateTypes[Math.floor(Math.random() * gateTypes.length)];
            row.push({ type: t, value: false, inputs: [i * 2, i * 2 + 1] });
        }
        rows.push(row);
    }
    return rows;
}

function evaluateRows(rows) {
    const next = rows.map(row => row.map(n => ({ ...n, inputs: n.inputs ? [...n.inputs] : undefined })));
    for (let r = 1; r < next.length; r++) {
        const prev = next[r - 1];
        const row = next[r];
        for (let i = 0; i < row.length; i++) {
            const node = row[i];
            const inputValues = node.inputs.map(idx => prev[idx]?.value || false);
            node.value = computeOutput(node.type, inputValues);
        }
    }
    return next;
}

function generateValidLevel(levels = 4, maxTries = 50) {
    let evaluated = evaluateRows(makePyramid(levels));
    let tries = 1;

    while (evaluated[evaluated.length - 1]?.[0]?.value && tries < maxTries) {
        evaluated = evaluateRows(makePyramid(levels));
        tries += 1;
    }

    return evaluated;
}

export default function RandomLevel({ onBack }) {
    const [levels] = useState(4);
    const [rows, setRows] = useState(() => generateValidLevel(levels));
    const [won, setWon] = useState(false);

    useEffect(() => {
        const top = rows[rows.length - 1]?.[0];
        setWon(!!top && !!top.value);
    }, [rows]);

    function regenerate() {
        setRows(generateValidLevel(levels));
    }

    function toggleInput(index) {
        setRows(prev => {
            const next = prev.map(row => row.map(n => ({ ...n })));
            next[0][index].value = !next[0][index].value;
            return evaluateRows(next);
        });
    }

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button className="btn-back" onClick={onBack}>← Back</button>
                        <button className="btn" onClick={regenerate} style={{ minWidth: 140 }}>Regenerate</button>
                    </div>
                    <div style={{ fontWeight: 700, alignSelf: "flex-start" }}>
                        Top Output: <span style={{ color: won ? "var(--accent-green)" : "var(--accent-red)" }}>{won ? "1 (WIN)" : "0"}</span>
                    </div>
                </div>
            </div>

            <div className="pyramid" style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
                {rows.slice().reverse().map((row, displayRowIndex) => {
                    const r = rows.length - 1 - displayRowIndex;
                    
                    if (r === 0) {
                        // Bottom row - pair inputs with gates from row 1
                        const nextRow = rows[1];
                        return (
                            <div key={r} className="pyramid-row" style={{ display: "flex", gap: 18, justifyContent: "center" }}>
                                {nextRow.map((gate, gateIdx) => (
                                    <div key={gateIdx} className="pyramid-node" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                                        <div className="gate-card" style={{ width: 220, padding: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                           
                                            <div style={{ textAlign: "center", color: gate.value ? "var(--accent-green)" : "var(--accent-red)", fontWeight: 700, marginBottom: 10 }}>
                                                {gate.value ? 1 : 0}
                                            </div>
                                            <div style={{ width: 200, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <GatesSvg name={gate.type} className="" scale={0.8} inputs={gate.inputs.length} />
                                            </div>
                                            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap", justifyContent: "center" }}>
                                                {gate.inputs.map((inputIdx) => (
                                                    <div
                                                        key={inputIdx}
                                                        role="button"
                                                        onClick={() => toggleInput(inputIdx)}
                                                        className={`gate-input-button ${row[inputIdx]?.value ? "on" : ""}`}
                                                        style={{ width: 40, height: 40, borderRadius: 40, fontSize: 14 }}
                                                    >
                                                        {row[inputIdx]?.value ? 1 : 0}
                                                    </div>
                                                ))}
                                            </div>
                                            <div style={{ height: 8 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                    
                    if (r === 1) {
                        return null;
                    }
                    
                    return (
                        <div key={r} className="pyramid-row" style={{ display: "flex", gap: 300, justifyContent: "center" }}>
                            {row.map((node, i) => (
                                <div key={i} className="pyramid-node" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div className="gate-card" style={{ width: 200, padding: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <div style={{ textAlign: "center", color: node.value ? "var(--accent-green)" : "var(--accent-red)", fontWeight: 700, marginBottom: 10 }}>
                                            {node.value ? 1 : 0}
                                        </div>
                                        <div style={{ width: 200, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <GatesSvg name={node.type} className="" scale={0.8} inputs={node.inputs.length} />
                                        </div>
                                        <div style={{ height: 8 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}