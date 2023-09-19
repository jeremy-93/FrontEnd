function appelApi() {
  const url = "http://localhost:5678/api/works";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.error("La requête a échoué");
      } else {
        return response.json();
      }
      console.log(re);
    })
    .then((data) => {
      travaux = data; // Mettez à jour la variable globale
      afficherTravaux(travaux);
      console.log(travaux);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération :", error);
    });
}
appelApi();

// création fiche travail
function créerElementTravail(travail) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = travail.imageUrl;
  const figcaption = document.createElement("figcaption");
  figure.appendChild(img);
  figure.appendChild(figcaption);
  return figure;
}

function afficherTravaux(travaux) {
  const galerie = document.querySelector(".gallery");
  galerie.innerHTML = "";
  for (let i = 0; i < travaux.length; i++) {
    const travail = travaux[i];
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = travail.imageUrl;
    const figcaption = document.createElement("figcaption");
    figure.id = travail.id;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    galerie.appendChild(figure);
  }
}
// boutton filtrage

const boutonsCategorie = document.querySelectorAll(".menu-categorie li");

for (let i = 0; i < boutonsCategorie.length; i++) {
  const bouton = boutonsCategorie[i];
  const boite = document.querySelector(".boite-effacer");
  boite.classList.add("boite");
  bouton.classList.add("bouton");

  bouton.addEventListener("mouseover", () => {
    bouton.style.backgroundColor = "#1D6154";
    bouton.style.color = "#fff";
  });

  bouton.addEventListener("mouseout", () => {
    bouton.style.backgroundColor = "transparent";
    bouton.style.color = "#1D6154";
  });
  bouton.addEventListener("click", filtrerParCategorie);
}

// filtre categorie

function filtrerParCategorie(event) {
  const categorie = event.target.textContent;

  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (!response.ok) {
        console.error("La requête a échoué");
      }
      return response.json();
    })
    .then((travaux) => {
      const galerie = document.querySelector(".gallery");
      galerie.innerHTML = "";

      if (categorie === "Toutes") {
        afficherTravaux(travaux);
      } else {
        const travauxFiltres = travaux.filter(
          (travail) => travail.category.name === categorie
        );
        afficherTravaux(travauxFiltres);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des travaux :", error);
    });
}

// Affichage connexion utilisateur

function afficherOuMasquerElements() {
  const token = sessionStorage.getItem("token");
  const barre = document.querySelector(".barre");
  const divModif = document.querySelector(".imodif");
  const loginLink = document.querySelector("nav li a[href='page-login.html']");
  const boite = document.querySelector(".boite-effacer");
  const ouvrirModal = document.getElementById("ouvrirModal");

  if (token) {
    barre.style.display = "block";
    divModif.style.display = "block";
    loginLink.textContent = "Logout";
    boite.innerHTML = "";
  } else {
    barre.style.display = "none";
    divModif.style.display = "none";
    loginLink.textContent = "Login";
    ouvrirModal.style.display = "none";
  }
}
afficherOuMasquerElements();

//Boutton modifier ouverture Modal

const ouvrirModal = document.getElementById("ouvrirModal");
ouvrirModal.style.cursor = "pointer";
const maModal = document.getElementById("maModal");

ouvrirModal.addEventListener("click", function () {
  maModal.style.display = "block";
  afficherTravauxDansModal(travaux);
});

function afficherTravauxDansModal(travaux) {
  const modalCroixContaineur = document.createElement("div");
  const modalContent = document.querySelector(".modal-contenu");
  modalContent.innerHTML = "";
  const container = document.createElement("div");
  container.classList.add("container");

  const boutonFermerModal = document.createElement("i");
  boutonFermerModal.classList.add("fa-solid", "fa-xmark");
  boutonFermerModal.classList.add("conteneurCroix");

  boutonFermerModal.addEventListener("click", function () {
    maModal.style.display = "none";
  });

  modalCroixContaineur.appendChild(boutonFermerModal);

  const titreGalerie = document.createElement("h2");
  titreGalerie.textContent = "Galerie photo";
  titreGalerie.classList.add("titreh1Modal");

  const galerieDiv = document.createElement("div");
  galerieDiv.classList.add("galerie-images");

  modalContent.appendChild(modalCroixContaineur);
  modalContent.appendChild(titreGalerie);
  modalContent.appendChild(galerieDiv);

  //
  travaux.forEach((travail) => {
    const imgElement = créerElementImage(travail);
    galerieDiv.appendChild(imgElement);
  });

  const barreGrise = document.createElement("div");
  barreGrise.classList.add("barreG");
  modalContent.appendChild(barreGrise);

  const espaceVertical = document.createElement("div");
  espaceVertical.classList.add("divB");
  modalContent.appendChild(espaceVertical);

  const ajout = document.createElement("button");
  ajout.type = "button";
  ajout.innerHTML = "Ajouter une photo";
  ajout.classList.add("ajoutPhoto");
  espaceVertical.appendChild(ajout);

  const texteSupprimer = document.createElement("p");
  texteSupprimer.textContent = "Supprimer la galerie";
  espaceVertical.appendChild(texteSupprimer);
  modalContent.appendChild(container);
  // boutton ajouter une photo

  ajout.addEventListener("click", function (event) {
    const maModal = document.getElementById("maModal");
    event.stopPropagation();
    maModal.style.display = "none";
    afficherModalAjout();
  });
}

document.addEventListener("click", function (event) {
  const modalAjout = document.querySelector(".modalEnvoie");
  const maModal = document.querySelector("#maModal");

  if (
    modalAjout &&
    !modalAjout.contains(event.target) &&
    !document.getElementById("ouvrirModal").contains(event.target)
  ) {
    modalAjout.style.display = "none";
  }

  if (
    maModal &&
    !maModal.contains(event.target) &&
    !document.getElementById("ouvrirModal").contains(event.target)
  ) {
    maModal.style.display = "none";
  }
});

function créerElementImage(travail) {
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  imgContainer.id = travail.id;

  const imgElement = document.createElement("img");
  imgElement.src = travail.imageUrl;
  imgElement.alt = travail.title;
  imgContainer.appendChild(imgElement);

  const iconeSupprimer = document.createElement("i");
  iconeSupprimer.dataset.id = travail.id;
  iconeSupprimer.classList.add("fa-solid", "fa-trash-can");
  iconeSupprimer.classList.add("icone-supprimer");

  iconeSupprimer.addEventListener("click", function (event) {
    supprimerTravail(travail.id, event);
  });

  const iconeHover = document.createElement("i");
  iconeHover.classList.add("fa-solid", "fa-arrows-up-down-left-right");
  iconeHover.classList.add("icone-hover");

  imgContainer.addEventListener("mouseenter", function () {
    iconeHover.style.display = "block";
  });

  imgContainer.addEventListener("mouseleave", function () {
    iconeHover.style.display = "none";
  });

  imgContainer.appendChild(iconeSupprimer);
  imgContainer.appendChild(iconeHover);

  return imgContainer;
}
function afficherModalAjout() {
  const modalAjout = document.createElement("div");
  modalAjout.classList.add("modalEnvoie");

  const container = document.createElement("div");
  container.classList.add("container");

  const h1 = document.createElement("h2");
  h1.textContent = "ajouter photo";
  h1.classList.add("titreh1Modal");
  container.appendChild(h1);

  const bloc = document.createElement("div");
  bloc.classList.add("bloc");
  const fleche = document.createElement("i");
  fleche.classList.add("fa-solid", "fa-arrow-left");
  fleche.addEventListener("click", function (event) {
    const maModal = document.getElementById("maModal");
    event.stopPropagation();
    maModal.style.display = "block";
    modalAjout.style.display = "none";
  });

  bloc.appendChild(fleche);
  container.appendChild(bloc);

  const croix = document.createElement("i");
  const boutonFermerModal = document.createElement("i");
  croix.classList.add("fa-solid", "fa-xmark");
  croix.addEventListener("click", function () {
    boutonFermerModal.display = "none";
    modalAjout.style.display = "none";
  });

  bloc.appendChild(fleche);
  bloc.appendChild(croix);

  container.appendChild(bloc);

  const rectangle = document.createElement("div");
  rectangle.classList.add("rectangle");

  const icon = document.createElement("i");
  icon.classList.add("fa-regular", "fa-image");
  rectangle.appendChild(icon);

  const uploadDiv = document.createElement("button");
  uploadDiv.classList.add("upload");

  const labelImage = document.createElement("label");
  labelImage.setAttribute("for", "image");
  labelImage.id = "bouttonAjoutphoto";
  labelImage.textContent = "+ Ajouter photo";

  const inputAjout = document.createElement("input");
  inputAjout.classList.add("nonVisible");
  inputAjout.type = "file";
  inputAjout.id = "image";
  inputAjout.name = "image";
  inputAjout.accept = "image/png, image/jpg, image/jpeg";
  inputAjout.required = true;
  uploadDiv.appendChild(inputAjout);

  inputAjout.addEventListener("change", (event) => {
    const imageSelect = event.target.files[0];
    if (imageSelect) {
      const imagePreviewUrl = URL.createObjectURL(imageSelect);
      const imagePreview = document.createElement("img");
      imagePreview.src = imagePreviewUrl;
      imagePreview.classList.add("divphotoImg");
      imagePreview.style.position = "absolute";
      rectangle.appendChild(imagePreview);
      console.log(imageSelect);
    }
  });
  rectangle.appendChild(uploadDiv);

  const p = document.createElement("p");
  p.textContent = "jpg.png : 4mo max";
  rectangle.appendChild(p);

  const titreDiv = document.createElement("div");
  titreDiv.classList.add("titre");

  const titreLabel = document.createElement("label");
  titreLabel.setAttribute("for", "title");
  titreLabel.textContent = "Titre";
  titreDiv.appendChild(titreLabel);

  const titreInput = document.createElement("input");
  titreInput.type = "text";
  titreInput.id = "title";
  titreInput.name = "title";
  titreInput.required = true;
  titreDiv.appendChild(titreInput);
  const form1Div = document.createElement("div");
  form1Div.classList.add("form1");

  const categorieSelect = document.createElement("select");
  categorieSelect.id = "categorie";
  categorieSelect.name = "categoryId";
  categorieSelect.required = true;
  form1Div.appendChild(categorieSelect);

  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name || "Choisir une catégorie";
        categorieSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Erreur :", error));

  form1Div.appendChild(categorieSelect);

  const barreDiv = document.createElement("div");
  barreDiv.classList.add("ligne");

  const erreurParagraphe = document.createElement("p");
  erreurParagraphe.classList.add("erreur-message");
  erreurParagraphe.textContent =
    "Veuillez remplir tous les champs du formulaire.";
  erreurParagraphe.style.display = "none";
  barreDiv.appendChild(erreurParagraphe);

  rectangle.appendChild(uploadDiv);
  rectangle.appendChild(p);
  uploadDiv.appendChild(labelImage);
  form1Div.appendChild(categorieSelect);
  form1Div.appendChild(barreDiv);

  container.appendChild(h1);
  container.appendChild(rectangle);
  container.appendChild(titreDiv);
  container.appendChild(form1Div);
  container.appendChild(bouton);

  modalAjout.appendChild(container);
  document.body.appendChild(modalAjout);
}

function supprimerTravail(travailId) {
  const token = sessionStorage.getItem("token");

  fetch(`http://localhost:5678/api/works/${travailId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        console.error("La requête de suppression a échoué");
        return;
      }
      const travailSupprime = document.getElementById(travailId);
      if (travailSupprime) {
        travailSupprime.remove();
      }

      supprimerTravailDeGalerie(travailId);
    })
    .catch((error) => {
      console.error("Erreur lors de la suppression du travail :", error);
    });
}

function supprimerTravailDeGalerie(travailId) {
  const travailSupprime = document.getElementById(travailId);
  if (travailSupprime) {
    travailSupprime.remove();
  }
}
async function envoyerFormulaire() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.error("Token manquant. Veuillez vous connecter.");
    return;
  }

  const imageInput = document.getElementById("image");
  const titre = document.getElementById("title");
  const categorieSelect = document.getElementById("categorie");

  const formData = new FormData();
  formData.append("image", imageInput.files[0]);
  formData.append("title", titre.value);
  formData.append("category", categorieSelect.value);

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const nouveauTravail = await response.json();
      alert("Travail ajouté");
      ajouterTravailAModal(nouveauTravail);
      ajouterTravailAGalerieSansIcones(nouveauTravail);
    } else {
      alert("Échec.");
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
}
function ajouterTravailAGalerieSansIcones(nouveauTravail) {
  const galerie = document.querySelector(".gallery");
  const figure = document.createElement("figure");
  figure.id = nouveauTravail.id; // Set the id here

  const img = document.createElement("img");
  img.src = nouveauTravail.imageUrl;
  const figcaption = document.createElement("figcaption");

  figure.appendChild(img);
  figure.appendChild(figcaption);
  galerie.appendChild(figure);
}

function ajouterTravailAModal(nouveauTravail) {
  const modalGalerie = document.querySelector(".galerie-images");
  const imgContainer = créerElementImage(nouveauTravail);

  // Ajouter l'icône de suppression
  const iconeSupprimer = document.createElement("i");
  iconeSupprimer.dataset.id = nouveauTravail.id;
  iconeSupprimer.classList.add("fa-solid", "fa-trash-can");
  iconeSupprimer.classList.add("icone-supprimer");

  iconeSupprimer.addEventListener("click", function (event) {
    supprimerTravail(nouveauTravail.id, event);
  });

  // Ajouter l'icône de survol
  const iconeHover = document.createElement("i");
  iconeHover.classList.add("fa-solid", "fa-arrows-up-down-left-right");
  iconeHover.classList.add("icone-hover");

  imgContainer.appendChild(iconeSupprimer);
  imgContainer.appendChild(iconeHover);

  modalGalerie.appendChild(imgContainer);
}

const bouton = document.createElement("input");
bouton.type = "submit";
bouton.classList.add("bouton");
bouton.value = "ajouter photo";

bouton.addEventListener("click", function () {
  const imageInput = document.getElementById("image");
  const titre = document.getElementById("title");
  const categorieSelect = document.getElementById("categorie");
  const erreurDiv = document.querySelector(".erreur-message");
  erreurDiv.style.display = "none";
  if (
    titre.value.trim() === "" ||
    categorieSelect.value === "0" ||
    !imageInput.files[0]
  ) {
    erreurDiv.style.display = "block"; // Affiche le message si les champs ne sont pas remplis
    return;
  }

  envoyerFormulaire();
});
