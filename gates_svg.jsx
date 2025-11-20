import React from 'react';

const GatesSvg = ({ className = '', name='', inputs, ...rest }) => {
    if (inputs === 1) {
        inputs = 2
    }
    return (
        
        <svg
            width={(inputs/2)*100}
            height='100'
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            name = {name}
            {...rest}
        >

        {(() => {
            switch (name && name.toLowerCase()) {
                case 'and':
                    return (
                        <g>
                            <defs>
                                <clipPath id="top-and">
                                    <rect x="0" y="0" width={inputs*100} height="50" />
                                </clipPath>
                            </defs>
                            <rect x="2.5" y="47" width={(inputs/2)*95} height="50" fill="white" stroke="black" stroke-width="5" />
                            <rect x="2.5" y="2" width={(inputs/2)*95} rx="47" height="100" fill="white" stroke="black" stroke-width="5" clip-path="url(#top-and)" />
                        </g>
                    );
                case 'nand':
                    return (
                        <g>
                            <defs>
                                <clipPath id="top-nand">
                                    <rect x="0" y="0" width={inputs*100} height="60" />
                                </clipPath>
                                <clipPath id="bot-nand">
                                    <rect x="0" y="60" width={inputs*100} height="40" />
                                </clipPath>
                            </defs>
                            <rect x="2.5" y="54.5" width={(inputs/2)*95} height="43" fill="white" stroke="black" stroke-width="5" clip-path="url(#bot-nand)"/>
                            <circle r="6" cx={(inputs/2)*50} cy="10" fill="white" stroke="black" stroke-width="5" />
                            <rect x="2.5" y="20" width={(inputs/2)*95} rx="47.5" height="100" fill="white" stroke="black" stroke-width="5" clip-path="url(#top-nand)" />
                        </g>
                    );
                case 'or':
                    return (
                        <g>
                            <clipPath id="left-half-or">
                                <rect x="0" y="0" width={(inputs/2)*50} height="100" />
                            </clipPath>
                            <clipPath id="right-half-or">
                                <rect x={(inputs/2)*50} y="0" width={(inputs/2)*50} height="100" />
                            </clipPath>
                            <mask id="hole-mask-or">
                                <rect x="0" y="0" width={(inputs/2)*100}  height="100" fill="white" />
                                <ellipse cx={(inputs/2)*50} cy="124" rx={52*inputs/2} ry={45} fill="black"  />
                            </mask>
                            <g mask="url(#hole-mask-or)">
                                <ellipse cx={-145*inputs/2} cy="155" rx={249*inputs/2} ry={242} fill="white" stroke="black" stroke-width="5" clip-path="url(#right-half-or)"/>
                                <ellipse cx={245*inputs/2} cy="155" rx={249*inputs/2} ry={242} fill="white" stroke="black" stroke-width="5" clip-path="url(#left-half-or)" />
                                <ellipse cx={(inputs/2)*50} cy="120" rx={52*inputs/2} ry={43} stroke="black" stroke-width="5" />
                                
                            </g>
                        </g>
                    );
                case 'nor':
                    return (
                        <g>
                            <defs>
                                <clipPath id="left-half-nor">
                                    <rect x="0" y="0" width={(inputs/2)*50} height="100" />
                                </clipPath>
                                <clipPath id="right-half-nor">
                                    <rect x={(inputs/2)*50} y="0" width={(inputs/2)*50} height="100" />
                                </clipPath>
                                <mask id="hole-mask-nor">
                                    <rect x="0" y="0" width={(inputs/2)*100}  height="100" fill="white" />
                                    <ellipse cx={(inputs/2)*50} cy="124" rx={52*inputs/2} ry={45} fill="black"  />
                                </mask>
                            </defs>
                             <g mask="url(#hole-mask-nor)">
                                <ellipse cx={(inputs/2)*(-145)} cy="155" rx={(inputs/2)*251} ry="220" fill="white" stroke="black" stroke-width="5" clip-path="url(#right-half-nor)"/>
                                    <ellipse cx={(inputs/2)*245} cy="155" rx={(inputs/2)*251} ry="220" fill="white" stroke="black" stroke-width="5" clip-path="url(#left-half-nor)"/>
                                    <ellipse cx={(inputs/2)*50} cy="120" rx={(inputs/2)*52} ry="43" stroke="black" stroke-width="5"/>
                                <circle r="6" cx={(inputs/2)*50} cy="10" fill="white" stroke="black" stroke-width="5" />
                            </g>
                        </g>
                    );
                case 'xor':
                    return (
                            <g>
                                <g>
                                    <clipPath id="left-half-xor">
                                        <rect x="0" y="0" width={(inputs/2)*50} height="100" />
                                    </clipPath>
                                    <clipPath id="right-half-xor">
                                        <rect x={(inputs/2)*50} y="0" width={(inputs/2)*50} height="100" />
                                    </clipPath>
                                    <mask id="hole-mask-xor">
                                        <rect x="0" y="0" width={(inputs/2)*100}  height="100" fill="white" />
                                        <ellipse cx={(inputs/2)*50} cy="124" rx={52*inputs/2} ry={45} fill="black"  />
                                    </mask>
                                    <mask id="hole-mask-xor-bot">
                                        <rect x="0" y="0" width={(inputs/2)*100} height="100" fill="white"/>
                                        <ellipse cx={(inputs/2)*50} cy="131" rx={(inputs/2)*50} ry="43" fill="black"/>
                                    </mask>
                                </g>
                                <g mask="url(#hole-mask-xor)">
                                    <ellipse cx={-145*inputs/2} cy="155" rx={249*inputs/2} ry={242} fill="white" stroke="black" stroke-width="5" clip-path="url(#right-half-xor)"/>
                                    <ellipse cx={245*inputs/2} cy="155" rx={249*inputs/2} ry={242} fill="white" stroke="black" stroke-width="5" clip-path="url(#left-half-xor)" />
                                    <ellipse cx={(inputs/2)*50} cy="120" rx={52*inputs/2} ry={43} stroke="black" stroke-width="5" />
                                </g>
                                <ellipse cx={(inputs/2)*50} cy="128" rx={(inputs/2)*50} ry="43" stroke="black" stroke-width="5" mask="url(#hole-mask-xor-bot)"/>
                            </g>
                    );
                case 'xnor':
                    return (
                        <g>
                            <g>
                                <defs>
                                    <clipPath id="left-half-xnor">
                                    <rect x="0" y="0" width={(inputs/2)*50} height="100"/>
                                    </clipPath>
                                    <clipPath id="right-half-xnor">
                                    <rect x={(inputs/2)*50} y="0" width={(inputs/2)*50} height="100"/>
                                    </clipPath>
                                    <mask id="hole-mask-xnor">
                                        <rect x="0" y="0" width={(inputs/2)*100} height="100" fill="white"/>
                                        <ellipse cx={(inputs/2)*50} cy="124" rx={(inputs/2)*52} ry="45" fill="black"/>
                                    </mask>
                                    <mask id="hole-mask-xnor-bot">
                                        <rect x="0" y="0" width={(inputs/2)*100} height="100" fill="white"/>
                                        <ellipse cx={(inputs/2)*50} cy="131" rx={(inputs/2)*50} ry="43" fill="black"/>
                                    </mask>
                                </defs>
                                <g mask="url(#hole-mask-xnor)">
                                    <ellipse cx={(inputs/2)*(-145)} cy="155" rx={(inputs/2)*251} ry="220" fill="white" stroke="black" stroke-width="5" clip-path="url(#right-half-xnor)"/>
                                    <ellipse cx={(inputs/2)*245} cy="155" rx={(inputs/2)*251} ry="220" fill="white" stroke="black" stroke-width="5" clip-path="url(#left-half-xnor)"/>
                                    <ellipse cx={(inputs/2)*50} cy="120" rx={(inputs/2)*52} ry="43" stroke="black" stroke-width="5"/>
                                    <circle r="6" cx={(inputs/2)*50} cy="9" fill="white" stroke="black" stroke-width="5" />
                                </g>
                            </g>
                            <ellipse cx={(inputs/2)*50} cy="128" rx={(inputs/2)*50} ry="43" stroke="black" stroke-width="5" mask="url(#hole-mask-xnor-bot)"/>
                        </g>
                    );
                case 'not':
                    return (
                        <g>
                            <polygon points="50,15 95,97.5 5,97.5" fill="white" stroke="black" stroke-width="5" />
                            <circle r="6" cx={(inputs/2)*50} cy="10" fill="white" stroke="black" stroke-width="5" />
                        </g>
                    );
                default:
                    return (
                        <g>
                            <rect x="10" y="20" width="80" height="60" fill="none" stroke="black" strokeWidth="2" />
                            <text x="50" y="50" textAnchor="middle" alignmentBaseline="middle" fontSize="10">Unknown</text>
                        </g>
                    );
            }
        })()}
           
        </svg>
    );
};

export default GatesSvg;