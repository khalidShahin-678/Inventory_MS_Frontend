import Styles from './WithdrawPage.module.css'

function ItemsTable({ items, handleSetItems }) {
    return (
        <table>
            <thead>
                <tr>
                    <th className={Styles.itemName}>الصنف</th>
                    <th className={Styles.itemQ}>الكمية</th>
                    <th>المطلوب</th>
                    <th>النوع</th>
                </tr>
            </thead>
            <tbody>
                {(Boolean(items.length) &&
                    items.map((item) => {
                        return (
                            <Row key={item.id} item={item} handleSetItems={handleSetItems} />
                        )
                    })) ||
                    <tr><td colSpan={4} style={{ fontSize: "16px", fontWeight: "700" }}>لا يوجد اصناف</td></tr>
                }
            </tbody>
        </table>
    )
}


function Row({ item, handleSetItems }) {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>
                <input className={Styles.inputQ} type='number' placeholder='0' min={0} max={item.quantity} value={item.requiredQuantity} onChange={(e) => handleSetItems(item.id, e.target.value)} />
            </td>
            <td>{item.category}</td>
        </tr>
    )
}

export default ItemsTable