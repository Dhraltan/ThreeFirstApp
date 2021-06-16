import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { HudIDs } from '@app/shared/enum/hudIDs';
import { BufferAttribute, BufferGeometry } from 'three';
import { ComputeColorsService } from '@app/core/services/compute-colors.service';
import { IndexData } from '@app/shared/interfaces/View-Model/IndexData';

@Component({
  selector: 'app-three-renderer',
  templateUrl: './three-renderer.component.html',
  styleUrls: ['./three-renderer.component.scss'],
})
export class ThreeRendererComponent implements OnInit, OnChanges, OnDestroy {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  animationFrame: number;
  mesh: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;

  geometryMerged: THREE.BufferGeometry;
  pause = false;

  @Input() modelColorSelection: string;
  @Input() indexData: IndexData;

  constructor(private computeColorsService: ComputeColorsService) {}

  ngOnInit(): void {
    this.container = document.getElementById('canvas-container-renderer');

    this.initRenderer();
    this.initScene();
    this.initAndAddLight();
    this.initCamera();
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
    this.canvas = document.getElementById('canvas-renderer') as HTMLCanvasElement;

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
            this.computeColorsService.setOriginalColors(
              this.geometryMerged.attributes.color as BufferAttribute
            );
            this.computeColorsService.setPositions(
              this.geometryMerged.attributes.position as BufferAttribute
            );

            const material = new THREE.PointsMaterial({ size: 0.025 });
            material.vertexColors = true;

            this.mesh = new THREE.Points(this.geometryMerged, material);
            this.scene.add(this.mesh);
          }
        });
    }
  }

  setColorBasedOnInput(): void {
    let newColors: THREE.BufferAttribute = null;
    let newPositions: THREE.BufferAttribute = null;
    
    switch (this.modelColorSelection) {
      case HudIDs.Original:
        newPositions = this.computeColorsService.getPositions();
        newColors = this.computeColorsService.getOriginalColors();
        break;
      case HudIDs.Grayscale:
        newPositions = this.computeColorsService.getPositions();
        newColors = this.computeColorsService.getGrayscaleColors();
        break;
      case HudIDs.Vibrations:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getVibrationsColor(this.indexData['Vibration[ms]']);
        break;
      case HudIDs.Temperature:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getTemperatureColors(this.indexData.BME680['temperature[*C]']);
        break;
      case HudIDs.Humidity:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getHumidityColors(this.indexData.BME680['humidity[%]']);
        break;
      case HudIDs.ATM:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getAtmosfericColors(this.indexData.BME680['atmospheric_pressure[hPa]']);
        break;
      case HudIDs.BME680ECO2:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getBMEECO2Colors(this.indexData.BME680['eCO2[ppm]']);
        break;
      case HudIDs.BME680TVOC:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getBMETVOCColors(this.indexData.BME680['bTVOC[ppm]']);
        break;
      case HudIDs.IAQ:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getIAQColors(this.indexData.BME680.IAQ);
        break;
      case HudIDs.SIAQ:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getSIAQColors(this.indexData.BME680.sIAQ);
        break;
      case HudIDs.CCS811ECO2:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getCCSECO2Colors(this.indexData.CCS811['eCO2[ppm]']);
        break;
      case HudIDs.CCS811TVOC:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getCCSTVOCColors(this.indexData.CCS811['eTVOC[ppb]']);
        break;
      case HudIDs.PM1:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getPM1Colors(this.indexData.ZH03B['PM1.0[ug/m3]']);
        break;
      case HudIDs.PM25:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getPM25Colors(this.indexData.ZH03B['PM2.5[ug/m3]']);
        break;
      case HudIDs.PM10:
        newPositions = this.computeColorsService.getComposedPositions();
        newColors = this.computeColorsService.getPM10Colors(this.indexData.ZH03B['PM10[ug/m3]']);
        break;
      default:
        break;
    }

    if (newPositions) {
      this.geometryMerged.setAttribute('position', newPositions);
    }
    if (newColors) {
      this.geometryMerged.setAttribute('color', newColors);
    }
  }

  onWindowResize = (): void => {
    this.container = document.getElementById('canvas-container-renderer');
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
}
