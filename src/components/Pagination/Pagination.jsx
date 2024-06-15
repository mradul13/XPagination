import {React, useState, useEffect} from 'react';
import styles from './Pagination.module.css';
import axios from 'axios'

const Pagination = ()=>{
    const [employeeData, setEmployeeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; 

    

    const onNextClick = ()=>{
        setCurrentPage((prev)=>Math.min(prev+1, Math.ceil(employeeData.length/rowsPerPage)))
    }

    const onPrevClick = ()=>{
        setCurrentPage((prev)=>Math.max(prev-1, 1))
    }

    useEffect(()=>{
        async function fetchData(){
            try{
            const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
            setEmployeeData(response.data);
            }
            catch(error){
                console.log(error)
                alert('failed to fetch data')
            }
        }
        fetchData();
    }, [])

    const endIndex = Math.min(currentPage*rowsPerPage, employeeData.length-1);

    const startIndex = Math.max(endIndex-rowsPerPage, rowsPerPage*(currentPage-1));

    const displayData = employeeData.slice(startIndex, endIndex);

    return (
        <div className={styles.wrapper}>
            <h1>Employee Data Table</h1>
            <table className={styles.table}>
                <thead className={styles.table_head}>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData.map((item)=>{
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className={styles.pagination_controls}>
                <button className={styles.btn} onClick={onPrevClick} disabled={currentPage===1}>Previous</button>
                <button className={`${styles.middle_btn}`}><span>{currentPage}</span></button>
                <button className={styles.btn} onClick={onNextClick} disabled={currentPage===Math.ceil(employeeData.length/rowsPerPage)}>Next</button>
            </div>
        </div>
    )

    
}

export default Pagination;