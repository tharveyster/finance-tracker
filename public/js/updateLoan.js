const updateFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update/delete form
  const title = document.querySelector('#viewLoanTitle').value.trim();
  const loan_amount = document.querySelector('#viewLoanAmount').value.trim();
  const annual_interest_rate = document.querySelector('#viewLoanAnnualInterestRate').value.trim();
  const months = document.querySelector('#viewLoanMonths').value.trim();
  let payment = 0;
  if (annual_interest_rate > 0) {
    payment = (loan_amount * (annual_interest_rate / 1200)) / (1 - (Math.pow((1 + (annual_interest_rate / 1200)) , (months) * -1)));
  } else {
    payment = (loan_amount / months);
  }
  const balance = document.querySelector('#viewLoanBalance').value.trim();
  const remaining = (balance / loan_amount) * 100;
  
  // Collect miscellaneous loan id from url
  const loan_id = location.pathname.split('/')[2];

  // Get car loan by id and update the content
  const response = await fetch(`/api/loans/${loan_id}`, {
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
  // If successful redirect the browser to the miscellaneous loans page
  if (response.ok) {
    document.location.replace('/loans');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#updateLoanBtn').addEventListener('click', updateFormHandler);