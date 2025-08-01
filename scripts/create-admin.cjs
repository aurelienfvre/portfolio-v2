const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

// Chemin vers la base de données
const dbPath = path.join(__dirname, '..', 'db', 'portfolio.db');

async function createAdminUser() {
  const db = new sqlite3.Database(dbPath);
  
  try {
    const email = 'aurelieuxpro@gmail.com';
    const password = 'Aurelieux23&_';
    const name = 'Aurelien Admin';
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Insérer l'utilisateur admin
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO admin_users (email, password, name, created_at, updated_at) 
      VALUES (?, ?, ?, datetime('now'), datetime('now'))
    `);
    
    stmt.run([email, hashedPassword, name], function(err) {
      if (err) {
        console.error('Erreur lors de la création de l\'admin:', err);
      } else {
        console.log('✅ Compte admin créé avec succès !');
        console.log('📧 Email:', email);
        console.log('🔑 Mot de passe:', password);
        console.log('🔗 URL de connexion: http://localhost:3000/admin/login');
      }
    });
    
    stmt.finalize();
    
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    db.close();
  }
}

createAdminUser();