const newMortgageFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector('#newMortgageTitle').value.trim();
  const loan_amount = document.querySelector('#newMortgageLoanAmount').value.trim();
  const annual_interest_rate = document.querySelector('#newMortgageAnnualInterestRate').value.trim();
  const years = document.querySelector('#newMortgageYears').value.trim();
  const payment = (loan_amount * (annual_interest_rate / 1200)) / (1 - (Math.pow((1 + (annual_interest_rate / 1200)) , (12 * years) * -1)));
  const balance = loan_amount;
  const remaining = (balance / loan_amount) * 100;

  // Create a new post if both fields contain content
  if (title && loan_amount && annual_interest_rate && years) {
    const response = await fetch('/api/mortgages', {
      method: 'POST',
      body: JSON.stringify({ 
        title, 
        loan_amount, 
        annual_interest_rate, 
        years, 
        payment,
        balance,
        remaining
      }),
      headers: { 'Content-Type': 'application/json'},
    });

    // If successful return the browser to the accounts page
    if (response.ok) {
      document.location.replace('/mortgages');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#newMortgage').addEventListener('submit', newMortgageFormHandler);