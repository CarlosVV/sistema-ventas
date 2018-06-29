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
    public class BEDocumento : BEEntidadBase {
        [DataMember(Name = "NroDocumento", IsRequired = true, EmitDefaultValue = false)]
        public string NroDocumento { get; set; }

        [DataMember(Name = "FechaIngreso", IsRequired = true, EmitDefaultValue = false)]
        public string FechaIngreso { get; set; }

        [DataMember(Name = "HoraIngreso", IsRequired = true, EmitDefaultValue = false)]
        public string HoraIngreso { get; set; }

        [DataMember(Name = "Sucursal", IsRequired = true, EmitDefaultValue = false)]
        public string Sucursal { get; set; }


        [DataMember(Name = "Modalidad", IsRequired = true, EmitDefaultValue = false)]
        public string Modalidad { get; set; }


        [DataMember(Name = "Libro", IsRequired = true, EmitDefaultValue = false)]
        public string Libro { get; set; }

        [DataMember(Name = "Tipo", IsRequired = true, EmitDefaultValue = false)]
        public string Tipo { get; set; }

        [DataMember(Name = "VTotalDoc", IsRequired = true, EmitDefaultValue = false)]
        public string VTotalDoc { get; set; }

        [DataMember(Name = "Estado", IsRequired = true, EmitDefaultValue = false)]
        public string Estado { get; set; }

        [DataMember(Name = "Suministro", IsRequired = true, EmitDefaultValue = false)]
        public string Suministro { get; set; }

        [DataMember(Name = "MPago", IsRequired = true, EmitDefaultValue = false)]
        public string MPago { get; set; }

        [DataMember(Name = "ValorPago", IsRequired = true, EmitDefaultValue = false)]
        public string ValorPago { get; set; }

        [DataMember(Name = "PorcPago", IsRequired = true, EmitDefaultValue = false)]
        public string PorcPago { get; set; }

        [DataMember(Name = "Origen", IsRequired = true, EmitDefaultValue = false)]
        public string Origen { get; set; }

        public BEDocumento() {

        }

        public string EstatusTX { get; set; }

        public string MensajeTX { get; set; }
    }
}
