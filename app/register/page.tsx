/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import { ICity, ICountry, IState } from "@/components/models/country.model";
import { UserRoles } from "@/components/models/user.model";
import CityDropDown from "@/components/shared/CityDropDown";
import CountryDropDown from "@/components/shared/CountryDropDown";
import StateDropDown from "@/components/shared/StateDropDown";
import {
  AddSignUp,
  AllSalesChannel,
  AllStoreType,
  SalesAgents,
} from "@/service/graphql/query/signUp.query";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "apollo-server-core";
import Link from "next/link";
import React, { useState } from "react";

const Register = () => {
  const [selected, setselected] = useState();
  const [selectedChannel, setSelectedChannel] = useState<{
    channel: string;
    id: number;
  } | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedText, setSelectedText] = useState<string>("");
  const [country, setCountry] = useState<ICountry>();
  const [state, setState] = useState<IState>();
  const [city, setCity] = useState<ICity>();
  const [storeName, setStoreName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [salesTaxIdOrEinNumber, setSalesTaxIdOrEinNumber] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [numberOfDoors, setNumberOfDoors] = useState(0);
  const [platformWebsite, setplatformWebsite] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [signUpMutation, { data, loading, error }] = useMutation(AddSignUp());
  const [selectedOption, setSelectedOption] = useState("");
  const [salesAgentId, setSalesAgentId] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");

  const { data: SalesAgent } = useQuery(
    gql`
      ${SalesAgents}
    `
  );

  const SalesAgentData = SalesAgent?.salesAgents?.graphdata;
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const onCountryChange = (value: ICountry) => {
    setCountry(value);
  };

  const onStateChange = (value: IState) => {
    setState(value);
  };

  const onCityChange = (value: ICity) => {
    setCity(value);
  };

  const { data: SalesChannel } = useQuery(
    gql`
      ${AllSalesChannel}
    `
  );

  const SalesChannelData = SalesChannel?.allSalesChannel?.graphdata;

  const { data: AllStore } = useQuery(
    gql`
      ${AllStoreType}
    `
  );

  const StoreTypeData = AllStore?.allStoreType?.graphdata;

  const toggleType = (storeType: any) => {
    const index = selectedTypes.indexOf(storeType.id);
    if (index === -1) {
      setSelectedTypes([...selectedTypes, storeType.id]);
    } else {
      setSelectedTypes(selectedTypes.filter((id) => id !== storeType.id));
    }
  };

  const alphabetIndex = (index: number) => String.fromCharCode(65 + index);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(event.target.value);
  };

  const handleInputChangeNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfDoors(event.target.value ? parseInt(event.target.value) : 0);
  };

  const handleInputChangeWebsite = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setplatformWebsite(event.target.value);
  };

  const handleContactPersonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactPerson(event.target.value);
  };

  const handleContactNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactNumber(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSalesTax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalesTaxIdOrEinNumber(event.target.value);
  };

  const handleInstagramLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstagramLink(event.target.value);
  };

  const handleFacebookLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFacebookLink(event.target.value);
  };

  const handleTiktokLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTiktokLink(event.target.value);
  };

  const handlePostalCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(event.target.value);
  };

  const handleAddressLine1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressLine1(event.target.value);
  };

  const handleAddressLine2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressLine2(event.target.value);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleSelectBoxClick = (channel: string, id: string) => {
    setSelectedChannel({ channel, id: id ? parseInt(id) : 0 });
  };

  const handleSalesAgentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSalesAgentId(event.target.value);
  };

  const handleSignUp = () => {
    signUpMutation({
      variables: {
        storeName: storeName,
        customerCode: null,
        primarySalesChannel: selectedChannel?.id,
        userRoleName: UserRoles.RETAILER,
        numberOfDoors: numberOfDoors,
        platformWebsite: platformWebsite,
        contactPerson: contactPerson,
        contactNumber: contactNumber,
        secondaryEmailID1: null,
        secondaryEmailID3: null,
        secondaryEmailID2: null,
        paymentTerms: null,
        email: email,
        password: "Test@123",
        confirmPassword: "Test@123",
        salesTaxIdOrEinNumber: salesTaxIdOrEinNumber,
        instagramLink: instagramLink,
        facebookLink: facebookLink,
        tiktokLink: tiktokLink,
        salesAgentId: salesAgentId,
        storeType: selectedTypes,
        isDefault: true,
        customerSince: new Date(),
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city?.name,
        state: state?.name,
        country: country?.name,
        countryCode: country?.countryCode,
        postalCode: postalCode,
      },
    })
      .then((response) => {
        console.log("Sign up response:", response);
        setCurrentStep(12);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  const selectBoxClass = (channel: string, id: string) =>
    selectedChannel && selectedChannel.channel === channel
      ? "bg-neutral-500 text-white"
      : "bg-white text-black";

  return (
    <>
      {currentStep === 1 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <div className="registerMainContainer">
            <div className="registerMainTitle">
              WELCOME TO OUR <br /> WHOLESALE PARTNER PROGRAM
            </div>
            <div className="registerMainContaint">
              WE’D LOVE FOR YOU TO FILL OUT OUR TYPEFORM TO JOIN OUR COMMUNITY
              <br />
              OF OVER 300 RETAIL PARTNERS THAT CARRY ELLA STEIN / ALL INCL.+
            </div>
            <button className="registerBack" onClick={nextStep}>
              START
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="bg-[url('https://www.ellastein.com/cdn/shop/files/Asset_2_3193f23e-b253-4233-9380-efe997081d4f_1728x.jpg?v=1711957999')] bg-no-repeat bg-cover bg-center h-screen w-screen flex flex-col justify-center items-center">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <button className=" registerBack" onClick={prevStep}>
            Back
          </button>
          <div className="flex flex-col m-auto bg-white opacity-70 p-2 w-10/12 rounded-3xl">
            <span className="registerTitle">1. What's Your Store Name?</span>

            <input
              className="registerSingleInput"
              type="text"
              onChange={handleInputChange}
            />

            <button className=" registerNext" onClick={nextStep}>
              OK
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <button className=" registerBack" onClick={prevStep}>
            Back
          </button>
          <div className="registerContainer">
            <span className="registerTitle">
              2. What is your primary sales channel?
            </span>

            {SalesChannelData.map((channel, index) => (
              <div
                key={channel.id}
                className={`registerSelectBox ${selectBoxClass(
                  channel.name,
                  channel.id
                )}`}
                onClick={() => handleSelectBoxClick(channel.name, channel.id)}
              >
                <div className="registerSelectLetter">
                  {alphabetIndex(index)}
                </div>
                <div>{channel.name}</div>
              </div>
            ))}
            <button className=" registerNext" onClick={nextStep}>
              OK
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <button className=" registerBack" onClick={prevStep}>
            Back
          </button>
          <div className="registerContainer">
            <span className="registerTitle">3. Number of stores you own?</span>
            <input
              className="registerSingleInput"
              type="text"
              onChange={handleInputChangeNumber}
            />

            <button className=" registerNext" onClick={nextStep}>
              OK
            </button>
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <button className=" registerBack" onClick={prevStep}>
            Back
          </button>
          <div className="registerContainer">
            <span className="registerTitle">
              4. Website link to your e-commerce platform
            </span>
            <input
              className="registerSingleInput"
              type="text"
              onChange={handleInputChangeWebsite}
            />

            <button className=" registerNext" onClick={nextStep}>
              OK
            </button>
          </div>
        </div>
      )}
      {currentStep === 6 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <button className=" registerBack" onClick={prevStep}>
            Back
          </button>
          <div className="registerContainer">
            <span className="registerTitle">5. Select your store type</span>
            {StoreTypeData?.map((type, index) => (
              <div
                key={type.id}
                className={`registerSelectBox cursor-pointer ${
                  selectedTypes.includes(type.id)
                    ? "bg-neutral-500 text-white"
                    : ""
                }`}
                onClick={() => toggleType(type)}
              >
                <div className="registerSelectLetter">
                  {alphabetIndex(index)}
                </div>

                <div className="registerSelectText">{type.name}</div>
              </div>
            ))}

            <button className="registerNext" onClick={nextStep}>
              OK
            </button>
          </div>
        </div>
      )}
      {currentStep === 7 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <button className=" registerBack" onClick={prevStep}>
            Back
          </button>
          <div className="registerContainer">
            <span className="registerTitle">6. Personal Details:</span>
            <span className="registerInputSpan">Contact Person</span>
            <input
              className="registerMultileInput"
              type="text"
              onChange={handleContactPersonChange}
            />
            <span className="registerInputSpan">Contact Number</span>
            <input
              className="registerMultileInput"
              type="text"
              onChange={handleContactNumberChange}
            />
            <span className="registerInputSpan">Primary Email Address</span>
            <input
              className="registerMultileInput"
              type="text"
              onChange={handleEmailChange}
            />
            <button className=" registerNext" onClick={nextStep}>
              OK
            </button>
          </div>
        </div>
      )}
      {currentStep === 8 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <button className=" registerBack" onClick={prevStep}>
            Back
          </button>
          <div className="registerContainer">
            <span className="registerTitle">6. Personal Details</span>
            <span className="registerInputSpan">Address</span>
            <input
              className="registerMultileInput"
              type="text"
              onChange={handleAddressLine1}
            />
            <input
              className="registerMultileInput"
              type="text"
              onChange={handleAddressLine2}
            />

            <div className="city_state">
              <div>
                <span className="registerInputSpan">Country</span>
                <CountryDropDown
                  classList="registerMultileInput"
                  onChange={onCountryChange}
                ></CountryDropDown>
              </div>
              <div>
                <span className="registerInputSpan">State</span>
                {country ? (
                  <StateDropDown
                    classList="registerMultileInput"
                    onChange={onStateChange}
                    countryId={country.id}
                  ></StateDropDown>
                ) : (
                  <select
                    name="state"
                    disabled
                    className="registerMultileInput"
                  >
                    <option value="none" selected disabled hidden>
                      select one...
                    </option>
                  </select>
                )}
              </div>
              <div>
                <span className="registerInputSpan">City</span>
                {state ? (
                  <CityDropDown
                    classList="registerMultileInput"
                    onChange={onCityChange}
                    stateId={state.id}
                  ></CityDropDown>
                ) : (
                  <select name="city" disabled className="registerMultileInput">
                    <option value="none" selected disabled hidden>
                      select one...
                    </option>
                  </select>
                )}
              </div>
              <div>
                <span className="registerInputSpan">Zipcode</span>
                <input
                  className="registerMultileInput"
                  type="text"
                  onChange={handlePostalCode}
                />
              </div>
            </div>

            <button className=" registerNext" onClick={nextStep}>
              OK
            </button>
          </div>
        </div>
      )}
      {currentStep === 9 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <button className=" registerBack" onClick={prevStep}>
            Back
          </button>
          <div className="registerContainer">
            <span className="registerTitle">7. Business Details</span>
            <span className="registerInputSpan">EIN Number / Sales Tax ID</span>

            <input
              className="registerSingleInput"
              type="text"
              onChange={handleSalesTax}
            />

            <button className=" registerNext" onClick={nextStep}>
              OK
            </button>
          </div>
        </div>
      )}
      {currentStep === 10 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <button className=" registerBack" onClick={prevStep}>
            Back
          </button>
          <div className="registerContainer">
            <span className="registerTitle">
              8. If you’re using social media, share the link to your:
            </span>
            <span className="registerInputSpan">Instagram</span>
            <input
              className="registerMultileInput"
              type="text"
              onChange={handleInstagramLink}
            />
            <span className="registerInputSpan">Facebook</span>
            <input
              className="registerMultileInput"
              type="text"
              onChange={handleFacebookLink}
            />
            <span className="registerInputSpan">Tiktok</span>
            <input
              className="registerMultileInput"
              type="text"
              onChange={handleTiktokLink}
            />

            <button className=" registerNext" onClick={nextStep}>
              OK
            </button>
          </div>
        </div>
      )}
      {currentStep === 11 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <button className=" registerBack" onClick={prevStep}>
            Back
          </button>
          <div className="registerContainer">
            <span className="registerTitle">
              9. Do you have a Sales Rep assigned to you? If yes, who?
            </span>
            <div className=" flex justify-center items-center">
              <div>
                <div
                  className={`registerSelectBox ${
                    selectedOption === "Yes" ? "bg-neutral-500 text-white" : ""
                  }`}
                  onClick={() => handleOptionSelect("Yes")}
                >
                  <div className="registerSelectLetter">A</div>
                  <div className="registerSelectText">Yes</div>
                </div>
                <div
                  className={`registerSelectBox ${
                    selectedOption === "No" ? "bg-neutral-500 text-white" : ""
                  }`}
                  onClick={() => handleOptionSelect("No")}
                >
                  <div className="registerSelectLetter">B</div>
                  <div className="registerSelectText">No</div>
                </div>
              </div>
              <select
                name="salesAgent"
                className="registerSingleInput"
                onChange={handleSalesAgentChange}
              >
                <option value="none" selected disabled hidden>
                  select one...
                </option>
                {SalesAgentData?.map((salesAgent, index: number) => (
                  <option value={salesAgent?.userId} key={index}>
                    {salesAgent?.storeName}
                  </option>
                ))}
              </select>
            </div>
            <button className=" registerNext" onClick={handleSignUp}>
              OK
            </button>
          </div>
        </div>
      )}
      {currentStep === 12 && (
        <div className="registerCard">
          <div className="flex justify-center">
            <Link href="/">
              <img
                className="registerLogo"
                src="https://res.cloudinary.com/dbrtm8pf6/image/upload/a_ignore,c_fit,h_100,q_80/v1707458898/uploads/c003d69e/profiles/1/footer_logos/antzo3qltlr859qvlxcn.png"
                alt="Ellastein Logo"
              />
            </Link>
          </div>
          <div className="registerMainContainer">
            <div className="registerMainTitle">THANK YOU</div>
            <div className="registerMainContaint">
              FOR SIGNING UP TO BE PART OF THE ELLA STEIN PARTNER PROGRAM.{" "}
              <br /> WE CAN’T WAIT TO CHECK OUT YOUR STORE AND HAVE YOU JOIN OUR
              COMMUNITY <br /> OF OVER 300 SUCCESSFUL RETAIL PARTNERSHIPS!
            </div>
            <Link href="/home">
              <button className="registerBack">HOME</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
