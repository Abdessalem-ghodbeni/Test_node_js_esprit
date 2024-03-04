export const validateRankEmploye = async (req, res, next) => {
  const rank = req.body.Rank;
  if (![1, 2, 3].includes(rank)) {
    return res.status(400).json({
      success: false,
      message: "le champ rank doit etres dans [1..3]",
    });
  }
  next();
};
