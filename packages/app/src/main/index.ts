import { app, BrowserWindow } from "electron";
import "./dialog";
import { Logger } from "./logger";
import { initialize } from "./services";
import createBaseWorker from "./workers/index?worker";
import indexPreload from "/@preload/index";
import anotherPreload from "/@preload/another";
import indexHtmlUrl from "/@renderer/index.html";
import sideHtmlUrl from "/@renderer/side.html";
import logoUrl from "/@static/logo.png";
import { globalShortcut } from "electron/main";
import { mainWindowState } from "/@shared/hook/ipc";
import { watchEffect } from "vue";

async function main() {
  const logger = new Logger();
  logger.initialize(app.getPath("userData"));
  initialize(logger);
  app.whenReady().then(() => {
    const main = createWindow();
    main.hide();
    // const [x, y] = main.getPosition();
    // const side = createSecondWindow();
    // side.setPosition(x + 800 + 5, y);

    globalShortcut.register("CommandOrControl+J", function () {
      main.show();
      // dialog.showMessageBox({
      //   type: 'info',
      //   message: '成功!',
      //   detail: '你按下了一个全局注册的快捷键绑定.',
      //   buttons: ['好的']
      // })
    });
  });

  // thread_worker example
  createBaseWorker({ workerData: "worker world" })
    .on("message", (message) => {
      logger.log(`Message from worker: ${message}`);
    })
    .postMessage("");
}

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    height: 600,
    width: 350,
    frame: false,
    transparent: true,
    maximizable: false,
    webPreferences: {
      preload: indexPreload,
      contextIsolation: true,
      nodeIntegration: false,
    },
    icon: logoUrl,
  });

  win.loadURL(indexHtmlUrl);

  win.removeMenu();
  win.setAlwaysOnTop(true, "screen-saver");
  win.moveTop();

  win.on(
    "show",
    () => (mainWindowState.value = { isShow: true, t: Date.now() })
  );
  win.on(
    "hide",
    () => (mainWindowState.value = { isShow: false, t: Date.now() })
  );
  watchEffect(() => {
    console.log("[mainWindowState]", mainWindowState.value);
  });

  return win;
}

function createSecondWindow() {
  const sideWindow = new BrowserWindow({
    height: 600,
    width: 300,
    webPreferences: {
      preload: anotherPreload,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  sideWindow.loadURL(sideHtmlUrl);
  return sideWindow;
}

// ensure app start as single instance
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

process.nextTick(main);
