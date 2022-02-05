const plants = document.querySelectorAll(".plant");

plants.forEach((plant) => {
  dragElement(plant);
});

function dragElement(terrariumElement) {
  terrariumElement.addEventListener("dragstart", dragStart);
}
function dragStart(e) {
  console.log("drag starts...");
  e.dataTransfer.setData("text/plain", e.target.id);
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}

const jar = document.getElementById("jar");

jar.addEventListener("dragenter", dragEnter);
jar.addEventListener("dragover", dragOver);
jar.addEventListener("dragleave", dragLeave);
jar.addEventListener("drop", drop);

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}
function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}
function dragLeave(e) {
  e.target.classList.remove("drag-over");
}
function drop(e) {
  e.target.classList.remove("drag-over");

  // get data from dataTransfer
  const id = e.dataTransfer.getData("text/plain");
  // find by retrieved id
  const draggable = document.getElementById(id);

  // append dragabble to drop target's child
  e.target.appendChild(draggable);
  draggable.style.position = "absolute";
  draggable.style.width = "20%";
  draggable.style.left = `${Math.floor(Math.random() * 40) + 20}%`;
  draggable.style.bottom = `${Math.floor(Math.random() * 3) + 3}%`;
  // display draggable element
  draggable.classList.remove("hide");
}
