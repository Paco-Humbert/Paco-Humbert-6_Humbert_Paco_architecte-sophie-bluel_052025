// Variable globale pour stocker la modale, quelle est la boite modale qui est ouverte
let modal = null;

// Quand le DOM est entièrement chargé
document.addEventListener("DOMContentLoaded", () => {
  // Récupère le bouton "modifier"
  const openModalButton = document.getElementById("portfolio-modification");
  // Récupère la modale galerie
  const modalGallery = document.getElementById("modalGallery");

  // Vérifie que les deux éléments existent
  if (openModalButton && modalGallery) {
    // Écouteur de clic sur le bouton "modifier" ( à supprimer)
    openModalButton.addEventListener("click", () => {
      // Debug : affiche un message dans la console
      console.log("Clique détecté sur 'modifier'");
      // Assigne la modale galerie à la variable globale
      modal = modalGallery;
      // Affiche la modale avec flexbox
      modal.style.display = "flex";
      displayWorksInModal(allWorks);
      // Accessibilité : la modale est maintenant visible
      modal.setAttribute("aria-hidden", "false");
      // Accessibilité : indique que c'est une modale
      modal.setAttribute("aria-modal", "true");

      // Ferme la modale en cliquant sur la croix
      const closeButton = modal.querySelector(".js-modal-close");
      if (closeButton) {
        closeButton.addEventListener("click", closeModal);
      }

      // Ferme la modale en cliquant en dehors
      modal.addEventListener("click", closeModal);

      // Empêche la fermeture si clic dans la boîte modale
      const modalWrapper = modal.querySelector(".modal-wrapper");
      if (modalWrapper) {
        modalWrapper.addEventListener("click", stopPropagation);
      }

      // Types d'éléments focusables
      const focusableSelectors = 'button, a, input, textarea, select'; 
      // Sélectionne tous les éléments focusables
      const focusables = modal.querySelectorAll(focusableSelectors); 
      // Convertit en tableau
      const focusablesArray = Array.from(focusables); 
      
      // Gestion de la touche Tab pour enfermer le focus dans la modale
      document.addEventListener("keydown", (e) => {
        // Si on appuie sur Tab et qu'une modale est ouverte
        if (e.key === "Tab" && modal !== null) { 
          // Premier élément focusable
          const firstEl = focusablesArray[0]; 
          // Dernier élément focusable
          const lastEl = focusablesArray[focusablesArray.length - 1]; 

          // Shift + Tab = navigation arrière
          if (e.shiftKey) { 
            if (document.activeElement === firstEl) {
              // Empêche le comportement normal
              e.preventDefault(); 
              // Revenir à la fin
              lastEl.focus(); 
            }

          // Tab = navigation avant
          } else { 
            if (document.activeElement === lastEl) {
              // Empêche le comportement normal
              e.preventDefault(); 
              // Revenir au début
              firstEl.focus(); 
            }
          }
        }
      });
    });
  }

  // Récupère la modale d'ajout de travaux
  const modalAddWork = document.getElementById("modalAddWork");

  // Récupère le bouton "Ajouter une photo"
  const addPhotoButton = document.getElementById("addPhotoButton");

  // Récupère le bouton retour "<-"
  const backButton = document.querySelector(".js-modal-back");

  // Quand on clique sur "Ajouter une photo" depuis la galerie
  if (addPhotoButton && modalAddWork) {
    addPhotoButton.addEventListener("click", () => {
      // Ferme la modale galerie
      modalGallery.style.display = "none";
      modalGallery.setAttribute("aria-hidden", "true");
      modalGallery.removeAttribute("aria-modal");

      // Ouvre la modale d’ajout
      modal = modalAddWork;
      modalAddWork.style.display = "flex";
      modalAddWork.setAttribute("aria-hidden", "false");
      modalAddWork.setAttribute("aria-modal", "true");

      const closeButton = modalAddWork.querySelector(".js-modal-close");
      if (closeButton) {
        closeButton.addEventListener("click", closeModal);
      }

      // Ferme la modale ajout en cliquant sur l'overlay
      modalAddWork.addEventListener("click", closeModal);

      // Empêche la fermeture si on clique dans la boîte modale
      const modalWrapper = modalAddWork.querySelector(".modal-wrapper");
      if (modalWrapper) {
      modalWrapper.addEventListener("click", stopPropagation);
      }
    });
  }

  // Quand on clique sur "<-" pour revenir à la galerie
  if (backButton && modalGallery) {
    backButton.addEventListener("click", () => {
      // Ferme la modale d’ajout
      modalAddWork.style.display = "none";
      modalAddWork.setAttribute("aria-hidden", "true");
      modalAddWork.removeAttribute("aria-modal");

      // Rouvre la modale galerie
      modal = modalGallery;
      modalGallery.style.display = "flex";
      modalGallery.setAttribute("aria-hidden", "false");
      modalGallery.setAttribute("aria-modal", "true");
    });
  }
});

// Fonction qui empêche la propagation de l'événement de clic
function stopPropagation(event) {
  // Empêche le clic à l'intérieur de la modale de remonter et déclencher closeModal
  event.stopPropagation(); 
}

// Fonction qui ferme la modale si elle est ouverte
function closeModal() {
  if (modal) {
    // Si un élément à l'intérieur de la modale a le focus, on lui retire
    if (document.activeElement && modal.contains(document.activeElement)) {
      // Fais perdre le focus à l’élément actuellement actif (sélectionné) sur la page
      document.activeElement.blur();
    }
    modal.style.display = "none"; 
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal"); 
    modal = null; 
  }
}

// Sélection du conteneur de la galerie dans le modale

const modalGalleryContent = document.querySelector ("#modalGallery .modal-content");

// Fonction pour afficher les travaux dans la modale
function displayWorksInModal(works) {
  // Vide avant d'afficher pour éviter les doublons
  modalGalleryContent.innerHTML = "";

    // Parcours chaque travail reçu en paramètre
    works.forEach(work => {

      // Créer un élément <figure>
      const figure = document.createElement("figure");

      // ajoute l'attribut "data-id" pour identifier chaque travail
      figure.setAttribute("data-id", work.id);
      // Affichage
      figure.style.position = "relative";
      // Crée l'élément image
      const img = document.createElement("img");
      // URL de l'image
      img.src = work.imageUrl;
      // Titre travaux
      img.alt = work.title;


      // Création bouton "supprimer"
      const deleteBtn = document.createElement("button");
      // Ajout classe
      deleteBtn.classList.add("delete-btn");
      // Font Awesome
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      

      // Ecouteur 
      deleteBtn.addEventListener("click", async () => {
        try {
          // Récupération du token 
          const token = localStorage.getItem("token");
          // Requête delete à l'API pour supprimer le travail
          // cible un ID précis
          const response = await fetch(`http://localhost:5678/api/works/${work.id}`, {
            // méthode HTTP
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });

          console.log("Status réponse:", response.status);

          // Si suppression ok ( code 204)
          if (response.ok) {
            // Supprime le travail de la modale (DOM)
            figure.remove();
            // Met à jour le tableau
            allWorks = allWorks.filter(w => w.id !== work.id);
            // Affichage Gallery mise à jour
            displayWorksInModal(allWorks);
            displayWorks(allWorks); 
          } else {
            console.error("Erreur lors de la suppression", response.status);
          }
        } catch (error) {
          console.error("Erreur lors de la requête DELETE :", error);
        }
      });

      // Ajoute l’image et le bouton poubelle dans <figure>
    figure.appendChild(img);
    figure.appendChild(deleteBtn);

    // Ajoute <figure> dans la galerie modale
    modalGalleryContent.appendChild(figure);
    });
}

// Gestion de la soumission du formulaire d'ajout de photo : //

// Sélection formulaire dans la modale
const formAddWork = document.getElementById("formAddWork");

// Ecouteur
formAddWork.addEventListener("submit", async (e) => {
  e.preventDefault

  // Récupération valeur saisies dans les champs
  const title = document.getElementById("title").value;
  const categoryId = document.getElementById("categoryInput").value;
  const imageFile = document.getElementById("file").files[0];

  // Récupération token
  const token = localStorag.getItem("token");

  // Vérification remplissage de tous les champs
  if (!title || !categoryId || !imageFile) {
    alert("veuillez remplir tous les champs et sélectonner une image.");
    // Stop l'éxecution si un champ est vide
    return;
  }

  try {
    // Envoie une requête POST avec les données su formulaire
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",             
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Corps de la requête = données formulaire
      body: formData,             
    });
  
    // Si ajout réussi
    if (response.ok) {
      // Récupération réponse 
      const newWork = await response.json();
      console.log("Projet ajouté", newWork);
      alert("Projet ajouté avec succès !");

      // réinitialise le formulaire et l'aperçu de l'image
      formAddWork.reset();
      document.getElementById("previewImage").style.display = "none";
    } else {
      // Affichage erreur
      alert("Erreur lors de l'envoi. Code : " + response.status);
    }
  } catch (error) {
    alert("Erreur réseau : + error.message")
  }
})


// Chargement dynamique des catégories dans le <select> //

// CHargement des catégories disponibles depuis l'API
async function popularCategory() {
  try {
    const res = await fetch("http://localhost:5678/api/categories"); 
    const categories = await res.json(); 
    const select = document.getElementById("categoryInput");
    // Vide le <select> actuel
    select.innerHTML = ""; 

    // Crée une <option> pour chaque catégorie reçue
    categories.forEach((cat) => {
      const option = document.createElement("option");
      // L’ID servira dans l’envoi
      option.value = cat.id;       
      // Le nom visible
      option.textContent = cat.name; 
      // Ajout à la liste déroulante
      select.appendChild(option);   
    });
  } catch (error) {
    console.error("Erreur chargement des catégories :", error);
  }
}

// Appelle automatiquement la fonction quand le DOM est prêt
document.addEventListener("DOMContentLoaded", popularCategory);


