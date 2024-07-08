import { useAppSelector } from "@/store/hooks";

const SelectedFilters = () => {
  const filters = useAppSelector((state) => state.filters);
  return (
    <div>
      <h1>Selected Filters</h1>
      <p>Brand: {filters.brand}</p>
      <p>
        Category:
        {filters.category}
      </p>
      <p>Channel: {filters.channel}</p>
      <p>Delivery Mode: {filters.deliveryMode}</p>
      <p>Estimated Ship: {filters.estimatedShip}</p>
      <p>Order Number: {filters.orderNumber}</p>
    </div>
  );
};
export default SelectedFilters;
