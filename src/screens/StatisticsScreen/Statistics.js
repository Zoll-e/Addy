import React,{useState} from 'react'
import {View,Text,Pressable} from "react-native"
import {DateTime} from "luxon"
import styles from "./styles"

const Statistics =({ item })=> {
    const weekDays = [
        "Hétfő",
        "Kedd",
        "Szerda",
        "Csütörtök",
        "Péntek",
        "Szombat",
        "Vasárnap",
      ];
      const [daySum, setDaySum] = useState("");

    return (
      <View style={styles.container}>
        <Text style={styles.title} >Heti bevétel: {item.weekTotal}</Text>
        <Text style={styles.text}>
        {item.id == 3 ? "   " : "<- "}
        {DateTime.local()
          .minus({ weeks: item.id })
          .startOf("week")
          .toFormat("LLLL dd")}
        -
        {DateTime.local()
          .minus({ weeks: item.id })
          .endOf("week")
          .toFormat("LLLL dd")}
        {item.id == 0 ? "   " : " ->"}
      </Text>
        <Text style={styles.text}>{daySum}</Text>
      <View style={styles.barContainer}>
        {item &&
          item.week.result.map((it, i) => (
            <Pressable
              key={i}
              style={styles.bar}
              onPress={() => {
                setDaySum(weekDays[i] + " " + (it.epay+it.cash+it.card));
              }}
            >
              <View
                style={{
                  backgroundColor: "#fc9303",
                  height: `${(it.epay / item.week.highest) * 90}%`,
                }}
              ></View>
              <View
                style={{
                  backgroundColor: "#c4342d",
                  height: `${(it.card / item.week.highest) * 90}%`,
                }}
              ></View>

              <View
                style={{
                  backgroundColor: "#49b675",
                  height: `${(it.cash / item.week.highest) * 90}%`,
                }}
              ></View>
            </Pressable>
          ))}
      </View>
      <View style={styles.weekDayTextContainer}>
          <Text style={styles.weekDayText}>H</Text>
          <Text style={styles.weekDayText}>K</Text>
          <Text style={styles.weekDayText}>Sz</Text>
          <Text style={styles.weekDayText}>Cs</Text>
          <Text style={styles.weekDayText}>P</Text>
          <Text style={styles.weekDayText}>Sz</Text>
          <Text style={styles.weekDayText}>V</Text>
        </View>
      </View>
    );
  }

export default Statistics
