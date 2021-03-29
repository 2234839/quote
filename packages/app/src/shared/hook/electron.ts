import type Electron from "electron";

const { shell, clipboard, ipcRenderer, dialog } = ("electron" in globalThis
  ? (globalThis as any).electron
  : require("electron")) as typeof Electron;

export function useShell() {
  return shell;
}

export function useClipboard() {
  return clipboard;
}

export function useIpc() {
  return ipcRenderer;
}

export function useDialog() {
  return dialog;
}
