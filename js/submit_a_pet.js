let photoUploaded = "";

// function that convert a file into base64
const fileDataURL = file => new Promise((resolve,reject) => {
    let fr = new FileReader();
    fr.onload = () => resolve( fr.result);
    fr.onerror = reject;
    fr.readAsDataURL(file)
});

window.addEventListener('DOMContentLoaded', (event) => {
    const submitButton = document.getElementById("submit-a-pet-form");
    const fileInput = document.getElementById("addapic");

    fileInput.addEventListener("change", function({target}){
        if (target.files && target.files.length) {
            fileDataURL(target.files[0]).then( data => { 
                photoUploaded = data; 
                console.log(data);
            }).catch(err => console.log(err));
        }
    });

    submitButton.addEventListener('submit', (e) => {
        e.preventDefault();

        let dataForm = (e.target || e.srcElement).elements;
        let payload = {
            age: dataForm['petsage'].value,
            bio: dataForm['bioinfo'].value,
            breed: dataForm['breed'].value,
            location: dataForm['location'].value,
            name: dataForm['petsname'].value,
            ownersName: dataForm['name'].value,
            phoneNumber: dataForm['petsage'].value,
            photo: 'null',
            status: 'Available',
            type: dataForm['type'].value
        };

        if (photoUploaded != "") {
            let formData = new FormData();
            formData.append('key', '6d207e02198a847aa98d0a2a901485a5');
            formData.append('format', 'json');
            formData.append('source', photoUploaded);

            const myRequest = new Request('https://freeimage.host/api/1/upload', {
                method: 'POST',
                body: formData
            });

            fetch(myRequest)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            });
        } else {
            console.log("The photo is empty");
        }
        console.log(payload);
    });
});