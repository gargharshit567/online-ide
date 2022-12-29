// Retrieve Elements
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = 'print("Hello Dev!")';

let editorLib = {
    init() {
        // Configure Ace

        // Theme
        codeEditor.setTheme("ace/theme/twilight");

        // Set language
        codeEditor.session.setMode("ace/mode/python");

        // Set Options
        codeEditor.setOptions({
            fontSize: '12pt'
        });

        // Set Default Code
        codeEditor.setValue(defaultCode);
    }
}

// Events
executeCodeBtn.addEventListener('click', () => {
    // Get input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    try {

        $.ajax({
            url: "https://api.jdoodle.com/v1/execute",
            method: "POST",
            data: {
                script : userCode,
                language: "python3",
                versionIndex: "0",
                clientId: "3545c96ab42763542742f21089751e78",
                clientSecret:"a1f82406e83733109dd55b9415627f5fc9c081b013e07c9297976488013eb5d1"
            },

            success : function(response){
                console.log(response)
            }
        })


        //3545c96ab42763542742f21089751e78
        //a1f82406e83733109dd55b9415627f5fc9c081b013e07c9297976488013eb5d1


    } catch (err) {
        console.error(err);
    }
});

resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    codeEditor.setValue(defaultCode);
})

editorLib.init();