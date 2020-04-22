import { User } from "../db/models";

export const createUser = async (req, res) => {
  const newUser = await Promise.all([
    User.create({
      userName: req.body.userName,
      authUid: req.body.authUid,
      email: req.body.email,
      phoneNum: req.body.phoneNum,
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(newUser);
};
