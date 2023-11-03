import React, { useState, useEffect }  from 'react'
import NotFound from './NotFound'
import { ethers } from 'ethers';
import { providers } from 'ethers';
import EventManager from '../contract/EventManager.json';
import AttendedEvent from './AttendedEvent';

const Registered = () => {

  const [data, setData] = useState([]);

  const contractAddress = '0xF9e887258c006222276005Dc741379cf9aCE9E05';
  const contractABI = EventManager.abi;
  const provider = new providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/mpxyHBRCqlXiWu1z20mwQxm_7-n3SmWN');
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contract.getEventsRegisteredByUser(localStorage.address);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='layout-eve'>
      <div className='head-1'>
        <div className='logo'>Add<span>n</span>Attend.</div>
        <div className='head-name' id='head-name'>
          {localStorage.address}
        </div>
        <div className='but-log'>
          <button className='but-out'>Logout</button>
        </div>
      </div>
      <div className="events">
        <div className="eve-head">
          Your Events.
        </div>
        {data.length === 0 ? (
          <NotFound />
        ) : (
          data.map((event, index) => (
            <AttendedEvent key={index} eventData={event} />
          ))
        )}
      </div>
    </div>
  )
}

export default Registered