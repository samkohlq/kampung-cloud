import React from "react";

class SafetyGuidelines2 extends React.Component {
  render() {
    return (
      <>
        <div className="my-3  subsection-header">Keeping this Kampung safe</div>
        <p>
          Your safety is important to us. We are making calls to verify requests
          coming in but we simply can't vet every single request. All we can do
          is trust that everybody is here out of the goodness of their hearts,
          and won't take advantage of each other.
        </p>
        <p className="text-left my-5">
          <h5 className="mb-3">
            That being said, here are some safety guidelines we recommend:
          </h5>
          <ul>
            <li className="my-3">
              Call the person making the request to check that it is not a scam.
            </li>
            <li className="my-3">Do not offer help if in doubt.</li>
            <li className="my-3">
              Arrange for requests to be left at the front door for a
              contactless pick-up, if possible.
            </li>
            <li className="my-3">
              Otherwise, arrange to meet at a common area.
            </li>
            <li className="my-3">
              Do not let a stranger into your house or enter a stranger's house.
            </li>
            <li className="my-3">
              Wear a mask if you are out and maintain a safe distance.
            </li>
          </ul>
          <p className="my-5">
            If you experience any harassment or find anything suspicious, please
            let us know. We want to create a safe space for those in need and
            abusive behavior will not be tolerated.
          </p>
        </p>
      </>
    );
  }
}

export default SafetyGuidelines2;
