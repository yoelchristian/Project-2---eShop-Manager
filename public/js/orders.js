$(document).ready(function() {
    $.get("/api/orders", function(data) {
        var grouped = _(data)
                    .groupBy(x => x.createdAt)
                    .map()
                    .value();

        for(var i = 0; i < grouped.length; i ++) {
            var orderTotal = 0;
            for(var k = 0; k < grouped[i].length; k ++) {
                orderTotal += Number(grouped[i][k].orderedItemPriceTotal);
                var newTr = $("<tr>");
                if(k === 0) {
                    newTr.append("<td>" + grouped[i][0].createdAt);
                    newTr.append("<td>" + grouped[i][k].orderedItemName);
                    newTr.append("<td>" + grouped[i][k].orderedItemQty);
                    newTr.append("<td>" + grouped[i][k].orderedItemPrice);
                    newTr.append("<td>" + grouped[i][k].orderedItemPriceTotal);
                } else {
                    newTr.append("<td>")
                    newTr.append("<td>" + grouped[i][k].orderedItemName);
                    newTr.append("<td>" + grouped[i][k].orderedItemQty);
                    newTr.append("<td>" + grouped[i][k].orderedItemPrice);
                    newTr.append("<td>" + grouped[i][k].orderedItemPriceTotal);         
                }
                $("#orderEntry").append(newTr);
                
            }
           $("#orderEntry").append("<tr class='grey'><td><td><td><td class='right'>Total Order: <td>$ " + orderTotal.toFixed(2))
            
        }
    })
})