import '../posts.css';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import ReactFileReader from 'react-file-reader';
import  React,{ Component, Fragment } from 'react';
import '../navigation.css';
import TopNavigation from './topnavigation';
import ReactDOM from 'react-dom';
import {withCookies} from 'react-cookie';
class PostDetails extends Component{
  state={
    response:{'results':[]},
    token:this.props.cookies.get('cred1'),
   credentials:{}
  }

 

  componentDidMount(){
      fetch('https://patilcm.pythonanywhere.com'+'/posts/post/'+this.props.match.params.id,{
        method:'PUT',
        headers:{
          'Authorization':`Token ${this.state.token}`
        }
      })
      .then(resp => resp.json())
      .then(res => {this.setState({response:res});console.log(res)})
      .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));

  
  }

  inputChanged = event =>{
    let cred=this.state.credentials;
      cred[event.target.name]=event.target.value;
      this.setState({credentials:cred});
  }

  comment=(post_id,what_to_do)=>{

    

    if(what_to_do=='submit_comment'){
      fetch('https://patilcm.pythonanywhere.com'+'/posts/comment/'+post_id,{
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
      
    fetch("https://patilcm.pythonanywhere.com"+'/posts/comment/'+post_id,{
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
     
     <div><tr><td width="60em"><img src={'https://patilcm.pythonanywhere.com'+comment.profile.image+'&Token='+this.state.token} height="80em" width="100em"/><tr><td>Username:&nbsp;{comment.profile.user.username}</td></tr><tr><td>Name:&nbsp;{comment.profile.user.first_name}&nbsp;{comment.profile.user.last_name}</td></tr></td></tr>
     <tr><td>Comment:&nbsp;{comment.comment}</td></tr><hr></hr></div>
     )}
     </table>
      </form>
  </div>;
 
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
  
    
    })
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }
  

  
  }

  like = (id,no_of_likes)=>{
    if(this.state.token){
      fetch('https://patilcm.pythonanywhere.com'+'/posts/like/'+id,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${this.state.token}`
        }
      })
      .then(resp => resp.json())
      .then(res => {
        document.getElementById('like_likes_'+id).innerText=res.no_of_likes;
        if(res.post_liked_successfully) {
          document.getElementById('like_'+id).style['color']='red';
        }else{if(res.post_unliked_successfully){document.getElementById('like_'+id).style['color']='#e7a311';document.getElementById('like_likes_'+id).innerText=res.no_of_likes;}else{alert('Problem in liking/unliking,First Confirm Your Email Address')}}})
      .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
    }else{
      alert("Like Failed,User not logged in!");
    }
}



is_liked = (id) =>{
  if(this.state.token){
  const classn='';
  fetch("https://patilcm.pythonanywhere.com"+'/posts/like/'+id,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Token '+this.state.token
    }
  })
  .then(resp => resp.json())
  .then(res => {if(res.like=='exists'){document.getElementById('like_'+id).style['color']='red'};if(res.like=='doesnt_exist'){document.getElementById('like_'+id).style['color']='#e7a311';}})
  .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }
} 


  showLikes=(post_id)=>{

    if(this.state.token){
    fetch("https://patilcm.pythonanywhere.com"+'/posts/like/'+post_id,{
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
     <tr><td><img src={"https://patilcm.pythonanywhere.com"+like.profile.image+'&Token='+this.state.token} height="50em" width="50em"/></td><tr><td>Username:&nbsp;{like.profile.user.username}</td></tr><tr><td>Name:&nbsp;{like.profile.user.first_name}&nbsp;{like.profile.user.last_name}</td></tr></tr>
     )}
     </tbody>
     </table>
      </form>
  </div>;
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
  
    
    })
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
          
          { this.state.response.results.map(post => {
              return (
            
            <div className="card">
             
              <div align="center" className="post">
                <table className="table table-bordered">
                  {post.channel.title?
                <tr>
                  
              <td width="20%">{post.channel.image?<img src={"https://patilcm.pythonanywhere.com"+post.channel.image+'&Token='+this.state.token} height="80" width="80"/>:<p>No Channel Image Available</p>}</td><td><font size="3">Channel: {post.channel.title}</font><tr><td>User: {post.channel.user.username}</td></tr><tr><td>Name:&nbsp;{post.channel.user.first_name}&nbsp;{post.channel.user.last_name}</td></tr></td>
               </tr>:<p></p>
                  }
                
                </table>
                
              <table className="table table-bordered" border="10px">
              
                <tr>
              <th>{post.title}</th>
                </tr>

                <br/>
                <tr>
              <th>{post.description}</th>
                </tr>
                {post.main_content_text ? 
                <tr>
                <th>{'ll'}</th>
                </tr>
                :<p></p>
                }
               
                <tr>
                {post.main_content_image ? 
                <td><img src={'https://patilcm.pythonanywhere.com'+post.main_content_image+'&Token='+this.state.token} className="responsive"/></td>
              :<p></p>  
              }
                </tr>
                <tr>
                {post.main_content_gif ?
                <td><img src={'https://patilcm.pythonanywhere.com'+post.main_content_gif+'&Token='+this.state.token} className="responsive"/></td>
              :  <p></p> 
              }
                </tr>
                
                <tr>
                {post.main_content_video ?
                <td>
                <div className='player-wrapper'>
                <ReactPlayer  className='react-player'  controls muted url={'https://patilcm.pythonanywhere.com'+post.main_content_video+'&Token='+this.state.token} width="100%" />
               
               </div>
                </td>
                :  <p></p> 
                }
                </tr>
                <tr>
                {post.main_content_audio ?
                <td>
                <ReactAudioPlayer
                  style={{width:'100%'}}
                  src={'https://patilcm.pythonanywhere.com'+post.main_content_audio+'&Token='+this.state.token}
                  controls
                />
                </td>
                :  <p></p> 
              }
                </tr>
                {/** */}
                {post.main_content_text_link ? 
                <tr>
                <th>{'ll'}</th>
                </tr>
                :<p></p>
                }
               
                <tr>
                {post.main_content_image_link ? 
                <td><img src={post.main_content_image_link} className="responsive"/></td>
              :<p></p>  
              }
                </tr>
                <tr>
                {post.main_content_gif_link ?
                <td><img src={post.main_content_gif_link} className="responsive"/></td>
              :  <p></p> 
              }
                </tr>
                
                <tr>
                {post.main_content_video_link ?
                <td>
                <div classNameName='player-wrapper'>
                <ReactPlayer  classNameName='react-player'  controls muted url={post.main_content_video_link} width="100%"/>
               
               </div>
                </td>
                :  <p></p> 
                }
              
                </tr>
                <tr>
                
              
                </tr>
               
                <tr>
                {post.main_content_audio_link ?
                <td>
                <ReactAudioPlayer
                  style={{width:'100%'}}
                  src={post.main_content_audio_link}
                  controls
                />
                </td>
                :  <p></p> 
              }
                </tr>
                {/** */}
                
              </table>
              {this.is_liked(post.id)}
              <table className="table table-bordered" border="10px">
              <tr width="25">
                <td width="25"><a  href={"#myFormm"+post.id} onClick={() => this.showLikes(post.id)}><span id={'like_likes_'+post.id}>{post.no_of_likes} </span>Likes</a>,<span id={'comment_comments_'+post.id}>{post.no_of_comments} </span> Comments,{post.no_of_shares} Shares</td>
               </tr>
               <tr width="25">
                <td width="25"><a  href={"#myFormm"+post.id} onClick={() => this.showLikes(post.id)}>Show who liked</a>,<a  href={"#myFormm"+post.id} onClick={() => this.comment(post.id,'show_comments')}>Show Comments</a>,{post.no_of_shares}Show who Shared</td>
               </tr>
                </table>
                <div align="center">
                <table className="table table" style={{marginLeft:"8vw"}}>
              <tr width="25">
              
                  

                <td width="33.3%"><i id={'like_'+post.id} className='fa fa-thumbs-up'  onClick={()=>this.like(post.id,post.no_of_likes)}></i><span id={'liketext_'+post.id}></span></td><td width="33.3%"><i className="fa fa-comment" onClick={() => this.comment(post.id,'add_a_comment')}></i></td><td width="33.3%"><i className="fa fa-share"></i></td>
                
                
                </tr>

                
                </table>
                </div>
              </div>

             


                            
              
              {/** */}
              <div  classNameName="model-dialog1" id={"myFormm"+post.id} style={{backgroundColor:'#eee'}}>
              
                </div>
                
                {/** */}
            
            
                           
            </div>
            

            
            )})}          
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

export default withCookies(PostDetails);