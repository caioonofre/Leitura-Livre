// ========================================
// LEITURA LIVRE - JAVASCRIPT PRINCIPAL
// ========================================

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Leitura Livre carregado com sucesso!');
    
    // Inicializa todas as funcionalidades
    initializeNavigation();
    initializeButtons();
    initializeFilters();
    initializeCards();
    initializeModal();
    initializeSearch();
    initializeScrollEffects();
});

// ========================================
// SISTEMA DE NAVEGAÇÃO
// ========================================
function initializeNavigation() {
    // Navegação suave para âncoras
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header transparente no scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(18, 18, 18, 0.98)';
        } else {
            header.style.background = 'rgba(18, 18, 18, 0.95)';
        }
    });
}

// ========================================
// SISTEMA DE BOTÕES PRINCIPAIS
// ========================================
function initializeButtons() {
    
    // Botão "Comece a Escrever" (Hero)
    const btnStartWriting = document.querySelector('.hero .btn-cta');
    if (btnStartWriting) {
        btnStartWriting.addEventListener('click', function() {
            showNotification("⬆️ Abrindo seletor de arquivos para upload de PDF...", "info");
            setTimeout(() => {
                const pdfUploadInput = document.getElementById("pdfUploadInput");
                if (pdfUploadInput) {
                    pdfUploadInput.click();
                } else {
                    showNotification("❌ Erro: Input de upload de PDF não encontrado.", "error");
                }
            }, 500);
        });
    }

    // Botão "Explore Livros" (Hero)
    const btnExploreBooks = document.querySelector('.hero .btn-outline');
    if (btnExploreBooks) {
        btnExploreBooks.addEventListener('click', function() {
            showNotification('📚 Explorando nossa biblioteca...', 'info');
            setTimeout(() => {
                document.getElementById('popular-books').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 500);
        });
    }

    // Botão "Criar Minha Conta" (CTA Section)
    const btnCreateAccount = document.querySelector('.cta-section .btn-cta');
    if (btnCreateAccount) {
        btnCreateAccount.addEventListener('click', function() {
            showLoginModal('Crie sua conta gratuita e comece a publicar hoje mesmo!', 'register');
        });
    }

    // Botão "Conhecer a Comunidade" (CTA Section)
    const btnKnowCommunity = document.querySelector('.cta-section .btn-outline');
    if (btnKnowCommunity) {
        btnKnowCommunity.addEventListener('click', function() {
            showNotification('🌟 Carregando página da comunidade...', 'info');
            setTimeout(() => {
                alert('Bem-vindo à nossa comunidade!\n\n• Mais de 50.000 autores ativos\n• Milhares de livros publicados\n• Comunidade acolhedora e colaborativa\n• Ferramentas gratuitas de publicação');
            }, 800);
        });
    }

    // Botão "Ver Todas" (Recent Books)
    const btnSeeAll = document.querySelector('.recent-books .btn-outline');
    if (btnSeeAll) {
        btnSeeAll.addEventListener('click', function() {
            showNotification('📖 Carregando todas as publicações...', 'info');
            setTimeout(() => {
                alert('Aqui você encontraria todas as últimas publicações da plataforma, organizadas por data e categoria.');
            }, 800);
        });
    }

    // Botão "Apoiar" (Header)
    const btnSupport = document.querySelector('.btn-primary');
    if (btnSupport) {
        btnSupport.addEventListener('click', function() {
            showSupportModal();
        });
    }

    // Botão de busca (Header)
    const btnSearch = document.querySelector('.btn-icon');
    if (btnSearch) {
        btnSearch.addEventListener('click', function() {
            toggleSearchBar();
        });
    }

    // Botão de usuário (Header)
    const btnUser = document.querySelectorAll('.btn-icon')[1];
    if (btnUser) {
        btnUser.addEventListener('click', function() {
            showLoginModal('Acesse sua conta ou crie uma nova para continuar.');
        });
    }
}

// ========================================
// SISTEMA DE FILTROS
// ========================================
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona classe active ao botão clicado
            this.classList.add('active');
            
            // Simula carregamento de conteúdo
            const period = this.textContent.toLowerCase();
            showNotification(`📊 Carregando livros populares do ${period}...`, 'info');
            
            // Simula mudança de conteúdo
            setTimeout(() => {
                updateBookGrid(period);
            }, 800);
        });
    });
}

// ========================================
// SISTEMA DE CARDS INTERATIVOS
// ========================================
function initializeCards() {
    // Cards de livros
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const author = this.querySelector('p').textContent;
            showBookModal(title, author);
        });
    });

    // Cards de categorias
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h3').textContent;
            const count = this.querySelector('p').textContent;
            showNotification(`📚 Explorando categoria: ${category}`, 'info');
            setTimeout(() => {
                alert(`Categoria: ${category}\n${count}\n\nAqui você encontraria todos os livros desta categoria organizados por popularidade, data de publicação e avaliação.`);
            }, 800);
        });
    });

    // Cards de publicações recentes
    const recentCards = document.querySelectorAll('.recent-card');
    recentCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const author = this.querySelector('p').textContent;
            showBookModal(title, author, true);
        });
    });
}

// ========================================
// SISTEMA DE MODAL DE LOGIN
// ========================================
function initializeModal() {
    // Cria o modal de login se não existir
    if (!document.getElementById('loginModal')) {
        createLoginModal();
    }
}

function createLoginModal() {
    const modalHTML = `
        <div id="loginModal" class="modal-overlay" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modalTitle">Entrar na Leitura Livre</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p id="modalMessage">Faça login para acessar todas as funcionalidades da plataforma.</p>
                    
                    <form id="loginForm" class="login-form">
                        <div class="form-group">
                            <label for="email">E-mail:</label>
                            <input type="email" id="email" name="email" required placeholder="seu@email.com">
                        </div>
                        
                        <div class="form-group">
                            <label for="password">Senha:</label>
                            <input type="password" id="password" name="password" required placeholder="Sua senha">
                        </div>
                        
                        <div class="form-options">
                            <label class="checkbox-label">
                                <input type="checkbox" id="remember"> Lembrar de mim
                            </label>
                            <a href="#" class="forgot-password">Esqueci minha senha</a>
                        </div>
                        
                        <button type="submit" class="btn-login">Entrar</button>
                    </form>
                    
                    <div class="modal-footer">
                        <p>Não tem uma conta? <a href="#" id="switchToRegister">Cadastre-se gratuitamente</a></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Adiciona estilos do modal
    addModalStyles();
    
    // Adiciona eventos do modal
    addModalEvents();
}

function addModalStyles() {
    const styles = `
        <style>
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-overlay.show {
            opacity: 1;
        }
        
        .modal-content {
            background: var(--spotify-gray);
            border-radius: 16px;
            width: 90%;
            max-width: 400px;
            max-height: 90vh;
            overflow-y: auto;
            transform: translateY(20px);
            transition: transform 0.3s ease;
            border: 1px solid var(--spotify-light-gray);
        }
        
        .modal-overlay.show .modal-content {
            transform: translateY(0);
        }
        
        .modal-header {
            padding: 24px 24px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h2 {
            color: var(--spotify-white);
            font-size: 24px;
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: var(--spotify-text-gray);
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: var(--spotify-light-gray);
            color: var(--spotify-white);
        }
        
        .modal-body {
            padding: 24px;
        }
        
        .modal-body p {
            color: var(--spotify-text-gray);
            margin-bottom: 24px;
            line-height: 1.5;
        }
        
        .login-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .form-group label {
            color: var(--spotify-white);
            font-weight: 500;
            font-size: 14px;
        }
        
        .form-group input {
            background: var(--spotify-light-gray);
            border: 1px solid transparent;
            border-radius: 8px;
            padding: 12px 16px;
            color: var(--spotify-white);
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: var(--spotify-green);
            background: var(--spotify-dark-gray);
        }
        
        .form-group input::placeholder {
            color: var(--spotify-text-gray);
        }
        
        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
        }
        
        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--spotify-text-gray);
            cursor: pointer;
        }
        
        .checkbox-label input[type="checkbox"] {
            width: auto;
            margin: 0;
        }
        
        .forgot-password {
            color: var(--spotify-green);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .forgot-password:hover {
            color: var(--spotify-green-hover);
        }
        
        .btn-login {
            background: var(--gradient-primary);
            color: var(--spotify-white);
            border: none;
            border-radius: 50px;
            padding: 14px 24px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 8px;
        }
        
        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(29, 185, 84, 0.4);
        }
        
        .modal-footer {
            text-align: center;
            margin-top: 24px;
            padding-top: 20px;
            border-top: 1px solid var(--spotify-light-gray);
        }
        
        .modal-footer p {
            color: var(--spotify-text-gray);
            margin: 0;
        }
        
        .modal-footer a {
            color: var(--spotify-green);
            text-decoration: none;
            font-weight: 500;
        }
        
        .modal-footer a:hover {
            color: var(--spotify-green-hover);
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

function addModalEvents() {
    const modal = document.getElementById('loginModal');
    const closeBtn = modal.querySelector('.modal-close');
    const loginForm = document.getElementById('loginForm');
    const switchToRegister = document.getElementById('switchToRegister');
    
    // Fechar modal
    closeBtn.addEventListener('click', hideLoginModal);
    
    // Fechar modal clicando fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideLoginModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            hideLoginModal();
        }
    });
    
    // Submit do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Trocar para registro
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        switchToRegisterMode();
    });
    
    // Link "Esqueci minha senha"
    modal.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('📧 Link de recuperação enviado para seu e-mail!', 'success');
    });
}

function showLoginModal(message = '', mode = 'login') {
    const modal = document.getElementById('loginModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    if (mode === 'register') {
        modalTitle.textContent = 'Criar Conta na Leitura Livre';
        modalMessage.textContent = message || 'Crie sua conta gratuita e comece a publicar hoje mesmo!';
    } else {
        modalTitle.textContent = 'Entrar na Leitura Livre';
        modalMessage.textContent = message || 'Faça login para acessar todas as funcionalidades da plataforma.';
    }
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Foca no primeiro input
    setTimeout(() => {
        modal.querySelector('input').focus();
    }, 300);
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showNotification('❌ Por favor, preencha todos os campos!', 'error');
        return;
    }
    
    // Simula processo de login
    showNotification('🔄 Fazendo login...', 'info');
    
    setTimeout(() => {
        hideLoginModal();
        showNotification(`✅ Bem-vindo de volta, ${email.split('@')[0]}!`, 'success');
        
        // Simula mudanças na interface após login
        setTimeout(() => {
            updateUIAfterLogin(email);
        }, 1000);
    }, 1500);
}

function switchToRegisterMode() {
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const btnLogin = document.querySelector('.btn-login');
    const switchLink = document.getElementById('switchToRegister');
    
    modalTitle.textContent = 'Criar Conta na Leitura Livre';
    modalMessage.textContent = 'Junte-se à nossa comunidade de autores e leitores!';
    btnLogin.textContent = 'Criar Conta';
    switchLink.innerHTML = 'Já tem uma conta? <a href="#" onclick="switchToLoginMode()">Faça login</a>';
}

function switchToLoginMode() {
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const btnLogin = document.querySelector('.btn-login');
    const switchLink = document.getElementById('switchToRegister');
    
    modalTitle.textContent = 'Entrar na Leitura Livre';
    modalMessage.textContent = 'Faça login para acessar todas as funcionalidades da plataforma.';
    btnLogin.textContent = 'Entrar';
    switchLink.innerHTML = 'Não tem uma conta? <a href="#" onclick="switchToRegisterMode()">Cadastre-se gratuitamente</a>';
}

// ========================================
// SISTEMA DE BUSCA
// ========================================
function initializeSearch() {
    // A barra de busca será criada dinamicamente
}

function toggleSearchBar() {
    let searchBar = document.getElementById('searchBar');
    
    if (!searchBar) {
        createSearchBar();
        searchBar = document.getElementById('searchBar');
    }
    
    if (searchBar.style.display === 'none' || !searchBar.style.display) {
        searchBar.style.display = 'block';
        setTimeout(() => {
            searchBar.classList.add('show');
            searchBar.querySelector('input').focus();
        }, 10);
    } else {
        searchBar.classList.remove('show');
        setTimeout(() => {
            searchBar.style.display = 'none';
        }, 300);
    }
}

function createSearchBar() {
    const searchHTML = `
        <div id="searchBar" class="search-bar" style="display: none;">
            <div class="search-container">
                <input type="text" placeholder="Buscar livros, autores, categorias..." id="searchInput">
                <button class="search-btn">🔍</button>
                <button class="search-close">&times;</button>
            </div>
            <div class="search-suggestions" id="searchSuggestions"></div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', searchHTML);
    
    // Adiciona estilos da busca
    addSearchStyles();
    
    // Adiciona eventos da busca
    addSearchEvents();
}

function addSearchStyles() {
    const styles = `
        <style>
        .search-bar {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: rgba(18, 18, 18, 0.98);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--spotify-light-gray);
            z-index: 9999;
            padding: 20px 0;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        }
        
        .search-bar.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .search-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .search-container input {
            flex: 1;
            background: var(--spotify-light-gray);
            border: 1px solid transparent;
            border-radius: 50px;
            padding: 16px 24px;
            color: var(--spotify-white);
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .search-container input:focus {
            outline: none;
            border-color: var(--spotify-green);
            background: var(--spotify-gray);
        }
        
        .search-container input::placeholder {
            color: var(--spotify-text-gray);
        }
        
        .search-btn, .search-close {
            background: var(--spotify-green);
            border: none;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .search-close {
            background: var(--spotify-light-gray);
            color: var(--spotify-text-gray);
        }
        
        .search-btn:hover, .search-close:hover {
            transform: scale(1.1);
        }
        
        .search-suggestions {
            max-width: 1200px;
            margin: 16px auto 0;
            padding: 0 24px;
            color: var(--spotify-text-gray);
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

function addSearchEvents() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const searchClose = document.querySelector('.search-close');
    
    searchBtn.addEventListener('click', performSearch);
    searchClose.addEventListener('click', toggleSearchBar);
    
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        } else if (e.key === 'Escape') {
            toggleSearchBar();
        }
    });
    
    searchInput.addEventListener('input', function() {
        showSearchSuggestions(this.value);
    });
}

function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (!query) {
        showNotification('❌ Digite algo para buscar!', 'error');
        return;
    }
    
    showNotification(`🔍 Buscando por: "${query}"...`, 'info');
    
    setTimeout(() => {
        toggleSearchBar();
        showNotification(`📚 Encontrados 42 resultados para "${query}"`, 'success');
    }, 1000);
}

function showSearchSuggestions(query) {
    const suggestions = document.getElementById('searchSuggestions');
    
    if (query.length < 2) {
        suggestions.innerHTML = '';
        return;
    }
    
    const mockSuggestions = [
        'Ficção Científica', 'Romance', 'Suspense', 'Poesia',
        'Ana Silva', 'Carlos Mendes', 'Maria Santos',
        'O Último Guardião das Estrelas', 'Memórias de um Coração Partido'
    ];
    
    const filtered = mockSuggestions.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filtered.length > 0) {
        suggestions.innerHTML = `
            <p>Sugestões: ${filtered.slice(0, 5).join(', ')}</p>
        `;
    } else {
        suggestions.innerHTML = '<p>Nenhuma sugestão encontrada</p>';
    }
}

// ========================================
// SISTEMA DE NOTIFICAÇÕES
// ========================================
function showNotification(message, type = 'info') {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Adiciona estilos inline para garantir que funcione
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'success' ? '#1db954' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10001;
        font-weight: 500;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Anima a entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================
function updateBookGrid(period) {
    const bookGrid = document.querySelector('.book-grid');
    const books = bookGrid.querySelectorAll('.book-card');
    
    // Simula mudança de conteúdo baseada no período
    books.forEach((book, index) => {
        const rating = book.querySelector('.rating span');
        const views = book.querySelector('.rating span:last-child');
        
        // Simula dados diferentes para cada período
        if (period === 'dia') {
            rating.textContent = (4.5 + Math.random() * 0.5).toFixed(1);
            views.textContent = `${Math.floor(Math.random() * 5000 + 1000)} visualizações hoje`;
        } else if (period === 'semana') {
            rating.textContent = (4.3 + Math.random() * 0.7).toFixed(1);
            views.textContent = `${Math.floor(Math.random() * 20000 + 5000)} visualizações esta semana`;
        } else {
            rating.textContent = (4.0 + Math.random() * 1.0).toFixed(1);
            views.textContent = `${Math.floor(Math.random() * 50000 + 10000)} visualizações este mês`;
        }
    });
    
    showNotification(`✅ Livros do ${period} atualizados!`, 'success');
}

function showBookModal(title, author, isRecent = false) {
    const type = isRecent ? 'publicação recente' : 'livro popular';
    const message = `📖 ${title}\n${author}\n\nEste é um ${type} em nossa plataforma. Aqui você poderia:\n\n• Ler o livro completo\n• Deixar uma avaliação\n• Adicionar aos favoritos\n• Compartilhar com amigos\n• Ver outros livros do autor`;
    
    showNotification(`📚 Abrindo: ${title}`, 'info');
    setTimeout(() => {
        alert(message);
    }, 800);
}

function showSupportModal() {
    const message = `💚 Apoie a Leitura Livre\n\nSua contribuição ajuda a manter nossa plataforma gratuita e acessível para todos os autores.\n\nFormas de apoiar:\n• Doação mensal (R$ 10, R$ 25, R$ 50)\n• Compartilhar a plataforma\n• Avaliar livros\n• Participar da comunidade\n\nObrigado por fazer parte da nossa missão!`;
    
    showNotification('💚 Abrindo opções de apoio...', 'info');
    setTimeout(() => {
        alert(message);
    }, 800);
}

function updateUIAfterLogin(email) {
    // Simula mudanças na interface após login
    const userBtn = document.querySelectorAll('.btn-icon')[1];
    if (userBtn) {
        userBtn.innerHTML = `<span style="color: #1db954; font-size: 12px; font-weight: 600;">${email.split('@')[0]}</span>`;
    }
    
    // Adiciona indicador de usuário logado
    const header = document.querySelector('.header');
    if (header && !header.querySelector('.user-indicator')) {
        const indicator = document.createElement('div');
        indicator.className = 'user-indicator';
        indicator.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            width: 8px;
            height: 8px;
            background: #1db954;
            border-radius: 50%;
            border: 2px solid white;
        `;
        userBtn.style.position = 'relative';
        userBtn.appendChild(indicator);
    }
}

// ========================================
// EFEITOS DE SCROLL
// ========================================
function initializeScrollEffects() {
    // Parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa cards e seções
    const elementsToAnimate = document.querySelectorAll('.book-card, .category-card, .recent-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// FUNÇÕES GLOBAIS (para compatibilidade)
// ========================================
window.switchToLoginMode = switchToLoginMode;
window.switchToRegisterMode = switchToRegisterMode;

// ========================================
// LOG DE INICIALIZAÇÃO
// ========================================
console.log(`
🚀 Leitura Livre JavaScript carregado!

Funcionalidades ativas:
✅ Navegação suave
✅ Sistema de login/registro
✅ Busca inteligente
✅ Filtros interativos
✅ Cards clicáveis
✅ Notificações
✅ Efeitos de scroll
✅ Modal responsivo

Desenvolvido com ❤️ para democratizar a literatura.
`);



// ========================================
// SISTEMA DE PUBLICAÇÃO DE PDF
// ========================================
function initializePdfUpload() {
    const pdfUploadInput = document.getElementById("pdfUploadInput");
    const uploadPdfButton = document.getElementById("uploadPdfButton");
    const fileNameDisplay = document.getElementById("fileNameDisplay");
    const pdfList = document.getElementById("pdfList");
    const noPdfMessage = document.getElementById("noPdfMessage");

    let uploadedPdfs = []; // Armazena PDFs temporariamente na sessão

    // Evento para o botão de upload
    if (uploadPdfButton) {
        uploadPdfButton.addEventListener("click", function() {
            pdfUploadInput.click(); // Simula o clique no input de arquivo
        });
    }

    // Evento quando um arquivo é selecionado
    if (pdfUploadInput) {
        pdfUploadInput.addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.type !== "application/pdf") {
                    showNotification("❌ Por favor, selecione um arquivo PDF.", "error");
                    fileNameDisplay.textContent = "Nenhum arquivo selecionado";
                    return;
                }

                fileNameDisplay.textContent = `Arquivo selecionado: ${file.name}`;
                showNotification(`🔄 Preparando para carregar: ${file.name}`, "info");

                const reader = new FileReader();
                reader.onload = function(e) {
                    const pdfDataUrl = e.target.result;
                    const newPdf = {
                        name: file.name,
                        url: pdfDataUrl,
                        uploadDate: new Date().toLocaleDateString("pt-BR"),
                        author: "Você (Usuário Atual)" // Simulação de autor
                    };
                    uploadedPdfs.push(newPdf);
                    renderPdfList();
                    showNotification(`✅ PDF '${file.name}' carregado com sucesso!`, "success");
                };
                reader.readAsDataURL(file);
            } else {
                fileNameDisplay.textContent = "Nenhum arquivo selecionado";
            }
        });
    }

    function renderPdfList() {
        pdfList.innerHTML = ""; // Limpa a lista atual
        if (uploadedPdfs.length === 0) {
            noPdfMessage.style.display = "block";
            pdfList.appendChild(noPdfMessage); // Garante que a mensagem esteja na lista
        } else {
            noPdfMessage.style.display = "none";
            uploadedPdfs.forEach((pdf, index) => {
                const pdfCard = document.createElement("div");
                pdfCard.className = "pdf-card";
                pdfCard.innerHTML = `
                    <div class="pdf-thumbnail">📄</div>
                    <div class="pdf-info">
                        <h3>${pdf.name}</h3>
                        <p>por ${pdf.author}</p>
                        <p>Publicado em: ${pdf.uploadDate}</p>
                    </div>
                `;
                pdfCard.addEventListener("click", () => showPdfViewer(pdf.name, pdf.url));
                pdfList.appendChild(pdfCard);
            });
        }
    }

    // Inicializa a lista de PDFs ao carregar a página
    renderPdfList();
}

function showPdfViewer(title, pdfUrl) {
    let pdfViewerModal = document.getElementById("pdfViewerModal");
    if (!pdfViewerModal) {
        pdfViewerModal = document.createElement("div");
        pdfViewerModal.id = "pdfViewerModal";
        pdfViewerModal.className = "pdf-viewer-modal";
        pdfViewerModal.innerHTML = `
            <div class="pdf-viewer-content">
                <div class="pdf-viewer-header">
                    <h3 id="pdfViewerTitle"></h3>
                    <button class="pdf-viewer-close">&times;</button>
                </div>
                <div class="pdf-viewer-body">
                    <iframe id="pdfViewerFrame" src="" frameborder="0"></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(pdfViewerModal);

        // Adiciona evento para fechar o modal
        pdfViewerModal.querySelector(".pdf-viewer-close").addEventListener("click", hidePdfViewer);
        pdfViewerModal.addEventListener("click", function(e) {
            if (e.target === pdfViewerModal) {
                hidePdfViewer();
            }
        });
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && pdfViewerModal.style.display !== "none") {
                hidePdfViewer();
            }
        });
    }

    document.getElementById("pdfViewerTitle").textContent = title;
    document.getElementById("pdfViewerFrame").src = pdfUrl;
    pdfViewerModal.style.display = "flex";
    setTimeout(() => {
        pdfViewerModal.classList.add("show");
    }, 10);
}

function hidePdfViewer() {
    const pdfViewerModal = document.getElementById("pdfViewerModal");
    if (pdfViewerModal) {
        pdfViewerModal.classList.remove("show");
        setTimeout(() => {
            pdfViewerModal.style.display = "none";
            document.getElementById("pdfViewerFrame").src = ""; // Limpa o iframe
        }, 300);
    }
}

// Adiciona a inicialização do upload de PDF ao DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... (código existente)
    initializePdfUpload(); // Nova chamada
});


