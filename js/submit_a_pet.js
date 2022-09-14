let photoUploaded = "";

window.addEventListener('DOMContentLoaded', (event) => {
    const submitButton = document.getElementById("submit-a-pet-form");
    const fileInput = document.getElementById("addapic");

    const pageLoader = document.getElementById("pageloader");

    fileInput.addEventListener("change", ev => {
        //show pageloader
        pageLoader.style.display = "block";

        const formdata = new FormData()
        formdata.append("image", ev.target.files[0])
        fetch("https://api.imgur.com/3/image/", {
            method: "post",
            headers: {
                Authorization: "Client-ID ede26ae6aef60ba"
            },
            body: formdata
        }).then(data => data.json()).then(data => {
            // hide pageloader
            pageLoader.style.display = "none";            
            photoUploaded = data.data.link;
            console.log(photoUploaded);
        });
    });

    submitButton.addEventListener('submit', (e) => {
        e.preventDefault();

        if (photoUploaded == "") {
            console.log("The photo is empty");
            return;
        }

        //show pageloader
        pageLoader.style.display = "block";        

        let dataForm = (e.target || e.srcElement).elements;
        let payload = {
            age: dataForm['petsage'].value,
            bio: dataForm['bioinfo'].value,
            breed: dataForm['breed'].value,
            location: dataForm['location'].value,
            name: dataForm['petsname'].value,
            ownersName: dataForm['name'].value,
            phoneNumber: dataForm['phone'].value,
            photo: photoUploaded,
            status: 'Available',
            type: dataForm['type'].value
        };
        console.log(payload);

        //var requestDataForm = new FormData();
        //requestDataForm.append("json", JSON.stringify(payload));

        fetch("https://shelterpet-api.herokuapp.com/pets/", {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(payload)
        }).then(response => {            
            if (response.status == 201) {
                // hide pageloader
                pageLoader.style.display = "none";
                window.open("submit_a_pet_post_message.html", "_self");
            }
            console.log(response);
        });
    });
});