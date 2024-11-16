import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const getCollectionNames = async () => {
  const response = await axiosInstance.get(`/getcollectionnames`);
  return response.data;
};

export const getProgramsData = async (subject: string, id: string) => {
  const response = await axiosInstance.get(`/subjects/${subject}/${id}`);
  return response.data;
};

export const getBooksRoot = async () => {
  const response = await axiosInstance.get(`/google/files?pageSize=10`);
  return response.data;
};

export const getBooksRootExpand = async (id: string) => {
  const response = await axiosInstance.get(`/google/files?pageSize=10&pageToken=${id}`);
  return response.data;
};

export const getBooksChild = async (id: string) => {
  const response = await axiosInstance.get(`/google/files/${id}?pageSize=10`);
  return response.data;
};

export const getBooksChildExpand = async (id: string, next: string) => {
  const response = await axiosInstance.get(`/google/files/${id}?pageSize=10&pageToken=${next}`);
  return response.data;
};
