$("#Id").focus();
function validateData() {
    var IdVar = $("#Id").val();
    if (IdVar === "") {
        alert("Student ID Required Value");
        $("#Id").focus();
        return "";
    }
    var nameVar = $("#name").val();
    if (nameVar === "") {
        alert("Student Name is Required Value");
        $("#name").focus();
        return "";
    }
    var sal = $("#stuClass").val();
    if (sal === "") {
        alert("Student Salary is Required Value");
        $("#stuClass").focus();
        return "";
    }
    var hbd = $("#hbd").val();
    if (hbd === "") {
        alert("Student hbd is Required Value");
        $("#hbd").focus();
        return "";
    }
    var add = $("#add").val();
    if (add === "") {
        alert("Student add is Required Value");
        $("#add").focus();
        return "";
    }
    var edate = $("#edate").val();
    if (edate === "") {
        alert("Student edateion is Required Value");
        $("#edate").focus();
        return "";
    }
    var jsonStrObj = {
        id: IdVar,
        name: nameVar,
        salary:sal,
        hbd:hbd,
        add:add,
        edate:edate,
    };
    return JSON.stringify(jsonStrObj);
}

function getIdAsJsonObj(){
    var Id = $("#Id").val();
    var jsonStr = {
        id:Id
    };
    return JSON.stringify(jsonStr);
}

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no)
}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#name").val(record.name);
    $("#stuClass").val(record.salary);
    $("#hba").val(record.hba);
    $("#add").val(record.add);
    $("#edate").val(record.edateion);
}
function getEmp(){
    var IdJsonObj = getIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest("90932796|-31949278795505214|90948607", "STUDENT-TABLE", "SCHOOL-DB",IdJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,
        "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({ async: true });
    if(resJsonObj.status===400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#Id").focus();
    }
    else if(resJsonObj.status===200){
        $("#Id").prop("disabled",false);
        fillData(resJsonObj);

        $("#change").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#name").focus();
    }
}

function resetForm() {
    $("#Id").val("")
    $("#name").val("");
    $("#stuClass").val("");
    $("#hbd").val("");
    $("#add").val("");
    $("#edate").val("");
    $("#Id").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#Id").focus();
}


function saveData() {
    var jsonStr = validateData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90932796|-31949278795505214|90948607",
        jsonStr, "STUDENT-TABLE", "SCHOOL-DB");
    // alert(putReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#Id").focus();
}

function changeData() {
    $("#change").prop("disabled",true)
    var jsonStr = validateData();

    var updateReqStr = createUPDATERecordRequest("90932796|-31949278795505214|90948607",
        jsonStr, "STUDENT-TABLE", "SCHOOL-DB",localStorage.getItem("recno"));
    // alert(updateReqStr);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(updateReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#Id").focus();
}