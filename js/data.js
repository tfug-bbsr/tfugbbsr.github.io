async function checkEmailExists(email) {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbz1Mwlv_su0pwOtPt3n5VHbXZHkZUfvtd97TX9SvL1OTnJ84rdpi94USYwWEiKce4v5/exec`);
    const data = await response.json();

    // Check if the email exists in the fetched JSON
    const emailExists = data.data.some(entry => entry.email === email);
    console.log(emailExists)
    return emailExists;
}

async function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');

    // Display the loading spinner
    // const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
    // loadingModal.hide();

    try {
        // Check if the email exists
        const emailExists = await checkEmailExists(email);

        // Hide the loading spinner
        // loadingModal.hide();

        if (emailExists) {
            // Show a warning message
                // const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
                // loadingModal.hide();
            alert('User already exsists!');
        } else {
            // Proceed with form submission
            const email = formData.get('email');  // Assuming 'email' is the name attribute of the email input field
        
            // Check if the email already exists
            const emailExists = await checkEmailExists(email);
        
            if (emailExists) {
                // If email exists, show a warning to the user
                alert('User already exsists!');
            } else {
                // If email does not exist, continue with the form submission
        
                // Display the loading spinner in the modal
                const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
                loadingModal.show();
        
                // Make a POST request to the Google Apps Script
                fetch('https://script.google.com/macros/s/AKfycbwb7hRiTgTapSHTqVrFS4QUFiktQV71VxzcjcBaJ1gbkJwjSZwPFNaKoa2W3ryLVTNm/exec', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    // Hide the loading spinner modal after receiving the response
                    loadingModal.hide();
        
                    if (data.redirect) {
                        // Show a success message using a Bootstrap modal
                        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                        successModal.show();
        
                        // Redirect to the specified URL after a delay (if needed)
                        setTimeout(() => {
                            window.location.href = data.redirect;
                        }, 2000); // 2000 milliseconds (2 seconds)
                    } else {
                        // Handle other responses as needed
                        console.log(data);
                    }
                })
                .catch(error => {
                    // Hide the loading spinner modal on error
                    loadingModal.hide();
        
                    // Show an error message in a pop-up
                    alert('An error occurred. Please try again.');
        
                    console.error('Error:', error);
                });
            }
        }
        
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
        loadingModal.hide();
    }
}
