import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-dashboard',
  templateUrl: './three-dashboard.component.html',
  styleUrls: ['./three-dashboard.component.scss'],
})
export class ThreeDashboardComponent implements OnInit {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

  ngOnInit() {
    this.initializeRenderer();
    this.addBox();
    this.addLight();
    this.animate();
  }

  initializeRenderer(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    this.camera.position.z = 4;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('#e5e5e5');

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  addBox(): void {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('assets/texture/cube-test/');
    const cubeTexture = loader.load([
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png',
    ]);
    const material = new THREE.MeshLambertMaterial({ envMap: cubeTexture });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  addLight() {
    const light = new THREE.PointLight(0xffffff, 1, 500);
    light.position.set(3, 2, 10);
    this.scene.add(light);
  }

  animate(): void {
    requestAnimationFrame(() => {
      this.animate();
    });
    this.cube.rotation.x += 0.005;
    this.cube.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
