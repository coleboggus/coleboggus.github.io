<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let renderer;
	let camera;
	let scene;
	let terrain;
	let light;
	let time = 0;
	let innerWidth, innerHeight;
	let container;

	const createTerrain = () => {
		const geometry = new THREE.PlaneGeometry(50, 50, 200, 200);
		const uniforms = {
			uTime: { value: 0 },
			uSpeed: { value: 1.0 },
			uNoiseDensity: { value: 0.5 },
			uNoiseStrength: { value: 1.5 },
			uColor: { value: new THREE.Color(0xcc55cc) }
		};
		const material = new THREE.ShaderMaterial({
			uniforms,
			wireframe: true,
			vertexShader: `
        uniform float uTime;
        uniform float uSpeed;
        uniform float uNoiseDensity;
        uniform float uNoiseStrength;

        varying vec2 vUv;

        void main() {
          vUv = uv;

          vec3 pos = position.xyz;
          pos.z += sin(pos.x * 3.0 * uNoiseDensity + uTime * uSpeed) * uNoiseStrength;
          pos.z += sin(pos.y * uNoiseDensity + uTime * uSpeed) * uNoiseStrength;
          pos.x += cos(pos.y * uNoiseDensity + uTime * uSpeed) * uNoiseStrength;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
			fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;

        varying vec2 vUv;

        void main() {
          float depth = gl_FragCoord.z / gl_FragCoord.w * 0.5;
          float fogFactor = smoothstep(8.0, 20.0, depth);

          gl_FragColor = vec4(mix(vec3(0.0), uColor, vUv.y + sin(uTime)), 1.0);
          gl_FragColor = mix(gl_FragColor, vec4(vec3(1.0), gl_FragColor.w), fogFactor);
        }
      `
		});

		const terrain = new THREE.Mesh(geometry, material);
		terrain.rotation.x = -Math.PI / 2;
		terrain.position.y = -2;

		return terrain;
	};

	onMount(() => {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

		renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
		renderer.setSize(innerWidth, innerHeight);
		container.appendChild(renderer.domElement);

		terrain = createTerrain();
		scene.add(terrain);

		light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.set(1, 1, 1);
		scene.add(light);

		camera.position.z = 10;
		camera.position.y = 0;

		const animate = () => {
			requestAnimationFrame(animate);
			time += 0.008;
			camera.position.y = Math.sin(time) * 1 + 4;
			camera.lookAt(Math.sin(time * 0.4) * 2, 0, Math.sin(time * 0.4) * 4);

			terrain.material.uniforms.uTime.value = time;
			renderer.render(scene, camera);
		};

		animate();

		return () => {
			document.body.removeChild(renderer.domElement);
			renderer.dispose();
		};
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div bind:this={container} class="container" />

<style>
	.container {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
