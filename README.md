# contact-form
contact form with reCAPTCHA verification followed by input validation and fetching php mailing file

### usage
1. create a project in google cloud console to recive API key
2. within same project navigate to google enterprise reCAPTCHA dashboard and generate security key for your domain
3. enable reCAPTCHA enterprise API for this project
4. use project name in '<YOUR_PROJECT_ID>' @ js:2
5. use your API key in '<YOUR_PROJECT_API_KEY>' @ js:2
6. use your reCAPTCHA security key in '<YOUR_SITE_KEY>' @ html:5, js:2
7. add your domain as '<YOUR_DOMAIN_NAME>' and your email address as '<YOUR_EMAIL_ADDRESS>' @ php:2
8. change action if desired @ js:51, js:56
