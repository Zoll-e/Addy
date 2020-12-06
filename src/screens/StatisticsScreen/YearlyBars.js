import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
} from "victory-native";

import barStyles from "./barStyles";

const YearlyBars = ({ datas, setHowManyWeeksAgo, howManyWeeksAgo }) => {
  const barWidth = 13;
  const monthNames = [
    "Jan",
    "Feb",
    "Már",
    "Ápr",
    "Máj",
    "Jún",
    "Júl",
    "Aug",
    "Szep",
    "Okt",
    "Nov",
    "Dec",
  ];
  var card = [];
  var cash = [];
  var epay = [];

  if (datas) {
    for (let i = 0; i < datas.length; i++) {
      cash.push({ x: monthNames[i], y: datas[i].cash });
      card.push({ x: monthNames[i], y: datas[i].card });
      epay.push({ x: monthNames[i], y: datas[i].epay });
    }
  }
  return (
    <VictoryChart width={285} height={385} theme={barStyles}>
      <VictoryAxis />
      <VictoryStack
        horizontal={true}
        colorScale={["#49b675", "#c4342d", "#fc9303"]}
        labels={datas.map(
          d => d.card + d.cash + d.epay > 0 ? Math.round((d.card + d.cash + d.epay) / 1000) + "K" :""
        )}
      >
        <VictoryBar barWidth={barWidth} data={cash} />

        <VictoryBar barWidth={barWidth} data={card} />

        <VictoryBar barWidth={barWidth} data={epay} />
      </VictoryStack>
    </VictoryChart>
  );
};

export default YearlyBars;
