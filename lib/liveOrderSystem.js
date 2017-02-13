module.exports = (function () {
   'use strict';

    var sortBy = require('sort-by');
    var events = require('events');
    var clone = require('clone');

    var orderDirection = function () {
        this.Asc = "Asc";
        this.Desc = "Desc";
    };

    var direction = new orderDirection();

    var customer = function (id) {
        this.id = id;
    };

    var order = function (orderid,customerId, orderStatus, quantity, price, orderType) {
        this.orderid = orderid;
        this.customerid = customerId;
        this.orderStatus = orderStatus;
        this.orderType = orderType;
        this.quantity = quantity;
        this.price = price;
    };

    var orderStatus = function () {
        this.new = 0;
        this.cancelled = 1;
    }

    var orderType = function () {
        this.buy = "buy";
        this.sell = "sell";
    };

    var orderBoard = function () {
        this.orders = new Array();
        this.buyOrders = new Array();
        this.sellOrders = new Array();
        events.EventEmitter.call(this);

    };
    orderBoard.prototype = Object.create(events.EventEmitter.prototype);

    orderBoard.prototype.addOrder = function (order) {
        this.orders.push(order);
        this.emit('updateLiveBoard');
    };

    orderBoard.prototype.cancelOrder = function (order) {
        var index = this.orders.indexOf(order);
        if (index != -1)
            this.orders.splice(index, 1);
        this.emit('updateLiveBoard');
    };

    orderBoard.prototype.sortOrder = function (orders,sortDirection) {
        if (sortDirection === direction.Asc)
            orders.sort(sortBy('price'));
        else
            orders.sort(sortBy('-price'));
        return orders;
    };

    orderBoard.prototype.mergeOrders = function (merge) {
        var sum = [];
        merge.forEach(function (order) {
            var existing = sum.filter(function (nextOrder) {
                return nextOrder.price === order.price
            })[0];
            if (!existing)
                sum.push(order);
            else
                existing.quantity += order.quantity;
        });
        return sum;
    };

    orderBoard.prototype.orderBoard = function () {

        var type = new orderType();
        var orders = clone( this.orders);

        var sellOrders = orders.filter(function (order) {
            return order.orderType ===type.sell;
        });
        sellOrders = this.sortOrder(sellOrders,direction.Asc);
        sellOrders = this.mergeOrders(sellOrders);

        var buyOrders = orders.filter(function (order) {
            return order.orderType ===type.buy;
        });
        buyOrders = this.sortOrder(buyOrders,direction.Desc);
        buyOrders = this.mergeOrders(buyOrders);

        this.buyOrders = buyOrders;
        this.sellOrders = sellOrders;

    }

    orderBoard.prototype.displayBoard = function () {
        console.log("\n----------Sell Order----------------\n")
        for (var i = 0; i < this.sellOrders.length; i++) {
            console.log(this.sellOrders[i].orderType + ":", this.sellOrders[i].quantity + " for " + this.sellOrders[i].price);
        }

        console.log("\n----------Buy Order----------------\n")
        for (var i = 0; i < this.buyOrders.length; i++) {
            console.log(this.buyOrders[i].orderType + ":", this.buyOrders[i].quantity + " for " + this.buyOrders[i].price);
        }
    }

    return {
        customer: customer,
        order: order,
        orderStatus: orderStatus,
        orderDirection: orderDirection,
        orderType: orderType,
        orderBoard: orderBoard
    };
}());

