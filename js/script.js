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
          <button type="button" class="text-green-600 flex" id="removeListFeature">
            <i class="ph-bold ph-check-circle text-lg"></i>
          </button>
          <span>${featureText}</span>
          <button type="button" class="text-red-500 ml-auto removeFeature">
            <i class="ph-bold ph-trash text-lg"></i>
          </button>
        </div>
      `;

    // Agar "No features added" message hai, usko remove karo
    $("#featureList p").remove();
    $("#featureList").prepend(featureHTML);
    $("#featureInput").val(""); // Clear input after adding
  });

  $(document).on("click", ".removeFeature", function () {
    $(this).parent().remove();
    updateFeatureMessage();
  });

  $(document).on("click", "#removeListFeature", function () {
    let icon = $(this).find("i");

    if (icon.hasClass("ph-check-circle")) {
      icon
        .removeClass("ph-check-circle text-green-600 checked")
        .addClass("ph-x-circle text-red-600 unchecked");
    } else {
      icon
        .removeClass("ph-x-circle text-red-600 unchecked")
        .addClass("ph-check-circle text-green-600 checked");
    }
  });

  $(".imageUpload").on("change", function (event) {
    const file = event.target.files[0]; // Selected file ko get karo
    if (file) {
      const reader = new FileReader();
      const previewContainer = $(this).siblings(".previewContainer");

      reader.onload = function (e) {
        previewContainer.html(`
                    <img src="${e.target.result}" alt="Uploaded Image" 
                         class="w-32 h-32 object-cover rounded border border-gray-300 shadow">
                `);
      };

      reader.readAsDataURL(file);
    }
  });
});
