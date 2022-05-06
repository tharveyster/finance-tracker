const newCarFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#newCarTitle').value.trim();
  const loan_amount = document.querySelector('#newCarLoanAmount').value.trim();
  const annual_interest_rate = document.querySelector('#newCarAnnualInterestRate').value.trim();
  const months = document.querySelector('#newCarMonths').value.trim();
  const payment = (loan_amount * (annual_interest_rate / 1200)) / (1 - (Math.pow((1 + (annual_interest_rate / 1200)) , (months) * -1)));
  const balance = loan_amount;
  const remaining = (balance / loan_amount) * 100;

  // Create a new post if both fields contain content
  if (title && loan_amount && annual_interest_rate && months) {
    const response = await fetch('/api/cars', {
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

    // If successful return the browser to the accounts page
    if (response.ok) {
      document.location.replace('/cars');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#newCar').addEventListener('submit', newCarFormHandler);