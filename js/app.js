var xhr = new XMLHttpRequest();

var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var modalContent = document.querySelector('.modal-content');

xhr.onload = function() {
    if (xhr.readyState === xhr.DONE) {
        var data = xhr.response;
        var jsonResponse = JSON.parse(data);

        jsonResponse.results.forEach(function(user, index) {
            var d = user.dob.slice(0, 10).split('-');
            var item = document.querySelector(".item-" + (index + 1));
            item.setAttribute("data-index", index);
            item.addEventListener("click",function (e) {

                console.log("modal content", modalContent);
                modalContent.innerHTML =
                '<div>\
                <img src="' + user.picture.large + '" class ="profile-picture-modal">\
                </div>\
                <div class="user-card-modal">\
                    <strong>' + user.name.first + " " + user.name.last + '</strong>\
                    <div class="email">' + user.email + '</div>\
                    <div>' + user.location.city + '</div>\
                    <hr/>\
                    <div>' + user.phone + '</div>\
                    <div>' + user.location.street + ", " + user.location.city + ", " + user.location.postcode + '</div>\
                    <div>' + "Birthday: " + d[1] +'/'+ d[2] +'/'+ d[0]; + '</div>\
                </div>'
                item.getAttribute("data-index");
                console.log(e.target);
                showModal();
            });
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

function showModal() {
    var data = xhr.response;
    var jsonResponse = JSON.parse(data);
    // console.log(xhr.response);
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
