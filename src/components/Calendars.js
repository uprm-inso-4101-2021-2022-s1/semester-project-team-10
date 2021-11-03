import Calendar from './Calendar'

const Calendars = ({ calendars }) => {
    return (
        <>
            {calendars.map((calendar) => (
                <Calendar 
                    key={calendar.id}
                    calendar={calendar}
                />
            ))}
        </>
    )
}

export default Calendars