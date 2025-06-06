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
    // Écouteur de clic sur le bouton "modifier"
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
    });
  } 
});