/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import './Styles/CharacterPanel.css';

const CharacterImage = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.5);
  background-color: #505380;




  ${(props) => {
    if (props.imageUrl && (props.imageUrl !== '')) {
      return `background: url(${props.imageUrl});`;
    }
  }}
  background-size: cover;
  background-position: center;

  ${(props) => {
    if (props.template) {
      return `background-color: ${props.template.selectionBox}`;
    }
  }}
`;

const SidePanel = styled.div`
    width: 10px;
  height: 80px;
  /* background-color: rgb(254,0,94,0.9); */

  ${(props) => {

    if (props.position === 'left') {
      if (props.template?.teamA) {
        return `background-color: ${props.template.teamA}`;
      }
      return 'background-color: rgb(0,161,254,1)';
    }
    if (props.position === 'right') {
      if (props.template?.teamB) {
        return `background-color: ${props.template.teamB}`;
      }
      return 'background-color: rgb(254,0,94,0.9)';
    }

  }}

`;

const CharacterPanel = ({ position, characters, template }) => (
  <main className="character_container">
    <div className="character_holder">
      {position === 'left' && <SidePanel position="left" template={template} />}
      <CharacterImage template={template} imageUrl={characters && characters[0]?.landscape} alt="" />
      {position === 'right' && <SidePanel position="right" template={template} />}
    </div>
    <div className="character_holder">
      {position === 'left' && <SidePanel position="left" template={template} />}
      <CharacterImage template={template} imageUrl={characters && characters[1]?.landscape} alt="" />
      {position === 'right' && <SidePanel position="right" template={template} />}
    </div>
    <div className="character_holder">
      {position === 'left' && <SidePanel position="left" template={template} />}
      <CharacterImage template={template} imageUrl={characters && characters[2]?.landscape} alt="" />
      {position === 'right' && <SidePanel position="right" template={template} />}
    </div>
    <div className="character_holder">
      {position === 'left' && <SidePanel position="left" template={template} />}
      <CharacterImage template={template} imageUrl={characters && characters[3]?.landscape} alt="" />
      {position === 'right' && <SidePanel position="right" template={template} />}
    </div>
    <div className="character_holder">
      {position === 'left' && <SidePanel position="left" template={template} />}
      <CharacterImage template={template} imageUrl={characters && characters[4]?.landscape} alt="" />
      {position === 'right' && <SidePanel position="right" template={template} />}
    </div>
  </main>
);

export default CharacterPanel;
