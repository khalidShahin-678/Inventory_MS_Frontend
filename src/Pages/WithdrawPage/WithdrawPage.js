import React, { useState } from 'react'
import Styles from './WithdrawPage.module.css'
import arrowIcon from './arrow.svg'
import ItemsTable from './ItemsTable';
import RequiredItemsTable from './RequiredItemsTable';
function WithdrawPage() {

    const [requiredItems, setRequiredItems] = useState([]);

    const [items, setItems] = useState([true]);

    const handleSetItems = (id, reqQuantity) => {
        reqQuantity = Number(reqQuantity);

        let targetItem = items.find(item => item.id === id);

        if (!targetItem) return;

        const updatedItem = {
            ...targetItem,
            isRequired: (reqQuantity > 0),
            requiredQuantity: reqQuantity
        }

        setItems((currItems) => {
            return currItems.map(item => item.id === id ? updatedItem : item);
        });

        handleSetRequiredItems(updatedItem);
    }

    const handleSetRequiredItems = (updatedItem) => {
        setRequiredItems((prevReqItems) => {
            const isExist = prevReqItems.some(item => item.id === updatedItem.id);

            if (isExist) {
                if (!updatedItem.isRequired) {
                    return prevReqItems.filter(item => item.id !== updatedItem.id);
                }
                return prevReqItems.map(item => item.id === updatedItem.id ? updatedItem : item);
            }
            else {
                if (updatedItem.isRequired) {
                    return [...prevReqItems, updatedItem];
                }
            }

            return prevReqItems;
        })
    }


    const handleSearch = async (event) => {
        if (event.key == "Enter") {
            const inputValue = event.target.value.trim();
            if (!inputValue || inputValue === "") return;
            const url = new URL("http://localhost:8080/items");
            url.searchParams.set("name", String(inputValue));
            try {
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {

                    let fetchItems = data.map(item => {
                        return {
                            id: item.id,
                            name: item.enName,
                            category: mapCategory(item.category),
                            quantity: Number(item.quantity),
                            isRequired: false,
                            requiredQuantity: 0
                        }
                    })

                    setItems(fetchItems);
                }
                else if (response.status === 404) {
                    setItems([]);
                }

            } catch (error) {
                alert("مشكلة في السيرفر");
                console.log(Boolean([].length))
            }
        }
    }

    const mapCategory = (category) => {
        const Categories = {
            GENERAL: "عام",
            TAB: "اقراص",
            SYRUP: "شراب",
            SUPP: "لبوس",
            VIAL: "حقن",
            DROP: "نقظ",
            CREAM: "كريمات"
        }
        return Categories[category];
    }
    return (
        <div className={Styles.pageWrapper}>
            <div className={Styles.itemsTableWrapper}>
                <div className={Styles.title}>الاصناف</div>
                <div className={Styles.search}>
                    <input type='text' placeholder='ابحث بالاسم' onKeyDown={(e) => handleSearch(e)} />
                </div>

                <ItemsTable items={items} handleSetItems={handleSetItems} />

            </div>

            <div className={Styles.arrowIcon}>
                <img src={arrowIcon} alt='arrowIcon' />
            </div>

            <div className={Styles.withdrawnItems}>
                <div className={Styles.title}>المسحوبة</div>
                <RequiredItemsTable items={requiredItems} />
            </div>

        </div>
    )
}

export default WithdrawPage