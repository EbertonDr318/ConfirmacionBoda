const form = document.getElementById("formBoda");
const mensajeExito = document.getElementById("mensajeExito");
const mensajeError = document.getElementById("mensajeError");

// URL de tu Apps Script (Web App)
const SCRIPT_URL = "TU_URL_DE_WEBAPP_AQUI";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  mensajeExito.style.display = "none";
  mensajeError.style.display = "none";

  const datos = new FormData(form);

  fetch(SCRIPT_URL, {
    method: "POST",
    body: datos,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta del servidor:", data);
      if (data.result === "success") {
        mensajeExito.style.display = "block";
        form.reset();
      } else {
        mensajeError.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error al enviar:", error);
      mensajeError.style.display = "block";
    });
});
