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
      comment: DataTypes.STRING,
      name: DataTypes.STRING,
      parent_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE
    }, {})

  Notice.associate = function(models) {
  }
  return Notice
}