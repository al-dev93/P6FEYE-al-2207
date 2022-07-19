const dropDown = document.querySelector('.dropdown');
dropDown.addEventListener('click',() =>{
    const menuSortMedia = document.querySelector('.wrapper_select');
    menuSortMedia.classList.toggle('dropdown_open')
});