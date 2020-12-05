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
  const [thisMonth, setThisMonth] = useState(0);
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

  const month = () => {
    var timed = [];
    entities.map(
      e =>
        e.createdAt &&
        e.createdAt.toMillis() >
          DateTime.local().minus({ months: 0 }).startOf("month") &&
        DateTime.local().minus({ months: 0 }).endOf("month") &&
        timed.push(e.text)
    );
    setThisMonth(timed.reduce((sum, timed) => sum + timed, 0));
    return timed;
  };

  //________________________________________________________________________________________________________________________________________________________________________

  const weeklySum = howManyWeeksAgo => {
    var result = [];

    var from = DateTime.local()
      .minus({ weeks: howManyWeeksAgo })
      .startOf("week");

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
    return result;
  };
  //___________________________________________________________________________________________________________________________________________________________________________
  const yearlySum = howManyYearsAgo => {
    var result = [];

    var from = DateTime.local()
      .minus({ years: howManyYearsAgo })
      .startOf("year");

    for (let i = 0; i < 12; i++) {
      var timed = [];
      var cardSum = null;
      var cashSum = null;
      var epaySum = null;

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
    month();
    setWeekData(weeklySum(howManyWeeksAgo));
    setYearData(yearlySum(howManyYearsAgo));
  }, [entities, howManyWeeksAgo]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <Text style={styles.title}>Heti bevétel: {thisWeek}</Text>

        <Text style={styles.text}>
          {howManyWeeksAgo == 4 ? "   " : "<- "}
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
            setHowManyWeeksAgo={setHowManyWeeksAgo}
            howManyWeeksAgo={howManyWeeksAgo}
          />
        )}

        <View>
          <Text style={styles.title}>Havi bevétel: {thisMonth}</Text>
          {yearData && (
            <View
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                width: 300,
                borderWidth: 1,
                borderColor: "red",
              }}
            >
              <YearlyBars
                datas={yearData}
                setHowManyYearsAgo={setHowManyYearsAgo}
                howManyYearsAgo={howManyYearsAgo}
              />
            </View>
          )}
        </View>
        <Text>Some text</Text>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  entities: state.entity.entities,
});

export default connect(mapStateToProps)(StatisticsScreen);
