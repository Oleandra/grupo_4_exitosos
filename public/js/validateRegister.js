window.onload = function () {
  const fields = document.querySelectorAll("#form-register input");
  const form = document.querySelector("#form-register");
  const button = document.querySelector(".btn-form button");
  console.log(button);

  // button.disabled = true;

  for (let i = 0; i < fields.length; i++) {
    if (fields[i].id == "full_name") {
      fields[i].focus();
      fields[i].addEventListener("blur", () => {
        if (fields[i].value == "") {
          fields[i].nextElementSibling.innerText =
            "El nombre y el apellido son obligatorios";
          fields[i].classList.add("is-invalid-input");
          fields[i].classList.remove("is-valid");
        } else if (fields[i].value.length < 2) {
          fields[i].nextElementSibling.innerText =
            "El nombre y apellido es muy corto";
          fields[i].classList.add("is-invalid-input");
          fields[i].classList.remove("is-valid");
        } else {
          fields[i].nextElementSibling.innerText = "";
          fields[i].classList.add("is-valid");
          fields[i].classList.remove("is-invalid-input");
        }
      });
    } else if (fields[i].id == "email") {
      fields[i].addEventListener("blur", () => {
        if (fields[i].value == "") {
          fields[i].nextElementSibling.innerText = "El correo es necesario";
          fields[i].classList.add("is-invalid-input");
          fields[i].classList.remove("is-valid");
        } else if (
          /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(fields[i].value) == false
        ) {
          fields[i].nextElementSibling.innerText =
            "Debe ingresar un correo valido";
          fields[i].classList.add("is-invalid-input");
          fields[i].classList.remove("is-valid");
        } else {
          fields[i].nextElementSibling.innerText = "";
          fields[i].classList.add("is-valid");
          fields[i].classList.remove("is-invalid-input");
        }
      });
    } else if (fields[i].id == "password") {
      fields[i].addEventListener("blur", () => {
        if (fields[i].value == "") {
          fields[i].nextElementSibling.innerText = "El password es requerido";
          fields[i].classList.add("is-invalid-input");
          fields[i].classList.remove("is-valid");
        } else if (fields[i].value.length <= 7) {
          fields[i].nextElementSibling.innerText =
            "La contraseña debe tener al menos 8 caracteres";
          fields[i].classList.add("is-invalid-input");
          fields[i].classList.remove("is-valid");
        } else {
          fields[i].nextElementSibling.innerText = "";
          fields[i].classList.add("is-valid");
          fields[i].classList.remove("is-invalid-input");
        }
      });
    }
  }

  //aquí empieza el sumbit
  form.addEventListener("submit", (e) => {
    let errors = [];

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].id == "full_name") {
        if (fields[i].value == "") {
          errors.push("El nombre y el apellido son obligatorios");
        } else if (fields[i].value.length < 2) {
          errors.push("El nombre y apellido es muy corto");
        }
      } else if (fields[i].id == "email") {
        if (fields[i].value == "") {
          errors.push("El correo es necesario");
        } else if (
          /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(fields[i].value) == false
        ) {
          errors.push("Debe ingresar un correo valido");
        }
      } else if (fields[i].id == "password") {
        if (fields[i].value == "") {
          errors.push("El password es requerido");
        } else if (fields[i].value.length <= 7) {
          errors.push("La contraseña debe tener al menos 8 caracteres");
        }
      }
    }

    if (errors.length > 0) {
      e.preventDefault();
      let mesageError = document.querySelector(".ms-error");
      mesageError.innerText = "Error al ingresar los datos";
    }
  });
};
