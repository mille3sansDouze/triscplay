const hello = document.getElementById("home-hello")
const btn = document.getElementById("home-hello-button")
const del = document.getElementById("home-hello-del")

function login() {
    const name = prompt("Entrez votre blaze")
    if (!name) return

    localStorage.setItem("name", name)
    localStorage.setItem("register", "y")
    hello.textContent = "Bienvenue " + name + " !"

    btn.remove();
}

// bouton supprimer
del.addEventListener("click", () => {
    localStorage.clear()
    hello.textContent = ""
    alert("Veuillez actualiser la page pour bien enregistrer tout les changements")
})

// au chargement de la page
const register = localStorage.getItem("register")
const name = localStorage.getItem("name")

if (register === "y" && name) {
    hello.textContent = "Bienvenue " + name + " !"
    btn.remove();
}else {
    hello.textContent = ""
}

btn.addEventListener("click", login)
