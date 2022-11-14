import './ConstructorList.css';
import Card from '../UI/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';

const ConstructorList = (props) =>{
  const onClickCardHandler = (e) => {
    props.onClickConstructor(e);
  }

  return(
  <div className="Constructors">
    {props.Constructor_Data && props.Constructor_Data.map((constructor, i) => (
      <Card  className="Constructor-card" onClickCard={onClickCardHandler} driverInfo = {constructor}>
        <div className="Constructor-inner">
          <img className="Constructor-image" src={`images/constructors/${constructor.name}.png`}></img>
          <span className="Constructor-name">{constructor.name}</span>
        </div>
      </Card>
    ))}
  </div>
  );
}

export default ConstructorList;