// script.js
fetch('dados.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o JSON');
        }
        return response.json(); // Converte a resposta em um objeto JS
    })
    .then(data => {
        const container = document.getElementById('lista-produtos');
        
        // Percorre os dados e cria elementos HTML
        data.forEach(produto => {
            const item = document.createElement('p');
            item.textContent = `${produto.nome} - R$ ${produto.preco}`;
            container.appendChild(item);
        });
    })
    .catch(error => console.error('Erro:', error));
