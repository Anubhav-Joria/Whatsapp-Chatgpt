import axios from "axios";

const url = "http://localhost:8000";

export const addUser = async (data) => {
  try {
    let response = await axios.post(`${url}/add`, data);
    return response.data;
  } catch (error) {
    console.log("Error while calling addUser API ", error);
  }
};

export const getUsers = async () => {
  try {
    let response = await axios.get(`${url}/users`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getUsers API ", error);
  }
};

export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (error) {
    console.log("Error while calling setConversation API ", error);
  }
};

export const getConversation = async (users) => {
  try {
    let response = await axios.post(`${url}/conversation/get`, users);
    return response.data;
  } catch (error) {
    console.log("Error while calling getConversation API ", error);
  }
};

export const getMessages = async (id) => {
  try {
    let response = await axios.get(`${url}/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getMessages API ", error);
  }
};

export const newMessages = async (data) => {
  try {
    return await axios.post(`${url}/message/add`, data);
  } catch (error) {
    console.log("Error while calling newConversations API ", error);
  }
};

export const uploadFile = async (data) => {
  try {
    return await axios.post(`${url}/file/upload`, data);
  } catch (error) {
    console.log("Error while calling newConversations API ", error);
  }
};

export const getReplyFromChatGPT = async (text) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const token = process.env.REACT_APP_CHATGPT_KEY;
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: text,
      },
    ],
  };
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    //Chat gpt API call
    //  const response = await axios.post(API_URL, requestBody, { headers });
    // return response?.data?.choices[0]?.message?.content;

    //Dummy API call
    const response = await axios.get(`${url}/gpt/reply`);
    return response.data?.text;
  } catch (error) {
    console.log("Error while calling newConversations API ", error);
  }
};
