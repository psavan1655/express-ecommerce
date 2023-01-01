import chalk from "chalk";

export default (app) => {
  app.response.success = async function (
    payload,
    code,
    model,
    action,
    userId,
    difference
  ) {
    console.log(chalk.green(payload));
    // if (model && action) {
    //   const auditLog = new AuditLogs({
    //     userId,
    //     action,
    //     model,
    //     data: JSON.stringify(data),
    //     difference,
    //     isSuccess: true,
    //   });
    //   await auditLog.save();
    // }
    this.status(code).send(payload);
    console.log(chalk.bgGreen(chalk.black("Exited with Success Response\n")));
  };

  app.response.error = async function (payload, code, model, action, userId) {
    console.log(chalk.red(payload));
    // if (model && action) {
    //   const auditLog = new AuditLogs({
    //     userId,
    //     action,
    //     model,
    //     data: JSON.stringify(data),
    //     isSuccess: false,
    //   });
    //   await auditLog.save();
    // }
    this.status(code).send(payload);

    console.log(chalk.bgRed(chalk.black("Exited with Error Response\n")));
  };

  app.response.unauthorizedUser = () => {
    console.log(chalk.yellow("Unauthorized User"));
    this.status(403).send(
      Response("error", "Unauthorized User", null, null, 403)
    );
    console.log(
      chalk.bgYellow(
        chalk.black(
          "Exited with Error response because user is not authorized to use this app\n"
        )
      )
    );
  };

  app.response.accessDenied = async function () {
    console.log(chalk.cyan("Access Denied. Check role of User and RBAC list"));
    this.status(403).send(Response("error", "Access Denied", null, null, 403));
    console.log(
      chalk.bgCyan(
        chalk.black(
          "Exited with Error response because user dont have to permission to access this module\n"
        )
      )
    );
  };
};
