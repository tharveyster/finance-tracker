const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update/delete form
  const title = document.querySelector('#viewCardTitle').value.trim();
  const limit = document.querySelector('#viewCardLimit').value.trim();
  const balance = document.querySelector('#viewCardBalance').value.trim();
  const available = limit - balance;
  const used = (balance / limit) * 100;

  // Collect card id from url
  const card_id = location.pathname.split('/')[2];

  // Get card by id and update the content
  const response = await fetch(`/api/cards/${card_id}`, {
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

  // If successful redirect the browser to the cedit cards page
  if (response.ok) {
    document.location.replace('/cards');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#updateCardBtn').addEventListener('click', updateFormHandler);