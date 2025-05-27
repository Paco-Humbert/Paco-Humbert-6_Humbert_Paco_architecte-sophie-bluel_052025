const gallery = document.querySelector(".gallery");                   // HTML gallery

async function getWorks() { 
  try {                                                               // utiliser pour sécuriser si Fetch ne fonctionne pas
    const response = await fetch("http://localhost:5678/api/works");  // requête HTTP get - requête GET swagger 
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const works = await response.json();                              // obtention tableau d'objets works ( chaque projet)
    displayWorks(works);
  } catch (error) {                                                   // si erreur dans le bloc "try" renvoi directement ici + affichage erreur dans console
    console.error("Erreur lors du chargement des travaux :", error);
  }
}

function displayWorks(works) {                                        // affiche les projets dans le HTML
  gallery.innerHTML = "";                                             // vide la galerie d’abord
  works.forEach(work => {                                             // boucle pour chaque objet work
    const figure = document.createElement("figure");                  // création balise 

    const img = document.createElement("img");                        // création balise 
    img.src = work.imageUrl;
    img.alt = work.title;

    const caption = document.createElement("figcaption");             // création balise 
    caption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

getWorks();                                                           // lance la récupération dès le chargement de la page
