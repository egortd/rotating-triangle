import Vue from 'vue';
import * as THREE from 'three';

export default () => new Vue({
  el: '#app',
  data: { // state
    currentDirection: 1, // contents math sign
    currentColorSequanceDirection: 1,
  },
  mounted() {
    this.runWebGL();
  },
  methods: {
    runWebGL() {
      const canvas = document.querySelector('#triangleCanvas');
      const renderer = new THREE.WebGLRenderer({ canvas }); // init WebGL context
      renderer.setClearColor(0xffffff, 1); // set background color (white)
      const fov = 45;
      const aspect = 1;
      const near = 1;
      const far = 100;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(0, 0.5, 2); // as x,y,z coordinates accordingly
      const scene = new THREE.Scene();
      const triangleGeometry = new THREE.Geometry();
      triangleGeometry.vertices.push(new THREE.Vector3(0, 1, 0));
      triangleGeometry.vertices.push(new THREE.Vector3(0.5, 0, 0));
      triangleGeometry.vertices.push(new THREE.Vector3(-0.5, 0, 0));
      triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));
      const fragmentShader = `
      // add glsl shader for triangle coloring
  uniform vec3 iResolution;
  uniform float iTime;

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      // Normalized pixel coordinates (from 0 to 1)
      vec2 uv = fragCoord/iResolution.xy;

      // Time varying pixel color
      vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

      // Output to screen
      fragColor = vec4(col,1.0);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
  `;
      const uniforms = { // contains uniform variables
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3() },
      };
      const material = new THREE.ShaderMaterial({
        fragmentShader,
        uniforms,
        side: THREE.DoubleSide,
      });
      const triangle = new THREE.Mesh(triangleGeometry, material);
      scene.add(triangle);
      const render = () => {
        // increase for speed up
        const speedRotationRatio = 0.02;

        // increase for speed up
        const speedColorChangingRatio = 0.008;

        // depends of math sign from state
        triangle.rotation.y += this.currentDirection * speedRotationRatio;
        uniforms.iResolution.value.set(canvas.width, canvas.height, 1);

        // depends of math sign from state
        uniforms.iTime.value += speedColorChangingRatio * this.currentColorSequanceDirection;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    },
    switchDirection() {
      this.currentDirection *= -1;
    },
    switchColorSequence() {
      this.currentColorSequanceDirection *= -1;
    },
  },
});
