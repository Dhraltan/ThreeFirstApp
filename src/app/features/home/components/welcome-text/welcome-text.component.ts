import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-welcome-text',
  templateUrl: './welcome-text.component.html',
  styleUrls: ['./welcome-text.component.scss'],
})
export class WelcomeTextComponent implements OnInit {
  scene: THREE.Scene;

  camera: THREE.PerspectiveCamera;
  cameraTarget;

  renderer: THREE.WebGLRenderer;
  canvas: HTMLCanvasElement;
  container: HTMLElement;

  materials;

  constructor() {}

  ngOnInit(): void {
    this.initializeRenderer();
    this.animate()
  }

  initializeRenderer(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.fog = new THREE.Fog(0x000000, 250, 1400);

    this.container = document.getElementById('welcome-text-container');
    console.log(this.container.clientWidth);

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      2000
    );
    this.camera.position.set(0, 200, 600);
    this.cameraTarget = new THREE.Vector3(0, 150, 0);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, 0, 1).normalize();
    this.scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(0, 300, 90);
    this.scene.add(pointLight);

    

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.MeshBasicMaterial({
        color: 0x0b9959,
        opacity: 0.5,
        transparent: true,
      })
    );
    plane.position.y = 0;
    plane.rotation.x = -Math.PI / 2;
    this.scene.add(plane);



    const group = new THREE.Group();
    group.position.y = 150;

    this.scene.add(group);

    const loader = new THREE.FontLoader();

    loader.load(
      'assets/fonts/helvetiker_regular.typeface.json',
      function (font) {
        const textGeo = new THREE.TextGeometry('      Welcome to the \n Three View Application', {
          font: font,

          size: 90,
          height: 20,
          curveSegments: 4,

          bevelThickness: 2,
          bevelSize: 1.5,
          bevelEnabled: true,
        });

        textGeo.computeBoundingBox();

        const centerOffset =
          -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);


          const materials = [
            new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
            new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
          ];
        const textMesh1 = new THREE.Mesh(textGeo, materials);

        textMesh1.position.x = centerOffset;
        textMesh1.position.y = 30;
        textMesh1.position.z = 0;

        textMesh1.rotation.x = 0;
        textMesh1.rotation.y = Math.PI * 2;

        group.add(textMesh1);
      }
    );

    this.canvas = document.getElementById('three-text') as HTMLCanvasElement;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setClearColor('#e5e5e5');

    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  animate(): void {
    requestAnimationFrame(() => {
      this.animate();
    });

    this.camera.lookAt(this.cameraTarget);

  this.renderer.clear();
  this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
  }
}
