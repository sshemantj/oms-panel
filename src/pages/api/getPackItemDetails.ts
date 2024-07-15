import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req.body", req.body);
  const {
    offSet,
    limit,
    locationId,
    brand = "",
    deliveryMode = "",
    tray = "",
  } = req.body;

  // Construct the data object
  const data: any = {
    locationId,
  };

  // Conditionally add properties if they exist
  if (brand) {
    data.brand = brand;
  }
  if (deliveryMode) {
    data.deliveryMode = deliveryMode;
  }
  if (tray) {
    data.tray = tray;
  }

  // Convert data object to JSON string
  const jsonString = JSON.stringify(data);
  const baseurl = process.env.API_BASE_URL;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${baseurl}/packer/Pack/getPackItemDetails?offSet=${offSet}&limit=${limit}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: jsonString,
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
