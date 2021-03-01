import io from 'socket.io-client';

const SOCKET_URL = 'https://zenithwildrift.herokuapp.com';

export const socket = io(SOCKET_URL);

export const checkCompleted = (match) => {
  let checkBanned = (match.bannedCharaters.teamA.length === 3) && (match.bannedCharaters.teamB.length === 3);
  let checkSelected = (match.selectedCharacters.teamA.length === 5) && (match.selectedCharacters.teamB.length === 5);
  if(checkBanned === true && checkSelected === true) {
    return true;
  }
}

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
}

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  }
  return false;
};

