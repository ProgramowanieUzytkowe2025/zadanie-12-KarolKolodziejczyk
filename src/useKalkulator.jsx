import { useState, useEffect, useReducer } from 'react';
import { actionReducer } from './ActionReducer.jsx';

export function useKalkulator() {
    const [liczbaA, setLiczbaA] = useState(null);
    const [liczbaB, setLiczbaB] = useState(null);
    const [wynik, setWynik] = useState(null);
    const [historia, setHistoria] = useState([]);
    const [komunikat, dispatch] = useReducer(actionReducer, 'Brak');

    function aktualizujSesje(a, b, wynik, nowaHistoria, kom){
        sessionStorage.setItem('kalkulator', JSON.stringify({
                    liczbaA: a,
                    liczbaB: b,
                    wynik,
                    historia: nowaHistoria,
                    komunikat: kom
                }));
    }
    function aktualizujHistorie(a, b, operation, wynik) {
        const nowaHistoria = [...historia, { a, b, operation, wynik }];
        setHistoria(nowaHistoria);
        setWynik(wynik);
        dispatch({ type: 'WYKONANO_OBLICZENIA' });

       aktualizujSesje(a, b, wynik, nowaHistoria, 'WYKONANO_OBLICZENIA');
    }

    function dodaj(a, b) { aktualizujHistorie(a, b, '+', a + b); }
    function odejmij(a, b) { aktualizujHistorie(a, b, '-', a - b); }
    function pomnoz(a, b) { aktualizujHistorie(a, b, '*', a * b); }
    function podziel(a, b) { if (b !== 0) aktualizujHistorie(a, b, '/', a / b); }

    function przywrocHistorie(nowaHistoria) {
        if (!nowaHistoria || nowaHistoria.length === 0) return;
        setHistoria(nowaHistoria);
        const ostatni = nowaHistoria[nowaHistoria.length - 1];
        setLiczbaA(ostatni.a);
        setLiczbaB(ostatni.b);
        setWynik(ostatni.wynik);
        dispatch({ type: 'PRZYWRÓCONO_HISTORIE' });

        aktualizujSesje(ostatni.a, ostatni.b, ostatni.wynik, nowaHistoria, 'PRZYWRÓCONO_HISTORIE');

    }

    useEffect(() => {
        const zapisane = sessionStorage.getItem('kalkulator');
        if (zapisane) {
            const { liczbaA: a, liczbaB: b, wynik, historia, komunikat: typKomunikatu } = JSON.parse(zapisane);
            setLiczbaA(a ?? null);
            setLiczbaB(b ?? null);
            setWynik(wynik ?? null);
            setHistoria(historia || []);
            if (typKomunikatu) {
                dispatch({ type: typKomunikatu });
            }
        }
    }, []);

    function ustawLiczbaA(a) {
        setLiczbaA(a);
        dispatch({ type: 'ZMODYFIKOWANO_A' });

        aktualizujSesje(a,liczbaB, wynik, historia, 'ZMODYFIKOWANO_A');

    }

    function ustawLiczbaB(b) {
        setLiczbaB(b);
        dispatch({ type: 'ZMODYFIKOWANO_B' });
    
        aktualizujSesje(liczbaA,b, wynik, historia, 'ZMODYFIKOWANO_B');

    }

    return {
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
        setHistoria,
        dispatch,
    };
}
