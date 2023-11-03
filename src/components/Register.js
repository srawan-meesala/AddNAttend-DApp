import React, { useState } from 'react'
import { ethers } from 'ethers';
import { providers } from 'ethers';
import EventManager from '../contract/EventManager.json';


const Register = () => {
    const [ensAddress, setEnsAddress] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');
    const [error, setError] = useState('');
  
    const contractAddress = '0xD596bD5fd6173e8553263278d808E143D08A1C3b';
    const contractABI = EventManager.abi;
    const provider = new providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/mpxyHBRCqlXiWu1z20mwQxm_7-n3SmWN');
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    const handleRegister = async () => {
      try {
        setError('');
        const ens = ensAddress.trim();
  
        if (ens === '') {
          setError('Please enter a valid ENS address.');
          return;
        }
  
        const signer = provider.getSigner();
        const transaction = await contract.connect(signer).register(ens);
        await transaction.wait();
  
        setRegistrationStatus(`Registered for event with ENS address: ${ens}`);
      } catch (error) {
        setError(`Error registering for the event: ${error.message}`);
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
          <form className='form' onSubmit={(e) => e.preventDefault()}>
            <div className="form-name fitem">
              <label htmlFor="ens-address">ENS Address: </label>
              <input
                name="ens-address"
                type="text"
                placeholder="sunnybeach.eth"
                value={ensAddress}
                onChange={(e) => setEnsAddress(e.target.value)}
              />
            </div>
            <div className="form-submit fitem">
              <button className='form-but' onClick={handleRegister}>
                Register for Event
              </button>
            </div>
          </form>
  
          {error && <div className="error-message">{error}</div>}
  
          {registrationStatus && <div className="success-message">{registrationStatus}</div>}
        </div>
      </div>
    );
  };
  
  export default Register;