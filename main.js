// Modules to control application life and create native browser window
const { app, BrowserWindow, session, ipcRenderer } = require('electron')
const path = require('path')
const reload = require('electron-reload');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');

// Создание экземпляра приложения Express
const expressApp = express();

// Подключение middleware для обработки данных формы
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());
expressApp.use(cors());

// Использование модуля с маршрутами
expressApp.use('/', routes);

// Запуск сервера
expressApp.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Путь к корневой папке проекта
const rootPath = path.join(__dirname, '..');

// Настройка автоматической перезагрузки при изменении кода
reload(rootPath);

const createWindow = () => {
    // Создание окна
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        resizable: false,
        fullscreen: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true, // Включение поддержки Node.js в окне рендеринга
            contextIsolation: false,
        },
    })

    // загрузка страницы поиска
    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})