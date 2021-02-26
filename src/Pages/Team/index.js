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
  width: fit-content;
  padding: 10px 20px;
  background-color: white;
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

  ${props => {
    if(props.ready) {
      return 'display: none;'
    }
  }}
`;

const checkTeam = (id) => {
  if(id === "00") return "checkTeamA";
  if(id === "11") return "checkTeamB";
}

const Team = () => {
  const [characters, setCharacters] = useState();
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [selected, setSelected] = useState('');

  const { id, teamId} = useParams();

  useEffect(() => {
    axios.get("/characters")
    .then(response => {
      setCharacters(response.data.characters);
    });
    axios.get(`/match/${id}`)
    .then(response => {
      setMatch(response.data.match);
    });
  }, []);

  const checkCompleted = () => {
    let checkBanned = (match.bannedCharaters.teamA.length === 3) && (match.bannedCharaters.teamB.length === 3);
    let checkSelected = (match.selectedCharacters.teamA.length === 5) && (match.selectedCharacters.teamB.length === 5);
    if(checkBanned === true && checkSelected === true) {
      return true;
    }
  }


  // useEffect(() => {
    
  //   if(reload) setReload(false);
  // }, [reload])

  // socket && socket.emit("join", {match_id: id, team_id : teamId});
  // socket && socket.off("checkUpdate", match => setMatch(match)).on("checkUpdate", match => setMatch(match));
  
  const selectCharacter = () => {
    socket.emit('select_character', { character: characters[selected], team_id: teamId});
  }
  
  const readyTeam = () => {
    socket.emit("readyCheck", teamId);
  }

  console.log(match);

  useEffect(()=> {
    socket.emit("join", {match_id: id, team_id : teamId});

    socket.on("checkUpdate", match => setMatch(match));

    return () => {
      socket.off("checkUpdate", match => setMatch(match))
   };
  }, [])

  return ( 
    <>
        {/* <embed src="https://res.cloudinary.com/nakul-londhe/video/upload/v1614268054/ZenithWildRift/LEAGUE_OF_LEGENDS_WILD_RIFT_MUSIC_SOUNDTRACK_LOGIN_SCREEN_SONG_xs8sb3.mp3" loop autostart="true" width="2" height="0" /> */}
      <TimerNav 
        completed={match && checkCompleted}
        match={match}
        bannedCharacters={match?.bannedCharaters}
      />
      <TeamName>
        BoomBADAm
        <span
          style={{
            width: "100%"
          }}
        >
          25sec
        </span>
      </TeamName>

      <CharacterPanel>
          <SelectedCharacters characters={match?.selectedCharacters?.teamA} team="A"/>
          <SelectedCharacters characters={match?.selectedCharacters?.teamB} team="B" />
      </CharacterPanel>
        
      
      <ReadyCheck onClick={readyTeam} ready={match ? match[checkTeam(teamId)] : 'Loading'}>
          {teamId === "00" ? `Ready Team ${match?.teamA.name}` : `Ready Team ${match?.teamB.name}`}
      </ReadyCheck>

      {/* Character Selection */}
          
      {match?.ready && (
        <CharacterSelection
          selectable={match.turn === teamId}
          characters={characters}
          selectedId={selected}
          selectCharacter={selectCharacter}
          onSelect={setSelected}
        />
      )}

    </>
   );
}
 
export default Team;