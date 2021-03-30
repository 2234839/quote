export function add(a: number, b: number) {
  return a + b;
}

export function env_isRenderer() {
  return "electron" in globalThis;
}
