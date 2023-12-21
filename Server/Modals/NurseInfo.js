const db = require("../config/db");

exports.insertNurseData = async (name, LicenseNumber, dob, age) => {
  console.log("name, LicenseNumber, dob, age", name, LicenseNumber, dob, age);
  return new Promise((resolve) => {
    db.query(
      "INSERT INTO `nurseinfo`(`Name`, `LicenseNumber`, `DOB`, `Age`) VALUES (?,?,?,?)",
      [name, LicenseNumber, dob, age],
      function (err, results) {
        if (err) {
          resolve({ error: err });
        } else {
          resolve({ results: results });
        }
      }
    );
  });
};
exports.updateNurseData = async (name, LicenseNumber, dob, age, id) => {
  console.log("name, LicenseNumber, dob, age", name, LicenseNumber, dob, age);
  return new Promise((resolve) => {
    db.query(
      "UPDATE `nurseinfo` SET `Name`=?, `LicenseNumber`=?, `DOB`=?, `Age`=? WHERE `NurseID`=?",
      [name, LicenseNumber, dob, age, id],
      function (err, results) {
        if (err) {
          resolve({ error: err });
        } else {
          resolve({ results: results });
        }
      }
    );
  });
};
exports.deleteData = async (id) => {
  return new Promise((resolve) => {
    db.query(
      "DELETE FROM `nurseinfo` WHERE `NurseID`=?",
      [id],
      function (err, results) {
        if (err) {
          resolve({ error: err });
        } else {
          resolve({ results: results });
        }
      }
    );
  });
};

exports.listNurseData = async () => {
  return new Promise((resolve) => {
    db.query("SELECT * FROM `nurseinfo`", function (err, results) {
      if (err) {
        resolve({ error: err });
      } else {
        resolve({ results: results });
      }
    });
  });
};
