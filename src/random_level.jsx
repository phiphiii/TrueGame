import React, { useState, useEffect } from "react";
import { Gate, computeOutput } from "./logic_gates.jsx";
import "./index.css";

const gateTypes = ["AND","OR","XOR","NAND","NOR","XNOR"];

function makePyramid(levels = 4) {
    const rows = [];
    
    // First row - gates with their own inputs (2-4 each)
    const firstGateCount = Math.max(1, 2 ** (levels - 2));
    const firstRow = [];
    for (let i = 0; i < firstGateCount; i++) {
        const numInputs = Math.min(2 + Math.floor(Math.random() * 3), 4);
        const t = gateTypes[Math.floor(Math.random() * gateTypes.length)];
        firstRow.push({ 
            type: t, 
            value: false, 
            inputCount: numInputs,
            inputs: Array.from({ length: numInputs }, (_, idx) => ({ gateIdx: i, inputIdx: idx, value: false }))
        });
    }
    rows.push(firstRow);
    
    // Upper rows - gates that take input from gates below
    for (let r = 1; r < levels - 1; r++) {
        const prev = rows[r - 1];
        const row = [];
        let i = 0;
        
        while (i < prev.length) {
            const numInputs = Math.min(2 + Math.floor(Math.random() * 3), prev.length - i);
            const t = gateTypes[Math.floor(Math.random() * gateTypes.length)];
            const inputs = [];
            for (let j = 0; j < numInputs; j++) {
                inputs.push(i + j);
            }
            row.push({ type: t, value: false, inputs: inputs });
            i += numInputs;
        }
        rows.push(row);
    }
    return rows;
}

function evaluateRows(rows) {
    const next = rows.map(row => row.map(n => ({ ...n })));
    
    // Evaluate first row - compute from its own inputs
    if (next.length > 0) {
        next[0].forEach(node => {
            if (node.inputCount !== undefined) {
                const inputValues = node.inputs.map(inp => inp.value);
                node.value = computeOutput(node.type, inputValues);
            }
        });
    }
    
    // Evaluate upper rows - compute from gates below
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

export default function RandomLevel({ onBack }) {
    const [levels] = useState(4);
    const [rows, setRows]gateIdx, inputIdx) {
        setRows(prev => {
            const next = prev.map(row => row.map(n => ({ ...n })));
            const gate = next[0][gateIdx];
            const input = gate.inputs[inputIdx];
            if (input) {
                input.value = !input.value;
            }
        const top = rows[rows.length - 1]?.[0];
        setWon(!!top && !!top.value);
    }, [rows]);

    function regenerate() {
        setRows(evaluateRows(makePyramid(levels)));
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

            <div className="pyramid" style={{ display: "flex", flexDirection: "column-reverse", gap: 18, alignItems: "center" }}>
                {rows.slice(1).map((row, rIdx) => {
                    const r = rIdx + 1;
                    return (
                        <div key={r} className="pyramid-row" style={{ display: "flex", gap: 18, justifyContent: "center" }}>
                            {row.map((node, i) => (
                                <div key={i} className="pyramid-node" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                                    {r === rows.length - 1 && (
                                        <>
                                            <div className={`gate-output ${node.value ? "on" : ""}`}>
                                                {node.value ? 1 : 0}
                                            </div>
                                            <div className={`pyramid-output-line ${node.value ? "on" : ""}`} />
                                        </>
                                    )}
                                    {r < rows.length - 1 && (
                                        <div className={`pyramid-gate-output-line ${node.value ? "on" : ""}`} />
                                    )}
                                    <div className="gate-card" style={{ width: 140, padding: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <div style={{ width: 96, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Gate type={node.type} numInputs={node.inputs.length} scale={0.6} />
                                        </div>
                                        <div style={{ height: 8 }} />
                                    </div>
                                </div>
                            ))}
                    First row gates with their own inputs */}
                {rows.length > 1 && (
                    <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
                        {rows[0].map((gateNode, gateIdx) => (
                            <div key={gateIdx} style={{ display: "flex", gap: 0, flexDirection: "column", alignItems: "center" }}>
                                {gateNode.inputs && gateNode.inputs.map((input, inputIdx) => (
                                    <div key={inputIdx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                                        <div className={`pyramid-input-line ${input.value ? "on" : ""}`} />
                                        <div
                                            role="button"
                                            onClick={() => toggleInput(gateIdx, inputIdx)}
                                            className={`gate-input-button ${input.value ? "on" : ""}`}
                                            style={{ width: 48, height: 48, borderRadius: 48, fontSize: 16 }}
                                        >
                                            {input.value ? 1 : 0}
                                        </div>
                                    </div>
                                ))}
                                <div style={{ height: 8 }} />
                                <div className="gate-card" style={{ width: 140, padding: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <div style={{ width: 96, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Gate type={gateNode.type} numInputs={gateNode.inputCount} scale={0.6} />
                                    </div>
                                    <div style={{ height: 8 }} />
                                    <div style={{ textAlign: "center", color: gateNode.value ? "var(--accent-green)" : "var(--accent-red)", fontWeight: 700 }}>
                                        {gateNode.value ? 1 : 0}
                                    </div>
                                </div>     >
                                            {rows[0][inputIdx].value ? 1 : 0}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}