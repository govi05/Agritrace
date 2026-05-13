// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SC04_EdgeGateway {
    address public owner;
    mapping(address => bool) public authorisedEdgeNodes;

    event DataSubmitted(string farmId, uint timestamp, address edgeNode);

    modifier onlyAuthorisedEdge() {
        require(authorisedEdgeNodes[msg.sender], "Unauthorised: not an edge node");
        _;
    }

    constructor() {
        owner = msg.sender;
        // Owner is first authorised edge node for testing
        authorisedEdgeNodes[msg.sender] = true;
    }

    function authoriseEdgeNode(address node) public {
        require(msg.sender == owner, "Only owner can authorise");
        authorisedEdgeNodes[node] = true;
    }

    function submitVerifiedPayload(
        string memory farmId,
        uint pesticideML,
        uint soilPH,
        uint soilMoisture,
        uint timestamp
    ) public onlyAuthorisedEdge returns (bool) {
        // In full system, this calls SC01 and SC03
        emit DataSubmitted(farmId, timestamp, msg.sender);
        return true;
    }
}
