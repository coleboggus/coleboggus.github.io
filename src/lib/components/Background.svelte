<script>
	import { onDestroy, onMount } from 'svelte';
	import * as THREE from 'three';

	let renderer;
	let camera;
	let scene;
	let terrain;
	let light;
	let time = 0;
	let innerWidth, innerHeight;
	$: renderer?.setSize(innerWidth, innerHeight);
	let container;

	const createTerrain = () => {
		const geometry = new THREE.PlaneGeometry(80, 80, 200, 200);
		const uniforms = {
			uTime: { value: 0 },
			uSpeed: { value: 0.6 },
			uNoiseDensity: { value: 0.2 },
			uNoiseStrength: { value: 3.0 },
			uColor1: { value: new THREE.Color(0xcc55ff) },
			uColor2: { value: new THREE.Color(0xff55cc) },
			uColor3: { value: new THREE.Color(0x55ccff) },
			uPulseSpeed: { value: 2.0 },
			uColorHeight: { value: 0.5 }
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
            varying float vHeight;

            void main() {
                vUv = uv;

                vec3 pos = position.xyz;
                pos.z += sin(pos.x * 3.0 * uNoiseDensity + uTime * uSpeed) * uNoiseStrength;
                pos.z += sin(pos.y * uNoiseDensity + uTime * 0.14 * uSpeed) * uNoiseStrength;
                pos.x += cos(pos.y * uNoiseDensity + uTime * 2.0 * uSpeed) * uNoiseStrength;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 2.0);
                vHeight = pos.z;
            }
        `,
			fragmentShader: `uniform float uTime;
uniform float uColorHeight;
uniform float uPulseSpeed;

varying vec2 vUv;
varying float vHeight;

void main() {
    float depth = gl_FragCoord.z / gl_FragCoord.w * 0.5;
    float fogFactor = 0.4 + -1.0 * smoothstep(15.0, 13.0, depth);

    float colorOffset = 0.1 * uTime * uPulseSpeed - vUv.y;
    vec3 color = vec3(
        0.5 + 0.5 * sin(colorOffset + 0.0),
        0.5 + 0.5 * sin(colorOffset + 2.0 * 3.14159265 / 3.0),
        0.5 + 0.5 * sin(colorOffset + 4.0 * 3.14159265 / 3.0)
    );

    gl_FragColor = vec4(color, 1.0);
    gl_FragColor = mix(gl_FragColor, vec4(vec3(1.0), gl_FragColor.w), fogFactor);
}
`
		});

		const terrain = new THREE.Mesh(geometry, material);
		terrain.rotation.x = -Math.PI / 2;
		terrain.position.y = -5;

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
			camera.lookAt(Math.sin(time * 0.4) * 0.4, 0, Math.sin(time * 0.4) * 0.4);

			terrain.material.uniforms.uTime.value = time;
			renderer.render(scene, camera);
		};

		animate();
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
