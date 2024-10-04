import './TotalSalesScreen.css'

const TotalSalesScreen = () => {
    return (
        <div className= "d-flex flex-column align-items-cente rounded-4 bg-white">
            <text className="titleText">
                Total Sales
            </text>
            <row>
                <button className="filterButton">
                    Day
                </button>
            </row>
        </div>
    )
}

export default TotalSalesScreen;