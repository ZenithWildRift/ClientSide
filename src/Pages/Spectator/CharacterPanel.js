import React from "react";
import styled from "styled-components";
import "./Styles/CharacterPanel.css";

const CharacterImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.5);
  background-color: #505380;
  ${props => {
    if(props.imageUrl) {
      return `background: url(${props.imageUrl});`
    }
  }}
  background-size: cover;
  background-position: center;
`;

const CharacterPanel = ({ position, characters }) => {
  return (
    <main className="character_container">
      <div className="character_holder">
        {position === "left" && <div className="character_sidePanel sidepanel_left" />}
        <CharacterImage imageUrl={characters && characters[0]?.landscape} alt="" />
        {position === "right" && <div className="character_sidePanel sidepanel_right" />}
      </div>
      <div className="character_holder">
        {position === "left" && <div className="character_sidePanel sidepanel_left" />}
        <CharacterImage imageUrl={characters && characters[1]?.landscape} alt="" />
        {position === "right" && <div className="character_sidePanel sidepanel_right" />}
      </div>
      <div className="character_holder">
        {position === "left" && <div className="character_sidePanel sidepanel_left" />}
        <CharacterImage imageUrl={characters && characters[2]?.landscape} alt="" />
        {position === "right" && <div className="character_sidePanel sidepanel_right" />}
      </div>
      <div className="character_holder">
        {position === "left" && <div className="character_sidePanel sidepanel_left" />}
        <CharacterImage imageUrl={characters && characters[3]?.landscape} alt="" />
        {position === "right" && <div className="character_sidePanel sidepanel_right" />}
      </div>
      <div className="character_holder">
        {position === "left" && <div className="character_sidePanel sidepanel_left" />}
        <CharacterImage imageUrl={characters && characters[4]?.landscape} alt="" />
        {position === "right" && <div className="character_sidePanel sidepanel_right" />}
      </div>
    </main>
  );
};

export default CharacterPanel;
