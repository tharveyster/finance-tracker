const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update/delete form
  const title = document.querySelector('#viewMortgageTitle').value.trim();
  const loan_amount = document.querySelector('#viewMortgageLoanAmount').value.trim();
  const annual_interest_rate = document.querySelector('#viewMortgageAnnualInterestRate').value.trim();
  const years = document.querySelector('#viewMortgageYears').value.trim();
  let payment = 0;
  if (annual_interest_rate > 0) {
    payment = (loan_amount * (annual_interest_rate / 1200)) / (1 - (Math.pow((1 + (annual_interest_rate / 1200)) , (12 * years) * -1)));
  } else {
    payment = (loan_amount / (12 * years));
  }
  const balance = document.querySelector('#viewMortgageBalance').value.trim();
  const remaining = (balance / loan_amount) * 100;

  // Collect mortgage id from url
  const mortgage_id = location.pathname.split('/')[2];

  // Get mortgage by id and update the content
  const response = await fetch(`/api/mortgages/${mortgage_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      loan_amount,
      annual_interest_rate,
      years,
      payment,
      balance,
      remaining
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  // If successful redirect the browser to the mortgages page
  if (response.ok) {
    document.location.replace('/mortgages');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#updateMortgageBtn').addEventListener('click', updateFormHandler);