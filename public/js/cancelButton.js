const cancelFormHandler = async (event) => {
  event.preventDefault();

  document.location.replace('/accounts');
}

document.querySelector('#cancelButton').addEventListener('click', cancelFormHandler);