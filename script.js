/// FOTO E NOME DOS MEMBRINHOS
const pessoas = [
    { /// 0
        nome: "Aeolus",
        foto: "imagens/aeolusae.jpg",
        x: 4000,
        y: 4000  
    },
    { /// 1
        nome: "Orfeu",
        foto: "imagens/orpheus.jpg",
        x: 4300,
        y: 4000
    },
    { /// 2
        nome: "Penélope",
        foto: "imagens/penelope by duvetbox.jpg",
        x: 4300,
        y: 4200
    },
    { /// 3
        nome: "Odisseu",
        foto: "imagens/download (9).jpg",
        x: 4500,
        y: 4200
    },
    { /// 4
        nome: "Atena",
        foto: "imagens/Athena - Atenea (Epic_ the Musical).jpg",
        x: 4500,
        y: 4000
    },
    { /// 5
        nome: "Polites",
        foto: "imagens/Polites.jpg",
        x: 4500,
        y: 4400
    },
    { /// 6
        nome: "Telêmaco",
        foto: "imagens/telefoneepico.jpg",
        x: 4300,
        y: 4400
    },
    { /// 7
        nome: "Circe",
        foto: "imagens/circe.jpg",
        x: 3900,
        y: 4200
    },
    { /// 8
        nome: "Hermes",
        foto: "imagens/hermes.jpg",
        x: 4100,
        y: 4200
    },
    { /// 9
        nome: "Lotus Eater",
        foto: "imagens/bulbalotus.jpg",
        x: 3700,
        y: 4200
    },
];

///AS SETAS MUEHEHEHEHHE
const tiposLigacao = {

    vermelha: {
        cor: "red",
        grossura: 4
    },

    roxa: {
        cor: "purple",
        grossura: 4
    },

    verde: {
        cor: "green",
        grossura: 4
    },

    azul: {
        cor: "blue",
        grossura: 4
    },

    amarela: {
        cor: "gold",
        grossura: 4
    }

};

const ligacoes = [
{
    de: 0,
    para: 1,
    texto: "IRMÃOS",
    tipo: "azul",
    offsetY: -60,
},
{
    de: 1,
    para: 2,
    texto: "FILHA",
    tipo: "verde",
    offsetY: 20
},
{
    de: 2,
    para: 3,
    texto: "CASAL",
    tipo: "vermelha",
    offsetY: -35,
    offsetX: 10
},
{
    de: 4,
    para: 3,
    texto: "FILHO",
    tipo: "verde",
    offsetY: 20,
    offsetX: 0
},
{
    de: 2,
    para: 5,
    texto: "",
    tipo: "verde",
    offsetY: -22,
    offsetX: 60
},
{
    de: 3,
    para: 6,
    texto: "FILHOS",
    tipo: "verde",
    offsetY: -27,
    offsetX: 5
},
{
    de: 0,
    para: 7,
    texto: "FILHA",
    tipo: "verde",
    offsetY: 10,
    offsetX: -15
},
{
    de: 0,
    para: 9,
    texto: "PET",
    tipo: "amarela",
    offsetY: -50,
    offsetX: 5
},
{
    de: 7,
    para: 9,
    texto: "IRMÃOS",
    tipo: "azul",
    offsetY: -45,
    offsetX: 12
},
{
    de: 8,
    para: 7,
    texto: "CASAL",
    tipo: "vermelha",
    offsetY: -45,
    offsetX: 12
},
{
    de: 7,
    para: 6,
    texto: "AMANTES",
    tipo: "roxa",
    offsetY: 50,
    offsetX: 5,
    curvaX1: 200,
    curvaY1: 100,
    curvaX2: -100,
    curvaY2: 100
}
];

const svg = document.getElementById("linhas");
const mapa = document.getElementById("mapa");

for (const ligacao of ligacoes) {

    const origem = pessoas[ligacao.de];
    const destino = pessoas[ligacao.para];

    const linha =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

    const x1 = origem.x + 50;
    const y1 = origem.y + 50;

    const x2 = destino.x + 50;
    const y2 = destino.y + 50;

    const estilo =
      tiposLigacao[ligacao.tipo];

    const distancia =
      Math.abs(x2 - x1);

    const alturaCurva =
      distancia * 0.25;

    linha.setAttribute(
     "d",
     `M ${x1} ${y1}
      C ${x1 + (ligacao.curvaX1 || 0)}
        ${y1 + (ligacao.curvaY1 || -alturaCurva)},

        ${x2 + (ligacao.curvaX2 || 0)}
        ${y2 + (ligacao.curvaY2 || -alturaCurva)},

        ${x2} ${y2}`
);

    linha.setAttribute("fill", "none");

    linha.setAttribute(
      "stroke",
      estilo.cor
    );

    linha.setAttribute(
      "stroke-width",
      estilo.grossura
    );

    linha.setAttribute(
      "stroke-linecap",
      "round"
    );

    svg.appendChild(linha);

    // Legenda

    const legenda =
      document.createElement("div");

    const meioX =
      (x1 + x2) / 2;

    const meioY =
      (y1 + y2) / 2;

    legenda.textContent =
      ligacao.texto;

    legenda.style.position =
      "absolute";

    legenda.style.left =
      (meioX + (ligacao.offsetX || 0)) + "px";

    legenda.style.top =
      (meioY + (ligacao.offsetY || 0)) + "px";

    legenda.style.transform =
      "translate(-50%, -50%)";

    legenda.style.background = "white";

    legenda.style.border = `2px solid ${estilo.cor}`;

    legenda.style.borderRadius = "8px";

    legenda.style.padding = "4px";

    mapa.appendChild(legenda);
}

///BAGULHO DE ADICIONAR PESSOAS, EU ACHO
for (const pessoa of pessoas) {

    const div = document.createElement("div");

    div.className = "pessoa";

    div.style.left = pessoa.x + "px";
    div.style.top = pessoa.y + "px";

    div.innerHTML = `
        <img src="${pessoa.foto}">
        <p>${pessoa.nome}</p>
    `;

    mapa.appendChild(div);
}

///A CAMERA E O ZOOM MUEEHEHHE
let zoom = 0.5;

let cameraX = window.innerWidth / 2 - 4194 * zoom;
let cameraY = window.innerHeight / 2 - 4294 * zoom;

function telaParaMundo(x, y) {

    const rect = mapa.getBoundingClientRect();

    return {
        x: (x - rect.left) / zoom,
        y: (y - rect.top) / zoom
    };
}

function atualizarMapa() {
  mapa.style.transform =
  `translate(${cameraX}px, ${cameraY}px) scale(${zoom})`;
}

atualizarMapa();

let arrastando = false;
let ultimoX;
let ultimoY;

document.addEventListener("mousedown", (e) => {
  arrastando = true;
  ultimoX = e.clientX;
  ultimoY = e.clientY;
});

document.addEventListener("mouseup", () => {
  arrastando = false;
});

document.addEventListener("mousemove", (e) => {
    if (!arrastando) return;
    
    const velocidade = 0.5;

    cameraX += (e.clientX - ultimoX) * velocidade;
    cameraY += (e.clientY - ultimoY) * velocidade;

    cameraX = Math.min(1000, Math.max(-9000, cameraX));
    cameraY = Math.min(1000, Math.max(-9000, cameraY));

    ultimoX = (e.clientX);
    ultimoY = (e.clientY);

    atualizarMapa();
});

document.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (e.deltaY > 0)
        zoom *= 0.99;
    else        
        zoom *= 1.01;
  
    zoom = Math.max(0.3, Math.min(5, zoom));
     
    atualizarMapa();
});

/// AS COORDENADAS MUEHEHEHHE

const coords = document.getElementById("coords");

document.addEventListener("mousemove", (e) => {

    const pos = telaParaMundo(e.clientX, e.clientY);

    coords.textContent =
    `X: ${Math.round(pos.x)}
    Y: ${Math.round(pos.y)}`;
});