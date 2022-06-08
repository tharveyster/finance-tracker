const cancelFormHandler = async (event) => {
  event.preventDefault();

  history.back();
}

document.querySelector('#cancelButton').addEventListener('click', cancelFormHandler);