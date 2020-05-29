pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract Marketplace {
    string public name;
    uint256 public itemCount = 0;
    uint256 public courierCount = 0;

    mapping(uint256 => Item) public items;
    mapping(uint256 => Courier) public couriers;

    /*
     * Models
     */
    struct Courier {
        uint256 id;
        address payable adr;
        uint256 reputation;
    }

    struct Item {
        uint256 id;
        string name;
        string description;
        uint256 price;
        uint256 fee;
        address payable owner;
        address payable buyer;
        address payable courier;
        bool purchased;
        bool verified;
        bool transit;
    }
    /*
     * Events
     */
    event ItemCreated(
        uint256 id,
        string name,
        string description,
        uint256 price,
        uint256 fee,
        address payable owner,
        address payable buyer,
        address payable courier,
        bool purchased,
        bool verified,
        bool transit
    );

    event ItemPurchased();

    constructor() public {
        name = "Marketplace";
    }

    function getItemCount() public returns (uint256) {
        return itemCount;
    }

    function becomeCourier() public {
        // require() is not already a courier
        couriers[courierCount] = Courier(courierCount, msg.sender, 0);
        courierCount++;
    }

    function getCourierIdByAddress(address payable courierAddr)
        private
        returns (uint256)
    {
        for (uint256 i = 0; i < courierCount; i++) {
            Courier memory _courier = couriers[i];
            if (_courier.adr == courierAddr) {
                return i;
            }
        }
    }

    function getCouriers() public returns (Courier[] memory) {
        Courier[] memory ret = new Courier[](courierCount);
        for (uint256 i = 0; i < courierCount; i++) {
            ret[i] = couriers[i];
        }
        return ret;
    }

    function getItems() public returns (Item[] memory) {
        Item[] memory ret = new Item[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
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
            0,
            msg.sender,
            address(0),
            address(0),
            false,
            false,
            false
        );
        itemCount++;
        emit ItemCreated(
            itemCount,
            _name,
            _description,
            _price,
            0,
            msg.sender,
            address(0),
            address(0),
            false,
            false,
            false
        );
    }

    function purchaseItem(uint256 _id) public payable {
        // fetch the item
        Item memory _item = items[_id];
        require(
            msg.value >= _item.price,
            "there must be enough ether on message sent"
        );
        require(
            _item.id >= 0 && _item.id <= itemCount,
            "item must have a valid id"
        );
        require(!_item.purchased, "item does not have to be purchased before");
        require(_item.owner != msg.sender, "seller cannot buy its own item");
        _item.purchased = true;
        _item.price = msg.value;
        _item.buyer = msg.sender;
        items[_id] = _item;
    }

    function setPurchaseFee(uint256 _id, uint256 percentage) public {
        Item memory _item = items[_id];
        _item.fee = (_item.price * percentage) / 100;
        _item.courier = msg.sender;
        _item.transit = true;
        items[_id] = _item;
    }

    function verifyPurchase(uint256 _id) public payable {
        Item memory _item = items[_id];
        require(msg.sender == _item.buyer, "msg.sender must be item buyer");
        require(
            _item.purchased && !_item.verified,
            "item must be purchased but not verified"
        );
        require(_item.price >= 0, "item price must be unsigned integer");
        uint256 cid = getCourierIdByAddress(_item.courier);
        Courier memory _itemCourier = couriers[cid];
        _itemCourier.reputation++;
        couriers[cid] = _itemCourier;
        _item.purchased = true;
        _item.verified = true;
        _item.transit = false;
        items[_id] = _item;
        _item.owner.transfer(_item.price - _item.fee);
        _item.courier.transfer(_item.fee);
    }

    function cancelPurchase(uint256 _id) public payable {
        Item memory _item = items[_id];
        require(msg.sender == _item.buyer, "only buyer can cancel purchase");
        require(_item.purchased && !_item.verified, "item must be purchased");
        _item.purchased = false;
        address payable target = _item.buyer;
        uint256 cid = getCourierIdByAddress(_item.courier);
        Courier memory _itemCourier = couriers[cid];
        _itemCourier.reputation--;
        couriers[cid] = _itemCourier;
        target.transfer(_item.price);
        _item.buyer = address(0);
        _item.transit = false;
        items[_id] = _item;
    }

    function deleteItem(uint256 _id) public {
        Item memory _item = items[_id];
        require(msg.sender == _item.owner, "only owner can delete the item");
        require(!_item.purchased, "item does not have to be purchased");
        delete items[_id];
    }
}
