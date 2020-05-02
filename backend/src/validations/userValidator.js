import { body, validationResult } from "express-validator";

const phoneNumValidationRules = () => {
  return [
    //  phoneNum must be number with length of 8
    body("phoneNum").isNumeric(),
    body("phoneNum").isLength({ min: 8 }),
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
  phoneNumValidationRules,
  validate,
};
