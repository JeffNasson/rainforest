import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from '../Header/Header.js';
import Searchbar from '../Searchbar/Searchbar.js';
import SubHeader from '../SubHeader/SubHeader.js';

class Departments extends Component{
    constructor(props){
        super(props)
        this.state={
            departments:[],
            departmentDisplay:[]
        }
        this.displayDepartment=this.displayDepartment.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/departments`) 
             .then(res=>{
                 this.setState({departments:res.data})
             })
    }

    displayDepartment(departmentId){
        axios.get(`/api/departments/${departmentId}`)
             .then(res=>{
                 this.setState({departmentDisplay:res.data})
                 console.log(this.state.departmentDisplay)
             })
    }

    render(){
        let departmentsToDisplay = this.state.departments.map((departments,i)=>{
            console.log(departments)
            return(
                <Link to={`/departments/${departments.department_name}`} key={i}>
                <div className='departments-to-display' key={i}>
                    <button onClick={()=>this.displayDepartment(departments.id)}>{departments.department_name}</button>
                </div>
                </Link>
            )
        })

        let displayOneDepartment = this.state.departmentDisplay.map((items,item)=>{
            console.log(items)
            return(
                <Link to={`/item/${items.id}`} key={item} style={{textDecoration:'none'}}>
                    <div className='searchpage-item'>
                        <img src={items.image} />
                        <h2>{items.description}</h2>
                        <h4>${items.price}</h4>
                    </div>
                </Link>
            )
        })

        return(
            <div className='departments-parent'>
                <Header />
                <Searchbar />
                <SubHeader />
                <div className='auth-h1-hr'>
                    <h1>Departments</h1>
                    <hr />
                </div>
                {departmentsToDisplay}
                {displayOneDepartment}
            </div>
        )
    }
}

export default Departments