const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update/delete form
  const title = document.querySelector('#viewBankTitle').value.trim();
  const balance = document.querySelector('#viewBankBalance').value.trim();

  // Collect car loan id from url
  const bank_id = location.pathname.split('/')[2];

  // Get car loan by id and update the content
  const response = await fetch(`/api/banks/${bank_id}`, {
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
    document.location.replace('/banks');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#updateBankBtn').addEventListener('click', updateFormHandler);