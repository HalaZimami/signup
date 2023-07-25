
//Get Reference for both the Forms
const SignUpForm = document.getElementById('SignUpForm');
const LoginForm = document .getElementById('LoginForm');
//Event Listener for SignUp
SignUpForm.addEventListener('submit',(e)=>{e.preventDefault();
    const UserName1 = document.getElementById('SignUpUserName').value;
    const Email1 = document.getElementById('SignUpEmail').value;
    const Password1 = document.getElementById('SignUpPassword').value;
//Store the Information in IndexedDB
SaveDataToIndexedDB(UserName1,Email1, Password1);
});
//Event Listener for Login
LoginForm.addEventListener('submit',(e) =>{e.preventDefault();
    const UserName2 = document.getElementById('LoginUserName').value;
    const Password2 = document.getElementById('LoginPassword').value;
    //Read the Information from IndexedDB
CheckDataInIndexedDB(UserName2,Password2);
});
//Function to Store Data in IndexedDB
function SaveDataToIndexedDB(UserName,Email, Password)
{   const User = {username: UserName,email:Email, password: Password};
    const request = window.indexedDB.open('UserDB',1);
    request.onerror = (event)=>
    {console.error('Sorry. Error Creating IndexedDB Database');};
    request.onsuccess = (event)=>
    {   const db = event.target.result;
        const transaction = db.transaction(['Users'],'readwrite');
        const objectstore = transaction.objectStore('Users');
        const addUserRequest = objectstore.add(User);
        addUserRequest.onsuccess = ()=>
        {console.log('User Data Saved Successfully!');};
        transaction.onsuccess = ()=>{db.close();};
    };
    request.onupgradeneeded=(event)=>
    {   const db = event.target.result;
        db.createObjectStore('Users',{keyPath:'username'});
    };
}
//Function to Checking User Data in the IndexedDB
function CheckDataInIndexedDB(UserName, Password)
{   const request = window.indexedDB.open('UserDB',1);
    request.onerror = (event)=>{console.error('Error while Reading!');};
    request.onsuccess = (event)=>
    {   const db = event.target.result;
        const transaction = db.transaction(['Users'],'readonly');
        const objectstore = transaction.objectStore('Users');
        const getUserRequest = objectstore.get(UserName);
        getUserRequest.onsuccess = () =>
        {   const User = getUserRequest.result;
            if(User && User.password === Password)
            {
                // console.log('Login Successful!');
                window.location.href = "home.html"
            }
            else {
                document.getElementById("note").innerHTML=`Username or Password Incorrect`
            }
        };
        transaction.oncomplete= ()=>{db.close();};
    };
    request.onupgradeneeded=(event)=>
    {   const db=event.target.result;
        db.createObjectStore('Users',{keyPath:'UserName'});
    };
}