const {
  insertNurseData,
  listNurseData,
  updateNurseData,
  deleteData,
} = require("../Modals/NurseInfo");

exports.NurseData = {
  add_nurse_data: async (req, res) => {
    try {
      var { name, LicenseNumber, dob, age } = req.body;
      console.log("req.body", req.body);
      const addData = await insertNurseData(name, LicenseNumber, dob, age);
      console.log("addData", addData);
      if (addData?.results?.length == 0) {
        res.status(200).json({
          success: false,
          message: "Can't able to add the data",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Success",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  update_nurse_data: async (req, res) => {
    try {
      var { name, LicenseNumber, dob, age, id } = req.body;
      const update_data = await updateNurseData(
        name,
        LicenseNumber,
        dob,
        age,
        id
      );
      if (update_data?.results?.length == 0) {
        res.status(200).json({
          success: false,
          message: "Not able to update your data",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Success",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  delete_data: async (req, res) => {
    try {
      var { id } = req.body;
      const update_data = await deleteData(id);
      if (update_data?.results?.length == 0) {
        res.status(200).json({
          success: false,
          message: "Not able to deleted your data",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Success",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  list_data: async (req, res) => {
    try {
      const listData = await listNurseData();
      if (listData?.results?.length == 0) {
        res.status(200).json({
          success: false,
          message: "Can't able to list",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Success",
          data: listData?.results,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  },
};
