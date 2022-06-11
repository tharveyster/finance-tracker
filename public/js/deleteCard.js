const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the card id from the url
  const card_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/cards/${card_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ card_id: card_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the credit cards page
  if (response.ok) {
    document.location.replace('/cards');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteCardBtn').addEventListener('click', deleteFormHandler);