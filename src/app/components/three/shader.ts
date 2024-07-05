export const vertex = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uScrollOffset;
    varying vec2 vUv;
    varying float vDistanceToMouse;

    void main() {
        vUv = uv;
        vec3 newPosition = position;
        
        vec2 mousePos = uMouse;
        vDistanceToMouse = distance(mousePos, vUv);
        float mouseInfluence = smoothstep(0.4, 0.0, vDistanceToMouse);
        
        float wave = uTime * sin(vUv.x * 20.0 + uTime) * cos(vUv.y * 20.0 - uTime) * 0.05;
        newPosition.z += wave * mouseInfluence;

        newPosition.xy += (newPosition.xy - 0.5) * uScrollOffset;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.3);
    }
`;

export const fragment = `
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uTime;
    varying vec2 vUv;
    varying float vDistanceToMouse;

    void main() {
        vec2 distortedUV = vUv;
        float mouseInfluence = smoothstep(0.4, 0.0, vDistanceToMouse);
        
        distortedUV += sin(vUv * 20.0 + uTime) * 0.05 * mouseInfluence;
        
        
        vec4 color = texture2D(uTexture, distortedUV);
        
        gl_FragColor = color;
    }
`;
