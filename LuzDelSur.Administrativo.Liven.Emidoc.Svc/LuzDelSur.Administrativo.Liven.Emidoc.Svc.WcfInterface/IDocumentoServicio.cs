using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using LuzDelSur.Administrativo.Liven.Svc.WcfInterface.Entities;
using LuzdelSur.Plataforma.Explorador.WCFEntity;

namespace LuzDelSur.Administrativo.Liven.Svc.WcfInterface {
    [ServiceContract]
    public interface IDocumentoServicio {
        [OperationContract]
        [WebInvoke(
            Method = "POST",
            RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json,
            UriTemplate = "/DocumentoServicio/ConsultarDocumentos",            
            BodyStyle = WebMessageBodyStyle.WrappedRequest)]
        List<BEDocumento> ConsultarDocumentos(SesionServicio session, BEDocumentoConsultaRequest documento);
    }
}
