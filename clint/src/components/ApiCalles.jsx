import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';


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
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const { data } = await axios.get(`${apiUrl}/api/subjects/getcollectionnames`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchQuizCollectionNames = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const { data } = await axios.get(`${apiUrl}/api/quizapi/getcollectionnames`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchCollectionData = async ({ queryKey }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const parameter = queryKey[1];
  try {
    const { data } = await axios.get(`${apiUrl}/api/subjects/collection/${parameter}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return data.titles;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchQuizCollectionData = async ({ queryKey }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const parameter = queryKey[1];
  try {
    const { data } = await axios.get(`${apiUrl}/api/quizapi/Quizz/${parameter}`, {
      headers: {
        Authorization: token,
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
    enabled: !!parameter, // Only fetch if parameter is defined
  });
  return { data, error, isLoading };
};

export const useQuizCollectionData = (parameter) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['quizCollectionData', parameter],
    queryFn: fetchQuizCollectionData,
    enabled: !!parameter, // Only fetch if parameter is defined
  });
  return { data, error, isLoading };
};
