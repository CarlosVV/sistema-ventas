
jQuery(document).ready(function ($) {
    $(window).resize(function () {
        $("#table-1").DataTable().columns.adjust().draw();
    });

})

function getConvenios(nroPagina) {
    if (nroPagina > nroPaginas) {
        var mensaje = "Ingrese una página válida";
        var obj = {
            "mensaje": mensaje
        }
        $("#numeroPag").val("0");
        $.ajax({
            type: "POST",
            url: rutaProyecto + 'Home/ObtenerAlerta',
            data: { mensaje: JSON.stringify(mensaje) },
            success: function (mensaje) {
                $("body").append("<div id='DivAlerta'></div>");
                $("#DivAlerta").html(mensaje);
                $('#alerta').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $("#imagenCarga").hide();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            },
            error: function (xhr, status, error) {
                $("#DivErrores").html(xhr.responseText);
                $('#Errores').modal("show");
                $("#imagenCarga").hide();
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }
        });
    }
    else {
        leer = true;
        var obj = {
            "nroPagina": nroPagina,
            "objConvenio": {
                "sFechaInicial": fechainicial,
                "sFechaFinal": fechafinal,
                "sTipo": combotipo,
                "sEstado": comboestado,
                "sSucursal": combosucursal
            }
        }

        $.ajax({
            type: 'POST',
            url: rutaProyecto + 'Home/ObtenerConvenios',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(obj),
            success: function (json) {
                if (json == "PaginaIncorrecta") {
                    var mensaje = "Ingrese una página válida";
                    var obje = {
                        "mensaje": mensaje
                    }
                    $("#numeroPag").val("0");
                    $("#numeroPaginas").text("de 0");
                    reconstruirGrilla();
                    $.ajax({
                        type: "POST",
                        data: JSON.stringify(obje),
                        url: rutaProyecto + "Home/ObtenerAlerta",
                        success: function (mensaje) {
                            $("body").append("<div id='DivAlerta'></div>");
                            $("#DivAlerta").html(mensaje);
                            $('#alerta').modal({
                                backdrop: 'static',
                                keyboard: false
                            });
                            $("#imagenCarga").hide();
                            $("html, body").animate({ scrollTop: 0 }, "slow");
                        },
                        error: function (xhr, status, error) {
                            $("#DivErrores").html(xhr.responseText);
                            $('#Errores').modal("show");
                            $("#imagenCarga").hide();
                            $("html, body").animate({ scrollTop: 0 }, "slow");
                        }
                    });
                }
                else {


                    $('#table-1').DataTable().destroy();

                    var tableContainer = $("#table-1");
                    tableContainer.dataTable({
                        dom: 'Zlfrtip',
                        "bSortCellsTop": true,
                        "processing": true,
                        "paging": false,
                        "info": false,
                        //"scrollY": "69vh",
                        "scrollCollapse": true,
                        "filter": false,
                        "columns": [
                           { "width": "5%", "data": "sSucursal" },
                           { "width": "5%", "data": "nombreSucursal" },
                           { "width": "5%", "data": "numeroCliente" },
                           { "width": "5%", "data": "opcionConvenio" },
                           { "width": "5%", "data": "nombreConvenio" },
                           { "width": "5%", "data": "estadoConvenio" },
                           { "width": "5%", "data": "estadoDescripcion" },
                           { "width": "5%", "data": "deudaOrigen", "sClass": "rigth" },
                           { "width": "5%", "data": "deudaExtra", "sClass": "rigth" },
                           { "width": "5%", "data": "excesoDeuda", "sClass": "rigth" },
                           { "width": "5%", "data": "deudaConvenida", "sClass": "rigth" },
                           { "width": "5%", "data": "valorCuotaInicial", "sClass": "rigth" },
                           { "width": "5%", "data": "valorCuota", "sClass": "rigth" },
                           { "width": "5%", "data": "numeroTotalCuotas" },
                           { "width": "5%", "data": "numeroUltimaCuota" },
                           { "width": "5%", "data": "sFechaCreacion" },
                           { "width": "5%", "data": "sFechaTermino" },
                           { "width": "5%", "data": "sRol" },
                           { "width": "5%", "data": "sRolDescripcion" }
                       ],
                        "oLanguage": {
                            "sSearch": "Buscar:",
                            "sEmptyTable": "No hay datos disponibles en la tabla",
                            "sZeroRecords": "No se encontró ningún elemento"
                        },
                        data: json,

                        "bStateSave": true,

                        //Responsive Settings
                        bAutoWidth: false,
                        fnPreDrawCallback: function () {
                            // Initialize the responsive datatables helper once.
                            if (!responsiveHelper) {
                                responsiveHelper = new ResponsiveDatatablesHelper(tableContainer, breakpointDefinition);

                            }
                        },
                        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                            responsiveHelper.createExpandIcon(nRow);

                        },
                        fnDrawCallback: function (oSettings) {
                            responsiveHelper.respond();

                        }
                    });

                    $("#imagenCarga").hide();
                    $("html, body").animate({ scrollTop: 0 }, "slow");

                    $("#table-1").DataTable().columns.adjust().draw();
                    $(".dataTables_scrollBody").height("auto");
                    $(".tabla").height("auto");
                    $("#numeroPag").val(nroPagina);
                    $("#numeroPaginas").text("de " + nroPaginas);
                }
            },
            error: function (xhr, status, error) {
                $("#DivErrores").html(xhr.responseText);
                $('#Errores').modal("show");
                $("#imagenCarga").hide();
            }
        });
    }

}

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

