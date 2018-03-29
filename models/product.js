module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: {
            type: DataTypes.STRING,
            notNull: true,
            unique: true,
        },  
        productDescription: {
            type: DataTypes.TEXT,
            notNull: true,
        },
        productPrice: {
            type: DataTypes.DECIMAL(10,2),
            notNull: true,
        },
        productPurchasePrice: {
            type: DataTypes.DECIMAL(10,2),
            notNull: true,
        },
        productImage: {
            type: DataTypes.TEXT,
            notNull: true,
        },
        activeStatus: {
            type: DataTypes.BOOLEAN,
            notNull: true,
        }
    });

    return Product;
}