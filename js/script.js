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

  function handleImageUpload(inputElement) {
    const files = Array.from(inputElement.files); // Selected files ko array me convert karo
    const previewContainer = $(inputElement).siblings(".previewContainer");
    previewContainer.html(""); // Purane previews clear karo

    let fileList = []; // Naya array banayenge jo properly manage karega

    files.forEach((file, index) => {
      fileList.push(file); // File ko list me add karo
      const reader = new FileReader();
      reader.onload = function (e) {
        previewContainer.append(`
                <div class="relative w-32 h-32 m-2 inline-block group rounded overflow-hidden" data-index="${index}">
                    <img src="${e.target.result}" alt="Uploaded Image" 
                         class="w-full h-full object-contain border border-stone-200 bg-stone-100">
                    <button class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity removeImage"
                            data-index="${index}">
                        <i class="ph ph-trash text-white text-2xl"></i>
                    </button>
                </div>
            `);
      };
      reader.readAsDataURL(file);
    });

    $(inputElement).data("fileList", fileList); // Updated file list ko store karo
  }

  // Function to remove image from preview and input field
  function removeImage(event, inputElement) {
    const indexToRemove = $(event.currentTarget).parent().data("index"); // Remove hone wali image ka index lo
    $(event.currentTarget).parent().remove(); // Image preview remove karo

    let fileList = $(inputElement).data("fileList") || [];

    // Naye fileList se remove karo
    fileList = fileList.filter((file, index) => index !== indexToRemove);

    // DataTransfer ka use karke input field update karo
    let dataTransfer = new DataTransfer();
    fileList.forEach((file) => dataTransfer.items.add(file));

    inputElement.files = dataTransfer.files; // Input field ko update karo
    $(inputElement).data("fileList", fileList); // Updated file list store karo
  }

  // Event Listener for File Upload
  $(".imageUpload").on("change", function () {
    handleImageUpload(this);
  });

  // Event Listener for Removing Image
  $(document).on("click", ".removeImage", function (event) {
    removeImage(event, $(".imageUpload")[0]);
  });
});
