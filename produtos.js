// Função para gerar cor de placeholder baseada no ID
function gerarCorPlaceholder(id) {
    const cores = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    return cores[(id - 1) % cores.length];
}

// Função para gerar placeholder de imagem com o nome do produto
function gerarPlaceHolder(nome, id) {
    const canvas = document.createElement('canvas');
    canvas.width = 280;
    canvas.height = 250;
    const ctx = canvas.getContext('2d');
    
    // Fundo gradiente
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'][(id-1) % 5]);
    gradient.addColorStop(1, ['#764ba2', '#f5576c', '#00f2fe', '#38f9d7', '#fee140'][(id-1) % 5]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Texto
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(nome, canvas.width / 2, canvas.height / 2 - 20);
    
    ctx.font = '16px Arial';
    ctx.fillText('📦 Produto', canvas.width / 2, canvas.height / 2 + 20);
    
    return canvas.toDataURL();
}

// Carregar e exibir produtos
fetch('produtos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o JSON');
        }
        return response.json();
    })
    .then(data => {
        const container = document.getElementById('lista-produtos');
        
        // Limpar container
        container.innerHTML = '';
        
        // Criar card para cada produto
        data.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';
            
            // Usar imagem do JSON ou placeholder se não existir
            const imagemUrl = produto.imagem ? produto.imagem : gerarPlaceHolder(produto.nome, produto.id);
            
            card.innerHTML = `
                <div class="produto-imagem">
                    <img src="${imagemUrl}" alt="${produto.nome}">
                </div>
                <div class="produto-info">
                    <span class="produto-id">ID: ${produto.id}</span>
                    <h3 class="produto-nome">${produto.nome}</h3>
                    <p class="produto-descricao">${produto.descricao}</p>
                    <div class="produto-preco">${produto.preco.toFixed(2)}</div>
                </div>
            `;
            
            container.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Erro:', error);
        const container = document.getElementById('lista-produtos');
        container.innerHTML = '<p style="color: red; text-align: center; grid-column: 1/-1;">Erro ao carregar produtos. Verifique se o arquivo produtos.json existe.</p>';
    });
