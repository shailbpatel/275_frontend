import React from "react";
import Video1 from "../Utils/Videos/video.mp4";
import "./styles.css";

const LandingPage = () => {
  return (
    <div className="main">
      {/* <div className="">
        Simplify your office reservation needs with WIORS - the perfect solution
        for employers and employees alike
      </div> */}
      <div>
        <p class="slide-up">
          <span class="green">Hello there</span>,
        </p>
      </div>
      <div>
        <p class="slide-up">
          book your workspace with ease - <i>WIORS</i> has got you covered
        </p>
      </div>

      <div>
        <video className="video" src={Video1} autoPlay loop muted></video>
      </div>
    </div>
  );
};

export default LandingPage;
