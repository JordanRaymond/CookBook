module.exports = (sequelize, DataTypes) => {
    const StepsList = sequelize.define('StepsLists', {
      stepsListId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        }
      },
    })

    return StepsList
  }