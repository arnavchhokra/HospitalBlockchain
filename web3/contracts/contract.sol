// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ShareToSecure {
    struct customerDetails {
        uint256 healthScore;
        uint256 financialHealthPoints;
        address insuranceProvider;
        address bank;
        address hospital;
        bool customerDone;
        bool insuranceProviderDone;
        bool bankDone;
        bool hospitalDone;
        bool doctorDone;
    }

    struct InvokeClaim {
        string reason;
        address hospital;
        bool ClaimVerificationFromHospital;
    }
    enum ConfirmPolicy {
        confirm,
        reject
    }

    enum ClaimRequest {
        confirm,
        reject
    }

    mapping(address => customerDetails) public addressToCustomerDetails;
    mapping(address => ConfirmPolicy) public addressConfirmPolicy;
    mapping(address => ClaimRequest) public addressToClaimRequest;
    mapping(address => InvokeClaim) public addressToInvokeClaim;
    mapping(address => bool) public RecalculatePolicy;

    //customer call
    function setDeatils(
        address insuranceProvider,
        address bank,
        address hospital
    ) public {
        customerDetails memory customerdetails;
        customerdetails.insuranceProvider = insuranceProvider;
        customerdetails.bank = bank;
        customerdetails.hospital = hospital;
        customerdetails.customerDone = true;
        addressToCustomerDetails[msg.sender] = customerdetails;
    }

    //insuranceProvider call
    function setinsuranceProvider(address customer, bool insuranceProviderDone)
        public
    {
        customerDetails storage customerdetails = addressToCustomerDetails[customer];
        customerdetails.insuranceProviderDone = insuranceProviderDone;
       
    }

    //bank call
    function setBank(
        address customer,
        bool bankDone,
        uint256 financialHealthPoints
    ) public {
       customerDetails storage customerdetails = addressToCustomerDetails[customer];
        customerdetails.financialHealthPoints = financialHealthPoints;
        customerdetails.bankDone = bankDone;
       
    }

    //hospital call
    function setHospital(
        address customer,
        bool hospitalDone,
        uint256 healthScore
    ) public {
       customerDetails storage customerdetails = addressToCustomerDetails[customer];
        customerdetails.healthScore = healthScore;
        customerdetails.hospitalDone = hospitalDone;
      
    }

    //insuranceProvider call
    function setRecalculatePolicy(address customer) public {
        RecalculatePolicy[customer] = true;
    }

    //customer call
    function setConfirmPolicy() public {
        addressConfirmPolicy[msg.sender] = ConfirmPolicy.confirm;
    }

    //customer call
    function setRejectPolicy() public {
        addressConfirmPolicy[msg.sender] = ConfirmPolicy.reject;
    }

    //insuranceProvider call
    function setInvokeClaim(
        address customer,
        address hospital,
        string memory reason
    ) public {
        InvokeClaim memory invokeclaim;
        invokeclaim.hospital = hospital;
        invokeclaim.reason = reason;
        addressToInvokeClaim[customer] = invokeclaim;
    }

    //hospital call
    function setClaimByHospital(address customer) public {
        InvokeClaim storage invokeclaim =  addressToInvokeClaim[customer];
        invokeclaim.ClaimVerificationFromHospital = true;
    }

    //doctor call
    function setClaimByDoctor(address customer, bool doctorDone) public{
        customerDetails storage customerdetails = addressToCustomerDetails[customer];
        customerdetails.doctorDone = doctorDone;
    }

    //insuranceProvider call
    function setClaimRequestConfirm(address customer) public {
        addressToClaimRequest[customer] = ClaimRequest.confirm;
    }

    //insuranceProvider call
    function setClaimRequestReject(address customer) public {
        addressToClaimRequest[customer] = ClaimRequest.reject;
    }
}
