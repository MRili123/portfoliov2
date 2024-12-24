import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const App = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      110,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.75, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 60);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(2, 5, 5).normalize();
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(-5, 3, 5);
    scene.add(pointLight);

    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemiLight);

    // Add a shadow-receiving plane
    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.5;
    plane.receiveShadow = true;
    scene.add(plane);

    // Environment map
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    const envMap = cubeTextureLoader.load([
      'path_to_px.jpg',
      'path_to_nx.jpg',
      'path_to_py.jpg',
      'path_to_ny.jpg',
      'path_to_pz.jpg',
      'path_to_nz.jpg',
    ]);
    scene.environment = envMap;
    scene.background = envMap;

    // Load the GLTF model
    const loader = new GLTFLoader();
    let mixer, helloAction, idleAction;

    loader.load(
      './ilias3D_hello.glb',
      (gltf) => {
        const avatar = gltf.scene;
        avatar.position.set(0, -6, 0);
        avatar.scale.set(5, 5, 5);
        scene.add(avatar);

        // Animation setup
        mixer = new THREE.AnimationMixer(avatar);
        const animations = gltf.animations;

        helloAction = mixer.clipAction(
          animations.find((clip) => clip.name.toLowerCase() === 'hello')
        );
        idleAction = mixer.clipAction(
          animations.find((clip) => clip.name.toLowerCase() === 'idle')
        );

        if (helloAction && idleAction) {
          helloAction.loop = THREE.LoopOnce;
          helloAction.clampWhenFinished = true;
          idleAction.loop = THREE.LoopRepeat;

          helloAction.play();

          mixer.addEventListener('finished', (e) => {
            if (e.action === helloAction) {
              idleAction.reset();
              idleAction.crossFadeFrom(helloAction, 0.5, true);
              idleAction.play();

              setTimeout(() => {
                helloAction.reset();
                helloAction.crossFadeFrom(idleAction, 0.5, true);
                helloAction.play();
              }, 1500);
            }
          });
        }
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} id="model-container" style={{ width: '100%', height: '100vh' }} />;
};

export default App;
