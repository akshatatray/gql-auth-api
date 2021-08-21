import "reflect-metadata";
import express from "express";

(async () => {
    const app = express();
    app.get("/", (_req, res) => res.send("Hello World!"));
    app.listen(4000, () => {
        console.log("App is running on port 4000");
    });
})();
