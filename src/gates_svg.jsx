import React, { useMemo } from "react";

const GatesSvg = ({ className = "", name = "", inputs = 2, scale = 1, ...rest }) => {
  const inCount = Math.max(2, Number(inputs) || 2);
  const s = Number(scale) || 1;
  const uid = useMemo(() => Math.random().toString(36).slice(2, 9), []);
  const unit = 100;
  const viewWidth = (inCount / 2) * unit;
  const vw = viewWidth;
  const vh = 100;
  const width = vw * s;
  const height = vh * s;
  const id = (base) => `${base}-${uid}`;
  const pct = (x) => (vw * (x / 100));

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${vw} ${vh}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-name={name}
      {...rest}
    >
      {(() => {
        switch ((name || "").toLowerCase()) {
          case "and":
            return (
              <g>
                <defs>
                  <clipPath id={id("top-and")}>
                    <rect x="0" y="0" width={vw} height={vh * 0.5} />
                  </clipPath>
                </defs>
                <rect
                  x={pct(2.5)}
                  y={vh * 0.47}
                  width={vw - pct(5)}
                  height={vh * 0.5}
                  fill="white"
                  stroke="black"
                  strokeWidth={5}
                />
                <rect
                  x={pct(2.5)}
                  y={vh * 0.02}
                  width={vw - pct(5)}
                  rx={vh * 0.47}
                  height={vh}
                  fill="white"
                  stroke="black"
                  strokeWidth={5}
                  clipPath={`url(#${id("top-and")})`}
                />
              </g>
            );
          case "nand":
            return (
              <g>
                <defs>
                  <clipPath id={id("top-nand")}>
                    <rect x="0" y="0" width={vw} height={vh * 0.6} />
                  </clipPath>
                  <clipPath id={id("bot-nand")}>
                    <rect x="0" y={vh * 0.6} width={vw} height={vh * 0.4} />
                  </clipPath>
                </defs>
                <rect
                  x={pct(2.5)}
                  y={vh * 0.545}
                  width={vw - pct(5)}
                  height={vh * 0.43}
                  fill="white"
                  stroke="black"
                  strokeWidth={5}
                  clipPath={`url(#${id("bot-nand")})`}
                />
                <circle
                  r={vh * 0.06}
                  cx={vw * 0.5}
                  cy={vh * 0.1}
                  fill="white"
                  stroke="black"
                  strokeWidth={5}
                />
                <rect
                  x={pct(2.5)}
                  y={vh * 0.2}
                  width={vw - pct(5)}
                  rx={vh * 0.475}
                  height={vh}
                  fill="white"
                  stroke="black"
                  strokeWidth={5}
                  clipPath={`url(#${id("top-nand")})`}
                />
              </g>
            );
          case "or":
            return (
              <g>
                <clipPath id={id("left-half-or")}>
                  <rect x="0" y="0" width={vw * 0.5} height={vh} />
                </clipPath>
                <clipPath id={id("right-half-or")}>
                  <rect x={vw * 0.5} y="0" width={vw * 0.5} height={vh} />
                </clipPath>
                <mask id={id("hole-mask-or")}>
                  <rect x="0" y="0" width={vw} height={vh} fill="white" />
                  <ellipse cx={vw * 0.5} cy={vh * 1.24} rx={vw * 0.52} ry={vh * 0.45} fill="black" />
                </mask>
                <g mask={`url(#${id("hole-mask-or")})`}>
                  <ellipse
                    cx={-1.45 * vw}
                    cy={vh * 1.55}
                    rx={2.49 * vw}
                    ry={242}
                    fill="white"
                    stroke="black"
                    strokeWidth={5}
                    clipPath={`url(#${id("right-half-or")})`}
                  />
                  <ellipse
                    cx={2.45 * vw}
                    cy={vh * 1.55}
                    rx={2.49 * vw}
                    ry={242}
                    fill="white"
                    stroke="black"
                    strokeWidth={5}
                    clipPath={`url(#${id("left-half-or")})`}
                  />
                  <ellipse
                    cx={vw * 0.5}
                    cy={vh * 1.2}
                    rx={vw * 0.52}
                    ry={vh * 0.43}
                    stroke="black"
                    strokeWidth={5}
                    fill="none"
                  />
                </g>
              </g>
            );
          case "nor":
            return (
              <g>
                <defs>
                  <clipPath id={id("left-half-nor")}>
                    <rect x="0" y="0" width={vw * 0.5} height={vh} />
                  </clipPath>
                  <clipPath id={id("right-half-nor")}>
                    <rect x={vw * 0.5} y="0" width={vw * 0.5} height={vh} />
                  </clipPath>
                  <mask id={id("hole-mask-nor")}>
                    <rect x="0" y="0" width={vw} height={vh} fill="white" />
                    <ellipse cx={vw * 0.5} cy={vh * 1.24} rx={vw * 0.52} ry={vh * 0.45} fill="black" />
                  </mask>
                </defs>
                <g mask={`url(#${id("hole-mask-nor")})`}>
                  <ellipse
                    cx={-1.45 * vw}
                    cy={vh * 1.55}
                    rx={2.51 * vw}
                    ry={220}
                    fill="white"
                    stroke="black"
                    strokeWidth={5}
                    clipPath={`url(#${id("right-half-nor")})`}
                  />
                  <ellipse
                    cx={2.45 * vw}
                    cy={vh * 1.55}
                    rx={2.51 * vw}
                    ry={220}
                    fill="white"
                    stroke="black"
                    strokeWidth={5}
                    clipPath={`url(#${id("left-half-nor")})`}
                  />
                  <ellipse
                    cx={vw * 0.5}
                    cy={vh * 1.2}
                    rx={vw * 0.52}
                    ry={vh * 0.43}
                    stroke="black"
                    strokeWidth={5}
                    fill="none"
                  />
                  <circle r={vh * 0.06} cx={vw * 0.5} cy={vh * 0.1} fill="white" stroke="black" strokeWidth={5} />
                </g>
              </g>
            );
          case "xor":
            return (
              <g>
                <defs>
                  <clipPath id={id("left-half-xor")}>
                    <rect x="0" y="0" width={vw * 0.5} height={vh} />
                  </clipPath>
                  <clipPath id={id("right-half-xor")}>
                    <rect x={vw * 0.5} y="0" width={vw * 0.5} height={vh} />
                  </clipPath>
                  <mask id={id("hole-mask-xor")}>
                    <rect x="0" y="0" width={vw} height={vh} fill="white" />
                    <ellipse cx={vw * 0.5} cy={vh * 1.24} rx={vw * 0.52} ry={vh * 0.45} fill="black" />
                  </mask>
                  <mask id={id("hole-mask-xor-bot")}>
                    <rect x="0" y="0" width={vw} height={vh} fill="white" />
                    <ellipse cx={vw * 0.5} cy={vh * 1.31} rx={vw * 0.5} ry={vh * 0.43} fill="black" />
                  </mask>
                </defs>
                <g mask={`url(#${id("hole-mask-xor")})`}>
                  <ellipse
                    cx={-1.45 * vw}
                    cy={vh * 1.55}
                    rx={2.49 * vw}
                    ry={242}
                    fill="white"
                    stroke="black"
                    strokeWidth={5}
                    clipPath={`url(#${id("right-half-xor")})`}
                  />
                  <ellipse
                    cx={2.45 * vw}
                    cy={vh * 1.55}
                    rx={2.49 * vw}
                    ry={242}
                    fill="white"
                    stroke="black"
                    strokeWidth={5}
                    clipPath={`url(#${id("left-half-xor")})`}
                  />
                  <ellipse
                    cx={vw * 0.5}
                    cy={vh * 1.2}
                    rx={vw * 0.52}
                    ry={vh * 0.43}
                    stroke="black"
                    strokeWidth={5}
                    fill="none"
                  />
                </g>
                <ellipse
                  cx={vw * 0.5}
                  cy={vh * 1.28}
                  rx={vw * 0.5}
                  ry={vh * 0.43}
                  stroke="black"
                  strokeWidth={5}
                  mask={`url(#${id("hole-mask-xor-bot")})`}
                  fill="none"
                />
              </g>
            );
          case "xnor":
            return (
              <g>
                <defs>
                  <clipPath id={id("left-half-xnor")}>
                    <rect x="0" y="0" width={vw * 0.5} height={vh} />
                  </clipPath>
                  <clipPath id={id("right-half-xnor")}>
                    <rect x={vw * 0.5} y="0" width={vw * 0.5} height={vh} />
                  </clipPath>
                  <mask id={id("hole-mask-xnor")}>
                    <rect x="0" y="0" width={vw} height={vh} fill="white" />
                    <ellipse cx={vw * 0.5} cy={vh * 1.24} rx={vw * 0.52} ry={vh * 0.45} fill="black" />
                  </mask>
                  <mask id={id("hole-mask-xnor-bot")}>
                    <rect x="0" y="0" width={vw} height={vh} fill="white" />
                    <ellipse cx={vw * 0.5} cy={vh * 1.31} rx={vw * 0.5} ry={vh * 0.43} fill="black" />
                  </mask>
                </defs>
                <g mask={`url(#${id("hole-mask-xnor")})`}>
                  <ellipse
                    cx={-1.45 * vw}
                    cy={vh * 1.55}
                    rx={2.51 * vw}
                    ry={220}
                    fill="white"
                    stroke="black"
                    strokeWidth={5}
                    clipPath={`url(#${id("right-half-xnor")})`}
                  />
                  <ellipse
                    cx={2.45 * vw}
                    cy={vh * 1.55}
                    rx={2.51 * vw}
                    ry={220}
                    fill="white"
                    stroke="black"
                    strokeWidth={5}
                    clipPath={`url(#${id("left-half-xnor")})`}
                  />
                  <ellipse
                    cx={vw * 0.5}
                    cy={vh * 1.2}
                    rx={vw * 0.52}
                    ry={vh * 0.43}
                    stroke="black"
                    strokeWidth={5}
                    fill="none"
                  />
                  <circle r={vh * 0.06} cx={vw * 0.5} cy={vh * 0.09} fill="white" stroke="black" strokeWidth={5} />
                </g>
                <ellipse
                  cx={vw * 0.5}
                  cy={vh * 1.28}
                  rx={vw * 0.5}
                  ry={vh * 0.43}
                  stroke="black"
                  strokeWidth={5}
                  mask={`url(#${id("hole-mask-xnor-bot")})`}
                  fill="none"
                />
              </g>
            );
          case "not":
            return (
              <g>
                <polygon
                  points={`${vw * 0.5},${vh * 0.15} ${vw * 0.95},${vh * 0.975} ${vw * 0.05},${vh * 0.975}`}
                  fill="white"
                  stroke="black"
                  strokeWidth={5}
                />
                <circle r={vh * 0.06} cx={vw * 0.5} cy={vh * 0.1} fill="white" stroke="black" strokeWidth={5} />
              </g>
            );
          default:
            return (
              <g>
                <rect x={vw * 0.1} y={vh * 0.2} width={vw * 0.8} height={vh * 0.6} fill="none" stroke="black" strokeWidth={2} />
                <text x={vw * 0.5} y={vh * 0.5} textAnchor="middle" alignmentBaseline="middle" fontSize={vh * 0.1}>
                  Unknown
                </text>
              </g>
            );
        }
      })()}
    </svg>
  );
};

export default GatesSvg;