/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REQEST_BASE: string;
  readonly VITE_SOCKETIO_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}