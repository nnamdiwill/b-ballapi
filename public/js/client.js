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
           displayResults(result);
        })
       .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
  });
  function displayResults(result){
   
   console.log(result);
   
    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "";

    $.each(result, function (resultKey, resultValue) {

        //create and populate one LI for each of the results
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + resultValue.team_name + "</p>"; 
        buildTheHtmlOutput += "<p>" + resultValue.city + "</p>"; 
        buildTheHtmlOutput += "<p>" + resultValue.abbreviation + "</p>"; 
               
        buildTheHtmlOutput += "</li>";
    });
   $(".team-names-result ul").html(buildTheHtmlOutput);
  }
        
 });