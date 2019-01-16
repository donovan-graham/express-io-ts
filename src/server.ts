import app from "./app";

const port: number = 3000;

const server = app.listen(port, () => {
  console.log(
    `  App is running at http://localhost:${port} in ${app.get("env")} mode`,
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
