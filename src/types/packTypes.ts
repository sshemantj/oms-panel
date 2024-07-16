export interface WeightData {
  omsId: string;
  omsOrderId: string;
  consignmentId: string;
  weight: number;
}
export interface HandoverData {
  locationId: string;
  consignmentId: string;
  status: string;
  weight: number;
}

export interface CourierPartnerData {
  omsId: string;
  omsOrderId: string;
  consignmentId: string;
  courier: string;
}
