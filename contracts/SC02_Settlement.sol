// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SC02_Settlement {
    address public owner;

    struct Batch {
        string farmId;
        string batchId;
        uint quantity;
        uint pricePerKg;
        bool settled;
        uint timestamp;
    }

    mapping(string => Batch) public batches;

    event BatchSettled(string batchId, string farmId, uint totalValue);

    constructor() {
        owner = msg.sender;
    }

    function registerBatch(
        string memory batchId,
        string memory farmId,
        uint quantity,
        uint pricePerKg
    ) public {
        batches[batchId] = Batch(farmId, batchId, quantity, pricePerKg, false, block.timestamp);
    }

    function settleBatch(string memory batchId) public {
        Batch storage b = batches[batchId];
        require(!b.settled, "Already settled");
        b.settled = true;
        uint totalValue = b.quantity * b.pricePerKg;
        emit BatchSettled(batchId, b.farmId, totalValue);
    }
}
