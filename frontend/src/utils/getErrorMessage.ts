import { AxiosError } from "axios";

export function getErrorMessage(error: unknown, fallbackMessage: string) {
  const axiosError = error as AxiosError<{ message?: string }>;

  return axiosError.response?.data?.message || fallbackMessage;
}
