export const vertex = /* glsl */ `

varying vec3 csm_vPositionW;
varying vec3 csm_vNormalW;

void main() {
  
  // Send the uv coordinates to fragmentShader
  csm_vNormalW = normalize(mat3(modelMatrix) * normal);
  csm_vPositionW = (modelMatrix * vec4(position, 1.0)).xyz;
}`
