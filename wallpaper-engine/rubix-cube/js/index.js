'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cubes = function () {
  function Cubes() {
    _classCallCheck(this, Cubes);

    console.clear();

    this.scene;
    this.camera;
    this.renderer;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.container = document.getElementById('canvas');

    this.mainObject = new THREE.Object3D();

    this.xLeftGroup = new THREE.Object3D();
    this.xMiddleGroup = new THREE.Object3D();
    this.xRightGroup = new THREE.Object3D();

    this.whiteCubesPositions = [[-1, 1, 1], [1, 1, 1], [0, 0, 1], [-1, -1, 1], [1, -1, 1], [0, 1, 0], [-1, 0, 0], [1, 0, 0], [0, -1, 0], [-1, 1, -1], [1, 1, -1], [0, 0, -1], [-1, -1, -1], [1, -1, -1]];

    this.blackCubesPositions = [[0, 1, 1], [-1, 0, 1], [1, 0, 1], [0, -1, 1], [-1, 1, 0], [1, 1, 0], [0, 0, 0], [-1, -1, 0], [1, -1, 0], [0, 1, -1], [-1, 0, -1], [1, 0, -1], [0, -1, -1]];

    this.cubeSize = 4;

    this.init();
  }

  Cubes.prototype.init = function init() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(this.innerWidth / -2, this.innerWidth / 2, this.innerHeight / 2, this.innerHeight / -2, 1, 100);
    this.camera.position.set(0, 0, 50);
    this.camera.zoom = 15;
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.innerWidth, this.innerHeight);
    this.renderer.setClearColor(0xEF7F7E);
    this.renderer.clear();
    this.container.appendChild(this.renderer.domElement);

    this.resize();
    window.addEventListener('resize', this.resize.bind(this), false);

    this.createScene();
  };

  Cubes.prototype.createScene = function createScene() {
    this.buildCubes(this.cubeSize);

    this.mainObject.add(this.xLeftGroup);
    this.mainObject.add(this.xMiddleGroup);
    this.mainObject.add(this.xRightGroup);

    this.scene.add(this.mainObject);

    this.resetPositions();

    this.animate();
  };

  Cubes.prototype.resetPositions = function resetPositions() {
    this.mainObject.rotation.x = Math.PI / 180 * 35;
    this.mainObject.rotation.y = Math.PI / 180 * 45;
    this.mainObject.rotation.z = 0;

    this.animateCubes();
  };

  Cubes.prototype.animateCubes = function animateCubes() {
    TweenMax.to(this.xMiddleGroup.rotation, 0.5, { x: this.xMiddleGroup.rotation.x + Math.PI / 180 * 90, ease: Power1.easeInOut });
    TweenMax.to(this.xLeftGroup.position, 0.25, { x: -this.cubeSize * 0.5, ease: Power1.easeInOut });
    TweenMax.to(this.xRightGroup.position, 0.25, { x: this.cubeSize * 0.5, ease: Power1.easeInOut });
    TweenMax.to(this.xLeftGroup.position, 0.25, { x: 0, delay: 0.25, ease: Power1.easeInOut });
    TweenMax.to(this.xRightGroup.position, 0.25, { x: 0, delay: 0.25, ease: Power1.easeInOut });

    TweenMax.set(this.mainObject.rotation, { x: Math.PI / 180 * 35, y: Math.PI / 180 * 45, z: Math.PI / 180 * 90, delay: 0.5 });

    TweenMax.to(this.xMiddleGroup.rotation, 0.5, { x: this.xMiddleGroup.rotation.x + Math.PI / 180, ease: Power1.easeInOut, delay: 0.5 });
    TweenMax.to(this.xLeftGroup.position, 0.25, { x: -this.cubeSize * 0.5, ease: Power1.easeInOut, delay: 0.5 });
    TweenMax.to(this.xRightGroup.position, 0.25, { x: this.cubeSize * 0.5, ease: Power1.easeInOut, delay: 0.5 });
    TweenMax.to(this.xLeftGroup.position, 0.25, { x: 0, ease: Power1.easeInOut, delay: 0.75 });
    TweenMax.to(this.xRightGroup.position, 0.25, { x: 0, ease: Power1.easeInOut, delay: 0.75 });

    TweenMax.set(this.mainObject.rotation, { x: Math.PI / 180 * 35, y: Math.PI / 180 * 135, z: Math.PI / 180 * 0, ease: Power1.easeInOut, delay: 1 });

    TweenMax.to(this.xMiddleGroup.rotation, 0.5, { x: this.xMiddleGroup.rotation.x + Math.PI / 180 * 90, ease: Power1.easeInOut, delay: 1 });
    TweenMax.to(this.xLeftGroup.position, 0.25, { x: -this.cubeSize * 0.5, ease: Power1.easeInOut, delay: 1 });
    TweenMax.to(this.xRightGroup.position, 0.25, { x: this.cubeSize * 0.5, ease: Power1.easeInOut, delay: 1 });
    TweenMax.to(this.xLeftGroup.position, 0.25, { x: 0, ease: Power1.easeInOut, delay: 1.25 });
    TweenMax.to(this.xRightGroup.position, 0.25, { x: 0, ease: Power1.easeInOut, delay: 1.25, onComplete: this.resetPositions.bind(this) });
  };

  Cubes.prototype.buildCubes = function buildCubes(cubeSize) {
    var cubeGeometry = new THREE.CubeGeometry(cubeSize, cubeSize, cubeSize);
    var whiteCubeMaterial = new THREE.MeshBasicMaterial({ color: 0xF5BD9B });
    // var blackCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x5483AA });
    // var whiteCubeMaterial = new THREE.MeshBasicMaterial({ color: 0xF5BD9B });
    var blackCubeMaterial = new THREE.MeshBasicMaterial({ color: 0xCD7F9A });

    for (var i = 0; i < 14; i++) {
      var cube = new THREE.Mesh(cubeGeometry, whiteCubeMaterial);
      cube.position.x = this.whiteCubesPositions[i][0] * cubeSize;
      cube.position.y = this.whiteCubesPositions[i][1] * cubeSize;
      cube.position.z = this.whiteCubesPositions[i][2] * cubeSize;

      if (cube.position.x == -1 * cubeSize) {
        this.xLeftGroup.add(cube);
      }
      if (cube.position.x == 0 * cubeSize) {
        this.xMiddleGroup.add(cube);
      }
      if (cube.position.x == 1 * cubeSize) {
        this.xRightGroup.add(cube);
      }
    }

    for (var i = 0; i < 13; i++) {
      var cube = new THREE.Mesh(cubeGeometry, blackCubeMaterial);
      cube.position.x = this.blackCubesPositions[i][0] * cubeSize;
      cube.position.y = this.blackCubesPositions[i][1] * cubeSize;
      cube.position.z = this.blackCubesPositions[i][2] * cubeSize;

      if (cube.position.x == -1 * cubeSize) {
        this.xLeftGroup.add(cube);
      }
      if (cube.position.x == 0 * cubeSize) {
        this.xMiddleGroup.add(cube);
      }
      if (cube.position.x == 1 * cubeSize) {
        this.xRightGroup.add(cube);
      }
    }
  };

  Cubes.prototype.animate = function animate() {
    this.render();
  };

  Cubes.prototype.render = function render() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.renderer.render(this.scene, this.camera);
  };

  Cubes.prototype.resize = function resize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    this.camera.aspect = this.innerWidth / this.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.innerWidth, this.innerHeight);
  };

  return Cubes;
}();

var experience = new Cubes();