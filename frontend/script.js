const API = "http://localhost:3000";
function navegar(idPagina) {
    // Esconde todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Mostra a página clicada
    document.getElementById(idPagina).classList.add('active');
}

// --- UTILITÁRIOS ---
async function buscar(rota) {
    try {
        const res = await fetch(`${API}/${rota}`);
        return res.ok ? await res.json() : [];
    } catch (err) {
        console.error(`Erro ao buscar ${rota}:`, err);
        return [];
    }
}

async function deletar(rota, id) {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;
    try {
        const res = await fetch(`${API}/${rota}/${id}`, { method: "DELETE" });
        if (res.ok) {
            renderizarTudo(); // Atualiza as listas após excluir
        } else {
            alert("Erro ao excluir. Verifique se o item está sendo usado em uma sessão ou filme.");
        }
    } catch (err) {
        alert("Erro de conexão.");
    }
}

// --- RENDERIZAÇÃO DAS LISTAS ---
async function renderizarTudo() {
    // 1. GÊNEROS
    const generos = await buscar("genero");
    const listaGeneros = document.getElementById("listaGeneros");
    const generoSelect = document.getElementById("generoSelect");
    
    if (listaGeneros) {
        listaGeneros.innerHTML = generos.map(g => `
            <div class="card">
                <span><strong>${g.nome}</strong></span>
                <button class="btn-del" onclick="deletar('genero', ${g.id})">Excluir</button>
            </div>
        `).join('');
    }
    if (generoSelect) {
        generoSelect.innerHTML = generos.map(g => `<option value="${g.id}">${g.nome}</option>`).join('');
    }

    // 2. SALAS
    const salas = await buscar("sala");
    const listaSalas = document.getElementById("listaSalas");
    const salaSelect = document.getElementById("salaSelect");

    if (listaSalas) {
        listaSalas.innerHTML = salas.map(s => `
            <div class="card">
                <span><strong>${s.identificacao}</strong> (Cap: ${s.capacidade})</span>
                <button class="btn-del" onclick="deletar('sala', ${s.id})">Excluir</button>
            </div>
        `).join('');
    }
    if (salaSelect) {
        salaSelect.innerHTML = salas.map(s => `<option value="${s.id}">${s.identificacao}</option>`).join('');
    }

    // 3. FILMES
    const filmes = await buscar("filme");
    const listaFilmes = document.getElementById("listaFilmes");
    const filmeSelect = document.getElementById("filmeSelect");

    if (listaFilmes) {
        listaFilmes.innerHTML = filmes.map(f => `
            <div class="card">
                <span><strong>${f.titulo}</strong> (${f.classificacaoEtaria})</span>
                <button class="btn-del" onclick="deletar('filme', ${f.id})">Excluir</button>
            </div>
        `).join('');
    }
    if (filmeSelect) {
        filmeSelect.innerHTML = filmes.map(f => `<option value="${f.id}">${f.titulo}</option>`).join('');
    }

    // 4. SESSÕES
    const sessoes = await buscar("sessao");
    const listaSessoes = document.getElementById("listaSessoes");
    const sessaoSelect = document.getElementById("sessaoSelect");

    if (listaSessoes) {
        listaSessoes.innerHTML = sessoes.map(s => `
            <div class="card">
                <span><strong>${s.filme?.titulo}</strong> - ${s.sala?.identificacao} (${new Date(s.data).toLocaleString()})</span>
                <button class="btn-del" onclick="deletar('sessao', ${s.id})">Excluir</button>
            </div>
        `).join('');
    }
    if (sessaoSelect) {
        sessaoSelect.innerHTML = '<option value="">Selecione uma sessão ativa</option>' + 
            sessoes.map(s => `<option value="${s.id}">${s.filme?.titulo} - ${new Date(s.data).toLocaleTimeString()}</option>`).join('');
    }
}

// --- FORMULÁRIOS DE CRIAÇÃO ---
async function cadastrar(e, rota, corpo) {
    e.preventDefault();
    try {
        const res = await fetch(`${API}/${rota}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corpo)
        });
        if (res.ok) {
            e.target.reset();
            renderizarTudo();
        } else {
            const erro = await res.json();
            alert("Erro: " + (erro.message || "Falha ao cadastrar"));
        }
    } catch (err) {
        alert("Erro de conexão.");
    }
}

// Eventos de Submissão
document.getElementById("formGenero").onsubmit = (e) => cadastrar(e, "genero", { 
    nome: document.getElementById("nomeGenero").value 
});

document.getElementById("formSala").onsubmit = (e) => cadastrar(e, "sala", { 
    identificacao: document.getElementById("numeroSala").value,
    capacidade: Number(document.getElementById("capacidadeSala").value)
});

document.getElementById("formFilme").onsubmit = (e) => cadastrar(e, "filme", { 
    titulo: document.getElementById("titulo").value,
    duracao: 120, // valor padrão se não houver input
    classificacaoEtaria: "14", // valor padrão
    generoId: Number(document.getElementById("generoSelect").value)
});

document.getElementById("formSessao").onsubmit = (e) => cadastrar(e, "sessao", { 
    filmeId: Number(document.getElementById("filmeSelect").value),
    salaId: Number(document.getElementById("salaSelect").value),
    data: document.getElementById("dataSessao").value,
    valorIngresso: 20.0
});

// --- VENDA PDV (Apenas Ingresso) ---
document.getElementById("formVendaUnificada").onsubmit = async e => {
    e.preventDefault();
    const sessaoId = Number(document.getElementById("sessaoSelect").value);
    const tipo = document.getElementById("tipoIngresso").value;
    const valorPago = (tipo === "meia") ? 10.0 : 20.0;

    if (!sessaoId) return alert("Selecione uma sessão!");

    await cadastrar(e, "ingresso", { sessaoId, tipo, valorPago });
    alert("Venda realizada com sucesso!");
    atualizarPrecoTotal();
};

// --- LÓGICA DE PREÇO ---
function atualizarPrecoTotal() {
    const tipo = document.getElementById("tipoIngresso").value;
    const combo = document.getElementById("lancheCombo");
    const precoCombo = Number(combo.options[combo.selectedIndex]?.dataset.preco || 0);
    const precoIngresso = (tipo === "meia") ? 10.0 : 20.0;
    const total = precoIngresso + precoCombo;
    document.getElementById("valorTotal").innerText = total.toFixed(2).replace('.', ',');
}

document.getElementById("tipoIngresso").onchange = atualizarPrecoTotal;
document.getElementById("lancheCombo").onchange = atualizarPrecoTotal;

// Inicialização
renderizarTudo();