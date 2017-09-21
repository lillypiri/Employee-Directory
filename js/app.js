var xhr = new XMLHttpRequest();

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

xhr.onload = function() {
    if (xhr.readyState === xhr.DONE) {
        var data = xhr.response;
        var jsonResponse = JSON.parse(data);

        jsonResponse.results.forEach(function(user, index) {
            var item = document.querySelector(".item-" + (index + 1));
            item.innerHTML = '\
                <div class="user-card">\
                    <img src="'+ user.picture.medium + '" class="profile-picture">\
                    <div>\
                        <strong>' + user.name.first + " " + user.name.last + '</strong>\
                        <div class="email">' + user.email + '</div>\
                        <div>' + user.location.city + '</div>\
                    </div>\
                </div>'
        });
    } else {
        console.log("Not ready yet.");
    }
};

xhr.open("GET", "https://randomuser.me/api/?results=12");

xhr.send();

var usercard = document.querySelectorAll('.item');

for (var i = 0; i < usercard.length; i++) {
    usercard[i].addEventListener("click", showModal)
}

function showModal() {
    console.log(event.target);
    modal.style.display = "block";
};

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
