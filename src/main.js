import api from './api'

class App {
    constructor() {
        this.repositorios = [];
        this.elemInput = document.querySelector("input[name=repositorios]");
        this.elemForm = document.getElementById("formulario");
        this.elemListaNOrdenada = document.getElementById("lista-repositorios");
        this.registraEvento();
    }

    registraEvento() {
        this.elemForm.onsubmit = (event) => this.adicionaRepositorios(event);
    }

    async adicionaRepositorios(event) {
        event.preventDefault();
        const valorCampo = this.elemInput.value;
        if (valorCampo === 0)
            return
        try {
            const response = await api.get(`repos/${valorCampo}`)
            console.log('test');
            const { name, description, owner: { avatar_url }, html_url } = response.data;
            this.repositorios.push({
                avatar_url: avatar_url,
                nome: name,
                descricao: description,
                link: html_url
            });
            this.render();
        } catch{
            alert(`O repositorio ${valorCampo} não existe`)
        }
    }

    render() {
        this.elemListaNOrdenada.innerHTML = "";
        this.repositorios.forEach(elem => {
            let elemImg = document.createElement('img');
            elemImg.setAttribute("src", elem.avatar_url);
            let elemStrong = document.createElement('strong');
            elemStrong.appendChild(document.createTextNode(elem.nome))
            let elemP = document.createElement('p');
            elemP.appendChild(document.createTextNode(elem.descricao))
            let elemA = document.createElement('a');
            elemA.setAttribute("href", elem.link);
            elemA.appendChild(document.createTextNode("Acessar"));
            let elemItemLista = document.createElement('li');
            elemItemLista.appendChild(elemImg);
            elemItemLista.appendChild(elemStrong);
            elemItemLista.appendChild(elemP);
            elemItemLista.appendChild(elemA);
            this.elemListaNOrdenada.appendChild(elemItemLista)
        })
    }
}

new App();
