import React, { useState } from "react";
import FulfillmentsTabs from "./fulfillmentsTabs";
import { IFulFillmentsTabsList } from "@/interfaces/fulfillments.interface";

const FulfillmentsModule = () => {
  const [currTabValue, setCurrTabValue] = useState<IFulFillmentsTabsList>(
    IFulFillmentsTabsList.FULFILMENTS
  );

  return (
    <div>
      <div>
        <FulfillmentsTabs {...{ currTabValue, setCurrTabValue }} />
      </div>
    </div>
  );
};

export default FulfillmentsModule;
