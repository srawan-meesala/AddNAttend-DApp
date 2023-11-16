import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers';
import AddnAttend from '../contract/AddnAttend.json';

const Balance = ({id, setid}) => {
    
    const navigate = useNavigate()
    const logoutHandler = () => {
        setid({address: ''})
        navigate('/')
    }

    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const contractAddress = '0x1325e61d31B7E3d449648922eC2a9553F2733592';
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

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                if (userAddress) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(contractAddress, contractABI, provider);
                const result = await contract.getBalance2(id.address);
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
    }, [userAddress, contractABI, id.address]);
    var balanceNumber = parseInt(Number(data._hex), 10)
    console.log(data._hex, balanceNumber, error);
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
            <div className='content-balance'>
                Your Balance: {balanceNumber} ANAs
            </div>
        </div>
    )
}

export default Balance