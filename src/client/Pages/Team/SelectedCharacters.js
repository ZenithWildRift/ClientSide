import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  
`;

const glowRed = keyframes`
  from {
    box-shadow: 0;
-webkit-box-shadow: 0;
-moz-box-shadow: 0;
  }

  to {
    box-shadow: 0px 0px 18px 14px rgba(254,0,94,0.72) inset;
-webkit-box-shadow: 0px 0px 18px 14px rgba(254,0,94,0.72) inset;
-moz-box-shadow: 0px 0px 18px 14px rgba(254,0,94,0.72) inset;
  }
`;
const glowBlue = keyframes`
  from {
    box-shadow: 0;
-webkit-box-shadow: 0;
-moz-box-shadow: 0;
  }

  to {
    box-shadow: 0px 0px 18px 14px rgba(0,161,254,0.72) inset;
-webkit-box-shadow: 0px 0px 18px 14px rgba(0,161,254,0.72) inset;
-moz-box-shadow: 0px 0px 18px 14px rgba(0,161,254,0.72) inset;
  }
`;

const Character = styled.div`
  width: 100%;
  height: 200px;
  background-color: #505380;
  margin: 10px 10px;



  border-radius: 5px;

  ${(props) => {
    if (props.imageUrl && props.imageUrl !== '') return `background: url(${props.imageUrl});`
  }}
  
  ${props => {
    if(props.team === "A") {
      return "box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.5);"
    } else {
      return "box-shadow: 0px 10px 20px rgb(0, 0, 0, 0.5);"
    }
  }}

  background-size: cover;
  background-position: center;

`;

// ${props => {
//   if(props.team === "A") {
//     return "box-shadow: 0px 0px 5px rgb(254, 0, 94);"
//   } else {
//     return "box-shadow: 0px 0px 5px rgb(0, 161, 254);"
//   }
// }}
  /* ${props => {
    if(props.team === "A") return "  border-bottom: 5px solid #FE005E";
    else if(props.team === "B") return "  border-bottom: 5px solid #00A1FE"
  }} */

  /* animation: ${props => props.team === "A" ? glowRed : glowBlue} 0.5s linear infinite;
  animation-direction: alternate; */

const SelectedCharacters = ({team, characters}) => {

  console.log(characters ? characters[0] : '')
  return ( 
    <Container>
      {characters && team === "A" && (
        <>
        <Character team={team} imageUrl={characters[0]?.portrait}/>
        <Character team={team} imageUrl={characters[1]?.portrait}/>
        <Character team={team} imageUrl={characters[2]?.portrait}/>
        <Character team={team} imageUrl={characters[3]?.portrait}/>
        <Character team={team} imageUrl={characters[4]?.portrait}/>
        </>
      )}
      {characters && team === "B" && (
        <>
        <Character team={team} imageUrl={characters[4]?.portrait}/>
        <Character team={team} imageUrl={characters[3]?.portrait}/>
        <Character team={team} imageUrl={characters[2]?.portrait}/>
        <Character team={team} imageUrl={characters[1]?.portrait}/>
        <Character team={team} imageUrl={characters[0]?.portrait}/>
        </>
      )}

    </Container>
   );
}
 
export default SelectedCharacters;