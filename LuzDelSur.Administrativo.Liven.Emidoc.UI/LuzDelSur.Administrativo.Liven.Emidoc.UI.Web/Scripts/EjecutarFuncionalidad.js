// Ejecución de funcionalidades de los botones laterales
var associativeArray = {};
window.onload = function () {
    function receiveMessage(e) {
        if (e.data.text == "Limpiar") {
            alert("presionaste limpiar");
        }
        if (e.data.text == "Leer") {
            alert("presionaste Leer");
        }
    }
    window.addEventListener("Message", receiveMessage);
} 
function validaFechaDDMMAAAA(fecha) {
    var dtCh = "/";
    var minYear = 1900;
    var maxYear = 2100;
    function isInteger(s) {
        var i;
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (((c < "0") || (c > "9"))) return false;
        }
        return true;
    }
    function stripCharsInBag(s, bag) {
        var i;
        var returnString = "";
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (bag.indexOf(c) == -1) returnString += c;
        }
        return returnString;
    }
    function daysInFebruary(year) {
        return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
    }
    function DaysArray(n) {
        for (var i = 1; i <= n; i++) {
            this[i] = 31
            if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30 }
            if (i == 2) { this[i] = 29 }
        }
        return this
    }
    function isDate(dtStr) {
        var daysInMonth = DaysArray(12)
        var pos1 = dtStr.indexOf(dtCh)
        var pos2 = dtStr.indexOf(dtCh, pos1 + 1)
        var strDay = dtStr.substring(0, pos1)
        var strMonth = dtStr.substring(pos1 + 1, pos2)
        var strYear = dtStr.substring(pos2 + 1)
        strYr = strYear
        if (strDay.charAt(0) == "0" && strDay.length > 1) strDay = strDay.substring(1)
        if (strMonth.charAt(0) == "0" && strMonth.length > 1) strMonth = strMonth.substring(1)
        for (var i = 1; i <= 3; i++) {
            if (strYr.charAt(0) == "0" && strYr.length > 1) strYr = strYr.substring(1)
        }
        month = parseInt(strMonth)
        day = parseInt(strDay)
        year = parseInt(strYr)
        if (pos1 == -1 || pos2 == -1) {
            return false
        }
        if (strMonth.length < 1 || month < 1 || month > 12) {
            return false
        }
        if (strDay.length < 1 || day < 1 || day > 31 || (month == 2 && day > daysInFebruary(year)) || day > daysInMonth[month]) {
            return false
        }
        if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
            return false
        }
        if (dtStr.indexOf(dtCh, pos2 + 1) != -1 || isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
            return false
        }
        return true
    }
    if (isDate(fecha)) {
        return true;
    } else {
        return false;
    }
}
function CambioChecked() {   
        if (document.getElementById('chtActivo').checked == false) {
            $('#cboBanco').attr('disabled', 'disabled');
            $('#txtCuentaCorriente').attr('disabled', 'disabled');
            $('#txtFechaActivacion').attr('disabled', 'disabled');
            $('#txtBanco').attr('disabled', 'disabled');
            $('#cboEntidad').attr('disabled', 'disabled');
            $("#txtFechaDesactivacion").focus();
        } else {
            $('#cboBanco').removeAttr('disabled');
            $('#txtCuentaCorriente').removeAttr('disabled');
            $('#txtFechaActivacion').removeAttr('disabled');
            $('#txtBanco').removeAttr('disabled');
            $('#cboEntidad').removeAttr('disabled');
            $("#txtBanco").focus();
        }
}
function Banco(Seleccion) {
    Bloquear();
    $.ajax({
        type: 'POST',
        url: rutaProyecto + 'Home/CargaBanco',
        contentType: 'application/json; charset=utf-8',
        success: function (json) {
            if (json != "") {
                mensajeEjemplo = json;
                var i;
                var valores = mensajeEjemplo;
                var Imprimir = "";
                    Imprimir = Imprimir + "<option id='id0' style='text-align:center;' value='0'>" + " " + "</option>";
//                }
                var codigo = "";
                for (i = 0; i < valores.listBeConsultaTabla.length; i++) {
                    if (valores.listBeConsultaTabla[i].codigo == Seleccion && Seleccion != "") {
                        Imprimir = Imprimir + "<option id='id" + valores.listBeConsultaTabla[i].codigo + "' style='text-align:center;' value='" + valores.listBeConsultaTabla[i].codigo + "' selected>" + valores.listBeConsultaTabla[i].descripcion + "</option>";
                        if (codigo == "") {
                            codigo = valores.listBeConsultaTabla[i].codigo + ",";
                        } else {
                            codigo = codigo + valores.listBeConsultaTabla[i].codigo + ",";
                        }
                    } else {
                        Imprimir = Imprimir + "<option  id='id" + valores.listBeConsultaTabla[i].codigo + "'style='text-align:center;' value='" + valores.listBeConsultaTabla[i].codigo + "'>" + valores.listBeConsultaTabla[i].descripcion + "</option>";
                        if (codigo == "") {
                            codigo = valores.listBeConsultaTabla[i].codigo + ",";
                        } else {
                            codigo = codigo + valores.listBeConsultaTabla[i].codigo + ",";
                        }
                    }
                }
                $("#cboEntidad").html(Imprimir);
                $("#hfA").val(codigo);
                $("#hdControlFocus").val('txtNumeroCliente');
                Desbloquear();
            }
            else {
                mensajeEjemplo = "No hubo respuesta";
                $("#mensajeOculto").text(mensajeEjemplo);
                $("#hdControlFocus").val('txtNumeroCliente');
                Desbloquear();
            }
        },
        error: function (xhr, status, error) {
            $("#DivErrores").html(xhr.responseText);
            $('#Errores').modal("show");
            $("#imagenCarga").hide();
            $("#hdControlFocus").val('txtNumeroCliente');
            Desbloquear();
        }
    });
}
function Bloquear() {
    $("#DivContente").css({ 'display': 'none' });
    $("#DivCargando").css({ 'display': 'block' });
    
}
function Desbloquear() {
    $("#DivContente").css({ 'display': 'block' });
    $("#DivCargando").css({ 'display': 'none' });
    $('#' + $("#hdControlFocus").val()).focus();
}
function CargaPagoAutomatico() {
    var NumeroCliente = $('#txtNumeroCliente').val();
    var obj = { 
            "NumeroCliente": NumeroCliente         
    }
        Bloquear();
        $.ajax({
            type: 'POST',
            url: rutaProyecto + 'Home/CargaCuentaBanco',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(obj),
            success: function (json) {
                if (json != "") {
                   
                    $("#hfValidacion").val('');
                    $('#txtFechaActivacion').mask('00/00/0000', { placeholder: "__/__/____" });
                    $('#txtFechaDesactivacion').mask('00/00/0000', { placeholder: "__/__/____" });
                    if (json != "") {
                        if (json[0].EstatusTX == "1" && json.length == 1 && json[0].CodEntidad == "") {                            
                            $("#cboEntidad").val("0");

                            var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";
                            
                            var salto = "<br/>";
                            var mensaje = "<p>Cliente no existe en maestro Maeaut.</p>";
                            var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                            $(".modal-smm").css('width', '320px');
                            $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                            $("#FrmValidacion").modal("show");
                            document.getElementById('chtActivo').checked = true;
                            $('#btnLeer').attr('disabled', 'disabled');
                            $('#btnActualizar').html('Ingresar');
                            $('#txtNumeroCliente').attr('disabled', 'disabled');
                            $('#hfidCliente').val($('#txtNumeroCliente').val());
                            $('#cboEntidad').removeAttr('disabled');
                            $('#txtBanco').removeAttr('disabled');
                            $('#txtCuentaCorriente').removeAttr('disabled');
                            $('#txtFechaActivacion').removeAttr('disabled');
                            $('#txtFechaDesactivacion').removeAttr('disabled');
                            $('#btnActualizar').removeAttr('disabled');
                            $('#btnCancelar').html('Cancelar');
                            $("#txtNumeroCliente").val(json[0].NumeroCliente);
                            $("#lblRutaCliente").html(json[0].Sector + "  " + json[0].Zona + "  " + json[0].CorrelativoRuta);
                            $("#lblNombreCliente").html(json[0].Nombre);
                            $("#hfValidacion").val('txtBanco');
                            $("#hdControlFocus").val('txtBanco');
                            Desbloquear();
                            return;
                        }
                        if (json[0].EstatusTX == "-1" && json[0].CodEntidad == "") {

                            var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";

                            var salto = "<br/>";
                            var mensaje = "<p>Error en Carga de Cliente.</p>";
                            var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                            $(".modal-smm").css('width', '250px');
                            $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                            $("#FrmValidacion").modal("show");
                            document.getElementById('chtActivo').checked = false;
                            $('#btnLeer').removeAttr('disabled');
                            $('#btnActualizar').html('Ingresar');
                            $('#btnActualizar').attr('disabled', 'disabled');
                            $('#txtBanco').attr('disabled', 'disabled');
                            $('#chtActivo').attr('disabled', 'disabled');
                            $('#hfidCliente').val('');
                            $('#txtCuentaCorriente').val('');
                            $('#txtCuentaCorriente').attr('disabled', 'disabled');
                            $('#cboEntidad').val('0');
                            $('#cboEntidad').attr('disabled', 'disabled');
                            $('#txtBanco').val('');
                            $('#txtBanco').val('');
                            $('#txtBanco').attr('disabled', 'disabled');
                            $('#txtBanco').attr('disabled', 'disabled');
                            $('#txtFechaActivacion').html('');
                            $('#txtFechaActivacion').attr('disabled', 'disabled');
                            $('#txtFechaDesactivacion').html('');
                            $('#txtFechaDesactivacion').attr('disabled', 'disabled');
                            $('#btnCancelar').html('Cerrar');
                            $("#lblRutaCliente").html('');
                            $("#lblNombreCliente").html('');
                            $('#txtNumeroCliente').val('');
                            $("#hdControlFocus").val('txtNumeroCliente');
                            Desbloquear();
                            return;
                        }
                        if (json[0].EstatusTX == "0" && json[0].CodEntidad == "") {
                            var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";

                            var salto = "<br/>";
                            var mensaje = "<p>Cliente no existe en maestro Cliente.</p>";
                            var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                            $(".modal-smm").css('width', '300px');
                            $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                            $("#FrmValidacion").modal("show");
                            document.getElementById('chtActivo').checked = false;
                            $('#btnLeer').removeAttr('disabled');
                            $('#btnActualizar').html('Ingresar');
                            $('#btnActualizar').attr('disabled', 'disabled');
                            $('#txtBanco').attr('disabled', 'disabled');
                            $('#chtActivo').attr('disabled', 'disabled');
                            $('#hfidCliente').val('');
                            $('#txtCuentaCorriente').val('');
                            $('#txtCuentaCorriente').attr('disabled', 'disabled');
                            $('#cboEntidad').val('0');
                            $('#cboEntidad').attr('disabled', 'disabled');
                            $('#txtBanco').val('');
                            $('#txtBanco').val('');
                            $('#txtBanco').attr('disabled', 'disabled');
                            $('#txtBanco').attr('disabled', 'disabled');
                            $('#txtFechaActivacion').html('');
                            $('#txtFechaActivacion').attr('disabled', 'disabled');
                            $('#txtFechaDesactivacion').html('');
                            $('#txtFechaDesactivacion').attr('disabled', 'disabled');
                            $('#btnCancelar').html('Cerrar');
                            $("#lblRutaCliente").html('');
                            $("#lblNombreCliente").html('');
                            $('#txtNumeroCliente').val('');
                            $("#hdControlFocus").val('txtNumeroCliente');
                            Desbloquear();
                            return;
                        }
                        if (json.length == 1 && json[0].EstatusTX == "-1") {
                            var imagen = "<img src='" + rutaProyecto + "iconos/Cancelado.png'/>";


                            $("#Exito_").css('display', 'none');
                            $("#Adventencia_").css('display', 'block');

                            var salto = "<br/>";
                            var mensaje = "<p>Error en Carga de Cliente.</p>";
                            var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                            $(".modal-smm").css('width', '250px');
                            $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                            $("#FrmValidacion").modal("show");
                            Desbloquear();
                            return;
                        }
                        $('#hfidCliente').val($('#txtNumeroCliente').val());
                        $('#txtNumeroCliente').attr('disabled', 'disabled');
                        $('#btnLeer').attr('disabled', 'disabled');
                        $('#cboEntidad').removeAttr('disabled');
                        $('#txtBanco').removeAttr('disabled');
                        $('#chtActivo').removeAttr('disabled');
                        $('#txtCuentaCorriente').removeAttr('disabled');
                        $('#txtFechaActivacion').removeAttr('disabled');
                        $('#txtFechaDesactivacion').removeAttr('disabled');
                        $('#btnActualizar').removeAttr('disabled');
                        $('#btnCancelar').html('Cancelar');
                        $("#txtNumeroCliente").val(json[0].NumeroCliente);
                        $("#lblRutaCliente").html(json[0].Sector + "  " + json[0].Zona + "  " + json[0].CorrelativoRuta);
                        $("#lblNombreCliente").html(json[0].Nombre);
                        $("#txtCuentaCorriente").val(json[0].CodCuenta);
                        $("#txtFechaActivacion").val(json[0].FechaActivacion);
                        $("#txtFechaDesactivacion").val(json[0].FechaDesactivacion);
                        if (json[0].CodEntidad == "0") {
                            $('#chtActivo').attr('disabled', 'disabled');
                            document.getElementById('chtActivo').checked = true;
                            if (json.length == 1 && json[0].EstatusTX == "0") {
                                var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";

                                var salto = "<br/>";
                                var mensaje = "<p>Cliente no existe en maestro Cliente.</p>";
                                var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                                $(".modal-smm").css('width', '300px');
                                $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                                $("#FrmValidacion").modal("show");
                                $("#hdControlFocus").val("txtBanco");
                                Desbloquear();
                                return;
                            }
                        } else {//Si tiene pago Automatico                        
                            $("#txtBanco").val(json[0].CodEntidad);
                            $("#cboEntidad").val(json[0].CodEntidad.toString());
                            $('#btnLeer').attr('disabled', 'disabled');
                            $('#btnActualizar').html('Actualizar');
                            var ClavePagAut = "";
                            if (json[0].ClavePagAut == "M") {
                                ClavePagAut = "A";
                            } else {
                                ClavePagAut = "B";
                            }
                            $('#chtActivo').removeAttr('disabled');
                            if (json[0].Estado == "A") {
                                $('#chtActivo').prop("checked", "checked");
                                $("#hdControlFocus").val("txtBanco");
                            } else {
                                document.getElementById('chtActivo').checked = false;
                                $('#chtActivo').prop("checked");

                                $('#txtBanco').attr('disabled', 'disabled');
                                $('#cboEntidad').attr('disabled', 'disabled');
                                $('#txtCuentaCorriente').attr('disabled', 'disabled');
                                $('#txtFechaActivacion').attr('disabled', 'disabled');
                                $("#hdControlFocus").val("txtFechaDesactivacion");
                            }
                            $('#ClavePagAut').val(ClavePagAut);
                            if (document.getElementById('chtActivo').checked == false) {
                                $("#Calendario").css({ "display": "none" });
                                $("#hdControlFocus").val("txtFechaDesactivacion");                              

                            }
                        }
                    }
                    Desbloquear();
                  
                }
                else {
                    mensajeEjemplo = "No hubo respuesta";
                    $("#mensajeOculto").text(mensajeEjemplo);
                    Desbloquear();
                }
            },
            error: function (xhr, status, error) {
                $("#DivErrores").html(xhr.responseText);
                $('#Errores').modal("show");
                $("#imagenCarga").hide();
                Desbloquear();
            }
        });
  
}
function GuardarPagoAutomatico() {
    var MVC;
    var CodEntidad;
    var cboBanco;
    var Estado;
    var CodCuenta;
    var FechaActivacion;
    var FechaDesactivacion;
    var NumeroCliente;
    var ClavePagAut;
    var LinkUrl;
    var Text;
    var TextError;
    var objJson;
    if (document.getElementById('chtActivo').checked == true) {
        if ($('#txtBanco').val() == "" || $('#cboEntidad').val() == "0") {
            var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";

            var salto = "<br/>";
            var mensaje = "<p>Codigo de banco en blanco.</p>";
            var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
            $(".modal-smm").css('width', '250px');
            $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
            $("#FrmValidacion").modal("show");
            $("#hdControlFocus").val("txtBanco");            
            return;
        }
        if ($('#txtCuentaCorriente').val() == "") {
            var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";
            var salto = "<br/>";
            var mensaje = "<p>Ingrese código de cuenta.</p>";
            var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
            $(".modal-smm").css('width', '250px');
            $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
            $("#FrmValidacion").modal("show");
            $("#hdControlFocus").val("txtCuentaCorriente");
            return;
        }
        if ($('#txtFechaActivacion').val() == "") {
            var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";
            var salto = "<br/>";
            var mensaje = "<p>Fecha de activación en blanco.</p>";
            var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
            $(".modal-smm").css('width', '300px');
            $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
            $("#FrmValidacion").modal("show");
            $("#hdControlFocus").val("txtFechaActivacion");
            return;
        }
        if (validaFechaDDMMAAAA($('#txtFechaActivacion').val()) == false) {
            var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";


            var salto = "<br/>";
            var mensaje = "<p>Error en fecha activación.</p>";
            var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
            $(".modal-smm").css('width', '250px');
            $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
            $("#FrmValidacion").modal("show");
            $("#hdControlFocus").val("txtFechaActivacion");
            return;
        }
        var FecActUno = $('#txtFechaActivacion').val();
        var FeAc = FecActUno.split("/");
        FecActUno = FeAc[2] + "/" + FeAc[1] + "/" + FeAc[0];
        if ($('#txtFechaDesactivacion').val() != "") {
            if (validaFechaDDMMAAAA($('#txtFechaDesactivacion').val()) == false) {
                var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";

                var salto = "<br/>";
                var mensaje = "<p>Error en fecha desactivación.</p>";
                var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                $(".modal-smm").css('width', '350px');
                $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                $("#FrmValidacion").modal("show");
                $("#txtFechaDesactivacion").val('');
                $("#hdControlFocus").val("txtFechaDesactivacion");
                return;
            }
            var FecActDos = $('#txtFechaDesactivacion').val();
            var FeAc = FecActDos.split("/");
            FecActDos = FeAc[2] + "/" + FeAc[1] + "/" + FeAc[0];
            if (Date.parse(FecActUno) <= Date.parse(FecActDos)) {
            } else {
                var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";

                var salto = "<br/>";
                var mensaje = "<p>La fecha de desactivación debe ser mayor a la  fecha de activación.</p>";
                $(".modal-smm").css('width', '500px');
                var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                $("#FrmValidacion").modal("show");
                $("#hdControlFocus").val("txtFechaDesactivacion");
                return;
            }
        }
        $('#btnCancelar').html('Cerrar');
    }else{
            if ($('#txtFechaDesactivacion').val() == "") {
                var imagen = "<img src='" + rutaProyecto + "iconos/Cancelado.png'/>";

                var salto = "<br/>";
                var mensaje = "<p>Fecha de desactivación en blanco.</p>";
                var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                $(".modal-smm").css('width', '290px');
                $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                $("#FrmValidacion").modal("show");
                $("#hdControlFocus").val("txtFechaDesactivacion");
                return;
            }
            if ($('#txtBanco').val() == "" || $('#cboEntidad').val()=="0") {
                var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";

                var salto = "<br/>";
                var mensaje = "<p>Codigo de banco en blanco.</p>";
                var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                $(".modal-smm").css('width', '250px');
                $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                $("#FrmValidacion").modal("show");
                $("#hdControlFocus").val("txtBanco");
                return;
            }
            if ($('#txtCuentaCorriente').val() == "") {
                var imagen = "<img src='" + rutaProyecto + "iconos/Cancelado.png'/>";

                var salto = "<br/>";
                var mensaje = "<p>Ingrese código de cuenta.</p>";
                var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                $(".modal-smm").css('width', '250px');
                $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                $("#FrmValidacion").modal("show");
                $("#hdControlFocus").val("txtCuentaCorriente");
                return;
            }
            if ($('#txtFechaActivacion').val() == "") {
                var imagen = "<img src='" + rutaProyecto + "iconos/Cancelado.png'/>";

                var salto = "<br/>";
                var mensaje = "<p>Fecha de activación en blanco.</p>";
                var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                $(".modal-smm").css('width', '300px');
                $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                $("#FrmValidacion").modal("show");
                $("#hdControlFocus").val("txtFechaActivacion");
                return;
            }
            if (validaFechaDDMMAAAA($('#txtFechaActivacion').val()) == false) {
                var imagen = "<img src='" + rutaProyecto + "iconos/Cancelado.png'/>";

                var salto = "<br/>";
                var mensaje = "<p>Error en fecha activación.</p>";
                var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                $(".modal-smm").css('width', '250px');
                $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                $("#FrmValidacion").modal("show");
                $("#hdControlFocus").val("txtFechaActivacion");
                return;
            }
            if (document.getElementById('chtActivo').checked == false) {
               
            } else {
                $('#txtFechaActivacion').removeAttr('disabled');
            }              
            var FecActUno = $('#txtFechaActivacion').val();
            var FeAc = FecActUno.split("/");
            FecActUno = FeAc[2] + "/" + FeAc[1] + "/" + FeAc[0];
            if ($('#txtFechaDesactivacion').val() != "") {
                if (validaFechaDDMMAAAA($('#txtFechaDesactivacion').val()) == false) {
                    var imagen = "<img src='" + rutaProyecto + "iconos/Warningsign.png'/>";

                    var salto = "<br/>";
                    var mensaje = "<p>Error en fecha desactivación.</p>";
                    var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                    $(".modal-smm").css('width', '350px');
                    $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                    $("#FrmValidacion").modal("show");
                    $("#txtFechaDesactivacion").val('');
                    $("#hdControlFocus").val("txtFechaDesactivacion");
                    return;
                }
                var FecActDos = $('#txtFechaDesactivacion').val();
                var FeAc = FecActDos.split("/");
                FecActDos = FeAc[2] + "/" + FeAc[1] + "/" + FeAc[0];
                if (Date.parse(FecActUno) > Date.parse(FecActDos)) {
                    var imagen = "<img src='" + rutaProyecto + "iconos/Cancelado.png'/>";


                    var salto = "<br/>";
                    var mensaje = "<p>La fecha de desactivación debe ser mayor a la  fecha de activación.</p>";
                    $(".modal-smm").css('width', '500px');
                    var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                    $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                    $("#FrmValidacion").modal("show");
                    $("#hdControlFocus").val("txtFechaDesactivacion");
                    return;
                }
            }
    }
        if ($('#btnActualizar').html() == "Actualizar") {
            if (document.getElementById('chtActivo').checked == false) {
                Text = "Cliente eliminado.";
                TextError = "Error, cliente no eliminado.";
            } else {
                Text = "Cliente actualizado.";
                TextError = "Error, cliente no actualizado.";
            }  
            if ($('#hfClavePagAut').val() =="A" )
            {
            fstrClavePagaut = "M";
            }else{
            fstrClavePagaut = "N";
        }     

             MVC="Home/Actualizar";
             CodEntidad = $('#cboEntidad').val();
             if (document.getElementById('chtActivo').checked == false) {
                 Estado = "D";
             } else {
                 Estado = "A";
             }
             CodCuenta=$('#txtCuentaCorriente').val() ;
             FechaActivacion=$('#txtFechaActivacion').val() ;
             FechaDesactivacion=$('#txtFechaDesactivacion').val();
             NumeroCliente=$('#hfidCliente').val();
             ClavePagAut = fstrClavePagaut;

             var obj = {
                 objBEClientePac: {
                     "CodEntidad": CodEntidad,
                     "Estado": Estado,
                     "CodCuenta": CodCuenta,
                     "FechaActivacion": FechaActivacion,
                     "FechaDesactivacion": FechaDesactivacion,
                     "ClavePagAut": ClavePagAut,
                     "NumeroCliente": NumeroCliente
                 }
             }
             var objJson = obj;
             LinkUrl = rutaProyecto + MVC ;

             $('#txtNumeroCliente').val('');
             $('#txtNumeroCliente').removeAttr('disabled');
             $('#lblRutaCliente').html('');
             $('#lblNombreCliente').html('');
             $('#txtBanco').val('');
             $('#cboEntidad').val('0');
             $('#txtCuentaCorriente').val('');
             $('#txtCuentaCorriente').val('');
             $('#txtFechaActivacion').val('');
             $('#txtFechaDesactivacion').val('');
             document.getElementById('chtActivo').checked = false;
             $('#btnLeer').removeAttr('disabled');
             $('#btnActualizar').attr('disabled', 'disabled');
             $('#hfidCliente').val('');
             $('#chtActivo').attr('disabled', 'disabled');
             $('#txtBanco').attr('disabled', 'disabled');
             $('#cboEntidad').attr('disabled', 'disabled');
             $('#txtCuentaCorriente').attr('disabled', 'disabled');
             $('#txtCuentaCorriente').attr('disabled', 'disabled');
             $('#txtFechaActivacion').attr('disabled', 'disabled');
             $('#txtFechaDesactivacion').attr('disabled', 'disabled');             
         } else {
             Text = "Cliente ingresado.";
             TextError = "Error, cliente no ingresado.";
             MVC = "Home/Registrar";
             CodEntidad = $('#cboEntidad').val();
             if (document.getElementById('chtActivo').checked == false) {
                 Estado = "D";
             } else {
                 Estado = "A";
             }
             CodCuenta = $('#txtCuentaCorriente').val();
             FechaActivacion = $('#txtFechaActivacion').val();
             FechaDesactivacion = $('#txtFechaDesactivacion').val();
             NumeroCliente = $('#hfidCliente').val();
             ClavePagAut = ' ';//B
             var obj = {
                 objBEClientePac: {
                     "CodEntidad": CodEntidad,
                     "Estado": Estado,
                     "CodCuenta": CodCuenta,
                     "FechaActivacion": FechaActivacion,
                     "FechaDesactivacion": FechaDesactivacion,
                     "ClavePagAut": ClavePagAut,
                     "NumeroCliente": NumeroCliente
                 }
             }

             var objJson = obj;
             LinkUrl = rutaProyecto + MVC;
             $('#txtNumeroCliente').val('');
             $('#txtNumeroCliente').removeAttr('disabled');
             $('#lblRutaCliente').html('');
             $('#lblNombreCliente').html('');
             $('#txtBanco').val('');
             $('#cboEntidad').val('0');
             $('#txtCuentaCorriente').val('');
             $('#txtCuentaCorriente').val('');
             $('#txtFechaActivacion').val('');
             $('#txtFechaDesactivacion').val('');
             document.getElementById('chtActivo').checked = false;
             $('#btnLeer').removeAttr('disabled');
             $('#btnActualizar').attr('disabled', 'disabled');
             $('#hfidCliente').val('');
             $('#chtActivo').attr('disabled', 'disabled');
             $('#txtBanco').attr('disabled', 'disabled');
             $('#cboEntidad').attr('disabled', 'disabled');
             $('#txtCuentaCorriente').attr('disabled', 'disabled');
             $('#txtCuentaCorriente').attr('disabled', 'disabled');
             $('#txtFechaActivacion').attr('disabled', 'disabled');
             $('#txtFechaDesactivacion').attr('disabled', 'disabled');
         }

         Bloquear();
         $.ajax({
             type: 'POST',
             url: LinkUrl,
             contentType: 'application/json; charset=utf-8',
             data: JSON.stringify(objJson),
             success: function (json) {
                 if (json != "") {

                     mensajeEjemplo = json;
                     var valores = mensajeEjemplo;
                     if (valores[0].EstatusTX == "1") {
                         var imagen = "<img src='" + rutaProyecto + "iconos/Exito.png'/>";



                         $("#Exito_").css('display', 'none');
                         $("#Cancelar_").css('display', 'none');
                         $("#Adventencia_").css('display', 'none');

                         var salto = "<br/>";
                         var mensaje = "<p>" + Text + "</p>";
                         var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                         $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                         $(".modal-smm").css('width', '250px');
                         $("#FrmValidacion").modal("show");

                         $('#chtActivo').removeAttr('disabled');
                         $('#btnActualizar').html('Actualizar');
                     } else {
                         var imagen = "<img src='" + rutaProyecto + "iconos/Cancelado.png'/>";


                         var salto = "<br/>";
                         var mensaje = "<p>" + TextError + "</p>";
                         var boton = "<a class='btn btn-info' id='btnOk'>OK</a>";
                         $(".modal-smm").css('width', '250px');
                         $("#FrmValidacion .modal-body").html(imagen + salto + salto + mensaje);
                         $("#FrmValidacion").modal("show");
                         //focus cliente                  
                     }
                     $("#hdControlFocus").val("txtNumeroCliente");
                     Desbloquear();
                 }
                 else {
                     mensajeEjemplo = "No hubo respuesta";
                     $("#mensajeOculto").text(mensajeEjemplo);
                 }
             },
             error: function (xhr, status, error) {
                 $("#DivErrores").html(xhr.responseText);
                 $('#Errores').modal("show");
                 $("#imagenCarga").hide();
                 Desbloquear();
             }
         });
}