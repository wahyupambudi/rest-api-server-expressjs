let mysql = require("mysql");

let koneksi = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_pwbs_awonapakarya",
});

koneksi.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Koneksi ke Database Berhasil");
  }
});

module.exports = koneksi;
