// sélection élément HTML qui va contenir tous les projets
const gallery = document.querySelector(".gallery");
// sélection conteneur Filtres ( Boutons)
const filtersContainer = document.querySelector("#filters");
// Variable stockant les projets récupérés depuis l'API
let allWorks = [];

// Récupération des travaux depuis API
async function getWorks() {
  try {
// Appel API    
    const response = await fetch ("http://localhost:5678/api/works");
// Vérification réponse valide, sinon affichage message d'erreur   
    if (!response.ok) throw new Error ('`HTTP error! status: ${response.status}');
// Transforme la réponse JSON en tableau
    const works = await response.json();
// Stockage projets dans variable globale
    allWorks = works;
// Affichage des Projets
    displayWorks (works);
// génèration des filtres à partir des catégéories présentes 
    generateFiltersFromWorks(works);
  } catch (error) {
// En cas d'erreur affichage message d'erreur
  console.error("Error Loading works.", error)    
  }
}

// Fonction pour affichage des projets dans la galerie
function displayWorks(works) {
// Vide d'abord la galerie pour éviter les doublons
  gallery.innerHTML = "";
// Pour chaque projet (work), création d'un bloc <figure>
  works.forEach(work => {
    const figure = document.createElement("figure");
// Création image du projet
    const img = document.createElement("img");
// URL de l’image
    img.src = work.imageUrl; 
// Génération "alt"
    img.alt = work.title;    
// Création de la légende 
    const caption = document.createElement("figcaption");
    caption.textContent = work.title;
// Ajout <img> et <caption>
    figure.appendChild(img);
    figure.appendChild(caption);
// Ajout <figure> complet
    gallery.appendChild(figure);
  });
}

