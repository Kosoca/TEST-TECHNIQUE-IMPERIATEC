module.exports = (sequelize, DataTypes) => {
    const Displays = sequelize.define("Displays", {
      name_of_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrival_hour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
     arrival_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    return Displays;
  };