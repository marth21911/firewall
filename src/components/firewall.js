import React, {useState} from "react";

const FirewallForm = (props) =>{
    const [form, setForm] = useState("");
    const [loaded, setLoaded] = useState("");
    const [submit, setSubmit] = useState(false);
    var newEntries=["Awaiting Input"];
    const formMessage = () =>{
        if( submit){
            return (loaded.map((item)=>{
                return <li>{item}</li>
            }))
        }else{
            return newEntries
        }
    }

    const submitHandler = e =>{
        e.preventDefault();
        console.log("succes?");
        setLoaded(stringSplitter(form));
        setSubmit(true);
        console.log("Here's the data" + loaded);
    }
    const stringSplitter= (form)=> {
        var stringArr = form.split(/(\d+)/);
        var newDoc="";
        newEntries=[];
        for(var i=0; i<stringArr.length; i++){
            if(stringArr[i].includes("p")){
                stringArr.splice(i,1)
            }
            if(stringArr[i] ===" "){
                stringArr[i] = "-";
            }
        }
        for(var j=0; j<stringArr.length; j++){
            if(stringArr[j+1]==="-"){
                newEntries.push(`edit "tcp_` + stringArr[j]+stringArr[j+1]+stringArr[j+2] + `"`);
                newEntries.push(`set tcp-portrange `+ stringArr[j]+stringArr[j+1]+stringArr[j+2]);
                newEntries.push(`next`);
                // newEntries.push(`edit "tcp_`+stringArr[j]+stringArr[j+1]+stringArr[j+2]+ `"\n
                // set tcp-portrange `+ stringArr[j]+stringArr[j+1]+stringArr[j+2] +`\n
                // next\n`);
            }else{
                newEntries.push(`edit "tcp_` + stringArr[j]+ `"`);
                newEntries.push(`set tcp-portrange `+ stringArr[j]);
                newEntries.push(`next`);
                // newEntries.push(`edit "tcp_`+ stringArr[j]+`"\n
                // set tcp-portrange `+ stringArr[j]+`\n
                // next \n`);
            }
        }
        for(var k=0; k<newEntries.length; k++){
            newDoc+= newEntries[k];
        }
        return newEntries
    }
    return(
        <div>
        <div class="text-center">
            <div class="ml-auto topbar" >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMsXSSAuD97JT1-OtFuIlkDX9SyKN1mpCeGA&usqp=CAU" alt="SE" />
            </div>
            <h1>ASA to Fortigate Service Object Converter</h1> 
            <h3>Format for conversion: One entry per line, no commas. Ex. below. </h3>
        </div>
            <div class = "container-lg">
                <div class = "row">
                    <div class= "col">
                        <p>port-object eq 7000</p>
                        <p>port-object eq 5280</p>
                        <p>port-object eq 587</p>
                        <p>port-object eq 10022</p>
                        <p>port-object eq 10032</p>
                        <p>port-object range 8080 8089</p>
                        <h5>This tool is designed and build for use by Systems Engineering by Brian Marth. For assistance with your automation and streamlining tool needs, I can be reached through LinkedIn and Github.</h5>
            <a href="https://www.linkedin.com/in/bmmarth"><img width="50px" src="https://www.citypng.com/public/uploads/preview/hd-linkedin-official-logo-transparent-background-31623962207jz85kqlqot.png" alt="LinkedIn"/></a>
            <a href="https://github.com/marth21911/Brian_Marth_Info"><img width="50px" src="https://w1.pngwing.com/pngs/328/643/png-transparent-dog-and-cat-github-logo-symbol-chocolatey-white-black-circle.png" alt="Github"/></a>
                    </div>
                    <div class ="col">
                        <ul>
                            {
                                formMessage()
                            }
                        </ul>
                    </div>
                    <div class= "col">
                        <form  onSubmit = {submitHandler}>
                            <div>
                                <input type="submit" name="form" id="formSubmit" class= "btn btn-success"/>
                                <label> Original Entries here</label>
                                <textarea rows="300" cols="50" id="doc" onChange={(e)=> setForm(e.target.value)}></textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
           
        </div>
    )
};
export default FirewallForm;
