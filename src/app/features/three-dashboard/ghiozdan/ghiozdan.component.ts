import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-ghiozdan',
  templateUrl: './ghiozdan.component.html',
  styleUrls: ['./ghiozdan.component.scss'],
})
export class GhiozdanComponent implements OnInit {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;

  constructor() {}

  ngOnInit(): void {
    this.container = document.getElementById('object-container');

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
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    this.scene.add(light);
  }

  initRenderer(): void {
    this.canvas = document.getElementById('object') as HTMLCanvasElement;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
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
    this.camera.position.z = 0.1;

    new OrbitControls(this.camera, this.renderer.domElement);
  }

  loadAndAddTexture(): void {
    const loader = new PLYLoader();
    loader.load('assets/texture/ghiozdan/ghiozdan.ply', (geometry) => {
      const material = new THREE.PointsMaterial({ size: 0.008 });
      material.vertexColors = true;
      const mesh = new THREE.Points(geometry, material);
      this.scene.add(mesh);
    });
  }

  onWindowResize(): void {
    this.container = document.getElementById('object-container');
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
