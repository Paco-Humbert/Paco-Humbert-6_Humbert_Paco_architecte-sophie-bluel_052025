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
    if (!response.ok) throw new Error (`HTTP error! status: ${response.status}`);
    // Transforme la réponse JSON en tableau
    const works = await response.json();
    // Stockage projets dans variable globale
    allWorks = works;
    // Affichage des Projets
    displayWorks (works);
    // génération des filtres à partir des catégéories présentes 
    generateFilters();
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

// Ordre fixe des catégories
const ordreCategories = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];

// Génération des filtres dynamiques dans un ordre personnalisé
async function generateFilters() {
  filtersContainer.innerHTML = "";

  // Récupération des catégories via l'API
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const categories = await response.json();

    // Ajoute manuellement la catégorie "Tous"
    const fullCategories = [{ id: 0, name: "Tous" }, ...categories];

    // Trie les catégories selon l’ordre défini
    const categoriesTriees = ordreCategories.map(name =>
      fullCategories.find(cat => cat.name === name)
    ).filter(Boolean); 

    // Création des boutons
    categoriesTriees.forEach(category => {
      const button = document.createElement("button");
      button.classList.add("filter-btn");
      button.textContent = category.name;

      button.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");

        if (category.id === 0) {
          displayWorks(allWorks); 
        } else {
          const filtered = allWorks.filter(work => work.category.id === category.id);
          displayWorks(filtered);
        }
      });

      filtersContainer.appendChild(button);
    });

    // Active par défaut le bouton "Tous"
    const firstButton = filtersContainer.querySelector(".filter-btn");
    if (firstButton) {
      firstButton.classList.add("selected");
    }

  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
  }
}

// Filtrer les projets selon une catégorie
function filterWorks(categoryId) {
  // Si clique sur "Tous", affiche tous les projets
  if (categoryId === 0) {
    displayWorks(allWorks);
  } else {
  // Sinon, filtre les projets par catégorie
    const filtered = allWorks.filter(work => work.category.id === categoryId);
    displayWorks(filtered);
  }
}

getWorks(); 
