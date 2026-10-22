import React, { useEffect, useState } from 'react'
import Styles from './CreateItemPage.module.css';
import axios from 'axios';

function CreateItemPage() {

    const [arName, setArName] = useState("");
    const [enName, setEnName] = useState("");
    const [barcode, setBarcode] = useState("");
    const [category, setCategory] = useState("GENERAL");
    const [iQuantity, setIQuantity] = useState(0);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [created, setCreated] = useState(false);


    // set animation
    useEffect(() => {
        setTimeout(() => {
            setCreated(false);
        }, 2000);
    }, [created]);

    const handleCreateItem = async (formData) => {
        // Get Data from Form
        const data = Object.fromEntries(formData);

        // Clear Data
        const arName = data['arName'].trim().toLowerCase();
        const enName = data['enName'].trim().toLowerCase();
        const barcode = data['barcode'].trim().toLowerCase();
        const category = data['category'];
        const initialQuantity = Number(data['initialQuantity']);
        // Set loading
        setLoading(true);
        // Set errors
        setErrors([]);
        // Send the request
        try {
            const url = `http://localhost:8080/items`;
            const response = await axios.post(url, {
                arName: String(arName),
                enName: String(enName),
                code: String(barcode),
                category: category,
                initialQuantity: Number(initialQuantity)
            });

            setCreated(true);
            setArName("");
            setEnName("");
            setBarcode("");
            setIQuantity(0);
            setCategory("GENERAL");

        } catch (error) {
            if (error.response) {
                if (error.response.status === 409) {
                    // arName is duplicated
                    if (error.response.data.message.toLowerCase().includes('arabic name')) {
                        setErrors((prev) => [...prev, "arName"]);
                    }
                    // enName is duplicated
                    else if (error.response.data.message.toLowerCase().includes('english name')) {
                        setErrors((prev) => [...prev, "enName"]);
                    }
                    // barcode is duplicated
                    else if (error.response.data.message.toLowerCase().includes('code')) {
                        setErrors((prev) => [...prev, "barcode"]);
                    }
                }

                console.log(errors);
            }
            else {
                alert("مشكلة في السيرفر")
            }
        }
        finally {
            setLoading(false);
        }

    }


    return (
        <div className={Styles.formWrapper} >
            <form action={handleCreateItem} >
                <div className={Styles.title}><p>اضافة صنف جديد</p></div>
                <div className={Styles.inputWrapper}>
                    <label htmlFor="arName">الاسم بالعربي</label>
                    {Boolean(errors.includes('arName')) && <span style={{ color: "red", fontSize: "14px", marginRight: "4px", fontWeight: "500", width: "200px" }}>الاسم مستخدم بالفعل </span>}
                    <input type='text' minLength={6} maxLength={255} name='arName' id='arName' required value={arName} onChange={(e) => { setArName(e.target.value) }} />
                </div>

                <div className={Styles.inputWrapper}>
                    <label htmlFor="enName">الاسم بالانجليزي</label>
                    {Boolean(errors.includes('enName')) && <span style={{ color: "red", fontSize: "14px", marginRight: "4px", fontWeight: "500", width: "200px" }}>الاسم مستخدم بالفعل </span>}
                    <input type='text' minLength={6} maxLength={255} name='enName' id='enName' required value={enName} onChange={(e) => { setEnName(e.target.value) }} />
                </div>

                <div className={Styles.inputWrapper}>
                    <label htmlFor="barcode">الباركود</label>
                    {Boolean(errors.includes('barcode')) && <span style={{ color: "red", fontSize: "14px", marginRight: "4px", fontWeight: "500", width: "200px" }}>الباركود مستخدم بالفعل </span>}
                    <input type='text' minLength={4} maxLength={255} name='barcode' id='barcode' value={barcode} onChange={(e) => { setBarcode(e.target.value) }} />
                </div>

                <div className={Styles.inputWrapper}>
                    <label htmlFor="category">نوع الصنف</label>
                    <select name='category' id='category' required value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        <option value={"GENERAL"}>عام</option>
                        <option value={"TAB"}>اقراص</option>
                        <option value={"SYRUP"}>شراب</option>
                        <option value={"DROP"}>نقط</option>
                        <option value={"CREAM"}>كريمات</option>
                        <option value={"VIAL"}>حقن</option>
                        <option value={"SUPP"}>لبوس</option>
                    </select>
                </div>

                <div className={Styles.inputWrapper}>
                    <label htmlFor="initialQuantity">كمية ابتدائية</label>
                    <input type='number' min={0} max={1000} name='initialQuantity' id='initialQuantity' placeholder='0' value={iQuantity} onChange={(e) => { setIQuantity(e.target.value) }} />
                </div>

                <button disabled={loading} type='submit' className={created ? Styles.success : ''}>{(loading && "جار الحفظ . . . ") || "حفظ"}</button>
            </form>
        </div>
    )
}

export default CreateItemPage