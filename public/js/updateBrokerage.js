const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update/delete form
  const title = document.querySelector('#viewBrokerageTitle').value.trim();
  const balance = document.querySelector('#viewBrokerageBalance').value.trim();

  // Collect IRA account id from url
  const brokerage_id = location.pathname.split('/')[2];

  // Get IRA account by id and update the content
  const response = await fetch(`/api/brokerages/${brokerage_id}`, {
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
    document.location.replace('/brokerages');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#updateBrokerageBtn').addEventListener('click', updateFormHandler);