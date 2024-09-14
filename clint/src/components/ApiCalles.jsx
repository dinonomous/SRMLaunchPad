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

// Fetch collection names without token in frontend
const fetchCollectionNames = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/subjects/getcollectionnames`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("User is not authenticated");
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchQuizCollectionNames = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/quizapi/getcollectionnames`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("User is not authenticated");
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchCollectionData = async ({ queryKey }) => {
  const parameter = queryKey[1];
  try {
    const { data } = await axios.get(`${apiUrl}/api/subjects/collection/${parameter}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.titles;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("User is not authenticated");
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchQuizCollectionData = async ({ queryKey }) => {
  const parameter = queryKey[1];
  try {
    const { data } = await axios.get(`${apiUrl}/api/quizapi/Quizz/${parameter}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.titles;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("User is not authenticated");
    }
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

export const checkIfUserLoggedIn = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/authentication/checkAuth`, {
      withCredentials: true, // Include cookies in the request
    });

    if (data.success) {
      return { loggedIn: true, user: data.user };
    } else {
      return { loggedIn: false };
    }
  } catch (error) {
    if (error.response?.status === 401) {
      return { loggedIn: false };
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};
