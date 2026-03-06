/**
 * CONFIGURAÇÃO GOOGLE SHEETS - MVP SIMPLIFICADO
 * 
 * Instruções rápidas:
 * 1. Criar planilha no Google Sheets
 * 2. Adicionar dados conforme exemplo abaixo
 * 3. Compartilhar com "Qualquer pessoa com o link"
 * 4. Copiar ID da URL e colar aqui
 * 5. Upload dos arquivos
 * 6. Pronto!
 */

const SHEETS_CONFIG = {
    // ALTERE AQUI: Cole o ID da sua planilha
    GOOGLE_SHEET_ID: '1fMEfkfzeUuTWDHg0WpZDE4SC5xkOivTtPdguwz28iEo',
    
    // Atualizar a cada 10 segundos (rápido para testes)
    UPDATE_INTERVAL: 10000,
    
    // Mostrar logs no console
    DEBUG_MODE: true
};

function logSheets(msg) {
    if (SHEETS_CONFIG.DEBUG_MODE) {
        console.log(`[Sheets] ${msg}`);
    }
}
