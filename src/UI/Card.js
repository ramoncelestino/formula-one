import './Card.css'

const Card = (props) => {
    const classes = 'card ' + props.className;

    const handlerPanelInformations = () => {
        props.onClickCard(props.driverInfo);
    }
    
    return(
        <div className={classes} onClick = {handlerPanelInformations}>{props.children}</div>
    );

}

export default Card;