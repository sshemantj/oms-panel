import useTouch, { Direction } from "@/hooks/useTouch";
import BarcodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Box, Card, Chip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styles from "./SwipeableCard.module.scss";

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
  status: string;
  reasonForFail: string | null;
  additionalDamage: string | null;
}

interface SwipeableCardProps {
  order: Order;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ order }) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const router = useRouter();

  const handleSwipe = (direction: Direction) => {
    if (direction === "left") {
      setIsSwiping(true);
      setTimeout(() => {
        console.log("order here", order);
        const { omsId, quantity, status, trayId } = order;

        router.push({
          pathname: "/pick-screen/barcode",
          query: {
            omsId,
            quantity,
            trayId,
            pickStatus: status,
          },
        });
        // router.push(
        //   `/pick-screen/barcode/?omsId=${order.omsId}&&quantity=${order.quantity}&&pickStatus=${order.status}`
        // );
      }, 300);
    } else if (direction === "right") {
      setIsSwiping(false);
      // router.push("/pick-screen/barcode");
    }
  };
  const cardRef = useRef<HTMLDivElement>(null);

  useTouch(cardRef, handleSwipe);

  const handleCardClick = () => {
    router.push(`/pick-screen/item-details/${order.omsId}`); // Replace with your actual route and order ID
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  const maxLength = 20;

  return (
    <Box sx={{ position: "relative" }}>
      {isSwiping && (
        <Box className={styles.swipeBackground}>
          {/* <Typography variant="h4">Scan</Typography> */}
          <BarcodeScannerIcon style={{ color: "#fff", fontSize: "4.125rem" }} />
        </Box>
      )}
      <Card
        ref={cardRef}
        className={`${styles.card} ${isSwiping ? styles.swipingLeft : ""}`}
        sx={{
          cursor: "grab",
          borderRadius: 2,
          padding: "12px",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
          position: "relative",
          overflow: "visible",
          transition: "transform 0.3s ease-in-out",
          transform: isSwiping ? "translateX(-100%)" : "none",
        }}
        onClick={handleCardClick}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {order.imageUrl ? (
            <Image
              src={order.imageUrl}
              alt={order.productName}
              width={40}
              height={40}
            />
          ) : (
            <div />
          )}
          <Chip
            label={order.trayName}
            sx={{
              backgroundColor: "#3375FF",
              color: "#fff",
              marginBottom: 2,
            }}
          />
        </Box>

        {/* <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 1,
              }}
            > */}
        {/* <Typography>{order.item1}</Typography>
              <Typography> {order.orderId}</Typography>
              <Typography> {order.soId}</Typography>
              <Typography>{order.consignmentId}</Typography>
              <Typography> {order.etd}</Typography>
              <Typography> {order.channel}</Typography> */}
        {/* </Box> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            // gap: 0.5,
            paddingTop: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Product Name</span>{" "}
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {truncateText(order.productName, maxLength)}
            </Typography>
          </Box>
          {/* <Typography> {order.brand}</Typography> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>EAN</span>
            <Typography> {order.ean}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>SKU</span>
            <Typography> {order.sku}</Typography>
          </Box>
          {/* <Typography> {order.mode}</Typography> */}
        </Box>
      </Card>
    </Box>
  );
};

export default SwipeableCard;
