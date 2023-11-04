import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import EachEvent from './EachEvent';
import { ethers } from 'ethers';
import EventManager from '../contract/EventManager.json';

const Event = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const contractAddress = '0x5Fd559d0c2B387e9F6b48EA3E13282DA931ffb9a';
  const contractABI = EventManager.abi;

  useEffect(() => {
    // Ensure the user has MetaMask installed and connected
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          setUserAddress(accounts[0]);
        })
        .catch((err) => {
          console.error('Error getting user accounts:', err);
          setError('Error getting user accounts. Make sure MetaMask is connected.');
        });
    } else {
      setError('MetaMask is not detected. Please install and connect to MetaMask.');
    }
  }, []);

  useEffect(() => {
    if (userAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const fetchData = async () => {
        try {
          const result = await contract.getEventsOrganizedByUser(userAddress);
          console.log('Result', result);
          setData(result);
        } catch (error) {
          console.error(error);
          setError('Error fetching user events. Ensure MetaMask is connected to the correct network.');
        }
      };

      fetchData();
    }
  }, [userAddress]);

  console.log(data);

  return (
    <div className='layout-eve'>
      <div className='head-1'>
        <div className='logo'>Add<span>n</span>Attend.</div>
        <div className='head-name' id='head-name'>
          {userAddress}
        </div>
        <div className='but-log'>
          <button className='but-out'>Logout</button>
        </div>
      </div>
      <div className="events">
        <div className="eve-head">
          Your Events.
        </div>
        {error ? (
          <NotFound />
        ) : (
          data.length === 0 ? (
            <NotFound message="No events found." />
          ) : (
            data.map((event, index) => (
              <EachEvent key={index} eventData={event} />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Event;
