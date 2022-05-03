const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update/delete form
  const title = document.querySelector('#viewAccountTitle').value.trim();
  const limit = document.querySelector('#viewAccountLimit').value.trim();
  const balance = document.querySelector('#viewAccountBalance').value.trim();
  const available = limit - balance;
  const used = (balance / limit) * 100;

  // Collect account id from url
  const account_id = location.pathname.split('/')[2];

  // Get account by id and update the content
  const response = await fetch(`/api/accounts/${account_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      limit,
      balance,
      available,
      used
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful redirect the browser to the accounts page
  if (response.ok) {
    document.location.replace('/accounts');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#updateAccountBtn').addEventListener('click', updateFormHandler);