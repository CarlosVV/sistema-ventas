using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LuzDelSur.Administrativo.Liven.Svc.WcfInterface.Entities;
using LuzdelSur.Plataforma.Explorador.WCFEntity;
using LuzDelSur.Administrativo.Liven.Emidoc.Svc.DataAccess;
using LuzDelSur.Plataforma.Data.Helper.Data.Access.Informix;

namespace LuzDelSur.Administrativo.Liven.Emidoc.Svc.Business {
    public class BOTipoDocumentos {
        string keyDB = "sifco";
        public List<BEDocumento> ObtenerTipoDocumentos(SesionServicio session, BEDocumentoConsultaRequest objDocumentoEntidadRequest) {
            List<BEDocumento> lista = null;
            DODocumentos doDocumentos = null;
            InformixHelper informixHelper = null;
            try {
                informixHelper = new InformixHelper(keyDB, session);
                doDocumentos = new DODocumentos(informixHelper);
                lista = doDocumentos.BuscarDocumentos(objDocumentoEntidadRequest);
            } catch (Exception ex) {
                throw ex;
            } finally {
                if (informixHelper != null) {
                    informixHelper.Dispose();
                }

            }
            return lista;
        }
    }
}
