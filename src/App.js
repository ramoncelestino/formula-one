import './App.css';
import Modal from 'react-bootstrap/Modal';
import DriverList from './Components/DriverList';
import ConstructorList from './Components/ConstructorList';
import DriverInfo from './Components/DriverInfo';
import ConstructorInfo from './Components/ConstructorInfo';
import Panel from './UI/Panel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';

function App() {
  const [searchType, setSearchType] = useState('drivers');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const [driverInfo, setDriverInfo] = useState({});
  const [constructorInfo, setConstructorInfo] = useState({});
  const [cardClick, setCardClick] = useState(false);
  const [inputFilled, setInputFilled] = useState('');
  const [search, setSearch] = useState();

  const handleClosePanel = () => {
    setCardClick(false);
  }

  const handleShowPanel = () => {
    setCardClick(true);
  }

  const handleSearch = () => {
    setSearch(Math.random());
  }

  const handleSearchType = (e) => {
    setSearchType(e.target.value)
    setFilteredData()
    setData([]);
  }

  const onClickDriverHandler = (e) => {
    setDriverInfo(e);
    handleShowPanel();
  }

  const onClickConstructorHandler = (e) => {
    setConstructorInfo(e);
    handleShowPanel();
  }

  const inputFilledFilter = (totalList) => {
    const filteredList = [];

    totalList.forEach(function(data) {
      if(searchType == 'drivers'){
        if(data.givenName.toUpperCase().startsWith(inputFilled.toUpperCase()) || data.familyName.toUpperCase().startsWith(inputFilled.toUpperCase())){
          filteredList.push(data);
        }
      }else{
        if(data.name.toUpperCase().startsWith(inputFilled.toUpperCase())){
          filteredList.push(data);
        }
      } 
    })

    setFilteredData(filteredList);
  }

  useEffect(() => {
    axios.request({
      method: 'GET',
      url: `http://ergast.com/api/f1/${searchType}.json`,
      params: {limit: 1000},
    })
    .then(searchType == 'drivers' ? (response) => setData(response.data.MRData.DriverTable.Drivers) : (response) => setData(response.data.MRData.ConstructorTable.Constructors))
    .catch((error) => console.error(error));

  }, [searchType])

  useEffect(() => {
    inputFilledFilter(data);
  }, [search])

  console.log(filteredData)

  return (
    <div className="App">
      <select name="search-type" onChange={handleSearchType}>
        <option value="drivers">drivers</option>
        <option value="constructors">constructors</option>
      </select>
      <div className='filter'>
        <input onChange={(e) => setInputFilled(e.target.value)}></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchType === 'drivers' && filteredData !== undefined && <DriverList Drivers_Data= {filteredData} onClickDriver = {onClickDriverHandler} />}
      {searchType === 'constructors' && filteredData !== undefined && <ConstructorList Constructor_Data= {filteredData} onClickConstructor = {onClickConstructorHandler}/>}
      <Modal show={cardClick} onHide={handleClosePanel} backdrop="static" keyboard={false} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Infomations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {searchType === 'drivers' && <DriverInfo driver_data = {driverInfo}/>}
          {searchType === 'constructors' && <ConstructorInfo Constructor_data = {constructorInfo}/>}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
