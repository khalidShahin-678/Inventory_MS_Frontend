import { useEffect, useState } from "react";
import { CreateItemPage, AddItemsPage, MainPage, Sidebar, WithdrawPage, WithdrawnPage } from "./Pages";


function App() {
    const pageTitles = {
        withdrawPage: "سحب اصناف",
        withdrawnPage: "الاصناف المسحوبة",
        createItemPage: "انشاء صنف جديد",
        addItemsPage: "اضافة اصناف للمحزن"
    }

    const [activeTab, setActiveTab] = useState('withdrawPage');

    useEffect(() => {
        document.title = pageTitles[activeTab];
    });

    const pageMap = {
        mainPage: <MainPage />,

        withdrawPage: <WithdrawPage />,
        withdrawnPage: <WithdrawnPage />,
        addItemsPage: <AddItemsPage />,
        createItemPage: <CreateItemPage />
    }



    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <div style={{ minHeight: "100vh", flexGrow: "1", padding: "24px" }} >

                {pageMap[activeTab]}

            </div>
        </div>
    )
}



export default App;