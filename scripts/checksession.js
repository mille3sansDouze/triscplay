console.log("# Attends!\n# Ce que tu vas lire ou ecrire ici peut donner accès a ton compte a quelqu'un d'autre, surtout dans l'onglet stockage !Z\n# À moins que tu comprennes exactement ce que tu fais, ferme cette fenêtre et reste en sécurité.\n# Si tu comprends exactement ce que tu fais, bonjour a toi cher collegue dev\n# vive marceau")






async function checkSession() {
    const session_id = localStorage.getItem("session_id");
    const expire_at = localStorage.getItem("expire_at");

    if (!session_id || !expire_at){
        console.log("b")
        window.location.href = "./page_connexion.html"
        return;
         
    }

    if (new Date(expire_at) < new Date()) {
        localStorage.removeItem("session_id");
        localStorage.removeItem("expire_at");
        localStorage.removeItem("user");
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/user/check-session", {
            method: "GET",
            headers: {
                "x-session-id": session_id
            }
        });

        if (res.ok) {
            console.log("auth ok! welcome")
            //do nothing de preference
        }else {
            console.log("no no no :(")
            localStorage.removeItem("session_id");
            localStorage.removeItem("expire_at");
            localStorage.removeItem("user");
            window.location.href = "./page_connexion.html"
        }
    } catch (err) {
        console.error(err);
        alert("sa marche pas zebi error : " + err)
        window.location.href = "./page_connexion.html"

    }
}

checkSession();