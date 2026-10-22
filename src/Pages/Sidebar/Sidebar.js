//  Icons
import BoxesIcon from './assets/boxes.svg';
import withdrawPageIcon from './assets/box.svg';
import withdrawnPageIcon from './assets/transaction.svg';
import addItemPageIcon from './assets/add-icon.svg';
import createItemPageIcon from './assets/tag-icon.svg';
// Style

import styles from './Sidebar.module.css';

function Sidebar({ activeTab, onTabChange }) {

    const navbarList = [
        {
            id: "withdrawPage",
            imgSrc: withdrawPageIcon,
            title: "سحب أصناف"
        },
        {
            id: "withdrawnPage",
            imgSrc: withdrawnPageIcon,
            title: "الأصناف المسحوبة"
        },
        {
            id: "addItemsPage",
            imgSrc: addItemPageIcon,
            title: "إضافة أصناف للمخزن"
        },
        {
            id: "createItemPage",
            imgSrc: createItemPageIcon,
            title: "إنشاء صنف"
        },

    ]
    return (
        <div className={styles.navbar}>
            <div className={styles.title}>
                <img src={BoxesIcon} alt='title-icon' />
                <h2>المخزن</h2>
            </div>

            <ul>
                {
                    navbarList.map((navbarTab) => {

                        const isActive = navbarTab.id === activeTab;

                        return (
                            <li onClick={() => onTabChange(navbarTab.id)} key={navbarTab.id} className={isActive ? styles.active : ''}>
                                <img src={navbarTab.imgSrc} alt={String(navbarTab.id + 'Icon')} />
                                <p>{navbarTab.title}</p>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default Sidebar;