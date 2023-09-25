document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const errorMessage = document.querySelector(".erreur");
  const loginLink = document.querySelector("#nav-login");
  const barre = document.querySelector(".barre");
  const divModif = document.querySelector(".modif");
  const divModifier = document.querySelector(".modifier");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("mot-de-passe").value;
    try {
      const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        window.location.href = "index.html";
      } else {
        errorMessage.style.display = "block";
      }
    } catch (error) {
      console.error(error);
    }
  });

  loginLink.addEventListener("click", function () {
    const token = sessionStorage.getItem("token");
    if (token) {
      sessionStorage.removeItem("token");
      loginLink.textContent = "Login";
      barre.style.display = "none";
      divModif.style.display = "none";
      divModifier.style.display = "none";
      window.location.href = "index.html";
    }
  });
});
