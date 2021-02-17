import React from 'react';
import './Styles/TimerNav.css'

const TimerNav = () => {
  return (
    <header id="timer_nav">
      <main id="timer_central">

        <section className="timer_section">
          <div className="ban_characters" />
          <div className="ban_characters" />
          <div className="ban_characters" />
        </section>

        {/* Timer */}
        <section className="timer_section">

          <div className="nav_team_name team_A">Team Blue</div>
          <div className="ban_characters">V/S</div>
          <div className="nav_team_name team_B">Team Blue</div>

        </section>
        {/* Timer */}

        <section className="timer_section">
        <div className="ban_characters" />
          <div className="ban_characters" />
          <div className="ban_characters" />
        </section>

      </main>
    </header>
  );
}
 
export default TimerNav;