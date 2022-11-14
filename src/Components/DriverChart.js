import './DriverChart.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import {Line} from "react-chartjs-2";
import {Doughnut} from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


const DriverChart = (props) => { 
  const [searchTypeChart1, setSearchTypeChart1] = useState('All Seasons');
  const [searchTypeChart2, setSearchTypeChart2] = useState('races');
  let infoPerSeasonChart = [];
  let infoConstructorChart = [];
  

  const driverSeasonList = () =>{
    let seasons = [];

    props.driver_results_data.forEach(function(race) {
      seasons.push(race.season);
    });

    seasons = Array.from(new Set(seasons));
    
    return seasons; 
  }

  const driverConstructorsList = () =>{
    let constructors = [];

    props.driver_results_data.forEach(function(race) {
      constructors.push(race.Results[0].Constructor.name);
    });

    constructors = Array.from(new Set(constructors));
    
    return constructors; 
  }

  const infoPerSeasonList = () =>{
    let seasons = driverSeasonList();
    let infoPerSeasonChartAux = [];

    seasons.forEach(function(season, index) {
      let races_per_season = props.driver_results_data.filter(function(obj) { return obj.season === season;});
      let driver_wins = 0;
      let driver_points = 0;
      let driver_poles = 0;
      let driver_podiums = 0;
      let constructors2 = [];

      races_per_season.forEach(function(race){
        constructors2.push(race.Results[0].Constructor.name);

        if(race.Results[0].position === '1'){
          driver_wins = driver_wins + 1;
        }

        if(race.Results[0].grid === '1'){
          driver_poles = driver_poles + 1;
        }

        if(race.Results[0].position === '1' || race.Results[0].position === '2' || race.Results[0].position === '3'){
          driver_podiums = driver_podiums + 1;
        }

        driver_points = driver_points + parseInt(race.Results[0].points);
      });

      constructors2 = Array.from(new Set(constructors2))

      infoPerSeasonChartAux.push({
        id: index,
        year: season,
        points: driver_points,
        wins: driver_wins,
        poles: driver_poles,
        podiums: driver_podiums,
        constructor: constructors2
      });
    });

    return infoPerSeasonChartAux;
  }

  const dataChartGeneration= (seasonChart) =>{
    if(seasonChart === 'All Seasons'){
      let constructors = driverConstructorsList();
      infoPerSeasonChart = infoPerSeasonList();

      constructors.forEach(function(constructor, index){
        let races_per_constructor = props.driver_results_data.filter(function(obj) { return obj.Results[0].Constructor.name === constructor;});
        let wins_per_constructor = races_per_constructor.filter(function(obj) { return obj.Results[0].position === '1';});
        let poles_per_constructor = races_per_constructor.filter(function(obj) { return obj.Results[0].grid === '1';});
        let podiums_per_constructor = 0;
        let points_per_constructor = 0;

        races_per_constructor.forEach(race => {
          points_per_constructor = points_per_constructor + parseInt(race.Results[0].points);

          if(race.Results[0].position === '1' || race.Results[0].position === '2' || race.Results[0].position === '3'){
            podiums_per_constructor = podiums_per_constructor + 1;
          }
        });

        infoConstructorChart.push({
          id: index,
          constructor: constructor,
          races: races_per_constructor.length,
          wins: wins_per_constructor.length,
          poles: poles_per_constructor.length,
          podiums: podiums_per_constructor,
          points: points_per_constructor
        });
      });
    }else{
      let races_per_season = props.driver_results_data.filter(function(obj) { return obj.season === seasonChart;});
      let constructors = driverConstructorsList();

      races_per_season.forEach(function(race, index){
        infoPerSeasonChart.push({
          id: index,
          year: race.season,
          race_name: race.raceName,
          country: race.Circuit.Location.country,
          constry_flag: `https://countryflagsapi.com/png/${race.Circuit.Location.country}`,
          points: race.Results[0].points,
          grid: race.Results[0].grid,
          position: race.Results[0].position,
        });
      });

      constructors.forEach(function(constructor, index){
        let races_per_constructor = props.driver_results_data.filter(function(obj) { return obj.Results[0].Constructor.name === constructor;});
        let wins_per_constructor = races_per_constructor.filter(function(obj) { return obj.Results[0].position === '1';});
        let poles_per_constructor = races_per_constructor.filter(function(obj) { return obj.Results[0].grid === '1';});
        let podiums_per_constructor = 0;
        let points_per_constructor = 0;

        races_per_constructor.forEach(race => {
          points_per_constructor = points_per_constructor + parseInt(race.Results[0].points);

          if(race.Results[0].position === '1' || race.Results[0].position === '2' || race.Results[0].position === '3'){
            podiums_per_constructor = podiums_per_constructor + 1;
          }
        });

        infoConstructorChart.push({
          id: index,
          constructor: constructor,
          races: races_per_constructor.length,
          wins: wins_per_constructor.length,
          poles: poles_per_constructor.length,
          podiums: podiums_per_constructor,
          points: points_per_constructor
        });
      });
    } 
  }

  dataChartGeneration(searchTypeChart1);

  const handleSearchTypeChart1 = (e) => {
    setSearchTypeChart1(e.target.value)
    dataChartGeneration(searchTypeChart1);
    infoPerSeasonChart = [];
  }

  const handleSearchTypeChart2 = (e) => {
    setSearchTypeChart2(e.target.value)
  }
  

  let chart1Data ={};
  let chart1Options = {}

  if(searchTypeChart1 === 'All Seasons'){
    chart1Data = {
      labels: infoPerSeasonChart.map((data) => data.year),
      datasets: [
        {
          label: "Points per season",
          data: infoPerSeasonChart.map((data) => data.points),
          backgroundColor: [
            "#1E90FF",
          ],
          fill: false,
          borderColor: '#1E90FF',
          tension: 0.01,
        },
        {
          label: "Wins per season",
          data: infoPerSeasonChart.map((data) => data.wins),
          backgroundColor: [
            "#2ECC71",
          ],
          fill: false,
          borderColor: '#2ECC71',
          tension: 0.01,
        },
        {
          label: "Poles per season",
          data: infoPerSeasonChart.map((data) => data.poles),
          backgroundColor: [
            "#E67E22",
          ],
          fill: false,
          borderColor: '#E67E22',
          tension: 0.01,
        },
        {
          label: "Podiums per season",
          data: infoPerSeasonChart.map((data) => data.podiums),
          backgroundColor: [
            "#9B59B6",
          ],
          fill: false,
          borderColor: '#9B59B6',
          tension: 0.01,
        }
      ]
    }

    chart1Options = {
      plugins: {
        legend: {
          labels: {
            color: "#fff",
            font: {
              size: 10
            }
          },
          position: 'bottom'
        },
        /* title: {
            display: true,
            text: 'WINS AND POINTS PER SEASON',
            color: "#fff",
            font: {
              size: 12
            }
        } */
      },
      scales: {
        y: {
          ticks: {
            color: "#fff",
            font: {
              size: 10,
            },
          },
          grid: {
            color: '#5A5A5A'
          }
        },
        x: { 
          ticks: {
            color: "#fff",
            font: {
              size: 10 
            }
          },
          grid: {
            color: '#5A5A5A'
          }
        }
      }
    }
  }else{
    chart1Data = {
      labels: infoPerSeasonChart.map((data) => data.country),
      datasets: [
        {
          label: "Position",
          data: infoPerSeasonChart.map((data) => data.position),
          backgroundColor: [
            "#6A5ACD",
          ],
          fill: false,
          borderColor: '#6A5ACD',
          tension: 0.01,
        },
        {
          label: "Grid",
          data: infoPerSeasonChart.map((data) => data.grid),
          backgroundColor: [
            "#2ECC71",
          ],
          fill: false,
          borderColor: '#2ECC71',
          tension: 0.01,
        }
      ]
    }

    chart1Options = {
      plugins: {
        legend: {
          labels: {
            color: "#fff",
            font: {
              size: 10
            }
          },
          position: 'bottom'
        },
        /* title: {
            display: true,
            text: `POSITION AND GRID PER RACE IN ${searchTypeChart1}`,
            color: "#fff",
            font: {
              size: 12
            }
        } */
      },
      scales: {
        y: {
          min: 1,
          reverse: true,
          ticks: {
            color: "#fff",
            font: {
              size: 10,
            }
          },
          grid: {
            color: '#5A5A5A'
          }
        },
        x: { 
          ticks: {
            color: "#fff",
            font: {
              size: 10 
            },
          },
          grid: {
            color: '#5A5A5A'
          }
        }
      }
    }
  }
  
  
 
  const chart2Data = {
    labels: infoConstructorChart.map((data) => data.constructor),
    datasets: [{
      label: 'Races',
      data: infoConstructorChart.map((data) => data[searchTypeChart2]),
      backgroundColor: [
        '#800080',
        '#ed1c24',
        '#1cac78',
        '#1E90FF',
        '#FFFF00',
      ],
      borderColor: 'transparent',
      hoverOffset: 10
    }]
  };

  const chart2Options = {
    plugins: {
      legend: {
        labels: {
          color: "#fff",
          font: {
            size: 10
          }
        },
        position: 'bottom'
      },
      /* title: {
          display: true,
          text: 'RACES PER CONSTRUCTOR',
          color: "#fff",
          font: {
            size: 12
          }
      } */
    }
  }
 
  return(
    <div className='row charts'>
      <div className='driver-section row'>
        <div className='driver-section-header'>
          <select className='search-type-chart' name="search-type-chart1" onChange={handleSearchTypeChart1}>
            <option value="All Seasons">All Seasons</option>)
            {driverSeasonList().reverse().map((data) => <option value={data}>{data}</option>)}
          </select>
          <p className='title-driver-section'>PER SEASON</p>
        </div>
        <div className='driver-section-body row'>
          <div className = 'chart col-10'>
            {infoPerSeasonChart.length !== 0 && <Line data={chart1Data} options={chart1Options}/>}
          </div>
          {searchTypeChart1 !== "All Seasons" &&
          <div className='chart-data col-2'>
            <div className='text-info'>Points: {(infoPerSeasonList().filter(function(obj) { return obj.year === searchTypeChart1}))[0].points}</div>
            <div className='text-info'>Poles: {(infoPerSeasonList().filter(function(obj) { return obj.year === searchTypeChart1}))[0].poles}</div>
            <div className='text-info'>Wins: {(infoPerSeasonList().filter(function(obj) { return obj.year === searchTypeChart1}))[0].wins}</div>
            <div className='text-info'>Podiums: {(infoPerSeasonList().filter(function(obj) { return obj.year === searchTypeChart1}))[0].podiums}</div>
            <div className='text-info'>Team: {(infoPerSeasonList().filter(function(obj) { return obj.year === searchTypeChart1}))[0].constructor.join(', ')}</div>
          </div>
          }
        </div>
      </div>
      <div className='driver-section row'>
        <div className='driver-section-header'>
          <select className='search-type-chart' name="search-type-chart2" onChange={handleSearchTypeChart2}>
            <option value='races'>races</option>
            <option value='wins'>wins</option>
            <option value='poles'>poles</option>
            <option value='podiums'>podiums</option>
            <option value='points'>points</option>
          </select>
          <p className='title-driver-section'>PER CONSTRUCTOR</p>
        </div>
        <div className='driver-section-body row'>
          <div className = 'chart col-5'>
            {infoConstructorChart.length !== 0 && <Doughnut data={chart2Data} options={chart2Options}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

 export default DriverChart;