document.addEventListener("DOMContentLoaded", () => {
  const plantList = document.getElementById("plantList");
  const addPlantBtn = document.getElementById("addPlantBtn");
  const plantModal = document.getElementById("plantModal");
  const closeModal = document.getElementById("closeModal");
  const plantForm = document.getElementById("plantForm");

  let plants = [];

  // Modal toggle
  addPlantBtn.addEventListener("click", () => {
    plantModal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    plantModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target == plantModal) plantModal.style.display = "none";
  });

  // Add plant
  plantForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("plantName").value;
    const type = document.getElementById("plantType").value;
    const reminder = document.getElementById("reminderDate").value;
    const info = document.getElementById("plantInfo").value;

    const newPlant = { id: Date.now(), name, type, reminder, info };
    plants.push(newPlant);
    displayPlants();
    plantForm.reset();
    plantModal.style.display = "none";

    // TODO: Save to SQL database via API
    // fetch('/api/addPlant', { method: 'POST', body: JSON.stringify(newPlant) })
  });

  // Remove plant
  function removePlant(id) {
    plants = plants.filter(p => p.id !== id);
    displayPlants();

    // TODO: Remove from SQL database
    // fetch(`/api/deletePlant/${id}`, { method: 'DELETE' })
  }

  // Display all plants
  function displayPlants() {
    plantList.innerHTML = "";
    plants.forEach(plant => {
      const plantCard = document.createElement("div");
      plantCard.classList.add("plant-card");
      plantCard.innerHTML = `
        <button class="remove-btn" onclick="removePlant(${plant.id})">×</button>
        <h3>${plant.name}</h3>
        <p><strong>Type:</strong> ${plant.type}</p>
        <p><strong>Water on:</strong> ${plant.reminder}</p>
        <p>${plant.info}</p>
      `;
      plantList.appendChild(plantCard);
    });
  }

  // Expose function to global for inline onclick
  window.removePlant = removePlant;

  // TODO: Load from SQL DB on init
  // fetch('/api/getPlants').then(res => res.json()).then(data => {
  //   plants = data;
  //   displayPlants();
  // });
});
