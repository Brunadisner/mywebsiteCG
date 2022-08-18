import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.RingGeometry( 1, 5, 32 );
const material = new THREE.MeshPhongMaterial({ color: 0xFFB6C1, side: THREE.DoubleSide });
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshPhongMaterial({ color: 0xD3D3D3 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}



Array(200).fill().forEach(addStar);
// Array(4).fill().forEach(addB);


// Background

const spaceTexture = new THREE.TextureLoader().load('ceu.jpg');
scene.background = spaceTexture;

// Avatar

const brunaTexture = new THREE.TextureLoader().load('bruna.png');

const bruna = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: brunaTexture }));

scene.add(bruna);


bruna.position.z = -5;
bruna.position.x = 2;


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  bruna.rotation.y += 0.01;
  bruna.rotation.z += 0.01;

  // cube.rotation.y += 0.01;
  // cube.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.005;
  mesh.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animate();
function onKeyDown(event) {
  var keyCode = event.which;
  var speed = 0.1;

  console.log('keyCode', keyCode);

  if (keyCode == 38) {
      bruna.position.y += speed;
  } else if (keyCode == 40) {
      bruna.position.y -= speed;
  } else if (keyCode == 37) {
      bruna.position.x -= speed;
  } else if (keyCode == 39) {
      bruna.position.x += speed;
  } else if (keyCode == 32) {
      bruna.position.set(0, 0, 0);
  }
};

document.addEventListener("keydown", onKeyDown, false);
onKeyDown();


