const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the car loan id from the url
  const retirement_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/401ks/${retirement_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ retirement_id: retirement_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the car loan page
  if (response.ok) {
    document.location.replace('/401ks');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#delete401kBtn').addEventListener('click', deleteFormHandler);