// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url');
const reload = require('electron-reload');

// Путь к корневой папке проекта
const rootPath = path.join(__dirname, '..');

// Настройка автоматической перезагрузки при изменении кода
reload(rootPath);

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        resizable: false,
        fullscreen: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})