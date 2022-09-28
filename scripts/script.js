var znaki = ["+", "*", "-", "/"];
var indent = function (str, count) {
    var dent = " ";
    str.replace(/^/gm, dent.repeat(count));
};
var values = {
    name: "",
    def: "",
    type: "",
    required: "",
    description: ""
};
var elements = {};
// Sets values
window.onload = function () {
    console.log("Window loaded");
    elements = {
        name: document.getElementById("name"),
        def: document.getElementById("default"),
        type: document.getElementById("type"),
        required: document.getElementById("req"),
        description: document.getElementById("description")
    };
    var _loop_1 = function (i) {
        elements[i].addEventListener("keyup", function () {
            values[i] = elements[i].value;
            runCheck();
        });
        console.log("Listener added for ".concat(i));
    };
    for (var i in elements) {
        _loop_1(i);
    }
};
/* TODO: Functions:
            - Clear one
            - Clear X
            - Clear index
*/
function clear_latest() {
    var text = document.getElementById("arg").innerHTML;
    var working_text = text.split(/\r?\n/);
    //console.log(working_text);
    for (var i = working_text.length - 2; i >= 0; i--) {
        // console.log(`"${working_text[i]}" <-- working text\n${i} <-- i, "${working_text[working_text.length-1]}" <-- goal`);
        // for(let i = 0; i < working_text[7].length; i++){
        //     let diff: boolean = (working_text[7][i] == working_text[working_text.length-1][i]);
        //     console.log(diff);
        //     if(!diff) console.log(`diff : [${working_text[7][i]}] [${working_text[working_text.length-1][i]}]`)
        // }
        if (working_text[i] == working_text[working_text.length - 1]) {
            delete working_text[i];
            break;
        }
        delete working_text[i];
    }
    console.log(working_text);
}
function clear_x() {
}
function clear_index() {
}
function argify_set(name, def, type, req, description) {
    if (req) {
        document.getElementById("arg").innerHTML =
            "\n    ".concat(name, ":\n    ").concat('\t', "description:\n    ").concat('\t', "- ").concat(description, "\n    ").concat('\t', "type: ").concat(type, "\n    ").concat('\t', "default: ").concat(def, "\n    ").concat('\t', "required: ").concat(req, "\n    ");
    }
    else {
        document.getElementById("arg").innerHTML =
            "\n    ".concat(name, ":\n    ").concat('\t', "description:\n    ").concat('\t', "- ").concat(description, "\n    ").concat('\t', "type: ").concat(type, "\n    ").concat('\t', "default: ").concat(def, "\n    ");
    }
}
function argify_plus(name, def, type, req, description) {
    if (req != "") {
        document.getElementById("arg").innerHTML +=
            "\n    ".concat(name, ":\n    ").concat('\t', "description:\n    ").concat('\t', "- ").concat(description, "\n    ").concat('\t', "type: ").concat(type, "\n    ").concat('\t', "default: ").concat(def, "\n    ").concat('\t', "required: ").concat(req, "\n    ");
    }
    else {
        document.getElementById("arg").innerHTML +=
            "\n    ".concat(name, ":\n    ").concat('\t', "description:\n    ").concat('\t', "- ").concat(description, "\n    ").concat('\t', "type: ").concat(type, "\n    ").concat('\t', "default: ").concat(def, "\n    ");
    }
}
function insertControl(control) {
    if (control === void 0) { control = 0; }
    var req_true = document.getElementById("req_switch").checked;
    var req_false = document.getElementById("not_req_switch").checked;
    if (control == 1)
        req_true = true;
    if (control == 2)
        req_false = true;
    var usages = {};
    if ((!req_true && !req_false)) {
        document.getElementById("warnings").innerHTML = "You must select one of the two options for inserting control";
        return;
    }
    if (req_true) {
        usages = {
            name: "Hello",
            def: "Hello user!",
            type: "str",
            required: "yes",
            description: "Greets the user to the webpage"
        };
    }
    else {
        usages = {
            name: "Hello",
            def: "Hello user!",
            type: "str",
            required: "",
            description: "Greets the user to the webpage"
        };
    }
    for (var i in elements) {
        elements[i].value = usages[i];
        values[i] = usages[i];
    }
    runCheck();
}
function runCheck() {
    document.getElementById("warnings").innerHTML = "";
    for (var i in values) {
        var el = values[i];
        if (el == "" && i != "required") {
            document.getElementById("argify_set").disabled = true;
            document.getElementById("argify_plus").disabled = true;
            document.getElementById("warnings").innerHTML += "The field (".concat(i, ") is empty.\n");
        }
        else {
            document.getElementById("argify_set").disabled = false;
            document.getElementById("argify_plus").disabled = false;
        }
    }
}
function quickInsert() {
    insertControl(1);
    argify_plus(values.name, values.def, values.type, values.required, values.description);
    argify_plus(values.name, values.def, values.type, values.required, values.description);
    insertControl(2);
    argify_plus(values.name, values.def, values.type, values.required, values.description);
}
// TODO: Multiplication and division
function derivate(func) {
    var nextExp = false;
    var exp = 0;
    var num = "";
    var res = "";
    for (var i in func) {
        if (!isNaN(+i)) {
            num.concat(i);
        }
        else if (i == "^") {
            nextExp = true;
        }
        // TODO: Multidigit exponents
        else if (nextExp) {
            exp = +i;
            nextExp = false;
            var num_num = +num;
            num_num *= exp--;
            res.concat("".concat(num_num, "^").concat(exp));
            exp = 0, num = "";
        }
        else if (i in znaki) {
            exp = 0, num = "";
            res.concat(" ".concat(i, " "));
        }
    }
}
