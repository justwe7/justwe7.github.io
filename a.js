import { defineClientAppEnhance } from '@vuepress/client'
const loadScript = (uri) => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.setAttribute('src', uri)
    script.setAttribute('charset', 'UTF-8')
    document.querySelector('html').appendChild(script)
    script.onload = resolve
  })
}

function foo (param) {
  const script = document.createElement('div')
  script.setAttribute('id', 'container')
  document.querySelector('html').appendChild(script)
  var container = document.querySelector('#container')

  var vertexHeight = 15000,
    planeDefinition = 100,
    planeSize = 1245000,
    totalObjects = 1,
    background = "#ffffff",
    meshColor = "#cccccc";

  var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 400000)
  camera.position.z = 10000;
  camera.position.y = 10000;

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(background, 1, 300000);

  var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize, planeDefinition, planeDefinition);
  var plane = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({
    color: meshColor,
    wireframe: true
  }));
  plane.rotation.x -= Math.PI * .5;

  scene.add(plane);

  var renderer = new THREE.WebGLRenderer({ alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(background, 1);

  container.appendChild(renderer.domElement);


  updatePlane();

  function updatePlane () {
    for (var i = 0; i < planeGeo.vertices.length; i++) {
      planeGeo.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
      planeGeo.vertices[i]._myZ = planeGeo.vertices[i].z
    }
  };

  render();

  var count = 0
  function render () {
    requestAnimationFrame(render);
    // camera.position.z -= 150;
    var x = camera.position.x;
    var z = camera.position.z;
    camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001) - 10;
    camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001) - 10;
    camera.lookAt(new THREE.Vector3(0, 8000, 0))

    for (var i = 0; i < planeGeo.vertices.length; i++) {
      var z = +planeGeo.vertices[i].z;
      planeGeo.vertices[i].z = Math.sin((i + count * 0.00002)) * (planeGeo.vertices[i]._myZ - (planeGeo.vertices[i]._myZ * 0.6))
      plane.geometry.verticesNeedUpdate = true;

      count += 0.1
    }

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize () {
    //changes the size of the canavs and updates it
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

}

export default defineClientAppEnhance(() => {
  // loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.min.js').then(res => { foo() })
  // console.log(document.querySelector('div'))
  // foo()
})