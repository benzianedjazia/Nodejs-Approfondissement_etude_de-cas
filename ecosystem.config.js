module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      instances: 3, // Nombre d'instances en parallèle
      exec_mode: "cluster", // Mode d'exécution en cluster
      error_file: "./logs/err.log", // Fichier de log des erreurs
      max_memory_restart: "200M", // Limite de mémoire maximum par instance
  
    },
  ],
};
