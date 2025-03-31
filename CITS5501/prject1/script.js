const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

hiddenElements.forEach((element) => {
    observer.observe(element);
});

$(document).ready(function () {
    let checkboxes = $(".form-check-input"); // Cache checkboxes for faster access
    let toastEl = document.getElementById("catToast");
    let toast = new bootstrap.Toast(toastEl, { autohide: false });

    $(document).on("change", ".form-check-input", function () {
        if (checkboxes.filter(":checked").length === checkboxes.length) {
            showToastWithCat();
        } else {
            toast.hide(); // Hide toast when a checkbox is unticked
        }
    });

    function showToastWithCat() {
        toast.show(); // Show toast

        $.ajax({
            url: "https://api.thecatapi.com/v1/images/search?mime_types=gif",
            method: "GET",
            success: function (data) {
                if (data.length > 0) {
                    $("#catImage").attr("src", data[0].url);
                } else {
                    alert("No cat GIF found. Try again.");
                }
            },
            error: function () {
                $("#catImage").attr("src", ""); // Clear image on failure
                alert("Failed to load cat GIF. Try again.");
            },
        });
    }
});

function updateCheckBoxCount() {
    const total = $(".form-check-input").length;
    const checked = $(".form-check-input:checked").length;
    $("#checkboxCount").text(`Checked: ${checked} / ${total}`);
}
updateCheckBoxCount();

$(".form-check-input").on("change", function () {
    updateCheckBoxCount();
});

var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
