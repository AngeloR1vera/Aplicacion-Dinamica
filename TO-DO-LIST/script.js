const tareaInput = document.getElementById("tareaInput");
const agregarBtn = document.getElementById("agregarBtn");
const listaTareas = document.getElementById("listaTareas");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function mostrarTareas() {
  listaTareas.innerHTML = "";
  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${tarea}</span>
      <div>
        <button class="edit" onclick="editarTarea(${index})">Editar</button>
        <button class="delete" onclick="eliminarTarea(${index})">Eliminar</button>
      </div>
    `;
    listaTareas.appendChild(li);
  });
}

agregarBtn.addEventListener("click", () => {
  const texto = tareaInput.value.trim();
  if (texto === "") return alert("Escribe una tarea primero");
  tareas.push(texto);
  tareaInput.value = "";
  guardarTareas();
  mostrarTareas();
});

function editarTarea(index) {
  const nuevoTexto = prompt("Editar tarea:", tareas[index]);
  if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
    tareas[index] = nuevoTexto.trim();
    guardarTareas();
    mostrarTareas();
  }
}

function eliminarTarea(index) {
  if (confirm("¿Seguro que deseas eliminar esta tarea?")) {
    tareas.splice(index, 1);
    guardarTareas();
    mostrarTareas();
  }
}

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

mostrarTareas();