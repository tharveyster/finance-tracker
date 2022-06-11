const newCardFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#newCardTitle').value.trim();
  const limit = document.querySelector('#newCardLimit').value.trim();
  const balance = document.querySelector('#newCardBalance').value.trim();
  const available = limit - balance;
  const used = (balance / limit) * 100;

  // Create a new post if all fields contain content
  if (title && limit && balance) {
    const response = await fetch('/api/cards', {
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

    // If successful return the browser to the credit cards page
    if (response.ok) {
      document.location.replace('/cards');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#createCard').addEventListener('click', newCardFormHandler);