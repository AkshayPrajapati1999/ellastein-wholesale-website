import React from "react";
import { ICity } from "../models/country.model";
import { graphQlMapper } from "@/service/graphql/graphql-mapper.service";
import { GraphQlKeyEnum } from "@/service/graphql/graphql-query.enum";
import { getCity, getState } from "@/service/graphql/query/country.query";

function CityDropDown(props: { stateId: number; onChange; classList?: string }) {
  const cityData: ICity[] | null = graphQlMapper<ICity[]>(
    GraphQlKeyEnum.city,
    getCity(props.stateId)
  );

  const handleChange = (cityId: number) => {
    const value = cityData?.find((x) => x.id == cityId);
    if (value) props.onChange(value);
  };

  return (
    <>
      <select
        name="city"
        onChange={(e) => handleChange(parseInt(e.target.value))}
        className={props.classList ?? "confirm_Order_Disabled"}
      >
        <option value="none" selected disabled hidden>
          select one...
        </option>
        {cityData?.map((city: ICity) => (
          <option value={city.id} key={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default CityDropDown;
