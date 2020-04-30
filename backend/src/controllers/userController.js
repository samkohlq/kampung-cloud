import { User } from "../db/models";
import admin from "../firebase";

export const createUser = async (req, res) => {
  let idToken = req.headers["authorization"];

  if (idToken) {
    if (idToken.startsWith("Bearer ")) {
      idToken = idToken.slice(7, idToken.length);
    }
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(async function (decodedToken) {
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
      })
      .catch(function (error) {
        console.log("did it fail here?");
        console.log(error);
        res.sendStatus(401);
      });
  } else {
    console.log("or did it fail here at the second one?");
    res.sendStatus(401);
  }
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
