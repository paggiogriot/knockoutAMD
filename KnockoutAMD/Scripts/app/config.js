requirejs.config({
    baseUrl: 'Scripts',
    // SEE reference: http://requirejs.org/docs/api.html#config-shim
    // load libraries that do not support AMD
    shim: {
        modernizr:{
            // once loaded, use the global 'Modernizr' as the module value
            exports: 'Modernizr'
        },
        // bootstrap requires a dependency on jquery
        bootstrap: {
            deps: ['jquery']
        },
        //knockout: {
        //    exports: 'ko'
        //},
        // shimming didn't work for knockout.viewmodel.2.0.3
        //knockoutviewmodel: {
        //    deps: ['knockout']
        //}
    },
    paths: {
        // left side is module ID
        // right side is the path to jQuery file, relative to baseUrl.
        // Also the path should not include '.js' file extension.
        // This line is using jQuery 1.10.2 located at Scripts/jquery-1.10.2 relative to the html page
        jquery: 'jquery-1.10.2',
        modernizr: 'modernizr-2.6.2',
        bootstrap: 'bootstrap.min',

        // knockout libraries
        knockout: 'knockout-3.4.2',
        knockoutviewmodel: 'knockout.viewmodel.2.0.3',
        knockoutamd: 'knockout-amd-helpers',
        // a path to our own custom code, relative to baseUrl
        // this line is read baseUrl/path = 'Scripts/app'
        app: 'app'
    }
});

// SEE reference: https://github.com/knockout/knockout/issues/478
require(['knockout', 'knockoutamd'], function (ko) {
    // export ko as a global variable
    console.log('Exporting knockout to global');
    window.ko = ko;

    // SEE reference: https://github.com/rniemeyer/knockout-amd-helpers
    // knockout-amd-helpers plugin loaded at ko.amdTemplateEngine
    ko.amdTemplateEngine.defaultPath = 'templates';
    ko.amdTemplateEngine.defaultSuffix = '.template.html';
    ko.amdTemplateEngine.defaultRequireTextPluginName = "text";

    // now load plugins assuming knockout is available at windows.ko
    require(['knockoutviewmodel'], function () {
        console.log('Registering NonAMD knockout plugins');
        // knockout.viewmodel.2.03.js only requires that knockout be available at the global scope for it to work
        // do stuff
    });

    // load the main app module to start the app
    // it is looking for 'main.js' in 'Scripts/app' folder defined in the paths configuration
    requirejs(["app/main"]);
});



console.log("requirejs configuration loaded");