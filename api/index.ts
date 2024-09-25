import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  AllBodyType,
  ApiRequestResponseType,
  ErrorResponseType,
  ResponseType,
} from "./index.d";

const BASE_URL = "https://api.mangoentertainment.com/api/v1/user";
const controller = new AbortController();

const api = axios.create({
  baseURL: BASE_URL,
  signal: controller.signal,
});

const status = {
  SUCCESS: "success",
  ERROR: "error",
};

export const setHeaderAuthorization: (token?: string) => void = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      api.defaults.headers.common["Authorization"] = undefined;
    }
  },
  postData: (
    url: string,
    data: AllBodyType | undefined | FormData,
    option?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, data, option) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .post(url, data, option)
        .then((res) => {
          resolve({
            type: status.SUCCESS,
            code: res?.status,
            authId: res?.headers?.authid || res?.headers?.authId || null,
            statusText: res?.statusText,
            data: res?.data || null,
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          reject({
            type: status.ERROR,
            code: err?.response?.status || err?.code,
            statusText:
              err?.response?.data?.message ||
              err?.response?.statusText ||
              err?.message,
            response: err?.response?.data || null,
          });
        });
    });
  },
  getData: (
    url: string,
    option?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, option) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .get(url, option)
        .then((res) => {
          resolve({
            type: status.SUCCESS,
            code: res?.status,
            authId: res?.headers?.authid || res?.headers?.authId || null,
            statusText: res?.statusText,
            data: res?.data ?? null,
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          reject({
            type: status.ERROR,
            code: err?.response?.status || err?.code,
            statusText:
              err?.response?.data?.message ||
              err?.response?.statusText ||
              err?.message,
            response: err?.response?.data ?? null,
          });
        });
    });
  },
  putData: (
    url: string,
    data: AllBodyType | undefined,
    option?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, data, option) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .put(url, data, option)
        .then((res) => {
          resolve({
            type: status.SUCCESS,
            code: res?.status,
            authId: res?.headers?.authid || res?.headers?.authId || null,
            statusText: res?.statusText,
            data: res?.data ?? null,
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          reject({
            type: status.ERROR,
            code: err?.response?.status || err?.code,
            statusText:
              err?.response?.data?.message ||
              err?.response?.statusText ||
              err?.message,
            response: err?.response?.data ?? null,
          });
        });
    });
  },
  patchData: (
    url: string,
    data: AllBodyType | undefined,
    option?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, data, option) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .patch(url, data, option)
        .then((res) => {
          resolve({
            type: status.SUCCESS,
            code: res?.status,
            authId: res?.headers?.authid || res?.headers?.authId || null,
            statusText: res?.statusText,
            data: res?.data ?? null,
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          reject({
            type: status.ERROR,
            code: err?.response?.status || err?.code,
            statusText:
              err?.response?.data?.message ||
              err?.response?.statusText ||
              err?.message,
            response: err?.response?.data ?? null,
          });
        });
    });
  },
  deleteData: (
    url: string,
    option?: AxiosRequestConfig
  ) => ApiRequestResponseType = (url, option) => {
    return new Promise<ResponseType>((resolve, reject) => {
      api
        .delete(url, option)
        .then((res) => {
          resolve({
            type: status.SUCCESS,
            code: res?.status,
            authId: res?.headers?.authid || res?.headers?.authId || null,
            statusText: res?.statusText,
            data: res?.data ?? null,
          });
        })
        .catch((err: AxiosError<ErrorResponseType, ErrorResponseType>) => {
          reject({
            type: status.ERROR,
            code: err?.response?.status || err?.code,
            statusText:
              err?.response?.data?.message ||
              err?.response?.statusText ||
              err?.message,
            response: err?.response?.data ?? null,
          });
        });
    });
  },
  abortOutgoingRequest = () => {
    controller.abort();
  };

export default api;
