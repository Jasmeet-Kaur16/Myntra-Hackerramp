const { Foryou, Trends, Combined } = require("../models/ML");

// const foryou = async (req, res) => {
//   const { phonenumber, password } = req.body; // Make sure req.body is parsed

//   try {
//     const result = await Foryou(phonenumber);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };
// const trends = async (req, res) => {
//   try {
//     const result = await Trends();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
// };

const combined = async (req, res) => {
  const { phonenumber } = req.body;

  try {
    const result = await Combined(phonenumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  // foryou,
  // trends,
  combined,
};
