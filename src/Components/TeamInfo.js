import './TeamInfo.css';
import DriverChart from './DriverChart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import ReactFrappeChart from "react-frappe-charts";


const TeamInfo = (props) =>{

    return(
        <div className = 'painel-inner row'>
            <div className='container col-4 team-image-container'>
                <img className="team-image-info" src={props.team_data.logo}></img>
            </div> 
            <div className='container col-8 team-informations'>
                <div className='text-info'>Name: {props.team_data.name}</div>
                <div className='text-info'>Base: {props.team_data.base}</div>
                <div className='text-info'>Director: {props.team_data.director}</div>
                <div className='text-info'>First appearance: {props.team_data.first_team_entry}</div>
                <div className='text-info'>World championships: {props.team_data.world_championships}</div>
                { props.team_data.highest_race_finish.position == '1'  ? <div className='text-info'>Wins: {props.team_data.highest_race_finish.number}</div> : <div className='text-info'>Wins: 0</div>}
                <div className='text-info'>Pole positions: {props.team_data.pole_positions}</div>
                <div className='text-info'>Fastest laps: {props.team_data.fastest_laps}</div>
                <div className='text-info'>Chassis: {props.team_data.chassis}</div>
                <div className='text-info'>Engine: {props.team_data.engine}</div>
            </div> 
            <div className='container col-12'>
                {/* <DriverChart driver_id={props.driver_data.id}/> */}
            </div>
        </div>
    );
}

export default TeamInfo;