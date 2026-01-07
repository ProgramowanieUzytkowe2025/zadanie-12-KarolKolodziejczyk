export function actionReducer(state, action) {
    switch(action.type) {
        case 'RESET':
            return 'Brak';
        case 'ZMODYFIKOWANO_A':
            return 'Zmodyfikowano wartość liczby A';
        case 'ZMODYFIKOWANO_B':
            return 'Zmodyfikowano wartość liczby B';
        case 'WYKONANO_OBLICZENIA':
            return 'Wykonano obliczenia';
        case 'PRZYWRÓCONO_HISTORIE':
            return 'Przywrócono historyczny stan';
        default:
            return state;
    }
}
