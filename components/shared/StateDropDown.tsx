import React from "react";
import { IState } from "../models/country.model";
import { graphQlMapper } from "@/service/graphql/graphql-mapper.service";
import { GraphQlKeyEnum } from "@/service/graphql/graphql-query.enum";
import { getState } from "@/service/graphql/query/country.query";

function StateDropDown(props: {
  countryId: number;
  onChange;
  classList?: string;
}) {
  const stateData: IState[] | null = graphQlMapper<IState[]>(
    GraphQlKeyEnum.state,
    getState(props.countryId)
  );

  const handleChange = (stateId: number) => {
    const value = stateData?.find((x) => x.id == stateId);
    if (value) props.onChange(value);
  };

  return (
    <>
      <select
        onChange={(event) => handleChange(parseInt(event.target.value))}
        name="state"
        className={props.classList ?? "confirm_Order_Disabled"}
      >
        <option value="none" selected disabled hidden>
          select one...
        </option>
        {stateData?.map((state: IState) => (
          <option value={state.id} key={state.id}>
            {state.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default StateDropDown;
