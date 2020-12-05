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

const WeeklyBars = ({ datas, setHowManyWeeksAgo, howManyWeeksAgo }) => {
  const dayNames = ["H", "K", "Sze", "Cs", "P", "Szo", "V"];
  var card = [];
  var cash = [];
  var epay = [];

  if (datas) {
    for (let i = 0; i < datas.length; i++) {
      cash.push({ x: dayNames[i], y: datas[i].cash });
      card.push({ x: dayNames[i], y: datas[i].card });
      epay.push( { x: dayNames[i], y: datas[i].epay });
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
        <View>
          <VictoryChart theme={barStyles} domain={{ x: [0, 7] }}>
            <VictoryAxis />

            <VictoryStack colorScale={["#49b675", "#c4342d", "#fc9303"]}>
              <VictoryBar barWidth={30} data={cash} />

              <VictoryBar barWidth={30} data={card} />

              <VictoryBar barWidth={30} data={epay} />
            </VictoryStack>
          </VictoryChart>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default WeeklyBars;
