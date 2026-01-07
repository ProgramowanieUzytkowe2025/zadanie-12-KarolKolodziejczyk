import './AppCalculator.css';
import { useState, useEffect } from 'react';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useKalkulator } from './useKalkulator';

export function AppCalculator() {
    const [porownanie, setPorownanie] = useState('');

    const {
        liczbaA,
        liczbaB,
        ustawLiczbaA,
        ustawLiczbaB,
        wynik,
        historia,
        komunikat,
        dodaj,
        odejmij,
        pomnoz,
        podziel,
        przywrocHistorie,
    } = useKalkulator();

    function liczbaAOnChange(value) {
        ustawLiczbaA(parsujLiczbe(value));
    }

    function liczbaBOnChange(value) {
        ustawLiczbaB(parsujLiczbe(value));
    }

    function parsujLiczbe(value) {
        const val = parseFloat(value);
        return isNaN(val) ? null : val;
    }

    function onAppCalculationHistoryClick(index) {
        const nowaHistoria = historia.slice(0, index + 1);
        przywrocHistorie(nowaHistoria);
    }

    let zablokujPrzyciski = liczbaA == null || liczbaB == null;
    let zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

    useEffect(() => {
        if (liczbaA == null || liczbaB == null) setPorownanie('');
        else if (liczbaA === liczbaB) setPorownanie('Liczba A jest równa liczbie B.');
        else if (liczbaA > liczbaB) setPorownanie('Liczba A jest większa od liczby B.');
        else setPorownanie('Liczba B jest większa od liczby A.');
    }, [liczbaA, liczbaB]);

    return (
        <div className='app-calculator'>
            <div className='app-calculator-pole'>
                <label>Wynik: </label>
                <span>{wynik}</span>
            </div>

            <div className='app-calculator-pole'>
                <label>Ostatnia czynność: </label>
                <span>{komunikat}</span>
            </div>

            <hr />
            <div className='app-calculator-pole'>
                <label>Dynamiczne porównanie liczb: </label>
                <span>{porownanie}</span>
            </div>
            <hr/>
            <div className='app-calculator-pole'>
                <label htmlFor="liczba1">Liczba 1</label>
                <input
                    id="liczba1"
                    type="number"
                    value={liczbaA ?? ''}
                    onChange={(e) => liczbaAOnChange(e.target.value)}
                />
            </div>
            <div className='app-calculator-pole'>
                <label htmlFor="liczba2">Liczba 2</label>
                <input
                    id="liczba2"
                    type="number"
                    value={liczbaB ?? ''}
                    onChange={(e) => liczbaBOnChange(e.target.value)}
                />
            </div>

            <hr />

            <div className='app-calculator-przyciski'>
                <AppButton disabled={zablokujPrzyciski} title="+" onClick={() => dodaj(liczbaA, liczbaB)} />
                <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => odejmij(liczbaA, liczbaB)} />
                <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => pomnoz(liczbaA, liczbaB)} />
                <AppButton disabled={zablokujDzielenie} title="/" onClick={() => podziel(liczbaA, liczbaB)} />
            </div>

            <hr />

            <div className='app-calculator-historia'>
                <AppCalculationHistory historia={historia} onClick={onAppCalculationHistoryClick} />
            </div>
        </div>
    );
}
