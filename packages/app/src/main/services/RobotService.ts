import { sleep } from "../../common_ts";
import { Service } from "./Service";

import type robotType from "robotjs";
const robot = require("robotjs") as typeof robotType;
console.log(11111111111111111, robot);

console.log(__dirname, 333);
const t = require("../../input-hook/build/Release/hello.node");

/** 提供电脑控制方面的方法 */
export class RobotService extends Service {
  async 切换应用() {
    robot.keyTap("tab", "alt");
  }
  async 粘贴() {
    robot.keyTap("v", "control");
  }
}
