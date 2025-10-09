document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Leitura Livre carregado com sucesso!');
    initializeNavigation();
    initializeButtons();
    initializeFilters();
    initializeCards();
    initializeModal();
    initializeSearch();
    initializeScrollEffects();
    initializePdfUpload();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (!header) return;
        header.style.background = window.scrollY > 100 ? 'rgba(18, 18, 18, 0.98)' : 'rgba(18, 18, 18, 0.95)';
    });
}

function initializeButtons() {
    const btnStartWriting = document.querySelector('.hero .btn-cta');
    if (btnStartWriting) {
        btnStartWriting.addEventListener('click', function () {
            showNotification('⬆️ Abrindo seletor de arquivos para upload de PDF...', 'info');
            setTimeout(() => {
                const pdfUploadInput = document.getElementById('pdfUploadInput');
                if (pdfUploadInput) {
                    pdfUploadInput.click();
                } else {
                    showNotification('❌ Erro: Input de upload de PDF não encontrado.', 'error');
                }
            }, 500);
        });
    }
    const btnExploreBooks = document.querySelector('.hero .btn-outline');
    if (btnExploreBooks) {
        btnExploreBooks.addEventListener('click', function () {
            showNotification('📚 Explorando nossa biblioteca...', 'info');
            setTimeout(() => {
                const target = document.getElementById('popular-books');
                target && target.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        });
    }
    const btnCreateAccount = document.querySelector('.cta-section .btn-cta');
    btnCreateAccount && btnCreateAccount.addEventListener('click', function () {
        showLoginModal('Crie sua conta gratuita e comece a publicar hoje mesmo!', 'register');
    });
    const btnKnowCommunity = document.querySelector('.cta-section .btn-outline');
    btnKnowCommunity && btnKnowCommunity.addEventListener('click', function () {
        showNotification('🌟 Carregando página da comunidade...', 'info');
        setTimeout(() => {
            alert('Bem-vindo à nossa comunidade!\n\n• Mais de 50.000 autores ativos\n• Milhares de livros publicados\n• Comunidade acolhedora e colaborativa\n• Ferramentas gratuitas de publicação');
        }, 800);
    });
    const btnSeeAll = document.querySelector('.recent-books .btn-outline');
    btnSeeAll && btnSeeAll.addEventListener('click', function () {
        showNotification('📖 Carregando todas as publicações...', 'info');
        setTimeout(() => {
            alert('Aqui você encontraria todas as últimas publicações da plataforma, organizadas por data e categoria.');
        }, 800);
    });
    const btnSupport = document.querySelector('.btn-primary');
    btnSupport && btnSupport.addEventListener('click', function () { showSupportModal(); });
    const btnSearch = document.querySelector('.btn-icon');
    btnSearch && btnSearch.addEventListener('click', function () { toggleSearchBar(); });
    const btnUser = document.querySelectorAll('.btn-icon')[1];
    btnUser && btnUser.addEventListener('click', function () { showLoginModal('Acesse sua conta ou crie uma nova para continuar.'); });
}

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const period = this.textContent.toLowerCase();
            showNotification(`📊 Carregando livros populares do ${period}...`, 'info');
            setTimeout(() => { updateBookGrid(period); }, 800);
        });
    });
}

function initializeCards() {
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('h3').textContent;
            const author = this.querySelector('p').textContent;
            showBookModal(title, author);
        });
    });
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function () {
            const category = this.querySelector('h3').textContent;
            const count = this.querySelector('p').textContent;
            showNotification(`📚 Explorando categoria: ${category}`, 'info');
            setTimeout(() => { showCategoryDetailsModal(category, count); }, 800);
        });
    });
    const recentCards = document.querySelectorAll('.recent-card');
    recentCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('h3').textContent;
            const author = this.querySelector('p').textContent;
            showBookModal(title, author, true);
        });
    });
}

function initializeModal() { if (!document.getElementById('loginModal')) createLoginModal(); }

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
    addModalStyles();
    addModalEvents();
}

function addModalStyles() {
    const styles = `
        <style>
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px); z-index: 10000; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
        .modal-overlay.show { opacity: 1; }
        .modal-content { background: var(--spotify-gray); border-radius: 16px; width: 90%; max-width: 400px; max-height: 90vh; overflow-y: auto; transform: translateY(20px); transition: transform 0.3s ease; border: 1px solid var(--spotify-light-gray); }
        .modal-overlay.show .modal-content { transform: translateY(0); }
        .modal-header { padding: 24px 24px 0; display: flex; justify-content: space-between; align-items: center; }
        .modal-header h2 { color: var(--spotify-white); font-size: 24px; margin: 0; }
        .modal-close { background: none; border: none; color: var(--spotify-text-gray); font-size: 24px; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.3s ease; }
        .modal-close:hover { background: var(--spotify-light-gray); color: var(--spotify-white); }
        .modal-body { padding: 24px; }
        .modal-body p { color: var(--spotify-text-gray); margin-bottom: 24px; line-height: 1.5; }
        .login-form { display: flex; flex-direction: column; gap: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label { color: var(--spotify-white); font-weight: 500; font-size: 14px; }
        .form-group input { background: var(--spotify-light-gray); border: 1px solid transparent; border-radius: 8px; padding: 12px 16px; color: var(--spotify-white); font-size: 16px; transition: all 0.3s ease; }
        .form-group input:focus { outline: none; border-color: var(--spotify-green); background: var(--spotify-dark-gray); }
        .form-group input::placeholder { color: var(--spotify-text-gray); }
        .form-options { display: flex; justify-content: space-between; align-items: center; font-size: 14px; }
        .checkbox-label { display: flex; align-items: center; gap: 8px; color: var(--spotify-text-gray); cursor: pointer; }
        .checkbox-label input[type="checkbox"] { width: auto; margin: 0; }
        .forgot-password { color: var(--spotify-green); text-decoration: none; transition: color 0.3s ease; }
        .forgot-password:hover { color: var(--spotify-green-hover); }
        .btn-login { background: var(--gradient-primary); color: var(--spotify-white); border: none; border-radius: 50px; padding: 14px 24px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; margin-top: 8px; }
        .btn-login:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(29, 185, 84, 0.4); }
        .modal-footer { text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--spotify-light-gray); }
        .modal-footer p { color: var(--spotify-text-gray); margin: 0; }
        .modal-footer a { color: var(--spotify-green); text-decoration: none; font-weight: 500; }
        .modal-footer a:hover { color: var(--spotify-green-hover); }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
}

function addModalEvents() {
    const modal = document.getElementById('loginModal');
    const closeBtn = modal.querySelector('.modal-close');
    const loginForm = document.getElementById('loginForm');
    const switchToRegister = document.getElementById('switchToRegister');
    closeBtn.addEventListener('click', hideLoginModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) hideLoginModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.style.display !== 'none') hideLoginModal(); });
    loginForm.addEventListener('submit', function (e) { e.preventDefault(); handleLogin(); });
    switchToRegister.addEventListener('click', function (e) { e.preventDefault(); switchToRegisterMode(); });
    modal.querySelector('.forgot-password').addEventListener('click', function (e) { e.preventDefault(); showNotification('📧 Link de recuperação enviado para seu e-mail!', 'success'); });
}

function showLoginModal(message = '', mode = 'login') {
    const modal = document.getElementById('loginModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const loginButton = modal.querySelector('.btn-login');
    const switchLink = document.getElementById('switchToRegister');
    if (message) modalMessage.textContent = message;
    if (mode === 'register') {
        modalTitle.textContent = 'Criar Conta Gratuita';
        loginButton.textContent = 'Cadastrar';
        switchLink.innerHTML = 'Já tem uma conta? <a href="#" id="switchToLogin">Faça login</a>';
        document.getElementById('switchToLogin').addEventListener('click', function (e) { e.preventDefault(); switchToLoginMode(); });
    } else {
        modalTitle.textContent = 'Entrar na Leitura Livre';
        loginButton.textContent = 'Entrar';
        switchLink.innerHTML = 'Não tem uma conta? <a href="#" id="switchToRegister">Cadastre-se gratuitamente</a>';
        document.getElementById('switchToRegister').addEventListener('click', function (e) { e.preventDefault(); switchToRegisterMode(); });
    }
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('show'); }, 10);
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

function switchToRegisterMode() { showLoginModal('Crie sua conta gratuita e comece a publicar hoje mesmo!', 'register'); }
function switchToLoginMode() { showLoginModal('Acesse sua conta ou crie uma nova para continuar.', 'login'); }

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email && password) {
        showNotification('✅ Login realizado com sucesso!', 'success');
        hideLoginModal();
    } else {
        showNotification('❌ Por favor, preencha todos os campos.', 'error');
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const closeSearch = document.getElementById('closeSearch');
    closeSearch && closeSearch.addEventListener('click', toggleSearchBar);
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            const suggestions = ['Romance', 'Ficção Científica', 'Fantasia', 'Suspense', 'Aventura', 'Biografia', 'História', 'Poesia'];
            const filteredSuggestions = suggestions.filter(s => s.toLowerCase().includes(query));
            updateSearchSuggestions(filteredSuggestions);
        });
    }
}

function toggleSearchBar() {
    const searchBar = document.getElementById('searchBar');
    if (!searchBar) return;
    searchBar.classList.toggle('show');
    if (searchBar.classList.contains('show')) {
        const input = document.getElementById('searchInput');
        input && input.focus();
    }
}

function updateSearchSuggestions(suggestions) {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (!suggestionsContainer) return;
    suggestionsContainer.innerHTML = '';
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            li.addEventListener('click', () => {
                const input = document.getElementById('searchInput');
                if (input) input.value = suggestion;
                suggestionsContainer.innerHTML = '';
                showNotification(`🔍 Buscando por: ${suggestion}`, 'info');
            });
            suggestionsContainer.appendChild(li);
        });
    }
}

function initializeScrollEffects() {
    const parallax = document.querySelector('.hero');
    if (!parallax) return;
    window.addEventListener('scroll', function () {
        const offset = window.pageYOffset;
        parallax.style.backgroundPositionY = offset * 0.7 + 'px';
    });

    // Cursor-follow glow for hero title
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const activate = () => heroTitle.classList.add('cursor-glow');
        const deactivate = () => heroTitle.classList.remove('cursor-glow');
        parallax.addEventListener('mousemove', (e) => {
            activate();
            const rect = heroTitle.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            heroTitle.style.setProperty('--mx', x + '%');
            heroTitle.style.setProperty('--my', y + '%');
        });
        parallax.addEventListener('mouseleave', deactivate);
    }

    // Cursor-follow glow on hero background layer
    parallax.classList.add('cursor-glow');
    parallax.addEventListener('mousemove', (e) => {
        const rect = parallax.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        parallax.style.setProperty('--mx', x + '%');
        parallax.style.setProperty('--my', y + '%');
        // reverted to circular glow: no rotation/radius deformation
    });
    parallax.addEventListener('mouseleave', () => {
        parallax.style.removeProperty('--mx');
        parallax.style.removeProperty('--my');
        parallax.style.removeProperty('--rot');
        parallax.style.removeProperty('--rx');
        parallax.style.removeProperty('--ry');
    });
}

function showNotification(message, type = 'info') {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
        const styles = `
            <style>
            #notification { position: fixed; top: 20px; right: 20px; background-color: var(--spotify-gray); color: var(--spotify-white); padding: 15px 25px; border-radius: 8px; box-shadow: var(--shadow-high); z-index: 10001; opacity: 0; transform: translateX(100%); transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); border-left: 5px solid var(--spotify-green); }
            #notification.show { opacity: 1; transform: translateX(0); }
            #notification.error { border-left-color: var(--spotify-red); }
            #notification.success { border-left-color: var(--spotify-green); }
            #notification.info { border-left-color: var(--spotify-blue); }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    notification.textContent = message;
    notification.className = `show ${type}`;
    setTimeout(() => { notification.classList.remove('show'); }, 4000);
}

function updateBookGrid(period) {
    const bookGrid = document.querySelector('.book-grid');
    if (!bookGrid) return;
    // Render skeletons
    bookGrid.style.opacity = '0';
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-grid';
    skeleton.innerHTML = Array.from({ length: 4 }).map(() => `
        <div class="skeleton-card">
            <div class="skeleton-thumb"></div>
            <div class="skeleton-body">
                <div class="skeleton-line full"></div>
                <div class="skeleton-line mid"></div>
                <div class="skeleton-line short"></div>
            </div>
        </div>
    `).join('');
    const parent = bookGrid.parentElement;
    if (parent) {
        // Remove existing skeletons
        const olds = parent.querySelectorAll('.skeleton-grid');
        olds.forEach(n => n.remove());
        parent.insertBefore(skeleton, bookGrid);
    }
    setTimeout(() => {
        const allBooks = [
            { title: 'O Último Guardião das Estrelas', author: 'Ana Silva', genre: 'Fantasia' },
            { title: 'A Sombra do Amanhã', author: 'Carlos Mendes', genre: 'Ficção Científica' },
            { title: 'O Segredo do Vale', author: 'Mariana Costa', genre: 'Suspense' },
            { title: 'Crônicas de um Novo Mundo', author: 'Rafael Oliveira', genre: 'Aventura' },
            { title: 'Ecos do Passado', author: 'Juliana Pereira', genre: 'Romance' },
            { title: 'A Fronteira do Universo', author: 'Lucas Martins', genre: 'Ficção Científica' },
            { title: 'O Enigma da Mansão', author: 'Beatriz Santos', genre: 'Mistério' },
            { title: 'O Despertar da Magia', author: 'Pedro Almeida', genre: 'Fantasia' }
        ];
        const shuffledBooks = allBooks.sort(() => 0.5 - Math.random());
        const bookCards = bookGrid.querySelectorAll('.book-card');
        bookCards.forEach((card, index) => {
            const book = shuffledBooks[index];
            if (!book) return;
            card.querySelector('h3').textContent = book.title;
            card.querySelector('p').textContent = `por ${book.author}`;
            const randomImage = `https://picsum.photos/seed/${book.title.replace(/\s/g, '')}/400/600`;
            card.querySelector('img').src = randomImage;
        });
        // Remove skeletons e mostrar conteúdo
        if (parent) {
            const olds2 = parent.querySelectorAll('.skeleton-grid');
            olds2.forEach(n => n.remove());
        }
        bookGrid.style.opacity = '1';
    }, 500);
    showNotification(`✅ Livros do ${period} atualizados!`, 'success');
}

function showBookModal(title, author, isRecent = false) {
    let bookDetailsModal = document.getElementById('bookDetailsModal');
    if (!bookDetailsModal) {
        bookDetailsModal = document.createElement('div');
        bookDetailsModal.id = 'bookDetailsModal';
        bookDetailsModal.className = 'book-details-modal-overlay';
        bookDetailsModal.innerHTML = `
            <div class=\"book-details-modal-content\">
                <div class=\"book-details-modal-header\">
                    <h3 id=\"bookDetailsTitle\"></h3>
                    <button class=\"book-details-modal-close\">&times;</button>
                </div>
                <div class=\"book-details-modal-body\">
                    <img id=\"bookDetailsCover\" src=\"\" alt=\"Capa do Livro\" class=\"book-details-cover\">
                    <div class=\"book-details-text\">
                        <p class=\"book-details-author\"></p>
                        <p class=\"book-details-description\" id=\"bookDetailsDescription\"></p>
                        <div class=\"book-details-actions\">
                            <button class=\"btn-primary\">Ler Livro</button>
                            <button class=\"btn-outline\">Adicionar aos Favoritos</button>
                        </div>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(bookDetailsModal);
        const styles = `
            <style>
            .book-details-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px); z-index: 10003; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
            .book-details-modal-overlay.show { opacity: 1; }
            .book-details-modal-content { background: var(--spotify-gray); border-radius: 16px; width: 90%; max-width: 800px; max-height: 90vh; overflow-y: auto; transform: translateY(20px); transition: transform 0.3s ease; border: 1px solid var(--spotify-light-gray); display: flex; flex-direction: column; }
            .book-details-modal-overlay.show .book-details-modal-content { transform: translateY(0); }
            .book-details-modal-header { padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--spotify-light-gray); }
            .book-details-modal-header h3 { color: var(--spotify-white); font-size: 24px; margin: 0; }
            .book-details-modal-close { background: none; border: none; color: var(--spotify-text-gray); font-size: 24px; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.3s ease; }
            .book-details-modal-close:hover { background: var(--spotify-light-gray); color: var(--spotify-white); }
            .book-details-modal-body { padding: 24px; display: flex; gap: 24px; flex-wrap: wrap; }
            .book-details-cover { width: 180px; height: 270px; object-fit: cover; border-radius: 8px; box-shadow: var(--shadow-card); flex-shrink: 0; }
            .book-details-text { flex: 1; min-width: 250px; }
            .book-details-author { color: var(--spotify-text-gray); font-size: 16px; margin-bottom: 10px; }
            .book-details-description { color: var(--spotify-white); font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
            .book-details-actions { display: flex; gap: 15px; flex-wrap: wrap; }
            .book-details-actions .btn-primary, .book-details-actions .btn-outline { padding: 10px 20px; font-size: 14px; }
            @media (max-width: 600px) { .book-details-modal-body { flex-direction: column; align-items: center; text-align: center; } .book-details-cover { width: 150px; height: 225px; } .book-details-actions { justify-content: center; } }
            </style>`;
        document.head.insertAdjacentHTML('beforeend', styles);
        bookDetailsModal.querySelector('.book-details-modal-close').addEventListener('click', hideBookDetailsModal);
        bookDetailsModal.addEventListener('click', function (e) { if (e.target === bookDetailsModal) hideBookDetailsModal(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && bookDetailsModal.style.display !== 'none') hideBookDetailsModal(); });
        bookDetailsModal.querySelector('.btn-primary').addEventListener('click', function () { showNotification(`📖 Lendo o livro: ${title}`, 'info'); hideBookDetailsModal(); });
        bookDetailsModal.querySelector('.btn-outline').addEventListener('click', function () { showNotification(`❤️ Livro '${title}' adicionado aos favoritos!`, 'success'); });
    }
    document.getElementById('bookDetailsTitle').textContent = title;
    document.querySelector('.book-details-author').textContent = author;
    document.getElementById('bookDetailsDescription').textContent = '';
    const randomCover = `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/180/270`;
    document.getElementById('bookDetailsCover').src = randomCover;
    bookDetailsModal.style.display = 'flex';
    setTimeout(() => { bookDetailsModal.classList.add('show'); }, 10);
}

function hideBookDetailsModal() {
    const bookDetailsModal = document.getElementById('bookDetailsModal');
    if (!bookDetailsModal) return;
    bookDetailsModal.classList.remove('show');
    setTimeout(() => { bookDetailsModal.style.display = 'none'; }, 300);
}

function showSupportModal() {
    const message = `💚 Apoie a Leitura Livre\n\nSua contribuição ajuda a manter nossa plataforma gratuita e acessível para todos os autores.\n\nFormas de apoiar:\n• Doação mensal (R$ 10, R$ 25, R$ 50)\n• Compartilhar a plataforma\n• Avaliar livros\n• Participar da comunidade\n\nObrigado por fazer parte da nossa missão!`;
    alert(message);
}

function initializePdfUpload() {
    const pdfUploadInput = document.getElementById('pdfUploadInput');
    const uploadPdfButton = document.getElementById('uploadPdfButton');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const pdfList = document.getElementById('pdfList');
    const noPdfMessage = document.getElementById('noPdfMessage');
    let uploadedPdfs = [];
    uploadPdfButton && uploadPdfButton.addEventListener('click', function () { pdfUploadInput && pdfUploadInput.click(); });
    if (pdfUploadInput) {
        pdfUploadInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                if (file.type !== 'application/pdf') {
                    showNotification('❌ Por favor, selecione um arquivo PDF.', 'error');
                    fileNameDisplay && (fileNameDisplay.textContent = 'Nenhum arquivo selecionado');
                    return;
                }
                fileNameDisplay && (fileNameDisplay.textContent = `Arquivo selecionado: ${file.name}`);
                showNotification(`🔄 Preparando para carregar: ${file.name}`, 'info');
                const reader = new FileReader();
                reader.onload = function (e) {
                    const pdfDataUrl = e.target.result;
                    const newPdf = { name: file.name, url: pdfDataUrl, uploadDate: new Date().toLocaleDateString('pt-BR'), author: 'Você (Usuário Atual)' };
                    uploadedPdfs.push(newPdf);
                    renderPdfList();
                    showNotification(`✅ PDF '${file.name}' carregado com sucesso!`, 'success');
                };
                reader.readAsDataURL(file);
            } else {
                fileNameDisplay && (fileNameDisplay.textContent = 'Nenhum arquivo selecionado');
            }
        });
    }
    function renderPdfList() {
        if (!pdfList) return;
        pdfList.innerHTML = '';
        if (uploadedPdfs.length === 0) {
            noPdfMessage.style.display = 'block';
            pdfList.appendChild(noPdfMessage);
        } else {
            noPdfMessage.style.display = 'none';
            uploadedPdfs.forEach((pdf) => {
                const pdfCard = document.createElement('div');
                pdfCard.className = 'pdf-card';
                pdfCard.innerHTML = `
                    <div class=\"pdf-thumbnail\">📄</div>
                    <div class=\"pdf-info\">
                        <h3>${pdf.name}</h3>
                        <p>por ${pdf.author}</p>
                        <p>Publicado em: ${pdf.uploadDate}</p>
                    </div>`;
                pdfCard.addEventListener('click', () => showPdfViewer(pdf.name, pdf.url));
                pdfList.appendChild(pdfCard);
            });
        }
    }
    renderPdfList();
}

function showPdfViewer(title, pdfUrl) {
    let pdfViewerModal = document.getElementById('pdfViewerModal');
    if (!pdfViewerModal) {
        pdfViewerModal = document.createElement('div');
        pdfViewerModal.id = 'pdfViewerModal';
        pdfViewerModal.className = 'pdf-viewer-modal';
        pdfViewerModal.innerHTML = `
            <div class=\"pdf-viewer-content\">
                <div class=\"pdf-viewer-header\">
                    <h3 id=\"pdfViewerTitle\"></h3>
                    <button class=\"pdf-viewer-close\">&times;</button>
                </div>
                <div class=\"pdf-viewer-body\">
                    <iframe id=\"pdfViewerFrame\" src=\"\" frameborder=\"0\"></iframe>
                </div>
            </div>`;
        document.body.appendChild(pdfViewerModal);
        pdfViewerModal.querySelector('.pdf-viewer-close').addEventListener('click', hidePdfViewer);
        pdfViewerModal.addEventListener('click', function (e) { if (e.target === pdfViewerModal) hidePdfViewer(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pdfViewerModal.style.display !== 'none') hidePdfViewer(); });
    }
    document.getElementById('pdfViewerTitle').textContent = title;
    document.getElementById('pdfViewerFrame').src = pdfUrl;
    pdfViewerModal.style.display = 'flex';
    setTimeout(() => { pdfViewerModal.classList.add('show'); }, 10);
}

function hidePdfViewer() {
    const pdfViewerModal = document.getElementById('pdfViewerModal');
    if (!pdfViewerModal) return;
    pdfViewerModal.classList.remove('show');
    setTimeout(() => {
        pdfViewerModal.style.display = 'none';
        const frame = document.getElementById('pdfViewerFrame');
        if (frame) frame.src = '';
    }, 300);
}

function showCategoryDetailsModal(category, count) {
    let categoryDetailsModal = document.getElementById('categoryDetailsModal');
    if (!categoryDetailsModal) {
        categoryDetailsModal = document.createElement('div');
        categoryDetailsModal.id = 'categoryDetailsModal';
        categoryDetailsModal.className = 'category-details-modal-overlay';
        categoryDetailsModal.innerHTML = `
            <div class=\"category-details-modal-content\">
                <div class=\"category-details-modal-header\">
                    <h3 id=\"categoryDetailsTitle\"></h3>
                    <button class=\"category-details-modal-close\">&times;</button>
                </div>
                <div class=\"category-details-modal-body\">
                    <p class=\"category-details-count\"></p>
                    <p class=\"category-details-description\">Aqui você encontraria todos os livros desta categoria organizados por popularidade, data de publicação e avaliação.</p>
                    <div class=\"category-details-actions\">
                        <button class=\"btn-primary\">Ver Livros da Categoria</button>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(categoryDetailsModal);
        const styles = `
            <style>
            .category-details-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px); z-index: 10004; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
            .category-details-modal-overlay.show { opacity: 1; }
            .category-details-modal-content { background: var(--spotify-gray); border-radius: 16px; width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto; transform: translateY(20px); transition: transform 0.3s ease; border: 1px solid var(--spotify-light-gray); display: flex; flex-direction: column; text-align: center; }
            .category-details-modal-overlay.show .category-details-modal-content { transform: translateY(0); }
            .category-details-modal-header { padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--spotify-light-gray); }
            .category-details-modal-header h3 { color: var(--spotify-white); font-size: 24px; margin: 0; flex-grow: 1; text-align: center; }
            .category-details-modal-close { background: none; border: none; color: var(--spotify-text-gray); font-size: 24px; cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.3s ease; }
            .category-details-modal-close:hover { background: var(--spotify-light-gray); color: var(--spotify-white); }
            .category-details-modal-body { padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 15px; }
            .category-details-count { color: var(--spotify-text-gray); font-size: 18px; margin-bottom: 5px; }
            .category-details-description { color: var(--spotify-white); font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
            .category-details-actions .btn-primary { padding: 10px 20px; font-size: 14px; }
            </style>`;
        document.head.insertAdjacentHTML('beforeend', styles);
        categoryDetailsModal.querySelector('.category-details-modal-close').addEventListener('click', hideCategoryDetailsModal);
        categoryDetailsModal.addEventListener('click', function (e) { if (e.target === categoryDetailsModal) hideCategoryDetailsModal(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && categoryDetailsModal.style.display !== 'none') hideCategoryDetailsModal(); });
        categoryDetailsModal.querySelector('.btn-primary').addEventListener('click', function () { showNotification(`📚 Carregando livros da categoria: ${category}`, 'info'); hideCategoryDetailsModal(); });
    }
    document.getElementById('categoryDetailsTitle').textContent = `Categoria: ${category}`;
    document.querySelector('.category-details-count').textContent = count;
    categoryDetailsModal.style.display = 'flex';
    setTimeout(() => { categoryDetailsModal.classList.add('show'); }, 10);
}

function hideCategoryDetailsModal() {
    const categoryDetailsModal = document.getElementById('categoryDetailsModal');
    if (!categoryDetailsModal) return;
    categoryDetailsModal.classList.remove('show');
    setTimeout(() => { categoryDetailsModal.style.display = 'none'; }, 300);
}


function abrirDoisLinks() {

    const url1 = "https://www.instagram.com/miguelcampos.zz/";
    const url2 = "https://www.instagram.com/caioonofre/";

    
    window.open(url1, '_blank');

   
    window.open(url2, '_blank');

    return false;
}

