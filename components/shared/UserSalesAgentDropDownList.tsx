import { graphQlMapper } from "@/service/graphql/graphql-mapper.service";
import {
  ISalesAgentUsersList,
  UserRoles,
  isUserLoggedIn,
} from "../models/user.model";
import { GraphQlKeyEnum } from "@/service/graphql/graphql-query.enum";
import {
  AllRetailUsers,
  UserUnderSalesAgent,
} from "@/service/graphql/query/salesAgent.query";
import { useAppSelector } from "@/redux/hook";

const UserSalesAgentDropDownList = ({ onHandleSelectChange, selectOption }) => {
  const { userRole } = useAppSelector((state) => state.auth);

  // const userSalesAgents = graphQlMapper<ISalesAgentUsersList[]>(
  //   GraphQlKeyEnum.userUnderSalesAgent,
  //   UserUnderSalesAgent
  // );

  const userSalesAgents =
    userRole === UserRoles.ADMIN
      ? graphQlMapper<ISalesAgentUsersList[]>(
          GraphQlKeyEnum.allRetailUsers,
          AllRetailUsers
        )
      : graphQlMapper<ISalesAgentUsersList[]>(
          GraphQlKeyEnum.userUnderSalesAgent,
          UserUnderSalesAgent
        );

  return (
    <select
      name="state"
      className={
        isUserLoggedIn()
          ? "bg-white w-2/6"
          : "w-full flex align-center justify-center"
      }
      onChange={(e) => onHandleSelectChange(e)}
      value={selectOption}
    >
      <option value="" selected disabled hidden>
        select one...
      </option>
      {userSalesAgents?.map((item) => {
        return (
          <option key={item.userId} value={item.userId}>
            {item.storeName}
          </option>
        );
      })}
    </select>
  );
};

export default UserSalesAgentDropDownList;
