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

    const beforeButton = document.getElementById("button-before");
    const nextButton = document.getElementById("button-next");

    function loadPet(index) {
        const currentPet = petsData[index];
        petCorouselElement.setAttribute('src', currentPet['photos'][0]);
        petNameElement.innerHTML = currentPet['name'];
        petAgeElement.innerHTML = currentPet['age'];
        petBreedElement.innerHTML = currentPet['breed'];
        petLocationElement.innerHTML = currentPet['location'];
        petAdoptionStatusElement.innerHTML = currentPet['status'];
        petWhatsAppElement.href = 'https://wa.me/' + currentPet['whatsapp'] + '?text=Hi%20I\'m%20interesed%20in%20adopting%20' + currentPet['name'];
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

    // load the first pet
    fetch('https://rodcar.github.io/shelter-pet-tinder-front-end/data/pets.json').then(response => {
        return response.json();
    }).then(jsonData => {
        petsData = jsonData;
        loadPet(petIndex);
    });

    nextButton.onclick = function() {
        changeIndex(1);
    };

    beforeButton.onclick = function() {
        changeIndex(-1);
    };
});