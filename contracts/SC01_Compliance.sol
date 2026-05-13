// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SC01_Compliance {
    address public owner;

    // NPOP thresholds
    uint public maxPesticideML = 0;
    uint public maxSoilPH = 80;   // stored as x10, so 8.0
    uint public minSoilPH = 55;   // stored as x10, so 5.5

    enum Status { Compliant, NonCompliant }

    struct ComplianceRecord {
        string farmId;
        uint timestamp;
        uint pesticideML;
        uint soilPH;        // x10
        uint soilMoisture;
        Status status;
    }

    mapping(uint => ComplianceRecord) public records;
    uint public recordCount;

    event ComplianceChecked(string farmId, Status status, uint timestamp);

    modifier onlySC04() {
        // In production, restrict to SC-04 gateway address only
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function evaluateCompliance(
        string memory farmId,
        uint pesticideML,
        uint soilPH,
        uint soilMoisture,
        uint timestamp
    ) public onlySC04 returns (Status) {
        Status result;

        if (pesticideML > maxPesticideML || soilPH > maxSoilPH || soilPH < minSoilPH) {
            result = Status.NonCompliant;
        } else {
            result = Status.Compliant;
        }

        records[recordCount] = ComplianceRecord(
            farmId, timestamp, pesticideML, soilPH, soilMoisture, result
        );
        recordCount++;

        emit ComplianceChecked(farmId, result, timestamp);
        return result;
    }
}
