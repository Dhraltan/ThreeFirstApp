import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BufferAttribute } from 'three';

@Component({
  selector: 'app-ply-lucian',
  templateUrl: './ply-lucian.component.html',
  styleUrls: ['./ply-lucian.component.scss'],
})
export class PlyLucianComponent implements OnInit {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;

  constructor() {}

  ngOnInit(): void {
    this.container = document.getElementById('canvas-container-lucian');

    this.initRenderer();
    this.initScene();
    this.initAndAddLight();
    this.initCamera();
    this.loadAndAddTexture();

    window.addEventListener('resize', () => this.onWindowResize(), false);

    this.animate();
  }

  initScene(): void {
    this.scene = new THREE.Scene();
  }

  initAndAddLight(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff)
    this.scene.add(ambientLight);
  }

  initRenderer(): void {
    this.canvas = document.getElementById('canvas-lucian') as HTMLCanvasElement;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    // this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
  }

  initCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1500
    );
    this.camera.position.z = 10;

    new OrbitControls(this.camera, this.renderer.domElement);
  }

  loadAndAddTexture(): void {

    const spaceTexture = new THREE.TextureLoader().load('assets/texture/background.jpg');
    this.scene.background = spaceTexture;

    const loader = new PLYLoader();

		for (let index = 0; index < 13; index++) {
			loader.load(`assets/texture/nii3/rotated_dreapta/rotated_dreapta${index}.ply`, (geometry) => {
      const material = new THREE.PointsMaterial({ size: 0.008 });
      material.vertexColors = true;

      // For furthur use to set the color dynamically
      // const colors = geometry.attributes.color.clone()
      // for (let index = 0; index < colors.count; index++) {
      //   colors.set(new Float32Array([1,1,1]),index*3)
      // }
      // geometry.setAttribute('color',colors)

      const mesh = new THREE.Points(geometry, material);
      this.scene.add(mesh);
    });
		}
  }

  onWindowResize(): void {
    this.container = document.getElementById('canvas-container-lucian');
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.render(this.scene, this.camera);
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());

    this.renderer.render(this.scene, this.camera);
    this.onWindowResize();
  }
}
