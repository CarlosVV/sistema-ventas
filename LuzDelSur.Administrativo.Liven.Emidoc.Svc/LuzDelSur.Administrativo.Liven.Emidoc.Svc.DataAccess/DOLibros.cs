using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LuzDelSur.Plataforma.Data.Helper.Data.Access.Informix;
using LuzDelSur.Administrativo.Liven.Svc.WcfInterface.Entities;
using System.Data;

namespace LuzDelSur.Administrativo.Liven.Emidoc.Svc.DataAccess {
    public class DOLibros {
         #region Variables Globales
        private InformixHelper informixHelper = null;
        #endregion
        #region Constructor

        /// <summary>
        /// 
        /// </summary>
        /// <param name="session"></param>
        /// <param name="informixHelper"></param>
        public DOLibros(InformixHelper informixHelper) {
            this.informixHelper = informixHelper;
        }
        #endregion
        static DOLibros() {
            log4net.Config.XmlConfigurator.Configure();
        }
        public List<BEDocumento> ObtenerLibros(BEDocumentoConsultaRequest objDocumentoEntidadRequest) {
            List<BEDocumento> lstDocumentoEntidad = null;
            BEDocumento beDocumento = null;
            DataTable dt = null;
            string sSQL = null;

            IfxParametro IfxParametro = new IfxParametro("@NumeroCliente", objDocumentoEntidadRequest.NroDocumento);

            sSQL = @"SELECT C.NUMERO_CLIENTE,C.SECTOR,C.ZONA,C.correlativo_ruta,C.NOMBRE,M.COD_ENTIDAD,M.CLAVE_PAGAUT,M.ESTADO,M.FECHA_ACTIVACION,M.FECHA_DESACTIVAC,M.COD_CUENTA 
                 FROM CLIENTE C, OUTER MAEAUT M 
                 WHERE M.NUMERO_CLIENTE=C.NUMERO_CLIENTE
                 and c.numero_cliente = @NumeroCliente";

            dt = informixHelper.ExecuteDataset(CommandType.Text, sSQL.ToString(), IfxParametro).Tables[0];
            lstDocumentoEntidad = new List<BEDocumento>();
            if (dt != null) {
                if (dt.Rows.Count > 0) {
                    foreach (DataRow dr in dt.Rows) {
                        beDocumento = new BEDocumento();
                        beDocumento.EstatusTX = "1";
                        beDocumento.MensajeTX = "Se ejecutó la consulta con éxito.";
                        beDocumento.NroDocumento = dr["NUMERO_CLIENTE"] != DBNull.Value ? dr["NUMERO_CLIENTE"].ToString().Trim() : "0";
                    }

                } else {
                    beDocumento = new BEDocumento();
                    beDocumento.EstatusTX = "0";
                    beDocumento.MensajeTX = "Se ejecutó la consulta con éxito.";
                    lstDocumentoEntidad.Add(beDocumento);
                }
            } else {
                beDocumento = new BEDocumento();
                beDocumento.EstatusTX = "-1";
                beDocumento.MensajeTX = "Se ejecutó la consulta con error.";
                lstDocumentoEntidad.Add(beDocumento);
            }

            return lstDocumentoEntidad;
        }
    }
}
