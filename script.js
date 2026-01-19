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
    if(name === "admin") {
        
        console.log("welcome admin :3")

        const adminbtn = document.createElement("button")
        adminbtn.classList.add("btnadmin")

        const aadminbtn = document.createElement("a")
        aadminbtn.textContent = "Admin Panel"
        aadminbtn.setAttribute("href", "https://youtu.be/dQw4w9WgXcQ?si=sptKy3dsGIbUCVnz")

        adminbtn.appendChild(aadminbtn)
        document.body.appendChild(adminbtn)
    }
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

    if(name === "admin"){

        console.log("welcome admin :3")

        const adminbtn = document.createElement("button")
        adminbtn.classList.add("btnadmin")

        const aadminbtn = document.createElement("a")
        aadminbtn.textContent = "Admin Panel"
        aadminbtn.setAttribute("href", "https://youtu.be/dQw4w9WgXcQ?si=sptKy3dsGIbUCVnz")

        adminbtn.appendChild(aadminbtn)
        document.body.appendChild(adminbtn)
        
    }
}else {
    hello.textContent = ""
}

btn.addEventListener("click", login)


