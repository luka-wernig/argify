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
var lensIndex = 0;
var lens = [];
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
            - Clear one (DONE)
            - Clear X
            - Clear index
*/
function clear_latest() {
    var text = document.getElementById("arg").innerHTML;
    var working_text = text.split(/\r?\n/);
    var ix = working_text.length - 1;
    for (var i = 0; i < lens[lens.length - 1]; i++) {
        working_text.splice(ix--, 1);
    }
    lens.splice(lens.length - 1, 1);
    if (lensIndex > 0)
        lensIndex--;
    var output = working_text.toString();
    for (var i = 0; i < output.length; i++) {
        if (output[i] == ',') {
            output = replaceChar(i, output, '\n');
            if (output[i - 1] == ',') {
                output = output.substring(0, i - 1);
                break;
                // output.concat("    '\n'");
            }
        }
    }
    console.log(output);
    document.getElementById("arg").innerHTML = output;
}
function clear_x() {
    // get input for x
    // let x = input, let sum = 0;
    var text = document.getElementById("arg").innerHTML;
    var working_text = text.split(/\r?\n/);
    for (var i = lens.length; i >= 0; i--) {
    }
}
function clear_index() {
}
function argify_set(name, def, type, req, description) {
    if (req) {
        document.getElementById("arg").innerHTML =
            "\n    ".concat(name, ":\n    ").concat('\t', "description:\n    ").concat('\t', "- ").concat(description, "\n    ").concat('\t', "type: ").concat(type, "\n    ").concat('\t', "default: ").concat(def, "\n    ").concat('\t', "required: ").concat(req, "\n    ");
        lens[lensIndex++] = 7;
    }
    else {
        document.getElementById("arg").innerHTML =
            "\n    ".concat(name, ":\n    ").concat('\t', "description:\n    ").concat('\t', "- ").concat(description, "\n    ").concat('\t', "type: ").concat(type, "\n    ").concat('\t', "default: ").concat(def, "\n    ");
        lens[lensIndex++] = 6;
    }
}
function argify_plus(name, def, type, req, description) {
    if (req != "") {
        document.getElementById("arg").innerHTML +=
            "\n    ".concat(name, ":\n    ").concat('\t', "description:\n    ").concat('\t', "- ").concat(description, "\n    ").concat('\t', "type: ").concat(type, "\n    ").concat('\t', "default: ").concat(def, "\n    ").concat('\t', "required: ").concat(req, "\n    ");
        lens[lensIndex++] = 7;
    }
    else {
        document.getElementById("arg").innerHTML +=
            "\n    ".concat(name, ":\n    ").concat('\t', "description:\n    ").concat('\t', "- ").concat(description, "\n    ").concat('\t', "type: ").concat(type, "\n    ").concat('\t', "default: ").concat(def, "\n    ");
        lens[lensIndex++] = 6;
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
function replaceChar(index, str, chr) {
    if (index > str.length - 1)
        return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
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
