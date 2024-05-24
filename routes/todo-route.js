const express = require("express");
const router = express();

router.get("/", (req, res, next) => {
  console.log("in todoRoute get / ");
  console.log(req.user);
  res.json({ message: `Hello, ${req.user.username}` });
});
router.post("/", (req, res) => {});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});
router.get("/all-status", (req, res) => {});

module.exports = router;
