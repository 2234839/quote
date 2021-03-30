import type Electron from "electron";

const electron = ("electron" in globalThis
  ? (globalThis as any).electron
  : require("electron")) as typeof Electron;

const { shell, clipboard, ipcRenderer, dialog } = electron;

export function useElectron() {
  return electron;
}

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
