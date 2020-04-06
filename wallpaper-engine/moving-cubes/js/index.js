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

    this.container;
    this.cubes = [];
    this.cubeSize = 4;

    this.init();
  }

  Cubes.prototype.init = function init() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(this.innerWidth / -2, this.innerWidth / 2, this.innerHeight / 2, this.innerHeight / -2, 1, 100);
    this.camera.position.set(0, 0, 10);
    this.camera.zoom = 20;
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
    this.container = new THREE.Object3D();

    this.leftTopCube = this.buildCube(this.cubeSize);
    this.cubes.push(this.leftTopCube);

    this.leftBottomCube = this.buildCube(this.cubeSize);
    this.cubes.push(this.leftBottomCube);

    this.rightTopCube = this.buildCube(this.cubeSize);
    this.cubes.push(this.rightTopCube);

    this.rightBottomCube = this.buildCube(this.cubeSize);
    this.cubes.push(this.rightBottomCube);

    this.middleFrontTopCube = this.buildCube(this.cubeSize);
    this.cubes.push(this.middleFrontTopCube);

    this.middleBackTopCube = this.buildCube(this.cubeSize);
    this.cubes.push(this.middleBackTopCube);

    this.middleFrontBottomCube = this.buildCube(this.cubeSize);
    this.cubes.push(this.middleFrontBottomCube);

    this.middleBackBottomCube = this.buildCube(this.cubeSize);
    this.cubes.push(this.middleBackBottomCube);

    for (var _iterator = this.cubes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var cube = _ref;

      this.container.add(cube);
    }

    this.container.position.x = this.cubeSize / 2;
    this.container.position.y = -this.cubeSize / 2;

    this.container.rotation.x = Math.PI / 180 * 35;
    this.container.rotation.y = Math.PI / 180 * 45;

    this.scene.add(this.container);

    this.resetPositions();

    this.animate();
  };

  Cubes.prototype.resetPositions = function resetPositions() {
    this.leftTopCube.position.x = -this.cubeSize;
    this.leftTopCube.position.y = this.cubeSize;
    this.leftTopCube.position.z = -this.cubeSize;

    this.leftBottomCube.position.x = -this.cubeSize;
    this.leftBottomCube.position.y = 0;
    this.leftBottomCube.position.z = 0;

    this.rightTopCube.position.x = this.cubeSize;
    this.rightTopCube.position.y = this.cubeSize;
    this.rightTopCube.position.z = 0;

    this.rightBottomCube.position.x = this.cubeSize;
    this.rightBottomCube.position.y = 0;
    this.rightBottomCube.position.z = -this.cubeSize;

    this.middleFrontTopCube.position.x = 0;
    this.middleFrontTopCube.position.y = this.cubeSize;
    this.middleFrontTopCube.position.z = 0;

    this.middleFrontBottomCube.position.x = 0;
    this.middleFrontBottomCube.position.y = 0;
    this.middleFrontBottomCube.position.z = 0;

    this.middleBackTopCube.position.x = 0;
    this.middleBackTopCube.position.y = this.cubeSize;
    this.middleBackTopCube.position.z = -this.cubeSize;

    this.middleBackBottomCube.position.x = 0;
    this.middleBackBottomCube.position.y = 0;
    this.middleBackBottomCube.position.z = -this.cubeSize;

    this.animateCubes();
  };

  Cubes.prototype.animateCubes = function animateCubes() {
    TweenMax.to(this.leftTopCube.position, 0.5, { z: 0, ease: Circ.easeInOut });
    TweenMax.to(this.leftTopCube.position, 0.5, { y: 0, ease: Circ.easeInOut, delay: 0.5 });
    TweenMax.to(this.leftTopCube.position, 0.5, { z: -this.cubeSize, ease: Circ.easeInOut, delay: 1 });
    TweenMax.to(this.leftTopCube.position, 0.5, { x: 0, ease: Circ.easeInOut, delay: 1.5 });

    TweenMax.to(this.leftBottomCube.position, 0.5, { z: -this.cubeSize, ease: Circ.easeInOut });
    TweenMax.to(this.leftBottomCube.position, 0.5, { y: this.cubeSize, ease: Circ.easeInOut, delay: 0.5 });
    TweenMax.to(this.leftBottomCube.position, 0.5, { z: 0, ease: Circ.easeInOut, delay: 1 });
    TweenMax.to(this.leftBottomCube.position, 0.5, { x: 0, ease: Circ.easeInOut, delay: 1.5 });

    TweenMax.to(this.rightTopCube.position, 0.5, { z: -this.cubeSize, ease: Circ.easeInOut });
    TweenMax.to(this.rightTopCube.position, 0.5, { y: 0, ease: Circ.easeInOut, delay: 0.5 });
    TweenMax.to(this.rightTopCube.position, 0.5, { z: 0, ease: Circ.easeInOut, delay: 1 });
    TweenMax.to(this.rightTopCube.position, 0.5, { x: 0, ease: Circ.easeInOut, delay: 1.5 });

    TweenMax.to(this.rightBottomCube.position, 0.5, { z: 0, ease: Circ.easeInOut });
    TweenMax.to(this.rightBottomCube.position, 0.5, { y: this.cubeSize, ease: Circ.easeInOut, delay: 0.5 });
    TweenMax.to(this.rightBottomCube.position, 0.5, { z: -this.cubeSize, ease: Circ.easeInOut, delay: 1 });
    TweenMax.to(this.rightBottomCube.position, 0.5, { x: 0, ease: Circ.easeInOut, delay: 1.5 });

    TweenMax.to(this.middleFrontTopCube.position, 0.5, { x: this.cubeSize, ease: Circ.easeInOut, delay: 1.5 });
    TweenMax.to(this.middleFrontBottomCube.position, 0.5, { x: -this.cubeSize, ease: Circ.easeInOut, delay: 1.5 });

    TweenMax.to(this.middleBackTopCube.position, 0.5, { x: -this.cubeSize, ease: Circ.easeInOut, delay: 1.5 });
    TweenMax.to(this.middleBackBottomCube.position, 0.5, { x: this.cubeSize, ease: Circ.easeInOut, delay: 1.5, onComplete: this.resetPositions.bind(this) });
  };

  Cubes.prototype.buildCube = function buildCube(cubeSize) {
    var group = new THREE.Group();
    var squareGeometry = new THREE.PlaneGeometry(cubeSize, cubeSize, 1);
    var squareMaterial = new THREE.MeshBasicMaterial({ color: 0xF5BD9B, side: THREE.DoubleSide });
    var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
    squareMesh.position.z = cubeSize / 2;
    group.add(squareMesh);

    squareGeometry = new THREE.PlaneGeometry(cubeSize, cubeSize, 1);
    squareMaterial = new THREE.MeshBasicMaterial({ color: 0xCD7F9A, side: THREE.DoubleSide });
    squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
    squareMesh.rotation.y = Math.PI / 180 * 90;
    squareMesh.position.x = -cubeSize / 2;
    group.add(squareMesh);

    squareGeometry = new THREE.PlaneGeometry(cubeSize, cubeSize, 1);
    squareMaterial = new THREE.MeshBasicMaterial({ color: 0xF5BD9B, side: THREE.DoubleSide });
    squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
    squareMesh.rotation.x = Math.PI / 180 * 90;
    squareMesh.position.y = cubeSize / 2;
    group.add(squareMesh);

    return group;
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