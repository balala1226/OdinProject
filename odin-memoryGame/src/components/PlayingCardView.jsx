import '../style/App.css'

function PlayingCardView(props) {
    const onPlayerCardClick = (event) =>{
        event.preventDefault();
        
        var selectedCard = props.cardData;
        props.onCardSelected(selectedCard);
    };

    return (
        <>
            <button className='playingCard' onClick={onPlayerCardClick}>
                <img className='cardImage' src={props.cardData.url}></img>
            </button>
        </>
    )
}

export default PlayingCardView
