import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: "info@mnyinfotech.com",
        subject: "Welcome",
        text:"Welcome to the application!"
    })
}

export const sendCancelEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: "info@mnyinfotech.com",
        subject: "Cancellation email",
        text:"Login cancelled!"
    })
}

sgMail.send({
    to: "shaikhrafat25@gmail.com",
    from: "info@mnyinfotech.com",
    subject: "Task Manager App",
    text: "This is a test email from task manager"
})