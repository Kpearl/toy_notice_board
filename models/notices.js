const tableName = 'notices'

module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define(tableName,
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      keyword: DataTypes.STRING,
      created_at: DataTypes.DATE
    }, {})

  Notice.associate = function(models) {
  }

  return Notice
}