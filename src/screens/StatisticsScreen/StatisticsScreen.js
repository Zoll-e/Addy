import React, { useEffect, useState } from "react";
import { Text, View, StatusBar } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import WeeklyBars from "./WeeklyBars";
import YearlyBars from "./YearlyBars";
import { ScrollView } from "react-native-gesture-handler";

function StatisticsScreen({ entities }) {
  //____________________________________________________________________________________

  const [thisWeek, setThisWeek] = useState(0);
  const [thisYear, setThisYear] = useState(0);
  const [howManyWeeksAgo, setHowManyWeeksAgo] = useState(0);
  const [weekData, setWeekData] = useState(null);

  const [howManyYearsAgo, setHowManyYearsAgo] = useState(0);
  const [yearData, setYearData] = useState(null);

  const week = howManyWeeksAgo => {
    var timed = [];
    entities.map(
      e =>
        e.createdAt &&
        e.createdAt.toMillis() >
          DateTime.local().minus({ weeks: howManyWeeksAgo }).startOf("week") &&
        DateTime.local().minus({ weeks: howManyWeeksAgo }).endOf("week") >
          e.createdAt.toMillis() &&
        timed.push(e.text)
    );

    setThisWeek(timed.reduce((sum, timed) => sum + timed, 0));
  };

  const year = () => {
    var timed = [];
    entities.map(
      e =>
        e.createdAt &&
        e.createdAt.toMillis() >
          DateTime.local().minus({ months: 0 }).startOf("year") &&
        DateTime.local().minus({ months: 0 }).endOf("year") &&
        timed.push(e.text)
    );
    setThisYear(timed.reduce((sum, timed) => sum + timed, 0));
    return timed;
  };

  //________________________________________________________________________________________________________________________________________________________________________

  const weeklySum = () => {
    var finalResult = [];

    for (let j = 0; j < 4; j++) {
      var from = DateTime.local().minus({ weeks: j }).startOf("week");
      var result = [];

      for (let i = 0; i < 7; i++) {
        var timed = [];
        var cardSum = null;
        var cashSum = null;
        var epaySum = null;

        entities.filter(
          e =>
            e.createdAt &&
            from.plus({ days: i }) < e.createdAt.toMillis() &&
            e.createdAt.toMillis() < from.plus({ days: i + 1 }) &&
            timed.push({ value: e.text, type: e.type })
        );

        timed.map(e =>
          e.type == "E-pay"
            ? (epaySum += e.value)
            : e.type == "Kártya"
            ? (cardSum += e.value)
            : (cashSum += e.value)
        );
        result[i] = { card: cardSum, cash: cashSum, epay: epaySum };
      }
      finalResult.push(result);
    }
    return finalResult;
  };
  //___________________________________________________________________________________________________________________________________________________________________________
  const yearlySum = howManyYearsAgo => {
    var result = [];

    var from = DateTime.local()
      .minus({ years: howManyYearsAgo })
      .startOf("year");

    for (let i = 0; i < 12; i++) {
      var timed = [];
      var cardSum = 0;
      var cashSum = 0;
      var epaySum = 0;

      entities.filter(
        e =>
          e.createdAt &&
          from.plus({ months: i }) < e.createdAt.toMillis() &&
          e.createdAt.toMillis() < from.plus({ months: i + 1 }) &&
          timed.push({ value: e.text, type: e.type })
      );

      timed.map(e =>
        e.type == "E-pay"
          ? (epaySum += e.value)
          : e.type == "Kártya"
          ? (cardSum += e.value)
          : (cashSum += e.value)
      );
      result[i] = { card: cardSum, cash: cashSum, epay: epaySum };
    }

    return result;
  };

  //___________________________________________________________________________________________________________________________________________________________________________
  useEffect(() => {
    week(howManyWeeksAgo);

  }, [howManyWeeksAgo]);
  useEffect(() => {
    week(howManyWeeksAgo);
    year();
    setWeekData(weeklySum());
    setYearData(yearlySum(howManyYearsAgo));

  }, [entities]);



  return (
    
    <ScrollView style={{ backgroundColor: "#2c2b30" }}>
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <Text style={styles.title}>Heti bevétel: {thisWeek}</Text>

        <Text style={styles.text}>
          {howManyWeeksAgo == 3 ? "   " : "<- "}
          {DateTime.local()
            .minus({ weeks: howManyWeeksAgo })
            .startOf("week")
            .toFormat("LLLL dd")}
          -
          {DateTime.local()
            .minus({ weeks: howManyWeeksAgo })
            .endOf("week")
            .toFormat("LLLL dd")}
          {howManyWeeksAgo == 0 ? "   " : " ->"}
        </Text>

        {weekData && (
          <WeeklyBars
            datas={weekData}
            howManyWeeksAgo={howManyWeeksAgo}
            setHowManyWeeksAgo={setHowManyWeeksAgo}
          />
        )}
        <Text style={styles.title}>Éves bevétel: {thisYear}</Text>
        <Text style={styles.text}>2020</Text>

        {yearData && (
          <YearlyBars
            datas={yearData}
            setHowManyYearsAgo={setHowManyYearsAgo}
            howManyYearsAgo={howManyYearsAgo}
          />
        )}
      </View>
    </ScrollView> 
  )
}

const mapStateToProps = state => ({
  entities: state.entity.entities,
});

export default connect(mapStateToProps)(StatisticsScreen);
