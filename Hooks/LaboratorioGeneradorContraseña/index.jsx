const { useState, useEffect, useRef } = React;

const OTPGenerator = () => {
    const [otp, setOTP] = useState("")
    const[tiempo, setTiempo] = useState(0)
    const intervalo = useRef(null)

    useEffect(() => {
        if (tiempo <= 0) {
        clearInterval(intervalo.current);
        return;
        }
        intervalo.current = setInterval(() => {
        setTiempo((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalo.current);
    }, [tiempo])

    function generateOTP() {
        const newOtp = String(Math.floor(100000 + Math.random() * 900000));
        setOTP(newOtp);
        setTiempo(5)
    }
    const mensaje = () => {
        if (tiempo > 0) {
        return `Expires in: ${tiempo} seconds`
        } 
        if(otp) {return 'OTP expired. Click the button to generate a new OTP.'}
        return ''
    }

    return(
        <div className="container">
        <h1 id="otp-title">OTP Generator</h1>
        <h2 id="otp-display">{(otp && tiempo > 0) ? otp :"Click 'Generate OTP' to get a code"}</h2>
        <p id="otp-timer" aria-live="polite">
            {mensaje()}</p>
        <button id="generate-otp-button" onClick={generateOTP} disabled={tiempo > 0} >Generate OTP</button>
        </div>
    )
};

ReactDOM.createRoot(document.getElementById("root")).render(<OTPGenerator />);
