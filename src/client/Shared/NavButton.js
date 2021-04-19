import styled from 'styled-components';

const NavButton = styled.button`
    cursor: pointer;
  background-color: white;
  outline: none;
  font-weight:600;
  border-style: none;
  border-radius: 5px;
  padding: 8px 15px;
  margin-left: 10px;
  transition: 0.2s;
  
  &:hover {
    background-color: gray;
    color: white;
  }

  ${(props) => {
    if (props.border) return 'border: 2px solid gray';
    return null;
  }}
  
`;

export default NavButton;
