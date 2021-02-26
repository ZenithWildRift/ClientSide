import io from 'socket.io-client';
const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL);

export const checkCompleted = (match) => {
  let checkBanned = (match.bannedCharaters.teamA.length === 3) && (match.bannedCharaters.teamB.length === 3);
  let checkSelected = (match.selectedCharacters.teamA.length === 5) && (match.selectedCharacters.teamB.length === 5);
  if(checkBanned === true && checkSelected === true) {
    return true;
  }
}