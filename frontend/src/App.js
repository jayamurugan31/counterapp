import './App.css';
import { useEffect, useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // replace with your address
const contractABI = [
  "function getCount() view returns (uint256)",
  "function increment()"
];

function App() {
  const [count, setCount] = useState(0);
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    connectWallet();
  }, []);

  async function connectWallet() {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);
      setSigner(signer);
      setContract(contract);

      const network = await provider.getNetwork();
      console.log("network", network);
      if (network.chainId != 31337) {
        alert("Please switch to Localhost 8545 (Chain ID 31337)");
      }

      const count = await contract.getCount();
      setCount(count.toString());
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function refreshCount() {
    if (contract) {
      const count = await contract.getCount();
      setCount(count.toString());
    }
  }

  async function increment() {
    if (contract) {
      const tx = await contract.increment();
      await tx.wait();
      refreshCount();
    }
  }

  return (
    <div className="App">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Counter DApp</h3>
        <p>Current Count: {count}</p>
        <button onClick={refreshCount}>Refresh</button>
        <button onClick={increment}>Increment</button>
      </div>
    </div>
  );
}

export default App;