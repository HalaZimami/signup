// var post = document.getElementById("post");
// post.addEventListener("click", function () {
//     var commentBoxValue = document.getElementById("comment-box").value;

//     var li = document.createElement("li");
//     var text = document.createTextNode(commentBoxValue);
//     li.appendChild(text);
//     document.getElementById("unordered").appendChild(li);

// });
const SignUpForm = document.getElementById('CommentForm');

SignUpForm.addEventListener('submit',(e)=>{e.preventDefault();
    const comment1 = document.getElementById('comment-box').value;
//Store the Information in IndexedDB
SaveDataToIndexedDB(comment1);
});

function SaveDataToIndexedDB(Comments)
{   const Post = {comment : Comments};
    const request = window.indexedDB.open('PostDB',1);
    request.onerror = (event)=>
    {console.error('Sorry. Error Creating IndexedDB Database');};
    request.onsuccess = (event)=>
    {   const db = event.target.result;
        const transaction = db.transaction(['Posts'],'readwrite');
        const objectstore = transaction.objectStore('Posts');
        const addUserRequest = objectstore.add(Post);
        addUserRequest.onsuccess = ()=>
        {
            document.getElementById("comments").innerHTML=`${Post.comment}`
    };
        transaction.onsuccess = ()=>{db.close();};
    };
    request.onupgradeneeded=(event)=>
    {   const db = event.target.result;
        db.createObjectStore('Posts',{keyPath:'comments'});
    };
}

// function CheckDataInIndexedDB(Comment1)
// {   const request = window.indexedDB.open('UserDB',1);
//     request.onerror = (event)=>{console.error('Error while Reading!');};
//     request.onsuccess = (event)=>
//     {   const db = event.target.result;
//         const transaction = db.transaction(['Users'],'readonly');
//         const objectstore = transaction.objectStore('Users');
//         const getUserRequest = objectstore.get(UserName);
//         getUserRequest.onsuccess = () =>
//         {   const User = getUserRequest.result;
//             if(User && User.password === Password)
//             {
//                 // console.log('Login Successful!');
//                 window.location.href = "home.html"
//             }
//             else {
//                 document.getElementById("note").innerHTML=`Username or Password Incorrect`
//             }
//         };
//         transaction.oncomplete= ()=>{db.close();};
//     };
//     request.onupgradeneeded=(event)=>
//     {   const db=event.target.result;
//         db.createObjectStore('Users',{keyPath:'UserName'});
//     };
// }