const newBrokerageFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#newBrokerageTitle').value.trim();
  const balance = document.querySelector('#newBrokerageBalance').value.trim();

  // Create a new post if both fields contain content
  if (title && balance) {
    const response = await fetch('/api/brokerages', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        balance
      }),
      headers: { 'Content-Type': 'application/json'},
    });

    // If successful return the browser to the car loans page
    if (response.ok) {
      document.location.replace('/brokerages');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#createBrokerage').addEventListener('click', newBrokerageFormHandler);