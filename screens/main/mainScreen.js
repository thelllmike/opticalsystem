// Import necessary modules from Electron
const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");

// Create a class to manage the main application window
class MainScreen {
  // Initialize the window instance
  window;

  // Default position settings for the window
  position = {
    width: 1400,
    height: 750,
    maximized: false,
  };

  constructor() {
    // Create a new BrowserWindow instance
    this.window = new BrowserWindow({
      width: this.position.width,
      height: this.position.height,
      title: "This is a test application",
      show: false,
      removeMenu: true,
      acceptFirstMouse: true,
      autoHideMenuBar: true,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, "./mainPreload.js"), // Load a preload script to expose safe API to the renderer process
      },
    });

    // Once the window is ready to show, display it and maximize if necessary
    this.window.once("ready-to-show", () => {
      this.window.show();
      if (this.position.maximized) {
        this.window.maximize();
      }
    });

    // Set up event listeners and message handling for the window
    this.handleMessages();

    // Open DevTools in undocked mode for development
    let wc = this.window.webContents;
    wc.openDevTools({ mode: "undocked" });

    // Load the main HTML file for the application
    this.window.loadFile("./screens/main/main.html");
  }

  // Close the window and remove all IPC event listeners
  close() {
    this.window.close();
    ipcMain.removeAllListeners();
  }

  // Hide the window
  hide() {
    this.window.hide();
  }

  // Set up IPC message handling for the window
  handleMessages() {
    // Ipc functions go here.
  }
}

// Export the MainScreen class so it can be used in other modules
module.exports = MainScreen;
