const deleteFormHandler = async (event) => {
  event.preventDefault();

  // Get the car loan id from the url
  const car_id = location.pathname.split('/')[2];

  // Send a DELETE request to the API end point
  const response = await fetch(`/api/cars/${car_id}`, {
    method: 'DELETE',
    body: JSON.stringify({ car_id: car_id }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful return the browser to the car loan page
  if (response.ok) {
    document.location.replace('/cars');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#deleteCarBtn').addEventListener('click', deleteFormHandler);