const newAccountFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#newAccountTitle').value.trim();
  const limit = document.querySelector('#newAccountLimit').value.trim();
  const balance = document.querySelector('#newAccountBalance').value.trim();
  const available = limit - balance;
  const used = (balance / limit) * 100;

  // Create a new post if both fields contain content
  if (title && limit && balance) {
    const response = await fetch('/api/accounts', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        limit, 
        balance, 
        available, 
        used 
      }),
      headers: { 'Content-Type': 'application/json'},
    });

    // If successful return the browser to the accounts page
    if (response.ok) {
      document.location.replace('/accounts');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#newAccount').addEventListener('submit', newAccountFormHandler);