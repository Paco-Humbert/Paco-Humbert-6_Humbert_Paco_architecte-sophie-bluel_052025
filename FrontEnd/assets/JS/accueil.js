// HTML gallery
const gallery = document.querySelector(".gallery");                   
// Fonction asynchrone pour récupérer les travaux depuis l'API.
async function getWorks() { 
// Utiliser pour sécuriser si Fetch ne fonctionne pas    
  try {       
// Requête API                                                            
    const response = await fetch("http://localhost:5678/api/works");  
// Vérification validité réponse
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
// Obtention tableau d'objets works ( chaque projet)    
    const works = await response.json();                              
    displayWorks(works);
// Si erreur dans le bloc "try" renvoi directement ici + affichage erreur dans console    
  } catch (error) {                                                   
    console.error("Error loading works.", error);
  }
}
// Affiche les projets dans le HTML
function displayWorks(works) {  
// Vide la galerie d’abord                                          
  gallery.innerHTML = "";
// Boucle pour chaque objet work                                               
  works.forEach(work => {
// Création balise                                                 
    const figure = document.createElement("figure");                   
// Création balise 
    const img = document.createElement("img");                        
    img.src = work.imageUrl;
    img.alt = work.title;
// Création balise
    const caption = document.createElement("figcaption");              
    caption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

// Lance la récupération dès le chargement de la page
getWorks();        

// Fonction asynchrone pour récupérer les catégorie depuis l'API.
async function getCategories() {
  try {
      const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error loading categories.", error);
  }
}

// Fonction pour afficher les catégories
async function displayCategories() {
  const categories = await getCategories();
  // unshift ajoute un filtre "Tous" avant les autres catégories dans l'interface, pour que l'utilisateur puisse voir tous les travaux sans filtrage.
  categories.unshift({ id: 0, name: "Tous" });
  const filtersContainer = document.querySelector("#filters");
// Vide les filtres pour éviter les doublons  
  filtersContainer.innerHTML = ""; 

  categories.forEach((cat) => {
    const filterElement = document.createElement("div");
    filterElement.classList.add("")
    filterElement.innerText = cat.name
    filterElement.addEventListener("click", () => {
      document
        .querySelectorAll("")
        .forEach((item) => item.classList.remove("selected")
      filterElement.classList.add("selected");
      filterWorks(cat.id);
    });
      filtersContainer.appendChild(filterElement);
  });
}