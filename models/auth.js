module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            notNull: true,
            unique: true,
        },  
        username: {
            type: DataTypes.STRING,
            notNull: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            notNull: true,
        },
        firstName: {
            type: DataTypes.TEXT,
            notNull: true,
        },
        lastName: {
            type: DataTypes.TEXT,
            notNull: true,
        }
    });

    return User;
}