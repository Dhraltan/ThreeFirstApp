import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

@Component({
  selector: 'app-ply-lucian',
  templateUrl: './ply-lucian.component.html',
  styleUrls: ['./ply-lucian.component.scss']
})
export class PlyLucianComponent implements OnInit {

  container; 
  camera; 
  cameraTarget; 
  scene; 
  renderer;

  constructor() { }

  ngOnInit(): void {
    this.init();
		this.animate();
  }			

			 init() {

				this.container = document.createElement( 'div' );
				document.body.appendChild( this.container );

				this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
				this.camera.position.set( 3, 0.15, 3 );

				this.cameraTarget = new THREE.Vector3( 0, - 0.1, 0 );

				this.scene = new THREE.Scene();
				this.scene.background = new THREE.Color( 0x72645b );
				this.scene.fog = new THREE.Fog( 0x72645b, 2, 15 );


				// Ground

				const plane = new THREE.Mesh(
					new THREE.PlaneGeometry( 40, 40 ),
					new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
				);
				plane.rotation.x = - Math.PI / 2;
				plane.position.y = - 0.5;
				this.scene.add( plane );

				plane.receiveShadow = true;


				// PLY file

				const loader = new PLYLoader();
				loader.load( 'assets/texture/ghiozdan/ghiozdan.ply', function ( geometry ) {

					geometry.computeVertexNormals();

					const material = new THREE.MeshStandardMaterial( { vertexColors: true } );
					const mesh = new THREE.Mesh( geometry, material );

					mesh.position.y = 20;
					mesh.position.z = 30;
					mesh.rotation.x = - Math.PI / 2;
					mesh.scale.multiplyScalar( 10 );

					mesh.castShadow = true;
					mesh.receiveShadow = true;

					this.scene.add( mesh );

				} );

				loader.load( 'assets/texture/ghiozdan/ghiozdan.ply', function ( geometry ) {

					geometry.computeVertexNormals();

					const material = new THREE.MeshStandardMaterial( { color: 0x0055ff, flatShading: true } );
					const mesh = new THREE.Mesh( geometry, material );

					mesh.castShadow = true;
					mesh.receiveShadow = true;

					this.scene.add( mesh );

				} );

				// Lights

				this.scene.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );

				this.addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
				this.addShadowedLight( 0.5, 1, - 1, 0xffaa00, 1 );

				// renderer

				this.renderer = new THREE.WebGLRenderer( { antialias: true } );
				this.renderer.setPixelRatio( window.devicePixelRatio );
				this.renderer.setSize( window.innerWidth, window.innerHeight );
				this.renderer.outputEncoding = THREE.sRGBEncoding;

				this.renderer.shadowMap.enabled = true;

				this.container.appendChild( this.renderer.domElement );

				// resize

				window.addEventListener( 'resize', this.onWindowResize );

			}

			addShadowedLight( x, y, z, color, intensity ) {

				const directionalLight = new THREE.DirectionalLight( color, intensity );
				directionalLight.position.set( x, y, z );
				this.scene.add( directionalLight );

				directionalLight.castShadow = true;

				const d = 1;
				directionalLight.shadow.camera.left = - d;
				directionalLight.shadow.camera.right = d;
				directionalLight.shadow.camera.top = d;
				directionalLight.shadow.camera.bottom = - d;

				directionalLight.shadow.camera.near = 1;
				directionalLight.shadow.camera.far = 4;

				directionalLight.shadow.mapSize.width = 1024;
				directionalLight.shadow.mapSize.height = 1024;

				directionalLight.shadow.bias = - 0.001;

			}

			onWindowResize() {

				this.camera.aspect = window.innerWidth / window.innerHeight;
				this.camera.updateProjectionMatrix();

				this.renderer.setSize( window.innerWidth, window.innerHeight );

			}

			animate() {

				requestAnimationFrame( this.animate );

				this.render();

			}

			render() {

				const timer = Date.now() * 0.0005;

				this.camera.position.x = Math.sin( timer ) * 2.5;
				this.camera.position.z = Math.cos( timer ) * 2.5;

				this.camera.lookAt( this.cameraTarget );

				this.renderer.render( this.scene, this.camera );

			}










}
