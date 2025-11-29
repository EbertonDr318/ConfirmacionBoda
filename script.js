const form = document.getElementById("formBoda");
const mensajeExito = document.getElementById("mensajeExito");
const mensajeError = document.getElementById("mensajeError");
const btnEnviar = document.querySelector(".btn-enviar");

// URL de tu Apps Script (Web App)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwrVJhax0cqEOqy1JS_XPCL3LFHBlqb7ap7Owu6e71ZaG90qVXCOtkWQmdpK98EBvppaA/exec";

// Bandera para evitar envíos duplicados
let isSubmitting = false;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Si ya se está enviando, no hacemos nada
  if (isSubmitting) {
    return;
  }
  isSubmitting = true;

  // Ocultar mensajes previos
  mensajeExito.style.display = "none";
  mensajeError.style.display = "none";

  // Deshabilitar botón y cambiar texto
  const textoOriginalBtn = btnEnviar.textContent;
  btnEnviar.disabled = true;
  btnEnviar.textContent = "Enviando...";

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
        mensajeError.style.display = "none";
        form.reset();
      } else {
        mensajeExito.style.display = "none";
        mensajeError.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error al enviar:", error);
      mensajeExito.style.display = "none";
      mensajeError.style.display = "block";
    })
    .finally(() => {
      // Volver a permitir el envío (por si necesitan corregir algo)
      isSubmitting = false;
      btnEnviar.disabled = false;
      btnEnviar.textContent = textoOriginalBtn;
    });
});
