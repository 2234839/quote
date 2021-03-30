import { env_isRenderer } from "../sharedLib";
import { computed, ref, toRaw, UnwrapRef, WritableComputedRef } from "vue";
import { useElectron, useIpc } from "./electron";

export function useIpcComputed<T>(
  channel: string,
  defaultData: T
): WritableComputedRef<UnwrapRef<T>> {
  const { cacheMap, getRendererUpdateChannel } = useIpcComputed;

  if (cacheMap.has(channel)) {
    return cacheMap.get(channel);
  } else {
    const _ref = ref(defaultData);
    const _computed = computed({
      get() {
        return _ref.value;
      },
      set(v: UnwrapRef<T>) {
        _ref.value = v;

        if (env_isRenderer()) {
          // 客户端更新值到服务端,这里会使发送者的 computed 触发两次更新（它自己 set 一次，这里一次），
          // 不过这不是什么大问题，还可以保持各端的数据一致
          useIpc().send(getRendererUpdateChannel(channel), v);
        } else {
          // 服务端推送新值到所有客户端
          useElectron()
            .webContents.getAllWebContents()
            .forEach((webContent) => webContent.send(channel, v));
        }
      },
    });

    if (env_isRenderer()) {
      // 客户端第一次调用 useIpcComputed 从 主线程 更新一下默认值
      useIpc().send(channel);
      // 客户端监听服务端的值更新
      useIpc().on(channel, (event, v: UnwrapRef<T>) => (_ref.value = v));
    } else {
      // 客户端第一次调用 useIpcComputed 会从 主线程 更新一下默认值，这里用于处理该事件
      useElectron().ipcMain.on(channel, (event, v) => {
        // 因为 ref.value 是一个 proxy 而 event.reply 内部无法序列化 proxy
        const _raw_v = toRaw(_ref.value);
        event.reply(channel, _raw_v);
      });
      // 客户端主动更新值
      useElectron().ipcMain.on(
        getRendererUpdateChannel(channel),
        (event, v) => {
          _computed.value = v;
        }
      );
    }

    cacheMap.set(channel, _computed);
    return _computed;
  }
}
export namespace useIpcComputed {
  export const cacheMap = new Map<string, any>();
  export const getRendererUpdateChannel = (s: string) => `${s}-renderer-update`;
}
