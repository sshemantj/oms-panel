import useTouch, { Direction } from "@/hooks/useTouch";
import BarcodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Box, Card, Chip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import styles from "./SwipeableCard.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { updateDropManualStatus } from "@/services/thunks/pickApis";

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
  const [swipeHandled, setSwipeHandled] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSwipe = async (direction: Direction) => {
    if (swipeHandled) return;
    const { omsId, quantity, status, trayName, ean, locationId } = order;

    const isTrayExists = Boolean(trayName && status !== "Dropped");
    if (direction === "left" && !isSwiping && isTrayExists) {
      setIsSwiping(true);
      setSwipeHandled(true);
      setTimeout(() => {
        console.log("order here", order);

        router.push({
          pathname: "/pick-screen/barcode",
          query: {
            omsId,
            quantity,
            trayName,
            locationId,
            pickStatus: status,
            ean,
          },
        });
      }, 300);
    } else if (direction === "right") {
      setIsSwiping(false);
    }
  };
  const cardRef = useRef<HTMLDivElement>(null);

  useTouch(cardRef, handleSwipe);

  const handleCardClick = () => {
    router.push(`/pick-screen/itemlist/${order.omsId}`);
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
            <Image
              src="https://via.placeholder.com/40"
              width={40}
              height={40}
              alt="Product placeholder"
            />
          )}
          <Chip
            label={order.trayName || "N/A"}
            sx={{
              backgroundColor: "#3375FF",
              color: "#fff",
              marginBottom: 2,
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
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
