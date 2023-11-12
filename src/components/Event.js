import React, { useState, useEffect } from 'react';
import NotFound from './NotFound';
import EachEvent from './EachEvent';
import { ethers } from 'ethers';
import EventManager from '../contract/EventManager.json';

const Event = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const contractAddress = '0x842c15a526FE407D6c6620acf584430cd5a4DBCC';
  const contractABI = EventManager.abi;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          // Request account access from MetaMask
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Get the first account from MetaMask (assuming the user has at least one account)
          setUserAddress(accounts[0]);

          // Log the user's address
          console.log('User Address:', accounts[0]);
        } else {
          setError('MetaMask not installed.');
        }
      } catch (error) {
        console.error('Error fetching user address:', error);

        // Update the component state with an error message
        setError('Error fetching user address. Ensure MetaMask is connected to the correct network.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Continue only if we have a valid userAddress
        if (userAddress) {
          // Create ethers provider and contract instances
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, contractABI, provider);

          // Call the contract function to get events organized by the user
          const result = await contract.getEventsOrganizedByUser(userAddress);

          // Log the result and update the component state
          console.log('Result', result);
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching user events:', error);

        // Update the component state with an error message
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
