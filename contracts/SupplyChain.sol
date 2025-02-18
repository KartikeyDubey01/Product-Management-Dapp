// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        uint timestamp;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    function addProduct(string memory _name, uint _price) public {
        productCount++;
        products[productCount] = Product(productCount, _name, _price, msg.sender, block.timestamp);
    }

    function transferProduct(uint _productId, address _newOwner) public {
        Product storage product = products[_productId];
        require(msg.sender == product.owner, "Only the owner can transfer the product");
        product.owner = _newOwner;
    }

    function getProduct(uint _productId) public view returns (string memory, uint, address, uint) {
        Product memory product = products[_productId];
        return (product.name, product.price, product.owner, product.timestamp);
    }
}
