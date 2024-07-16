import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.body", req.body);
  const { locationId, consignmentId } = req.body;

  // let data = JSON.stringify(filters);
  const data = JSON.stringify({ locationId, consignmentId });

  const baseurl = process.env.API_BASE_URL;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseurl}/packer/Pack/getConsignmentCourierItems`,
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
