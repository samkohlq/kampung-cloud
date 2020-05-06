import { body, validationResult } from "express-validator";

const postValidationRules = () => {
  return [
    body("requestDeadline").isISO8601(),
    body("requestType").isIn([
      "Meals",
      "Groceries",
      "Clothing",
      "Hygiene",
      "Cash",
      "Tech",
      "Other",
    ]),
    body("request").isLength({ min: 1, max: 120 }),
    body("requestDetails").isLength({ min: 1, max: 1800 }),
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
  postValidationRules,
  validate,
};
