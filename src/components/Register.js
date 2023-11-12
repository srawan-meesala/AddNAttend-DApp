import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import EventManager from '../contract/EventManager.json';

const { ethereum } = window;

const Register = () => {
  const [ensAddress, setEnsAddress] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [error, setError] = useState('');
  const [gasPrice, setGasPrice] = useState(0); // State to store the estimated gas price.

  const contractAddress = '0x842c15a526FE407D6c6620acf584430cd5a4DBCC';
  const contractABI = EventManager.abi;

  const fetchGasPrice = async () => {
    try {
      // Use the Ethereum provider to fetch the current gas price.
      const provider = new ethers.providers.Web3Provider(ethereum);
      const currentGasPrice = await provider.getGasPrice();
      setGasPrice(currentGasPrice.toString());
    } catch (error) {
      console.error('Error fetching gas price:', error);
    }
  };

  useEffect(() => {
    fetchGasPrice();
  }, []);

  const handleRegister = async () => {
    try {
      setError('');
      const ens = ensAddress.trim();

      if (ens === '') {
        setError('Please enter a valid ENS address.');
        return;
      }

      // Request permission to connect to the Ethereum provider (MetaMask).
      await ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const transaction = await contract.register(ens, {
        gasPrice: ethers.utils.parseUnits(gasPrice, 'wei'), // Use the estimated gas price.
      });

      const receipt = await transaction.wait();

      setRegistrationStatus(`Registered for event with ENS address: ${ens}`);
      console.log('Transaction receipt:', receipt);

      alert('Registered Successfully');
    } catch (error) {
      console.error('Error interacting with contract:', error);
      setError(`Error registering for the event: ${error.message}`);
      if (error.message.includes('revert')) {
        setError('Invalid ENS Name.');
      } else {
        setError('An error occurred while interacting with the contract.');
      }
    }
  };

  return (
    <div className='layout'>
      <div className='head'>
        <div className='logo'>Add<span>n</span>Attend.</div>
          <div className='head-name' id='head-name'>
            {localStorage.address}
          </div>
          <div className='but-log'>
            <button className='but-out'>Logout</button>
          </div>
      </div>
      <div className='body'>
        <form className='form'>
          <div className="form-name fitem">
            <label htmlFor="ens-address">ENS Name: </label>
            <input
              name="ens-address"
              type="text"
              placeholder="sunnybeach.eth"
              value={ensAddress}
              onChange={(e) => setEnsAddress(e.target.value)}
            />
          </div>
          <div className="form-submit fitem">
            <button className='form-but' type="button" onClick={handleRegister}>
              Register for Event
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}
        {registrationStatus && <div className="success-message">{registrationStatus}</div>}

        <div className="gas-price">
          Estimated Gas Price: {ethers.utils.formatUnits(gasPrice, 'wei')} Gwei
        </div>
      </div>
    </div>
  );
};

export default Register;
