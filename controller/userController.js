const User = require("../models/UserModel");
const generateToken = require("../utlis/generateToken");

// check administrator
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const authUserEmail = req.decoded.id;
  if (authUserEmail === email) {
    const result = await User.findOne({ email: email });
    if (result) {
      const isAdmin = result.role === "admin";
      res.json({ success: true, admin: isAdmin });
    } else {
      res.json({ success: false, result });
    }
  } else {
    res.status(403).json({ sucess: false, msg: "Forbidden access!!" });
  }
};

//  userRegistration
const userRegistration = async (req, res) => {
  const userData = req.body;
  const filter = { email: userData.email };
  const result = await User.findOneAndUpdate(filter, userData, {
    new: true,
    upsert: true,
  });
  if (result) {
    const token = generateToken(userData.email);
    res.status(200).json({ result, token });
  } else {
    res.status(401).res.json({ msg: "Internal user problem!" });
  }
};
module.exports = { userRegistration, getAdmin };
