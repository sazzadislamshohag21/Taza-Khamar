/* ==========================================================================
   Taza Khamar — Farmers page
   ========================================================================== */

let activeDivision = "all";

function renderDivisionFilter() {
  const divisions = ["all", ...DIVISIONS];
  document.getElementById("divisionFilter").innerHTML = divisions
    .map((d) => `<button class="${d === activeDivision ? "active" : ""}" data-div="${d}">${d === "all" ? t("farmerspage.all") : d}</button>`)
    .join("");
  document.querySelectorAll("#divisionFilter button").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeDivision = btn.dataset.div;
      renderDivisionFilter();
      renderFarmersGrid();
    });
  });
}

function renderFarmersGrid() {
  const list = activeDivision === "all" ? FARMERS : FARMERS.filter((f) => f.division === activeDivision);
  document.getElementById("farmersFullGrid").innerHTML = list.map(renderFarmerCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderDivisionFilter();
  renderFarmersGrid();
});
document.addEventListener("tk:langchange", () => {
  renderDivisionFilter();
  renderFarmersGrid();
});
