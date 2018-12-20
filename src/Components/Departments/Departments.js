import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
            // console.log(departments)
            return(
                <div className='departments-to-display' key={i}>
                    <button onClick={()=>this.displayDepartment(departments.id)}>{departments.department_name}</button>
                </div>
            )
        })

        let displayOneDepartment = this.state.departmentDisplay.map((items,item)=>{
            console.log(items)
            return(
                <Link to={`/item/${items.id}`} key={item}>
                    <div className='departments-items'>
                        {items.description}
                        {items.price}
                        <img src={items.image} />
                    </div>
                </Link>
            )
        })

        return(
            <div className='departments-parent'>
                Departments
                {departmentsToDisplay}
                {displayOneDepartment}
            </div>
        )
    }
}

export default Departments