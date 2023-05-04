require("dotenv/config");
const fs = require("fs");
const { LogPath } = require("../settings");

if (!fs.existsSync(LogPath)) fs.mkdirSync(LogPath, { recursive: true });
// if(!fs.existsSync("/src/logs/log.txt")) fs.writeFileSync("/")
const Log = async (line, callback = () => {}) => {
  line = `${Date.now().toString()} ${line}`;

  fs.writeFileSync("./src/logs/log.txt", line + "\n", {
    encoding: "utf-8",
    flag: "a+",
  });
  console.log(line);
  if (typeof callback == "function") callback();
  return line + "\n";
};

const ErrorLog = (line) => {
  const { stack } = line;
  Log(stack ? stack : line).then(async (line) => {
    fs.writeFileSync("./src/logs/errors.txt", line, {
      encoding: "utf-8",
      flag: "a+",
    });
  });
};
const RequestLog = (line) => {
  Log(line).then(async (line) => {
    fs.writeFileSync("./src/logs/requestLog.txt", line, {
      encoding: "utf-8",
      flag: "a+",
    });
  });
};

const MessageFormLog = ({ type, name, email, message }) => {
  const line = ` ${type} ${name} ${email} ${message}`;
  Log(line).then(async (l_) => {
    fs.writeFileSync("./src/logs/mrssages.txt", l_, {
      encoding: "utf-8",
      flag: "a+",
    });
  });
};

process.on("uncaughtExceptionMonitor", (err, origin) => {
  const line = `unCaught exception: ${err.message} Exception origin: ${err.stack}`;
  ErrorLog(line);
});

module.exports = {
  ErrorLog,
  RequestLog,
  Log,
  MessageFormLog,
};
