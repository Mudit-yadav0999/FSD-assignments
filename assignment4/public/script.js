const form = document.getElementById("requestForm");
const requestsList = document.getElementById("requestsList");

// GET - Get all requests
async function getRequests() {
    const response = await fetch("/api/requests");
    const requests = await response.json();

    displayRequests(requests);
}


// Display requests on webpage
function displayRequests(requests) {

    requestsList.innerHTML = "";

    if (requests.length === 0) {
        requestsList.innerHTML = "<p>No requests submitted yet.</p>";
        return;
    }

    requests.forEach(request => {

        const div = document.createElement("div");

        div.className = "request";

        div.innerHTML = `
            <h3>${request.category}</h3>

            <p>
                <strong>Student:</strong>
                ${request.studentName}
            </p>

            <p>
                <strong>Email:</strong>
                ${request.email}
            </p>

            <p>
                <strong>Problem:</strong>
                ${request.description}
            </p>

            <p>
                <strong>Priority:</strong>
                ${request.priority}
            </p>

            <div class="actions">

                <button
                    class="edit"
                    onclick="editRequest(${request.id})">
                    Edit
                </button>

                <button
                    class="delete"
                    onclick="deleteRequest(${request.id})">
                    Delete
                </button>

            </div>
        `;

        requestsList.appendChild(div);
    });
}


// POST - Submit new request
form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const requestData = {
        studentName: document.getElementById("studentName").value,
        email: document.getElementById("email").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value
    };

    await fetch("/api/requests", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(requestData)
    });

    form.reset();

    getRequests();
});


// DELETE - Delete request
async function deleteRequest(id) {

    await fetch(`/api/requests/${id}`, {
        method: "DELETE"
    });

    getRequests();
}


// PUT - Update request
async function editRequest(id) {

    const response = await fetch(`/api/requests/${id}`);
    const request = await response.json();

    const studentName = prompt(
        "Student Name:",
        request.studentName
    );

    const email = prompt(
        "Email:",
        request.email
    );

    const category = prompt(
        "Category:",
        request.category
    );

    const description = prompt(
        "Problem Description:",
        request.description
    );

    const priority = prompt(
        "Priority:",
        request.priority
    );

    if (
        !studentName ||
        !email ||
        !category ||
        !description ||
        !priority
    ) {
        return;
    }

    const updatedRequest = {
        studentName: studentName,
        email: email,
        category: category,
        description: description,
        priority: priority
    };

    await fetch(`/api/requests/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedRequest)
    });

    getRequests();
}


// Load requests when page opens
getRequests();