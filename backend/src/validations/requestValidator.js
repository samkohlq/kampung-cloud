import { body, validationResult } from "express-validator";

const requestValidationRules = () => {
  return [
    body("title").isLength({ min: 1, max: 120 }),
    body("type").isIn([
      "Meals",
      "Groceries",
      "Clothing",
      "Hygiene",
      "Cash",
      "Tech",
      "Other",
    ]),
    body("details").isLength({ min: 1, max: 1800 }),
    body("deadline").isISO8601(),
    body("declaration").equals("true"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  requestValidationRules,
  validate,
};
