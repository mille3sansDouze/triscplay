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
            console.log("a")
            //do nothing de preference
        }else {
            console.log("b")
            window.location.href = "./page_connexion.html"
        }
    } catch (err) {
        console.error(err);
    }
}

checkSession();