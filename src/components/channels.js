import '../posts.css';
import  React,{ Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {withCookies} from 'react-cookie';
class Channels extends Component{
  state={
    response:{'results':[]},
    token:this.props.cookies.get('cred1'),
  }

  componentDidMount(){

    fetch('https://patilcm.pythonanywhere.com'+'/posts/channel/0',{
			method:'GET',
			headers:{
                'Authorization':`Token ${this.state.token}`
			}
    })
    .then(resp => resp.json())
    .then(res => this.setState({response:res}))
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }



  next = (event) =>{
    
    fetch(this.state.response.next,{
			method:'GET',
			headers:{
                'Authorization':`Token ${this.state.token}`
			}
    })
    .then(resp => resp.json())
    .then(res => this.setState({response:res}))
    // .then(res => this.state.response.results= [...this.state.response.results,...res.results])
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
    window.scrollTo(0, 0);
  }
 
  previous = (event) =>{
    fetch(this.state.response.previous,{
			method:'GET',
			headers:{
                'Authorization':`Token ${this.state.token}`
			}
    })
    .then(resp => resp.json())
    .then(res => this.setState({response:res}))
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
    window.scrollTo(0, 0);
  }
    render(){
        return(
          <Fragment>
              <h4 align="center">All Channels</h4>
            
          <div id="cmp" class="container">
         
            
          <div className="infinite"  id="infinite">
          <table>

<tr>{this.state.response.previous ?<td><button onClick={this.previous}>Previous Page</button></td>:<p></p>}{this.state.response.next ?<td><button onClick={this.next}>Next Page</button></td>:<p></p>}</tr>
  </table>
              
        {this.state.response.results.map(post => {
              return (
            
            <div class="card">
              <div align="center" class="post">
                
                
              <table class="table table-bordered" border="10px">
              {post.title?
                <tr>
              <td width="20%">{post.image?<img height="80" width="80" src={post.image+'&Token='+this.state.token}/>:<p>No channel image available</p>} </td><td><font size="3">Channel: {post.title}</font><tr><td>User: {post.user.username}</td></tr><tr><td>Name:&nbsp;{post.user.first_name}&nbsp;{post.user.last_name}</td></tr></td>
               </tr>:<p></p>
                  }
                  </table>
                  <div align="left">
                  <table>
                <tr>
              <th>Description:&nbsp;{post.description}</th>
                </tr>
              </table>
              </div>
             
              </div> 
              <br/>
              </div>
             
              )})}
            
            <table>

            <tr>{this.state.response.previous ?<td><button onClick={this.previous}>Previous Page</button></td>:<p></p>}{this.state.response.next ?<td><button onClick={this.next}>Next Page</button></td>:<p></p>}</tr>
            </table>
                <br/><br/><br/><br/>
              
            </div>
            
        
       
       </div> 
       </Fragment>
       )
    }
}

export default withCookies(Channels);