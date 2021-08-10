// @ts-nocheck
import React, { useEffect } from "react";
import BackToTop from "img/toTop.png";
import $ from "jquery";

import "./Topper.css";

export const Topper = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 400) {
      $(".btn_top").addClass("ativo");
    } else {
      $(".btn_top").removeClass("ativo");
    }
  });

  return (
    <div>
      <button className="btn_top" onClick={() => scrollTop()}>
        <img src={BackToTop} alt="" />
      </button>
    </div>
  );
};
