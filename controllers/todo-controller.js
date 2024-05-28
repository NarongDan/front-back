const prisma = require("../models/index");
const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");

module.exports.getTodoByUser = tryCatch(async (req, res, next) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.user.id,
    },
  });
  res.status(200).json({ todos: todos });
});
