import { sleep } from "../../common_ts";
import { Service } from "./Service";
import Electron from "electron";

import type robotType from "robotjs";
import { Logger } from "../logger";
const robot = require("robotjs") as typeof robotType;

console.log(__dirname, 333);
const t = require("../../input-hook/build/Release/hello.node");

/** 提供电脑控制方面的方法 */
export class RobotService extends Service {
  constructor(logger: Logger) {
    super(logger);
    console.log(77777);
  }
  async 切换应用() {
    robot.keyTap("tab", "alt");
  }
  async 粘贴() {
    robot.keyTap("v", "control");
  }
  async test() {
    const clipboard = Electron.clipboard;

    console.log("test2");

    setInterval(() => {
      robot.keyTap("home", "shift");
      robot.keyTap("c", "control");
      robot.keyTap("right");
      const c = clipboard.readText();
      console.log("[c]", c);
    }, 5000);
  }
}
