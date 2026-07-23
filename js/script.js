/*
=========================================
LEDYVAS WEBSITE
Main JavaScript
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Ledyvas Website Loaded");

    // Language selector
    const language = document.getElementById("language");

    if (language) {

        language.addEventListener("change", () => {

            console.log("Selected language:", language.value);

            // Future multilingual system

        });

    }

    // Disable placeholder links
    const links = document.querySelectorAll('a[href="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (event) {

            event.preventDefault();

        });

    });

});