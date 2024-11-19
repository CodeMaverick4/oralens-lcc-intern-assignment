import { useState } from "react";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedError, setUploadError] = useState(null);
  const [ageError, setAgeError] = useState(null);
  const [nameError, setNameError] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const handleName = (e) => {
    const name = e.target.value
    for (let char of name) {
      const charAscii = char.charCodeAt(0)
      if(!(charAscii >= 97 && charAscii <= 122) && !(charAscii >= 65 && charAscii <= 90) ){
        setNameError("please enter a valid name")
        return 
      }
    }
    setNameError(null)    
  }

  const handleAge = (e) => {
    const dateOfBirth = new Date(e.target.value);
    const today = new Date();
    

    
    const maxAllowedDate = new Date();
    maxAllowedDate.setFullYear(today.getFullYear() - 130);

    if (dateOfBirth < maxAllowedDate) {
      setAgeError("Date of birth is over 130 years ago, not allowed.");
      document.getElementById("Age").textContent = "";
      setTimeout(() => setAgeError(null), 3000);
      return;
    }

    
    let years = today.getFullYear() - dateOfBirth.getFullYear();
    let months = today.getMonth() - dateOfBirth.getMonth();
    let days = today.getDate() - dateOfBirth.getDate();

    
    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0 && months === 0 && days === 0) {
      days = 1; // To avoid displaying 0 years, 0 months, 0 days
    }
    
    const ageText = `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""} ${days} day${days !== 1 ? "s" : ""}`;
    document.getElementById("Age").textContent = ageText;
    
  };
      
 

  const handleFileChange = (event) => {
    if(!uploadedFile){
      const maxFileSize = 5 * 1024 * 1024; 
      const file = event.target.files[0];
      if (file) {
        if (file.size > maxFileSize) {
          setUploadError("File size exceeds 5MB. Please upload a smaller file.");              
          setTimeout(() => {
            setUploadError(null)
          }, 3000);
        }      
        } else {          
          setUploadedFile(file); 
        }      
    }
    else{
      setUploadError("Can not upload more than 1 file")
      setTimeout(() => {
        setUploadError(null)
      }, 3000);
    }
    
  };


  return (
    <div className='bg-[#fcf5eb] flex justify-center items-center h-screen font-mono '>
      <div className='bg-white border border-black rounded-2xl p-7'>
          <form action="#" className='flex flex-col gap-7 '>
            <h1 className="font-semibold text-3xl text-center ">Submit you details</h1>
            
            <div className="flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="">First Name </label>
                  <input type="text" name="" id="" onChange={handleName}  className="border border-black rounded-lg px-3 py-2" placeholder="Jhon"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="">Last Name </label>
                  <input type="text" name="" id=""  onChange={handleName} className="border border-black rounded-lg px-3 py-2" placeholder="Cena"/>
                </div>
              </div>
              <span className="text-red-500">{nameError}</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="">Date of birth </label>
                  <input onChange={handleAge} max={today} type="date" name="" id=""  className=" w-full border border-black rounded-lg px-3 py-2" placeholder="dd/mm/year"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="">Age </label>
                  <span id="Age" className="text-sm bg-blue-200 rounded-lg py-5 px-3" ></span>
                </div>

              </div>
              <span className="text-red-500">{ageError}</span>
            </div>
            

           <div className="flex flex-col gap-2 ">
              <span> Upload File </span>

              <label htmlFor="file-upload" className="flex flex-col gap-3 justify-center items-center border border-black rounded-lg bg-gray-100 py-5 cursor-pointer">
                  <img src="upload.png" alt="" className="w-10"/>
                  <label htmlFor="file-upload">Click here to upload a file </label>
                  <input id="file-upload" onChange={handleFileChange} type="file" class="hidden" />                  
              </label>

             {uploadedFile &&
              <div className="flex gap-1 items-center w-full justify-between">
                <div className="bg-green-200 px-2 py-1 rounded-md flex items-center justify-between flex-grow">
                  <span>{uploadedFile.name}</span>
                  <span>{(uploadedFile.size/10**6).toFixed(2)}MB</span>
                </div>

                <img src="trash-icon.jpg" alt="" onClick={()=> setUploadedFile(null)} className="h-7 rounded-md cursor-pointer" />
              </div>
              }
              <span className="text-red-500">{uploadedError}</span>
            </div>

            <div className="flex justify-center">
              <button className="hover:border-b transition-all duration-300   rounded-3xl border border-b-4 border-black py-3 px-10 bg-green-300">Submit</button>
            </div>
          </form>
      </div>
      
    </div>
  );
}

export default App;
