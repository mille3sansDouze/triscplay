loadUserInfo()

async function loadUserInfo() {
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

    const res = await fetch(`http://localhost:3000/user/${user.id_user}`);
    const data = await res.json();
    console.log(data);


    const container = document.getElementById("userinfo");
    container.innerHTML = `
    <button id="account-btn">
        <div class="avatar"><img id="avatar-img" src="${data.profile_pic_url}" alt="avatar"/></div>
        <div class="account-info">
        <span class="account-name">${data.user_name}</span>
        <span class="account-role">${data.id_name}</span>
      </div>
    </button>`

}


