const prisma = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");
const tryCatch = require("../utils/tryCatch");

module.exports.register = tryCatch(async (req, res, next) => {
  //   let x = 5;
  //   if (x > 3) {
  //     throw new Error("err : x>3");
  //   }

  const { username, password, confirmPassword, email } = req.body;

  // รับ body {username, password, confirmPassword, email}
  // validation >> มีuser อยู่รึเปล่า/ input ถูกต้องไหม

  // if (!username || !password || !confirmPassword) {
  if (!(username && password && confirmPassword)) {
    return next(customError("Fill all Input", 400));
  }

  if (password !== confirmPassword) {
    // const error = new Error("Password not match");
    // error.statusCode = 400;
    // throw error;
    throw customError("check confirmPassword", 400);
  }
  const userExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (userExist) {
    throw customError("users already exists", 409);
  }

  // hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {
    username,
    password: hashedPassword,
    email,
  };

  // create user ใน prisma.user

  const rs = await prisma.user.create({
    data: data,
  });

  console.log(rs);
  res.json({ message: "Register successful" });
});

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //validation
    if (!(username && password)) {
      throw customError("Fill all Input", 400);
    }

    const targetUser = await prisma.user.findUnique({
      where: { username: username },
    });

    //find username in prisma.user
    if (!targetUser) {
      throw customError("Invalid login", 400);
    }
    //check password
    const pwOk = await bcrypt.compare(password, targetUser.password); // compare ---> true or false

    if (!pwOk) {
      throw customError("Invalid login", 400);
    }

    //create jwt-token
    //make payload = {id, username}
    // jwt.sign + {expiresIn: "7d"}
    // response jwt-token

    const payload = { id: targetUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);

    res.json({ message: "Login successful", token: token });
  } catch (error) {
    next(error);
  }
};

module.exports.me = (req, res) => {
  res.json({ message: "in getMe" });
};

// module.exports = { register, login };
