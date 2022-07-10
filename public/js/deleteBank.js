const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the car loan id from the url
  const bank_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/banks/${bank_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ bank_id: bank_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the car loan page
  if (response.ok) {
    document.location.replace('/banks');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteBankBtn').addEventListener('click', deleteFormHandler);