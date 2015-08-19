/// <reference path="react/react-addons.d.ts" />
import React = require("react/addons");

interface SparkbarProperties {
    data: number[]
}

class Sparkbars extends React.Component<SparkbarProperties, {}> {
    propTypes = {
        data: React.PropTypes.arrayOf(React.PropTypes.number)
    }

    render(): void {
        const max_height = 20;
        const zero_line = max_height / 2.0;
        const width = 4;

        var bars = [];
        const min = Math.min(0, Math.min.apply(Math, this.props.data));
        const max = Math.max(0, Math.max.apply(Math, this.props.data));
        const range = 2 * Math.max(Math.abs(min), Math.abs(max));
        var scale = function (y) { return y / range * max_height; };
        var base = function (y) { 
                return y < 0 ? zero_line : scale(max - y); 
            };
        var height = function (y) { return scale(Math.abs(y)); };
        var cls = function (y) {
                var value = "bar";
                if (y < 0) { value += " down"; }
                else if (y > 0) { value += " up"; }

                if (y === max) { value += " max"; }
                if (y === min) { value += " min"; }
                return value;
            };

        for (var idx in this.props.data) {
            var value = this.props.data[idx];
            bars.push(<rect className={cls(value)} height={height(value)}
                            key={idx} title={value} width={width}
                            x={idx * (width+1)} y={base(value)}></rect>);
        }

        return (
            <svg height="20px">
                {bars}
                <text className="up" fontSize="10" 
                      x={(width+1)*bars.length} y="10">
                    {Math.max(max, 0)}
                </text>
                <text className="down" fontSize="10" 
                      x={(width+1)*bars.length} y="20">
                    {Math.abs(Math.min(0, min))}
                </text>
            </svg>);
    }
}

function Factory(props: SparkbarProperties) {
    return React.createElement(Sparkbars, props);
}

export = Factory;