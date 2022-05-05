const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the mortgage id from the url
  const mortgage_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/mortgages/${mortgage_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ mortgage_id: mortgage_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the accounts page
  if (response.ok) {
    document.location.replace('/mortgages');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteMortgageBtn').addEventListener('click', deleteFormHandler);