

const botaoUpload = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

botaoUpload.addEventListener('click', () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();

        leitor.onload = () => {
            resolve({
                resultado: leitor.result, 
                nome: arquivo.name
            });
        };

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo: ${arquivo.name}`);
        };

        leitor.readAsDataURL(arquivo);
    })
}

const imagem = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0];

    if(arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagem.src = conteudoDoArquivo.resultado;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (error) {
            console.error("Erro na leitura do arquivo")
        }
    } 
})

const inputHashtag = document.getElementById('categoria');
const listaTags = document.getElementById('lista-tags');

inputHashtag.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
    evento.preventDefault();
    const valorHashtag = inputHashtag.value.trim();
        if (valorHashtag !== "" && tagsPermitidas.includes(valorHashtag)) {
        const novaHashtag = document.createElement("li");
        novaHashtag.innerHTML = `<p>${valorHashtag}</p> <img src="/img/close-black.png" class="remove-tag">`;
        listaTags.appendChild(novaHashtag);
        inputHashtag.value = "";
        } else {
            alert("Tag inválida!");
        }
    }
})

listaTags.addEventListener('click', (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const hashtagRemover = evento.target.parentElement;
        listaTags.removeChild(hashtagRemover);
    }
})

const tagsPermitidas = ["Gato", "Cachorro", "Bichinho", "Fofo"];

async function verificarTagsMundoPet(valorHashtag) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsPermitidas.contains(valorHashtag));
        }, 1000)
    })
}