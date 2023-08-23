import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import logger from "./server/utils/logger";
import initDB from "./server/database";
import serverInit from "./server";

const PORT = process.env.PORT || 3000;
const app = express();

// function isStaticRoute(requestUrl) {
//   const staticRouteSlugs = [
//     "favicon",
//     "index.html",
//     "manifest",
//     "robots.txt",
//     "static",
//     "assets",
//   ];
//   const matchedSlug = staticRouteSlugs.find(
//     (slug) => requestUrl.indexOf(slug) !== -1
//   );
//   return !!matchedSlug;
// }

// Register global middleswares for server app.
app.use(cors({ credentials: true, origin: process.env.DEFAULT_REDIRECT_URI }));
app.use(express.json({ limit: "50mb", strict: false }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(express.static("./build"));
// Initialize database.
await initDB();
// Initialize server app.
serverInit(app);
app.use("/assets", express.static("./build/assets"));
// Serve static files belonging to frontend app.
app.use("*", express.static("./build"));

app.listen(PORT, () => {
  logger.debug({ message: `Server is listening on port ${PORT}` });
});
