document.addEventListener("DOMContentLoaded", () => {
  const patientForm = document.getElementById("patientForm");
  const patientTableBody = document.querySelector("#patientTable tbody");
  const logoutBtn = document.getElementById("logoutBtn");

  // Load existing patients from localStorage
  let patients = JSON.parse(localStorage.getItem("patients")) || [];
  renderPatients();

  // Add new patient
  patientForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPatient = {
      id: Date.now(), // unique ID
      name: document.getElementById("patientName").value.trim(),
      age: document.getElementById("patientAge").value.trim(),
      condition: document.getElementById("patientCondition").value.trim(),
      doctor: document.getElementById("assignedDoctor").value.trim(),
      room: document.getElementById("roomNumber").value.trim(),
      status: document.getElementById("patientStatus").value
    };

    patients.push(newPatient);
    localStorage.setItem("patients", JSON.stringify(patients));

    patientForm.reset();
    renderPatients();
  });

  // Render all patients in the table
  function renderPatients() {
    patientTableBody.innerHTML = "";

    patients.forEach((patient) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${patient.name}</td>
        <td>${patient.age}</td>
        <td>${patient.condition}</td>
        <td>${patient.doctor}</td>
        <td>${patient.room}</td>
        <td>
          <span class="badge ${patient.status === 'Admitted' ? 'bg-success' : 'bg-secondary'}">
            ${patient.status}
          </span>
        </td>
        <td>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${patient.id}">
            🗑 Remove
          </button>
        </td>
      `;
      patientTableBody.appendChild(row);
    });
  }

  // 🔥 Use event delegation for delete
  patientTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = parseInt(e.target.dataset.id);
      if (confirm("Are you sure you want to remove this patient?")) {
        patients = patients.filter((p) => p.id !== id);
        localStorage.setItem("patients", JSON.stringify(patients));
        renderPatients();
      }
    }
  });

  // Logout button
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    window.location.href = "login.html";
  });
});
