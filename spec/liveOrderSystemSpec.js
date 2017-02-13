var liveOrderSystem = require("../lib/liveOrderSystem");

var orderStatus= new liveOrderSystem.orderStatus();
var orderDirection= new liveOrderSystem.orderDirection();
var orderType= new liveOrderSystem.orderType();

var customer1= new liveOrderSystem.customer(1);
var customer2= new liveOrderSystem.customer(2);
var customer3= new liveOrderSystem.customer(3);
var customer4= new liveOrderSystem.customer(4);
var customer5= new liveOrderSystem.customer(5);




describe("live Order System Test", function(){
    describe("GET /", function() {
        it("should add order to the list", function() {

            //Arrange
            var orderBoard= new liveOrderSystem.orderBoard();
            var order1= new liveOrderSystem.order(1,customer1.id,orderStatus.new,3.5,306,orderType.sell);

            //Act
            orderBoard.addOrder(order1);

            //Assert
            expect (orderBoard.orders.length).toBe(1);
        });

        it("should remove order from the list", function() {

            //Arrange
            var orderBoard= new liveOrderSystem.orderBoard();
            var order1= new liveOrderSystem.order(1,customer1.id,orderStatus.new,3.5,306,orderType.sell);

            //Act
            orderBoard.addOrder(order1);
            orderBoard.cancelOrder(order1);

            //Assert
            expect (orderBoard.orders.length).toBe(0);
        });

        it("should sort the  price in ascending order", function() {

            //Arrange
            var order1= new liveOrderSystem.order(1,customer1.id,orderStatus.new,3.5,306,orderType.sell);
            var order2= new liveOrderSystem.order(2,customer2.id,orderStatus.new,1.2,310,orderType.sell);
            var order3= new liveOrderSystem.order(3,customer3.id,orderStatus.new,1.5,307,orderType.sell);
            var order4= new liveOrderSystem.order(4,customer4.id,orderStatus.new,2.0,306,orderType.sell);
            var orderBoard= new liveOrderSystem.orderBoard();

            orderBoard.addOrder(order1);
            orderBoard.addOrder(order2);
            orderBoard.addOrder(order3);
            orderBoard.addOrder(order4);


            //Act
           var sortedOrders =  orderBoard.sortOrder(orderBoard.orders,orderDirection.Asc);

            //Assert
            expect (sortedOrders[0].price).toBe(306);
            expect (sortedOrders[1].price).toBe(306);
            expect (sortedOrders[2].price).toBe(307);
            expect (sortedOrders[3].price).toBe(310);

        });

        it("should sort the  price in descending order", function() {

            //Arrange
            var order1= new liveOrderSystem.order(1,customer1.id,orderStatus.new,3.5,306,orderType.buy);
            var order2= new liveOrderSystem.order(2,customer2.id,orderStatus.new,1.2,310,orderType.sell);
            var order3= new liveOrderSystem.order(3,customer3.id,orderStatus.new,1.5,307,orderType.sell);
            var order4= new liveOrderSystem.order(4,customer4.id,orderStatus.new,2.0,306,orderType.sell);
            var orderBoard= new liveOrderSystem.orderBoard();

            orderBoard.addOrder(order1);
            orderBoard.addOrder(order2);
            orderBoard.addOrder(order3);
            orderBoard.addOrder(order4);


            //Act
            var sortedOrders =  orderBoard.sortOrder(orderBoard.orders,orderDirection.Desc);

            //Assert
            expect (sortedOrders[0].price).toBe(310);
            expect (sortedOrders[1].price).toBe(307);
            expect (sortedOrders[2].price).toBe(306);
            expect (sortedOrders[3].price).toBe(306);

        });

        it("same price should be merged together", function() {

            //Arrange
            var orderBoard= new liveOrderSystem.orderBoard();
            var order1= new liveOrderSystem.order(1,customer1.id,orderStatus.new,3.5,306,orderType.sell);
            var order2= new liveOrderSystem.order(2,customer2.id,orderStatus.new,1.2,310,orderType.sell);
            var order3= new liveOrderSystem.order(3,customer3.id,orderStatus.new,1.5,307,orderType.sell);
            var order4= new liveOrderSystem.order(4,customer4.id,orderStatus.new,2.0,306,orderType.sell);

            orderBoard.addOrder(order1);
            orderBoard.addOrder(order2);
            orderBoard.addOrder(order3);
            orderBoard.addOrder(order4);

            //Act
            var sortedOrders = orderBoard.mergeOrders(orderBoard.orders);


            //Assert
            expect (sortedOrders.length).toBe(3);
            expect (sortedOrders[0].quantity).toBe(5.5);

        });

        it("sell orders should match the requirement after sorting and merging ", function() {

            //Arrange
            var orderBoard= new liveOrderSystem.orderBoard();
            var order1= new liveOrderSystem.order(1,customer1.id,orderStatus.new,3.5,306,orderType.sell);
            var order2= new liveOrderSystem.order(2,customer2.id,orderStatus.new,1.2,310,orderType.sell);
            var order3= new liveOrderSystem.order(3,customer3.id,orderStatus.new,1.5,307,orderType.sell);
            var order4= new liveOrderSystem.order(4,customer4.id,orderStatus.new,2.0,306,orderType.sell);

            orderBoard.addOrder(order1);
            orderBoard.addOrder(order2);
            orderBoard.addOrder(order3);
            orderBoard.addOrder(order4);

            //Act
            orderBoard.orderBoard();
            var sortedOrders = orderBoard.sellOrders;


            //Assert
            expect (sortedOrders.length).toBe(3);
            expect (sortedOrders[0].quantity).toBe(5.5);
            expect (sortedOrders[1].quantity).toBe(1.5);
            expect (sortedOrders[2].quantity).toBe(1.2);

        });


    });
});

