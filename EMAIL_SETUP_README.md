# Email Configuration for Contact Form

## Setup Instructions

To enable email functionality for the contact form, you need to set up Gmail SMTP credentials.

### 1. Create Environment File

Create a `.env.local` file in the root directory of your project:

```env
# Gmail account to send emails from
EMAIL_USER=sakshambharti1805@gmail.com

# Gmail App Password (not regular password)
EMAIL_APP_PASSWORD=your_16_character_app_password_here
```

### 2. Generate Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Enable 2-factor authentication if not already enabled
3. Go to **Security** > **App passwords**
4. Select **Mail** as the app and **Other** as the device
5. Enter "BakeryBliss Contact Form" as the custom name
6. Click **Generate**
7. Copy the 16-character password and use it as `EMAIL_APP_PASSWORD`

### 3. Alternative: Use BakeryBliss Email

If you prefer to use `Bakeryblissindia@gmail.com` as the sender:

```env
EMAIL_USER=Bakeryblissindia@gmail.com
EMAIL_APP_PASSWORD=app_password_for_bakerybliss_account
```

### 4. Test the Contact Form

1. Start the development server: `npm run dev`
2. Open the website and click the floating contact button
3. Submit a test query
4. Check `Bakeryblissindia@gmail.com` for the email

## How It Works

- When a user submits the contact form, it sends a POST request to `/api/contact`
- The API route uses Nodemailer with Gmail SMTP to send the email
- The email is sent from the configured Gmail account to `Bakeryblissindia@gmail.com`
- The email includes the user's query and callback request (if any)

## Security Notes

- Never commit `.env.local` to version control
- App passwords are specific to your Google account and can be revoked anytime
- The contact form validates input on both client and server side