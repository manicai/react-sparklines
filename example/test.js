require.config({
    paths: {
        "react/addons": "https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons.min",
        sparkbars: "../build/sparkbars"
    }
})

require(["react/addons", "sparkbars"], function(React, Sparkbars) {
    "use strict";

    var data = [ 4576,  4158,  4219,  4136,  4458,  4134,
                 4153,  3845,  4053, -2766, -4607, -2549,
                -2543, -4296, -4295, -6508, -3289, -3280,
                 7887, -7128];

    React.render(Sparkbars({ data: data, labels: true }), 
                 document.getElementById("js-app-container"));
})