document.addEventListener("DOMContentLoaded", function () {
    const complaintForm = document.getElementById("complaint-form");

    complaintForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page refresh

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const complaint = document.getElementById("complaint").value.trim();

        // Validate form inputs
        if (name === "" || email === "" || complaint === "") {
            alert("Please fill in all the fields.");
            return;
        }

        // Display success message
        alert(`Thank you, ${name}! Your complaint has been submitted successfully. We will get back to you shortly.`);

        // Optionally clear the form after submission
        complaintForm.reset();
    });
});
// Wait for the DOM to load before running scripts
document.addEventListener("DOMContentLoaded", function () {
    // Form and elements
    const form = document.getElementById("booking-form");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const totalPriceElement = document.getElementById("total-price");

    // Function to calculate total price
    function calculateTotal() {
        let total = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseInt(checkbox.value);
            }
        });
        totalPriceElement.textContent = "Total Price: Ksh " + total;
    }

    // Add event listeners to checkboxes for live price updates
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", calculateTotal);
    });

    // Form submission handler (simple feedback functionality)
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        // Get user inputs
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const phoneRepeat = document.getElementById("phone-repeat").value;
        const date = document.getElementById("date").value;
        const message = document.getElementById("message").value;

        // Get selected services
        let selectedServices = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedServices.push(checkbox.nextElementSibling.textContent);
            }
        });

        // Get selected payment method
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
        const paymentText = paymentMethod ? paymentMethod.nextElementSibling.textContent : "Not Selected";

        // Validate phone numbers match
        if (phone !== phoneRepeat) {
            alert("❌ Phone numbers do not match! Please check again.");
            return;
        }

        // Ensure at least one service is selected
        if (selectedServices.length === 0) {
            alert("❌ Please select at least one service.");
            return;
        }

        // Show confirmation message
        let confirmationMessage = `✅ Thank you, ${name}!\n\nYour booking has been received:\n📅 Date: ${date}\n📞 Phone: ${phone}\n💳 Payment: ${paymentText}\n🧹 Services: ${selectedServices.join(", ")}\n💰 ${totalPriceElement.textContent}\n\n📧 A confirmation email will be sent to ${email}.`;
        alert(confirmationMessage);

        // Reset form after successful submission
        form.reset();
        calculateTotal(); // Reset price to 0
    });
});
