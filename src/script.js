function toggleDropdown(id) {
  document.getElementById(id).classList.toggle("show");
  let dropdowns = document.getElementsByClassName("dropdown-content");
  let i;
  for (i = 0; i < dropdowns.length; i++) {
    let openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show') && openDropdown.id!==id) {
      openDropdown.classList.remove('show');
    }
  }
}
