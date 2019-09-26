module.exports = (sequelize, DataTypes) => {
    const Unit = sequelize.define('Units', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,  
        }
      },
      info: {
          type: DataTypes.STRING,
          allowNull: true,
      }  
    })

    return Unit
  }