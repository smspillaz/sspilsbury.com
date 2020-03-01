import * as THREE from 'three';

import { makeAnimatedCanvas } from 'components/AnimatedCanvas';

const generateCurvePoints = (n, start, width) =>
  [...Array(n).keys()].map(index => {
    const x = start + (width / n) * index;
    return new THREE.Vector3(x, 0, 0);
  });

export const BackgroundAnimation = makeAnimatedCanvas({
  init: canvas => {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    const sizeBuffer = new THREE.Vector2();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.getSize(sizeBuffer);
    renderer.setClearColor(0xffffff, 0);
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    const scene = new THREE.Scene();

    const uniforms = {
      color: {
        type: 'c',
        value: new THREE.Color('grey'),
      },
      time: {
        type: 'f',
        value: performance.now(),
      },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float time;
        attribute float lineIndex;

        varying float outTime;

        void main() {
          outTime = time / 1000.0;
          vec3 newPosition = vec3(
            position.x,
            sin(position.x * 50.0 + time / 1000.0 + lineIndex / 5.0) + (cos(time / 1000.0) + 1.0) / 2.0 - 6.0,
            -lineIndex
          );
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
        `,
      fragmentShader: `
        uniform vec3 color;
        varying float outTime;

        void main() {
          float add = (sin(outTime) + 1.0) / 2.0;
          gl_FragColor = vec4(vec3(color.r - add, color.g - add, color.b - add), (1.0 - add / 5.0));
        }
        `,
    });

    const lines = [...Array(10).keys()].map(
      () => new THREE.Line(new THREE.BufferGeometry(), material),
    );
    const curvePoints = lines.map(() => generateCurvePoints(10, -20, 40));
    lines.forEach((line, index) => {
      const positions = new Float32Array(curvePoints[index].length * 3);
      const indices = new Float32Array(curvePoints[index].length);
      line.geometry.setFromPoints(curvePoints[index]);
      line.geometry.addAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3).copyVector3sArray(
          curvePoints[index],
        ),
      );
      line.geometry.addAttribute(
        'lineIndex',
        new THREE.BufferAttribute(indices, 1).copyArray(
          [...new Array(curvePoints[index].length)].map(() => index),
        ),
      );
    });
    scene.add(...lines);

    // eslint-disable-next-line
    camera.position.z = 20;

    return {
      material,
      renderer,
      scene,
      camera,
      sizeBuffer,
    };
  },
  update: (
    lastTimestamp,
    timestamp,
    { material, renderer, scene, camera, sizeBuffer },
    { width, height },
  ) => {
    // performance optimization: Don't call setSize unless the size actually
    // changed. Calling setSize unconditionally sets DOM attributes and
    // resets the viewport, this has a nontrivial cost.
    renderer.getSize(sizeBuffer);

    if (sizeBuffer.width !== width || sizeBuffer.height !== height) {
      renderer.setSize(width, height);

      // eslint-disable-next-line
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    // eslint-disable-next-line
    material.uniforms.time.value = timestamp;
    renderer.render(scene, camera);
  },
});
