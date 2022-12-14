let petIndex = 0;
let petsData = [];

window.addEventListener('DOMContentLoaded', (event) => {
    const petCorouselElement = document.getElementById("pet-carousel-adopted");
    const petNameElement = document.getElementById("pet-name-adopted");
    const petAgeElement = document.getElementById("pet-age");
    const petBreedElement = document.getElementById("pet-breed");
    const petLocationElement = document.getElementById("pet-location");
    const petAdoptionStatusElement = document.getElementById("pet-adoption-status");
    const petWhatsAppElement = document.getElementById("pet-whatsapp");
    const sharePetWhatsAppElement = document.getElementById("share-pet-link");

    const beforeButton = document.getElementById("button-before");
    const nextButton = document.getElementById("button-next");

    const pageLoader = document.getElementById("pageloader");

    function loadPet(index) {
        const currentPet = petsData[index];
        petCorouselElement.setAttribute('src', currentPet['photos'][0]);
        petNameElement.innerHTML = currentPet['name'];
        petAgeElement.innerHTML = currentPet['age'];
        petBreedElement.innerHTML = currentPet['breed'];
        petLocationElement.innerHTML = currentPet['location'];
        petAdoptionStatusElement.innerHTML = currentPet['status'];
        petWhatsAppElement.href = 'https://wa.me/' + currentPet['whatsapp'] + '?text=Hi%20I\'m%20interested%20in%20adopting%20' + currentPet['name'];
    }

    function changeIndex(i) {
        if (petIndex + i < 0) {
            petIndex = petsData.length - 1;
        } else if (petIndex + i >= petsData.length) {
            petIndex = 0;
        } else {
            petIndex = petIndex + i;
        }
        loadPet(petIndex);
    }

    // it obtains the query parameter 'type'. example: dog or cat
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let petType = params.type;

    // it obtains the query parameter 'id'
    let petId = parseInt(params.id);

    // load the first pet
    fetch('https://shelterpet-api.herokuapp.com/pets/').then(response => {
        return response.json();
    }).then(jsonData => {
        // hide pageloader
        pageLoader.style.display = "none";

        if (petType == null) {
            petsData = jsonData;
        } else {
            petsData = jsonData.filter(pet => pet.type == petType);

            // changes the active link on the navigation bar
            const navItems = document.querySelectorAll('.nav__link');

            navItems[1].classList.remove('active-link');

            if (petType == 'dog') {
                navItems[2].classList.add('active-link');
            } else if (petType == 'cat') {
                navItems[3].classList.add('active-link');
            }
        }
        
        if (Number.isInteger(petId)) {
            petIndex = petsData.findIndex(pet => pet.id === petId);
        }

        loadPet(petIndex);
    });

    nextButton.onclick = function () {
        changeIndex(1);
    };

    beforeButton.onclick = function () {
        changeIndex(-1);
    };

    sharePetWhatsAppElement.onclick = function () {
        sharePetWhatsAppElement.href = `https://wa.me/?text=Check ${petsData[petIndex]['name']} on Shelter-Pet App https://rodcar.github.io/shelter-pet-tinder-front-end/adoption.html?id=${petsData[petIndex]['id']}`
        sharePetWhatsAppElement.setAttribute("data-action", "share/whatsapp/share")
    }
});