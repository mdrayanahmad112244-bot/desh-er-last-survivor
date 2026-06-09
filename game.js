let scene, camera, renderer;
let spawnedObjects = [];

// Initialize 3D Engine Scene Matrix
function init3DEngine() {
    const container = document.getElementById('viewport-container');

    // 1. Scene Workspace Configuration
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1118); // Deep Space Cyber Void

    // 2. Camera View Setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 2;
    camera.lookAt(0,0,0);

    // 3. WebGL High-Performance Renderer Configuration
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 4. Lighting System Setup (Jeno 3D shading thik moto bojha jay)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ffaa, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // 5. Grid Floor Guide Interface (Jeno bujha jay map-er size)
    const gridHelper = new THREE.GridHelper(10, 10, 0x00ffaa, 0x444444);
    scene.add(gridHelper);

    // Run Real-Time Rendering Frame Loop
    animateEngineLoop();
}

// Runtime Spawning Logic Handler
function spawn3DObject() {
    // Generate 3D Box Geometry Model (Actor Mesh)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ 
        color: Math.random() * 0xffffff, // Random neon colors
        roughness: 0.2,
        metalness: 0.5
    });
    
    const cubeMesh = new THREE.Mesh(geometry, material);

    // Randomize dynamic spawn positioning coordinates on the grid map
    cubeMesh.position.x = (Math.random() - 0.5) * 4;
    cubeMesh.position.y = 0.5; // Sit perfectly on floor grid
    cubeMesh.position.z = (Math.random() - 0.5) * 4;

    scene.add(cubeMesh);
    spawnedObjects.push(cubeMesh);
}

function clearScene() {
    spawnedObjects.forEach(obj => scene.remove(obj));
    spawnedObjects = [];
}

// Global Core Engine Animation Loop Frame Refresh Rate Sync
function animateEngineLoop() {
    requestAnimationFrame(animateEngineLoop);

    // Auto rotate all spawned actors in 3D timeline vector
    spawnedObjects.forEach(obj => {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

// Auto Resize Screen Adaptability Setup
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Fire up Engine on load
init3DEngine();
