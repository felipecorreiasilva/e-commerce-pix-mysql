

export const links = [
        
    {
        name: 'Home',
        path: '/'
    },
    
    {
        name: 'Sobre',
        path: '/about',
        
    },
    
    {
        name: 'Produtos',
        submenu: true,
        sublinks: [

                { name: 'Cafés', path: '/#products' },
                { name: 'Outros', path: '/' },
            
        ],
    },
    
    {
        name: 'Contato',
        path: '/contact'
    },

]

export const linksMobile = [
        
    {
        name: 'Home',
        path: '/'
    },
    
    {
        name: 'Sobre',
        path: '/about',
        
    },
    
    {
        name: 'Produtos',
        submenu: true,
        sublinks: [

                { name: 'Cafés', path: '/#products' },
                { name: 'Outros', path: '/' },
            
        ],
    },
    
    {
        name: 'Contato',
        path: '/contact'
    },
    
    {
        name: 'Conta',
        path: '/account/login'
    },
    
    {
        name: 'Carrinho',
        path: '/cart'
    },

]