// Dynamic data for each menu
const menuData = {
    departmentMenu: ["Department 1", "Department 2", "Department 3"],
    intakeMenu: ["Intake 1", "Intake 2"],
    sectionMenu: ["Section A", "Section B"],
    courseMenu: ["Course 1", "Course 2", "Course 3"]
};

// Function to display sub-options right below the clicked item
function showOptions(menuId, button) {
    // Clear any previously displayed submenu
 const existingSubmenu = button.nextSibling;
 const isexist = existingSubmenu&&existingSubmenu?.classList?.contains("submenu")
  if(isexist){
    closeAllSubmenus()
    return;
  }

    // Create a submenu element
    const submenu = document.createElement("div");
    submenu.classList.add("submenu");

    // Populate submenu with options from menuData
    menuData[menuId].forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.innerText = option;
        optionButton.onclick = () => {
            if (menuId === "courseMenu") {    
                showContent(option);
            } else {
                // Show next level options based on clicked menu
                showOptions(nextMenu(menuId), optionButton);
            }
        };
        submenu.appendChild(optionButton);
    });

    // Insert submenu right after the clicked button
    button.parentNode.insertBefore(submenu, button.nextSibling);

    // Display the submenu with animation
    submenu.style.display = "flex";
    setTimeout(() => {
        submenu.style.opacity = "1";
    }, 100);
}

// Helper function to get the next menu ID based on current menu
function nextMenu(currentMenuId) {
    const menuOrder = ["departmentMenu", "intakeMenu", "sectionMenu", "courseMenu"];
    const currentIndex = menuOrder.indexOf(currentMenuId);
    return menuOrder[currentIndex + 1];
}

// Function to close all open submenus
function closeAllSubmenus() {
    document.querySelectorAll(".submenu").forEach(submenu => {
        submenu.style.display = "none";
        submenu.remove();
    });
}

// Function to show the content in the main display area
function showContent(contentTitle) {
    closeAllSubmenus();
    document.getElementById('page-title').innerText = contentTitle;
    document.getElementById('content-display').innerHTML = `<p>Showing ${contentTitle}... </p> <br> <h3> ops ! </h3>  <p>  nothing found!</p>`;
}
function show(contentTitle) {
    closeAllSubmenus();
    document.getElementById('page-title').innerText = contentTitle;
    document.getElementById('content-display').innerHTML = `<p> ${contentTitle} is underdevelopment...</p>`;
}
