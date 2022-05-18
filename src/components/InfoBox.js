

const InfoBox = ({info}) => {
    return (
        <div>
            <h2> Event Location Info</h2>
            <li>ID: <strong>{info.id} </strong></li>
            <li>TITLE: <strong>{info.title} </strong></li>
        </div>
    )
}

export default InfoBox;