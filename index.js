"use strict";
var events = require('events');
var liveOrderSystem = require("./lib/liveOrderSystem");

var eventEmitter = new events.EventEmitter();

var orderStatus= new liveOrderSystem.orderStatus();
var orderBoard= new liveOrderSystem.orderBoard();
var orderType= new liveOrderSystem.orderType();

var customer1= new liveOrderSystem.customer(1);
var customer2= new liveOrderSystem.customer(2);
var customer3= new liveOrderSystem.customer(3);
var customer4= new liveOrderSystem.customer(4);
var customer5= new liveOrderSystem.customer(5);
var customer6= new liveOrderSystem.customer(6);
var customer7= new liveOrderSystem.customer(7);


var order1= new liveOrderSystem.order(1,customer1.id,orderStatus.new,3.5,306,orderType.sell);
var order2= new liveOrderSystem.order(2,customer2.id,orderStatus.new,1.2,310,orderType.sell);
var order3= new liveOrderSystem.order(3,customer3.id,orderStatus.new,1.5,307,orderType.sell);
var order4= new liveOrderSystem.order(4,customer4.id,orderStatus.new,2.0,306,orderType.sell);
var order5= new liveOrderSystem.order(5,customer5.id,orderStatus.new,3.1,309,orderType.buy);
var order6= new liveOrderSystem.order(6,customer6.id,orderStatus.new,4.2,308,orderType.buy);
var order7= new liveOrderSystem.order(7,customer6.id,orderStatus.new,4.2,311,orderType.buy);

orderBoard.on('updateLiveBoard', orderBoard.orderBoard);

orderBoard.addOrder(order1)
orderBoard.addOrder(order2);
orderBoard.addOrder(order3);
orderBoard.addOrder(order4);
orderBoard.addOrder(order5)
orderBoard.addOrder(order6);
orderBoard.addOrder(order7);

orderBoard.displayBoard();



