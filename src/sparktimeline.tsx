/// <reference path="react/react-addons.d.ts" />
import React = require("react/addons");

interface TimelinePoint {
    timestamp: number;
    state: boolean;
}

interface SparkTimelineProperties {
    data: TimelinePoint[];
    now: number;
}

function rebase(transitions: TimelinePoint[], now: number) {
    var base = now;
    if (typeof(now) === 'undefined') {
        for (var i = 0; i < transitions.length; i += 1) {
            base = Math.max(base, transitions[i].timestamp)
        }
    }

    var result = [];
    for (var i = 0; i < transitions.length; i += 1) {
        const time = (transitions[i].timestamp - base) / 3600
        result.push({ timestamp: time,  state: transitions[i].state });
    }

    return result;
}

function prepare(transitions) {
    var result = transitions.slice(0);
    
    var i;
    for (i = 0; i < result.length; i += 1) {
        if (result[i].timestamp >= -1) {
            break;
        }
    }
    
    if (i === 0) {
        result.unshift({ timestamp: -1, state: null });
    } else {
        var start_state = result[i-1].state;
        result = result.slice(i);
        result.unshift({ timestamp: -1, state: start_state });
    }
    
    if (result[result.length - 1].timestamp < 0) {
        var end_state = result[result.length - 1].state;
        result.push({ timestamp: 0, state: end_state });
    }
    
    return result;
}

function scale(transitions) {
    for (var i = 0; i < transitions.length; i += 1) {
        transitions[i].position = 120 + 120 * transitions[i].timestamp;
    }

    return transitions;
}

class SparkTimeline extends React.Component<SparkTimelineProperties, {}> {
    render(): void {
        var points = scale(prepare(rebase(this.props.data, 
                                          this.props.now)));
        var blocks = [];
        for (var i = 0; i < points.length - 1; i += 1) {
            var state = "unknown";
            var height = 5;
            var y = 8
            if (points[i].state === true) {
                state = "visible";
                y = 5;
                height = 11;
            } else if (points[i].state === false) {
                state = "hidden";
                y = 10;
                height = 1;
            }

            var width = points[i + 1].position - points[i].position;

            blocks.push(<rect className={ state } height={height}
                              width={width} key={ "block" + points[i].position }
                              x={points[i].position} y={y}></rect>);
        }

        return (<svg className="state-monitor">
                    {blocks}
                </svg>);
    }
}

function Factory(props: SparkTimelineProperties) {
    return React.createElement(SparkTimeline, props);
}

export = Factory;
