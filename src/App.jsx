import './App.css'
import { AppCalculator } from './AppCalculator'
import { AppHeader } from './AppHeader'
import { useFont } from './FontContext';

export default function App() {
    const { czcionka } = useFont();

  return (
    <div className="app" style={{ fontSize: czcionka }}>
      <div>
        <AppHeader imie={'Karol'} nazwisko={'Kołodziejczyk'}/>
      </div>
      <div>
        <AppCalculator />
      </div>
    </div>
  )
}
