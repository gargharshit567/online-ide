// Retrieve Elements
const executeCodeBtn = document.querySelector('#run-code-button');
const copyCodeButton = document.querySelector('#copy-code-button');
const themeButton = document.querySelector('#themeButton');
const outPutIcon = document.querySelector('#output-icon');
let currTheme = "day"
// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = '#These is default code \nprint("Hello Dev!")';

let editorLib = {
    init() {
        // Configure Ace

        // Theme
        codeEditor.setTheme("ace/theme/crimson_editor");
        codeEditor.renderer.setShowGutter(false);

        // codeEditor.setReadOnly(true);
        // Set language
        codeEditor.session.setMode("ace/mode/python");

        // Set Options
        codeEditor.setOptions({
            fontSize: '14pt',
            maxLines: Infinity,
            minLines: 10
        });

        // Set Default Code
        codeEditor.setValue(defaultCode);
    }
}

// Events
executeCodeBtn.addEventListener('click', () => {
    // Get input from the code editor
    const userCode = codeEditor.getValue();

    $(".output-pre").text("Compiling! please wait...");
    $(".code-output-container").css("display", "flex");
    $("#run-code-loader").css("display", "block");


    // Run the user code
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var raw = JSON.stringify({
        "script": userCode,
        "language": "python3",
        "versionIndex": "0",
        "clientId": "3545c96ab42763542742f21089751e78",
        "clientSecret": "a1f82406e83733109dd55b9415627f5fc9c081b013e07c9297976488013eb5d1"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    fetch("https://cors-anywhere.herokuapp.com/https://api.jdoodle.com/v1/execute", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Something went wrong');
        })
        .then(result => {
            $(".output-pre").text(JSON.parse(result).output);
            $("#run-code-loader").css("display", "none");
        })
        .catch(error => {
            $(".output-pre").text("Server down! Please try again after some time");
            $("#run-code-loader").css("display", "none");
        });
});


themeButton.addEventListener('click', () => {
    if (currTheme == "day") {
        codeEditor.setTheme("ace/theme/tomorrow_night_bright");
        $("#themeButton").attr("title", "Light Mode")
        $("#themeButton").attr("class", "gfg-icon padding-2px code-sidebar-button light-editor-button gfg-icon_light-toggle")

        currTheme = "night";
    } else {
        codeEditor.setTheme("ace/theme/crimson_editor");

        $('#themeButton').attr("title", "Dark Mode")
        $("#themeButton").attr("class", "gfg-icon gfg-icon_dark-toggle padding-2px code-sidebar-button dark-editor-button")
        currTheme = "day";
    }
})

copyCodeButton.addEventListener('click', () => {
    var copyText = codeEditor.getValue();
    navigator.clipboard.writeText(copyText);

    var toast = document.getElementById("snackbar");
    toast.className = "show";

    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
})

outPutIcon.addEventListener('click', () => {
    $("#run-code-loader").css("display", "none");
    $(".code-output-container").css("display", "none");
})
editorLib.init();