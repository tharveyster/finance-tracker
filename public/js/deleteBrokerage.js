const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the brokerage account id from the url
  const brokerage_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/brokerages/${brokerage_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ brokerage_id: brokerage_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the brokerage account page
  if (response.ok) {
    document.location.replace('/brokerages');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteBrokerageBtn').addEventListener('click', deleteFormHandler);