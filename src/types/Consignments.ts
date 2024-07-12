interface Brand {
  brandName: string;
}

interface DeliveryMode {
  deliveryModeName: string;
}

interface Tray {
  id: number;
  trayCode: string;
}

export interface DropdownState {
  brands: Brand[];
  trays: Tray[];
  deliveryMode: DeliveryMode[];
  selectedBrand?: string;
  selectedTray?: string;
  selectedDeliveryMode?: string;
}
export type DropdownAction =
  | { type: "brands"; value: Brand[] }
  | { type: "trays"; value: Tray[] }
  | { type: "deliveryMode"; value: DeliveryMode[] }
  | { type: "selectedBrand"; value: string }
  | { type: "selectedTray"; value: string }
  | { type: "selectedDeliveryMode"; value: string };

// export type DropdownAction = {
//   type: keyof DropdownState;
//   value: Brand[] | Tray[] | DeliveryMode[];
// };

export interface CustomCardProps {
  title: string;
  number: number;
}
