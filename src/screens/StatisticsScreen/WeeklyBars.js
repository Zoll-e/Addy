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

    return <Bar {...props} y0={y0-3} />;
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
          <VictoryChart theme={barStyles}>
            <VictoryAxis />
            <VictoryStack colorScale={["#49b675", "#c4342d", "#fc9303"]}>
              <VictoryBar
                barWidth={30}
                cornerRadius={cornerRadius}
                dataComponent={<CustomBar />}

                data={cash}
              />

              <VictoryBar
                barWidth={30}
                cornerRadius={cornerRadius}
                dataComponent={<CustomBar />}

                data={card}
              />

              <VictoryBar
                cornerRadius={cornerRadius}
                barWidth={30}
                dataComponent={<CustomBar />}

                data={epay}
              />
            </VictoryStack>
          </VictoryChart>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default WeeklyBars;
