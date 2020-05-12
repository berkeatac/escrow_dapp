pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract Marketplace {
    string public name;
    uint itemCount = 0;
    mapping(uint => Item) public items;

    struct Item {
        uint id;
        string name;
        string description;
        uint price;
        address payable owner;
        address payable buyer;
        bool purchased;
        bool verified;
    }
    /**
     ** Events
     **/
    event ItemCreated(
        uint id,
        string name,
        string description,
        uint price,
        address payable owner,
        address payable buyer,
        bool purchased,
        bool verified
    );

    constructor() public {
        name = "Marketplace";
    }

    function getItems() public returns (Item[] memory) {
        Item[] memory ret = new Item[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            ret[i] = items[i];
        }
        return ret;
    }

    function createItem(
        string memory _name,
        string memory _description,
        uint256 _price
    ) public {
        require(bytes(_name).length > 0, "");
        require(_price > 0, "");

        items[itemCount] = Item(
            itemCount,
            _name,
            _description,
            _price,
            msg.sender,
            address(0),
            false,
            false
        );
        itemCount++;
        emit ItemCreated(
            itemCount,
            _name,
            _description,
            _price,
            msg.sender,
            address(0),
            false,
            false
        );
    }

    function purchaseItem(uint _id) public payable {
        // fetch the item
        Item memory _item = items[_id];
        require(
            msg.value > _item.price,
            "there must be enough ether on message sent"
        );
        require(
            _item.id > 0 && _item.id <= itemCount,
            "item must have a valid id"
        );
        require(!_item.purchased, "item does not have to be purchased before");
        require(_item.owner != msg.sender, "seller cannot buy its own item");
        _item.purchased = true;
        _item.price = msg.value;
        _item.buyer = msg.sender;
        items[_id] = _item;
    }

    function verifyPurchase(uint _id) public payable {
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

    function deleteItem(uint _id) public {
        Item memory _item = items[_id];
        require(msg.sender == _item.owner);
        require(!_item.purchased)
        delete items[_id];
    }
}
