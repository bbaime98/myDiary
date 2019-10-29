const modal = document.getElementById('modal-bg-js');
const modalBtn = document.getElementById('modalBtn');
const closebtn = document.getElementsByClassName('closeBtn')[0];

modalBtn.addEventListener('click', () => {
modal.style.display = 'block';
});

closebtn.addEventListener('click', () => {
modal.style.display = 'none';
});