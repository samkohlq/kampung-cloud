import { Feedback } from "../db/models";

export const createFeedback = async (req, res) => {
  const newFeedback = await Feedback.create({
    type: req.body.type,
    details: req.body.details,
    contactInfo: req.body.contactInfo,
  }).catch((error) => {
    console.log(error);
  });
  res.send(newFeedback);
};
