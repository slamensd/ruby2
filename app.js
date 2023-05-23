window.onload = async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let userAddress;
    let contractAddress = "0x232765be70a5f0b49e2d72eee9765813894c1fc4";

    let erc1155Abi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // ...previous code

let camera, scene, renderer, flashlight, hiddenMessageMaterial;

function init() {
    const container = document.getElementById('hiddenMessageContainer');
    const width = container.clientWidth;
    const height = container.clientHeight;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    flashlight = new THREE.SpotLight(0xffffff, 2);
    flashlight.position.set(0, 0, 5);
    flashlight.angle = Math.PI / 4;
    flashlight.penumbra = 0.2;
    flashlight.decay = 2;
    flashlight.distance = 50;
    scene.add(flashlight);

    const geometry = new THREE.PlaneGeometry(5, 2);

    hiddenMessageMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });

    const hiddenMessage = new THREE.Mesh(geometry, hiddenMessageMaterial);
    scene.add(hiddenMessage);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    flashlight.position.copy(camera.position);

    renderer.render(scene, camera);
}

document.getElementById('hiddenMessageContainer').addEventListener('mousemove', (event) => {
    const container = document.getElementById('hiddenMessageContainer');
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = -(y / rect.height) * 2 + 1;

    const mouseVector = new THREE.Vector3(normalizedX, normalizedY, 0.5);
    mouseVector.unproject(camera);

    const dir = mouseVector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    flashlight.target.position.copy(pos);

    // Calculate the distance from the mouse position to the center of the hidden message
    const centerX = 0; // Adjust the X coordinate as needed
    const centerY = 0; // Adjust the Y coordinate as needed
    const radius = 0.5; // Adjust the radius size as needed

    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;
    const distanceToCenter = Math.sqrt(dx * dx + dy * dy);

    // Adjust the opacity of the hidden message material based on the distance from the mouse to the center
    if (distanceToCenter < radius * rect.width / 2) {
        hiddenMessageMaterial.opacity = 1;
    } else {
        hiddenMessageMaterial.opacity = 0;
    }
});

init();

};

