/// <reference path="react/react-addons.d.ts" />
import React = require("react/addons");

interface SparkbarProperties {
    data: number[],
    labels?: boolean
}

class Sparkbars extends React.Component<SparkbarProperties, {}> {
    render(): void {
        // Basic values. TODO make these configurable.
        const max_height = 20;
        const zero_line  = max_height / 2.0;
        const width      = 4;

        // Derived values.
        const min    = Math.min(0, Math.min.apply(Math, this.props.data));
        const max    = Math.max(0, Math.max.apply(Math, this.props.data));
        const range  = 2 * Math.max(Math.abs(min), Math.abs(max));
        const scale  = (y: number) => y / range * max_height;
        const base   = (y: number) => y < 0 ? zero_line : scale(max - y);
        const height = (y: number) => scale(Math.abs(y));
        const cls    = function (y: number): string {
                            var value = "bar";
                            if (y < 0) { value += " down"; }
                            else if (y > 0) { value += " up"; }

                            if (y === max) { value += " max"; }
                            if (y === min) { value += " min"; }
                            return value;
                        };

        var elements = [];
        for (var idx in this.props.data) {
            const value = this.props.data[idx];
            elements.push(<rect className={cls(value)} height={height(value)}
                                key={idx} title={value} width={width}
                                x={idx * (width+1)} y={base(value)}></rect>);
        }

        if (this.props.labels) {
            const label_x_position = (width+1)*elements.length;
            elements.push(<text className="up" fontSize="10" 
                                x={label_x_position} y="10">
                                    {Math.max(max, 0)}
                          </text>);
            elements.push(<text className="down" fontSize="10" 
                                x={label_x_position} y="20">
                                    {Math.abs(Math.min(0, min))}
                          </text>);
        }

        return (
            <svg height="20px">
                {elements}
            </svg>);
    }
}

function Factory(props: SparkbarProperties) {
    return React.createElement(Sparkbars, props);
}

export = Factory;
