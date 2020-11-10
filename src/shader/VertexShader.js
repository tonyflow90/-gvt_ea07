export let VertexShader = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;

    uniform mat4 uPMatrix;
    uniform mat4 uMVMatrix;

    varying vec4 vColor;

    varying float displacement;

    void main(){
        displacement = cos(aPosition.x) * cos(aPosition.z);
 
        gl_Position = uPMatrix * uMVMatrix * vec4(aPosition, 1.0);

        float ndcZ = gl_Position.z / gl_Position.w;
        float depthValue = 1.0 * ndcZ;

        vColor = vec4(depthValue, depthValue, depthValue, 1.0);
        vColor = (vColor + 1.0) / 2.0;
    }
`

// vColor = vec4(aNormal.x, aNormal.y, aNormal.z, 1.0);
