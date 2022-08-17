import './DriverList.css';
import Card from '../UI/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';

const DriverList = (props) =>{
  const drivers_teams = [];

  const getDriverTeam = (index) => {
    if(props.Driver_Data){
      props.Driver_Data.forEach(function(drivers, i) {
        const driver_teams = [];
        drivers.teams.forEach(function(teams, j) {
          driver_teams.push(teams.team.name)
        })
        drivers_teams.push(Array.from(new Set(driver_teams)));
      })
    } 

    return drivers_teams[index];
  }

  const formatDate = (index) => {
    const [year, month, day] = index.split('-');
    const result = [day, month, year].join('/');

    return result;
  }

  return(
  <div className="drivers">
    {props.Driver_Data && props.Driver_Data.map((driver, i) => (
      <Card  className="pilot-card">
        <img className="pilot-image" src={driver.image}></img>
        <div className='container pilot-informations'>
          <div className='pilot-name'>Name: {driver.name}</div>
          <div className='pilot-birthdate'>Birthdate: {formatDate(driver.birthdate)}</div>
          <div className='pilot-number'>Number: {driver.number}</div>
          <div className='pilot-country'>
            Country: {driver.country.code} - <img className='pilot-flag' src={`https://countryflagsapi.com/png/${driver.country.code}`}></img>
          </div>
          <div className='container pilot-teams'>
            <p>Teams:</p> 
            <div className='container teams-list'> {getDriverTeam(i).map(team => (<div>{team}</div>))} </div>
          </div>
        </div>
      </Card>
    ))}
  </div>
  );
}

export default DriverList;