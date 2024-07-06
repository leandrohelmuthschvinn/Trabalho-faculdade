// função para adicionar um produto ao estoque
function adicionarProduto() {
    
    const numeroProduto = document.getElementById('numeroProduto').value;
    const nomeProduto = document.getElementById('nomeProduto').value;
    const quantidade = document.getElementById('quantidade').value;
    const fornecedor = document.getElementById('fornecedor').value;

    
    const novoProduto = {
        numero: numeroProduto,
        nome: nomeProduto,
        quantidade: quantidade,
        fornecedor: fornecedor
    };

    
    let produtosEstoque = JSON.parse(localStorage.getItem('produtosEstoque')) || [];
    produtosEstoque.push(novoProduto);
    localStorage.setItem('produtosEstoque', JSON.stringify(produtosEstoque));

    
    const tabelaEstoque = document.getElementById('tabelaEstoque');
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${numeroProduto}</td>
        <td>${nomeProduto}</td>
        <td>${quantidade}</td>
        <td>${fornecedor}</td>
        <td><button class="excluir-button">Excluir</button></td>
    `;
    tabelaEstoque.appendChild(novaLinha);


    document.getElementById('numeroProduto').value = '';
    document.getElementById('nomeProduto').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('fornecedor').value = '';
}


document.getElementById('tabelaEstoque').addEventListener('click', function(event) {
    if (event.target.classList.contains('excluir-button')) {
        const linhaASerExcluida = event.target.closest('tr'); 
        linhaASerExcluida.remove(); 

        
        const numeroProduto = linhaASerExcluida.querySelector('td').textContent; 
        let produtosEstoque = JSON.parse(localStorage.getItem('produtosEstoque')) || [];
        produtosEstoque = produtosEstoque.filter(produto => produto.numero !== numeroProduto);
        localStorage.setItem('produtosEstoque', JSON.stringify(produtosEstoque));
    }
});


function carregarProdutosEstoque() {
    const produtosEstoque = JSON.parse(localStorage.getItem('produtosEstoque')) || [];
    produtosEstoque.forEach(produto => adicionarProdutoATabelaEstoque(produto));
}

function adicionarProdutoATabelaEstoque(produto) {
    const tabelaEstoque = document.getElementById('tabelaEstoque');
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${produto.numero}</td>
        <td>${produto.nome}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.fornecedor}</td>
        <td><button class="excluir-button">Excluir</button></td>
    `;
    tabelaEstoque.appendChild(novaLinha);
}


carregarProdutosEstoque(); 
