// Attend que le DOM soit entièrement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", () => {

    // Sélectionne le formulaire de connexion par son ID
    const loginForm = document.querySelector("#login-form");

    // Vérifie que le formulaire existe avant d'ajouter un événement
    if (loginForm) {

        // Ajoute un écouteur sur la soumission du formulaire
        loginForm.addEventListener("submit", async (e) => {

            // Empêche le rechargement de la page, sans rechargerait automatiquement la page 
            e.preventDefault();

            // Supprime les éventuels messages d'erreur déjà affichés
            clearErrors();

            // Récupère les valeurs saisies dans les champs email et mot de passe
            const email = document.querySelector("#login-email").value;
            const password = document.querySelector("#login-password").value;

            try {
                // Envoie une requête POST à l'API pour se connecter
                const response = await fetch("http://localhost:5678/api/users/login", {
                    // Méthode POST pour envoyer les données
                    method: "POST", 
                    headers: {
                        // Spécifie que le corps est en JSON
                        "Content-Type": "application/json", 
                    },
                    // Convertit les données en JSON
                    body: JSON.stringify({ email, password }), 
                });

                // Si la réponse est OK (statut HTTP 200), connexion réussie
                if (response.ok) {
                    // Transforme la réponse en JSON
                    const data = await response.json(); 
                    // Stock le token dans le localStorage
                    localStorage.setItem("token", data.token); 
                    // Redirige vers la page d’accueil
                    window.location.href = "index.html"; 
                     
                } else {
                // Si les identifiants sont incorrects, affiche une erreur globale
                showGlobalError("Email ou mot de passe incorrect.");
                }
            } catch (error) {
              // En cas d'erreur réseau ou serveur, affiche un message générique
              showGlobalError("Erreur réseau ou serveur.");  
            }
        });
    }

    // Fonction qui supprime tous les messages d’erreur déjà affichés
    function clearErrors() {
        document.querySelectorAll(".error-message").forEach((el) => el.remove());
    }

     // Fonction qui crée et affiche un message d’erreur juste au-dessus du bouton "Se connecter"
    function showGlobalError(message) {
        // Cible le bouton
        const submitBtn = document.querySelector('input[type="submit"]'); 
        // Crée un nouvel élément <p>
        const error = document.createElement("p");
        // Applique la classe CSS
        error.classList.add("error-message"); 
        // Insère le texte du message
        error.textContent = message; 
        // Insère l’erreur juste avant le bouton
        submitBtn.parentNode.insertBefore(error, submitBtn); 
    }

    
});


