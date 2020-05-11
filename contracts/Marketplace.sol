pragma solidity ^0.5.0;


contract Marketplace {
    string public name;
    mapping(uint256 => Item) public items;

    constructor() public {
        name = "Marketplace";
    }
}
