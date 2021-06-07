import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-welcome-text',
  templateUrl: './welcome-text.component.html',
  styleUrls: ['./welcome-text.component.scss'],
})
export class WelcomeTextComponent implements OnInit {
  scene: THREE.Scene;

  camera: THREE.PerspectiveCamera;
  cameraTarget: THREE.Vector3;

  renderer: THREE.WebGLRenderer;
  canvas: HTMLCanvasElement;
  container: HTMLElement;

  controls: OrbitControls;

  materials: THREE.MeshPhongMaterial[];

  constructor() {}

  ngOnInit(): void {
    this.initializeRenderer();
    this.animate();
  }

  initializeRenderer(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x00263d);
    this.scene.fog = new THREE.Fog(0x00263d, 500, 1500);

    this.container = document.getElementById('welcome-text-container');

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      3000
    );
    this.camera.position.set(0, 150, 500);
    this.cameraTarget = new THREE.Vector3(0, 150, 0);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, 0, 1).normalize();
    this.scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff)
    this.scene.add(ambientLight)

    const spaceTexture = new THREE.TextureLoader().load('assets/texture/background.jpg');
    this.scene.background = spaceTexture;


    const group = new THREE.Group();
    group.position.y = 150;
    group.position.x = -50;

    this.scene.add(group);

    const loader = new THREE.FontLoader();

    loader.load(
      'assets/fonts/helvetiker_regular.typeface.json',
      function (font) {
        const textGeo = new THREE.TextGeometry(
          '      Welcome to the \n Three View Application',
          {
            font: font,

            size: 90,
            height: 10,
            curveSegments: 4,

            bevelThickness: 2,
            bevelSize: 1.5,
            bevelEnabled: true,
          }
        );

        textGeo.computeBoundingBox();

        const centerOffset =
          -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

        const materials = [
          new THREE.MeshPhongMaterial({ color: 0x0cac64, flatShading: true, shininess: 0 }), // front
          new THREE.MeshPhongMaterial({ color: 0x0b9959 }), // side
        ];
        const textMesh1 = new THREE.Mesh(textGeo, materials);

        textMesh1.position.x = centerOffset;
        textMesh1.position.y = 30;
        textMesh1.position.z = -100;

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

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();

    window.addEventListener('resize', () => this.onWindowResize(), false);

  }

  animate(): void {
    requestAnimationFrame(() => {
      this.animate();
    });

    this.camera.lookAt(this.cameraTarget);

    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.controls.update();

    this.onWindowResize()
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
