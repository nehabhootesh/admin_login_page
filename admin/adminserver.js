const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const pendingVerifications = []; // Store pending verifications on the server
const admins = {}; // Store admin data in-memory (replace with a database in production)

// Endpoint for admin authentication
app.post('/admin/authenticate', (req, res) => {
    const { address } = req.body;

    // Verify the admin's Ethereum address
    if (address === admins.adminAddress) {
        // Successful authentication
        res.status(200).json({ success: true });
    } else {
        // Authentication failed
        res.status(401).json({ success: false, error: 'Authentication failed' });
    }
});

// Secure endpoint for admin to request pending verification hashes
app.get('/admin/pending-verifications', (req, res) => {
    const admin = admins[req.headers.address.toLowerCase()];

    if (admin) {
        // Only authorized admins can access this endpoint
        res.json(pendingVerifications);
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// Serve static files (e.g., HTML, CSS, and JavaScript) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


// Serve 'admin.html' for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
// Start the server
const PORT = process.env.PORT || 3110;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
