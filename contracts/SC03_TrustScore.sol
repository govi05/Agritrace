// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SC03_TrustScore {
    address public owner;

    // Score parameters (from Table 3.8 in report)
    int public COMPLIANT_REWARD    =  2;
    int public MINOR_VIOLATION     = -5;
    int public MAJOR_VIOLATION     = -15;
    int public DATA_GAP_PENALTY    = -3;
    int public SCORE_FLOOR         = 20;
    int public SCORE_CEILING       = 100;

    mapping(string => int) public trustScores;
    mapping(string => bool) public suspensionFlags;

    event ScoreUpdated(string farmId, int newScore);
    event FarmerSuspended(string farmId);

    constructor() {
        owner = msg.sender;
    }

    // Initialise a new farmer at score 50
    function registerFarmer(string memory farmId) public {
        trustScores[farmId] = 50;
    }

    function updateScore(string memory farmId, string memory eventType) public {
        int current = trustScores[farmId];
        int delta = 0;

        if (keccak256(bytes(eventType)) == keccak256(bytes("COMPLIANT"))) {
            delta = COMPLIANT_REWARD;
        } else if (keccak256(bytes(eventType)) == keccak256(bytes("MINOR"))) {
            delta = MINOR_VIOLATION;
        } else if (keccak256(bytes(eventType)) == keccak256(bytes("MAJOR"))) {
            delta = MAJOR_VIOLATION;
        } else if (keccak256(bytes(eventType)) == keccak256(bytes("DATA_GAP"))) {
            delta = DATA_GAP_PENALTY;
        }

        int updated = current + delta;

        // Apply floor and ceiling
        if (updated < SCORE_FLOOR) {
            updated = SCORE_FLOOR;
            suspensionFlags[farmId] = true;
            emit FarmerSuspended(farmId);
        }
        if (updated > SCORE_CEILING) {
            updated = SCORE_CEILING;
        }

        trustScores[farmId] = updated;
        emit ScoreUpdated(farmId, updated);
    }

    function getScore(string memory farmId) public view returns (int) {
        return trustScores[farmId];
    }

    function isSuspended(string memory farmId) public view returns (bool) {
        return suspensionFlags[farmId];
    }
}
