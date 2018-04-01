module.exports = function(sequelize, DataTypes) {
    var Orders = sequelize.define("Orders", {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderedItemName: {
            type: DataTypes.TEXT,
        },
        orderedItemQty: {
            type: DataTypes.INTEGER,
        },
        orderedItemPrice: {
            type: DataTypes.DECIMAL(10,2)
        },
        orderedItemPriceTotal: {
            type: DataTypes.DECIMAL(10,2)
        }
    });

    Orders.associate = function(models) {
        Orders.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Orders;
}