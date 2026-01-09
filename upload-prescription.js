(function () {
  emailjs.init("PKBD1Rc6a18xYL-IG"); // your public key
})();

const form = document.getElementById("upload-form");
const statusMsg = document.getElementById("uploadStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("prescription");
  const file = fileInput.files[0];

  if (!file) {
    statusMsg.textContent = "Please select a file.";
    statusMsg.style.color = "red";
    return;
  }

  // Max 2MB (EmailJS limit)
  if (file.size > 2 * 1024 * 1024) {
    statusMsg.textContent = "File must be under 2MB.";
    statusMsg.style.color = "red";
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    statusMsg.style.color = "#333";
    statusMsg.textContent = "Uploading...";

    emailjs.send(
      "service_nbyy6le", // SMTP service
      "template_m67s8bl", // or create a new template
      {
        name: form.querySelector('[name="name"]').value,
        phone: form.querySelector('[name="phone"]').value,
        email: form.querySelector('[name="email"]').value,
        file_name: file.name,
        file_data: reader.result
      }
    )
    .then(() => {
      statusMsg.style.color = "green";
      statusMsg.textContent = "Prescription uploaded successfully!";
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      statusMsg.style.color = "red";
      statusMsg.textContent = "Upload failed. Try again.";
    });
  };

  reader.readAsDataURL(file);
});
