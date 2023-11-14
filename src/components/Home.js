import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ethers } from 'ethers';
import AddnAttend from '../contract/AddnAttend.json';

const Home = ({id, setid}) => {

  const navigate = useNavigate()

  const logoutHandler = () => {
    setid({address: ''})
    navigate('/')
  }

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const contractAddress = '0x355B2B942FAA01F96D942aEB8AE4b3874B74a7C0';
  const contractABI = AddnAttend.abi;

  console.log('Home',id.address);

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (userAddress) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, contractABI, provider);
          const result = await contract.getBalance();
          console.log('Result', result);
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching user events:', error);
        setError('Error fetching user events. Ensure MetaMask is connected to the correct network.');
      }
    };
    if (userAddress) {
      fetchEvents();
    }
  }, [userAddress, contractABI]);

  console.log(data, error);

  return (
    <div className='layout'>
      <div className='head'>
        <div className='logo'>Add<span>n</span>Attend.</div>
        <div className='head-name' id='head-name'>
          {id.address}
        </div>
        <div className='but-log'>
          <button onClick={logoutHandler} className='but-out'>Logout</button>
        </div>
      </div>
      <div className='opts'>
        <div className='opt'><Link className='opt-a' to='/events'>Your Events</Link></div>
        <div className='opt'><Link className='opt-a' to='/create-event'>Create New Event</Link></div>
        <div className='opt'><Link className='opt-a' to='/register'>Register For An Event</Link></div>
        <div className='opt'><Link className='opt-a' to='/registered'>Registered Events</Link></div>
        <div className='opt'><Link className='opt-a' to='/checkin'>Enter a Check In</Link></div>
      </div>
      <div className='dummy-1' >Balance: {parseInt(data._hex, 10)}</div>
    </div>
  )
}

export default Home