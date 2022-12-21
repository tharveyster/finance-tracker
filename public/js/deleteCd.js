const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the CD account id from the url
  const cd_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/cds/${cd_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ cd_id: cd_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the IRA account page
  if (response.ok) {
    document.location.replace('/cds');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteCdBtn').addEventListener('click', deleteFormHandler);