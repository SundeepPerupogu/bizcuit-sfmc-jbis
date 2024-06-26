define([
    'postmonger'
], function (Postmonger) {
    'use strict';

    var connection = new Postmonger.Session();
    var payload = {};
    var steps = [
        { label: 'Configure Activity', key: 'step1' }
    ];
    var currentStep = steps[0].key;

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);

    function onRender() {
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }

        var inArguments = payload['arguments'] && payload['arguments'].execute && payload['arguments'].execute.inArguments || [];

        $.each(inArguments, function (index, inArgument) {
            if (inArgument.futureUtcTime) {
                $('#futureUtcTime').val(inArgument.futureUtcTime);
            }

            if (inArgument.userTimeZone) {
                $('#userTimeZone').val(inArgument.userTimeZone);
            }
        });

        connection.trigger('updateButton', { button: 'next', text: 'done', visible: true });
    }

    function onGetTokens(tokens) {
        // Handle tokens
    }

    function onGetEndpoints(endpoints) {
        // Handle endpoints
    }

    function onClickedNext() {
        save();
        connection.trigger('nextStep');
    }

    function onClickedBack() {
        connection.trigger('prevStep');
    }

    function onGotoStep(step) {
        showStep(step);
        connection.trigger('ready');
    }

    function showStep(step) {
        currentStep = step;

        $('.step').hide();
        $('#' + step).show();
    }

    function save() {
        var futureUtcTime = $('#futureUtcTime').val();
        var userTimeZone = $('#userTimeZone').val();

        payload['arguments'].execute.inArguments = [{
            "futureUtcTime": futureUtcTime,
            "userTimeZone": userTimeZone
        }];

        payload['metaData'].isConfigured = true;

        connection.trigger('updateActivity', payload);
    }
});
