// SPDX-License-Identifier : MIT
pragma solidity ^0.8.0;

contract ShipmentContract {
    address public owner;
    
    enum OrderStatus { NoOrdersPlaced, Shipped, Delivered }
    
    struct Order {
        // address customerAddress;
        uint customerID;
        uint pin;
        OrderStatus status;
    }
    
    mapping(uint => Order) public orders; 
    // #customerid and order
    mapping(uint => uint) public completedDeliveries;
    //Customerid and number of orders
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can access this function");
        _;
    }
    //helper function only when this is true the other functions will run
    
    constructor() {
        owner = msg.sender;
    }
    
    function shipWithPin(uint _customerID, uint _pin) public onlyOwner {
        require(_pin >= 999 && _pin <= 9999, "Invalid PIN, must be between 999 and 9999");
        require(orders[_customerID].status != OrderStatus.Shipped, "An order is already shipped to this address");
        
        orders[_customerID] = Order(_customerID, _pin, OrderStatus.Shipped);
    }
    
    function acceptOrder(uint _customerID,uint _pin) public {
        require(orders[_customerID].status == OrderStatus.Shipped, "No order to accept");
        require(orders[_customerID].pin == _pin, "Invalid PIN");
        
        orders[_customerID].status = OrderStatus.Delivered;
        completedDeliveries[_customerID]++;
        
    }
    
    function checkStatus(uint _customerID) public view returns (string memory) {
        if (orders[_customerID].status == OrderStatus.NoOrdersPlaced) {
            return "no orders placed";
        } else if (orders[_customerID].status == OrderStatus.Shipped) {
            return "shipped";
        } else {
            return "delivered";
        }
    }
    
    function totalCompletedDeliveries(uint _customerID) public view returns (uint) {
        return completedDeliveries[_customerID];
    }
}
