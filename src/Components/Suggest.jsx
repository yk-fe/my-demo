import React from 'react';
import jsonp from 'jsonp'
class Suggest extends React.Component {
    constructor(){
        super()
        this.state={
            wordsList:[],
            index:-1
        }
    }
    handleChange=(event)=>{
        let word = event.target.value;
        this.word = word;
        this.setState({
            index:-1
        })
        jsonp(
            `http://www.baidu.com/su?wd=${word}`,{param:'cb'},(error,data)=>{
                console.log(error,data)
            this.setState({
                wordsList:data.s
            })
        }
        )
    }
    handleKeyDown=(e)=>{
        console.log(e.keyCode)
        if(e.keyCode ==38 || e.keyCode==40 ){
            let index = this.state.index;
            if(e.keyCode == 38){
                index--;
                if(index == -2){
                    index=this.state.wordsList.length-1
                }
            }
            if(e.keyCode == 40){
                index++
                if(index==this.state.wordsList.length){
                    index = -1
                }
            }
            this.setState(
                {
                    index
                }
            )
        }
    }
    handleUp=(e)=>{
        if(e.keyCode == 13){
            window.location.href='http://www.baidu.com/s?wd='+e.target.value
        }
    }
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <input type="text" onKeyUp={this.handleUp} value={this.state.index == -1?this.word:this.state.wordsList[this.state.index]} onKeyDown={this.handleKeyDown} className="form-control" onChange={this.handleChange} />
                </div>
                <div className="panel-body">
                <ul className="list-group">
                    {
                        this.state.wordsList.map((ele,index)=>{
                            return <li className={"list-group-item "+(this.state.index==index?'active':'')} key={index}>{ele}</li>
                        })
                    }
                </ul>
                </div>
            </div>
        )
    }
}
export default Suggest