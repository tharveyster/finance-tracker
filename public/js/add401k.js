const new401kFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#new401kTitle').value.trim();
  const balance = document.querySelector('#new401kBalance').value.trim();

  // Create a new post if both fields contain content
  if (title && balance) {
    const response = await fetch('/api/401ks', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        balance
      }),
      headers: { 'Content-Type': 'application/json'},
    });

    // If successful return the browser to the car loans page
    if (response.ok) {
      document.location.replace('/401ks');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#create401k').addEventListener('click', new401kFormHandler);