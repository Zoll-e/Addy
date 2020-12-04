import React, { useEffect, useState } from "react";
import { Text, View, StatusBar } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import WeeklyBars from "./WeeklyBars";




function StatisticsScreen({ entities }) {
  //____________________________________________________________________________________

  const [sixteenHours, setSixteenHours] = useState(0);
  const [thisWeek, setThisWeek] = useState(0);
  const [thisMonth, setThisMonth] = useState(0);
  const [howManyWeeksAgo, setHowManyWeeksAgo] = useState(0);

  const [weekData, setWeekData] = useState(null);
  const [weekDataKetto, setWeekDataKetto] = useState(null);

  const sixteen = () => {
    var timed = [];
    entities.map(
      e =>
        e.createdAt &&
        e.createdAt.toMillis() >
          DateTime.local().minus({ hours: 16 }).toMillis() &&
        timed.push(e.text)
    );
    setSixteenHours(timed.reduce((sum, timed) => sum + timed, 0));
  };

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

  useEffect(() => {
    sixteen();
    week(howManyWeeksAgo);
    month();
    setWeekData(weeklySum(howManyWeeksAgo));
    //setWeekDataKetto(weeklySum(howManyWeeksAgo ));
  }, [entities, howManyWeeksAgo]);

  //const he = [ <WeeklyBars data={proba[0]} />, <WeeklyBars data={proba[1]} />]
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Text style={styles.entityText}>
        {"<-"}{" "}
        {DateTime.local()
          .minus({ weeks: howManyWeeksAgo })
          .startOf("week")
          .toISODate()}
        -
        {DateTime.local()
          .minus({ weeks: howManyWeeksAgo })
          .endOf("week")
          .toISODate()}{" "}
        {"->"}
      </Text>
  
      {weekData && 
 
       <WeeklyBars datas={weekData} setHowManyWeeksAgo={setHowManyWeeksAgo} howManyWeeksAgo={howManyWeeksAgo} />

}
      

      <Text style={styles.title}>Heti bevétel: {thisWeek}</Text>

      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>Elmúlt 16 óra: {sixteenHours}</Text>
        <Text style={styles.entityText}>Jelenlegi hónap: {thisMonth}</Text>
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  entities: state.entity.entities,
});

export default connect(mapStateToProps)(StatisticsScreen);
