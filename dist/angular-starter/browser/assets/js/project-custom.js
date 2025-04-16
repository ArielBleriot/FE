function toggleSidebar() {
    const sidebarToggleButton = document.getElementById("sidebarToggleButton");
    const sidebarMenu = document.getElementById("sidebarMenu");
  
    sidebarToggleButton.addEventListener("click", (event) => {
      sidebarMenu.classList.toggle("is-open");
    });
  }