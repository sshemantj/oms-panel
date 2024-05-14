import CustomTab from "@/component/molecules/customTab";
import { IFulFillmentsTabsList } from "@/interfaces/fulfillments.interface";

const tabList: { label: string; value: string }[] = [
  { label: "FULFILLMENTS", value: IFulFillmentsTabsList.FULFILMENTS },
  {
    label: "EXPRESS FULFILLMENTS",
    value: IFulFillmentsTabsList.EXPRESS_FULFILMENTS,
  },
  {
    label: "STANDARD FULFILLMENTS",
    value: IFulFillmentsTabsList.STANDARD_FULFILMENTS,
  },
  {
    label: "Click & Collect FULFILLMENTS",
    value: IFulFillmentsTabsList.CLICK_AND_COLLECT,
  },
];

interface IProps {
  currTabValue: IFulFillmentsTabsList;
  setCurrTabValue: React.Dispatch<React.SetStateAction<IFulFillmentsTabsList>>;
}

const FulfillmentsTabs = (props: IProps) => {
  const { currTabValue, setCurrTabValue } = props;

  const handleChange = (_: any, changedValue: any) => {
    setCurrTabValue(changedValue);
  };

  return (
    <div>
      <CustomTab
        type={1}
        value={currTabValue}
        tabList={tabList}
        handleChange={handleChange}
      />
    </div>
  );
};

export default FulfillmentsTabs;
