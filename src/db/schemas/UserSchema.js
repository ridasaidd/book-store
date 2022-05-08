const UserSchema = {
    name: 'User',
    properties: {
        _id: 'int',
        username: 'string',
        password: 'string'
    },
    primaryKey: '_id'
}

module.exports = UserSchema;