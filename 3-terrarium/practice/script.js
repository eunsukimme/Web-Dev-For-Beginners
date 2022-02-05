dragElement(document.getElementById("plant1"));
dragElement(document.getElementById("plant2"));
dragElement(document.getElementById("plant3"));
dragElement(document.getElementById("plant4"));
dragElement(document.getElementById("plant5"));
dragElement(document.getElementById("plant6"));
dragElement(document.getElementById("plant7"));
dragElement(document.getElementById("plant8"));
dragElement(document.getElementById("plant9"));
dragElement(document.getElementById("plant10"));
dragElement(document.getElementById("plant11"));
dragElement(document.getElementById("plant12"));
dragElement(document.getElementById("plant13"));
dragElement(document.getElementById("plant14"));

let maxZIndex = 2;

function dragElement(terrariumElement) {
  //set 4 positions for positioning on the screen
  let xDiff = 0,
    yDiff = 0,
    currentX = 0,
    currentY = 0;
  terrariumElement.ondblclick = toFront;
  terrariumElement.onpointerdown = pointerDrag;
  function pointerDrag(e) {
    e.preventDefault();
    currentX = e.clientX;
    currentY = e.clientY;
    document.onpointermove = elementDrag;
    document.onpointerup = stopElementDrag;
  }
  function elementDrag(e) {
    xDiff = currentX - e.clientX;
    yDiff = currentY - e.clientY;
    currentX = e.clientX;
    currentY = e.clientY;
    terrariumElement.style.top = terrariumElement.offsetTop - yDiff + "px";
    terrariumElement.style.left = terrariumElement.offsetLeft - xDiff + "px";
  }
  function stopElementDrag() {
    document.onpointerup = null;
    document.onpointermove = null;
  }
  function toFront(e) {
    maxZIndex += 1;
    e.target.style.zIndex = maxZIndex;
  }
}
