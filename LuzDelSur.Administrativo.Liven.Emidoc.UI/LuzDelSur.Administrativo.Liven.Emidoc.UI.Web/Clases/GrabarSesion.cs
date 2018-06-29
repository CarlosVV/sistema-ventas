using LuzdelSur.Plataforma.Explorador.WCFEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LuzDelSur.Administrativo.Liven.Emidoc.UI.Web.Clases
{
    //TODO : 014 Crear la clase GrabarSesion
    public class GrabarSesion
    {
         //TODO : 015 Crear el método GuardarSesion
        public static void GuardarSesion(string tokenId)
        {
            Informacion objeto = (Informacion)System.Web.HttpContext.Current.Application[tokenId];
            //TODO : 017 Guardar la variable MiContexto en una variable de sesión
            HttpContext.Current.Session["MiContexto"] = objeto.MiContexto;
            //TODO : 018 Limpiar el contenido de la variable System.Web.HttpContext.Current.Application
            System.Web.HttpContext.Current.Application[tokenId] = null;

        }

        public static void GuardarParam(string parametro)
        {
            Dictionary<string, string> objeto = (Dictionary<string, string>)System.Web.HttpContext.Current.Application[parametro];
            //TODO : 017 Guardar la variable MiContexto en una variable de sesión
            HttpContext.Current.Session["Parametro"] = objeto;
            //TODO : 018 Limpiar el contenido de la variable System.Web.HttpContext.Current.Application
            System.Web.HttpContext.Current.Application[parametro] = null;

        }
        public static bool VerificarSesion(string tokenId)
        {
            return System.Web.HttpContext.Current.Application[tokenId] != null;
        }
    }
}