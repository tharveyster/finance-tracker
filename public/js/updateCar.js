const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update/delete form
  const title = document.querySelector('#viewCarTitle').value.trim();
  const loan_amount = document.querySelector('#viewCarLoanAmount').value.trim();
  const annual_interest_rate = document.querySelector('#viewCarAnnualInterestRate').value.trim();
  const months = document.querySelector('#viewCarMonths').value.trim();
  const payment = (loan_amount * (annual_interest_rate / 1200)) / (1 - (Math.pow((1 + (annual_interest_rate / 1200)) , (months) * -1)));
  const balance = document.querySelector('#viewCarBalance').value.trim();
  const remaining = (balance / loan_amount) * 100;

  // Collect car loan id from url
  const car_id = location.pathname.split('/')[2];

  // Get car loan by id and update the content
  const response = await fetch(`/api/cars/${car_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      loan_amount,
      annual_interest_rate,
      months,
      payment,
      balance,
      remaining
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(response);
  // If successful redirect the browser to the car loans page
  if (response.ok) {
    document.location.replace('/cars');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#updateCarBtn').addEventListener('click', updateFormHandler);