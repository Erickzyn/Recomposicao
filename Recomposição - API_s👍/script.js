const perfilImagem = document.querySelector('#perfil-imagem');
const info = document.querySelector('#company');
const nome = document.querySelector('#name');
const descricao = document.querySelector('#bio');
const nomeSeguidores = document.querySelector("#box-images");
const btnMaisSeguidores = document.querySelector(".mais-seguidores");

let allFollowers = [];
let displayedFollowers = [];
let showMore = false; 

addEventListener("DOMContentLoaded", () => {
  fetchData();
});

fetch('https://api.github.com/users/Erickzyn')
  .then(response => response.json())
  .then(data => {
    perfilImagem.src = data.avatar_url;
    info.innerHTML = data.company;
    nome.innerHTML = data.name;
    descricao.innerHTML = data.bio;
  });

async function fetchData() {
  fetch("https://api.github.com/users/Erickzyn/followers")
    .then((response) => response.json())
    .then((data) => {
      allFollowers = data;

      displayFollowers(allFollowers.slice(0, 6));

      btnMaisSeguidores.addEventListener("click", () => {
        if (showMore) {
          displayFollowers(allFollowers.slice(6));
          btnMaisSeguidores.innerText = "Mostrar Menos Seguidores";
        } else {
          displayFollowers(allFollowers.slice(0, 6)); 
          btnMaisSeguidores.innerText = "Mais Seguidores";
        }
        showMore = !showMore;
      });
    });
}

function displayFollowers(followersToShow) {
  nomeSeguidores.innerHTML = "";
  followersToShow.forEach((item) => {
    nomeSeguidores.innerHTML += `
      <div class="item">
        <img class="foto-seguidor" src="${item.avatar_url}" alt="">
        <p class="text-img">${item.login}</p>
      </div> 
    `;
  });
}