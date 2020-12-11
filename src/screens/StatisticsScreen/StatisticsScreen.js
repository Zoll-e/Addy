import React, { useEffect, useState, useRef, useCallback } from "react";
import { StatusBar, Text, Pressable, View } from "react-native";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { FlatList } from "react-native-gesture-handler";
import Statistics from "./Statistics";
import styles from "./styles";

const StatisticsScreen = ({ entities }) => {
  const [thisYear, setThisYear] = useState(null);
  const [thisMonth, setThisMonth] = useState(0);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    month();

    setThisYear(year());
  }, [entities, index]);
  //----------Vendeg-------
  

  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
   
  }, []);

  // Use the index

  //__________________________________Vendeg vege____________
  const month = () => {
    var timed = [];
    entities.map(
      e =>
        e.createdAt &&
        e.createdAt.toMillis() > DateTime.local().startOf("month") &&
        DateTime.local().endOf("month") > e.createdAt.toMillis() &&
        timed.push(e.text)
    );

    setThisMonth(timed.reduce((sum, timed) => sum + timed, 0));
  };
  //________________________________________________
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
    var result = timed.reduce((sum, timed) => sum + timed, 0);
    return result;
  };

  //____________________________________________________________________________________
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
    return timed.reduce((sum, timed) => sum + timed, 0);
  };
  //_______________
  const weeklySum = howManyWeeksAgo => {
    var result = [];
    var highest = 0;

    for (let i = 0; i < 7; i++) {
      var from = DateTime.local()
        .minus({ weeks: howManyWeeksAgo })
        .startOf("week");

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
      cardSum + cashSum + epaySum > highest &&
        (highest = cardSum + cashSum + epaySum);
    }

    return { result, highest };
  };

  const slideList = Array.from({ length: 4 }).map((_, i) => {
    return {
      id: i,
      week: weeklySum(i),
      weekTotal: week(i),
    };
  });

  //_________________________________________________________________________________________________________________________________________________________
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />

      <FlatList
        data={slideList}
        renderItem={({ item }) => (
          <Statistics item={item} />
        )}
        inverted
        onScroll={onScroll}
        pagingEnabled
        horizontal
        keyExtractor={item => item.id.toString()}

        showsHorizontalScrollIndicator={false}
      ></FlatList>

      <Text style={styles.secondaryTitle}>
        {DateTime.local().toFormat("LLLL")}: {thisMonth}
      </Text>
      <View
        style={{
          width: "100%",
          height: 500,
        }}
      ></View>
    </View>
  );
};

const mapStateToProps = state => ({
  entities: state.entity.entities,
});
export default connect(mapStateToProps)(StatisticsScreen);
