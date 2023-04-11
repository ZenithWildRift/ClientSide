/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 70%;
  min-height: 500px;
  background-color: #505380;
  margin: 50px auto;
  border-radius: 5px;
  padding: 20px;
  padding-bottom: 20px;
`;

const Header = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Search = styled.input`
  width: 200px;
  height: 20px;
  font-weight: 700;
  font-size: 1.1em;
  padding: 8px 8px;
  border-radius: 5px;
  border-style: none;
  outline : none;
  color: white;
  background-color: rgb(255,255,255, 0.4);
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: red;
  }
  ::-ms-input-placeholder { /* Microsoft Edge */
    color: red;
  }
`;

const SelectPanel = styled.div`
  height: 100%;
  display: flex;
  align-items:center;
`;

const SelectedCharacter = styled.div`
  color: white;
  font-weight: 500;
  font-size: 1.2em;
  margin-right: 20px;
`;

const SelectButton = styled.button`
  padding: 8px 15px;
  width: 100px;
  background-color: rgb(255,255,255, 0.4);
  border-radius: 5px;
  border-style: none;
  outline: none;
  font-weight: 200;
  font-size: 1.1em;
  cursor: pointer;
  transition: 0.2s;
  color: white;
  &:hover {
    background-color: gray;
    color: white;
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: red;
  }
  ::-ms-input-placeholder { /* Microsoft Edge */
    color: red;
  }
`;

const Turn = styled.div`
  font-size: 20px;
  color: white;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Character = styled.div`
  width: 50px;
  height: 70px;
  margin: 20px;
  text-align: -webkit-right;
`;

const Image = styled.img`
  cursor: pointer;
  width: 70px;
  height: 70px;
  border-radius: 50%;

  ${(props) => {
    if (props.selected === true) {
      return 'opacity: 0.4';
    }
    return null;
  }}

`;

const Name = styled.div`
  color: white;
  width: 100%;
  font-size: 15px;
  margin: 5px auto;
`;

const CharacterSelection = ({
  characters, completed, selectedId, onSelect, selectable, selectCharacter
}) => (
  <Container>
    <Header>
      <Search placeholder="Search" />
      {!completed && (
      <Turn>
        {selectable ? 'Pick a character' : 'Opponent is chosing a character'}
      </Turn>
      )}


      {selectable && (
        <SelectPanel>
          <SelectedCharacter>{characters && characters[selectedId] && `Selected : ${characters[selectedId]?.name}`}</SelectedCharacter>
          <SelectButton onClick={selectCharacter}>Select</SelectButton>
        </SelectPanel>
      )}

    </Header>

    <Body>

      {characters && characters.map((character, index) => (
        <Character key={character.id}>
          <Image
            selected={character?.selected}
            src={character.avatar}
            onClick={() => {
              if (character.selected) return;
              if (selectedId === index) {
                onSelect('');
                return;
              }
              onSelect(index);
            }}
            IsSelected={selectedId === index}
            alt="Name"
          />
          <Name>{character.name}</Name>
        </Character>
      ))}


    </Body>

  </Container>
);

export default CharacterSelection;
