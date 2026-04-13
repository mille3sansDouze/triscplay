loadUserInfo()

function loadUserInfo() {
    const user_cookie = localStorage.getItem("user");

    if (!user_cookie) {
        alert("erreur de connexion veuillez vous reconnecter")
        localStorage.clear()
        window.location.href = "./page_connexion.html"
        return;
    }
    /* {"id_user":"de103aa3-5f9f-4547-a58a-7e6391d3c48a",
    "email":"alex",
    "displayed_name":"alex",
    "user_name":"alex",
    "profile_pic_url":null,
    "description":null} */

    const user = JSON.parse(user_cookie);

    const container = document.getElementById("userinfo");
    container.innerHTML = `
    <button id="account-btn">
        <div class="avatar">JD</div>
        <div class="account-info">
        <span class="account-name">${user.user_name}</span>
        <span class="account-role">${user.id_name}</span>
      </div>
    </button>`

}



