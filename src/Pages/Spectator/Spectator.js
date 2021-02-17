import React, { Fragment } from 'react';
import GrayBox from '../../Shared/GrayBox';
import CharacterPanel from './CharacterPanel';
import "./Styles/Spectator.css";
import TimerNav from './TimerNav';

const Spectator = () => {
  return ( 
    <Fragment>
      <TimerNav />
      
      {/* Spectator Page Main Section */}

      <main className="spectator_main">
        <CharacterPanel position="left" />

        <div className="spectator_centre">
          
          {/* Timer */}
          <div className="spectator_centre_timer">
            <h3>TIME</h3>
            <h4>25 seconds</h4>
          </div>

          {/* Team Roaster */}
          <section className="roaster_section">
            <div className="team_roaster"></div>
            <GrayBox>VS</GrayBox>
            <div className="team_roaster"></div>
          </section>

          <div className="organisation_logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" alt="" />
          </div>

        </div>

        <CharacterPanel position="right" />
      </main>
      {/* Spectator Page Main Section */}
    </Fragment>
   );
}

// #232434
 
export default Spectator;