using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
//using LuzDelSur.Administrativo.Liven.Emidoc.
using LuzdelSur.Plataforma.Explorador.WCFEntity.Contexto;
using LuzdelSur.Plataforma.Explorador.WCFEntity;
using LuzdelSur.Plataforma.Explorador.Common;
using System.ServiceModel;
using LuzDelSur.Administrativo.Liven.Svc.WcfInterface;
using LuzDelSur.Administrativo.Liven.Svc.WcfInterface.Entities;


namespace LuzDelSur.Administrativo.Liven.Emidoc.UI.Web.Clases
{
    public class Proxy : ProxyBase
    {        
        /// <summary>
        /// Crear un objeto del tipo interfaz, el que hará de conector entre Front y BackEnd
        /// </summary>
        
        IDocumentoServicio _servDocumentos = null;
        
        /// <summary>
        /// 
        /// </summary>
        MiContexto _miContexto=null;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="miContexto"></param>
        public Proxy(MiContexto miContexto)
            //TODO : 021 Definir el modo de conexión Business o NetTcp
            //: base(IdAplicacion, ModoConexion.ViaWCFNetTcp, miContexto)
            : base("Explorador", ModoConexion.ViaWCFNetTcp, miContexto)
        {
            this._miContexto = miContexto;
        }

        /// <summary>
        /// Sobreescribir el método InicializarConexionViaWCFNetTcp
        /// </summary>
        /// <param name="serverName"></param>
        public override void InicializarConexionViaWCFNetTcp(string serverName)
        {
            //serverName = null;
            try {
                
                EndpointAddress myEndpoint = new EndpointAddress("net.tcp://" + serverName + "/DocumentoServicio.svc");
                ChannelFactory<IDocumentoServicio> myChannelFactoryPerso = new ChannelFactory<IDocumentoServicio>(MiBinding, myEndpoint);
                _servDocumentos = myChannelFactoryPerso.CreateChannel();
                
            }
            catch (Exception ex) {
                throw ex;
            }

        }

        //TODO : 028 Crear un método que cierre todas las conexiones con las interfaces
        public void Cerrar()
        {
            //TODO : 029 Cerrar cada interfaz que se esté usando
           if (_servDocumentos is IClientChannel)
               ((IClientChannel)_servDocumentos).Close();
            else
               _servDocumentos = null;            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// 
        public List<BEDocumento> BuscarDocumentos(BEDocumentoConsultaRequest objDocumentoConsultaRequest) {
            return _servDocumentos.ConsultarDocumentos(this._miContexto.AdministradorSesion.Sesion, objDocumentoConsultaRequest);
        }
        /*
        public BERespConsultaTabla ConsultarTabla(BEConsultaTabla objBEConsultaTabla)
        {
            //objBEConsultaTabla = null;
            //this._miContexto.AdministradorSesion.Sesion = null;
            return _servClientePac.ConsultarTabla(objBEConsultaTabla, this._miContexto.AdministradorSesion.Sesion);
        }
        public List<BERespClientePac> BuscarPagosAutomaticosClientes(BEClientePac objBEClientePac)
        {
            return _servClientePac.BuscarPagosAutomaticosClientes(this._miContexto.AdministradorSesion.Sesion, objBEClientePac);
        }
        public List<BERespClientePac> ActualizarPagosAutomaticosClientes(BEClientePac objBEClientePac)
        {
            return _servClientePac.ActualizarPagosAutomaticosClientes(this._miContexto.AdministradorSesion.Sesion, objBEClientePac);
        }
        public List<BERespClientePac> InsertarPagosAutomaticosClientes(BEClientePac objBEClientePac)
        {
            return _servClientePac.InsertarPagosAutomaticosClientes(this._miContexto.AdministradorSesion.Sesion, objBEClientePac);
        }
         */ 
    }
}