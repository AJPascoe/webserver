const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.status(404).json({"msg": "not found"});
});

module.exports = router;