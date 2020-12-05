import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  Bar,
} from "victory-native";
import { View } from "react-native";
import barStyles from "./barStyles";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

const YearlyBars = ({ datas, setHowManyWeeksAgo, howManyWeeksAgo }) => {
  const barWidth = 10;
  const monthNames = [
    "Január",
    "Február",
    "Március",
    "Április",
    "Május",
    "Június",
    "Július",
    "Augusztus",
    "Szeptember",
    "Október",
    "November",
    "December",
  ];
  var obj = 0;
  var card = [];
  var cash = [];
  var epay = [];
  if (datas) {
    for (let i = 0; i < datas.length; i++) {
      obj = { x: monthNames[i], y: datas[i].cash };
      cash.push(obj);
      obj = { x: monthNames[i], y: datas[i].card };
      card.push(obj);
      obj = { x: monthNames[i], y: datas[i].epay };
      epay.push(obj);
    }
  }
  return (
    <FlingGestureHandler
      direction={Directions.RIGHT}
      onHandlerStateChange={({ nativeEvent }) => {
        nativeEvent.state === State.ACTIVE &&
          howManyWeeksAgo < 4 &&
          setHowManyWeeksAgo(howManyWeeksAgo + 1);
      }}
    >
      <FlingGestureHandler
        direction={Directions.LEFT}
        onHandlerStateChange={({ nativeEvent }) => {
          nativeEvent.state === State.ACTIVE &&
            howManyWeeksAgo > 0 &&
            setHowManyWeeksAgo(howManyWeeksAgo - 1);
        }}
      >
        <VictoryChart theme={barStyles}>
          <VictoryAxis />
          <VictoryStack
            horizontal={true}
            colorScale={["#49b675", "#c4342d", "#fc9303"]}
          >
            <VictoryBar barWidth={barWidth} data={cash} />

            <VictoryBar barWidth={barWidth} data={card} />

            <VictoryBar barWidth={barWidth} data={epay} />
          </VictoryStack>
        </VictoryChart>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default YearlyBars;
