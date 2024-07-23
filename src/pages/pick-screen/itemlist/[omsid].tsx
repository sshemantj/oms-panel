import MainLayout from "@/layout/MainLayout";
import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Order {
  omsId: number;
  locationId: string;
  consignmentId: string;
  orderId: string;
  orderNumber: string;
  soId: string | null;
  po: string | null;
  etd: string | null;
  channel: string;
  productName: string;
  ean: string;
  brand: string;
  sku: string;
  skuSize: string;
  color: string;
  caNumber: string;
  imageUrl: string;
  price: string;
  quantity: string;
  trayId: number;
  trayName: string;
  pickStatus: string;
  reasonForFail: string | null;
  additionalDamage: string | null;
}

const ItemDetails = () => {
  const router = useRouter();

  console.log("router.query", router.query);

  const { omsid: omsId } = router.query;
  const [order, setOrder] = useState<any>(null);

  const { items, status, offset, limit, error } = useAppSelector(
    (state) => state.pickItemDetails
  );

  useEffect(() => {
    if (omsId) {
      const foundOrder = items.find(
        (order) => (order as any)?.omsId === Number(omsId)
      );
      setOrder(foundOrder as any);
    }
  }, [omsId]);

  console.log("order", order);

  if (!order) return <div>Loading...</div>;

  return (
    <MainLayout mainStyle={{ padding: 0 }}>
      <Box sx={{ padding: 2 }} className="h-screen">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {order.imageUrl ? (
            <Image
              src={order.imageUrl}
              alt={order.productName}
              width={250}
              height={250}
            />
          ) : (
            <Image
              src="https://via.placeholder.com/250"
              width={250}
              height={250}
              alt="Product placeholder"
            />
          )}
          <Typography sx={{ fontWeight: "bold" }}>
            {order.productName}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2, paddingBottom: 2 }}>
          {/* Additional details if needed */}
          {/* <DetailRow label="Item " value={order.item1} /> */}
          <DetailRow label="Consignment ID" value={order.consignmentId} />
          <DetailRow label="Order ID" value={order.orderId} />
          <DetailRow label="Order Number" value={order.orderNumber} />

          <DetailRow label="SO ID" value={order.soId} />
          <DetailRow label="ETD" value={order.etd} />
          <DetailRow label="Channel" value={order.channel} />
          <DetailRow label="EAN" value={order.ean} />
          <DetailRow label="Brand" value={order.brand} />

          <DetailRow label="SKU" value={order.sku} />
          <DetailRow label="Size" value={order.skuSize} />
          <DetailRow label="Colour" value={order.color} />
          <DetailRow label="CA Number" value={order.caNumber} />
          <DetailRow label="Price" value={order.price} />

          <DetailRow label="Quantity" value={order.quantity} />

          <DetailRow label="Mode" value={order.mode} />
          <DetailRow label="Status" value={order.status} />
        </Box>
      </Box>
    </MainLayout>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default ItemDetails;
