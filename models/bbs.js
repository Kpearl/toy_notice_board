const tableName = 'bbs'

module.exports = (sequelize, DataTypes) => {
  const Bbs = sequelize.define(tableName,
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }, {})

  Bbs.associate = function(models) {
  }
  return Bbs
}