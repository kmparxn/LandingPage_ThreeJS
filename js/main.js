import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
	  antialias: true,
    alpha: true,
    canvas: document.querySelector('#bg')
});	
//renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const loader = new GLTFLoader();
var obj;
let house;
let mixer;
const clock = new THREE.Clock();
loader.load( '../assest/animated_t-rex_dinosaur_biting_attack_loop/scene.gltf', function ( gltf ) {
  scene.add( gltf.scene );
	house = gltf.scene.children[0];

                mixer = new THREE.AnimationMixer(house);
                mixer.clipAction(gltf.animations[0]).play();

                animate();
},
undefined, function ( error ) {
    console.error( error );
} );

			
const light = new THREE.AmbientLight( 0x404040, 5);
scene.add(light);
let light2 = new THREE.DirectionalLight(0xFFFFFF, 5);
scene.add(light2);

camera.position.set(-1.6, 0.6, 1.7);

function animate(){
	requestAnimationFrame(animate);
	house.rotation.z = -1.4 ;
	const delta = clock.getDelta();
	mixer.update(delta);

	renderer.render(scene, camera);
}

