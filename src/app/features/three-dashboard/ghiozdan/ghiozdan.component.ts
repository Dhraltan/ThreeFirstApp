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

  animationFrame:number;

  constructor() {}

  ngOnInit(): void {
    this.container = document.getElementById('canvas-container-ghiozdan');

    this.initRenderer();
    this.initScene();
    this.initAndAddLight();
    this.initCamera();
    this.loadAndAddTexture();

    window.addEventListener('resize', () => this.onWindowResize(), false);

    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
  }


  initScene(): void {
    this.scene = new THREE.Scene();

    const axesHelper = new THREE.AxesHelper( 5 );
    this.scene.add( axesHelper );

  }

  initAndAddLight(): void {
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    this.scene.add(light);
  }

  initRenderer(): void {
    this.canvas = document.getElementById('canvas-ghiozdan') as HTMLCanvasElement;

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
      0.2,
      2000
    );

    this.camera.position.z = 10;

    new OrbitControls(this.camera, this.renderer.domElement);
  }

  loadAndAddTexture(): void {
    const loader = new PLYLoader();
    loader.load('assets/texture/newData/DenseNormal.ply', (geometry) => {
      const material = new THREE.PointsMaterial({size:0.2});
      geometry.computeVertexNormals()
      geometry.normalizeNormals()
      material.vertexColors = true;
      const mesh = new THREE.Points(geometry, material);
      mesh.rotateX(4.51239)
      this.scene.add(mesh);
      console.log(mesh)
      console.log(geometry)
    });


    loader.load('assets/texture/newData/Usa3.ply', (geometry) => {
      const material = new THREE.PointsMaterial({ size: 0.15 });
      geometry.computeVertexNormals()
      geometry.normalizeNormals()
      material.vertexColors = true;
      const mesh = new THREE.Points(geometry, material);
      mesh.rotateX(4.81239)
      mesh.rotateZ(Math.PI)
      mesh.translateX(13)
      mesh.translateY(30)
      mesh.translateZ(2)
      this.scene.add(mesh);
    });
  }

  onWindowResize(): void {
    this.container = document.getElementById('canvas-container-ghiozdan');
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
    this.animationFrame = requestAnimationFrame(() => this.animate());

    this.renderer.render(this.scene, this.camera);
    this.onWindowResize();
  }
}
