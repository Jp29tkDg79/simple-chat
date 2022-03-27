import { useState } from "react";

import axios from "axios";

import { requestTypes } from "../types/request";

type doRequestTypes<U> = {
  body?: U;
};

type ErrorTypes = {
  message: string;
};

export const useRequest = <T>({
  url,
  method,
  onSuccess,
}: requestTypes<T>) => {
  const [error, setError] = useState<ErrorTypes>();

  axios.defaults.withCredentials = true;

  const doRequest = async <U>({ body }: doRequestTypes<U>) => {
    try {
      const { data } = await axios[method](url, { ...body });
      onSuccess(data);
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data.message);
      }
    }
  };

  return { doRequest, error };
};
