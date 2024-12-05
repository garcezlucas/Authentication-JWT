import api from "../apis/api";
import { AxiosResponse } from "axios";
import { CustomError } from "../interfaces/CustomError";

export class AuthDataService {
  public static async signin(
    userName: string,
    password: string
  ): Promise<AxiosResponse | CustomError> {
    try {
      return await api.post(`auth/login`, {
        userName,
        password,
      });
    } catch (error: any) {
      if (error.response) {
        console.error(
          `Request failed with status code: ${error.response.status}`
        );
        console.error(
          `Error message from server: ${error.response.data.message}`
        );

        const customError: CustomError = {
          status: error.response.status,
          message: error.response.data.message,
        };

        return customError;
      } else if (error.request) {
        console.error(`No response received from the server`);

        const customError: CustomError = {
          status: error.response.status,
          message: `No response received from the server`,
        };

        return customError;
      } else {
        console.error(`Error setting up the request:`, error.message);

        const customError: CustomError = {
          status: error.response.status,
          message: error.message,
        };

        return customError;
      }
    }
  }

  public static async refreshToken(
    refresh_token: string
  ): Promise<AxiosResponse | CustomError> {
    try {
      return await api.post(`auth/refresh-token`, {
        refresh_token,
      });
    } catch (error: any) {
      if (error.response) {
        console.error(
          `Request failed with status code: ${error.response.status}`
        );
        console.error(
          `Error message from server: ${error.response.data.message}`
        );

        const customError: CustomError = {
          status: error.response.status,
          message: error.response.data.message,
        };

        return customError;
      } else if (error.request) {
        console.error(`No response received from the server`);

        const customError: CustomError = {
          status: error.response.status,
          message: `No response received from the server`,
        };

        return customError;
      } else {
        console.error(`Error setting up the request:`, error.message);

        const customError: CustomError = {
          status: error.response.status,
          message: error.message,
        };

        return customError;
      }
    }
  }
}
