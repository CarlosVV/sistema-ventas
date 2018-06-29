using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LuzdelSur.Plataforma.Explorador.Common;
using LuzDelSur.Administrativo.Liven.Emidoc.UI.Web.Clases;
using LuzdelSur.Plataforma.Explorador.WCFEntity.Contexto;
using LuzdelSur.Plataforma.Explorador.WCFEntity;
using System.IO;
using Newtonsoft.Json;
using System.Text;
using System.ServiceModel.Channels;
using LuzDelSur.Administrativo.Liven.Svc.WcfInterface.Entities;

namespace LuzDelSur.Administrativo.Liven.Emidoc.UI.Web.Controllers
{
    public class HomeController : AplicacionController
    {
        //TODO : 011 Copiar la región Error como está 
        #region Error

        private bool IsAjax(ExceptionContext filterContext) {
            return filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest";
        }

        protected override void OnException(ExceptionContext filterContext) {
            if (IsAjax(filterContext)) {
                filterContext.ExceptionHandled = true;
                filterContext.HttpContext.Response.Clear();
                filterContext.HttpContext.Response.ContentEncoding = Encoding.UTF8;
                filterContext.HttpContext.Response.HeaderEncoding = Encoding.UTF8;
                filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
                filterContext.HttpContext.Response.StatusCode = 400;
                var myobj = filterContext.Exception as System.ServiceModel.FaultException;
                if (myobj != null) {
                    MessageFault mf = myobj.CreateMessageFault();
                    if (mf.HasDetail) {
                        ExcepcionLDS e = mf.GetDetail<ExcepcionLDS>();
                        if (e != null) {
                            ViewBag.Path = Request.Url.Host;
                            filterContext.Result = View("../Errores/ErrorJsons", e);
                        }
                    }
                } else {
                    Exception e = filterContext.Exception;
                    ExcepcionLDS excLDS;
                    excLDS = new ExcepcionLDS() {
                        categoria = Convert.ToInt32(LuzdelSur.Plataforma.Explorador.WCFEntity.TipoErrorControlado.Grave)
                                                    ,
                        mensajeUsuario = "Error en el procesamiento de la solicitud"
                                                    ,
                        mensajeAplicacion = e.Message
                    };

                    ViewBag.Path = Request.Url.Host;
                    filterContext.Result = View("../Errores/ErrorJsons", excLDS);
                }

            } else {
                filterContext.ExceptionHandled = true;
                Exception e = filterContext.Exception;
                string controllerName = (string)filterContext.RouteData.Values["controller"];
                string actionName = (string)filterContext.RouteData.Values["action"];
                HandleErrorInfo model = new HandleErrorInfo(e, controllerName, actionName);
                ViewBag.Path = Request.Url.Host;
                filterContext.Result = PartialView("../Errores/ErrorVistas", model);


            }
        }

        #endregion
               
        public ActionResult Index(string tokenId) {
            if (GrabarSesion.VerificarSesion(tokenId)) {
                GrabarSesion.GuardarSesion(tokenId);
                MiContexto miContexto = (MiContexto)HttpContext.Session["MiContexto"];
                ViewBag.PathImagen = miContexto.AdministradorPaths.PathImagen;
                return View();
            } else {
                //TODO : 035 Lanzar una Excepción No Autorizado si no se ha validado
                ViewBag.Path = Request.Url.Host;
                return PartialView("../Errores/ErrorVentana", "ERROR 401 No Autorizado");
            }
        }

        public override void LanzarAplicacion(Informacion info) {
            System.Web.HttpContext.Current.Application[info.MiContexto.AdministradorSesion.Sesion.tokenId] = info;
        }

        public override void LanzarAplicacion(Informacion info, Dictionary<string, string> listadoParametro) {

        }
        
        public ActionResult ConsultarDocumentos(BEDocumentoConsultaRequest documentoRequest) {            
            
            MiContexto miContexto = (MiContexto)HttpContext.Session["MiContexto"];
            
            Proxy proxy = new Proxy(miContexto);
            
            List<BEDocumento> resp = proxy.BuscarDocumentos(documentoRequest);
            proxy.Cerrar();
            return Json(resp, JsonRequestBehavior.AllowGet);
        }
        /*
        [HttpPost]
        [JsonFilter(Param = "beClientePac", JsonDataType = typeof(BEClientePac))]
        public ActionResult CargaCuentaBanco(BEClientePac objBEClientePac) {
            List<BERespClientePac> Lista = new List<BERespClientePac>();
            MiContexto miContexto = (MiContexto)HttpContext.Session["MiContexto"];
            Proxy proxy = new Proxy(miContexto);
            Lista = proxy.BuscarPagosAutomaticosClientes(objBEClientePac);
            proxy.Cerrar();
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [JsonFilter(Param = "beClientePac", JsonDataType = typeof(BEClientePac))]
        public ActionResult Registrar(BEClientePac objBEClientePac) {
            List<BERespClientePac> Lista = new List<BERespClientePac>();
            MiContexto miContexto = (MiContexto)HttpContext.Session["MiContexto"];
            Proxy proxy = new Proxy(miContexto);
            objBEClientePac.FechaDesactivacion = objBEClientePac.FechaDesactivacion != null ? objBEClientePac.FechaDesactivacion : "";
            Lista = proxy.InsertarPagosAutomaticosClientes(objBEClientePac);
            proxy.Cerrar();
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [JsonFilter(Param = "beClientePac", JsonDataType = typeof(BEClientePac))]
        public ActionResult Actualizar(BEClientePac objBEClientePac) {
            List<BERespClientePac> Lista = new List<BERespClientePac>();
            objBEClientePac.FechaDesactivacion = objBEClientePac.FechaDesactivacion == null ? "" : objBEClientePac.FechaDesactivacion;
            MiContexto miContexto = (MiContexto)HttpContext.Session["MiContexto"];
            Proxy proxy = new Proxy(miContexto);
            Lista = proxy.ActualizarPagosAutomaticosClientes(objBEClientePac);
            proxy.Cerrar();
            return Json(Lista, JsonRequestBehavior.AllowGet);
        }

        public ActionResult CargaBanco() {
            BERespConsultaTabla BERespConsultaTabla = new BERespConsultaTabla();
            //BERespConsultaTabla = null;
            MiContexto miContexto = (MiContexto)HttpContext.Session["MiContexto"];
            //miContexto = null;
            Proxy proxy = new Proxy(miContexto);
            //proxy = null;
            BEConsultaTabla BEConsultaTabla = new BEConsultaTabla();
            BEConsultaTabla.Tabla = "BCOCTA";
            BERespConsultaTabla = proxy.ConsultarTabla(BEConsultaTabla);
            proxy.Cerrar();
            return Json(BERespConsultaTabla, JsonRequestBehavior.AllowGet);
        }
        */

        [HttpPost]
        public ActionResult GetPartialPopUp(string descripcion) {
            //TODO : 049 Retornar una vista parcial, al que se le pasa como parámetro el objeto rol obtenido en TODO : 058
            return PartialView("../Views/Shared/Alerta", descripcion);
        }

        //TODO : 081 Obtener un mensaje de alerta
        [HttpPost]
        public ActionResult ObtenerAlerta(string mensaje) {
            if (mensaje == null) {
                mensaje = "";
            }

            mensaje = JsonConvert.DeserializeObject<String>(mensaje);
            return PartialView("../Shared/Alerta", mensaje);
        }
    }
    #region JsonFilter

    public class JsonFilter : ActionFilterAttribute {
        public string Param { get; set; }
        public Type JsonDataType { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext) {
            if (filterContext.HttpContext.Request.ContentType.Contains("application/json")) {
                string inputContent;
                using (var sr = new StreamReader(filterContext.HttpContext.Request.InputStream)) {
                    inputContent = sr.ReadToEnd();
                }
                var result = JsonConvert.DeserializeObject(inputContent, JsonDataType);
                filterContext.ActionParameters[Param] = result;
            }
        }
    }

    #endregion
}
