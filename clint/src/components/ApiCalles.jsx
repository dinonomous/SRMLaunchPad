import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from "js-cookie"

const apiUrl = import.meta.env.VITE_API_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour
      cacheTime: 1000 * 60 * 60, // 1 hour
    },
  },
});

const fetchCollectionNames = async () => {
  const token = Cookies.get("token");
  console.log(token)
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const { data } = await axios.get(`${apiUrl}/api/subjects/getcollectionnames`, {
      withCredentials: true, // This will include cookies in the request
      headers: {
          "Content-Type": "application/json",
      },
  });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchQuizCollectionNames = async () => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const { data } = await axios.get(`${apiUrl}/api/quizapi/getcollectionnames`, {
      withCredentials: true, // This will include cookies in the request
      headers: {
          "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchCollectionData = async ({ queryKey }) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No token found");
  }
  const parameter = queryKey[1];
  try {
    const { data } = await axios.get(`${apiUrl}/api/subjects/collection/${parameter}`, {
      withCredentials: true, // This will include cookies in the request
      headers: {
          "Content-Type": "application/json",
      },
    });
    return data.titles;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchQuizCollectionData = async ({ queryKey }) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("No token found");
  }
  const parameter = queryKey[1];
  try {
    const { data } = await axios.get(`${apiUrl}/api/quizapi/Quizz/${parameter}`, {
      withCredentials: true, // This will include cookies in the request
      headers: {
          "Content-Type": "application/json",
      },
    });
    return data.titles;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useCollectionNames = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['collectionNames'],
    queryFn: fetchCollectionNames,
  });
  return { data, error, isLoading };
};

export const useQuizCollectionNames = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['quizCollectionNames'],
    queryFn: fetchQuizCollectionNames,
  });
  return { data, error, isLoading };
};

export const useCollectionData = (parameter) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['collectionData', parameter],
    queryFn: fetchCollectionData,
  });
  return { data, error, isLoading };
};

export const useQuizCollectionData = (parameter) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['quizCollectionData', parameter],
    queryFn: fetchQuizCollectionData,
  });
  return { data, error, isLoading };
};
