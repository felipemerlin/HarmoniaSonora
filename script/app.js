let somAtual = null;

function pararSons(){
    if (somAtual){
        somAtual.pause();
        somAtual.currentTime = 0;
        somAtual = null;
    }

    document.querySelectorAll("audio").forEach(function (audio){
        audio.pause();
        audio.currentTime = 0;
    });
}

function tocarSom(botao, idImagem){
    if (!botao) return;
    pararSons();

    const nomeSom = botao.dataset.som;
    const caminhoImagem = botao.dataset.imagem;
    const nome = botao.dataset.nome || botao.textContent.trim();
    const imagem = document.getElementById(idImagem);

    if (imagem && caminhoImagem){
        imagem.src = caminhoImagem;
        imagem.alt = nome;
    }

    if (nomeSom){
        const som = new Audio(`./assets/sounds/${nomeSom}.mp3`);
        som.preload = "auto";
        somAtual = som;

        som.addEventListener("ended", function (){
            if (somAtual === som) {
                somAtual = null;
            }
        });

        som.play().catch(function (erro){
            console.warn("Não foi possível reproduzir o áudio:", erro);
        });
    }
}

function abrirTema(tema){
    document.querySelectorAll(".tela").forEach(function (tela){
        tela.classList.remove("ativa");
    });

    const tela = document.getElementById("tema-" + tema);
    if (tela){
        tela.classList.add("ativa");
    }
    pararSons();
}

function voltarInicio(){
    document.querySelectorAll(".tela").forEach(function (tela){
        tela.classList.remove("ativa");
    });

    const inicio = document.getElementById("tela-inicial");
    if (inicio){
        inicio.classList.add("ativa");
    }
    pararSons();
}

window.addEventListener("pagehide", pararSons);