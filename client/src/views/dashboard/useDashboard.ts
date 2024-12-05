import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { UserDataService } from "../../services/User.service";
import { CustomError } from "../../interfaces/CustomError";
import { User } from "../../interfaces/User";

export function useDashboard() {
  const queryClient = useQueryClient();

  const emailUSer = localStorage.getItem("email");

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery<User | AxiosResponse | CustomError, Error>({
    queryKey: ["user"],
    queryFn: () => UserDataService.getUser(emailUSer),
    enabled: !!emailUSer,
  });

  return {
    userData,
    isUserLoading,
    userError,
  };
}
