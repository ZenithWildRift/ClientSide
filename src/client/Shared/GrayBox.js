import React from 'react';

const styles = {
  width: '40px',
  height: '40px',
  backgroundColor: '#505380',
  margin: '0px 10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  borderRadius: '5px'
}

/*
  @Component
  For Header and Body
*/

const GrayBox = ({children, className}) => {
  return ( 
    <div style={styles} className={className ? className: ''}>
      {children}
    </div>
   );
}
 
export default GrayBox;