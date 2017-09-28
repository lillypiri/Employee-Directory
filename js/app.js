(function() {
    var modal = document.getElementById('myModal');
    var modalContent = document.querySelector('.modal-content');
    var usercard = document.querySelectorAll('.item');

    var URL = "https://randomuser.me/api/?results=12";

    var state = {
        users: [],
        isModal: false,
        modalUserIndex: 0
    };

    // Load data from a URL and then pass it to the callback
    function loadUrl(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onload = function() {
            if (xhr.readyState === xhr.DONE) {
                var jsonResponse = JSON.parse(xhr.response).results;
                callback(jsonResponse);
            } else {
                console.log("Not ready yet.");
            }
        };

        xhr.open("GET", url);
        xhr.send();
    }

    // Only renders stuff
    function render() {
        if (state.isModal) {
            document.body.style.overflow = 'hidden';

            var user = state.users[state.modalUserIndex];

            // Make the date of birth human readable
            var d = user.dob.slice(0, 10).split('-');

            modalContent.innerHTML =
                `<div>
                <span id="close" class="close">&times</span>
                <img src="${user.picture.large}" class="profile-picture-modal">
                </div>
                <div class="user-card-modal">
                    <strong>${user.name.first} ${user.name.last}</strong>
                    <div>${user.login.username}</div>
                    <div class="email">${user.email}</div>
                    <hr/>
                    <div>${user.phone}</div>
                    <div>${user.location.street}, ${user.location.city}, ${user.location.postcode}, ${user.nat}</div>\
                    <div>Birthday:  ${d[1]}/${d[2]}/${d[0]}</div>
                    <hr/>
                    <div><span class="previous">&larr; previous     |</span>
                    <span class="next">next &rarr;</div>
                </div>`
            // Close the modal
            modalContent.querySelector('.close').addEventListener('click', function(event) {
                state.isModal = false;
                render();
            });

            // Previous user 
            modalContent.querySelector('.previous').addEventListener('click', function(event) {
                if (state.modalUserIndex === 0) {
                    state.modalUserIndex = state.users.length - 1;
                } else {
                    state.modalUserIndex --;
                }
                render();
            });

            // Next user
            modalContent.querySelector('.next').addEventListener('click', function(event) {
                if (state.modalUserIndex === state.users.length - 1) {
                    state.modalUserIndex = 0;
                } else {
                    state.modalUserIndex ++;
                }
                render();
            });

            modal.style.display = "block";
        } else {
            document.body.style.overflow = '';
            modal.style.display = "none";
        }
    }


    function init() {
        // Load the users
        loadUrl(URL, function(users) {
            // Save the list of users for rendering
            state.users = users;

            // Build the DOM
            users.forEach(function(user, index) {
                var item = document.querySelector(".item-" + (index + 1));
                item.setAttribute("data-index", index);
                item.innerHTML =
                    `<div class="user-card">
                        <img src="${user.picture.medium}" class="profile-picture">
                        <div>
                            <strong>${user.name.first} ${user.name.last}</strong>
                            <div class="email">${user.email}</div>
                            <div>${user.location.city}</div>
                        </div>
                    </div>`;
                item.addEventListener('click', function (event) {
                    state.isModal = true;
                    state.modalUserIndex = index;
                    render();
                });
            });
        });
    }




    init();
})();
