var resMsg = document.getElementById('response-message');
const credentials = {
    projectId: '<YOUR_PROJECT_ID>',
    projectAPIkey: 'YOUR_PROJECT_API_KEY',
    siteKey: '<YOUR_SITE_KEY>',
}

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
    }
    if (!(isEmail(email))) {
        resMsg.innerHTML = 'Please enter a valid email!';
        isValid = false;
    }
    if (isValid) {

        fetch('../php/sendEmail.php', {
            method: 'POST',
            body: new FormData(form),
        }).then(res => {
            if (res.status == 200) {
                resMsg.innerHTML = 'Email was sent successfully! Thank you for your inquiry.';
                form.reset();
            }
        }).catch(err => {
            resMsg.innerHTML = 'Sorry, email was not sent successfully. There was a problem with connection.';
            console.error(err);
        });
    } else {
        resMsg.innerHTML = 'Sorry, there seems to have been a problem with your input.';
    }
}

function onSubmit() {
    const form = document.getElementById('contact-form');
    grecaptcha.enterprise.ready(() => {
        grecaptcha.enterprise.execute(credentials.siteKey, { action: 'submit' }).then(token => {
            resMsg.innerHTML = 'Sending e-mail ...';
            let body = {
                "event": {
                    "token": token,
                    "expectedAction": "submit",
                    "siteKey": credentials.siteKey,
                }
            }
            body = JSON.stringify(body);

            fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/${credentials.projectId}/assessments?key=${credentials.projectAPIkey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: body,
            }).then(res => {
                if (res.ok) { return res.json() }
                else {
                    resMsg.innerHTML = 'There was a problem with authenication!';
                }
            }).then(json => {
                if (json.riskAnalysis.score > 0.3) {
                    formValidationAndRequest(form);
                } else {
                    resMsg.innerHTML = 'You failed the reCAPTCHA test!';
                }
            }).catch(err => {
                console.error(err);
            });
        });
    });
}