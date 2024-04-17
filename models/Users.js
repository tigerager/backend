module.exports = (sequelize, DataTypes)=>{
    const Users = sequelize.define("Users",{  //nama tabel pada sequalize.define() harus sama dengan nama variabel const supaya tidak membingungkan saat mengatur configurasi di router.
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Users;
}