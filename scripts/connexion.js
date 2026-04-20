
async function connexion() {


    event.preventDefault()

    let email = document.getElementById("email").value 
    if (!email || typeof email !== "string" || email.length === 0) {
        alert("L'email est pas corect")
        return
    }

    let password = document.getElementById("password").value 
    if (!password || password.length === 0) {
        alert("Le mot de passe est pas corect")
        return
    }

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    try {
        const res = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        if (!res.ok) {
            alert("Email ou mot de passe incorrect")
            return
        }

        const data = await res.json();
        console.log(data);

        localStorage.setItem("session_id", data.session_id);
        localStorage.setItem("expire_at", data.expire_at);
        localStorage.setItem("user", JSON.stringify(data.user));

        

        window.location.href = "./main.html"

    } catch (err) {
        console.error(err);
        alert("sa marche pas zebi error : " + err)
    }
}


async function checkSession() {
    const session_id = localStorage.getItem("session_id");
    const expire_at = localStorage.getItem("expire_at");

    if (!session_id || !expire_at) return;

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
            window.location.href = "./main.html"; 
        }
    } catch (err) {
        console.error(err);
    }
}

checkSession();


document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      connexion();
    }
});
