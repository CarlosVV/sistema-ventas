using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LuzdelSur.Plataforma.Explorador.Common;
using LuzDelSur.Administrativo.Liven.Svc.WcfInterface.Entities;
using System.Text;
using System.ServiceModel.Channels;
using LuzdelSur.Plataforma.Explorador.WCFEntity;
using LuzdelSur.Plataforma.Explorador.WCFEntity.Contexto;
using LuzDelSur.Administrativo.Liven.Emidoc.UI.Web.Clases;

namespace LuzDelSur.Administrativo.Liven.Emidoc.UI.Web.Controllers
{
    public class DocumentosController : AplicacionController
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
        //
        // GET: /Documentos/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Index(BEDocumentoConsultaRequest model) {
            MiContexto miContexto = (MiContexto)HttpContext.Session["MiContexto"];

            Proxy proxy = new Proxy(miContexto);

            List<BEDocumento> resp = proxy.BuscarDocumentos(model);
            proxy.Cerrar();

            return View(resp);
        }

    }
}
