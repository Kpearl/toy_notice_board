const tableName = 'users'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(tableName,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }, {})

  User.associate = function(models) {
  }
  return User
}
