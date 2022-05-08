class UserModel {
  constructor (realm) {
    this.realm = realm;
    this.tableName = 'User';
  }

  authenticate (credentials) {
    const user = this.findAll().find(user => user.username === credentials.username && user.password === credentials.password);
    if (typeof user !== 'undefined') {
      return user;
    } else {
      throw new Error('User not found');
    }
  }

  findAll () {
    return this.realm.objects(this.tableName);
  }

  findById (id) {
    return this.realm.objectForPrimaryKey(this.tableName, id);
  }

  findBy (key, value) {
    return this.realm.object(this.tableName).filtered(`${key} == ${value}`);
  }

  create (user) {
    return this.realm.write(() => {
      let newUser = this.realm.create(this.tableName, {
        _id: this.realm.objects(this.tableName).sorted('_id').length + 1,
        ...user
      });
      return newUser;
    });
  }

  update (user) {

  }

  delete (user) {

  }
}

module.exports = UserModel;