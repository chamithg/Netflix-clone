import React, { useState, useEffect } from "react";
import "./nav.css";

function Nav() {
  const [show, handleShow] = useState(false); // const show initial value is false, can be updated by changes of handle show.

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // this is adding event to run on the window scrolling(listen to the scroll).
      if (window.scrollY > 100) {
        // when window scrolled 100 px on y axix(scrollY) it changes show via handle show.
        handleShow(true);
      } else handleShow(false);
    });

    return () => {
      window.removeEventListener("scroll"); // this will stop the event listner functioning again
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      {/* if show is true, it will append nav_black as another className, now we can set the style to display nav bar on nav_black */}
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />
      <img
        className="avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Avatar"
      />
    </div>
  );
}

export default Nav;
