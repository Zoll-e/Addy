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
  var cardRes = [];
  var cashRes = [];
  var epayRes = [];

  if (datas) {
    for (let j = 0; j < 4; j++) {
      var card = [];
      var cash = [];
      var epay = [];
      for (let i = 0; i < 7; i++) {
        cash.push({ x: dayNames[i], y: datas[j][i].cash });
        card.push({ x: dayNames[i], y: datas[j][i].card });
        epay.push({ x: dayNames[i], y: datas[j][i].epay });
      }
      cashRes.push(cash);
      cardRes.push(card);
      epayRes.push(epay);
    }
  }

  return (
    <FlingGestureHandler
      direction={Directions.RIGHT}
      onHandlerStateChange={({ nativeEvent }) => {
        nativeEvent.state === State.ACTIVE &&
          howManyWeeksAgo < 3 &&
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
          <VictoryChart theme={barStyles} >
            <VictoryAxis />

            <VictoryStack
              colorScale={["#49b675", "#c4342d", "#fc9303"]}
            >
              <VictoryBar barWidth={30} data={cashRes[howManyWeeksAgo]} />

              <VictoryBar barWidth={30} data={cardRes[howManyWeeksAgo]} />

              <VictoryBar barWidth={30} data={epayRes[howManyWeeksAgo]} />
            </VictoryStack>
          </VictoryChart>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default WeeklyBars;
