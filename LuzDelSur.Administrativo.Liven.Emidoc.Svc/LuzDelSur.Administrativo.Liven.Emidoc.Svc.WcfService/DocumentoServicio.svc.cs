using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using LuzDelSur.Administrativo.Liven.Emidoc.Svc.Business;
using LuzDelSur.Administrativo.Liven.Svc.WcfInterface;
using LuzDelSur.Administrativo.Liven.Svc.WcfInterface.Entities;
using LuzdelSur.Plataforma.Explorador.WCFEntity;
using log4net;
using System.Reflection;

namespace LuzDelSur.Administrativo.Liven.Emidoc.Svc.WcfService
{
    public class DocumentoServicio : IDocumentoServicio
    {
        private static readonly ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
        int _valorMaximo = 9999999;
        static DocumentoServicio()
        {
            log4net.Config.XmlConfigurator.Configure();
        }
        private int ObtenerAleatorio() {
            Random rnd = new Random();
            int valor = rnd.Next(_valorMaximo);
            return valor;
        }
        public List<BEDocumento> ConsultarDocumentos(SesionServicio session, BEDocumentoConsultaRequest objDocumentoConsultaReq)
        {
            List<BEDocumento> list = null;
            BODocumentos boDocumentos = null;
            list = new List<BEDocumento>();
            int valorAleatorio = ObtenerAleatorio();
            try {
                list = new List<BEDocumento>();
                boDocumentos = new BODocumentos();

                if (objDocumentoConsultaReq != null)
                    objDocumentoConsultaReq.EscribirLog(Log, "BuscarDocumentos[" + valorAleatorio + "]");

                list = boDocumentos.BuscarDocumentos(session, objDocumentoConsultaReq);

            } catch (Exception ex) {
                Log.Error("BuscarDocumentos[" + valorAleatorio + "] " + ex.StackTrace + " " + ex.Message);
                throw new FaultException<ExcepcionLDS>(new ExcepcionLDS() { categoria = (int)TipoErrorControlado.Validacion, mensajeUsuario = "No se pudo obtener la lista de Documentos.", mensajeAplicacion = ex.Message });
            }

            return list;
        }
    }
}
