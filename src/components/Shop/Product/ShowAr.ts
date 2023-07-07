import * as THREE from 'three';

import ARButton from '@/components/Shop/Product/ARButton';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
export const loadGLTF = (path: string) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      resolve(gltf);
    });
  });
}
const initialize = async (url: string) => {
  console.log(url)
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();

  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(- Math.PI / 2);
  const reticleMaterial = new THREE.MeshBasicMaterial();
  const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);


  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;

  const arButton = ARButton.createButton(renderer, { requiredFeatures: ['hit-test'], optionalFeatures: ['dom-overlay'], domOverlay: { root: document.body } });
  document.body.appendChild(renderer.domElement);
  document.body.appendChild(arButton);

  const controller = renderer.xr.getController(0);
  scene.add(controller);
  controller.addEventListener('select', async () => {
    // const geometry = new THREE.BoxGeometry(0.06, 0.06, 0.06);
    // const material = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() });
    // const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.setFromMatrixPosition(reticle.matrix);
    // mesh.scale.y = Math.random() * 2 + 1;
    // scene.add(mesh);


    const raccoon: any = await loadGLTF(url);
    // raccoon.scene.scale.set(0.1, 0.1, 0.1);

    raccoon.scale.y = Math.random() * 2 + 1;
    
    // raccoon.scene.position.set(0, -0.4, 0);
    raccoon.scene.position.setFromMatrixPosition(reticle.matrix);
    

    scene.add(raccoon.scene);

  });

  renderer.xr.addEventListener("sessionstart", async (e) => {
    const session: any = renderer.xr.getSession();
    const viewerReferenceSpace = await session.requestReferenceSpace("viewer");
    const hitTestSource = await session.requestHitTestSource({ space: viewerReferenceSpace });

    renderer.setAnimationLoop((timestamp, frame) => {
      if (!frame) return;

      const hitTestResults = frame.getHitTestResults(hitTestSource);

      if (hitTestResults.length) {
        const hit = hitTestResults[0];
        const referenceSpace: any = renderer.xr.getReferenceSpace(); // ARButton requested 'local' reference space
        const hitPose: any = hit.getPose(referenceSpace);

        reticle.visible = true;
        reticle.matrix.fromArray(hitPose.transform.matrix);
      } else {
        reticle.visible = false;
      }

      renderer.render(scene, camera);
    });
  });

  renderer.xr.addEventListener("sessionend", () => {
    console.log("session end");
  });

}
export default initialize;
