/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { socket } from '../../Auth/helper';
import TimerNav from '../Spectator/TimerNav';
import CharacterSelection from './CharacterSelection';
import SelectedCharacters from './SelectedCharacters';

const TeamName = styled.div`
  margin: 0 auto;
  width: 10px;
  height: 40px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
`;

const CharacterPanel = styled.div`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const ReadyCheck = styled.div`
  width: fit-content;
  background-color: white;
  padding: 8px 15px;
  margin: 20px auto;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: gray;
    color: white;
  }

  ${(props) => {
    if (props.ready) {
      return 'display: none;';
    }
  }}
`;

const checkTeam = (id) => {
  if (id === '00') return 'checkTeamA';
  if (id === '11') return 'checkTeamB';
};

const Team = () => {
  const [characters, setCharacters] = useState();
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('');
  const [timer, setTimer] = useState('');

  const { id, teamId } = useParams();

  useEffect(() => {
    axios.get('/characters')
      .then((result) => {
        axios.get(`/match/${id}`)
          .then((response) => {
            setMatch(response.data.match);
            const newChar = [...result.data.characters];
            for (let i = 0; i < response.data.match.bannedList.length; i++) {
              const idx = response.data.match.bannedList[i];
              newChar[idx].selected = true;
            }
            setCharacters(newChar);
          });
      });
  }, []);

  useEffect(() => {
    if (match && characters) {
      const newChar = [...characters];
      for (let i = 0; i < match.bannedList.length; i++) {
        const idx = match.bannedList[i];
        newChar[idx].selected = true;
      }
      setCharacters(newChar);
    }
  }, [match]);


  const checkCompleted = () => {
    const checkBanned = (match.bannedCharaters.teamA.length === 3) && (match.bannedCharaters.teamB.length === 3);
    const checkSelected = (match.selectedCharacters.teamA.length === 5) && (match.selectedCharacters.teamB.length === 5);
    if (checkBanned === true && checkSelected === true) {
      return true;
    }
  };

  const selectCharacter = () => {
    if (selected === '') return;
    socket.emit('select_character', { character: characters[selected], team_id: teamId, index: selected });
    const temp = [...characters];
    temp[selected].selected = true;
    setCharacters(temp);
    setSelected(''); 
  };

  const readyTeam = () => {
    socket.emit('readyCheck', teamId);
  };

  useEffect(() => {
    socket.emit('join', { match_id: id, team_id: teamId });

    socket.on('checkUpdate', match => setMatch(match));

    socket.on('timer_count', data => console.log(data));

    return () => {
      socket.off('checkUpdate', match => setMatch(match));
      socket.off('timer_count', data => setTimer(data.counter));
    };
  }, []);

  // console.log(timer);

  return (
    <>
      {/* <embed src="https://res.cloudinary.com/nakul-londhe/video/upload/v1614268054/ZenithWildRift/LEAGUE_OF_LEGENDS_WILD_RIFT_MUSIC_SOUNDTRACK_LOGIN_SCREEN_SONG_xs8sb3.mp3" loop autostart="true" width="2" height="0" /> */}
      <TimerNav
        completed={match && checkCompleted}
        match={match}
        bannedCharacters={match?.bannedCharaters}
      />
      <TeamName>
        {/* BoomBADAm
        <span
          style={{
            width: '100%'
          }}
        >
          {`${timer || ''} sec`}
        </span> */}
      </TeamName>

      <CharacterPanel>
        <SelectedCharacters characters={match?.selectedCharacters?.teamA} team="A" />
        <SelectedCharacters characters={match?.selectedCharacters?.teamB} team="B" />
      </CharacterPanel>

      <ReadyCheck onClick={readyTeam} ready={match ? match[checkTeam(teamId)] : 'Loading'}>
        {teamId === '00' ? `Ready Team ${match?.teamA.name}` : `Ready Team ${match?.teamB.name}`}
      </ReadyCheck>

      {/* Character Selection */}

      {match?.ready && (
        <CharacterSelection
          completed={match?.selectedCharacters.teamA.length === 5}
          selectable={match.turn === teamId}
          characters={characters}
          selectedId={selected}
          selectCharacter={selectCharacter}
          onSelect={setSelected}
        />
      )}

    </>
  );
};

export default Team;
