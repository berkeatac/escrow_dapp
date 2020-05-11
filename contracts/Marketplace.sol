pragma solidity ^0.6.4;


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
        require(bytes(_name).length > 0, "");
        require(_price > 0, "");

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

    function purchaseProduct(uint256 _id) public payable {
        // fetch the item
        Item memory _item = items[_id];
        require(
            msg.value > _item.price,
            "there must be enough ether on message sent"
        );
        require(_item.id > 0 && _item.id <= itemCount, "item must have a valid id");
        require(!_item.purchased, "item does not have to be purchased before");
        require(_item.owner != msg.sender, "seller cannot buy its own item");
        _item.purchased = true;
        _item.buyer = msg.sender;
        items[_id] = _item;
    }

    function verifyPurchase(uint256 _id) public payable {
        Item memory _item = items[_id];
        require(msg.sender == _item.buyer, "msg.sender must be item buyer");
        require(
            _item.purchased && !_item.verified,
            "item must be purchased but not verified"
        );
        require(_item.price > 0, "item price must be unsigned integer");
        _item.purchased = true;
        _item.verified = true;
        address payable _seller = _item.owner;
        _item.owner = msg.sender;
        _item.buyer = address(0);
        items[_id] = _item;
        _seller.transfer(_item.price);
    }
}
