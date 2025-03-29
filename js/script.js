$(document).ready(function () {
  function updateFeatureMessage() {
    if ($("#featureList").children().length === 0) {
      $("#featureList").html(
        `<p class="text-stone-500 text">No features added</p>`
      );
    }
  }

  // Initialize message on page load
  updateFeatureMessage();

  $("#addFeature").click(function () {
    let featureText = $("#featureInput").val().trim();

    if (featureText === "") {
      alert("Please enter a feature!");
      return;
    }

    let featureHTML = `
        <div class="flex items-center justify-start gap-2 bg-stone-100 border border-stone-300 py-2 px-4 rounded text-stone-800">
          <i class="ph-bold ph-check-circle text-green-600"></i>
          <span>${featureText}</span>
          <button type="button" class="text-red-500 ml-auto removeFeature">
            <i class="ph-bold ph-trash text-lg"></i>
          </button>
        </div>
      `;

    // Agar "No features added" message hai, usko remove karo
    $("#featureList p").remove();
    $("#featureList").append(featureHTML);
    $("#featureInput").val(""); // Clear input after adding
  });

  $(document).on("click", ".removeFeature", function () {
    $(this).parent().remove();
    updateFeatureMessage();
  });
});
