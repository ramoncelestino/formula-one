import './DriverInfo.css';
import DriverChart from './DriverChart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import ReactFrappeChart from "react-frappe-charts";


const DriverInfo = (props) =>{
    
    let driver_teams = [];

    const getDriverTeams = () => {
        const aux = [];
        props.driver_data.teams.forEach(function(teams) {
            /* aux.push(teams.team.name); */
            aux.push(teams.team.logo);
        })
        driver_teams = Array.from(new Set(aux)); 

        return driver_teams;
    }

    const formatDate = (index) => {
        const [year, month, day] = index.split('-');
        const result = [day, month, year].join('/');

        return result;
    }

    return(
        <div className = 'painel-inner row'>
            <div className='container col-4 pilot-image-container'>
                <img className="pilot-image-info" src={props.driver_data.image}></img>
            </div> 
            <div className='container col-8 pilot-informations'>
                <div className='text-info'>Name: {props.driver_data.name}</div>
                <div className='text-info'>Number: {props.driver_data.number}</div>
                <div className='text-info'>Birthdate: {formatDate(props.driver_data.birthdate)}</div>
                <div className='text-info'>
                    Country: {props.driver_data.country.code} - <img className='pilot-flag' src={`https://countryflagsapi.com/png/${props.driver_data.country.code}`}></img>
                </div>
                <div className='text-info'>World championships: {props.driver_data.world_championships}</div>
                <div className='text-info'>Grands prix entered: {props.driver_data.grands_prix_entered}</div>
                <div className='text-info'>Podiums: {props.driver_data.podiums}</div>
                { props.driver_data.highest_race_finish.position == '1'  ? <div className='text-info'>Wins: {props.driver_data.highest_race_finish.number}</div> : <div className='text-info'>Wins: 0</div>}
                <div className='container pilot-teams'>
                    <p>Teams:</p> 
                    <div className='container pilot-teams-list-container'>
                        {getDriverTeams().map(team => (<div className="pilot-team-image-div"> <img className="pilot-team-image" src={team}></img> </div>))}
                    </div>
                </div>
            </div> 
            <div className='container charts'>
                <DriverChart driver_id={props.driver_data.id}/>
            </div>
        </div>
    );
}

export default DriverInfo;