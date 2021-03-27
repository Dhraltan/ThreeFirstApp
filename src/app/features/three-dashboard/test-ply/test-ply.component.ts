import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'app-test-ply',
  templateUrl: './test-ply.component.html',
  styleUrls: ['./test-ply.component.scss']
})
export class TestPlyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  const scene: THREE.Scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set(500, 500, 500)
scene.add(light);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1500)
camera.position.z = 40

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)


const envTexture = new THREE.CubeTextureLoader().load(["assets/texture/cube-test/px.png", "assets/texture/cube-test/nx.png", "assets/texture/cube-test/py.png", "assets/texture/cube-test/ny.png", "assets/texture/cube-test/pz.png", "assets/texture/cube-test/nz.png"]);
envTexture.mapping = THREE.CubeReflectionMapping;
const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    envMap: envTexture,
    metalness: 0.1,
    roughness: 0.5,
    transparent: false,
    side: THREE.DoubleSide,
});
let mesh: THREE.Mesh

var loader = new PLYLoader();
 	loader.load('assets/texture/bearded-guy-ply/Bearded guy.ply', function (geometry) {
 	// loader.load('assets/texture/luci.ply', function (geometry) {
 
    geometry.computeVertexNormals();
    mesh = new THREE.Mesh(geometry, material)
    mesh.rotateX(-Math.PI / 2)
    scene.add(mesh)

 	} );

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

var animate = function () {
    requestAnimationFrame(animate)

    render()
};

function render() {
    renderer.render(scene, camera)
}
animate();

}
}
