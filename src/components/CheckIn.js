import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AddnAttend from '../contract/AddnAttend.json';

const { ethereum } = window;

const CheckIn = ({ id }) => {
  const [ensAddress, setEnsAddress] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [error, setError] = useState('');
  const [gasPrice, setGasPrice] = useState(0);

  const contractAddress = '0x9da79b71523E2700Eb0B14c47e67cC82Bed11750';
  const contractABI = AddnAttend.abi;

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
      const ens = ensAddress;

      if (ens === '') {
        setError('Please enter a valid ENS address.');
        alert('Please enter a valid ENS address');
        return;
      }
      await ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await contract.registerToEvent(ens, {
        gasPrice: ethers.utils.parseUnits(gasPrice, 'wei'), // Use the estimated gas price.
      });
      const receipt = await transaction.wait();
      console.log('Transaction receipt:', receipt);
      alert('Check In Successful.');
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

  console.log(error);

  return (
    <div className='layout'>
      <div className='head'>
        <div className='logo'>Add<span>n</span>Attend.</div>
          <div className='head-name' id='head-name'>
            { id }
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
            <label htmlFor="user-address">Address of the Attendee: </label>
            <input
              name="user-address"
              type="text"
              placeholder="0x00000000"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </div>
          <div className="form-submit fitem">
            <button className='form-but' type="button" onClick={handleRegister}>
              CheckIn and Offer Reward
            </button>
          </div>
        </form>

        <div className="gas-price">
          Estimated Gas Price: {ethers.utils.formatUnits(gasPrice, 'wei')} Gwei
        </div>
      </div>
    </div>
  );
};

export default CheckIn;