import React, { Fragment, useEffect, useState } from 'react';
import GrayBox from '../../Shared/GrayBox';
import { socket } from '../../Auth/helper';
import CharacterPanel from './CharacterPanel';
import "./Styles/Spectator.css";
import TimerNav from './TimerNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;


const Spectator = () => {
  const [match, setMatch] = useState();
  const { id, teamId} = useParams();

  const checkCompleted = () => {
    let checkBanned = (match.bannedCharaters.teamA.length === 3) && (match.bannedCharaters.teamB.length === 3);
    let checkSelected = (match.selectedCharacters.teamA.length === 5) && (match.selectedCharacters.teamB.length === 5);
    if(checkBanned === true && checkSelected === true) {
      return true;
    }
  }

  useEffect(() => {
    axios.get(`/match/${id}`)
    .then(response => {
      setMatch(response.data.match);
    });
  }, []);
  
  useEffect(()=> {
    socket.emit("join", {match_id: id, team_id : teamId});

    socket.on("checkUpdate", match => setMatch(match));

    return () => {
      socket.off("checkUpdate", match => setMatch(match))
   };
  }, []);

  return ( 
    <Container>
      <TimerNav
        completed={match && checkCompleted}
        match={match}
        bannedCharacters={match?.bannedCharaters}
      />
      
      {/* Spectator Page Main Section */}

      <main className="spectator_main">
        <CharacterPanel characters={match?.selectedCharacters?.teamA} position="left"/>

        <div className="spectator_centre">
          
          {/* Timer */}
          <div className="spectator_centre_timer">
            <h3>TIME</h3>
            <h4>25 seconds</h4>
          </div>

          {/* Team Roaster */}
          <section className="roaster_section">
            <div className="team_roaster"></div>
            <GrayBox>VS</GrayBox>
            <div className="team_roaster"></div>
          </section>

          <div className="organisation_logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" alt="" />
          </div>

        </div>

        <CharacterPanel characters={match?.selectedCharacters?.teamB} position="right" />
      </main>
      {/* Spectator Page Main Section */}
    </Container>
   );
}

// #232434
 
export default Spectator;