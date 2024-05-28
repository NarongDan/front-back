const express = require("express");
const { getTodoByUser } = require("../controllers/todo-controller");
const router = express();

router.get("/", getTodoByUser);
router.post("/", (req, res) => {});
router.put("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});
router.get("/all-status", (req, res) => {});

module.exports = router;
