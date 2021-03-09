import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/api/auth.service';
import * as THREE from 'three';

@Component({
  selector: 'app-three-dashboard-component',
  templateUrl: './three-dashboard-component.component.html',
  styleUrls: ['./three-dashboard-component.component.scss'],
})
export class ThreeDashboardComponent implements OnInit {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  canvas: HTMLCanvasElement;

  constructor() {}

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

    this.canvas = document.getElementById(
      'web-gl-renderer'
    ) as HTMLCanvasElement;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor('#e5e5e5');

    window.addEventListener('resize', () => this.onWindowResize(), false);
    window.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
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
    // this.cube.rotation.x += 0.005;
    // this.cube.rotation.y += 0.005;

    this.rotateObject();

    this.renderer.render(this.scene, this.camera);
  }

  rotateObject() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.rotation.y += this.mouse.y / 10;
      intersects[i].object.rotation.x += this.mouse.y / 10;
    }
  }

  onMouseMove(event) {
    console.log(this.mouse);
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
