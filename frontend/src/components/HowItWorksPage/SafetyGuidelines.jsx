import React from "react";

class SafetyGuidelines2 extends React.Component {
  render() {
    return (
      <p className="text-left mt-5">
        <h5 className="mb-3">
          That being said, here are some safety guidelines we recommend:
        </h5>
        <ul>
          <li className="my-3">
            Call the person making the request to check that it is not a scam.
          </li>
          <li className="my-3">
            Arrange for requests to be left at the front door for a contactless
            pick-up, if possible.
          </li>
          <li className="my-3">Otherwise, arrange to meet at a common area.</li>
          <li className="my-3">
            Do not let a stranger into your house or enter a stranger's house.
          </li>
          <li className="my-3">
            Wear a mask if you are out and maintain a safe distance.
          </li>
        </ul>
      </p>
    );
  }
}

export default SafetyGuidelines2;
