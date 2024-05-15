function changeRadius() {
    document.getElementById("changeRad").innerHTML = "Radius: " +  document.getElementById("Radius").value;
    drawRing(document.getElementById("Radius").value * 5);
}

function changeRo() {
    document.getElementById("changeRo").innerHTML = "Density: " +  document.getElementById("Ro").value;
}

function drawRing(radius) {
    const canvas = document.getElementById("myCanvas");
    if (!canvas || !canvas.getContext) {
        console.error("Invalid element or browser does not support canvas.");
        return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
        console.error("Canvas 2D context is not supported.");
        return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const innerRadius = radius - 5; // Внутренний радиус кольца
    const outerRadius = radius; // Внешний радиус кольца

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI); // Внешний круг
    context.fillStyle = "blue";
    context.fill();

    context.beginPath();
    context.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI); // Внутренний круг
    context.fillStyle = "black";
    context.fill();
}

window.onload = drawRing(10 * 5);
