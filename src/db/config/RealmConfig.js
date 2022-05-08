const Realm = require('realm');
const UserSchema = require('../schemas/UserSchema');

module.exports = async () => {
    try {
        const realm = await Realm.open({
            schema: [UserSchema],
            path: './src/db/database/mainDB'
        });
        return realm;
    } catch (error) {
        console.error('Realm config => ', error);
    }
    
};