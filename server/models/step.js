module.exports = (sequelize, DataTypes) => {
    const Steps = sequelize.define('Steps', {
      stepId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
    })
    
    Steps.descriptionMaxLength = 500
    
     // Instacne function
     Steps.prototype.toJson = function() {
      return {
        description: this.description
      }
    }
    return Steps
  }