module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        userId: {
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
        },
        userImage :{
            type: DataTypes.TEXT,
        },
        role: {
            type: DataTypes.ENUM("administrator", "customer"),
            notNull: true,
        },
        activeStatus: {
            type: DataTypes.BOOLEAN,
            notNull: true,
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Orders, {
            onDelete: "cascade"
        });
    };

    return User;
}