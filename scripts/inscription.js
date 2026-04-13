

async function inscription() {

    event.preventDefault()

    let email = document.getElementById("email").value 
    if (!email || typeof email !== "string" || email.length === 0) {
        alert("L'email est pas corect")
        return
    }

    let displayname = document.getElementById("displayname").value 
    if (!displayname || typeof displayname !== "string" || displayname.length === 0) {
        alert("Le nom d'affichage est pas corect")
        return
    }

    let username = document.getElementById("username").value 
    if (!username || typeof username !== "string" || username.length === 0) {
        alert("Le nom d'utilisateur est pas corect")
        return
    }

    let password = document.getElementById("password").value 
    if (!password || password.length === 0) {
        alert("Le mot de passe est pas corect")
        return
    }

    document.getElementById("email").value = "";
    document.getElementById("displayname").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    

    try {
        const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            id_name: username,
            user_name: displayname,
            password: password,
        })
        });

        const data = await res.json();
        console.log(data);
        window.location.href = "./home.html";
    }
    catch {
        console.error(err);
        alert("sa marche pas zebi")
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