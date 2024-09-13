// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let level = 1;
    const maxLevel = 15;
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const nextLevelButton = document.getElementById('next-level');
    const muteButton = document.getElementById('mute-button');
    let muted = false;

    // Function to create a shape
    function createShape(shapeType, color) {
        const shape = document.createElement('div');
        shape.className = `shape ${shapeType}`;
        shape.style.backgroundColor = color || '#ddd';
        shape.addEventListener('click', () => handleShapeClick(shape));
        return shape;
    }

    // Function to initialize the game board with shapes
    function initializeGameBoard() {
        gameBoard.innerHTML = ''; // Clear previous shapes
        const shapes = generateShapesForLevel(level);
        shapes.forEach(shape => gameBoard.appendChild(shape));
    }

    // Function to generate shapes based on the current level
    function generateShapesForLevel(level) {
        const shapes = [];
        const shapeTypes = ['square', 'circle', 'triangle', 'cross']; // Add more shapes as needed
        const colors = ['red', 'blue', 'green', 'yellow']; // Add more colors as needed
        const shapeCount = level + 3; // Increase shape count with level

        for (let i = 0; i < shapeCount; i++) {
            const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            shapes.push(createShape(shapeType, color));
        }

        return shapes;
    }

    let targetShape = null;
let matchedShapes = 0;

// Function to set a new target shape
function setTargetShape() {
    const shapes = Array.from(gameBoard.children);
    targetShape = shapes[Math.floor(Math.random() * shapes.length)];
    // Highlight the target shape for the player
    targetShape.style.border = '3px solid gold'; // Example highlight
}

// Function to handle shape clicks
function handleShapeClick(shape) {
    if (muted) return;

    // Check if the clicked shape matches the target shape
    if (targetShape && shape.className === targetShape.className && shape.style.backgroundColor === targetShape.style.backgroundColor) {
        // Correct match
        shape.style.border = 'none'; // Remove highlight
        matchedShapes++;
        score += 10; // Increment score
        scoreDisplay.textContent = `Score: ${score}`;

        if (matchedShapes >= (level + 3)) { // Change this condition based on your needs
            advanceLevel();
        }
    } else {
        // Incorrect match
        score -= 5; // Decrease score for mistakes
        scoreDisplay.textContent = `Score: ${score}`;
        // Optionally, give feedback for incorrect matches here (e.g., sound effect, visual cue)
    }
}

// Initialize the game and set the first target shape
initializeGameBoard();
setTargetShape();

    // Function to handle level advancement
    function advanceLevel() {
        level++;
        if (level > maxLevel) {
            level = 1; // Restart levels if max level is exceeded
        }
        levelDisplay.textContent = `Level: ${level}`;
        initializeGameBoard();
    }

    // Event listeners for buttons
    nextLevelButton.addEventListener('click', advanceLevel);
    muteButton.addEventListener('click', () => {
        muted = !muted;
        muteButton.textContent = muted ? 'Unmute' : 'Mute';
    });

    // Initialize the game
    initializeGameBoard();
});
