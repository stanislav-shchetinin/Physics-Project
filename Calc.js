const e0 = 8.85e-12
function changeE(x) {
    let sigma = parseInt(document.getElementById("Ro").value)
    let r1 = parseInt(document.getElementById("InnerRadius").value)
    let r = parseInt(document.getElementById("OuterRadius").value)
    document.getElementById("e").innerHTML = sigma * x / (2 * e0) * ((1 / Math.sqrt(x*x + r1*r1) - 1 / Math.sqrt(x*x + r*r)))
}

function changePhi(x) {
    let sigma = parseInt(document.getElementById("Ro").value)
    let r1 = parseInt(document.getElementById("InnerRadius").value)
    let r = parseInt(document.getElementById("OuterRadius").value)
    document.getElementById("phi").innerHTML = sigma / (2 * e0) * (Math.sqrt(x*x + r*r) - Math.sqrt(x*x + r1*r1))
}

function changeX(x) {
    document.getElementById("x").innerHTML = x;
}

function coordinate(event) {
    let x = (event.clientX - 642);
    changeX(x);
    changeE(x);
    changePhi(x);
}   