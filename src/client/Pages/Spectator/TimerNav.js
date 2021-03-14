/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import './Styles/TimerNav.css';

const BannedCharacters = styled.div`
    width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: #505380;
  margin: 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
  font-weight: 500;
  color: white;
  background: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;

  ${(props) => {
    if (!props.noBg) {
      return 'box-shadow: 0px 10px 20px rgb(0,0,0,0.5);';
    }
  }}
`;

const TeamName = styled.div`
  height: 40px;
  width: auto;
  border-radius: 50px;
  padding: 0 50px;
  color: ${props => (props.template?.textColor ? props.template?.textColor : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;



${(props) => {
    if (props.team === 'A') {
      return `background-color:  ${props.template?.teamA ? props.template?.teamA : 'rgb(0, 161, 254, 1)'};`;
    } if (props.team === 'B') {
      return `background-color:  ${props.template?.teamB ? props.template?.teamB : 'rgb(254, 0, 94, 1)'};`;
    }
  }}


@media (max-width: 800px) {
    font-size: 0.8em;
    padding: 0 30px;
  }

`;

// ${props => {
//   if(props.team === "A") {
//     return "background-color: rgb(254, 0, 94, 0.5);"
//   } else {
//     return "background-color: rgb(0, 161, 254, 0.5);"
//   }
// }}
const TimerNav = ({
  match, bannedCharacters, completed, template
}) => {
  const isTemplate = () => {
    if (template.background && template.teamA && template.teamB) {
      return template;
    }
  };

  return (
    <header id="timer_nav">
      <main id="timer_central">

        <section className="timer_section">
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamA[0]?.avatar} />
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamA[1]?.avatar} />
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamA[2]?.avatar} />
        </section>

        {/* Timer */}
        <section className="timer_section">

          <TeamName team="A" template={template} turn={match?.turn} completed={completed}>{`Team ${match?.teamA?.name}`}</TeamName>
          <BannedCharacters noBg>V/S</BannedCharacters>
          <TeamName team="B" template={template} turn={match?.turn} completed={completed}>{`Team ${match?.teamB?.name}`}</TeamName>

        </section>
        {/* Timer */}

        <section className="timer_section">
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamB[2]?.avatar} />
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamB[1]?.avatar} />
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamB[0]?.avatar} />
        </section>

      </main>
    </header>
  );
};
export default TimerNav;
