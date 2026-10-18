import { useState } from "react";
import { CreateItemPage, AddItemsPage, MainPage, Sidebar, WithdrawPage, WithdrawnPage } from "./Pages";


function App() {

    const [activeTab, setActiveTab] = useState('withdrawPage');

    const pageMap = {
        mainPage: <MainPage />,

        withdrawPage: <WithdrawPage />,
        withdrawnPage: <WithdrawnPage />,
        addItemsPage: <AddItemsPage />,
        createItemPage: <CreateItemPage />
    }

    return (
        <div style={{ display: "flex" }}>
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <div style={{ maxHeight: "100vh", minHeight: "100vh", flexGrow: "1", padding: "24px" }}>

                {pageMap[activeTab]}

            </div>
        </div>
    )
}



export default App;