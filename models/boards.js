const tableName = 'boards'

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(tableName,
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      contents: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    }, {})

  Board.associate = function(models) {

  }
  return Board
}