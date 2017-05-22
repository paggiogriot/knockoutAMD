define(["knockout", "jquery"], function (ko, $) {
    function messageEditorVM(params) {

        this.text = ko.observable(params && params.initialText || '');
        this._original = this.text();
        this.editable = ko.observable(params && params.editable || true);
        // user gives a promise saveFn
        this.saveFn = params && params.saveFn || _saveFn;
        // user gives a normal function
        this.saveSuccessFn = params && params.saveSuccessFn || _saveSuccessFn;
        // user gives a normal function
        this.saveFailFn = params && params.saveFailFn || _saveFailFn;
        this.showRevert = ko.pureComputed(function () {
            return this._original !== this.text();
        });


        // internal functions
        function _saveFn() {
            var deferred = $.Deferred();
            deferred.resolve(true);
            return deferred.promise();
        };
        function _saveSuccessFn() {
            this._original = this.text();
            this.editable(false);
        };
        function _saveFailFn () {

        };
    }

    // add functions like edit, save, submit
    messageEditorVM.prototype.Save = function () {

        // user gives: savePromise, saveSuccessPromise, saveFailPromise
        // user defined save callback as a promise
        // if success then continue with internal functions
        // if failure then do something else
        var deferred = $.Deferred();
        var self = this;
        this.saveFn()
            .then(function (response) {
                self._original = self.text();
                self.editable(false);
                // resolve the promise
                deferred.resolve({
                    success: true,
                    text: this._original
                });
            }).fail(function (response) {

                console.log("something went terribly wrong");
                // reject the promise
                deferred.reject({
                    success: false,
                    text: response && response.statusCode + ' - ' + response.statusText
                });
            });
        
        // returns the promise object
        return deferred.promise();
    }

    messageEditorVM.prototype.Cancel = function () {
        this.revert();
        this.editable(false);
    }

    messageEditorVM.prototype.Edit = function () {
        this.editable(true);
    }

    messageEditorVM.prototype.submit = function () {
        console.log("submitted");
        // call the viewmodels submit function reference
    };

    messageEditorVM.prototype.toggleEditable = function () {
        this.editable(!ko.unwrap(this.editable));
    }

    messageEditorVM.prototype.revert = function () {
        this.text(this._original);
    }

    messageEditorVM.prototype.dispose = function () {
        // computed observable on an external observable
        // subscriptions on an external observable
        // setInterval
    }

    return messageEditorVM;
});