window.addEventListener('DOMContentLoaded', (event) => {
    const signInButton = document.getElementById("sign-in-button");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("err-message");    

    const signUpButton = document.getElementById("sign-up");
    const loginUpForm = document.getElementById("login-up");
    const loginInForm = document.getElementById("login-in");
    const signInButtonReturn = document.getElementById("sign-in");
    const pageLoader = document.getElementById("pageloader");

    function showErrorMessage(text) {
        errorMessage.innerText = text;
    }

    function hideErrorMessage() {
        errorMessage.innerText = "";
    }

    function showErrorFocus(e) {
        e.focus();
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
            showErrorFocus(emailInput);
            showErrorMessage("The email is empty");
            return;
        }

        if (!validateEmail(emailInput.value.trim())) {
            showErrorFocus(emailInput);
            showErrorMessage("The email is not valid");
            return;            
        }

        if (passwordInput.value.trim() == "") {
            showErrorFocus(passwordInput);
            showErrorMessage("The password is empty");
            return;
        }

        if (passwordInput.value.trim().length < 8) {
            showErrorFocus(passwordInput);
            showErrorMessage("The password is not valid");
            return;
        }

        //show pageloader
        pageLoader.style.display = "block";  

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
            //hide pageloader
            pageLoader.style.display = "none";                
            if (data.hasOwnProperty('accessToken')) {
                // save accessToken into LocalStorage
                localStorage.setItem("accessToken", data.accessToken);
                
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

    const errorMessageSignUp = document.getElementById("err-message-sign-up");    

    function showErrorMessageSignUp(text) {
        errorMessageSignUp.innerText = text;
    }

    function hideErrorMessageSignUp() {
        errorMessageSignUp.innerText = "";
    }

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
        hideErrorMessageSignUp();
        hideErrorFocus(signUpFullNameInput);
        hideErrorFocus(signUpEmailInput);
        hideErrorFocus(signUpPhoneInput);
        hideErrorFocus(signUpPasswordInput);     

        // validation
        if (signUpFullNameInput.value.trim() == "") {
            showErrorFocus(signUpFullNameInput);
            showErrorMessageSignUp("Full Name is empty");
            return;
        }

        if (signUpEmailInput.value.trim() == "") {
            showErrorFocus(signUpEmailInput);
            showErrorMessageSignUp("Email is empty");
            return;
        }
        
        if (!validateEmail(signUpEmailInput.value.trim())) {
            showErrorFocus(signUpEmailInput);
            showErrorMessageSignUp("The email is not valid");
            return;            
        }

        // check if the email is already registered
        fetch('https://shelterpet-api.herokuapp.com/auth/exists?' + new URLSearchParams({
            email: signUpEmailInput.value.trim()
        })).then((response) => {
            if (response.ok) {
                hideErrorFocus(signUpFullNameInput);
                hideErrorFocus(signUpPhoneInput);
                hideErrorFocus(signUpPasswordInput); 
                showErrorFocus(signUpEmailInput);
                showErrorMessageSignUp("Email is already registered");
                return;
            }
        });
        
        if (signUpPhoneInput.value.trim() == "") {
            showErrorFocus(signUpPhoneInput);
            showErrorMessageSignUp("The phone Number is empty");
            return;
        }
        
        if (signUpPasswordInput.value.trim() == "") {
            showErrorFocus(signUpPasswordInput);
            showErrorMessageSignUp("The password is empty");
            return;
        }

        if (signUpPasswordInput.value.trim().length < 8) {
            showErrorFocus(signUpPasswordInput);
            showErrorMessageSignUp("The password must be at least 8 characters long");
            return;
        }

        //show pageloader
        pageLoader.style.display = "block";        

        const payload = {
            "email": signUpEmailInput.value,
            "name": signUpFullNameInput.value,
            "password": signUpPasswordInput.value,
            "phone": signUpPhoneInput.value.replace("+", "")
        };

        console.log(payload);

        fetch("https://shelterpet-api.herokuapp.com/auth/signup", {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(payload)
        }).then(response => {
            //hide pageloader
            pageLoader.style.display = "none";            
            if (response.status == 200) {

                const payload = {
                    "email": signUpEmailInput.value.trim(),
                    "password": signUpPasswordInput.value.trim()
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
                        localStorage.setItem("accessToken", data.accessToken);
                        
                        // redirect to index
                        window.open("index.html", "_self");
                    } else {
                        // show error message
                        console.log(data);
                    }            
                }).catch(function(err) {
                    console.log(err);
                });
            }
            return response.json();
        }).then(data => {
                console.log(data);     
        }).catch(function(err) {
            console.log(err);
        });
    };
});


