// main view model class
define(["knockout", "jquery", "app/knockout.components"], function (ko, $) {


    var mockJsonData = {
        users: [
            { firstName: "John", lastName: "Doe" },
            { firstName: "James", lastName: "Smith" }
        ]
    }

    // return a constructor function
    return function viewModel() {
        console.log("creating viewmodel");
        var self = this;

        self.firstName = ko.observable('Brandon');
        self.firstNameCaps = ko.pureComputed(function () {
            return self.firstName().toUpperCase();
        });

        self.saveFn = function () {
            var deferred = $.Deferred();

            // simulate a 5 second ajax call
            setTimeout(function () {
                console.log("simulating 5 second ajax call");
                //deferred.resolve(true);
                deferred.reject();
            }, 5000);


            return deferred.promise();
        };

        self.users = ko.observableArray(mockJsonData.users);

        return self;


        //this.firstName = ko.observable('Bert');
        //this.firstNameCaps = ko.pureComputed(function () {
        //    return this.firstName().toUpperCase();
        //}, this);
    };
});