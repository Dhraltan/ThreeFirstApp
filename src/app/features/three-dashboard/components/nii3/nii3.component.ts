import { Component, Input, OnInit } from '@angular/core';
import { ComputeColorsService } from '@app/core/services/compute-colors.service';
import { HudIDs } from '@app/shared/enum/hudIDs';
import { IndexData } from '@app/shared/interfaces/View-Model/IndexData';
import * as THREE from 'three';
import { BufferAttribute } from 'three';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

@Component({
  selector: 'app-nii3',
  templateUrl: './nii3.component.html',
  styleUrls: ['./nii3.component.scss']
})
export class Nii3Component implements OnInit {

  container: HTMLElement;
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  animationFrame: number;
  mesh: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>;

  xLimit = [-11, 3, 12];
  yLimit = [-6, 2, 8];
  zLimit = [-18, -12, -5];

  extraPoints = {
    xLimit: [-17, -7, 4],
    yLimit: [-6, 2, 8],
    zLimit: [8, 16, 21],
  };

  geometryMerged: THREE.BufferGeometry;
  pause = false;

  @Input() modelColorSelection: string;
  @Input() indexData: IndexData[];

  constructor(private computeColorsService: ComputeColorsService) {}

  ngOnInit(): void {
    this.container = document.getElementById('canvas-container-renderer-nii3');
    this.computeColorsService.setLimits(this.xLimit, this.yLimit, this.zLimit);
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
    this.computeColorsService.clearAllData();
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
    this.canvas = document.getElementById(
      'canvas-renderer-nii3'
    ) as HTMLCanvasElement;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });

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
    this.camera.position.z = 3;
    this.camera.rotateX(Math.PI);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  loadAndAddTexture(): void {
    const spaceTexture = new THREE.TextureLoader().load(
      'assets/texture/background.jpg'
    );
    this.scene.background = spaceTexture;

    let counter = 0;

    const loader = new PLYLoader();
    loader
      .loadAsync('assets/texture/newData/DenseNormal.ply')
      .then((geometry) => {
        geometry.computeVertexNormals();
        geometry.normalizeNormals();
        geometry.rotateX(4.51239);
        geometry.translate(4, -8, -13);

        if (this.geometryMerged) {
          this.geometryMerged = BufferGeometryUtils.mergeBufferGeometries([
            this.geometryMerged,
            geometry,
          ]);
        } else {
          this.geometryMerged = geometry;
        }
        counter++;
      })
      .finally(() => {
        if (counter == 2) {
          this.computeColorsService.setOriginalColors(
            this.geometryMerged.attributes.color as BufferAttribute
          );
          this.computeColorsService.setPositions(
            this.geometryMerged.attributes.position as BufferAttribute
          );

          const material = new THREE.PointsMaterial({ size: 0.2 });
          material.vertexColors = true;

          this.mesh = new THREE.Points(this.geometryMerged, material);
          this.scene.add(this.mesh);
        }
      });

    loader
      .loadAsync('assets/texture/newData/Usa3.ply')
      .then((geometry) => {
        geometry.computeVertexNormals();
        geometry.normalizeNormals();
        geometry.rotateX(4.61239);
        geometry.rotateY(Math.PI);
        geometry.translate(-10, -9, 16);
        if (this.geometryMerged) {
          this.geometryMerged = BufferGeometryUtils.mergeBufferGeometries([
            this.geometryMerged,
            geometry,
          ]);
        } else {
          this.geometryMerged = geometry;
        }
        counter++;
      })
      .finally(() => {
        if (counter == 2) {
          this.computeColorsService.setOriginalColors(
            this.geometryMerged.attributes.color as BufferAttribute
          );
          this.computeColorsService.setPositions(
            this.geometryMerged.attributes.position as BufferAttribute
          );

          const material = new THREE.PointsMaterial({ size: 0.2 });
          material.vertexColors = true;

          this.mesh = new THREE.Points(this.geometryMerged, material);
          this.scene.add(this.mesh);
        }
      });
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
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getVibrationsColor(
          this.indexData[0]['Vibration[ms]'], this.indexData[1]['Vibration[ms]'],
        );
        break;
      case HudIDs.Temperature:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getTemperatureColors(
          this.indexData[0].BME680['temperature[*C]'],this.indexData[1].BME680['temperature[*C]']
        );
        break;
      case HudIDs.Humidity:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getHumidityColors(
          this.indexData[0].BME680['humidity[%]'],this.indexData[1].BME680['humidity[%]']
        );
        break;
      case HudIDs.ATM:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getAtmosfericColors(
          this.indexData[0].BME680['atmospheric_pressure[hPa]'],this.indexData[1].BME680['atmospheric_pressure[hPa]']
        );
        break;
      case HudIDs.BME680ECO2:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getBMEECO2Colors(
          this.indexData[0].BME680['eCO2[ppm]'],this.indexData[1].BME680['eCO2[ppm]']
        );
        break;
      case HudIDs.BME680TVOC:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getBMETVOCColors(
          this.indexData[0].BME680['bTVOC[ppm]'],this.indexData[1].BME680['bTVOC[ppm]']
        );
        break;
      case HudIDs.IAQ:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getIAQColors(
          this.indexData[0].BME680.IAQ,this.indexData[1].BME680.IAQ
        );
        break;
      case HudIDs.SIAQ:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getSIAQColors(
          this.indexData[0].BME680.sIAQ,this.indexData[1].BME680.sIAQ
        );
        break;
      case HudIDs.CCS811ECO2:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getCCSECO2Colors(
          this.indexData[0].CCS811['eCO2[ppm]'],this.indexData[1].CCS811['eCO2[ppm]']
        );
        break;
      case HudIDs.CCS811TVOC:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getCCSTVOCColors(
          this.indexData[0].CCS811['eTVOC[ppb]'],this.indexData[1].CCS811['eTVOC[ppb]']
        );
        break;
      case HudIDs.PM1:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getPM1Colors(
          this.indexData[0].ZH03B['PM1.0[ug/m3]'],this.indexData[1].ZH03B['PM1.0[ug/m3]']
        );
        break;
      case HudIDs.PM25:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getPM25Colors(
          this.indexData[0].ZH03B['PM2.5[ug/m3]'],this.indexData[1].ZH03B['PM2.5[ug/m3]']
        );
        break;
      case HudIDs.PM10:
        newPositions = this.computeColorsService.getComposedPositions(19, this.extraPoints);
        newColors = this.computeColorsService.getPM10Colors(
          this.indexData[0].ZH03B['PM10[ug/m3]'],this.indexData[1].ZH03B['PM10[ug/m3]']
        );
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
    this.container = document.getElementById('canvas-container-renderer-nii3');
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
