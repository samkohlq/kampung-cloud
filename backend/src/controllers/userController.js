import { User } from "../db/models";

export const createUser = async (req, res) => {
  const newUser = await Promise.all([
    User.create({
      userName: req.body.userName,
      authUid: req.body.authUid,
      email: req.body.email,
      phoneNum: req.body.phoneNum,
      verificationStatus: 0,
    }),
  ]).catch((error) => {
    console.log(error);
  });
  res.send(newUser);
};

export const retrieveUserInfo = async (req, res) => {
  const retrievedUser = await User.findOne({
    where: { authUid: req.query.authUid },
  }).catch((error) => {
    console.log(error);
  });
  res.send(retrievedUser);
};

export const deleteUser = async (req, res) => {
  const deleteUserSuccess = await User.destroy({
    where: { id: req.query.userId },
  });
  if (deleteUserSuccess) {
    res.send("User successfully deleted");
  }
};

export const verifyUser = async (req, res) => {
  const verifiedUser = await User.update(
    {
      verificationStatus: 1,
    },
    {
      where: { authUid: req.body.authUid },
    }
  );
  res.send(verifiedUser);
};

export const removeUserVerificationStatus = async (req, res) => {
  const updatedUser = await User.update(
    {
      verificationStatus: 0,
    },
    {
      where: { authUid: req.query.authUid },
    }
  );
  res.send(updatedUser);
};

export const updateUserInfo = async (req, res) => {
  const updatedUser = await User.update(
    {
      userName: req.body.userName,
      email: req.body.email,
      phoneNum: req.body.phoneNum,
    },
    { where: { authUid: req.query.authUid } }
  );
  res.send(updatedUser);
};
