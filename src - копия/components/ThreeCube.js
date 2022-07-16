import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const ThreeCube = () => {
    const cubeRef = useRef(null);
    useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const radius = 1;
    const widthSegments = 64;
    const heightSegments = 64;
    const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
    
    const texture = new THREE.TextureLoader().load('https://img5.goodfon.ru/original/1920x1200/9/27/materik-karta-mira-metall-chernyi-fon.jpg');

    const material = new THREE.MeshBasicMaterial( { map: texture } );

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

   
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 1.4;
    controls.maxDistance = 8;
    window.addEventListener('resize', onWindowResize, false)

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
  
    window.addEventListener('resize', onWindowResize, false);
    
    const animate = function () {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
    };

    animate();
    }, []);

    return (
      <>
        <div
          ref={cubeRef}
        ></div>
      </>
    );
};

export default ThreeCube;
