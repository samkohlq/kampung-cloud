import { Request } from "../db/models";

export const createRequest = async (req, res) => {
  const newRequest = await Request.create({
    title: req.body.title,
    type: req.body.type,
    details: req.body.details,
    deadline: req.body.deadline,
    declaration: req.body.declaration,
    requestorUid: req.body.requestorUid,
    status: 0,
  }).catch((error) => {
    console.log(error);
  });
  res.send(newRequest);
};

export const retrieveRequests = async (req, res) => {
  let retrievedRequests;
  if (req.query.type == "All") {
    retrievedRequests = await Request.findAll({
      order: [
        ["status", "ASC"],
        ["deadline", "ASC"],
      ],
    }).catch((error) => {
      console.log(error);
    });
  } else {
    retrievedRequests = await Request.findAll({
      where: { type: req.query.type },
      order: [
        ["status", "ASC"],
        ["deadline", "ASC"],
      ],
    }).catch((error) => {
      console.log(error);
    });
  }
  res.send(retrievedRequests);
};

export const retrieveAssignedRequests = async (req, res) => {
  const retrievedRequests = await Request.findAll({
    where: { fulfillerUid: req.query.loggedInUserUid },
    order: [
      ["status", "ASC"],
      ["deadline", "ASC"],
    ],
  }).catch((error) => {
    console.log(error);
  });
  res.send(retrievedRequests);
};

export const retrievePostedRequests = async (req, res) => {
  const retrievedRequests = await Request.findAll({
    where: { requestorUid: req.query.loggedInUserUid },
    order: [
      ["status", "ASC"],
      ["deadline", "ASC"],
    ],
  }).catch((error) => {
    console.log(error);
  });
  res.send(retrievedRequests);
};

export const countRequestsByStatus = async (req, res) => {
  const numOfCompletedRequests = await Request.count({
    where: { status: 2 },
  }).catch((error) => {
    console.log(error);
  });
  const numOfOutstandingRequests = await Request.count({
    where: { status: 0 },
  }).catch((error) => {
    console.log(error);
  });
  res.send({
    completedRequests: numOfCompletedRequests,
    outstandingRequests: numOfOutstandingRequests,
  });
};

export const retrieveRequest = async (req, res) => {
  const retrievedRequest = await Request.findOne({
    where: { id: req.query.requestId },
  }).catch((error) => {
    console.log(error);
  });
  res.send(retrievedRequest);
};

export const deleteRequest = async (req, res) => {
  const deleteRequestSuccess = await Request.destroy({
    where: { id: req.query.requestId },
  });
  if (deleteRequestSuccess) {
    res.send("Request successfully deleted");
  }
};

export const assignRequestToFulfiller = async (req, res) => {
  const assignedRequest = await Request.update(
    {
      fulfillerUid: req.body.loggedInUserUid,
      status: 1,
    },
    {
      where: { id: req.query.requestId },
    }
  );
  res.send(assignedRequest);
};

export const removeFulfillerFromRequest = async (req, res) => {
  const updatedRequest = await Request.update(
    {
      fulfillerUid: null,
      status: 0,
    },
    {
      where: { id: req.query.requestId },
    }
  );
  res.send(updatedRequest);
};

export const markRequestCompleted = async (req, res) => {
  const completedRequest = await Request.update(
    {
      status: 2,
    },
    {
      where: { id: req.query.requestId },
    }
  );
  res.send(completedRequest);
};

export const updateRequest = async (req, res) => {
  const updatedRequest = await Request.update(
    {
      title: req.body.title,
      type: req.body.type,
      details: req.body.details,
      deadline: req.body.deadline,
    },
    {
      where: { id: req.query.requestId },
    }
  );
  res.send(updatedRequest);
};
