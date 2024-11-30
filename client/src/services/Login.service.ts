import api from "../apis/api";
import { AxiosResponse } from "axios";

interface CustomError {
  status: number;
  message: string;
  data?: any;
}

export class LoginDataService {
  public static async signin(
    username: string,
    password: string
  ): Promise<AxiosResponse | CustomError> {
    try {
      return await api.post(`auth/login`, {
        username: username,
        password: password,
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

  public static async createUser(
    firstName: string,
    lastName: string,
    userName: string,
    password: string
  ) {
    try {
      return await api.post(`users`, {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password,
        isActivy: true,
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

  public static async recoveryPassword(email: string) {
    try {
      return await api.post(`user/recoverypassword`, {
        email,
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
