let shiba = null,
  bear = null,
  emoji = null;
let isHorizontal = false;
const renderer = new THREE.WebGLRenderer();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x888888);
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

function disturbShiba() {
  isHorizontal = !isHorizontal;
}

function updateCanvas() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("shiba").appendChild(renderer.domElement);
  // camera.position.z = 2;
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  const loader = new THREE.GLTFLoader();

  loader.load(
    "./shiba/gltf/scene.glb",
    function (gltf) {
      console.log(gltf);
      shiba = gltf.scene;
      shiba.position.x = -2;
      shiba.scale.x = 2;
      shiba.scale.y = 2;
      shiba.scale.z = 2;
      scene.add(shiba);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  loader.load(
    "./windows/scene.glb",
    function (gltf) {
      console.log(gltf);
      emoji = gltf.scene;
      emoji.position.x = 0;
      emoji.position.y = 2;
      emoji.position.z = -2;
      emoji.scale.x = 100;
      emoji.scale.y = 100;
      emoji.scale.z = 100;
      scene.add(emoji);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  loader.load(
    "./icebear/gltf/scene.glb",
    function (gltf) {
      console.log(gltf);
      bear = gltf.scene;
      bear.position.x = 2;
      bear.scale.x = 0.5;
      bear.scale.y = 0.5;
      bear.scale.z = 0.5;
      scene.add(bear);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const animate = function () {
    requestAnimationFrame(animate);
    if (shiba) {
      if (isHorizontal) {
        shiba.rotation.x += 0.01;
        bear.rotation.x += 0.01;
      } else {
        shiba.rotation.y += 0.01;
        bear.rotation.y += 0.01;
      }
    }
    renderer.render(scene, camera);
  };
  animate();
}

window.onload = init;
window.onresize = updateCanvas;
