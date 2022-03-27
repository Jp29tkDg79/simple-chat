export type requestTypes<T> = {
  url: string;
  method: "get" | "post" | "put" | "delete",
  onSuccess: (args: T) => void;
};