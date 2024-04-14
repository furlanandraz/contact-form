var resMsg = document.getElementById('response-message');

function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formValidationAndRequest(form) {
    isValid = true;
    // set inputs
    const name = form['name'].value;
    const email = form['email'].value;
    const subject = form['subject'].value;
    const message = form['message'].value;
    // validation
    // chechk for empty fields
    if (name == '' || email == '' || subject == '' || message == '') {
        resMsg.innerHTML = 'Please fill in all the fields!';
        isValid = false
        return isValid;
    }
    if (!(isEmail(email))) {
        resMsg.innerHTML = 'Please enter a valid email!';
        isValid = false;
        return isValid;
    }
    if (isValid) {

        fetch('sendEmail.php', {
            method: 'POST',
            body: new FormData(form),
        }).then(res => {
            if (res.status == 200) {
                resMsg.innerHTML = 'Email was sent successfully! Thank you for your inquiry.';
                form.reset();
            }
        }).catch(err => {
            resMsg.innerHTML = 'Sorry, email was not sent successfully. There was a problem with connection.';
            console.log(err);
        });
    } else {
        resMsg.innerHTML = 'Sorry, there seems to have been a problem with your input.';
    }
}

function onSubmit() {
    const form = document.getElementById('contact-form');
    grecaptcha.enterprise.ready(function () {
        grecaptcha.enterprise.execute('6LfAYbopAAAAAMoN1_wuN1KuwI_Q9seHW6jFHuuU', { action: 'submit' }).then(token => {
            let body = {
                "event": {
                    "token": `${token}`,
                    "expectedAction": "submit",
                    "siteKey": "6LfAYbopAAAAAMoN1_wuN1KuwI_Q9seHW6jFHuuU",
                }
            }
            body = JSON.stringify(body);
            fetch('https://recaptchaenterprise.googleapis.com/v1/projects/furlanandraz/assessments?key=AIzaSyC5XI4uoi6VeuFQ9HcQUuefTeBHMFlHOvo', {
                method: 'POST',
                body: body,
            }).then(res => {
                res.json();
                if (res.ok) {
                    resMsg.innerHTML = 'Sending e-mail ...';
                    formValidationAndRequest(form);
                } else {
                    resMsg.innerHTML = 'You failed the reCAPTCHA test!';
                }
            }).catch(err => {
                resMsg.innerHTML = 'There was an error with sending your inquiry!'
            });
        });
    });
}