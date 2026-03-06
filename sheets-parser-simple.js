/**
 * PARSER GOOGLE SHEETS - MVP SIMPLIFICADO
 * 
 * Estrutura da planilha esperada:
 * Nome | Instituição
 * Prof. João | UFPR
 * Prof. Maria | UFMS
 */

async function carregarDadosSheets() {
    if (SHEETS_CONFIG.GOOGLE_SHEET_ID === 'SEU_ID_AQUI') {
        logSheets('❌ ID não configurado! Altere sheets-config-simple.js');
        return;
    }
    
    logSheets('🔄 Carregando dados...');
    
    const url = `https://docs.google.com/spreadsheets/d/${SHEETS_CONFIG.GOOGLE_SHEET_ID}/export?format=csv&gid=0`;
    
    try {
        const response = await fetch(url);
        const csv = await response.text();
        
        // Processar CSV
        const linhas = csv.trim().split('\n');
        const dados = [];
        
        // Pular cabeçalho (primeira linha)
        for (let i = 1; i < linhas.length; i++) {
            const valores = linhas[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
            if (valores[0]) {
                dados.push({
                    nome: valores[0],
                    instituicao: valores[1] || ''
                });
            }
        }
        
        logSheets(`✅ ${dados.length} membros carregados`);
        atualizarEquipe(dados);
        
    } catch (error) {
        logSheets(`❌ Erro: ${error.message}`);
    }
}

function atualizarEquipe(dados) {
    const container = document.querySelector('[data-sheets="equipe"]');
    
    if (!container) {
        logSheets('⚠️ Container não encontrado');
        return;
    }
    
    let html = '';
    dados.forEach(membro => {
        const abrev = membro.nome.substring(0, 2).toUpperCase();
        html += `
            <div class="team-member">
                <div class="member-avatar">${abrev}</div>
                <h4>${membro.nome}</h4>
                <p>${membro.instituicao}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Carregar ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    logSheets('🚀 Iniciando...');
    carregarDadosSheets();
    
    // Atualizar periodicamente
    setInterval(carregarDadosSheets, SHEETS_CONFIG.UPDATE_INTERVAL);
});

// Função manual para atualizar
window.atualizarSheets = carregarDadosSheets;
