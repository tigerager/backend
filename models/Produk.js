module.exports = (sequelize, DataTypes)=>{
    const Produk = sequelize.define("Produk",{  //nama tabel padas sequalize.define() harus sama dengan nama variabel const supaya tidak membingungkan saat mengatur configurasi di router.
        tipe_produk: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nama_produk: {
            type: DataTypes.STRING,
            allowNull: false
        },
        jumlah: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gambar: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Produk;
}