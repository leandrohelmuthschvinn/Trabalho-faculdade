
function salvarProduto() {
    const numeroProduto = document.getElementById('numeroProduto').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataEntrega = document.getElementById('dataEntrega').value;
    const status = document.getElementById('status').value;
    const custo = document.getElementById('custo').value;


    if (!numeroProduto || !quantidade || !dataEntrega || !status || !custo) {
        alert('Por favor, preencha todos os campos.');
        return;
    }


    const produtosEstoque = JSON.parse(localStorage.getItem('produtosEstoque')) || [];
    const produtoEstoque = produtosEstoque.find(produto => produto.numero === numeroProduto);

    
    if (!produtoEstoque) {
        alert('Número de produto não encontrado no estoque.');
        return;
    }

    
    if (produtoEstoque.nome !== document.getElementById('nomeProduto').value) {
        alert('O nome do produto inserido não corresponde ao número de produto.');
        return;
    }

    
    const novoProduto = {
        numero: numeroProduto,
        nome: produtoEstoque.nome, 
        quantidade: quantidade,
        dataEntrega: dataEntrega,
        status: status,
        custo: custo
    };

    
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(novoProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    
    adicionarProdutoATabela(novoProduto);

    
    document.getElementById('numeroProduto').value = '';
    document.getElementById('nomeProduto').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('dataEntrega').value = '';
    document.getElementById('status').value = '';
    document.getElementById('custo').value = '';
}


function adicionarProdutoATabela(produto) {
    const tabela = document.getElementById('tabelaProdutos');
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${produto.numero}</td>
        <td>${produto.nome}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.dataEntrega}</td>
        <td>${produto.status}</td>
        <td>${produto.custo}</td>
        <td><button onclick="removerProduto(this)">Remover</button></td>
    `;
    tabela.appendChild(novaLinha);
}


function removerProduto(botao) {
    const linhaRemover = botao.closest('tr'); 
    linhaRemover.remove();

    const numeroProduto = linhaRemover.querySelector('td').textContent; 
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos = produtos.filter(produto => produto.numero !== numeroProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
}


function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.forEach(produto => adicionarProdutoATabela(produto));
}


function gerarRelatorio() {
    const linhasTabela = document.querySelectorAll('#tabelaProdutos tr');
    let custoTotal = 0;

    linhasTabela.forEach((linha, index) => {
        if (index !== 0) { 
            const status = linha.cells[4].textContent.trim(); 

            if (status === "Aprovado") {
                const custo = parseFloat(linha.cells[5].textContent.trim()); 
                if (!isNaN(custo)) {
                    custoTotal += custo;
                }
            }
        }
    });

    alert(`O custo total dos produtos aprovados é R$ ${custoTotal.toFixed(2)}`);
}


carregarProdutos(); 
