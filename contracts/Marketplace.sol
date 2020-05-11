pragma solidity ^0.5.0;


contract Marketplace {
    string public name;
    uint256 itemCount = 0;
    mapping(uint256 => Item) public items;

    struct Item {
        uint256 id;
        string name;
        uint256 price;
        address payable owner;
        address payable buyer;
        bool purchased;
        bool verified;
    }

    constructor() public {
        name = "Marketplace";
    }

    function createItem(string memory _name, uint256 _price) public {
        require(bytes(_name).length > 0);
        require(_price > 0);

        itemCount++;
        items[itemCount] = Item(
            itemCount,
            _name,
            _price,
            msg.sender,
            address(0),
            false,
            false
        );
    }
}
