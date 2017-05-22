define(["knockout"], function (ko) {
    ko.components.register("message-editor", {
        // inline viewmodel
        //viewModel: function (params) {
        //    this.text = ko.observable(params && params.initialText || '');
        //    this.text2 = params.obs || ko.observable('Empty obs');
        //},
        // hardcoded template html string
        //template: 'Message: <input data-bind="value: text" />'
        //        + '(length: <span data-bind="text: text().length"></span>)'
        //        + 'Text2: <input data-bind="value: text2" />'

        viewModel: { require: 'app/message-editor' },
        template: { require: 'text!templates/message-editor.template.html' }
    });
});