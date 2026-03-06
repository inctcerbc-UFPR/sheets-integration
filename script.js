// ============================================
// MENU MOBILE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ============================================
// ABAS DE OBJETIVOS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Remove classe active de todos os conteúdos
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona classe active ao botão clicado
            button.classList.add('active');
            
            // Adiciona classe active ao conteúdo correspondente
            const tabId = button.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });

    // Ativa a primeira aba por padrão
    const firstTab = document.querySelector('.tab-button');
    if (firstTab) {
        firstTab.click();
    }
});

// ============================================
// SCROLL SUAVE
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// ANIMAÇÃO AO SCROLL (Intersection Observer)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards e elementos
document.querySelectorAll('.result-card, .team-member, .about-info').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ============================================
// HIGHLIGHT SEÇÃO ATIVA NA NAVEGAÇÃO
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// ADICIONAR ESTILO PARA LINK ATIVO
// ============================================

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-gold);
    }
`;
document.head.appendChild(style);

// ============================================
// FUNÇÃO PARA AJUSTAR ALTURA DO IFRAME
// ============================================

// Esta função permite que a página se ajuste melhor quando incorporada como iframe
function adjustIframeHeight() {
    if (window.parent !== window) {
        // Página está dentro de um iframe
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage({
            type: 'iframeHeight',
            height: height
        }, '*');
    }
}

// Chamar ao carregar e quando o conteúdo muda
window.addEventListener('load', adjustIframeHeight);
window.addEventListener('resize', adjustIframeHeight);

// Observar mudanças no DOM
const mutationObserver = new MutationObserver(adjustIframeHeight);
mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
});

// ============================================
// SUPORTE A TEMAS ESCUROS (OPCIONAL)
// ============================================

// Detectar preferência de tema escuro do sistema
function initDarkModeSupport() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Você pode adicionar suporte a tema escuro aqui se desejar
    // Por enquanto, mantemos o tema claro como padrão
}

initDarkModeSupport();

// ============================================
// CONSOLE LOG PARA DEBUG
// ============================================

console.log('Página RAM carregada com sucesso');
console.log('Versão: 1.0');
console.log('Compatível com iframe em Wix');
