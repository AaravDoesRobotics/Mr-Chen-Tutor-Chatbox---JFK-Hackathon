async function getAnswer() {
    const inputField = document.getElementById('input');
    const outputDiv = document.getElementById('output');
    const userInput = inputField.value.trim();

    if (!userInput) {
        // outputDiv.innerHTML = "test"; // this was the issue why it didnt work
        // break;
        outputDiv.innerHTML = "Please enter a question.";
        return;
    }

    outputDiv.innerHTML = "Thinking...";

    try {
        const response = await fetch(`/api/answer?input=${encodeURIComponent(userInput)}`);
        const data = await response.json();

        outputDiv.innerHTML = data.answer || "Couldn't find an answer."; //fixed the issue why it didnt work ;-;
    } catch (error) {
        console.error(error);
        outputDiv.innerHTML = "An error occurred. Please try again later.";
    }
}