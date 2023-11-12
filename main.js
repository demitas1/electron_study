// Modules
const {app, BrowserWindow} = require('electron');

console.log(`1. app is ready?: ${app.isReady()}`);
setTimeout(() => {
    console.log(`2. app is ready?: ${app.isReady()}`);
  },
  2000);



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow () {
  console.log('creating main window.');

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    backgroundColor: '#2B2E3B',
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
      show: false,
    }
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html');
  mainWindow.once('ready-to-show', mainWindow.show);

  // Open DevTools - Remove for PRODUCTION!
  //mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null;
  });
}

// Electron `before-quit` event
app.on('before-quit', (e) => {
  console.log('app is quitting now.');
  //e.preventDefault();
});

// Electron `app` is ready
app.on('ready', () => {
  console.log('app ready!');
  createWindow();
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
});
