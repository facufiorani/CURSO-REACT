const { useState } = React;

export function EventRSVPForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [attendees, setAttendees] = useState(1);
    const [dietary, setDietary] = useState('');
    const [bringingGuests, setBringingGuests] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
        }}>
        <label>
            Name:
            <input type="text" value={name}required onChange={(e) => (setName(e.target.value))}/>
            </label>
            <label>
            Dietary preferences:
            <input type="text" value={dietary} onChange={(e) => setDietary(e.target.value)}/>
            </label>
            <label>
            Email:
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
            Number of attendees:
            <input type="number" required min={1} value={attendees} onChange={(e) => setAttendees(e.target.value)}/>
            </label>
            <label>
            Bringing additional guests?
            <input type="checkbox" checked={bringingGuests} onChange={(e) => setBringingGuests(e.target.checked)}/>
            </label>
            <button type="submit">Enviar</button>
            {submitted && (
                <div>
                    <p>RSVP Submitted!</p>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    <p>Number of attendees: {attendees}</p>
                    <p>Dietary preferences: {dietary}</p>
                    <p>Bringing additional guests: {bringingGuests ? 'Yes' : 'No'}</p>
                </div>
                )}
        </form>)
}