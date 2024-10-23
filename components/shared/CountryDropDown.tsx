import React from "react";
import { ICountry } from "../models/country.model";
import { graphQlMapper } from "@/service/graphql/graphql-mapper.service";
import { GraphQlKeyEnum } from "@/service/graphql/graphql-query.enum";
import { getCountry } from "@/service/graphql/query/country.query";

function CountryDropDown(props: { onChange; classList?: string }) {
  const countryData: ICountry[] | null = graphQlMapper<ICountry[]>(
    GraphQlKeyEnum.country,
    getCountry()
  );

  const handleChange = (str: string) => {
    const countryId = parseInt(str.split("|")[0]);
    const country = countryData?.find((x) => x.id === countryId);
    if (country) props.onChange(country);
  };
  return (
    <>
      <select
        name="country"
        onChange={(e) => handleChange(e.target.value)}
        className={props.classList ?? "confirm_Order_Disabled"}
      >
        <option value="none" defaultValue={""} disabled hidden>
          select one...
        </option>
        {countryData?.map((country: ICountry) => (
          <option
            value={`${country.id}|${country.countryCode}`}
            key={country.id}
          >
            {country.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default CountryDropDown;
