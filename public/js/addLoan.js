const newLoanFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#newLoanTitle').value.trim();
  const loan_amount = document.querySelector('#newLoanAmount').value.trim();
  const annual_interest_rate = document.querySelector('#newLoanAnnualInterestRate').value.trim();
  const months = document.querySelector('#newLoanMonths').value.trim();
  let payment = 0;
  if (annual_interest_rate > 0) {
    payment = (loan_amount * (annual_interest_rate / 1200)) / (1 - (Math.pow((1 + (annual_interest_rate / 1200)) , (months) * -1)));
  } else {
    payment = (loan_amount / months);
  }
  const balance = loan_amount;
  const remaining = (balance / loan_amount) * 100;

  // Create a new post if both fields contain content
  if (title && loan_amount && annual_interest_rate && months) {
    const response = await fetch('/api/loans', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        loan_amount, 
        annual_interest_rate, 
        months, 
        payment,
        balance,
        remaining
      }),
      headers: { 'Content-Type': 'application/json'},
    });

    // If successful return the browser to the miscellaneous loans page
    if (response.ok) {
      document.location.replace('/loans');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#createLoan').addEventListener('click', newLoanFormHandler);