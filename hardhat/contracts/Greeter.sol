//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

contract Greeter is ERC2771Context {
    string private greeting;

    constructor(MinimalForwarder forwarder, string memory _greeting) ERC2771Context(address(forwarder)) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}


// 4YNJLYRCkjXW76bidjaS3GVSqsuetMaeyMNLzMbEnV5qDKKJD6Axqx637L4GntyM
