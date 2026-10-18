import React, { useState } from 'react'
import handleCreateItem from './Api'
import Styles from './CreateItemPage.module.css';
function CreateItemPage() {

    const [arName, setArName] = useState("");
    const [enName, setEnName] = useState("");
    const [barcode, setBarcode] = useState("");
    const [category, setCategory] = useState("general");
    const [iQuantyty, setIQuantity] = useState(0);


    return (
        <div className={Styles.formWrapper}>
            <form action={handleCreateItem}>
                <div className={Styles.title}><p>اضافة صنف جديد</p></div>
                <div className={Styles.inputWrapper}>
                    <label htmlFor="arName">الاسم بالعربي</label>
                    {/* <span style={{ color: "red", fontSize: "14px", marginRight: "4px", fontWeight: "500", width: "200px" }}>الاسم مستخدم بالفعل </span> */}
                    <input type='text' minLength={6} maxLength={255} name='arName' id='arName' required value={arName} onChange={(e) => { setArName(e.target.value) }} />
                </div>

                <div className={Styles.inputWrapper}>
                    <label htmlFor="enName">الاسم بالانجليزي</label>
                    <input type='text' minLength={6} maxLength={255} name='enName' id='enName' required value={enName} onChange={(e) => { setEnName(e.target.value) }} />
                </div>

                <div className={Styles.inputWrapper}>
                    <label htmlFor="barcode">الباركود</label>
                    <input type='text' minLength={4} maxLength={255} name='barcode' id='barcode' value={barcode} onChange={(e) => { setBarcode(e.target.value) }} />
                </div>

                <div className={Styles.inputWrapper}>
                    <label htmlFor="category">نوع الصنف</label>
                    <select name='category' id='category' required value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        <option value={"general"}>عام</option>
                        <option value={"tab"}>اقراص</option>
                        <option value={"syrup"}>شراب</option>
                        <option value={"drop"}>نقط</option>
                        <option value={"cream"}>كريمات</option>
                        <option value={"vial"}>حقن</option>
                        <option value={"supp"}>لبوس</option>
                    </select>
                </div>

                <div className={Styles.inputWrapper}>
                    <label htmlFor="initialQuantity">كمية ابتدائية</label>
                    <input type='number' min={0} max={1000} name='initialQuantity' id='initialQuantity' placeholder='0' value={iQuantyty} onChange={(e) => { setIQuantity(e.target.value) }} />
                </div>

                <button type='submit'>حفظ</button>
            </form>
        </div>
    )
}

export default CreateItemPage