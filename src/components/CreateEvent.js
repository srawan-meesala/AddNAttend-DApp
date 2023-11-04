import React, { useState } from 'react';
import { ethers } from 'ethers';
import EventManager from '../contract/EventManager.json';
import isENSNameAvailable from './isENSNameAvailable';

const { ethereum } = window;

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    ensDomain: '',
    date: '',
    time: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateEvent = async () => {
    try {
      setError('');
      const {
        name,
        ensDomain,
        date,
        time,
      } = formData;

      if (!name || !ensDomain || !date || !time) {
        setError('All fields are required.');
        return;
      }

      // Check if ENS name is available
      const isAvailable = await isENSNameAvailable(ensDomain);

      if (!isAvailable) {
        setError('The ENS name is already registered.');
        return;
      }else{
        console.log("available");
      }

      // Ensure that the user is connected to an Ethereum provider.
      if (!ethereum) {
        setError('Please install and connect to a Web3 provider (e.g., MetaMask) to create an event.');
        return;
      }

      // Request permission to connect to the Ethereum provider (MetaMask).
      await ethereum.request({ method: 'eth_requestAccounts' });

      // Connect to the Ethereum provider.
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log(signer);

      // Get the contract instance.
      const contractAddress = '0x5Fd559d0c2B387e9F6b48EA3E13282DA931ffb9a';
      const contractABI = EventManager.abi;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Convert date and time to a Unix timestamp.
      const dateTime = new Date(`${date}T${time}`).getTime() / 1000;

      // Estimate gas price.
      const gasPrice = await provider.getGasPrice();

      console.log(name, ensDomain, dateTime);

      // Call the createEvent function in the contract with estimated gas price.
      const transaction = await contract.addEventWithENS(name, dateTime, ensDomain, {
        gasPrice: gasPrice,
      });
      const receipt = await transaction.wait();

      console.log('Transaction receipt:', receipt);
      alert('Event created successfully.');

      // Clear the form.
      setFormData({
        name: '',
        ensDomain: '',
        date: '',
        time: '',
      });
    } catch (error) {
      console.error('Error creating the event:', error);
      setError(`Error creating the event: ${error.message}`);
    }
  };

  return (
    <div className="layout">
      <div className="head">
        <div className="logo">Add<span>n</span>Attend.</div>
        <div className="head-name" id="head-name">
          {localStorage.address}
        </div>
        <div className="but-log">
          <button className="but-out">Logout</button>
        </div>
      </div>
      <div className="body">
        <form className="form">
          <div className="form-name fitem">
            <label htmlFor="name">Name Of The Event: </label>
            <input
              name="name"
              type="text"
              placeholder="Rocky's Birthday"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-name fitem">
            <label htmlFor="ensDomain">Choose an ENS Domain: </label>
            <input
              name="ensDomain"
              type="text"
              placeholder="rockyrocks.test"
              value={formData.ensDomain}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-date fitem">
            <label htmlFor="date">Date: </label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-time fitem">
            <label htmlFor="time">Time: </label>
            <input
              name="time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-submit fitem">
            <button className="form-but" type="button" onClick={handleCreateEvent}>
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
