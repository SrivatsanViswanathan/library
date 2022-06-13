const formButton = document.querySelector('#form-button');
const formPopup = document.querySelector('#popup-book-add');

popup();

function popup() {
    formButton.addEventListener('click', () => {
        formPopup.style.display = 'block';
    });
};

window.onclick = function (e) {
    if (e.target == formPopup) {
        formPopup.style.display = "none";
    }
}