const gallery = document.querySelector(".gallery");                   // HTML gallery
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
    console.error("Erreur lors du chargement des travaux :", error);
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
