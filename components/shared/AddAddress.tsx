import { useState } from "react";
import { ICity, ICountry, IState } from "../models/country.model";
import CityDropDown from "./CityDropDown";
import CountryDropDown from "./CountryDropDown";
import StateDropDown from "./StateDropDown";

export const AddAddress = ({ showModel, setShowModel, submitData }) => {
  const [country, setCountry] = useState<ICountry>();
  const [state, setState] = useState<IState>();
  const [city, setCity] = useState<ICity>();

  const onCountryChange = (value: ICountry) => {
    setCountry(value);
  };

  const onStateChange = (value: IState) => {
    setState(value);
  };

  const onCityChange = (value: ICity) => {
    setCity(value);
  };

  const handleClosePopup = () => {
    setShowModel(false);
  };

  const handleSubmit = (event) => {
    submitData(event);
    handleClosePopup();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-slate-400 bg-opacity-50"></div>
      <div className="relative top-[-192px] left-[279px] right-0 bottom-0 bg-white rounded-md">
        <div className="p-7">
          <h2 className="pb-3">Add address</h2>
          <div className="flex flex-col pb-3">
            <label>ADDRESS</label>
            <input
              name="addressLine1"
              className="confirm_Order_Disabled pb-3"
            ></input>
          </div>
          <div className="flex flex-col pb-3">
            <label>ADDRESS LINE 2</label>
            <input
              name="addressLine2"
              className="confirm_Order_Disabled"
            ></input>
          </div>

          <div className="flex flex-col pb-3">
            <CountryDropDown onChange={onCountryChange}></CountryDropDown>
          </div>

          <div className="flex flex-col pb-3">
            {country ? (
              <StateDropDown
                onChange={onStateChange}
                countryId={country.id}
              ></StateDropDown>
            ) : (
              <select name="state" disabled className="confirm_Order_Disabled">
                <option value="none" selected disabled hidden>
                  select one...
                </option>
              </select>
            )}
          </div>

          <div className="flex flex-col pb-3">
            {state ? (
              <CityDropDown
                onChange={onCityChange}
                stateId={state.id}
              ></CityDropDown>
            ) : (
              <select name="city" disabled className="confirm_Order_Disabled">
                <option value="none" selected disabled hidden>
                  select one...
                </option>
              </select>
            )}
          </div>

          <div className="flex flex-col pb-3">
            <label>POSTAL CODE</label>
            <input name="postalCode" className="confirm_Order_Disabled"></input>
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="confirm_Order_Back"
              onClick={() => setShowModel(false)}
            >
              CLOSE
            </button>
            <button className="confirm_Order_Send" type="submit">
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
