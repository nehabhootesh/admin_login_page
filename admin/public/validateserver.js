const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const adminVerifications = []; // Store admin-validated verifications on the server

// Endpoint for the administrator to validate verifications
app.post('/validate-verification', async (req, res) => {
    const { hashValue } = req.body;

    try {
        // Fetch verification details from the user submission server
        const userDetails = await fetchUserDetails(hashValue);

        if (userDetails) {
            // Verification details found, process and approve
            adminVerifications.push({ ...userDetails, adminValidationTime: new Date() });

            console.log('Administrator validated:', userDetails);
            res.json({ success: true, userDetails });
        } else {
            // Verification not found
            res.json({ success: false, error: 'Verification not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.json({ success: false, error: 'Error fetching user details' });
    }
});

// Function to fetch user details from the user submission server
async function fetchUserDetails(hashValue) {
    // Use the appropriate endpoint for fetching user details from the user submission server
    const userSubmissionServerEndpoint = 'http://localhost:3000';
    
    const response = await fetch(`${userSubmissionServerEndpoint}?hashValue=${hashValue}`);
    const result = await response.json();

    if (result.success) {
        return result.userDetails;
    } else {
        return null;
    }
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Validation Server is running on http://localhost:${PORT}`);
});
