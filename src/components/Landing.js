import React, { useState } from 'react'

const Landing = () => {

    const [data, setdata] = useState({ 
        address: "",
    }); 

    const buttonHandler = () => {
        if(window.ethereum){
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(res => accountChangeHandler(res[0]))
        }else{
            alert("install metamask extension!!")
        }
    }

    const accountChangeHandler = (account) => { 
        console.log(account);
        setdata({
            address: account, 
        }); 
    }; 

    return (
        <div className='layout'>
            <div className='head'>
                <div className='logo'>Add<span>n</span>Attend.</div>
                <div />
            </div>
            <div className='body'>
                <div className='some-content'>
                    Create Events, Make People Attend them, Attend Events.
                    <br></br>
                    Organised In One Place.
                    <br></br>
                    Everything on-Chain. Decentralised And Secure.
                    <br></br>
                    Connect Your Wallet To Get Started.
                </div>
                <div className='but-cont'>
                    <button onClick={buttonHandler} className='but'>Connect Your Wallet</button>
                </div>
            </div>
        </div>
    )
}

export default Landing