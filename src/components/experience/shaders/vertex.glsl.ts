export const vertex = /* glsl */ `

varying vec2 csm_vUv;

void main() {
  
  // Send the uv coordinates to fragmentShader
  csm_vUv = uv;
  
}`
