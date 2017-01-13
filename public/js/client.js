 $(document).ready(function () {
 
  $('#team_input').on('submit', function (event) {
       //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
        event.preventDefault();
    var bTeams = $("#team_name").val();
        console.log("bteams",bTeams);
        
    
    $.ajax({
            type:"GET",
            url:"/team/"+bTeams,
            dataType:'json'
        })
        .done(function (result) { //this waits for the ajax to return with a succesful promise object
           console.log("client js line 16", result);
        })
       .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
  });
        
 });