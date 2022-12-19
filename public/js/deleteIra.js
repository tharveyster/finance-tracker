const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the IRA account id from the url
  const ira_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/iras/${ira_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ ira_id: ira_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the IRA account page
  if (response.ok) {
    document.location.replace('/iras');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteIraBtn').addEventListener('click', deleteFormHandler);