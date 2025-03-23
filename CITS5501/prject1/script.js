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
