const _ = require('lodash');
const chalk = require('chalk');
const table = require('text-table');
const beeper = require('beeper');

function report(results) {
    if (!results.length) { return; }

    const grouped = _.groupBy(results, 'fullPath');
    const output = _.map(grouped, reportFile).join('\n');

    console.log(output);
    beeper();
}

function reportFile(results, file) {
    return [
        '',
        chalk.underline(file),
        table(_.map(results, reportError), {
            align: ['', 'r', 'l', 'l', 'r'],
            stringLength: (str) => chalk.stripColor(str).length
        }),
        ''
    ].join('\n');
}

function reportError(error) {
    return [
        '',
        chalk.dim(`${error.line}:${error.column}`),
        error.severity === 'error' ? chalk.red(error.severity) : chalk.yellow(error.severity),
        error.message,
        chalk.dim(error.linter)
    ];
}

module.exports = {
    report: report
};
