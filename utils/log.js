const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
			case "warn":
						console.log(chalk.yellow('[ ❕ ] » ') + data);
									break;
											case "error":
														console.log(chalk.red('[ ❕ ] » ') + data);
																	break;
																			default:
																						console.log(chalk.magenta(`${option} » `) + data);
																									break;
																										}
																										}
module.exports.loader = (data, option) => {
	switch (option) {
			case "warn":
						console.log(chalk.yellow('[ ItoKami ] » ') + data);
									break;
											case "error":
														console.log(chalk.red('[ ItoKami ] » ') + data);
																	break;
																			default:
																						console.log(chalk.blue(`[ itoKami ] » `) + data);
																									break;
																										}
																										}