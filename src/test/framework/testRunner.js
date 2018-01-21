/*
 * Copyright (c) [2010-2017] Visier Solutions Inc. All rights reserved.
 */

baseLibsURL = '../../';

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;

SystemJS.registerDynamic("proto/generated/dto", [], true, function(require, exports, module) {
  module.exports = protobuf.roots.protobuf;
});

function getTestName(module) {
    // a unit_test needs to be under "tests" folder and ends with ".spec.ts"
    const regex = new RegExp("(?:\/([a-zA-Z_0-9]+))+.spec$");
    const results = regex.exec(module.name);
    return results ? results[results.length - 1] : undefined;
}

function startTest() {
    let modules = System.defined;
    const executeJasmine = window.onload;
    window.onload = function () {};

    const testRuns = [];
    for (let moduleName in modules) {
        if (modules.hasOwnProperty(moduleName)) {
            const module = modules[moduleName];
            const testName = getTestName(module);
            if (testName !== undefined) {
                testRuns.push(System.import(moduleName));
            }
        }
    }

    // wait until everything has either resolved or rejected by SystemJs, before start the jasmine runner
    Promise.all(testRuns).then(function () {
        executeJasmine();
    }, function (error) {
        throw error;
    });
}
