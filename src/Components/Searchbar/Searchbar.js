import React,{Component} from 'react'

import Magnify from '../../styles/magnifying-glass.svg'

class Searchbar extends Component{
    constructor(props){
        super(props);
        this.state={
            searchText:'',
        }
    }

    render(){
        return(
            <div className='searchbar-parent'>
                <div className='searchbar-input-button'>
                    <input className='searchbar-input' type='text' placeholder='Search' />
                    <img src={Magnify} />
                </div>
            </div>
        )
    }
}

export default Searchbar