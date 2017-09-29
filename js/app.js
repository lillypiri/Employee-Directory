(function() {
    var modal = document.getElementById('myModal');
    var modalContent = document.querySelector('.modal-content');
    var usercard = document.querySelectorAll('.item');
    var searchBox = document.querySelector('.search-box');

    searchBox.innerHTML =
        `<input class="input" placeholder="Start typing.."/><button>🔎</button>`

    var searchInput = document.querySelector('.input');

    var URL = "https://randomuser.me/api/?results=12";

    var state = {
        users: [],
        filteredUsers: [],
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

            var user = state.filteredUsers[state.modalUserIndex];
            console.log("user is", user);

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
                    state.modalUserIndex = state.filteredUsers.length - 1;
                } else {
                    state.modalUserIndex --;
                }
                render();
            });

            // Next user
            modalContent.querySelector('.next').addEventListener('click', function(event) {
                if (state.modalUserIndex === state.filteredUsers.length - 1) {
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

        // Hide all users first
        state.users.forEach(function (user) {
            user.element.style.setProperty('display', 'none');
        });

        // Only show the ones that are on the filtered list
        state.filteredUsers.forEach(function (user) {
            user.element.style.setProperty('display', 'block')
        });
    }


    function init() {
        // Load the users
        loadUrl(URL, function(users) {
            // Save the list of users for rendering
            state.users = users.map(function(user, index) {
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

                // Remember the element
                user.element = item;

                return user;
            });
        });

        searchInput.addEventListener('keyup', function(event) {
            var q = event.target.value.toLowerCase();
            console.log(q)
            state.filteredUsers = state.users.filter(function(user) {
                return user.name.first.toLowerCase().indexOf(q) > -1;
            });
            if (q === "") {
                state.filteredUsers = state.users
            }

            render();
        });
    }
    init();
})();
