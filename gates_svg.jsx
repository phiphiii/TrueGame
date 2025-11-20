import React from 'react';

const GatesSvg = ({ className = '', name='', ...rest }) => {
    return (
        <svg
            width='100'
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
                            <clipPath id="gorna-polowa">
                                <rect x="0" y="0" width="100" height="50" />
                            </clipPath>
                            </defs>
                            <rect x="2.5" y="47.5" width="95" height="50" fill="white" stroke="black" stroke-width="5" />
                            <circle r="47.5" cx="50" cy="50" fill="white" stroke="black" stroke-width="5" clip-path="url(#gorna-polowa)" />
                        </g>
                    );
                case 'nand':
                    return (
                        <g>
                            <defs>
                            <clipPath id="gorna-polowa">
                                <rect x="0" y="0" width="100" height="0" />
                            </clipPath>
                            <clipPath id="dolna-polowa">
                                <rect x="0" y="60" width="100" height="40" />
                            </clipPath>
                            </defs>
                            <rect x="2.5" y="54.5" width="95" height="43" fill="white" stroke="black" stroke-width="5" clip-path="url(#dolna-polowa)"/>
                            <circle r="6" cx="50" cy="10" fill="white" stroke="black" stroke-width="5" />
                            <circle r="48" cx="50" cy="68" fill="white" stroke="black" stroke-width="5" clip-path="url(#gorna-polowa)" />
                        </g>
                    );
                case 'or':
                    return (
                        <g>
                            <path d="
                                M 50 7                 
                                C 25 40, 15 55, 4 94       
                                C 25 80, 75 80, 96 95      
                                C 85 55, 75 40, 50 7     
                                Z                     
                            " fill="white" stroke="black" stroke-width="5"/>
                        </g>
                    );
                case 'nor':
                    return (
                        <g>
                            <circle r="6" cx="50" cy="9" fill="white" stroke="black" stroke-width="5" />
                            <path d="
                                M 50 18                  
                                C 25 40, 15 55, 4 94       
                                C 25 80, 75 80, 96 95      
                                C 85 55, 75 40, 50 18     
                                Z                     
                            " fill="white" stroke="black" stroke-width="5"/>
  
                        </g>
                    );
                case 'xor':
                    return (
                        <g>
                            <path d="
                                M 50 7                 
                                C 25 40, 15 55, 4 85       
                                C 25 65, 85 70, 96 85      
                                C 85 55, 75 40, 50 7     
                                Z                     
                            " fill="white" stroke="black" stroke-width="5"/>
                            <path d="
                                M 2 97                 
                                C 20 75, 78 75, 98 98     
                            " fill="none" stroke="black" stroke-width="5"/>
                        </g>
                    );
                case 'xnor':
                    return (
                        <g>
                            <circle r="6" cx="50" cy="9" fill="white" stroke="black" stroke-width="5" />
                            <path d="
                                M 50 20                 
                                C 25 40, 15 55, 4 85       
                                C 25 65, 85 70, 96 85      
                                C 85 55, 75 40, 50 20     
                                Z                     
                            " fill="white" stroke="black" stroke-width="5"/>
                            <path d="
                                M 2 97                 
                                C 20 75, 78 75, 98 98     
                            " fill="none" stroke="black" stroke-width="5"/>
                        </g>
                    );
                case 'not':
                    return (
                        <g>
                            <polygon points="50,15 95,97.5 5,97.5" fill="white" stroke="black" stroke-width="5" />
                            <circle r="6" cx="50" cy="10" fill="white" stroke="black" stroke-width="5" />
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