import  React,{ Component } from 'react';
import '../navigation.css';
import './maincontent' ;
import MainContent from './maincontent';
import Posts from './posts';
import {withCookies} from 'react-cookie';
import ReactDOM from 'react-dom';

class FetchRecords extends Component{
  state={
    response:{
  'Records':[]
  }
  }

  componentDidMount(){
    fetch('https://patilcm.pythonanywhere.com/content/full_content/'+this.props.type+'/'+this.props.cat_id,{
			method:'GET',
			headers:{
			}
    })
    .then(resp => resp.json())
    .then(res => {this.setState({response:res});})
    // .then(res => this.state.response.results= [...this.state.response.results,...res.results])
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }

 
  render(){
    return(
      <ul className="dropdown">
        {this.state.response.Records.map(record=>
          <li classNameName="subs"><a href={"/3/"+record.id}>{record.title}</a></li>
          )}
      </ul>
    )
  }
}

class FetchSubMenu extends Component{
  state={
    response:{'Category2':[],
  'Records':[]
  }
  }

  componentDidMount(){
    fetch('https://patilcm.pythonanywhere.com/content/full_content/'+this.props.type+'/'+this.props.cat_id,{
			method:'GET',
			headers:{
			}
    })
    .then(resp => resp.json())
    .then(res => {this.setState({response:res});})
    // .then(res => this.state.response.results= [...this.state.response.results,...res.results])
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
  }

 
  render(){
    return(
      <ul className="dropdown">
        {this.state.response.Category2.map(category2=>
          <li classNameName="subs"><a>{category2.title}<i className="arrow right"></i></a>
            {<FetchRecords type={2} cat_id={category2.id}/>}
         </li>
          )}
        {this.state.response.Records.map(record=>
          <li classNameName="subs"><a href={"/3/"+record.id}>{record.title}</a></li>
          )}
      </ul>
    )
  }
}
  

class TopNavigation extends Component{

  state={
    q:'',
    token:this.props.cookies.get('cred1'),
    credentials:{
      username:'',
      password:'',
      password2:'',
      email:'',
      age:'',
      otp:'',
      first_name:'',
      last_name:'',
      image:'',
      date_joined:'',
      phone_number:'',
      is_email_verified:'',
      is_phone_number_verified:''
    },
    post:{
      title:'',
      description:'',
      main_content_text_link:'',
      main_content_audio_link:'',
      main_content_image_link:'',
      main_content_gif_link:'',
      main_content_video_link:''
    },
    channel:{
        title:'',
        description:'',
        is_granted:null,
        image:null,
        channel_created_date_time:'No Date-Time'
    },
    channels:[],
    Category1:[],
    Records:[]
  }



    inputChanged = event =>{
      let cred=this.state.credentials;
      cred[event.target.name]=event.target.value;
      this.setState({credentials:cred});
    }

    channelinputChanged = event =>{
      let cred=this.state.channel;
      cred[event.target.name]=event.target.value;
      this.setState({channel:cred});
    }

    login = event =>{
      document.getElementById("loader2").style.display='block';
      fetch('https://patilcm.pythonanywhere.com'+'/profiles/login_user/',{
			method:'POST',
			headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        'username':this.state.credentials.username,
        'password':this.state.credentials.password
      })
    })
    .then(resp => resp.json())
    .then(res => {document.getElementById("loader2").style.display='none';
    if(res.token){this.props.cookies.set('cred1',res.token);window.location.href="/"};
    if(res.non_field_errors){alert(res.non_field_errors);window.location.href="/"};})
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
    }

    signup = (what_to_do) =>{
      if(what_to_do=='update_profile'){
        if(document.getElementById("update_profile_loader")){
          document.getElementById("update_profile_loader").style.display='block';
        }
      
      var input=document.getElementById('updated_profile_image');
      var data = new FormData()
      if(input.files[0]){
data.append('image', input.files[0]);
      }
      if(this.state.credentials.email){
        data.append('email', this.state.credentials.email);
        }
if(this.state.credentials.phone_number){
data.append('phone_number', this.state.credentials.phone_number);
}
if(this.state.credentials.last_name){
data.append('last_name', this.state.credentials.last_name);
}
if(this.state.credentials.first_name){
  data.append('first_name', this.state.credentials.first_name);
  }
  
document.getElementById('profile_phone_number').style.pointerEvents= 'none';
document.getElementById('profile_phone_number').style.backgroundColor= '#eee';
document.getElementById('profile_email').style.pointerEvents= 'none';
document.getElementById('profile_email').style.backgroundColor= '#eee';
document.getElementById('profile_first_name').style.pointerEvents= 'none';
document.getElementById('profile_first_name').style.backgroundColor= '#eee';
document.getElementById('profile_last_name').style.pointerEvents= 'none';
document.getElementById('profile_last_name').style.backgroundColor= '#eee';
fetch('https://patilcm.pythonanywhere.com'+'/profiles/register_user/',{
  method:'PUT',
  headers:{
    'Authorization':'Token '+this.state.token
  },
  body:data
})
.then(resp => resp.json())
.then(res => {if(res.profile_updated){alert(res.profile_updated);
  if(document.getElementById("update_profile_loader")){
    document.getElementById("update_profile_loader").style.display='none';
  }
}})
.catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));

      }
      {/** */}
      if(what_to_do=='show_profile' && document.getElementById('profile_image')){
        fetch('https://patilcm.pythonanywhere.com'+'/profiles/register_user/',{
        method:'GET',
        headers:{
          'Authorization':'Token '+this.state.token 
        },
      })
      .then(resp => resp.json())
      .then(res => {
       this.setState({credentials:res})
       document.getElementById('myprofile').style.display='block';
      })
      .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
      }
      {/** */}
      if(what_to_do=='sign_up'){
        if(document.getElementById("loader1")){
          document.getElementById("loader1").style.display='block';
        }
      
      var input=document.getElementById('profile_image');
      var data = new FormData()
      if(input.files[0]){
data.append('image', input.files[0]);
      }
data.append('username', this.state.credentials.username);
data.append('password', this.state.credentials.password);
data.append('password2', this.state.credentials.password2);
data.append('email', this.state.credentials.email);
data.append('age', this.state.credentials.age);
if(this.state.credentials.first_name){
data.append('first_name', this.state.credentials.first_name);
}
if(this.state.credentials.last_name){
data.append('last_name', this.state.credentials.last_name);
}
     
      fetch('https://patilcm.pythonanywhere.com'+'/profiles/register_user/',{
			method:'POST',
			headers:{
        
      },
      body:data,
    })
    .then(resp => resp.json())
    .then(res => {
      document.getElementById("loader1").style.display='none';
      if(res.token){
      this.props.cookies.set('cred1',res.token);
      alert("Sign Up Successful!!, To verify your email id ,OTP has been sent to your email address");
      document.getElementById("myForm1").style.display = "none";
      document.getElementById("myForm1234").style.display = "block";
      }
      else{
      if(res.username){
        alert("Username: "+res.username[0]);
      };
      if(res.email){
        alert(res.email);
        if(res.email[0].length>1){
        alert("Email: "+res.email[0]);
        };
      };
      if(res.password){
        alert("Password: "+res.password);
        if(res.password[0].length>1){
          alert("Password: "+res.password[0]);
        }
      };
      if(res.password2){
        alert("Password: "+res.password2);
        if(res.password[0].length>1){
          alert("Password: "+res.password2[0]);
        }
      };
      if(res.age){
        alert("Age: "+res.age);
      };
    }

    })
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
    }
  }

     otp =()=>{
      document.getElementById('unique_loader1').style.display='block';
       fetch('https://patilcm.pythonanywhere.com'+'/profiles/verify_otp/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':'Token '+this.props.cookies.get('cred1')
        },
        body:JSON.stringify({
          'otp':this.state.credentials.otp,
        })
      })
      .then(resp => resp.json())
      .then(res =>{
        document.getElementById('unique_loader1').style.display='none';
        if(res.otp_expired){alert(res.otp_expired);document.getElementById('otp_ip').style.display='none';document.getElementById('resend_otp_button').style.display='block';document.getElementById('submit_otp34').style.display='none';};
      if(res.email_verified){alert(res.email_verified);window.location.href="/posts"};
      if(res.worong_otp){alert(res.worong_otp)};
      if(res.email_already_verified){alert(res.email_already_verified)};
      if(res.otp_does_not_exist){alert(res.otp_does_not_exist)};
      if(res.profile_doesnt_exist){alert(res.profile_doesnt_exist)};
    })
      .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
    }

   


    logout = event =>{
      this.props.cookies.remove('cred1');
      if(document.getElementById('create_channel_button') && document.getElementById('update_channel_button')){
        document.getElementById('create_channel_button').style.display='block';
        document.getElementById('update_channel_button').style.display='none';
      }
      
      
      window.location.href="/";
    }

    get_cat2=(id)=>{
      let catarr=[];

      fetch('https://patilcm.pythonanywhere.com'+'/content/full_content/1/'+id,{
        method:'GET',
        headers:{
        }
      })
      .then(resp => resp.json())
      .then(res => {res['Category2'].map(c=>catarr.push({'cat_id':c.id,'cat_title':c.title}))})
      // .then(res => {res.Category2.map(category=><li>{category.title}</li>)})
      .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error))
      return catarr;
    }


    componentDidMount() {
       
       fetch('https://patilcm.pythonanywhere.com'+'/content/full_content/0/0',{
        method:'GET',
        headers:{
        }
      })
      .then(resp => resp.json())
      .then(res => {this.setState({Category1:res.Category1,Records:res.Records});})
      // .then(res => this.state.response.results= [...this.state.response.results,...res.results])
      .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));

     
      }

      postinputChanged = event =>{
        let this_post1=this.state.post;
        this_post1[event.target.name]=event.target.value;
        this.setState({post:this_post1});
      }
    
      post=(what_to_do,post_id)=>{
        if(what_to_do=='create_post'){
        document.getElementById("create_post_loader").style.display='block';
          var data = new FormData()
          data.append('title', this.state.post.title);
    data.append('description', this.state.post.description);
          if(document.getElementById('main_content_text')){
            if(document.getElementById('main_content_text').files[0]){
    data.append('main_content_text', document.getElementById('main_content_text').files[0]);
    document.getElementById('main_content_text_loader').style.display='block';
            }
          }
          if(document.getElementById('main_content_audio')){
            if(document.getElementById('main_content_audio').files[0]){
    data.append('main_content_audio', document.getElementById('main_content_audio').files[0]);
    document.getElementById('main_content_audio_loader').style.display='block';
            }
          }
          if(document.getElementById('main_content_image')){
            if(document.getElementById('main_content_image').files[0]){
    data.append('main_content_image', document.getElementById('main_content_image').files[0]);
    document.getElementById('main_content_image_loader').style.display='block';
            }
          }
          if(document.getElementById('main_content_gif')){
            if(document.getElementById('main_content_gif').files[0]){
    data.append('main_content_gif', document.getElementById('main_content_gif').files[0]);
    document.getElementById('main_content_gif_loader').style.display='block';
            }
          }
          if(document.getElementById('main_content_video')){
            if(document.getElementById('main_content_video').files[0]){
    data.append('main_content_video', document.getElementById('main_content_video').files[0]);
    document.getElementById('main_content_video_loader').style.display='block';
            }
          }
    if(this.state.post.main_content_text_link){
    data.append('main_content_text_link', this.state.post.main_content_text_link);
    }
    if(this.state.post.main_content_audio_link){
    data.append('main_content_audio_link', this.state.post.main_content_audio_link);
    }
    if(this.state.post.main_content_image_link){
    data.append('main_content_image_link', this.state.post.main_content_image_link);
    }
    if(this.state.post.main_content_gif_link){
    data.append('main_content_gif_link', this.state.post.main_content_gif_link);
    }
    if(this.state.post.main_content_video_link){
    data.append('main_content_video_link', this.state.post.main_content_video_link);
    }
    
    fetch("https://patilcm.pythonanywhere.com"+"/posts/post/0",{
      method:'POST',
      headers:{
        'Authorization':'Token '+this.state.token
      },
      body:data,
    })
    .then(resp => resp.json())
    .then(res => {
      if(res.post_created_success){
        alert(res.post_created_success);
      }
      Object.keys(res).map(key=>{
        
        var string1=res[key];
        if(key=='main_content_text'){string1="Text File :"+string1};
        if(key=='main_content_text_link'){string1="Text Link :"+string1};
        if(key=='main_content_audio'){string1="Audio File :"+string1};
        if(key=='main_content_audio_link'){string1="Audio Link:"+string1};
        if(key=='main_content_image'){string1="Image File :"+string1};
        if(key=='main_content_image_link'){string1="Image Link :"+string1};
        if(key=='main_content_gif'){string1="Gif File :"+string1};
        if(key=='main_content_gif_link'){string1="Gif Link :"+string1};
        if(key=='main_content_video'){string1="Video File :"+string1};
        if(key=='main_content_video_link'){string1="Video Link :"+string1};
        alert(string1);
      });
      document.getElementById('main_content_text_loader').style.display='none';
      document.getElementById('main_content_audio_loader').style.display='none';
      document.getElementById('main_content_image_loader').style.display='none';
      document.getElementById('main_content_gif_loader').style.display='none';
      document.getElementById('main_content_video_loader').style.display='none';
      document.getElementById("create_post_loader").style.display='none';
      if(document.getElementById('main_content_text')){
      document.getElementById('main_content_text').value = "";
      }
      if(document.getElementById('main_content_audio')){
      document.getElementById('main_content_audio').value = "";
      }
      if(document.getElementById('main_content_image')){
      document.getElementById('main_content_image').value = "";
      }
      if(document.getElementById('main_content_gif')){
      document.getElementById('main_content_gif').value = "";
      }
      if(document.getElementById('main_content_video')){
      document.getElementById('main_content_video').value = "";
      }
      if(document.getElementById('post_title')){
        document.getElementById('post_title').value = "";
        }
    if(document.getElementById('post_description')){
    document.getElementById('post_description').value = "";
    }
    if(document.getElementById('main_content_text_link')){
      document.getElementById('main_content_text_link').value = "";
      }
      if(document.getElementById('main_content_audio_link')){
        document.getElementById('main_content_audio_link').value = "";
        }
        if(document.getElementById('main_content_image_link')){
          document.getElementById('main_content_image_link').value = "";
          }
          if(document.getElementById('main_content_gif_link')){
            document.getElementById('main_content_gif_link').value = "";
            }
            if(document.getElementById('main_content_video_link')){
              document.getElementById('main_content_video_link').value = "";
              }
      
    
    })
    .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
        }
      }

      channel=(what_to_do)=>{
        if(this.state.token){

          if(what_to_do=='delete_channel'){
            alert('Del channel');
          }
            
          if(what_to_do=='see_my_channel'){

            fetch('https://patilcm.pythonanywhere.com'+'/posts/channel/0',{
              method:'PUT',
              headers:{
                'Authorization':'Token '+this.state.token
              }
            })
            .then(resp => resp.json())
            .then(res => {if(res.channel_doesnt_exist){alert(res.channel_doesnt_exist);}; if(!res.channel_doesnt_exist){this.setState({channel:res});console.log(this.state.channel);if(document.getElementById("mychannel")){document.getElementById("mychannel").style.display='block'}}})
            .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
          
            
        }

          if(what_to_do=='update_channel'){
            if(document.getElementById('channel_profile_image') && document.getElementById("channel_profile_loader")){
              document.getElementById("channel_profile_loader").style.display='block';
            var input=document.getElementById('channel_profile_image');
            
            var data = new FormData()
            if(input.files[0]){
      data.append('image', input.files[0]);
            }
      data.append('title', this.state.channel.title);
      data.append('description', this.state.channel.description);
      
           
            fetch('https://patilcm.pythonanywhere.com'+'/posts/channel/1',{
            method:'POST',
            headers:{
              'Authorization':`Token ${this.state.token}`
            },
            body:data,
          })
          .then(resp => resp.json())
          .then(res => {
            if(res.channel_created){
              alert(res.channel_created);
              alert(
                'Channel Title:\n '+res.channel_title+' \nChannel Description:\n '+res.channel_description
              );
            }
            document.getElementById("channel_title").style.pointerEvents='';
            document.getElementById("channel_title").style.backgroundColor='#eee';
            document.getElementById("channel_description").style.pointerEvents='';
            document.getElementById("channel_description").style.backgroundColor='#eee';
            document.getElementById("channel_profile_loader").style.display='none';
          })
          .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
          }
          }

        if(what_to_do=='create_channel'){
         
        
          if(document.getElementById('channel_image') && document.getElementById("loader31")){
            document.getElementById("loader31").style.display='block';
          var input=document.getElementById('channel_image');
          
          var data = new FormData()
          if(input.files[0]){
    data.append('image', input.files[0]);
          }
    data.append('title', this.state.channel.title);
    data.append('description', this.state.channel.description);
    
         
          fetch('https://patilcm.pythonanywhere.com'+'/posts/channel/0',{
          method:'POST',
          headers:{
            'Authorization':`Token ${this.state.token}`
          },
          body:data,
        })
        .then(resp => resp.json())
        .then(res => {
          if(res.channel_created){
            alert(res.channel_created);
          }
          if(res.channel_exists){
            alert(res.channel_exists);
            document.getElementById('myForm991').style.display='block';
            document.getElementById('myForm99').style.display='none';
            alert(
              'Channel Title:\n '+res.channel_data.title+' \nChannel Description:\n '+res.channel_data.description
            );
          }
          document.getElementById("loader31").style.display='none';
        })
        .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
        }

       

      }
    }else{
      alert('Login Needed');
    }

   
      }

      make_readable=(l)=>{
           document.getElementById(l).style.backgroundColor='white';
           document.getElementById(l).style.pointerEvents='';
      }

      resend_otp =()=>{
        document.getElementById('unique_loader1').style.display='block';
        fetch('https://patilcm.pythonanywhere.com'+'/profiles/verify_otp/',{
          method:'GET',
          headers:{
            'Authorization':`Token ${this.props.cookies.get('cred1')}`
          },
        })
        .then(resp => resp.json())
        .then(res =>{
          document.getElementById('unique_loader1').style.display='none';
          if(res.otp_failed){alert(res.otp_failed)};
          if(res.otp_sent_successfully){
            alert(res.otp_sent_successfully);
            document.getElementById('myForm1234').style.display='block';
            document.getElementById('submit_otp34').style.display='block';
            document.getElementById('otp_ip').style.display='block';
            document.getElementById('resend_otp_button').style.display='none';
          };
          if(res.email_already_verified){alert(res.email_already_verified)};
          if(res.otp_sent){
            alert(res.otp_sent);
            document.getElementById('myForm1234').style.display='block';
            document.getElementById('otp_ip').style.display='block';
            document.getElementById('submit_otp34').style.display='block';
            document.getElementById('resend_otp_button').style.display='none';
            
          };
          if(res.email_already_verified){alert(res.email_already_verified)};
          if(res.email_not_present){alert(res.email_not_present)}
        })
        .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
      }

      fetch_menu=(type,cat_id)=>{
        var element=null;
        fetch("https://patilcm.pythonanywhere.com/content/full_content/1/"+cat_id,{
          method:'GET',
          headers:{
          }
        })
        .then(resp => resp.json())
        .then(res => {
         element=<ul className="dropdown">
          {res.Category2.map(category2=><li className="subs">{category2.title}</li>)}
          </ul>;
          console.log(element);
          // ReactDOM.render(element, document.getElementById('category1'+cat_id));
         
      })
        // .then(res => this.state.response.results= [...this.state.response.results,...res.results])
        .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
        return element; 
      }

      closeotp=()=>{
        document.getElementById("myForm1234").style.display = "none";
        window.location.href="/";
      }

      onImageChange = (event) => {
        
       
        if (event.target.files && event.target.files[0]) {
          document.getElementById('channel_profile_image_div').innerHTML="kk";
          document.getElementById('channel_profile_image').src=URL.createObjectURL(event.target.files[0]);
          // this.setState(channel=>({
          //   image:URL.createObjectURL(event.target.files[0])
          // }));
        }
       }

       openLoginForm() {
        document.getElementById("myForm").style.display = "block";
      }
      openSignupForm() {
        document.getElementById("myForm1").style.display = "block";
      }
      
       closeLoginForm() {
        document.getElementById("myForm").style.display = "none";
      }

     

      closeSignupForm() {
        document.getElementById("myForm1").style.display = "none";
      }

      search=(q)=>{
        if(q.length>=4){
          
          if(window.location.href=='https://localhost:3000/posts'){
        fetch('https://patilcm.pythonanywhere.com'+'/posts/search?search='+q,{
          method:'GET',
          headers:{
            'Authorization':'Token '+this.state.token
          }
        })
        .then(resp => resp.json())
        .then(res => {console.log(res);
          
          
    
          const element=<div className="searchd" style={{display:'inline-block',backgroundColor:'#eee'}}>
                <table>
              {res.results.map(result=>
                
              <tr><td><a href={"/postdetails/"+result.id}>{result.title}</a></td></tr>
               
                )}
                </table>
            </div>;
      ReactDOM.render(element, document.getElementById('search_results'));
      document.getElementById('search_results').style.display='block';
        
      
        
        })
        .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
      }
      else{
        fetch('https://patilcm.pythonanywhere.com'+'/content/search?search='+q,{
          method:'GET',
          headers:{
          }
        })
        .then(resp => resp.json())
        .then(res => {console.log(res);
          
          
    
          const element=<div className="searchd" style={{display:'inline-block',backgroundColor:'#eee'}}>
                <table>
              {res.results.map(result=>
                
              <tr><td><a href={"/3/"+result.id}>{result.title}</a></td></tr>
               
                )}
                </table>
            </div>;
      ReactDOM.render(element, document.getElementById('search_results'));
      document.getElementById('search_results').style.display='block';
        
      
        
        })
        .catch(error => console.log("errorrrrrrrrrrrrrrrrrrrrr:::"+error));
      }
      }else{
        document.getElementById('search_results').style.display='none';
      }
      }



      update_channel(){
        
        
          if(document.getElementById('myForm991')){
            
            document.getElementById('myForm991').style.display='block';
            
          }
         
            if(document.getElementById('update_channel_button')){
            document.getElementById('update_channel_button').style.display='block';}
       }

    render(){
        return (
            <React.Fragment>
              <div>
<div className="fix">
  <div className="ll">
<div className="main">
  <div className="thisclassName123">
            <ul className="mainnav">
              <li className="hassubs"><a href="/">Abroad-Informatica</a></li>
              <li className="hassubs"><a href="/">Home</a></li>

              
              <ul className="nav navbar-nav navbar-right">
      {this.state.token ?  
      <div>
        
      <li className="hassubs"><a  href="#" onClick={this.logout}><span className="glyphicon glyphicon-log-in"></span> LogOut</a></li></div>
      :
      <div>
      <li className="hassubs"><a href="#" onClick={this.openSignupForm}><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li className="hassubs"><a  href="#" onClick={this.openLoginForm}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
        </div>
        }
    
    </ul>
<div className="navbar-form navbar-left">
      <div className="form-group">
        <input type="text" id="search_f" className="form-control" placeholder="Search Universities,Countries,Courses,Institutes..."
        onChange={
         document.getElementById('search_f')? ()=>this.search(document.getElementById('search_f').value):console.log('search form not loaded')
        }
         onKeyPress={event => {
          if (event.key === 'Enter') {
            this.search(document.getElementById('search_f').value)
          }
        }}

        />
        <div id="search_results" className="searchd">
          </div>
        
       
      </div>
</div>

</ul>
</div>
  </div>
  </div>
  
 
  <br/>
  <br/>
  

  <div align="center"><a href="/"><h1 className="glow"><img src={'./informatica.JPG'} height="80" width="80"/>&nbsp;&nbsp;&nbsp;&nbsp;Abroad-Informatica</h1></a></div>

  
    
<div className="mydiv">
<div className="subnav1">
            <ul className="mainnav" >
                <li className="hassubs"><a href="#">Content<i className="arrow down"></i></a>
                    <ul className="dropdown" >
                        <li className="subs"><a href="/">Full Content</a></li>
                        {this.state.Category1.map(category1 => {
                          
                          return (
                            <li className="subs"><a  >{category1.title}<i className="arrow right"></i></a>
                             {<FetchSubMenu type={1} cat_id={category1.id}/>}
                            
                             
                            </li>
                           
                          )
                       })}
                        {this.state.Records.map(record => {
                          return (
                            <li className="subs"><a href={"/3/"+record.id}>{record.title}</a></li>
                          )
                  
                        })}
                       
                        
                    </ul>
                </li>
                <li className="hassubs"><a href="#">Profile<i className="arrow down"></i></a>

                <ul className="dropdown">

                <li className="subs"><a href="#">Change Profile Pic<i className="arrow down"></i></a></li>
                <li className="subs"><a href="#" onClick={()=>this.signup('show_profile')}>My Profile<i className="arrow down"></i></a></li>
                </ul>
                </li>
              <li className="hassubs"><a href="#">Channel<i className="arrow down"></i></a>
              <ul className="dropdown">
              <li className="subs"><a onClick={()=>document.getElementById('myForm99')?document.getElementById('myForm99').style.display='block':console.log('myForm99 not loaded yet')}>Create a Channel</a></li>
              <li className="subs"><a onClick={()=>this.channel('see_my_channel')}>My Channel</a></li>
              <li className="subs"><a href="/channels">All Channels<i className="arrow right"></i></a></li>
              <li className="subs"><a href="#">Subscribed Channels<i className="arrow right"></i></a></li>
              </ul>
              </li>
              <li className="hassubs"><a href="#">Posts<i className="arrow down"></i></a>
              <ul className="dropdown">
              <li className="subs"><a href="/posts">All Posts</a></li>
              <li className="subs"><a href="#" onClick={document.getElementById("post_form")?()=>document.getElementById("post_form").style.display='block':console.log('post_form not loaded yet')}>Create a Post</a></li>
              <li className="subs"><a href="#">Liked Posts</a></li>
              <li className="subs"><a href="#">Commented Posts</a></li>

              </ul>
              </li>
              </ul>
            
           
              
        </div>
      </div>
      </div>
</div>

<div className="container" align="center">
{this.state.token?
          <div className="card">
  
  <div className="container" align="center">
  <img src="https://techblogwriter.co.uk/wp-content/uploads/2016/01/text-video-audio-and-images..png" alt="Avatar" style={{width:"40vw"}}/>
   <br/>
   <button align="center" onClick={document.getElementById("post_form")?()=>document.getElementById("post_form").style.display='block':console.log('post_form not loaded yet')} className="w3-button w3-xlarge w3-circle w3-orange w3-card-4">+</button> 
   <br/>
   <font size="50em"><b>Add Post</b></font>
  </div>
</div>:<p></p>}

         {/** POST FORM STARTS HERE*/}
         

         <div className="modal-dialo" style={{display:'none'}} id="post_form">

<div className="container1">
<div align="center"><h4>Post Form</h4></div>
<div className="row">
      <button className="button1" onClick={()=>document.getElementById('post_form')?document.getElementById('post_form').style.display='none':console.log('myForm99 not loaded yet')}>Close</button>
    </div>
    <div className="row">
      <div className="col-75">
        <input  required className="pass" type="text" id="post_title" name="title" placeholder="Title" value={this.state.post.title} onChange={this.postinputChanged}/>
      </div>
    </div>
    
    <div className="row">
      <div className="col-75">
        <textarea required rows="10" cols="30" className="pass" type="text" id="post_description" name="description" placeholder="Description" value={this.state.post.description} onChange={this.postinputChanged}/>
      </div>
    </div>

    <div className="row">
      <div className="col-25">
       Text File(optional):<input id="main_content_text" className="pass" type="file"  name="main_content_text" />
      </div>
      <div className="col-25">
      <div id="main_content_text_loader" style={{display:'none'}} className="file_loader" ></div>
      </div>
    </div>
    <div className="row">
      <div className="col-25">
       Audio File(optional):<input id="main_content_audio" className="pass" type="file"  name="main_content_audio" />
      </div>
      <div className="col-25">
      <div id="main_content_audio_loader" style={{display:'none'}} className="file_loader" ></div>
      </div>
    </div>
    <div className="row">
      <div className="col-25">
       Image File(optional):<input id="main_content_image" className="pass" type="file"  name="main_content_image" />
      </div>
      <div className="col-25">
      <div id="main_content_image_loader" style={{display:'none'}} className="file_loader" ></div>
      </div>
    </div>
    <div className="row">
      <div className="col-25">
       Gif File(optional):<input id="main_content_gif" className="pass" type="file"  name="main_content_gif" />
      </div>
      <div className="col-25">
      <div id="main_content_gif_loader" style={{display:'none'}} className="file_loader" ></div>
      </div>
    </div>
    <div className="row">
      <div className="col-25">
       Video File(optional):<input id="main_content_video" className="pass" type="file"  name="main_content_video" />
      </div>
      <div className="col-25">
      <div id="main_content_video_loader" style={{display:'none'}} className="file_loader" ></div>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
        (optional)<input className="pass" type="text" id="main_content_text_link" name="main_content_text_link" placeholder="Text Link" value={this.state.post.main_content_text_link} onChange={this.postinputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
      (optional)<input className="pass" type="text" id="main_content_audio_link" name="main_content_audio_link" placeholder="Audio Link" value={this.state.post.main_content_audio_link} onChange={this.postinputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
      (optional)<input className="pass" type="text" id="main_content_image_link" name="main_content_image_link" placeholder="Image Link" value={this.state.post.main_content_image_link} onChange={this.postinputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
      (optional)<input className="pass" type="text" id="main_content_gif_link" name="main_content_gif_link" placeholder="Gif Link" value={this.state.post.main_content_gif_link} onChange={this.postinputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
      (optional)<input className="pass" type="text" id="main_content_video_link" name="main_content_video_link" placeholder="Video Link" value={this.state.post.main_content_video_link} onChange={this.postinputChanged}/>
      </div>
    </div>
    <div className="row">
      <button id="create_post_button" onClick={()=>this.post('create_post',0)} className="buttonss">Create Post </button>
    </div>
    <div className="row">
      <div id="create_post_loader" style={{display:'none'}} className="loader"></div>
    </div>
</div>
</div>

{/** */}
{this.state.channel?
<div id="myprofile" style={{display:'none'}}>
<div className="card">
            <div className="row">
  <h4>My Profile:</h4>
    </div>
            <div className="row">
      <button className="button1" onClick={()=>document.getElementById('myprofile')?document.getElementById('myprofile').style.display='none':console.log('myprofile not loaded yet')}>Close</button>
    </div>
              <div align="center" className="post">
                <div align="center">
                <table className="table table-bordered" align="center">
                <tr>
              <td width="20%">{ this.state.credentials.image?<img id="pr_image" src={'https://patilcm.pythonanywhere.com'+this.state.credentials.image+'&Token='+this.state.token} className="responsive2"/>:'No Profile Image'}</td>
              
               </tr>
               
                
                </table>
                </div>
                
              <table className="table table-bordered" border="10px">
              <tr>
               
      <th>Profile Image(optional): <div id="profile_image_div"><input id="updated_profile_image" className="pass" type="file"  name="image" /></div></th>
      
                 </tr>
               
              
               
              <tr>
              <th>First Name:</th>
                </tr>
              <tr>
              <th width="20%"><input style={{pointerEvents: 'none',backgroundColor:'#eee' }} type="text" onChange={this.inputChanged} required rows="1" cols="10" className="pass" type="text" id="profile_first_name" name="first_name" placeholder={this.state.credentials.first_name} value={this.state.credentials.first_name}/><span className="fa fa-edit" onClick={()=>this.make_readable('profile_first_name')}>Edit</span></th>
               
               </tr>
               <br/>
               <tr>
              <th>Last Name:</th>
                </tr>
              <tr>
              <th width="20%"><input style={{pointerEvents: 'none',backgroundColor:'#eee' }} type="text" onChange={this.inputChanged} required rows="1" cols="10" className="pass" type="text" id="profile_last_name" name="last_name" placeholder={this.state.credentials.last_name} value={this.state.credentials.last_name}/><span className="fa fa-edit" onClick={()=>this.make_readable('profile_last_name')}>Edit</span></th>
               
               </tr>
               <br/>
               <tr>
              <th>Email:</th>
                </tr>
                <tr>
              <th width="20%"><input style={{pointerEvents: 'none',backgroundColor:'#eee' }}  required onChange={this.inputChanged} max-rows="8" cols="30" className="pass" type="text" id="profile_email" name="email" value={this.state.credentials.email}/><span className="fa fa-edit" onClick={()=>this.make_readable('profile_email')}>Edit</span></th>
                </tr>
                 <br/>
                 
                 
                 <tr>
              <th>Phone Number:</th>
                </tr>
                <tr>
              <th width="20%"><input style={{pointerEvents: 'none',backgroundColor:'#eee' }}  required onChange={this.inputChanged} max-rows="8" cols="30" className="pass" type="text" id="profile_phone_number" name="phone_number" value={this.state.credentials.phone_number}/><span className="fa fa-edit" onClick={()=>this.make_readable('profile_phone_number')}>Edit</span></th>
                </tr>
                 <br/>
                 {this.state.credentials.email?
                 <div>
                 <tr>
              <th>Is Email Verified?</th>
                </tr>
                <tr>
              <th width="20%">{this.state.credentials.is_email_verified?'Yes':'No'}</th>
                </tr>
                 <br/></div>:''}
                 {this.state.credentials.phone_number?
                 <div>
                 <tr>
              <th>Is Phone Number Verified?</th>
                </tr>
                <tr>
              <th width="20%">{this.state.credentials.is_phone_number_verified?'Yes':'No'}</th>
                </tr>
                 <br/></div>:''}
                <tr>
              <th>Signed Up Date Time:</th>
                </tr>
                <tr>
              <th>{this.state.credentials.date_joined?'Date: '+this.state.credentials.date_joined.split("T")[0]+" Time: "+this.state.credentials.date_joined.split("T")[1].split("Z")[0]:''}</th>
                </tr>
                <br/>
              
             
  
                <tr>
                <div className="row" align="center">
      <button className="update_channel_button" onClick={()=>this.signup('update_profile')}>Update Profile</button>
    </div>
    </tr>
                
    <tr>
    <div className="row">
      <div id="update_profile_loader" align="center" style={{display:'none'}} className="loader"></div>
    </div>
      </tr>
                </table>
            
           
              </div>

             


                            
              
            
            
            
                           
            </div>
            
</div>
            :<p></p>} 
        {/** */}
{/** POST FORM ENDS HERE*/}
{this.state.channel?
<div id="mychannel" style={{display:'none'}}>
<div className="card">
            <div className="row">
  <h4>My Channel:</h4>
    </div>
            <div className="row">
      <button className="button1" onClick={()=>document.getElementById('mychannel')?document.getElementById('mychannel').style.display='none':console.log('mychannel not loaded yet')}>Close</button>
    </div>
              <div align="center" className="post">
                <div align="center">
                <table className="table table-bordered" align="center">
                <tr>
              <td width="20%">{ this.state.channel.image?<img id="ip_image" src={'https://patilcm.pythonanywhere.com'+this.state.channel.image+'&Token='+this.state.token} className="responsive2"/>:'No Channel Image'}</td>
              
               </tr>
               
                
                </table>
                </div>
                
              <table className="table table-bordered" border="10px">
              <tr>
               
      <th>Change Channel Image(optional): <div id="channel_profile_image_div"><input id="channel_profile_image" onCHange={()=>alert('lllchanged')} className="pass" type="file"  name="image" onChange={()=>this.onImageChange }/></div></th>
      
                 </tr>
               
              <tr>
              <th>Title:</th>
                </tr>
              <tr>
              <th width="20%"><input style={{backgroundColor:'#eee'}} type="text" onChange={this.channelinputChanged} required rows="1" cols="10" className="pass" type="text" id="channel_title" name="title" placeholder={this.state.channel.title} value={this.state.channel.title}  style={{pointerEvents: 'none',backgroundColor:'#eee' }}/><span className="fa fa-edit" onClick={()=>this.make_readable('channel_title')}>Edit</span></th>
               
               </tr>
               <br/>
               <tr>
              <th>Description:</th>
                </tr>
               
                <tr>
                  
              <th width="20%"><textarea style={{backgroundColor:'#eee'}} required onChange={this.channelinputChanged} max-rows="8" cols="30" className="pass" type="text" id="channel_description" name="description" value={this.state.channel.description} style={{pointerEvents: 'none',backgroundColor:'#eee' }}/><span className="fa fa-edit" onClick={()=>this.make_readable('channel_description')}>Edit</span></th>
                </tr>
               
                 <br/>
                <tr>
              <th>Channel Created Date And Time:</th>
                </tr>
                <tr>
              <th>{'Date: '+this.state.channel.channel_created_date_time.split("T")[0]+" Time: "+this.state.channel.channel_created_date_time.split("T")[1].split("Z")[0]}</th>
                </tr>
                <br/>
                <tr>
              <th>Is channel Granted to add posts?:</th>
                </tr>
                <tr>
              <th>{this.state.channel.is_granted?'\n'+'Yes':'\n'+'No'}</th>
                </tr>
             
  
                <tr>
                <div className="row" align="center">
      <button className="update_channel_button" onClick={()=>this.channel('update_channel')}>Update Channel</button>
    </div>
    </tr>
                <tr>
                <div className="row" align="center">
      <button className="delete_channel_button" onClick={()=>this.channel('delete_channel')}>Delete Channel</button>
    </div>
    </tr>
    <tr>
    <div className="row">
      <div id="channel_profile_loader" style={{display:'none'}} className="loader"></div>
    </div>
      </tr>
                </table>
            
           
              </div>

             


                            
              
            
            
            
                           
            </div>
            
</div>
            :<p></p>}          
            
</div>
  









{/** ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp*/}
<div className="modal-dialo" style={{display:'none'}} id="myForm99">
<div className="container1">
<div className="row">
      <button className="button1" onClick={()=>document.getElementById('myForm99')?document.getElementById('myForm99').style.display='none':console.log('myForm99 not loaded yet')}>Close</button>
    </div>
  
  
  <div className="row">
      <div className="col-75">
        <input  className="pass" type="text" id="fname" name="title" placeholder="Title" value={this.state.channel.title} onChange={this.channelinputChanged}/>
      </div>
    </div>
    
    <div className="row">
      <div className="col-75">
        <input className="pass" type="text" id="lname" name="description" placeholder="Description" value={this.state.channel.description} onChange={this.channelinputChanged}/>
      </div>
    </div>

    <div className="row">
      <div className="col-75">
      Channel Image(optional): <input id="channel_image" className="pass" type="file"  name="image" />
      </div>
    </div>
    
  
   
    <div className="row">
      <button id="create_channel_button" onClick={()=>this.channel('create_channel')} className="buttonss">Create Channel </button>
    </div>

    <div className="row">
      <div id="loader31" style={{display:'none'}} className="loader"></div>
    </div>
    
 
</div>
</div>
{/** ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp*/}



{/**/ }
<div className="modal-dialog" id="myForm1234">
<div className="container1">
<div className="row">
      <button className="button1" onClick={this.closeotp}>Close</button>
    </div>
  
  
  <div className="row">
      <div className="col-75">
        <input className="pass" style={{display:'block'}} type="text" id="otp_ip" name="otp" placeholder="Enter OTP(Sent on Your Email)" value={this.state.credentials.otp} onChange={this.inputChanged}/>
      </div>
    </div>
    
   
    
  
   
    <div className="row">
      <button onClick={this.otp} id="submit_otp34" className="buttonss">Submit OTP</button>
    </div>
    <div className="row">
      <button id="resend_otp_button" onClick={this.resend_otp} className="buttonss">Resend OTP</button>
    </div>
    <div className="row">
      <div id="unique_loader1" align="center" style={{display:'none'}} className="loader"></div>
    </div>
    
 
</div>
</div>
{/**/ }





<div className="modal-dialog" id="myForm">
<div className="container1">
<div className="row">
      <button className="button1" onClick={this.closeLoginForm}>Close</button>
    </div>
  
  
  <div className="row">
      <div className="col-75">
        <input  className="pass" type="text" id="fname" name="username" placeholder="Username" value={this.state.credentials.username} onChange={this.inputChanged}/>
      </div>
    </div>
    
    <div className="row">
      <div className="col-75">
        <input className="pass" type="password" id="lname" name="password" placeholder="Password" value={this.state.credentials.password} onChange={this.inputChanged}/>
      </div>
    </div>

    
    
  
   
    <div className="row">
      <button onClick={this.login} className="buttonss">Login</button>
    </div>

    <div className="row">
      <div id="loader2" style={{display:'none'}} className="loader"></div>
    </div>
    
 
</div>
</div>

<div className="modal-dialog" id="myForm1">
<div className="container1">
<div className="row">
      <button className="button1" onClick={this.closeSignupForm}>Close</button>
    </div>
 
  
  <div className="row">
      <div className="col-75">
        <input className="pass" type="text" id="fname" name="username" placeholder="Username" value={this.state.credentials.username} onChange={this.inputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
        <input className="pass" type="text" id="fname" name="email" placeholder="Email" value={this.state.credentials.email} onChange={this.inputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
        <input className="pass" type="password" id="lname" name="password" placeholder="Password" value={this.state.credentials.password} onChange={this.inputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
        <input className="pass" type="password" id="lname" name="password2" placeholder="Confirm Password" value={this.state.credentials.password2} onChange={this.inputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
        <input className="pass" type="text" id="lname" name="age" placeholder="Age" value={this.state.credentials.age} onChange={this.inputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
        (optional)<input className="pass" type="text" id="lname" name="first_name" placeholder="First Name" value={this.state.credentials.first_name} onChange={this.inputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
        (optional)<input className="pass" type="text" id="lname" name="last_name" placeholder="Last Name" value={this.state.credentials.last_name} onChange={this.inputChanged}/>
      </div>
    </div>
    <div className="row">
      <div className="col-75">
      Profile Pic(optional): <input className="pass" type="file" id="profile_image" name="image" />
      </div>
    </div>
  
   
    <div className="row">
      <button onClick={()=>this.signup('sign_up')} className="buttonss">Signup</button>
    </div>

    <div className="row">
      <div id="loader1" style={{display:'none'}} className="loader"></div>
    </div>
    
    
  
</div>

</div>







<div className="navbar">
  <div align="center">
<a href="#home" className="active">Home</a>
  <a href="#home" className="active">Trending</a>
  <a href="#home" className="active">Subscriptions</a>
  <a href="#contact">Contact</a>
  </div>
</div>





            </React.Fragment>
        )
    }
}

export default withCookies(TopNavigation);