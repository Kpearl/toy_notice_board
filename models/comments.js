const tableName = 'comments'

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(tableName,
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      boards_id: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      name: DataTypes.STRING,
      parent_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE
    }, {})

  Comment.associate = function(models) {
    models.comments.hasMany(models.comments, {
        as: 'childComment',
        foreignKey: 'parent_id',
        sourceKey: 'id'
      })}

  return Comment
}