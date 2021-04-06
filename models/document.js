module.exports = (sequelize, DataTypes) => {
    const document = sequelize.define("document", {
        numeroDocument: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idCreateur: {
            type: DataTypes.INTEGER
        },
        typeDocument: {
            type: DataTypes.STRING
        },
        titre: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING

        },
        promotion: {
            type: DataTypes.STRING,

        },
        semestre: {
            type: DataTypes.STRING,

        },
        description: {
            type: DataTypes.STRING,

        }
    });
    return document;
};
