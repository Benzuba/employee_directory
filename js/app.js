
let employees = [];
$('.darken').hide();
$('.modal').hide();

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {
    employees = data.results;
    let userhtml = '';
    $.each(employees, function(i, user){
          userhtml += '<div class="item" id="'+i+'">';
          userhtml += '<img class="img" src = "'+user.picture.medium+'"">';
          userhtml += '<p class="name"> '+capFirst(user.name.first)+' '+ capFirst(user.name.last)+'</p>';
          userhtml += '<p class="email">'+user.email+'</p>';
          userhtml += '<p class="city">'+capFirst(user.location.city)+'</p>';
          userhtml += '</div>';
    });// end .each
          $('.container').html(userhtml);
    $('.item').click(function(){
      let employeeId = this.getAttribute('id');
      let employee = employees[employeeId];
      let date = employee.dob;
      date = new Date(date);
      let employeehtml = '';
          employeehtml += '<img class="modal-img" src ="'+employee.picture.large+'">';
          employeehtml += '<p class="name"> '+capFirst(employee.name.first)+' '+ capFirst(employee.name.last)+'</p>';
          employeehtml += '<p class="email">'+employee.login.username+'</p>';
          employeehtml += '<p class="email">'+employee.email+'</p>';
          employeehtml += '<hr/>';
          employeehtml += '<p class="email">'+employee.cell+'</p>';
          employeehtml += '<p class="email">'+capFirst(employee.location.street)+' '+capFirst(employee.location.city)+' , '+employee.location.state.toUpperCase()+' '+employee.location.postcode+' </p>';
          employeehtml += '<p class="email">Birthday: '+formatDate(date)+'</p>';
          $('.modal').html(employeehtml);
          $('.modal').show();
          $('.darken').show();
    });//end click
  }// end callback
}); //end ajax
$('.darken').click(function(){
  $('.darken').hide();
  $('.modal').hide();
});

function capFirst(str){ //capitalize the first letter in strings for cities, names, and streets
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function formatDate(value){ //format birthdate
   return value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear();
}

//search

$('input').keyup(function(){
  let input = this.value.toLowerCase();
  $.each($('.item'),function(i, user){
    let itemName = $(user).children('.name').text().toLowerCase();
    if (itemName.includes(input)){
      $(user).show();
    } else {$(user).hide()};
  }); //end .each
});
