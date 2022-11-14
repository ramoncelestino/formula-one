import './DriverInfo.css';
import DriverChart from './DriverChart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import ReactFrappeChart from "react-frappe-charts";


const DriverInfo = (props) =>{

    const [driverResults, setDriverResults] = useState([]);
    const [driverChampion, setDriverChampion] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    let driver_teams = [];
    let driver_champion_quantity = 0;
    let driver_champion_years = []
    let driver_races = 0;
    let driver_wins = 0;
    let driver_poles = 0;
    let driver_podiums = 0;

    useEffect(() => {
        axios.request({
          method: 'GET',
          url: `http://ergast.com/api/f1/drivers/${props.driver_data.driverId}/driverStandings/1.json`,
          params: {limit: 30},
        })
        .then((response) => setDriverChampion(response.data.MRData.StandingsTable.StandingsLists))
        .catch((error) => console.error(error));

        axios.request({
            method: 'GET',
            url: `http://ergast.com/api/f1/drivers/${props.driver_data.driverId}/results.json`,
            params: {limit: 500},
          })
          .then((response) => setDriverResults(response.data.MRData.RaceTable.Races))
          .catch((error) => console.error(error));
    }, [])
   
    const getDriverTotalWins = () => {
        driverResults.forEach(function(race) {
            if(race.Results[0].position === '1'){
                driver_wins = driver_wins + 1;
            }
        })
        return driver_wins;
    }

    const getDriverTotalPoles = () => {
        driverResults.forEach(function(race) {
            if(race.Results[0].grid === '1'){
                driver_poles = driver_poles + 1;
            }
        })
        return driver_poles;
    }

    const getDriverTotalRaces = () => {
        driver_races = driverResults.length
        return driver_races;
    }

    const getDriverTotalChampion = () => {
        driver_champion_quantity = driverChampion.length

        return driver_champion_quantity;
    }

    const getDriverChampionYears = () => {
        driverChampion.forEach(function(championshipYear) {
            driver_champion_years.push(championshipYear.season);
        })

        return driver_champion_years;
    }

    const getDriverTotalPodiums = () => {
        driverResults.forEach(function(race) {
            if(race.Results[0].position === '1'|| race.Results[0].position === '2' || race.Results[0].position === '3'){
                driver_podiums = driver_podiums + 1;
            }
        })
        return driver_podiums;
    }

    const getDriverTeams = () => {
        const aux = [];

        driverResults.forEach(function(race) {
            aux.push(race.Results[0].Constructor.name);
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
        <div className = 'painel-inner'>
            <div className='driver-section info-section row'>
                <div className='col-4 pilot-image-container'>
                    {/* <img className="pilot-image-info" src={props.driver_data.image}></img> */}
                    <img className="pilot-image-info" src={`images/drivers/${props.driver_data.givenName}-${props.driver_data.familyName}.jpg`}></img>
                </div> 
                <div className='col-8 pilot-informations'>
                    <div className='text-info'>Name: {props.driver_data.givenName} {props.driver_data.familyName}</div>
                    {props.driver_data.permanentNumber && <div className='text-info'>Number: {props.driver_data.permanentNumber}</div>}
                    <div className='text-info'>Birthdate: {formatDate(props.driver_data.dateOfBirth)}</div>
                    <div className='text-info'>
                    {/*  Country: {props.driver_data.country.code} - <img className='pilot-flag' src={`https://countryflagsapi.com/png/${props.driver_data.country.code}`}></img> */}
                    Nationality: {props.driver_data.nationality}
                    </div>
                    {getDriverTotalChampion() > 0 && <div className='text-info'>World championships: {getDriverTotalChampion()} ({getDriverChampionYears().join(', ')})</div>}
                    {getDriverTotalChampion() == 0 &&<div className='text-info'>World championships: {getDriverTotalChampion()}</div>}
                    <div className='text-info'>Grands prix entered: {getDriverTotalRaces()}</div>
                    <div className='text-info'>Podiums: {getDriverTotalPodiums()}</div>
                    <div className='text-info'>Poles: {getDriverTotalPoles()}</div>
                    <div className='text-info'>Wins: {getDriverTotalWins()}</div>
                    <div className='container pilot-teams'>
                        <p>Teams:</p> 
                        <div className='container pilot-teams-list-container'>
                            {getDriverTeams().join(' | ')}
                        {/*  {getDriverTeams().map(team => (<div className="pilot-team-image-div"> <img className="pilot-team-image" src={team}></img> </div>))} */}
                        </div>
                    </div>
                </div>
            </div>
            <DriverChart driver_results_data ={driverResults}/>
        </div>
    );
}

export default DriverInfo;