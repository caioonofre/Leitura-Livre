# Planejamento do Site "Leitura Livre"

## Análise do Documento TCC

### Objetivos do Projeto
- Desenvolver uma plataforma web que permita a qualquer pessoa criar e publicar livros digitalmente
- Superar as barreiras tradicionais da publicação literária
- Democratizar a publicação literária
- Permitir aos usuários escrever e transformar seus textos em PDF
- Publicar os PDFs gerados na plataforma
- Criar uma comunidade de leitores e escritores

### Funcionalidades Identificadas no TCC
1. Sistema de criação de contas
2. Editor de texto para escrita
3. Geração de PDF dos textos
4. Sistema de publicação online
5. Área para comentários e avaliações
6. Comunidade de leitores e autores

## Análise do Site de Referência (Manga Livre)

### Estrutura Visual Identificada
- Header com navegação (Início, Todos os Mangás, Em Lançamento)
- Logo centralizado com destaque
- Fundo escuro com elementos visuais
- Seções organizadas: Populares, Em Destaque, Últimas Atualizações
- Sistema de avaliação com estrelas
- Cards com capas dos mangás
- Botões de filtro (Dia, Semana, Mês)
- Funcionalidade de busca e login

### Elementos de Design
- Paleta de cores: Verde/azul como cor principal, fundo escuro
- Layout responsivo
- Cards com hover effects
- Sistema de tags/categorias
- Navegação intuitiva

## Adaptação para "Leitura Livre"

### Diferenças Conceituais
- **Manga Livre**: Plataforma de leitura de mangás existentes
- **Leitura Livre**: Plataforma de criação e publicação de livros originais

### Estrutura Proposta para Leitura Livre

#### Header
- Logo "Leitura Livre"
- Navegação: Início, Explorar Livros, Meus Livros, Escrever
- Botões: Busca, Login/Perfil

#### Seções Principais
1. **Hero Section**
   - Título: "Leitura Livre"
   - Subtítulo: "Sua plataforma para criar, publicar e descobrir literatura"
   - CTA: "Comece a Escrever" / "Explore Livros"

2. **Livros Populares**
   - Grid de livros com capas
   - Sistema de avaliação
   - Filtros: Mais Lidos, Melhor Avaliados, Recentes

3. **Categorias Literárias**
   - Romance, Ficção, Não-ficção, Poesia, Crônicas, etc.

4. **Últimas Publicações**
   - Livros recém-publicados pelos usuários

5. **Comunidade**
   - Destaques de autores
   - Comentários recentes
   - Estatísticas da plataforma

#### Funcionalidades Específicas
1. **Editor de Texto**
   - Interface WYSIWYG
   - Formatação básica
   - Salvamento automático
   - Preview do livro

2. **Gerador de PDF**
   - Conversão automática
   - Templates de layout
   - Capa personalizada

3. **Sistema de Publicação**
   - Upload de capa
   - Definição de categoria
   - Descrição e tags
   - Configurações de privacidade

4. **Perfil do Autor**
   - Biografia
   - Livros publicados
   - Estatísticas
   - Seguidores

### Paleta de Cores Proposta
- **Primária**: Azul profundo (#1e3a8a) - representa conhecimento e confiança
- **Secundária**: Verde esmeralda (#059669) - representa crescimento e criatividade
- **Accent**: Dourado (#f59e0b) - representa valor e qualidade
- **Neutros**: Cinza escuro (#374151), Branco (#ffffff)

### Tipografia
- **Títulos**: Fonte serifada elegante (Playfair Display ou similar)
- **Corpo**: Fonte sans-serif legível (Inter ou similar)
- **Código**: Fonte monospace (Fira Code ou similar)

### Tecnologias Propostas
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla ou React)
- **Backend**: Node.js (conforme especificado no TCC)
- **Banco de Dados**: MongoDB ou PostgreSQL
- **PDF Generation**: jsPDF ou Puppeteer
- **Autenticação**: JWT
- **Upload de Arquivos**: Multer

### Diferenciação do Manga Livre
1. **Foco na Criação**: Enquanto o Manga Livre é para leitura, o Leitura Livre é para criação e publicação
2. **Comunidade de Escritores**: Foco em autores independentes
3. **Ferramentas de Escrita**: Editor integrado e geração de PDF
4. **Diversidade Literária**: Não limitado a um gênero específico
5. **Monetização Opcional**: Sistema de doações ou vendas para autores

### Layout Responsivo
- **Desktop**: Layout de 3 colunas para listagens
- **Tablet**: Layout de 2 colunas
- **Mobile**: Layout de 1 coluna com navegação hamburger

### Interações e Animações
- Hover effects nos cards de livros
- Transições suaves entre páginas
- Loading states para operações assíncronas
- Animações de entrada para elementos
- Feedback visual para ações do usuário

