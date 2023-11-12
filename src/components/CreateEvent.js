import React, { useState } from 'react';
import { ethers } from 'ethers';
import EventManager from '../contract/EventManager.json';

const { ethereum } = window;

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    ensDomain: '',
    date: '',
    time: '',
  });

  const [error, setError] = useState('');
  const [gasPrice, setGasPrice] = useState('');

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

      if (!ethereum) {
        setError('Please install and connect to a Web3 provider (e.g., MetaMask) to create an event.');
        return;
      }

      await ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const contractAddress = '0x842c15a526FE407D6c6620acf584430cd5a4DBCC';
      const contractABI = EventManager.abi;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const dateTime = new Date(`${date}T${time}`).getTime() / 1000;

      const estimatedGasPrice = await provider.getGasPrice();
      setGasPrice(estimatedGasPrice.toString());

      const transaction = await contract.addEventWithENS(name, dateTime, ensDomain, {
        gasLimit: 600000,
        gasPrice: estimatedGasPrice,
      });
      console.log('Transaction sent:', transaction);

      const receipt = await transaction.wait();
      console.log('Transaction receipt:', receipt);

      if (receipt.status === 1) {
        alert('Event created successfully.');
        console.log('Event creation successful!');
      } else {
        console.error('Event creation failed. Transaction reverted.');
      }

      setFormData({
        name: '',
        ensDomain: '',
        date: '',
        time: '',
      });
    } catch (error) {
      console.error('Error creating the event:', error);
      setError(`Error creating the event.`);
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
          {gasPrice && <div className="gas-price">Estimated Gas Price: {gasPrice} Wei</div>}
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
