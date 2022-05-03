const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the account id from the url
  const account_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/accounts/${account_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ account_id: account_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the accounts page
  if (response.ok) {
    document.location.replace('/accounts');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteAccountBtn').addEventListener('click', deleteFormHandler);