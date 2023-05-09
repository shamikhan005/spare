const API_KEY = ''     // API KEY not mention[public] due to security reasons.
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')


function changeInput(value) {
    inputElement.value = value;
    getMessage();
}


async function getMessage() {
    console.log('clicked')
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputElement.value }],
            max_tokens: 150
        })
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        outPutElement.textContent = '';

        const message = data.choices[0].message.content;
        for (let i = 0; i < message.length; i++) {
            setTimeout(() => {
                outPutElement.textContent += message[i];
            }, i * 50);
        }

        
        if (data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }

        inputElement.value = '';
    } catch (error) {
        console.error(error)
    }
}


submitButton.addEventListener('click', getMessage)


function clearInput() {
    inputElement.value = ''
}

buttonElement.addEventListener('click', clearInput)

inputElement.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        getMessage();
    }
});
