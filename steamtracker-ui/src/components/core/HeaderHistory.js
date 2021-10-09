import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { FaBars, FaEllipsisV, FaTimes } from "react-icons/fa";
import { GameContext } from "../../context/GameContext";

import { recent10Years } from "../../helper/other";

// background-image: linear-gradient(
//   180deg,
//   rgba(70, 77, 83, 0.9) 0,
//   rgba(33, 39, 47, 0.9)
// );

const HeaderContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  z-index: 1000;
  background-color: rgba(10, 17, 25, 1);
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 840px) {
    min-height: 60px;
    position: fixed;
    max-height: 60px;
  }
  @media only screen and (min-width: 841px) {
    min-height: 0px;
    max-height: 0px;
    display: none;
  }
`;

const LeftNav = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  height: 100%;
  &:hover {
    color: #f5f5f5;
  }
`;

const RightNav = styled.div`
  font-size: 1.4rem;
  height: 100%;
  display: flex;
  padding: 0.5rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #f5f5f5;
  }
`;

const MiddleNav = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const YearSelect = styled.select`
  width: 100px;
  background-color: rgba(10, 17, 25, 0.2);
  outline: none;
  padding: 0.5rem;
  border: none;
  color: #fefefe;
  justify-self: flex-end;
`;

export default function HeaderHistory(props) {
  const yearProp = props.year;

  const { navLeftOpen, setNavLeftOpen, navRightOpen, setNavRightOpen } =
    useContext(GameContext);

  //When the header is rendered for the first time, Get info from GAMESINFO backend api
  useEffect(() => {}, []);

  //Toggle left navigation drawer state
  const toggleNavLeft = () => {
    setNavLeftOpen((navState) => !navState);
  };

  //Toggle right navigation drawer state
  const toggleNavRight = () => {
    setNavRightOpen((navState) => !navState);
  };

  return (
    <HeaderContainer>
      <LeftNav onClick={toggleNavLeft}>
        {!navLeftOpen && <FaBars />}
        {navLeftOpen && <FaTimes />}
      </LeftNav>
      <MiddleNav>
        <YearSelect
          onChange={(e) => {
            props.yearChangedHandler(e.target.value);
          }}
          defaultValue={yearProp}
        >
          {recent10Years().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </YearSelect>
      </MiddleNav>
      <RightNav onClick={toggleNavRight}>
        {!navRightOpen && <FaEllipsisV />}
        {navRightOpen && <FaTimes />}
      </RightNav>
    </HeaderContainer>
  );
}
