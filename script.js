let citas = [];


const modoGuardado = localStorage.getItem("modo");

if (modoGuardado === "oscuro") {
  document.body.classList.add("dark");
}

const datosGuardados = localStorage.getItem("citas");

if (datosGuardados) {
  citas = JSON.parse(datosGuardados);

  //ORDENAR

  citas.sort((a, b) => {
    return new Date(a.fecha + " " + a.hora) - new Date(b.fecha + " " + b.hora);
  });


  citas.forEach(cita => {

    const lista = document.getElementById("listaCitas");

    const nuevaCita = document.createElement("li");

    nuevaCita.innerHTML = cita.paciente + " - " + cita.fecha + " - " + cita.hora +
      '<button type="button" class="eliminar">❌</button>';

    lista.appendChild(nuevaCita);

    const botonEliminar = nuevaCita.querySelector(".eliminar");

    botonEliminar.addEventListener("click", () => {
      nuevaCita.remove();

      citas = citas.filter(c =>
        !(c.paciente === cita.paciente && c.fecha === cita.fecha && c.hora === cita.hora)
      );

      localStorage.setItem("citas", JSON.stringify(citas));

    });

  });
}


const boton = document.getElementById("btnAgregar");

boton.addEventListener("click", (e) => {

  e.preventDefault();

  const paciente = document.getElementById("paciente").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;


  if (paciente === "" || fecha === "" || hora === "") {
    alert("Por favor, rellena todos los campos");
    return;
  }


  const lista = document.getElementById("listaCitas");

  const nuevaCita = document.createElement("li");


  nuevaCita.innerHTML = paciente + " - " + fecha + " - " + hora +
    '<button type="button" class="eliminar">❌</button>';


  lista.appendChild(nuevaCita);

  //BOTON ELIMINAR

  const botonEliminar = nuevaCita.querySelector(".eliminar");

  botonEliminar.addEventListener("click", () => {
    nuevaCita.remove();

    // eliminar del array
    citas = citas.filter(c =>
      !(c.paciente === cita.paciente && c.fecha === cita.fecha && c.hora === cita.hora)
    );

    // guardar de nuevo
    localStorage.setItem("citas", JSON.stringify(citas));

  });

  //GUARDAR EN LOCALSTORAGE


  const nueva = {
    paciente: paciente,
    fecha: fecha,
    hora: hora,
  };

  citas.push(nueva);

  citas.sort((a, b) => {
    return new Date(a.fecha + " " + a.hora) - new Date(b.fecha + " " + b.hora);
  });



  localStorage.setItem("citas", JSON.stringify(citas));

//AÑADIR BUSCADOR


      // LIMPIAR INPUTS
      document.getElementById("paciente").value = "";
      document.getElementById("fecha").value = "";
      document.getElementById("hora").value = "";


    });


    
  const buscador = document.getElementById("buscador");

  buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase();

    const citasHTML = document.querySelectorAll("#listaCitas li");

    citasHTML.forEach(cita => {

      const contenido = cita.textContent.toLowerCase();

      if (contenido.includes(texto)) {
        cita.style.display = "block";
      } else {
        cita.style.display = "none";
      }

 });

});


const botonBorrarTodo = document.getElementById("borrarTodo");

botonBorrarTodo.addEventListener("click", () => {

  // borrar del array
  citas = [];

  // borrar localStorage
  localStorage.removeItem("citas");

  // borrar HTML
  const lista = document.getElementById("listaCitas");
  lista.innerHTML = "";

});

//DARK-MODE
const botonModo = document.getElementById("modoOscuro");

botonModo.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
  localStorage.setItem("modo", "oscuro");
} else {
  localStorage.setItem("modo", "claro");
}
});









