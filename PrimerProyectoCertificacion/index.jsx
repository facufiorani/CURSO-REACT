const { useState, useMemo } = React;

const goodMapping = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 156.7
};

export function CurrencyConverter() {
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const calcularMonto = useMemo(() => {
        const fromRate = goodMapping[fromCurrency] 
        return (amount/fromRate)
    }, [amount, fromCurrency])
    const montoFinal = calcularMonto * goodMapping[toCurrency]

    return (
        <div>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
        </select>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
        </select>
        <p>{amount} {fromCurrency} is equal to {montoFinal.toFixed(2)} {toCurrency}</p>
        </div>
    )
}
