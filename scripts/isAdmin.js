async function allowDivAdmin() {
const user_cookie = localStorage.getItem("user");
if (!user_cookie) {
    alert("erreur de connexion veuillez vous reconnecter")
    localStorage.clear()
    window.location.href = "./page_connexion.html"
    return;
}
const user = JSON.parse(user_cookie);
const res = await fetch(`http://localhost:3000/user/${user.id_user}`);
const data = await res.json();

if(data.role === "admin"){
    const admindiv = document.getElementById("divadmin");

    admindiv.insertAdjacentHTML("afterend", `
    <a class="nav-item" href="./admin_page.html">
      <span class="icon">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
      </span>
      <span class="label">ADMIN PANEL</span>
    </a>`);
}
}

allowDivAdmin()