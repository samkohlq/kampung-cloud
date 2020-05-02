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
      .then(async (decodedToken) => {
        const newUser = await User.create({
          userName: req.body.userName,
          authUid: req.body.authUid,
          email: req.body.email,
          phoneNum: req.body.phoneNum,
          verificationStatus: 0,
        }).catch((error) => {
          console.log(error);
        });
        res.send(newUser);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(401);
      });
  } else {
    res.sendStatus(401);
  }
};

export const retrieveUserInfo = async (req, res) => {
  let idToken = req.headers["authorization"];

  if (req.query.requestForUserConfidentialInfo === "true") {
    if (idToken) {
      if (idToken.startsWith("Bearer ")) {
        idToken = idToken.slice(7, idToken.length);
      }
      admin
        .auth()
        .verifyIdToken(idToken)
        .then(async (decodedToken) => {
          const retrievedUser = await User.findOne({
            where: { authUid: req.query.authUid },
          }).catch((error) => {
            console.log(error);
          });
          res.send(retrievedUser);
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(401);
        });
    } else {
      res.sendStatus(401);
    }
  } else {
    const retrievedUserInfo = await User.findOne({
      where: { authUid: req.query.authUid },
      attributes: ["userName", "verificationStatus", "authUid"],
    }).catch((error) => {
      console.log(error);
    });
    res.send(retrievedUserInfo);
  }
};

export const updateUserPhoneNum = async (req, res) => {
  let idToken = req.headers["authorization"];

  if (idToken) {
    if (idToken.startsWith("Bearer ")) {
      idToken = idToken.slice(7, idToken.length);
    }
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(async (decodedToken) => {
        const updatedPhoneNum = await User.update(
          {
            phoneNum: req.body.phoneNum,
          },
          { where: { authUid: req.query.authUid } }
        );
        res.send(updatedPhoneNum);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(401);
      });
  } else {
    res.sendStatus(401);
  }
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
