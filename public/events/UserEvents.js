const electron = require('electron');
const UserModel = require('../../src/db/models/UserModel');
const realmJS = require('../../src/db/config/RealmConfig');

module.exports = electron.app.whenReady().then(async () => {
    const realm = await realmJS ();
    const User = new UserModel (realm);

    electron.ipcMain.on('get-all-users', (req, res) => {
        console.log('asdf', res);
    });

    electron.ipcMain.on('log-in', (event, args) => {
        let response = {};
        try {
            const user = User.authenticate(args);
            response = {
                key: user.username, type: 'user'
            };
        } catch (error) {
            response = {
                error: error,
                type: 'error'
            };
        }
        
        event.reply('logged-in', response);
    });

    electron.ipcMain.on('log-out', (req, res) => {

    });
    
    electron.ipcMain.on('register', (req, res) => {

    });
});