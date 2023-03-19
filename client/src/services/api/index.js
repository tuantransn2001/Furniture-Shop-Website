import { useState, useEffect } from "react";
import { fetchApi } from "../utils/fetch";

export const useLogin = (isUserInputValid, formData) => {
  const [data, setData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    setIsLoading(true);
    if (isUserInputValid) {
      const fetchResultData = await fetchApi.post("auth/login", formData);
      switch (fetchResultData.status) {
        case 200: {
          setData({
            statusCode: fetchResultData.status,
            userDetail: {
              ...fetchResultData.data.data,
            },
          });
          setIsLoading(false);
          break;
        }
        case 404: {
          setData({
            statusCode: fetchResultData.status,
            message: "Email and or Password is wrong! Please try again!",
          });
          setIsLoading(false);
          break;
        }
        case 500: {
          setData({
            statusCode: fetchResultData.status,
            message: "Server is working wrong!",
          });
          setIsLoading(false);
          break;
        }
        default: {
          setData({
            status: "pending",
            message: fetchResultData,
          });
          setIsLoading(false);
          break;
        }
      }
    } else {
      setData({
        status: "pending",
        message: "Email or password is empty1 Please check it and try again!",
      });
    }
  };

  useEffect(() => {
    handleFetch();
    return () => handleFetch();
  }, [formData]);

  return { data, isLoading };
};
