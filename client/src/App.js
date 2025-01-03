import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PatientClaim from './contracts/PatientClaim.json'; // Path to the compiled contract JSON

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [patientInfo, setPatientInfo] = useState(null);
  const [claimStatus, setClaimStatus] = useState(null);

  // Initialize Web3 and set up contract
  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = PatientClaim.networks[networkId];
        
        const contractInstance = new web3Instance.eth.Contract(
          PatientClaim.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Log ABI and contract methods to debug
        console.log("Contract ABI:", PatientClaim.abi);
        console.log("Contract methods:", contractInstance.methods);

        setWeb3(web3Instance);
        setContract(contractInstance);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error initializing Web3 or contract:", error);
        alert("Failed to load Web3, accounts, or contract. Check console for details.");
      }
    } else {
      alert("Please install MetaMask to interact with this DApp.");
    }
  };

  // Add patient function
  const addPatient = async () => {
    if (!contract) {
      console.error("Contract is not initialized");
      return;
    }

    // Validate inputs
    if (!name || !diagnosis || !age || !gender || !patientAddress || !admissionDate) {
      alert("Please fill in all fields");
      return;
    }

    // Validate diagnosis (assuming it's an integer code)
    const diagnosisNumber = parseInt(diagnosis);
    if (isNaN(diagnosisNumber)) {
      alert("Please enter a valid diagnosis code (number)");
      return;
    }

    // Validate age (assuming it's a string)
    if (!age) {
      alert("Please enter a valid age");
      return;
    }

    // Validate admission date (must be a valid date)
    const admissionTimestamp = parseAdmissionDate(admissionDate); // Parse the date
    if (admissionTimestamp === -1) {
      alert("Please enter a valid admission date");
      return;
    }

    try {
      await contract.methods
        .addPatient(patientAddress, name, diagnosisNumber, age, gender, admissionTimestamp)
        .send({ from: account });
      alert('Patient record added successfully!');
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Error adding patient: ' + error.message);
    }
  };

  // Helper function to parse admission date
  const parseAdmissionDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return -1; // Invalid date
    }
    return Math.floor(date.getTime() / 1000); // Return UNIX timestamp
  };

  // Get patient information function
  const getPatientInfo = async () => {
    if (!contract || !patientAddress) {
      console.error("Contract or Patient Address is missing");
      return;
    }

    try {
      const patientData = await contract.methods.getPatient(patientAddress).call();
      setPatientInfo(patientData); // Set the fetched data to state
    } catch (error) {
      console.error('Error fetching patient data:', error);
      alert('Error fetching patient data: ' + error.message);
    }
  };

  // Claim insurance function
  const claimInsurance = async () => {
    if (!contract || !patientAddress) {
      console.error("Contract or Patient Address is missing");
      return;
    }

    try {
      // Ensure claimInsurance method exists in the contract
      if (!contract.methods.claimInsurance) {
        throw new Error("claimInsurance method not found in contract");
      }

      // Attempt to claim insurance
      const result = await contract.methods.claimInsurance(patientAddress).send({ from: account });

      // Handle success or failure
      if (result.status) {
        setClaimStatus('Insurance claimed successfully!');
      } else {
        setClaimStatus('Insurance claim failed.');
      }
    } catch (error) {
      console.error('Error claiming insurance:', error);
      alert('Error claiming insurance: ' + error.message);
      setClaimStatus('Insurance claim failed.');
    }
  };

  return (
    <div>
      <h2>Add Patient Record</h2>
      <input
        type="text"
        placeholder="Patient Ethereum Address"
        value={patientAddress}
        onChange={(e) => setPatientAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Diagnosis (code)"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <input
        type="date"
        placeholder="Admission Date"
        value={admissionDate}
        onChange={(e) => setAdmissionDate(e.target.value)}
      />
      <button onClick={addPatient}>Add Patient Record</button>

      <h2>Query Patient Information</h2>
      <input
        type="text"
        placeholder="Patient Ethereum Address"
        value={patientAddress}
        onChange={(e) => setPatientAddress(e.target.value)}
      />
      <button onClick={getPatientInfo}>Get Patient Info</button>

      {patientInfo && (
        <div>
          <h3>Patient Information</h3>
          <p>Name: {patientInfo[0]}</p>
          <p>Diagnosis: {patientInfo[1]}</p>
          <p>Age: {patientInfo[2]}</p>
          <p>Gender: {patientInfo[3]}</p>
          <p>Admission Date: {new Date(patientInfo[5] * 1000).toLocaleDateString()}</p>
          <p>Insurance Claimed: {patientInfo[4] ? 'Yes' : 'No'}</p>
        </div>
      )}

      <h2>Claim Insurance</h2>
      <button onClick={claimInsurance}>Claim Insurance</button>
      {claimStatus && <p>{claimStatus}</p>}
    </div>
  );
};

export default App;
