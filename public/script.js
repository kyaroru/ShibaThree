let shiba = null;
let isHorizontal = false;
const renderer = new THREE.WebGLRenderer();

const scene = new THREE.Scene();
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
  camera.position.set(0, 0, 2.5);
  camera.lookAt(0, 0, 0);

  const loader = new THREE.GLTFLoader();

  loader.load(
    "./shiba/gltf/scene.glb",
    function (gltf) {
      shiba = gltf.scene;
      scene.add(shiba);
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
      } else {
        shiba.rotation.y += 0.01;
      }
    }
    renderer.render(scene, camera);
  };
  animate();
}

window.onload = init;
window.onresize = updateCanvas;
