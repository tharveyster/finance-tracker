const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update/delete form
  const title = document.querySelector('#viewAccountTitle').value.trim();
  const balance = document.querySelector('#viewAccountBalance').value.trim();

  // Collect car loan id from url
  const account_id = location.pathname.split('/')[2];

  // Get car loan by id and update the content
  const response = await fetch(`/api/accounts/${account_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      balance
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(response);
  // If successful redirect the browser to the car loans page
  if (response.ok) {
    document.location.replace('/accounts');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#updateAccountBtn').addEventListener('click', updateFormHandler);