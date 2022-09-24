import './DriverChart.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import {Line} from "react-chartjs-2";
import {Doughnut} from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


const DriverChart = (props) =>{
    const [data, setData] = useState({});

     const UserData = [
        {
          id: 1,
          year: 2012,
          points: 281,
          position: 1,
          wins: 5,
          team: 'Red Bull Racing',
        },
        {
          id: 2,
          year: 2013,
          points: 397,
          position: 1,
          wins: 13,
          team: 'Red Bull Racing',
        },
        {
          id: 3,
          year: 2014,
          points: 167,
          position: 5,
          wins: 0,
          team: 'Red Bull Racing',
        },
        {
          id: 4,
          year: 2015,
          points: 278,
          position: 3,
          wins: 3,
          team: 'Scuderia Ferrari',
        },
        {
          id: 5,
          year: 2016,
          points: 212,
          position: 4,
          wins: 0,
          team: 'Scuderia Ferrari',
        },
        {
          id: 6,
          year: 2017,
          points: 317,
          position: 2,
          wins: 5,
          team: 'Scuderia Ferrari',
        },
        {
          id: 7,
          year: 2018,
          points: 320,
          position: 2,
          wins: 5,
          team: 'Scuderia Ferrari',
        },
        {
          id: 8,
          year: 2019,
          points: 240,
          position: 5,
          wins: 1,
          team: 'Scuderia Ferrari',
        },
        {
          id: 9,
          year: 2020,
          points: 33,
          position: 13,
          wins: 0,
          team: 'Scuderia Ferrari',
        },
        {
          id: 10,
          year: 2021,
          points: 43,
          position: 12,
          wins: 0,
          team: 'Aston Martin F1 Team',
        },
      ];

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Points per season",
            data: UserData.map((data) => data.points),
            backgroundColor: [
              "#fff",
            ],
            fill: false,
            borderColor: '#850000',
            tension: 0.01,
          },
          {
            label: "Wins per season",
            data: UserData.map((data) => data.wins),
            backgroundColor: [
              "#fff",
            ],
            fill: false,
            borderColor: '#2ECC71',
            tension: 0.01,
          }
        ],
      }); 

      const [userData2, setUserData2] = useState({
        labels: [
          'Red Bull Racing',
          'Scuderia Ferrari',
          'Aston Martin F1 Team'
        ],
        datasets: [{
          label: 'Races',
          data: [113  , 118 , 30],
          backgroundColor: [
            '#800080',
            '#ed1c24',
            '#1cac78'
          ],
          borderColor: 'transparent',
          hoverOffset: 10
        }]
      });


    return(
      <div className='row'>
        <div className = 'chart col-8'>
            <Line data={userData}/>
        </div>
        <div className = 'chart col-4'>
          <Doughnut data={userData2}/>
        </div>
      </div>
    );
}

export default DriverChart;