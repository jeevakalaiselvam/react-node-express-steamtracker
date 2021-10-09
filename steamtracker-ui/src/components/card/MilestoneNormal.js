import React from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { getDescForDate } from "../../helper/other";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(10, 17, 25);
  position: relative;
  border-radius: 4px;
  margin: 4px;
  padding: 1rem 0.5rem;
  border: 1px solid #fefefe00;

  &:hover {
    border: 1px solid #00000044;
  }

  @media only screen and (min-width: 1361px) {
    width: 23%;
  }
  @media only screen and (max-width: 1360px) and (min-width: 1201px) {
    width: 23%;
  }
  @media only screen and (max-width: 1200px) and (min-width: 1061px) {
    width: 30%;
  }
  @media only screen and (max-width: 1060px) and (min-width: 961px) {
    width: 30%;
  }
  @media only screen and (max-width: 960px) and (min-width: 769px) {
    width: 30%;
  }
  @media only screen and (max-width: 768px) and (min-width: 631px) {
    width: 46%;
  }
  @media only screen and (max-width: 630px) and (min-width: 481px) {
    width: 46%;
  }
  @media only screen and (max-width: 480px) {
    width: 46%;
  }
`;

const StarContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  height: 70px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const IconDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Icon = styled.div`
  width: 55px;
  height: 55px;
  cursor: pointer;
  border-radius: 2px;
  background-image: url("${(props) => props.image}");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.div`
  font-size: 1rem;
  color: #55aece;
  z-index: 101;
  margin-top: 0.5rem;
  text-align: center;
  font-weight: bold;
  text-shadow: 2px 2px 2px rgb(10 17 25 / 45%);
`;
const Desc = styled.div`
  font-size: 0.85rem;
  text-align: center;
  margin-top: 0.5rem;
  color: #d2d2d2;
  z-index: 101;
`;

const GameName = styled.div`
  color: #959da6;
  z-index: 101;
  margin-top: 0.5rem;
  font-size: 0.8rem;
`;

const Star = styled.div`
  display: flex;
  color: #fecc09;
  flex-direction: row;
  padding: 0.25rem;
  font-size: 1.5rem;
  align-items: center;
  justify-content: center;
`;

const Date = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  padding: 0.25rem;
  align-items: center;
  justify-content: center;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.25rem;
  justify-content: center;
`;

export default function MilestoneNormal(props) {
  const { icon, name, description, game_name, unlocked_time_desc } =
    props.achievement;

  return (
    <CardContainer>
      <StarContainer>
        <Star>
          <FaStar style={{ fontSize: "0.9rem ", marginRight: "0.5rem" }} />
          {props.total - props.index}
          <FaStar style={{ fontSize: "0.9rem ", marginLeft: "0.5rem" }} />
        </Star>
        <Date>{getDescForDate(unlocked_time_desc)}</Date>
      </StarContainer>
      <IconDataContainer>
        <Icon image={icon}></Icon>
        <DataContainer>
          <Title>{name}</Title>
          <Desc>{description}</Desc>
          <GameName>{game_name}</GameName>
        </DataContainer>
      </IconDataContainer>
      {/* <Misc>
        <Image image={STEAM_HEADER_IMAGE(game_id)}></Image>
      </Misc> */}
    </CardContainer>
  );
}
