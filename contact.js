document.getElementById("contact-form").addEventListener("submit", function (e) {

    e.preventDefault();

    const loader = document.getElementById("loader");
    const sendBtn = document.getElementById("sendBtn");
    const btnText = document.getElementById("btnText");

    loader.style.display = "block";
    btnText.style.visibility = "hidden";
    sendBtn.disabled = true;

    const customerParams = {
        subject: "🏨 Pam Paradise Hotel - Message Confirmation",
        customer_email: document.getElementById("email").value,
        customer_name: document.getElementById("name").value,
        message: `We received your message:${document.getElementById("message").value}
        We will get back to you soon.`,
        booking_details: "",
        footer_message: "Thank you for contacting Pam Paradise Hotel."
    };

    const ownerParams = {
        subject: "📩 New Guest Message - Pam Paradise Hotel",
        customer_name: document.getElementById("name").value,
        customer_email: document.getElementById("email").value,
        message: "Message:",
        booking_details: document.getElementById("message").value,
        footer_message: "Please respond to the guest as soon as possible."
    };

    Promise.all([
        emailjs.send(
            "service_t2jayrh",
            "template_kqsw70w",
            customerParams
        ),

        emailjs.send(
            "service_t2jayrh",
            "template_6xbznyv",
            ownerParams
        )

    ])

    .then(() => {
        loader.style.display = "none";
        btnText.style.visibility = "visible";
        sendBtn.disabled = false;
        sendBtn.style.opacity = "1";
        alert("🎉 Contact successful ✅");
        document.getElementById("contact-form").reset();
    })

    .catch((error) => {
        loader.style.display = "none";
        btnText.style.visibility = "visible";
        sendBtn.disabled = false;
        sendBtn.style.opacity = "1";
        console.log(error);
        alert("❌ Failed to send");
    });
});