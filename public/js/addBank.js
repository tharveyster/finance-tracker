const newBankFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#newBankTitle').value.trim();
  const balance = document.querySelector('#newBankBalance').value.trim();

  // Create a new post if both fields contain content
  if (title && balance) {
    const response = await fetch('/api/banks', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        balance
      }),
      headers: { 'Content-Type': 'application/json'},
    });

    // If successful return the browser to the car loans page
    if (response.ok) {
      document.location.replace('/banks');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#createBank').addEventListener('click', newBankFormHandler);