export const fragment = /* glsl */ `

varying vec2 csm_vUv;

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

void main() {
   
    float pos = 0.065;
    float radius = 0.001;

    vec3 rlb = vec3(circle(vec2(csm_vUv + pos), radius));
    vec3 rrb = vec3(circle(vec2(csm_vUv.x - pos, csm_vUv.y + pos), radius));
    vec3 rlt = vec3(circle(vec2(csm_vUv.x + pos, csm_vUv.y - pos), radius));
    vec3 rrt = vec3(circle(vec2(csm_vUv - pos), radius));
   
    vec2 bl = step(vec2(pos * 0.08), csm_vUv);
    vec2 tr = step(vec2(pos * 0.08), 1.0 - csm_vUv);
   
    vec3 alpha = rlb + rrb + rlt + rrt + vec3(bl.x * tr.x) + vec3(bl.y * tr.y);

csm_DiffuseColor = vec4( csm_DiffuseColor.rgb, alpha );
}
`
