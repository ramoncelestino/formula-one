import './TeamList.css';
import Card from '../UI/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';

const TeamsList = (props) =>{
  const onClickCardHandler = (e) => {
    props.onClickTeam(e);
  }

  return(
  <div className="teams">
    {props.Teams_Data && props.Teams_Data.map((team, i) => (
      <Card  className="team-card" onClickCard={onClickCardHandler} driverInfo = {team}>
        <div className="team-inner">
          <img className="team-image" src={team.logo}></img>
          <span className="team-name">{team.name}</span>
        </div>
      </Card>
    ))}
  </div>
  );
}

export default TeamsList;