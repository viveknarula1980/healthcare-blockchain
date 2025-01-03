// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientClaim {

    struct Patient {
        string name;
        uint256 diagnosis;
        uint256 age;
        string gender;
        bool insuranceClaimed;
        uint256 admissionDate;
    }

    mapping(address => Patient) public patients;

    // Add new patient
    function addPatient(
        address _patientAddress,
        string memory _name,
        uint256 _diagnosis,
        uint256 _age,
        string memory _gender,
        uint256 _admissionDate
    ) public {
        patients[_patientAddress] = Patient(_name, _diagnosis, _age, _gender, false, _admissionDate);
    }

    // Get patient information
    function getPatient(address _patientAddress) public view returns (string memory, uint256, uint256, string memory, bool, uint256) {
        Patient memory patient = patients[_patientAddress];
        return (patient.name, patient.diagnosis, patient.age, patient.gender, patient.insuranceClaimed, patient.admissionDate);
    }

    // Claim insurance for the patient
    function claimInsurance(address _patientAddress) public returns (bool) {
        // Ensure the patient exists and has not already claimed insurance
        require(patients[_patientAddress].insuranceClaimed == false, "Insurance already claimed.");
        
        // Mark the insurance as claimed
        patients[_patientAddress].insuranceClaimed = true;

        return true;
    }
}
