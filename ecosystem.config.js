module.exports = {
  apps : [{
    name: 'server',
    script: './server/server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 'max',
    autorestart: true,
    watch: false,
    max_memory_restart: '900M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '129.28.147.252',
      prot:8888,
      ref  : 'origin/master',
      repo : 'git@github.com:wangyaxinone/kissPlan.git',
      ssh_options: ``,
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
