var camera;
var scene;
var renderer;
var light;
var material;
var control;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(-1, -5, 5);
    camera.lookAt(0, 0, 0);
    camera.up.set(0, 0, 1);

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 10).normalize();
    light.lookAt(0, 0, 0);
    scene.add(light);

    var alight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(alight);



    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);

    document.body.appendChild(renderer.domElement);


    var Control = function () {
        this.pointSize = 0.01;
        this.color1 = [0, 255, 0]; // RGB array
    };
    control = new Control();
    var gui = new dat.GUI({ width: 500 });

    gui.add(control, 'pointSize',0.01, 0.1).step(0.01).onChange(function (value) {
        material.size = value;
        render();
    });
    //gui.add(control, 'color1');

}

function render() {
    light.position.copy(camera.position);
    light.lookAt(0, 0, 0);
    renderer.render(scene, camera);
}

init();
render();

// var file = 'Autzen.txt';
var file = 'LionTakanawa.txt';
xyzLoader(file, function (geometry) {
    geometry.computeBoundingBox();
    geometry.computeVertexNormals(); // or light does not work
    var min = geometry.boundingBox.min;
    var max = geometry.boundingBox.max;
    var xc = 0.5 * min.x + 0.5 * max.x;
    var yc = 0.5 * min.y + 0.5 * max.y;
    var zc = 0.5 * min.z + 0.5 * max.z;
    

    geometry.colors = colorArray2(geometry.vertices, min, max, rainbow);

    

    material = new THREE.PointsMaterial({
        /*color: 0x00ff00,*/
        size: 0.01,
        vertexColors: THREE.VertexColors});
    var points = new THREE.Points(geometry, material);
    scene.add(points);
    controls.target0.x = xc;
    controls.target0.y = yc;
    controls.target0.z = zc;

    controls.position0.x = xc + 3;
    controls.position0.y = yc - 5;
    controls.position0.z = zc;
    controls.reset();
    
    render();
});

