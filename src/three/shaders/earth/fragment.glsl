uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  vec3 normal = normalize(vNormal);
  vec3 color = vec3(0.0);

    // Sun orientation
  float sunOrientation = dot(normal, uSunDirection);

    // Day/Night color
  float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
  vec3 dayColor = texture(uDayTexture, vUv).rgb;
  vec3 nightColor = texture(uNightTexture, vUv).rgb;
  color = mix(nightColor, dayColor, dayMix);

    // Specular clouds
  vec2 specularCloudsColor = texture(uSpecularCloudsTexture, vUv).rg;

    // Clouds
  float landDensity = 0.3;
  float waterDensity = 0.8;

  float cloudsMix = smoothstep(0.3, 1., specularCloudsColor.g);
  float cloudsDensity = mix(landDensity, waterDensity, specularCloudsColor.r);
  cloudsMix *= cloudsDensity;

  cloudsMix *= dayMix; //  clouds only visible in day
  color = mix(color, vec3(1.0), cloudsMix);

    // Fresnel
  float fresnel = dot(viewDirection, normal) + 1.0;
  fresnel = pow(fresnel, 2.0);

    // Atmosphere color
  float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
  vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
  color = mix(color, atmosphereColor, fresnel * dayMix);

    // Specular
  vec3 reflection = reflect(-uSunDirection, normal);
  float specular = -dot(reflection, viewDirection);
  specular = clamp(specular, 0.0, 1.0);
  specular = pow(specular, 64.0);
  specular *= specularCloudsColor.r;

  vec3 specularColor = mix(vec3(1.0), atmosphereColor, fresnel);
  color += specular * specularColor;

    // Final color
  gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}