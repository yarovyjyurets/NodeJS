const deleteButton = document.getElementById('deleteProduct');
if (deleteButton) {
  deleteButton.addEventListener('click', async () => {
    const productId = document.getElementById('productId').value;
    const csrf = document.getElementById('csrf').value;

    const response = await fetch(`products/${productId}`, {
      method: 'DELETE',
      headers: {
        'csrf-token': csrf
      }
    })
    const a = await response.json();
    console.log(a)
    const article = deleteButton.closest('article');
    article.parentNode.removeChild(article);
  })
}

