using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using log4net;
using System.Reflection;

namespace LuzDelSur.Administrativo.Liven.Emidoc.Svc.WcfInterface.Entities {
    public class BEEntidadBase {
        public void EscribirLog(ILog log, string metodo) {
            string cadena = "";
            cadena += "Método: " + metodo + "\r\nParámetros:\r\n";

            Type type = this.GetType();

            PropertyInfo[] propiedades = type.GetProperties();

            foreach (PropertyInfo propiedad in propiedades) {
                cadena += propiedad.Name + ": " + propiedad.GetValue(this, null) + "\r\n";
            }

            log.Debug(cadena);
        }
    }
}
