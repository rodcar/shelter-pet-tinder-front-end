window.addEventListener('DOMContentLoaded', (event) => {
    const signInButton = document.getElementById("sign-in-button");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("err-message");    

    const signUpButton = document.getElementById("sign-up");
    const loginUpForm = document.getElementById("login-up");
    const loginInForm = document.getElementById("login-in");
    const signInButtonReturn = document.getElementById("sign-in");

    function showErrorMessage(text) {
        errorMessage.innerText = text;
    }

    function hideErrorMessage() {
        errorMessage.innerText = "";
    }

    function showErrorFocus(e) {
        e.closest(".login__box").classList.add("error-focus");
    }

    function hideErrorFocus(e) {
        e.closest(".login__box").classList.remove("error-focus");
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    signInButton.onclick = function() {
        hideErrorMessage();
        hideErrorFocus(emailInput);
        hideErrorFocus(passwordInput);

        // validation
        if (emailInput.value.trim() == "") {
            emailInput.focus();
            showErrorFocus(emailInput);
            showErrorMessage("The email is empty");
            return;
        }

        if (!validateEmail(emailInput.value.trim())) {
            emailInput.focus();
            showErrorFocus(emailInput);
            showErrorMessage("It isn't a email");
            return;            
        }

        if (passwordInput.value.trim() == "") {
            passwordInput.focus();
            showErrorFocus(passwordInput);
            showErrorMessage("The password is empty");
            return;
        }

        if (passwordInput.value.trim().length < 8) {
            passwordInput.focus();
            showErrorFocus(passwordInput);
            showErrorMessage("The password is not valid");
            return;
        }

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
                console.log(data);
                errorMessage.innerText = data.message.replace("Error -> ", "");
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

    // Sign Up Elements
    const signUpSubmitButton = document.getElementById("sign-up-submit");
    const signUpFullNameInput = document.getElementById("sign-up-fullname");
    const signUpEmailInput = document.getElementById("sign-up-email");
    const signUpPhoneInput = document.getElementById("sign-up-phone");
    const signUpPasswordInput = document.getElementById("sign-up-password");
    
    signUpSubmitButton.onclick = () => {
        const payload = {
            "email": signUpEmailInput.value,
            "name": signUpFullNameInput.value,
            "password": signUpPasswordInput.value,
            "phone": signUpPhoneInput.value
          };

        fetch("https://shelterpet-api.herokuapp.com/auth/signup", {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.status == 200) {
                window.open("index.html", "_self");
                return;
            }
            return response.json();
        }).then(data => {            
            if (data.hasOwnProperty('accessToken')) {
                // save accessToken into LocalStorage
                //localStorage.setItem("accessToken", data.accessToken);
                
                // redirect to index
                window.open("index.html", "_self");
            } else {
                // show error message
                console.log(data);
            }            
        }).catch(function(err) {
            console.log(err);
        });
    };
});

/*===== LOGIN SHOW and HIDDEN =====*/
