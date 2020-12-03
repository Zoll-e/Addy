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
  // Custom bar for stacked bar borders
  const cornerRadius = 3;

  function CustomBar(props) {
    const y0 = props.y0 + cornerRadius;

    return <Bar {...props} y0={y0} />;
  }
  const dayNames = ["H", "K", "Sze", "Cs", "P", "Szo", "V"];
  var card = [];
  var cash = [];
  var epay = [];
  if (datas) {
    for (let i = 0; i < datas.length; i++) {
      var obj = { x: dayNames[i], y: datas[i].cash };
      cash.push(obj);
      obj = { x: dayNames[i], y: datas[i].card };
      card.push(obj);
      obj = { x: dayNames[i], y: datas[i].epay };
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
        <View>
          <VictoryStack theme={barStyles}>
            <VictoryChart>
              <VictoryAxis />

              <VictoryBar
                barWidth={35}
                cornerRadius={cornerRadius}
                dataComponent={<CustomBar />}
                style={{ data: { fill: "#49b675" } }}
                data={cash}
              />

              <VictoryBar
                barWidth={35}
                cornerRadius={cornerRadius}
                dataComponent={<CustomBar />}
                style={{ data: { fill: "#c4342d" } }}
                data={card}
              />

              <VictoryBar
                cornerRadius={cornerRadius}
                barWidth={35}
                dataComponent={<CustomBar />}
                style={{ data: { fill: "#fc9303" } }}
                data={epay}
              />
            </VictoryChart>
          </VictoryStack>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default WeeklyBars;
