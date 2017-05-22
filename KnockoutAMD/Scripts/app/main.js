
define(["jquery", 'modernizr', 'knockout', 'app/viewModel'], function ($, Modernizr, ko, viewModel) {
    $(function () {
        console.log("main.js loaded with jQuery");

        if (Modernizr._version) {
            console.log("main.js loaded with Modernizer " + Modernizr._version);
        }

        // only call applyBindings once per html scope
        ko.applyBindings(new viewModel(), document.getElementById("firstViewModel"));
        ko.applyBindings(new viewModel(), document.getElementById("secondViewModel"));
    });
});