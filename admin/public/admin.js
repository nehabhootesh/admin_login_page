// // admin.js

// let adminAddress = '0x464Dd50cbC25E0aa2CE2D6175De6dF69719D17D2';

// document.addEventListener('DOMContentLoaded', () => {
//     // Load admin info and pending verifications on page load
//     loadAdminInfo();
//     loadPendingVerifications();
// });

// async function connectAsAdmin() {
//     try {
//         if (typeof window.ethereum === 'undefined') {
//             throw new Error('MetaMask not detected. Please install MetaMask and try again.');
//         }

//         // Request account access if needed
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         adminAddress = accounts[0];

//         // Display admin address
//         document.getElementById('adminAddress').value = adminAddress;

//         // Display the login form
//         document.getElementById('adminLoginForm').style.display = 'block';
//     } catch (error) {
//         console.error('Error connecting as admin:', error.message);
//     }
// }

// async function authenticateAdmin() {
//     try {
//         // Send admin authentication data to the server
//         const response = await fetch('http://localhost:4000/admin/authenticate', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 address: adminAddress,
//             }),
//         });

//         if (response.ok) {
//             // Authentication successful, redirect to verification page
//             window.location.href = 'verification.html';
//         } else {
//             console.error('Admin authentication failed:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error authenticating admin:', error);
//     }
// }

// // Other functions (loadAdminInfo, loadPendingVerifications, displayAdminInfo, displayPendingVerifications) remain unchanged.


// async function loadAdminInfo() {
//     try {
//         // Fetch admin info from the server
//         const response = await fetch('http://localhost:3000/admin/info', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             displayAdminInfo(data.address);
//         } else {
//             console.error('Failed to fetch admin info:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error fetching admin info:', error);
//     }
// }

// async function loadPendingVerifications() {
//     try {
//         // Fetch pending verifications from the server
//         const response = await fetch('http://localhost:3000/admin/pending-verifications', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             const data = await response.json();
//             displayPendingVerifications(data);
//         } else {
//             console.error('Failed to fetch pending verifications:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error fetching pending verifications:', error);
//     }
// }

// function displayAdminInfo(address) {
//     const adminInfoDiv = document.getElementById('adminInfo');
//     adminInfoDiv.innerHTML = `<p>Admin Address: ${address}</p>`;
// }

// function displayPendingVerifications(pendingVerifications) {
//     const pendingVerificationsDiv = document.getElementById('pendingVerifications');
//     pendingVerificationsDiv.innerHTML = '<h2>Pending Verifications:</h2>';

//     if (pendingVerifications.length > 0) {
//         const ul = document.createElement('ul');
//         pendingVerifications.forEach(verification => {
//             const li = document.createElement('li');
//             li.textContent = `User Address: ${verification.address}, Hash: ${verification.hashValue}`;
//             ul.appendChild(li);
//         });
//         pendingVerificationsDiv.appendChild(ul);
//     } else {
//         pendingVerificationsDiv.innerHTML += '<p>No pending verifications</p>';
//     }
// }
document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const allowedAddress = '0x59455a41133e4ae5e9A9313Be19D91C5242Fd550'; // Replace with your specific Ethereum address

    connectButton.addEventListener('click', async () => {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access if needed
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                // Check if the connected account is allowed
                if (accounts.length > 0 && accounts[0].toLowerCase() === allowedAddress.toLowerCase()) {
                    // Redirect to verification page
                    window.location.href = 'http://localhost:3100';
                } else {
                    alert('Unauthorized access. Please use the specified MetaMask account.');
                }
            } catch (error) {
                console.error(error);
                alert('MetaMask connection failed. Please try again.');
            }
        } else {
            alert('MetaMask not detected. Please install MetaMask and try again.');
        }
    });
});
