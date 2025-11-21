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
    const bottomCount = 2 ** (levels - 1);
    const rows = [];
    const bottom = Array.from({ length: bottomCount }).map(() => ({ type: "INPUT", value: false }));
    rows.push(bottom);
    for (let r = 1; r < levels; r++) {
        const prev = rows[r - 1];
        const count = Math.floor(prev.length / 2);
        const row = [];
        for (let i = 0; i < count; i++) {
            const t = gateTypes[Math.floor(Math.random() * gateTypes.length)];
            row.push({ type: t, value: false, left: i * 2, right: i * 2 + 1 });
        }
        rows.push(row);
    }
    return rows;
}

function evaluateRows(rows) {
    const next = rows.map(row => row.map(n => ({ ...n })));
    for (let r = 1; r < next.length; r++) {
        const prev = next[r - 1];
        const row = next[r];
        for (let i = 0; i < row.length; i++) {
            const node = row[i];
            const a = prev[node.left]?.value || false;
            const b = prev[node.right]?.value || false;
            node.value = computeOutput(node.type, [a, b]);
        }
    }
    return next;
}

export default function RandomLevel({ onBack }) {
    const [levels] = useState(4);
    const [rows, setRows] = useState(() => evaluateRows(makePyramid(levels)));
    const [won, setWon] = useState(false);

    useEffect(() => {
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

            <div className="pyramid" style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
                {rows.slice().reverse().map((row, displayRowIndex) => {
                    const r = rows.length - 1 - displayRowIndex;
                    return (
                        <div key={r} className="pyramid-row" style={{ display: "flex", gap: 18, justifyContent: "center" }}>
                            {row.map((node, i) => (
                                <div key={i} className="pyramid-node" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                                    {node.type === "INPUT" ? (
                                        <div
                                            role="button"
                                            onClick={() => { if (r === 0) toggleInput(i); }}
                                            className={`gate-input-button ${node.value ? "on" : ""}`}
                                            style={{ width: 48, height: 48, borderRadius: 48, fontSize: 16 }}
                                        >
                                            {node.value ? 1 : 0}
                                        </div>
                                    ) : (
                                        <div className="gate-card" style={{ width: 140, padding: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <div style={{ width: 96, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <GatesSvg name={node.type} className="" scale={0.6} />
                                            </div>
                                            <div style={{ height: 8 }} />
                                            <div style={{ textAlign: "center", color: node.value ? "var(--accent-green)" : "var(--accent-red)", fontWeight: 700 }}>
                                                {node.value ? 1 : 0}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}