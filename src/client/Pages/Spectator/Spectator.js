/* eslint-disable no-unused-vars */
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
  const [timer, setTimer] = useState(false);
  const [initiate, setInitiate] = useState(false);
  const { id, teamId } = useParams();

  const checkCompleted = () => {
    const checkBanned = match.bannedCharaters.teamA.length === 3
      && match.bannedCharaters.teamB.length === 3;
    const checkSelected = match.selectedCharacters.teamA.length === 5
      && match.selectedCharacters.teamB.length === 5;
    if (checkBanned === true && checkSelected === true) {
      return true;
    }
    return null;
  };

  useEffect(() => {
    axios.get(`/match/${id}`).then((response) => {
      const res = response.data.match;
      if (res.ready) {
        setInitiate(true);
      }
      setMatch(res);
    });
  }, []);

  // if (match) {
  //   if (match.ready) {
  //     console.log('bheja');
  //     socket.emit('start_timer');
  //   }
  // }
  useEffect(() => {
    if (match && match.ready) {
      if (!initiate) {
        socket.emit('start_timer');
        setInitiate(true);
      }
    }
  }, [match]);

  useEffect(() => {

    socket.emit('join', { match_id: id, team_id: teamId });

    socket.on('checkUpdate', data => setMatch(data));

    socket.on('timer_count', (data) => {
      console.log(data);
    });

    return () => {
      socket.off('checkUpdate', data => setMatch(data));
    };
  }, []);

  const changeBG = () => {
    if (match?.template) {
      document.body.style.backgroundColor = match?.template?.background;
    }
    if (match?.template?.backgroundImage !== '') {
      document.body.style.backgroundImage = `url(${match?.template?.backgroundImage})`;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        // background: `${
        //   match?.template?.background ? match?.template?.background : ''
        // }`,
      }}
    >
      {changeBG()}
      <Container>
        <TimerNav
          template={match?.template}
          completed={match && checkCompleted}
          match={match}
          bannedCharacters={match?.bannedCharaters}
        />

        {/* Spectator Page Main Section */}

        <main className="spectator_main">
          <CharacterPanel
            template={match?.template}
            characters={match?.selectedCharacters?.teamA}
            position="left"
          />

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
              <GrayBox template={match?.template}>VS</GrayBox>
              <div className="team_roaster">
                <img src={match?.teamB.image} alt="" />
              </div>
            </section>

            <div className="organisation_logo">
              <img
                src={
                  match?.organisation.image
                  || 'https://cdn.discordapp.com/attachments/813809372614361088/816153158820036638/image0.png'
                }
                alt=""
              />
            </div>
          </div>

          <CharacterPanel
            template={match?.template}
            characters={match?.selectedCharacters?.teamB}
            position="right"
          />
        </main>
        {/* Spectator Page Main Section */}
      </Container>
    </div>
  );
};

// #232434

export default Spectator;
