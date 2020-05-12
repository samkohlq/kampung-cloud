import { body, validationResult } from "express-validator";

const feedbackValidationRules = () => {
  return [
    body("type").isIn([
      "Report harassment",
      "Report a scam",
      "Provide feedback",
      "Report a bug",
      "Ask a question",
    ]),
    body("details").isLength({ min: 1, max: 1800 }),
    body("contactInfo").isLength({ min: 1, max: 120 }),
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
  feedbackValidationRules,
  validate,
};
