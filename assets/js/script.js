
var containerEl = $('.container');
var submitBtn = $('#formSubmit');
var table = $('#projTable');
var pName = $('input[name="projName"]');
var pType = $('#projType');
var pDate = $('input[name="projDate"]');
var projList = [];

// Timer for updating current date and Time
var timerInterval = setInterval(function () {
    var currentDate = new Date();
    var displayDateTime = currentDate.toLocaleString();
    $('#currDateTime').text(displayDateTime); // Update the current date & time
}, 1000);

// On clicking the Submit button
submitBtn.on('click', function (event) {
    event.preventDefault();
    console.log("submit button on form clicked");

    // Get the form values
    var projectName = pName.val();
    var projectTypeValue = pType.val();
    var projectDate = pDate.val();

    
    var projectTypeName;

    if (projectTypeValue === "1") {
        projectTypeName = "JavaScript";
    } else if (projectTypeValue === "2") {
        projectTypeName = "JQuery";
    } else if (projectTypeValue === "3") {
        projectTypeName = "Bootstrap";
    } else {
        projectTypeName = "not listed";
    }

    // Add to the table on the page
    var newRow = '<tr><td>' + projectName + '</td><td>' + projectTypeName + '</td><td>' + projectDate + '</td><td>' + '<a href="#" class="remove-link">Remove</a>' + '</td></tr>';
    table.find('tbody').append(newRow);

    var project = {
        name: projectName,
        type: projectTypeName,
        date: projectDate
    };
    // Add the latest projList to the ScoreList
    projList.push(project);

    // Write projList to local storage
    localStorage.setItem('projList', JSON.stringify(projList));

    // Empty out after add to prepare for the next add
    pType.val('Select Project Type');
    pDate.val('');
    pName.val('');
});

// Function to remove the row from the table and rewrite data in local storage
$(function () {
    table.on('click', '.remove-link', function (event) {
        event.preventDefault();
        var row = $(this).closest('tr');
        var index = row.index();

        // Remove project from table
        row.remove();
        projList.splice(index, 1);

        // Rewrite projList to local storage
        localStorage.setItem('projList', JSON.stringify(projList));
    });
});

// Function to create a new row in the table
function createRow(row) {
    table.find('tbody').append(row);
}
// Function to initialize the table by loading stored projects from local storage
function initTable() {
    // Get stored projects from local storage
    var storedProjList = localStorage.getItem('projList');

    if (storedProjList) {
        projList = JSON.parse(storedProjList);
        projList.forEach(function (project) {
            var newRow = '<tr><td>' + project.name + '</td><td>' + project.type + '</td><td>' + project.date + '</td><td>' + '<a href="#" class="remove-link">Remove</a>' + '</td></tr>';
            createRow(newRow);
        });
    }
}

// Initialize the table with stored projects on page load
initTable();
