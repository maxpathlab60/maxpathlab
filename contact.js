(function () {
  emailjs.init("PKBD1Rc6a18xYL-IG");
})();

const form = document.getElementById("contact-form");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  statusMsg.style.color = "#333";
  statusMsg.textContent = "Sending...";

  emailjs.sendForm(
    "service_nbyy6le",   // SMTP service
    "template_m67s8bl",
    form
  )
  .then(() => {
    statusMsg.style.color = "green";
    statusMsg.textContent = "Enquiry sent successfully!";
    form.reset();
  })
  .catch((error) => {
    statusMsg.style.color = "red";
    statusMsg.textContent = "Failed to send enquiry.";
    console.error(error);
  });
});
