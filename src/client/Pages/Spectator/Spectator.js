import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import GrayBox from '../../Shared/GrayBox';
import { socket } from '../../Auth/helper';
import CharacterPanel from './CharacterPanel';
import './Styles/Spectator.css';
import TimerNav from './TimerNav';

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
  };

  useEffect(() => {
    axios.get(`/match/${id}`)
      .then((response) => {
        setMatch(response.data.match);
      });
  }, []);

  if (match) {
    if (match.ready) {
      console.log('bheja');
      socket.emit('start_timer');
    }
  }

  useEffect(() => {
    socket.emit('join', {match_id: id, team_id : teamId});

    socket.on('checkUpdate', match => setMatch(match));

    socket.on('timer_count', (data) => {
      console.log(data);
    });

    return () => {
      socket.off('checkUpdate', match => setMatch(match));
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
            {/* <h3>TIME</h3>
            <h4>25 seconds</h4> */}
          </div>

          {/* Team Roaster */}
          <section className="roaster_section">
            <div className="team_roaster">
              <img src={match?.teamA.image} alt="" />
            </div>
            <GrayBox>VS</GrayBox>
            <div className="team_roaster">
              <img src={match?.teamB.image} alt="" />
            </div>
          </section>

          <div className="organisation_logo">
            <img src="https://cdn.discordapp.com/attachments/813809372614361088/816153158820036638/image0.png" alt="" />
          </div>

        </div>

        <CharacterPanel characters={match?.selectedCharacters?.teamB} position="right" />
      </main>
      {/* Spectator Page Main Section */}
    </Container>
  );
};

// #232434
 
export default Spectator;