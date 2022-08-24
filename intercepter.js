import axios from "axios";
import Cookies from "js-cookie";

let isTokenRefreshing = false;
let refreshSubscribers = [];

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const domain = process.env.NEXT_PUBLIC_DOMAIN;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const onTokenRefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["dealingroom-access-token"] = Cookies.get("accessToken");
    // config.headers["Content-Type"] = "multipart/form-data";
    config.headers["Content-Type"] = "application/json";
    // 요청을 보내기 전 수행할 작업
    return config;
  },
  function (error) {
    // 오류 요청 가공
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;
    if (status === 400 || status === 401) {
      if (!isTokenRefreshing) {
        // isTokenRefreshing이 false인 경우에만 token refresh 요청
        isTokenRefreshing = true;
        // if (!refreshToken) {
        //   window.location.href = "/";
        // }
        const refreshToken = Cookies.get("refreshToken");
        const { data } = await axios.put(
          `${baseUrl}/users/refreshToken`, // token refresh api
          null,
          {
            headers: {
              "dealingroom-refresh-token": refreshToken,
            },
          }
        );
        // 새로운 토큰 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;
        Cookies.set("accessToken", newAccessToken, {
          expires: 1 / 24,
          domain: domain,
        });
        Cookies.set("refreshToken", refreshToken, {
          expires: (1 / 24) * 12,
          domain: domain,
        });
        isTokenRefreshing = false;
        axiosInstance.defaults.headers["dealingroom-access-token"] =
          newAccessToken;
        axiosInstance.defaults.headers["dealingroom-refresh-token"] =
          newRefreshToken;
        // 새로운 토큰으로 지연되었던 요청 진행
        onTokenRefreshed(newAccessToken);
      }
      // token이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((accessToken) => {
          originalRequest.headers["dealingroom-access-token"] = accessToken;
          resolve(axiosInstance(originalRequest));
        });
      });
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
