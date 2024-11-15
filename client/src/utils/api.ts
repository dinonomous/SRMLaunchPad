// src/utils/api/v2/v2.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to fetch all collections
export const getCollectionNames = async () => {
  const response = await axios.get(`${API_URL}/getcollectionnames`);
  return response.data;
};

export const getProgramsData = async (subject: string, id: string) => {
  const response = await axios.get(`${API_URL}/subjects/${subject}/${id}`);
  return response.data;
};

export const getBooksRoot = async () => {
  const response = await axios.get(`${API_URL}/google/files?pageSize=10`);
  return response.data;
};

export const getBooksRootExpand = async (id: string) => {
  const response = await axios.get(`${API_URL}/google/files?pageSize=10&pageToken=${id}`);
  return response.data;
};

export const getBooksChild = async (id: string) => {
  const response = await axios.get(`${API_URL}/google/files/${id}?pageSize=10`);
  return response.data;
};

export const getBooksChildExpand = async (id: string, next: string) => {
  const response = await axios.get(`${API_URL}/google/files/${id}?pageSize=10&pageToken=${next}`);
  return response.data;
};