const newAccountFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#newAccountTitle').value.trim();
  const balance = document.querySelector('#newAccountBalance').value.trim();

  // Create a new post if both fields contain content
  if (title && balance) {
    const response = await fetch('/api/accounts', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        balance
      }),
      headers: { 'Content-Type': 'application/json'},
    });

    // If successful return the browser to the car loans page
    if (response.ok) {
      document.location.replace('/accounts');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#createAccount').addEventListener('click', newAccountFormHandler);