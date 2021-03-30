import { useIpcComputed } from "./icp_wrap";


export const mainWindowState = useIpcComputed("mainWindowState", {
  t: Date.now(),
  isShow: false,
});
