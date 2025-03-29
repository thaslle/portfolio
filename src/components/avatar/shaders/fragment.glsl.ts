export const fragment = /* glsl */ `

varying vec3 csm_vPositionW;
varying vec3 csm_vNormalW;

void main() {
   
    vec4 baseColor = csm_DiffuseColor; // Existing material color
    vec3 viewDirectionW = normalize(cameraPosition - csm_vPositionW);
    //viewDirectionW.y = viewDirectionW.y - 0.1;
    viewDirectionW.x = viewDirectionW.x + 0.1;

    vec3 rimColor = clamp(baseColor.rgb + vec3(0.7, 0.7, 0.0), 0.6, 1.0);
    float rimStrength = 1.8;
    float rimWidth = 0.25;

    float fresnelDotV = max(0.0, rimWidth - clamp(dot(viewDirectionW, csm_vNormalW), 0.0, 1.0));
    vec3 fresnelTerm = fresnelDotV * rimColor * rimStrength;

    // Combine Fresnel effect with the base color
    vec3 fresnelColor = mix(baseColor.rgb, vec3(0.7), fresnelTerm);


    csm_DiffuseColor = vec4( fresnelColor , baseColor.a );
}
`
