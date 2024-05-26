import { MedicineProvider } from './src/context/ContextProvider';
import AppNavigation from './src/navigation/AppNavigation';
import React , {useEffect} from 'react';
import { setItem } from './src/utils/AsyncStorage';
export default function App() {

  useEffect (() => {
    setItem('onboarded', '0');
  } , [])
  return (
    <AppNavigation/>
  );
}
