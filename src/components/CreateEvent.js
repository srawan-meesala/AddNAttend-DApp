import React, { useState } from 'react';
import { ethers } from 'ethers';
import AddnAttend from '../contract/AddnAttend.json';

const { ethereum } = window;

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    seats: '',
    ensDomain: '',
    st_date: '',
    st_time: '',
    end_date: '',
    end_time: '',
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
        seats,
        st_date,
        end_date,
        st_time,
        end_time,
      } = formData;

      if (!name || !ensDomain || !seats || !st_date || !end_date || !st_time || !end_time) {
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

      const contractAddress = '0x355B2B942FAA01F96D942aEB8AE4b3874B74a7C0';
      const contractABI = AddnAttend.abi;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const st_dateTime = new Date(`${st_date}T${st_time}`).getTime() / 1000;
      const end_dateTime = new Date(`${end_date}T${end_time}`).getTime() / 1000;

      const estimatedGasPrice = await provider.getGasPrice();
      setGasPrice(estimatedGasPrice.toString());

      const transaction = await contract.createEvent(name, seats, st_dateTime, end_dateTime, 20, ensDomain, {
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
        seats: '',
        ensDomain: '',
        st_date: '',
        st_time: '',
        end_date: '',
        end_time: '',
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
            <label htmlFor="ensDomain">Choose a Domain: </label>
            <input
              name="ensDomain"
              type="text"
              placeholder="rockyrocks.test"
              value={formData.ensDomain}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-name fitem">
            <label htmlFor="seats">Number of seats: </label>
            <input
              name="seats"
              type="number"
              placeholder="100"
              value={formData.seats}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-date fitem">
            <label htmlFor="st_date">Start Date: </label>
            <input
              name="st_date"
              type="date"
              value={formData.st_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-time fitem">
            <label htmlFor="st_time">Time: </label>
            <input
              name="st_time"
              type="time"
              value={formData.st_time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-date fitem">
            <label htmlFor="end_date">Start Date: </label>
            <input
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-time fitem">
            <label htmlFor="end_time">Time: </label>
            <input
              name="end_time"
              type="time"
              value={formData.end_time}
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
