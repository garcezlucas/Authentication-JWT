import { AxiosResponse } from "axios";
import api from "../apis/api";
import { CustomError } from "../interfaces/CustomError";
import { User } from "../interfaces/User";

interface RecoveryPassword {
  email: string;
  password: string;
}

export class UserDataService {
  public static async createUser(
    user: User
  ): Promise<AxiosResponse | CustomError> {
    try {
      return await api.post(`users`, user);
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

  public static async getUser(
    email: string | null
  ): Promise<User | AxiosResponse | CustomError> {
    try {
      return await api.get(`users/${email}`);
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

  public static async recoveryPassword(
    data: RecoveryPassword
  ): Promise<AxiosResponse | CustomError> {
    try {
      return await api.patch(`users/update-password`, data);
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
