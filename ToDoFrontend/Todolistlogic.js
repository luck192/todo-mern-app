document.addEventListener("DOMContentLoaded",function(){

    const taskInput = document.getElementById("inputid");
    const addButton = document.getElementById("buttonid");
    const listContainer = document.getElementById("listContainer");
        
    function saveData(){
        localStorage.setItem("data", listContainer.innerHTML);
    }
  
    taskInput.addEventListener("keypress", function(event){
        if( event.key == "Enter"){
            addButton.click();
        }
    })
   async function showTask() {
    try {
        const response = await fetch('http://localhost:3000/api/getTasks');
        const data = await response.json();
        listContainer.innerHTML = ''; // Purani list clear karein

        // Yahan check kar ki data ke andar jo array hai (taskAre), us par forEach chale
        const tasksArray = data.tasksAre || data; 

            tasksArray.forEach(task => {
                let li = document.createElement("li");
                li.innerHTML = task.text;
                
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                span.dataset.id = task._id;
                li.appendChild(span);
                
                listContainer.appendChild(li);
                console.log("ia am here");
            });
        
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

    addButton.addEventListener('click',async function(){
     const tasktext = taskInput.value.trim();
     if(tasktext ==""){
        alert("alert: kch to task krle");
     }else{
        
        try {
        const response = await fetch('http://localhost:3000/api/postTasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: tasktext })
        });

        if (response.ok) {
            taskInput.value = ''; // इनपुट बॉक्स खाली करें
            showTask(); // लिस्ट को रिफ्रेश करके नया टास्क दिखाएं
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }

     }
    }); 

   listContainer.addEventListener('click', async function(e) {
    if (e.target.tagName === 'SPAN') {
        console.log("e.target is"  , e.target.dataset);
        let taskId = e.target.dataset.id; // Span se task ki id nikali
        
        try {
            const response = await fetch(`http://localhost:3000/api/deleteTask/${taskId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                e.target.parentElement.remove(); // UI se li ko hata dega
            }
        }
         catch (error) {
            console.error("Error deleting task:", error);
        }
    }
     showTask();
   });
});