import * as THREE from 'three';

import { makeAnimatedCanvas } from 'components/AnimatedCanvas';

const curveWave = (offset, color, gradientTexture, nPoints) => {
  const curvaturePoints = [...Array(nPoints)].map(
    (_, i) => new THREE.Vector3(Math.sin(i) - 1, i * 1.5 + offset, Math.cos(i)),
  );
  const curve = new THREE.SplineCurve3(curvaturePoints);
  const geometry = new THREE.Geometry();
  geometry.vertices = curve.getPoints(200);
  const pointsMaterial = new THREE.PointsMaterial({
    color,
    size: 3,
    map: gradientTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthTest: false,
  });
  const lineMaterial = new THREE.LineBasicMaterial({
    color,
    linewidth: 3.0,
  });

  return [
    new THREE.Line(geometry, lineMaterial),
    new THREE.Points(geometry, pointsMaterial),
  ];
};

const SkyboxShaders = {
  vertex: `varying vec3 vPosition;
     void main() {
         vPosition = position;
         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
     }`,
  fragment: `varying vec3 vPosition;
      void main() {
          gl_FragColor = vec4(0.0, 0.0, -vPosition.y / 300.0 + 0.15, 1.0);
      }`,
};

export const Trinity = makeAnimatedCanvas({
  init: canvas => {
    const gradientCanvas = document.createElement('canvas');
    const gradientSize = 512;
    const halfGradientSize = gradientSize / 2;
    gradientCanvas.width = gradientSize;
    gradientCanvas.height = gradientSize;

    const gradientCanvasContext = gradientCanvas.getContext('2d');
    const gradient = gradientCanvasContext.createRadialGradient(
      halfGradientSize,
      halfGradientSize,
      halfGradientSize,
      halfGradientSize,
      halfGradientSize,
      0,
    );
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, 'white');
    gradientCanvasContext.fillStyle = gradient;
    gradientCanvasContext.fillRect(0, 0, gradientSize, gradientSize);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      sortObjects: true,
    });

    const gradientTexture = new THREE.Texture(gradientCanvas);
    gradientTexture.anisotropy = renderer.getMaxAnisotropy();
    gradientTexture.magFilter = THREE.NearestFilter;
    gradientTexture.needsUpdate = true;

    const waves = curveWave(0, 0xff0000, gradientTexture, 50)
      .concat(curveWave(-5, 0x00ff00, gradientTexture, 50))
      .concat(curveWave(-3, 0x0000ff, gradientTexture, 50));

    waves.forEach(w => {
      scene.add(w);
    });

    camera.position.z = 6;
    camera.position.y = 5;
    camera.rotation.x = -0.1;

    const skyboxGeometry = new THREE.CubeGeometry(100, 100, 100);
    const skyboxMaterial = new THREE.ShaderMaterial({
      vertexShader: SkyboxShaders.vertex,
      fragmentShader: SkyboxShaders.fragment,
    });

    const materialArray = [...Array(6)].map(() => skyboxMaterial);
    materialArray.forEach(m => {
      // eslint-disable-next-line
      m.side = THREE.BackSide
    });

    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    skybox.position.y += 5;

    scene.add(skybox);

    return {
      renderer,
      scene,
      camera,
      waves,
    };
  },
  update: (
    lastTimestamp,
    timestamp,
    { renderer, camera, scene, waves },
    { width, height },
  ) => {
    renderer.setSize(width, height);
    // eslint-disable-next-line
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    waves.forEach(w => {
      // eslint-disable-next-line
      w.rotation.y += 0.01;
      // eslint-disable-next-line
      w.position.y = Math.sin(timestamp / 1000);
    });
    renderer.render(scene, camera);
  },
});
