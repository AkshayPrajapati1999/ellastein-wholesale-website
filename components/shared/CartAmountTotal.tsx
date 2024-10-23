import EmitterService, {
  EventEmitterEvents,
} from "@/service/event-emitter.service";
import { GetCartAmount } from "@/service/graphql/query/cart.query";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";

const CartAmountTotal = (props: { retailUserId: string }) => {
  const { data, refetch } = useQuery(GetCartAmount(props.retailUserId));

  const totalAmount = data?.cartAmount?.graphdata;

  EmitterService.on(EventEmitterEvents.UpdateCartAmount, () => refetch());

  useEffect(() => {
    refetch();
  }, [props.retailUserId]);

  return <span className=" px-4 font-medium">$ {totalAmount ?? 0}</span>;
};

export default CartAmountTotal;
