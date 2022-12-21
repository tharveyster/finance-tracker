const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update/delete form
  const title = document.querySelector('#viewCdTitle').value.trim();
  const balance = document.querySelector('#viewCdBalance').value.trim();

  // Collect IRA account id from url
  const cd_id = location.pathname.split('/')[2];

  // Get IRA account by id and update the content
  const response = await fetch(`/api/cds/${cd_id}`, {
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
    document.location.replace('/cds');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#updateCdBtn').addEventListener('click', updateFormHandler);