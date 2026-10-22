import React, { useEffect, useState } from 'react'
import Styles from './WithdrawnItems.module.css'

function WithdrawnPage() {

    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [withdrawnItems, setWithdrawnItems] = useState([]);

    useEffect(() => {
        const wItems = localStorage.getItem('withdrawnItems');
        if (!wItems) return;
        console.log(wItems)
    }, []);



    return (
        <div className={Styles.pageWrapper}>
            <div className={Styles.itemsTableWrapper}>
                <div className={Styles.title}>الاصناف المسحوبة</div>

                <div className={Styles.filter}>
                    <select name='categoryFilter' id='categoryFilter' required value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                        <option value={"ALL"}>الكل</option>
                        <option value={"TAB"}>اقراص</option>
                        <option value={"SYRUP"}>شراب</option>
                        <option value={"DROP"}>نقط</option>
                        <option value={"CREAM"}>كريمات</option>
                        <option value={"VIAL"}>حقن</option>
                        <option value={"SUPP"}>لبوس</option>
                        <option value={"GENERAL"}>عام</option>
                    </select>
                </div>

                <table className={Styles.itemsTable}>
                    <thead>
                        <tr>
                            <th className={Styles.itemName}>اسم الصنف</th>
                            <th>المطلوب</th>
                            <th>النوع</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(Boolean(withdrawnItems.length) &&
                            withdrawnItems.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.requiredQuantity}</td>
                                        <td>{item.category}</td>
                                    </tr>
                                )
                            }))
                            ||
                            <tr><td colSpan={4} className={Styles.emptyState}>لا يوجد اصناف</td></tr>
                        }
                    </tbody>
                </table>

                <div className={Styles.actions}>
                    <button id='copyBtn'>نسخ</button>
                    <button id='deleteBtn'>مسح</button>
                </div>
            </div>
        </div>
    )
}

export default WithdrawnPage