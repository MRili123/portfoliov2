import React, { useEffect, useRef, useState } from 'react';
import './SectionWelcome.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SectionWelcome = () => {
  const containerRef = useRef(null);
  const [text, setText] = useState('3D Designer');
  const textArray = ["3D Designer", "Web Developer", "Freelancer"];
  let i = 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      i = (i + 1) % textArray.length;
      setText(textArray[i]);

      const span = document.querySelector(".dynamic-text");
      span.classList.remove("animate");
      setTimeout(() => {
        span.classList.add("animate");
      }, 100);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [textArray]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 60);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(2, 5, 5).normalize();
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let mixer, avatar;

    const adjustModelForScreen = () => {
      if (window.innerWidth <= 768) {
        avatar.scale.set(4, 4, 4);
        avatar.position.set(0, -4, 0); // Keep mobile settings
        camera.position.set(0, 1, 6);
        camera.lookAt(0, -0.5, 0);
      } else {
        avatar.scale.set(3.5, 3.5, 3.5); // Scale for desktop
        avatar.position.set(0, -1.5, 0); // Lower the model a bit
        camera.position.set(0, 2, 8); // Keep this camera position
        camera.lookAt(0, 0, 0);
      }
    };

    loader.load(
      './ilias3D_hello.glb',
      (gltf) => {
        avatar = gltf.scene;
        adjustModelForScreen();
        scene.add(avatar);

        mixer = new THREE.AnimationMixer(avatar);
        const animations = gltf.animations;
        const helloAction = mixer.clipAction(
          animations.find((clip) => clip.name.toLowerCase() === 'hello')
        );
        const idleAction = mixer.clipAction(
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
              }, 1500); // Wait 1.5 seconds before playing "hello" again
            }
          });
        }

        window.addEventListener('resize', () => {
          renderer.setSize(container.clientWidth, container.clientHeight);
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          adjustModelForScreen();
        });
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error occurred while loading the model:', error);
      }
    );

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="section-welcome">
      <div ref={containerRef} id="model-container" style={{ width: '100%', height: '100vh' }} />
      <div className="welcome">
        <h1>Hi, It's <span>Ilias</span></h1>
        <span>I am a</span>
        <h3 className="text-animation">
          <span className="dynamic-text animate" id='text-animate'>{text}</span>
        </h3>
      </div>
    </section>
  );
};

export default SectionWelcome;