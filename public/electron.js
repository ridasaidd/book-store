const electron = require("electron");
const path = require("path");
const app = electron.app;

const Realm = require("realm");

const BrowserWindow = electron.BrowserWindow;
let mainWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        webPreferences: { nodeIntegration: true, contextIsolation: false },
    });
    // and load the index.html of the app.
    console.log(__dirname);
    mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  app.commandLine.appendSwitch('trace-warnings');

    const UserSchema = {
        name: 'User',
        properties: {
            _id: 'int',
            username: 'string',
            password: 'string'
        },
        primaryKey: '_id'
    }

    const realm = await Realm.open({
        schema: [UserSchema],
        path: './myrealm/data'
    })

    electron.ipcMain.on('authentication', async (event, response) => {
      /*
      let user;
      realm.write(() => {
        user = realm.create('User', {
          _id: realm.objects('User').sorted('_id').length + 1,
          username: response.username,
          password: response.password
        })
      });
      */
      const user = realm.objects('User').find(u => u.username == response.username && u.password == response.password);
      console.log(user)
      event.reply('authentication-reply', `users table => ${user}`);
    });

    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = "http://localhost:3000";
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
      event.preventDefault();
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

