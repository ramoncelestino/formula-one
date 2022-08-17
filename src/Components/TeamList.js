import './DriverList.css';
import Card from '../UI/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';

const TeamsList = (props) =>{
  return(
  <div className="drivers">
    {props.Team_Data && props.Team_Data.map((team, i) => (
      <Card  className="pilot-card">
        <img className="pilot-image" src={team.logo}></img>
        <div className='container pilot-informations'>
          <div className='pilot-name'>Name: {team.name}</div>
          <div className='pilot-name'>Debut: {team.first_team_entry}</div>
          <div className='pilot-name'>President: {team.president}</div>
          <div className='pilot-name'>Director: {team.director}</div>
          <div className='pilot-name'>Engine: {team.engine}</div>
          <div className='pilot-name'>Constructor titles: {team.world_championships}</div>
        </div>
      </Card>
    ))}
  </div>
  );
}

export default TeamsList;