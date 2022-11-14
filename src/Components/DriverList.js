import './DriverList.css';
import Card from '../UI/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';

const DriverList = (props) =>{
  
  const onClickCardHandler = (e) => {
    props.onClickDriver(e);
  }

  return(
  <div className="drivers container">
    {props.Drivers_Data.map((driver, i) => (
      <Card  className="pilot-card" onClickCard={onClickCardHandler} driverInfo = {driver}>
        <div className="card-inner">
          {/* <img className="pilot-image" src={driver.image}></img> */}
          <img className="pilot-image" src={`images/drivers/${driver.givenName}-${driver.familyName}.jpg`}></img>
          <span className="pilot-name">{driver.givenName} {driver.familyName}</span>
        </div>
      </Card>
    ))}
  </div>
  );
}

export default DriverList;