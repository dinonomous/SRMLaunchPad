import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");

function validteToken() {
  if (!token) {
    console.error("No token found");
    window.location.href = "/login";
    return false;
  } else {
    return true;
  }
}

const fetchData = async () => {
  if (!validteToken()) return;

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${apiUrl}/api/subjects/getcollectionnames`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const { data } = response;
    return { data, error: null, loading: false };
  } catch (error) {
    console.error(error);
    return { data: [], error: error.message, loading: false };
  }
};

const fetchDataQuiz = async () => {
  if (!validteToken()) {
    return;
  }
  try {
    const response = await axios.get(`${apiUrl}/api/quizapi/getcollectionnames`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const { data } = response;
    console.log(data);
    return { data, error: null, loading: false };


  } catch (error) {
    console.error(error);
    return { data: [], error: error.message, loading: false };
  }
};

const fetchCollectionData = async (parameter) => {
  if (!validteToken()) return;

  try {
    const response = await axios.get(`${apiUrl}/api/subjects/collection/${parameter}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const { data } = response;
    console.log("Data fetched:", data);
    return { data: data.titles, error: null, loading: false };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [], error: error.message, loading: false };
  }
};

const fetchCollectionDataQuiz = async (parameter) => {
  if (!validteToken()) return;

  try {
    const response = await axios.get(`${apiUrl}/api/quizapi/Quizz/${parameter}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const { data } = response;
    console.log("Data fetched:", data);
    return { data: data.titles, error: null, loading: false };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [], error: error.message, loading: false };
  }
};

export { fetchData, fetchDataQuiz, fetchCollectionData, fetchCollectionDataQuiz };
