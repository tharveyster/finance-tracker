const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update/delete form
  const title = document.querySelector('#view401kTitle').value.trim();
  const balance = document.querySelector('#view401kBalance').value.trim();

  // Collect car loan id from url
  const retirement_id = location.pathname.split('/')[2];

  // Get car loan by id and update the content
  const response = await fetch(`/api/401ks/${retirement_id}`, {
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
    document.location.replace('/401ks');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#update401kBtn').addEventListener('click', updateFormHandler);