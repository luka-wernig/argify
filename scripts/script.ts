const znaki = ["+", "*", "-", "/"];
const indent = (str, count) => {
    let dent: string = " ";
    str.replace(/^/gm, dent.repeat(count));
}

let values = {
    name: "",
    def: "",
    type: "",
    required: "",
    description: "",
};
var lensIndex: number = 0;
var lens: number[] = [];
var elements = {}
// Sets values
window.onload = () => {
    console.log("Window loaded");

    elements = {
        name: <HTMLInputElement>document.getElementById("name"),
        def: <HTMLInputElement>document.getElementById("default"),
        type: <HTMLInputElement>document.getElementById("type"),
        required: <HTMLInputElement>document.getElementById("req"),
        description: <HTMLInputElement>document.getElementById("description"),
    };

    for(let i in elements){

        elements[i].addEventListener("keyup", () => {
            values[i] = elements[i].value;
            runCheck();
        })
        console.log(`Listener added for ${i}`);
    }
}

/* TODO: Functions:
            - Clear one (DONE)
            - Clear X
            - Clear index
*/

function clear_latest(){
    let text: string = document.getElementById("arg")!.innerHTML;
    let working_text = text.split(/\r?\n/);
    let ix = working_text.length-1;
    for(let i = 0; i < lens[lens.length-1]; i++){    

        working_text.splice(ix--, 1);
    }
    lens.splice(lens.length-1, 1);
    if(lensIndex > 0) lensIndex--;
    
    let output = working_text.toString();
    for(let i = 0; i < output.length; i++){
        if(output[i] == ','){
            output = replaceChar(i, output, '\n');
            if(output[i-1] == ','){
                output = output.substring(0, i-1);
                break;
                // output.concat("    '\n'");
            } 
        }
    }
    console.log(output);
    document.getElementById("arg")!.innerHTML = output;
    
}
function clear_x(){
    // get input for x
    // let x = input, let sum = 0;
    let text: string = document.getElementById("arg")!.innerHTML;
    let working_text = text.split(/\r?\n/);
    for(let i = lens.length; i >= 0; i--){

    }
}
function clear_index(){

}

function argify_set(name, def, type, req, description){

    if(req){
    document.getElementById("arg")!.innerHTML = 
    `
    ${name}:
    ${'\t'}description:
    ${'\t'}- ${description}
    ${'\t'}type: ${type}
    ${'\t'}default: ${def}
    ${'\t'}required: ${req}
    `;
    lens[lensIndex++] = 7;
    }
    else{
    document.getElementById("arg")!.innerHTML = 
    `
    ${name}:
    ${'\t'}description:
    ${'\t'}- ${description}
    ${'\t'}type: ${type}
    ${'\t'}default: ${def}
    `;
    lens[lensIndex++]= 6;
    }
}

function argify_plus(name, def, type, req, description){

    if(req != ""){
    document.getElementById("arg")!.innerHTML += 
    `
    ${name}:
    ${'\t'}description:
    ${'\t'}- ${description}
    ${'\t'}type: ${type}
    ${'\t'}default: ${def}
    ${'\t'}required: ${req}
    `;
    lens[lensIndex++] = 7;
    }
    else{
    document.getElementById("arg")!.innerHTML += 
    `
    ${name}:
    ${'\t'}description:
    ${'\t'}- ${description}
    ${'\t'}type: ${type}
    ${'\t'}default: ${def}
    `;
    lens[lensIndex++]= 6;
    }
}

function insertControl(control = 0){
    
    let req_true = (<HTMLInputElement>document.getElementById("req_switch")).checked;
    let req_false = (<HTMLInputElement>document.getElementById("not_req_switch")).checked;
    if(control == 1) req_true = true;
    if(control == 2) req_false = true;
    let usages = {}
    if((!req_true && !req_false)){
        document.getElementById("warnings")!.innerHTML =  "You must select one of the two options for inserting control";
        return
    }
    if(req_true){
        usages = {
            name: "Hello",
            def: "Hello user!",
            type: "str",
            required: "yes",
            description: "Greets the user to the webpage"
        }
    }
    else{
        usages = {
            name: "Hello",
            def: "Hello user!",
            type: "str",
            required: "",
            description: "Greets the user to the webpage",
        }
    }
    for(let i in elements){
        elements[i].value = usages[i]
        values[i] = usages[i]
    }
    runCheck();
}

function runCheck(){
    document.getElementById("warnings")!.innerHTML = `` ;
    for(let i in values){
        let el = values[i];
        if(el == "" && i != "required"){
            (<HTMLButtonElement>document.getElementById("argify_set"))!.disabled = true;
            (<HTMLButtonElement>document.getElementById("argify_plus"))!.disabled = true;
            document.getElementById("warnings")!.innerHTML +=  `The field (${i}) is empty.\n`;
        }
        else{
            (<HTMLButtonElement>document.getElementById("argify_set"))!.disabled = false;
            (<HTMLButtonElement>document.getElementById("argify_plus"))!.disabled = false;
        }
    }
}

function quickInsert(){
    insertControl(1);
    argify_plus(values.name, values.def, values.type, values.required, values.description);
    argify_plus(values.name, values.def, values.type, values.required, values.description);
    insertControl(2);
    argify_plus(values.name, values.def, values.type, values.required, values.description);    
}

function replaceChar(index: number, str: string, chr){
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

// TODO: Multiplication and division
function derivate(func){
    let nextExp = false
    let exp: number = 0
    let num: string = ""
    let res: string = ""
    for(let i in func){
        
        if(!isNaN(+i)){
            num.concat(i);
        }
        else if(i == "^"){
            nextExp = true
        }
        // TODO: Multidigit exponents
        else if(nextExp){
            exp = +i
            nextExp = false
            let num_num = +num
            num_num *= exp--
            res.concat(`${num_num}^${exp}`)
            exp = 0, num = ""
        }
        else if(i in znaki){
            exp = 0, num = ""
            res.concat(` ${i} `)
        }
    }
}