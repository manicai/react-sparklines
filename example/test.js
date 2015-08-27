require.config({
    paths: {
        "react/addons": "https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons",
        sparkbars: "../build/sparkbars",
        sparktimeline: "../build/sparktimeline"
    }
})

require(["react/addons", "sparkbars", "sparktimeline"], 
        function(React, Sparkbars, SparkTimeline) {
    "use strict";

    var data = [ 4576,  4158,  4219,  4136,  4458,  4134,
                 4153,  3845,  4053, -2766, -4607, -2549,
                -2543, -4296, -4295, -6508, -3289, -3280,
                 7887, -7128];

    React.render(Sparkbars({ data: data, labels: true }), 
                 document.getElementById("barchart-example"));

    var timedata = [ { timestamp: 1439999667.2, state: false },
                     { timestamp: 1439999714.81, state: true },
                     { timestamp: 1439999961.26, state: false },
                     { timestamp: 1439999981.48, state: true },
                     { timestamp: 1439999998.73, state: false },
                     { timestamp: 1440000053.79, state: true },
                     { timestamp: 1440000061.61, state: false },
                     { timestamp: 1440000078.4, state: true },
                     { timestamp: 1440000112.2, state: false },
                     { timestamp: 1440000132.8, state: true },
                     { timestamp: 1440000134.23, state: false },
                     { timestamp: 1440000141.43, state: true },
                     { timestamp: 1440000354.16, state: false },
                     { timestamp: 1440000367.5, state: true },
                     { timestamp: 1440000396.26, state: false },
                     { timestamp: 1440000413.86, state: true },
                     { timestamp: 1440000450.7, state: false },
                     { timestamp: 1440000484.5, state: true },
                     { timestamp: 1440000518.18, state: false },
                     { timestamp: 1440000538.79, state: true },
                     { timestamp: 1440000618.11, state: false } ];
    React.render(SparkTimeline({ data: timedata, now: 1440000900 }),
                 document.getElementById("timeline-example"));
})