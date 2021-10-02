import React, { useContext } from "react";

import styled from "styled-components";
import { GameContext } from "../../context/GameContext";

const MenuItemContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5rem 1rem;
  flex-direction: row;
  align-items: center;
  color: #959da6;
  cursor: pointer;
  color: ${(props) => (props.selected ? "#55aece" : "#959da6")};
  background-color: ${(props) =>
    props.selected ? "rgba(122, 132, 148, 0.26)" : "rgba(122, 132, 148, 0)"};

  &:hover {
    background-color: rgba(122, 132, 148, 0.26);
    color: #f5f5f5;
  }
`;

const MenuItemIcon = styled.div`
  font-size: 1.2rem;
  transform: translateY(-1px);
`;

const MenuItemTitle = styled.div`
  width: 100%;
  display: flex;
  font-size: 0.9rem;
  margin-left: 1rem;
  align-items: center;
  flex-direction: row;
`;

export default function MenuItemLink(props) {
  const { setNavLeftOpen } = useContext(GameContext);

  const toggleNavLeft = () => {
    setNavLeftOpen((navState) => !navState);
    props.navItemClicked();
  };

  return (
    <MenuItemContainer
      to={props.to}
      onClick={toggleNavLeft}
      selected={props.selected}
    >
      <MenuItemIcon>{props.icon}</MenuItemIcon>
      <MenuItemTitle>{props.title}</MenuItemTitle>
    </MenuItemContainer>
  );
}
