import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.body", req.body);
  const { offset, limit, filters } = req.body;

  // let data = JSON.stringify(filters);
  let data = JSON.stringify({
    ...filters,
  });

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://35.207.230.21:8089/picker/getPickItemDetails?offSet=1&limit=3",
    // url: `/picker/getPickItemDetails?offSet=${offset}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  console.log("config here", config);

  try {
    const response = await axios.request(config);
    console.log("response check", response.data);
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error fetching pick item details:", error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

export default handler;
