import PropTypes from 'prop-types';
import * as THREE from 'three';

import { makeAnimatedCanvas } from 'components/AnimatedCanvas';

export const LogosAnimation = makeAnimatedCanvas({
  init: canvas => {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0xffffff, 0);
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    const scene = new THREE.Scene();
    const loader = new THREE.TextureLoader();
    const sizeBuffer = new THREE.Vector2();
    const logoMap = {};

    renderer.getSize(sizeBuffer);

    return {
      sizeBuffer,
      logoMap,
      loader,
      renderer,
      scene,
      camera,
    };
  },
  update: (
    lastTimestamp,
    timestamp,
    { sizeBuffer, logoMap, loader, renderer, scene, camera },
    { width, height, logoURLs, orientation, xOffset, animationOffset = 0 },
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

    /* We need to check if see if there's anything to update here, first by
     * adding all the logos that we don't have to the scene and then removing
     * all the logos that we do have from the scene */
    const incomingLogos = new Set(logoURLs);
    const logosInScene = new Set(Object.keys(logoMap));

    const logosToBeRemoved = [
      ...new Set([...logosInScene].filter(l => !incomingLogos.has(l))),
    ];
    const logosToBeAdded = [
      ...new Set([...incomingLogos].filter(l => !logosInScene.has(l))),
    ];

    /* Removal can happen sycnhronously */
    scene.remove(...[...logosToBeRemoved].map(l => logoMap[l]));
    [...logosToBeRemoved].forEach(l => {
      // eslint-disable-next-line
      delete logoMap[l];
    });

    /* The loading of the image data into the texture happens
     * asynchronously, but we can immediatley add the object into
     * our scene and just allow it to pop up */
    logosToBeAdded.forEach(url => {
      // eslint-disable-next-line
      const texture = loader.load(url);

      const material = new THREE.MeshBasicMaterial({ map: texture });
      const geometry = new THREE.PlaneGeometry(
        1,
        texture.width / texture.height,
        1,
        1,
      );
      const object = new THREE.Mesh(geometry, material);

      // eslint-disable-next-line
      logoMap[url] = object;
      scene.add(object);
    });

    Object.keys(logoMap)
      .filter(k => logoMap[k].object !== null)
      .forEach((k, i, array) => {
        const slice = (2 * Math.PI) / array.length;
        const offset = slice * i;
        const step = (timestamp + animationOffset) * orientation;
        // eslint-disable-next-line
        logoMap[k].position.x = Math.cos(step / 3000 + offset) * 2.4 + xOffset;
        // eslint-disable-next-line
        logoMap[k].position.y = Math.sin(step / 3000 + offset) * 2.4;
      });

    // eslint-disable-next-line
    camera.position.z = 4;

    renderer.render(scene, camera);
  },
  propTypes: {
    logoURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
    orientation: PropTypes.number.isRequired,
    xOffset: PropTypes.number.isRequired,
    animationOffset: PropTypes.number,
  },
});
