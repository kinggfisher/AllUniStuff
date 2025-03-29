const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }else{
            entry.target.classList.remove('show');
        }
    });
});

hiddenElements.forEach(element => {
    observer.observe(element);
});


$(document).ready(function () {
    $(".form-check-input").on("change", function () {
        if ($(".form-check-input:checked").length === $(".form-check-input").length) {
            // Load the cat GIF properly
            $.ajax({
                url: "https://cataas.com/cat/gif",
                method: "GET",
                xhrFields: { responseType: "blob" },
                success: function (data) {
                    let reader = new FileReader();
                    reader.onloadend = function () {
                        $("#catImage").attr("src", reader.result);
                    };
                    reader.readAsDataURL(data);
                },
                error: function () {
                    alert("Failed to load cat GIF. Try again.");
                }
            });
        } else {
            $("#catImage").attr("src", ""); // Clear image if unchecked
        }
    });
});

function updateCheckBoxCount(){
    const total = $(".form-check-input").length;
    const checked = $(".form-check-input:checked").length;
    $('#checkboxCount').text(`Checked: ${checked} / ${total}`);
}
updateCheckBoxCount();

$(".form-check-input").on("change", function () {
    updateCheckBoxCount();
});


