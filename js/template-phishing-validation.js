function validateForm() {
  const name = $("#name").val();
  const language = $("#language").val();
  const phishType = $("#phishType").val();
  
  let content = document.getElementById('summernote').innerHTML;
  // Perform validation checks
  if (!name || !language || !phishType || !content) {
    alert("Please fill out all required fields.");
    return false; // Prevent form submission
  }
  return true; // Allow form submission
}

$(document).ready(function () {
  $(".summernote").summernote({
    height: 400,
    focus: true,
  });

  $("form").submit(function (event) {
    
    if (!validateForm()) {
      event.preventDefault(); // Prevent form submission if validation fails
      this.submit
    }
  });
});

async function fetchData() {
  try {
    event.preventDefault();

    const phishingPageImportUrl = $("#phishingPageURL").val();
    document.getElementById("summernote").innerHTML = "";

    var selectElement = document.getElementById("language");
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedValue = selectedOption.value;


    let lang = encodeURIComponent(selectedValue);
    $.ajax({
      url: `/commons/getPhishPage/${encodeURIComponent(
        phishingPageImportUrl
      )}/${lang}`, // Encode the URL to ensure it's properly passed in the URL
      method: "GET",
      success: function (response) {
        //console.log(response)
        var summernoteDiv = document.getElementById("summernote");

        //document.getElementById("summernote").innerHTML = response;
        // Define the value you want to add
        var valueToAdd = response;

        // Set the innerHTML of the div to the new value
        summernoteDiv.innerHTML = valueToAdd;
      },
      error: function (xhr, status, error) {
        // Handle error
        console.error("Error:", error);
      },
    });

    // Handle response data
  } catch (error) {
    // Handle error
    console.error("Error:", error);
  }
}
