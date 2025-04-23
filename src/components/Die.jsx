
export default function Die(props) {

    return(
        <button className={props.isHeld? "held-die" : null} onClick={()=> props.hold(props.id)} >
            {props.value}
        </button>
    )





}