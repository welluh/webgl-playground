import * as THREE from 'three';

let scene;
let camera;
let renderer;
let cube;
let cubes = [];

(function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const box = {
        width: 1.5,
        height: 1.5,
        depth: 1.5,
    };
    const geometry = new THREE.BoxGeometry(box.width, box.height, box.depth);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });  // greenish blue
    cube = new THREE.Mesh(geometry, material);
    camera.position.z = 4;

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    cubes.push(...[
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -3),
        makeInstance(geometry, 0xaa8844,  3),
    ]);

    animate();
    window.addEventListener('resize', onResize);
}());

function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
    time *= 0.001;  // convert time to seconds

    cubes.forEach((cube, ndx) => {
        const speed = .5 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
