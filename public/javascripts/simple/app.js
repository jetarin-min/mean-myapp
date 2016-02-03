$(function(){
    function getdata(){
        $.get('/simple_api/contact', function(data){
            console.log(data.data);
            render(data.data);
        });
    }

    function render(data){
        console.log("DATA");
        console.log(data);
        $("#contact-table tbody").html(""); //clear data

        var source = $("#contact-template").html();
        console.log("SOURCE");
        console.log(source);
        var template = Handlebars.compile(source);
        console.log("TEMPLATE");
        console.log(template);
        var html = template(data);
        $("#contact-table tbody").append(html);
    }

    $("#add-btn").click( function(e){
        var obj = {
            name: $("#name-input").val(),
            email: $("#email-input").val(),
            phone: $("#phone-input").val(),
        }
        console.log("ADD:"+obj.name+" "+obj.email+" "+obj.phone);
        $.post('/simple_api/contact', obj, function(data){
            if(data.success){
                getdata();
                $("#name-input").val("");
                $("#email-input").val("");
                $("#phone-input").val("");
            }
            else{
                alert("Something went wrong!!!");
            }
        }); 
    });

    getdata();
});
