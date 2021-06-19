import React, { useEffect } from "react";
import "./Loading.css";
import $ from "jquery";

const LoadingScreen = () => {
  useEffect(() => {
    $("#loading-screen .loading-bar").delay(500).fadeOut("slow");
    $("#loading-screen").delay(500).fadeOut("slow");
  }, []);
  return (
    <div>
      <div id="loading-screen">
        <div className="loading-animation">
          <div className="loading-bar" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;