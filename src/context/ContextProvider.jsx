import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState(() => {
    // Load medicines from AsyncStorage
    (async () => {
      const storedMedicines = await AsyncStorage.getItem("medicines");
      if (storedMedicines) {
        const parsedMedicines = JSON.parse(storedMedicines);
        parsedMedicines.forEach((medicine) => {
          medicine.time = new Date(medicine.time);
        });
        setMedicines(parsedMedicines);
      }
    })();
    // Return an empty array as the initial state
    return [];
  });

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user sign-in status and user data from AsyncStorage
    (async () => {
      const storedUserSignedIn = await AsyncStorage.getItem("isUserSignedIn");
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUserSignedIn) {
        setIsUserSignedIn(JSON.parse(storedUserSignedIn));
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    })();
  }, []);
  const saveMedicine = (
    medicine,
    medicineType,
    purpose,
    frequency,
    days,
    dosage,
    date
  ) => {
    const newMedicine = {
      id: new Date().getTime(),
      medicine,
      medicineType,
      purpose,
      frequency,
      days,
      dosage,
      time: date.toISOString(),
      createdBy: user?.uid, // Add this line
    };
    setMedicines([...medicines, newMedicine]);
  };
  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("medicines", JSON.stringify(medicines));
      await AsyncStorage.setItem(
        "isUserSignedIn",
        JSON.stringify(isUserSignedIn)
      );
      await AsyncStorage.setItem("user", JSON.stringify(user));
    })();
  }, [medicines, isUserSignedIn, user]);

  return (
    <MedicineContext.Provider
      value={{
        medicines,
        setMedicines,
        saveMedicine,
        user,
        setUser,
        isUserSignedIn,
        setIsUserSignedIn,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
