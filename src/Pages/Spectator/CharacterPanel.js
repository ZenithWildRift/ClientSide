import React from "react";
import "./Styles/CharacterPanel.css";
import zenith from '../../Assets/zenith.jpg';

const CharacterPanel = ({ position }) => {
  return (
    <main className="character_container">
      <div className="character_holder">
        {position === "left" && <div className="character_sidePanel sidepanel_left" />}
        <img className="character_image" src={zenith} alt="" />
        {position === "right" && <div className="character_sidePanel sidepanel_right" />}
      </div>
      <div className="character_holder">
        {position === "left" && <div className="character_sidePanel sidepanel_left" />}
        <img className="character_image" src={zenith} alt="" />
        {position === "right" && <div className="character_sidePanel sidepanel_right" />}
      </div>
      <div className="character_holder">
        {position === "left" && <div className="character_sidePanel sidepanel_left" />}
        <img className="character_image" src={zenith} alt="" />
        {position === "right" && <div className="character_sidePanel sidepanel_right" />}
      </div>
      <div className="character_holder">
        {position === "left" && <div className="character_sidePanel sidepanel_left" />}
        <img className="character_image" src={zenith} alt="" />
        {position === "right" && <div className="character_sidePanel sidepanel_right" />}
      </div>
      <div className="character_holder">
        {position === "left" && <div className="character_sidePanel sidepanel_left" />}
        <img className="character_image" src={zenith} alt="" />
        {position === "right" && <div className="character_sidePanel sidepanel_right" />}
      </div>
    </main>
  );
};

export default CharacterPanel;
