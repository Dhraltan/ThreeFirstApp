import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { ElasticService } from '@app/core/api/elastic.service';
import { HuhIDs } from '@app/shared/enum/hudIDs';
import { BufferGeometry } from 'three';

@Component({
  selector: 'app-ply-lucian',
  templateUrl: './ply-lucian.component.html',
  styleUrls: ['./ply-lucian.component.scss'],
})
export class PlyLucianComponent implements OnInit, OnChanges, OnDestroy {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  animationFrame: number;
  mesh: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;

  geometryMerged: THREE.BufferGeometry;
  pause = false;

  //colors
  originalColors: THREE.BufferAttribute;
  grayscaleColors: THREE.BufferAttribute;

  @Input() modelColorSelection: string;

  constructor(private elasticService: ElasticService) {}

  async ngOnInit(): Promise<void> {
    this.container = document.getElementById('canvas-container-lucian');

    this.initRenderer();
    this.initScene();
    this.initAndAddLight();
    this.initCamera();
    await this.getIndexData();
    this.loadAndAddTexture();

    window.addEventListener('resize', this.onWindowResize, false);

    this.animate();
  }

  ngOnChanges(): void {
    this.setColorBasedOnInput();
  }

  ngOnDestroy(): void {
    this.pause = true;
    cancelAnimationFrame(this.animationFrame);
    window.removeEventListener('resize', this.onWindowResize, false);
    this.renderer.dispose();
    this.camera = null;
    this.scene = null;
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

    let counter = 0;
    for (let index = 0; index < 13; index++) {
      loader
        .loadAsync(
          `assets/texture/nii3/rotated_dreapta/rotated_dreapta${index}.ply`
        )
        .then((geometry: BufferGeometry) => {
          if (geometry.attributes.normal) {
            geometry.deleteAttribute('normal');
          }
          if (this.geometryMerged) {
            this.geometryMerged = BufferGeometryUtils.mergeBufferGeometries([
              this.geometryMerged,
              geometry,
            ]);
          } else {
            this.geometryMerged = geometry;
          }
        })
        .finally(() => {
          counter++;
          if (counter == 13) {
            this.originalColors = this.geometryMerged.attributes.color.clone();

            const material = new THREE.PointsMaterial({ size: 0.008 });
            material.vertexColors = true;

            this.mesh = new THREE.Points(this.geometryMerged, material);
            this.scene.add(this.mesh);
          }
        });
    }
  }

  setGrayscaleColor(): void {
    if (!this.grayscaleColors) {
      this.grayscaleColors = this.originalColors.clone();
      for (
        let colorIndex = 0;
        colorIndex < this.grayscaleColors.count;
        colorIndex++
      ) {
        const r = this.grayscaleColors.array[colorIndex * 3];
        const g = this.grayscaleColors.array[colorIndex * 3 + 1];
        const b = this.grayscaleColors.array[colorIndex * 3 + 2];
        let lum = 0.299 * r + 0.587 * g + 0.114 * b;
        this.grayscaleColors.set([lum, lum, lum], colorIndex * 3);
      }
    }
    this.geometryMerged.setAttribute('color', this.grayscaleColors);
  }

  setOriginalColors(): void {
    this.geometryMerged.setAttribute('color', this.originalColors);
  }

  setColorBasedOnInput(): void {
    switch (this.modelColorSelection) {
      case HuhIDs.Original:
        this.setOriginalColors();
        break;
      case HuhIDs.Grayscale:
        this.setGrayscaleColor();
        break;
      default:
        break;
    }
  }

  onWindowResize = (): void => {
    this.container = document.getElementById('canvas-container-lucian');
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.render(this.scene, this.camera);
  };

  animate(): void {
    if (this.pause) {
      return;
    }
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
