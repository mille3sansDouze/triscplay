//const addbtn = document.getElementById("get")
const delbtn = document.getElementById("del")

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    "x-session-id": localStorage.getItem("session_id")
  };
}

function renderData(data) {
  const container = document.getElementById("reponse");
    container.innerHTML = data.map(user => `
    <div class="card">
      <div class="card-inner">
        <h2>${user.id_name}</h2>
        <p>${user.email}</p>
        <p>ID : ${user.id_user}</p>
        <p class="meta">${user.user_name} | ${user.role}</p>
        <button id='modifyBtn' onclick="openEditModal(${JSON.stringify(user).replace(/"/g, '&quot;')})">
          Modifier
        </button>
      </div>
    </div>
    `).join("");

}

function openEditModal(user) {
  document.getElementById("edit-id").value = user.id_user;
  document.getElementById("edit-id_name").value = user.id_name;
  document.getElementById("edit-email").value = user.email;
  document.getElementById("edit-user_name").value = user.user_name;

  const roleInput = document.getElementById("edit-role");
  roleInput.value = user.role;
  roleInput.dataset.original = user.role;

  document.getElementById("edit-modal").classList.add("open");
}

function closeEditModal() {
  document.getElementById("edit-modal").classList.remove("open");
  document.getElementById("edit-feedback").className = "popup-feedback";
}

async function submitEdit() {
  const id = document.getElementById("edit-id").value;
  const originalRole = document.getElementById("edit-role").dataset.original;
  const newRole = document.getElementById("edit-role").value;

  const res = await fetch(`http://localhost:3000/user/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      id_name:   document.getElementById("edit-id_name").value,
      email:     document.getElementById("edit-email").value,
      user_name: document.getElementById("edit-user_name").value,
    })
  });

  try {
    const data = await res.json();
    console.log(data);
  } catch(e) {}

  if (newRole !== originalRole) {
    const resRole = await fetch(`http://localhost:3000/user/${id}/role`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ role: newRole })
    });

    try {
      const dataRole = await resRole.json();
      console.log(dataRole);
    } catch(e) {}
  }

  closeEditModal();
  await loadUsers();
}

async function loadUsers() {
  const res = await fetch(`http://localhost:3000/user/`, {
    method: "GET",
    headers: getAuthHeaders()
});
  const data = await res.json();
  console.log(data);
  renderData(data);
}

async function delUser(id) {
    const res = await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });
      try {
        const data = await res.json();
        console.log(data);
      } catch(e) {}

    await loadUsers()
}

loadUsers();

delbtn.addEventListener("click", () => {
    const id = prompt("ID à supprimer")
    delUser(id);

})