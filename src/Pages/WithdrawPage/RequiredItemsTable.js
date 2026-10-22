import Styles from './WithdrawPage.module.css'
function RequiredItemsTable({ items }) {
    return (
        <table>
            <thead>
                <tr>
                    <th className={Styles.itemName}>اسم الصنف</th>
                    <th className={Styles.itemQ}>الكمية</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => {
                    return (
                        item.isRequired && <Row item={item} key={item.id} />
                    )
                })}

            </tbody>
        </table>
    )
}

function Row({ item }) {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.requiredQuantity}</td>
        </tr>
    )
}

export default RequiredItemsTable