import * as shell from "shelljs";

shell.cp("-R", ["src/views", "src/public", "src/tmp"], "dist/");
