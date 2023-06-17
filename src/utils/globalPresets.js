const theme = 'blue'

const presets = {
  theme: `${theme}`,
  appTitle: 'SmartERP',
  svgIconUrl: 'https://www.via-asesores.com/svgicons/smartpos/',
  images: {
    loginFondo: 'https://www.via-asesores.com/backgrounds/smartpos/smartpos_background.png',
    welcomeFondo: 'https://www.via-asesores.com/backgrounds/SmartPOS/envoice.jpg',
    icon: 'https://www.via-asesores.com/logos/smarterp/smarterp_logo.png',
    logo: 'https://www.via-asesores.com/logos/smartpos.png',
    imageLoader: 'https://www.via-asesores.com/logos/logo_via.png',
    noImageFound: 'https://www.via-asesores.com/smartsalesnprofit/images/LogoViasaClaroTransparente_600x.png',
    onError: 'https://www.via-asesores.com/smartsalesnprofit/images/LogoViasaClaroTransparente_600x.png'
  },
  locations: {
    login: '/',
    welcome: '/welcome',
    profile: '/seguridad/profile'
  },
  toaster: {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light'
  },
  pristine: {
    // class of the parent element where the error/success class is added
    classTo: 'form-group',
    errorClass: 'ring-red-400',
    successClass: 'has-success',
    // class of the parent element where error text element is appended
    errorTextParent: 'form-group',
    // type of element to create for the error text
    errorTextTag: 'div',
    // class of the error text element
    errorTextClass: 'text-help text-red-500 text-sm py-1'
  },
  graphOptions: {
    interaction: {
      dragNodes: false,
      dragView: true,
      hover: true
    },
    layout: {
      hierarchical: {
        enabled: true,
        levelSeparation: 200,
        nodeSpacing: 200,
        treeSpacing: 200,
        blockShifting: true,
        edgeMinimization: true,
        parentCentralization: true,
        direction: 'LR', // UD, DU, LR, RL
        sortMethod: 'hubsize', // hubsize, directed
        shakeTowards: 'leaves' // roots, leaves
      }
    },
    edges: {
      color: '#000000'
    },
    height: '700px',
    physics: {
      enabled: false,
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 100,
        onlyDynamicEdges: false,
        fit: true
      }
    }
  }
}

export default presets
