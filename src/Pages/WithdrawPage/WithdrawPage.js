import React, { useState } from 'react'
import Styles from './WithdrawPage.module.css'
import arrowIcon from './arrow.svg'
import ItemsTable from './ItemsTable';
import RequiredItemsTable from './RequiredItemsTable';
import axios from 'axios';
export const mapCategory = (category) => {
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

function WithdrawPage() {

    const [requiredItems, setRequiredItems] = useState([]);
    const [items, setItems] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [avFilter, setAvFilter] = useState("av");

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
        if (event.key === "Enter") {
            const inputValue = event.target.value.trim();

            const url = new URL("http://localhost:8080/items");
            url.searchParams.set("name", String(inputValue));

            try {
                const response = await axios.get(url);
                let fetchItems = response.data.map(item => {

                    return {
                        id: item.id,
                        name: item.enName,
                        category: mapCategory(item.category),
                        quantity: Number(item.quantity),
                        isRequired: false,
                        requiredQuantity: Number(requiredItems.find(reqItem => reqItem.id == item.id)?.requiredQuantity) || 0
                    }
                });
                fetchItems.sort((a, b) => a.name.localeCompare(b.name));
                setItems(fetchItems);

            } catch (error) {
                if (error.status === 404) {
                    setItems([]);
                }
                else {
                    alert("مشكلة في السيرفر");
                }
            }
        }
    }

    const withdrawRequiredItems = async () => {
        requiredItems.map(async (reqItem) => {
            const url = `http://localhost:8080/items/${reqItem.id}/withdraw`;
            try {

                await axios.post(url, {
                    quantity: Number(reqItem.requiredQuantity)
                });

                setRequiredItems([]);
                setItems(items.map(i => {
                    i.quantity -= i.requiredQuantity;
                    i.requiredQuantity = 0;
                    return i;
                }));


            } catch (error) {
                if (error.status === 422) {
                    console.log("quantity is not enough :'" + reqItem.name + "' the limit is '" + reqItem.quantity + "'")
                }
                else {
                    alert("مشكلة في السيرفر");
                }
            }
        });
    }



    return (
        <div className={Styles.pageWrapper}>
            <div className={Styles.itemsTableWrapper}>
                <div className={Styles.title}>الاصناف</div>
                <div className={Styles.search}>
                    <input type='text' placeholder='ابحث بالاسم' onKeyDown={(e) => handleSearch(e)} />
                    <select name='category' id='category' required value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value) }}>
                        <option value={"ALL"}>الكل</option>
                        <option value={"TAB"}>اقراص</option>
                        <option value={"SYRUP"}>شراب</option>
                        <option value={"DROP"}>نقط</option>
                        <option value={"CREAM"}>كريمات</option>
                        <option value={"VIAL"}>حقن</option>
                        <option value={"SUPP"}>لبوس</option>
                        <option value={"GENERAL"}>عام</option>
                    </select>
                    <select name='isAv' id='isAv' required value={avFilter} onChange={(e) => setAvFilter(e.target.value)}>
                        <option value={"Av"}>متوفر</option>
                        <option value={"All"}>الكل</option>
                    </select>
                </div>

                <ItemsTable items={items} requiredItems={requiredItems} categoryFilter={categoryFilter} avFilter={avFilter} handleSetItems={handleSetItems} />

            </div>

            <div className={Styles.arrowIcon}>
                <img src={arrowIcon} alt='arrowIcon' />
            </div>

            <div className={Styles.withdrawnItems}>
                <div className={Styles.title}>المسحوبة</div>
                <RequiredItemsTable items={requiredItems} />
                <button onClick={withdrawRequiredItems}>سحب</button>
            </div>

        </div>
    )
}

export default WithdrawPage