
export default function Die(props) {

    return (
        <button className={props.isHeld ? "held-die" : null}
            onClick={() => props.hold(props.id)}
            aria-pressed = {props.isHeld}
            aria-label={`Die with value of ${props.value}, ${props.isHeld ? "Held" : "Not Held"}`}>
            {props.value}
        </button>
    )





}