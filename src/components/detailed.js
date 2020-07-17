import '../posts.css';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import ReactFileReader from 'react-file-reader';
import  React,{ Component, Fragment } from 'react';
import '../navigation.css';
import TopNavigation from './topnavigation';
import ReactDOM from 'react-dom';
import {withCookies} from 'react-cookie';
class Detailed extends Component{
  state={
    response:{'results':[]},
    token:this.props.cookies.get('cred1')?this.props.cookies.get('cred1'):'d814c5fbcc4ad9441d392088fd81c12e225a82d9',
    credentials:{
      name:'',comment:''
    }
  }

 

  componentDidMount(){
  
  
  
  
  if(this.props.match.params.type>0){
    
    var type,id;
    if(this.props.match.params.type){
        type=this.props.match.params.type;
    }else{
      type=0;
    }
    if(this.props.match.params.type){
      type=this.props.match.params.id;
    }else{
      id=0;
    }

    fetch('https://patilcm.pythonanywhere.com'+'/content/detailed_content/'+this.props.match.params.type+"/"+this.props.match.params.id,{
			method:'GET',
			headers:{
			}
    })
    .then(resp => resp.json())
    .then(res => this.setState({response:res}))
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  
  }
  
  }

  inputChanged = event =>{
    let cred=this.state.credentials;
      cred[event.target.name]=event.target.value;
      this.setState({credentials:cred});
  }

  comment=(post_id,what_to_do)=>{

    

    if(what_to_do=='submit_comment'){
      fetch('https://patilcm.pythonanywhere.com'+'/content/comment/'+post_id,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${this.state.token}`
        },
        body:JSON.stringify({
          'comment':document.getElementById("lname"+post_id).value,
        })

      })
      .then(resp => resp.json())
      .then(res => {if(res.comment){document.getElementById('comment_comments_'+post_id).innerText=res.no_of_comments;alert("Comment : "+res.comment+" is added")};if(res.invalid_input_data){alert('invalid input data');console.log(res.invalid_input_data);}})
      .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));

    }

    if(what_to_do=='add_a_comment'){
      
      
      const element=<div class="modal-dialog45" id="myForm" style={{display:'inline-block',backgroundColor:'#eee',width:"100%"}}>
<div class="container1">
<div class="row">
<button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
    </div>
  
  
  
    
    <div class="row">
      <div class="col-75">
        <input class="pass" type="text" id={"lname"+post_id} name={post_id} placeholder="Type Comment"  onChange={this.inputChanged}/>
      </div>
    </div>

    
    
  
   
    <div class="row">
      <button onClick={() => this.comment(post_id,'submit_comment')} class="buttonss">Add Comment</button>
    </div>
    
 
</div>
</div>;
ReactDOM.render(element, document.getElementById('myFormm'+post_id));
document.getElementById('myFormm'+post_id).style.display='block';
     
    }
    if(what_to_do=='show_comments'){
      
    fetch("https://patilcm.pythonanywhere.com"+'/content/comment/'+post_id,{
			method:'GET',
			headers:{
				'Authorization':'Token '+this.state.token
			}
    })
    .then(resp => resp.json())
    .then(res => {
      
      if(res.no_comments){

      const element=<div style={{display:'inline-block',backgroundColor:'orange'}} className="card">
        <button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
        <h1>{res.no_comments}</h1></div>;
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
      else{
      const element=<div style={{width:"100%",display:'inline-block',backgroundColor:'orange'}}>
      <button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
      <form action="/action_page.php" class="form-container11">
     <table style={{display:'inline-block',backgroundColor:'#eee'}}>
     {res.comments.map(comment=>
     <div><tr><td width="60em"><img src={comment.profile.image+'&Token='+this.state.token} height="80em" width="100em"/></td><tr><td>Username:&nbsp;{comment.profile.user.username}</td></tr><tr><td>Name:&nbsp;{comment.profile.user.first_name}&nbsp;{comment.profile.user.last_name}</td></tr></tr>
     <tr><td>Comment:&nbsp;{comment.comment}</td></tr><hr></hr></div>
     )}
     </table>
      </form>
  </div>;
 
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
  
    
    })
    // .then(res => this.state.response.results= [...this.state.response.results,...res.results])
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }
  

  
  }

  like = (id,no_of_likes)=>{
    
      fetch("https://patilcm.pythonanywhere.com"+'/content/like/'+id,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${this.state.token}`
        }
      })
      .then(resp => resp.json())
      .then(res => {console.log(res);document.getElementById('like_likes_'+id).innerText=res.no_of_likes;if(res.record_liked_successfully) {document.getElementById('like_'+id).style['color']='red';}else{if(res.record_unliked_successfully){document.getElementById('like_'+id).style['color']='#e7a311';document.getElementById('like_likes_'+id).innerText=res.no_of_likes;}else{alert('Problem in liking/unliking')}}})
      .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
    
}



is_liked = (id) =>{
  if(this.state.token){
  const classn='';
  fetch("https://patilcm.pythonanywhere.com"+'/content/like/'+id,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Token '+this.state.token
    }
  })
  .then(resp => resp.json())
  .then(res => {if(res.like=='exists' && this.state.token!='d814c5fbcc4ad9441d392088fd81c12e225a82d9'){document.getElementById('like_'+id).style['color']='red'};if(res.like=='doesnt_exist'){document.getElementById('like_'+id).style['color']='#e7a311';}})
  .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }
} 


  showLikes=(post_id)=>{

    if(this.state.token){
    fetch("https://patilcm.pythonanywhere.com"+'/content/like/'+post_id,{
			method:'PUT',
			headers:{
				'Authorization':'Token '+this.state.token
			}
    })
    .then(resp => resp.json())
    .then(res => {
      
      if(res.no_likes){

      const element=<div style={{display:'inline-block',backgroundColor:'#eee'}}>
        <button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
        <h1>{res.no_likes}</h1></div>;
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
      else{
      const element=<div style={{display:'inline-block',backgroundColor:'#eee'}}>
      <button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
      <form action="/action_page.php" class="form-container11">
     <table style={{display:'inline-block',backgroundColor:'#eee'}}>
       <tbody>
     {res.map(like=>
     <tr><td><img src={like.profile.image+'&Token='+this.state.token} height="50em" width="50em"/></td><tr><td>Username:&nbsp;{like.profile.user.username}</td></tr><tr><td>Name:&nbsp;{like.profile.user.first_name}&nbsp;{like.profile.user.last_name}</td></tr></tr>
     )}
     </tbody>
     </table>
      </form>
  </div>;
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
  
    
    })
    // .then(res => this.state.response.results= [...this.state.response.results,...res.results])
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }
  else{
    alert("Login is necessary to see likes");
  }

  
  }



    render(){
        return(
          <Fragment>
           
          <div id="cmp" class="container">
         
            
          <div className="infinite" onScroll={this.handleScroll} id="infinite">
        
              
        {this.state.response.results.map(post => {
              return (
            
            <div class="card">
              <div align="center" class="post">
                
              
              <table class="table table-bordered" border="10px">
              <tr>
                {post.category2 ? 
                <td><h4>Category :<a href={"/1/"+post.category2.category1.id}>{post.category2.category1.image?<img src={'https://patilcm.pythonanywhere.com'+post.category2.category1.image+'&Token='+this.state.token} height="80" width="80"/>:''}{post.category2.category1.title} <i class="arrow right"></i></a><a href={"/2/"+post.category2.id}>{post.category2.image?<img src={'https://patilcm.pythonanywhere.com'+post.category2.image+'&Token='+this.state.token} height="80" width="80"/>:''} {post.category2.title} <i class="arrow right"></i></a></h4></td>
              :<p></p>  
              }
                </tr>
                <tr>
                {post.category1 ? 
                <td><h4>Category :<a href={"/1/"+post.category1.id}>{post.category1.image?<img src={'https://patilcm.pythonanywhere.com'+post.category1.image+'&Token='+this.state.token} height="80" width="80"/>:''}{post.category1.title} <i class="arrow right"></i> </a></h4></td>
              :<p></p>  
              }
                </tr>
                <tr>
              <th>{post.title}</th>
                </tr>
                <tr>
              <th>{post.description}</th>
                </tr>
                {post.text_content ? 
                <tr>
                <th>{'ll'}</th>
                </tr>
                :<p></p>
                }
               
                <tr>
                {post.image ? 
                <td><img src={"https://patilcm.pythonanywhere.com"+post.image+'&Token='+this.state.token} class="responsive"/></td>
              :<p></p>  
              }
                </tr>
               
                
                <tr>
                {post.video ?
                <td>
                <div className='player-wrapper'>
                <ReactPlayer  className='react-player' controls muted url={"https://patilcm.pythonanywhere.com"+post.video+'&Token='+this.state.token} width="100%" height='100%'/>
               
               </div>
                </td>
                :  <p></p> 
                }
                </tr>
                <tr>
                {post.audio ?
                <td>
                <ReactAudioPlayer
                  style={{width:'100%'}}
                  src={"https://patilcm.pythonanywhere.com"+post.audio+'&Token='+this.state.token}
                  controls
                />
                </td>
                :  <p></p> 
              }
                </tr>

                {post.text_link ? 
                <tr>
                <th>{'ll'}</th>
                </tr>
                :<p></p>
                }
               
                <tr>
                {post.image_link ? 
                <td><img src={post.image_link} className="responsive"/></td>
              :<p></p>  
              }
                </tr>
                <tr>
                {post.gif_link ?
                <td><img src={post.gif_link} className="responsive"/></td>
              :  <p></p> 
              }
                </tr>
                
                <tr>
                {post.video_link ?
                <td>
                <div classNameName='player-wrapper'>
                <ReactPlayer  classNameName='react-player'  controls muted url={post.video_link} width="100%"/>
               
               </div>
                </td>
                :  <p></p> 
                }
                </tr>
                
              </table>
              
              {this.is_liked(post.id)}
              {(this.props.match.params.type!=1 && this.props.match.params.type!=2)?
              <table class="table table-bordered" border="10px">
              <tr width="25">
                <td width="25"><a  href={"#myFormm"+post.id} onClick={() => this.showLikes(post.id)}><span id={'like_likes_'+post.id}>{post.no_of_likes} </span>Likes</a>, <a  href={"#myFormm"+post.id} onClick={() => this.comment(post.id,'show_comments')}><span id={'comment_comments_'+post.id}>{post.no_of_comments} </span> Comments</a>,{post.no_of_shares} Shares</td>
               </tr>
               <tr width="25">
                <td width="25"><a  href={"#myFormm"+post.id} onClick={() => this.showLikes(post.id)}><span id={'like_likes_'+post.id}> </span>Show who Liked</a>,<a  href={"#myFormm"+post.id} onClick={() => this.comment(post.id,'show_comments')}>Show Comments</a>,Show who Shared</td>
               </tr>
                </table>:''}
                <table class="table table" style={{marginLeft:"8vw"}}>
                  {(this.props.match.params.type!=1 && this.props.match.params.type!=2)?
              <tr width="25">
              <td width="33.3%"><i id={'like_'+post.id} className='fa fa-thumbs-up'  onClick={this.state.token!='d814c5fbcc4ad9441d392088fd81c12e225a82d9'?()=>this.like(post.id,post.no_of_likes):()=>alert('Login Needed')}></i><span id={'liketext_'+post.id}></span></td><td width="33.3%"><i  class="fa fa-comment" onClick={this.state.token!='d814c5fbcc4ad9441d392088fd81c12e225a82d9'?() => this.comment(post.id,'add_a_comment'):()=>alert('Login Needed')}></i></td><td width="33.3%"><i class="fa fa-share"></i></td>
              </tr>:''
                  }
                </table>
              </div>

              <div  className="model-dialog1" id={"myFormm"+post.id} style={{backgroundColor:'#eee'}}>
              
                </div>


                            
           
            
            
            
                           
            </div>

            
            )})}
            
            <table>

            <tr>{this.state.response.previous ?<td><button onClick={this.previous}>Previous Page</button></td>:<p></p>}{this.state.response.next ?<td><button onClick={this.next}>Next Page</button></td>:<p></p>}</tr>
              </table>
              <br/><br/><br/><br/>
              <br/><br/><br/><br/>
              <br/><br/><br/><br/>
              <br/><br/><br/><br/>
              <br/><br/><br/><br/>
              <br/><br/><br/><br/>
              
            </div>
            
        
       
       </div> 
       </Fragment>
       )
    }
}

export default withCookies(Detailed);