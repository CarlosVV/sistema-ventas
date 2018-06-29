using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using LuzDelSur.Administrativo.Liven.Emidoc.Svc.WcfInterface.Entities;

namespace LuzDelSur.Administrativo.Liven.Svc.WcfInterface.Entities {
    [DataContract]
    public class BEDocumentoConsultaRequest : BEEntidadBase {
        [DataMember]
        public string TipoDocumento { get; set; }
        [DataMember]
        public string NroDocumento { get; set; }
        [DataMember]
        public string Sucursal { get; set; }
        [DataMember]
        public string Estado { get; set; }
        [DataMember]
        public string Origen { get; set; }
        [DataMember]
        public string ModoPago { get; set; }
        [DataMember]
        public string Libro { get; set; }
        [DataMember]
        public string Suministro { get; set; }
        [DataMember]
        public string DniCliente { get; set; }
        [DataMember]
        public string NroDocumentoCliente { get; set; }
        [DataMember]
        public string FechaIngresoInicial { get; set; }
        [DataMember]
        public string FechaIngresoFinal { get; set; }
        [DataMember]
        public string FechaEmisionInicial { get; set; }
        [DataMember]
        public string FechaEmisionFinal { get; set; }
        [DataMember]
        public string FechaIngresoAnulacionInicial { get; set; }
        [DataMember]
        public string FechaIngresoAnulacionFinal { get; set; }
        [DataMember]
        public string MotivoAnulacion { get; set; }
        [DataMember]
        public string CR { get; set; }
        [DataMember]
        public string Producto { get; set; }
    }
}
