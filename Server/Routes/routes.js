const express = require("express");
const { NurseData } = require("../Controller/NurseCtrl");
const router = express.Router();

router.post("/api/add_data", NurseData.add_nurse_data);
router.get("/api/list_data", NurseData.list_data);
router.post("/api/update_data", NurseData.update_nurse_data);
router.post("/api/delete_data", NurseData.delete_data);

module.exports = router;
