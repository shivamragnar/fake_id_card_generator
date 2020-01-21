import React, {createRef} from 'react';
import Card from "./components/id-card/card";
import './App.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Sergio Fontai',
      email:'sergio.fontai@example.com',
      dob: '04/07/1995',
      phone: '076 282 62 56',
      nationality:'INDIAN',
      image: "",
      idCardNumber: "ID0001",
      showInputName: false,
      showInputEmail: false,
      showInputDob: false,
      showInputPhone: false,
      showInputNationality: false,
      themeColor: ['#ff6347', '#4169e1', '#004D40', "#3E2723", "#212121", "#263238"]
    }
    this.myInput = React.createRef();    // initialize "this.myInput"  
  }
  componentDidMount() {
    const node = this.myInput.current;
    console.log(node)
  }
  handleRandomClick = () =>{
    fetch('https://api.randomuser.me/')
    .then(data=> data.json())
    .then(response=>{
      console.log(response.results[0])
      let {name, email, dob, phone, nat : nationality, picture : image} = response.results[0];
      name = name['first'] + " " + name['last'];
      dob = (new Date(dob['date'])).toLocaleDateString();
      image = image['large'];
      this.setState({name, email, dob, image, nationality, phone})
    })
  }
  
  handleThemeClick = (theme) => {
    const card = document.body.getElementsByClassName("id-card")[0];
    card.style.backgroundColor = theme;
  }
  
  handleDownload = async () => {
    
    const name = this.state.name;
    html2canvas(document.body.getElementsByClassName("id-card")[0]).then(function(canvas) {
      document.body.appendChild(canvas);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.text(45, 25, "FAKE ID CARD GENERATOR - Raysk")
      pdf.addImage(imgData, 'PNG', 10, 50);
      pdf.save(name + ".pdf", {returnPromise: true}).then();
    });
  }
  handleClick = (type) => {
    switch(type){
      case 'name': this.setState({showInputName: true});
      break;
      case 'email': this.setState({showInputEmail: true});
      break;
      case 'phone': this.setState({showInputPhone: true});
      break;
      case 'nationality': this.setState({showInputNationality: true});
      break;
      case 'dob': this.setState({showInputDob: true});
      break;
    }
  }
  handleChange = e =>{
    const type = e.currentTarget.name;
    switch(type){
      case 'name': this.setState({name: e.currentTarget.value});
      break;
      case 'email': this.setState({email: e.currentTarget.value})
      break;
      case 'dob': this.setState({dob: e.currentTarget.value})
      break;
      case 'phone': this.setState({phone: e.currentTarget.value})
      break;
      case 'nationality': this.setState({nationality: e.currentTarget.value})
      break;
    }
  }
  handleKeyChange = e =>{
    if(e.key == "Enter"){
      switch(e.currentTarget.name){
        case 'name': this.setState({showInputName: false});
        break;
        case 'email': this.setState({showInputEmail: false});
        break;
        case 'dob': this.setState({showInputDob: false});
        break;
        case 'phone': this.setState({showInputPhone: false});
        break;
        case 'nationality': this.setState({showInputNationality: false});
        break;
      }
    }
  }
  render(){
    const {name, email, dob, phone, image, nationality, showInputName, showInputEmail, showInputDob, showInputPhone, showInputNationality, idCardNumber} = this.state;
    return (
      <div className="App">
        <h1>FAKE ID GENERATOR</h1>
        <Card 
        ref={this.myInput}
        name={name} 
        email={email} 
        dob={dob} 
        phone={phone} 
        nationality={nationality} 
        showInputName={showInputName} 
        showInputEmail = {showInputEmail}
        showInputDob = {showInputDob}
        showInputPhone = {showInputPhone}
        image={image}
        idCardNumber={idCardNumber}
        showInputNationality = {showInputNationality}
        onClick={(type, value)=>this.handleClick(type)} 
        onChange={(e)=>this.handleChange(e)}
        onKeyChange={(e)=>this.handleKeyChange(e)}
      />
      <div className="df">
        {this.state.themeColor.map(theme=>(<div className="box m-2 circle" style={{backgroundColor: theme}} onClick={()=>this.handleThemeClick(theme)}></div>))}
      </div>
      <div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => {}}
      />
        {/* <button className="btn" onClick={()=>this.handleDownload()}>Download</button> */}
        <button className="btn" onClick={this.handleRandomClick}>Random</button>
      </div>
      </div>
    );
  }
}

export default App;
