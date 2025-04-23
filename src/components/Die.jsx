
export default function Die(props) {

    return(
        <button className={props.isHeld? "held-die" : null} >
            {props.value}
        </button>
    )





}