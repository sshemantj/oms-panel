export interface ProductDetails {
  omsId: number;
  locationId: string | null;
  consignmentId: string | null;
  orderId: string;
  orderNumber: string;
  soId: string | null;
  po: string | null;
  etd: string | null;
  channel: string | null;
  productName: string | null;
  ean: string;
  brand: string | null;
  sku: string;
  skuSize: string;
  color: string;
  caNumber: string;
  imageUrl: string;
  price: string | null;
  quantity: string;
  trayId: string | null;
  trayName: string | null;
  status: string;
  reasonForFail: string | null;
  additionalDamag: string | null;
  awb: string | null;
  courier: string | null;
}

export interface ProductDetailsState {
  // data: ProductDetails | null;
  data: any | null;

  loading: boolean;
  error: string | null;
}
export interface SubmitFormData {
  omsId: number;
  status: string;
  additionalDamage: number;
  quantityToBePicked: number;
  quantityPicked: number;
  reasonForFail: string;
  // trayId: number;
  // qcFlag: string;

  // createdBy: number;
  // createdDate: string;
  // flag: number;
}
export interface ManualDropStatus {
  omsId: number;

  status: string;
}
