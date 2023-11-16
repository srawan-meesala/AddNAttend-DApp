// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract eventToken is ERC20, Ownable {
    constructor(address one) ERC20("AddnAttend", "ANA") {
        _mint(one, 1000000 * 10 ** uint(decimals()));
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }

    function transferTokens(address from, address to, uint256 amount) public {
        _transfer(from, to, amount);
    }
}