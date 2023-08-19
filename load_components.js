document.addEventListener("DOMContentLoaded", function() {
    let sidebarContainer = document.getElementById("sidebar-container");
    
    if (sidebarContainer) {
        fetch('sidebar.html')
            .then(response => response.text())
            .then(content => {
                sidebarContainer.innerHTML = content;
            })
            .catch(error => {
                console.error("Error loading the sidebar:", error);
            });
    }
});
