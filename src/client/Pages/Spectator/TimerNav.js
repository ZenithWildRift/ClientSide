/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import './Styles/TimerNav.css'

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

  ${props => {
    if(!props.noBg) {
      return "box-shadow: 0px 10px 20px rgb(0,0,0,0.5);"
    } 
  }}
`;

const TeamName = styled.div`
  height: 40px;
  width: 300px;
  border-radius: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;



${props => {
  if(props.team === "A"){
    if(props.turn === "00" || props.completed) {
      return "background-color: rgb(254, 0, 94, 0.9);"
    } else {
      return "background-color: rgb(254, 0, 94, 0.3);"
    }
  } else if(props.team === "B"){
    if(props.turn === "11" || props.completed) {
      return "background-color: rgb(0, 161, 254, 0.9);"
    } else {
      return "background-color: rgb(0, 161, 254, 0.3);"
    }
  }
}}


`;

// ${props => {
//   if(props.team === "A") {
//     return "background-color: rgb(254, 0, 94, 0.5);"
//   } else {
//     return "background-color: rgb(0, 161, 254, 0.5);"
//   }
// }}
const TimerNav = ({match, bannedCharacters, completed }) => {

  return (
    <header id="timer_nav">
      <main id="timer_central">

        <section className="timer_section">
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamA[0]?.avatar}/>
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamA[1]?.avatar}/>
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamA[2]?.avatar}/>
        </section>

        {/* Timer */}
        <section className="timer_section">

          <TeamName team="B" turn={match?.turn} completed={completed}>{`Team ${match?.teamA?.name}`}</TeamName>
          <BannedCharacters noBg={true} >V/S</BannedCharacters>
          <TeamName team="A" turn={match?.turn} completed={completed}>{`Team ${match?.teamB?.name}`}</TeamName>

        </section>
        {/* Timer */}

        <section className="timer_section">
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamB[2]?.avatar}/>
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamB[1]?.avatar}/>
          <BannedCharacters imageUrl={bannedCharacters && bannedCharacters.teamB[0]?.avatar}/>
        </section>

      </main>
    </header>
  );
}
 
export default TimerNav;