import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { userRequest } from "../axiosReqMethods";
import ModalComp from "./ModalComp";
import { setAddress as setReduxAddress } from "../redux/userRedux";
import { setError } from "../redux/errorRedux"

const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas" , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands" , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #555;
  }
`;

const Select = styled.select`
  padding: 10px;
  margin: 10px 0;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #555;
  }
`;

const StyledLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
`;

const StyledForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const StyledButton = styled.button`
  background-color: #555;
  color: #fff;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #777;
  }
`;

const GetUserAddress = ({isOpen, setModal}) => {
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    const [address, setAddress] = useState({
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      mobile: user?.number || ""
    });

  const handleChange = e => { setAddress({ ...address, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        dispatch(setReduxAddress(address))  
        const {data } = await userRequest.post("/api/user/address", address)     
        if(data.ok){
          dispatch(setError("Address successfully updated"))
        }
    } catch (error) {
      dispatch(setError(error.response.data.message))
    }
    setModal(false)
    console.log(address);
    // send address to server or do something else
  };

  return (
    <ModalComp isOpen={isOpen}>
        <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>Street</StyledLabel>
        <StyledInput
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="Enter street"
            required
            />

        <StyledLabel>City</StyledLabel>
        <StyledInput
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
        />

        <StyledLabel>State</StyledLabel>
        <StyledInput
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="Enter state"
            required
            />

        <StyledLabel>Zip</StyledLabel>
        <StyledInput
            type="text"
            name="zip"
            value={address.zip}
            onChange={handleChange}
            placeholder="Enter zip code"
            required
            />

            <StyledLabel>Country</StyledLabel>
            <Select
                name="country"
                value={address.country}
                onChange={handleChange}
                required>
                <option value="" disabled>Select a country</option>
                {countries.map(country => <option key={country} value={country}>{country}</option>)}
            </Select>

            <StyledLabel>Mobile Number</StyledLabel>
            <StyledInput
                type="tel"
                name="mobile"
                value={address.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number for delivery"
                required
            />

        <StyledButton type="submit">Submit</StyledButton>
        <StyledButton type="reset" onClick={() => setModal(false)}>Cancel</StyledButton>
        </StyledForm>

    </ModalComp>
  );
};

export default GetUserAddress;
