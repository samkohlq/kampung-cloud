import React from "react";
import NavBar from "../NavBar/NavBar";
import IntroSubSection from "./IntroSubSection";
import PostsList from "./PostsList";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  render() {
    return (
      <>
        <NavBar />
        <IntroSubSection />
        <PostsList />
      </>
    );
  }
}

export default Homepage;
