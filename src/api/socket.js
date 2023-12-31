import { io } from "socket.io-client";
import { useUserStore } from "@/store/UserStore";

// by default HTTP long-polling connection is established first, and then an upgrade to WebSocket is attempted.
// this makes sure that websocket connection is the default and falls back to HTTP long-polling.
// this should so
// cors: {
//   origin: "*",
//   methods: ["GET", "POST"],
// },

// const url =
//   process.env.NODE_ENV === "production" ? undefined : "http://192.168.1.180:8008";
export const initialConfig = {
  path: "path/to/port",
  baudRate: 0,
  delimiter: "\r\n",
  EOL: "\n",
  dataBits: 8,
  lock: true,
  stopBits: 1,
  parity: "",
  rtscts: false,
  xon: false,
  xoff: false,
  xany: false,
  hupcl: true,
};
const DisplayName = useUserStore.getState().DisplayName;
const initialAuth = { DisplayName, ...initialConfig };

const remoteUrl = useUserStore.getState().RemoteUrl;
export const socket = io(remoteUrl, {
  transports: ["websocket", "polling"],
  autoConnect: false,
  reconnectionAttempts: 5,
  auth: initialAuth,
});

if (useUserStore.getState().isLoggedIn) {
  socket.connect();
}
