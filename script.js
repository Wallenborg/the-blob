const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("generateShape");

// Function to generate a random integer between min and max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create a fleshy gradient color
function getFleshyGradient(x, y, radius) {
  const gradient = ctx.createRadialGradient(x, y, radius / 20, x, y, radius);
  gradient.addColorStop(0, "rgba(255, 204, 204, 0.8)");
  gradient.addColorStop(0.4, "rgba(255, 153, 153, 0.6)");
  gradient.addColorStop(1, "rgba(204, 102, 102, 0.4)");
  return gradient;
}

// Function to draw an organic blob
function drawOrganicBlob(centerX, centerY, radius, numCircles, maxOffset) {
  for (let i = 0; i < numCircles; i++) {
    const offsetX = randomInt(-maxOffset, maxOffset); // Random horizontal offset
    const offsetY = randomInt(-maxOffset, maxOffset); // Random vertical offset
    const circleRadius = randomInt(radius * 0.2, radius * 0.4); // Random radius for the circles
    ctx.beginPath();
    ctx.arc(centerX + offsetX, centerY + offsetY, circleRadius, 0, Math.PI * 2); // Draw circle
    ctx.fill(); // Fill the circle
  }
}

// Function to draw eyes on the blob
function drawEyes(centerX, centerY, radius) {
  const eyeRadius = 6; // Radius for the eyes
  const pupilRadius = 3; // Radius for the pupils
  const positions = []; // Store positions to ensure uniqueness

  // Generate unique positions for the eyes
  for (let i = 0; i < 2; i++) {
    let eyeOffsetX, eyeOffsetY;
    let isUnique;

    do {
      isUnique = true;
      eyeOffsetX = randomInt(-radius / 2, radius / 2); // Random horizontal position
      eyeOffsetY = randomInt(-radius / 2, radius / 2); // Random vertical position

      // Check if the position is already used
      for (const pos of positions) {
        if (
          Math.abs(pos.x - eyeOffsetX) < eyeRadius * 2 &&
          Math.abs(pos.y - eyeOffsetY) < eyeRadius * 2
        ) {
          isUnique = false; // Position is not unique
          break;
        }
      }
    } while (!isUnique); // Repeat until a unique position is found

    positions.push({ x: eyeOffsetX, y: eyeOffsetY }); // Store the unique position

    // Draw the eye
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; // White color for the eye
    ctx.beginPath();
    ctx.arc(
      centerX + eyeOffsetX,
      centerY + eyeOffsetY,
      eyeRadius,
      0,
      Math.PI * 2
    );
    ctx.fill(); // Fill the eye

    // Draw the pupil
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // Black color for the pupil
    ctx.beginPath();
    ctx.arc(
      centerX + eyeOffsetX,
      centerY + eyeOffsetY,
      pupilRadius,
      0,
      Math.PI * 2
    );
    ctx.fill(); // Fill the pupil
  }
}

// Function to draw all blobs
function drawBlobs() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  const centerX = canvas.width / 2; // Center X position
  const centerY = canvas.height / 2; // Center Y position

  // Draw the main blob
  const baseRadius = 100; // Base radius for the main blob
  const numCirclesLarge = 50; // Number of circles for the main blob
  ctx.fillStyle = getFleshyGradient(centerX, centerY, baseRadius); // Set gradient color
  drawOrganicBlob(
    centerX,
    centerY,
    baseRadius,
    numCirclesLarge,
    baseRadius / 3
  ); // Draw the blob

  // Generate additional blobs
  for (let i = 0; i < 20; i++) {
    const radius = randomInt(30, 80); // Random radius for additional blobs
    const offsetX = randomInt(-100, 100); // Random horizontal offset
    const offsetY = randomInt(-100, 100); // Random vertical offset
    const numCircles = randomInt(15, 30); // Random number of circles for additional blobs
    ctx.fillStyle = getFleshyGradient(
      centerX + offsetX,
      centerY + offsetY,
      radius
    ); // Set gradient color for additional blobs
    drawOrganicBlob(
      centerX + offsetX,
      centerY + offsetY,
      radius,
      numCircles,
      radius / 3
    ); // Draw additional blobs
  }

  // Draw the eyes
  drawEyes(centerX, centerY, baseRadius); // Draw eyes on the main blob
}

// Draw blobs when the button is clicked
button.addEventListener("click", drawBlobs);

// Initial draw on page load
drawBlobs();
