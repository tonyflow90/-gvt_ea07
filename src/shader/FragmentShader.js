export let FragmentShader = `
    precision mediump float;
    varying vec4 vColor;

    void main() {
        gl_FragColor = vColor;
    }
`
// `
//     precision mediump float;
//     varying vec4 vColor;
//     varying float displacement;

//     void main() {
//         vec4 newColor = vColor;
//         newColor.r -= displacement;
//         newColor.g = 0.0;
//         newColor.b += displacement;
//         gl_FragColor = newColor;
//     }
// `