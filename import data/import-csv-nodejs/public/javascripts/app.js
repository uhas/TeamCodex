$(function(){
   
    /** Click on Fetch data and display in HTML table **/

    $("#fetchdata").on('click', function(){

        $.get( "/fetchdata", function( data ) {

            var products = data['data'];

            $("#trdata").html('');

            $("#message").hide();

            var string = '';

            $.each(products, function(index, product ) {

                string += '<tr><td>'+(index+1)+'</td><td>'+product['_id']+'</td><td>'+product['name']+'</td><td>'+product['category']+'</td><td>'+product['price']+'</td><td>'+product['manufacturer']+'</td></tr>';

            });

            $("#trdata").html(string);

        });
    });
 
    /** Import data after click on a button */

    $("#importdata").on('click', function(){

        $.get( "/import", function( data ) {

            $("#message").show().html(data['success']);

        });

    });

});