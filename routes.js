// Установка зависимостей
const express = require('express');
const router = express.Router();

// DAO
const { getPublicationsByTitle, getPublicationById, insertRequest } = require('./database');

// Обработчики маршрутов

// Получение списка книг
router.get('/books', async (req, res) => {
    const { name } = req.query;

    try {
        const publications = await getPublicationsByTitle(name);
        res.json(publications);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Получение книги по id
router.get('/book', async (req, res) => {
    const { id } = req.query;

    try {
        const publication = await getPublicationById(id);
        res.json(publication);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Сохранение заявки
router.post('/newreq', async (req, res) => {
    const { pid, name, email, phone } = req.body;

    try {
        const insertedId = await insertRequest(pid, name, email, phone);
        res.send(insertedId);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;