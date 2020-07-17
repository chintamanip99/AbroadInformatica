import '../posts.css';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import ReactFileReader from 'react-file-reader';
import  React,{ Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {withCookies} from 'react-cookie';
import { Player } from 'video-react';

class Posts extends Component{
  state={
    response:{'results':[]},
    token:this.props.cookies.get('cred1'),
    credentials:{otp:''},
    

  }

   getUnique(arr, index) {

    const unique = arr
         .map(e => e[index])
  
         // store the keys of the unique objects
         .map((e, i, final) => final.indexOf(e) === i && i)
  
         // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);      
  
     return unique;
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

componentWillUnmount() {
  document.removeEventListener('scroll', this.trackScrolling);
}

isBottom(el) {
  return el.getBoundingClientRect().bottom < window.innerHeight;
}

trackScrolling = () => {
  let counter=0;
  const wrappedElement = document.getElementById('infinite');
  if (this.isBottom(wrappedElement)) {
    console.log(this.isBottom(wrappedElement));
    if(this.state.response.next){
      this.next();
      
    }
  }
};
  
  componentDidMount(){
    
    
    if(this.state.token){

    
    document.addEventListener('scroll', this.trackScrolling);
    
      fetch('https://patilcm.pythonanywhere.com'+'/posts/post/0',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Token '+this.state.token
        }
      })
      .then(resp => resp.json())
      .then(res => {
        if(res.empty_fields){
          alert(res.empty_fields);
          window.location.href="/0/0";
        }
        if(res.unverified){
          alert(res.unverified);
          document.getElementById('myForm1234').style.display='block';
          document.getElementById('otp_ip').style.display='none';
          document.getElementById('submit_otp34').style.display='none';
          document.getElementById('resend_otp_button').style.display='block';
        }
        if(res.count && res.results){
          this.setState({response:res});
        }
      })
      .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
    }else{
      alert('Login Needed!!');
      window.location.href="/";
    }
   
  }



  next = (event) =>{
    if(document.getElementById('endloader')){
      document.getElementById('endloader').style.display='block';
    }
    fetch(this.state.response.next,{
			method:'GET',
			headers:{
				'Authorization':'Token '+this.state.token
			}
    })
    .then(resp => resp.json())
    .then(res => {
      if(document.getElementById('endloader')){
        document.getElementById('endloader').style.display='none';
      };
      if(res.next!=this.state.response.next){
      this.setState(
      prevState=>({
      response:{results:this.getUnique([...prevState.response.results,...res.results],'id'),next:res.next}
      })
      );
      }else{
        console.log('Same Next Page');
      }
      
   })
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));

  }

  closeForm=(post_id)=>{
    document.getElementById('myFormm'+post_id).style.display='none';
  }

  showLikes=(post_id)=>{
    fetch('https://patilcm.pythonanywhere.com'+'/posts/like/'+post_id,{
			method:'PUT',
			headers:{
				'Authorization':'Token '+this.state.token
			}
    })
    .then(resp => resp.json())
    .then(res => {console.log(res);
      
      if(res.no_likes){

      const element=<div style={{display:'inline-block',backgroundColor:'#eee'}}>
        <button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
        <h1>{res.no_likes}</h1></div>;
      console.log(element);
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
      else{
      const element=<div style={{display:'inline-block',backgroundColor:'#eee'}}>
      <button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
      <form action="/action_page.php" className="form-container11">
     <table style={{display:'inline-block',backgroundColor:'#eee'}}>
     {res.map(like=>
     <tr><td><img src={'https://patilcm.pythonanywhere.com'+like.profile.image+'&Token='+this.state.token} height="50em" width="50em"/></td><tr><td>Username:&nbsp;{like.profile.user.username}</td></tr><tr><td>Name:&nbsp;{like.profile.user.first_name}&nbsp;{like.profile.user.last_name}</td></tr></tr>
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

  comment=(post_id,what_to_do)=>{
    

    if(what_to_do=='submit_comment'){
      console.log(what_to_do+"  "+document.getElementById("this_comment"+post_id).value);
      fetch("https://patilcm.pythonanywhere.com"+'/posts/comment/'+post_id,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Token '+this.state.token
        },
        body:JSON.stringify({
          'comment':document.getElementById("this_comment"+post_id).value,
        })

      })
      .then(resp => resp.json())
      .then(res => {if(res.comment){document.getElementById('comment_comments_'+post_id).innerText=res.no_of_comments;alert("Comment : "+res.comment+" is added")};if(res.invalid_input_data){alert('invalid input data');console.log(res.invalid_input_data);}})
      .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));

    }

    if(what_to_do=='add_a_comment'){
      
      const element=<div className="modal-dialog45" id="myForm" style={{display:'inline-block',backgroundColor:'#eee',width:"100%"}}>
<div className="container1">
<div className="row">
<button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
    </div>
  
  
  
    
    <div className="row">
      <div className="col-75">
        <input className="pass" type="text" id={"this_comment"+post_id} name={post_id} placeholder="Type Comment"  onChange={this.inputChanged}/>
      </div>
    </div>

    
    
  
   
    <div className="row">
      <button onClick={() => this.comment(post_id,'submit_comment')} className="buttonss">Add Comment</button>
    </div>
    
 
</div>
</div>;
ReactDOM.render(element, document.getElementById('myFormm'+post_id));
document.getElementById('myFormm'+post_id).style.display='block';
    }

    if(what_to_do=='show_comments'){
    fetch('https://patilcm.pythonanywhere.com'+'/posts/comment/'+post_id,{
			method:'GET',
			headers:{
				'Authorization':'Token '+this.state.token
			}
    })
    .then(resp => resp.json())
    .then(res => {console.log(res);
      
      if(res.no_comments){

      const element=<div style={{display:'inline-block',backgroundColor:'#eee'}}>
        <button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
        <h1>{res.no_comments}</h1></div>;
      console.log(element);
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
      else{
      const element=<div style={{display:'inline-block',backgroundColor:'#eee'}}>
      <button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
      <form action="/action_page.php" className="form-container11">
     <table style={{display:'inline-block',backgroundColor:'#eee'}}>
     {res.comments.map(comment=>
     <tr><td><img src={'https://patilcm.pythonanywhere.com'+comment.profile.image+'&Token='+this.state.token} height="50em" width="50em"/></td><tr><td>Username:&nbsp;{comment.profile.user.username}</td></tr><tr><td>Name:&nbsp;{comment.profile.user.first_name}&nbsp;{comment.profile.user.last_name}</td></tr><tr><td>Comment:&nbsp;{comment.comment}</td></tr></tr>
     )}
     </table>
      </form>
  </div>;
  console.log(element);
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
  
    
    })
    // .then(res => this.state.response.results= [...this.state.response.results,...res.results])
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
    
  }
  
  }

  showShares=(post_id)=>{
    fetch('https://patilcm.pythonanywhere.com'+'/posts/comment/'+post_id,{
			method:'GET',
			headers:{
				'Authorization':'Token '+this.state.token
			}
    })
    .then(resp => resp.json())
    .then(res => {console.log(res);
      
      if(res.no_comments){

      const element=<div style={{display:'inline-block',backgroundColor:'#eee'}}>
        <button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
        <h1>{res.no_comments}</h1></div>;
      console.log(element);
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
      else{
      const element=<div style={{display:'inline-block',backgroundColor:'#eee'}}>
      <button onClick={() => document.getElementById('myFormm'+post_id).style['display']='none'}>Close</button>
      <form action="/action_page.php" className="form-container11">
     <table style={{display:'inline-block',backgroundColor:'#eee'}}>
     {res.comments.map(comment=>
     <tr><td><img src={'https://patilcm.pythonanywhere.com'+comment.profile.image+'&Token='+this.state.token} height="50em" width="50em"/></td><tr><td>Username:&nbsp;{comment.profile.user.username}</td></tr><tr><td>Name:&nbsp;{comment.profile.user.first_name}&nbsp;{comment.profile.user.last_name}</td></tr><tr><td>Comment:&nbsp;{comment.comment}</td></tr></tr>
     )}
     </table>
      </form>
  </div>;
  console.log(element);
  ReactDOM.render(element, document.getElementById('myFormm'+post_id));
  document.getElementById('myFormm'+post_id).style.display='block';
      }
  
    
    })
    // .then(res => this.state.response.results= [...this.state.response.results,...res.results])
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
    

  
  }

  resend_otp =()=>{
    fetch('https://patilcm.pythonanywhere.com'+'/profiles/verify_otp/',{
      method:'GET',
      headers:{
        'Authorization':`Token ${this.props.cookies.get('token')}`
      },
    })
    .then(resp => resp.json())
    .then(res =>{
      if(res.otp_failed){alert(res.otp_failed)};
      if(res.otp_sent_successfully){
        alert(res.otp_sent_successfully);
        document.getElementById('myForm1234').style.display='block';
        document.getElementById('otp_ip5').style.display='block';document.getElementById('resend_otp').style.display='none';
      };
      if(res.email_already_verified){alert(res.email_already_verified)};
      if(res.otp_sent){
        alert(res.otp_sent);
        document.getElementById('myForm1234').style.display='block';
        document.getElementById('otp_ip').style.display='block';document.getElementById('resend_otp').style.display='none';
        
      };
      if(res.email_already_verified){alert(res.email_already_verified)};
      if(res.email_not_present){alert(res.email_not_present)}
    })
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }

  otp =()=>{
    fetch('https://patilcm.pythonanywhere.com'+'/profiles/verify_otp/',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Token ${this.props.cookies.get('token')}`
      },
      body:JSON.stringify({
        'otp':this.state.credentials.otp,
      })
    })
    .then(resp => resp.json())
    .then(res =>{if(res.otp_expired){alert(res.otp_expired);document.getElementById('otp_ip5').style.display='none';document.getElementById('resend_otp5').style.display='block';document.getElementById('submit_otp345').style.display='none';};
    if(res.email_verified){alert(res.email_verified);window.location.href="/posts"};
    if(res.worong_otp){alert(res.worong_otp)};
    if(res.email_already_verified){alert(res.email_already_verified)};
    if(res.otp_does_not_exist){alert(res.otp_does_not_exist)};
    if(res.profile_doesnt_exist){alert(res.profile_doesnt_exist)};
  })
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }

  is_liked = (id) =>{
    const classNamen='';
    fetch('https://patilcm.pythonanywhere.com'+'/posts/like/'+id,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Token ${this.state.token}`
      }
    })
    .then(resp => resp.json())
    .then(res => {if(res.like=='exists'){document.getElementById('like_'+id).style['color']='red'};if(res.like=='doesnt_exist'){document.getElementById('like_'+id).style['color']='#e7a311';}})
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }  
 
  previous = (event) =>{
    fetch(this.state.response.previous,{
			method:'GET',
			headers:{
				'Authorization':'Token '+this.state.token
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
            
            <div className="modal-dialog" id="myForm12345">
<div className="container1">
<div className="row">
      <button className="button1" onClick={this.closeotp}>Close</button>
    </div>
  
  
  <div className="row">
      <div className="col-75">
        <input className="pass" style={{display:'block'}} type="text" id="otp_ip5" name="otp" placeholder="Enter OTP(Sent on Your Email)" value={this.state.credentials.otp} onChange={this.inputChanged}/>
      </div>
    </div>
    
   
    
  
   
    <div className="row" style={{display:'none'}}>
      <button onClick={this.otp} id="submit_otp345" className="buttonss">Submit OTP</button>
    </div>
    <div className="row" id="resend_otp" style={{display:'block'}}>
      <button onClick={this.resend_otp5} className="buttonss">Resend OTP</button>
    </div>
    
 
</div>
</div>
           

          <div id="cmp" className="container">


            
          <div className="infinite" id="infinite">
          <h4 align="center">All Posts</h4>
       
              
        { this.state.response.results.map(post => {
              return (
            
            <div className="card">
             
              <div align="center" className="post">
                <table className="table table-bordered">
                  {post.channel.title?
                <tr>
              <td width="20%">{post.channel.image?<img src={post.channel.image+'&Token='+this.state.token} height="80" width="80"/>:<p>No Channel Image Available</p>}</td><td><font size="3">Channel: {post.channel.title}</font><tr><td>User: {post.channel.user.username}</td></tr><tr><td>Name:&nbsp;{post.channel.user.first_name}&nbsp;{post.channel.user.last_name}</td></tr></td>
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
                <td><img src={post.main_content_image+'&Token='+this.state.token} className="responsive"/></td>
              :<p></p>  
              }
                </tr>
                <tr>
                {post.main_content_gif ?
                <td><img src={post.main_content_gif+'&Token='+this.state.token} className="responsive"/></td>
              :  <p></p> 
              }
                </tr>
                
                <tr>
                {post.main_content_video ?
                <td>
                <div className='player-wrapper'>
                <ReactPlayer  className='react-player'  controls muted url={post.main_content_video+'&Token='+this.state.token} width="100%" />
               
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
                  src={post.main_content_audio+'&Token='+this.state.token}
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
                <td width="25"><a  href={"#myFormm"+post.id} onClick={() => this.showLikes(post.id)}>Show who liked</a>,<a  href={"#myFormm"+post.id} onClick={() => this.comment(post.id,'show_comments')}>Show Comments</a>,{post.no_of_shares} Shares</td>
               </tr>
                </table>
                <div align="center">
                <table className="table table" style={{marginLeft:"8vw"}}>
              <tr >
              
                  

                <td ><i id={'like_'+post.id} className='fa fa-thumbs-up'  onClick={()=>this.like(post.id,post.no_of_likes)}></i><span id={'liketext_'+post.id}></span></td><td ><i className="fa fa-comment" onClick={() => this.comment(post.id,'add_a_comment')}></i></td><td ><i className="fa fa-share"></i></td>
                
                
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
            
            <table>

            <tr>{this.state.response.previous ?<td><button onClick={this.previous}>Previous Page</button></td>:<p></p>}{this.state.response.next ?<td><button onClick={this.next}>Next Page</button></td>:<p></p>}</tr>
              </table>
              <div id="endloader" align="center" className="loader" style={{display:'none',height:'10vw',width:'10vw'}}>
                </div>  
                {/* <img id="endloader" style={{display:'none',height:'10vw',width:'10vw'}} src="httpss://www.google.com/url?sa=i&url=httpss%3A%2F%2Fwpamelia.com%2Floading-animation%2F&psig=AOvVaw032Zd-VVUlMvMMTrOkjUe-&ust=1594209215247000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJiNiKOKu-oCFQAAAAAdAAAAABAD"/>
                <br/><br/><br/><br/> */}
                <br/><br/><br/><br/>
               

            </div>
            
        
       
       </div> 
       </Fragment>
       )
    }
}

export default withCookies(Posts);