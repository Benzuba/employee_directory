
$('.darken').hide();
$('.modal').hide();
let length = 0;


$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {
    employees = data.results;
    length = employees.length;
    length -= 1;
    let userhtml = '';
    $.each(employees, function(i, user){
          userhtml += '<div class="item" id="'+i+'">'; //give each employee unique ID number to use in modal window
          userhtml += '<img class="img" src = "'+user.picture.medium+'"">';
          userhtml += '<p class="name"> '+capFirst(user.name.first)+' '+ capFirst(user.name.last)+'</p>';
          userhtml += '<p class="email">'+user.email+'</p>';
          userhtml += '<p class="city">'+capFirst(user.location.city)+'</p>';
          userhtml += '</div>';
    });// end .each
          $('.container').html(userhtml);
    $('.item').click(function(){
      let employeeId = parseInt(this.getAttribute('id')); //store value of click event "ID"
      let employee = employees[employeeId]; //user ID is index for employees array
      buildModal(employee, employeeId);


    });//end click
  }// end callback
}); //end ajax
$('.darken').click(function(){ //area outside modal closes modal
  $('.darken').hide();
  $('.modal').hide();
});

function switchModal(employee, employeeId){
  if (employeeId === 0){ //if at user index 0 hide prev button
    $('.prev').css('opacity', '0');
  }
  if (employeeId === length){ //if at user index 11 hide next button
    $('.next').css('opacity', '0');
  }
  $('.prev').click(function(){
    if (employeeId === 0){ //if user clicks "hiden" prev button hide modal and darken
      $('.modal').hide();
      $('.darken').hide();
    };
    employeeId -= 1;
    employee = employees[employeeId];
    $('.modal').hide();
    buildModal(employee, employeeId);
  }); // end prev
  $('.next').click(function(){
    if (employeeId === length){ //if user clicks "hiden" next button hide modal and darken
      $('.modal').hide();
      $('.darken').hide();
    };
    employeeId += 1;
    employee = employees[employeeId];
    $('.modal').hide();
    buildModal(employee, employeeId);
  }); // end prev
}

// build modal with parameter employee
function buildModal(employee, employeeId){
  let employeehtml = ''; //begin html string to inject into modal window
      employeehtml += '<a class="prev"></a>';
      employeehtml += '<a class="next"></a>';
      employeehtml += '<img class="modal-img" src ="'+employee.picture.large+'">';
      employeehtml += '<p class="name"> '+capFirst(employee.name.first)+' '+ capFirst(employee.name.last)+'</p>';
      employeehtml += '<p class="email">'+employee.login.username+'</p>';
      employeehtml += '<p class="email">'+employee.email+'</p>';
      employeehtml += '<hr/>';
      employeehtml += '<p class="email">'+employee.cell+'</p>';
      employeehtml += '<p class="email">'+capFirst(employee.location.street)+' '+capFirst(employee.location.city)+' , '+employee.location.state.toUpperCase()+' '+employee.location.postcode+' </p>';
      employeehtml += '<p class="email">Birthday: '+formatDate(new Date(employee.dob))+'</p>';
      $('.modal').html(employeehtml);
      $('.modal').show();
      $('.darken').show();
      switchModal(employee, employeeId);
};//end buildModal

function capFirst(str){ //capitalize the first letter in strings for cities, names, and streets
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function formatDate(value){ //format birthdate
   return value.getMonth()+1 + "/" + value.getDate() + "/" + value.getYear();
}

//search

$('input').keyup(function(){
  let input = this.value.toLowerCase(); //store value of user search input
  $.each($('.item'),function(i, user){
    let itemName = $(user).children('.name').text().toLowerCase(); //store value insude class "name" for each user
    if (itemName.includes(input)){ //compare input string userName
      $(user).show();
    } else {$(user).hide()};
  }); //end .each
});
