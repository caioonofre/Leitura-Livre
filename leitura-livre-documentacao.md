# Leitura Livre - Documentação do Projeto

## Visão Geral

O **Leitura Livre** é uma plataforma web desenvolvida para democratizar a publicação literária, permitindo que qualquer pessoa crie, publique e descubra literatura digital. O projeto foi desenvolvido como código base inspirado no site mangalivre.blog, mas com uma personalidade e propósito completamente diferentes.

## Objetivos do Projeto

### Objetivo Geral
Desenvolver uma plataforma web que permita a qualquer pessoa criar e publicar livros digitalmente, superando as barreiras tradicionais da publicação literária.

### Objetivos Específicos
- Criar uma interface intuitiva para escrita e edição de textos
- Implementar sistema de geração de PDF dos textos
- Desenvolver sistema de publicação e descoberta de livros
- Construir uma comunidade de leitores e escritores
- Democratizar o acesso à publicação literária

## Tecnologias Utilizadas

### Frontend
- **React 18+** - Biblioteca JavaScript para construção da interface
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS para estilização
- **shadcn/ui** - Componentes de interface pré-construídos
- **Lucide React** - Biblioteca de ícones
- **React Router DOM** - Roteamento de páginas
- **Framer Motion** - Animações (pré-instalado)

### Ferramentas de Desenvolvimento
- **pnpm** - Gerenciador de pacotes
- **ESLint** - Linter para qualidade de código
- **PostCSS** - Processamento de CSS

## Estrutura do Projeto

```
leitura-livre/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/          # Recursos estáticos
│   ├── components/      # Componentes React
│   │   ├── ui/         # Componentes de interface (shadcn/ui)
│   │   ├── Header.jsx  # Cabeçalho da aplicação
│   │   ├── Home.jsx    # Página inicial
│   │   └── Footer.jsx  # Rodapé da aplicação
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilitários e bibliotecas
│   ├── App.css         # Estilos globais
│   ├── App.jsx         # Componente principal
│   ├── index.css       # Estilos base
│   └── main.jsx        # Ponto de entrada
├── components.json     # Configuração shadcn/ui
├── index.html          # Template HTML
├── package.json        # Dependências e scripts
└── vite.config.js      # Configuração do Vite
```

## Funcionalidades Implementadas

### 1. Header Responsivo
- Logo com gradiente personalizado
- Navegação desktop e mobile
- Menu hamburger para dispositivos móveis
- Botões de ação (busca, perfil, apoiar)

### 2. Página Inicial (Home)
- **Hero Section**: Apresentação da plataforma com CTAs
- **Estatísticas**: Números da plataforma (livros, autores, leitores, downloads)
- **Livros Populares**: Grid de livros com filtros (Dia/Semana/Mês)
- **Categorias**: Seção de exploração por gêneros literários
- **Últimas Publicações**: Livros recém-publicados
- **CTA Final**: Chamada para ação para novos usuários

### 3. Sistema de Cards
- Cards de livros com imagens, títulos, autores
- Sistema de avaliação com estrelas
- Contador de visualizações
- Badges de categoria
- Hover effects e transições

### 4. Footer Completo
- Links de navegação organizados
- Informações do projeto
- Links sociais
- Informações acadêmicas (TCC)

## Design e Identidade Visual

### Paleta de Cores
- **Primária**: Gradiente azul profundo (#1e3a8a) para verde esmeralda (#059669)
- **Secundária**: Tons de slate para backgrounds e textos
- **Accent**: Cores vibrantes para categorias (rosa, roxo, azul, verde, laranja, vermelho)
- **Gradientes**: Utilizados extensivamente para criar profundidade visual

### Tipografia
- **Títulos**: Fontes bold com gradientes coloridos
- **Corpo**: Texto em tons de slate para boa legibilidade
- **Hierarquia**: Clara distinção entre títulos, subtítulos e texto corpo

### Layout
- **Responsivo**: Adaptado para desktop, tablet e mobile
- **Grid System**: Utilização do sistema de grid do Tailwind
- **Espaçamento**: Consistente em toda a aplicação
- **Animações**: Hover effects e transições suaves

## Diferenciação do Site de Referência

### Manga Livre vs Leitura Livre

| Aspecto | Manga Livre | Leitura Livre |
|---------|-------------|---------------|
| **Propósito** | Leitura de mangás existentes | Criação e publicação de literatura original |
| **Conteúdo** | Mangás, manhwas, manhuas | Livros, romances, poesia, crônicas, etc. |
| **Usuários** | Leitores | Autores e leitores |
| **Funcionalidade** | Consumo de conteúdo | Criação e consumo de conteúdo |
| **Comunidade** | Leitores de mangá | Escritores e leitores de literatura |
| **Monetização** | Doações | Doações + potencial venda de livros |

### Personalidade Única
- **Foco na Criação**: Ênfase em ferramentas para autores
- **Diversidade Literária**: Suporte a múltiplos gêneros literários
- **Democratização**: Missão de tornar a publicação acessível
- **Comunidade Literária**: Foco em construir uma comunidade de escritores

## Próximos Passos (Funcionalidades Futuras)

### Fase 1 - Autenticação e Perfis
- Sistema de login/registro
- Perfis de usuário
- Dashboard do autor

### Fase 2 - Editor de Texto
- Editor WYSIWYG integrado
- Salvamento automático
- Formatação de texto
- Preview em tempo real

### Fase 3 - Geração de PDF
- Conversão de texto para PDF
- Templates de layout
- Capas personalizadas
- Download de livros

### Fase 4 - Sistema de Publicação
- Upload e gestão de livros
- Sistema de categorização
- Configurações de privacidade
- Moderação de conteúdo

### Fase 5 - Comunidade e Interação
- Sistema de comentários
- Avaliações e reviews
- Seguir autores
- Feed de atividades

### Fase 6 - Funcionalidades Avançadas
- Sistema de busca avançada
- Recomendações personalizadas
- Estatísticas para autores
- Sistema de monetização

## Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm

### Instalação
```bash
# Clonar o repositório
cd leitura-livre

# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

### Scripts Disponíveis
- `pnpm run dev` - Servidor de desenvolvimento
- `pnpm run build` - Build para produção
- `pnpm run preview` - Preview do build de produção
- `pnpm run lint` - Verificação de código

## Considerações Técnicas

### Performance
- Lazy loading de imagens
- Code splitting automático (Vite)
- Otimização de assets
- CSS otimizado com Tailwind

### Acessibilidade
- Estrutura semântica HTML
- Navegação por teclado
- Contraste adequado de cores
- Labels apropriados

### SEO
- Meta tags configuradas
- Estrutura HTML semântica
- URLs amigáveis (preparado para)
- Open Graph (preparado para)

## Conclusão

O projeto **Leitura Livre** representa uma base sólida para uma plataforma de publicação literária democratizada. Com um design moderno, código bem estruturado e foco na experiência do usuário, a aplicação está preparada para evoluir e incorporar as funcionalidades avançadas necessárias para se tornar uma plataforma completa de criação e descoberta literária.

O código base desenvolvido demonstra a viabilidade técnica do projeto descrito no TCC, oferecendo uma fundação robusta para o desenvolvimento futuro das funcionalidades de criação, edição e publicação de livros digitais.

