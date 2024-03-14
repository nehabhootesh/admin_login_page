document.addEventListener('DOMContentLoaded', async () => {
    const pendingList = document.getElementById('pendingList');
    const verifiedList = document.getElementById('verifiedList');
  
    // Function to fetch and display pending verifications
    async function fetchPendingVerifications() {
      try {
        const response = await fetch('/admin/pending-verifications');
        const result = await response.json();
  
        if (result.success) {
          const pendingVerifications = result.pendingVerifications;
  
          // Clear the existing list
          pendingList.innerHTML = '';
  
          // Display each pending verification
          pendingVerifications.forEach((verification) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${verification.name} - ${verification.hashValue}`;
            pendingList.appendChild(listItem);
          });
        } else {
          console.error('Error fetching pending verifications:', result.error);
        }
      } catch (error) {
        console.error('Error fetching pending verifications:', error.message);
      }
    }
  
    // Function to fetch and display verified users
    async function fetchVerifiedUsers() {
      try {
        const response = await fetch('/admin/verified-users');
        const result = await response.json();
  
        if (result.success) {
          const verifiedUsers = result.verifiedUsers;
  
          // Clear the existing list
          verifiedList.innerHTML = '';
  
          // Display each verified user
          verifiedUsers.forEach((user) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.name} - ${user.hashValue}`;
            verifiedList.appendChild(listItem);
          });
        } else {
          console.error('Error fetching verified users:', result.error);
        }
      } catch (error) {
        console.error('Error fetching verified users:', error.message);
      }
    }
  
    // Fetch and display data initially
    fetchPendingVerifications();
    fetchVerifiedUsers();
  
    // Set up intervals to refresh the data periodically
    setInterval(fetchPendingVerifications, 5000); // Refresh every 5 seconds
    setInterval(fetchVerifiedUsers, 10000); // Refresh every 10 seconds
  });
  