import { IModalProps } from '../../types'
import styles from './Modal.module.css'

export default function Modal({url, open}:IModalProps){
    return(
        <div className={styles.modal}>
            <div className={styles.wrapper}>
                <p onClick={()=>open(false)} className={styles.close}>Close</p>
                <img src={url} alt="fullImage"/>
            </div>
        </div>
    )
}