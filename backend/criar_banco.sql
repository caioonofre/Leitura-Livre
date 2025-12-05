-- Criar banco de dados
CREATE DATABASE leitura_livre_db;

-- Usar o banco de dados
USE leitura_livre_db;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criar índice para email (para buscas mais rápidas)
CREATE INDEX idx_email ON usuarios(email);


select * from usuarios;
-- Inserir um usuário de teste (opcional)
-- INSERT INTO usuarios (nome, email, senha) VALUES ('Teste', 'teste@email.com', 'senha_hash_aqui');
