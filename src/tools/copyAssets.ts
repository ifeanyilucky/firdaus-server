import * as shell from "shelljs";
import path from "path";

shell.cp("-R", path.join(__dirname, "../views"), "dist/");
