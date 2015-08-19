require.config({
    paths: {
        jsx: "https://cdn.rawgit.com/philix/jsx-requirejs-plugin/master/js/jsx",
        JSXTransformer: "https://fb.me/JSXTransformer-0.13.3",
        "react/addons": "https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react-with-addons.min",
        text: "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
        sparkbars: "../build/sparkbars"
    }
})

require(["react/addons", "sparkbars"], function(React, Sparkbars) {
    "use strict";

    var data = [ 4576,  4158,  4219,  4136,  4458,  4134,
                 4153,  3845,  4053, -2766, -4607, -2549,
                -2543, -4296, -4295, -6508, -3289, -3280,
                 7887, -7128];

    React.render(Sparkbars({ data: data }), 
                 document.getElementById("js-app-container"));
})