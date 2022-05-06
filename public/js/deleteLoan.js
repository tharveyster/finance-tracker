const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the miscellaneous loan id from the url
  const loan_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/loans/${loan_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ loan_id: loan_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the miscellaneous loan page
  if (response.ok) {
    document.location.replace('/loans');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteLoanBtn').addEventListener('click', deleteFormHandler);