import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './db.js';

const app = express();
const PORT = 3001;
const JWT_SECRET = '1234'; 

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ mensagem: '✅ Servidor está funcionando!' });
});

app.post('/api/registro', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
        }

        if (senha.length < 6) {
            return res.status(400).json({ erro: 'Senha deve ter no mínimo 6 caracteres' });
        }

        const [usuariosExistentes] = await pool.query(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        );

        if (usuariosExistentes.length > 0) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const [resultado] = await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senhaHash]
        );

        const token = jwt.sign(
            { id: resultado.insertId, email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            mensagem: '✅ Usuário registrado com sucesso!',
            token,
            usuario: { id: resultado.insertId, nome, email }
        });
    } catch (erro) {
        console.error('Erro no registro:', erro);
        res.status(500).json({ erro: 'Erro ao registrar usuário' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
        }

        const [usuarios] = await pool.query(
            'SELECT id, nome, email, senha FROM usuarios WHERE email = ?',
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({ erro: 'Email ou senha incorretos' });
        }

        const usuario = usuarios[0];

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ erro: 'Email ou senha incorretos' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            mensagem: '✅ Login realizado com sucesso!',
            token,
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
        });
    } catch (erro) {
        console.error('Erro no login:', erro);
        res.status(500).json({ erro: 'Erro ao fazer login' });
    }
});

app.get('/api/verificar-token', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ erro: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const [usuarios] = await pool.query(
            'SELECT id, nome, email FROM usuarios WHERE id = ?',
            [decoded.id]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({ erro: 'Usuário não encontrado' });
        }

        res.json({
            valido: true,
            usuario: usuarios[0]
        });
    } catch (erro) {
        console.error('Erro ao verificar token:', erro);
        res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
});

app.post('/api/logout', (req, res) => {
    res.json({ mensagem: '✅ Logout realizado com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📝 Teste a API em http://localhost:${PORT}/api/test`);
});
