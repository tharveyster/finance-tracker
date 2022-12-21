const newCdFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#newCdTitle').value.trim();
  const balance = document.querySelector('#newCdBalance').value.trim();

  // Create a new post if both fields contain content
  if (title && balance) {
    const response = await fetch('/api/cds', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        balance
      }),
      headers: { 'Content-Type': 'application/json'},
    });

    // If successful return the browser to the car loans page
    if (response.ok) {
      document.location.replace('/cds');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#createCd').addEventListener('click', newCdFormHandler);