module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Users.assoiate = (models) => {
      Users.hasMany(models.Displays, {
        onDelete: "cascade",
      });
    };

    return Users;
  };