window.addEventListener('DOMContentLoaded', (event) => {
    const signInButton = document.getElementById("sign-in-button");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const signUpButton = document.getElementById("sign-up");
    const loginUpForm = document.getElementById("login-up");
    const loginInForm = document.getElementById("login-in");
    const signInButtonReturn = document.getElementById("sign-in");

    signInButton.onclick = function() {
        const payload = {
            "email": emailInput.value,
            "password": passwordInput.value
        };

        fetch("https://shelterpet-api.herokuapp.com/auth/signin", {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(payload)
        }).then(response => {
            return response.json();
        }).then(data => {            
            if (data.hasOwnProperty('accessToken')) {
                // save accessToken into LocalStorage
                //localStorage.setItem("accessToken", data.accessToken);
                
                // redirect to index
                window.open("index.html", "_self");
            } else {
                // show error message
            }            
        }).catch(function(err) {
            console.log(err);
        });
    };

    signUpButton.onclick = () => {
        loginUpForm.style.display = "block";
        loginInForm.style.display = "none";
    };

    signInButtonReturn.onclick = () => {
        loginUpForm.style.display = "none";
        loginInForm.style.display = "block";        
    };
});

/*===== LOGIN SHOW and HIDDEN =====*/
