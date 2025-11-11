const API_URL = "http://localhost:3000/servico";

async function listar() {
  const res = await fetch(API_URL);
  const dados = await res.json();

  document.getElementById("lista").innerHTML = dados
    .map(
      (item) => `
    <p>
      <b>${item.name}</b> - ${item.description}
      <button onclick="editar('${item._id}', '${item.name}', '${item.description}')">Editar</button>
      <button onclick="remover('${item._id}')">Excluir</button>
    </p>
  `
    )
    .join("");
}

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });

  listar();
  e.target.reset();
});

async function remover(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  listar();
}

function editar(id, name, description) {
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("description").value = description;

  document.getElementById("btnCadastrar").style.display = "none";
  document.getElementById("btnAtualizar").style.display = "inline-block";
}

document.getElementById("btnAtualizar").addEventListener("click", async () => {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });

  listar();
  document.getElementById("form").reset();

  document.getElementById("btnCadastrar").style.display = "inline-block";
  document.getElementById("btnAtualizar").style.display = "none";
});

listar();
