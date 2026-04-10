const actionData = {
    test: "/api/contact",
};

let submitButton =document.getElementById("submitButton");
let content =document.getElementById("postContent");
let title =document.getElementById("postTitle");
let userName = document.getElementById("posterUsername");


submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const payload = {
            mail: content.value, 
            title: title.value, 
            sender: userName.value
        };
        const response = await fetch('/api/contact', {method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        console.log('boom')
        if (!response.ok) {
            throw new Error(`Server error: ${response.status} sir`);
        }

        const responseData = await response.json();
        
        // This will now print correctly without crashing sir
        console.log("Email received:", responseData.email);
    } catch (error) {
        
        console.error("Failed to fetch response sir:", error.message);
    }
});

