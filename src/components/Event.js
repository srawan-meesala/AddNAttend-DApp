import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import EachEvent from './EachEvent';
import { ethers } from 'ethers';
import AddnAttend from '../contract/AddnAttend.json';

const Event = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const contractAddress = '0x9da79b71523E2700Eb0B14c47e67cC82Bed11750';
  const contractABI = AddnAttend.abi;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setUserAddress(accounts[0]);
          console.log('User Address:', accounts[0]);
        } else {
          setError('MetaMask not installed.');
        }
      } catch (error) {
        console.error('Error fetching user address:', error);
        setError('Error fetching user address. Ensure MetaMask is connected to the correct network.');
      }
    };

    fetchData();
  }, []);

  console.log("User Address: ", userAddress);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (userAddress) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, contractABI, provider);
          const result = await contract.getEventsOrganisedByUser(userAddress);
          console.log('Result', result);
          setData(result);
        }
      } catch (error) {
        console.log('Error fetching user events:', error);
        setError('Error fetching user events. Ensure MetaMask is connected to the correct network.');
      }
    };

    // Fetch events only if userAddress is available
    if (userAddress) {
      fetchEvents();
    }
  }, [userAddress, contractABI]);

  console.log('Data', data);

  return (
    <div className='layout-eve'>
      <div className='head-1'>
        <div className='logo'>
          Add<span>n</span>Attend.
        </div>
        <div className='head-name' id='head-name'>
          {userAddress || 'Loading...'}
        </div>
        <div className='but-log'>
          <button className='but-out'>Logout</button>
        </div>
      </div>
      <div className='events'>
        <div className='eve-head'>Your Events.</div>
        {error ? (
          <NotFound />
        ) : data.length === 0 ? (
          <NotFound message='No events found.' />
        ) : (
          data.map((event, index) => <EachEvent key={index} eventData={event} />)
        )}
      </div>
    </div>
  );
};

export default Event;
