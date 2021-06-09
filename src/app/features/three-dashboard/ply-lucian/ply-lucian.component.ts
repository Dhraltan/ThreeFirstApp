import { Component, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BufferAttribute } from 'three';
import { ElasticService } from '@app/core/api/elastic.service';

@Component({
  selector: 'app-ply-lucian',
  templateUrl: './ply-lucian.component.html',
  styleUrls: ['./ply-lucian.component.scss'],
})
export class PlyLucianComponent implements OnInit, OnDestroy {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  animationFrame: number;

  //colors
  originalColors;

  constructor(private elasticService: ElasticService) {}

  async ngOnInit(): Promise<void> {
    this.container = document.getElementById('canvas-container-lucian');

    this.initRenderer();
    this.initScene();
    this.initAndAddLight();
    this.initCamera();
    await this.getIndexData();
    this.loadAndAddTexture();

    window.addEventListener('resize', () => this.onWindowResize(), false);

    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrame);
  }

  initScene(): void {
    this.scene = new THREE.Scene();
  }

  initAndAddLight(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff);
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
    const spaceTexture = new THREE.TextureLoader().load(
      'assets/texture/background.jpg'
    );
    this.scene.background = spaceTexture;

    const loader = new PLYLoader();

    for (let index = 0; index < 13; index++) {
      loader.load(
        `assets/texture/nii3/rotated_dreapta/rotated_dreapta${index}.ply`,
        (geometry) => {
          const material = new THREE.PointsMaterial({ size: 0.008 });
          material.vertexColors = true;

          const colors = geometry.attributes.color.clone();
          for (let colorIndex = 0; colorIndex < colors.count; colorIndex++) {
            const r = colors.array[colorIndex * 3];
            const g = colors.array[colorIndex * 3 + 1];
            const b = colors.array[colorIndex * 3 + 2];
            let lum = 0.299 * r + 0.587 * g + 0.114 * b;
            colors.set([lum, lum, lum], colorIndex * 3);
          }
          geometry.setAttribute('color', colors);

          const mesh = new THREE.Points(geometry, material);
          this.scene.add(mesh);
        }
      );
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
    this.animationFrame = requestAnimationFrame(() => this.animate());

    this.renderer.render(this.scene, this.camera);
    this.onWindowResize();
  }

  async getIndexData() {
    return this.elasticService.getIndex().catch((err) => {
      console.error(err);
    });
  }
}
