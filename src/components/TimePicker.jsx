import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const hoursArray = Array.from({ length: 12 }, (_, i) => i + 1);
const minutesArray = Array.from({ length: 60 }, (_, i) => i);
const amPmArray = ["AM", "PM"];

const TimePicker = ({ onTimeChange }) => {
  const date = new Date();
  const [selectedHour, setSelectedHour] = useState(date.getHours() % 12 || 12);
  const [selectedMinute, setSelectedMinute] = useState(date.getMinutes());
  const [selectedAmPm, setSelectedAmPm] = useState(
    date.getHours() >= 12 ? "PM" : "AM"
  );

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  useEffect(() => {
    const date = new Date();
    date.setHours(selectedHour + (selectedAmPm === "PM" ? 12 : 0));
    date.setMinutes(selectedMinute);
    onTimeChange(date);
  }, [selectedHour, selectedMinute, selectedAmPm]);

  const onViewableItemsChangedHour = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setSelectedHour(viewableItems[0].item);
    }
  });

  const onViewableItemsChangedMinute = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setSelectedMinute(viewableItems[0].item);
    }
  });

  const onViewableItemsChangedAmPm = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setSelectedAmPm(viewableItems[0].item);
    }
  });

  const onScrollAmPm = useRef((event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setSelectedAmPm(offsetY < 15 ? "AM" : "PM");
  });

  const renderHour = ({ item }) => (
    <TouchableOpacity>
      <Text
        style={{
          fontSize: 50,
          color: item === selectedHour ? "yellow" : "gray",
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMinute = ({ item }) => (
    <TouchableOpacity>
      <Text
        style={{
          fontSize: 50,
          color: item === selectedMinute ? "yellow" : "gray",
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderAmPm = ({ item }) => (
    <TouchableOpacity>
      <Text
        style={{
          fontSize: 50,
          color: item === selectedAmPm ? "yellow" : "gray",
        }}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
      }}
    >
      <FlatList
        data={hoursArray}
        renderItem={renderHour}
        keyExtractor={(item) => item.toString()}
        initialScrollIndex={selectedHour - 1}
        onViewableItemsChanged={onViewableItemsChangedHour.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <FlatList
        data={minutesArray}
        renderItem={renderMinute}
        keyExtractor={(item) => item.toString()}
        initialScrollIndex={selectedMinute}
        onViewableItemsChanged={onViewableItemsChangedMinute.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <FlatList
        data={amPmArray}
        renderItem={renderAmPm}
        keyExtractor={(item) => item}
        onScroll={onScrollAmPm.current}
      />
    </View>
  );
};

export default TimePicker;
