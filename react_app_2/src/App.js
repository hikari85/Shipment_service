import './App.css';
import { useState } from 'react';
const ethers = require("ethers");

function App() {

  // Properties

  const [walletAddress, setWalletAddress] = useState("");

  // Helper Functions

  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function ship_order() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = await new ethers.BrowserProvider(window.ethereum);

      const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"},{"internalType":"uint256","name":"_pin","type":"uint256"}],"name":"acceptOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"}],"name":"checkStatus","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"completedDeliveries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"uint256","name":"customerID","type":"uint256"},{"internalType":"uint256","name":"pin","type":"uint256"},{"internalType":"enum ShipmentContract.OrderStatus","name":"status","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"},{"internalType":"uint256","name":"_pin","type":"uint256"}],"name":"shipWithPin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"}],"name":"totalCompletedDeliveries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

      
      let cid = document.getElementById('cid1').value;
      let pin = document.getElementById('pin1').value;
      const pvt_key = "540de2394f72d4e99defbdb9bc81d88fc68e7812735f713f8a5d2f5acf98a2d2";

      let signer = new ethers.Wallet(pvt_key,provider);
      const contract = new ethers.Contract("0x8D4CEb2544FA90A148b3450433eB325de7F60F91",abi,signer);

      let tx = await contract.shipWithPin(cid,pin);
      await tx.wait();

      document.getElementById('p1').innerHTML=`Shipped to Customer ID = ${cid}`;
    }
  }

  async function accept_order() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = await new ethers.BrowserProvider(window.ethereum);

      const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"},{"internalType":"uint256","name":"_pin","type":"uint256"}],"name":"acceptOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"}],"name":"checkStatus","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"completedDeliveries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"uint256","name":"customerID","type":"uint256"},{"internalType":"uint256","name":"pin","type":"uint256"},{"internalType":"enum ShipmentContract.OrderStatus","name":"status","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"},{"internalType":"uint256","name":"_pin","type":"uint256"}],"name":"shipWithPin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"}],"name":"totalCompletedDeliveries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

      
      let cid = document.getElementById('cid2').value;
      let pin = document.getElementById('pin2').value;
      const pvt_key = "540de2394f72d4e99defbdb9bc81d88fc68e7812735f713f8a5d2f5acf98a2d2";

      let signer = new ethers.Wallet(pvt_key,provider);

      const contract = new ethers.Contract("0x8D4CEb2544FA90A148b3450433eB325de7F60F91",abi,signer);

      let tx = await contract.acceptOrder(cid,pin);
      await tx.wait();
      document.getElementById('p2').innerHTML=`Order Delivered to Customer ID = ${cid} `;
    }
  }

  async function check_status() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = await new ethers.BrowserProvider(window.ethereum);

      const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"},{"internalType":"uint256","name":"_pin","type":"uint256"}],"name":"acceptOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"}],"name":"checkStatus","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"completedDeliveries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"uint256","name":"customerID","type":"uint256"},{"internalType":"uint256","name":"pin","type":"uint256"},{"internalType":"enum ShipmentContract.OrderStatus","name":"status","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"},{"internalType":"uint256","name":"_pin","type":"uint256"}],"name":"shipWithPin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"}],"name":"totalCompletedDeliveries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

      
      let cid = document.getElementById('cid3').value;

      const contract = new ethers.Contract("0x8D4CEb2544FA90A148b3450433eB325de7F60F91",abi,provider);

      let tx = await contract.checkStatus(cid);
      document.getElementById('p3').innerHTML=`For Customer ID = ${cid}, Shipment Status = ${tx}`;
    }
  }

  async function completed_deliveries() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = await new ethers.BrowserProvider(window.ethereum);

      const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"},{"internalType":"uint256","name":"_pin","type":"uint256"}],"name":"acceptOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"}],"name":"checkStatus","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"completedDeliveries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"uint256","name":"customerID","type":"uint256"},{"internalType":"uint256","name":"pin","type":"uint256"},{"internalType":"enum ShipmentContract.OrderStatus","name":"status","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"},{"internalType":"uint256","name":"_pin","type":"uint256"}],"name":"shipWithPin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_customerID","type":"uint256"}],"name":"totalCompletedDeliveries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

      
      let cid = document.getElementById('cid4').value;

      const contract = new ethers.Contract("0x8D4CEb2544FA90A148b3450433eB325de7F60F91",abi,provider);

      let tx = await contract.totalCompletedDeliveries(cid);
      console.log(tx);
      document.getElementById('p4').innerHTML=`Total Completed Deliveries = ${tx}`;
    }
  }





  return (
    <div className="App">
      <header className="App-header">
        <button
        
        onClick={requestAccount}
        
        >Request Account</button>
        <h3>Wallet Address: {walletAddress}</h3>

        <h2>Ship with PIN</h2>
        <input id='cid1' type='number' placeholder='Enter Customer ID : '></input>
        <input id='pin1' type='number' placeholder='Enter PIN to Ship : '></input>
        <button onClick={ship_order}>Ship Order</button>
        <p id='p1'></p>

        <h2>Accept an Order</h2>
        <input id='cid2' type='number' placeholder='Enter Customer ID : '></input>
        <input id='pin2' type='number' placeholder='Enter PIN : '></input>
        <button onClick={accept_order}>Accept Order</button>
        <p id='p2'></p>

        <h2>Check Status</h2>
        <input id='cid3' type='number' placeholder='Enter Customer ID : '></input>
        <button onClick={check_status}>Check</button>
        <p id='p3'></p>
        
        <h2>Completed Deliveries</h2>
        <input id='cid4' type='number' placeholder='Enter Customer ID : '></input>
        <button onClick={completed_deliveries}>Transact</button>
        <p id='p4'></p>
      </header>
    </div>
  );
}

export default App;