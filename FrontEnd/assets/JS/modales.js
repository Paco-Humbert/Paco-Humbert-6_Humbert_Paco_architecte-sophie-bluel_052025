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
          // Dernier élément focusabl
          const lastEl = focusablesArray[focusablesArray.length - 1]; e

          if (e.shiftKey) { // Shift + Tab = navigation arrière
            if (document.activeElement === firstEl) {
              // Empêche le comportement normal
              e.preventDefault(); 
              // Revenir à la fin
              lastEl.focus(); 
            }
          } else { // Tab = navigation avant
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
      document.activeElement.blur();
    }
    modal.style.display = "none"; 
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal"); 
    modal = null; 
  }
}
