console.log(" DASHBOARD.JS CONNECTED — Using Rails API");

// Backend URL
const API_URL = "https://manihospital-api.onrender.com/patients";

document.addEventListener("DOMContentLoaded", () => {

 
  // FORM + UI ELEMENTS
 

  const patientForm = document.getElementById("patientForm");
  const patientTableBody = document.getElementById("patientTableBody");
  const logoutBtn = document.getElementById("logoutBtn");

  // Add form
  const patientName = document.getElementById("patientName");
  const patientAge = document.getElementById("patientAge");
  const patientCondition = document.getElementById("patientCondition");
  const assignedDoctor = document.getElementById("assignedDoctor");
  const roomNumber = document.getElementById("roomNumber");
  const patientStatus = document.getElementById("patientStatus");

  // Edit modal
  const editForm = document.getElementById("editPatientForm");
  const editModal = new bootstrap.Modal(document.getElementById("editPatientModal"));

  const editPatientId = document.getElementById("editPatientId");
  const editPatientName = document.getElementById("editPatientName");
  const editPatientAge = document.getElementById("editPatientAge");
  const editPatientCondition = document.getElementById("editPatientCondition");
  const editPatientDoctor = document.getElementById("editPatientDoctor");
  const editPatientRoom = document.getElementById("editPatientRoom");
  const editPatientStatus = document.getElementById("editPatientStatus");

  // Load initial data
  loadPatients();

 
  // FETCH ALL PATIENTS


  async function loadPatients() {
    try {
      const response = await fetch(API_URL);
      const patients = await response.json();

      renderPatients(patients);
      updateCharts(patients);

    } catch (err) {
      console.error("❌ Failed to fetch patients:", err);
      alert("Cannot connect to server.");
    }
  }


  // ADD PATIENT
 

  patientForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPatient = {
      patient: {
        name: patientName.value.trim(),
        age: patientAge.value.trim(),
        condition: patientCondition.value.trim(),
        doctor: assignedDoctor.value.trim(),
        room: roomNumber.value.trim(),
        status: patientStatus.value
      }
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPatient)
      });

      if (res.ok) {
        patientForm.reset();
        loadPatients();
      } else {
        alert("Error adding patient.");
      }
    } catch (err) {
      console.error("❌ POST error:", err);
    }
  });


  // RENDER TABLE
  

  function renderPatients(patients) {
    patientTableBody.innerHTML = "";

    patients.forEach((p) => {
      const row = document.createElement("tr");

      row.classList.add(
        p.status === "Admitted" ? "admitted-row" : "discharged-row"
      );

      row.innerHTML = `
        <td>${p.name}</td>
        <td>${p.age}</td>
        <td>${p.condition}</td>
        <td>${p.doctor}</td>
        <td>${p.room}</td>

        <td>
          <span class="badge ${p.status === "Admitted" ? "bg-success" : "bg-secondary"}">
            ${p.status}
          </span>
        </td>

        <td>
          <button class="btn btn-warning btn-sm edit-btn" data-id="${p.id}">✏ Edit</button>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${p.id}">🗑 Delete</button>
        </td>
      `;

      patientTableBody.appendChild(row);
    });
  }


  // EDIT/LOAD INTO MODAL


  patientTableBody.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("edit-btn")) return;

    const id = e.target.dataset.id;

    try {
      const res = await fetch(`${API_URL}/${id}`);
      const p = await res.json();

      editPatientId.value = p.id;
      editPatientName.value = p.name;
      editPatientAge.value = p.age;
      editPatientCondition.value = p.condition;
      editPatientDoctor.value = p.doctor;
      editPatientRoom.value = p.room;
      editPatientStatus.value = p.status;

      editModal.show();
    } catch (err) {
      console.error("❌ Error loading patient:", err);
    }
  });


  // SAVE CHANGES 

  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = editPatientId.value;

    const updatedPatient = {
      patient: {
        name: editPatientName.value.trim(),
        age: editPatientAge.value.trim(),
        condition: editPatientCondition.value.trim(),
        doctor: editPatientDoctor.value.trim(),
        room: editPatientRoom.value.trim(),
        status: editPatientStatus.value
      }
    };

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPatient)
      });

      if (res.ok) {
        editModal.hide();
        loadPatients();
      } else {
        alert("Error updating patient.");
      }
    } catch (err) {
      console.error("❌ PUT error:", err);
    }
  });

 
  // DELETE PATIENT

  patientTableBody.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("delete-btn")) return;

    const id = e.target.dataset.id;

    if (!confirm("Delete this patient?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (res.ok) {
        loadPatients();
      } else {
        alert("Failed to delete patient.");
      }
    } catch (err) {
      console.error("❌ DELETE error:", err);
    }
  });

  // LOGOUT
 
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});


// CHART HANDLING

let statusChart = null;
let doctorChart = null;

function updateCharts(patients) {

  //  COUNT STATUSES 
  const admitted = patients.filter(p => p.status === "Admitted").length;
  const discharged = patients.filter(p => p.status === "Discharged").length;

  //  COUNT DOCTOR LOAD 
  const doctorCounts = {};
  patients.forEach(p => {
    doctorCounts[p.doctor] = (doctorCounts[p.doctor] || 0) + 1;
  });

  const doctorLabels = Object.keys(doctorCounts);
  const doctorValues = Object.values(doctorCounts);

  // Destroy existing charts (prevents duplicates)
  if (statusChart) statusChart.destroy();
  if (doctorChart) doctorChart.destroy();

  //  PIE CHART 
  const ctx1 = document.getElementById("statusChart").getContext("2d");
  statusChart = new Chart(ctx1, {
    type: "pie",
    data: {
      labels: ["Admitted", "Discharged"],
      datasets: [{
        data: [admitted, discharged],
        backgroundColor: ["#28a745", "#6c757d"]
      }]
    }
  });

  // BAR CHART 
  const ctx2 = document.getElementById("doctorChart").getContext("2d");
  doctorChart = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: doctorLabels,
      datasets: [{
        label: "Patients",
        data: doctorValues,
        backgroundColor: "#0d6efd"
      }]
    }
  });
}
