// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract eventToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000 * 10 ** uint(decimals())); // Mint an initial supply to the contract deployer
    } 

    // Custom mint function to allow the owner (event owner) to mint tokens
    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function transferTokens(address from, address to, uint256 amount) public {
        _transfer(from, to, amount);
    }
}